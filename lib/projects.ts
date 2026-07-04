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

export const PROJECTS: ProjectListing[] = [
  { slug: 'kalemah',   name: 'KALEMAH',            discipline: 'CLIENT // IDENTITY & COLLATERALS',       line: 'One word, one stroke — identity for Dubai’s Islamic learning centre.',            tags: ['IDENTITY'],                        img: '/images/kalemah/595.png' },
  { slug: 'paradise',  name: 'ONE WAY TO PARADISE',discipline: 'CLIENT // BRAND IDENTITY',               line: 'One finger, one message — identity for a 54K-subscriber dawah channel.',           tags: ['IDENTITY'],                        img: '/images/paradise/232.png' },
  { slug: 'bayaan',    name: 'BAYAAN ACADEMY',     discipline: 'CLIENT // IDENTITY & COLLATERALS',       line: 'An online school for Muslim children — joyful to kids, credible to parents.',     tags: ['IDENTITY'],                        img: '/images/bayaan/32.png' },
  { slug: 'indiaverse',name: 'INDIAVERSE',         discipline: 'CLIENT // NAMING & IDENTITY',            line: 'Naming & identity for handcrafted Indian artisanal products in Bahrain.',         tags: ['IDENTITY'],                        img: CDN_P + '638c45c01f96ab8314574d5f_Screenshot%202022-11-22%20at%2012.08%201.png' },
  { slug: 'trueilm',   name: 'TRUE ILM',           discipline: 'CLIENT // STRATEGY & IDENTITY',          line: 'Islamic audiobooks & ebooks for the modern Muslim.',                              tags: ['STRATEGY', 'IDENTITY'],            img: CDN_A + '68715b75047e40656a5e2e57_True%20Ilm%20CS%20-%20Thumbnail.png' },
  { slug: 'iou',       name: 'IOU',                discipline: 'CLIENT // STRATEGY & IDENTITY',          line: 'Brand strategy & identity for the International Open University.',                tags: ['STRATEGY', 'IDENTITY'],            img: CDN_A + '68715c16bd024d7791f2198a_IOU%20CS%20-%20Thumbnail.png' },
  { slug: 'dunes',     name: 'DUNES',              discipline: 'CLIENT // STRATEGY & IDENTITY',          line: 'Brand strategy & identity for Dunes water.',                                       tags: ['STRATEGY', 'IDENTITY', 'PACKAGING'], img: CDN_A + '6520449240c7fd50774b6935_Dunes.png' },
  { slug: 'marookha',  name: 'MAROOKHA',           discipline: 'CLIENT // STRATEGY, IDENTITY & WEB',     line: 'A safe haven for women to grow — an oasis for empowerment.',                       tags: ['STRATEGY', 'IDENTITY'],            img: CDN_A + '652044929f0ed92a421314a1_Marookha.png' },
  { slug: 'barakah',   name: 'THE BARAKAH EFFECT', discipline: 'CLIENT // STRATEGY, IDENTITY & WEB',     line: 'Brand strategy, identity & website for The Barakah Effect.',                       tags: ['STRATEGY', 'IDENTITY'],            img: CDN_A + '65204492d0cc90859354dc00_TBE.png' },
  { slug: 'revivers',  name: 'REVIVERS',           discipline: 'CLIENT // BRAND IDENTITY',               line: 'Brand identity for Revivers.',                                                     tags: ['IDENTITY'],                        img: CDN_A + '652044929f0ed92a4213149e_Revivers.png' },
  { slug: 'grainer',   name: 'GRAINER',            discipline: 'CLIENT // STRATEGY, IDENTITY & WEB',     line: 'Brand strategy, identity & website for Grainer.',                                  tags: ['STRATEGY', 'IDENTITY'],            img: CDN_A + '652044925790a4fb129a08d4_Grainer.png' },
  { slug: 'sifa',      name: 'SIFA',               discipline: 'CLIENT // IDENTITY & PACKAGING',         line: 'Brand identity for Sifa.',                                                          tags: ['IDENTITY', 'PACKAGING'],           img: CDN_A + '6520467bda7ce6152907d889_Sifa.png' },
  { slug: 'quraany',   name: 'QURAANY',            discipline: 'CLIENT // STRATEGY & IDENTITY',          line: 'Brand strategy & identity for Quraany.',                                            tags: ['STRATEGY', 'IDENTITY'],            img: CDN_A + '65204492f65a3ac72cee89e0_Quraany.png' }
];

export const FEATURED_ORDER: string[] = [
  'trueilm', 'iou', 'kalemah', 'marookha', 'bayaan', 'dunes'
];
