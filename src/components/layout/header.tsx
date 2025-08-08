
"use client";

import Link from "next/link";
import {
  Heart,
  Menu,
  Music,
  Image as ImageIcon,
  Calendar,
  PawPrint,
  CalendarDays,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AddPhotoButton } from "../gallery/add-photo-button";

const navLinks = [
  { href: "/", label: "Inicio", icon: Heart },
  { href: "/gallery", label: "Galería", icon: ImageIcon },
  { href: "/timeline", label: "Nuestra Historia", icon: Calendar },
  { href: "/playlist", label: "Playlist", icon: Music },
  { href: "/joaquin", label: "Joaquín", icon: PawPrint },
  { href: "/eventos", label: "Eventos", icon: CalendarDays },
];

export function AppHeader() {
  const pathname = usePathname();

  const NavLink = ({ href, label, icon: Icon }: (typeof navLinks)[0]) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "flex items-center justify-center rounded-full p-2.5 text-sm font-medium transition-colors hover:bg-primary/10",
              pathname === href
                ? "bg-primary/20 text-primary"
                : "text-foreground/70"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div className="container mx-auto flex items-center justify-center">
        <nav className="flex items-center gap-1 rounded-full border border-border/40 bg-background/80 p-1 shadow-lg backdrop-blur-md">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          {pathname === "/gallery" && <AddPhotoButton />}
        </nav>
      </div>
    </header>
  );
}
