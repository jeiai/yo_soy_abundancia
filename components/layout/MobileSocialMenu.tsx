"use client";

import { Share2, X } from "lucide-react";
import { useState } from "react";
import { socialItems } from "@/components/layout/SocialButtons";

export function MobileSocialMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-plum ring-1 ring-gold/30"
        aria-expanded={open}
        aria-controls="mobile-social-menu"
      >
        {open ? <X className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        Redes
      </button>
      {open ? (
        <div
          id="mobile-social-menu"
          className="absolute right-0 top-12 z-50 grid w-72 gap-2 rounded-3xl border border-gold/20 bg-white p-3 shadow-soft"
        >
          {socialItems.map(({ key, href, label, Icon }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center gap-3 rounded-2xl bg-ivory px-4 py-3 text-sm font-semibold text-plum transition hover:bg-linen"
            >
              <Icon className="h-4 w-4 text-rosewood" />
              {label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
