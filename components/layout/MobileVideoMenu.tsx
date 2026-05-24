"use client";

import { Video, X } from "lucide-react";
import { useState } from "react";
import { getVisibleSocialVideos } from "@/data/social-videos";
import { SocialVideoCarousel } from "@/components/video/SocialVideoCarousel";

export function MobileVideoMenu() {
  const [open, setOpen] = useState(false);
  const videos = getVisibleSocialVideos();

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-plum ring-1 ring-gold/30"
        aria-expanded={open}
        aria-controls="mobile-video-menu"
      >
        {open ? <X className="h-4 w-4" /> : <Video className="h-4 w-4" />}
        Videos
      </button>
      {open ? (
        <div
          id="mobile-video-menu"
          className="absolute right-0 top-12 z-50 w-[min(22rem,calc(100vw-2.5rem))]"
        >
          <SocialVideoCarousel videos={videos} compact />
        </div>
      ) : null}
    </div>
  );
}
