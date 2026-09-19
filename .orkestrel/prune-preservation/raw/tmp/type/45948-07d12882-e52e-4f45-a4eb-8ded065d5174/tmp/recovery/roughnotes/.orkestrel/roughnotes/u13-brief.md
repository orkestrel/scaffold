# Unit 13 — compose the browser config factories

## Role and engine

`implementer` — Opus 5, native Claude subagent, this checkout, sole serial writer from the clean
committed baseline the Orchestrator names at launch.

## Objective

Replace the private boolean-toggled `applicationBrowser` helper with two composable exported
factories: `appBrowser`, which takes an optional override, and `appShowcase`, which builds on
`appBrowser` and overrides only what a showcase needs.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md` — § Design laws, particularly "Export and test reusable logic. No hidden
   module helpers or declarations", "No superfluous wrappers", and "Boolean behavior".
2. `tmp/authority/rules/workspace.md` — the test project matrix and the config wrapper contract.
3. `tmp/authority/rules/typescript.md`, `rules/names.md`, `rules/tests.md`, `rules/writing.md`.
4. `guides/scaffold.md` § the `SHOWCASE_CONFIG_PATH` and `SHOWCASE_DEV_DEPENDENCIES` rows, and the
   passages naming what makes a workspace a showcase workspace.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## The defect

`vite.config.ts` declares a module-private helper:

```ts
function applicationBrowser(showcase: boolean): UserConfig {
	const output = showcase ? 'dist/showcase' : 'dist/app/browser'
	return { … }
}

export function appBrowser(): UserConfig {
	return applicationBrowser(false)
}
```

Three things are wrong with it, each measured:

- **The helper is hidden.** `AGENTS.md` § Design laws requires reusable logic to be exported and
  tested, not held in a module-private helper. This one carries the whole browser configuration.
- **The `true` branch has no caller.** `grep` over the tree finds `applicationBrowser(false)` twice
  and `applicationBrowser(true)` never. There is no `appShowcase`, no
  `configs/app/vite.showcase.config.ts`, and no showcase script in `package.json`. `dist/showcase` is
  never built, so the branch is dead code reachable only by editing the file.
- **`appBrowser` takes no override**, so a caller that needs one value changed must copy the whole
  configuration or reach for the private helper it cannot import.

## The shape to build

```ts
export function appBrowser(override?: UserConfig): UserConfig
export function appShowcase(override?: UserConfig): UserConfig
```

- `appBrowser` returns the browser configuration, merged with `override` when one is given.
- `appShowcase` calls `appBrowser` with the showcase output directory and merges the caller's
  `override` on top, so a showcase is the browser configuration plus what a showcase changes and
  nothing is restated.
- `applicationBrowser` is gone. Both `configs/app/vite.browser.config.ts` and the `journey` factory
  call `appBrowser()`.
- Merge with Vite's own `mergeConfig`, which `vite` already publishes — do not hand-roll a deep
  merge, and do not shallow-spread a nested configuration.

Keep both factories' return type `UserConfig`, keep every existing value the browser configuration
carries, and keep `journey`'s behaviour identical — it currently spreads the browser config and
replaces the `test` block, and it must still produce the same project.

**`appShowcase` has no caller today, and that is expected.** It is not speculation: the capability
exists in the tree right now, hidden behind the boolean, and this unit is converting a hidden
capability into a named one. Say so in your report, and state plainly what a workspace would add to
use it — the `configs/app/vite.showcase.config.ts` wrapper whose presence, per `guides/scaffold.md`,
is what makes a workspace a showcase workspace.

## Unknowns

- Whether `mergeConfig`'s array-concatenation semantics are right for `plugins` here, or whether a
  caller overriding `plugins` should replace rather than append. Establish what `mergeConfig`
  actually does with the fields this configuration carries, and say so. A merge that silently
  duplicates the Vue plugin would be a defect.
- Whether `tests/config.test.ts` constrains the exported factory names or only the project labels.
  Read it before you change a signature.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- `tests/config.test.ts` asserts every declared project's include and setup files, reads `exclude` as
  a first-class field, tolerates extra project labels, and requires every entry in `projects` to be a
  function. It also has a control that converts one entry to an inline configuration and must fail.
- `npm run build` builds the browser app through `configs/app/vite.browser.config.ts`.
- Bootstrap emits 329 Sass deprecation warnings from its own imports. Standing condition.

## Scope

**Owned files:**

- `vite.config.ts`
- `configs/app/vite.browser.config.ts` — only if the call must change
- `tests/config.test.ts` — only if a factory rename requires it, and only additively; read the
  off-limits note below first

**Off-limits — do not edit, for any reason:** everything under `app/` and `tests/app/`,
`guides/README.md`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package.json`, `.orkestrel/`,
`tmp/authority/`.

`tests/config.test.ts` is scaffold-shaped. Prefer a change that needs no edit to it at all. If you
believe one is required, stop and report rather than editing it.

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. `applicationBrowser` does not exist. No module-private function carries the browser configuration.
5. `appBrowser(override?)` and `appShowcase(override?)` are exported, and `appShowcase` is built from
   `appBrowser` rather than restating it.
6. A test proves the override reaches the returned configuration and that `appShowcase` differs from
   `appBrowser` only where a showcase differs. **Record it failing first** against a signature that
   ignores its override — name the command and both counts.
7. The Vue plugin appears exactly once in every configuration these factories return, including when
   a caller passes an override carrying plugins. Prove it.
8. `npm run build` succeeds and still writes `dist/app/browser`.
9. `npm test` exits 0, with `tests/config.test.ts` unedited.
10. `npm run test:journey` is green for all four projects, proving `journey` still produces the same
    project.

**Observations, not criteria:** what `mergeConfig` does with each field; the wall-clock durations.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit `tests/config.test.ts` — stop and report if you believe you
must. Do not add a showcase wrapper, a showcase script, or a showcase dependency; this unit changes
the factory shape only.

Where a detail is ancillary — a parameter name among equals, where a TSDoc sentence sits — decide it,
record it, and carry on.

## Output

Write your report to `tmp/units/u13-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **The shape** — both signatures, and how `appShowcase` composes on `appBrowser`.
3. **The merge** — what `mergeConfig` does with each field this configuration carries, and the plugin
   proof.
4. **The failing proof** — command, red count, green count.
5. **`appShowcase`'s consumer** — that it has none today, and exactly what a workspace adds to use it.
6. **Observations.**
7. **What you did not close**, and why.

No process diary.
