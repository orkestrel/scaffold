# Unit R1 — adopt the hardened merge

## Role and engine

`implementer` — Opus 5, native Claude subagent, the **roughnotes** checkout at
`C:\Users\mikes\WebstormProjects\roughnotes`, sole serial writer from the clean committed baseline
`b432653`.

## Objective

Replace this workspace's `mergeOverride` with the hardened version that `@orkestrel/scaffold` now
generates, and prove the behaviours it adds.

## The problem

This workspace's `vite.config.ts` carries the first draft of `mergeOverride`. Scaffold's generator
carried the same draft, and four adversarial audit rounds found defects in it. Scaffold's copy is
fixed and committed; this one is not. A generated `vite.config.ts` is produced at scaffold time and
is **not** restored by `repair`, so nothing will bring the fix here on its own.

The current body:

```ts
export function mergeOverride(base: UserConfig, override?: UserConfig): UserConfig {
	if (override === undefined || 'command' in override) return base
	const merged: UserConfig = mergeConfig(base, override)
	if (merged.plugins === undefined) return merged
	const selected = new Map<unknown, PluginOption>()
	for (const plugin of merged.plugins.flat()) {
		const name: unknown =
			typeof plugin === 'object' && plugin !== null && 'name' in plugin ? plugin.name : plugin
		selected.set(name, plugin)
	}
	return { ...merged, plugins: [...selected.values()] }
}
```

What the audits found in it, each measured rather than reasoned:

- **It flattens one level.** `srcServer({ plugins: [[[{ name: 'orkestrel-output-boundary' }]]] })`
  leaves a nested array the selection treats as an opaque key, and Vite then flattens recursively at
  resolve time, so the duplicate name the selection exists to prevent reaches the resolved
  configuration anyway.
- **It selects over the merged array**, so it deduplicates the caller's own entries as well as
  base-against-override collisions. A developer passing two same-named plugins of their own gets one
  of them, in the other's position, with no diagnostic. `plugins` stops meaning what `plugins` means
  in Vite.
- **The refusal keys on `command` alone.** A `UserConfig` declares `mode` but not `command`, and
  Vitest's invocation record always carries both, so the pair is the honest discriminant and
  `command` alone refuses more than it should.
- **The name test checks presence, not type**, and its promise exclusion would be `instanceof`,
  which misses a structural thenable and a cross-realm promise.

## The shape to adopt

Take it from the source of truth, do not retype it from this brief:
`C:\Users\mikes\WebstormProjects\scaffold\vite.config.ts`, at commit `f83ee063`. Read
`mergeOverride`, `isNamedPlugin`, and the comment block above them, and bring all three across.

Adapt only what this workspace's shape requires. Its factories are `appBrowser`, `appShowcase`,
`journey`, `policy`, `config`, and `conformance`; scaffold's are different, and any comment sentence
naming a scaffold-only factory is adapted rather than copied. The comment's claim that
`tests/config.test.ts` drives every registered factory through the refusal is true here too — this
workspace vendors that file — so verify it against the vendored file before keeping the sentence.

## The proofs

`tests/conformance.test.ts` is this workspace's own file and already proves the merge's current
behaviour. Keep every case that stays true, and add one per behaviour this change adds:

- a nested override entry keeps its nesting and adds no second top-level entry carrying a base name;
- two caller entries sharing a name both survive, in the order written;
- a named override entry still replaces the matching base entry in the base entry's position;
- a base repeating a plugin name keeps its second entry, and one override entry is installed at most
  once;
- an entry whose `name` is not a string is not treated as named;
- a value carrying `command` alone merges normally, and one carrying `command` and `mode` is
  refused.

**Record a red for each.** Mutate the subject — the merge or the predicate — never the assertion.
Name the command and both counts per instrument. Write each mutation as a script under `tmp/units/`
so the red re-runs; the Orchestrator retains them.

`.claude/rules/quality.md` § Instruments governs: an instrument is not evidence until it has failed,
and a case that states its coverage must have the coverage it states.

## Unknowns

- Whether any existing conformance case asserts behaviour this change deliberately reverses. The
  "Vue plugin exactly once" case is the one to read first: under the new rule the Vue plugin still
  appears once, but for a different reason, and its bare-merge control must still fail. If a case
  must change, say which and why rather than editing it quietly.
- Whether this workspace's own wrappers and journey projects change their effective configuration.
  They pass no override carrying plugins today, so they should not. Confirm rather than assume.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- The gate chain is `npm run format:check`, `lint:check`, `check`, `build`, `test`.
- `npm test` runs app, journey across four variants, policy, config, and conformance.
- Bootstrap's Sass deprecations are silenced in `appBrowser`'s own configuration. A deprecation line
  appearing in a build or test run is a regression; there should be none.
- The `npm` shim does not resolve from a spawned child on this host. Spawn Vitest through
  `process.execPath` and `node_modules/vitest/vitest.mjs`.

## Scope

**Owned files:**

- `vite.config.ts` — the merge, the predicate, and their comment only
- `tests/conformance.test.ts`
- New scripts under `tmp/units/`

**Off-limits — do not edit, for any reason:**

- `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` — vendored
- everything under `app/` and `tests/app/`
- `configs/`, `guides/`, `package.json`, `.orkestrel/`, `tmp/authority/`
- every factory in `vite.config.ts` other than the merge and the predicate

**Do not bump a version, and do not publish.** Do not commit or push. Do not install anything. Run
no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. You may undo exactly
your own edit.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes. No `any`, `as`, `!`, or suppression comment in what you add.
4. `mergeOverride` and `isNamedPlugin` match scaffold's committed bodies, with every difference from
   them named and justified in your report.
5. Each behaviour listed under § The proofs has a case, and each case has a recorded red produced by
   mutating the subject.
6. Every red re-runs from a retained script under `tmp/units/`.
7. `npm run test:conformance` passes, with its count.
8. `npm test` exits 0, and `npm run test:journey` is green for all four variants.
9. `npm run build` succeeds, and no Sass deprecation line appears in the build or the test run.

**Observations, not criteria:** the wall-clock durations; whether any wrapper's effective
configuration moved.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a vendored file. Do not weaken an assertion to make a run
green. Do not change what the application paints or builds.

Where a detail is ancillary — a helper's placement, where a comment sentence sits — decide it,
record it, and carry on.

## Output

Write your report to `tmp/units/r1-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **The port** — every difference from scaffold's committed body, and why.
3. **The reds** — command, both counts, and the retained script, per instrument.
4. **The existing cases** — which stayed, which changed, and why.
5. **Observations.**
6. **What you did not close**, and why.

No process diary.
