import { FeaturePage } from '@/components/feature-page';
import { Landmark, ArrowDownLeft, ArrowUpRight, Scale, LineChart } from 'lucide-react';
export default function Accounting(){return <FeaturePage title="Accounting" subtitle="Chart of accounts, ledgers, receivables, payables, tax, cash flow and external accounting integrations." primaryLabel="New Journal Entry" cards={[
{title:'Cash & Bank',value:'$84,320.40',note:'Across accounts',icon:Landmark},{title:'Receivables',value:'$28,450.20',note:'18 open invoices',icon:ArrowDownLeft},{title:'Payables',value:'$68,923.18',note:'Supplier balance',icon:ArrowUpRight},{title:'Tax Payable',value:'$7,240.80',note:'Current period',icon:Scale},{title:'Net Profit',value:'$32,504.00',note:'This month',icon:LineChart}
]} tabs={['Overview','Chart of Accounts','General Ledger','Sales Ledger','Purchase Ledger','Receivables','Payables','Taxes','Cash Flow','P&L']} columns={['Account','Type','Debit','Credit','Balance','Status']} rows={[
{Account:'1000 · Cash on Hand',Type:'Asset',Debit:'$8,923.60',Credit:'$4,921.10',Balance:'$24,520.40',Status:'Active'},
{Account:'1200 · Accounts Receivable',Type:'Asset',Debit:'$12,420.00',Credit:'$8,320.00',Balance:'$28,450.20',Status:'Active'},
{Account:'2100 · Accounts Payable',Type:'Liability',Debit:'$6,230.00',Credit:'$12,820.00',Balance:'$68,923.18',Status:'Active'},
]} sideTitle="Accounting Integrations" sideItems={['QuickBooks Online','Xero','Tax reports','Bank reconciliation','General ledger export','Period close']}/>}
