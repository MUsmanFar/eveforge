export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  outcomes: string[];
  tailored?: boolean;
};

export const services: Service[] = [
  {
    id: "website-development",
    number: "01",
    title: "Website Development",
    summary: "Custom sites built for clarity, speed, and lasting impact.",
    description:
      "Custom business websites, WordPress development, redesigns, responsive builds, landing pages, SEO-friendly structure, and performance-focused experiences.",
    outcomes: [
      "Custom & WordPress sites",
      "Responsive redesigns",
      "Landing pages",
      "SEO-ready structure",
    ],
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-commerce Development",
    summary: "Storefronts that make products easy to find and buy.",
    description:
      "Shopify stores, WooCommerce, product management experiences, customized storefronts, and shopping journeys shaped around your catalog and customers.",
    outcomes: [
      "Shopify & WooCommerce",
      "Custom storefronts",
      "Product experiences",
      "Checkout-ready journeys",
    ],
  },
  {
    id: "custom-web-apps",
    number: "03",
    title: "Custom Web Applications",
    summary: "Portals, dashboards, and systems built around real workflows.",
    description:
      "Custom web portals, dashboards, business-specific systems, interactive interfaces, and integrations designed for how your team operates.",
    outcomes: [
      "Business portals",
      "Operational dashboards",
      "Interactive interfaces",
      "System integrations",
    ],
  },
  {
    id: "social-media-management",
    number: "04",
    title: "Social Media Management",
    summary: "Consistent presence with content that earns attention.",
    description:
      "Facebook and Instagram account management, content strategy, creative post design, caption writing, scheduling, and reporting.",
    outcomes: [
      "Facebook & Instagram",
      "Content strategy",
      "Creative post design",
      "Scheduling & reporting",
    ],
  },
  {
    id: "performance-marketing",
    number: "05",
    title: "Meta & Google Ads",
    summary: "Paid campaigns built around leads and measurable growth.",
    description:
      "Meta Ads, Google Ads, campaign setup, audience targeting, lead generation, optimization, and reporting—tuned to outcomes that matter.",
    outcomes: [
      "Meta & Google Ads",
      "Audience targeting",
      "Lead generation",
      "Ongoing optimization",
    ],
  },
  {
    id: "branding-creative",
    number: "06",
    title: "Branding & Design",
    summary: "Visual identity and creatives that feel intentional.",
    description:
      "Visual identity, branding assets, digital promotional materials, social media creatives, AI-assisted video concepts, and UGC-style content.",
    outcomes: [
      "Visual identity",
      "Promotional assets",
      "Social creatives",
      "AI-assisted video concepts",
    ],
  },
  {
    id: "ai-chatbots",
    number: "07",
    title: "AI Chatbots",
    summary: "Tailored assistants shaped to your business—not a generic bot.",
    description:
      "Custom website chatbots that can answer common customer questions, collect visitor information, qualify inquiries, and forward relevant details to business email or connected systems.",
    outcomes: [
      "Custom chatbot flows",
      "Lead qualification",
      "Email handoff",
      "Connected workflows",
    ],
    tailored: true,
  },
];
