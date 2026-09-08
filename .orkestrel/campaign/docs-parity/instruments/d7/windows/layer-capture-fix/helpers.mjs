import { createHash } from 'node:crypto'

export function digestBytes(bytes) {
	return createHash('sha256').update(bytes).digest('hex')
}
