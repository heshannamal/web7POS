export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
export async function api<T>(path:string, init?:RequestInit):Promise<T>{
  const res=await fetch(`${API_URL}${path}`,{...init,headers:{'Content-Type':'application/json','Accept':'application/json',...(init?.headers||{})}});
  if(!res.ok) throw new Error((await res.text())||`API ${res.status}`);
  return res.json();
}
