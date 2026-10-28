# Bindings census

Run this census before a sweep under `.claude/rules/typescript.md` § Bindings, and before a review
rules that code conforms to that section or to `.claude/rules/architecture.md` § Middleware. Read
each item's heading as the keys of the rule sentences it covers and the rule bullet that holds them.
Find candidates with the item's signatures, and rule each candidate by the item's reading.

## Scope

- **Population.** Apply every item to the TypeScript and Vue sources of the scanned checkout:
  `src/`, `app/`, `tests/`, `configs/`, `studies/`, the skill scripts the checkout carries,
  `vite.config.ts`, and the code a template literal emits. Skip `node_modules/`, `dist/`, `tmp/`,
  and ambient `.d.ts` files. In a scaffold consumer, also skip every file scaffold vendors: the
  vendored test set and the configuration leaves.
- **Tool.** Run each signature with ripgrep's default engine, `rg -n`, and add `-U` where the item
  says a pattern spans lines.
- **Ruling.** Treat a signature hit as a candidate, and rule it by reading its source. A text search
  reports on text (`.claude/rules/quality.md` § Instruments).
- **Report.** Record each ruled candidate as `path:line`, the item's key, and the ruling.

## Run the controls

Run an item's controls before trusting its clean result:

1. Write each fixture of the item to a scratch file under `tmp/probes/census/`, named as the
   fixture's label gives.
2. Run the item's signatures over the scratch files, and record the hit lines of each file.
3. Require every hit fixture to yield a candidate the reading keeps, and every clear fixture to yield
   no candidate or only candidates the reading drops.
4. Delete `tmp/probes/census/`.

When a hit fixture yields no kept candidate, or a clear fixture yields a kept one, repair the
signatures or the reading before you run the item over the checkout.

## Keys outside the census

- Run no item for the **Variables** bullet; the lint rules it names decide it.
- Run no item for these keys: `derivation.expression`, `iteration.counter`, `try.helper`, `try.log`, `running.definition`, `lists.derived`, `logs.loop`,
  `logs.scan`, `exemptions.reach`, `percall.entity`, `percall.lifetime`, `percall.relative`,
  `entity.home`, `entity.pointers`, `slots.route`, `slots.exclusions`, `resets.home`, `bound.read`,
  `bound.several`, `bound.selection`, `bound.latch`, `registry.clear`, `registry.scope`,
  `immutability.registry`, and `immutability.helper`.
- Read `logs.forms` through `logs.final`, `logs.last`, and `percall.concurrent`, which it widens to
  logs a `reduce` call returns. Read `bound.unit` through `bound.field`. Read `running.position`
  through `running.cell`, `bound.field`, and `registry.reads`.

## `running.carriers` (**Running values**)

- **Signatures.**
  - Mutating calls: `\b[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\]]+\])*\.(?:push|unshift|splice|set|add|delete|clear|fill|sort|reverse|copyWithin)\(`.
  - Property and index writes: `\b[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\]]+\])+\s*(?:[-+*/%&|^]|\?\?|\|\||&&)?=[^=>]`.
  - Property updates: `\b[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\]]+\])+\s*(?:\+\+|--)`.
- Route a recorder to `logs.reads`: a `createRecorder` result, or any object whose `handler`
  appends to its `calls`. Its writes run through `handler`, which no signature here matches.
- **Reading.**
  - Resolve each hit's root identifier. Keep it when the root is a parameter, a `const`, or the
    accumulator, the first parameter, of a `reduce` or `reduceRight` callback.
  - Drop the roots `this`, `globalThis`, `process`, and host or DOM objects.
  - Rule a kept hit banned under **Running values** when the change carries a flag, a counter, a
    sum, a latest value, a one-slot cell, or appended text from one step or call to a later one, and
    the collection is neither a log under **Lists and logs** nor an item of **Exemptions**. Drop a
    helper's append to its owning operation's log, which **Immutability exceptions** admits.

Hit fixture, `running.carriers.hit.ts`:

```ts
async function readBody(
	reader: ReadableStreamDefaultReader<Uint8Array>,
	spent: number[],
	allowance: number,
): Promise<boolean> {
	for (;;) {
		const chunk = await reader.read()
		if (chunk.done) return true
		spent.push(chunk.value.byteLength)
		if (allowance - computeTotal(spent) < 0) {
			await reader.cancel()
			return false
		}
	}
}
```

Clear fixture, `running.carriers.clear.ts`:

```ts
interface Step {
	readonly step: string
	readonly exit: number | undefined
}

interface Runner {
	readonly dry: boolean
	readonly steps: Step[]
}

interface Edit {
	readonly start: number
	readonly text: string
}

function runStep(runner: Runner, step: string, execute: () => number): void {
	if (runner.dry) {
		runner.steps.push({ step, exit: undefined })
		return
	}
	runner.steps.push({ step, exit: execute() })
}

function describeRun(runner: Runner): string {
	return runner.steps.map(({ step, exit }) => `${step}: ${String(exit)}`).join('\n')
}

function collectEdits(tokens: readonly Token[]): readonly Edit[] {
	return tokens.reduce<readonly Edit[]>(
		(log, token) =>
			token.value === undefined ? log : [...log, { start: token.index, text: token.value }],
		[],
	)
}
```

## `running.cell` and `running.position` (**Running values**)

- **Signatures.** `\[0\]`, `\.at\(\s*-1\s*\)`, `\[\s*[\w.$]+\.length\s*-\s*1\s*\]`,
  `const\s*\[\s*[A-Za-z_$][\w$]*\s*\]\s*=\s*[A-Za-z_$][\w$.]*\s*$`,
  `const\s*\[\s*[A-Za-z_$][\w$]*\s*\]\s*=\s*[A-Za-z_$][\w$.]*\.(?:keys|values|entries)\(\)`, and
  `\.(?:values|keys|entries)\(\)\.next\(\)`.
- **Reading.** Keep a hit whose collection a variable, a parameter, or an accumulator holds, and that
  holds at most one entry at every read (**Running values**). The signs are a reset before each add
  (`length = 0`, `splice(0`, `clear()`), a cap, or a single write. Drop a read of a source list that
  nothing carries, and a `#` registry read, which `registry.reads` rules.

Hit fixture, `running.cell.hit.ts`:

```ts
function readLatest(
	readings: readonly Reading[],
	admit: (reading: Reading) => boolean,
): Reading | undefined {
	const latest: Reading[] = []
	for (const reading of readings) {
		if (admit(reading)) latest.splice(0, latest.length, reading)
	}
	return latest[0]
}
```

Clear fixture, `running.cell.clear.ts`:

```ts
function readLast(readings: readonly Reading[]): Reading | undefined {
	return readings.at(-1)
}
```

## `logs.final` (**Lists and logs**)

- **Signatures.**
  - Replacement: `\.with\(`, `\.toSpliced\(`, `\.slice\(\s*0\s*,\s*-1\s*\)`, `\.splice\(`, and
    `\[\s*[\w.$]+\.length\s*-\s*1\s*\]\s*=[^=]`.
  - Text growth: `\$\{\s*[\w.$]+\.text\s*\}` and `\.text\s*\+`.
