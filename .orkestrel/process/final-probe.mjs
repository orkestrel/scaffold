const [old, cur] = await Promise.all([
	import('./baseline/dist-head/src/server/index.js'),
	import('../dist/src/server/index.js'),
])
const run = (m, bytes, limit) =>
	m.execute({ file: process.execPath, arguments: ['-e', `process.stdout.write(Buffer.from([${bytes}]))`] }, { limit, strict: false })

const cases = [
	['stray continuation after valid bytes', '0x61,0x61,0x61,0x61,0x80', 4],
	['split euro sequence', '0x61,0x61,0xe2,0x82,0xac', 3],
	['all continuation bytes', '0x80,0x80,0x80,0x80,0x80', 3],
	['clean boundary', '0x61,0x61,0xe2,0x82,0xac', 2],
	['whole sequence fits', '0x61,0x61,0xe2,0x82,0xac', 5],
	['limit zero', '0x61,0x61', 0],
]
console.log('case'.padEnd(38), 'published 0.0.8'.padEnd(18), 'landed')
for (const [name, bytes, limit] of cases) {
	const a = await run(old, bytes, limit)
	const b = await run(cur, bytes, limit)
	const f = (r) => `${JSON.stringify(r.stdout)}(${Buffer.byteLength(r.stdout,'utf8')}B)`
	const mark = a.stdout === b.stdout ? 'same' : 'DIFFERS'
	console.log(name.padEnd(38), f(a).padEnd(18), f(b).padEnd(16), mark)
}
