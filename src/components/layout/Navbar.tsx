"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGO_MAIN_SRC } from "@/lib/branding";
import { WHATSAPP_URL } from "@/lib/contact";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/blog", label: "RE Minds" },
  { href: "/case-studies", label: "Case stories" },
  { href: "/contact", label: "Contact" },
];

const servicesSubItems = [
  { href: "/services", label: "All Services" },
  { href: "/services/service-overview", label: "Service Overview" },
  { href: "/services/editing-support", label: "Editing Support" },
  { href: "/services/publication-support", label: "Publication Support" },
  { href: "/services/data-services", label: "Data Services" },
  { href: "/services/research-planning", label: "Research Planning" },
  { href: "/services/presentations", label: "Academic Presentation" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 shadow-[0_6px_20px_rgba(28,42,64,0.10)]">
      <div className="border-b border-[#2f558f]/25 bg-[#2f558f] text-[0.78rem] text-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Mobile + tablet marquee */}
          <div className="relative overflow-hidden py-2 lg:hidden">
            <div className="marquee flex min-w-full items-center gap-6 text-[0.72rem]">
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap">Trusted by 4051+ researchers</span>
                <span className="whitespace-nowrap">| 200+ accepted papers</span>
                <span className="whitespace-nowrap">| 95% satisfaction</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap">Mon-Sat: 10:00-19:00 IST</span>
                <span className="whitespace-nowrap">| Email: support@researchedit4u.in</span>
              </div>
              <div className="flex items-center gap-1" aria-hidden>
                <span className="whitespace-nowrap">Trusted by 4051+ researchers</span>
                <span className="whitespace-nowrap">| 200+ accepted papers</span>
                <span className="whitespace-nowrap">| 95% satisfaction</span>
              </div>
              <div className="flex items-center gap-1" aria-hidden>
                <span className="whitespace-nowrap">Mon-Sat: 10:00-19:00 IST</span>
                <span className="whitespace-nowrap">| Email: support@researchedit4u.in</span>
              </div>
            </div>
          </div>

          {/* Desktop static layout */}
          <div className="hidden h-10 items-center justify-between gap-6 lg:flex">
            <div className="flex flex-wrap gap-1.5 text-[0.78rem]">
              <span className="whitespace-nowrap">Trusted by 4051+ researchers</span>
              <span className="whitespace-nowrap before:mx-1.5 before:content-['|']">200+ accepted papers</span>
              <span className="whitespace-nowrap before:mx-1.5 before:content-['|']">95% satisfaction</span>
            </div>
            <div className="flex flex-wrap gap-5 text-[0.78rem]">
              <span className="whitespace-nowrap">Mon-Sat: 10:00-19:00 IST</span>
              <span className="whitespace-nowrap before:mx-1.5 before:content-['|']">Email: support@researchedit4u.in</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-[#d5deee] bg-white shadow-[0_8px_22px_rgba(46,83,142,0.14)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-[74px] items-center justify-between gap-3 md:gap-5">
            <Link href="/" className="flex min-w-0 flex-shrink-0 items-center gap-2.5 md:gap-3">
              <span className="inline-flex items-center">
                <Image
                  src={LOGO_MAIN_SRC}
                  alt="Researchedit4u logo"
                  width={140}
                  height={40}
                  priority
                  className="h-10 w-auto md:h-11"
                />
              </span>
            </Link>

            <nav className="hidden max-w-2xl flex-1 items-center justify-center gap-5 text-[0.95rem] text-[#2A2E35]/80 xl:flex lg:gap-6">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.hasDropdown && pathname?.startsWith(item.href));

                if (item.hasDropdown) {
                  return (
                    <DropdownMenu key={item.href}>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={`relative inline-flex whitespace-nowrap items-center gap-1 pb-0.5 transition-colors ${
                            isActive
                              ? "font-semibold text-[#2f558f]"
                              : "hover:text-[#2f558f]"
                          }`}
                        >
                          {item.label}
                          <ChevronDown className="w-3 h-3" />
                          {isActive && (
                            <span className="absolute -bottom-1 left-0 h-0.5 w-[22px] rounded-full bg-[#3F7F72]" />
                          )}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="min-w-[200px]">
                        {servicesSubItems.map((subItem) => (
                          <DropdownMenuItem key={subItem.href} asChild>
                            <Link
                              href={subItem.href}
                              className={`w-full ${pathname === subItem.href ? "bg-slate-100 font-semibold" : ""}`}
                            >
                              {subItem.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative whitespace-nowrap pb-0.5 transition-colors ${
                      isActive
                        ? "font-semibold text-[#2f558f]"
                        : "hover:text-[#2f558f]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-[22px] rounded-full bg-[#3F7F72]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-shrink-0 items-center gap-1.5 md:gap-2">
              <div className="hidden items-center gap-2 md:flex">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-2xl border-[#c7d5ea] bg-[#edf3fb] px-5 py-2 text-[0.82rem] font-semibold text-[#2f558f] hover:bg-[#e4eefb] whitespace-nowrap"
                >
                  <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    WhatsApp Support
                  </Link>
                </Button>
                <Button
                  asChild
                  className="rounded-2xl border border-[#2f558f] bg-[#2f558f] px-5 py-2 text-[0.82rem] font-semibold text-white shadow-[0_10px_24px_rgba(46,83,142,0.28)] hover:border-[#3F7F72] hover:bg-[#3F7F72] hover:shadow-lg hover:shadow-[0_14px_32px_rgba(63,127,114,0.24)] whitespace-nowrap"
                >
                  <Link href="/contact">Book 1:1 Expert Call</Link>
                </Button>
              </div>

              <div className="xl:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Toggle menu"
                      className="h-11 w-11 flex-shrink-0 text-[#2f558f] hover:bg-[#eef3fb]"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-72 border-l border-[#d2deef] bg-white">
                    <div className="mt-6 flex flex-col gap-4">
                      {navItems.map((item) => (
                        <div key={item.href}>
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className={`block text-base font-medium ${
                                pathname === item.href
                                  ? "font-semibold text-[#1F3A5F]"
                                  : "text-[color:var(--brand-ink)]"
                              }`}
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                          {item.hasDropdown && (
                            <div className="ml-4 mt-2 flex flex-col gap-2">
                              {servicesSubItems.map((subItem) => (
                                <SheetClose key={subItem.href} asChild>
                                  <Link
                                    href={subItem.href}
                                    className={`text-sm ${
                                      pathname === subItem.href ||
                                      (subItem.href === "/services" &&
                                        pathname.startsWith("/services") &&
                                        !pathname.includes("/services/"))
                                        ? "font-semibold text-[#1F3A5F]"
                                        : "text-[color:var(--muted-foreground)]"
                                    }`}
                                  >
                                    {subItem.label}
                                  </Link>
                                </SheetClose>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 border-t border-[#d5deee] pt-4">
                      <div className="flex flex-col gap-2">
                        <SheetClose asChild>
                          <Button
                            asChild
                            variant="outline"
                            className="w-full justify-center whitespace-nowrap rounded-2xl border-[#c7d5ea] bg-[#edf3fb] px-4 py-2 text-[0.82rem] font-semibold text-[#2f558f] hover:bg-[#e4eefb]"
                          >
                            <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                              WhatsApp Support
                            </Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            asChild
                            className="w-full justify-center whitespace-nowrap rounded-2xl border border-[#2f558f] bg-[#2f558f] px-4 py-2 text-[0.82rem] font-semibold text-white shadow-[0_10px_24px_rgba(46,83,142,0.28)] hover:bg-[#1F3A5F]"
                          >
                            <Link href="/contact">Book 1:1 Expert Call</Link>
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