- **Reading.** Keep a hit whose list is a log, meaning each step appends its own result, whether the
  loop pushes it or a `reduce` returns it, and whose step replaces, rewrites, or removes a record, or
  builds a record's text from an earlier record's text (**Lists and logs**). Drop a fold's working
  stack or frontier, which its steps pop.

Hit fixture, `logs.final.hit.ts`:

```ts
interface Row {
	readonly line: number
	readonly text: string
}

function stepRows(rows: readonly Row[], text: string, line: number): readonly Row[] {
	const content = text.trim()
	const last = rows.at(-1)
	if (content.startsWith('- ') && last !== undefined) {
		return rows.with(-1, { ...last, text: `${last.text} ${content}`.trimEnd() })
	}
	return [...rows, { line, text: content }]
}

function readRows(lines: readonly string[]): readonly Row[] {
	return lines.reduce<readonly Row[]>((rows, text, index) => stepRows(rows, text, index + 1), [])
}
```

Clear fixture, `logs.final.clear.ts`:

```ts
interface Edit {
	readonly start: number
	readonly text: string
}

interface Frame {
	readonly indent: number
	readonly key: string
}

function collectEdits(tokens: readonly Token[]): readonly Edit[] {
	return tokens.reduce<readonly Edit[]>((log, token) => {
		if (log.at(-1)?.start === token.index) return log
		return [...log, { start: token.index, text: token.text }]
	}, [])
}

function stepStack(stack: readonly Frame[], indent: number, key: string): readonly Frame[] {
	const open = stack.filter((frame) => frame.indent < indent)
	return [...open, { indent, key }]
}
```

## `derivation.text` (**Derivation**)

