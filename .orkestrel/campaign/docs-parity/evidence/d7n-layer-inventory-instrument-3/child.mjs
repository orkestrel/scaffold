const operation = process.argv[2]

if (operation === 'flood') {
	process.stdout.write('x'.repeat(4_096))
} else if (operation === 'wait') {
	process.stdout.write('started')
	await new Promise((resolveDelay) => setTimeout(resolveDelay, 60_000))
} else {
	process.stderr.write(`unknown operation: ${operation ?? 'absent'}`)
	process.exitCode = 1
}
