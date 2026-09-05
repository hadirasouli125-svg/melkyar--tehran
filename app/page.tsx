'use client';

import { Building2, LayoutDashboard, Users, WalletCards, Wrench, Bell, FileText, Settings, ShieldCheck, Plus, ArrowLeft, TrendingUp, ReceiptText, CircleDollarSign } from 'lucide-react';

const menu = [
  ['داشبورد', LayoutDashboard], ['ساختمان‌ها', Building2], ['واحدها و ساکنان', Users], ['شارژ و مالی', WalletCards], ['هزینه‌ها و تعمیرات', Wrench], ['اعلان‌ها', Bell], ['اسناد و تصاویر', FileText],
];

export default function Home() {
  return (
    <main className="shell" dir="rtl">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Building2 size={22}/></div><div><strong>مدیریت یکپارچه ساختمان</strong><span>پنل مدیریت هوشمند</span></div></div>
        <div className="profile-card"><div className="avatar">م</div><div><b>مدیر ساختمان</b><small>دسترسی مدیریتی</small></div><ShieldCheck size={17}/></div>
        <nav>{menu.map(([label, Icon], i) => <button key={label as string} className={i === 0 ? 'active' : ''}><Icon size={18}/><span>{label as string}</span></button>)}</nav>
        <div className="side-bottom"><button><Settings size={18}/><span>تنظیمات</span></button><button><ShieldCheck size={18}/><span>امنیت و دسترسی</span></button></div>
      </aside>

      <section className="content">
        <header className="topbar"><div><p className="eyebrow">امروز، پنل مدیریتی شما آماده است</p><h1>داشبورد ساختمان</h1></div><div className="top-actions"><button className="icon-btn" aria-label="اعلان‌ها"><Bell size={19}/></button><div className="user-chip"><div className="mini-avatar">م</div><span>مدیر ساختمان</span></div></div></header>

        <section className="hero"><div><span className="badge"><ShieldCheck size={14}/> محیط امن و اختصاصی ساختمان</span><h2>مدیریت ساختمان، یکپارچه و ساده</h2><p>شارژ، هزینه‌ها، تعمیرات، ساکنان و اسناد را از یکجا مدیریت کنید.</p></div><button className="primary"><Plus size={18}/> افزودن ساختمان</button></section>

        <section className="stats">
          <Stat icon={<Building2 size={20}/>} title="ساختمان‌های من" value="۱" note="فعال"/>
          <Stat icon={<Users size={20}/>} title="واحدها و ساکنان" value="۲۴" note="واحد ثبت‌شده"/>
          <Stat icon={<ReceiptText size={20}/>} title="شارژ ماه جاری" value="۱۸٫۴ م" note="تومان"/>
          <Stat icon={<CircleDollarSign size={20}/>} title="پرداخت‌های انجام‌شده" value="۸۷٪" note="این ماه"/>
        </section>

        <section className="grid-two">
          <div className="panel"><div className="panel-head"><div><h3>ساختمان‌های تحت مدیریت</h3><span>اطلاعات کاملاً جدا از سایر ساختمان‌ها</span></div><button className="link-btn">مشاهده همه <ArrowLeft size={14}/></button></div>
            <BuildingRow name="ساختمان نمونه" meta="۲۴ واحد · ۵ طبقه" status="فعال" />
            <BuildingRow name="ساختمان جدید" meta="برای شروع مدیریت اضافه کنید" status="آماده" trial />
          </div>
          <div className="panel"><div className="panel-head"><div><h3>وضعیت مالی</h3><span>خلاصه عملکرد ماه جاری</span></div><TrendingUp size={19}/></div><div className="money"><span>مجموع دریافتی</span><strong>۱۵۴,۸۰۰,۰۰۰ <small>تومان</small></strong><div className="progress"><span style={{width:'87%'}}/></div><div className="money-line"><span>دریافت‌شده <b>۸۷٪</b></span><span>باقی‌مانده <b>۱۳٪</b></span></div></div></div>
        </section>

        <div className="notice"><Bell size={18}/><div><b>ساختار پروژه آماده توسعه است</b><span>در مرحله بعد، ورود و ثبت مدیر، ساختمان، واحدها و کنترل دسترسی را به صورت امن به همین پنل متصل می‌کنیم.</span></div></div>
      </section>
    </main>
  );
}

function Stat({icon,title,value,note}:{icon:React.ReactNode;title:string;value:string;note:string}){return <div className="stat"><div className="stat-icon">{icon}</div><span>{title}</span><strong>{value}</strong><small>{note}</small></div>}
function BuildingRow({name,meta,status,trial=false}:{name:string;meta:string;status:string;trial?:boolean}){return <div className="building-row"><div className="building-icon"><Building2 size={18}/></div><div className="row-main"><b>{name}</b><span>{meta}</span></div><span className={`status ${trial?'trial':''}`}>{status}</span></div>}
