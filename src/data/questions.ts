/**
 * RespondR – Assam Campus Merch Survey
 * Config-Driven Questionnaire (Q1 - Q14)
 *
 * Each question object contains:
 * - id: unique identifier ('q1' ... 'q14')
 * - category: short section tag (e.g. "Campus Intent", "Price Sensitivity")
 * - type: 'single-card' | 'multi-chip' | 'multi-limit' | 'long-text'
 * - label: main question prompt
 * - subtitle?: contextual hint or explanation
 * - options?: array of string choices or option objects
 * - required: boolean
 * - maxSelect?: number (e.g. 3 for Q7)
 * - allowOther?: boolean (shows conditional text input when selected)
 * - otherPlaceholder?: string
 * - maxChars?: number (for long-text)
 */

export interface QuestionOption {
  value: string;
  label: string;
  badge?: string;
  subtext?: string;
  isPopular?: boolean;
}

export interface Question {
  id: string;
  number: number;
  category: string;
  type: 'single-card' | 'multi-chip' | 'multi-limit' | 'long-text';
  label: string;
  subtitle?: string;
  options?: (string | QuestionOption)[];
  required: boolean;
  maxSelect?: number;
  allowOther?: boolean;
  otherKey?: string;
  otherPlaceholder?: string;
  maxChars?: number;
}

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    number: 1,
    category: "Purchase Intent",
    type: "single-card",
    label: "Would you buy and wear official streetwear-grade merchandise for your college?",
    subtitle: "Streetwear cut, high-density print, designed specifically for your campus.",
    required: true,
    options: [
      {
        value: "Yes, absolutely! (Waiting for a fire drop)",
        label: "Yes, absolutely!",
        badge: "High Intent",
        subtext: "Waiting for a fire drop with high GSM & oversized cut"
      },
      {
        value: "Yes, if the design and quality are genuinely good",
        label: "Yes, if the quality is high",
        subtext: "Only if it doesn't feel like a cheap souvenir tee"
      },
      {
        value: "Maybe, only for fests, sports, or special college days",
        label: "Maybe, for fests & events",
        subtext: "Occasional wear during annual college weeks"
      },
      {
        value: "Probably not unless everyone in my squad gets one",
        label: "Probably not",
        subtext: "Prefer wearing unbranded or generic clothing"
      }
    ]
  },
  {
    id: "q2",
    number: 2,
    category: "Past Experience",
    type: "single-card",
    label: "Have you ever bought college merchandise before?",
    subtitle: "T-shirts, hoodies, fest apparel from your current or past institution.",
    required: true,
    options: [
      {
        value: "Yes, from an official college event or fest",
        label: "Yes, official fest/event tee",
        subtext: "Purchased directly through student union or college desk"
      },
      {
        value: "Yes, custom batch T-shirt organized by seniors or classmates",
        label: "Yes, unofficial batch merch",
        subtext: "Organized via WhatsApp groups with peer printers"
      },
      {
        value: "No, our college never offered anything worth buying",
        label: "No, college never offered cool merch",
        subtext: "No reliable access or standard drops available"
      },
      {
        value: "No, existing merch designs were too boring or cheap",
        label: "No, designs felt cheap/boring",
        subtext: "Thin synthetic fabric with cheesy clip-art logos"
      }
    ]
  },
  {
    id: "q3",
    number: 3,
    category: "Apparel Types",
    type: "multi-chip",
    label: "What type of college merchandise would you be most interested in?",
    subtitle: "Tap all garments you would wear to fests or daily campus classes.",
    required: true,
    allowOther: true,
    otherKey: "q3Other",
    otherPlaceholder: "Suggest custom garment e.g., bomber jacket, varsity, enamel pins...",
    options: [
      "Oversized T-shirt",
      "Regular-fit T-shirt",
      "Polo T-shirt",
      "Heavyweight Hoodie",
      "Crewneck Sweatshirt",
      "Embroidered Cap",
      "Canvas Tote Bag",
      "College Lanyard & Enamel Pins",
      "Other"
    ]
  },
  {
    id: "q4",
    number: 4,
    category: "Visual Aesthetic",
    type: "single-card",
    label: "Which visual style fits your personal campus vibe?",
    subtitle: "What would make you proudly rock it outside college walls?",
    required: true,
    allowOther: true,
    otherKey: "q4Other",
    otherPlaceholder: "Describe your custom aesthetic style...",
    options: [
      {
        value: "Heavy Streetwear (Acid wash, bold back graphic, drop-shoulder)",
        label: "Heavy Streetwear",
        badge: "Trending",
        subtext: "Acid wash, oversized boxy silhouette, bold statement back print"
      },
      {
        value: "Assam Cultural Fusion (Modern Gamosa/Jaapi geometric weave accents)",
        label: "Assam Cultural Fusion",
        badge: "Heritage",
        subtext: "Subtle crimson Jaapi/Gamosa geometric weave borders on sleeves & nape"
      },
      {
        value: "Minimalist Collegiate (Clean typography, understated chest crest)",
        label: "Minimalist Collegiate",
        subtext: "Ivy/European university aesthetic, clean fonts, quiet luxury"
      },
      {
        value: "Vintage / Retro Athletics (Old-school varsity typography & badges)",
        label: "Vintage Retro Varsity",
        subtext: "Classic collegiate arched lettering, felt applique, contrast collars"
      },
      {
        value: "Cyberpunk / Anime / Tech Vibe (Futuristic line art & typography)",
        label: "Anime / Cyberpunk Tech",
        subtext: "Futuristic Kanji/Assamese dual glyphs, schematic line-art"
      },
      {
        value: "Other",
        label: "Other Custom Style",
        subtext: "Have your own creative concept in mind"
      }
    ]
  },
  {
    id: "q5",
    number: 5,
    category: "Fit & Silhouette",
    type: "single-card",
    label: "What silhouette or cut do you prefer for campus T-shirts?",
    subtitle: "Tailored to how Assam students style their everyday fits.",
    required: true,
    options: [
      {
        value: "Oversized / Boxy Fit (Gen-Z streetwear staple, dropped shoulders)",
        label: "Oversized / Boxy Fit",
        badge: "Streetwear #1",
        subtext: "Wide chest, relaxed dropped shoulders, slightly cropped boxy hem"
      },
      {
        value: "Relaxed Everyday Fit (Slightly loose, comfortable, breathable)",
        label: "Relaxed Everyday Fit",
        subtext: "Casual drape with extra room, breezy in Assam summer heat"
      },
      {
        value: "Classic Regular Fit (Standard cut, versatile for all occasions)",
        label: "Classic Regular Fit",
        subtext: "Standard straight-down cut, timeless and easy to layer"
      },
      {
        value: "Slim / Athletic Fit (Fitted silhouette around arms and chest)",
        label: "Slim / Athletic Fit",
        subtext: "Hugs closer to the chest and bicep taper"
      }
    ]
  },
  {
    id: "q6",
    number: 6,
    category: "Price Sensitivity",
    type: "single-card",
    label: "What price would you comfortably pay for a good-quality college T-shirt?",
    subtitle: "Assuming 100% bio-washed heavyweight cotton that lasts through college years.",
    required: true,
    options: [
      {
        value: "Below ₹299",
        label: "Below ₹299",
        subtext: "Budget cut • Basic thin cotton"
      },
      {
        value: "₹299–399",
        label: "₹299 – ₹399",
        subtext: "Standard cotton poly blend"
      },
      {
        value: "₹400–499",
        label: "₹400 – ₹499",
        badge: "Sweet Spot",
        isPopular: true,
        subtext: "Heavyweight 240 GSM • High Student Vote"
      },
      {
        value: "₹500–599",
        label: "₹500 – ₹599",
        subtext: "Acid-wash • Premium puff print & custom tags"
      },
      {
        value: "₹600–799",
        label: "₹600 – ₹799",
        subtext: "Collector tier • French terry / ultra-dense weight"
      },
      {
        value: "₹800+",
        label: "₹800+",
        subtext: "Limited varsity drops • Heavy luxury apparel"
      }
    ]
  },
  {
    id: "q7",
    number: 7,
    category: "Core Priorities",
    type: "multi-limit",
    label: "What matters most when buying college merchandise?",
    subtitle: "Select your top 3 non-negotiables.",
    required: true,
    maxSelect: 3,
    options: [
      "Aesthetic Streetwear Design",
      "Fabric Quality (GSM & Feel)",
      "College Pride & Identity",
      "Affordable Price Tag",
      "Puff & Screen Print Durability",
      "All-Day Breathable Comfort",
      "Streetwear Drop Exclusivity",
      "Convenient Campus Desk Pickup"
    ]
  },
  {
    id: "q8",
    number: 8,
    category: "Fabric Specs",
    type: "single-card",
    label: "What fabric weight and hand-feel matters most to you?",
    subtitle: "GSM determines thickness, drape, and long-term durability.",
    required: true,
    options: [
      {
        value: "Heavyweight 240–280 GSM (Thick structure, drop shoulders, zero show-through)",
        label: "Heavyweight 240–280 GSM",
        badge: "Streetwear Standard",
        subtext: "Substantial, holds boxy silhouette, premium structured feel"
      },
      {
        value: "Midweight 180–200 GSM (Breathable, comfortable in humid Assam weather)",
        label: "Midweight 180–200 GSM",
        subtext: "Light enough for Brahmaputra valley summer yet durable"
      },
      {
        value: "100% Bio-Washed Combed Cotton (Zero itch, super soft pre-shrunk handfeel)",
        label: "100% Bio-Washed Combed Cotton",
        subtext: "Silky smooth on skin with zero pilling after multiple washes"
      },
      {
        value: "French Terry Loopback Cotton (Warm, loop textured interior for cold evenings)",
        label: "French Terry Loopback Cotton",
        subtext: "Cozy interior loops, perfect for evening canteen hangouts"
      }
    ]
  },
  {
    id: "q9",
    number: 9,
    category: "Color Palette",
    type: "multi-chip",
    label: "What base colors would you rock the most on campus?",
    subtitle: "Pick the shades that easily match your everyday jeans and sneakers.",
    required: true,
    options: [
      "Carbon Black",
      "Off-White / Vintage Cream",
      "Gamosa Crimson Red",
      "Muga Amber Gold",
      "Assam Tea Garden Green",
      "Heather / Charcoal Grey",
      "Collegiate Navy Blue",
      "Washed Lavender"
    ]
  },
  {
    id: "q10",
    number: 10,
    category: "Print Placement",
    type: "single-card",
    label: "Where should the college name & graphic branding be placed?",
    subtitle: "Balancing campus representation with stylish streetwear aesthetics.",
    required: true,
    options: [
      {
        value: "Large statement back graphic + subtle front left chest crest",
        label: "Big Back Graphic + Front Pocket Crest",
        badge: "Most Popular",
        subtext: "High-impact artwork on the back, clean minimal front"
      },
      {
        value: "Minimalist center chest typography only",
        label: "Minimalist Center Chest Typography",
        subtext: "Understated arched collegiate or modern sans-serif typography"
      },
      {
        value: "Small left chest crest only (clean & quiet)",
        label: "Small Left Chest Crest Only",
        subtext: "Subtle, ultra-clean aesthetic with no back print"
      },
      {
        value: "Sleeve embroidery + subtle nape collar detail",
        label: "Sleeve & Collar Embroidery",
        subtext: "Unique hidden details that catch eyes up close"
      }
    ]
  },
  {
    id: "q11",
    number: 11,
    category: "Streetwear Vibe Check",
    type: "long-text",
    label: "What would make you look at a college T-shirt and immediately think, “I want this”?",
    subtitle: "Describe the fit, print aesthetic, heritage detailing, or fabric feel that would stand out on campus.",
    required: false,
    maxChars: 500
  },
  {
    id: "q12",
    number: 12,
    category: "Drop Delivery",
    type: "single-card",
    label: "How would you prefer to receive your college merch drop?",
    subtitle: "How we get the limited drop safely into your hands.",
    required: true,
    allowOther: true,
    otherKey: "q12Other",
    otherPlaceholder: "Specify your preferred delivery channel...",
    options: [
      {
        value: "Direct pickup stall at College Gate / Student Common Room",
        label: "College Gate / Common Room Pickup",
        badge: "Free Delivery",
        subtext: "Grab it during lunch break right inside your campus"
      },
      {
        value: "Fast doorstep home delivery via courier",
        label: "Doorstep Home Courier",
        subtext: "Directly to your hostel or home address anywhere in Assam"
      },
      {
        value: "Hand-to-hand from our college Student Campus Ambassador",
        label: "Student Campus Ambassador Handover",
        subtext: "Connect directly with your verified department peer rep"
      },
      {
        value: "Pop-up booth during College Fest / Youth Week",
        label: "Annual Fest / Youth Week Stall",
        subtext: "Try on sizes at our official drop booth during fest nights"
      },
      {
        value: "Other",
        label: "Other Delivery Method",
        subtext: "Suggest an alternative pickup or courier option"
      }
    ]
  },
  {
    id: "q13",
    number: 13,
    category: "Drop Volume",
    type: "single-card",
    label: "How many pieces of college merch would you likely grab in an academic year?",
    subtitle: "Helps us plan limited-run batch sizing and avoid waste.",
    required: true,
    options: [
      {
        value: "1 piece (My signature campus tee)",
        label: "1 piece (Signature Tee)",
        subtext: "One staple tee to wear all semester"
      },
      {
        value: "2–3 pieces (Tee + Hoodie/Sweatshirt combo)",
        label: "2–3 pieces (Tee + Hoodie Combo)",
        badge: "Standard",
        subtext: "Summer tee plus winter fleece hoodie"
      },
      {
        value: "4+ pieces (Collecting drops and matching with squad)",
        label: "4+ pieces (Collector & Squad)",
        subtext: "Buying multiple colorways and gifting batchmates"
      },
      {
        value: "Only during special limited drops or fest editions",
        label: "Only for Special Drops",
        subtext: "Rare milestone drops with unique serial tags"
      }
    ]
  },
  {
    id: "q14",
    number: 14,
    category: "Campus Ambassador",
    type: "single-card",
    label: "Would you be interested in becoming a Campus Ambassador / Drop Rep for your college?",
    subtitle: "Get free merch, early sample voting, and commission on batch orders for your department.",
    required: true,
    options: [
      {
        value: "Yes! Hook me up with early samples, free merch & drop perks",
        label: "Yes, hook me up!",
        badge: "VIP Rep",
        subtext: "Lead the drop for my college and earn student ambassador perks"
      },
      {
        value: "Maybe, send me more details when the drop launches",
        label: "Maybe, tell me more later",
        subtext: "Interested to see commission rates and responsibilities"
      },
      {
        value: "Just want to vote, get my discount, and cop the tee",
        label: "Just here to cop the merch",
        subtext: "Happy being a proud customer and voter"
      }
    ]
  }
];
