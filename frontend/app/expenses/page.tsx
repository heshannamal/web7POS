import { FeaturePage } from '@/components/feature-page';
import { ReceiptText, Building2, Users, Repeat2, BadgeCheck } from 'lucide-react';
export default function Expenses(){return <FeaturePage title="Expenses" subtitle="Track store, supplier, utility, salary and recurring expenses with approval workflows." primaryLabel="Add Expense" cards={[
{title:'Expenses This Month',value:'$18,430.20',note:'6.8% vs last month',icon:ReceiptText},{title:'Store Expenses',value:'$6,240.00',note:'34 entries',icon:Building2},{title:'Payroll Related',value:'$8,920.00',note:'Current period',icon:Users},{title:'Recurring',value:'12',note:'Next 7 days',icon:Repeat2},{title:'Pending Approval',value:'4',note:'$1,540.00',icon:BadgeCheck}
]} tabs={['All Expenses','Daily','Supplier','Utilities','Salary','Store','Recurring','Approvals']} columns={['Date','Category','Description','Store','Amount','Payment','Status']} rows={[
{Date:'May 18, 2025',Category:'Utilities',Description:'Electricity bill',Store:'Main Store',Amount:'$320.00',Payment:'Bank',Status:'Approved'},
{Date:'May 17, 2025',Category:'Store',Description:'Cleaning supplies',Store:'Outlet',Amount:'$85.40',Payment:'Cash',Status:'Approved'},
{Date:'May 17, 2025',Category:'Marketing',Description:'Local campaign',Store:'Main Store',Amount:'$450.00',Payment:'Card',Status:'Pending'},
]} sideTitle="Expense Controls" sideItems={['Receipt attachments','Approval limits','Recurring expenses','Category budgets','Store allocation','Profit after expenses']}/>}
