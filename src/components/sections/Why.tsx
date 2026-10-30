"use client";
import { differentiators } from "@/data/differentiators";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useScrollChapter } from "@/hooks/useScrollChapter";
import { Target, Code2, MousePointer2, MessagesSquare, Layers3, Infinity as InfinityIcon, ArrowUpRight } from "lucide-react";
const marks=[Target,Code2,MousePointer2,MessagesSquare,Layers3,InfinityIcon];
export function Why(){
 const {ref,active,jump}=useScrollChapter(differentiators.length); const Mark=marks[active];
 return <section id="why" ref={ref} className="commitment-journey"><div className="commitment-pin"><Container><div className="journey-heading"><div><SectionEyebrow index="05" label="The Everforge difference"/><h2>Your ambition.<br/><em>Our shared obsession.</em></h2></div><p>Scroll through the principles<br/>behind everything we make.</p></div><div className="commitment-layout"><div className="commitment-visual"><div className="commitment-orbits" aria-hidden><i/><i/><i/><Mark key={active} strokeWidth={1}/></div><span>THE STANDARD WE HOLD OURSELVES TO</span><strong>{differentiators[active].number}<small> / 06</small></strong></div><div className="commitment-accordion">{differentiators.map((d,i)=><div key={d.id} className={active===i?'current':''}><button onClick={()=>jump(i)} aria-expanded={active===i} aria-controls={`principle-${d.id}`}><span>{d.number}</span><h3>{d.title}</h3><ArrowUpRight size={18}/></button><div id={`principle-${d.id}`} className="commitment-answer" hidden={active!==i}><p>{d.description}</p></div></div>)}</div></div></Container></div></section>
}
