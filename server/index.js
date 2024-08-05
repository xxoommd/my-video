const express = require("express");
const path = require("path");
const fs = require('fs');
const { isDataView } = require("util/types");

const staticPath = path.join(path.dirname(__dirname), "web/dist");
const dbPath = path.join(__dirname, "db.json");

// initalize data cache
const dataCache = []
fs.readFile(dbPath, "utf-8", (error, data) => {
  if (error) {
    console.error("Error reading db.json file:", error);
    return;
  }

  const tmp = JSON.parse(data);
  dataCache.push(...tmp.data);

  console.log("Cache loaded:", dataCache);
});

// Express.js
const app = express();
app.use(express.static(staticPath));
app.use(express.json());

app.get("/", (req, res) => {
  indexPath = path.join(staticPath, "index.html");
  res.sendFile(indexPath);
});

app.post("/api/videos", (req, res) => {
  let data = [];
  let keyword = ''

  if (req.body === undefined || !req.body instanceof Object || req.body.keyword === undefined || req.body.keyword == "") {
    console.log('no keywords provide, return all')
    data = dataCache;
  } else {
    keyword = req.body.keyword;

    for (let video of dataCache) {
      if (!video instanceof Object) {
        console.error('data has empty video:', typeof video)
        continue
      }
      if (video.title !== undefined && typeof video.title === 'string' && video.title.includes(keyword)) {
        data.push(video)
        continue
      }
      if (video.subtitle !== undefined && typeof video.subtitle === 'string' && video.subtitle.includes(keyword)) {
        data.push(video)
        continue
      }
    }
  }

  res.json({ desc: "ok", keyword, data });
});

app.post("/api/video", (req, res) => {
  const { id } = req.body
  console.log("-- id:", id)
  let v;
  for (const item of dataCache) {
    if (id === item.id) {
      v = item
      break;
    }
  }

  console.log('--- v:', v)

  if (v != undefined) {
    res.json({
      desc: `mock /api/video ok`,
      data: v
    })
  }

  res.json({
    desc: `id:${id} not found`
  })
})

let port = 3000
if (process.env.NODE_ENV == "production") {
  port = 80
  app.use(express.static('/Volumes/extend'));
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
