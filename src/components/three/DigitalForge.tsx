"use client";

import { Component, useEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import logoPoints from "@/data/logo-points.json";

const vertexShader = `
 attribute vec3 sphere;
 attribute vec3 cube;
 attribute float seed;
 uniform float time;
 uniform float assembly;
 uniform float morph;
 uniform float pixelRatio;
 uniform vec2 cursor;
 uniform float hover;
 varying float vSeed;
 void main() {
   vSeed = seed;
   vec3 p = mix(sphere, position, smoothstep(0., 1., assembly));
   p = mix(p, cube, smoothstep(0., 1., morph));
   p.x += sin(time * .7 + seed * 50.) * .013;
   p.y += cos(time * .6 + seed * 32.) * .014;
   vec2 away = p.xy - cursor;
   float influence = exp(-dot(away, away) * 1.8) * hover;
   p.xy += normalize(away + vec2(.001)) * influence * (1.1 + seed);
   p.z += sin(seed * 91. + time) * influence * .9;
   vec4 mv = modelViewMatrix * vec4(p, 1.);
   gl_Position = projectionMatrix * mv;
   gl_PointSize = clamp((8.0 + seed * 5.0) * pixelRatio / -mv.z, .8, 3.5);
 }`;
const fragmentShader = `
 varying float vSeed;
 void main() {
   float d = length(gl_PointCoord - .5);
   if (d > .5) discard;
   vec3 blue = mix(vec3(.015,.19,.66), vec3(.0,.59,.93), vSeed);
   gl_FragColor = vec4(blue, (.8 + vSeed * .2) * smoothstep(.5,.25,d));
 }`;
const hash = (n: number) => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); };

function ParticleSculpture({ progress, count, interaction }: { progress: number; count: number; interaction: MutableRefObject<{x:number;y:number;active:number}> }) {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const born = useRef<number | null>(null);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const position = new Float32Array(count * 3);
    const sphere = new Float32Array(count * 3);
    const cube = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const p = logoPoints[i % logoPoints.length];
      const a = hash(i + 10), b = hash(i + 91), c = hash(i + 257);
      position.set([p[0], p[1] + .18, (a - .5) * .24], i * 3);
      const theta = a * Math.PI * 2, phi = Math.acos(2 * b - 1);
      sphere.set([Math.sin(phi) * Math.cos(theta) * 1.12, Math.cos(phi) * 1.12 + .18, Math.sin(phi) * Math.sin(theta) * 1.12], i * 3);
      const v = [(a - .5) * 1.9, (b - .5) * 1.9, (c - .5) * 1.9];
      v[i % 3] = i % 2 ? .95 : -.95;
      cube.set(v, i * 3);
      seed[i] = a;
    }
    g.setAttribute('position', new THREE.BufferAttribute(position, 3));
    g.setAttribute('sphere', new THREE.BufferAttribute(sphere, 3));
    g.setAttribute('cube', new THREE.BufferAttribute(cube, 3));
    g.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
    return g;
  }, [count]);
  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader, fragmentShader, transparent: true, depthWrite: false,
    uniforms: { time: { value: 0 }, assembly: { value: 0 }, morph: { value: 0 }, pixelRatio: { value: 1.5 }, cursor: { value: new THREE.Vector2() }, hover: { value: 0 } },
  }), []);
  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);
  useFrame(({ clock, pointer }, delta) => {
    const liveMaterial = points.current?.material;
    if (!liveMaterial) return;
    const t = clock.getElapsedTime();
    if (born.current === null) born.current = t;
    liveMaterial.uniforms.time.value = t;
    liveMaterial.uniforms.cursor.value.lerp(new THREE.Vector2(interaction.current.x, interaction.current.y), 1 - Math.exp(-delta * 9));
    liveMaterial.uniforms.hover.value = THREE.MathUtils.damp(liveMaterial.uniforms.hover.value, interaction.current.active, 4, delta);
    liveMaterial.uniforms.assembly.value = Math.min(1, Math.max(0, (t - born.current - .3) / 2.2));
    liveMaterial.uniforms.morph.value = THREE.MathUtils.damp(liveMaterial.uniforms.morph.value, progress, 5, delta);
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * .18 + progress * .65, 3, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * .08 + progress * .22, 3, delta);
      group.current.position.y = Math.sin(t * .65) * .035;
    }
  });
  return <group ref={group}><points ref={points} geometry={geometry} material={material} frustumCulled={false} /></group>;
}

function Ripples() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const scale = 1 + Math.sin(clock.elapsedTime * .65 - i * .6) * .025;
      child.scale.set(scale, scale, scale);
    });
  });
  return <group ref={group} position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    {Array.from({ length: 7 }, (_, i) => <mesh key={i}>
      <ringGeometry args={[.6 + i * .34, .607 + i * .34, 160]} />
      <meshBasicMaterial color="#087ff5" transparent opacity={.28 - i * .026} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>)}
  </group>;
}
function Fallback() {
  return <div className="forge-fallback"><div className="forge-fallback-orbit" /><div className="forge-fallback-orbit second" /><Image src="/assets/brand/icon-e.png" alt="" width={512} height={512} className="w-[min(48%,340px)]" priority /></div>;
}
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Fallback /> : this.props.children; }
}
export default function DigitalForge({ className, scrollProgress = 0 }: { className?: string; scrollProgress?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const interaction = useRef({x:0,y:0,active:0});
  const [active, setActive] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [count, setCount] = useState(3900);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    const frame = requestAnimationFrame(() => { sync(); setCount(window.innerWidth < 768 ? 2600 : 5200); });
    mq.addEventListener('change', sync);
    let inView = true;
    const syncVisibility = () => setActive(inView && !document.hidden);
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = new IntersectionObserver(([entry]) => { inView=entry.isIntersecting; syncVisibility(); });
    if (ref.current) observer.observe(ref.current);
    return () => { cancelAnimationFrame(frame); mq.removeEventListener('change', sync); observer.disconnect(); document.removeEventListener("visibilitychange", syncVisibility); };
  }, []);
  return <div ref={ref} className={className} onPointerMove={(e) => { const r=e.currentTarget.getBoundingClientRect(); interaction.current={x:((e.clientX-r.left)/r.width-.5)*4.5,y:(.5-(e.clientY-r.top)/r.height)*4.2,active:1}; }} onPointerLeave={() => { interaction.current.active=0; }} aria-hidden>
    {reduced ? <Fallback /> : <Boundary><Canvas fallback={<Fallback />} camera={{ position: [0, .45, 5.8], fov: 40 }} dpr={[1, 1.25]} frameloop={active ? 'always' : 'never'} gl={{ alpha: true, antialias: true }}>
      <ParticleSculpture progress={scrollProgress} count={count} interaction={interaction} /><Ripples />
    </Canvas></Boundary>}
  </div>;
}
