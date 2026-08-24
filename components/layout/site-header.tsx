"use client";

import { List, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#plans", label: "Plans" },
  { href: "/faqs", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4 sm:pt-5">
      <Container>
        <div className="navbar-shell flex min-h-[4.7rem] items-center justify-between gap-5 rounded-[1.45rem] px-4 sm:px-6 lg:min-h-[5.8rem] lg:px-8">
          <Link
            aria-label="TradeUply home"
            className="relative z-10 flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)]"
            href="/"
          >
            <Image
              alt="TradeUply"
              className="h-auto w-[9.4rem] sm:w-[11.4rem] lg:w-[12.7rem]"
              height={580}
              priority
              src="/brand/tradeuply-logo.png"
              width={1621}
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 rounded-2xl border border-[var(--color-border)] bg-white/62 p-1.5 lg:flex"
          >
            {navigation.map((item, index) => (
              <Link
                aria-current={index === 0 ? "page" : undefined}
                className={cn(
                  "min-w-[6.2rem] rounded-xl px-4 py-3 text-center text-[length:var(--text-nav)] font-semibold transition",
                  index === 0
                    ? "bg-[var(--color-brand-soft)] text-[var(--color-brand-hover)]"
                    : "text-[var(--color-ink-soft)] hover:bg-slate-100 hover:text-[var(--color-ink)]",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              className="rounded-xl px-5 py-3 text-[length:var(--text-nav)] font-bold text-[var(--color-ink-soft)] transition hover:bg-slate-100 hover:text-[var(--color-ink)]"
              href="/login"
            >
              Log In
            </Link>
            <Link
              className="rounded-xl bg-[var(--color-brand)] px-5 py-3 text-[length:var(--text-nav)] font-extrabold text-white shadow-[0_10px_28px_rgba(6,184,102,0.2)] transition hover:-translate-y-0.5 hover:bg-[var(--color-brand-hover)]"
              href="/register"
            >
              Open Account
            </Link>
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            className="grid size-11 place-items-center rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-ink)] lg:hidden"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            {isOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </Container>

      <nav
        aria-label="Mobile navigation"
        className={cn(
          "mobile-menu absolute inset-x-5 top-[6.25rem] max-h-[calc(100dvh-7.5rem)] overflow-y-auto rounded-3xl p-5 transition duration-300 sm:inset-x-8 lg:hidden",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0",
        )}
        id="mobile-navigation"
      >
        <div className="grid gap-1">
          {navigation.map((item) => (
            <Link
              className="rounded-xl px-4 py-3.5 text-base font-bold text-[var(--color-ink-soft)] transition hover:bg-slate-100 hover:text-[var(--color-ink)]"
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-4 grid gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2">
          <Link
            className="rounded-xl border border-[var(--color-border)] px-5 py-3 text-center font-bold text-[var(--color-ink)]"
            href="/login"
            onClick={() => setIsOpen(false)}
          >
            Log In
          </Link>
          <Link
            className="rounded-xl bg-[var(--color-brand)] px-5 py-3 text-center font-extrabold text-white"
            href="/register"
            onClick={() => setIsOpen(false)}
          >
            Open Account
          </Link>
        </div>
      </nav>
    </header>
  );
}
