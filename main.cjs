const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
const staticDir = path.join(__dirname, "dist");
const dbFilePath = path.join(__dirname, "db.json");

const cache = new Array();
fs.readFile(dbFilePath, "utf-8", (error, data) => {
  if (error) {
    console.error("Error reading db.json file:", error);
    return;
  }

  const tmp = JSON.parse(data);
  cache.push(...tmp.data);

  console.log("Cache loaded:", cache);
});

console.log("- cache:", cache);

const server = http.createServer((req, res) => {
  let filePath = path.join(staticDir, req.url === "/" ? "index.html" : req.url);

  // 确保路径合法，防止路径穿越攻击
  if (!filePath.startsWith(staticDir)) {
    res.statusCode = 403;
    res.end("Access Denied");
    return;
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
  };
  const contentType = mimeTypes[extname] || "application/octet-stream";

  switch (req.url) {
    case "/api/video":
      getVideo(req, res);
      break;
    case "/api/videos":
      listVideos(res);
      break;
    case "/api/add":
      add(req, res);
      break;
    case "/api/update":
      update(req, res);
      break;
    default:
      // Serve static files
      fs.readFile(filePath, (error, content) => {
        if (error) {
          if (error.code === "ENOENT") {
            res.statusCode = 404;
            res.end("404 Not Found");
          } else {
            res.statusCode = 500;
            res.end(`Server Error: ${error.code}`);
          }
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", contentType);
          res.end(content, "utf-8");
        }
      });
      break;
  }
});

function getVideo(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    console.log("- body:", body);
    const params = JSON.parse(body);
    console.log("params:", params);

    let video = {};

    for (let item of cache) {
      if (item.id === params.id) {
        video = item;
        break;
      }
    }

    res.end(JSON.stringify(video));
  });
}

// params:
//   - key: string
//
// no key provide return all result.
function listVideos(res) {
  // fs.readFile(dbFilePath, "utf-8", (error, data) => {
  //   if (error) {
  //     res.statusCode = 500;
  //     res.end("Error reading database file");
  //     return;
  //   }
  //   res.setHeader("Content-Type", "application/json");
  //   res.statusCode = 200;
  //   res.end(data);
  // });
  const all = {
    desc: "我的家庭影院",
    data: cache,
  };

  res.end(JSON.stringify(all));
}

function add(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const newData = JSON.parse(body);

      fs.readFile(dbFilePath, "utf-8", (error, data) => {
        if (error) {
          res.statusCode = 500;
          res.end("Error reading database file");
          return;
        }

        const db = JSON.parse(data);
        db.push(newData);

        fs.writeFile(
          dbFilePath,
          JSON.stringify(db, null, 2),
          "utf-8",
          (writeError) => {
            if (writeError) {
              res.statusCode = 500;
              res.end("Error writing to database file");
              return;
            }
            res.statusCode = 200;
            res.end("Data added successfully");
          }
        );
      });
    } catch (error) {
      res.statusCode = 400;
      res.end("Invalid JSON format");
    }
  });
}

function update(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const updatedData = JSON.parse(body);

      fs.readFile(dbFilePath, "utf-8", (error, data) => {
        if (error) {
          res.statusCode = 500;
          res.end("Error reading database file");
          return;
        }

        let db = JSON.parse(data);
        db = db.map((item) =>
          item.id === updatedData.id ? updatedData : item
        );

        fs.writeFile(
          dbFilePath,
          JSON.stringify(db, null, 2),
          "utf-8",
          (writeError) => {
            if (writeError) {
              res.statusCode = 500;
              res.end("Error writing to database file");
              return;
            }
            res.statusCode = 200;
            res.end("Data updated successfully");
          }
        );
      });
    } catch (error) {
      res.statusCode = 400;
      res.end("Invalid JSON format");
    }
  });
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
