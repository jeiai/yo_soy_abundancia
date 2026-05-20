import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-plum text-white shadow-soft hover:bg-rosewood focus-visible:outline-plum",
  secondary:
    "bg-white text-plum ring-1 ring-gold/40 hover:bg-linen focus-visible:outline-gold",
  ghost:
    "bg-transparent text-plum hover:bg-white/70 focus-visible:outline-lavender"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = ""
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
