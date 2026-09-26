"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Radio, Radar, Search, SlidersHorizontal, UploadCloud } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Feed", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/discover", label: "Discover", icon: Radar },
  { href: "/live", label: "Live", icon: Radio },
  { href: "/upload", label: "Upload", icon: UploadCloud },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/dashboard", label: "Dashboard", icon: SlidersHorizontal },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-ink/95 px-3 py-2 backdrop-blur lg:left-1/2 lg:top-4 lg:bottom-auto lg:w-auto lg:-translate-x-1/2 lg:rounded-full lg:border lg:px-4">
      <div className="mx-auto grid max-w-xl grid-cols-7 gap-1 lg:flex lg:max-w-none lg:items-center">
        <Link href="/" className="mr-2 hidden lg:block" aria-label="cnct home">
          <BrandMark size="sm" />
        </Link>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg px-3 text-xs font-semibold text-mist transition lg:min-h-0 lg:flex-row lg:rounded-full lg:py-2",
                isActive && "bg-paper text-ink shadow-outline",
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
