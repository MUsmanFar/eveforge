"use client";
import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ServiceStage } from "@/components/visualizations/service-stages";
import { ArrowUpRight, ArrowDown } from "lucide-react";
export function Services(){
 const [selected,setSelected]=useState(0); const [visible,setVisible]=useState(false);const root=useRef<HTMLElement>(null);const rows=useRef<(HTMLElement|null)[]>([]);
 useEffect(()=>{
  let frame=0;
  const update=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;let closest=0,distance=Infinity;rows.current.forEach((el,i)=>{if(!el)return;const r=el.getBoundingClientRect();const d=Math.abs(r.top+r.height/2-window.innerHeight*(window.innerWidth<768?.73:.52));if(d<distance){closest=i;distance=d;}});setSelected(closest);});};
  const observer=new IntersectionObserver(([e])=>setVisible(e.isIntersecting));if(root.current)observer.observe(root.current);
  window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',update);window.removeEventListener('resize',update);};
 },[]);
 const service=services[selected];
 return <section ref={root} id="services" className="capabilities-section service-story"><Container><div className="section-heading"><div><SectionEyebrow index="02" label="Our capabilities"/><h2>One vision.<br/><em>Every possibility.</em></h2></div><p>Scroll through our expertise.<br/>See what we can build together. <ArrowDown size={16}/></p></div><div className="capabilities-grid"><div className={`capability-art ${visible?'stage-running':''}`}><div className="service-object"><ServiceStage serviceId={service.id}/></div><span className="sculpture-caption">{service.number} / 07 — Connected expertise</span><div className="capability-caption"><h3>{service.title}</h3><div className="service-dots" aria-label="Jump to a service">{services.map((s,i)=><button key={s.id} aria-label={`View ${s.title}`} aria-current={selected===i?'step':undefined} onClick={()=>rows.current[i]?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'})}/>)}</div></div></div><div className="capability-list">{services.map((s,i)=><article ref={el=>{rows.current[i]=el;}} key={s.id} id={`service-${s.id}`} className={`service-chapter ${i===selected?'is-current':''}`}><span className="chapter-number">{s.number}</span><h3>{s.title}</h3><p>{s.description}</p><ul>{s.outcomes.map(o=><li key={o}>{o}</li>)}</ul><a href="#contact" className="text-link">Explore the possibilities <ArrowUpRight size={17}/></a></article>)}</div></div></Container></section>;
}
