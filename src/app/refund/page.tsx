import type { Metadata } from "next";
import { PublicPageContainer, PublicPageFrame, PublicPageHero } from "@/components/layout/PublicPageFrame";

const REFUND_PDF_HREF = "/re4u-refund-and-cancellation-policy.pdf";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | ResearchEdit4U",
  description: "Refund & Cancellation Policy for ResearchEdit4U Solutions Private Limited.",
};

export default function RefundPolicyPage() {
  return (
    <PublicPageFrame>
      <PublicPageHero
        kicker="Legal"
        title="Refund & Cancellation Policy"
        description="Refunds and cancellations are governed by this Policy because our services reserve expert time and customised work."
      />

      <PublicPageContainer>
        <section
          id="refund"
          className="rounded-2xl border border-[#A8C7E6]/60 bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
          aria-label="Refund and cancellation policy details"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="m-0 text-lg font-bold text-[#1F3A5F]">ResearchEdit4U Solutions Private Limited</h2>
              <p className="mb-0 mt-1 text-sm text-[#2A2E35]/75">
                Website:{" "}
                <a
                  href="https://www.researchedit4u.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline"
                >
                  www.researchedit4u.in
                </a>
              </p>
            </div>

            <a
              href={REFUND_PDF_HREF}
              download
              className="inline-flex items-center rounded-2xl border border-[#1F3A5F] bg-[#1F3A5F] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(31,58,95,0.22)] transition duration-300 hover:scale-105 hover:bg-[#3F7F72]"
            >
              Download PDF
            </a>
          </div>

          <p className="mt-5 text-sm leading-[1.7] text-[#2A2E35]/80">
            At ResearchEdit4U Solutions Private Limited (&quot;ResearchEdit4U&quot;, &quot;RE4U&quot;,
            &quot;we&quot;, &quot;our&quot;, &quot;us&quot;), we aim to maintain a fair, transparent, and
            value-based service process for every client. Since most of our services involve expert time,
            intellectual effort, customised work, and reserved delivery slots, refunds and cancellations are
            governed by the following policy.
          </p>

          <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm leading-[1.75] text-[#2A2E35]/80 [&>li::marker]:text-base [&>li::marker]:font-bold [&>li::marker]:text-[#1F3A5F]">
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Nature of Services</span>
              <p className="mt-1">
                Our services are customised, expert-led, and time-based. These may include editorial support,
                research support, formatting, journal support, analysis, consultation, presentation support,
                review support, and related academic or professional services. Because work usually begins with
                expert review, allocation, planning, or drafting, not all orders are eligible for full refund
                after confirmation.
              </p>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">When an Order Is Considered Confirmed</span>
              <p className="mt-1">An order is treated as confirmed once any one of the following happens:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>the client makes advance or full payment;</li>
                <li>the client approves a quotation or proposal in writing;</li>
                <li>the client shares files and confirms commencement;</li>
                <li>we reserve expert time, project slot, or urgent delivery resources for the assignment.</li>
              </ul>
              <p className="mt-2">
                Once confirmed, the project enters scheduling, expert allocation, and internal processing.
              </p>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Cancellation by Client</span>
              <p className="mt-1">
                A client may request cancellation by email or other approved written channel. Cancellation will
                be effective only after written acknowledgement from us.
              </p>
              <div className="mt-3 grid gap-3">
                <div className="rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
                  <p className="m-0 text-xs font-semibold text-[#1F3A5F]">3.1 Before work starts</p>
                  <p className="mb-0 mt-1">
                    If the client cancels before work has started and before expert allocation or project
                    scheduling, we may issue a refund after deducting payment gateway or bank charges, currency
                    conversion charges (if any), applicable taxes already deposited or payable, and
                    administrative processing charges.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
                  <p className="m-0 text-xs font-semibold text-[#1F3A5F]">3.2 After work starts</p>
                  <p className="mb-0 mt-1">
                    If cancellation is requested after work has started, refund will not be automatic. Any
                    refund, if approved, will be limited to the unworked portion only, after deducting work
                    already completed, expert time already blocked or used, review or analysis already performed,
                    project management and administrative costs, and transaction charges and taxes.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
                  <p className="m-0 text-xs font-semibold text-[#1F3A5F]">3.3 After partial delivery</p>
                  <p className="mb-0 mt-1">
                    If any draft, edited file, report, review comments, analysis output, shortlist, presentation,
                    consultation notes, or other deliverable has already been shared, that completed portion will
                    be treated as delivered work and will be chargeable.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
                  <p className="m-0 text-xs font-semibold text-[#1F3A5F]">3.4 Urgent or priority orders</p>
                  <p className="mb-0 mt-1">
                    Urgent, same-day, next-day, weekend, or priority orders are not eligible for full refund once
                    accepted, because resources are reserved immediately and other work is rescheduled to
                    accommodate them.
                  </p>
                </div>
              </div>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Non-Refundable Situations</span>
              <p className="mt-1">Refund will ordinarily not be given in the following cases:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>the client changes mind after confirming the order;</li>
                <li>the client no longer needs the service;</li>
                <li>the client delays in sharing files, data, feedback, approvals, or clarifications;</li>
                <li>the client misses a university, journal, conference, grant, or internal deadline;</li>
                <li>the client is dissatisfied with an external outcome such as rejection, low grades, reviewer comments, or supervisor disagreement;</li>
                <li>the client requests cancellation after substantial work has already been done;</li>
                <li>the client asks for work outside the original scope and then refuses revised pricing;</li>
                <li>the client does not respond for a prolonged period after project initiation;</li>
                <li>the service involves consultation, review, assessment, screening, or any delivered expert opinion;</li>
                <li>an urgent or reserved-slot order has already been accepted.</li>
              </ul>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Limited Refund Situations</span>
              <p className="mt-1">A partial or full refund may be considered only where:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>we are unable to start the order for reasons solely attributable to us;</li>
                <li>we expressly decline the project after taking payment and before starting material work;</li>
                <li>duplicate payment is received;</li>
                <li>payment is received for a service that cannot be provided at all by us;</li>
                <li>there is a verified billing error from our side.</li>
              </ul>
              <p className="mt-2">
                Where a refund is approved, it shall be processed only to the original payment source unless
                otherwise required by law or banking rules.
              </p>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Revisions Instead of Refund</span>
              <p className="mt-1">
                Because our services are customised, genuine service concerns will normally be addressed first
                through revision, clarification, correction, or scope-based completion, not immediate refund.
                This is intended to protect both the client and the company.
              </p>
              <p className="mt-2">
                A client may request revision where the request is within the original agreed scope, is made
                within the communicated revision window, and is based on the original brief rather than newly
                added requirements.
              </p>
              <p className="mt-2">
                New sections, new data, new journal targets, major restructuring, additional rounds beyond the
                agreed scope, or changed instructions may be billed separately.
              </p>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Cancellation by ResearchEdit4U</span>
              <p className="mt-1">
                We reserve the right to pause, refuse, or cancel a project where the client provides false,
                misleading, unlawful, or unethical instructions; there is abusive, threatening, coercive, or
                disrespectful behaviour; the project creates legal, ethical, reputational, or compliance risk;
                the client repeatedly changes scope without approval; required files, permissions, or
                information are not provided; or payment is incomplete, reversed, disputed, or charged back.
              </p>
              <p className="mt-2">
                In such cases, any refund will be at our sole discretion after deducting the value of work
                already completed, time already allocated, and applicable charges.
              </p>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">No Refund for External Decisions</span>
              <p className="mt-1">
                We do not guarantee publication, journal acceptance, reviewer approval, institutional
                acceptance, grades, grant success, visa success, interview success, or any other third-party
                outcome. Therefore, negative or delayed decisions from journals, universities, conferences,
                supervisors, reviewers, institutions, or other third parties do not create an automatic right to
                refund.
              </p>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Chargebacks and Payment Disputes</span>
              <p className="mt-1">
                If a client initiates a chargeback, payment reversal, or bank dispute without first using our
                grievance process, we reserve the right to suspend all work and withhold further deliverables
                pending resolution.
              </p>
              <p className="mt-2">
                Where a chargeback is found to be false, abusive, or unsupported after services were delivered
                or substantially performed, we reserve all contractual and legal rights.
              </p>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Refund Processing Timeline</span>
              <p className="mt-1">
                If a refund is approved, it will normally be processed within 7 to 21 working days, subject to
                banking partner, gateway, and card issuer timelines. Taxes, gateway fees, foreign exchange
                charges, and non-recoverable charges may be deducted where applicable. Delays caused by banking
                systems, card networks, or intermediary platforms will be outside our control.
              </p>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Taxes and Charges</span>
              <p className="mt-1">
                All refunds, credits, and adjustments are subject to applicable tax treatment, payment gateway
                charges, bank deductions, and statutory compliance. Where invoice correction, credit note
                treatment, or tax adjustment is legally required, the same shall be handled accordingly.
              </p>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Grievance Redressal</span>
              <p className="mt-1">
                If a client has a concern regarding billing, cancellation, delivery, or refund, the client must
                first contact us in writing with full name, registered email or phone number, invoice or order
                reference, issue summary, and supporting documents. We will review the matter in good faith and
                aim to provide an initial acknowledgement promptly and a substantive response within a
                reasonable period.
              </p>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Fair Use and Anti-Abuse Protection</span>
              <p className="mt-1">
                To protect both genuine clients and our team, we may refuse refunds or future service where
                there is evidence of repeated bad-faith complaints after accepted delivery, repeated attempts to
                obtain free work through refund pressure, chargeback abuse, harassment or threats, misuse of
                draft work followed by a refund demand, or concealment of project requirements until after
                confirmation.
              </p>
            </li>

            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Governing Law</span>
              <p className="mt-1">
                This Policy shall be governed by the laws of India. Any dispute arising from or relating to
                payments, cancellations, refunds, or service issues shall be subject to the jurisdiction clause
                stated in our Terms &amp; Conditions.
              </p>
              <div className="mt-3 rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
                <p className="m-0 text-sm font-semibold text-[#1F3A5F]">Recommended operational note</p>
                <p className="mb-0 mt-1">
                  By making payment, the client confirms acceptance of the company’s Terms &amp; Conditions,
                  Refund Policy, and scope of service as communicated in the approved quotation or order
                  confirmation.
                </p>
              </div>
            </li>
          </ol>
        </section>
      </PublicPageContainer>
    </PublicPageFrame>
  );
}

