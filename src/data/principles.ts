export type Principle = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const principles: Principle[] = [
  {
    id: "purpose",
    number: "01",
    title: "Built with Purpose",
    description:
      "Every page, campaign, and feature exists to move a business forward—clarity over clutter, intention over trends.",
  },
  {
    id: "perform",
    number: "02",
    title: "Designed to Perform",
    description:
      "Beauty without speed is incomplete. We obsess over load time, hierarchy, and conversion paths that earn their keep.",
  },
  {
    id: "growth",
    number: "03",
    title: "Made for Growth",
    description:
      "Foundations are built to scale—systems, content models, and marketing loops that expand with your ambition.",
  },
];
