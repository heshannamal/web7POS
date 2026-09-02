import { FeaturePage } from '@/components/feature-page';
import { BrainCircuit, TrendingUp, PackageSearch, ShieldAlert, Sparkles } from 'lucide-react';
export default function AI(){return <FeaturePage title="AI & Smart Insights" subtitle="Forecast demand, detect anomalies and turn POS data into practical actions." primaryLabel="Ask Nova AI" cards={[
{title:'Forecast Accuracy',value:'91.4%',note:'30-day demand',icon:BrainCircuit},{title:'Sales Forecast',value:'+$12.8K',note:'Next 7 days',icon:TrendingUp},{title:'Reorder Suggestions',value:'34',note:'12 urgent',icon:PackageSearch},{title:'Anomaly Alerts',value:'3',note:'Needs review',icon:ShieldAlert},{title:'Insights Generated',value:'18',note:'Today',icon:Sparkles}
]} tabs={['Insights','Demand Forecast','Reorder AI','Pricing','Fraud Detection','Customer Recommendations','Ask AI']} columns={['Insight','Area','Impact','Confidence','Suggested Action','Status']} rows={[
{Insight:'Milk demand expected +18%',Area:'Forecast',Impact:'High',Confidence:'94%', 'Suggested Action':'Order +120 units',Status:'Ready'},
{Insight:'Slow-moving cereal stock',Area:'Inventory',Impact:'Medium',Confidence:'89%','Suggested Action':'Run 10% promotion',Status:'Ready'},
{Insight:'Unusual refund pattern at POS-03',Area:'Fraud',Impact:'High',Confidence:'91%','Suggested Action':'Manager review',Status:'Pending'},
]} sideTitle="Natural Language Reporting" sideItems={['“Show declining products over 3 months”','“Which store has best margin?”','“What should I reorder today?”','“Find suspicious refunds”','“Forecast next weekend sales”','Automatic supplier comparison']}/>}
