'use client';

import Link from 'next/link';
import {ArrowLeft, ArrowRight, Check, Heart, Leaf, MoveUpRight, Sparkles, Waves} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import {goals, resources} from '../lib/data';
import {useLanguage} from './use-language';

type Language = 'en' | 'am';
type Gender = '' | 'female' | 'male' | 'another' | 'prefer-not';
type Step = 0 | 1 | 2 | 3;
type Draft = {interests: string[]; goals: string[]; gender: Gender; language: Language; difficulty: string; format: string; customGoal: string};

const STORAGE_KEY = 'tenasew-onboarding-draft';
const interestOptions = [
  {id: 'Body confidence', Icon: Heart, en: 'Body confidence', am: 'በራስ መተማመን', enText: 'A kinder relationship with your body.', amText: 'ከሰውነትዎ ጋር የተሻለ ግንኙነት።'},
  {id: 'Healthy habits', Icon: Leaf, en: 'Healthy habits', am: 'ጤናማ ልምዶች', enText: 'Routines for rest, food, and everyday life.', amText: 'ለእረፍት፣ ምግብ እና ዕለታዊ ሕይወት ልምዶች።'},
  {id: 'Skin & hair care', Icon: Waves, en: 'Skin & hair care', am: 'ቆዳና ፀጉር', enText: 'Approachable care basics for every texture.', amText: 'ለተለያዩ ቆዳና ፀጉር ቀላል እንክብካቤ።'},
  {id: 'Strength & movement', Icon: Sparkles, en: 'Strength & movement', am: 'ጥንካሬና እንቅስቃሴ', enText: 'Move and build strength at your pace.', amText: 'በራስዎ ፍጥነት ይንቀሳቀሱ፣ ይጠናከሩ።'},
];
const genderOptions: {id: Exclude<Gender, ''>; en: string; am: string}[] = [
  {id: 'female', en: 'Female', am: 'ሴት'},
  {id: 'male', en: 'Male', am: 'ወንድ'},
  {id: 'another', en: 'Another identity', am: 'ሌላ ማንነት'},
  {id: 'prefer-not', en: 'Prefer not to say', am: 'መናገር አልፈልግም'},
];
const emptyDraft: Draft = {interests: [], goals: [], gender: '', language: 'am', difficulty: '', format: '', customGoal: ''};

function labels(a: boolean) {
  return a ? {
    steps: ['ፍላጎቶች', 'ግቦች', 'ማንነት', 'ምርጫዎች'],
    eyebrow: 'የግል የጤና ጉዞ', title: 'ለእርስዎ የሚስማማ መነሻ ነጥብ።', intro: 'ጥቂት ምርጫዎች ተገቢ መረጃዎችን ለማግኘት ይረዱዎታል። ማንኛውንም ጥያቄ መዝለል ይችላሉ።', back: 'ተመለስ', next: 'ቀጥል', skip: 'ይዝለሉ', finish: 'ምርጫዎቼን አስቀምጥ', saved: 'ተቀምጧል', signInNote: 'ለመለያዎ ለማስቀመጥ ይግቡ። እንደ እንግዳ ግን በዚህ መሣሪያ ላይ ማሰስ ይችላሉ።', custom: 'የራስዎን ግብ ይጨምሩ', optional: 'አማራጭ', selectMany: 'ከአንድ በላይ መምረጥ ይችላሉ።', language: 'የንባብ ቋንቋ', difficulty: 'የንባብ ደረጃ', format: 'የመረጃ አይነት', any: 'ማንኛውም', personalized: 'ግላዊ መረጃዎችዎ በግል ይቀመጣሉ።'
  } : {
    steps: ['Interests', 'Goals', 'Identity', 'Preferences'], eyebrow: 'Your personal wellness path', title: 'A starting point that fits you.', intro: 'A few choices help us surface useful resources. You can skip any question.', back: 'Back', next: 'Continue', skip: 'Skip', finish: 'Save my preferences', saved: 'Saved', signInNote: 'Sign in to save across your account. As a guest, your draft stays on this device.', custom: 'Add your own goal', optional: 'Optional', selectMany: 'Choose one or more.', language: 'Reading language', difficulty: 'Reading level', format: 'Resource format', any: 'Any', personalized: 'Your personal choices stay private.'
  };
}

