import { createHash } from 'node:crypto'
import { relative, resolve } from 'node:path'

export function digestBytes(bytes) {
	return createHash('sha256').update(bytes).digest('hex')
}

export function isInside(root, target) {
	const path = relative(resolve(root), resolve(target))
	return path === '' || (!path.startsWith('..') && !path.includes(':'))
}

export function stamp() {
	return new Date().toISOString()
}
