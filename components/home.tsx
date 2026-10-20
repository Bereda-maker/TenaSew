'use client';
import Link from 'next/link';
import {useEffect, useRef, useState} from 'react';
import {ArrowRight, ArrowUpRight, BookOpen, Clock, Droplets, Dumbbell, Heart, Plus, Send, ShieldCheck, Sparkles, Sprout, Users} from 'lucide-react';
import {resources} from '../lib/data';

type Language = 'en' | 'am';
const languageEvent = 'tenasew-language-change';

/* ---------- Copy (English + Amharic) ---------- */
const copy = {
  en: {
    hero: {eyebrow: 'Your wellness. Your journey.', before: 'Your journey to', em: 'feeling better', after: 'starts here.', body: 'TenaSew brings together personalized wellness guidance, body confidence resources, healthy habits, and AI-powered support to help you care for yourself on your own terms.', start: 'Start Your Journey', explore: 'Explore Wellness', sloganTop: 'A healthier', sloganBottom: 'happier you', features: ['Personalized Wellness', 'Body Confidence', 'AI-Powered Guidance']},
    marquee: ['Body confidence', 'Healthy habits', 'Skin care', 'Hair care', 'Balanced meals', 'Gentle strength', 'Rest', 'Built with care in Ethiopia'],
    support: {eyebrow: 'Support that meets you where you are', title: 'Your wellbeing is more than a before-and-after.', text: 'Choose what matters to you. Skip what doesn’t. Change your direction as life changes.', explore: 'Explore'},
    tiles: [
      {title: 'Body confidence', text: 'Build a kinder, more grounded relationship with your body.', href: '/body-confidence'},
      {title: 'Healthy habits', text: 'Small routines for food, movement, rest, and everyday energy.', href: '/wellness'},
      {title: 'Skin & hair care', text: 'Learn approachable care basics for every texture and tone.', href: '/wellness'},
      {title: 'Strength & movement', text: 'Explore safe ways to feel stronger, wherever you are.', href: '/wellness'},
    ],
    how: {eyebrow: 'How TenaSew works', title: 'Small steps. Real context. No shame.', lead: 'We turn good intentions into doable next steps, while keeping the bigger picture in view: confidence isn’t conditional on appearance.',
      steps: [
        {t: 'Tell us what support looks like', p: 'Pick interests and goals at your pace. You can always change them later.'},
        {t: 'Find useful, grounded guidance', p: 'Browse clear resources designed for real homes, budgets, bodies, and routines.'},
        {t: 'Build a rhythm that belongs to you', p: 'Track habits without punitive streaks, pressure, or perfection.'},
      ],
      quote: '“You don’t have to become someone else to deserve confidence.”', by: '— The TenaSew promise'},
    focus: {eyebrow: 'Try it now', title: 'What would feel supportive today?', text: 'Pick one thing. We’ll point you to a good place to start — no sign-up needed.', read: 'Read this guide', ask: 'Ask TenaSew AI', items: ['Feeling more confident', 'Eating well', 'Getting stronger', 'Caring for my skin', 'Caring for my hair', 'Resting without guilt']},
    ai: {eyebrow: 'Meet TenaSew AI', title: 'A thoughtful starting point for your questions.', text: 'Ask about everyday wellness, find a resource, or turn a goal into a simple next step. TenaSew AI is transparent about its limits and never diagnoses.', cta: 'Explore the assistant', name: 'TenaSew AI', sub: 'Educational support · not medical advice', q: 'How can I build a skincare routine without making it complicated?', a: 'Let’s start with the basics: a gentle cleanse, moisturiser if your skin needs it, and sun protection when available. Add one new product at a time so you can notice how your skin responds.', placeholder: 'Ask anything about everyday wellness…', pills: ['Honest about limits', 'Never diagnoses', 'Never rates your looks']},
    lib: {eyebrow: 'Start with something useful', title: 'Guidance for real life.', browse: 'Browse the library', read: 'Read'},
    trust: {eyebrow: 'Our approach', title: 'Careful with your trust.', lead: 'TenaSew is not here to sell your insecurities back to you. We focus on education, agency, and practical tools—and make it clear when professional care is the better next step.', cta: 'Read our safety promise',
      pillars: [{t: 'Evidence-aware', p: 'Clear sources and honest limits.'}, {t: 'Body-kind', p: 'No scores, shame, or transformations.'}, {t: 'Inclusive', p: 'Designed for varied bodies and lives.'}, {t: 'Useful', p: 'Simple guidance you can act on.'}]},
    faq: {eyebrow: 'Good to know', title: 'Honest answers.', items: [
      {q: 'Does TenaSew give medical advice?', a: 'No. TenaSew is educational support. It doesn’t diagnose or prescribe, and it tells you plainly when talking to a professional is the better next step.'},
      {q: 'Who is TenaSew for?', a: 'Anyone who wants to look after their wellbeing and build a kinder relationship with their body — at their own pace, with practical, budget-aware guidance.'},
      {q: 'Can I use it in Amharic?', a: 'The menu and this home page are available in English and አማርኛ. Switch any time with the EN / አማ toggle at the top.'},
    ]},
    cta: {title: 'Take one small step today.', text: 'No pressure, no perfection — just a gentle place to begin.', primary: 'Start Your Journey', secondary: 'Browse the library'},
  },
  am: {
    hero: {eyebrow: 'የጤና ባለቤትዎ እርስዎ ነዎት።', before: 'ጤናማና', em: 'ደስተኛ ሕይወት', after: 'ለመምራት የሚጀምሩበት ቦታ።', body: 'ጤናሰዉ ከእርስዎ የአኗኗር ዘይቤ ጋር የሚጣጣም የጤና እንክብካቤ፣ የተመጣጠነ ምግብ አጠቃቀም፣ በራስ የመተማመን ስሜት እና በቴክኖሎጂ የታገዘ አጭር ምክር በአንድ ላይ ይዞልዎ መጥቷል።', start: 'ጉዞዎን ይጀምሩ', explore: 'ጤናማ ኑሮን ያስሱ', sloganTop: 'ጤናማ፣', sloganBottom: 'ደስተኛ እና የተረጋጋ ሕይወት', features: ['ግላዊ የጤና እንክብካቤ', 'በራስ መተማመን', 'የAI እገዛ እና ምክር']},
    marquee: ['በራስ መተማመን', 'ጤናማ ልምዶች', 'የቆዳ እንክብካቤ', 'የፀጉር እንክብካቤ', 'የቤት ውስጥ ጤናማ ምግቦች', 'ቀላል የአካል ብቃት እንቅስቃሴ', 'ጥሩ እረፍት', 'በኢትዮጵያ በፍቅር የተዘጋጀ'],
    support: {eyebrow: 'ባሉበት ሆነው ሊያገኙት የሚችሉት ድጋፍ', title: 'እውነተኛ ደህንነት ከውጪ ከሚታይ ገጽታ በላይ ነው።', text: 'የሚፈልጉትን ይምረጡ፤ የማይስማማዎትን ይለፉ። ሕይወት ሲለወጥ አብሮ ማስተካከል ይቻላል።', explore: 'ይመልከቱ'},
    tiles: [
      {title: 'በራስ መተማመን', text: 'ከራሳችን አካል ጋር ሰላም መፍጠር እና ጤናማ ግንኙነት መገንባት።', href: '/body-confidence'},
      {title: 'ጤናማ ልምዶች', text: 'ለአመጋገብ፣ ለእነቃቃ እንቅስቃሴ፣ ለእረፍት እና ለዕለት ተዕለት ጉልበት የሚሆኑ ትናንሽ ልምዶች።', href: '/wellness'},
      {title: 'የቆዳና ፀጉር እንክብካቤ', text: 'ለሁሉም የቆዳ ቀለም እና የፀጉር አይነት የሚስማሙ ቀላል የቤት ውስጥ እንክብካቤ መንገዶች።', href: '/wellness'},
      {title: 'ጉልበትና እንቅስቃሴ', text: 'የትም ቦታ ቢሆኑ በቀላሉ ሊያደርጓቸው የሚችሉ ጤናማ የአካል እንቅስቃሴዎች።', href: '/wellness'},
    ],
    how: {eyebrow: 'ጤናሰዉ እንዴት ይሰራል?', title: 'ቀላል እርምጃዎች። እውነተኛ ሕይወት። ያለ አላስፈላጊ ጫና።', lead: 'ጥሩ ሐሳቦችን ወደ ተግባር እንለውጣለን፤ ትልቁ ጉዳይ ግን ውበት ብቻ ሳይሆን ውስጣዊ ጤንነትዎ መሆኑን እናምናለን።',
      steps: [
        {t: 'የሚፈልጉትን ድጋፍ ይንገሩን', p: 'በራስዎ ፍጥነት የሚወዷቸውን ጉዳዮች ይምረጡ። በሂደት መቀየርም ይችላሉ።'},
        {t: 'ግልጽ እና ጠቃሚ መመሪያዎችን ያግኙ', p: 'ለእውነተኛ ቤቶች፣ በጀቶች እና የዕለት ተዕለት ሕይወት የሚመጥኑ ጠቃሚ መረጃዎችን ያንብቡ።'},
        {t: 'የራስዎን የኑሮ ሪትም ይፍጠሩ', p: 'ያለ ጫና እና ፍጹምነትን ሳይጠብቁ ጤናማ ልምዶችን በየቀኑ ይለማመዱ።'},
      ],
      quote: '“ጥሩ ስሜት ለመሰማት ሌላ ሰው መሆን አያስፈልግዎትም።”', by: '— የጤናሰዉ ቃል ኪዳን'},
    focus: {eyebrow: 'አሁኑኑ ይሞክሩት', title: 'ዛሬ የትኛውን ማድረግ ይፈልጋሉ?', text: 'አንድን ነገር ብቻ ይምረጡ። ያለ ምዝገባ በቀጥታ መጀመር ይችላሉ።', read: 'ጽሑፉን አንብብ', ask: 'ጤናሰዉ AIን ጠይቅ', items: ['በራስ መተማመን', 'ጤናማ አመጋገብ', 'አካልን ማጠናከር', 'ቆዳን መንከባከብ', 'ፀጉርን መንከባከብ', 'ያለ ጸጸት ማረፍ']},
    ai: {eyebrow: 'ከጤናሰዉ AI ጋር ይተዋወቁ', title: 'ለሚነሱዎት ጥያቄዎች አስተማማኝ ጀምሮ ማዕቀፍ።', text: 'ስለ ዕለታዊ ጤና ይጠይቁ፣ መረጃዎችን ይፈልጉ ወይም አጭር ግብ ይውጡ። ጤናሰዉ AI የሕክምና ምርመራ እንደማይሰጥ በግልጽ ያስታውሳል።', cta: 'ረዳቱን ያስሱ', name: 'ጤናሰዉ AI', sub: 'ትምህርታዊ ድጋፍ · የሕክምና ምክር አይደለም', q: 'ውስብስብ ሳላደርገው ቀላል የቆዳ እንክብካቤ እንዴት መጀመር እችላለሁ?', a: 'በመሠረታዊ ነገሮች እንጀምር፡ ቆዳዎን የሚስማማ ለስላሳ ማጽጃ፣ እርጥበት አዘል ክሬም (ካስፈለገ)፣ እና ፀሐይ ላይ ሲወጡ የሚሆን መከላከያ። ቆዳዎ እንዴት እንደሚቀበለው ለማየት በአንድ ጊዜ አንድ ነገር ብቻ ይሞክሩ።', placeholder: 'ስለ ዕለታዊ ጤና ማንኛውንም ነገር ይጠይቁ…', pills: ['ወሰኑ ግልጽ ነው', 'ምርመራ አያደርግም', 'መልክን አይገመግምም']},
    lib: {eyebrow: 'በጠቃሚ ሐሳቦች ይጀምሩ', title: 'ለእውነተኛ ሕይወት የሚሆኑ መመሪያዎች።', browse: 'ሁሉንም ጽሑፎች ይመልከቱ', read: 'ያንብቡ'},
    trust: {eyebrow: 'አካሄዳችን', title: 'በእርስዎ እምነት እና ደህንነት እንክብካቤ እናደርጋለን።', lead: 'ጤናሰዉ ስጋቶችዎን አጉልቶ በመንገር ሸቀጥ ለመሸጥ አይሠራም። በእውቀት፣ በራስ መተማመን እና በተግባራዊ መሣሪያዎች ላይ እናተኩራለን—የባለሙያ ድጋፍ ሲያስፈልግም በግልጽ እንመክራለን።', cta: 'የደህንነት ፖሊሲያችንን ያንብቡ',
      pillars: [{t: 'በታመኑ መረጃዎች ላይ የተመሠረተ', p: 'ግልጽ ምንጮች እና ግልጽ ድንበሮች።'}, {t: 'ለሰውነትዎ ቸር የሆነ', p: 'ምንም ዓይነት የውሸት ነጥብ፣ እፍረት ወይም ጫና የለም።'}, {t: 'ለሁሉም የሚሆን', p: 'ለተለያዩ የኑሮ ሁኔታዎች የተዘጋጀ።'}, {t: 'ጠቃሚ', p: 'በቀላሉ ሊተገብሯቸው የሚችሉ መመሪያዎች።'}]},
    faq: {eyebrow: 'ማወቅ የሚገቡዎት', title: 'ቀጥተኛ መልሶች።', items: [
      {q: 'ጤናሰዉ የሕክምና ምክር ይሰጣል?', a: 'አይሰጥም። ጤናሰዉ ትምህርታዊ ድጋፍ ሰጪ ነው። ምርመራ አያደርግም፤ ሐኪም ማማከር ሲገባዎትም በግልጽ ይነግርዎታል።'},
      {q: 'ጤናሰዉ ማንን ታሳቢ ያደረገ ነው?', a: 'ጤንነታቸውን መንከባከብ እና ከራሳቸው አካል ጋር ሰላም መፍጠር ለሚፈልጉ ሁሉ — በራሳቸው ፍጥነት እና አቅም የሚጠቀሙበት ነው።'},
      {q: 'በአማርኛ መጠቀም እችላለሁ?', a: 'አዎ! ማናቸውንም ገጾች ከላይ ባለው የቋንቋ መቀየሪያ (EN / አማ) በመጠቀም በቀላሉ ወደ አማርኛ መቀየር ይችላሉ።'},
    ]},
    cta: {title: 'ዛሬውኑ አነስተኛ እርምጃ ይውሰዱ።', text: 'ያለ ምንም ጫና እና ፍጹምነት — ለመጀመር ምቹ ቦታ።', primary: 'ጉዞዎን ይጀምሩ', secondary: 'ጽሑፎቹን ያስሱ'},
  },
} as const;

