"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLink, MousePointer2, Smartphone } from "lucide-react";
import type { Project } from "@/data/projects";

/** Only verified embeddable sites or genuine, device-specific captures. */
export function ProjectPreview({ project, mobile = false, onLoad }: {
  project: Project; mobile?: boolean; onLoad?: () => void;
}) {
  const [interactive, setInteractive] = useState(false);
  const capture = mobile ? project.previewMobile : project.previewDesktop;
  if (project.embeddable && project.url) {
    return <div className="relative h-full min-h-full bg-[#FFFFFF]">
      {interactive ? <iframe src={project.url} title={`${project.name} ${mobile ? "mobile" : "desktop"} website`}
        loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        className={`h-full w-full border-0 ${interactive ? "" : "pointer-events-none"}`}
        tabIndex={0} onLoad={onLoad} /> : <Image src={project.image} alt={`${project.name} portfolio preview`} fill sizes="(max-width: 768px) 100vw, 70vw" className="object-contain object-top" onLoad={onLoad} />}
      {!interactive && <button type="button" onClick={() => setInteractive(true)}
        className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#F4F6F9]/80 via-transparent to-transparent pb-8"
        aria-label={`Explore ${project.name} live preview`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-[#F4F6F9]/90 px-5 py-3 text-xs text-[#10294A] shadow-xl"><MousePointer2 size={14} /> Click to explore live website</span>
      </button>}
      {interactive && <button type="button" onClick={() => setInteractive(false)} className="absolute right-2 top-2 rounded-full border border-cyan-300/40 bg-[#F4F6F9] px-3 py-2 text-xs text-[#10294A]">Exit preview</button>}
    </div>;
  }
  if (capture) return <Image src={capture} alt={`${project.name} ${mobile ? "mobile" : "desktop"} website capture`} width={mobile ? 390 : 1440} height={2400} sizes={mobile ? "300px" : "70vw"} className="h-auto w-full" onLoad={onLoad} />;
  return <div className="flex min-h-full flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_at_top,rgba(8,127,245,.18),transparent_70%)] p-6 text-center">
    {mobile ? <Smartphone className="text-[#0865C8]" size={36} /> : <Image src={project.image} alt={`${project.name} portfolio thumbnail`} width={660} height={412} sizes="60vw" className="h-auto w-full rounded-lg border border-[#173E70]/10" onLoad={onLoad} />}
    <div><p className="text-sm font-medium text-[#10294A]">{mobile ? "Explore the mobile experience" : "Portfolio snapshot"}</p><p className="mt-2 text-xs leading-relaxed text-[#526780]">{mobile ? "A mobile capture is not available yet. Visit the original site for the full experience." : "Full-page capture coming soon. Explore the original website below."}</p></div>
    {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-[#0865C8]">Open live site <ExternalLink size={13} /></a>}
  </div>;
}
