"use client";
import { processSteps } from "@/data/process";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useScrollChapter } from "@/hooks/useScrollChapter";
import { ArrowRight, Check } from "lucide-react";
const deliverables = ['A shared understanding of your goals','A clear roadmap and priorities','A visual direction you can experience','A working product built with care','A tested, confident release','An evolving platform for growth'];
const documents = ['Discovery brief','Project roadmap','Design system','Development sprint','Launch checklist','Growth report'];
const details = [['Audience & market','Goals & opportunities','Success criteria'],['Priorities aligned','Milestones mapped','Scope confirmed'],['Typography & colour','Components & layouts','Interactive prototype'],['Core features','Responsive behaviour','Integration & QA'],['Accessibility review','Performance checks','Ready to go live'],['Review & insights','Ongoing improvements','Next opportunities']];
export function Process() {
  const {ref, active, jump} = useScrollChapter(processSteps.length);
  return <section id="process" ref={ref} className="horizontal-journey process-refined">
    <div className="journey-pin"><Container>
      <div className="journey-heading"><div><SectionEyebrow index="04" label="From possibility to reality"/><h2>From first thought.<br/><em>To something that lasts.</em></h2></div><p>Keep scrolling to follow the journey.<br/>From the first question to what comes next.</p></div>
      <nav className="journey-navigation" aria-label="Project stages">{processSteps.map((s,i)=><button key={s.id} onClick={()=>jump(i)} aria-current={active===i?'step':undefined}><span>{s.number}</span>{s.title}<ArrowRight size={14}/></button>)}</nav>
      <div className="journey-window"><div className="journey-track" style={{ transform: `translate3d(-${active * 100}%,0,0)` }}>{processSteps.map((s,i)=><article className={`journey-panel phase-${i}`} key={s.id} aria-label={`Phase ${s.number}: ${s.title}`}><div className="journey-copy"><span className="journey-index">{s.number} / 06</span><h3>{s.title}</h3><p>{s.description}</p><div className="journey-outcome"><span>WHAT YOU LEAVE WITH</span><strong>{deliverables[i]}</strong></div></div><div className="journey-document"><span className="process-big-number" aria-hidden="true">{s.number}</span><div className="sheet-top"><span>EVERFORGE / WORKING FILE</span><span>{s.number}</span></div><h4>{documents[i]}</h4>{details[i].map(line=><p key={line}><Check size={15}/>{line}</p>)}<span className="journey-seal">{i===4?'READY FOR THE WORLD':'MADE WITH INTENT'} ↗</span></div></article>)}</div></div>
      <div className="journey-progress"><span>SCROLL TO EXPLORE</span><div><i/></div><span>{String(active+1).padStart(2,'0')} / 06</span></div>
    </Container></div>
  </section>;
}
