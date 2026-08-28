const [oldMod, newMod] = await Promise.all([
	import('./baseline/dist-head/src/server/index.js'),
	import('../dist/src/server/index.js'),
])

// The auditor's vector: four ASCII bytes then a stray continuation byte, captured at limit 4.
const script = 'process.stdout.write(Buffer.from([0x61,0x61,0x61,0x61,0x80]))'
const cmd = { file: process.execPath, arguments: ['-e', script] }

for (const [label, mod] of [['published 0.0.8', oldMod], ['landed change', newMod]]) {
	const r = await mod.execute(cmd, { limit: 4, strict: false })
	console.log(`${label.padEnd(16)} stdout=${JSON.stringify(r.stdout)} bytes=${Buffer.byteLength(r.stdout,'utf8')} truncated=${r.truncated}`)
}

// Control: the intended repair vector must still differ in the intended direction.
const euro = 'process.stdout.write(Buffer.from("aa\\u20ac","utf8"))'
for (const [label, mod] of [['published 0.0.8', oldMod], ['landed change', newMod]]) {
	const r = await mod.execute({ file: process.execPath, arguments: ['-e', euro] }, { limit: 3, strict: false })
	console.log(`${label.padEnd(16)} euro stdout=${JSON.stringify(r.stdout)}`)
}

// And the executeSync half both lanes flagged.
for (const [label, mod] of [['published 0.0.8', oldMod], ['landed change', newMod]]) {
	const r = mod.executeSync({ file: process.execPath, arguments: ['-e', euro] }, { limit: 3, strict: false })
	console.log(`${label.padEnd(16)} euro executeSync stdout=${JSON.stringify(r.stdout)}`)
}
