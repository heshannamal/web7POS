export type Product = {
  id:number; name:string; sku:string; barcode:string; category:string; brand:string; unit:string;
  cost:number; price:number; special?:number; stock:number; reorder:number; emoji:string; status:'Active'|'Draft'|'Archived';
};
export const products: Product[] = [
  {id:1,name:'Red Apple',sku:'FRU-1001',barcode:'1234567890123',category:'Fruits & Vegetables',brand:'Fresh Farm',unit:'kg',cost:2.19,price:3.29,special:2.99,stock:128,reorder:20,emoji:'🍎',status:'Active'},
  {id:2,name:'Banana',sku:'FRU-1002',barcode:'1234567890124',category:'Fruits & Vegetables',brand:'Fresh Farm',unit:'kg',cost:.78,price:1.29,stock:184,reorder:30,emoji:'🍌',status:'Active'},
  {id:3,name:'Milk 1L',sku:'DAI-1001',barcode:'1234567890125',category:'Dairy & Eggs',brand:'Dairy Pure',unit:'L',cost:.85,price:1.49,stock:96,reorder:25,emoji:'🥛',status:'Active'},
  {id:4,name:'Whole Wheat Bread',sku:'BAK-1003',barcode:'1234567890127',category:'Bakery',brand:'Fresh Bake',unit:'400 g',cost:1.35,price:2.49,special:2.29,stock:34,reorder:15,emoji:'🍞',status:'Active'},
  {id:5,name:'Eggs (12 pcs)',sku:'DAI-1002',barcode:'1234567890128',category:'Dairy & Eggs',brand:'Farm Fresh',unit:'12 pcs',cost:2.40,price:3.49,stock:18,reorder:20,emoji:'🥚',status:'Active'},
  {id:6,name:'Basmati Rice 5kg',sku:'GRO-1001',barcode:'1234567890129',category:'Grocery',brand:'Royal Feast',unit:'5 kg',cost:8.20,price:12.99,stock:22,reorder:10,emoji:'🍚',status:'Active'},
  {id:7,name:'Sunflower Oil 1L',sku:'GRO-1002',barcode:'1234567890131',category:'Grocery',brand:'HealthyLife',unit:'1 L',cost:2.10,price:2.99,special:2.79,stock:56,reorder:20,emoji:'🫗',status:'Active'},
  {id:8,name:'Sugar 1kg',sku:'GRO-1003',barcode:'1234567890141',category:'Grocery',brand:'Sweet Life',unit:'1 kg',cost:.60,price:1.39,stock:68,reorder:20,emoji:'🧂',status:'Active'},
  {id:9,name:'Instant Coffee 200g',sku:'BEV-1006',barcode:'1234567890133',category:'Beverages',brand:'Nescafe',unit:'200 g',cost:3.20,price:4.99,stock:0,reorder:10,emoji:'☕',status:'Active'},
  {id:10,name:'Potato Chips 150g',sku:'SNK-1001',barcode:'1234567890140',category:'Snacks',brand:'Crunch',unit:'150 g',cost:1.05,price:1.99,stock:42,reorder:15,emoji:'🍟',status:'Active'},
  {id:11,name:'Laundry Detergent 2kg',sku:'HOU-1002',barcode:'1234567890137',category:'Household',brand:'Dafe',unit:'2 kg',cost:3.90,price:7.49,special:6.99,stock:31,reorder:12,emoji:'🧴',status:'Active'},
  {id:12,name:'Toothpaste 100ml',sku:'PER-1010',barcode:'1234567890170',category:'Personal Care',brand:'Smile',unit:'100 ml',cost:.75,price:1.49,stock:64,reorder:20,emoji:'🪥',status:'Active'},
  {id:13,name:'Shampoo 400ml',sku:'PER-1011',barcode:'1234567890171',category:'Personal Care',brand:'PureCare',unit:'400 ml',cost:1.60,price:2.99,stock:47,reorder:15,emoji:'🧴',status:'Active'},
  {id:14,name:'Toilet Paper 4 Rolls',sku:'HOU-1007',barcode:'1234567890135',category:'Household',brand:'SoftCare',unit:'4 rolls',cost:1.75,price:2.49,stock:76,reorder:15,emoji:'🧻',status:'Active'},
  {id:15,name:'Mineral Water 1.5L',sku:'BEV-1012',barcode:'1234567890192',category:'Beverages',brand:'Clear',unit:'1.5 L',cost:.35,price:.99,stock:112,reorder:25,emoji:'💧',status:'Active'},
];
export const customers = [
  {name:'Sarah Johnson',email:'sarah.j@email.com',group:'Retail',tier:'Gold',points:2450,credit:75,spent:3245.80,last:'May 17, 2025',status:'Active'},
  {name:'Michael Brown',email:'michael.b@email.com',group:'Wholesale',tier:'Silver',points:1870,credit:120,spent:5678.30,last:'May 16, 2025',status:'Active'},
  {name:'Emily Davis',email:'emily.d@email.com',group:'Retail',tier:'Gold',points:940,credit:25,spent:1245.60,last:'May 15, 2025',status:'Active'},
  {name:'David Wilson',email:'david.w@email.com',group:'Retail',tier:'Gold',points:1560,credit:60,spent:2890.20,last:'May 14, 2025',status:'Active'},
  {name:'Jessica Martinez',email:'jessica.m@email.com',group:'Member',tier:'Platinum',points:3210,credit:200,spent:6789.10,last:'May 12, 2025',status:'Active'},
  {name:'Robert Taylor',email:'robert.t@email.com',group:'Wholesale',tier:'Silver',points:620,credit:15,spent:980.40,last:'May 11, 2025',status:'Inactive'},
];
export const suppliers = [
  {name:'Global Foods Ltd',orders:18,spend:98450,onTime:'96.2%',outstanding:18230.50},
  {name:'FreshMart Distributors',orders:14,spend:76230,onTime:'93.1%',outstanding:15620},
  {name:'Beverages Co.',orders:11,spend:45320.30,onTime:'91.8%',outstanding:8450},
  {name:'PackCo Supplies',orders:9,spend:32450.20,onTime:'89.4%',outstanding:6230.10},
];
