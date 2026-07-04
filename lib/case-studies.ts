import { CDN_A, CDN_P } from './projects';

export type Gallery = {
  img: string;
  alt: string;
  col: string;
  tag: string;
  caption: string;
};

export type CaseStudy = {
  caseLabel: string;
  title: string;
  client: string;
  tagline: string;
  sector: string;
  scope: string;
  year: string;
  brief: string;
  problemHead: string;
  problemBody: string;
  digBody: string;
  insight: string;
  leapHead: string;
  leapBody: string;
  solutionBody: string;
  payoff: string;
  heroImg: string; // resolved URL
  gallery: Gallery[] | null;
};

/** Resolve `A:foo.png` → CDN_A + foo.png; images/ or http URLs pass through; otherwise CDN_P prefix. */
const R = (name: string): string => {
  if (name.startsWith('A:')) return CDN_A + name.slice(2);
  if (name.startsWith('images/')) return '/' + name;
  if (name.startsWith('http') || name.startsWith('/')) return name;
  return CDN_P + name;
};

const g = (raw: Omit<Gallery, 'img'> & { img: string }): Gallery => ({
  ...raw,
  img: R(raw.img)
});

export const ORDER = [
  'bayaan', 'paradise', 'kalemah', 'indiaverse',
  'trueilm', 'iou', 'dunes', 'marookha',
  'barakah', 'revivers', 'grainer', 'sifa', 'quraany'
] as const;

export type CaseSlug = (typeof ORDER)[number];

