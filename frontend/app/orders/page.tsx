import { FeaturePage } from '@/components/feature-page';
import { FileText, PackageCheck, Clock, CreditCard, Truck } from 'lucide-react';
export default function Orders(){return <FeaturePage title="Sales Orders" subtitle="Quotes, estimates, orders, invoices, delivery, deposits, layaway and outstanding balances." primaryLabel="New Sales Order" cards={[
{title:'Open Orders',value:'84',note:'18 due today',icon:FileText},{title:'Ready to Deliver',value:'22',note:'6 click & collect',icon:Truck},{title:'Backorders',value:'9',note:'Awaiting stock',icon:Clock},{title:'Outstanding',value:'$18,420.50',note:'Customer invoices',icon:CreditCard},{title:'Fulfilled',value:'96.4%',note:'This month',icon:PackageCheck}
]} tabs={['Orders','Quotes','Estimates','Invoices','Pro-forma','Delivery Orders','Backorders','Layaway']} columns={['Order','Customer','Type','Total','Paid','Fulfillment','Status']} rows={[
{Order:'SO-20418',Customer:'ABC Retail Ltd',Type:'Sales Order',Total:'$1,240.50',Paid:'$500.00',Fulfillment:'Partial',Status:'Open'},
{Order:'INV-10568',Customer:'Sarah Johnson',Type:'Invoice',Total:'$129.00',Paid:'$129.00',Fulfillment:'Complete',Status:'Paid'},
{Order:'QT-02031',Customer:'Michael Brown',Type:'Quote',Total:'$2,450.00',Paid:'$0.00',Fulfillment:'—',Status:'Pending'},
]} sideTitle="Order Workflows" sideItems={['Partial fulfillment','Deposits','Layaway','Customer credit sales','Invoice payments','Delivery management','Outstanding invoice reminders']}/>}
