'use client';

import {useState} from 'react';
import Link from 'next/link';
import {ArrowRight, Heart, Leaf, MoveUpRight, Sparkles, Waves} from 'lucide-react';

type Language = 'en' | 'am';
type CategoryId = 'confidence' | 'habits' | 'care' | 'movement';

const categories: Array<{
  id: CategoryId;
  label: Record<Language, string>;
  title: Record<Language, string>;
  description: Record<Language, string>;
  Icon: typeof Heart;
  art: string;
  image: string;
  href: string;
  note: Record<Language, string>;
}> = [
  {
    id: 'confidence', Icon: Heart, art: 'confidence', image: '/confi.png', href: '/wellness?category=Body%20confidence',
    label: {en: 'Body confidence', am: 'በራስ መተማመን'},
    title: {en: 'Progress is more than what you see in the mirror.', am: 'እድገት በመስታወት ከሚታየው በላይ ነው፡'},
    description: {en: 'Build a kinder relationship with your body, without making appearance the goal.', am: 'የውጭ ገጽታን ብቻ ግብ ሳያደርጉ ከራስዎ አካል ጋር አዎንታዊና ሰላማዊ ግንኙነት ይፍጠሩ።'},
    note: {en: 'Explore thoughtful guidance in the library.', am: 'በቤተ-መጽሐፉ ውስጥ ያሉ አጋዥ መመሪያዎችን ያስሱ።'},
  },
  {
    id: 'habits', Icon: Leaf, art: 'habits', image: '/progress-habits.webp', href: '/wellness?category=Healthy%20habits',
    label: {en: 'Healthy habits', am: 'ጤናማ ልምዶች'},
    title: {en: 'Small habits. Real-life progress.', am: 'ትንንሽ ልምዶች፤ ዘላቂ እድገት።'},
    description: {en: 'Find simple ideas for nourishing meals, rest, and routines that fit real life.', am: 'ከዕለታዊ ህይወትዎ ጋር የሚስማሙ ለተመጣጠነ ምግብ፣ ለእረፍትና ለበጎ ልምዶች የሚሆኑ ቀላል ሀሳቦችን ያግኙ።'},
    note: {en: 'No routine guarantees a particular result.', am: 'ማንኛውም ልምድ ለሁሉም እኩል ውጤት እንደሚሰጥ ዋስትና አይሰጥም።'},
  },
  {
    id: 'care', Icon: Waves, art: 'care', image: '/progress-care.webp', href: '/wellness?category=Skin%20%26%20hair%20care',
    label: {en: 'Skin & hair care', am: 'የቆዳና ፀጉር እንክብካቤ'},
    title: {en: 'Your care routine, your own pace.', am: 'የእንክብካቤ ልምድዎ በራስዎ ፍጥነት።'},
    description: {en: 'Start with approachable skin and natural-hair care guidance made for everyday life.', am: 'ለዕለታዊ ህይወት የሚሆኑ ቀላል የቆዳና የተፈጥሮ ፀጉር እንክብካቤ መመሪያዎችን ይጀምሩ።'},
    note: {en: 'Care guidance, never cure promises.', am: 'የእንክብካቤ መመሪያ እንጂ የፈውስ ቃል ኪዳን አይደለም።'},
  },
  {
    id: 'movement', Icon: Sparkles, art: 'movement', image: '/progress-movement.webp', href: '/wellness?category=Strength%20%26%20movement',
    label: {en: 'Strength & movement', am: 'ጉልበትና እንቅስቃሴ'},
    title: {en: 'Celebrate what your body can do.', am: 'ሰውነትዎ ማድረግ የሚችለውን ያክብሩ።'},
    description: {en: 'Explore gentle ways to build strength, mobility, and movement you enjoy.', am: 'አካልን ለማጠናከርና ቅልጥፍናን ለማዳበር የሚረዱ ደስ የሚሉ ቀላል እንቅስቃሴዎችን ያስሱ።'},
    note: {en: 'There is no single way to move.', am: 'አካልን ለማንቀሳቀስ አንድ ወጥ የሆነ መንገድ የለም።'},
  },
];

