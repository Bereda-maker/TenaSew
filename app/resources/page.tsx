import Link from 'next/link';
import {ArrowRight, BookOpen, Search} from 'lucide-react';
import {resources} from '../../lib/data';

export const metadata={title:'Resources'};

export default function ResourcesPage(){
  return <div className="page-shell resources-page"><section className="inner-hero"><div className="eyebrow">TenaSew resources</div><h1>Guidance for <em>real life.</em></h1><p>Thoughtful, practical reads for body confidence, healthy habits, nutrition, movement, skin, and everyday wellbeing.</p><div className="resource-search"><Search size={18}/><input aria-label="Search resources" placeholder="Search the library"/><span>⌘ K</span></div></section><section className="section"><div className="resource-grid">{resources.map(resource=><article className="resource-card" key={resource.slug}><div className="resource-card-top"><span className="tag">{resource.category}</span><BookOpen size={18}/></div><h2>{resource.title}</h2><p>{resource.summary}</p><div className="resource-card-bottom"><span>{resource.time} · {resource.level}</span><Link href={`/wellness/${resource.slug}`} aria-label={`Read ${resource.title}`}><ArrowRight size={17}/></Link></div></article>)}</div></section></div>;
}
