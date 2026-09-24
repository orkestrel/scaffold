const j=require('/home/user/veneer-ut/tests/fixtures/oracle/inventory.json');
for (const k of process.argv.slice(2)) {
  const c=j.components[k];
  console.log('== '+k, 'selectors', c.selectors.length, 'decl', JSON.stringify(c.declarations).slice(0,200), 'props', JSON.stringify(c.properties).slice(0,300), 'kf', JSON.stringify(c.keyframes), 'media', JSON.stringify(c.media).slice(0,1500));
  for (const s of c.selectors) {
    console.log(s.selector+' | '+s.declarations.map(d=>d.property+': '+d.value).join('; ') + (s.media? ' @'+JSON.stringify(s.media):'') + ' keys:'+Object.keys(s).join(','));
  }
}
