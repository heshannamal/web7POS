import { PageHead, Metric, Card, Badge } from '@/components/ui';
import { SalesArea, PaymentPie } from '@/components/charts';
import { DollarSign, ShoppingBag, TrendingUp, Basket, Users, ArrowRight } from 'lucide-react';
import { products } from '@/data/mock';

export default function Dashboard(){
  const low = products.filter(p=>p.stock<=p.reorder);
  return <>
    <PageHead title="Dashboard" subtitle="Real-time overview of your store performance and operations.">
      <button className="btn">May 18, 2025</button><button className="btn">Refresh</button>
    </PageHead>
    <div className="grid metrics">
      <Metric label="Today's Sales" value="$8,923.60" delta="12.5% vs yesterday" Icon={DollarSign}/>
      <Metric label="Orders" value="156" delta="8.2% vs yesterday" Icon={ShoppingBag}/>
      <Metric label="Gross Profit" value="$3,250.40" delta="15.3% vs yesterday" Icon={TrendingUp}/>
      <Metric label="Avg Basket Value" value="$57.21" delta="6.7% vs yesterday" Icon={Basket}/>
      <Metric label="Customers" value="94" delta="9.1% vs yesterday" Icon={Users}/>
    </div>
    <div className="grid dashboard-grid">
      <Card title="Sales Overview" action={<button className="btn btn-sm">Today</button>} className="chart-card"><div style={{fontSize:24,fontWeight:700,marginBottom:4}}>$8,923.60 <span className="green" style={{fontSize:12}}>↑ 12.5%</span></div><SalesArea/></Card>
      <Card title="Inventory Summary" action={<span className="accent" style={{fontSize:11}}>View inventory <ArrowRight size={12}/></span>}><PaymentPie/><div style={{display:'grid',gap:8,fontSize:12}}><div>● <span className="green">In Stock</span> 842 (67.7%)</div><div>● <span style={{color:'var(--yellow)'}}>Low Stock</span> 243</div><div>● <span className="red">Out of Stock</span> 160</div></div></Card>
      <Card title="Low Stock Alerts" action={<span className="accent" style={{fontSize:11}}>View all</span>}><div className="list">{low.slice(0,5).map(p=><div className="list-row" key={p.id}><div className="thumb">{p.emoji}</div><div className="grow"><div className="title">{p.name}</div><div className="sub">{p.category}</div></div><Badge tone={p.stock===0?'red':'orange'}>{p.stock} left</Badge></div>)}</div></Card>
    </div>
    <div className="grid three-col" style={{marginTop:12}}>
      <Card title="Recent Sales" action={<span className="accent" style={{fontSize:11}}>View all</span>}><div className="list">{['INV-10568','INV-10567','INV-10566','INV-10565'].map((n,i)=><div className="list-row" key={n}><div className="grow"><div className="title">{n}</div><div className="sub">May 18, 2025 · 10:{24-i*3} AM</div></div><b>${[45.60,28.35,63.10,18.90][i].toFixed(2)}</b><Badge>Completed</Badge></div>)}</div></Card>
      <Card title="Top Products" action={<span className="accent" style={{fontSize:11}}>View report</span>}><div className="list">{products.slice(0,5).map((p,i)=><div className="list-row" key={p.id}><span className="muted">{i+1}</span><div className="thumb">{p.emoji}</div><div className="grow"><div className="title">{p.name}</div><div className="sub">{p.stock} units</div></div><b>${(p.price*p.stock*.12).toFixed(2)}</b></div>)}</div></Card>
      <Card title="Payment Methods"><PaymentPie/></Card>
    </div>
  </>
}
