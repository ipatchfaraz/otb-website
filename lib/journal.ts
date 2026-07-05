// Journal source of truth. Static defaults ported from
// client-proposal-deck/project/journal-data.js.
// If Postgres is configured, published entries override these.

export type JournalBlock =
  | { t: 'p'; v: string }
  | { t: 'h'; v: string }
  | { t: 'quote'; v: string }
  | { t: 'list'; v: string[] };

export type JournalArticle = {
  log: string;
  slug: string;
  category: string;
  readMin: string;
  date: string;
  author: string;
  authorRole: string;
  thumb: string | null;
  title: string;
  dek: string;
  body: JournalBlock[];
};

export const STATIC_JOURNAL: JournalArticle[] = [
  {
    log: '01',
    slug: 'trueline',
    category: 'STRATEGY',
    readMin: '6 MIN READ',
    date: '2026.02.11',
    author: 'MUHAMMED FARAZ FAIZAL',
    authorRole: 'CHIEF BRAND OFFICER',
    thumb: '/images/journal/log-01-trueline.svg',
    title: "WHAT IS A TRUELINE — AND WHY YOUR TAGLINE ISN'T ONE.",
    dek: 'The one-sentence truth at the centre of every brand we build — and a field-tested way to find yours.',
    body: [
      { t: 'p', v: "Most brands have a tagline. Very few have a Trueline. The difference sounds like semantics until you watch what each one does under pressure — in a pitch, a product decision, a hiring call, a moment when nobody knows what to do next." },
      { t: 'p', v: "A tagline is written for the audience. A Trueline is written for the team. One is the thing you say. The other is the thing that decides what you say." },
      { t: 'h', v: 'A tagline sells. A Trueline decides.' },
      { t: 'p', v: "Taglines live on the outside of the brand — under the logo, at the end of the ad, on the tote bag. Their job is to be memorable. That's a real job, and a good tagline earns its rent. But a tagline can be swapped out every campaign without the brand flinching, because it was never load-bearing." },
      { t: 'p', v: "A Trueline is structural. It's the single sentence that, if you deleted it, the brand would lose its spine. It answers the only question that actually keeps a brand consistent across a hundred small decisions: what do we believe that makes us do things differently?" },
      { t: 'quote', v: "A tagline is what you want people to remember. A Trueline is what you refuse to forget." },
      { t: 'h', v: 'What a Trueline is not' },
      { t: 'list', v: [
        'It is not a slogan. Slogans rhyme; Truelines commit.',
        'It is not a mission statement. Missions describe the destination; a Trueline describes the belief that got you moving.',
        'It is not a value. Values are a list. A Trueline is a decision.',
        'It is not clever. The best ones are almost boringly plain — which is exactly why the whole team can hold them.'
      ] },
      { t: 'h', v: 'How we find one in a Discovery Workshop' },
      { t: 'p', v: "We don't brainstorm Truelines. You can't wordsmith your way to a truth. We excavate it. Across a session we run three passes, and the Trueline is what survives all three." },
      { t: 'p', v: "First, the enemy pass. Every brand worth its salt is against something — a lazy default, an industry lie, a way of doing things that quietly wastes people's time or money. Name the enemy precisely and half the belief reveals itself." },
      { t: 'p', v: "Second, the sacrifice pass. We ask what the brand will refuse to do even when it costs money. A belief you'll act on when it's expensive is real. A belief you only hold when it's convenient is decoration." },
      { t: 'p', v: "Third, the plain-speech pass. We take the sentence and read it to someone outside the room. If they nod, it's true. If they squint, it's clever. Clever gets cut." },
      { t: 'h', v: 'A Trueline earns its keep everywhere' },
      { t: 'p', v: "Once a brand has one, it stops being a marketing artefact and starts being an operating instruction. Product argues about a feature — hold it against the Trueline. Two headlines both test well — the Trueline breaks the tie. A candidate is technically strong but pulls against the belief — now you know. That's the return on a sentence." },
      { t: 'p', v: "You'll notice we're a branding studio called Outta The Box, and our own Trueline isn't printed on a mug. It's the thing that made us delete the mug idea." },
      { t: 'h', v: 'Try this before your next rebrand' },
      { t: 'p', v: "Write the sentence that would make a competitor uncomfortable to copy — not because it's protected, but because it isn't true for them. Read it out loud. If it still feels true tomorrow morning, you've found the centre. Everything else — the tagline included — hangs off it." }
    ]
  },
  {
    log: '02',
    slug: 'in-the-box',
    category: 'IDENTITY',
    readMin: '4 MIN READ',
    date: '2026.01.28',
    author: 'ANAS MUJAHID',
    authorRole: 'DESIGNER',
    thumb: '/images/journal/log-02-inthebox.svg',
    title: 'FIVE SIGNS YOUR BRAND IS STILL IN THE BOX.',
    dek: 'Template logos, borrowed voice, trend-chasing colour — a quick self-audit to run before you spend a cent on a rebrand.',
    body: [
      { t: 'p', v: "“Outta the box” is a nice thing to say and a hard thing to prove. Most brands think they've broken out when they've only redecorated the inside of the box. Here's the audit we run on ourselves — and on every brand that walks in the door." },
      { t: 'h', v: '01 // Your logo could belong to anyone in your category' },
      { t: 'p', v: "Cover the name. Swap in a competitor's. If nothing feels wrong, you don't have a mark — you have a costume that fits the whole industry. Distinctiveness isn't decoration; it's the entire point of an identity. A brand that blends in is paying to be forgotten." },
      { t: 'h', v: '02 // You describe yourself in the same words as everyone else' },
      { t: 'p', v: "“Innovative.” “Customer-centric.” “Premium.” “Seamless.” If your about page could be pasted onto three competitors without a single edit, your voice is borrowed. Borrowed voice is the loudest signal that the strategy underneath was never sharpened." },
      { t: 'quote', v: "If your words survive a copy-paste onto a competitor's site, they were never yours." },
      { t: 'h', v: '03 // Your colour is this year, not your brand' },
      { t: 'p', v: "Trend colours feel safe because everyone else is using them — which is exactly why they date. Chasing the palette of the moment means committing to re-doing it the moment it passes. Colour should come from what the brand means, not from what's on the moodboards this quarter." },
      { t: 'h', v: '04 // Everything is on-brand, nothing is unmistakable' },
      { t: 'p', v: "There's a difference between consistent and distinctive. Plenty of brands are perfectly consistent and perfectly anonymous — same grid, same sans-serif, same stock photography of people laughing at salad. Consistency keeps you tidy. Distinctiveness makes you recognisable from across the room. You need both, in that order." },
      { t: 'h', v: '05 // Your brand looks great and says nothing' },
      { t: 'p', v: "The most seductive trap. The work is polished, the typography is impeccable, the case study looks like an award entry — and a week later nobody can tell you what the brand stands for. Beauty without a belief is just expensive wallpaper." },
      { t: 'h', v: 'The way out' },
      { t: 'p', v: "Breaking out of the box is not a visual exercise, and it doesn't start in a design tool. It starts with a decision about what you believe and who you're willing to be unpopular with. Get that right and the identity has something to carry. Get it wrong and the prettiest rebrand in the world is still — quietly, expensively — in the box." },
      { t: 'p', v: "Score yourself honestly. Three or more of these hitting home isn't a design problem. It's a strategy invitation." }
    ]
  },
  {
    log: '03',
    slug: 'naming',
    category: 'NAMING',
    readMin: '5 MIN READ',
    date: '2026.01.09',
    author: 'AHMED TAHQIQ',
    authorRole: 'CEO',
    thumb: '/images/journal/log-03-naming.svg',
    title: 'NAMING A BRAND: PROCESS, NOT SORCERY.',
    dek: 'How we generate, stress-test and legally clear names — and the shortlist rules we never break.',
    body: [
      { t: 'p', v: "Naming feels like sorcery from the outside: a name appears, it's perfect, and everyone pretends it arrived fully formed in a dream. It didn't. Behind every name worth owning is a process boring enough that nobody puts it in the case study. Here's ours." },
      { t: 'h', v: 'Start with the brief, not the whiteboard' },
      { t: 'p', v: "A name can't be judged in a vacuum — only against a job. Before we generate a single option we agree on what the name has to do: what it should signal, what it must never imply, how it sits next to competitors, and how much room it needs to stretch as the company grows. A name that fits today and strangles you in three years is a bad name that happened to test well." },
      { t: 'h', v: 'Generate wide, on purpose' },
      { t: 'p', v: "The first twenty names are everyone's first twenty names — obvious, safe, already taken. We push past them deliberately. We generate across territories: descriptive, invented, metaphor, founder, borrowed-word, sound-led. Volume isn't the goal, but range is. You cannot shortlist bravely from a timid longlist." },
      { t: 'list', v: [
        'Descriptive — says what it does. Clear, but crowded and hard to protect.',
        'Invented — owns a blank space, but has to earn its meaning from scratch.',
        'Metaphor — borrows a feeling from somewhere else entirely.',
        'Sound-led — chosen first for how it feels in the mouth, then justified.'
      ] },
      { t: 'h', v: 'Stress-test before you fall in love' },
      { t: 'p', v: "This is where romance dies and good names survive. Every shortlist candidate goes through the same gauntlet, and we run it before anyone gets attached — because attachment makes people argue with reality." },
      { t: 'list', v: [
        "Say it out loud, ten times, to someone who's never seen it spelled. If they can't spell it back, it will cost you forever in support tickets and mishears.",
        'Linguistic check across the languages your market actually speaks. The internet is full of brands that mean something unfortunate two borders over.',
        "Trademark and domain reality. A name you can't own is a name you're renting from a lawsuit.",
        "The stranger test. Does it survive being said flatly, with no logo and no context? Names shouldn't need a costume to work."
      ] },
      { t: 'quote', v: 'Fall in love after the trademark search, never before.' },
      { t: 'h', v: 'The rules we never break' },
      { t: 'p', v: "First: never present a name you couldn't defend on legal and linguistic grounds — surprises after the client falls in love are how trust dies. Second: never let the cleverest name win by default; clever fades, ownable endures. Third: the name has to earn the Trueline, not fight it. A name that pulls against what the brand believes will quietly undermine every asset built on top of it." },
      { t: 'h', v: 'Why it looks like magic anyway' },
      { t: 'p', v: "When the process is done properly, the final name feels inevitable — as if it were always the answer. That inevitability is the whole trick. It isn't sorcery. It's a wide net, a brutal filter, and the discipline to fall in love last." }
    ]
  }
];

export const STATIC_JOURNAL_BY_SLUG: Record<string, JournalArticle> =
  Object.fromEntries(STATIC_JOURNAL.map((a) => [a.slug, a]));
export const STATIC_JOURNAL_BY_LOG: Record<string, JournalArticle> =
  Object.fromEntries(STATIC_JOURNAL.map((a) => [a.log, a]));
