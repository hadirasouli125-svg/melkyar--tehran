'use client';

import { useState } from 'react';
import { Building2, Users, WalletCards, Wrench, ReceiptText, Bell, Settings, LayoutDashboard, ShieldCheck, CreditCard, ChevronLeft, Plus, MoreHorizontal } from 'lucide-react';

const nav = [
  ['داشبورد', LayoutDashboard],
  ['ساختمان‌ها', Building2],
  ['واحدها و ساکنین', Users],
  ['شارژ و پرداخت‌ها', WalletCards],
  ['هزینه‌ها', ReceiptText],
  ['تعمیرات', Wrench],
  ['اطلاعیه‌ها', Bell],
];

export default function Home() {
  const [active, setActive] = useState('داشبورد');
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Building2 size={23}/></div>
          <div><strong>مدیریت یکپارچه</strong><span>ساختمان</span></div>
        </div>
        <div className="profile-card">
          <div className="avatar">م</div>
          <div><b>مدیر سیستم</b><small>مدیر کل</small></div>
          <MoreHorizontal size={18}/>
        </div>
        <nav>{nav.map(([label, Icon]) => <button key={label} className={active===label?'active':''} onClick={()=>setActive(label)}><Icon size={19}/><span>{label}</span></button>)}</nav>
        <div className="side-bottom">
          <button><CreditCard size={19}/><span>اشتراک و پلن‌ها</span></button>
          <button><Settings size={19}/><span>تنظیمات</span></button>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><p className="eyebrow">شنبه، ۱۴ شهریور ۱۴۰۵</p><h1>{active}</h1></div>
          <div className="top-actions"><button className="icon-btn"><Bell size={19}/></button><button className="user-chip"><span className="mini-avatar">م</span><span>مدیر کل</span><ChevronLeft size={16}/></button></div>
        </header>

        <div className="hero">
          <div><span className="badge"><ShieldCheck size={15}/> پنل مدیریت کل</span><h2>یک نگاه، کنترل کامل</h2><p>ساختمان‌ها، کاربران، مالی و اشتراک‌ها را یکپارچه و امن مدیریت کنید.</p></div>
          <button className="primary"><Plus size={18}/> افزودن ساختمان</button>
        </div>

        <div className="stats">
          <Stat icon={Building2} title="ساختمان‌های فعال" value="۱۲" detail="۲ مورد جدید این ماه" />
          <Stat icon={Users} title="واحدهای ثبت‌شده" value="۳۸۴" detail="۹۶٪ اطلاعات تکمیل است" />
          <Stat icon={WalletCards} title="پرداخت‌های این ماه" value="۸۷٪" detail="۳۲ واحد در انتظار پرداخت" />
          <Stat icon={CreditCard} title="اشتراک‌های فعال" value="۱۰" detail="۲ اشتراک نزدیک به انقضا" />
        </div>

        <div className="grid-two">
          <section className="panel"><div className="panel-head"><div><h3>ساختمان‌های اخیر</h3><span>مدیریت سریع ساختمان‌ها</span></div><button className="link-btn">مشاهده همه <ChevronLeft size={15}/></button></div>
            {[['برج آفتاب','۶۴ واحد','تهران، سعادت‌آباد','فعال'],['مجتمع سپیدار','۴۸ واحد','تهران، پونک','فعال'],['گلستان ۲','۳۲ واحد','کرج، عظیمیه','آزمایشی']].map((b,i)=><div className="building-row" key={b[0]}><div className="building-icon"><Building2 size={20}/></div><div className="row-main"><b>{b[0]}</b><span>{b[2]}</span></div><span>{b[1]}</span><span className={'status '+(i===2?'trial':'')}>{b[3]}</span><MoreHorizontal size={18}/></div>)}
          </section>
          <section className="panel"><div className="panel-head"><div><h3>وضعیت مالی</h3><span>خلاصه عملکرد این ماه</span></div><WalletCards size={20}/></div><div className="money"><span>مجموع هزینه‌ها</span><strong>۲۴۸,۵۰۰,۰۰۰ <small>تومان</small></strong></div><div className="progress"><span style={{width:'72%'}}/></div><div className="money-line"><span>پرداخت‌شده <b>۱۷۸,۹۲۰,۰۰۰</b></span><span>باقی‌مانده <b>۶۹,۵۸۰,۰۰۰</b></span></div><div className="notice"><ReceiptText size={18}/><div><b>روش تقسیم هزینه</b><span>مدیر هر ساختمان می‌تواند «بر اساس واحد» یا «بر اساس تعداد نفرات» انتخاب کند.</span></div></div></section>
        </div>
      </section>
    </main>
  );
}

function Stat({icon:Icon,title,value,detail}) { return <div className="stat"><div className="stat-icon"><Icon size={20}/></div><span>{title}</span><strong>{value}</strong><small>{detail}</small></div> }