const words = {
  en: {
    eyebrow: 'Your pace. Your kind of progress.',
    heading: 'A little progress can mean a lot.',
    intro: 'A steadier morning. Feeling more at home in your body. Moving in a way you enjoy. Find practical ideas for the progress that matters to you—with no pressure, comparison, or quick-fix promises.',
    all: 'All topics',
    disclaimer: 'Campaign visuals are illustrative models, not TenaSew members. Each card opens related, reviewed guidance in the wellness library.',
    explore: 'Explore your next small step',
    read: 'Explore in the library'
  },
  am: {
    eyebrow: 'በራስዎ ፍጥነት፤ በራስዎ መንገድ።',
    heading: 'ትንሽ እድገት ትልቅ ትርጉም አለው።',
    intro: 'የተረጋጋ አነቃቃት፣ ከራስዎ አካል ጋር የተሻለ ሰላም፣ እና ደስ የሚል እንቅስቃሴ። ያለ ምንም ጫና፣ ንፅፅር ወይም የውሸት የተስፋ ቃል ለእርስዎ ትርጉም ላለው እድገት የሚሆኑ ተግባራዊ ሀሳቦችን ያግኙ።',
    all: 'ሁሉም ርዕሶች',
    disclaimer: 'ምስሎቹ ለግንዛቤ የታሰቡ ሞዴሎች እንጂ የጤናሰው አባላት አይደሉም። እያንዳንዱ ካርድ በጤና ቤተ-መጽሐፉ ወዳለው ተዛማጅ መመሪያ ይወስዳል።',
    explore: 'ቀጣዩን ትንሽ እርምጃ ያስሱ',
    read: 'በቤተ-መጽሐፉ ያስሱ'
  },
} as const;

export function UserProgressShowcase({language = 'en'}: {language?: Language}) {
  const [active, setActive] = useState<CategoryId | 'all'>('all');
  const text = words[language];
  const visible = active === 'all' ? categories : categories.filter(category => category.id === active);

  return <section className="progress-showcase" id="wellness-topics" aria-labelledby="progress-title" lang={language === 'am' ? 'am' : 'en'}>
    <div className="progress-shell">
      <header className="progress-heading">
        <div><span className="progress-eyebrow"><span aria-hidden="true">✳</span> {text.eyebrow}</span><h2 id="progress-title">{text.heading}</h2></div>
        <div className="progress-heading-action"><p>{text.intro}</p><Link href="/wellness" className="progress-explore-link">{text.explore}<ArrowRight size={15}/></Link></div>
      </header>
      <div className="progress-toolbar">
        <div className="progress-filters" role="group" aria-label={text.all}>
          <button type="button" className={active === 'all' ? 'is-active' : ''} aria-pressed={active === 'all'} onClick={() => setActive('all')}>{text.all}</button>
          {categories.map(({id, label}) => <button key={id} type="button" className={active === id ? 'is-active' : ''} aria-pressed={active === id} onClick={() => setActive(id)}>{label[language]}</button>)}
        </div>
      </div>
      <div className="progress-grid">
        {visible.map(({id, Icon, art, image, label, title, description, href, note}) => <Link href={href} className={`progress-card progress-${art}`} key={id}>
          <div className={`progress-art art-${art}`}>
            <img src={image} alt="" className="progress-art-image" loading="lazy" aria-hidden="true"/>
            <span className="progress-art-type">{language === 'am' ? 'ምስላዊ ሞዴል' : 'Campaign visual · illustrative model'}</span>
            <span className="art-caption" aria-hidden="true">TenaSew</span>
          </div>
          <div className="progress-card-copy">
            <div className="progress-category"><span className={`progress-dot dot-${art}`}/><Icon size={15} aria-hidden="true"/>{label[language]}</div>
            <h3>{title[language]}</h3>
            <p>{description[language]}</p>
            <div className="progress-card-note"><span>{note[language]}</span><MoveUpRight size={16} aria-hidden="true"/></div>
            <span className="progress-card-cta">{text.read}<ArrowRight size={15}/></span>
          </div>
        </Link>)}
      </div>
      <p className="progress-disclosure-note"><span aria-hidden="true">◇</span> {text.disclaimer}</p>
    </div>
  </section>;
}
