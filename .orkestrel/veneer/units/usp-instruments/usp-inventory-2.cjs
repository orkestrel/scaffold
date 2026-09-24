const inv=require("../../tests/fixtures/oracle/inventory.json");
const keys=['m','mx','my','mt','me','mb','ms','p','px','py','pt','pe','pb','ps','user-select'];
const index=new Map();
for(const [k,c] of Object.entries(inv.components)) for(const r of c.selectors){const a=index.get(r.selector)||[]; if(!a.includes(k))a.push(k); index.set(r.selector,a)}
let total=0;
for(const k of keys){for(const r of inv.components[k].selectors){total++; const a=index.get(r.selector); if(a.length>1) console.log('multi',r.selector,a)}}
console.log('total',total);
for (const k of keys){const c=inv.components[k]; console.log(k, JSON.stringify(c.properties), JSON.stringify(c.declarations).slice(0,200), c.keyframes, c.media)}
console.log(JSON.stringify(inv.components['user-select'].selectors));
console.log(JSON.stringify(inv.components['mx'].selectors.slice(5,8)));
console.log(JSON.stringify(inv.components['pe'].selectors.slice(30,38).map(s=>[s.selector,s.condition])));
// any selector in inventory named with class pe- elsewhere
for(const [k,c] of Object.entries(inv.components)) if(!keys.includes(k)) for(const r of c.selectors) if(/\.(m|mx|my|mt|me|mb|ms|p|px|py|pt|pe|pb|ps|user-select)-/.test(r.selector)) console.log('other',k,r.selector)
console.log(Object.keys(inv.unassigned||{}).length, JSON.stringify(inv.counts).slice(0,300));
