# R1 — core fix round from the A1 falsification verdicts

## Role and engine

You are the Sol implementer (GPT-5.6 Sol) inside a `codex exec` `workspace-write` sandbox rooted at
`/home/user/test`. Sole writer, clean committed baseline at `ae1b7aa`. Perform this directly;
spawn nothing. The sandbox denies network and mounts `.git` read-only: no git command that writes.

## Objective

Repair the five core findings the falsification round confirmed, exactly as specified.

## Authority

`/home/user/test/AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `names.md`,
`tests.md`. Voice: match the existing TSDoc. Skill: none.

## Context

- The audit reconciliation is `/home/user/scaffold/.orkestrel/campaign/reconcile-a1.md`; the two
  verdicts are `/home/user/scaffold/tmp/codex/a1-sol-last.md` (your engine's) and the reviewer's
  findings quoted below where you need them. Your engine wrote U1, whose defects these are.
- Scoped validation available: `npm run check:src:core`, `npx tsc --noEmit -p configs/src/tsconfig.server.json`,
  `npx tsc --noEmit -p configs/src/tsconfig.browser.json`, `npx tsc --noEmit -p tsconfig.json`,
  `npm run test:src:core`, `npm run lint:check`, `npm run format:check`. No tree-wide mutating
  command; format only your owned files if needed.

## Owned files

- `src/core/types.ts`
- `src/core/factories.ts`
- `src/core/validators.ts` — new kind file
- `src/core/index.ts` — add the one barrel row for `validators.js`
- `tests/src/core/factories.test.ts`

Off-limits: everything else, including `src/core/helpers.ts`, `guides/`, every browser and server
file, `package.json`, and the vendored test set.

## The findings and their required repairs

### 1. `createRecorders` construction launders `any` — restore the guard-narrow shape

Proven: the `Object.fromEntries(entries)` call matches the permissive `any`-returning overload
(annotating its result as `number` compiles), so the declared return is asserted, not checked.

Replace the construction with the accumulate-and-narrow shape:

- Build into `const recorders: Partial<RecorderMap<TMap, TName>> = {}` inside a `for…of` over
  `events`, wiring each recorder onto the source as now.
- Narrow with a guard exported from the new `src/core/validators.ts`: it takes the partial map and
  the events list and narrows to the total `RecorderMap<TMap, TName>` when every listed event has a
  defined recorder. Its name is yours under `.claude/rules/names.md` — name the condition it
  checks; `is*` fits a guard, and the file's kind admits only guards.
- When the guard refuses — unreachable through this factory, reachable for a direct caller — throw
  `Error('Emitter recorder map is incomplete')`.
- The guard is a public export: add the `validators.js` row to `src/core/index.ts` and TSDoc it as
  the narrowing companion a consumer building its own partial map uses.
- Prove the laundering is gone with a negative control in the test file: a `// @ts-expect-error`
  is banned, so instead assert the honest path structurally — the factory's internal construction
  must contain no `Object.fromEntries` call (add a source-reading test only if the suite already
  has that idiom; otherwise rely on the compile control below).
- Compile control, mandatory: a type-level test in `tests/src/core/factories.test.ts` proving the
  returned map's per-key tuple types are exact — read `recorders.ready.calls[0]` into an annotated
  binding of the precise tuple type; a laundered `any` would let a deliberately wrong annotation
  compile, so also include one assignment whose wrongness the suite proves by `expect` on the
  VALUE, and record in a comment why the pair binds.
- Document the keying limit on the factory TSDoc (reviewer finding, adopted): the type argument
  `TName` derives from the array's element type, so an array declared with a wider union than its
  contents yields a map whose type promises keys the runtime map does not carry; a caller passes a
  literal array or a tuple to keep the promise exact.

### 2. `createSignal` desynchronizes under an options-signal-scoped registration

Proven red by this probe (promote it, verbatim in substance, into `tests/src/core/factories.test.ts`):

```ts
const instrument = createSignal()
const lifetime = new AbortController()
const listener = () => {}
instrument.signal.addEventListener('abort', listener, { signal: lifetime.signal })
// count is 1 here
lifetime.abort()
// count must be 0; today it stays 1
```

Repair: when the registration options carry a `signal`, subscribe once to that signal's own
`abort` and splice the registration when it fires — and when the scoping signal is already aborted,
the platform installs nothing, so record nothing. Keep the existing dedupe and once semantics; the
unscoped control from the probe must stay green.

### 3. Hostile-value membership — one member per failure class

Adopt the reviewer's prescription verbatim: `Array.isArray` throws on a revoked proxy before
consulting the target, so the revoked array is indistinguishable from the revoked object and its
arrayness is unobservable. Replace the revoked-array member with a live array-target proxy whose
`get` trap throws — `Array.isArray` reports it `true`, and it is hostile on index read, a class the
set does not otherwise carry. Give every member a one-line failure-class note in the factory's
`@remarks`, and reword the factory's universal to match what is true: every member throws on a
naive read or violates a naive structural assumption. Update the affected tests.

### 4. `HeadersSource` remark overclaims

`src/core/types.ts:188-191` says the derived type "resolves identically in every project". It
resolves in every project against that project's own `Headers` declaration, which is the point —
reword to say that, dropping "identically".

### 5. The inference property is under no gate

Promote the campaign instruments into compiled proofs in `tests/src/core/factories.test.ts`: one
case calling `createRecorders` through an `EventSourceInterface<TMap>`-typed reference with no type
arguments and asserting the exact per-key tuple types back; the existing explicit-argument calls
stay as the concrete-class control. The instruments to draw from are
`/home/user/scaffold/.orkestrel/campaign/units/u4-instruments/inferGood.ts` and `inferBad.ts`.

## Deviation contract

Stop and report when the guard-narrow construction fails to typecheck under any project, when a
repair requires a file outside the owned list, or when a scoped gate fails outside your owned
files. Ancillary calls (guard name, test names, remark wording) are yours: decide, record, continue.

## Output

`Delivered` (file:line per repair) · `Validation` (exact commands, exit codes) · `Controls` (the
laundering control and the desync regression, red-before evidence quoted) · `Decisions` ·
`Deviations` (or none) · `Flags`.

## Acceptance criteria

1. `npm run check:src:core` exit 0; server, browser, and root projects exit 0.
2. `npm run lint:check` and `npm run format:check` exit 0.
3. `npm run test:src:core` exit 0, with the promoted desync regression and the compile controls
   collected and passing.
4. `git status` shows changes only in owned files.
5. No `as`, no `!`, no `any`, no `@ts-` directive, no dependency, no stated count in prose.
