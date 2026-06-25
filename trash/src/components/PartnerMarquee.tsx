"use client";

import React from "react";

export default function PartnerMarquee() {
  const logoIds = [2, 12, 20, 21, 24, 38, 39, 40, 41, 44];
  const baseUrl = "/logo/clot-";

  // Duplicate the logos 4 times for a seamless loop
  const marqueeItems = [...logoIds, ...logoIds, ...logoIds, ...logoIds];

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track" id="logoTrack">
        {marqueeItems.map((id, index) => (
          <div key={`${id}-${index}`} className="marquee-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${baseUrl}${id}.webp`}
              alt="Partner Logo"
              loading="lazy"
              width={180}
              height={50}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
