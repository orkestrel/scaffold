const j=require('/home/user/veneer-ut/tests/fixtures/oracle/inventory.json');
const idx=new Map();
for (const [k,c] of Object.entries(j.components)) for (const s of c.selectors){ const a=idx.get(s.selector)||[]; a.push(k); idx.set(s.selector,a)}
const mine=new Set();
for (const k of ['text','text-truncate','link']) for (const s of j.components[k].selectors) mine.add(s.selector);
const multi={};
for (const s of mine){ const ks=idx.get(s).join(','); multi[ks]=(multi[ks]||0)+1 }
console.log(multi);
// any other key recording text- or link- selectors
for (const [k,c] of Object.entries(j.components)) { const n=c.selectors.filter(s=>/\.(text|link)-/.test(s.selector)).length; if(n && !['text','text-truncate','link'].includes(k)) console.log(k,n, c.selectors.filter(s=>/\.(text|link)-/.test(s.selector)).map(s=>s.selector).slice(0,5)) }
console.log(Object.keys(j.components).filter(k=>/^(text|link|bg|color)/.test(k)));
console.log(JSON.stringify(j.components.text.selectors.find(s=>s.selector=='.text-sm-start')));
console.log(JSON.stringify(j.components.text.properties));
console.log(JSON.stringify(j.components.link.properties).slice(0,300));
