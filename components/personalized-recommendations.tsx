'use client';

import Link from 'next/link';
import {ArrowRight, Sparkles} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import {resources} from '../lib/data';
import {useLanguage} from './use-language';

const STORAGE_KEY = 'tenasew-onboarding-draft';

type PreferenceDraft = {interests?: string[]; goals?: string[]};

function matches(resource: typeof resources[number], interests: string[], goals: string[]) {
  const text = `${resource.title} ${resource.summary} ${resource.category}`.toLowerCase();
  const categoryMatch = interests.some(category => resource.category === category || (category === 'Healthy habits' && ['Nutrition', 'General wellness'].includes(resource.category)) || (category === 'Skin & hair care' && ['Skin care', 'Hair care'].includes(resource.category)) || (category === 'Strength & movement' && resource.category === 'Movement'));
  const goalMatch = goals.some(goal => goal.toLowerCase().split(' ').some(word => word.length > 4 && text.includes(word)));
  return categoryMatch || goalMatch;
}

export function PersonalizedRecommendations() {
  const a = useLanguage() === 'am';
  const [preferences, setPreferences] = useState<PreferenceDraft | null>(null);
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setPreferences(JSON.parse(saved));
    } catch { /* Keep the explore state. */ }
  }, []);
  const recommended = useMemo(() => {
    if (!preferences) return [];
    const interests = preferences.interests ?? [];
    const goals = preferences.goals ?? [];
    return resources.filter(resource => matches(resource, interests, goals)).slice(0, 3);
  }, [preferences]);
  if (!preferences || !recommended.length) return <section className="recommendation-invite"><div><span className="recommendation-kicker"><Sparkles size={14}/> {a ? 'ለእርስዎ የተመረጠ' : 'A more personal library'}</span><h2>{a ? 'ከግቦችዎ ጋር ይጀምሩ።' : 'Start with what matters to you.'}</h2><p>{a ? 'ጥቂት ምርጫዎች ከፍላጎትዎ ጋር የሚዛመዱ መረጃዎችን ያሳያሉ።' : 'Choose your interests and goals to see a short list of resources that fit your season.'}</p></div><Link href="/onboarding" className="button">{a ? 'መነሻ ነጥብዎን ይፍጠሩ' : 'Shape your recommendations'} <ArrowRight size={16}/></Link></section>;
  return <section className="recommendation-panel" aria-labelledby="recommendation-title"><div className="recommendation-panel-head"><div><span className="recommendation-kicker"><Sparkles size={14}/> {a ? 'ለእርስዎ የተመረጠ' : 'Picked for your path'}</span><h2 id="recommendation-title">{a ? 'ከእርስዎ ፍላጎቶች የሚጀምሩ መረጃዎች።' : 'A few good places to begin.'}</h2></div><Link href="/onboarding" className="text-link">{a ? 'ምርጫዎችን ያስተካክሉ' : 'Edit preferences'} <ArrowRight size={15}/></Link></div><div className="recommendation-grid">{recommended.map(resource => <Link key={resource.slug} href={`/wellness/${resource.slug}`} className="recommendation-card"><span>{resource.category}</span><h3>{resource.title}</h3><p>{resource.summary}</p><small>{a ? 'ለምን እንደተመረጠ፡ ከፍላጎትዎ ጋር ይዛመዳል።' : 'Why this fits: it connects to your selected focus.'}</small><ArrowRight size={16}/></Link>)}</div></section>;
}
