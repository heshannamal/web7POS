import { PageHead, Metric, Card, Badge } from './ui';
import { LucideIcon, Plus, Download, Search } from 'lucide-react';

export type FeatureCard = { title:string; value:string; note:string; icon:LucideIcon };
export type Row = Record<string,string|number>;
export function FeaturePage({title,subtitle,cards,tabs,columns,rows,sideTitle,sideItems,primaryLabel='Create New'}:{title:string;subtitle:string;cards:FeatureCard[];tabs:string[];columns:string[];rows:Row[];sideTitle:string;sideItems:string[];primaryLabel?:string}){
  return <>
    <PageHead title={title} subtitle={subtitle}><button className="btn"><Download size={15}/> Export</button><button className="btn btn-primary"><Plus size={15}/> {primaryLabel}</button></PageHead>
    <div className="grid metrics">{cards.slice(0,5).map((c,i)=><Metric key={c.title} label={c.title} value={c.value} delta={c.note} Icon={c.icon}/>)}</div>
    <div className="tabs">{tabs.map((t,i)=><button key={t} className={`tab ${i===0?'active':''}`}>{t}</button>)}</div>
    <div className="grid two-col">
      <Card title={title}><div className="toolbar" style={{marginBottom:10}}><label className="global-search" style={{width:320}}><Search size={14}/><input placeholder="Search…"/></label><select className="field"><option>All Statuses</option></select><button className="btn">More Filters</button></div><div className="table-wrap"><table><thead><tr>{columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{columns.map(c=><td key={c}>{c==='Status'?<Badge tone={String(r[c]).toLowerCase().includes('pending')?'orange':String(r[c]).toLowerCase().includes('inactive')?'red':'green'}>{r[c]}</Badge>:r[c]}</td>)}</tr>)}</tbody></table></div></Card>
      <Card title={sideTitle}><div className="list">{sideItems.map((x,i)=><div className="list-row" key={i}><div className="grow"><div className="title">{x}</div><div className="sub">Configured and available</div></div><button className="btn btn-sm">Manage</button></div>)}</div></Card>
    </div>
  </>
}
