export const CATEGORIES = [
  { slug: "audio", name: "Audio", description: "Headphones, earbuds & speakers" },
  { slug: "wearables", name: "Wearables", description: "Smartwatches & fitness trackers" },
  { slug: "cameras", name: "Cameras", description: "Mirrorless & instant cameras" },
  { slug: "computers", name: "Computers", description: "Laptops & accessories" },
  { slug: "phones", name: "Phones", description: "Flagship smartphones" },
  { slug: "gaming", name: "Gaming", description: "Consoles & controllers" },
] as const;

/** Placeholder id of the pre-built page that serves products added in the browser. */
export const FALLBACK_ITEM_ID = "_";

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export type Spec = { label: string; value: string };

export type Item = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: CategorySlug;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  releaseDate: string; // YYYY-MM-DD
  specs: Spec[];
  createdBy?: string;
};

export function getCategoryName(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`;

export const SEED_ITEMS: Item[] = [
  {
    id: "aurora-anc-headphones",
    title: "Aurora ANC Headphones",
    shortDescription: "Over-ear wireless headphones with adaptive noise cancelling and 40-hour battery.",
    description:
      "Aurora blends studio-grade sound with all-day comfort. Adaptive active noise cancelling tunes itself to your surroundings, while 40mm custom drivers deliver deep bass and crisp highs. Memory-foam ear cushions, multipoint Bluetooth and fast charging (10 minutes for 5 hours) make it the only pair you'll need for commutes, flights and focus sessions.",
    category: "audio",
    brand: "Aurora",
    price: 249,
    rating: 4.8,
    reviews: 1284,
    stock: 32,
    image: img("1505740420928-5e560c06d30e"),
    releaseDate: "2026-03-14",
    specs: [
      { label: "Driver", value: "40 mm dynamic" },
      { label: "Battery", value: "Up to 40 hours" },
      { label: "Connectivity", value: "Bluetooth 5.4, multipoint" },
      { label: "Weight", value: "254 g" },
    ],
  },
  {
    id: "pulse-pro-earbuds",
    title: "Pulse Pro Earbuds",
    shortDescription: "True wireless earbuds with spatial audio and a pocket-sized charging case.",
    description:
      "Pulse Pro packs big sound into a tiny shell. Spatial audio with head tracking puts you in the middle of the mix, and three microphones per bud keep calls clear even on windy streets. IPX5 sweat resistance means they're ready for the gym, and the wireless charging case gives you 30 hours of total playback.",
    category: "audio",
    brand: "Pulse",
    price: 179,
    rating: 4.6,
    reviews: 942,
    stock: 58,
    image: img("1572569511254-d8f925fe2cbb"),
    releaseDate: "2026-01-22",
    specs: [
      { label: "Battery", value: "6 h (30 h with case)" },
      { label: "Water resistance", value: "IPX5" },
      { label: "Audio", value: "Spatial audio, ANC" },
      { label: "Charging", value: "USB-C & Qi wireless" },
    ],
  },
  {
    id: "boomwave-portable-speaker",
    title: "BoomWave Portable Speaker",
    shortDescription: "Rugged waterproof Bluetooth speaker with punchy 360° sound.",
    description:
      "Take the party anywhere. BoomWave's dual passive radiators push room-filling bass, while the IP67 shell shrugs off sand, dust and a dip in the pool. Pair two speakers for stereo, or link up to 100 for a block party. A 20-hour battery keeps the music going from sunrise to sunset.",
    category: "audio",
    brand: "BoomWave",
    price: 129,
    rating: 4.5,
    reviews: 2210,
    stock: 74,
    image: img("1608043152269-423dbba4e7e1"),
    releaseDate: "2025-08-05",
    specs: [
      { label: "Output", value: "30 W" },
      { label: "Battery", value: "Up to 20 hours" },
      { label: "Durability", value: "IP67 waterproof" },
      { label: "Pairing", value: "Stereo & party mode" },
    ],
  },
  {
    id: "orbit-smartwatch-s2",
    title: "Orbit Smartwatch S2",
    shortDescription: "Always-on AMOLED smartwatch with ECG, GPS and 3-day battery life.",
    description:
      "Orbit S2 keeps you connected and healthy without reaching for your phone. Track 100+ workouts with dual-band GPS, check your heart with on-demand ECG and get gentle nudges to move, breathe and sleep better. The sapphire-glass AMOLED display stays readable in bright sunlight.",
    category: "wearables",
    brand: "Orbit",
    price: 399,
    rating: 4.7,
    reviews: 1530,
    stock: 21,
    image: img("1546868871-7041f2a55e12"),
    releaseDate: "2026-05-02",
    specs: [
      { label: "Display", value: '1.9" AMOLED, always-on' },
      { label: "Battery", value: "Up to 3 days" },
      { label: "Sensors", value: "ECG, SpO₂, heart rate" },
      { label: "GPS", value: "Dual-band L1 + L5" },
    ],
  },
  {
    id: "stride-fitness-watch",
    title: "Stride Fitness Watch",
    shortDescription: "Lightweight fitness watch built for runners, with 14-day battery.",
    description:
      "Stride focuses on what matters for training: accurate pace, heart-rate zones and recovery insights. At just 32 grams you'll forget you're wearing it, and a two-week battery means fewer trips to the charger. Syncs with all major fitness apps.",
    category: "wearables",
    brand: "Stride",
    price: 149,
    rating: 4.4,
    reviews: 688,
    stock: 46,
    image: img("1617043786394-f977fa12eddf"),
    releaseDate: "2025-11-18",
    specs: [
      { label: "Weight", value: "32 g" },
      { label: "Battery", value: "Up to 14 days" },
      { label: "Water rating", value: "5 ATM" },
      { label: "Sports modes", value: "60+" },
    ],
  },
  {
    id: "vista-mirrorless-camera",
    title: "Vista Mirrorless Camera",
    shortDescription: "24MP full-frame mirrorless camera with 4K60 video and in-body stabilisation.",
    description:
      "Vista is a compact full-frame camera for creators who shoot both stills and video. Its 24MP back-illuminated sensor excels in low light, 5-axis in-body stabilisation keeps handheld shots sharp, and real-time eye tracking locks onto people, animals and birds. Records 4K60 10-bit internally.",
    category: "cameras",
    brand: "Vista",
    price: 1899,
    rating: 4.9,
    reviews: 412,
    stock: 9,
    image: img("1516035069371-29a1b244cc32"),
    releaseDate: "2026-02-10",
    specs: [
      { label: "Sensor", value: "24 MP full-frame BSI" },
      { label: "Video", value: "4K 60p, 10-bit" },
      { label: "Stabilisation", value: "5-axis IBIS" },
      { label: "Mount", value: "Interchangeable lens" },
    ],
  },
  {
    id: "snappop-instant-camera",
    title: "SnapPop Instant Camera",
    shortDescription: "Retro instant camera that prints real photos in seconds.",
    description:
      "SnapPop brings back the joy of holding a photo moments after you take it. Auto-exposure and a built-in flash make every shot easy, a selfie mirror helps frame group pictures, and double-exposure mode unlocks creative effects. Perfect for parties, trips and gifts.",
    category: "cameras",
    brand: "SnapPop",
    price: 99,
    rating: 4.3,
    reviews: 1875,
    stock: 63,
    image: img("1526170375885-4d8ecf77b99f"),
    releaseDate: "2025-06-21",
    specs: [
      { label: "Film", value: "Instant square film" },
      { label: "Focus", value: "Two-lens autofocus" },
      { label: "Flash", value: "Auto flash" },
      { label: "Power", value: "Rechargeable, USB-C" },
    ],
  },
  {
    id: "nimbus-air-14",
    title: "Nimbus Air 14 Laptop",
    shortDescription: "Ultra-thin 14-inch laptop with an all-day battery and a 2.8K display.",
    description:
      "Nimbus Air 14 is made for work on the move. At 1.2 kg and 13 mm thin, it slips into any bag, yet its 12-core processor handles coding, design and video editing with ease. The 2.8K 120 Hz display is colour-accurate, and the battery lasts a full 18 hours.",
    category: "computers",
    brand: "Nimbus",
    price: 1299,
    rating: 4.7,
    reviews: 803,
    stock: 15,
    image: img("1496181133206-80ce9b88a853"),
    releaseDate: "2026-04-08",
    specs: [
      { label: "Display", value: '14" 2.8K, 120 Hz' },
      { label: "Memory", value: "16 GB / 512 GB SSD" },
      { label: "Battery", value: "Up to 18 hours" },
      { label: "Weight", value: "1.2 kg" },
    ],
  },
  {
    id: "keyforge-mechanical-keyboard",
    title: "KeyForge Mechanical Keyboard",
    shortDescription: "Hot-swappable 75% mechanical keyboard with PBT keycaps.",
    description:
      "KeyForge is a keyboard enthusiasts will love out of the box. Gasket-mounted for a soft, quiet typing feel, it features hot-swappable switches, double-shot PBT keycaps and a programmable knob. Connect over USB-C, Bluetooth or 2.4 GHz to switch between three devices.",
    category: "computers",
    brand: "KeyForge",
    price: 139,
    rating: 4.6,
    reviews: 1102,
    stock: 40,
    image: img("1595225476474-87563907a212"),
    releaseDate: "2025-09-30",
    specs: [
      { label: "Layout", value: "75% with knob" },
      { label: "Switches", value: "Hot-swappable" },
      { label: "Keycaps", value: "Double-shot PBT" },
      { label: "Connectivity", value: "USB-C, BT, 2.4 GHz" },
    ],
  },
  {
    id: "nova-x-smartphone",
    title: "Nova X Smartphone",
    shortDescription: "Flagship phone with a 6.7″ OLED display and a pro triple camera.",
    description:
      "Nova X is fast, beautiful and built to last. The 6.7-inch OLED display reaches 2,500 nits outdoors, the triple camera captures stunning night shots, and the titanium frame is both light and strong. Seven years of software updates keep it secure for the long haul.",
    category: "phones",
    brand: "Nova",
    price: 999,
    rating: 4.8,
    reviews: 2640,
    stock: 27,
    image: img("1592899677977-9c10ca588bbd"),
    releaseDate: "2026-09-12",
    specs: [
      { label: "Display", value: '6.7" OLED, 120 Hz' },
      { label: "Camera", value: "50 + 48 + 12 MP" },
      { label: "Storage", value: "256 GB" },
      { label: "Battery", value: "4,800 mAh" },
    ],
  },
  {
    id: "nebula-wireless-controller",
    title: "Nebula Wireless Controller",
    shortDescription: "Low-latency wireless controller with hall-effect sticks.",
    description:
      "Nebula gives you the edge in every match. Hall-effect thumbsticks never drift, remappable back paddles keep your thumbs on the sticks, and the 1000 Hz wireless link is as responsive as a cable. Works with PC, console and mobile.",
    category: "gaming",
    brand: "Nebula",
    price: 69,
    rating: 4.5,
    reviews: 1418,
    stock: 88,
    image: img("1612287230202-1ff1d85d1bdf"),
    releaseDate: "2026-06-25",
    specs: [
      { label: "Sticks", value: "Hall-effect, anti-drift" },
      { label: "Polling rate", value: "1000 Hz" },
      { label: "Battery", value: "Up to 30 hours" },
      { label: "Compatibility", value: "PC, console, mobile" },
    ],
  },
  {
    id: "titan-console-5",
    title: "Titan Console 5",
    shortDescription: "Next-gen gaming console with 4K 120 fps and ultra-fast SSD.",
    description:
      "Titan Console 5 delivers lightning-fast loads and breathtaking visuals. Ray-traced lighting and 4K output at up to 120 fps make every game look its best, while the 1 TB SSD lets you jump straight into play. Includes one wireless controller with haptic feedback.",
    category: "gaming",
    brand: "Titan",
    price: 499,
    rating: 4.9,
    reviews: 3120,
    stock: 12,
    image: img("1606144042614-b2417e99c4e3"),
    releaseDate: "2025-12-01",
    specs: [
      { label: "Resolution", value: "Up to 4K 120 fps" },
      { label: "Storage", value: "1 TB NVMe SSD" },
      { label: "Graphics", value: "Hardware ray tracing" },
      { label: "In the box", value: "1 haptic controller" },
    ],
  },
];
