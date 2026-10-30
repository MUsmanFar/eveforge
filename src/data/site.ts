export const siteConfig = {
  name: "Everforge",
  tagline: "Built to Last. Made to Grow.",
  email: "everforge9@gmail.com",
  description:
    "Everforge is a digital agency providing website development, e-commerce solutions, branding, digital marketing, and AI-powered business solutions.",
  title: "Everforge - Your Digital Partner",
  siteName: "Everforge - Your Digital Partner",
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
