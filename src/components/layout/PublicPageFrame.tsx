import type { ReactNode } from "react";
import Link from "next/link";

type PageAction = {
  href: string;
  label: string;
  variant?: "primary" | "outline";
};

export function PublicPageFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen py-10 md:py-12"
      style={{
        background:
          "radial-gradient(1100px 520px at 20% -10%, rgba(168,199,230,.22), transparent 60%), radial-gradient(900px 520px at 90% -10%, rgba(63,127,114,.14), transparent 55%), linear-gradient(180deg, #ffffff, rgba(233,227,213,.52))",
      }}
    >
      {children}
    </div>
  );
}

export function PublicPageContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl px-6">{children}</div>;
}

export function PublicPageHero({
  kicker,
  title,
  description,
  actions,
}: {
  kicker: string;
  title: string;
  description: string;
  actions?: PageAction[];
}) {
  return (
    <section className="mb-6">
      <PublicPageContainer>
        <div className="rounded-2xl border border-[#A8C7E6]/55 bg-white p-6 shadow-md transition duration-300 hover:shadow-xl">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#2A2E35]/70">{kicker}</p>
          <h1 className="m-0 text-3xl font-bold tracking-[-0.02em] md:text-[40px]">{title}</h1>
          <p className="mt-2.5 max-w-[760px] text-[15px] leading-relaxed text-[#2A2E35]/80">
            {description}
          </p>
          {actions?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {actions.map((action) => (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className={`inline-flex items-center rounded-2xl border px-6 py-3 text-sm font-semibold transition duration-300 hover:scale-105 ${
                    action.variant === "outline"
                      ? "border-[#A8C7E6] bg-white text-[#1F3A5F] hover:bg-[#E9E3D5]"
                      : "border-[#1F3A5F] bg-[#1F3A5F] text-white hover:bg-[#3F7F72]"
                  }`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </PublicPageContainer>
    </section>
  );
}
