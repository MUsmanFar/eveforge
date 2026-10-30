"use client";

import { useMemo } from "react";
import { getShowcaseProjects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import { ProjectShowcase } from "@/components/work/ProjectShowcase";

export function Work() {
  const showcase = useMemo(() => getShowcaseProjects(), []);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#F4F6F9] py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(8,127,245,0.1),transparent_45%)]"
      />

      <Container className="relative">
        <div className="max-w-2xl" data-reveal="work-intro">
          <SectionEyebrow index="03" label="Our work" />
          <h2
            id="work-heading"
            className="mt-6 font-[family-name:var(--font-space-grotesk)] text-4xl leading-[1.1] tracking-tight text-[#10294A] sm:text-5xl"
          >
            Ideas Brought
            <br />
            Into Reality.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#526780]">
            Selected experience across custom builds, commerce, platforms, and
            creative work—presented with accurate roles and verified links.
          </p>
        </div>

        <ProjectShowcase projects={showcase} />
        <ProjectGallery />
      </Container>
    </section>
  );
}
