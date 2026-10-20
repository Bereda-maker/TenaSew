'use client';

import {useState} from 'react';
import {ArrowLeft, ArrowRight, Clock3, Heart, Leaf, MoveUpRight, Sparkles, Waves} from 'lucide-react';

type Language = 'en' | 'am';
type CategoryId = 'confidence' | 'habits' | 'care' | 'movement';

const categories: Array<{
  id: CategoryId;
  label: Record<Language, string>;
  title: Record<Language, string>;
  description: Record<Language, string>;
  Icon: typeof Heart;
  art: string;
  note: Record<Language, string>;
}> = [
  {
    id: 'confidence', Icon: Heart, art: 'confidence',
    label: {en: 'Body confidence', am: 'በራስ መተማመን'},
    title: {en: 'Progress is more than what you see in the mirror.', am: 'እድገት በመስታወት ከሚታየው በላይ ነው።'},
    description: {en: 'Celebrate the moments you begin to appreciate yourself, just as you are.', am: 'እራስዎን እንዳሉ ማድነቅ የጀመሩባቸውን ጊዜያት ያክብሩ።'},
    note: {en: 'Confidence has no before-and-after.', am: 'በራስ መተማመን የበፊትና በኋላ ለውጥ አይደለም።'},
  },
  {
    id: 'habits', Icon: Leaf, art: 'habits',
    label: {en: 'Healthy habits', am: 'ጤናማ ልምዶች'},
    title: {en: 'Small habits. Real-life progress.', am: 'ትንንሽ ልምዶች። እውነተኛ እድገት።'},
    description: {en: 'Discover how everyday choices can become meaningful parts of your life.', am: 'የዕለት ተዕለት ምርጫዎች ትርጉም ያላቸው የሕይወትዎ ክፍሎች ሲሆኑ ይመልከቱ።'},
    note: {en: 'No routine guarantees a particular outcome.', am: 'ማንኛውም ልምድ የተለየ ውጤት አያረጋግጥም።'},
  },
  {
    id: 'care', Icon: Waves, art: 'care',
    label: {en: 'Skin & hair care', am: 'የቆዳና ፀጉር እንክብካቤ'},
    title: {en: 'Your care journey, your own pace.', am: 'የእንክብካቤ ጉዞዎ በራስዎ ፍጥነት።'},
    description: {en: 'Explore real experiences, routines, and personal milestones shared by our community.', am: 'በማህበረሰባችን የተጋሩ እውነተኛ ተሞክሮዎችን፣ ልምዶችንና የግል ምዕራፎችን ያስሱ።'},
    note: {en: 'Care stories, never cure promises.', am: 'የእንክብካቤ ታሪኮች፤ የፈውስ ቃል ኪዳን አይደሉም።'},
  },
  {
    id: 'movement', Icon: Sparkles, art: 'movement',
    label: {en: 'Strength & movement', am: 'ጉልበትና እንቅስቃሴ'},
    title: {en: 'Celebrate what your body can do.', am: 'ሰውነትዎ የሚያደርገውን ያክብሩ።'},
    description: {en: 'Every step, every movement, every milestone belongs to your journey.', am: 'እያንዳንዱ እርምጃ፣ እንቅስቃሴና ምዕራፍ የእርስዎ ጉዞ አካል ነው።'},
    note: {en: 'There is no single way to move.', am: 'ለመንቀሳቀስ አንድ ብቻ መንገድ የለም።'},
  },
];

const words = {
  en: {eyebrow: 'Real journeys, shared with care', heading: 'A little progress can mean a lot.', intro: 'A place for the everyday moments and personal milestones that make a wellbeing journey your own.', all: 'All journeys', gallery: 'Gallery', timeline: 'Timeline', emptyTitle: 'Community stories are on their way.', empty: 'No stories have been approved for public sharing yet. We will only feature stories people have chosen to share.', view: 'Explore this journey', previous: 'Previous category', next: 'Next category', disclaimer: 'Stories appear here only after a person chooses what to share and an administrator approves it.'},
  am: {eyebrow: 'እውነተኛ ጉዞዎች፣ በጥንቃቄ የተጋሩ', heading: 'ትንሽ እድገት ትልቅ ትርጉም ሊኖረው ይችላል።', intro: 'የጤና ጉዞዎን የራስዎ የሚያደርጉትን የዕለት ተዕለት ጊዜያትና የግል ምዕራፎች የሚያከብር ቦታ።', all: 'ሁሉም ጉዞዎች', gallery: 'ማዕከለ-ስዕላት', timeline: 'የጊዜ ሰሌዳ', emptyTitle: 'የማህበረሰብ ታሪኮች በቅርቡ ይመጣሉ።', empty: 'ለህዝብ እንዲጋሩ የተፈቀዱ ታሪኮች ገና የሉም። ሰዎች ለማጋራት የመረጡትን ብቻ እናሳያለን።', view: 'ይህን ጉዞ ያስሱ', previous: 'የቀደመው ምድብ', next: 'ቀጣዩ ምድብ', disclaimer: 'ሰውዬው የሚጋራውን ከመረጠና አስተዳዳሪ ካጸደቀ በኋላ ብቻ ታሪኮች እዚህ ይታያሉ።'},
} as const;

