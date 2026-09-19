import { isAbsolute, relative, resolve, sep } from 'node:path'

export function matchesCachePath(expected: string, actual: string): boolean {
	const requested = resolve(expected)
	const resolved = resolve(actual)
	const difference = relative(requested, resolved)
	return (
		difference.length === 0 ||
		(!isAbsolute(difference) && difference !== '..' && !difference.startsWith(`..${sep}`))
	)
}
