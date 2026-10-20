'use client';
import {useEffect, useState} from 'react';
export type Language = 'en' | 'am';
export const languageEvent = 'tenasew-language-change';
export function useLanguage(){
  const [language,setLanguage]=useState<Language>('en');
  useEffect(()=>{
    const saved=window.localStorage.getItem('tenasew-language');
    if(saved==='am'||saved==='en') setLanguage(saved);
    const onChange=(event:Event)=>{const next=(event as CustomEvent<Language>).detail;if(next==='am'||next==='en')setLanguage(next)};
    window.addEventListener(languageEvent,onChange);
    return()=>window.removeEventListener(languageEvent,onChange);
  },[]);
  useEffect(()=>{document.documentElement.lang=language},[language]);
  return language;
}
export const am=(language:Language)=>language==='am';
