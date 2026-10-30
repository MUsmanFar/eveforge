export type ProjectCategory =
  | "custom"
  | "wordpress"
  | "shopify"
  | "platforms"
  | "creative";

export interface Project {
  id: string;
  name: string;
  industry: string;
  description: string;
  technology: string[];
  role: string;
  contribution: string;
  category: ProjectCategory;
  image: string;
  url?: string;
  featured?: boolean;
  /** Tall scrollable screenshot path (falls back to `image`). */
  previewDesktop?: string;
  previewMobile?: string;
  /** When true, attempt iframe embedding. Most sites block framing. */
  embeddable?: boolean;
}

/** Featured showcase order — keep in sync with getShowcaseProjects(). */
export const SHOWCASE_PROJECT_IDS = [
  "dubai-tv",
  "expert-tv",
  "atlanta-car",
  "lahore",
  "america",
  "yalaride",
] as const;

export const categoryLabels: Record<ProjectCategory | "all", string> = {
  all: "All",
  custom: "Custom Builds",
  wordpress: "WordPress",
  shopify: "Shopify",
  platforms: "Platforms",
  creative: "Creative",
};

export const projects: Project[] = [
  {
    id: "expert-tv",
    name: "Expert TV Services",
    industry: "Home Services",
    description:
      "A conversion-focused service site for a TV repair brand—clear service paths, trust signals, and booking-ready calls to action.",
    technology: ["Next.js", "Tailwind CSS", "SEO"],
    role: "Full-Stack Development",
    contribution:
      "Designed and engineered the marketing site with performance-minded pages and local SEO structure.",
    category: "custom",
    image: "/assets/projects/expert-tv.webp",
    url: "https://www.experttvservices.com/",
    // Response headers verified 2026-10-28: no framing restrictions.
    embeddable: true,
    featured: true,
  },
  {
    id: "grow-dental",
    name: "Grow Dental Supply",
    industry: "Dental Supply",
    description:
      "A polished B2B storefront experience that showcases dental supply inventory with clarity and professional credibility.",
    technology: ["Next.js", "Supabase", "Custom Dashboard"],
    role: "Web Development",
    contribution:
      "Built the eCommerce storefront and a custom dashboard for products and orders.",
    category: "custom",
    image: "/assets/projects/grow-dental.webp",
    url: "https://growdentalsupply.com/",
  },
  {
    id: "al-awan",
    name: "Al-Awan Furniture",
    industry: "Furniture Retail",
    description:
      "An elegant furniture brand site that elevates collections through imagery-led storytelling and effortless browsing.",
    technology: ["Custom Web", "UI Design", "Performance"],
    role: "Web Development & Design",
    contribution:
      "Delivered a brand-forward site architecture focused on product discovery and visual merchandising.",
    category: "custom",
    image: "/assets/projects/al-awan.webp",
    url: "https://al-awanfurniture.com/",
  },
  {
    id: "dubai-tv",
    name: "Dubai TV Repair",
    industry: "Home Services",
    description:
      "A high-intent local services website built to capture repair inquiries with fast load times and clear service coverage.",
    technology: ["Next.js", "Local SEO", "Lead Capture"],
    role: "Full-Stack Development",
    contribution:
      "Engineered the full marketing experience including structured service pages and conversion-oriented UX.",
    category: "custom",
    image: "/assets/projects/dubai-tv.webp",
    url: "https://dubaitvrepair.com/",
    // Response headers verified 2026-10-28: no framing restrictions.
    embeddable: true,
    featured: true,
  },
  {
    id: "novamed",
    name: "Novamed Aesthetics",
    industry: "Aesthetics & Wellness",
    description:
      "A refined clinic presence that communicates treatments with confidence while keeping enquiry paths simple and calm.",
    technology: ["Custom Web", "Brand UI", "Responsive Design"],
    role: "Web Development",
    contribution:
      "Shaped a premium clinic website experience with treatment-focused content hierarchy and polished visuals.",
    category: "custom",
    image: "/assets/projects/novamed-aesthetics.webp",
    url: "https://www.novamedaesthetics.com.au/",
  },
  {
    id: "georgia",
    name: "Georgia Needs Nurses",
    industry: "Healthcare Staffing",
    description:
      "A recruitment-focused platform site helping nursing candidates discover opportunities across Georgia with clarity.",
    technology: ["Custom Web", "Lead Forms", "SEO"],
    role: "Web Development",
    contribution:
      "Built candidate-facing pages and inquiry flows tailored to healthcare staffing acquisition.",
    category: "custom",
    image: "/assets/projects/georgia.webp",
    url: "https://georgianeedsnurses.com",
  },
  {
    id: "royal-tech-labs",
    name: "RoyalTechLabs",
    industry: "Technology Services",
    description:
      "A crisp technology services site that positions offerings with authority and guides visitors toward engagement.",
    technology: ["Custom Web", "UI Systems", "SEO"],
    role: "Web Development",
    contribution:
      "Delivered the company website with a clear services narrative and modern brand presentation.",
    category: "custom",
    image: "/assets/projects/royal-tech-labs.webp",
    url: "https://royaltechlabs.com",
  },
  {
    id: "oj-properties",
    name: "OJ Properties & Developers",
    industry: "Real Estate",
    description:
      "A property developer website crafted to present projects, trust, and enquiry pathways with a premium finish.",
    technology: ["Custom Web", "CMS Integration", "Responsive Design"],
    role: "Web Development",
    contribution:
      "Implemented project showcases and contact journeys suited to real-estate lead generation.",
    category: "custom",
    image: "/assets/projects/oj-properties.webp",
    url: "https://oj-properties.com",
  },
  {
    id: "atlanta-car",
    name: "Atlanta Car Rental",
    industry: "Car Rental",
    description:
      "A WordPress rental experience optimized for fleet browsing, booking intent, and mobile travellers.",
    technology: ["WordPress", "Custom Theme", "SEO"],
    role: "WordPress Development",
    contribution:
      "Built and refined the WordPress site with vehicle-focused UX and conversion-ready page structure.",
    category: "wordpress",
    image: "/assets/projects/atlanta-car.webp",
    url: "https://atlantacar.ae",
    // Response headers verified 2026-10-28: no framing restrictions.
    embeddable: true,
    featured: true,
  },
  {
    id: "tight-tone",
    name: "Tight and Tone Wellness Center",
    industry: "Wellness",
    description:
      "A calming wellness center site that surfaces programs and membership paths without visual noise.",
    technology: ["WordPress", "Elementor", "Responsive Design"],
    role: "WordPress Development",
    contribution:
      "Delivered a WordPress build with program storytelling and clear appointment-oriented CTAs.",
    category: "wordpress",
    image: "/assets/projects/tight-tone.webp",
    url: "https://tightandtonewellnesscenter.com",
  },
  {
    id: "priceless",
    name: "Priceless GA",
    industry: "Business Services",
    description:
      "A WordPress presence that communicates value propositions cleanly and supports inbound enquiry.",
    technology: ["WordPress", "Custom Design", "SEO"],
    role: "WordPress Development",
    contribution:
      "Implemented the brand site on WordPress with structured content sections and mobile polish.",
    category: "wordpress",
    image: "/assets/projects/priceless.webp",
    url: "https://pricelessga.com",
  },
  {
    id: "go-jetter",
    name: "Go-Jetter Travel & Tours",
    industry: "Travel & Tours",
    description:
      "A travel marketing site that highlights destinations and tour packages with an inviting, browseable rhythm.",
    technology: ["WordPress", "Custom Theme", "Performance"],
    role: "WordPress Development",
    contribution:
      "Built the marketing website foundation with tour-oriented layouts and enquiry pathways.",
    category: "wordpress",
    image: "/assets/projects/go-jetter.webp",
    url: "https://go-jetter.com",
  },
  {
    id: "halal-musafir",
    name: "Halal Musafir",
    industry: "Travel",
    description:
      "A travel brand website oriented around Halal-friendly journeys, packages, and trust-building content.",
    technology: ["WordPress", "UI Design", "SEO"],
    role: "WordPress Development",
    contribution:
      "Crafted WordPress pages that elevate brand story while keeping booking intent front and center.",
    category: "wordpress",
    image: "/assets/projects/halal-musafir.webp",
    url: "https://halalmusafir.com",
  },
  {
    id: "rizitech",
    name: "Rizitech LLC",
    industry: "Technology Consulting",
    description:
      "A professional services site that frames capabilities, credibility, and contact paths with restraint.",
    technology: ["WordPress", "Custom Theme", "Responsive Design"],
    role: "WordPress Development",
    contribution:
      "Delivered a WordPress corporate site with clear services hierarchy and brand consistency.",
    category: "wordpress",
    image: "/assets/projects/rizitech.webp",
    url: "https://rizitech.com",
  },
  {
    id: "salaar",
    name: "Salaar Centre",
    industry: "Home Appliances / eCommerce",
    description:
      "A WooCommerce storefront for home appliances, with clear product browsing and customer enquiry paths.",
    technology: ["WordPress", "WooCommerce", "eCommerce"],
    role: "WordPress Development",
    contribution:
      "Built and presented the WooCommerce storefront for product browsing and customer enquiries.",
    category: "wordpress",
    image: "/assets/projects/salaar.webp",
    url: "https://salaarcentre.com",
  },
  {
    id: "qari",
    name: "Qari Mobiles",
    industry: "Mobile Retail",
    description:
      "A Shopify storefront concept for a mobile retailer—catalog clarity, brand presence, and purchase-ready product pages.",
    technology: ["Shopify", "Theme Customization", "E-commerce UX"],
    role: "Shopify Development",
    contribution:
      "Configured and customized the Shopify experience for retail browsing and product presentation.",
    category: "shopify",
    image: "/assets/projects/qari-mobiles.webp",
  },
  {
    id: "lahore",
    name: "Lahore Centre",
    industry: "Retail",
    description:
      "A Shopify commerce experience tailored for retail discovery with a clean storefront and product-led navigation.",
    technology: ["Shopify", "Theme Development", "E-commerce"],
    role: "Shopify Development",
    contribution:
      "Delivered the live Shopify storefront with theme refinements and conversion-minded product UX.",
    category: "shopify",
    image: "/assets/projects/lahore.webp",
    url: "https://lahorecentre.com",
    featured: true,
  },
  {
    id: "america",
    name: "America Needs Nurses",
    industry: "Healthcare Staffing",
    description:
      "A multi-market nursing recruitment platform delivered through coordinated technical project management and team execution.",
    technology: ["Web Platform", "CRM Integration", "Team Delivery"],
    role: "Technical Project Manager",
    contribution:
      "Led technical project management for team-delivered platform work—scope, timelines, stakeholder alignment, and quality gates.",
    category: "platforms",
    image: "/assets/projects/america.webp",
    url: "https://americaneedsnurses.com",
    featured: true,
  },
  {
    id: "yalaride",
    name: "YalaRide",
    industry: "Mobility / Marketplace",
    description:
      "A ride marketplace platform shipped via team-led delivery, with technical coordination across product and engineering tracks.",
    technology: ["Web App", "Product Systems", "Team Delivery"],
    role: "Technical Project Manager",
    contribution:
      "Directed technical project management and cross-functional delivery for the marketplace experience.",
    category: "platforms",
    image: "/assets/projects/yalaride.webp",
    url: "https://yalaride.com",
    featured: true,
  },
  {
    id: "go-jetter-app",
    name: "Go-Jetter Application",
    industry: "Travel Technology",
    description:
      "An application layer for travel operations, delivered through structured technical project management and collaborative engineering.",
    technology: ["Web Application", "API Coordination", "Team Delivery"],
    role: "Technical Project Manager",
    contribution:
      "Managed technical delivery across the team—prioritization, integration checkpoints, and launch readiness.",
    category: "platforms",
    image: "/assets/projects/go-jetter-app.webp",
    url: "https://go-jetter.com",
  },
  {
    id: "sameer",
    name: "Sameer Majeed",
    industry: "Personal Brand",
    description:
      "A distinctive personal brand site with expressive layout, motion-minded sections, and a strong visual identity.",
    technology: ["Next.js", "Creative UI", "Animation"],
    role: "Creative Development",
    contribution:
      "Designed and developed a portfolio experience with custom visual direction and polished interactions.",
    category: "creative",
    image: "/assets/projects/sameer-majeed.webp",
    url: "https://sameer-majeed.vercel.app",
  },
  {
    id: "rizwan",
    name: "Mohammed Rizwan",
    industry: "Personal Brand",
    description:
      "A modern portfolio presence that balances personality with professional credibility and clean information flow.",
    technology: ["Next.js", "UI Design", "Responsive Design"],
    role: "Creative Development",
    contribution:
      "Built a creative portfolio site with refined typography and structured project storytelling.",
    category: "creative",
    image: "/assets/projects/mohammed-rizwan.webp",
    url: "https://mohammed-rizwan-portfolio.vercel.app/",
  },
  {
    id: "kashan",
    name: "Mohammed Kashan",
    industry: "Personal Brand",
    description:
      "A sharp personal site experience focused on craft, clarity, and a memorable first impression.",
    technology: ["Next.js", "Creative UI", "Performance"],
    role: "Creative Development",
    contribution:
      "Delivered a portfolio build with intentional visual hierarchy and responsive polish.",
    category: "creative",
    image: "/assets/projects/mohammed-kashan.webp",
    url: "https://mohammed-kashan.vercel.app",
  },
];

export function getFeaturedProjects(): Project[] {
  return getShowcaseProjects();
}

/** Signature showcase projects in fixed display order. */
export function getShowcaseProjects(): Project[] {
  return SHOWCASE_PROJECT_IDS.map((id) => {
    const project = projects.find((p) => p.id === id);
    if (!project) {
      throw new Error(`Showcase project missing: ${id}`);
    }
    return project;
  });
}
