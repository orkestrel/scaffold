import { readFileSync, writeFileSync } from 'node:fs'

const path = 'guides/pool.md'
const text = readFileSync(path, 'utf8')
const lines = text.split('\n')
const start = lines.indexOf('### Types')
const end = lines.indexOf('## Methods')
if (start === -1 || end === -1) throw new Error('anchors not found')

const block = [
	'### Types',
	'',
	"A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\\|`.",
	'',
	'| API | Kind | Shape | Summary |',
	'| --- | --- | --- | --- |',
	"| `PoolCode` | type | `'invalid' \\| 'destroyed' \\| 'create' \\| 'cleanup'` | Names the machine-readable failure codes produced by `PoolError`. |",
	'| `PoolContext` | interface | `{ value?, failures? }` | Represents the structured context attached to a `PoolError`: the rejected input, or the distinct destroy-hook failures an aggregate cleanup collected. |',
	'| `PoolErrorOptions` | interface | `{ code, cause?, context? }` | Represents the construction options for `PoolError`: the stable code, an optional cause, and optional structured context. |',
	'| `PoolEventMap` | type | `{ create, acquire, release, destroy }` | Represents the observable resource lifecycle events emitted by a `PoolInterface`. |',
	'| `PoolToken` | interface | `{ value } plus release` | Represents a unique lease over one pool-owned resource record, exposing that record as a readonly `value` and returning it through an idempotent `release`. |',
	'| `PoolOptions` | interface | `{ on?, error?, create, destroy?, validate?, max? }` | Represents the resource lifecycle options for `Pool` and `createPool`: creation, destruction, validation, capacity, and observation. |',
	'| `PoolInterface` | interface | `{ emitter, size, idle, active } plus acquire, clear, destroy` | Represents a FIFO resource pool with optional bounded capacity and deterministic teardown, exposing its record counts and a typed lifecycle emitter. |',
	'',
	'`size` counts every owned record, including records being validated or destroyed. `idle`',
	'counts only immediately available records. `active` counts only leased records. An in-flight',
	'create reservation claims capacity but is not yet an owned record and therefore is not part',
	'of `size`.',
	'',
]
lines.splice(start, end - start, ...block)
writeFileSync(path, lines.join('\n'))
