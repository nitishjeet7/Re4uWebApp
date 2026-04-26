import type { Metadata } from "next";
import { PublicPageContainer, PublicPageFrame, PublicPageHero } from "@/components/layout/PublicPageFrame";

const TERMS_PDF_HREF = "/re4u-terms-and-conditions.pdf";

export const metadata: Metadata = {
  title: "Terms & Conditions | ResearchEdit4U",
  description: "Terms & Conditions for ResearchEdit4U Solutions Private Limited.",
};

export default function TermsPage() {
  return (
    <PublicPageFrame>
      <PublicPageHero
        kicker="Legal"
        title="Terms & Conditions"
        description="These Terms govern your purchase, booking, or use of any ResearchEdit4U service."
      />

      <PublicPageContainer>
        <section
          id="terms"
          className="rounded-2xl border border-[#A8C7E6]/60 bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
          aria-label="Terms and conditions details"
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
              href={TERMS_PDF_HREF}
              download
              className="inline-flex items-center rounded-2xl border border-[#1F3A5F] bg-[#1F3A5F] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(31,58,95,0.22)] transition duration-300 hover:scale-105 hover:bg-[#3F7F72]"
            >
              Download PDF
            </a>
          </div>

          <p className="mt-5 text-sm leading-[1.7] text-[#2A2E35]/80">
            By purchasing, booking, or using any service from ResearchEdit4U Solutions Private Limited
            (&quot;ResearchEdit4U&quot;, &quot;RE4U&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;),
            the client (&quot;you&quot;, &quot;your&quot;) agrees to the following Terms &amp; Conditions.
          </p>

          <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm leading-[1.75] text-[#2A2E35]/80 [&>li::marker]:text-base [&>li::marker]:font-bold [&>li::marker]:text-[#1F3A5F]">
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Scope of Services</span>
              <p className="mt-1">
                ResearchEdit4U provides academic, editorial, publication, research-support, formatting,
                analysis, presentation, and related professional assistance services. Our support is advisory,
                editorial, technical, and service-based in nature. We do not claim authorship of the client’s
                work, and final responsibility for the content always remains with the client.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Client Responsibility</span>
              <p className="mt-1">
                You confirm that all information, files, raw data, instructions, permissions, and materials
                shared with us are accurate, lawfully obtained, and legally owned or authorised for use by you.
                You remain solely responsible for the originality, scientific validity, ethical compliance,
                authorship, institutional compliance, journal compliance, and final submission of your work.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">
                No Guarantee of Academic, Editorial, or Publication Outcome
              </span>
              <p className="mt-1">
                We do not guarantee publication, acceptance, grades, supervisor approval, reviewer approval,
                funding, citations, indexing, visa outcomes, employment outcomes, or any specific result. Any
                decision by a journal, institution, university, examiner, conference, reviewer, ethics
                committee, or third party is outside our control.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Ethical Use of Services</span>
              <p className="mt-1">
                Our services are intended to support lawful, ethical, and responsible academic and research
                activity. Clients must not use our services for fraud, impersonation, fabricated data, falsified
                authorship, plagiarism, unethical submission practices, or any activity that violates
                institutional, academic, publisher, or legal requirements. We reserve the right to refuse, pause,
                or terminate service if we reasonably suspect unethical, misleading, unlawful, or abusive use.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Delivery Timelines</span>
              <p className="mt-1">
                Estimated timelines are shared based on the project scope and information available at the time
                of confirmation. Timelines begin only after receipt of complete materials, confirmed
                instructions, and applicable payment. Delays caused by incomplete files, changing instructions,
                slow client responses, third-party systems, journals, universities, or force majeure events shall
                extend delivery time accordingly.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Revisions</span>
              <p className="mt-1">
                We provide revisions only within the originally agreed scope of work. Revision requests must be
                based on the initial brief and submitted within the revision window communicated for that
                service. Any new requirement, change in objective, extra section, additional analysis, new
                journal target, new formatting style, or major restructuring shall be treated as additional work
                and may be charged separately.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Payments</span>
              <p className="mt-1">
                All services are chargeable as per the agreed quotation, invoice, package, or custom proposal.
                Work may begin only after advance payment or full payment, as applicable. Fees once paid for
                completed work, time blocked, consultation, urgent allocation, or partially delivered milestones
                are generally non-refundable except where we expressly approve otherwise in writing.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Refund Policy</span>
              <p className="mt-1">
                Refunds will not be issued merely because a client changes mind, misses a deadline, no longer
                needs the service, receives an unfavourable academic or publication decision, or disagrees with
                a third-party outcome. If a refund is considered by us, it will be limited strictly to the
                portion of work not yet started or not yet delivered, after deducting work already completed,
                expert time allocated, transaction charges, and administrative costs. Any approved refund
                decision by ResearchEdit4U shall be final.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Urgent Orders</span>
              <p className="mt-1">
                Urgent, priority, or fast-track orders are accepted subject to availability. Such orders may
                attract higher fees. Once accepted, urgent allocation and scheduling charges are non-refundable
                because expert resources are reserved immediately.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Intellectual Property and Usage</span>
              <p className="mt-1">
                All files, edits, reports, comments, designs, presentations, review notes, analyses, templates,
                strategies, and service outputs prepared by us remain our intellectual property until full
                payment is received. Upon full payment, the client receives a limited right to use the final
                delivered material for personal, academic, or professional use related to the agreed purpose.
                Internal methods, process documents, review frameworks, pricing structure, and proprietary
                workflows remain the property of ResearchEdit4U.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Confidentiality</span>
              <p className="mt-1">
                We treat client materials as confidential and will take reasonable steps to protect them. We do
                not disclose client files to unrelated third parties except where needed for internal service
                delivery, legal compliance, payment processing, or where disclosure is required by law. We may
                keep internal records, communication logs, and versions for quality control, training,
                compliance, dispute handling, and service improvement.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Data, Similarity, AI, and Compliance Tools</span>
              <p className="mt-1">
                Where similarity checks, AI-detection checks, language tools, formatting tools, or screening
                tools are used, they are used as support tools only. Reports from such tools are indicative, not
                absolute. We do not guarantee any fixed similarity score, AI-detection score, or institutional
                interpretation of such reports, as these depend on third-party tools, document versions, and
                external review settings.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Journal Submission and Research Support Limits</span>
              <p className="mt-1">
                Where services involve journal matching, submission assistance, reviewer response support,
                formatting, or publication support, our role is limited to the scope agreed in writing. We do
                not control editorial decisions, reviewer comments, journal timelines, article processing
                charges, indexing decisions, or post-submission platform behaviour. For research support,
                analysis, or interpretation-related services, the client remains responsible for final
                scientific judgment, supervisor approval, and field-specific validation.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Communication and Approval</span>
              <p className="mt-1">
                All project decisions shall be based on the latest written instructions shared by the client
                through approved communication channels. Verbal discussions, informal messages, or unclear
                instructions shall not bind us unless confirmed in writing. The client must review all
                deliverables before submission or use. Use or submission of the delivered material shall be
                deemed acceptance of the work.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Limitation of Liability</span>
              <p className="mt-1">
                To the maximum extent permitted by law, ResearchEdit4U shall not be liable for any indirect,
                incidental, special, reputational, academic, publication-related, or consequential loss arising
                from use of our services. Our total liability, if any, shall not exceed the amount actually paid
                by the client for the specific service giving rise to the claim.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Right to Refuse or Suspend Service</span>
              <p className="mt-1">
                We reserve the right to refuse, suspend, or cancel a project where there is abusive behaviour,
                non-payment, unethical intent, repeated scope changes, harassment, legal risk, false claims,
                reputational threat, or misuse of our team or services.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Non-Disparagement and Fair Resolution</span>
              <p className="mt-1">
                If any issue arises, the client agrees to first contact us directly and provide a reasonable
                opportunity to review and resolve the concern in good faith. Public complaints, chargebacks,
                threats, or defamatory statements made without first seeking resolution may be treated as a
                breach of these Terms.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Governing Law and Jurisdiction</span>
              <p className="mt-1">
                These Terms shall be governed by the laws of India. Any dispute arising from or related to our
                services shall be subject to the exclusive jurisdiction of the competent courts where
                ResearchEdit4U Solutions Private Limited is registered or operates, unless otherwise decided by
                us in writing.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Updates to Terms</span>
              <p className="mt-1">
                We may revise these Terms from time to time. The version in force on the date of service
                confirmation or payment shall apply to that order unless otherwise communicated.
              </p>
            </li>
            <li>
              <span className="text-xs font-semibold leading-5 text-[#1F3A5F]">Acceptance</span>
              <p className="mt-1">
                By making payment, sharing files for a paid project, approving a quotation, or using our
                services, you acknowledge that you have read, understood, and agreed to these Terms &amp;
                Conditions.
              </p>
            </li>
          </ol>

          <div className="mt-6 rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
            <p className="m-0 text-sm font-semibold text-[#1F3A5F]">Client acknowledgement</p>
            <p className="mb-0 mt-1 text-sm leading-[1.7] text-[#2A2E35]/75">
              By proceeding, you confirm that you have read and accepted the Terms &amp; Conditions of
              ResearchEdit4U Solutions Private Limited.
            </p>
          </div>
        </section>
      </PublicPageContainer>
    </PublicPageFrame>
  );
}
