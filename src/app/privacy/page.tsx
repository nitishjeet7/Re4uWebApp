import type { Metadata } from "next";
import { PublicPageContainer, PublicPageFrame, PublicPageHero } from "@/components/layout/PublicPageFrame";

const PRIVACY_PDF_HREF = "/re4u-privacy-policy.pdf";

export const metadata: Metadata = {
  title: "Privacy Policy | ResearchEdit4U",
  description: "Privacy Policy for ResearchEdit4U Solutions Private Limited.",
};

function SectionTitle({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="m-0 flex items-baseline gap-2">
      <span className="text-base font-bold tabular-nums text-[#1F3A5F]">{n}.</span>
      <span className="text-xs font-bold leading-5 text-[#1F3A5F]">{title}</span>
    </h2>
  );
}

export default function PrivacyPage() {
  return (
    <PublicPageFrame>
      <PublicPageHero
        kicker="Legal"
        title="Privacy Policy"
        description="This Policy explains how we collect, use, store, disclose, protect, and retain personal data when you interact with ResearchEdit4U."
      />

      <PublicPageContainer>
        <section
          id="privacy"
          className="rounded-2xl border border-[#A8C7E6]/60 bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
          aria-label="Privacy policy details"
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
              href={PRIVACY_PDF_HREF}
              download
              className="inline-flex items-center rounded-2xl border border-[#1F3A5F] bg-[#1F3A5F] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(31,58,95,0.22)] transition duration-300 hover:scale-105 hover:bg-[#3F7F72]"
            >
              Download PDF
            </a>
          </div>

          <div className="mt-5 grid gap-3 rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4 text-sm text-[#2A2E35]/80 md:grid-cols-2">
            <div>
              <p className="m-0">
                <span className="font-semibold text-[#1F3A5F]">Effective date:</span> 1st October 2025
              </p>
              <p className="mb-0 mt-1">
                <span className="font-semibold text-[#1F3A5F]">Last updated:</span> 1st April 2026
              </p>
            </div>
            <div>
              <p className="m-0">
                <span className="font-semibold text-[#1F3A5F]">Primary contact:</span>{" "}
                <a
                  href="mailto:info@researchedit4u.in"
                  className="font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline"
                >
                  info@researchedit4u.in
                </a>{" "}
                | +91 8093778526
              </p>
              <p className="mb-0 mt-1">
                <span className="font-semibold text-[#1F3A5F]">Location:</span> Bhubaneswar, Odisha
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#A8C7E6]/60 bg-white p-4">
            <p className="m-0 text-sm leading-[1.7] text-[#2A2E35]/80">
              <span className="font-semibold text-[#1F3A5F]">Important operational note:</span> Where any law,
              statutory rule, regulator direction, contractual obligation, or court order requires a higher
              standard than this Policy, ResearchEdit4U will follow that higher requirement to the extent
              legally applicable.
            </p>
          </div>

          <div className="mt-6 space-y-5 text-sm leading-[1.75] text-[#2A2E35]/80">
            <div>
              <SectionTitle n={1} title="Who We Are" />
              <p className="mt-2">
                ResearchEdit4U Solutions Private Limited (“ResearchEdit4U”, “RE4U”, “we”, “our”, “us”) provides
                research, editorial, publication support, formatting, analysis, presentation, consultation, and
                related academic or professional support services through its website and business operations.
              </p>
              <p className="mt-2">
                For purposes of this Policy, ResearchEdit4U acts as the organisation deciding why and how
                personal data is processed in connection with its own website, enquiries, client onboarding,
                project management, billing, support, and compliance functions.
              </p>
            </div>

            <div>
              <SectionTitle n={2} title="Scope of This Policy" />
              <p className="mt-2">
                This Policy applies to personal data collected through our website, contact forms, email, phone,
                messaging channels, consultations, quotations, invoices, contracts, service delivery workflows,
                customer support interactions, and any other lawful business engagement with us.
              </p>
              <p className="mt-2">
                This Policy covers personal data of website visitors, prospective clients, existing clients,
                institutional contacts, business partners, and other individuals who interact with us in a
                professional or commercial context.
              </p>
            </div>

            <div>
              <SectionTitle n={3} title="Personal Data We May Collect" />
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  Identity and contact data, such as name, email address, phone number, organisation, country,
                  and communication details.
                </li>
                <li>
                  Project and service-related data, such as manuscript files, research materials, presentation
                  files, instructions, deadlines, subject area, publication goals, and service preferences.
                </li>
                <li>
                  Billing and transaction data, such as invoice details, payment confirmations, tax information,
                  and basic transaction references.
                </li>
                <li>
                  Technical and website-use data, such as IP address, browser type, device information, access
                  logs, cookie-related data, and website interaction data.
                </li>
                <li>
                  Support and communication records, such as emails, calls, chats, enquiry history, complaints,
                  grievance submissions, and feedback shared with us.
                </li>
              </ul>
              <p className="mt-2">
                We ask clients not to share unnecessary sensitive personal data. Where a project file itself
                contains personal information, the client remains responsible for ensuring that such sharing is
                lawful and necessary for the requested service.
              </p>
            </div>

            <div>
              <SectionTitle n={4} title="Why We Collect and Use Personal Data" />
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>To respond to enquiries, consultations, and quotation requests.</li>
                <li>To evaluate service requirements and onboard a client or institution.</li>
                <li>To deliver contracted services, manage project workflows, and communicate on project progress.</li>
                <li>To process billing, payments, tax records, receipts, and financial reconciliations.</li>
                <li>To maintain service quality, train internal teams, manage disputes, and document instructions or approvals.</li>
                <li>To operate, secure, monitor, troubleshoot, and improve our website, systems, and user experience.</li>
                <li>To comply with legal, regulatory, contractual, accounting, taxation, fraud-prevention, and cyber-security obligations.</li>
              </ul>
              <p className="mt-2">
                We process personal data only for lawful business purposes connected to our services and
                operations, and only to the extent reasonably necessary for those purposes.
              </p>
            </div>

            <div>
              <SectionTitle n={5} title="Legal Basis and Consent" />
              <p className="mt-2">
                Where consent is the appropriate basis for collection or processing, we seek it through website
                submission, email confirmation, written instructions, contract approval, payment-linked
                confirmation, or other clear affirmative action. Where permitted by law, we may also process
                personal data where it is necessary for performance of a contract, compliance with legal
                obligations, protection against fraud or misuse, or other legitimate business purposes
                recognised under applicable law.
              </p>
              <p className="mt-2">
                If you choose not to provide information that is reasonably necessary for quotation, onboarding,
                identity confirmation, payment processing, or service delivery, we may be unable to provide the
                requested service or may provide it only in a limited manner.
              </p>
            </div>

            <div>
              <SectionTitle n={6} title="Cookies, Logs, and Website Analytics" />
              <p className="mt-2">
                Our website may use cookies, analytics tools, security logs, and similar technologies to operate
                the site, understand usage patterns, improve performance, and protect systems against misuse or
                cyber threats.
              </p>
              <p className="mt-2">
                You may control cookies through your browser settings. However, disabling certain cookies or
                similar technologies may affect website performance, user convenience, or certain features.
              </p>
            </div>

            <div>
              <SectionTitle n={7} title="Disclosure of Personal Data" />
              <p className="mt-2">
                We do not sell personal data. We may disclose personal data only on a need-to-know basis and
                only for lawful business reasons, such as:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>to internal employees, reviewers, editors, analysts, project managers, or consultants involved in the service;</li>
                <li>to payment processors, technology providers, cloud or email service providers, website or security vendors, and other service providers supporting our operations;</li>
                <li>to auditors, accountants, legal advisers, compliance professionals, or insurers;</li>
                <li>where disclosure is required by law, court order, regulatory direction, law-enforcement request, or government authority;</li>
                <li>where disclosure is reasonably necessary to establish, exercise, defend, or investigate legal claims, fraud, cyber incidents, misuse, or payment disputes.</li>
              </ul>
              <p className="mt-2">
                Where third-party service providers process data for us, we expect them to maintain reasonable
                confidentiality and security standards appropriate to the nature of the data handled.
              </p>
            </div>

            <div>
              <SectionTitle n={8} title="International Transfers" />
              <p className="mt-2">
                Because our operations may involve international clients, cloud-based tools, email systems,
                payment infrastructure, or service providers located in or outside India, personal data may be
                processed in multiple jurisdictions. Where such transfer occurs, we will take reasonable
                contractual, technical, or organisational steps appropriate to the nature of the processing and
                applicable law.
              </p>
            </div>

            <div>
              <SectionTitle n={9} title="Data Retention" />
              <p className="mt-2">
                We retain personal data only for as long as reasonably necessary for service delivery, support,
                recordkeeping, compliance, audit, taxation, payment reconciliation, cyber-security, and dispute
                management. Retention periods may vary depending on the nature of the service, legal
                requirements, risk profile, and operational need.
              </p>
              <p className="mt-2">
                Where data is no longer required, we may delete, anonymise, archive, or securely restrict access
                to it, subject to legal, tax, audit, fraud-prevention, or cybersecurity obligations.
              </p>
            </div>

            <div>
              <SectionTitle n={10} title="Data Accuracy and Client Responsibility" />
              <p className="mt-2">
                Clients and users should provide accurate and updated information. ResearchEdit4U is not
                responsible for inaccuracies in information supplied by a user, client, institution, or third
                party acting on their behalf. Where feasible, we may correct or update information upon a
                reasonable written request and subject to lawful verification.
              </p>
            </div>

            <div>
              <SectionTitle n={11} title="Data Security" />
              <p className="mt-2">
                We maintain reasonable administrative, technical, and organisational safeguards designed to
                protect personal data against unauthorised access, misuse, alteration, loss, accidental
                disclosure, or unlawful destruction. These measures may include access controls, role-based
                access, password protection, device security, vendor controls, backup practices, secure
                communication channels, and incident-response procedures.
              </p>
              <p className="mt-2">
                No system can be guaranteed fully secure. Therefore, while we take reasonable steps to protect
                data, we cannot guarantee absolute security of internet-based transmission, third-party
                networks, or systems outside our control.
              </p>
            </div>

            <div>
              <SectionTitle n={12} title="Cybersecurity Response" />
              <p className="mt-2">
                Where a cybersecurity incident affects our systems or personal data, we may investigate,
                contain, assess, document, and respond to the incident, including preserving logs, engaging
                technical experts, notifying relevant service providers, and making disclosures required by law
                or regulator directions. Users should also notify us promptly if they suspect unauthorised use
                of their account, email, documents, or payment interactions involving ResearchEdit4U.
              </p>
            </div>

            <div>
              <SectionTitle n={13} title="Your Rights and Choices" />
              <p className="mt-2">
                Subject to applicable law and reasonable verification, you may request access, correction,
                update, deletion, withdrawal of consent where consent is the basis, or grievance review in
                relation to personal data held by us. These rights are not absolute and may be limited where
                retention or processing is required by law, contract, tax, audit, fraud-prevention, dispute
                handling, or cybersecurity obligations.
              </p>
              <p className="mt-2">
                To exercise any such right, please contact us using the details in this Policy. We may request
                reasonable identity verification before acting on any request.
              </p>
            </div>

            <div>
              <SectionTitle n={14} title="Children and Minors" />
              <p className="mt-2">
                Our services are not directed to children for independent purchase or use. If a minor’s data is
                shared with us by a parent, guardian, school, institution, or lawful authorised person, such
                sharing must be lawful and necessary for the relevant purpose. We may decline services where
                handling such data creates legal, ethical, or compliance risk.
              </p>
            </div>

            <div>
              <SectionTitle n={15} title="Third-Party Links and Platforms" />
              <p className="mt-2">
                Our website, emails, or communications may contain links to third-party websites, payment
                pages, file-sharing tools, or social platforms. We are not responsible for the privacy practices
                of third parties, and users should review the privacy terms of those third parties separately
                before sharing information on external platforms.
              </p>
            </div>

            <div>
              <SectionTitle n={16} title="Marketing and Business Communications" />
              <p className="mt-2">
                We may send service-related, quotation-related, project-related, billing-related, or
                compliance-related communications. We may also send limited marketing or business development
                communications where lawful. You may opt out of non-essential promotional communication, but
                operational or transaction-related communication may still be sent where necessary.
              </p>
            </div>

            <div>
              <SectionTitle n={17} title="Grievance and Contact Details" />
              <p className="mt-2">For privacy-related questions, access requests, correction requests, consent withdrawal, grievances, or complaints, please contact:</p>
              <div className="mt-2 grid gap-2 rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4 md:grid-cols-2">
                <div>
                  <p className="m-0 font-semibold text-[#1F3A5F]">Company</p>
                  <p className="m-0">ResearchEdit4U Solutions Private Limited</p>
                </div>
                <div>
                  <p className="m-0 font-semibold text-[#1F3A5F]">Email</p>
                  <p className="m-0">
                    <a
                      href="mailto:info@researchedit4u.in"
                      className="font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline"
                    >
                      info@researchedit4u.in
                    </a>
                  </p>
                </div>
                <div>
                  <p className="m-0 font-semibold text-[#1F3A5F]">Phone</p>
                  <p className="m-0">+91 8093778526</p>
                </div>
                <div>
                  <p className="m-0 font-semibold text-[#1F3A5F]">Location</p>
                  <p className="m-0">Bhubaneswar, Odisha 751020</p>
                </div>
              </div>
              <p className="mt-2">
                We aim to review privacy grievances within a reasonable period and, where applicable, in line
                with statutory timelines. If a grievance requires identity verification, additional facts, or
                technical investigation, response time may reasonably vary.
              </p>
            </div>

            <div>
              <SectionTitle n={18} title="Policy Changes" />
              <p className="mt-2">
                We may update this Policy from time to time to reflect changes in law, regulation, business
                operations, service model, technology, security practice, or risk management. The latest version
                published by us will govern from its stated effective date unless a different date is expressly
                specified.
              </p>
            </div>

            <div>
              <SectionTitle n={19} title="Governing Law" />
              <p className="mt-2">
                This Policy shall be interpreted in accordance with applicable laws of India. Any dispute
                relating specifically to privacy, data handling, or this Policy shall be handled subject to the
                governing law and jurisdiction framework stated in our Terms &amp; Conditions or other applicable
                contract, unless mandatory law requires otherwise.
              </p>
            </div>

            <div>
              <SectionTitle n={20} title="Internal Compliance Notes for Deployment" />
              <p className="mt-2">
                This page is ready for client-facing deployment. Before publishing, the company should ensure
                that internal practice matches the published policy, especially for access control, consent
                handling, data deletion workflow, vendor confidentiality, grievance handling, and cybersecurity
                logging. If the company appoints a named Grievance Officer or Privacy Contact, the website
                should be updated accordingly for stronger operational compliance.
              </p>
            </div>
          </div>

          <section className="mt-7 rounded-2xl border border-[#A8C7E6]/60 bg-white p-5" aria-label="Quick privacy commitments summary">
            <h3 className="m-0 text-base font-bold text-[#1F3A5F]">Quick Privacy Commitments Summary</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {[
                {
                  title: "Collect only what is needed",
                  body: "We collect personal data mainly for enquiries, project delivery, billing, support, compliance, and website operation.",
                },
                {
                  title: "Use data for lawful business purposes",
                  body: "We use personal data only for legitimate and disclosed business functions connected with our services.",
                },
                { title: "Do not sell personal data", body: "We do not trade client or visitor personal data for commercial sale." },
                {
                  title: "Protect data reasonably",
                  body: "We use reasonable technical and organisational measures to reduce misuse, unauthorised access, and loss.",
                },
                {
                  title: "Limit disclosure",
                  body: "We disclose data only where necessary for delivery, support, professional advice, vendor support, compliance, or legal process.",
                },
                {
                  title: "Respect lawful requests",
                  body: "Subject to law and verification, users may request access, correction, deletion, consent withdrawal, or grievance review.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
                  <p className="m-0 text-sm font-semibold text-[#1F3A5F]">{item.title}</p>
                  <p className="mb-0 mt-1 text-sm leading-[1.7] text-[#2A2E35]/75">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mb-0 mt-4 text-sm font-semibold text-[#2A2E35]/75">End of Privacy Policy</p>
          </section>
        </section>
      </PublicPageContainer>
    </PublicPageFrame>
  );
}
