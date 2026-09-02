import type { LucideIcon } from 'lucide-react';

export function PageHead({title,subtitle,children}:{title:string;subtitle:string;children?:React.ReactNode}) {
  return <div className="page-head"><div><h1>{title}</h1><p>{subtitle}</p></div>{children&&<div className="head-actions">{children}</div>}</div>
}
export function Metric({label,value,delta,Icon}:{label:string;value:string;delta?:string;Icon?:LucideIcon}) {
  return <div className="metric"><div className="label">{label}</div><div className="value">{value}</div>{delta&&<div className="delta">↑ {delta}</div>}{Icon&&<div className="metric-icon"><Icon size={18}/></div>}</div>
}
export function Card({title,action,children,className=''}:{title?:string;action?:React.ReactNode;children:React.ReactNode;className?:string}) {
  return <section className={`card ${className}`}>{title&&<div className="card-head"><h3>{title}</h3>{action}</div>}<div className="card-body">{children}</div></section>
}
export function Badge({children,tone='green'}:{children:React.ReactNode;tone?:'green'|'orange'|'red'|'blue'|'violet'}) { return <span className={`badge ${tone}`}>{children}</span> }