const tileMeta = [
  {tone: 'forest', Icon: Heart},
  {tone: 'mint', Icon: Sprout},
  {tone: 'sand', Icon: Droplets},
  {tone: 'clay', Icon: Dumbbell},
] as const;

const focusSlugs = ['confidence-without-comparison', 'local-foods-balanced-plate', 'beginner-strength', 'simple-skin-routine', 'care-for-natural-hair', 'rest-is-a-practice'];
const toneOf: Record<string, string> = {'Body confidence': 'clay', 'Nutrition': 'sand', 'Movement': 'mint', 'Skin care': 'mint', 'Hair care': 'clay', 'General wellness': 'sand'};

/* Adds .in to every .reveal element as it scrolls into view. */
function useReveal(dep: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.in)'));
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, {threshold: 0.12, rootMargin: '0px 0px -6% 0px'});
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

export function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [focus, setFocus] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem('tenasew-language');
    if (saved === 'am' || saved === 'en') setLanguage(saved);
    const onChange = (event: Event) => {
      const next = (event as CustomEvent<Language>).detail;
      if (next === 'am' || next === 'en') setLanguage(next);
    };
    window.addEventListener(languageEvent, onChange);
    return () => window.removeEventListener(languageEvent, onChange);
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);

  useReveal(language);

  const t = copy[language];
  const hero = t.hero;
  const picked = resources.find(r => r.slug === focusSlugs[focus]) ?? resources[0];

  return <div className={`landing-page ${language === 'am' ? 'is-amharic' : ''}`} lang={language === 'am' ? 'am' : 'en'} ref={root}>
    {/* ---------- Hero ---------- */}
    <section className="design-hero" aria-labelledby="design-hero-title">
      <img className="design-hero-image" src="/tenasew-hero-image.jpg" alt="A woman taking a peaceful moment in a green mountain landscape" />
      <div className="design-hero-overlay" aria-hidden="true"/>
      <div className="design-hero-inner">
        <div className="design-hero-content">
          <div className="design-copy">
            <div className="design-eyebrow">{hero.eyebrow}</div>
            <h1 id="design-hero-title">{hero.before} <em>{hero.em}</em> {hero.after}</h1>
            <p>{hero.body}</p>
            <div className="design-actions">
              <Link href="/register" className="design-primary">{hero.start} <ArrowRight size={18}/></Link>
              <Link href="/wellness" className="design-secondary">{hero.explore}</Link>
            </div>
          </div>
          <div className="design-slogan" aria-label={`${hero.sloganTop} ${hero.sloganBottom}`}>{hero.sloganTop}<br/><em>{hero.sloganBottom}</em><span/></div>
        </div>
        <div className="design-feature-row">
          {[{href: '/wellness', Icon: Sparkles}, {href: '/body-confidence', Icon: Heart}, {href: '/ai', Icon: Sparkles}].map((f, i) => {
            const words = hero.features[i].split(' ');
            return <Link key={f.href + i} href={f.href} className="design-feature"><span className="feature-icon"><f.Icon size={20}/></span><span>{words[0]}<br/><b>{words.slice(1).join(' ')}</b></span><ArrowRight size={16}/></Link>;
          })}
        </div>
        <div className="design-scroll" aria-hidden="true"><span>⌄</span></div>
      </div>
    </section>

    {/* ---------- Marquee ---------- */}
    <div className="ts-marquee" aria-label={t.marquee.join(', ')}>
      <div className="ts-marquee-track" aria-hidden="true">
        {[...t.marquee, ...t.marquee].map((item, i) => <span key={i}><i/>{item}</span>)}
      </div>
    </div>

    {/* ---------- Support bento ---------- */}
    <section className="ts-section">
      <div className="shell">
        <div className="ts-head reveal">
          <div><div className="eyebrow">{t.support.eyebrow}</div><h2>{t.support.title}</h2></div>
          <p>{t.support.text}</p>
        </div>
        <div className="ts-bento">
          {t.tiles.map((tile, i) => {
            const {tone, Icon} = tileMeta[i];
            return <Link key={i} href={tile.href} className={`ts-tile tone-${tone} reveal`} style={{transitionDelay: `${i * 70}ms`}}>
              <span className="ts-tile-no" aria-hidden="true">0{i + 1}</span>
              <span className="ts-tile-icon"><Icon size={26} strokeWidth={1.8}/></span>
              <div><h3>{tile.title}</h3><p>{tile.text}</p></div>
              <span className="ts-tile-link">{t.support.explore} <ArrowUpRight size={17}/></span>
            </Link>;
          })}
        </div>
      </div>
    </section>

    {/* ---------- How it works ---------- */}
    <section className="ts-section ts-alt">
      <div className="shell">
        <div className="ts-head reveal">
          <div><div className="eyebrow">{t.how.eyebrow}</div><h2>{t.how.title}</h2></div>
          <p>{t.how.lead}</p>
        </div>
        <ol className="ts-steps">
          {t.how.steps.map((s, i) => <li key={i} className="ts-step reveal" style={{transitionDelay: `${i * 90}ms`}}>
            <span className="ts-step-no">{i + 1}</span>
            <h3>{s.t}</h3><p>{s.p}</p>
          </li>)}
        </ol>
        <figure className="ts-quote ts-pattern reveal">
          <span className="ts-quote-mark" aria-hidden="true">“</span>
          <blockquote>{t.how.quote}</blockquote>
          <figcaption>{t.how.by}</figcaption>
        </figure>
      </div>
    </section>

    {/* ---------- Interactive focus picker ---------- */}
    <section className="ts-section">
      <div className="shell">
        <div className="ts-focus reveal">
          <div className="ts-focus-left">
            <div className="eyebrow">{t.focus.eyebrow}</div>
            <h2>{t.focus.title}</h2>
            <p>{t.focus.text}</p>
            <div className="ts-chips" role="group" aria-label={t.focus.title}>
              {t.focus.items.map((label, i) => <button key={i} type="button" className={`ts-chip${i === focus ? ' on' : ''}`} aria-pressed={i === focus} onClick={() => setFocus(i)}>{label}</button>)}
            </div>
          </div>
          <div className={`ts-focus-card tone-${toneOf[picked.category] ?? 'mint'}`} aria-live="polite" key={picked.slug}>
            <span className="tag">{picked.category}</span>
            <h3>{picked.title}</h3>
            <p>{picked.summary}</p>
            <span className="ts-meta"><Clock size={14}/> {picked.time} · {picked.level}</span>
            <div className="ts-focus-actions">
              <Link href={`/wellness/${picked.slug}`} className="button">{t.focus.read} <ArrowRight size={16} style={{verticalAlign: 'middle'}}/></Link>
              <Link href="/ai" className="button secondary">{t.focus.ask}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ---------- AI preview ---------- */}
    <section className="ts-section ts-tight">
      <div className="shell">
        <div className="ts-ai ts-pattern reveal">
          <div className="ts-ai-copy">
            <div className="eyebrow" style={{color: '#f0c75e'}}>{t.ai.eyebrow}</div>
            <h2>{t.ai.title}</h2>
            <p>{t.ai.text}</p>
            <ul className="ts-pills">{t.ai.pills.map((p, i) => <li key={i}><ShieldCheck size={14}/> {p}</li>)}</ul>
            <Link href="/ai" className="button gold">{t.ai.cta} <ArrowRight size={16} style={{verticalAlign: 'middle'}}/></Link>
          </div>
          <div className="ts-chat" aria-hidden="false">
            <div className="ts-chat-head"><span className="ts-avatar"><Sparkles size={16}/></span><div><b>{t.ai.name}</b><small>{t.ai.sub}</small></div></div>
            <div className="ts-chat-body">
              <div className="ts-msg user">{t.ai.q}</div>
              <div className="ts-msg bot typing" aria-hidden="true"><i/><i/><i/></div>
              <div className="ts-msg bot answer">{t.ai.a}</div>
            </div>
            <Link href="/ai" className="ts-chat-input"><span>{t.ai.placeholder}</span><span className="ts-send"><Send size={15}/></span></Link>
          </div>
        </div>
      </div>
    </section>

    {/* ---------- Library ---------- */}
    <section className="ts-section ts-alt">
      <div className="shell">
        <div className="ts-head reveal">
          <div><div className="eyebrow">{t.lib.eyebrow}</div><h2>{t.lib.title}</h2></div>
          <Link href="/wellness" className="button secondary">{t.lib.browse}</Link>
        </div>
        <div className="ts-lib">
          {resources.map((r, i) => <Link key={r.slug} href={`/wellness/${r.slug}`} className={`ts-rcard tone-${toneOf[r.category] ?? 'mint'} reveal`} style={{transitionDelay: `${(i % 3) * 70}ms`}}>
            <span className="tag">{r.category}</span>
            <h3>{r.title}</h3>
            <p>{r.summary}</p>
            <span className="ts-rcard-foot"><span className="ts-meta"><Clock size={13}/> {r.time} · {r.level}</span><span className="ts-go">{t.lib.read} <ArrowRight size={15}/></span></span>
          </Link>)}
        </div>
      </div>
    </section>

    {/* ---------- Trust ---------- */}
    <section className="ts-section">
      <div className="shell ts-trust">
        <div className="reveal">
          <div className="eyebrow">{t.trust.eyebrow}</div>
          <h2>{t.trust.title}</h2>
          <p className="lead">{t.trust.lead}</p>
          <Link href="/safety" className="button secondary">{t.trust.cta}</Link>
        </div>
        <div className="ts-pillars">
          {t.trust.pillars.map((p, i) => {
            const Icon = [ShieldCheck, Heart, Users, BookOpen][i];
            return <div key={i} className="ts-pillar reveal" style={{transitionDelay: `${i * 70}ms`}}><span><Icon size={22} strokeWidth={1.8}/></span><h3>{p.t}</h3><p>{p.p}</p></div>;
          })}
        </div>
      </div>
    </section>

    {/* ---------- FAQ ---------- */}
    <section className="ts-section ts-alt">
      <div className="shell ts-faq-wrap">
        <div className="reveal"><div className="eyebrow">{t.faq.eyebrow}</div><h2>{t.faq.title}</h2></div>
        <div className="ts-faq reveal">
          {t.faq.items.map((item, i) => <details key={i}><summary><span>{item.q}</span><Plus size={20} className="ts-faq-icon"/></summary><p>{item.a}</p></details>)}
        </div>
      </div>
    </section>

    {/* ---------- Closing CTA ---------- */}
    <section className="ts-section ts-cta-section">
      <div className="shell">
        <div className="ts-cta reveal">
          <img src="/tenasew-hero-image.jpg" alt="" loading="lazy"/>
          <div className="ts-cta-shade" aria-hidden="true"/>
          <div className="ts-cta-inner">
            <h2>{t.cta.title}</h2>
            <p>{t.cta.text}</p>
            <div className="ts-cta-actions">
              <Link href="/register" className="design-primary">{t.cta.primary} <ArrowRight size={18}/></Link>
              <Link href="/wellness" className="design-secondary">{t.cta.secondary}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>;
}
