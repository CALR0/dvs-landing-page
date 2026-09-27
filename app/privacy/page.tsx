import type { Metadata } from 'next'
import Link from 'next/link'
import { company } from '@/lib/content'
import { LegalPage, type LegalSection } from '@/components/legal/legal-page'

// Text reproduced from https://dailyvaservices.com/privacy.html — do not reword legal meaning.

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What information Daily VA Services Inc. collects when we speak with a consumer, how we use it and the choices the consumer has.',
  alternates: { canonical: '/privacy' },
}

const sections: LegalSection[] = [
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    content: (
      <>
        <ul>
          <li><strong>Contact details:</strong> name, telephone number, email address and service address.</li>
          <li>Information the consumer gives us during a call in order to process a request, which may include account numbers with their current provider and the details required to complete an enrollment.</li>
          <li><strong>Records of our interactions:</strong> call recordings, the outcome of the call, notes written by the agent, text messages sent and received, and the date and time of each.</li>
          <li><strong>Consent records:</strong> whether the consumer agreed to be contacted by telephone or text message, and when that permission was given.</li>
        </ul>
        <p>We do not collect information from children and our services are not directed to anyone under 18.</p>
      </>
    ),
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it',
    content: (
      <ul>
        <li>To speak with the consumer about the program they were contacted about, and to answer their questions.</li>
        <li>To process the request or enrollment the consumer asked for.</li>
        <li>To follow up after a call by telephone or text message, when the consumer agreed to it.</li>
        <li>To keep records required for quality assurance, training and compliance, including proof of consent.</li>
      </ul>
    ),
  },
  {
    id: 'who-we-share-it-with',
    title: 'Who we share it with',
    content: (
      <>
        <p>
          When a consumer asks us to enroll them in a service, we pass the information needed to complete that enrollment to the licensed supplier they chose, and only for that purpose. We also use service providers that operate our telephone and software systems, who may use the information only to provide those services to us. We disclose information when the law requires it. We do not share consumer information with anyone else.
        </p>
        <p className="callout">
          <strong>We do not sell or rent consumer information.</strong> In particular, mobile phone numbers and the consent to receive text messages are never sold, rented or shared with third parties for their own marketing purposes.
        </p>
      </>
    ),
  },
  {
    id: 'how-long-we-keep-it',
    title: 'How long we keep it',
    content: (
      <p>
        We keep consumer records and call recordings for as long as needed to serve the consumer and to meet our legal and contractual obligations, and then delete them. Consent and do-not-contact records are kept longer, because they are what allows us to honor a consumer’s request not to be contacted.
      </p>
    ),
  },
  {
    id: 'your-choices',
    title: 'Your choices',
    content: (
      <ul>
        <li><strong>Stop text messages:</strong> reply STOP to any message. Details in our <Link href="/sms-terms">Messaging Terms</Link>.</li>
        <li><strong>Stop calls:</strong> tell any agent, or call us at <a href={company.phoneHref}>{company.phone}</a>. The number is added to our internal do-not-contact list.</li>
        <li><strong>Access, correction or deletion:</strong> contact us using the details below and we will respond as required by applicable law.</li>
      </ul>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    content: (
      <p>
        Access to consumer information is restricted to the agents and supervisors who need it to do their work, over authenticated connections, and our systems keep a record of that access.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    content: <p>If we change this policy we will update the date at the top of this page.</p>,
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal — Privacy"
      title="Privacy Policy"
      updated="September 25, 2026"
      intro={
        <p>
          {company.name} (“we”) is a contact center. This policy explains what information we collect when we speak with a consumer, how we use it and the choices the consumer has.
        </p>
      }
      sections={sections}
      related={{ label: 'Read our Messaging Terms', href: '/sms-terms' }}
    />
  )
}
