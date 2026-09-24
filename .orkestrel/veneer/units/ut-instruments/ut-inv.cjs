const j=require('/home/user/veneer-ut/tests/fixtures/oracle/inventory.json');
for (const k of process.argv.slice(2)) {
  const c=j.components[k];
  if(!c){console.log('NO',k);continue}
  console.log('== '+k, Object.keys(c));
  for (const s of c.selectors) {
    console.log(JSON.stringify(s));
  }
}
