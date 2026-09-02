'use client';
import { useState } from 'react';
import { customers } from '@/data/mock';
import { PageHead, Metric, Card, Badge } from '@/components/ui';
import { Users, Crown, Gift, WalletCards, TrendingUp, Plus, Upload, Star, Mail, Phone } from 'lucide-react';

export default function Customers(){
  const [selected,setSelected]=useState(customers[0]);
  return <>
    <PageHead title="Customers & Loyalty" subtitle="Customer profiles, retail/wholesale groups, loyalty, wallet, store credit and statements.">
      <button className="btn"><Upload size={15}/> Import Customers</button><button className="btn btn-primary"><Plus size={15}/> Add Customer</button>
    </PageHead>
    <div className="grid metrics"><Metric label="Total Customers" value="2,845" delta="12.5% vs last month" Icon={Users}/><Metric label="Active Members" value="1,326" delta="8.3%" Icon={Crown}/><Metric label="Loyalty Redemptions" value="482" delta="15.2%" Icon={Gift}/><Metric label="Store Credit Value" value="$18,923.50" delta="7.8%" Icon={WalletCards}/><Metric label="Avg Lifetime Value" value="$1,248.60" delta="11.6%" Icon={TrendingUp}/></div>
    <div className="grid two-col">
      <Card title="All Customers">
        <div className="tabs"><button className="tab active">All Customers</button><button className="tab">Members</button><button className="tab">Retail</button><button className="tab">Wholesale</button><button className="tab">VIP</button></div>
        <div className="toolbar" style={{marginBottom:10}}><input className="field" placeholder="Search customers…"/><select className="field"><option>All Groups</option></select><select className="field"><option>All Tiers</option></select><button className="btn">More Filters</button></div>
        <div className="table-wrap"><table><thead><tr><th>Customer</th><th>Group</th><th>Membership</th><th>Loyalty Points</th><th>Store Credit</th><th>Total Spent</th><th>Last Purchase</th><th>Status</th></tr></thead><tbody>{customers.map((c,i)=><tr key={c.name} onClick={()=>setSelected(c)} style={{cursor:'pointer'}}><td><div className="product-cell"><div className="thumb">👤</div><div><b>{c.name}</b><div className="muted" style={{fontSize:10}}>{c.email}</div></div></div></td><td>{c.group}</td><td><Badge tone={c.tier==='Gold'?'orange':c.tier==='Platinum'?'violet':'blue'}>{c.tier}</Badge></td><td>{c.points.toLocaleString()}<div className="accent" style={{fontSize:10}}>${(c.points*.01).toFixed(2)} value</div></td><td>${c.credit.toFixed(2)}</td><td>${c.spent.toFixed(2)}</td><td>{c.last}</td><td><Badge tone={c.status==='Active'?'green':'orange'}>{c.status}</Badge></td></tr>)}</tbody></table></div>
      </Card>
      <aside className="card" style={{alignSelf:'start',position:'sticky',top:70}}><div className="card-body"><div style={{display:'flex',gap:12,alignItems:'center'}}><div className="thumb" style={{width:62,height:62,fontSize:34}}>👤</div><div><h3 style={{margin:'0 0 3px'}}>{selected.name} <Badge tone="orange">{selected.tier}</Badge></h3><div className="muted" style={{fontSize:11,display:'grid',gap:3}}><span><Mail size={12}/> {selected.email}</span><span><Phone size={12}/> +1 (555) 123-4567</span></div></div></div><div className="small-grid" style={{marginTop:14}}><Mini label="Loyalty Points" value={selected.points.toLocaleString()}/><Mini label="Store Credit" value={`$${selected.credit.toFixed(2)}`}/><Mini label="Lifetime Value" value={`$${selected.spent.toFixed(2)}`}/><Mini label="Credit Limit" value="$500.00"/></div><div className="toolbar" style={{margin:'12px 0'}}><button className="btn btn-sm"><WalletCards size={13}/> Add Credit</button><button className="btn btn-sm"><Star size={13}/> Adjust Points</button><button className="btn btn-sm"><Gift size={13}/> Send Offer</button></div><Card title="Recent Purchases"><div className="list">{['Wireless Headphones · $129.00','Smart Watch · $199.00','Classic Tee · $29.00','Sneakers · $139.00'].map(x=><div className="list-row" key={x}><div className="grow">{x}</div></div>)}</div></Card><div style={{height:10}}/><Card title="Account Statement"><div className="list"><Info k="Total Purchases" v={`$${selected.spent.toFixed(2)}`}/><Info k="Store Credit Used" v="$50.00"/><Info k="Store Credit Earned" v="$75.00"/><Info k="Outstanding Balance" v="$0.00"/></div></Card><div style={{height:10}}/><Card title="Customer Notes"><p className="muted" style={{fontSize:12,lineHeight:1.6}}>Prefers organic products. Birthday offers enabled. Tax/business information is stored on profile for invoice use.</p></Card></div></aside>
    </div>
  </>
}
function Mini({label,value}:{label:string;value:string}){return <div className="quick-card" style={{minHeight:80}}><div className="muted" style={{fontSize:10}}>{label}</div><div style={{fontWeight:700,fontSize:17,marginTop:6}}>{value}</div></div>}
function Info({k,v}:{k:string;v:string}){return <div className="list-row"><div className="grow">{k}</div><b>{v}</b></div>}
