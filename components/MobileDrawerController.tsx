'use client';

import {useEffect,useState} from 'react';
import {Menu,X} from 'lucide-react';
import {createPortal} from 'react-dom';

export default function MobileDrawerController(){
 const[open,setOpen]=useState(false);
 const[ready,setReady]=useState(false);
 useEffect(()=>{
  const sync=()=>setReady(Boolean(document.querySelector('.sidebar')&&document.querySelector('.topbar')));
  sync();
  const observer=new MutationObserver(sync);
  observer.observe(document.body,{childList:true,subtree:true});
  const close=()=>setOpen(false);
  const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')close()};
  const onClick=(e:MouseEvent)=>{
   const target=e.target as HTMLElement;
   if(target.closest('.sidebar nav button,.sidebar .side-bottom button'))close();
  };
  document.addEventListener('keydown',onKey);
  document.addEventListener('click',onClick);
  return()=>{observer.disconnect();document.removeEventListener('keydown',onKey);document.removeEventListener('click',onClick)};
 },[]);
 useEffect(()=>{
  const sidebar=document.querySelector('.sidebar');
  if(!sidebar)return;
  sidebar.classList.toggle('mobile-open',open);
  document.body.style.overflow=open?'hidden':'';
  return()=>{sidebar.classList.remove('mobile-open');document.body.style.overflow=''};
 },[open]);
 if(!ready)return null;
 const topbar=document.querySelector('.topbar');
 if(!topbar)return null;
 return <>
  {createPortal(<button className="mobile-menu-btn" aria-label={open?'بستن منو':'باز کردن منو'} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X size={21}/>:<Menu size={21}/>}</button>,topbar)}
  {open&&createPortal(<button className="mobile-backdrop show" aria-label="بستن منو" onClick={()=>setOpen(false)}/>,document.body)}
 </>;
}
