"use client";
import { useEffect, type ReactNode } from "react";
/** Native scrolling keeps wheel/touch input directly connected to the browser. */
export function SmoothScroll({ children }: { children: ReactNode }) {
 useEffect(()=>{
  const click=(event:MouseEvent)=>{
   if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
   const a=(event.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href^="#"]');
   const id=a?.getAttribute('href');if(!id||id==='#')return;
   const el=document.getElementById(id.slice(1));if(!el)return;
   event.preventDefault();
   const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
   window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-100,behavior:reduced?'instant':'smooth'});
   history.pushState(null,'',id);
  };
  document.addEventListener('click',click,true);return()=>document.removeEventListener('click',click,true);
 },[]);
 return <>{children}</>;
}
