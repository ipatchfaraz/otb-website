import type { Metadata } from 'next';
import LandingPage from '@/components/LandingPage';

const PATH = '/edutech-branding';
const TITLE = 'Edutech Branding — Brand Strategy & Identity for Edutech Startups';
const DESCRIPTION =
  'Edutech branding that actually teaches. OTB builds brand strategy, naming and identity systems for edutech startups, online universities and learning platforms — including the rebrand of the International Open University.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'edutech branding',
    'edtech branding',
    'branding for edutech startups',
    'edutech brand identity',
    'online learning branding',
    'Islamic edutech branding',
    'branding for online universities',
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
      breadcrumbName="Edutech Branding"
      eyebrow="[ EDUTECH · BRAND STRATEGY · IDENTITY ]"
      h1="Edutech branding that actually teaches."
      lead="Education technology is one of the hardest categories to brand. Every player claims the same thing — transform, learn, grow — and most end up looking the same. Outta The Box builds edutech brands that take a position, teach from the first touchpoint, and compound trust over time. Our clients include the International Open University (IOU), one of the world's largest online Islamic universities."
      sections={[
        {
          heading: 'Why edutech branding is different.',
          body: 'An edutech brand has to do more than look friendly. It has to earn credibility (students are handing over years of their life), carry pedagogical intent (the brand is part of the teaching), and scale across faculties, courses, campuses and languages without falling apart. Most edutech branding fails one of those three tests.'
        },
        {
          heading: 'What we deliver.',
          body: 'Brand strategy grounded in your pedagogy and student outcomes. Naming when a new institution or sub-brand is being launched. A visual identity system built for scale — logo, type, colour, iconography, illustration, UI — plus guidelines your product, marketing and course teams can actually use. Launch assets for app stores, enrolment campaigns and student onboarding.'
        },
        {
          heading: 'Who we work with.',
          body: 'Online universities and institutes (International Open University / IOU), religious education platforms (Bayaan Academy, True Ilm, Kalemah, Quraany), corporate learning initiatives, and early-stage edutech startups preparing to raise or launch.'
        },
        {
          heading: 'Our approach.',
          body: 'We start with Trueline — one sentence that captures why your platform exists and how it teaches differently. Everything else (name, identity, voice, launch) hangs on it. The result: an edutech brand that is distinctive on an app store icon, legible to parents and administrators, and respected by educators and faculty.'
        }
      ]}
      cases={[
        { slug: 'international-open-university', name: 'INTERNATIONAL OPEN UNIVERSITY', line: 'Rebranding IOU as a modern force in Islamic higher education.' },
        { slug: 'trueilm', name: 'TRUE ILM', line: 'Strategy & identity for an Islamic audiobook and ebook platform.' },
        { slug: 'bayaan', name: 'BAYAAN ACADEMY', line: 'An online school for Muslim children — joyful to kids, credible to parents.' },
        { slug: 'quraany', name: 'QURAANY', line: 'Brand strategy & identity for a Qur’an learning platform.' }
      ]}
      faqs={[
        {
          q: 'Do you specialise in edutech branding?',
          a: 'Yes. A significant portion of our portfolio is edutech — online universities, learning platforms, religious education, and K-12 schools. The International Open University (IOU) rebrand is our largest edutech engagement to date.'
        },
        {
          q: 'Do you work with early-stage edutech startups?',
          a: 'Yes, pre-launch and pre-seed included. Scope and investment can be tuned to the stage.'
        },
        {
          q: 'Can you brand for Islamic edutech specifically?',
          a: 'Yes. We have deep experience with Islamic education platforms including the International Open University, True Ilm, Bayaan Academy, Kalemah and Quraany. Our team includes founders and designers rooted in both Islamic scholarship and modern design practice.'
        },
        {
          q: 'How long does an edutech rebrand take?',
          a: 'A full rebrand runs about seven weeks: one week discovery, two weeks naming (if needed), two weeks identity, one week validation, one week launch kit. For larger institutions with faculty and campus signage we extend to 10 weeks.'
        },
        {
          q: 'How much does edutech branding cost?',
          a: 'Our standard rebrand projects start from USD 10,800. Nonprofit and educational institution rates are available on request. For ongoing design support through launch and post-launch, retainers start at USD 2,400 / month for a six-month engagement.'
        }
      ]}
    />
  );
}
