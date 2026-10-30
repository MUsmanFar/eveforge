"use client";

import { useLayoutEffect, useRef, type ComponentType } from "react";
import gsap from "gsap";
import { WebsiteStage } from "./WebsiteStage";
import { EcommerceStage } from "./EcommerceStage";
import { AppsStage } from "./AppsStage";
import { SocialStage } from "./SocialStage";
import { AdsStage } from "./AdsStage";
import { BrandingStage } from "./BrandingStage";
import { AiStage } from "./AiStage";

const stages: Record<string, ComponentType> = {
  "website-development": WebsiteStage,
  ecommerce: EcommerceStage,
  "custom-web-apps": AppsStage,
  "social-media-management": SocialStage,
  "performance-marketing": AdsStage,
  "branding-creative": BrandingStage,
  "ai-chatbots": AiStage,
};

type ServiceStageProps = {
  serviceId: string;
  className?: string;
};

export function ServiceStage({ serviceId, className }: ServiceStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prevId = useRef(serviceId);
  const Stage = stages[serviceId] ?? WebsiteStage;

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      prevId.current = serviceId;
      return;
    }

    const isSwap = prevId.current !== serviceId;
    prevId.current = serviceId;

    const ctx = gsap.context(() => {
      if (isSwap) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 14, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
          },
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        );
      }
    }, el);

    return () => ctx.revert();
  }, [serviceId]);

  return (
    <div ref={rootRef} className={className} key={serviceId}>
      <Stage />
    </div>
  );
}
