import Link from "next/link";

const policyCards = [
  {
    value: "₹1 Lakh",
    label: "Monthly UPI receipts threshold",
    description:
      "Merchants receiving ₹1 lakh or less per month through UPI are exempt under the policy.",
    tone: "green",
  },
  {
    value: "₹2,000",
    label: "Transaction threshold",
    description:
      "MDR applies to applicable person-to-merchant transactions above ₹2,000.",
    tone: "blue",
  },
  {
    value: "0.4%",
    label: "MDR rate",
    description:
      "Applicable transactions have a 0.4% MDR, capped at ₹300 per transaction.",
    tone: "orange",
  },
];

const steps = [
  {
    number: "01",
    title: "Enter your numbers",
    description: "Share three simple details about your UPI collections.",
  },
  {
    number: "02",
    title: "Rules check",
    description: "The rules engine checks your inputs against the policy.",
  },
  {
    number: "03",
    title: "Understand your status",
    description: "See a clear explanation in language that is easy to follow.",
  },
  {
    number: "04",
    title: "Get a certificate",
    description: "Save and share a simple summary of your result.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="border-b border-[#dce6e3] bg-[#f7faf8]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="MDR Sathi home">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0e6658] text-lg font-bold text-white shadow-sm">
              M
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-bold tracking-tight text-[#123d37]">
                MDR Sathi
              </span>
              <span className="hidden text-[11px] font-medium tracking-wide text-[#59736e] sm:block">
                UPI Impact &amp; Trust Assistant
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-[#45625d] md:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-[#0e6658]" href="#policy">
              Policy basics
            </a>
            <a className="transition-colors hover:text-[#0e6658]" href="#how-it-works">
              How it works
            </a>
          </nav>
          <Link
            href="/check"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-[#0e6658] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0a5146] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658] sm:px-5"
          >
            Check My Status
          </Link>
        </div>
      </header>

      <section className="overflow-hidden bg-[#f7faf8]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#b8d9d0] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0e6658]">
              <span className="h-2 w-2 rounded-full bg-[#2f9b72]" aria-hidden="true" />
              Made for Indian merchants
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#123d37] sm:text-5xl lg:text-[4.25rem]">
              Know your UPI impact in 30 seconds.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#4d6863] sm:text-lg sm:leading-8">
              MDR Sathi helps you understand whether the UPI MDR policy affects your business, in simple language and without confusing terms.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/check"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0e6658] px-6 text-base font-semibold text-white shadow-[0_5px_0_#08483f] transition-all hover:-translate-y-0.5 hover:bg-[#0a5146] hover:shadow-[0_6px_0_#08483f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]"
              >
                Check My Status <span className="ml-2" aria-hidden="true">-&gt;</span>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex min-h-12 items-center justify-center rounded-lg px-5 text-sm font-semibold text-[#0e6658] transition-colors hover:bg-[#e6f1ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]"
              >
                See how it works <span className="ml-2" aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="mt-5 text-xs leading-5 text-[#6d827e]">
              Takes about 30 seconds. No account or documents needed.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-label="A preview of a clear policy result">
            <div className="rounded-2xl border border-[#c9dfd8] bg-white p-5 shadow-[0_18px_50px_rgba(24,77,67,0.12)] sm:p-7">
              <div className="flex items-start justify-between border-b border-[#e4eeeb] pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#718580]">Your UPI status</p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-[#123d37]">Clear and simple</p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e4f5ec] text-xl text-[#19734e]" aria-hidden="true">✓</span>
              </div>
              <div className="space-y-4 py-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#617772]">Monthly UPI receipts</span>
                  <span className="text-sm font-bold text-[#123d37]">₹84,500</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#e5efec]"><div className="h-full w-[68%] rounded-full bg-[#41a978]" /></div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#617772]">Policy threshold</span>
                  <span className="text-sm font-bold text-[#123d37]">₹1,00,000</span>
                </div>
              </div>
              <div className="rounded-xl bg-[#f0f8f4] px-4 py-3 text-sm leading-6 text-[#28634c]">
                Your result comes with a plain-language explanation you can save or share.
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 hidden rounded-lg border border-[#ead9bd] bg-[#fffaf0] px-4 py-3 text-xs font-semibold text-[#805c2a] shadow-sm sm:block lg:-left-7">
              Effective 15 October 2026
            </div>
          </div>
        </div>
      </section>

      <section id="policy" className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0e6658]">Policy at a glance</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#123d37] sm:text-4xl">Three numbers worth knowing.</h2>
            <p className="mt-4 text-base leading-7 text-[#607671]">The rules can feel complicated. These are the key thresholds to keep in mind.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {policyCards.map((card) => (
              <article key={card.value} className={`rounded-xl border p-6 ${card.tone === "green" ? "border-[#bcded0] bg-[#f1f9f4]" : card.tone === "blue" ? "border-[#cbdce8] bg-[#f3f8fb]" : "border-[#ead9bd] bg-[#fffaf2]"}`}>
                <p className={`text-3xl font-bold tracking-tight ${card.tone === "green" ? "text-[#19734e]" : card.tone === "blue" ? "text-[#28627f]" : "text-[#946324]"}`}>{card.value}</p>
                <h3 className="mt-4 text-base font-bold text-[#123d37]">{card.label}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5e746f]">{card.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#607671]">Policy effective from <strong className="font-semibold text-[#123d37]">15 October 2026</strong>.</p>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-[#dce6e3] bg-[#f7faf8] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0e6658]">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#123d37] sm:text-4xl">A quick check. A clear answer.</h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-4 md:gap-5">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="flex items-center gap-4 md:block">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#9ccbbd] bg-white text-sm font-bold text-[#0e6658]">{step.number}</span>
                  <h3 className="text-base font-bold text-[#123d37] md:mt-5">{step.title}</h3>
                </div>
                <p className="ml-[60px] mt-2 text-sm leading-6 text-[#607671] md:ml-0">{step.description}</p>
                {index < steps.length - 1 && <span className="absolute right-0 top-5 hidden text-xl text-[#a1bdb5] md:block" aria-hidden="true">-&gt;</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0e6658]">Built for clarity</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-[#123d37] sm:text-4xl">Policy information should work for you.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#607671]">Built to turn confusing policy information into a clear answer for merchants. MDR Sathi uses a rules engine to check the information you provide and explain the result without jargon.</p>
          </div>
          <div className="rounded-xl border border-[#dce6e3] bg-[#f7faf8] p-6 sm:p-7">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#dcefe8] text-lg text-[#0e6658]" aria-hidden="true">i</span>
              <div>
                <h3 className="font-bold text-[#123d37]">Rules engine, plain-language result</h3>
                <p className="mt-2 text-sm leading-6 text-[#607671]">Your information is checked against the current policy rules. The backend is the source of truth for every calculation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#123d37] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="max-w-4xl text-sm leading-6 text-[#d3e4df]"><strong className="font-semibold text-white">Please note:</strong> MDR Sathi provides informational guidance based on the transaction information provided. It is not financial, tax, or legal advice.</p>
        </div>
      </section>

      <footer className="bg-[#0d302b] px-5 py-8 text-[#b9d0ca] sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold text-white">MDR Sathi</p>
          <p className="text-xs leading-5">Informational guidance for Indian merchants. Policy details may change.</p>
        </div>
      </footer>
    </main>
  );
}
