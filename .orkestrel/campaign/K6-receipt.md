# K6 — scaffold host build + server-test reading after the rule edits (2026-09-15T09:32:51Z)
build exit: 0
npm notice run node -e "import('./dist/src/server/index.js').then((m)=>{const n=m.stageHost(process.cwd(),'dist/host').length;console.log('build-host: staged '+n+' file(s) into dist/host')})"
build-host: staged 123 file(s) into dist/host
npm notice run node -e "import('./dist/src/server/index.js').then((m)=>{const p=process.argv[1]??'host.json',n=m.stageInventory(process.cwd(),p).entries.length;console.log('build-inventory: staged '+n+' file(s) into '+p)})"
build-inventory: staged 123 file(s) into host.json
 M host.json
test:src:server exit: 0
 Test Files  5 passed (5)
      Tests  440 passed | 6 skipped (446)
