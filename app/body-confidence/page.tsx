import Link from 'next/link';
import {ArrowRight, Heart, Sparkles} from 'lucide-react';

export const metadata={title:'Body Confidence'};

export default function BodyConfidencePage(){
  return <div className="page-shell body-confidence-page"><section className="inner-hero"><div className="eyebrow">Body confidence</div><h1>A kinder relationship with <em>your body.</em></h1><p>Move beyond comparison and appearance pressure with gentle reflections, practical tools, and guidance that keeps your worth at the center.</p><div className="design-actions"><Link href="/wellness/confidence-without-comparison" className="design-primary">Begin the reflection <ArrowRight size={17}/></Link><Link href="/register" className="design-secondary">Start your journey</Link></div></section><section className="section"><div className="shell body-confidence-grid"><article className="card"><Heart className="icon"/><h2>Confidence without comparison</h2><p>Separate your sense of worth from online standards and other people’s timelines.</p><Link href="/wellness/confidence-without-comparison" className="text-link">Read the guide <ArrowRight size={16}/></Link></article><article className="card"><Sparkles className="icon"/><h2>Small practices, real change</h2><p>Choose a prompt, boundary, or supportive habit that fits the life you have today.</p><Link href="/ai" className="text-link">Ask TenaSew AI <ArrowRight size={16}/></Link></article></div></section></div>;
}
