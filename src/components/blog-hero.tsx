import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BlogHero() {
  return (
    <section className="py-4 pb-2 sm:py-[18px] sm:pb-[10px]">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="overflow-hidden rounded-2xl border"
          style={{
            borderColor: "var(--border)",
            background: "var(--card)",
            boxShadow: "var(--shadow-blog)",
          }}
        >
          <div className="grid grid-cols-1 items-stretch gap-3 p-3 sm:gap-4 sm:p-4 md:grid-cols-[1.35fr_.85fr]">
            <div
              className="flex min-h-[240px] flex-col justify-between rounded-2xl border p-3 sm:min-h-[260px] sm:p-[18px]"
              style={{
                borderColor: "rgb(168 199 230 / 0.6)",
                background: "rgba(255,255,255,.85)",
                boxShadow: "0 10px 20px rgba(42,46,53,.06)",
              }}
            >
              <div>
                <div
                  className="inline-flex w-max items-center gap-1.5 rounded-full border px-2 py-1.5 text-[10px] font-extrabold sm:gap-2.5 sm:px-3 sm:py-2 sm:text-xs"
                  style={{
                    borderColor: "rgb(168 199 230 / 0.65)",
                    background: "rgba(255,255,255,.72)",
                    color: "rgba(42,46,53,.82)",
                  }}
                >
                  <span
                    className="h-[7px] w-[7px] rounded-full sm:h-[9px] sm:w-[9px]"
                    style={{ background: "rgba(63,127,114,.9)" }}
                  />
                  RE Minds
                </div>
                <h1 className="mb-1 mt-2.5 text-2xl font-bold leading-[1.06] tracking-[-0.6px] sm:mb-1.5 sm:mt-3.5 sm:text-[34px]">
                  Practical guides for <span style={{ color: "#3F7F72" }}>academic success</span>.
                </h1>
                <p
                  className="mb-2.5 mt-0 max-w-[60ch] text-sm font-[650] leading-[1.45] sm:mb-3.5 sm:text-base"
                  style={{ color: "rgba(42,46,53,.72)" }}
                >
                  From desk rejection prevention to journal selection and AI/similarity management-actionable
                  insights to strengthen your submission strategy.
                </p>
              </div>
              <div
                className="mt-2 rounded-xl border p-2 sm:mt-3 sm:rounded-2xl sm:p-3"
                style={{
                  borderColor: "rgb(168 199 230 / 0.55)",
                  background: "rgba(233,227,213,.32)",
                }}
              >
                <div
                  className="w-full rounded-xl bg-gradient-to-br from-[#A8C7E6] to-[#3F7F72]/55 p-4 text-center text-sm sm:rounded-2xl sm:p-8"
                  style={{ color: "var(--muted-blog)" }}
                >
                  <p className="text-xs sm:text-sm">Blog roadmap visualization</p>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col rounded-2xl border bg-white/85 p-3 sm:p-[18px]"
              style={{
                borderColor: "rgb(168 199 230 / 0.6)",
                boxShadow: "0 10px 20px rgba(42,46,53,.06)",
              }}
            >
              <h3 className="mb-2 text-base sm:text-lg">Get updates</h3>
              <ul
                className="mb-2 pl-3 text-sm font-[650] sm:mb-3 sm:pl-[18px] sm:text-base"
                style={{ color: "rgba(42,46,53,.74)" }}
              >
                <li>New guides weekly</li>
                <li>Journal selection tips</li>
                <li>Rejection prevention</li>
              </ul>
              <div className="field mt-2 sm:mt-2.5">
                <label
                  htmlFor="blog-email"
                  className="mb-1 block text-[10px] font-extrabold sm:mb-1.5 sm:text-xs"
                  style={{ color: "rgba(42,46,53,.72)" }}
                >
                  Email
                </label>
                <Input
                  id="blog-email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full rounded-full border bg-white px-3 py-2 text-sm focus:border-[#3F7F72]/45 focus:shadow-[0_0_0_6px_rgba(63,127,114,.10)] sm:px-3.5 sm:py-3"
                  style={{ borderColor: "rgb(168 199 230 / 0.65)" }}
                />
                <p
                  className="mt-2 text-[10px] font-[750] sm:mt-2.5 sm:text-xs"
                  style={{ color: "rgba(42,46,53,.62)" }}
                >
                  Unsubscribe anytime - Privacy-respectful
                </p>
              </div>
              <Button
                type="button"
                className="mt-2.5 w-full cursor-pointer rounded-2xl border-0 bg-[#1F3A5F] px-3 py-2 text-sm font-extrabold text-white hover:bg-[#3F7F72] sm:mt-3.5 sm:px-4 sm:py-3 sm:text-base"
                style={{ boxShadow: "0 14px 22px rgba(31,58,95,.18)" }}
              >
                Notify me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
