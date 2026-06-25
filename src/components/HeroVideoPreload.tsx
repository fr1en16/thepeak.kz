"use client";

import ReactDOM from "react-dom";

export default function HeroVideoPreload() {
  ReactDOM.preload("/bg-mobile-poster.jpg", {
    as: "image",
    media: "(max-width: 767px)",
    fetchPriority: "high",
  });

  ReactDOM.preload("/bg-poster.jpg", {
    as: "image",
    media: "(min-width: 768px)",
    fetchPriority: "high",
  });

  ReactDOM.preload("/bg-mobile-fast.mp4", {
    as: "video",
    type: "video/mp4",
    media: "(max-width: 767px)",
    fetchPriority: "high",
  });

  ReactDOM.preload("/bg.webm", {
    as: "video",
    type: "video/webm",
    media: "(min-width: 768px)",
    fetchPriority: "high",
  });

  return null;
}
