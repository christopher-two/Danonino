"use client";

import Link from "next/link";
import { Heart, Menu, Music, Image as ImageIcon, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/gallery", label: "Galería", icon: ImageIcon },
  { href: "/timeline", label: "Nuestra Historia", icon: Calendar },
  { href: "/playlist", label: "Playlist", icon: Music },
];

export function AppHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label, icon: Icon }: typeof navLinks[0]) => (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
        pathname === href ? "text-primary" : "text-foreground/70"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-headline">Dannonino</span>
          </Link>
        </div>

        <nav className="hidden items-center space-x-2 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
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
                    <NavLink key={link.href} {...link} />
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
