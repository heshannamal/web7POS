'use client';
import { useMemo, useState } from 'react';
import { products, Product } from '@/data/mock';
import { PageHead, Metric, Badge, Card } from '@/components/ui';
import { Package, CheckCircle2, AlertTriangle, Archive, Plus, Upload, Download, Search, Barcode, Pencil, MoreHorizontal, X } from 'lucide-react';

export default function Products(){
  const [q,setQ]=useState(''); const [selected,setSelected]=useState<Product|null>(products[0]);
  const list=useMemo(()=>products.filter(p=>`${p.name} ${p.sku} ${p.barcode} ${p.brand}`.toLowerCase().includes(q.toLowerCase())),[q]);
  const low=products.filter(p=>p.stock<=p.reorder).length;
  return <>
    <PageHead title="Product Management" subtitle="Manage categories, variants, pricing, barcodes, suppliers and product inventory.">
      <button className="btn"><Upload size={15}/> Import</button><button className="btn"><Download size={15}/> Export</button><button className="btn btn-primary"><Plus size={16}/> Add Product</button>
    </PageHead>
    <div className="grid metrics">
      <Metric label="Total Products" value="2,458" delta="5.4% vs last month" Icon={Package}/><Metric label="Active Products" value="2,362" delta="4.8%" Icon={CheckCircle2}/><Metric label="Low Stock" value={String(low+36)} delta="Needs attention" Icon={AlertTriangle}/><Metric label="Out of Stock" value="48" delta="2.1%" Icon={Archive}/><Metric label="Total Value" value="$158,430.50" delta="12.6%" Icon={Package}/>
    </div>
    <div className="grid two-col">
      <Card title="Products" action={<div className="toolbar"><button className="btn btn-sm"><Barcode size={14}/> Print Barcode Labels</button></div>}>
        <div className="tabs"><button className="tab active">All Products</button><button className="tab">Simple</button><button className="tab">Variable</button><button className="tab">Bundles</button><button className="tab">Kits</button></div>
        <div className="toolbar" style={{marginBottom:10}}><label className="global-search" style={{width:330}}><Search size={15}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name, SKU, barcode…"/></label><select className="field"><option>All Categories</option></select><select className="field"><option>All Brands</option></select><select className="field"><option>All Units</option></select></div>
        <div className="table-wrap"><table><thead><tr><th>Product</th><th>SKU / Barcode</th><th>Category</th><th>Unit</th><th>Cost</th><th>Selling</th><th>Stock</th><th>Status</th><th></th></tr></thead><tbody>{list.map(p=><tr key={p.id} onClick={()=>setSelected(p)} style={{cursor:'pointer'}}><td><div className="product-cell"><div className="thumb">{p.emoji}</div><div><b>{p.name}</b><div className="muted" style={{fontSize:10}}>{p.brand}</div></div></div></td><td>{p.sku}<div className="muted" style={{fontSize:10}}>{p.barcode}</div></td><td>{p.category}</td><td>{p.unit}</td><td>${p.cost.toFixed(2)}</td><td>${p.price.toFixed(2)}{p.special&&<div className="accent" style={{fontSize:10}}>Member ${p.special.toFixed(2)}</div>}</td><td className={p.stock===0?'red':p.stock<=p.reorder?'accent':'green'}>{p.stock}</td><td><Badge tone={p.status==='Active'?'green':'orange'}>{p.status}</Badge></td><td><button className="btn btn-sm"><Pencil size={13}/></button></td></tr>)}</tbody></table></div>
      </Card>
      <aside className="card" style={{alignSelf:'start',position:'sticky',top:70}}>{selected&&<><div className="card-head"><h3>{selected.name}</h3><button className="btn btn-sm" onClick={()=>setSelected(null)}><X size={14}/></button></div><div className="card-body"><div style={{fontSize:90,textAlign:'center',padding:10}}>{selected.emoji}</div><div className="tabs"><button className="tab active">General</button><button className="tab">Pricing</button><button className="tab">Inventory</button><button className="tab">Variants</button></div><div className="list"><Info k="Category" v={selected.category}/><Info k="Brand" v={selected.brand}/><Info k="SKU" v={selected.sku}/><Info k="Barcodes" v={`${selected.barcode}, +1 alternate`}/><Info k="Unit" v={selected.unit}/><Info k="Cost Price" v={`$${selected.cost.toFixed(2)}`}/><Info k="Selling Price" v={`$${selected.price.toFixed(2)}`}/><Info k="Wholesale" v={`$${(selected.price*.86).toFixed(2)}`}/><Info k="Member Price" v={selected.special?`$${selected.special.toFixed(2)}`:'—'}/><Info k="Tax" v="Inclusive (8.25%)"/><Info k="Location Prices" v="3 stores configured"/><Info k="Batch / Expiry" v="Tracked when received"/><Info k="Shelf / Bin" v="A-03 / B12"/><Info k="Supplier Code" v="SUP-4461"/></div><button className="btn btn-primary" style={{width:'100%',marginTop:14}}>Save Changes</button></div></>}</aside>
    </div>
  </>
}
function Info({k,v}:{k:string;v:string}){return <div className="list-row"><div className="grow"><div className="sub">{k}</div><div className="title">{v}</div></div></div>}
