"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, Sparkles, Code2, PenTool, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

const DigitalForge = dynamic(() => import("@/components/three/DigitalForge"), { ssr: false });

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const distance = el.offsetHeight - window.innerHeight;
        setProgress(Math.round(Math.min(1, Math.max(0, -el.getBoundingClientRect().top / Math.max(1, distance))) * 40) / 40);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return <section ref={ref} id="home" className="hero-journey" aria-labelledby="hero-heading">
    <div className="hero-sticky">
      <div className="hero-grain" aria-hidden />
      <div className="hero-topline"><span><i /> Independent minds. Connected possibilities.</span><span>Strategy · Design · Technology</span></div>
      <div className="hero-halo" aria-hidden/><div className="hero-art"><DigitalForge scrollProgress={progress} className="h-full w-full" /></div>
      <div className="hero-orbit-label" aria-hidden>{progress > .5 ? '02 / Ideas become systems' : '01 / Everything starts with an idea'}</div>
      <div className="hero-chips" aria-label="Explore our capabilities">
        <a href="#services"><Code2 size={16} /> Development <ArrowUpRight size={13} /></a>
        <a href="#services"><PenTool size={16} /> Design <ArrowUpRight size={13} /></a>
        <a href="#services"><Sparkles size={16} /> Intelligence <ArrowUpRight size={13} /></a>
        <a href="#services"><TrendingUp size={16} /> Growth <ArrowUpRight size={13} /></a>
      </div>
      <div className="hero-bottom">
        <div><p className="hero-kicker">Independent digital studio</p><h1 id="hero-heading">Built to Last.<br /><span>Made to Grow.</span></h1></div>
        <div className="hero-summary"><span className="hero-intro-label">Ideas, engineered for impact.</span><p>Big ideas. Beautiful experiences.<br /> We bring design, technology, and growth together to move your business forward.</p><div className="flex flex-wrap gap-3"><Button href="#work">Explore our work <ArrowUpRight size={16} /></Button><Button href="#contact" variant="secondary">Let’s talk <ArrowUpRight size={16} /></Button></div></div>
      </div>
      <div className="hero-foot"><a href="#about"><ArrowDown size={14} /> Scroll to discover</a><span>Built with purpose. Made for what’s next.</span><span className="hero-progress"><i style={{ transform: `scaleX(${.12 + progress * .88})` }} /></span></div>
    </div>
  </section>;
}
