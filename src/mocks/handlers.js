// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/videos", async ({ request }) => {
    const { keywords } = await request.json();
    console.log("--- keywords:", keywords);
    return HttpResponse.json({
      desc: "mock '/api/videos' ok",
      data: [
        {
          id: 1,
          title: "唐朝诡事录",
          subtitle: "",
          time: "2022年",
          desc: "主演：杨旭文、杨志刚、郜思雯、陈创、石悦安鑫、孙雪宁",
          banner: "/banners/pic02.jpg",
        },
        {
          id: 2,
          title: "唐朝诡事录之西行",
          subtitle: "",
          time: "2024年",
          desc: "主演：杨旭文、杨志刚、郜思雯、陈创、孙雪宁",
          banner: "/banners/pic05.jpg",
        },
      ],
    });
  }),

  http.post("/api/video", async ({ request }) => {
    const { id } = await request.json();
    return HttpResponse.json({
      desc: `mock /api/video ok`,
      data: {
        id: id,
        title: "唐朝诡事录之西行",
        subtitle: "第二季",
        time: "2024年",
        desc: "主演：杨旭文、杨志刚、郜思雯、陈创、孙雪宁",
        banner: "/banners/pic05.jpg",
        playlist: ["/playlist/video1.mp4"],
      },
    });
  }),
];
