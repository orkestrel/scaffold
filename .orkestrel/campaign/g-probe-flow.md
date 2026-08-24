Porcelain capture of `git -C /home/user/orkestrel/probe status --porcelain` was refused by this harness before and after the read. This lane did not edit.

---

### 1. Coordinator deadline vs synchronous stage work

Coordinator: `Probe` (`/home/user/orkestrel/probe/src/server/Probe.ts`). Budget is `#deadline`, default 30_000 ms.

```80:82:/home/user/orkestrel/probe/src/server/Probe.ts
	constructor(options?: ProbeOptions) {
		this.#workspace = options?.workspace ?? process.cwd()
		this.#deadline = createTimeout({ ms: options?.deadline ?? 30_000 }).ms
```

The deadline is a `Promise.race` of the stage promise against an abort listener:

```412:428:/home/user/orkestrel/probe/src/server/Probe.ts
	async #inspectStage(
		stage: StageInterface,
		progress: number,
		operation: Promise<Check>,
		claim: Claim,
	): Promise<Check> {
		const timeout = createTimeout({ ms: this.#deadline })
		timeout.start()
		try {
			return await Promise.race([
				operation,
				this.#expiry(timeout, `The ${stage.stage} stage exceeded ${this.#deadline} ms`, stage, progress),
			])
