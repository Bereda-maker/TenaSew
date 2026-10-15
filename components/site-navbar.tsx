'use client';

import Link from 'next/link';
import {ArrowRight, Menu, Search, X} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useState} from 'react';

const links = [
  {label: 'Home', href: '/'},
  {label: 'Wellness', href: '/wellness'},
  {label: 'Body Confidence', href: '/body-confidence'},
  {label: 'AI Assistant', href: '/ai'},
  {label: 'Resources', href: '/resources'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
];

export function SiteNavbar(){
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href:string) => href === '/' ? pathname === '/' : pathname.startsWith(href);
  return <header className="global-site-header">
    <div className="global-nav-shell">
      <Link href="/" className="global-brand" aria-label="TenaSew home" onClick={()=>setOpen(false)}>
        <span className="global-logo-frame"><img src="/tenasew-logo.png" alt="" /></span>
        <span className="global-brand-copy"><strong>TenaSew</strong><small>ጤናሰው</small></span>
      </Link>
      <nav className="global-nav-links" aria-label="Primary navigation">
        {links.map(link=><Link key={link.href} href={link.href} className={isActive(link.href)?'active':''}>{link.label}</Link>)}
      </nav>
      <div className="global-nav-actions">
        <Link href="/resources" className="global-search" aria-label="Search resources"><Search size={18}/></Link>
        <Link href="/login" className="global-login">Log In</Link>
        <Link href="/register" className="global-cta">Start Your Journey <ArrowRight size={16}/></Link>
        <button className="global-menu-button" type="button" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(value=>!value)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
      </div>
      {open&&<nav className="global-mobile-menu" aria-label="Mobile navigation">
        {links.map(link=><Link key={link.href} href={link.href} className={isActive(link.href)?'active':''} onClick={()=>setOpen(false)}>{link.label}</Link>)}
        <Link href="/login" onClick={()=>setOpen(false)}>Log In</Link>
        <Link href="/register" className="mobile-cta" onClick={()=>setOpen(false)}>Start Your Journey <ArrowRight size={16}/></Link>
      </nav>}
    </div>
  </header>;
}
