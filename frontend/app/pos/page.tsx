'use client';
import { useEffect, useMemo, useState } from 'react';
import { products, Product } from '@/data/mock';
import { api } from '@/lib/api';
import { queueSale } from '@/lib/offline';
import { PageHead, Badge } from '@/components/ui';
import { ScanLine, UserPlus, Percent, Ticket, Pause, Trash2, Printer, Mail, StickyNote, MonitorSmartphone, RotateCcw, Undo2, RefreshCw, XCircle, WalletCards, Landmark, QrCode, CreditCard, Banknote, SplitSquareVertical } from 'lucide-react';

type CartLine = { product: Product; qty: number; discount?: number };
const categories = ['All',...Array.from(new Set(products.map(p=>p.category)))];
const methods = [
  ['Cash',Banknote],['Card',CreditCard],['Bank Transfer',Landmark],['QR Pay',QrCode],['Wallet',WalletCards],['Split',SplitSquareVertical],['Partial',CreditCard],['Store Credit',WalletCards]
] as const;

export default function POS(){
  const [query,setQuery]=useState(''); const [category,setCategory]=useState('All'); const [cart,setCart]=useState<CartLine[]>([]); const [discount,setDiscount]=useState(0); const [payment,setPayment]=useState('Cash'); const [notice,setNotice]=useState('');
  const [held,setHeld]=useState<CartLine[][]>([]);
  useEffect(()=>{ try{setHeld(JSON.parse(localStorage.getItem('held-sales')||'[]'))}catch{} },[]);
  const filtered=useMemo(()=>products.filter(p=>(category==='All'||p.category===category)&&(`${p.name} ${p.sku} ${p.barcode}`.toLowerCase().includes(query.toLowerCase()))),[query,category]);
  const add=(p:Product)=>setCart(c=>{const found=c.find(x=>x.product.id===p.id); return found?c.map(x=>x.product.id===p.id?{...x,qty:+(x.qty+(p.unit==='kg'?0.25:1)).toFixed(2)}:x):[...c,{product:p,qty:p.unit==='kg'?1:1}]});
  const change=(id:number,d:number)=>setCart(c=>c.map(x=>x.product.id===id?{...x,qty:Math.max(x.product.unit==='kg'?.25:1, +(x.qty+d).toFixed(2))}:x).filter(x=>x.qty>0));
  const subtotal=cart.reduce((s,x)=>s+x.product.price*x.qty,0); const tax=(subtotal-discount)*.0825; const total=Math.max(0,subtotal-discount+tax);
  const hold=()=>{ if(!cart.length)return; const n=[...held,cart]; setHeld(n); localStorage.setItem('held-sales',JSON.stringify(n)); setCart([]); setNotice('Sale held successfully'); };
  const resume=(i:number)=>{ setCart(held[i]); const n=held.filter((_,idx)=>idx!==i); setHeld(n); localStorage.setItem('held-sales',JSON.stringify(n)); };
  const pay=async()=>{ if(!cart.length)return; const payload={store_id:1,register_id:1,discount,items:cart.map(x=>({product_id:x.product.id,quantity:x.qty,unit_price:x.product.price})),payments:[{method:payment,amount:+total.toFixed(2)}]}; try{ if(!navigator.onLine) throw new Error('offline'); await api('/sales',{method:'POST',body:JSON.stringify(payload)}); setNotice(`$${total.toFixed(2)} paid by ${payment}. Receipt ready.`); }catch{ queueSale(payload); setNotice(`Sale saved offline. It will sync automatically when the connection returns.`); } setCart([]); setDiscount(0); };
  useEffect(()=>{ if(!notice)return; const t=setTimeout(()=>setNotice(''),2600); return()=>clearTimeout(t)},[notice]);

  return <>
    <PageHead title="POS / Checkout" subtitle="Fast, touch-first checkout with barcode, loyalty, discounts and multi-payment support.">
      <Badge tone={typeof navigator!=='undefined' && !navigator.onLine?'red':'green'}>{typeof navigator!=='undefined' && !navigator.onLine?'Offline · queued sync':'Online · synced'}</Badge>
    </PageHead>
    {notice&&<div className="card" style={{padding:12,marginBottom:10,borderColor:'rgba(72,199,116,.35)',color:'var(--green)'}}>{notice}</div>}
    <div className="pos-layout">
      <section className="pos-main">
        <div className="pos-search-row">
          <label className="global-search pos-search"><ScanLine size={18}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Scan barcode or search product, name, SKU…"/></label>
          <button className="btn"><UserPlus size={16}/> Customer</button><button className="btn" onClick={()=>setDiscount(Math.min(subtotal,5))}><Percent size={16}/> Discount</button><button className="btn"><Ticket size={16}/> Coupon</button><button className="btn" onClick={hold}><Pause size={16}/> Hold</button>
        </div>
        <div className="category-row">{categories.map(c=><button key={c} className={`category-chip ${category===c?'active':''}`} onClick={()=>setCategory(c)}>{c}</button>)}</div>
        <div className="product-grid">{filtered.map(p=><article className="product-card" key={p.id} onClick={()=>add(p)}>
          <div className="product-image">{p.emoji}</div><div className="product-name">{p.name}</div><div className="product-meta">{p.unit} · SKU {p.sku}</div><div className="product-price">${p.price.toFixed(2)} {p.unit==='kg'?'/ kg':''}</div>
        </article>)}</div>
        <div className="section-title">Resume Held Bills</div>
        <div className="card"><div className="card-body"><div className="toolbar">{held.length?held.map((h,i)=><button className="btn btn-sm" key={i} onClick={()=>resume(i)}>#HOLD-{String(i+1).padStart(4,'0')} · ${h.reduce((s,x)=>s+x.product.price*x.qty,0).toFixed(2)}</button>):<span className="muted">No held bills. Hold a sale to resume it later.</span>}</div></div></div>
        <div className="section-title">Receipt Options</div>
        <div className="toolbar"><button className="btn"><Printer size={15}/> Print Receipt</button><button className="btn"><Mail size={15}/> Email Receipt</button><button className="btn"><Mail size={15}/> SMS Receipt</button><button className="btn">No Receipt</button></div>
      </section>
      <aside className="cart">
        <div className="cart-head"><b>Current Cart ({cart.length})</b><div className="toolbar"><button className="btn btn-sm" onClick={hold}><Pause size={14}/> Hold</button><button className="btn btn-sm btn-danger" onClick={()=>setCart([])}><Trash2 size={14}/></button></div></div>
        <div className="cart-items">{cart.length?cart.map(x=><div className="cart-item" key={x.product.id}><div className="thumb">{x.product.emoji}</div><div><div className="title">{x.product.name}</div><div className="sub">${x.product.price.toFixed(2)} / {x.product.unit}</div><div className="qty"><button onClick={()=>change(x.product.id,x.product.unit==='kg'?-.25:-1)}>−</button><span>{x.qty}</span><button onClick={()=>change(x.product.id,x.product.unit==='kg'?.25:1)}>+</button></div></div><b>${(x.product.price*x.qty).toFixed(2)}</b></div>):<div className="muted" style={{padding:24,textAlign:'center'}}>Scan or tap a product to begin a sale.</div>}</div>
        <div className="cart-actions"><button className="btn btn-sm"><UserPlus size={14}/> Customer</button><button className="btn btn-sm" onClick={()=>setDiscount(Math.min(subtotal*.1,subtotal))}><Percent size={14}/> 10% Off</button><button className="btn btn-sm"><Ticket size={14}/> Coupon</button></div>
        <div className="cart-summary">
          <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div><div className="summary-row"><span>Discount</span><span className="green">-${discount.toFixed(2)}</span></div><div className="summary-row"><span>Tax (8.25%)</span><span>${tax.toFixed(2)}</span></div><div className="summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <div className="pay-methods">{methods.map(([name,Icon])=><button key={name} className={`pay-method ${payment===name?'active':''}`} onClick={()=>setPayment(name)}><Icon size={17}/>{name}</button>)}</div>
          <button className="btn btn-primary pay-btn" onClick={pay}>Pay ${total.toFixed(2)} <span style={{marginLeft:'auto'}}>F2</span></button>
        </div>
        <div className="quick-actions">{[[RotateCcw,'Refund'],[Undo2,'Return'],[RefreshCw,'Exchange'],[XCircle,'Void Item'],[Printer,'Reprint'],[Mail,'Email / SMS'],[StickyNote,'Cashier Notes'],[MonitorSmartphone,'Customer Display']].map(([Icon,label]:any)=><button className="quick-action" key={label}><Icon size={16}/><span>{label}</span></button>)}</div>
      </aside>
    </div>
  </>
}