export const CASES: Record<CaseSlug, CaseStudy> = {
  kalemah: {
    caseLabel: '[ CASE_FILE: KALEMAH ISLAMIC CENTER // IDENTITY & COLLATERALS ]',
    title: 'KALEMAH.', client: 'KALEMAH ISLAMIC CENTER',
    tagline: 'Brand identity & collaterals for Dubai’s community Islamic learning centre — est. 2007, rebuilt around a single word.',
    sector: 'COMMUNITY / EDUCATION', scope: 'IDENTITY / COLLATERALS', year: '[ CONFIRM ]',
    brief: 'A Dubai institution serving the community since 2007, wearing an identity that undersold its warmth and stature. We rebuilt the brand around its own name — the word.',
    problemHead: 'FIFTEEN YEARS OF SERVICE. AN IDENTITY THAT UNDERSOLD IT.',
    problemBody: 'Kalemah Islamic Center has been teaching, guiding and welcoming Dubai’s community — new Muslims and youth alike — since 2007. But its identity didn’t carry the weight of that history: it needed a brand as warm as its classrooms and as dignified as its mission.',
    digBody: 'The name held the answer. Kalemah means “the word” — an echo of the kalima itself, the single sentence at the heart of the faith. The brand had to feel rooted in Arabic heritage, serene rather than loud, and equally at home on a lecture stream, a lanyard, a tote or the side of a bus.',
    insight: 'One word can change a life. The brand only had to carry it well.',
    leapHead: 'THE WORD, DRAWN IN ONE STROKE.',
    leapBody: 'The K is drawn as a single calligraphic stroke inside a golden circle — Arabic calligraphy and the Latin initial in one gesture, echoing ripples of knowledge spreading outward. Around it: a desert palette of sand, cream and deep midnight blue, a classical serif, geometric star patterns, and a badge seal stamped EST · 2007 · UAE.',
    solutionBody: 'The system runs the full width of the centre’s life: stationery and letterheads, staff lanyards, notebooks, social templates, roll-up banners, stickers and pins, streetwear-grade merch, the community bus, street signage, the website and the lecture broadcasts.',
    payoff: 'An identity with the quiet confidence of an institution — serene, rooted and unmistakable, from a pin in the sand to a sign on the street.',
    heroImg: R('images/kalemah/595.png'),
    gallery: [
      g({ img: 'images/kalemah/604.png', alt: 'Kalemah primary logo lockup', col: '1 / -1', tag: '[ FIG.01 ]', caption: 'THE MARK — ONE CALLIGRAPHIC STROKE' }),
      g({ img: 'images/kalemah/597.png', alt: 'Kalemah logo across brand colours', col: '1 / -1', tag: '[ FIG.02 ]', caption: 'LOCKUPS — SAND, CREAM & MIDNIGHT' }),
      g({ img: 'images/kalemah/607.png', alt: 'Kalemah badge seal — est 2007 UAE', col: '1 / -1', tag: '[ FIG.03 ]', caption: 'THE SEAL — EST · 2007 · UAE' }),
      g({ img: 'images/kalemah/606.png', alt: 'Kalemah geometric star pattern', col: '1 / -1', tag: '[ FIG.04 ]', caption: 'PATTERN — GEOMETRY OF THE WORD' }),
      g({ img: 'images/kalemah/617.png', alt: 'Kalemah centre illustration', col: '1 / -1', tag: '[ FIG.05 ]', caption: 'ILLUSTRATION — THE CENTRE' }),
      g({ img: 'images/kalemah/621.png', alt: 'Kalemah stationery suite', col: '1 / -1', tag: '[ FIG.06 ]', caption: 'STATIONERY — FOLDER, LETTERHEAD & ENVELOPE' }),
      g({ img: 'images/kalemah/646.png', alt: 'Kalemah business cards and tote bag', col: '1 / -1', tag: '[ FIG.07 ]', caption: 'COLLATERAL — CARDS & TOTE' }),
      g({ img: 'images/kalemah/624.png', alt: 'Kalemah staff lanyards', col: '1 / -1', tag: '[ FIG.08 ]', caption: 'ON LANYARDS — THE TEAM' }),
      g({ img: 'images/kalemah/643.png', alt: 'Kalemah notebooks', col: '1 / -1', tag: '[ FIG.09 ]', caption: 'NOTEBOOKS — SEEKING KNOWLEDGE' }),
      g({ img: 'images/kalemah/620.png', alt: 'Kalemah social media templates', col: '1 / -1', tag: '[ FIG.10 ]', caption: 'SOCIAL — QUOTES & QUESTIONS' }),
      g({ img: 'images/kalemah/623.png', alt: 'Kalemah merch in the desert', col: '1 / -1', tag: '[ FIG.11 ]', caption: 'MERCH — IN THE DUNES' }),
      g({ img: 'images/kalemah/645.png', alt: 'Kalemah stickers and pin', col: '1 / -1', tag: '[ FIG.12 ]', caption: 'STICKERS & PINS' }),
      g({ img: 'images/kalemah/647.png', alt: 'Kalemah roll-up banners', col: '1 / -1', tag: '[ FIG.13 ]', caption: 'EVENTS — ROLL-UP BANNERS' }),
      g({ img: 'images/kalemah/648.png', alt: 'Kalemah community bus and street signage', col: '1 / -1', tag: '[ FIG.14 ]', caption: 'IN THE CITY — BUS & SIGNAGE' },),
      g({ img: 'images/kalemah/625.png', alt: 'Kalemah website on laptop', col: '1 / -1', tag: '[ FIG.15 ]', caption: 'DIGITAL — THE WEBSITE' }),
      g({ img: 'images/kalemah/644.png', alt: 'Kalemah lecture broadcast on TV', col: '1 / -1', tag: '[ FIG.16 ]', caption: 'ON AIR — THE LECTURES' })
    ]
  },
  paradise: {
    caseLabel: '[ CASE_FILE: ONE WAY TO PARADISE // BRAND IDENTITY ]',
    title: 'ONE WAY TO PARADISE.', client: 'ONE WAY TO PARADISE',
    tagline: 'Brand identity for a dawah channel with 54K+ subscribers — one mark, one message, one way.',
    sector: 'MEDIA / DAWAH', scope: 'IDENTITY / CONTENT SYSTEM / MERCH', year: '2023',
    brief: 'A beloved Islamic knowledge channel growing faster than its look. We gave it a mark built on a single gesture — the raised finger of tawheed — and a system that owns the feed.',
    problemHead: 'YEARS OF KNOWLEDGE. NO IDENTITY TO CARRY IT.',
    problemBody: 'One Way to Paradise, by Abu Musab Wajdi Akkari, had spent a decade building a library of classes — tafseer, aqeedah, live Q&As — and an audience of 54,000+ subscribers. But the channel had no consistent identity: thumbnails were ad-hoc, and nothing visually tied the classes, clips and community together.',
    digBody: 'The audience lives on YouTube, where every video competes with the entire internet. The brand had to read instantly at thumbnail size, feel confident to a young Muslim audience raised on streetwear and sports graphics — and stay unmistakably rooted in its message.',
    insight: 'In the feed, dawah competes with everything. It has to look like it belongs there.',
    leapHead: 'ONE FINGER. ONE MESSAGE. ONE WAY.',
    leapBody: 'The mark is the raised index finger — the universal gesture of tawheed: one God, one path. Rendered as a bold badge in black and yellow with torn-paper energy, it works as a logo, a sticker, a watermark and a stamp — instantly legible at any size.',
    solutionBody: 'A full system around the badge: lockups and a circular seal, a torn-edge thumbnail template that made the class library scannable, social templates for quotes and schedules, and merch — caps, crewnecks, mugs, stickers, even a basketball.',
    payoff: 'The channel now looks the way it teaches: clear, confident and consistent — one identity across every class, clip, post and cap.',
    heroImg: R('images/paradise/232.png'),
    gallery: [
      g({ img: 'images/paradise/233.png', alt: 'One Way to Paradise logo system — badge, seal and mark', col: '1 / -1', tag: '[ FIG.01 ]', caption: 'THE SYSTEM — BADGE, SEAL & MARK' }),
      g({ img: 'images/paradise/238.png', alt: 'One Way to Paradise phone case and business cards', col: '1 / -1', tag: '[ FIG.02 ]', caption: 'IDENTITY IN HAND — CARDS & CASE' }),
      g({ img: 'images/paradise/240.png', alt: 'One Way to Paradise YouTube channel design', col: '1 / -1', tag: '[ FIG.03 ]', caption: 'THE CHANNEL — HOME OF THE CLASSES' }),
      g({ img: 'images/paradise/241.png', alt: 'One Way to Paradise thumbnail system', col: '1 / -1', tag: '[ FIG.04 ]', caption: 'THUMBNAILS — THE TORN-EDGE TEMPLATE' }),
      g({ img: 'images/paradise/242.png', alt: 'One Way to Paradise social media templates', col: '1 / -1', tag: '[ FIG.05 ]', caption: 'SOCIAL — QUOTES & SCHEDULES' }),
      g({ img: 'images/paradise/239.png', alt: 'One Way to Paradise on phone and laptop', col: '1 / -1', tag: '[ FIG.06 ]', caption: 'ON EVERY SCREEN' }),
      g({ img: 'images/paradise/234.png', alt: 'One Way to Paradise cap', col: '1 / -1', tag: '[ FIG.07 ]', caption: 'MERCH — THE CAP' }),
      g({ img: 'images/paradise/235.png', alt: 'One Way to Paradise crewneck front and back', col: '1 / -1', tag: '[ FIG.08 ]', caption: 'MERCH — THE CREWNECK' }),
      g({ img: 'images/paradise/237.png', alt: 'One Way to Paradise sticker and mug', col: '1 / -1', tag: '[ FIG.09 ]', caption: 'MERCH — STICKER & MUG' }),
      g({ img: 'images/paradise/236.png', alt: 'One Way to Paradise branded basketball', col: '1 / -1', tag: '[ FIG.10 ]', caption: 'IN THE WILD — THE BASKETBALL' })
    ]
  },
  bayaan: {
    caseLabel: '[ CASE_FILE: BAYAAN ACADEMY // IDENTITY & COLLATERALS ]',
    title: 'BAYAAN ACADEMY.', client: 'BAYAAN ACADEMY',
    tagline: 'Brand identity & collaterals for a leading online school for Muslim children in grades 3–12 — an aware, educated, spiritually rooted, global community.',
    sector: 'EDUCATION / ONLINE SCHOOL', scope: 'IDENTITY / COLLATERALS', year: '[ CONFIRM ]',
    brief: 'An online school serving 600+ students worldwide, wearing a mark that didn’t match its energy. We rebuilt the B — and gave the brand a system playful enough for kids and credible enough for parents.',
    problemHead: 'A GLOBAL CLASSROOM. A MARK THAT STAYED HOME.',
    problemBody: 'Bayaan Academy teaches Muslim children in grades 3–12 across the world — 600+ students, 50+ teachers, and a mission to raise an aware, educated, spiritually rooted global community. But the old identity was flat and dated: it neither sparked the curiosity of children nor carried the credibility parents look for in a school.',
    digBody: 'The brand speaks to two audiences at once: kids who need learning to feel joyful, and parents who need it to feel trustworthy and rooted in faith. The visual language had to hold both — playful without being childish, Islamic without being solemn.',
    insight: 'For a child, faith and fun aren’t opposites. The brand shouldn’t treat them that way.',
    leapHead: 'THINK OUTSIDE THE CLASSROOM.',
    leapBody: 'We sharpened the B into a confident, modular mark with the Arabic word “Bayaan” (بيان) built into its negative space — two languages in one letter. Green and blue interlocking forms are accented by golden diamonds drawn from Islamic geometric patterns; the mark doubles as a frame for real students, and the motif scales into patterns, campaigns and collateral. Figtree, warm and legible, carries the voice.',
    solutionBody: 'A four-colour system — blue, green, gold on deep teal — deployed across stationery, notebooks, totes, hoodies, billboards and the enrolment website: one world, from classroom to campaign.',
    payoff: 'A cohesive identity that finally matches the school’s ambition — joyful to a nine-year-old, credible to their parents, and consistent across every touchpoint from letterhead to billboard.',
    heroImg: R('images/bayaan/32.png'),
    gallery: [
      g({ img: 'images/bayaan/21.png', alt: 'Bayaan Academy logo before and after', col: '1 / -1', tag: '[ FIG.01 ]', caption: 'THE MARK — BEFORE / AFTER' }),
      g({ img: 'images/bayaan/264.png', alt: 'Bayaan Academy primary logo lockup', col: '1 / -1', tag: '[ FIG.02 ]', caption: 'PRIMARY LOCKUP' }),
      g({ img: 'images/bayaan/25.png', alt: 'Bayaan Academy logo variations', col: '1 / -1', tag: '[ FIG.03 ]', caption: 'LOCKUPS — BADGE, STACKED & HORIZONTAL' }),
      g({ img: 'images/bayaan/39.png', alt: 'Bayaan Academy colour palette', col: '1 / -1', tag: '[ FIG.04 ]', caption: 'COLOUR — BLUE / GREEN / GOLD / DEEP TEAL' }),
      g({ img: 'images/bayaan/38.png', alt: 'Bayaan Academy typography — Figtree', col: '1 / -1', tag: '[ FIG.05 ]', caption: 'TYPE — FIGTREE' }),
      g({ img: 'images/bayaan/40.png', alt: 'Bayaan Academy mark across brand colours', col: '1 / -1', tag: '[ FIG.06 ]', caption: 'THE MARK — ACROSS THE PALETTE' }),
      g({ img: 'images/bayaan/30.png', alt: 'Bayaan Academy brand collage', col: '1 / -1', tag: '[ FIG.07 ]', caption: 'CAMPAIGN — THINK OUTSIDE THE CLASSROOM' }),
      g({ img: 'images/bayaan/34.png', alt: 'Bayaan Academy stationery', col: '1 / -1', tag: '[ FIG.08 ]', caption: 'STATIONERY — LETTERHEAD & ENVELOPE' }),
      g({ img: 'images/bayaan/37.png', alt: 'Bayaan Academy tote bag and notebook', col: '1 / -1', tag: '[ FIG.09 ]', caption: 'COLLATERAL — TOTE & NOTEBOOK' }),
      g({ img: 'images/bayaan/36.png', alt: 'Bayaan Academy hoodie with badge logo', col: '1 / -1', tag: '[ FIG.10 ]', caption: 'MERCH — THE HOODIE' }),
      g({ img: 'images/bayaan/35.png', alt: 'Bayaan Academy website on desktop', col: '1 / -1', tag: '[ FIG.11 ]', caption: 'DIGITAL — THE ENROLMENT SITE' }),
      g({ img: 'images/bayaan/31.png', alt: 'Bayaan Academy white logo over lifestyle photo', col: '1 / -1', tag: '[ FIG.12 ]', caption: 'THE BRAND IN CONTEXT' })
    ]
  },
  indiaverse: {
    caseLabel: '[ CASE_FILE: INDIAVERSE // NAMING & IDENTITY ]',
    title: 'INDIAVERSE.', client: 'INDIAVERSE',
    tagline: 'Naming & brand identity for a Bahrain retail store selling handcrafted Indian artisanal products.',
    sector: 'RETAIL / ARTISANAL', scope: 'NAMING / IDENTITY / GUIDELINES / WEB', year: '[ CONFIRM ]',
    brief: 'A nameless store full of centuries-old Indian craft needed a brand that could make heritage feel like a place you’d want to visit — and take home.',
    problemHead: 'CENTURIES OF CRAFT. NO NAME ON THE DOOR.',
    problemBody: 'A new retail store in Bahrain, stocked with handcrafted artisanal products rooted in generations of Indian craft — and nothing to hold it together. No name, no identity, no story. The risk: flattening a rich, diverse culture into souvenir-shop cliché.',
    digBody: 'We dug into popular culture, history, Indian heritage and modern terminology. The customers weren’t tourists hunting trinkets — they had a strong sense of their own identity and wanted heritage told with a modern twist.',
    insight: 'People weren’t buying products. They were taking a piece of India home.',
    leapHead: 'NOT A STORE. AN ALTERNATIVE UNIVERSE.',
    leapBody: 'Naming explored contenders like The Indus Alley — a nod to the Indus Valley civilisation and the store’s narrow-alley location. But one idea reframed everything: Indiaverse, an alternative universe where everything is Indian. Walking in isn’t shopping; it’s crossing over.',
    solutionBody: 'The mark is built on the charkha — the wheel — representing the diversity of Indian culture and the handcrafted, detailed approach behind every product. The system carries the universe across packaging, bags, web and social.',
    payoff: 'The brand now communicates its story, personality and voice across every touchpoint in a cohesive manner — an experience delightful enough to feel like taking a part of India back home.',
    heroImg: R('638c45c01f96ab8314574d5f_Screenshot%202022-11-22%20at%2012.08%201.png'),
    gallery: [
      g({ img: '63b96738e91f66576c21b644_Logo%20Skeleton%202.png', alt: 'Indiaverse logo construction on the charkha wheel', col: '1 / -1', tag: '[ FIG.01 ]', caption: 'THE MARK — CONSTRUCTED ON THE CHARKHA WHEEL' }),
      g({ img: '63b9427ffe573c355e4b9055_Frame%2036.png', alt: 'Indiaverse social campaign', col: 'auto', tag: '[ FIG.02 ]', caption: 'CAMPAIGN — EXPERIENCE INDIA THROUGH OUR PRODUCTS' }),
      g({ img: '638c46409a16181aa9ad8c53_Bag.png', alt: 'Indiaverse patterned shopping bag', col: 'auto', tag: '[ FIG.03 ]', caption: 'PATTERN SYSTEM — CARRIED ON THE BAG' }),
      g({ img: '638c4659698caa050150bcce_Laptop.png', alt: 'Indiaverse website on a laptop', col: '1 / -1', tag: '[ FIG.04 ]', caption: 'WEB — CELEBRATING LITTLE THINGS' }),
      g({ img: '63b9453715cbc752e178b457_Frame%2043.png', alt: 'Indiaverse brand collateral', col: 'auto', tag: '[ FIG.05 ]', caption: 'COLLATERAL — THE UNIVERSE IN PRINT' }),
      g({ img: '638c466c8563257851f0bc11_IG%20Post.png', alt: 'Indiaverse Instagram post on a phone', col: 'auto', tag: '[ FIG.06 ]', caption: 'SOCIAL — INSTAGRAM IN THE WILD' })
    ]
  },
  trueilm: {
    caseLabel: '[ CASE_FILE: TRUE ILM // STRATEGY & IDENTITY ]',
    title: 'TRUE ILM.', client: 'TRUE ILM',
    tagline: 'Islamic audiobooks & ebooks for the modern Muslim — a rebrand rooted in the timeless symbolism of light.',
    sector: 'EDUCATION / MEDIA', scope: 'STRATEGY / IDENTITY / BRAND GUIDE / UI-UX', year: '2025',
    brief: 'A growing Islamic knowledge platform whose identity couldn’t carry its mission. We rebuilt it around light — and made True Ilm the go-to app for Islamic audiobooks and eBooks.',
    problemHead: 'A MOVEMENT WEARING A LOGO THAT SAID NOTHING.',
    problemBody: 'True Ilm is more than a content platform — it’s a movement reconnecting Muslims to authentic, actionable knowledge in a format that fits modern life. With a vast library of audiobooks and eBooks, the app bridges the traditional with the digital. But its identity lacked presence, emotional depth and scalability: the logo failed to evoke purpose, and the visual system didn’t reflect the platform’s ambition or spiritual promise.',
    digBody: 'The brief demanded balance: reimagine the identity without losing the essence of Ilm — knowledge as light and guidance; honour sacred tradition while staying contemporary and user-friendly; put audiobooks and eBooks front and centre as the hero formats; and build a system flexible enough for app UI, packaging, merchandise and campaigns.',
    insight: 'Ilm isn’t content to consume. It’s light to be guided by.',
    leapHead: 'A BRAND BUILT ON LIGHT.',
    leapBody: 'Inspired by the timeless symbolism of light, the new identity reflects True Ilm’s mission to guide and illuminate hearts through authentic Islamic knowledge — an elevated logo system, a premium product experience, and visual storytelling that brings clarity, credibility and emotional resonance to a brand rooted in revelation.',
    solutionBody: 'The lantern-led mark anchors a system that scales from app UI to packaging and campaigns — before/after, lockups, and the brand world in use.',
    payoff: 'The rebrand sparked renewed user interest and increased content engagement, giving the platform a world-class identity rooted in purpose. The app now feels like what it truly is: a companion on your journey toward meaningful Islamic learning — whenever and wherever.',
    heroImg: R('687156d180a73ac9d30970d3_TrueIlm%20CS%20-%20Cover.png'),
    gallery: [
      g({ img: '687159bb737690ae0aaef0ee_True%20Ilm%20CS%20-%20Logo%20Before%20After.png', alt: 'True Ilm logo before and after the rebrand', col: '1 / -1', tag: '[ FIG.01 ]', caption: 'THE MARK — BEFORE / AFTER' }),
      g({ img: '687159d39cc80bc32d5f2106_True%20Ilm%20CS%20-%20Logo%20Types.png', alt: 'True Ilm logo type variants', col: 'auto', tag: '[ FIG.02 ]', caption: 'LOCKUPS — THE LOGO FAMILY' }),
      g({ img: '68715a1171f3467782f865d1_True%20Ilm%20CS%20-%20Logo%20Mockup%201.png', alt: 'True Ilm brand identity mockup', col: 'auto', tag: '[ FIG.03 ]', caption: 'IDENTITY IN USE' }),
      g({ img: '68715908875ec0ea22e87204_True%20Ilm%20CS%20-%20Logo%20Mockup%202.png', alt: 'True Ilm brand identity mockup', col: 'auto', tag: '[ FIG.04 ]', caption: 'THE BRAND WORLD' }),
      g({ img: '6871590d0a60b438edba48b3_True%20Ilm%20CS%20-%20Logo%20Mockup%202-1.png', alt: 'True Ilm brand identity mockup', col: 'auto', tag: '[ FIG.05 ]', caption: 'THE BRAND WORLD' }),
      g({ img: '687159127bea9e380b096f11_True%20Ilm%20CS%20-%20Logo%20Mockup%203.png', alt: 'True Ilm app experience mockup', col: '1 / -1', tag: '[ FIG.06 ]', caption: 'PRODUCT — THE APP EXPERIENCE' }),
      g({ img: '687159181f53b7e8b1bd3804_True%20Ilm%20CS%20-%20Logo%20Mockup%204.png', alt: 'True Ilm brand identity mockup', col: 'auto', tag: '[ FIG.07 ]', caption: 'ACTIVATION — IN THE WILD' }),
      g({ img: '6871591cbd024d7791eff12f_True%20Ilm%20CS%20-%20Logo%20Mockup%205.png', alt: 'True Ilm brand identity mockup', col: 'auto', tag: '[ FIG.08 ]', caption: 'ACTIVATION — IN THE WILD' })
    ]
  },
  iou: {
    caseLabel: '[ CASE_FILE: IOU // STRATEGY & IDENTITY ]',
    title: 'IOU.', client: 'INTERNATIONAL OPEN UNIVERSITY',
    tagline: 'A comprehensive rebrand repositioning the International Open University as a bold, modern force in Islamic higher education.',
    sector: 'HIGHER EDUCATION', scope: 'STRATEGY / IDENTITY / BRAND GUIDE / WEBSITE', year: '2025',
    brief: 'A pioneer of online Islamic education had outgrown its own identity — fragmented, dated, and too weak to carry its mission. The rebrand made it confident, contemporary, and unmistakably IOU.',
    problemHead: 'A GLOBAL MISSION. A FRAGMENTED IDENTITY.',
    problemBody: 'Founded in 2001, IOU pioneered online Islamic education globally. But as it scaled, its identity fell behind — visually dated, inconsistent in application, and lacking the strength to carry its vision into the next chapter. It needed a brand that would resonate with a global Muslim audience, inspire trust, and reflect the depth of its mission: changing the Ummah through education.',
    digBody: 'The brief carried a real tension: preserve IOU’s legacy while modernising; enhance clarity without losing the essence of the original mark; build one cohesive system for digital, print, merchandise and global campuses; and position IOU as a credible academic institution on par with international universities — yet distinctly Islamic in ethos.',
    insight: 'Legacy isn’t what you protect. It’s what you carry forward.',
    leapHead: 'REFINE THE ICON. REBUILD THE SYSTEM.',
    leapBody: 'Rather than discard the iconic mark, we refined it — sharpening the logo’s construction and geometry while keeping its essence intact, then rebuilt everything around it: a consistent visual and verbal language, a future-ready system, and activation tools that unify IOU’s growing presence.',
    solutionBody: 'The refined mark anchors a full identity system — logo construction, type variants, and applications across campus, merchandise and digital — confident, contemporary, and committed to accessible education.',
    payoff: 'The new identity honors IOU’s Islamic foundation while boldly stepping into the future. Since the rebrand, IOU has strengthened its position as a serious academic institution, ready to shape the next generation of Muslim scholars and leaders.',
    heroImg: R('68714cc49622fc59b2cac62d_IOU%20CS%20-%20Cover.png'),
    gallery: [
      g({ img: '6871521dd28e7a77d7cc7e66_IOU%20CS%20-%20Logo%20Before%20After.png', alt: 'IOU logo before and after the rebrand', col: '1 / -1', tag: '[ FIG.01 ]', caption: 'THE MARK — BEFORE / AFTER' }),
      g({ img: '687154f6cba8a2d9485be45a_IOU%20CS%20-%20Logo%20Construction%203.png', alt: 'IOU logo construction grid', col: 'auto', tag: '[ FIG.02 ]', caption: 'CONSTRUCTION — GEOMETRY OF THE MARK' }),
      g({ img: '687152f5875ec0ea22e43d68_IOU%20CS%20-%20Logo%20Types.png', alt: 'IOU logo type variants', col: 'auto', tag: '[ FIG.03 ]', caption: 'LOCKUPS — THE LOGO FAMILY' }),
      g({ img: '6871518c74a04d0b7c609b3d_IOU%20CS%20-%20Logo%20Mockup%201.png', alt: 'IOU brand identity mockup', col: 'auto', tag: '[ FIG.04 ]', caption: 'IDENTITY IN USE' }),
      g({ img: '68715192da5257cd16bfc5ed_IOU%20CS%20-%20Logo%20Mockup%202.png', alt: 'IOU brand identity mockup', col: 'auto', tag: '[ FIG.05 ]', caption: 'IDENTITY IN USE' }),
      g({ img: '6871531ee9caf86beef8d7e9_IOU%20CS%20-%20Logo%20Mockup%203.png', alt: 'IOU brand identity mockup', col: '1 / -1', tag: '[ FIG.06 ]', caption: 'THE BRAND WORLD' }),
      g({ img: '687151e984e7d5aa4de361ea_IOU%20CS%20-%20Logo%20Mockup%204.png', alt: 'IOU brand identity mockup', col: 'auto', tag: '[ FIG.07 ]', caption: 'ACTIVATION — MERCH & CAMPUS' }),
      g({ img: '687151ed82d41fe2dab049c9_IOU%20CS%20-%20Logo%20Mockup%205.png', alt: 'IOU brand identity mockup', col: 'auto', tag: '[ FIG.08 ]', caption: 'ACTIVATION — MERCH & CAMPUS' }),
      g({ img: '687151f0edf25e28ce9c1cd9_IOU%20CS%20-%20Logo%20Mockup%206.png', alt: 'IOU brand identity mockup', col: '1 / -1', tag: '[ FIG.09 ]', caption: 'DIGITAL — THE NEW FACE OF IOU' })
    ]
  },
  dunes: {
    caseLabel: '[ CASE_FILE: DUNES // NAMING, STRATEGY & IDENTITY ]',
    title: 'DUNES.', client: 'DUNES',
    tagline: 'Naming, strategy & identity for a Saudi water brand — celebrating water in a region where it is a precious gem.',
    sector: 'FMCG / BEVERAGE', scope: 'NAMING / STRATEGY / IDENTITY / PACKAGING', year: '2022',
    brief: 'A purified-water company in a market where bottled water is a commodity. We gave it a name, a story and a look drawn from the land itself — and made water precious again.',
    problemHead: 'HOW DO YOU SELL WATER WHERE WATER IS EVERYWHERE — AND PRICELESS?',
    problemBody: 'Dunes is a water solution company based in Saudi Arabia, providing purified bottled water throughout the country. The biggest challenge: differentiate in a market where bottled water is a common commodity, and build an identity strong enough to stand out and resonate with the local audience.',
    digBody: 'The way in was cultural, not chemical: connect with the local demographic — their culture, history and heritage — and celebrate the importance of water in a region where it is a precious gem.',
    insight: 'In the desert, water isn’t a commodity. It’s a treasure.',
    leapHead: 'NAMED AFTER THE LAND. PURITY IN EVERY DROP.',
    leapBody: 'We explored names that could carry the brand’s story and landed on Dunes — short, catchy, and drawn from the sand dunes that define the region’s landscape and encapsulate Saudi heritage. The tagline sealed the promise: Purity in every drop.',
    solutionBody: 'The logo fuses the letter D with the sand dunes; blue and yellow stand for water and sand. A distinctive label and box design was built to do one job — evoke thirst.',
    payoff: 'Dunes became a well-known and respected brand in the market — distinctive, memorable, and positioned as premium, connecting with the local demographic through their culture, history and heritage.',
    heroImg: R('638c4d3e95fb4321143e3601_Packaging.png'),
    gallery: [
      g({ img: '638c4d5f1f96ab3fe6579557_Truck.png', alt: 'Dunes branded delivery truck', col: '1 / -1', tag: '[ FIG.01 ]', caption: 'ON THE ROAD — THE FLEET' }),
      g({ img: '638c4d41de3590c7085ff952_Billboard.png', alt: 'Dunes billboard campaign', col: '1 / -1', tag: '[ FIG.02 ]', caption: 'OUT OF HOME — PURITY IN EVERY DROP' }),
      g({ img: '638c4d7d44a03f350ca94b7f_Mockups.png', alt: 'Dunes packaging mockups', col: 'auto', tag: '[ FIG.03 ]', caption: 'PACKAGING — LABEL & BOX' }),
      g({ img: '638c4d8095fb431b463e37b8_Book.png', alt: 'Dunes brand guidelines book', col: 'auto', tag: '[ FIG.04 ]', caption: 'THE BRAND BOOK' }),
      g({ img: '638c4d830787c75573de865e_Drinking.png', alt: 'Dunes bottle in use', col: '1 / -1', tag: '[ FIG.05 ]', caption: 'IN HAND — THE PRODUCT' })
    ]
  },
  marookha: {
    caseLabel: '[ CASE_FILE: MAROOKHA // STRATEGY, IDENTITY & WEB ]',
    title: 'MAROOKHA.', client: 'MAROOKHA',
    tagline: 'An exclusive women-only community space — private spaces where women grow, socialise and empower each other.',
    sector: 'COMMUNITY / SPACES', scope: 'STRATEGY / IDENTITY / WEBSITE', year: '[ CONFIRM ]',
    brief: 'A women-only community startup needed a brand that made privacy feel like freedom — and a safe space feel like an adventure.',
    problemHead: 'SAFE USUALLY MEANS CLOSED. THIS COULDN’T.',
    problemBody: 'Marookha set out to build an exclusive, women-only community space: empowering, friendly and secure. The tension was real — communicate privacy and security without the brand feeling guarded, restrictive or dull.',
    digBody: 'Through the strategy workshop we helped Marookha discover its true essence — the value it offers its tribe and its unique role in the community. Privacy wasn’t the product; it was the precondition. What members were really buying was the confidence to be themselves.',
    insight: 'Privacy isn’t a restriction. It’s the freedom to be yourself.',
    leapHead: 'NOT A GATED SPACE. AN OASIS.',
    leapBody: 'We positioned Marookha as a safe haven for women to discover their full potential — an oasis for women empowerment in an uplifting environment. The guide became the Hoopoe bird: a key figure in the story of King Solomon in the Abrahamic faiths, guiding and empowering the Queen of Sheba.',
    solutionBody: 'The Hoopoe leads an identity that is warm, adventurous and secure at once — carried across the space, collateral, website and social media.',
    payoff: 'A cohesive identity from logo system to Instagram — a brand where exclusivity reads as belonging, not exclusion.',
    heroImg: R('638c50cf5b1f464f8308fd86_Store.png'),
    gallery: [
      g({ img: '638c50e45b1f46d4d608ff93_Logos.png', alt: 'Marookha logo system', col: '1 / -1', tag: '[ FIG.01 ]', caption: 'LOGO SYSTEM — LED BY THE HOOPOE' }),
      g({ img: '639d6c0d36cbb38124895a9b_Marookha%20Logo.png', alt: 'Marookha Hoopoe mark', col: 'auto', tag: '[ FIG.02 ]', caption: 'THE HOOPOE — GUIDE & EMPOWERER' }),
      g({ img: '638c50e01f96ab67c957c5ef_Bag.png', alt: 'Marookha bag', col: 'auto', tag: '[ FIG.03 ]', caption: 'COLLATERAL — THE BAG' }),
      g({ img: '638c50f00787c7d549de9e7f_Mockups.png', alt: 'Marookha brand mockups', col: '1 / -1', tag: '[ FIG.04 ]', caption: 'BRAND WORLD — ACROSS TOUCHPOINTS' }),
      g({ img: '638c50f577d1c76ab6a54d59_Social%20Media.png', alt: 'Marookha social media', col: 'auto', tag: '[ FIG.05 ]', caption: 'SOCIAL — THE VOICE IN FEED' }),
      g({ img: '638c50f810a6cef4375bbc02_IG.png', alt: 'Marookha Instagram', col: 'auto', tag: '[ FIG.06 ]', caption: 'INSTAGRAM — THE OASIS ONLINE' })
    ]
  },
  barakah: {
    caseLabel: '[ CASE_FILE: THE BARAKAH EFFECT // STRATEGY, IDENTITY & WEB ]',
    title: 'THE BARAKAH EFFECT.', client: 'THE BARAKAH EFFECT',
    tagline: 'Brand strategy, identity & website for The Barakah Effect.',
    sector: 'MEDIA / PODCAST', scope: 'STRATEGY / IDENTITY / WEBSITE', year: '[ CONFIRM ]',
    brief: '[ INSERT: the story in one line — the problem, the turn, the result. ]',
    problemHead: '[ INSERT: THE PROBLEM THEY WALKED IN WITH. ]',
    problemBody: '[ INSERT: the situation before OTB. ]',
    digBody: '[ INSERT: what discovery & research uncovered. ]',
    insight: '[ INSERT: the one-sentence insight that unlocked the work. ]',
    leapHead: '[ INSERT: THE CREATIVE LEAP, AS A HEADLINE. ]',
    leapBody: '[ INSERT: how the insight became the idea. ]',
    solutionBody: '[ INSERT: 1–2 sentences on the visual system. ]',
    payoff: '[ INSERT: the result. ]',
    heroImg: R('638c51f265a7e4a3d9786c57_Laptop.png'),
    gallery: [
      g({ img: '638c522e77d1c74fa9a558c7_Logos.png', alt: 'The Barakah Effect logo system', col: '1 / -1', tag: '[ FIG.01 ]', caption: 'LOGO SYSTEM' }),
      g({ img: '638c525f57859f6e4cd889f5_Mic.png', alt: 'The Barakah Effect microphone', col: 'auto', tag: '[ FIG.02 ]', caption: 'ON AIR — THE MIC' }),
      g({ img: '638c52624c238bb671b20428_Mockups.png', alt: 'The Barakah Effect brand mockups', col: 'auto', tag: '[ FIG.03 ]', caption: 'BRAND MOCKUPS' }),
      g({ img: '638c52676a8a276d859e2344_Website.png', alt: 'The Barakah Effect website', col: '1 / -1', tag: '[ FIG.04 ]', caption: 'WEB — THE SHOW’S HOME' }),
      g({ img: '638c526b95fb4344133e5abd_Cap.png', alt: 'The Barakah Effect cap', col: '1 / -1', tag: '[ FIG.05 ]', caption: 'MERCH — THE CAP' })
    ]
  },
  revivers: {
    caseLabel: '[ CASE_FILE: REVIVERS // BRAND IDENTITY ]',
    title: 'REVIVERS.', client: 'REVIVERS',
    tagline: 'Brand identity for Revivers.',
    sector: '[ CONFIRM ]', scope: 'IDENTITY', year: '[ CONFIRM ]',
    brief: '[ INSERT: the story in one line — the problem, the turn, the result. ]',
    problemHead: '[ INSERT: THE PROBLEM THEY WALKED IN WITH. ]',
    problemBody: '[ INSERT: the situation before OTB. ]',
    digBody: '[ INSERT: what discovery & research uncovered. ]',
    insight: '[ INSERT: the one-sentence insight that unlocked the work. ]',
    leapHead: '[ INSERT: THE CREATIVE LEAP, AS A HEADLINE. ]',
    leapBody: '[ INSERT: how the insight became the idea. ]',
    solutionBody: '[ INSERT: 1–2 sentences on the visual system. ]',
    payoff: '[ INSERT: the result. ]',
    heroImg: R('A:652044929f0ed92a4213149e_Revivers.png'),
    gallery: null
  },
  grainer: {
    caseLabel: '[ CASE_FILE: GRAINER // STRATEGY, IDENTITY & WEB ]',
    title: 'GRAINER.', client: 'GRAINER',
    tagline: 'Brand strategy, identity & website for Grainer.',
    sector: '[ CONFIRM ]', scope: 'STRATEGY / IDENTITY / WEBSITE', year: '[ CONFIRM ]',
    brief: '[ INSERT: the story in one line — the problem, the turn, the result. ]',
    problemHead: '[ INSERT: THE PROBLEM THEY WALKED IN WITH. ]',
    problemBody: '[ INSERT: the situation before OTB. ]',
    digBody: '[ INSERT: what discovery & research uncovered. ]',
    insight: '[ INSERT: the one-sentence insight that unlocked the work. ]',
    leapHead: '[ INSERT: THE CREATIVE LEAP, AS A HEADLINE. ]',
    leapBody: '[ INSERT: how the insight became the idea. ]',
    solutionBody: '[ INSERT: 1–2 sentences on the visual system. ]',
    payoff: '[ INSERT: the result. ]',
    heroImg: R('A:652044925790a4fb129a08d4_Grainer.png'),
    gallery: null
  },
  sifa: {
    caseLabel: '[ CASE_FILE: SIFA // IDENTITY & PACKAGING ]',
    title: 'SIFA.', client: 'SIFA',
    tagline: 'Brand identity for Sifa.',
    sector: '[ CONFIRM ]', scope: 'IDENTITY / PACKAGING', year: '[ CONFIRM ]',
    brief: '[ INSERT: the story in one line — the problem, the turn, the result. ]',
    problemHead: '[ INSERT: THE PROBLEM THEY WALKED IN WITH. ]',
    problemBody: '[ INSERT: the situation before OTB. ]',
    digBody: '[ INSERT: what discovery & research uncovered. ]',
    insight: '[ INSERT: the one-sentence insight that unlocked the work. ]',
    leapHead: '[ INSERT: THE CREATIVE LEAP, AS A HEADLINE. ]',
    leapBody: '[ INSERT: how the insight became the idea. ]',
    solutionBody: '[ INSERT: 1–2 sentences on the visual system & packaging. ]',
    payoff: '[ INSERT: the result. ]',
    heroImg: R('A:6520467bda7ce6152907d889_Sifa.png'),
    gallery: null
  },
  quraany: {
    caseLabel: '[ CASE_FILE: QURAANY // STRATEGY & IDENTITY ]',
    title: 'QURAANY.', client: 'QURAANY',
    tagline: 'Brand strategy & identity for Quraany.',
    sector: '[ CONFIRM ]', scope: 'STRATEGY / IDENTITY', year: '[ CONFIRM ]',
    brief: '[ INSERT: the story in one line — the problem, the turn, the result. ]',
    problemHead: '[ INSERT: THE PROBLEM THEY WALKED IN WITH. ]',
    problemBody: '[ INSERT: the situation before OTB. ]',
    digBody: '[ INSERT: what discovery & research uncovered. ]',
    insight: '[ INSERT: the one-sentence insight that unlocked the work. ]',
    leapHead: '[ INSERT: THE CREATIVE LEAP, AS A HEADLINE. ]',
    leapBody: '[ INSERT: how the insight became the idea. ]',
    solutionBody: '[ INSERT: 1–2 sentences on the visual system. ]',
    payoff: '[ INSERT: the result. ]',
    heroImg: R('A:65204492f65a3ac72cee89e0_Quraany.png'),
    gallery: null
  }
};

/** Cover image used on the /work/[slug] "all case_files" carousel. */
export const COVERS: Partial<Record<CaseSlug, string>> = {
  trueilm: CDN_A + '68715b75047e40656a5e2e57_True%20Ilm%20CS%20-%20Thumbnail.png',
  iou:     CDN_A + '68715c16bd024d7791f2198a_IOU%20CS%20-%20Thumbnail.png',
  kalemah: '/images/kalemah/595.png',
  marookha:CDN_A + '652044929f0ed92a421314a1_Marookha.png',
  bayaan:  '/images/bayaan/cover.png',
  dunes:   CDN_A + '6520449240c7fd50774b6935_Dunes.png'
};
