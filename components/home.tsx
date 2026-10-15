'use client';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {ArrowRight, BookOpen, Heart, Menu, ShieldCheck, Sparkles, Users, X} from 'lucide-react';
import {categories, resources} from '../lib/data';

export function Home(){
  const [menuOpen,setMenuOpen]=useState(false);
  useEffect(()=>{const close=()=>setMenuOpen(false);const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape')close()};document.addEventListener('keydown',onKey);document.addEventListener('click',close);return()=>{document.removeEventListener('keydown',onKey);document.removeEventListener('click',close)}},[]);
  const stop=(event:React.MouseEvent)=>event.stopPropagation();
  return <div className="landing-page">
    <section className="reference-hero" aria-labelledby="reference-hero-title">
      <img className="reference-hero-image" src="/tenasew-hero-reference.png" alt="TenaSew wellness journey: a woman enjoying a peaceful moment above a city landscape" />
      <h1 id="reference-hero-title" className="sr-only">Your journey to feeling better starts here.</h1>
      <div className="reference-hotspots" aria-label="Hero navigation">
        <Link className="reference-hotspot hotspot-home" href="/" aria-label="Home"><span className="sr-only">Home</span></Link>
        <Link className="reference-hotspot hotspot-wellness" href="/wellness" aria-label="Wellness"><span className="sr-only">Wellness</span></Link>
        <Link className="reference-hotspot hotspot-confidence" href="/wellness/confidence-without-comparison" aria-label="Body Confidence"><span className="sr-only">Body Confidence</span></Link>
        <Link className="reference-hotspot hotspot-ai" href="/ai" aria-label="AI Assistant"><span className="sr-only">AI Assistant</span></Link>
        <Link className="reference-hotspot hotspot-resources" href="/wellness" aria-label="Resources"><span className="sr-only">Resources</span></Link>
        <Link className="reference-hotspot hotspot-about" href="/about" aria-label="About"><span className="sr-only">About</span></Link>
        <Link className="reference-hotspot hotspot-contact" href="/contact" aria-label="Contact"><span className="sr-only">Contact</span></Link>
        <Link className="reference-hotspot hotspot-login" href="/login" aria-label="Log in"><span className="sr-only">Log in</span></Link>
        <Link className="reference-hotspot hotspot-start" href="/register" aria-label="Start Your Journey"><span className="sr-only">Start Your Journey</span></Link>
        <Link className="reference-hotspot hotspot-hero-start" href="/register" aria-label="Start Your Journey"><span className="sr-only">Start Your Journey</span></Link>
        <Link className="reference-hotspot hotspot-explore" href="/wellness" aria-label="Explore Wellness"><span className="sr-only">Explore Wellness</span></Link>
      </div>
    </section>
    <section className="section"><div className="shell"><div className="section-head"><div><div className="eyebrow">Support that meets you where you are</div><h2>Your wellbeing is more than a before-and-after.</h2></div><p>Choose what matters to you. Skip what doesn’t. Change your direction as life changes.</p></div><div className="cards">{categories.map((c,i)=><div className="card" key={c.title}><div className="icon" aria-hidden="true">{c.symbol}</div><div className="number">0{i+1}</div><h3>{c.title}</h3><p>{c.text}</p></div>)}</div></div></section>
    <section className="section alt"><div className="shell split"><div><div className="eyebrow">How TenaSew works</div><h2>Small steps. Real context. No shame.</h2><p className="lead">We turn good intentions into doable next steps, while keeping the bigger picture in view: confidence isn’t conditional on appearance.</p><div className="steps"><div className="step"><span className="step-no">1</span><div><b>Tell us what support looks like</b><p>Pick interests and goals at your pace. You can always change them later.</p></div></div><div className="step"><span className="step-no">2</span><div><b>Find useful, grounded guidance</b><p>Browse clear resources designed for real homes, budgets, bodies, and routines.</p></div></div><div className="step"><span className="step-no">3</span><div><b>Build a rhythm that belongs to you</b><p>Track habits without punitive streaks, pressure, or perfection.</p></div></div></div></div><div className="quote">“You don’t have to become someone else to deserve confidence.”<div style={{fontFamily:'Inter,sans-serif',fontSize:13,color:'#66766e',marginTop:18}}>— The TenaSew promise</div></div></div></section>
    <section className="section"><div className="shell"><div className="ai-preview"><div className="eyebrow" style={{color:'#d8a338'}}>Meet TenaSew AI</div><h2>A thoughtful starting point for your questions.</h2><p>Ask about everyday wellness, find a resource, or turn a goal into a simple next step. TenaSew AI is transparent about its limits and never diagnoses.</p><div className="bubble">How can I build a skincare routine without making it complicated?</div><div className="bubble user">Let’s start with the basics.</div><Link href="/ai" className="button gold">Explore the assistant <ArrowRight size={16} style={{verticalAlign:'middle'}}/></Link></div></div></section>
    <section className="section alt"><div className="shell"><div className="section-head"><div><div className="eyebrow">Start with something useful</div><h2>Guidance for real life.</h2></div><Link href="/wellness" className="button secondary">Browse the library</Link></div><div className="cards">{resources.slice(0,3).map(r=><div className="card" key={r.slug}><span className="tag">{r.category}</span><h3>{r.title}</h3><p>{r.summary}</p><p style={{fontSize:12,marginTop:18}}>{r.time} · {r.level}</p></div>)}</div></div></section>
    <section className="section"><div className="shell split"><div><div className="eyebrow">Our approach</div><h2>Careful with your trust.</h2><p className="lead">TenaSew is not here to sell your insecurities back to you. We focus on education, agency, and practical tools—and make it clear when professional care is the better next step.</p><Link href="/safety" className="button secondary">Read our safety promise</Link></div><div className="cards" style={{gridTemplateColumns:'1fr 1fr'}}><div className="card"><ShieldCheck className="icon"/><h3 style={{fontSize:20}}>Evidence-aware</h3><p>Clear sources and honest limits.</p></div><div className="card"><Heart className="icon"/><h3 style={{fontSize:20}}>Body-kind</h3><p>No scores, shame, or transformations.</p></div><div className="card"><Users className="icon"/><h3 style={{fontSize:20}}>Inclusive</h3><p>Designed for varied bodies and lives.</p></div><div className="card"><BookOpen className="icon"/><h3 style={{fontSize:20}}>Useful</h3><p>Simple guidance you can act on.</p></div></div></div></section>
  </div>
}
