import { FeaturePage } from '@/components/feature-page';
import { Store, Warehouse, Monitor, ArrowLeftRight, BarChart3 } from 'lucide-react';
export default function Stores(){return <FeaturePage title="Stores & Locations" subtitle="Centralized multi-store, warehouse and register management with store-specific stock and pricing." primaryLabel="Add Store" cards={[
{title:'Stores',value:'4',note:'All active',icon:Store},{title:'Warehouses',value:'3',note:'2 regional',icon:Warehouse},{title:'Registers',value:'9',note:'8 online',icon:Monitor},{title:'Transfers Today',value:'12',note:'8 in transit',icon:ArrowLeftRight},{title:'Consolidated Sales',value:'$24,680.50',note:'All locations',icon:BarChart3}
]} tabs={['Stores','Warehouses','Registers','Transfers','Store Pricing','Store Users','Performance']} columns={['Location','Type','Registers','Inventory Value','Sales Today','Manager','Status']} rows={[
{Location:'Main Store',Type:'Store',Registers:'3','Inventory Value':'$56,230.00','Sales Today':'$5,892.40',Manager:'Alex Morgan',Status:'Active'},
{Location:'Downtown Store',Type:'Store',Registers:'2','Inventory Value':'$31,420.20','Sales Today':'$2,104.30',Manager:'Sarah Lee',Status:'Active'},
{Location:'Warehouse A',Type:'Warehouse',Registers:'—','Inventory Value':'$87,945.35','Sales Today':'—',Manager:'Michael Chen',Status:'Active'},
]} sideTitle="Multi-location Features" sideItems={['Store-specific prices','Store-specific promotions','Location stock','Location users','Inter-store transfers','Warehouse transfers','Consolidated reporting']}/>}
