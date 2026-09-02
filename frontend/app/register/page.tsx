import { FeaturePage } from '@/components/feature-page';
import { Banknote, CircleDollarSign, Clock, BadgeDollarSign, UserCheck } from 'lucide-react';
export default function Register(){return <FeaturePage title="Cashier & Register" subtitle="Open/close registers, manage cash movement, shifts, X/Z reports and supervisor approvals." primaryLabel="Open Register" cards={[
{title:'Open Registers',value:'4',note:'Across 3 stores',icon:Banknote},{title:'Expected Cash',value:'$4,820.40',note:'Today',icon:CircleDollarSign},{title:'Cash Difference',value:'+$3.20',note:'Within threshold',icon:BadgeDollarSign},{title:'Active Shifts',value:'7',note:'2 ending soon',icon:Clock},{title:'Approvals',value:'3',note:'Needs supervisor',icon:UserCheck}
]} tabs={['Registers','Cash In / Out','Shifts','Closings','X Reports','Z Reports','Approvals']} columns={['Register','Store','Cashier','Opening Cash','Expected Cash','Actual Cash','Status']} rows={[
{Register:'POS-01',Store:'Main Store',Cashier:'Alex Morgan','Opening Cash':'$200.00','Expected Cash':'$1,825.40','Actual Cash':'—',Status:'Open'},
{Register:'POS-02',Store:'Main Store',Cashier:'Sarah Connor','Opening Cash':'$200.00','Expected Cash':'$1,440.20','Actual Cash':'—',Status:'Open'},
{Register:'POS-03',Store:'Outlet',Cashier:'James Carter','Opening Cash':'$150.00','Expected Cash':'$988.50','Actual Cash':'$990.00',Status:'Closed'},
]} sideTitle="Register Controls" sideItems={['Cash drawer','Cash in / cash out','Petty cash','Register transfer','End-of-shift close','Cash variance','Supervisor override']}/>}
