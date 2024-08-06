// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/videos", async ({ request }) => {
    const { keyword } = await request.json();

    const testLen = 12
    const testData = new Array(testLen)
    for (let i = 0; i < testLen; i++) {
      testData[i] = {
        id: i + 1,
        title: "唐朝诡事录之西行",
        subtitle: "第二季",
        time: "2024年",
        desc: "主演：杨旭文、杨志刚、郜思雯、陈创、孙雪宁",
        banner: "/banners/pic05.jpg",
      }
    }

    return HttpResponse.json({
      desc: "mock '/api/videos' ok",
      data: testData
    });
  }),

  http.post("/api/video", async ({ request }) => {
    const { id } = await request.json();
    let n = 40
    const playlist = new Array(n);
    for (let i = 1; i <= n; i++) {
      playlist[i - 1] = `/playlist/${String(i).padStart(2, '0')}.mp4`
    }

    return HttpResponse.json({
      desc: `mock /api/video ok`,
      data: {
        id: id,
        title: "唐朝诡事录之西行",
        subtitle: "第二季",
        time: "2024年",
        desc: "主演：杨旭文、杨志刚、郜思雯、陈创、孙雪宁",
        banner: "/banners/pic05.jpg",
        playlist: playlist
      },
    });
  }),
];
