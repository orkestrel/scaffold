// Drives a real spawn fault and a real non-zero exit through the exact rendering the four throw
// sites now use, so the message a failure carries is read rather than assumed. The bare `.cmd`
// spawn is this host's spawn fault: it returns a null status with empty streams, which is the
// case the message has to name. The negative control is the rendering unit D2 shipped, printed
// above each corrected line: a run whose two lines carry the same diagnostics has measured nothing.
import { spawnSync } from 'node:child_process'

const cases = [
	['spawn fault, a bare .cmd with no shell', spawnSync('npm.cmd', ['--version'], { encoding: 'utf8', windowsHide: true })],
	['non-zero exit, a real child', spawnSync(process.execPath, ['-e', 'process.exit(7)'], { encoding: 'utf8', windowsHide: true })],
]
for (const [label, result] of cases) {
	const streams = `${result.stdout}[LF]${result.stderr}`
	console.log(`--- ${label}`)
	console.log(`  shipped   : The pack into PACKED failed: ${streams}`)
	console.log(
		`  corrected : The pack into PACKED failed with status ${String(result.status)} and spawn error ${String(result.error)}: ${streams}`,
	)
}
