import type { Metadata } from 'next';
import LandingPage from '@/components/LandingPage';

const PATH = '/branding-agency-kuala-lumpur';
const TITLE = 'Branding Agency in Kuala Lumpur, Malaysia';
const DESCRIPTION =
  'Outta The Box is an independent branding agency in Kuala Lumpur building purpose-driven brands for Malaysian, Southeast Asian and global clients. Brand strategy, naming, identity and launch — no templates, no fluff.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'branding agency Kuala Lumpur',
    'branding agency Malaysia',
    'brand identity Kuala Lumpur',
    'design agency KL',
    'brand strategy Malaysia',
    'logo design Kuala Lumpur',
    'rebranding agency Malaysia',
    'Outta The Box'
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: `${TITLE} | Outta The Box`,
    description: DESCRIPTION,
    url: PATH
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION }
};

export default function Page() {
  return (
    <LandingPage
      path={PATH}
      breadcrumbName="Branding Agency Kuala Lumpur"
      eyebrow="[ BRANDING AGENCY · KUALA LUMPUR · MALAYSIA ]"
      h1="A branding agency in Kuala Lumpur, built for brands that want to matter."
      lead="Outta The Box is an independent branding and design agency based in Kuala Lumpur. We work with founders, nonprofits and mission-led companies across Malaysia, Southeast Asia and beyond — building brands through strategy, naming, identity and launch systems designed to earn trust, not just look good."
      sections={[
        {
          heading: 'What we do.',
          body: 'Brand strategy, naming, visual identity, brand guidelines, website design and launch kits. We work from the inside out: positioning and verbal identity first, then a visual system that carries it. Every engagement ends with a brand your team can actually run — not a 120-page PDF nobody opens.'
        },
        {
          heading: 'Who we work with.',
          body: 'Founders launching something new, organisations preparing a rebrand, and nonprofits ready to be taken seriously. We have deep experience in Islamic organisations, edutech platforms and purpose-led consumer brands — but the common thread is always a team that believes the work matters.'
        },
        {
          heading: 'Why Kuala Lumpur.',
          body: 'KL sits at the intersection of Southeast Asia, the Middle East and the global Muslim market. Working here means we build brands that speak clearly across cultures without flattening into generic agency work. Local roots, global scope.'
        },
        {
          heading: 'How we engage.',
          body: 'Two models: one-off project (strategy → identity → launch) or a six-month embedded retainer that covers the rebrand and the critical post-launch months. We publish our thinking in the OTB Journal — have a read before you book a call.'
        }
      ]}
      cases={[
        { slug: 'international-open-university', name: 'INTERNATIONAL OPEN UNIVERSITY', line: 'Brand strategy & identity rebrand for the IOU.' },
        { slug: 'trueilm', name: 'TRUE ILM', line: 'Islamic audiobooks & ebooks for the modern Muslim.' },
        { slug: 'barakah', name: 'THE BARAKAH EFFECT', line: 'Brand strategy, identity & website.' },
        { slug: 'bayaan', name: 'BAYAAN ACADEMY', line: 'Identity for an online school for Muslim children.' }
      ]}
      faqs={[
        {
          q: 'Are you based in Kuala Lumpur?',
          a: 'Yes. Outta The Box is an independent branding and design studio headquartered in Kuala Lumpur, Malaysia, serving clients across Southeast Asia, the Middle East, and worldwide.'
        },
        {
          q: 'How much does a rebrand cost?',
          a: 'Our standard rebrand projects start from USD 10,800 (fixed scope: strategy + naming + identity + launch kit). Six-month retainers start at USD 2,400 / month. Nonprofit and mission-led rates are available on request.'
        },
        {
          q: 'How long does a brand project take?',
          a: 'A full rebrand typically runs seven weeks end-to-end: one week discovery and strategy, two weeks naming, two weeks identity, one week validation, one week launch kit. Retainer engagements extend six months.'
        },
        {
          q: 'Do you work with international clients?',
          a: 'Yes. Roughly 70% of our work is for clients outside Malaysia — primarily Islamic organisations, nonprofits and edutech platforms across the Middle East, UK, and North America.'
        },
        {
          q: 'Do you handle website design too?',
          a: 'Yes — brand identity engagements can include website design and build. See the Grainer and Barakah Effect case studies for examples.'
        },
        {
          q: 'How do I start?',
          a: 'Book a 45-minute discovery call via the Book A Discovery Call link in the site header. We will walk through the brief, scope, timeline and pricing with no obligation.'
        }
      ]}
    />
  );
}
