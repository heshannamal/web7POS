import { FeaturePage } from '@/components/feature-page';
import { ShieldCheck, KeyRound, Smartphone, History, AlertTriangle } from 'lucide-react';
export default function Security(){return <FeaturePage title="Security & Audit" subtitle="Role-based security, approvals, sessions, audit logs, device registration and fraud monitoring." primaryLabel="Security Review" cards={[
{title:'Active Sessions',value:'24',note:'4 stores',icon:ShieldCheck},{title:'2FA Coverage',value:'92%',note:'Admins 100%',icon:KeyRound},{title:'Registered Devices',value:'12',note:'11 online',icon:Smartphone},{title:'Audit Events',value:'284',note:'Last 24 hours',icon:History},{title:'Risk Alerts',value:'3',note:'Needs review',icon:AlertTriangle}
]} tabs={['Audit Logs','Login History','Sessions','Approvals','Devices','Fraud Alerts','Backup']} columns={['Time','User','Event','Store / Device','Risk','Status']} rows={[
{Time:'10:21 AM',User:'Alex Morgan',Event:'Updated user permissions','Store / Device':'Main Store',Risk:'Low',Status:'Recorded'},
{Time:'09:58 AM',User:'Sarah Johnson',Event:'Successful login','Store / Device':'POS-02',Risk:'Low',Status:'Recorded'},
{Time:'09:41 AM',User:'Olivia Martinez',Event:'Requested profit report access','Store / Device':'Web Admin',Risk:'Medium',Status:'Pending'},
]} sideTitle="Security Controls" sideItems={['Manager PIN override','Refund approval','Discount approval','Price-change approval','Two-factor authentication','Session timeout','Encrypted sensitive data','Suspicious transaction detection']}/>}