- **Signatures**, each with `-U`:
  - ``\.reduce(?:<[^>]*>)?\(\s*\(\s*[A-Za-z_$][\w$]*\s*,[^)]*\)\s*=>\s*(?:[A-Za-z_$][\w$]*\s*\+|`\$\{)``;
  - `\.reduce(?:<[^>]*>)?\([\s\S]{0,400}?,\s*(?:''|"")\s*\)`;
  - `\.reduce<\s*string\b`, a fold typed to carry text;
  - `\.reduce(?:<[^>]*>)?\(\s*\(\s*[A-Za-z_$][\w$]*\s*,[^)]*\)\s*=>[\s\S]{0,400}?\b[A-Za-z_$][\w$]*\.text\s*\+`,
    a fold whose record carries text.
- **Reading.** Keep a fold whose step returns its carried text with a part appended (**Derivation**):
  `text + part`, a template that opens with the carried text, a helper that appends to it such as
  `joinThinking(joined, part)`, or a returned record whose text field extends the carried one. Drop a
  fold whose step replaces a range of a fixed source text.

Hit fixture, `derivation.text.hit.ts`:

```ts
function foldBlock(lines: readonly string[]): string {
	return lines.reduce(
		(running, line) =>
			line === ''
				? { text: running.text, blanks: running.blanks + 1 }
				: {
						text:
							running.text +
							(running.text === ''
								? ''
								: running.blanks === 0
									? ' '
									: '\n'.repeat(running.blanks)) +
							line,
						blanks: 0,
					},
		{ text: '', blanks: 0 },
	).text
}

function renderLines(lines: readonly string[]): string {
	return lines.reduce((text, line) => `${text}${line}\n`, '')
}

function joinPasses(passes: readonly Pass[]): string | undefined {
	return passes.reduce<string | undefined>(
		(joined, pass) => (pass.thinking === undefined ? joined : joinThinking(joined, pass.thinking)),
		undefined,
	)
}
```

Clear fixture, `derivation.text.clear.ts`:

```ts
function applyEdits(source: string, edits: readonly Edit[]): string {
	return [...edits]
		.sort((left, right) => right.start - left.start)
		.reduce((text, edit) => text.slice(0, edit.start) + edit.text + text.slice(edit.end), source)
}
```

## `logs.last` and `logs.reads` (**Lists and logs**)

This item also rules the step-keyed maps `exemptions.memo` routes here.

- **Signatures.**
  - Last-entry and length reads: `\.get\(\s*this\.#retries\s*\)`, `\.get\([^)]*length\s*-\s*1\s*\)`,
    `\.at\(\s*-1\s*\)`, `\[\s*[\w.$]+\.length\s*-\s*1\s*\]`, `\.length\s*(?:[<>]=?|===?|!==?)\s*\d`,
    and `toHaveLength\(`.
  - Log, map, and recorder declarations:
    `const\s+[A-Za-z_$][\w$]*\s*(?::[^=]+)?=\s*(?:\[\]|new Map\b|createRecorder\b)`. For each, list
    the name's reads, following it through its aliases, the calls it is passed to, and the callers it
    is returned to.
  - Recorder reads: `\.count\b`, `\.calls\.length\b`, `\.calls\s*\)\s*\.toHaveLength\(`,
    `\.calls\.at\(\s*-1\s*\)`, and `\.calls\[\s*[\w.$]+\.(?:length|count)\s*-\s*1\s*\]`. Resolve each
    hit's root to its declaration, which can be a `createRecorder` call, a setup-module factory, or a
    class whose `calls` the `handler` appends to.
- **Reading.**
  - Keep a log, or a `Map` keyed by loop index or attempt, whose every read along those paths is its
    last entry, its length, or `get` of its last key (**Lists and logs**). Count passing or returning
    the log as no read. Drop a log that some read consumes whole (a spread, `map`, `filter`, `some`,
    `join`, iteration, or a whole-list comparison), even when a step also looks back at its last
    record.
  - Treat a recorder's `calls` as its log and its `count` as that log's length, and follow it through
    aliases, the calls it is passed to, and the callers it is returned to. Keep a recorder whose every
    read is its `count`, its `calls` length, `toHaveLength` on its `calls`, or its last call. Drop a
    recorder that some read consumes whole, such as a whole-history comparison of its `calls`, a `map`
    or iteration over them, or a spread. Drop a `count` that belongs to an entity tally rather than a
    recorder.

Hit fixture, `logs.last.hit.ts`:

```ts
class Reader {
	readonly #retries: number

	constructor(retries: number) {
		this.#retries = retries
	}

	async read(url: string): Promise<string> {
		const notes = new Map<number, string>()
		for (const round of Array.from({ length: this.#retries + 1 }).keys()) {
			const outcome = await fetchText(url)
			if (outcome.ok) return outcome.content
			notes.set(round, outcome.note)
		}
		throw new Error(`The read at ${url} produced no answer: ${notes.get(this.#retries) ?? ''}`)
	}
}

function createJudge(asked: string[], answer: (count: number) => Promise<Verdict>): Judge {
	return {
		ask: (request) => {
			asked.push(...Object.keys(request.questions))
			return answer(asked.length)
		},
	}
}

it('asks the following question after the judge aborts', async () => {
	const asked: string[] = []
	await classify(createJudge(asked, () => Promise.reject(new Error('The judge aborted'))))
	expect(asked).toHaveLength(2)
})
```

Clear fixture, `logs.last.clear.ts`:

```ts
function collectEdits(tokens: readonly Token[]): readonly Edit[] {
	return tokens.reduce<readonly Edit[]>((log, token) => {
		if (log.at(-1)?.start === token.index) return log
		return [...log, { name: token.name, start: token.index }]
	}, [])
}

function declares(tokens: readonly Token[], name: string): boolean {
	return collectEdits(tokens).some((edit) => edit.name === name)
}

function establish(missing: readonly string[], located: Anchor): Established {
	const created: Anchor[] = []
	for (const segment of [...missing].reverse()) {
		const anchor = created.at(-1) ?? located
		if (!matchesAnchor(anchor)) {
			throw new Error(`The directory at ${anchor.path} changed while writing.`)
		}
		mkdirSync(segment)
		created.push(readAnchor(segment))
	}
	return { anchor: created.at(-1) ?? located, created }
}

it('establishes a nested directory segment by segment', () => {
	const result = establish(['/workspace/project/.claude', '/workspace/project'], ROOT_ANCHOR)
	expect(result.created.map((anchor) => anchor.path)).toEqual([
		'/workspace/project',
		'/workspace/project/.claude',
	])
})
```

Hit fixture, `logs.reads.hit.ts`:

```ts
it('emits a change for each write', () => {
	const seen = createRecorder<[string]>()
	const emitter = createEmitter()
	emitter.on('change', seen.handler)
	emitter.emit('change', 'first')
	emitter.emit('change', 'second')
	expect(seen.count).toBe(2)
})

function expectOneSave(store: DraftStore): void {
	const saved = createRecorder<[string]>()
	store.on('save', saved.handler)
	store.save('draft')
	expect(saved.calls).toHaveLength(1)
}

it('saves a draft once', () => {
	expectOneSave(createDraftStore())
})
```

Clear fixture, `logs.reads.clear.ts`:

```ts
it('emits each write in order', () => {
	const seen = createRecorder<[string]>()
	const emitter = createEmitter()
	emitter.on('change', seen.handler)
	emitter.emit('change', 'first')
	emitter.emit('change', 'second')
	expect(seen.count).toBe(2)
	expect(seen.calls).toStrictEqual([['first'], ['second']])
})
```

## `percall.concurrent` and `logs.writers` (**Per-call state**, **Lists and logs**)

- **Signatures.**
  - Promise combinators: `Promise\.(?:all|allSettled|any|race)\(`. Inside the `async` callbacks
    passed to one, look for `\.(?:push|unshift|set|add)\(` on a name the callback does not declare.
  - Worker pools: `Array\.from\(\s*\{\s*length:`, with each collection parameter traced from the
    pool's caller into the workers.
  - Several event sources: `\.on\(\s*['"](?:data|message|chunk|error)['"]`, where more than one
    source pushes into one list.
- **Reading.** Keep a list that more than one concurrently pending async path of one call appends
  to, or that the callbacks of more than one event source append to (**Per-call state**,
  **Lists and logs**). Drop a list one loop owns, one worker's own log, and the callbacks of one
  event source in emission order.

Hit fixture, `percall.concurrent.hit.ts`:

```ts
class Upstream {
	readonly #concurrency: number

	constructor(concurrency: number) {
		this.#concurrency = concurrency
	}

	async lookup(names: readonly string[]): Promise<readonly Release[]> {
		const spent: number[] = []
		return this.#gather(names, (name) => this.#release(name, spent))
	}

	async #release(name: string, spent: number[]): Promise<Release> {
		const body = await fetchBytes(name)
		spent.push(body.byteLength)
		return { name, bytes: body.byteLength }
	}

	async #gather<T, R>(items: readonly T[], run: (item: T) => Promise<R>): Promise<readonly R[]> {
		const entries = items.entries()
		const workers = Array.from({ length: Math.min(this.#concurrency, items.length) }, () =>
			this.#drain(entries, run),
		)
		const settled = await Promise.allSettled(workers)
		return settled.flatMap((worker) => (worker.status === 'fulfilled' ? worker.value : []))
	}

	async #drain<T, R>(
		entries: IterableIterator<[number, T]>,
		run: (item: T) => Promise<R>,
	): Promise<readonly R[]> {
		const produced: R[] = []
		for (const [, item] of entries) produced.push(await run(item))
		return produced
	}
}
```

Clear fixture, `percall.concurrent.clear.ts`:

```ts
class Upstream {
	readonly #concurrency: number
	readonly #retries: number

	constructor(concurrency: number, retries: number) {
		this.#concurrency = concurrency
		this.#retries = retries
	}

	async lookup(names: readonly string[]): Promise<readonly Release[]> {
		return this.#gather(names, (name) => this.#release(name))
	}

	async #release(name: string): Promise<Release> {
		for (const round of Array.from({ length: this.#retries + 1 }).keys()) {
			const outcome = await fetchBytes(name, round)
			if (outcome.ok) return { name, bytes: outcome.body.byteLength }
		}
		return { name, bytes: 0 }
	}

	async #gather<T, R>(items: readonly T[], run: (item: T) => Promise<R>): Promise<readonly R[]> {
		const entries = items.entries()
		const workers = Array.from({ length: Math.min(this.#concurrency, items.length) }, () =>
			this.#drain(entries, run),
		)
		const settled = await Promise.allSettled(workers)
		return settled.flatMap((worker) => (worker.status === 'fulfilled' ? worker.value : []))
	}

	async #drain<T, R>(
		entries: IterableIterator<[number, T]>,
		run: (item: T) => Promise<R>,
	): Promise<readonly R[]> {
		const produced: R[] = []
		for (const [, item] of entries) produced.push(await run(item))
		return produced
	}
}
```

## `exemptions.traversal`, `exemptions.step`, and `exemptions.cursor` (**Exemptions**)

- **Signatures.**
  `for\s*\(\s*const\s+(?:\[[^\]]*\]|[A-Za-z_$][\w$]*)\s+of\s+[A-Za-z_$][\w$]*(?:\.entries\(\)|\.keys\(\)|\.values\(\))?\s*\)`
  and `while\s*\(\s*[A-Za-z_$][\w$]*\.length\b`. Keep the loops whose body adds to the collection the
  loop iterates or tests, through `.push(`, `.unshift(`, `.set(`, or `.add(`.
- **Reading.** Count as one step a complete iteration that removes or visits an entry of the
  worklist, its nested loops included, and count the entries each control path through that step can
  add (**Exemptions**). Rule a cursor when no path adds more than one entry and none spreads a list
  (`push(...`). Drop a loop whose step can add several entries.

Hit fixture, `exemptions.traversal.hit.ts`:

```ts
function resolveRealPath(path: string): string | undefined {
	const trail = [resolve(path)]
	const pending: string[] = []
	for (const [depth, current] of trail.entries()) {
		if (depth > MAX_PATH_DEPTH) break
		const real = attempt(() => realpathSync(current))
		if (real.success) {
			return pending.reduce((physical, segment) => join(physical, segment), real.value)
		}
		const status = attempt(() => lstatSync(current))
		if (status.success) {
			if (!status.value.isSymbolicLink()) return undefined
			trail.push(resolve(dirname(current), readlinkSync(current)))
			continue
		}
		const parent = dirname(current)
		if (parent === current) return undefined
		pending.unshift(relative(parent, current))
		trail.push(parent)
	}
	return undefined
}

function renderCauseChain(error: unknown): string {
	const chain: unknown[] = error === undefined ? [] : [error]
	while (chain.length < 4) {
		const last = chain.at(-1)
		const cause = isError(last) ? last.cause : undefined
		if (cause === undefined) break
		chain.push(cause)
	}
	return chain
		.map((one) => (isError(one) ? `${one.name}: ${one.message}` : String(one)))
		.join(' <- ')
}
```

Clear fixture, `exemptions.traversal.clear.ts`:

```ts
function listFiles(root: string): readonly string[] {
	const pending = [{ full: root, path: '' }]
	const entries: Array<{ readonly path: string; readonly file: boolean }> = []
	while (pending.length > 0) {
		const current = pending.pop()
		if (current === undefined) break
		const handle = opendirSync(current.full)
		for (;;) {
			const entry = handle.readSync()
			if (entry === null) break
			const path = current.path === '' ? entry.name : `${current.path}/${entry.name}`
			const file = !entry.isDirectory() || entry.isSymbolicLink()
			entries.push({ path, file })
			if (!file) pending.push({ full: join(current.full, entry.name), path })
		}
		handle.closeSync()
	}
	return entries.filter(({ file }) => file).map(({ path }) => path)
}

function scanAmendments(
	amendments: ReadonlyMap<string, readonly string[]>,
	start: string,
	admit: (id: string) => boolean,
): readonly string[] {
	const queue = [start]
	const seen = new Set<string>()
	const admitted: string[] = []
	for (const id of queue) {
		if (seen.has(id)) continue
		seen.add(id)
		if (!admit(id)) continue
		admitted.push(id)
		queue.push(...(amendments.get(id) ?? []))
	}
	return admitted
}

function validateRuntime(instrument: string, roots: readonly string[]): void {
	const pending = [instrument]
	const visited = new Set<string>()
	while (pending.length > 0) {
		const root = pending.pop()
		if (root === undefined || visited.has(root)) continue
		visited.add(root)
		if (!roots.includes(root)) throw new Error(`Profile roots omit a runtime dependency: ${root}`)
		const manifest = join(root, 'package.json')
		const value: unknown = JSON.parse(readFileSync(manifest, 'utf8'))
		if (!isRecord(value) || !isRecord(value.dependencies)) continue
		const resolver = createRequire(manifest)
		for (const dependency of Object.keys(value.dependencies))
			pending.push(dirname(realpathSync(resolver.resolve(`${dependency}/package.json`))))
	}
}

function capturePackages(selections: ReadonlyMap<string, string>): readonly InstallPackage[] {
	const sources = new Map(selections)
	const packages: InstallPackage[] = []
	for (const [name, source] of sources) {
		const manifest = readManifest(source)
		packages.push(Object.freeze({ name, source }))
		const require = createRequire(join(source, 'package.json'))
		for (const dependency of Object.keys(manifest.dependencies ?? {}))
			if (!sources.has(dependency))
				sources.set(dependency, dirname(require.resolve(`${dependency}/package.json`)))
	}
	return Object.freeze(packages)
}
```

## `exemptions.memo` and `exemptions.position` (**Exemptions**)

- **Signatures.** Every `new Map\b` that a variable or a `#` field holds, and every parameter typed
  as a map, `[A-Za-z_$][\w$]*\??\s*:\s*Map<`. Then the map's `\.set\(` and `\.delete\(` sites, and
  `\.get\([^)]*\)\s*[!?]?\.(?:push|set|add|delete|splice|unshift)\(`.
- **Reading.** Keep a map treated as a memo that does any of these (**Exemptions**):
  - writes a key twice, through a `set` path that no `has` or `get` miss for that key dominates;
  - deletes a key;
  - changes a stored value;
  - caches no computation's result under its input or identity key for reuse within one owning
    operation, in which case **Lists and logs** rules it.

  Route a map keyed by loop step or attempt to `logs.last`. Drop a map that meets the memo item, and
  a map that **Lists and logs** or **Registries** governs.

Hit fixture, `exemptions.memo.hit.ts`:

```ts
function readLines(paths: readonly string[], cache: Map<string, string[]>): readonly string[] {
	return paths.flatMap((path) => {
		const cached = cache.get(path)
		if (cached !== undefined) return cached
		const lines = readFileSync(path, 'utf8').split('\n')
		cache.set(path, lines)
		return lines
	})
}

function appendLine(cache: Map<string, string[]>, path: string, line: string): void {
	cache.get(path)?.push(line)
}
```

Clear fixture, `exemptions.memo.clear.ts`:

```ts
function placeMember(
	input: ProjectionInput,
	id: string,
	seen: ReadonlySet<string>,
	settled?: Map<string, ReadonlySet<string>>,
): ReadonlySet<string> {
	const known = settled?.get(id)
	if (known !== undefined) return known
	const sides = (input.amending.get(id) ?? []).filter((side) => side !== id && !seen.has(side))
	const keys = new Set(
		sides.flatMap((side) => [...placeMember(input, side, new Set([...seen, id]), settled)]),
	)
	if (settled !== undefined && sides.every((side) => settled.has(side))) settled.set(id, keys)
	return keys
}

function listCollected(
	args: readonly string[],
	cache: Map<string, readonly Collected[]>,
): readonly Collected[] | undefined {
	const key = JSON.stringify(args)
	const cached = cache.get(key)
	if (cached !== undefined) return cached
	const collected = runListing(args)
	if (collected === undefined) return undefined
	cache.set(key, collected)
	return collected
}

function mapGateFiles(gates: ReadonlyMap<string, readonly string[]>): ReadonlyMap<string, string> {
	const files = new Map<string, string>()
	for (const [gate, command] of gates) {
		for (const argument of command) {
			if (/^tests\/[A-Za-z0-9_./-]+\.test\.ts$/u.test(argument) && !files.has(argument))
				files.set(argument, gate)
		}
	}
	return files
}
```

## `exemptions.branches` and `exemptions.platform` (**Exemptions**)

- **Signatures.** Per function body, list `\b[A-Za-z_$][\w$]*\.[A-Za-z_$][\w$]*\s*=[^=]`,
  `\b[A-Za-z_$][\w$]*\[['"][^'"]+['"]\]\s*=[^=]`, and `\.set\(\s*['"][^'"]+['"]`. Then group the
  hits by object and key.
- **Reading.** Keep a key that straight-line branches write twice, or that one fixture writes twice
  (**Exemptions**). Drop a write a platform API requires, such as a `Headers` method or a DOM
  property.

Hit fixture, `exemptions.branches.hit.ts`:

```ts
function buildOptions(strict: boolean, legacy: boolean): BuildOptions {
	const options: { mode?: string } = {}
	if (strict) options.mode = 'strict'
	if (legacy) options.mode = 'legacy'
	return options
}
```

Clear fixture, `exemptions.branches.clear.ts`:

```ts
function collectQuestions(target: string, writing: boolean): readonly Question[] {
	const questions: Question[] = []
	if (hasVueComponents(target)) {
		questions.push({
			field: 'extensions',
			message:
				'Move Vue components from app/browser to app/vue before regenerating this workspace.',
			blocking: writing,
		})
	}
	if (!writing) {
		const script = readScriptQuestion(target)
		if (script !== undefined) questions.push(script)
	}
	const project = readProjectQuestion(target, writing)
	if (project !== undefined) questions.push(project)
	return questions
}
```

## `percall.builtins` (**Per-call state**)

- **Signatures.** In an `async` function, or one that registers callbacks, find every local
  `const\s+[A-Za-z_$][\w$]*\s*(?::[^=]+)?=\s*(?:\{|\[|new (?:Map|Set)\b)`. Keep the ones whose name a
  `running.carriers` write signature hits inside a callback (`=>`) or after an `await`.
- **Reading.** Keep a plain array, record, `Map`, or `Set` that the awaits or callbacks of one call
  change to carry state other than a log (**Per-call state**). Drop a log, an **Exemptions** item,
  an iterator, and an `AbortController` instance.

Hit fixture, `percall.builtins.hit.ts`:

```ts
async function readAll(urls: readonly string[]): Promise<readonly string[]> {
	const budget = { remaining: BUDGET_BYTES }
	return Promise.all(
		urls.map(async (url) => {
			const body = await fetchText(url)
			budget.remaining -= body.length
			if (budget.remaining < 0) throw new Error(`The read of ${url} spent the byte allowance`)
			return body
		}),
	)
}
```

Clear fixture, `percall.builtins.clear.ts`:

```ts
class Pool {
	readonly #concurrency: number

	constructor(concurrency: number) {
		this.#concurrency = concurrency
	}

	async gather<T, R>(items: readonly T[], run: (item: T) => Promise<R>): Promise<readonly R[]> {
		const entries = items.entries()
		const failed = new AbortController()
		const workers = Array.from({ length: Math.min(this.#concurrency, items.length) }, () =>
			this.#drain(entries, run, failed),
		)
		const settled = await Promise.allSettled(workers)
		if (failed.signal.aborted) throw failed.signal.reason
		return settled.flatMap((worker) => (worker.status === 'fulfilled' ? worker.value : []))
	}

	async #drain<T, R>(
		entries: IterableIterator<[number, T]>,
		run: (item: T) => Promise<R>,
		failed: AbortController,
	): Promise<readonly R[]> {
		const produced: R[] = []
		for (const [, item] of entries) {
			if (failed.signal.aborted) break
			try {
				produced.push(await run(item))
			} catch (error) {
				failed.abort(error)
				break
			}
		}
		return produced
	}
}
```

## `entity.closure` (**Entity state**)

- **Signatures**, with `-U`. A function body that declares
  `const\s+[A-Za-z_$][\w$]*\s*(?::[^=]+)?=\s*(?:new (?:Map|Set|WeakMap|WeakSet|Array)\b|\[\]|\{\})`.
  The body then returns a function (`return\s+(?:async\s+)?(?:function\b|\()`) or registers one
  (`\.(?:on|once|addEventListener|use)\(`). Inside that function, a `running.carriers` write
  signature hits the declared name. Include `describe(` bodies whose collections `it(` callbacks
  change.
- **Reading.** Keep an array, record, `Map`, or `Set` that the returned or registered function
  changes when it runs after the creating call returns (**Entity state**). Drop a collection that
  function only reads, an entity instance, and a composable's reactive state.

Hit fixture, `entity.closure.hit.ts`:

```ts
function createLimiter(options: LimiterOptions): MiddlewareHandler {
	const capacity = options.capacity ?? DEFAULT_LIMITER_CAPACITY
	const clock = options.clock ?? Date.now
	const buckets = new Map<string, { budget: BudgetInterface<number>; resetAt: number }>()
	return async (_request, context, next) => {
		const key = resolveKey(context.state)
		const now = clock()
		const found = buckets.get(key)
		if (found === undefined && buckets.size >= capacity) {
			const oldest = buckets.keys().next().value
			if (oldest !== undefined) buckets.delete(oldest)
		}
		const bucket = found ?? {
			budget: createBudget<number>({ max: options.max, consumer: Number }),
			resetAt: now + options.window,
		}
		buckets.delete(key)
		buckets.set(key, bucket)
		if (bucket.budget.exhausted) return new Response(options.message, { status: 429 })
		bucket.budget.consume(1)
		return next()
	}
}
```

Clear fixture, `entity.closure.clear.ts`:

```ts
function only<TState>(
	paths: string | readonly string[],
	handler: MiddlewareHandler<TState>,
): MiddlewareHandler<TState> {
	const matches = new Set(isString(paths) ? [paths] : paths)
	return async (request, context, next) => {
		if (matches.has(context.url.pathname)) return handler(request, context, next)
		return next()
	}
}
```

## `middleware.fixed` and `middleware.changing` (`.claude/rules/architecture.md` § Middleware)

- **Signatures.** Apply the `entity.closure` signatures to every `middlewares.ts` file and to every
  function that returns a middleware.
- **Reading.** Keep closure state that a middleware changes across requests
  (`.claude/rules/architecture.md` § Middleware). Drop a value the factory derives and never
  changes, and a per-request local, which `.claude/rules/typescript.md` § Bindings rules.

Hit fixture, `middleware.fixed.hit.ts`:

```ts
function createSession(options?: SessionMiddlewareOptions): MiddlewareHandler {
	const path = options?.path ?? DEFAULT_SESSION_PATH
	const ttl = options?.ttl
	const clock = options?.clock ?? Date.now
	const store = new Map<string, SessionEntry>()
	return async (request, context, next) => {
		if (context.url.pathname !== path) return next()
		if (ttl !== undefined) {
			const cutoff = clock() - ttl
			for (const [id, entry] of store) {
				if (entry.touched <= cutoff) store.delete(id)
			}
		}
		if (context.method === 'DELETE') {
			const id = readSessionHeader(request)
			if (id === undefined || !store.delete(id)) return rejectUnknownSession()
			return new Response(null, { status: 204 })
		}
		const session = readSessionHeader(request) ?? crypto.randomUUID()
		store.set(session, { touched: clock() })
		return next()
	}
}
```

Clear fixture, `middleware.fixed.clear.ts`:

```ts
function only<TState>(
	paths: string | readonly string[],
	handler: MiddlewareHandler<TState>,
): MiddlewareHandler<TState> {
	const matches = new Set(isString(paths) ? [paths] : paths)
	return async (request, context, next) => {
		if (matches.has(context.url.pathname)) return handler(request, context, next)
		return next()
	}
}
```

## `slots.ban` (**Call slots**)

- **Signatures.** `this\.#[A-Za-z_$][\w$]*\s*=\s*undefined\b`, plus every
  `this\.#[A-Za-z_$][\w$]*\s*=\s*` in the opening statements of a method. Then group each field's
  assignment sites by method, and list the settle callbacks (`.then(`, `.finally(`) each method
  registers.
- **Reading.** Keep a `#` field of a long-lived entity that a call sets when it starts to its own
  entity, context, promise, or scratch value, or clears when it settles (**Call slots**). The clear
  can sit in a `finally` or in a settle callback the call registers. Judge long-lived by
  **Per-call state**: an owner that can serve another call like the one whose value the field holds
  is long-lived for it. Keep the hit when the call's steps, its callbacks, an outside handler, or a
  later call reach the value while the call runs, even when a refusal keeps the calls from
  overlapping. Drop a bound value, which `bound.field`, `bound.bind`, and `bound.release` rule; a
  latch and a selection under **Bound values**; and a field a call writes mid-call and never clears,
  such as `#previous`.

Hit fixture, `slots.ban.hit.ts`:

```ts
class Worker {
	readonly #session: Session
	#meter: RemoteMeter | undefined

	constructor(session: Session) {
		this.#session = session
	}

	async goal(value: Goal): Promise<Product> {
		if (this.#meter !== undefined) throw new Error('Worker goal is out of order')
		const meter = new RemoteMeter()
		this.#meter = meter
		try {
			return await this.#session.execute(value, meter)
		} finally {
			this.#meter = undefined
		}
	}

	append(value: Evidence): Promise<void> {
		const meter = this.#meter
		if (meter === undefined) return Promise.reject(new Error('Worker evidence is outside a goal'))
		return meter.record(value)
	}
}

class Conversation {
	#pending: Promise<unknown> | undefined

	compact(summarize: Summarizer): Promise<Section | undefined> {
		const previous = this.#pending
		const fold = this.#fold(previous, summarize)
		const pending = Promise.allSettled([previous, fold])
		this.#pending = pending
		void pending.then(() => {
			if (this.#pending === pending) this.#pending = undefined
		})
		return fold
	}

	async #fold(
		previous: Promise<unknown> | undefined,
		summarize: Summarizer,
	): Promise<Section | undefined> {
		await previous
		return summarize()
	}
}
```

Clear fixture, `slots.ban.clear.ts`:

```ts
class Worker {
	readonly #meters = new Set<RemoteMeter>()

	async goal(value: Goal): Promise<Product> {
		if (this.#meters.size !== 0) throw new Error('Worker goal is out of order')
		const meter = new RemoteMeter()
		this.#meters.add(meter)
		try {
			return await execute(value, meter)
		} finally {
			this.#meters.delete(meter)
		}
	}
}

class ConversationManager {
	readonly #conversations = new Map<string, Conversation>()
	#active: string | undefined

	switch(id: string): Conversation | undefined {
		const conversation = this.#conversations.get(id)
		if (conversation === undefined) return undefined
		this.#active = id
		return conversation
	}
}

class Transport {
	#fault: { readonly error: unknown } | undefined

	fail(error: unknown): void {
		this.#fault ??= { error }
	}
}
```

## `resets.ban` and `resets.assignment`, with `bound.state` (**Unit resets**, **Bound values**)

- **Signatures.**
  - Fresh initializers: `this\.#[A-Za-z_$][\w$]*\s*=\s*(?:(?:0|-1|false|true|undefined)\b|''|""|\[\]|\{\}|new\s)`.
  - Emptying: `this\.#[A-Za-z_$][\w$]*\.(?:clear\(\)|length\s*=\s*0|splice\(\s*0)`.
  - Any assignment inside a method that binds or releases a unit:
    `this\.#[A-Za-z_$][\w$]*\s*(?:[-+*/%&|^]|\*\*|\?\?|\|\||&&)?=[^=]`.
- **Reading.** Keep a hit inside a method that binds or releases a unit of work that later calls
  continue when it discards the preceding unit's state and initializes state for another unit,
  whatever its expression reads (**Unit resets**). Read the method: it begins or ends a goal, a
  session, or a lease. Require that the field is not the bound value's own field and that another
  method changes it afterwards (`++`, `--`, `+=`, `.push(`, `.set(`, `.add(`, or a reassignment).
  Keep a field whose lifetime is the unit that sits on the owner (**Bound values**). Drop a field
  whose state continues across units, such as a cross-goal ordinal or request count; a copy-on-write
  update that keeps the entity's state; a constructor; teardown; and a reset in a method that
  neither binds nor releases a unit.

Hit fixture, `resets.ban.hit.ts`:

```ts
class AgentScript {
	#plan: Plan | undefined
	#cursor = 0

	prepare(plan: Plan): void {
		this.#plan = plan
		this.#cursor = 0
	}

	take(): ScriptedResponse | undefined {
		const response = this.#plan?.responses[this.#cursor]
		this.#cursor++
		return response
	}
}

class AgentTrace {
	#rows: Evidence[] = []
	#goal: string | undefined

	start(goal: string): void {
		if (this.#goal !== undefined) throw new Error('Trace goal is already active')
		this.#rows = []
		this.#goal = goal
	}

	append(event: string, value: JSONValue): void {
		const goal = this.#goal
		if (goal === undefined) return
		this.#rows.push({ event, goal, value })
	}
}

class ReplayScript {
	#plan: Plan | undefined
	#cursor = 0

	prepare(plan: Plan): void {
		this.#plan = plan
		this.#cursor = this.#cursor - this.#cursor
	}

	take(): ScriptedResponse | undefined {
		const response = this.#plan?.responses[this.#cursor]
		this.#cursor += 1
		return response
	}
}
```

Clear fixture, `resets.ban.clear.ts`:

```ts
class Channel {
	#waiting: Array<() => void> = []

	#signal(): void {
		const waiting = this.#waiting
		this.#waiting = []
		for (const wake of waiting) wake()
	}

	#park(): Promise<void> {
		return new Promise<void>((resolve) => {
			this.#waiting = [...this.#waiting, resolve]
		})
	}
}

class ConversationManager {
	readonly #conversations = new Map<string, Conversation>()
	#active: string | undefined

	clear(): void {
		this.#conversations.clear()
		this.#active = undefined
	}
}

class Conversation {
	readonly #rolling: boolean
	#sections: readonly Section[] = []

	constructor(rolling: boolean) {
		this.#rolling = rolling
	}

	async #fold(summarize: Summarizer, slice: readonly Message[]): Promise<Section> {
		const section: Section = { summary: await summarize(slice), messages: slice }
		this.#sections = this.#rolling ? [section] : [...this.#sections, section]
		return section
	}
}

class AgentTrace {
	readonly #goals = new Set<TraceGoal>()
	#ordinal = 0
	#dispatches = 0

	start(goal: string): void {
		if (this.#goals.size !== 0) throw new Error('Trace goal is already active')
		this.#goals.add(new TraceGoal(goal))
	}

	admit(): number {
		return ++this.#ordinal
	}

	dispatch(): number {
		return ++this.#dispatches
	}
}
```

## `bound.field`, with `bound.unit` and `running.position` (**Bound values**)

- **Signatures.** `const\s*\[\s*[A-Za-z_$][\w$]*\s*\]\s*=\s*this\.#[A-Za-z_$][\w$]*`,
  `this\.#[A-Za-z_$][\w$]*\.(?:values|keys|entries)\(\)\.next\(\)`, and
  `\[\s*\.\.\.this\.#[A-Za-z_$][\w$]*\s*\]\s*(?:\[0\]|\.at\()`. For each field, find the methods that
  add and delete its entry. Also list each explicit bind-to-release pair of methods: a method that
  sets a `#` field or adds to a `#` collection, and a different later method that releases it.
- **Reading.** Keep a `#` collection that holds one bound unit at a time behind a refusal on add,
  whose entry a later call deletes (`clear`, `close`, or another method's `finally`), and whose unit
  the entity holds nowhere else (**Bound values**). Drop a registry whose adding call deletes the
  entry, which `registry.reads` rules; a population, a cache, or a persisted record, which
  **Registries** excludes; and a selection.

Hit fixture, `bound.field.hit.ts`:

```ts
class AgentScript {
	readonly #goals = new Set<ScriptGoal>()
	readonly #serving = new Set<ScriptedResponse>()

	prepare(plan: Plan): void {
		if (this.#serving.size !== 0) throw new Error('Cannot replace a running scripted workload')
		if (this.#goals.size !== 0) throw new Error('Scripted goal is already prepared')
		this.#goals.add(new ScriptGoal(plan))
	}

	clear(): void {
		this.#goals.clear()
	}

	async serve(messages: readonly Message[]): Promise<ProviderResult> {
		const [goal] = this.#goals
		if (goal === undefined) throw new Error('Scripted provider is unavailable')
		const response = goal.take()
		this.#serving.add(response)
		try {
			return await respond(messages, response)
		} finally {
			this.#serving.delete(response)
		}
	}
}

class AgentTrace {
	readonly #goals = new Set<TraceGoal>()

	get goal(): string | undefined {
		const [running] = this.#goals
		return running?.goal
	}

	start(goal: string): void {
		if (this.#goals.size !== 0) throw new Error('Trace goal is already active')
		this.#goals.add(new TraceGoal(goal))
	}

	async flush(evidence: EvidenceSink): Promise<void> {
		const [running] = this.#goals
		if (running === undefined) return
		try {
			await running.flush(evidence)
		} finally {
			this.#goals.delete(running)
		}
	}
}
```

Clear fixture, `bound.field.clear.ts`:

```ts
class ProcessSession {
	readonly #goals = new Set<ProcessGoal>()

	async execute(goal: Goal, context: GoalContext): Promise<Product> {
		if (this.#goals.size !== 0) throw new Error('The process cannot execute in its current state')
		const running = new ProcessGoal(context)
		this.#goals.add(running)
		try {
			return await request('goal', goal)
		} finally {
			this.#goals.delete(running)
		}
	}

	async #handle(operation: Operation): Promise<Reply> {
		const [running] = this.#goals
		if (running === undefined) throw new Error('The worker requested work outside a goal')
		return running.context.meter.admit(operation)
	}
}

class MemorySessionStore {
	readonly #entries = new Map<string, SessionEntry>()
	readonly #capacity: number

	constructor(capacity: number) {
		this.#capacity = capacity
	}

	#reserve(): void {
		if (this.#entries.size < this.#capacity) return
		const oldest = this.#entries.keys().next().value
		if (oldest !== undefined) this.#entries.delete(oldest)
	}
}
```

## `bound.bind` and `bound.restart` (**Bound values**)

- **Signatures.** In bind methods (`prepare`, `start`, `begin`, `open`, `bind`, `hold`, `use`), find
  `this\.#[A-Za-z_$][\w$]*\s*(?:\?\?)?=\s*` and `\.add\(`. Then read the method's guard and its
  suspensions (`await`, `yield`).
- **Reading.** Keep a bind with no throw-while-bound check (`!== undefined` or `size !== 0`, then
  `throw`), a bind whose check or whose publication of the incoming value comes after the method's
  first suspension, and a bind that keeps the first value through `??=` instead of throwing
  (**Bound values**). For a `start` that restarts, keep one that suspends between calling the
  previous value's end method and publishing the incoming value. Drop a bind that publishes a value
  owning its asynchronous initialization before its first suspension, and a latch under
  **Bound values**.

Hit fixture, `bound.bind.hit.ts`:

```ts
class AuditRegistry {
	#server: UpstreamServer | undefined

	async start(): Promise<void> {
		this.#server ??= await createUpstreamServer(AUDIT_REPLIES)
	}
}

class GoalRunner {
	#goal: Goal | undefined

	async begin(plan: Plan): Promise<void> {
		if (this.#goal !== undefined) throw new Error('A goal is already bound')
		const goal = await createGoal(plan)
		this.#goal = goal
	}
}
```

Clear fixture, `bound.bind.clear.ts`:

```ts
class Holder<TValue> {
	#value: TValue | undefined

	hold(value: TValue): TValue {
		if (this.#value !== undefined) throw new Error('The holder already holds a value')
		this.#value = value
		return value
	}
}

class AgentTrace {
	readonly #goals = new Set<TraceGoal>()

	start(goal: string): void {
		if (this.#goals.size !== 0) throw new Error('Trace goal is already active')
		this.#goals.add(new TraceGoal(goal))
	}
}
```

## `bound.release` and `bound.later` (**Bound values**)

- **Signatures.** For each bound field that `slots.ban`, `bound.field`, or `bound.bind` found, list
  its `this\.#[A-Za-z_$][\w$]*\s*=\s*undefined`, `\.clear\(\)`, and `\.delete\(` sites by method, and
  the callbacks and helpers each binding invocation registers or calls.
- **Reading.** Keep a binding that only the binding invocation's own settle path, or cleanup that
  invocation registers or calls, releases, and rule it a call slot under **Call slots**. Keep a
  binding that no later independent invocation releases while the entity lives on and that is no
  latch (**Bound values**). Drop a release in `clear`, in teardown, and in a later independent
  invocation's settle path.

Hit fixture, `bound.release.hit.ts`:

```ts
class ProcessSession {
	readonly #channel: Channel
	#context: GoalContext | undefined

	constructor(channel: Channel) {
		this.#channel = channel
	}

	async execute(goal: Goal, context: GoalContext): Promise<Product> {
		if (this.#context !== undefined)
			throw new Error('The process cannot execute in its current state')
		this.#context = context
		try {
			return await this.#channel.request('goal', goal)
		} finally {
			this.#context = undefined
		}
	}

	async handle(operation: Operation): Promise<Reply> {
		const context = this.#context
		if (context === undefined) throw new Error('The worker requested work outside a goal')
		return context.meter.admit(operation)
	}
}

class Conversation {
	#pending: Promise<unknown> | undefined

	compact(summarize: Summarizer): Promise<Section | undefined> {
		const previous = this.#pending
		const fold = this.#fold(previous, summarize)
		const pending = Promise.allSettled([previous, fold])
		this.#pending = pending
		void pending.then(() => {
			if (this.#pending === pending) this.#pending = undefined
		})
		return fold
	}

	async #fold(
		previous: Promise<unknown> | undefined,
		summarize: Summarizer,
	): Promise<Section | undefined> {
		await previous
		return summarize()
	}
}
```

Clear fixture, `bound.release.clear.ts`:

```ts
class AgentTrace {
	readonly #goals = new Set<TraceGoal>()
	readonly #flushes = new Set<Promise<void>>()

	start(goal: string): void {
		if (this.#goals.size !== 0) throw new Error('Trace goal is already active')
		this.#goals.add(new TraceGoal(goal))
	}

	async flush(evidence: EvidenceSink): Promise<void> {
		const [running] = this.#goals
		if (running === undefined) return
		if (this.#flushes.size !== 0) throw new Error('Trace flush is already pending')
		const flushing = running.flush(evidence)
		this.#flushes.add(flushing)
		try {
			await flushing
		} finally {
			this.#goals.delete(running)
			this.#flushes.delete(flushing)
		}
	}
}
```

## `registry.form` (**Registries**)

- **Signatures.**
  - Bulk clears: `this\.#[A-Za-z_$][\w$]*\.clear\(\)` in methods other than `destroy`, `close`,
    `stop`, and the private teardown they call.
  - Clear-then-add, with `-U`: `\.clear\(\)\s*\n?\s*this\.#[A-Za-z_$][\w$]*\.add\(`.
  - Deletes: every `this\.#[A-Za-z_$][\w$]*\.delete\(` on a registry field.
- **Reading.** Keep a registry of in-flight entities that a non-teardown method clears in bulk, that
  a call clears before adding its own entry, or whose entry a path other than that entry's own end
  deletes (**Registries**). Drop an operation's delete of its own entry, even when it empties the
  registry, and drop a population, a subscription, a cache, and a persisted record.

Hit fixture, `registry.form.hit.ts`:

```ts
class Dispatcher {
	readonly #live = new Set<Call>()

	async dispatch(call: Call): Promise<Reply> {
		this.#live.clear()
		this.#live.add(call)
		try {
			return await call.run()
		} finally {
			this.#live.delete(call)
		}
	}
}
```

Clear fixture, `registry.form.clear.ts`:

```ts
class ProcessSession {
	readonly #goals = new Set<ProcessGoal>()
	readonly #tickets = new Map<number, ParentTicket>()
	#closing: Promise<void> | undefined

	async execute(goal: Goal, context: GoalContext): Promise<Product> {
		if (this.#goals.size !== 0) throw new Error('The process cannot execute in its current state')
		const running = new ProcessGoal(context)
		this.#goals.add(running)
		try {
			return await request('goal', goal)
		} finally {
			this.#goals.delete(running)
		}
	}

	close(): Promise<void> {
		this.#closing ??= this.#close()
		return this.#closing
	}

	async #close(): Promise<void> {
		for (const entry of this.#tickets.values()) entry.listeners.abort()
		this.#tickets.clear()
		await terminate()
	}
}
```

## `registry.reads` and `registry.position`, with `running.position` (**Registries**)

- **Signatures.** The `bound.field` position-read signatures, `keys()` and `entries()` iterator reads
  and a key obtained that way included, restricted to registry fields.
- **Reading.** Keep every position read unless all of these hold (**Registries**):
  - a `size !== 0` throw precedes every add to that registry;
  - the call that added the entry deletes it on every path that settles that call;
  - the read handles the empty registry.

  Drop a `size` read, a whole read, and a keyed read.

Hit fixture, `registry.reads.hit.ts`:

```ts
class Supervisor {
	readonly #children = new Set<ChildProcess>()

	spawn(command: string): ChildProcess {
		const child = spawnChild(command)
		this.#children.add(child)
		child.once('exit', () => this.#children.delete(child))
		return child
	}

	first(): ChildProcess | undefined {
		const [child] = this.#children
		return child
	}

	oldest(): ChildProcess | undefined {
		return this.#children.values().next().value
	}
}
```

Clear fixture, `registry.reads.clear.ts`:

```ts
class Worker {
	readonly #meters = new Set<RemoteMeter>()

	async goal(value: Goal): Promise<Product> {
		if (this.#meters.size !== 0) throw new Error('Worker goal is invalid or out of order')
		const meter = new RemoteMeter()
		this.#meters.add(meter)
		try {
			return await execute(value, meter)
		} finally {
			this.#meters.delete(meter)
		}
	}

	abort(value: Cancellation): void {
		const [meter] = this.#meters
		if (meter === undefined) throw new Error('Worker ticket cancellation is foreign')
		meter.abort(value.id, value.failure)
	}
}

class ProcessSession {
	readonly #goals = new Set<ProcessGoal>()

	async execute(goal: Goal, context: GoalContext): Promise<Product> {
		if (this.#goals.size !== 0) throw new Error('The process cannot execute in its current state')
		const running = new ProcessGoal(context)
		this.#goals.add(running)
		try {
			return await request('goal', goal)
		} finally {
			this.#goals.delete(running)
		}
	}

	async #handle(operation: Operation): Promise<Reply> {
		const [running] = this.#goals
		if (running === undefined) throw new Error('The worker requested work outside a goal')
		return running.context.meter.admit(operation)
	}
}
```

## `exemptions.membership` and `exemptions.walk` (**Exemptions**)

- **Signatures.** `const\s+[A-Za-z_$][\w$]*\s*(?::[^=]+)?=\s*new (?:Set|Map)\b`. For each, list the
  name's `\.has\(` reads and its `\.(?:add|set)\(` writes inside the loops of its function.
- **Reading.** Keep a set or map that a loop reads through `has` and writes through `add` or `set`
  when the loop is no traversal: it reaches no node as a successor of a node it has already reached
  (**Exemptions**). Drop a traversal's membership set or map, whether or not the traversal iterates
  it, and a map that `exemptions.memo` rules as a memo.

Hit fixture, `exemptions.membership.hit.ts`:

```ts
function selectPlugins(
	base: readonly PluginOption[],
	candidates: readonly PluginOption[],
): readonly PluginOption[] {
	const taken = new Set<number>()
	const selected: PluginOption[] = []
	for (const plugin of base) {
		const index = candidates.findIndex(
			(candidate, position) =>
				!taken.has(position) && isNamedPlugin(candidate) && candidate.name === readName(plugin),
		)
		const replacement = candidates[index]
		if (replacement === undefined) {
			selected.push(plugin)
		} else {
			selected.push(replacement)
			taken.add(index)
		}
	}
	for (const [index, plugin] of candidates.entries()) {
		if (!taken.has(index)) selected.push(plugin)
	}
	return selected
}
```

Clear fixture, `exemptions.membership.clear.ts`:

```ts
function collectDescendants(rows: readonly (readonly number[])[], root: number): readonly number[] {
	const descendants = new Set([root])
	rows.forEach(() => {
		for (const [pid, parent] of rows)
			if (pid !== undefined && parent !== undefined && descendants.has(parent)) descendants.add(pid)
	})
	return [...descendants].reverse()
}

function scanAmendments(
	amendments: ReadonlyMap<string, readonly string[]>,
	start: string,
	admit: (id: string) => boolean,
): readonly string[] {
	const queue = [start]
	const seen = new Set<string>()
	const admitted: string[] = []
	for (const id of queue) {
		if (seen.has(id)) continue
		seen.add(id)
		if (!admit(id)) continue
		admitted.push(id)
		queue.push(...(amendments.get(id) ?? []))
	}
	return admitted
}
```
