import type { Metadata } from 'next'
import Link from 'next/link'
import { company } from '@/lib/content'
import { LegalPage, type LegalSection } from '@/components/legal/legal-page'

// Text reproduced from https://dailyvaservices.com/sms-terms.html — do not reword legal meaning.

export const metadata: Metadata = {
  title: 'Messaging Terms',
  description: 'The terms of the text messaging program operated by Daily VA Services Inc.: consent, frequency, costs and how to stop messages.',
  alternates: { canonical: '/sms-terms' },
}

const sections: LegalSection[] = [
  {
    id: 'about-the-program',
    title: 'About the program',
    content: (
      <>
        <p>
          {company.name} sends text messages (SMS and MMS) to consumers who spoke with one of our agents by phone and agreed to receive them. The messages continue that conversation: a summary of what was discussed, confirmation of a scheduled callback or appointment, and documents or information the consumer asked us to send.
        </p>
        <p className="callout">
          This is not a marketing or promotional program. We do not send text messages to purchased lists, and we do not send messages to anyone who has not spoken with an agent and given permission.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-obtain-consent',
    title: 'How we obtain consent',
    content: (
      <>
        <p>
          Consent is given verbally during a recorded telephone call with a live agent. The agent states the company name, confirms the consumer’s mobile number and asks for explicit permission to send text messages to that number. The consent, the date and time, the agent’s identity and the call recording are stored in our systems and linked to the consumer’s record.
        </p>
        <p>
          <strong>Consent to receive text messages is never a condition of any purchase or enrollment.</strong> A consumer who does not consent is not messaged.
        </p>
      </>
    ),
  },
  {
    id: 'message-frequency',
    title: 'Message frequency',
    content: (
      <p>
        Message frequency varies and depends on the conversation. In most cases a consumer receives between one and five messages related to a single request. We do not send recurring campaigns.
      </p>
    ),
  },
  {
    id: 'costs',
    title: 'Costs',
    content: (
      <p>
        Message and data rates may apply. {company.name} does not charge consumers for these messages; any charges come from the consumer’s own mobile carrier plan.
      </p>
    ),
  },
  {
    id: 'how-to-stop',
    title: 'How to stop the messages',
    content: (
      <>
        <ul>
          <li>Reply <strong>STOP</strong> to any message to opt out. You will receive one confirmation message and no further messages will be sent to that number.</li>
          <li>Reply <strong>HELP</strong> to any message to receive our contact information, or call us at <a href={company.phoneHref}>{company.phone}</a>.</li>
        </ul>
        <p>
          Opt-out requests are honored immediately and the number is also added to our internal do-not-contact list, which stops telephone calls to that number as well. A consumer who opts out can ask to be added back at any time by calling us.
        </p>
      </>
    ),
  },
  {
    id: 'carriers',
    title: 'Supported carriers and availability',
    content: <p>The program is available on mobile numbers in the United States. Carriers are not liable for delayed or undelivered messages.</p>,
  },
  {
    id: 'privacy',
    title: 'Privacy',
    content: (
      <p>
        Mobile phone numbers, consent records and message content are used only to serve the consumer who provided them. We do not sell, rent or share mobile phone numbers or consent with third parties for their own marketing purposes. Full details are in our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
]

export default function SmsTermsPage() {
  return (
    <LegalPage
      eyebrow="Legal — Messaging"
      title="Messaging Terms"
      updated="September 25, 2026"
      intro={<p>These terms describe the text messaging program operated by {company.name}.</p>}
      sections={sections}
      related={{ label: 'Read our Privacy Policy', href: '/privacy' }}
    />
  )
}
