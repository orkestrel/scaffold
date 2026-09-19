import { readFileSync, writeFileSync } from 'node:fs'
const manifest = JSON.parse(readFileSync('package.json', 'utf8'))
const program = `
const fs=require('node:fs'),ts=require('typescript'),cp=require('node:child_process');
const file='tests/app/browser/integration.test.ts';
const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);
const declaration=source.statements.filter(ts.isVariableStatement).flatMap(s=>s.declarationList.declarations).find(d=>ts.isIdentifier(d.name)&&d.name.text==='VARIANTS');
if(!declaration?.initializer||!ts.isArrayLiteralExpression(declaration.initializer))throw Error('VARIANTS must declare an array');
const names=declaration.initializer.elements.map(v=>{
if(!ts.isObjectLiteralExpression(v))throw Error('Each variant must declare an object');
const name=v.properties.find(p=>ts.isPropertyAssignment(p)&&ts.isIdentifier(p.name)&&p.name.text==='name');
if(!name||!ts.isStringLiteral(name.initializer))throw Error('Each variant must declare a literal name');
return name.initializer.text;
});
if(!names.length||new Set(names).size!==names.length)throw Error('Variant names must be nonempty and unique');
for(const name of names){
console.log('VITE_VARIANT='+name);
const result=cp.spawnSync(process.execPath,['node_modules/vitest/vitest.mjs','run','--config','vite.config.ts','--no-cache','--reporter=verbose','--project','app:browser',file],{stdio:'inherit',env:{...process.env,VITE_VARIANT:name}});
if(result.error)console.error(result.error);
if(result.status!==0)process.exitCode=1;
}
`.trim().replaceAll('\n','')
manifest.scripts['test:app'] = 'vitest run --config vite.config.ts --no-cache --reporter=dot --project app:core --project app:browser --exclude tests/app/browser/integration.test.ts && npm run test:variants'
manifest.scripts['test:variants'] = 'node -e "' + program + '"'
writeFileSync('package.json', JSON.stringify(manifest, null, '\t') + '\n')
