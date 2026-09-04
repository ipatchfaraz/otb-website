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
    title: "WHAT IS A TRUELINE AND WHY YOUR TAGLINE ISN'T ONE.",
    dek: 'The one-sentence truth at the centre of every brand we build and a field-tested way to find yours.',
    body: [
      { t: 'p', v: "Most brands have a tagline. Very few have a Trueline. The difference sounds like semantics until you watch what each one does under pressure in a pitch, a product decision, a hiring call, a moment when nobody knows what to do next." },
      { t: 'p', v: "A tagline is written for the audience. A Trueline is written for the team. One is the thing you say. The other is the thing that decides what you say." },
      { t: 'h', v: 'A tagline sells. A Trueline decides.' },
      { t: 'p', v: "Taglines live on the outside of the brand under the logo, at the end of the ad, on the tote bag. Their job is to be memorable. That's a real job, and a good tagline earns its rent. But a tagline can be swapped out every campaign without the brand flinching, because it was never load-bearing." },
      { t: 'p', v: "A Trueline is structural. It's the single sentence that, if you deleted it, the brand would lose its spine. It answers the only question that actually keeps a brand consistent across a hundred small decisions: what do we believe that makes us do things differently?" },
      { t: 'quote', v: "A tagline is what you want people to remember. A Trueline is what you refuse to forget." },
      { t: 'h', v: 'What a Trueline is not' },
      { t: 'list', v: [
        'It is not a slogan. Slogans rhyme; Truelines commit.',
        'It is not a mission statement. Missions describe the destination; a Trueline describes the belief that got you moving.',
        'It is not a value. Values are a list. A Trueline is a decision.',
        'It is not clever. The best ones are almost boringly plain which is exactly why the whole team can hold them.'
      ] },
      { t: 'h', v: 'How we find one in a Discovery Workshop' },
      { t: 'p', v: "We don't brainstorm Truelines. You can't wordsmith your way to a truth. We excavate it. Across a session we run three passes, and the Trueline is what survives all three." },
      { t: 'p', v: "First, the enemy pass. Every brand worth its salt is against something a lazy default, an industry lie, a way of doing things that quietly wastes people's time or money. Name the enemy precisely and half the belief reveals itself." },
      { t: 'p', v: "Second, the sacrifice pass. We ask what the brand will refuse to do even when it costs money. A belief you'll act on when it's expensive is real. A belief you only hold when it's convenient is decoration." },
      { t: 'p', v: "Third, the plain-speech pass. We take the sentence and read it to someone outside the room. If they nod, it's true. If they squint, it's clever. Clever gets cut." },
      { t: 'h', v: 'A Trueline earns its keep everywhere' },
      { t: 'p', v: "Once a brand has one, it stops being a marketing artefact and starts being an operating instruction. Product argues about a feature hold it against the Trueline. Two headlines both test well the Trueline breaks the tie. A candidate is technically strong but pulls against the belief now you know. That's the return on a sentence." },
      { t: 'p', v: "You'll notice we're a branding studio called Outta The Box, and our own Trueline isn't printed on a mug. It's the thing that made us delete the mug idea." },
      { t: 'h', v: 'Try this before your next rebrand' },
      { t: 'p', v: "Write the sentence that would make a competitor uncomfortable to copy not because it's protected, but because it isn't true for them. Read it out loud. If it still feels true tomorrow morning, you've found the centre. Everything else the tagline included hangs off it." }
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
    dek: 'Template logos, borrowed voice, trend-chasing colour a quick self-audit to run before you spend a cent on a rebrand.',
    body: [
      { t: 'p', v: "“Outta the box” is a nice thing to say and a hard thing to prove. Most brands think they've broken out when they've only redecorated the inside of the box. Here's the audit we run on ourselves and on every brand that walks in the door." },
      { t: 'h', v: '01 // Your logo could belong to anyone in your category' },
      { t: 'p', v: "Cover the name. Swap in a competitor's. If nothing feels wrong, you don't have a mark you have a costume that fits the whole industry. Distinctiveness isn't decoration; it's the entire point of an identity. A brand that blends in is paying to be forgotten." },
      { t: 'h', v: '02 // You describe yourself in the same words as everyone else' },
      { t: 'p', v: "“Innovative.” “Customer-centric.” “Premium.” “Seamless.” If your about page could be pasted onto three competitors without a single edit, your voice is borrowed. Borrowed voice is the loudest signal that the strategy underneath was never sharpened." },
      { t: 'quote', v: "If your words survive a copy-paste onto a competitor's site, they were never yours." },
      { t: 'h', v: '03 // Your colour is this year, not your brand' },
      { t: 'p', v: "Trend colours feel safe because everyone else is using them which is exactly why they date. Chasing the palette of the moment means committing to re-doing it the moment it passes. Colour should come from what the brand means, not from what's on the moodboards this quarter." },
      { t: 'h', v: '04 // Everything is on-brand, nothing is unmistakable' },
      { t: 'p', v: "There's a difference between consistent and distinctive. Plenty of brands are perfectly consistent and perfectly anonymous same grid, same sans-serif, same stock photography of people laughing at salad. Consistency keeps you tidy. Distinctiveness makes you recognisable from across the room. You need both, in that order." },
      { t: 'h', v: '05 // Your brand looks great and says nothing' },
      { t: 'p', v: "The most seductive trap. The work is polished, the typography is impeccable, the case study looks like an award entry and a week later nobody can tell you what the brand stands for. Beauty without a belief is just expensive wallpaper." },
      { t: 'h', v: 'The way out' },
      { t: 'p', v: "Breaking out of the box is not a visual exercise, and it doesn't start in a design tool. It starts with a decision about what you believe and who you're willing to be unpopular with. Get that right and the identity has something to carry. Get it wrong and the prettiest rebrand in the world is still quietly, expensively in the box." },
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
    dek: 'How we generate, stress-test and legally clear names and the shortlist rules we never break.',
    body: [
      { t: 'p', v: "Naming feels like sorcery from the outside: a name appears, it's perfect, and everyone pretends it arrived fully formed in a dream. It didn't. Behind every name worth owning is a process boring enough that nobody puts it in the case study. Here's ours." },
      { t: 'h', v: 'Start with the brief, not the whiteboard' },
      { t: 'p', v: "A name can't be judged in a vacuum only against a job. Before we generate a single option we agree on what the name has to do: what it should signal, what it must never imply, how it sits next to competitors, and how much room it needs to stretch as the company grows. A name that fits today and strangles you in three years is a bad name that happened to test well." },
      { t: 'h', v: 'Generate wide, on purpose' },
      { t: 'p', v: "The first twenty names are everyone's first twenty names obvious, safe, already taken. We push past them deliberately. We generate across territories: descriptive, invented, metaphor, founder, borrowed-word, sound-led. Volume isn't the goal, but range is. You cannot shortlist bravely from a timid longlist." },
      { t: 'list', v: [
        'Descriptive says what it does. Clear, but crowded and hard to protect.',
        'Invented owns a blank space, but has to earn its meaning from scratch.',
        'Metaphor borrows a feeling from somewhere else entirely.',
        'Sound-led chosen first for how it feels in the mouth, then justified.'
      ] },
      { t: 'h', v: 'Stress-test before you fall in love' },
      { t: 'p', v: "This is where romance dies and good names survive. Every shortlist candidate goes through the same gauntlet, and we run it before anyone gets attached because attachment makes people argue with reality." },
      { t: 'list', v: [
        "Say it out loud, ten times, to someone who's never seen it spelled. If they can't spell it back, it will cost you forever in support tickets and mishears.",
        'Linguistic check across the languages your market actually speaks. The internet is full of brands that mean something unfortunate two borders over.',
        "Trademark and domain reality. A name you can't own is a name you're renting from a lawsuit.",
        "The stranger test. Does it survive being said flatly, with no logo and no context? Names shouldn't need a costume to work."
      ] },
      { t: 'quote', v: 'Fall in love after the trademark search, never before.' },
      { t: 'h', v: 'The rules we never break' },
      { t: 'p', v: "First: never present a name you couldn't defend on legal and linguistic grounds surprises after the client falls in love are how trust dies. Second: never let the cleverest name win by default; clever fades, ownable endures. Third: the name has to earn the Trueline, not fight it. A name that pulls against what the brand believes will quietly undermine every asset built on top of it." },
      { t: 'h', v: 'Why it looks like magic anyway' },
      { t: 'p', v: "When the process is done properly, the final name feels inevitable as if it were always the answer. That inevitability is the whole trick. It isn't sorcery. It's a wide net, a brutal filter, and the discipline to fall in love last." }
    ]
  },
  {
    log: '04',
    slug: 'edutech-brands',
    category: 'EDUTECH',
    readMin: '6 MIN READ',
    date: '2026.07.10',
    author: 'AHMED TAHQIQ',
    authorRole: 'CEO',
    thumb: null,
    title: 'BUILDING EDUTECH BRANDS THAT ACTUALLY TEACH.',
    dek: 'The best edutech brands do not sound like tech companies with a mission bolted on. They sound like teachers who happen to run software.',
    body: [
      { t: 'p', v: "Every other edutech brand looks the same, and there is a reason. The category was built by engineers who inherited a marketing template: friendly sans-serif, three primary colours, a hero photo of a student smiling at a laptop, the word learning in a large weight. It ships, it scales, it converts a bit. It also teaches you nothing about who the brand actually is." },
      { t: 'p', v: "We think about edutech branding differently. In this category the brand is not the wrapper around the product. It IS the product. A learner opens your app on a bad day, alone, at 11pm, and every micro-decision you have made about tone, pacing, colour, weight of voice, size of button, cost of a mistake, that entire brand system decides whether they keep going or close the tab. In edutech, brand is the teacher in the room." },
      { t: 'h', v: 'Start with a stance on learning, not a stance on tech' },
      { t: 'p', v: "The strongest edutech brands do not begin with what they teach or what tech they run. They begin with what they believe learning is. Is it curiosity? Is it repetition? Is it public? Is it playful? Is it earned? The answer becomes a Trueline that governs everything after: the copy tone, the pace of onboarding, the way you celebrate a correct answer, the way you handle a wrong one." },
      { t: 'p', v: "Duolingo believes learning is a streak. Khan Academy believes it is a right. Brilliant believes it is a puzzle. None of those beliefs were reverse-engineered from a moodboard. Each one made the rest of the brand obvious." },
      { t: 'quote', v: 'In edutech, brand is not the wrapper around the product. Brand IS the teacher in the room.' },
      { t: 'h', v: 'Design for the moment the learner almost quits' },
      { t: 'p', v: "The tone of your success screens is easy. The tone of your failure states is your entire brand. Almost every edutech brand ships confident colour, confident language, confident celebration and then falls back on generic Something went wrong copy the moment the learner stalls. That is where the trust is won or lost." },
      { t: 'p', v: "We design a brand system around that moment first. What does the brand say when the learner gets it wrong? When they skip a day? When they cannot afford the next tier? When the AI grader flags something they thought was right? A brand that has answers to those four questions has a soul. A brand that has answers only to the happy path has a landing page." },
      { t: 'h', v: 'Warm up the systemness' },
      { t: 'p', v: "Edutech ships at scale, so the brand naturally drifts toward systemness. Grids, tokens, states, components, all critical. But too much systemness kills the teacher in the room. A student in a masjid, a mother learning at the kitchen table, a professional retraining after a layoff, none of them are talking to a design system. They are talking to a voice." },
      { t: 'p', v: "The warmth comes from small deliberate defections. A handwritten mark inside a rigid grid. One typographic choice that feels human amid a stack of geometric sans. A colour that is your teacher, not your interface. Copy that says now let's try that again instead of ERROR: RETRY. The brand should look like a system and feel like a person." },
      { t: 'h', v: 'Price is a brand decision' },
      { t: 'p', v: "In edutech, the price page is the loudest sentence a brand ever writes. Free forever means one thing. 30-day trial means another. Pay-what-you-can means a third. Whatever you choose, the pricing model reveals what you actually believe about who deserves to learn. Do not outsource that decision to the growth team. It is a brand decision that happens to have revenue attached." },
      { t: 'h', v: 'Own the outcome, not the tool' },
      { t: 'p', v: "The weakest edutech positioning describes the tool: an AI-powered adaptive learning platform for. The strongest positioning describes the person after: someone who can now do the thing they could not do before. Own the after-state and every touchpoint has something to point at. Own the tool and you are competing on features forever." },
      { t: 'h', v: 'The audit we run on ourselves' },
      { t: 'list', v: [
        'If you cover our name, could the identity belong to any edutech brand? If yes, we have not built one.',
        'Does our failure state sound like the same person who wrote our success state? If not, the brand is a costume.',
        'Would a learner describe our brand voice the same way a teammate would? If not, the internal and external are out of sync.',
        'Can a stranger tell what we believe about learning after 60 seconds on the homepage? If not, we have a product page, not a brand.'
      ] },
      { t: 'p', v: "An edutech brand that gets those four right is a compounding asset. The category is loud and cheap to enter and easy to blur into. Distinctiveness plus warmth is the moat. Everyone else is building an interface. Build a teacher." }
    ]
  },
  {
    log: '05',
    slug: 'reputation',
    category: 'REPUTATION',
    readMin: '5 MIN READ',
    date: '2026.07.10',
    author: 'MUHAMMED FARAZ FAIZAL',
    authorRole: 'CHIEF BRAND OFFICER',
    thumb: null,
    title: 'REPUTATION IS THE ONLY BRAND METRIC THAT COMPOUNDS.',
    dek: 'Reputation is what people say when you leave the room. A brand is how you decide to walk in.',
    body: [
      { t: 'p', v: "There is a version of branding that treats reputation as the exhaust of good work. Ship a good product, be nice on the phone, and reputation happens on its own. That is true for a while. It is also why so many strong products end up with weak reputations and why so many weaker products end up with strong ones." },
      { t: 'p', v: "Reputation is the compound interest of every promise a brand has made and either kept or dropped. Every unanswered email, every over-promised timeline, every silent price rise, every quiet fix all of it accrues. A brand can outrun its reputation for maybe two funding rounds. After that, it becomes the ceiling on everything: hiring, pricing, partnerships, headline features, the entire pipeline." },
      { t: 'h', v: 'Brand is a bet. Reputation is the receipt.' },
      { t: 'p', v: "A brand is the story you tell about what kind of company you intend to be. A reputation is the story other people tell about what kind of company you actually are. In steady state, they should be within touching distance of each other. When they drift apart, one always wins: the reputation. Every time." },
      { t: 'p', v: "That is why the smartest brands we work with treat the gap between brand and reputation as the only KPI that matters. Not awareness. Not favourability. The delta between what we say we are and what our customers, ex-employees and partners say we are when we are not in the room." },
      { t: 'quote', v: 'A brand can outrun its reputation for two funding rounds. After that, reputation is the ceiling on everything.' },
      { t: 'h', v: 'Reputation is built where nobody is watching' },
      { t: 'p', v: "The moments that build or break reputation are almost never the moments a brand invests in. It is not the launch film. It is the refund request. It is not the product page. It is the fifth support reply. It is not the ad campaign. It is what the account manager tells a client honestly when the roadmap slips." },
      { t: 'p', v: "Which is exactly why reputation is so unfair and so valuable at the same time. It rewards the boring, sustained behaviour that nobody thinks is worth writing a brand book about. The founders who answer their inbox for years past when they need to. The teams that fix a small bug six months after launch because they said they would. The brands that under-promise loudly enough that keeping the promise looks generous." },
      { t: 'h', v: 'Three practical audits' },
      { t: 'list', v: [
        "Read your last 20 outbound emails to customers. Do they sound like the brand you spent money to build? If not, the reputation people are forming is off-brand and you paid to make it worse.",
        "Ask five recent customers to describe you in one sentence to a friend. If the sentence is not close to your Trueline, your reputation and your brand are drifting. Close the gap before your competitors notice it.",
        "Talk to two people who left, on good terms, more than a year ago. What do they still say about you? Ex-employees are the most credible narrators of your reputation, and the ones you cannot spin."
      ] },
      { t: 'h', v: 'Reputation compounds. So does the opposite.' },
      { t: 'p', v: "The reason to protect a reputation aggressively is not that it takes time to build, though it does. It is that the compounding runs in both directions. A brand with a strong reputation gets the benefit of the doubt when it launches something risky, mis-fires publicly, or raises its price. A brand with a weak reputation gets the opposite: every neutral action gets read uncharitably, every mistake confirms what people already suspected." },
      { t: 'p', v: "Which means the best possible time to invest in reputation is when you do not yet need it. The worst time is when you finally do." },
      { t: 'p', v: "You cannot design a reputation. You can only design a brand that behaves reputably enough, often enough, in the small moments, for the reputation to land where you wanted the brand to be." }
    ]
  },
  {
    log: '06',
    slug: 'brand-actions',
    category: 'BRAND STRATEGY',
    readMin: '5 MIN READ',
    date: '2026.07.10',
    author: 'MUHAMMED FARAZ FAIZAL',
    authorRole: 'CHIEF BRAND OFFICER',
    thumb: null,
    title: 'A BRAND IS WHAT A BRAND DOES.',
    dek: 'Every taste-lift and colour-swap dies against the wall of one behaviour a customer actually experiences.',
    body: [
      { t: 'p', v: "The most expensive lie in branding is that a brand is what a brand says. Whole industries are built on that lie: tone-of-voice decks, manifesto videos, values posters in the lobby, cool typographic systems that will absolutely make the growth chart go up. They rarely do, and when they do not, the standard response is more of the same but louder." },
      { t: 'p', v: "A brand is what a brand does. Everything else is a rumour the brand is trying to spread about itself." },
      { t: 'h', v: 'Actions are the only signal customers cannot fake-read' },
      { t: 'p', v: "Customers have been marketed to their entire adult lives. They discount everything a brand says by default. They cannot discount what a brand does, because the doing is happening to them. The refund policy is not a story about how the brand feels about customers. It IS how the brand feels about customers. The waiting time on support is not a proxy for the brand's respect for people's time. It IS the respect." },
      { t: 'p', v: "This is why the strongest brands in almost every category over the last twenty years won on behaviour, not on message. Zappos won on returns. Stripe won on documentation. Patagonia won on repairs. Ritz-Carlton won on staff empowerment. None of those are copy lines. All of them are decisions somebody had to make and keep making." },
      { t: 'quote', v: 'A brand is what a brand does. Everything else is a rumour the brand is trying to spread about itself.' },
      { t: 'h', v: 'The behaviour audit' },
      { t: 'p', v: "Every rebrand we run starts with a behaviour audit before it touches a colour. We list the ten most frequent moments a customer, an employee, or a partner interacts with the brand not the ten most impressive, the ten most frequent. Then we ask, for each one, what the brand actually did in that moment across the last quarter." },
      { t: 'p', v: "It is uncomfortable because the answers rarely match the deck. The brand said honest and warm. The brand actually sent a passive-aggressive dunning email at day seven. The brand said craft. The brand actually let a bug live for four months because the fix was not on the roadmap. The brand said community. The brand actually never replied to a comment that was not a compliment." },
      { t: 'p', v: "Every one of those gaps costs more than the rebrand you were considering paying for." },
      { t: 'h', v: 'Fix the behaviours, then design for them' },
      { t: 'list', v: [
        'Change one repeated behaviour that is off-brand. Ship it before you touch a logo. This alone will move perception faster than any campaign.',
        'Then find the two behaviours that are on-brand and under-signalled. Turn up the volume on those. The design system exists to make those moments more legible, not to hide the ones that are broken.',
        'Only then invest in the visual layer. It has something to carry now. Before, it was just wallpaper hanging over the wiring.'
      ] },
      { t: 'h', v: 'Why this is unpopular advice' },
      { t: 'p', v: "Behaviour change is slow and expensive and requires operational courage. Rebrands are fast and expensive and require a design agency. Almost every internal incentive pushes toward the second and away from the first. Which is exactly why the brands that pick the first end up owning categories the second-picker cannot dislodge." },
      { t: 'p', v: "The next time your team is about to spend six figures on a visual refresh, ask a simpler question first. What are three things the brand does today that would embarrass the brand book we are about to write? Fix those. Then, if you still want the refresh, at least it will land on something real." },
      { t: 'p', v: "A brand is not a promise made in a deck. It is a promise kept in the small moments that nobody put a KPI on. Get those right and you barely need branding. Get them wrong and the branding cannot save you." }
    ]
  }
];

export const STATIC_JOURNAL_BY_SLUG: Record<string, JournalArticle> =
  Object.fromEntries(STATIC_JOURNAL.map((a) => [a.slug, a]));
export const STATIC_JOURNAL_BY_LOG: Record<string, JournalArticle> =
  Object.fromEntries(STATIC_JOURNAL.map((a) => [a.log, a]));
