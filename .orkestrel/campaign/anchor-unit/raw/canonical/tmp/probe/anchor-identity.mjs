import { lstatSync, mkdirSync, mkdtempSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { isAbsolute, join, relative, resolve, sep } from 'node:path'
import { performance } from 'node:perf_hooks'
import { matchesAnchor, readAnchor } from 'file:///C:/Users/mikes/WebstormProjects/scaffold/tmp/release/scaffold-0.0.75/dist/src/server/index.js'

const canonical = 'C:\\Users\\mikes\\WebstormProjects\\scaffold'
const probe = join(canonical, 'tmp', 'probe')
const report = join(probe, 'anchor-identity-result.json')
const limit = 2_000
const budget = 45_000
const samples = 3

function captureMetadata(path) {
	return {
		lstat: captureStat(lstatSync(path)),
		stat: captureStat(statSync(path)),
		bigint: {
			lstat: captureBigintStat(lstatSync(path, { bigint: true })),
			stat: captureBigintStat(statSync(path, { bigint: true })),
		},
	}
}

function captureStat(stat) {
	return {
		device: stat.dev,
		inode: stat.ino,
		birthtimeMs: stat.birthtimeMs,
	}
}

function captureBigintStat(stat) {
	return {
		device: stat.dev.toString(),
		inode: stat.ino.toString(),
		birthtimeMs: stat.birthtimeMs.toString(),
	}
}

function isUnsafe(metadata) {
	return (
		!Number.isSafeInteger(metadata.lstat.device) ||
		!Number.isSafeInteger(metadata.lstat.inode) ||
		!Number.isSafeInteger(metadata.stat.device) ||
		!Number.isSafeInteger(metadata.stat.inode)
	)
}

function matchesBigint(original, replacement) {
	return (
		original.bigint.lstat.device === replacement.bigint.lstat.device &&
		original.bigint.lstat.inode === replacement.bigint.lstat.inode
	)
}

function isOwnedRoot(path) {
	const root = resolve(probe)
	const target = resolve(path)
	const difference = relative(root, target)
	return difference !== '' && difference !== '..' && !difference.startsWith(`..${sep}`) && !isAbsolute(difference)
}

function createPair(root, iteration) {
	const original = join(root, `original-${iteration}`)
	const replacement = join(root, `replacement-${iteration}`)
	const retired = join(root, `retired-${iteration}`)
	mkdirSync(original)
	mkdirSync(replacement)
	return { original, replacement, retired }
}

function collectControls(root) {
	const untouched = join(root, 'untouched')
	const missing = join(root, 'missing')
	mkdirSync(untouched)
	const anchor = readAnchor(untouched)
	if (anchor === undefined) {
		throw new Error('The built readAnchor function did not capture the untouched directory.')
	}

	return {
		positive: matchesAnchor(anchor),
		negative: matchesAnchor({ ...anchor, path: missing }),
	}
}

function measureCollision(iteration, original, replacement, retired, originalAnchor, originalMetadata, replacementAnchor, replacementMetadata) {
	renameSync(original, retired)
	renameSync(replacement, original)
	const after = captureMetadata(original)
	const afterAnchor = readAnchor(original)
	if (afterAnchor === undefined) {
		throw new Error('The built readAnchor function did not capture the renamed replacement directory.')
	}

	const matched = matchesAnchor(originalAnchor)
	return {
		iteration,
		original: {
			anchor: originalAnchor,
			metadata: originalMetadata,
		},
		replacement: {
			anchor: replacementAnchor,
			metadata: replacementMetadata,
		},
		afterAnchor,
		after,
		matched,
		bigint: matchesBigint(originalMetadata, after),
		missed: matched && !matchesBigint(originalMetadata, after),
	}
}

function measure(root) {
	const started = performance.now()
	const controls = collectControls(root)
	const unsafe = []
	let unsafeCount = 0
	let collision
	let loops = 0

	while (loops < limit && performance.now() - started < budget && collision === undefined) {
		const pair = createPair(root, loops)
		const originalAnchor = readAnchor(pair.original)
		const replacementAnchor = readAnchor(pair.replacement)
		if (originalAnchor === undefined || replacementAnchor === undefined) {
			throw new Error('The built readAnchor function did not capture a live sibling directory.')
		}

		const originalMetadata = captureMetadata(pair.original)
		const replacementMetadata = captureMetadata(pair.replacement)
		if (isUnsafe(originalMetadata) || isUnsafe(replacementMetadata)) {
			unsafeCount += 1
			if (unsafe.length < samples) {
				unsafe.push({ iteration: loops, original: originalMetadata, replacement: replacementMetadata })
			}
		}

		if (originalAnchor.device === replacementAnchor.device && originalAnchor.inode === replacementAnchor.inode) {
			collision = measureCollision(
				loops,
				pair.original,
				pair.replacement,
				pair.retired,
				originalAnchor,
				originalMetadata,
				replacementAnchor,
				replacementMetadata,
			)
		}

		loops += 1
	}

	return {
		platform: process.platform,
		version: process.version,
		elapsed: performance.now() - started,
		loops,
		controls,
		unsafeCount,
		unsafe,
		collision,
		limitation: collision === undefined ? 'No equal built device/inode pair occurred within the bounded sibling allocations.' : undefined,
	}
}

let root
try {
	root = mkdtempSync(join(probe, 'anchor-identity-'))
	if (!isOwnedRoot(root)) {
		throw new Error(`The temporary root is outside the owned probe directory: ${root}`)
	}

	const result = measure(root)
	const text = JSON.stringify(result, undefined, 2)
	writeFileSync(report, text, 'utf8')
	console.log(text)
}
catch (error) {
	console.error(error)
	process.exitCode = 1
}
finally {
	if (root !== undefined) {
		if (!isOwnedRoot(root)) {
			throw new Error(`Refusing to remove a temporary root outside the owned probe directory: ${root}`)
		}

		rmSync(root, { recursive: true, force: false })
	}
}
