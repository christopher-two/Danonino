
"use client";

import Link from "next/link";
import {
  Heart,
  Menu,
  Music,
  Image as ImageIcon,
  Calendar,
  PawPrint,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/gallery", label: "Galería", icon: ImageIcon },
  { href: "/timeline", label: "Nuestra Historia", icon: Calendar },
  { href: "/playlist", label: "Playlist", icon: Music },
  { href: "/joaquin", label: "Joaquín", icon: PawPrint },
];

export function AppHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            onClick={() => setIsMobileMenuOpen(false)}
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

  const MobileNavLink = ({ href, label, icon: Icon }: (typeof navLinks)[0]) => (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-primary/10",
        pathname === href ? "text-primary" : "text-foreground/80"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );

  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div className="container mx-auto rounded-full border border-border/40 bg-background/80 p-2 shadow-lg backdrop-blur-md w-auto">
        <div className="flex h-12 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg"
            >
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-headline hidden sm:inline-block">
                Dannonino
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-1 rounded-full bg-secondary/50 p-1 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          <div className="flex items-center justify-end md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                </SheetHeader>
                <div className="p-4">
                  <Link
                    href="/"
                    className="mb-8 flex items-center gap-2 text-lg font-bold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="h-6 w-6 text-primary" />
                    <span className="font-headline">Dannonino</span>
                  </Link>
                  <div className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <MobileNavLink key={link.href} {...link} />
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
