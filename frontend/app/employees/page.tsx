import { FeaturePage } from '@/components/feature-page';
import { Users, UserCheck, Clock, BadgeDollarSign, ShieldCheck } from 'lucide-react';
export default function Employees(){return <FeaturePage title="Employees" subtitle="Profiles, PIN access, shifts, attendance, commissions, cashier performance and approvals." primaryLabel="Add Employee" cards={[
{title:'Employees',value:'28',note:'24 active',icon:Users},{title:'Clocked In',value:'12',note:'Across 3 stores',icon:UserCheck},{title:'Shifts Today',value:'18',note:'2 late',icon:Clock},{title:'Commission Due',value:'$1,840.20',note:'Current period',icon:BadgeDollarSign},{title:'Approvals',value:'3',note:'Supervisor queue',icon:ShieldCheck}
]} tabs={['Employees','Attendance','Shifts','Commissions','Performance','Approvals','Activity']} columns={['Employee','Role','Store','Shift','Sales Today','Commission','Status']} rows={[
{Employee:'Alex Morgan',Role:'Manager',Store:'Main Store',Shift:'08:00–17:00','Sales Today':'$1,982.40',Commission:'—',Status:'Active'},
{Employee:'Sarah Johnson',Role:'Cashier',Store:'Main Store',Shift:'09:00–18:00','Sales Today':'$1,650.30',Commission:'$42.20',Status:'Active'},
{Employee:'Michael Chen',Role:'Supervisor',Store:'Outlet',Shift:'07:00–16:00','Sales Today':'$1,402.60',Commission:'$35.00',Status:'Active'},
]} sideTitle="Employee Controls" sideItems={['Cashier PIN','Clock in / out','Shift scheduling','Attendance','Sales commissions','Supervisor approvals','Activity logs']}/>}
