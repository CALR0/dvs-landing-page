// Single source for every factual statement on the page.
// Sources: https://dailyvaservices.com/ , /sms-terms.html and /privacy.html
// Rule: each fact lives in ONE section. Rewrite tone freely, never the meaning.

export const company = {
  name: 'Daily VA Services Inc.',
  short: 'Daily VA Services',
  phone: '+1 888-549-1255',
  phoneHref: 'tel:+18885491255',
  email: 'info@dailyvaservices.com',
  address: ['12928 SW 133rd Ct, Suite C', 'Miami, FL 33186'],
  hours: 'Monday to Saturday, 9:30 a.m. – 7:00 p.m. ET',
  hoursShort: 'Mon – Sat · 9:30 – 7:00 ET',
  privacyUrl: '/privacy',
  smsTermsUrl: '/sms-terms',
}

export const nav = [
  // absolute ("/#…") so the same header works on the legal pages
  { label: 'About us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Trust', href: '/#trust' },
  { label: 'Contact', href: '/#contact' },
]

/* 01 — About us: identity. The only place the company describes itself in full. */
export const identity = {
  statement:
    'is an independent energy agent. We help residential consumers compare the licensed retail electricity suppliers available at their address and enroll with the one they choose, and we support them afterwards. We are not an electricity supplier.',
  facts: [
    { label: 'What we are', value: 'An independent energy agent based in Miami, Florida — not a supplier' },
    { label: 'Who we speak with', value: 'Residential consumers in the United States' },
    { label: 'How we reach them', value: 'By telephone, with licensed agents — and one-to-one texts, only with permission' },
    { label: 'What we handle', value: 'Electricity supply options, enrollment and the support that follows' },
  ],
}

/* 01 — About us · Our process: the path of one conversation (summary level only). */
export const conversation = {
  principle:
    'Every call is handled by a licensed agent — a real person listening, explaining and helping move the conversation forward.',
  stages: [
    { title: 'Call', body: 'A licensed agent calls — and says who we are first.' },
    { title: 'Understand', body: 'The agent explains the electricity supply options available to that household.' },
    { title: 'Answer', body: 'Questions answered. The consumer’s requests processed.' },
    { title: 'Follow up', body: 'Details confirmed and requested documents sent.' },
    { title: 'Support', body: 'A person on our toll-free line, Monday to Saturday.' },
  ],
}

/* 02 — Services: the three services exactly as the original site lists them. */
export const services = [
  {
    no: '01',
    title: 'Conversations',
    lead: 'Speaking with consumers.',
    body: 'A licensed agent calls, identifies our company at the start of the conversation, explains the supply options available and answers the consumer’s questions.',
    visual: 'signal',
  },
  {
    no: '02',
    title: 'Care',
    lead: 'Customer care and follow-up.',
    body: 'After a call, our agents follow up with the consumer to confirm details, reschedule appointments and send the summaries or documents the consumer asked for.',
    visual: 'thread',
  },
  {
    no: '03',
    title: 'Energy',
    lead: 'Independent energy agent for households.',
    body: 'Helping residential consumers review their electricity supply options.',
    link: { label: 'See how it works', href: '#energy' },
    visual: 'home',
  },
] as const

/* 02 — Services · Energy: the only place the enrollment flow is described in detail. */
export const energy = {
  body: 'We help residential consumers review their electricity supply options. When they ask for it, we complete the enrollment with the licensed supplier they choose — and support them afterwards.',
  flow: [
    { title: 'Home', body: 'A residential consumer and their electricity supply.' },
    { title: 'Energy options', body: 'The available supply options, explained.' },
    { title: 'Consumer decision', body: 'Enrollment happens only if the consumer asks for it.' },
    { title: 'Licensed supplier', body: 'Only the information needed to enroll is shared with the supplier they chose.' },
    { title: 'Ongoing support', body: 'We keep supporting the consumer after enrollment.' },
  ],
}

/* 03 — Trust: how we contact people (home page + Messaging Terms + Privacy Policy). */
export const trust = [
  {
    word: 'Live agents',
    body: 'No recorded sales messages and no automated voice broadcasts — every call has a person on the line.',
  },
  {
    word: 'Screening',
    body: 'Calling lists are screened against do-not-contact and suppression records before anyone is dialed.',
  },
  {
    word: 'Consent',
    body: 'Permission to text is asked for explicitly during a recorded call with a live agent. It is never a condition of any purchase or enrollment.',
  },
  {
    word: 'One-to-one texts',
    body: 'Written one at a time by the agent who handled the call — a summary, a confirmation or a requested document. No bulk sends, no campaigns, no purchased lists.',
  },
  {
    word: 'Privacy',
    body: 'Mobile numbers and consent are never sold, rented or shared with third parties for their own marketing.',
  },
]

export const optOut = {
  text: 'reply STOP to any text, or tell any agent. Requests are honored immediately and the number is added to our internal do-not-contact list, which stops calls as well. Reply HELP for our contact details. Message and data rates may apply.',
}

/* 01 — About us · Our principles: facts from the Privacy Policy not used anywhere else. */
export const pillars = [
  {
    no: '01',
    title: 'People',
    body: 'Consumer information is available only to the agents and supervisors who need it to do their work.',
  },
  {
    no: '02',
    title: 'Process',
    body: 'Each interaction is documented — call outcome, agent notes and proof of consent — for quality, training and compliance.',
  },
  {
    no: '03',
    title: 'Purpose',
    body: 'Information is used only to serve the consumer who provided it, and kept only as long as that service and our legal obligations require.',
  },
]