export function UserProgressShowcase({language = 'en'}: {language?: Language}) {
  const [active, setActive] = useState<CategoryId | 'all'>('all');
  const [view, setView] = useState<'gallery' | 'timeline'>('gallery');
  const text = words[language];
  const visible = active === 'all' ? categories : categories.filter(category => category.id === active);
  const move = (direction: number) => {
    const current = Math.max(0, categories.findIndex(category => category.id === active));
    setActive(categories[(current + direction + categories.length) % categories.length].id);
  };

  return <section className="progress-showcase" id="community-journeys" aria-labelledby="progress-title" lang={language === 'am' ? 'am' : 'en'}>
    <div className="progress-shell">
      <header className="progress-heading">
        <div><span className="progress-eyebrow"><span aria-hidden="true">✳</span> {text.eyebrow}</span><h2 id="progress-title">{text.heading}</h2></div>
        <p>{text.intro}</p>
      </header>
      <div className="progress-toolbar">
        <div className="progress-filters" role="group" aria-label={text.all}>
          <button type="button" className={active === 'all' ? 'is-active' : ''} aria-pressed={active === 'all'} onClick={() => setActive('all')}>{text.all}</button>
          {categories.map(({id, label}) => <button key={id} type="button" className={active === id ? 'is-active' : ''} aria-pressed={active === id} onClick={() => setActive(id)}>{label[language]}</button>)}
        </div>
        <div className="progress-view-toggle" role="group" aria-label={language === 'am' ? 'የማሳያ አይነት' : 'Show stories as'}>
          <button type="button" aria-pressed={view === 'gallery'} className={view === 'gallery' ? 'is-active' : ''} onClick={() => setView('gallery')}>{text.gallery}</button>
          <button type="button" aria-pressed={view === 'timeline'} className={view === 'timeline' ? 'is-active' : ''} onClick={() => setView('timeline')}><Clock3 size={14}/> {text.timeline}</button>
        </div>
      </div>
      <div className={`progress-grid ${view === 'timeline' ? 'is-timeline' : ''}`}>
        {visible.map(({id, Icon, art, label, title, description, note}, index) => <article className={`progress-card progress-${art}`} key={id}>
          <div className={`progress-art art-${art}`} aria-hidden="true">
            <span className="art-orbit orbit-one"/><span className="art-orbit orbit-two"/><span className="art-symbol"><Icon size={38} strokeWidth={1.35}/></span>
            <span className="art-caption">TenaSew · {String(index + 1).padStart(2, '0')}</span>
            {view === 'timeline' && <span className="art-timeline-mark"><span/><span/><span/></span>}
          </div>
          <div className="progress-card-copy">
            <div className="progress-category"><span className={`progress-dot dot-${art}`}/>{label[language]}</div>
            <h3>{title[language]}</h3>
            <p>{description[language]}</p>
            <div className="progress-card-note"><span>{note[language]}</span><MoveUpRight size={16} aria-hidden="true"/></div>
            <div className="progress-empty" role="status"><span className="progress-empty-icon"><Icon size={15}/></span><div><strong>{text.emptyTitle}</strong><p>{text.empty}</p></div></div>
          </div>
        </article>)}
      </div>
      <div className="progress-mobile-controls">
        <button type="button" aria-label={text.previous} onClick={() => move(-1)}><ArrowLeft size={17}/><span>{text.previous}</span></button>
        <button type="button" aria-label={text.next} onClick={() => move(1)}><span>{text.next}</span><ArrowRight size={17}/></button>
      </div>
      <p className="progress-consent-note"><span aria-hidden="true">◇</span> {text.disclaimer}</p>
    </div>
  </section>;
}
