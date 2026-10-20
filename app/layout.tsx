import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import {SiteNavbar} from '../components/site-navbar';
import {ScrollProgress} from '../components/scroll-progress';
import {SiteFooter} from '../components/site-footer';
import './globals.css';
import './enhance.css';
export const metadata: Metadata={title:{default:'TenaSew — Feel Better. Be Yourself. Grow Confidently.',template:'%s · TenaSew'},description:'TenaSew is an Ethiopian-founded personal-wellness and body-confidence platform offering thoughtful guidance, healthy habits, educational resources, and AI-powered support.',metadataBase:new URL(process.env.NEXT_PUBLIC_APP_URL||'http://localhost:3000'),icons:{icon:'/favicon.svg'},openGraph:{title:'TenaSew — Feel Better. Be Yourself. Grow Confidently.',description:'Thoughtful wellness guidance, body confidence resources, healthy habits, and AI-powered support.',type:'website',images:[{url:'/tenasew-hero-image.jpg',alt:'A woman taking a peaceful moment in a green mountain landscape'}]},twitter:{card:'summary_large_image',title:'TenaSew — Feel Better. Be Yourself. Grow Confidently.',description:'Thoughtful wellness guidance, body confidence resources, healthy habits, and AI-powered support.',images:['/tenasew-hero-image.jpg']}};
export const viewport:Viewport={themeColor:'#173f35',width:'device-width',initialScale:1};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><ScrollProgress /><a className="skip-link" href="#main">Skip to content</a><SiteNavbar /><main id="main">{children}</main><SiteFooter /></body></html>}
