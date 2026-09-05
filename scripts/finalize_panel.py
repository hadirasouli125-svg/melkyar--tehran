from pathlib import Path

p = Path('app/panel/page.tsx')
s = p.read_text()
repls = [
("import {Building2,LayoutDashboard,Users,WalletCards,Wrench,Bell,FileText,Settings,ShieldCheck,Plus,LogOut,X,Save,Trash2,Edit3,UserCog,CreditCard,BarChart3,Receipt,ArrowRight,ChevronLeft} from 'lucide-react';",
 "import {Building2,LayoutDashboard,Users,WalletCards,Wrench,Bell,FileText,Settings,ShieldCheck,Plus,LogOut,X,Save,Trash2,Edit3,UserCog,CreditCard,BarChart3,Receipt,ArrowRight,ChevronLeft,Menu} from 'lucide-react';"),
("import {FinanceManager,ExpensesManager,RepairsManager} from '@/components/FinanceManagement';",
 "import {FinanceManager,ExpensesManager,RepairsManager} from '@/components/FinanceManagement';\nimport {PaymentManagement} from '@/components/PaymentManagement';\nimport {ResidentsManager} from '@/components/ResidentsManager';"),
("const[section,setSection]=useState<Section>('dashboard');const[loading,setLoading]=useState(true);const[err,setErr]=useState('');",
 "const[section,setSection]=useState<Section>('dashboard');const[loading,setLoading]=useState(true);const[err,setErr]=useState('');const[mobileMenu,setMobileMenu]=useState(false);"),
('<aside className="sidebar">', '<aside className={`sidebar ${mobileMenu?\'mobile-open\':\'\'}`}>'),
("<nav>{menu.map(([t,k,I])=><button key={k} className={section===k?'active':''} onClick={()=>setSection(k)}>",
 "<nav>{menu.map(([t,k,I])=><button key={k} className={section===k?'active':''} onClick={()=>{setSection(k);setMobileMenu(false)}}>"),
('<section className="content"><header className="topbar">',
 '<div className={`mobile-backdrop ${mobileMenu?\'show\':\'\'}`} onClick={()=>setMobileMenu(false)}></div><section className="content"><header className="topbar"><button className="mobile-menu-btn" onClick={()=>setMobileMenu(v=>!v)} aria-label="باز و بسته کردن منو"><Menu size={22}/></button>'),
('<div className="user-chip">',
 '<div className="header-back-area">{section!==\'dashboard\'&&<button className="secondary header-back" onClick={()=>setSection(\'dashboard\')}><ArrowRight size={15}/> بازگشت به داشبورد</button>}</div><div className="user-chip">'),
("{buildingMode&&section==='units'&&<Units building={building} units={units} reload={loadUnits} setErr={setErr}/>} {buildingMode&&section==='finance'&&<FinanceManager building={building} units={units} setErr={setErr}/>} ",
 "{buildingMode&&section==='units'&&<><Units building={building} units={units} reload={loadUnits} setErr={setErr}/><ResidentsManager building={building} units={units} setErr={setErr}/>} {buildingMode&&section==='finance'&&<><FinanceManager building={building} units={units} setErr={setErr}/><PaymentManagement building={building} units={units} setErr={setErr}/>} ")
]
for a,b in repls:
    s = s.replace(a,b)
p.write_text(s)

css = Path('app/globals.css')
c = css.read_text()
marker = '/* Final responsive navigation */'
if marker not in c:
    c += '''
/* Final responsive navigation */
.mobile-menu-btn{display:none;border:0;background:transparent;align-items:center;justify-content:center;padding:9px;border-radius:12px;cursor:pointer;color:inherit}
.mobile-backdrop{display:none}
.header-back-area{display:flex;align-items:center;gap:8px;margin-inline:auto 12px}
.header-back{white-space:nowrap}
@media(max-width:600px){
 .mobile-menu-btn{display:flex;order:-1}
 .sidebar{position:fixed!important;top:0;right:0;bottom:0;width:min(88vw,330px);height:100dvh;z-index:1000;transform:translateX(105%);transition:transform .22s ease;overflow-y:auto;display:flex!important;visibility:hidden;box-shadow:-12px 0 35px rgba(0,0,0,.16)}
 .sidebar.mobile-open{transform:translateX(0);visibility:visible}
 .mobile-backdrop{position:fixed;inset:0;z-index:999;background:rgba(15,23,42,.42);backdrop-filter:blur(2px)}
 .mobile-backdrop.show{display:block}
 .content{width:100%;min-width:0}
 .topbar{gap:8px;position:sticky;top:0;z-index:20}
 .header-back-area{display:none}
 .user-chip{margin-inline-start:auto}
 .form-grid{grid-template-columns:1fr!important}
 .panel-head{gap:10px;flex-wrap:wrap}
 .table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
 table{min-width:700px}
 .building-row{flex-wrap:wrap}
}
'''
    css.write_text(c)
