const LANDSCAPE = {
  head: ['', 'Spontaneous video', 'Global payments', 'Human first'],
  rows: [
    { name: 'Instagram / TikTok', cells: ['no', 'no', 'no'] },
    { name: 'YouTube', cells: ['no', 'partial', 'no'] },
    { name: 'Venmo / Cash App', cells: ['no', 'partial', 'yes'] },
    { name: 'Patreon / Substack', cells: ['no', 'partial', 'yes'] },
    { name: 'Jelly Jelly', cells: ['yes', 'yes', 'yes'], us: true }
  ],
  marks: { yes: 'yes', partial: 'partial', no: '—' }
};

const FRAMES = [
  {
    step: 'Step 01',
    title: 'Two people, one take',
    body: 'Call a friend. Talk. The app captures it as a short, unedited clip.',
    demo: ['<span>rec</span>  00:47 · 2 people', '<span>edit</span>  none']
  },
  {
    step: 'Step 02',
    title: 'Post it as-is',
    body: 'Clips post raw to a feed built for real moments, not production value.',
    demo: ['<span>feed</span>  raw clips only', '<span>ai</span>  not allowed']
  },
  {
    step: 'Step 03',
    title: 'Send money under it',
    body: 'Any viewer can pay any creator, in any country, straight from the feed.',
    demo: ['<span>pay</span>  $5 to @kortina', '<span>where</span>  anywhere']
  }
];

const METRICS = [
  { k: 'Users', v: 40000, s: 'Today' },
  { k: 'Daily actives', v: 3000, s: 'Today' },
  { k: 'Users target', v: 1000000, s: 'Next 18 months' },
  { k: 'Actives target', v: 500000, s: 'Next 18 months' }
];

const TEAM = [
  {
    name: 'Iqram Magdon-Ismail',
    role: 'Co-founder',
    bio: 'Co-founded Venmo, which turned payments into a social feed and sold to PayPal. Building Jelly to run it the other way: make the social feed the place money moves.'
  },
  {
    name: 'Andrew Kortina',
    role: 'Co-founder',
    bio: 'Co-founded Venmo and Fin. Longtime building partner on the products that made peer-to-peer payments feel normal.'
  },
  {
    name: 'The team',
    role: 'Product · Engineering',
    bio: 'A small crew shipping weekly across video capture, payments infrastructure, and global compliance.'
  }
];

const TERMS = [
  { k: 'Instrument', v: 'SAFE' },
  { k: 'Valuation cap', v: '$15M' },
  { k: 'Raising', v: '$2M' },
  { k: 'Investors', v: 'Strategic partners' },
  { k: 'Use of funds', v: 'Growth · rails · team' }
];
