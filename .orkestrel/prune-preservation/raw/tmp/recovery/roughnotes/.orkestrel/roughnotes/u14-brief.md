# Unit 14 — the refused read

## Role and engine

`implementer` — Opus 5, native Claude subagent, this checkout, sole serial writer from the clean
committed baseline the Orchestrator names at launch.

## Objective

Stop a storage read that a browser refuses from escaping out of `createApplication`, so the
application still constructs and paints when the host holds storage behind a permission.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md`, then `tmp/authority/rules/browser.md`, `rules/typescript.md`,
   `rules/tests.md`, `rules/quality.md`, `rules/writing.md`.
2. `.orkestrel/roughnotes/u12-report.md` § 6 — the finding this unit closes, and § 4 for the write
   boundary it must match.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## The defect

Unit 12 closed the refused **write** and recorded the refused **read** as a different door it did not
own:

```ts
// app/browser/helpers.ts
export function readTheme(storage: Storage, key: string): boolean {
	return storage.getItem(key) === THEME_DARK
}
```

`ApplicationController`'s constructor calls it directly. A browser that holds storage behind a
permission — Safari with cookies blocked, a sandboxed frame, a hardened privacy mode — throws from
`getItem`, and that refusal escapes out of `createApplication`.

This is worse than the write case unit 12 closed. A refused write cost a remembered preference; a
refused read costs the whole application, because it throws before the controller exists and nothing
renders at all.

Close it at the same boundary shape unit 12 established for the write: one place the color mode
reaches the store, which catches the refusal and answers with the honest default. Read
`rememberTheme` first and match it — one concept keeps one term, and two boundaries that behave
differently at the same store are worse than one.

The default when a read is refused is the light mode, which is what a reader with no stored
preference already gets.

## Unknowns

- Whether `readStorage()` itself can throw. It reads `typeof localStorage`, and in some hardened
  hosts merely *accessing* the `localStorage` property throws rather than returning it. Establish
  what this codebase's call actually does and whether that door needs the same treatment; say what
  you found either way.
- Whether any other unguarded `getItem`, `setItem`, or `removeItem` call reaches a real store. Sweep
  `app/` and report what you found.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- `tests/app/browser/setup.ts` already carries `QuotaStorage`, a real `Storage` that refuses writes.
  A refusing **read** needs its own inert configurable implementation of the published interface —
  real, not a mock or a module replacement.
- `app/browser/MemoryStorage.ts` is the existing real in-memory store to model one on.
- Bootstrap emits 329 Sass deprecation warnings from its own imports. Standing condition.

## Scope

**Owned files:**

- `app/browser/helpers.ts`
- `app/browser/controllers/ApplicationController.ts` — only if the boundary must move
- `tests/app/browser/helpers.test.ts`
- `tests/app/browser/controllers/ApplicationController.test.ts`
- `tests/app/browser/setup.ts` — only to add the refusing-read store beside `QuotaStorage`

**Off-limits — do not edit, for any reason:** every view component and its test, `app/core/`,
`app/browser/styles/`, `app/browser/types.ts`, `app/browser/constants.ts`,
`tests/app/browser/integration.test.ts`, `guides/README.md`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `vite.config.ts`, `package.json`, `.orkestrel/`, `tmp/authority/`.

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes. No `any`, `as`, `!`, or suppression comment.
4. `createApplication` constructs, and the surface paints, over a real `Storage` whose `getItem`
   throws. **Record the proof failing first** against the current code — name the command and both
   counts.
5. The refused read answers with the light default, and a later successful write still persists.
6. The read boundary and the write boundary behave the same way at the same store, and share their
   vocabulary. Say in your report how they match.
7. Your sweep of every other store call in `app/` is reported, with what you found and what you did
   about each.
8. `npm run test:app:browser` passes.
9. `npm run test:journey` is green for all four projects.
10. `npm test` exits 0.

**Observations, not criteria:** the wall-clock durations; whether `readStorage()` can itself throw.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not use a mock, a module replacement, or a framework spy — the store
is a real implementation of the published interface. Do not change what the application paints.

Where a detail is ancillary — a helper name among equals, where a TSDoc sentence sits — decide it,
record it, and carry on.

## Output

Write your report to `tmp/units/u14-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **The boundary** — what you changed, and how the read and write doors match.
3. **The failing proof** — command, red count, green count.
4. **The sweep** — every store call in `app/`, and its state.
5. **Observations**, including what `readStorage()` does in a hardened host.
6. **What you did not close**, and why.

No process diary.