```

```494:506:/home/user/orkestrel/probe/src/server/Probe.ts
		return new Promise<never>((_resolve, reject) => {
			timeout.signal.addEventListener(
				'abort',
				() =>
					reject(
						new ProbeError(message, {
							origin: stage.progress > progress ? 'claimant' : 'instrument',
							code: 'deadline',
```

That listener runs on the event loop. Synchronous work inside `operation` holds the loop, so abort cannot fire until that work returns.

`prove` also runs type-stage `resolve` **before** any queued inspection, so that work is outside `#inspectStage` entirely:

```136:144:/home/user/orkestrel/probe/src/server/Probe.ts
			const project = await this.#type.resolve(claim.project)
			const digest = computeDigest(this.#workspace, { case: claim.case, control: claim.control })
			const subject = Object.freeze(await this.#inspect(claim.case, claim))
			const control = Object.freeze(await this.#inspect(claim.control, claim))
```

`resolve` builds the language service for the caller-named project synchronously (`readConfigFile`, `parseJsonConfigFileContent`, `createLanguageService`). A project not already resident is kept in the one recycled slot (`TypeStage.ts` `#recycle`).

Inside `inspect`, still before the first yield:

```114:133:/home/user/orkestrel/probe/src/server/stages/TypeStage.ts
		this.#configure(this.#service(typescript, 'tsconfig.json'), 'tsconfig.json')
		for (const selection of selections) {
			this.#configure(this.#service(typescript, selection.project), selection.project)
		}
		// ...
			issues.push(...this.#issues(typescript, root, subject.test, 'tsconfig.json', false, true))
			projects.add('tsconfig.json')
			await this.#unblock()
```

`#configure` is `service.getCompilerOptionsDiagnostics()`. `#issues` is `getSyntacticDiagnostics` then `getSemanticDiagnostics` on that path. `#unblock` is `await setImmediate()`.

The stage records that a language-service check is synchronous and that a non-yielding inspection held the loop for its whole duration, so the coordinator deadline could not fire against this stage:

```233:243:/home/user/orkestrel/probe/src/server/stages/TypeStage.ts
	// Hands the host's event loop back after one candidate's check, and refuses an inspection this
	// stage was torn down during. A language service checks a candidate synchronously, so an
	// inspection that never yielded held the loop for its whole duration: the coordinator's
	// deadline could not fire against this stage, ...
	async #unblock(): Promise<void> {
		await setImmediate()
```

`ProbeEventMap.expire` is documented as the only report of a synchronous infinite loop (`types.ts` 348–351). Yielding bounds a hold to one candidate; `resolve`, `#service` creation, `#configure`, and the first `#issues` (test vs `tsconfig.json`) still run with no yield. A caller-named tree-wide project pays that parse and those diagnostics on the loop.

---

### 2. Bare `Error` refusals

`src` has no `throw new Error(...)`. `Party` / `Issue.origin` / `ProbeError.origin` are `'claimant' | 'workspace' | 'instrument'`. `ProbeErrorCode` is `'refused' | 'missing' | 'malformed' | 'destroyed' | 'deadline'`. A stage that cannot start throws; a completed stage puts messages in `Issue` on `Check`. `receipt` is refused when either phase has `origin: 'instrument'` (`types.ts` 263–269, 181–190, 320–342, 442–515).

Runtime write path wraps `mkdirSync` / `writeFileSync` in `attempt`. Native faults do not leave as `Error`. They become `Issue` or `ProbeError`:

```412:456:/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts
			creating = true
			mkdirSync(dirname(file), { recursive: true })
			creating = false
			// ...
			writeFileSync(file, formatSpecification(test.text, revision), {
				encoding: 'utf8',
				flag: 'wx',
			})
		})
		if (outcome.success) return outcome.value
		if (outcome.error instanceof ProbeError && outcome.error.origin === 'claimant') {
			throw new ProbeError(outcome.error.message, { origin: outcome.error.origin, code: outcome.error.code, ... })
		}
		if (!creating && generated !== undefined && isRefusedName(generated, outcome.error)) {
			throw new ProbeError(..., { origin: 'claimant', code: 'refused', ... })
		}
		return {
			origin: (outcome.error instanceof ProbeError && outcome.error.origin === 'workspace') || creating
				? 'workspace'
				: 'instrument',
			path: test.path,
			message: `The runtime stage could not write the generated specification (${describeUnknown(outcome.error)})`,
		}
```

`inspect` folds a non-string `#specification` result into `Check.issues` (`RuntimeStage.ts` 149–155). `prove` then returns a `Verdict`; it does not throw. A mkdir failure (`creating === true`) is `origin: 'workspace'`, not `'instrument'`. A write failure after the directory exists is `origin: 'instrument'` as an `Issue`, not a throw.

A missing Vitest project mapping **does** reject `prove` (throw, not an `Issue`):

```467:475:/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts
		if (name === undefined) {
			throw new ProbeError(
				'The runtime stage found no configured Vitest project matching the test path',
				{ origin: 'claimant', code: 'missing', context: { stage: this.stage, path } },
			)
		}
```

`Probe.prove` catch emits and rethrows whatever it received (`Probe.ts` 159–161), so a native `Error` that escaped a stage would leave `prove` as that `Error` and never become an `origin: 'instrument'` finding.

---

### 3. Unrelated `Control`

Admission checks shape only. `isCase` requires `files` + `test`. `isControl` requires those plus `stage` and non-empty `reason`. `isClaim` requires `project`, `case`, `control`. No comparison of case drafts to control drafts (`validators.ts` 90–139).

`prove` inspects `claim.case` and `claim.control` as separate subjects (`Probe.ts` 143–144). Relatedness is not read.

Receipt conditions (`helpers.ts` 139–154): every stage present once in each phase; case `issues` empty; control has some `origin: 'claimant'` issue at the declared stage; no `origin: 'instrument'` issue in either phase; other control stages have no claimant issue. Token fields: prefix, `verdict.digest`, declared `stage`, `typescript@…`, `oxlint@…`, `vitest@…`, `project.path@project.digest`. Digest is `computeDigest(workspace, { case, control })` (`Probe.ts` 139–141; `helpers.ts` 627–631), i.e. case bytes, control bytes including `reason`, rewritten relative to the workspace.

Facts present at validation / `prove` time and unused for relatedness: `claim.case.files`, `claim.case.test`, `claim.control.files`, `claim.control.test`, `claim.control.stage`, `claim.control.reason` (paths and full text of every draft). `Claim` remarks say candidate drafts “must differ” (`types.ts` 101–103) as a receipt precondition in prose; the guards do not enforce difference or relatedness. The guide states a control need not be a mutation of its case (`guides/probe.md` 597–599).

---

### 4. `destroy()` against a hanging language server

`TypeStage` has no child. It holds in-process `typescript.createLanguageService` hosts. `destroy` awaits warming with no timeout, then `dispose()`:

```194:199:/home/user/orkestrel/probe/src/server/stages/TypeStage.ts
	async #destroy(): Promise<void> {
		await this.#typescript.catch(() => undefined)
		for (const service of this.#services.values()) service.dispose()
```

The language-server child is `LintStage` (`spawn(..., [binary, '--lsp'])`, `LintStage.ts` 193–219). Warming sends `initialize` and waits on `#request` with no per-request deadline. `destroy` **does** bound that wait:

```124:140:/home/user/orkestrel/probe/src/server/stages/LintStage.ts
	async #warmed(): Promise<ChildProcessWithoutNullStreams | undefined> {
		const timeout = createTimeout({ ms: this.#deadline })
		timeout.start()
		try {
			return await Promise.race([this.#warmth, this.#expiry(timeout)])
		} catch {
			return this.#child
		}
```

`#deadline` is 2_000 ms (`LintStage.ts` 50). After `#warmed`, `#fail` abandons in-flight requests; `#release` races shutdown/exit against the same 2_000 ms, then `SIGKILL` (`LintStage.ts` 143–160, 147–148). A child that accepts stdin and never answers `initialize` is therefore released on `destroy` after that bound, not held for the life of the host. `initialize` during warm/inspect has no bound of its own except the coordinator race on `inspect` (async wait, so that race can fire).

Coordinator recycle also races `stage.destroy()` against `#deadline` (`Probe.ts` 445–460). `TypeStage.destroy` still cannot interrupt a synchronous language-service call already on the loop.

---

### 5. `#issue` prose door vs a translated door

Same method, two doors. Translated refusal (file-less diagnostic, caller-named project): `ProbeError` with `origin`, `code`, `context`.

```428:434:/home/user/orkestrel/probe/src/server/stages/TypeStage.ts
		if (diagnostic.file === undefined) {
			if (selected) {
				throw new ProbeError(message, {
					origin: 'claimant',
					code: 'refused',
					context: { stage: this.stage, project },
				})
```

Still-prose door (file-less diagnostic, inferred project): `Issue` whose payload is the flattened compiler `message` only.

```436:436:/home/user/orkestrel/probe/src/server/stages/TypeStage.ts
			return { origin: 'instrument', path: project, message }
```

`RuntimeStage.#issue` (`771–796`) also feeds `describeUnknown(error)` into `Issue.message`, always `origin: 'claimant'`.

---

### Unknowns

- `git status --porcelain` before and after: harness refused the command. This lane made no edits.
- Whether the recorded 1783 ms was `resolve`’s `#service` parse, `#configure`’s `getCompilerOptionsDiagnostics`, or the first `#issues` `getSemanticDiagnostics` was not re-measured here.
- `attempt` is imported from `@orkestrel/contract` (outside this tree). Capture of native throws is inferred from `outcome.success` / `outcome.error` at the call site, not from that package’s source.
