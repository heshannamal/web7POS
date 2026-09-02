'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ShoppingCart, Package, Warehouse, Truck, Users, Tags, BarChart3,
  ReceiptText, UserRoundCog, Settings, Search, Bell, Menu, Store, ChevronDown,
  Barcode, Banknote, ClipboardList, ShieldCheck, BrainCircuit, PlugZap,
  Landmark
} from 'lucide-react';
import { useEffect, useState } from 'react';

const primary = [
  ['/dashboard','Dashboard',LayoutDashboard],
  ['/pos','POS / Checkout',ShoppingCart],
  ['/products','Products',Package],
  ['/inventory','Inventory',Warehouse],
  ['/barcodes','Barcode / Labels',Barcode],
  ['/purchases','Purchases',Truck],
  ['/customers','Customers',Users],
  ['/promotions','Promotions',Tags],
  ['/orders','Sales Orders',ClipboardList],
  ['/register','Cashier / Register',Banknote],
  ['/reports','Reports',BarChart3],
  ['/expenses','Expenses',ReceiptText],
  ['/accounting','Accounting',Landmark],
  ['/employees','Employees',UserRoundCog],
  ['/users','Users / Roles',ShieldCheck],
  ['/stores','Stores / Locations',Store],
  ['/security','Security',ShieldCheck],
  ['/integrations','Integrations',PlugZap],
  ['/ai','AI Insights',BrainCircuit],
  ['/settings','Settings',Settings],
] as const;

export function AppShell({children}:{children:React.ReactNode}) {
  const pathname = usePathname();
  const [open,setOpen] = useState(false);
  const [online,setOnline] = useState(true);

  useEffect(()=>{ if('serviceWorker' in navigator){ navigator.serviceWorker.register('/sw.js').catch(()=>{}); } },[]);

  useEffect(()=>{
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener('online',sync); window.addEventListener('offline',sync);
    return ()=>{window.removeEventListener('online',sync);window.removeEventListener('offline',sync)};
  },[]);

  useEffect(()=>setOpen(false),[pathname]);

  return <div className="app-shell">
    <div className={`mobile-overlay ${open?'show':''}`} onClick={()=>setOpen(false)} />
    <aside className={`sidebar ${open?'open':''}`}>
      <div className="brand"><div className="brand-mark">✣</div><div className="brand-name">Nova<span>POS</span></div></div>
      <nav className="nav">
        {primary.map(([href,label,Icon]) => <Link key={href} href={href} className={`nav-link ${pathname===href?'active':''}`}>
          <Icon/><span>{label}</span>
        </Link>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="status-card">
          <div className="status-line"><span className="dot" style={{background:online?'var(--green)':'var(--red)'}} />{online?'Online':'Offline Mode'}</div>
          <div>{online?'All systems operational':'Sales will sync when connection returns.'}</div>
          <button className="collapse-btn">⇄ Sync · 2m ago</button>
        </div>
      </div>
    </aside>
    <main className="main-wrap">
      <header className="topbar">
        <button className="menu-btn" onClick={()=>setOpen(v=>!v)} aria-label="Open menu"><Menu size={18}/></button>
        <label className="global-search"><Search size={16}/><input placeholder="Search products, invoices, customers…"/><span style={{fontSize:10}}>⌘ K</span></label>
        <div className="top-actions">
          <button className="icon-btn"><Bell size={16}/><span className="badge orange">3</span></button>
          <button className="store-switch"><Store size={15}/> Main Store <ChevronDown size={14}/></button>
          <button className="user-menu"><span className="avatar">A</span><span className="user-copy"><b>Alex Morgan</b><br/><span className="muted">Manager</span></span><ChevronDown size={14}/></button>
        </div>
      </header>
      <div className="content">{children}</div>
    </main>
    <nav className="mobile-nav">
      {[['/dashboard','Home',LayoutDashboard],['/pos','POS',ShoppingCart],['/products','Products',Package],['/inventory','Stock',Warehouse],['/reports','More',BarChart3]].map(([href,label,Icon]:any)=><Link key={href} href={href} className={pathname===href?'active':''}><Icon/><span>{label}</span></Link>)}
    </nav>
  </div>
}
