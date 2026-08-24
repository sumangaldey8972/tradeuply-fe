import {
  ArrowRight,
  ChartLine,
  CheckCircle,
  ClipboardText,
  Wallet,
  UserPlus,
} from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/container";

const journeySteps = [
  {
    description:
      "Set up your profile, complete the required checks, and define your investment preferences.",
    eyebrow: "Get started",
    icon: UserPlus,
    number: "01",
    title: "Create your account",
  },
  {
    description:
      "Compare minimum amounts, risk levels, time horizons, and strategy mixes side by side.",
    eyebrow: "Choose your path",
    icon: ClipboardText,
    number: "02",
    title: "Choose an investment plan",
  },
  {
    description:
      "Add your chosen investment amount and review the complete plan terms before confirming.",
    eyebrow: "Build your portfolio",
    icon: Wallet,
    number: "03",
    title: "Fund your investment",
  },
  {
    description:
      "Follow portfolio activity and performance reporting through one clear account view.",
    eyebrow: "Stay informed",
    icon: ChartLine,
    number: "04",
    title: "Track your progress",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="relative scroll-mt-28 overflow-hidden bg-white py-20 sm:py-24 lg:py-32"
      id="how-it-works"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-px w-[min(90%,80rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -top-44 -right-44 size-[28rem] rounded-full bg-[var(--color-brand)]/[0.055] blur-3xl"
      />

      <Container>
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-[length:var(--text-small)] font-extrabold tracking-[0.28em] text-[var(--color-brand-hover)] uppercase">
            How TradeUply Works
          </p>
          <h2
            className="mt-5 text-balance text-[length:var(--text-h2)] leading-[1.08] font-extrabold tracking-[-0.045em] text-[var(--color-ink)]"
            id="how-it-works-title"
          >
            Investing made clear from the first step.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[length:var(--text-body-lg)] leading-[1.75] font-medium text-[var(--color-text-muted)]">
            Move from registration to portfolio tracking through a clear, structured
            process designed to keep every decision easy to understand.
          </p>
        </header>

        <ol className="relative mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-4">
          <div
            aria-hidden="true"
            className="absolute top-[4.5rem] right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-transparent via-[#b8ccc1] to-transparent lg:block"
          />

          {journeySteps.map(({ description, eyebrow, icon: Icon, number, title }, index) => (
            <li
              className="group relative flex min-h-[21rem] flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_18px_55px_rgba(18,45,72,0.055)] transition duration-300 hover:-translate-y-1 hover:border-[#a7cdb8] hover:shadow-[0_24px_65px_rgba(18,45,72,0.1)] sm:p-7"
              key={number}
            >
              <div className="relative z-10 flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-[var(--color-brand-soft)] text-[var(--color-brand-hover)] transition duration-300 group-hover:bg-[var(--color-brand)] group-hover:text-white">
                  <Icon aria-hidden="true" size={28} weight="duotone" />
                </span>
                <span className="font-mono text-sm font-bold tracking-[0.16em] text-[#8aa194]">
                  {number}
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs font-extrabold tracking-[0.15em] text-[var(--color-brand-hover)] uppercase">
                  {eyebrow}
                </p>
                <h3 className="mt-3 text-[length:var(--text-h3)] leading-[1.2] font-extrabold tracking-[-0.035em] text-[var(--color-ink)]">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-6 font-medium text-[var(--color-text-muted)]">
                  {description}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between pt-7">
                <span className="inline-flex items-center gap-2 text-xs font-extrabold text-[var(--color-ink-soft)]">
                  <CheckCircle aria-hidden="true" className="text-[var(--color-brand)]" size={18} weight="fill" />
                  Step {index + 1} of 4
                </span>
                {index < journeySteps.length - 1 ? (
                  <span className="grid size-9 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-ink)] transition group-hover:border-[var(--color-brand)] group-hover:bg-[var(--color-brand)] group-hover:text-white">
                    <ArrowRight aria-hidden="true" size={16} weight="bold" />
                  </span>
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-brand)] shadow-[0_0_0_6px_var(--color-brand-soft)]" />
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[1.75rem] bg-[var(--color-ink)] px-6 py-7 text-white sm:flex-row sm:items-center sm:px-9 lg:mt-8 lg:px-11">
          <div>
            <p className="text-xs font-extrabold tracking-[0.18em] text-[#6ce5a9] uppercase">
              Clear from day one
            </p>
            <p className="mt-2 max-w-2xl text-pretty text-base leading-7 font-semibold text-white/80">
              Transparent plan details and a structured path help you make informed
              investment decisions without unnecessary complexity.
            </p>
          </div>
          <a
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#08c971]"
            href="#plans"
          >
            Compare investment plans
            <ArrowRight aria-hidden="true" size={17} weight="bold" />
          </a>
        </div>
      </Container>
    </section>
  );
}
