const inv=require("../../tests/fixtures/oracle/inventory.json");
const keys=['m','mx','my','mt','me','mb','ms','p','px','py','pt','pe','pb','ps','user-select'];
for (const k of keys){const c=inv.components[k]; if(!c){console.log(k,'MISSING');continue}
 console.log(k, Object.keys(c), 'selectors', c.selectors.length, 'media', (c.media||[]).length);
}
const c=inv.components['pe']; console.log(JSON.stringify(c.selectors.slice(0,3)), JSON.stringify(c.selectors.slice(-3)));
console.log(JSON.stringify(Object.keys(inv.media).slice(0,5)));
