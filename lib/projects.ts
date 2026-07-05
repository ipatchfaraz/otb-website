// Projects grid data, ported from OTB Work.dc.html.
// Order matches the prototype (recent first for the /work grid).

export const CDN_A = 'https://cdn.prod.website-files.com/637970722913f9b6cd35b26b/';
export const CDN_P = 'https://cdn.prod.website-files.com/637970722913f962be35b286/';

export type ProjectTag = 'STRATEGY' | 'IDENTITY' | 'PACKAGING';

export type ProjectListing = {
  slug: string;
  name: string;
  discipline: string;
  line: string;
  tags: ProjectTag[];
  img: string; // may start with images/, http, or CDN_A filename
};

// Cover URLs verified against outta-the-box-site.webflow.io/portfolio.
export const PROJECTS: ProjectListing[] = [
  { slug: 'kalemah',   name: 'KALEMAH',            discipline: 'CLIENT // IDENTITY & COLLATERALS',       line: 'One word, one stroke — identity for Dubai’s Islamic learning centre.',            tags: ['IDENTITY'],                        img: '/images/kalemah/595.png' },
  { slug: 'paradise',  name: 'ONE WAY TO PARADISE',discipline: 'CLIENT // BRAND IDENTITY',               line: 'One finger, one message — identity for a 54K-subscriber dawah channel.',           tags: ['IDENTITY'],                        img: '/images/paradise/232.png' },
  { slug: 'bayaan',    name: 'BAYAAN ACADEMY',     discipline: 'CLIENT // IDENTITY & COLLATERALS',       line: 'An online school for Muslim children — joyful to kids, credible to parents.',     tags: ['IDENTITY'],                        img: '/images/bayaan/32.png' },
  { slug: 'indiaverse',name: 'INDIAVERSE',         discipline: 'CLIENT // NAMING & IDENTITY',            line: 'Naming & Brand Identity Design for Indiaverse.',                                  tags: ['IDENTITY'],                        img: CDN_P + '638c4723b9a23c2e78cdf774_Thumbnail.png' },
  { slug: 'trueilm',   name: 'TRUE ILM',           discipline: 'CLIENT // STRATEGY & IDENTITY',          line: 'Islamic audiobooks & ebooks for the modern Muslim.',                              tags: ['STRATEGY', 'IDENTITY'],            img: CDN_P + '6871589b841ef6679c9a666f_True%20Ilm%20CS%20-%20Thumbnail.png' },
  { slug: 'iou',       name: 'IOU',                discipline: 'CLIENT // STRATEGY & IDENTITY',          line: 'Brand strategy & identity for the International Open University.',                tags: ['STRATEGY', 'IDENTITY'],            img: CDN_P + '68715b4c4c674742c4ea24f1_IOU%20CS%20-%20Thumbnail.png' },
  { slug: 'dunes',     name: 'DUNES',              discipline: 'CLIENT // STRATEGY & IDENTITY',          line: 'Brand strategy & identity for Dunes water.',                                       tags: ['STRATEGY', 'IDENTITY', 'PACKAGING'], img: CDN_P + '638c4d6d57859fe324d864be_Dunes.png' },
  { slug: 'marookha',  name: 'MAROOKHA',           discipline: 'CLIENT // STRATEGY, IDENTITY & WEB',     line: 'A safe haven for women to grow — an oasis for empowerment.',                       tags: ['STRATEGY', 'IDENTITY'],            img: CDN_P + '638c50d59a16183b69adf97b_Marookha.png' },
  { slug: 'barakah',   name: 'THE BARAKAH EFFECT', discipline: 'CLIENT // STRATEGY, IDENTITY & WEB',     line: 'Brand strategy, identity & website for The Barakah Effect.',                       tags: ['STRATEGY', 'IDENTITY'],            img: CDN_P + '638c523595fb430bf43e5877_The%20Barakah%20Effect.png' },
  { slug: 'revivers',  name: 'REVIVERS',           discipline: 'CLIENT // BRAND IDENTITY',               line: 'Brand identity for Revivers.',                                                     tags: ['IDENTITY'],                        img: CDN_P + '639d71e8caead8e9ca942bd2_Revivers.png' },
  { slug: 'grainer',   name: 'GRAINER',            discipline: 'CLIENT // STRATEGY, IDENTITY & WEB',     line: 'Brand strategy, identity & website for Grainer.',                                  tags: ['STRATEGY', 'IDENTITY'],            img: CDN_P + '638c53302a2fb857d7061435_Grainer.png' },
  { slug: 'sifa',      name: 'SIFA',               discipline: 'CLIENT // IDENTITY & PACKAGING',         line: 'Brand identity for Sifa.',                                                          tags: ['IDENTITY', 'PACKAGING'],           img: CDN_P + '638c53d7de35906cec604639_Sifa.png' },
  { slug: 'quraany',   name: 'QURAANY',            discipline: 'CLIENT // STRATEGY & IDENTITY',          line: 'Brand strategy & identity for Quraany.',                                            tags: ['STRATEGY', 'IDENTITY'],            img: CDN_P + '638c50594c238b4747b1f2eb_Quraany.png' }
];

export const FEATURED_ORDER: string[] = [
  'trueilm', 'iou', 'kalemah', 'marookha', 'bayaan', 'dunes'
];
