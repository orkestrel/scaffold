import { extractRangeMajor, isDependencyName } from '../../dist/src/core/index.js'
import { Upstream } from '../../dist/src/server/index.js'

if (process.argv.length !== 4) {
	throw new Error('Usage: read-supported-toolchain.mjs <dependency> <range>')
}

const name = process.argv[2]
const range = process.argv[3]
if (name === undefined || !isDependencyName(name)) throw new Error('Dependency name is invalid')
if (range === undefined) throw new Error('Dependency range is absent')
const major = extractRangeMajor(range)
if (major === undefined) throw new Error('Dependency range has no supported major')

const upstream = new Upstream()
try {
	const releases = await upstream.lookup([{ name, range: `^${String(major)}` }])
	const release = releases[0]
	if (release === undefined) throw new Error('Upstream returned no release observation')
	console.error(JSON.stringify(release))
	if (release.lookup !== 'found') throw new Error(`Upstream lookup ${release.lookup}: ${release.note}`)
	if (extractRangeMajor(release.latest) !== major) {
		throw new Error('Upstream selected a release outside the supported major')
	}
	console.log(release.latest)
} finally {
	upstream.destroy()
}
