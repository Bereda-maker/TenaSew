'use client';

import {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import {ArrowRight, Search} from 'lucide-react';
import {resources} from '../../lib/data';
import {useLanguage} from '../../components/use-language';

const categories = ['All', 'Body confidence', 'Healthy habits', 'Skin & hair care', 'Strength & movement', 'Nutrition', 'Movement', 'Skin care', 'Hair care', 'General wellness'];

function matchesCategory(resourceCategory: string, selected: string) {
  if (selected === 'All') return true;
  if (selected === 'Healthy habits') return ['Nutrition', 'General wellness'].includes(resourceCategory);
  if (selected === 'Skin & hair care') return ['Skin care', 'Hair care'].includes(resourceCategory);
  if (selected === 'Strength & movement') return resourceCategory === 'Movement';
  return resourceCategory === selected;
}

export default function Wellness() {
  const a = useLanguage() === 'am';
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  useEffect(() => {
    const requestedCategory = new URLSearchParams(window.location.search).get('category');
    if (requestedCategory && categories.includes(requestedCategory)) setCat(requestedCategory);
  }, []);

  const visible = useMemo(() => resources.filter(resource =>
    matchesCategory(resource.category, cat) &&
    `${resource.title} ${resource.summary} ${resource.category}`.toLowerCase().includes(q.toLowerCase())
  ), [q, cat]);

  return <>
    <section className="page-hero">
      <div className="shell">
        <div className="eyebrow">{a ? 'የጤና ቤተ-መጽሐፍት' : 'Wellness library'}</div>
        <h1>{a ? 'ያለ ጫጫታ ጠቃሚ እውቀት።' : 'Useful knowledge, without the noise.'}</h1>
        <p>{a ? 'ለሰውነት መተማመን፣ ለልምዶች፣ ለእንቅስቃሴ፣ ለምግብ፣ ለቆዳ፣ ለፀጉር እና ለዕለታዊ ጤና ተደራሽ መረጃዎችን ያስሱ።' : 'Explore approachable resources for body confidence, habits, movement, nutrition, skin, hair, and everyday wellbeing.'}</p>
      </div>
    </section>
    <section className="section">
      <div className="shell">
        <div className="library-toolbar">
          <div style={{position: 'relative', flex: 1}}>
            <Search size={18} style={{position: 'absolute', left: 14, top: 14, color: '#66766e'}}/>
            <input className="input" style={{paddingLeft: 42, width: '100%'}} aria-label={a ? 'መረጃ ፈልግ' : 'Search resources'} placeholder={a ? 'ቤተ-መጽሐፍቱን ይፈልጉ' : 'Search the library'} value={q} onChange={event => setQ(event.target.value)}/>
          </div>
          <select className="select" aria-label={a ? 'በምድብ አጣራ' : 'Filter by category'} value={cat} onChange={event => setCat(event.target.value)}>
            {categories.map(category => <option key={category}>{category}</option>)}
          </select>
        </div>
        <p style={{color: 'var(--muted)', fontSize: 13}}>{visible.length} {a ? 'መረጃዎች' : 'resources'} · {a ? 'ለግልጽነት የተገመገመ' : 'Reviewed for clarity'}</p>
        <div className="resource-grid">
          {visible.map(resource => <article className="card resource-card" key={resource.slug}>
            <span className="tag">{resource.category}</span>
            <h3>{resource.title}</h3>
            <p>{resource.summary}</p>
            <p style={{fontSize: 12, marginTop: 18}}>{resource.time} · {resource.level}</p>
            <Link href={`/wellness/${resource.slug}`} style={{display: 'inline-flex', gap: 7, marginTop: 16, color: 'var(--green)', fontWeight: 800, fontSize: 13}}>{a ? 'መረጃውን ያንብቡ' : 'Read resource'} <ArrowRight size={15}/></Link>
          </article>)}
        </div>
        {!visible.length && <div className="card" style={{marginTop: 20, textAlign: 'center'}}><h3>{a ? 'የሚዛመድ መረጃ የለም።' : 'No matching resources yet.'}</h3></div>}
      </div>
    </section>
  </>;
}
