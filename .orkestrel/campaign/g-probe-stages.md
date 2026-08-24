Git porcelain was requested twice and rejected by the harness both times. No files were edited. Evidence below is from `/home/user/orkestrel/probe/src` only.

---

### 1. Re-warm past the 64-specification bound

**Bound and trigger** — `RuntimeStage.#runner` compares `#specifications` to `64`, then zeros the counter before replacing the stored promise:

```541:551:src/server/stages/RuntimeStage.ts
	#runner(): Promise<Vitest> {
		// Vite retains one unresolved URL for each fresh specification path. A 64-specification
		// lifetime bounds that internal map without giving up the resident runner on each call.
		if (this.#specifications < 64) return this.#vitest
		this.#specifications = 0
		this.#vitest = this.#replace(this.#vitest)
		void this.#vitest.catch(() => {})
		return this.#vitest
	}
```

The count is incremented only after a specification path exists (`inspect` at `RuntimeStage.ts:167-169`). A failed re-warm therefore never increments.

**Re-warm path** — `#replace` awaits the current service, closes it, then `#warm`s a new one. `#warm` is also the constructor path (`RuntimeStage.ts:107-114`).

```553:558:src/server/stages/RuntimeStage.ts
	async #replace(current: Promise<Vitest>): Promise<Vitest> {
		const vitest = await current
		await vitest.close()
		if (this.#destroyed) throw createDestroyedError('runtime stage')
		const runner = loadWorkspaceModule(this.#workspace, 'vitest/node')
		return this.#warm(runner.createVitest)
	}
```

`inspect` awaits `#runner()` with no local catch (`RuntimeStage.ts:132`). Warm/replace rejection therefore leaves `inspect`.

**State after a failed re-warm (this instance)**  
- `#specifications` is already `0`.  
- `#vitest` is the rejected `#replace` promise; `void this.#vitest.catch(() => {})` only observes it.  
- `#destroyed` is unchanged (still `false` unless `destroy` ran).  
- The next `inspect` hits `#specifications < 64` and returns that same rejected `#vitest`. `#replace` is not attempted again.

**Coordinator** — `Probe.#inspectStage` recycles a stage only when the deadline fired (`Probe.ts:430-436`, `#recycle` at `Probe.ts:445-482`). A fast warm/replace rejection is rethrown and does not construct a new `RuntimeStage`. `#recycle` is the only site that assigns `this.#runtime = new RuntimeStage(...)`.

---

### 2. Candidate shadowing an on-disk file

Both stages record `files` the same way: `overlay.set(resolveWorkspaceFile(workspace, draft.path), draft.text)` — type at `TypeStage.ts:249-250` (also records `subject.test`); runtime at `RuntimeStage.ts:145-147` (`files` only; the test is a generated sibling on disk).

`Overlay` keys with `normalizePath` (backslash → slash):

```42:54:src/server/Overlay.ts
	set(path: string, text: string): void {
		this.#candidates.set(normalizePath(path), text)
	}
	text(path: string): string | undefined {
		return this.#candidates.get(normalizePath(path))
	}
```

`resolveWorkspaceFile` without `mutate` is lexical `resolve`, not `realpath` (`helpers.ts:57-68`).

**Type stage text for a shadowed path** — overlay wins when `overlay.text(file)` is defined:

```331:336:src/server/stages/TypeStage.ts
	#fileExists(...): boolean {
		return this.#overlay.text(file) !== undefined || typescript.sys.fileExists(file)
	}
	#readFile(...): string | undefined {
		return this.#overlay.text(file) ?? typescript.sys.readFile(file)
	}
```

```389:400:src/server/stages/TypeStage.ts
	#version(file: string): string {
		if (this.#overlay.text(file) !== undefined) return `virtual:${this.#overlay.revision}`
		try {
			return `disk:${statSync(file).mtimeMs}`
		} catch {
			return 'missing'
		}
	}
	#snapshot(...): IScriptSnapshot | undefined {
		const text = this.#overlay.text(file) ?? typescript.sys.readFile(file)
```

`readDirectory` stays `typescript.sys.readDirectory` (`TypeStage.ts:303`). A path already on disk remains in the parsed file set; overlay supplies version/snapshot/read.

**Runtime stage text for a shadowed path** — Vite plugin `enforce: 'pre'`, `resolveId` + `load` only (no `transform`):

```351:387:src/server/stages/RuntimeStage.ts
	#resolve(id, importer): string | undefined {
		// relative `.` or absolute only; strips `?…` then tries id, `.js`→`.ts`, missing `.ts`
		if (this.#load(resolved) !== undefined) return resolved
	}
	#load(id): string | undefined {
		const text = this.#overlay.text(id)
		if (text !== undefined) return text
		// then only a sole `?v=` query; otherwise undefined → Vite continues to disk
		return this.#overlay.text(id.slice(0, separator))
	}
```

`#snapshot` hashes walked disk bytes first, then overwrites overlay paths with `overlay:${revision}` (`RuntimeStage.ts:588-599`). That digest drives `#invalidate`, not the bytes Vite serves. `inspect` `finally` calls `overlay.clear()` (`RuntimeStage.ts:221-223`).

