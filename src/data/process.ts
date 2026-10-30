export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description:
      "We learn your market, goals, constraints, and what success must look like before a single pixel is placed.",
  },
  {
    id: "strategize",
    number: "02",
    title: "Strategize",
    description:
      "Priorities, messaging, and technical direction are aligned into a clear plan—so craft serves outcomes, not guesswork.",
  },
  {
    id: "design",
    number: "03",
    title: "Design",
    description:
      "Editorial layouts, interaction, and visual systems are refined until the experience feels inevitable and on-brand.",
  },
  {
    id: "develop",
    number: "04",
    title: "Develop",
    description:
      "We engineer performant, maintainable builds with clean structure, accessibility, and room to grow.",
  },
  {
    id: "launch",
    number: "05",
    title: "Launch",
    description:
      "QA, soft launches, and go-live support ensure the release is stable, tracked, and ready for real traffic.",
  },
  {
    id: "support",
    number: "06",
    title: "Support",
    description:
      "After launch we stay close—iterations, optimizations, and guidance so the work keeps compounding.",
  },
];
