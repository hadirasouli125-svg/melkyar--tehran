'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Building2, Eye, EyeOff, KeyRound, LogIn, ShieldCheck, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

const GLOBAL_USERNAME = 'Hadirasouli';
const GLOBAL_EMAIL = 'hadirasouli@global.sakhteman';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/');
    });
  }, [router]);

  async function login(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const identifier = username.trim();
    const email = identifier.toLowerCase() === GLOBAL_USERNAME.toLowerCase()
      ? GLOBAL_EMAIL
      : identifier.includes('@') ? identifier : `${identifier.toLowerCase()}@resident.sakhteman`;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage('نام کاربری یا رمز عبور صحیح نیست.');
      setLoading(false);
      return;
    }
    router.replace('/');
  }

  return (
    <main className="auth-shell" dir="rtl">
      <div className="auth-glow" />
      <section className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo"><Building2 size={30} /></div>
          <div><strong>مدیریت یکپارچه ساختمان</strong><span>سامانه مدیریت هوشمند ساختمان</span></div>
        </div>
        <div className="auth-title">
          <span className="auth-badge"><ShieldCheck size={15}/> ورود امن</span>
          <h1>خوش آمدید</h1>
          <p>برای ورود به پنل مدیریت، اطلاعات حساب خود را وارد کنید.</p>
        </div>
        <form onSubmit={login} className="auth-form">
          <label>نام کاربری یا ایمیل</label>
          <div className="input-wrap"><UserRound size={19}/><input value={username} onChange={e => setUsername(e.target.value)} placeholder="نام کاربری" autoComplete="username" required /></div>
          <label>رمز عبور</label>
          <div className="input-wrap"><KeyRound size={19}/><input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="رمز عبور" autoComplete="current-password" required /><button type="button" className="password-toggle" onClick={() => setShowPassword(v => !v)} aria-label="نمایش رمز">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div>
          {message && <div className="auth-error">{message}</div>}
          <button className="auth-submit" disabled={loading}>{loading ? 'در حال ورود…' : <><LogIn size={19}/> ورود به پنل</>}</button>
        </form>
        <div className="auth-footer"><ShieldCheck size={15}/> دسترسی‌ها در سطح دیتابیس و با RLS محافظت می‌شوند.</div>
      </section>
    </main>
  );
}
