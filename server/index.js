const express = require("express");
const path = require("path");
const fs = require('fs');
const { isDataView } = require("util/types");

const dbPath = path.join(__dirname, "db.json");

// initalize data cache
const dataCache = []
const loadDataCache = async () => {
  try {
    const data = await fs.promises.readFile(dbPath, "utf-8");
    const tmp = JSON.parse(data);
    dataCache.push(...tmp.data);
    console.log("Data cache loaded successfully:", dataCache);
  } catch (error) {
    console.error("Error reading db.json file:", error);
  }
};

loadDataCache();

// Express.js
const app = express();

app.use(express.json());

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
  if (!req.body) {
    return res.status(400).json({ error: 'Missing request body' });
  }

  const { id } = req.body;

  // Check if id is null or undefined
  if (!id) {
    return res.status(400).json({ error: 'Missing id in request body' });
  }

  const video = dataCache.find((item) => id === item.id);

  if (!video) {
    return res.json({
      desc: `id:${id} not found`,
    });
  }

  res.json({
    desc: `mock /api/video ok`,
    data: video,
  });
})

const staticPath = path.join(path.dirname(__dirname), "web/dist");
console.log('--- staticPath:', staticPath)
app.use(express.static(staticPath));


app.get("*", (req, res) => {
  console.log(`--- path:${req.url} no api found ---`)
  indexPath = path.join(staticPath, "index.html");
  res.sendFile(indexPath);
});

let port = 3000
if (process.env.NODE_ENV == "production") {
  port = 80
  const r2path = path.join('/Volumes/extend')
  console.log('--- r2path:', r2path)
  app.use(express.static(r2path));
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
