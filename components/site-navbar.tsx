'use client';

import Link from 'next/link';
import {ArrowRight, Menu, Search, X} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';

type Language = 'en' | 'am';

const links = [
  {en: 'Home', am: 'መነሻ', href: '/'},
  {en: 'Wellness', am: 'ጤናና ደህንነት', href: '/wellness'},
  {en: 'Body Confidence', am: 'በራስ መተማመን', href: '/body-confidence'},
  {en: 'AI Assistant', am: 'ጤናሰዉ AI', href: '/ai'},
  {en: 'Resources', am: 'መረጃዎች', href: '/resources'},
  {en: 'About', am: 'ስለ እኛ', href: '/about'},
  {en: 'Contact', am: 'ያግኙን', href: '/contact'},
];

const languageEvent = 'tenasew-language-change';

export function SiteNavbar(){
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('am');

  useEffect(()=>{
    const saved = window.localStorage.getItem('tenasew-language');
    if(saved === 'am' || saved === 'en') setLanguage(saved);
    const onLanguageChange = (event:Event) => {
      const next = (event as CustomEvent<Language>).detail;
      if(next === 'am' || next === 'en') setLanguage(next);
    };
    window.addEventListener(languageEvent, onLanguageChange);
    return ()=>window.removeEventListener(languageEvent, onLanguageChange);
  },[]);

  const changeLanguage = () => {
    const next:Language = language === 'en' ? 'am' : 'en';
    setLanguage(next);
    window.localStorage.setItem('tenasew-language', next);
    window.dispatchEvent(new CustomEvent(languageEvent, {detail: next}));
  };
  const isActive = (href:string) => href === '/' ? pathname === '/' : pathname.startsWith(href);
  const label = (item:{en:string;am:string}) => language === 'am' ? item.am : item.en;
  const login = language === 'am' ? 'ይግቡ' : 'Log In';
  const journey = language === 'am' ? 'ጉዞዎን ይጀምሩ' : 'Start Your Journey';

  return <header className={`global-site-header ${language === 'am' ? 'is-amharic' : ''}`}>
    <div className="global-nav-shell">
      <Link href="/" className="global-brand" aria-label="TenaSew home" onClick={()=>setOpen(false)}>
        <span className="global-logo-frame"><img src="/tenasew-logo.png" alt="" /></span>
        <span className="global-brand-copy"><strong>TenaSew</strong><small>ጤናሰዉ</small></span>
      </Link>
      <nav className="global-nav-links" aria-label="Primary navigation">
        {links.map(link=><Link key={link.href} href={link.href} className={isActive(link.href)?'active':''}>{label(link)}</Link>)}
      </nav>
      <div className="global-nav-actions">
        <button className="global-language" type="button" onClick={changeLanguage} aria-label={language === 'en' ? 'Switch to Amharic' : 'Switch to English'}><b className={language === 'en' ? 'selected' : ''}>EN</b><span>/</span><b className={language === 'am' ? 'selected' : ''}>አማ</b></button>
        <Link href="/resources" className="global-search" aria-label="Search resources"><Search size={17}/></Link>
        <Link href="/login" className="global-login">{login}</Link>
        <Link href="/register" className="global-cta">{journey} <ArrowRight size={15}/></Link>
        <button className="global-menu-button" type="button" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(value=>!value)}>{open?<X size={21}/>:<Menu size={21}/>}</button>
      </div>
      {open&&<nav className="global-mobile-menu" aria-label="Mobile navigation">
        {links.map(link=><Link key={link.href} href={link.href} className={isActive(link.href)?'active':''} onClick={()=>setOpen(false)}>{label(link)}</Link>)}
        <Link href="/login" onClick={()=>setOpen(false)}>{login}</Link>
        <button className="global-mobile-language" type="button" onClick={changeLanguage}>{language === 'en' ? 'አማርኛ' : 'English'}</button>
        <Link href="/register" className="mobile-cta" onClick={()=>setOpen(false)}>{journey} <ArrowRight size={15}/></Link>
      </nav>}
    </div>
  </header>;
}
