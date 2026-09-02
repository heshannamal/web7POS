import { FeaturePage } from '@/components/feature-page';
import { PlugZap, ShoppingBag, Cloud, CreditCard, ReceiptText } from 'lucide-react';
export default function Integrations(){return <FeaturePage title="Integrations & Omnichannel" subtitle="Connect ecommerce, marketplaces, payments, accounting and external services to a single inventory source." primaryLabel="Connect Integration" cards={[
{title:'Connected Apps',value:'8',note:'All healthy',icon:PlugZap},{title:'Online Orders',value:'326',note:'This month',icon:ShoppingBag},{title:'Synced Products',value:'2,458',note:'Across channels',icon:Cloud},{title:'Payment Gateways',value:'4',note:'Active',icon:CreditCard},{title:'Accounting Sync',value:'Healthy',note:'Last sync 2m',icon:ReceiptText}
]} tabs={['All','Ecommerce','Marketplaces','Payments','Accounting','Messaging','API & Webhooks']} columns={['Integration','Category','Last Sync','Items Synced','Errors','Status']} rows={[
{Integration:'Shopify',Category:'Ecommerce','Last Sync':'2 min ago','Items Synced':'2,458',Errors:'0',Status:'Connected'},
{Integration:'WooCommerce',Category:'Ecommerce','Last Sync':'4 min ago','Items Synced':'2,112',Errors:'0',Status:'Connected'},
{Integration:'QuickBooks',Category:'Accounting','Last Sync':'12 min ago','Items Synced':'486',Errors:'0',Status:'Connected'},
]} sideTitle="Omnichannel Capabilities" sideItems={['Click & collect','Online + in-store inventory','Customer account sync','Loyalty sync','Promotion sync','Marketplace order routing','API & webhooks']}/>}
