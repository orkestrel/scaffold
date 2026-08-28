const m = await import('../dist/src/server/index.js')
const script = 'process.stdout.write(Buffer.from("aa\\u20acbb\\u20ac","utf8"))' // 61 61 e2 82 ac 62 62 e2 82 ac
console.log('payload bytes:', [...Buffer.from('aa€bb€','utf8')].map(b=>b.toString(16)).join(' '))
for (let limit = 1; limit <= 11; limit += 1) {
	const r = m.executeSync({ file: process.execPath, arguments: ['-e', script] }, { limit, strict: false })
	const a = await m.execute({ file: process.execPath, arguments: ['-e', script] }, { limit, strict: false })
	console.log(
		`limit ${String(limit).padStart(2)} | sync=${JSON.stringify(r.stdout).padEnd(14)} split=${String(r.stdout.includes('�')).padEnd(5)} trunc=${String(r.truncated).padEnd(5)}` +
		` | async=${JSON.stringify(a.stdout).padEnd(10)} split=${a.stdout.includes('�')}`,
	)
}
