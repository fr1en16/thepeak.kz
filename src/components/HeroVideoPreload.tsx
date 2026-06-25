"use client";

import ReactDOM from "react-dom";

export default function HeroVideoPreload() {
  ReactDOM.preload("/bg.webm", {
    as: "video",
    type: "video/webm",
    media: "(min-width: 768px)",
    fetchPriority: "high",
  });

  ReactDOM.preload("/bg%20m.webm", {
    as: "video",
    type: "video/webm",
    media: "(max-width: 767px)",
    fetchPriority: "high",
  });

  return null;
}
