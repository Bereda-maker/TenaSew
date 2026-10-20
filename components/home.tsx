'use client';
import Link from 'next/link';
import {useEffect, useRef, useState} from 'react';
import {ArrowRight, BookOpen, Clock, Heart, Plus, Send, ShieldCheck, Sparkles, Users} from 'lucide-react';
import {resources} from '../lib/data';
import {UserProgressShowcase} from './user-progress-showcase';

type Language = 'en' | 'am';
const languageEvent = 'tenasew-language-change';

/* ---------- Copy (English + Amharic) ---------- */
const copy = {
  en: {
    hero: {eyebrow: 'Your wellness. Your journey.', before: 'Your journey to', em: 'feeling better', after: 'starts here.', body: 'TenaSew brings together personalized wellness guidance, body confidence resources, healthy habits, and AI-powered support to help you care for yourself on your own terms.', start: 'Start Your Journey', explore: 'See what progress can mean', sloganTop: 'A healthier', sloganBottom: 'happier you', features: ['Personalized Wellness', 'Body Confidence', 'AI-Powered Guidance']},
    marquee: ['Body confidence', 'Healthy habits', 'Skin care', 'Hair care', 'Balanced meals', 'Gentle strength', 'Rest', 'Built with care in Ethiopia'],
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
    hero: {
      eyebrow: 'የጤናዎና የደህንነትዎ ባለቤት እርስዎ ነዎት።',
      before: 'ወደተሻለ',
      em: 'ጤናና ደስታ',
      after: 'የሚያደርጉት ጉዞ ከዚህ ይጀምራል።',
      body: 'ጤናሰው ከእርስዎ የአኗኗር ዘይቤ ጋር የሚስማማ የጤና እንክብካቤ፣ የተመጣጠነ ምግብ አጠቃቀም፣ በራስ የመተማመን ስሜት እና በኤአይ (AI) የታገዘ የጤና መረጃ በአንድ ላይ አዘጋጅቶልዎታል።',
      start: 'ጉዞዎን ይጀምሩ',
      explore: 'ምን ያህል መሻሻል እንደሚችሉ ይመልከቱ',
      sloganTop: 'ጤናማና
