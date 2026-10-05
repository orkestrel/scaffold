// Usage: node measure.ts --interval MS --tree PID --out FILE
// Exit: 0 after SIGTERM; 64 usage; 1 unreadable measurement or output.
// Self-contained instrument: the brief permits node: imports only.
import { spawnSync } from 'node:child_process'
import {
	appendFileSync,
	closeSync,
	openSync,
	readFileSync,
	readdirSync,
	writeFileSync,
} from 'node:fs'
import { join, relative, resolve } from 'node:path'

interface ProcessReading {
	readonly pid: number
	readonly parent: number
	readonly identity: string
	readonly started: number
	readonly ticks: number
	readonly rss: number
	readonly command: readonly string[]
}
interface GroupReading {
	readonly path: string
	readonly version: number
}
const USAGE = 'Usage: node measure.ts --interval MS --tree PID --out FILE'

function parsePairs(text: string): ReadonlyMap<string, number> {
	return new Map(
		text
			.trim()
			.split(/\r?\n/)
			.map((line) => {
				const [key = '', value = ''] = line.trim().split(/\s+/)
				return [key, Number(value)]
			}),
	)
}
function readRequired(values: ReadonlyMap<string, number>, key: string): number {
	const value = values.get(key)
	if (value === undefined || !Number.isFinite(value)) throw new Error(`Missing measurement: ${key}`)
	return value
}
function resolveGroup(): GroupReading {
	const memberships = readFileSync('/proc/self/cgroup', 'utf8').trim().split(/\r?\n/)
	const mounts = readFileSync('/proc/self/mountinfo', 'utf8').trim().split(/\r?\n/)
	for (const version of [1, 2]) {
		const member = memberships.find((line) =>
			version === 1 ? line.split(':')[1]?.split(',').includes('memory') : line.startsWith('0::'),
		)
		if (member === undefined) continue
		const location = member.split(':').slice(2).join(':')
		for (const mount of mounts) {
			const [left = '', right = ''] = mount.split(' - ')
			const fields = left.split(' ')
			const [system, , options = ''] = right.split(' ')
			if (
				version === 1
					? system !== 'cgroup' || !options.split(',').includes('memory')
					: system !== 'cgroup2'
			)
				continue
			const root = fields[3]?.replace(/\\040/g, ' ')
			const point = fields[4]?.replace(/\\040/g, ' ')
			if (root === undefined || point === undefined) continue
			const suffix = relative(root, location)
			if (suffix.startsWith('..')) continue
			return { path: resolve(point, suffix), version }
		}
	}
	throw new Error('No memory cgroup mount for this process')
}
function readProcesses(): ReadonlyMap<number, ProcessReading> {
	const readings = new Map<number, ProcessReading>()
	for (const entry of readdirSync('/proc')) {
		if (!/^\d+$/.test(entry)) continue
		try {
			const raw = readFileSync(`/proc/${entry}/stat`, 'utf8')
			const fields = raw.slice(raw.lastIndexOf(')') + 2).split(' ')
			const status = readFileSync(`/proc/${entry}/status`, 'utf8')
			const arguments_ = readFileSync(`/proc/${entry}/cmdline`, 'utf8').split('\0').filter(Boolean)
			const command =
				arguments_.length === 1 && arguments_[0]?.includes(' ')
					? arguments_[0].split(/ +/).filter(Boolean)
					: arguments_
			const pid = Number(entry)
			readings.set(pid, {
				pid,
				parent: Number(fields[1]),
				identity: `${pid}:${fields[19]}`,
				started: Number(fields[19]),
				ticks: Number(fields[11]) + Number(fields[12]),
				rss: Number(/VmRSS:\s+(\d+)/.exec(status)?.[1] ?? 0) * 1024,
				command,
			})
		} catch (error) {
			if (
				error instanceof Error &&
				'code' in error &&
				(error.code === 'ENOENT' || error.code === 'ESRCH')
			)
				continue
			throw error
		}
	}
	return readings
}
function belongsTo(
	pid: number,
	tree: number,
	readings: ReadonlyMap<number, ProcessReading>,
): boolean {
	const visited = new Set<number>()
	while (pid > 0 && !visited.has(pid)) {
		if (pid === tree) return true
		visited.add(pid)
		pid = readings.get(pid)?.parent ?? 0
	}
	return false
}
class Sampler {
	#interval: number
	#tree: number
	#out: string
	#group: GroupReading
	#frequency: number
	#previous = new Map<string, number>()
	#inside = new Set<string>()
	#last: number | undefined
	#uptime: number | undefined
	#initial: number | undefined
	#oom = 0
	#peak = 0
	#renderer = 0
	#renderers = new Set<number>()
	#first: number | undefined
	#roots = new Map<number, number>()
	#rates: number[] = []
	#cpu = 0
	#count = 0
	#timer: ReturnType<typeof setInterval> | undefined
	constructor(interval: number, tree: number, out: string) {
		this.#interval = interval
		this.#tree = tree
		this.#out = out
		this.#group = resolveGroup()
		writeFileSync(out, '', { flag: 'wx' })
		const descriptor = openSync(`${out}.clock.txt`, 'wx')
		const clock = spawnSync('getconf', ['CLK_TCK'], {
			shell: false,
			stdio: ['ignore', descriptor, descriptor],
		})
		closeSync(descriptor)
		this.#frequency = Number(readFileSync(`${out}.clock.txt`, 'utf8').trim())
		if (clock.error !== undefined || clock.status !== 0 || !(this.#frequency > 0))
			throw new Error('Cannot read CLK_TCK')
	}
	start(): void {
		this.#sample()
		process.on('SIGTERM', () => this.stop())
		process.on('SIGINT', () => this.stop())
		this.#timer = setInterval(() => {
			try {
				this.#sample()
			} catch (error) {
				this.#fail(error)
			}
		}, this.#interval)
		process.send?.({ event: 'ready' })
	}
	stop(): void {
		if (this.#timer !== undefined) clearInterval(this.#timer)
		try {
			this.#sample()
			appendFileSync(
				this.#out,
				JSON.stringify({
					event: 'summary',
					samples: this.#count,
					renderers: { first: this.#first, count: this.#renderers.size },
					group: this.#group,
					peaks: {
						anonymous: this.#peak,
						renderer: this.#renderer,
						browsers: Object.fromEntries(this.#roots),
					},
					oom: {
						before: this.#initial,
						after: this.#oom,
						delta: this.#oom - (this.#initial ?? this.#oom),
					},
					outside: {
						seconds: this.#cpu,
						band: {
							min: Math.min(...this.#rates),
							max: Math.max(...this.#rates),
							unit: 'CPU seconds per wall second',
						},
						visibility:
							'Processes visible through /proc; exited-between-samples processes are not observable',
					},
				}) + '\n',
			)
			process.disconnect?.()
		} catch (error) {
			this.#fail(error)
		}
	}
	#fail(error: unknown): void {
		if (this.#timer !== undefined) clearInterval(this.#timer)
		console.error(error)
		process.exitCode = 1
		if (process.connected) process.disconnect?.()
	}
	#sample(): void {
		const now = performance.now()
		const stat = parsePairs(readFileSync(join(this.#group.path, 'memory.stat'), 'utf8'))
		const anonymous =
			this.#group.version === 1
				? readRequired(stat, 'total_rss') + readRequired(stat, 'total_shmem')
				: readRequired(stat, 'anon') + readRequired(stat, 'shmem')
		let events: ReadonlyMap<string, number>
		try {
			events = parsePairs(
				readFileSync(
					join(
						this.#group.path,
						this.#group.version === 1 ? 'memory.oom_control' : 'memory.events',
					),
					'utf8',
				),
			)
		} catch {
			events = parsePairs(readFileSync(join(this.#group.path, 'memory.events'), 'utf8'))
		}
		if (!events.has('oom_kill'))
			events = parsePairs(readFileSync(join(this.#group.path, 'memory.events'), 'utf8'))
		this.#oom = readRequired(events, 'oom_kill')
		this.#initial ??= this.#oom
		const raw = readFileSync(
			join(this.#group.path, this.#group.version === 1 ? 'memory.limit_in_bytes' : 'memory.max'),
			'utf8',
		).trim()
		const limit = raw === 'max' ? 'max' : Number(raw)
		if (limit !== 'max' && !Number.isFinite(limit)) throw new Error('Unreadable cgroup limit')
		const readings = readProcesses()
		const uptime = Number(readFileSync('/proc/uptime', 'utf8').split(' ')[0]) * this.#frequency
		const renderers: { readonly pid: number; readonly root: number; readonly rss: number }[] = []
		let ticks = 0
		const previous = new Map<string, number>()
		for (const reading of readings.values()) {
			if (belongsTo(reading.pid, this.#tree, readings)) this.#inside.add(reading.identity)
			if (!this.#inside.has(reading.identity)) {
				const before = this.#previous.get(reading.identity)
				if (before !== undefined) ticks += Math.max(0, reading.ticks - before)
				else if (this.#uptime !== undefined && reading.started >= this.#uptime)
					ticks += reading.ticks
			}
			previous.set(reading.identity, reading.ticks)
			if (
				!reading.command.includes('--type=renderer') ||
				!/chrom(e|ium)/i.test(reading.command[0] ?? '')
			)
				continue
			let root = reading.pid
			let parent = reading.parent
			const visited = new Set<number>()
			while (!visited.has(parent)) {
				visited.add(parent)
				const ancestor = readings.get(parent)
				if (ancestor === undefined) break
				if (
					/chrom(e|ium)/i.test(ancestor.command[0] ?? '') &&
					!ancestor.command.some((argument) => argument.startsWith('--type='))
				) {
					root = ancestor.pid
					break
				}
				parent = ancestor.parent
			}
			renderers.push({ pid: reading.pid, root, rss: reading.rss })
			this.#renderers.add(reading.pid)
			this.#renderer = Math.max(this.#renderer, reading.rss)
		}
		this.#first ??= renderers.length
		const browsers: Record<string, number> = {}
		for (const renderer of renderers)
			browsers[renderer.root] = (browsers[renderer.root] ?? 0) + renderer.rss
		for (const [root, rss] of Object.entries(browsers))
			this.#roots.set(Number(root), Math.max(this.#roots.get(Number(root)) ?? 0, rss))
		const seconds = ticks / this.#frequency
		const rate = this.#last === undefined ? undefined : seconds / ((now - this.#last) / 1000)
		if (rate !== undefined) this.#rates.push(rate)
		this.#cpu += seconds
		this.#peak = Math.max(this.#peak, anonymous)
		this.#previous = previous
		this.#uptime = uptime
		this.#last = now
		this.#count++
		appendFileSync(
			this.#out,
			JSON.stringify({
				event: 'sample',
				timestamp: new Date().toISOString(),
				anonymous,
				limit,
				oom: this.#oom,
				renderers,
				browsers,
				outside: { seconds, rate },
			}) + '\n',
		)
	}
}
function main(): void {
	const arguments_ = process.argv.slice(2)
	const options = new Map<string, string>()
	for (let index = 0; index < arguments_.length; index += 2) {
		const flag = arguments_[index]
		const value = arguments_[index + 1]
		if (
			flag === undefined ||
			!['--interval', '--tree', '--out'].includes(flag) ||
			!value ||
			value.startsWith('--')
		) {
			console.error(
				`${USAGE}\n${flag ?? 'argument'}: expected --interval MS, --tree PID, or --out FILE`,
			)
			process.exitCode = 64
			return
		}
		if (!options.has(flag)) options.set(flag, value)
	}
	const interval = Number(options.get('--interval'))
	const tree = Number(options.get('--tree'))
	const out = options.get('--out')
	if (
		!Number.isSafeInteger(interval) ||
		interval < 1 ||
		interval > 2147483647 ||
		!Number.isSafeInteger(tree) ||
		tree < 1 ||
		out === undefined
	) {
		console.error(
			`${USAGE}\nExpected --interval MS (positive integer), --tree PID (positive integer), and --out FILE`,
		)
		process.exitCode = 64
		return
	}
	try {
		new Sampler(interval, tree, out).start()
	} catch (error) {
		console.error(error)
		process.exitCode = 1
	}
}
main()