export function WellnessOnboarding() {
  const language = useLanguage();
  const a = language === 'am';
  const t = labels(a);
  const [step, setStep] = useState<Step>(0);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setDraft({...emptyDraft, ...JSON.parse(stored)});
    } catch { /* Keep the clean default draft. */ }
    fetch('/api/preferences').then(async response => {
      if (!response.ok) return;
      const body = await response.json();
      if (body.preferences) setDraft(current => ({...current, ...body.preferences}));
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  const selectedResources = useMemo(() => {
    const selected = draft.interests.length ? draft.interests : ['General wellness'];
    return resources.filter(resource => selected.some(category => resource.category === category || (category === 'Healthy habits' && ['Nutrition', 'General wellness'].includes(resource.category)) || (category === 'Skin & hair care' && ['Skin care', 'Hair care'].includes(resource.category)) || (category === 'Strength & movement' && resource.category === 'Movement'))).slice(0, 3);
  }, [draft.interests]);

  function toggle(list: 'interests' | 'goals', value: string) {
    setDraft(current => ({...current, [list]: current[list].includes(value) ? current[list].filter(item => item !== value) : [...current[list], value]}));
  }
  function next() { setStep(current => Math.min(3, current + 1) as Step); }
  function previous() { setStep(current => Math.max(0, current - 1) as Step); }
  async function save() {
    setBusy(true); setMessage('');
    const payload = {...draft, goals: draft.customGoal.trim() ? [...draft.goals, draft.customGoal.trim()] : draft.goals};
    try {
      const response = await fetch('/api/preferences', {method: 'PUT', headers: {'content-type': 'application/json'}, body: JSON.stringify(payload)});
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setMessage(body.error || t.signInNote);
      } else {
        setSaved(true);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      }
    } catch { setMessage(t.signInNote); }
    setBusy(false);
  }

  return <section className="onboarding-shell" aria-labelledby="onboarding-title">
    <div className="onboarding-card">
      <div className="onboarding-topline"><span className="eyebrow">{t.eyebrow}</span><span className="onboarding-step-count">{a ? `ደረጃ ${step + 1} ከ 4` : `Step ${step + 1} of 4`}</span></div>
      <h1 id="onboarding-title">{t.title}</h1>
      <p className="onboarding-intro">{t.intro}</p>
      <div className="onboarding-progress" aria-label={a ? 'የመነሻ ሂደት' : 'Onboarding progress'}>{t.steps.map((label, index) => <span key={label} className={index <= step ? 'is-done' : ''}><i>{index < step ? <Check size={12}/> : index + 1}</i><b>{label}</b></span>)}</div>

      {step === 0 && <div className="onboarding-step"><h2>{a ? 'ምን ላይ ማተኮር ይፈልጋሉ?' : 'What would you like to focus on?'}</h2><p>{t.selectMany}</p><div className="onboarding-option-grid">{interestOptions.map(option => {const selected = draft.interests.includes(option.id); return <button key={option.id} type="button" className={`onboarding-option ${selected ? 'is-selected' : ''}`} aria-pressed={selected} onClick={() => toggle('interests', option.id)}><span className="onboarding-option-icon"><option.Icon size={19}/></span><span><strong>{a ? option.am : option.en}</strong><small>{a ? option.amText : option.enText}</small></span>{selected && <Check className="onboarding-check" size={18}/>}</button>})}</div></div>}

      {step === 1 && <div className="onboarding-step"><h2>{a ? 'የግል ግብዎ ምንድነው?' : 'What is your personal goal?'}</h2><p>{t.selectMany}</p><div className="onboarding-goal-list">{goals.map(goal => {const selected = draft.goals.includes(goal); return <button key={goal} type="button" className={`onboarding-goal ${selected ? 'is-selected' : ''}`} aria-pressed={selected} onClick={() => toggle('goals', goal)}><span>{selected ? <Check size={17}/> : <span className="goal-dot"/>}</span>{goal}</button>})}</div><label className="onboarding-field"><span>{t.custom} <em>({t.optional})</em></span><textarea value={draft.customGoal} onChange={event => setDraft(current => ({...current, customGoal: event.target.value}))} placeholder={a ? 'ለምሳሌ፡ በየሳምንቱ ሶስት ጊዜ መራመድ…' : 'e.g. Read one wellness book this month…'} rows={3}/></label></div>}

      {step === 2 && <div className="onboarding-step"><h2>{a ? 'ምክሮችዎን በማንነት ማበጀት ይፈልጋሉ?' : 'Would you like to personalize recommendations by gender?'}</h2><p>{t.optional}. {a ? 'ማንነት አያስፈልግም። ምክሮችዎ በግቦችዎ ላይ ይመሰረታሉ።' : 'Gender is never required. Your goals still guide recommendations.'}</p><div className="onboarding-gender-list">{genderOptions.map(option => <button key={option.id} type="button" className={`onboarding-goal ${draft.gender === option.id ? 'is-selected' : ''}`} aria-pressed={draft.gender === option.id} onClick={() => setDraft(current => ({...current, gender: option.id}))}><span>{draft.gender === option.id ? <Check size={17}/> : <span className="goal-dot"/>}</span>{a ? option.am : option.en}</button>)}</div></div>}

      {step === 3 && <div className="onboarding-step"><h2>{a ? 'የንባብ ልምድዎን ያበጁ' : 'Shape your reading experience'}</h2><p>{t.optional}</p><div className="onboarding-select-grid"><label className="onboarding-field"><span>{t.language}</span><select value={draft.language} onChange={event => setDraft(current => ({...current, language: event.target.value as Language}))}><option value="am">አማርኛ</option><option value="en">English</option></select></label><label className="onboarding-field"><span>{t.difficulty}</span><select value={draft.difficulty} onChange={event => setDraft(current => ({...current, difficulty: event.target.value}))}><option value="">{t.any}</option><option value="beginner">{a ? 'ጀማሪ' : 'Beginner'}</option><option value="intermediate">{a ? 'መካከለኛ' : 'Intermediate'}</option><option value="advanced">{a ? 'የላቀ' : 'Advanced'}</option></select></label><label className="onboarding-field"><span>{t.format}</span><select value={draft.format} onChange={event => setDraft(current => ({...current, format: event.target.value}))}><option value="">{t.any}</option><option value="books">{a ? 'መጽሐፍት' : 'Books'}</option><option value="short-notes">{a ? 'አጭር ማስታወሻዎች' : 'Short notes'}</option><option value="articles">{a ? 'ጽሑፎች' : 'Articles'}</option></select></label></div><p className="onboarding-privacy"><span>◇</span>{t.personalized}</p></div>}

      <div className="onboarding-actions"><button type="button" className="button secondary" onClick={step === 0 ? () => window.history.back() : previous} disabled={busy}><ArrowLeft size={16}/> {t.back}</button><button type="button" className="onboarding-skip" onClick={step === 3 ? save : next} disabled={busy}>{step === 3 ? t.finish : t.skip}</button>{step < 3 && <button type="button" className="button" onClick={next}>{t.next} <ArrowRight size={16}/></button>}</div>
      {message && <p className="onboarding-message" role="alert">{message}</p>}
      {saved && <div className="onboarding-saved"><Check size={17}/><span>{t.saved}. <Link href="/wellness">{a ? 'የተመከሩ መረጃዎችን ይመልከቱ' : 'See your recommended resources'} <MoveUpRight size={14}/></Link></span></div>}
      {saved && <div className="onboarding-recommendations">{selectedResources.map(resource => <Link key={resource.slug} href={`/wellness/${resource.slug}`}><span>{resource.category}</span><strong>{resource.title}</strong><ArrowRight size={15}/></Link>)}</div>}
    </div>
  </section>;
}
