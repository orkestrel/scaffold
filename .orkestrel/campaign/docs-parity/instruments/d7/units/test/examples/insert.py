import io, sys, os

ROOT = '/home/user/fleet/test'

BLOCKS = {
	('src/core/validators.ts', 'isRecorderMapComplete'): """@example
```ts
import { createRecorder, isRecorderMapComplete } from '@orkestrel/test'

type ReadyEvents = { readonly ready: readonly [name: string, step: number] }

const value: unknown = { ready: createRecorder<readonly [name: string, step: number]>() }

isRecorderMapComplete<ReadyEvents, 'ready'>(value, ['ready']) // true
isRecorderMapComplete<ReadyEvents, 'ready'>({ ready: 1 }, ['ready']) // false
```""",
	('src/core/helpers.ts', 'checkBounds'): """@example
```ts
import { checkBounds } from '@orkestrel/test'

checkBounds('Wait', 1000, 10) // undefined

// Throws Error: Retry budget must be finite and non-negative
checkBounds('Retry', -1, 10)
```""",
	('src/core/helpers.ts', 'buildRetryExhausted'): """@example
```ts
import { buildRetryExhausted } from '@orkestrel/test'

const exhausted = buildRetryExhausted('registry answers', 30, 31, '"starting"', undefined)

exhausted.message
// 'Retry "registry answers" did not succeed within 30ms (waited 31ms) (last value: "starting")'
```""",
	('src/core/helpers.ts', 'dropRegistration'): """@example
```ts
import type { SignalRegistration } from '@orkestrel/test'
import { dropRegistration } from '@orkestrel/test'

const listener: EventListener = () => undefined
const installed: EventListenerObject = { handleEvent: () => undefined }
const cleanup = new AbortController()
const registrations: SignalRegistration[] = [[listener, installed, true, cleanup]]

dropRegistration(registrations, installed)?.[1] === installed // true
cleanup.signal.aborted // true
dropRegistration(registrations, installed) // undefined
```""",
	('src/core/helpers.ts', 'decodeJSONLines'): """@example
```ts
import { decodeJSONLines } from '@orkestrel/test'

decodeJSONLines('{"ready":true}\\n7\\n') // [{ ready: true }, 7]

// Throws Error: Invalid JSON on line 3
decodeJSONLines('{}\\n\\n{')
```""",
	('src/server/helpers.ts', 'requireContained'): """@example
```ts
import { requireContained } from '@orkestrel/test/server'

requireContained('/scratch', 'nested/file.txt') // '/scratch/nested/file.txt'

// Throws Error: Path outside scratch directory: ../escape.ts
requireContained('/scratch', '../escape.ts')
```""",
	('src/server/helpers.ts', 'readIdentity'): """@example
```ts
import { statSync } from 'node:fs'
import { readIdentity } from '@orkestrel/test/server'

const status = statSync('/scratch')

readIdentity(status) // { birth: status.birthtimeMs, device: status.dev, inode: status.ino }
```""",
	('src/server/helpers.ts', 'readErrorCode'): """@example
```ts
import { readFileSync } from 'node:fs'
import { captureError } from '@orkestrel/test'
import { readErrorCode } from '@orkestrel/test/server'

readErrorCode(captureError(() => readFileSync('/scratch/absent.txt', 'utf8'))) // 'ENOENT'
readErrorCode(new Error('refused')) // undefined
```""",
	('src/server/helpers.ts', 'matchesIdentity'): """@example
```ts
import { statSync } from 'node:fs'
import { matchesIdentity, readIdentity } from '@orkestrel/test/server'

const allocation = readIdentity(statSync('/scratch'))

matchesIdentity(readIdentity(statSync('/scratch')), allocation) // true
matchesIdentity({ birth: 3, device: 1, inode: 9 }, { birth: 3, device: 1, inode: 2 }) // false
```""",
	('src/server/helpers.ts', 'isExcluded'): """@example
```ts
import { isExcluded } from '@orkestrel/test/server'

isExcluded('src/index.ts', ['src']) // true
isExcluded('src-other/index.ts', ['src']) // false
```""",
	('src/server/helpers.ts', 'createLink'): """@example
```ts
import { readFileSync } from 'node:fs'
import { createLink } from '@orkestrel/test/server'

// `/scratch/source` is a directory holding `file.txt`.
createLink('/scratch/linked', '/scratch/source')

readFileSync('/scratch/linked/file.txt', 'utf8') // 'linked'
```""",
	('src/server/helpers.ts', 'removeTree'): """@example
```ts
import { existsSync } from 'node:fs'
import { removeTree } from '@orkestrel/test/server'

removeTree('/scratch/tree')

existsSync('/scratch/tree') // false
```""",
	('src/server/helpers.ts', 'isRunning'): """@example
```ts
import { isRunning } from '@orkestrel/test/server'

isRunning(process.pid) // true
isRunning(2 ** 31) // false
```""",
	('src/server/helpers.ts', 'waitForSocketClose'): """@example
```ts
import { connect, createServer } from 'node:net'
import { createLoopback, waitForSocketClose } from '@orkestrel/test/server'

const loopback = await createLoopback(createServer((socket) => socket.end()))
const client = connect(loopback.port, '127.0.0.1')

await waitForSocketClose(client, { budget: 1000 }) // undefined
client.destroyed // true

await loopback.destroy()
```""",
	('src/server/helpers.ts', 'supportsDirectoryLinks'): """@example
```ts
import { supportsDirectoryLinks } from '@orkestrel/test/server'

supportsDirectoryLinks() // true where the host creates a symbolic link or a junction
```""",
	('src/server/helpers.ts', 'supportsMode'): """@example
```ts
import { supportsMode } from '@orkestrel/test/server'

supportsMode() // true on a POSIX host, false on Windows
```""",
	('src/server/helpers.ts', 'supportsCase'): """@example
```ts
import { supportsCase } from '@orkestrel/test/server'

supportsCase() // true on a case-sensitive volume, false on a case-folding one
```""",
	('src/server/helpers.ts', 'supportsBytes'): """@example
```ts
import { supportsBytes } from '@orkestrel/test/server'

supportsBytes() // true on a POSIX host, false on Windows
```""",
}


def render(block):
	lines = [' *']
	for line in block.split('\n'):
		lines.append(' * ' + line if line else ' *')
	return lines


by_file = {}
for (path, name), block in BLOCKS.items():
	by_file.setdefault(path, []).append((name, block))

for path, entries in by_file.items():
	full = os.path.join(ROOT, path)
	with io.open(full, encoding='utf-8', newline='') as handle:
		text = handle.read()
	lines = text.split('\n')
	for name, block in entries:
		heads = [
			i
			for i, line in enumerate(lines)
			if line.startswith('export function ' + name + '(')
			or line.startswith('export async function ' + name + '(')
			or line.startswith('export function ' + name + '<')
		]
		if len(heads) != 1:
			raise SystemExit('anchor miss for ' + name + ': ' + repr(heads))
		head = heads[0]
		close = head - 1
		if lines[close] != ' */':
			raise SystemExit('no doc close before ' + name + ': ' + repr(lines[close]))
		start = close
		while lines[start] != '/**':
			start -= 1
			if start < 0:
				raise SystemExit('no doc open before ' + name)
		if any(line.strip() == '* @example' for line in lines[start:close]):
			print('already exampled, skipped: ' + name)
			continue
		lines[close:close] = render(block)
	with io.open(full, 'w', encoding='utf-8', newline='') as handle:
		handle.write('\n'.join(lines))
	print('wrote ' + path)
