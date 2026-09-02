import { FeaturePage } from '@/components/feature-page';
import { Tags, TicketPercent, Gift, CalendarClock, Users } from 'lucide-react';
export default function Promotions(){return <FeaturePage title="Promotions" subtitle="Automatic offers, coupons, bundles, member pricing and time-based promotions." primaryLabel="New Promotion" cards={[
{title:'Active Promotions',value:'18',note:'5 scheduled',icon:Tags},{title:'Coupons Redeemed',value:'842',note:'12.8% this month',icon:TicketPercent},{title:'Bundle Offers',value:'12',note:'4 BOGO',icon:Gift},{title:'Scheduled',value:'7',note:'Next starts 6 PM',icon:CalendarClock},{title:'Member Offers',value:'9',note:'Gold / VIP',icon:Users}
]} tabs={['All Promotions','Product','Category','Brand','BOGO','Coupons','Members','Scheduled']} columns={['Name','Type','Applies To','Discount','Period','Status']} rows={[
{Name:'Weekend Grocery 10%',Type:'Percentage', 'Applies To':'Grocery',Discount:'10%',Period:'Fri–Sun',Status:'Active'},
{Name:'Buy 2 Get 1 Snacks',Type:'Buy X Get Y','Applies To':'Snacks',Discount:'BOGO',Period:'All month',Status:'Active'},
{Name:'VIP Member Price',Type:'Member pricing','Applies To':'Selected products',Discount:'Custom',Period:'Always',Status:'Active'},
{Name:'Happy Hour Bakery',Type:'Time based','Applies To':'Bakery',Discount:'15%',Period:'5 PM–7 PM',Status:'Pending'},
]} sideTitle="Promotion Engine" sideItems={['Automatic promotion priority','Coupon & promo codes','Minimum-spend rules','Quantity discounts','Bundle pricing','Loyalty promotions']}/>}
