import type { Metadata } from 'next';
import LandingPage from '@/components/LandingPage';

const PATH = '/islamic-brand-design';
const TITLE = 'Branding for Islamic Organisations — Strategy, Naming & Identity';
const DESCRIPTION =
  'A branding studio for Islamic organisations, mosques, Islamic edutech and da’wah platforms. OTB builds brand systems rooted in Islamic ethos and executed to international standards — including the International Open University rebrand.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Islamic branding',
    'branding for Islamic organizations',
    'Islamic brand design',
    'Islamic edutech branding',
    'Islamic design agency',
    'Muslim branding agency',
    'dawah brand design',
    'mosque branding',
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
      breadcrumbName="Islamic Brand Design"
      eyebrow="[ ISLAMIC BRANDING · DA’WAH · EDUTECH · NONPROFIT ]"
      h1="Branding for Islamic organisations that deserve to be taken seriously."
      lead="Islamic brands are too often stuck between two bad options: generic mosque-green templates, or secular agency work that strips out the ethos. Outta The Box builds Islamic brand systems that are rooted in the deen and executed to international standards — for universities, da’wah platforms, academies, nonprofits and consumer brands. Our clients include the International Open University, Bayaan Academy, Kalemah Islamic Center, True Ilm and more."
      sections={[
        {
          heading: 'Our niche, honestly.',
          body: 'We build brands for mission-led Islamic organisations because we understand the audience, the sensitivities and the ambition. Dakwah that reaches without preaching. Islamic education that competes with the best in the world. Muslim-led startups that look as serious as their Silicon Valley counterparts. That is the work.'
        },
        {
          heading: 'What we deliver.',
          body: 'Brand strategy grounded in your maqsad. Naming with full linguistic, cultural and Shariah-adjacent review. Identity systems — logo, Arabic + Latin typography, colour, pattern, iconography — that translate without compromise. Brand guidelines in English (and Arabic on request) your team can actually run.'
        },
        {
          heading: 'Where we fit.',
          body: 'Islamic higher education and edutech (International Open University, True Ilm, Bayaan Academy). Da’wah platforms and channels (One Way to Paradise, Kalemah Islamic Center, Revivers). Muslim-led consumer brands (Dunes water, Sifa, Grainer). Nonprofits and foundations preparing a rebrand or launch.'
        },
        {
          heading: 'Our approach.',
          body: 'Every Islamic brand engagement begins with understanding the intention — the niyyah — and the audience the work serves. From there, we build the strategy, the Trueline and the visual system in sequence. Nothing ships without alignment on substance and surface.'
        }
      ]}
      cases={[
        { slug: 'international-open-university', name: 'INTERNATIONAL OPEN UNIVERSITY', line: 'Rebranding one of the world’s largest online Islamic universities.' },
        { slug: 'kalemah', name: 'KALEMAH', line: 'One word, one stroke identity for Dubai’s Islamic learning centre.' },
        { slug: 'trueilm', name: 'TRUE ILM', line: 'Islamic audiobooks & ebooks for the modern Muslim.' },
        { slug: 'bayaan', name: 'BAYAAN ACADEMY', line: 'An online school for Muslim children.' },
        { slug: 'quraany', name: 'QURAANY', line: 'Brand strategy & identity for a Qur’an platform.' },
        { slug: 'revivers', name: 'REVIVERS', line: 'Brand identity for a da’wah initiative.' }
      ]}
      faqs={[
        {
          q: 'Do you only work with Islamic organisations?',
          a: 'No — our portfolio spans consumer brands, edutech and nonprofits. But Islamic organisations are a significant and deliberate part of our focus, because we believe Muslim-led brands deserve the same calibre of design thinking as any global brand.'
        },
        {
          q: 'Can you work with Arabic typography?',
          a: 'Yes. Our team includes Arabic-literate designers and we regularly build bilingual (English + Arabic) identity systems. See the IOU, True Ilm and Kalemah case studies.'
        },
        {
          q: 'Do you have a nonprofit rate?',
          a: 'Yes. For registered Islamic nonprofits and educational institutions we offer a nonprofit rate — typically 30-40% below our standard commercial fee. Contact us with your scope and we will quote accordingly.'
        },
        {
          q: 'Can you work with international clients?',
          a: 'Yes — most of our Islamic brand engagements are international. We have worked with clients in the UK, US, Gambia, UAE, Saudi Arabia and India from our Kuala Lumpur studio.'
        },
        {
          q: 'How do I start?',
          a: 'Send a short brief via the Contact section, or book a 45-minute discovery call. We respond within two working days.'
        }
      ]}
    />
  );
}