**Where the two reads can diverge (sites, not a ruling)**  
- Type host always prefers overlay on `normalizePath(file)` match; runtime `#load` returns overlay only if Vite’s id matches, including the `?v=`-only query rule. Any other query leaves `#load` undefined.  
- `#resolve` does not intercept bare specifiers.  
- Type records `test` into the overlay; runtime does not overlay `test.path`.

---

### 3. `experimental.fsModuleCache`

**In `src`:** no identifier `experimental`, `fsModuleCache`, or `moduleCache`.

**What probe does pass to Vitest** — `#warm` → `createVitest` with `root`, `config: resolveWorkspaceFile(..., 'vite.config.ts')`, `watch: false`, `run: true`, `pool: 'threads'`, reporters, plus the instrumentation plugin (`RuntimeStage.ts:287-312`). No `experimental` field. The target workspace’s `vite.config.ts` is the config Vitest is told to load.

**Overlay vs transform** — `orkestrel-runtime-overlay` is `resolveId` + `load` only (`RuntimeStage.ts:341-346`). Returned overlay text still goes through Vite’s later transform pipeline. Disk fallback is the default when `#load` returns `undefined`.

**What probe invalidates** — `#invalidate` calls `vitest.invalidateFile(id)` and `vitest.watcher.invalidates.add(id)` (`RuntimeStage.ts:582-585`). `#evict` also drops `idMap`, `pathsSet`, `clearSpecificationsCache`, module-graph maps, watcher, and `cache.results` (`RuntimeStage.ts:497-528`). None of those names `fsModuleCache`.

---

### 4. `realpathSync` race

**Containment walk (mutate writes)** — `resolveWorkspaceFile(..., mutate=true)`:

```68:118:src/server/helpers.ts
		const canonical = realpathSync(root)
		let descendant = root
		for (const segment of path.split(sep)) {
			descendant = resolve(descendant, segment)
			const outcome = attempt(() => lstatSync(descendant))
			// ENOENT / ENOTDIR → break (lexical remainder uninspected)
			if (outcome.value.isSymbolicLink()) { throw ... }
			const resolved = realpathSync(descendant)
			// remainder must stay under canonical
		}
	return file  // lexical resolve(), not canonical
```

**Runtime write sequence that uses that walk** (`RuntimeStage.ts:395-422`): mint revision path → `resolveWorkspaceFile(..., true)` → `mkdirSync` → `resolveWorkspaceFile(..., true)` again → `writeFileSync(..., { flag: 'wx' })`. Class remarks state a concurrent mutation of a path component between the last inspection and the write is outside the guarantee (`RuntimeStage.ts:80-82`).

Windows between `lstatSync` (not a symlink) and `realpathSync(descendant)`, or between the second walk returning and `writeFileSync`. The returned path is still the lexical `file`.

**Post-run mapping** — `#real` is `attempt(() => realpathSync(path))`, else the original string (`RuntimeStage.ts:762-764`). Called after the specification has already run (`#issues` at `RuntimeStage.ts:684`, stack frames at `RuntimeStage.ts:786-790`). A specification that replaced itself before this call is the other `realpathSync` the generated file can win against.

---

### 5. Generated specification `import.meta.url` revision suffix

**Path (what `import.meta.url` will name)** — revision is minted, then the sibling path is built, then that path is written:

```401:419:src/server/stages/RuntimeStage.ts
			const revision = `${process.pid}-${randomUUID()}`
			const file = createRevisionFile(this.#workspace, test.path, revision)
			// ...
			writeFileSync(file, formatSpecification(test.text, revision), {
```

```454:458:src/server/helpers.ts
export function createRevisionFile(workspace: string, path: string, revision: string): string {
	const file = resolveWorkspaceFile(workspace, path)
	const extension = extname(file)
	const stem = extension === '' ? file : file.slice(0, -extension.length)
	return `${stem}.probe-${revision}${extension}`
}
```

`#sweep` comments that the revision sits between stem and extension so a `.test.ts` source is not itself a `.test.ts` file (`RuntimeStage.ts:605-606`). Probe does not rewrite `import.meta.url` in the test text. The suffix is the filename; the worker’s `import.meta.url` is that file URL.

**Text (revision in contents, not in `import.meta.url`)** — `formatSpecification` appends a trailing marker only (`core/helpers.ts:188-190`). Caller `test.text` is unchanged aside from a terminating newline before the marker.

---

### Unknowns

- `git -C /home/user/orkestrel/probe status --porcelain` was rejected before and after; working-tree cleanliness was not observed. No edits were issued from this lane.  
- Whether Vite/Vitest `experimental.fsModuleCache` (if enabled in the loaded workspace config or by Vitest defaults) can satisfy a transform without calling `orkestrel-runtime-overlay` `load` is not visible in `probe/src`.  
- Whether TypeScript’s `sys.readFile` / language-service `file` spelling always `normalizePath`-matches the overlay key, and whether Vite ids other than a sole `?v=` query miss `#load`, is not closed in `src`.  
- Whether a failed `#replace` after `vitest.close()` leaves the process with no live runner while `#destroyed` stays `false` is the instance state above; whether any outer supervisor other than deadline `#recycle` ever replaces that instance is not in `src` beyond `Probe`.
