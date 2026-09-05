'use client';

import { useEffect, useState } from 'react';
import { Building2, LayoutDashboard, Users, WalletCards, Wrench, Bell, FileText, Settings, ShieldCheck, Plus, ArrowLeft, TrendingUp, ReceiptText, CircleDollarSign, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

type Building = { id: string; name: string; address: string | null; created_at: string };
const menu = [['داشبورد', LayoutDashboard], ['ساختمان‌ها', Building2], ['واحدها و ساکنان', Users], ['شارژ و مالی', WalletCards], ['هزینه‌ها و تعمیرات', Wrench], ['اعلان‌ها', Bell], ['اسناد و تصاویر', FileText]] as const;

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState('مدیر');
  const [isGlobal, setIsGlobal] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace('/login'); return; }
      const fullName = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'مدیر';
      if (mounted) setUserName(fullName);
      const { data: ga } = await supabase.from('global_admins').select('user_id').eq('user_id', session.user.id).maybeSingle();
      if (mounted) setIsGlobal(Boolean(ga));
      const { data, error: buildingsError } = await supabase.from('buildings').select('id,name,address,created_at').order('created_at', { ascending: false });
      if (buildingsError) setError('خطا در دریافت اطلاعات ساختمان‌ها.');
      if (mounted) { setBuildings((data as Building[]) || []); setLoading(false); }
    })();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => { if (!session) router.replace('/login'); });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, [router]);

  async function createBuilding() {
    if (!name.trim()) return setError('نام ساختمان را وارد کنید.');
    setSaving(true); setError('');
    const { error: rpcError } = await supabase.rpc('create_initial_building', { p_name: name.trim(), p_address: address.trim() || null });
    if (rpcError) setError(rpcError.message);
    else {
      const { data: fresh } = await supabase.from('buildings').select('id,name,address,created_at').order('created_at', { ascending: false });
      setBuildings((fresh as Building[]) || []); setName(''); setAddress(''); setShowCreate(false);
    }
    setSaving(false);
  }

  async function logout() { await supabase.auth.signOut(); router.replace('/login'); }
  if (loading) return <main className="loading-screen" dir="rtl"><Building2 size={34}/><span>در حال بارگذاری پنل امن…</span></main>;

  return (
    <main className="shell" dir="rtl">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Building2 size={22}/></div><div><strong>مدیریت یکپارچه ساختمان</strong><span>پنل مدیریت هوشمند</span></div></div>
        <div className="profile-card"><div className="avatar">{userName.slice(0,1)}</div><div><b>{userName}</b><small>{isGlobal ? 'مدیر کل سامانه' : 'مدیر ساختمان'}</small></div><ShieldCheck size={17}/></div>
        <nav>{menu.map(([label, Icon], i) => <button key={label} className={i === 0 ? 'active' : ''}><Icon size={18}/><span>{label}</span></button>)}</nav>
        <div className="side-bottom"><button><Settings size={18}/><span>تنظیمات</span></button><button onClick={logout}><LogOut size={18}/><span>خروج</span></button></div>
      </aside>
      <section className="content">
        <header className="topbar"><div><p className="eyebrow">محیط اختصاصی و ایمن</p><h1>{isGlobal ? 'پنل مدیریت کل سامانه' : 'داشبورد ساختمان'}</h1></div><div className="top-actions"><button className="icon-btn" aria-label="اعلان‌ها"><Bell size={19}/></button><div className="user-chip"><div className="mini-avatar">{userName.slice(0,1)}</div><span>{userName}</span></div></div></header>
        <section className="hero"><div><span className="badge"><ShieldCheck size={14}/> تفکیک اطلاعات با RLS</span><h2>مدیریت ساختمان، یکپارچه و ساده</h2><p>هر ساختمان فقط اطلاعات مجاز خودش را می‌بیند و مدیریت کل، نمای سراسری دارد.</p></div><button className="primary" onClick={() => setShowCreate(true)}><Plus size={18}/> افزودن ساختمان</button></section>
        {error && <div className="auth-error page-error">{error}</div>}
        <section className="stats">
          <Stat icon={<Building2 size={20}/>} title="ساختمان‌های قابل دسترسی" value={String(buildings.length)} note={isGlobal ? 'نمایش مدیریتی کل' : 'اختصاصی'} />
          <Stat icon={<Users size={20}/>} title="واحدها و ساکنان" value="—" note="پس از ثبت واحدها" />
          <Stat icon={<ReceiptText size={20}/>} title="شارژ ماه جاری" value="—" note="پس از فعال‌سازی مالی" />
          <Stat icon={<CircleDollarSign size={20}/>} title="پرداخت‌ها" value="—" note="پس از ثبت پرداخت‌ها" />
        </section>
        <section className="grid-two">
          <div className="panel"><div className="panel-head"><div><h3>{isGlobal ? 'همه ساختمان‌های سامانه' : 'ساختمان‌های تحت مدیریت'}</h3><span>داده‌ها از دیتابیس و با RLS فیلتر می‌شوند</span></div><button className="link-btn" onClick={() => setShowCreate(true)}>ساختمان جدید <Plus size={14}/></button></div>
            {buildings.length === 0 ? <div className="empty-state"><Building2 size={28}/><b>هنوز ساختمانی ثبت نشده</b><span>اولین ساختمان را اضافه کنید تا مدیریت شروع شود.</span><button className="primary dark" onClick={() => setShowCreate(true)}><Plus size={16}/> ایجاد ساختمان</button></div> : buildings.map(b => <BuildingRow key={b.id} name={b.name} meta={b.address || 'آدرس ثبت نشده'} status="فعال" />)}
          </div>
          <div className="panel"><div className="panel-head"><div><h3>امنیت و دسترسی</h3><span>کنترل دسترسی در سطح PostgreSQL</span></div><TrendingUp size={19}/></div><div className="security-list"><div><ShieldCheck size={17}/><span>RLS فعال برای تمام جداول اصلی</span></div><div><ShieldCheck size={17}/><span>تفکیک کامل ساختمان‌ها</span></div><div><ShieldCheck size={17}/><span>{isGlobal ? 'دسترسی مدیر کل به نمای سامانه' : 'دسترسی فقط به ساختمان‌های مجاز'}</span></div></div></div>
        </section>
      </section>
      {showCreate && <div className="modal-backdrop" onClick={() => !saving && setShowCreate(false)}><div className="modal-card" onClick={e => e.stopPropagation()}><div className="modal-title"><div><h3>ساختمان جدید</h3><span>پس از ثبت، مدیر ایجادکننده فقط همین ساختمان را مدیریت می‌کند.</span></div><Building2 size={22}/></div><label>نام ساختمان</label><input value={name} onChange={e => setName(e.target.value)} placeholder="مثلاً ساختمان گلستان" /><label>آدرس</label><textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="آدرس ساختمان" rows={3}/><div className="modal-actions"><button onClick={() => setShowCreate(false)} disabled={saving}>انصراف</button><button className="primary dark" onClick={createBuilding} disabled={saving}>{saving ? 'در حال ثبت…' : 'ثبت ساختمان'}</button></div></div></div>}
    </main>
  );
}
function Stat({icon,title,value,note}:{icon:React.ReactNode;title:string;value:string;note:string}) { return <div className="stat"><div className="stat-icon">{icon}</div><span>{title}</span><strong>{value}</strong><small>{note}</small></div>; }
function BuildingRow({name,meta,status}:{name:string;meta:string;status:string}) { return <div className="building-row"><div className="building-icon"><Building2 size={18}/></div><div className="row-main"><b>{name}</b><span>{meta}</span></div><span className="status">{status}</span><ArrowLeft size={15}/></div>; }
