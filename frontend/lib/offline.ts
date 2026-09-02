import { api } from './api';
const KEY='novapos-offline-sales';
export type QueuedSale={id:string;createdAt:string;payload:unknown};
export function queueSale(payload:unknown){const q=getQueue();q.push({id:crypto.randomUUID(),createdAt:new Date().toISOString(),payload});localStorage.setItem(KEY,JSON.stringify(q));}
export function getQueue():QueuedSale[]{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}}
export async function flushSales(){if(!navigator.onLine)return {synced:0};const q=getQueue();let synced=0;const pending:QueuedSale[]=[];for(const job of q){try{await api('/sales',{method:'POST',body:JSON.stringify(job.payload)});synced++;}catch{pending.push(job)}}localStorage.setItem(KEY,JSON.stringify(pending));return{synced,pending:pending.length};}
