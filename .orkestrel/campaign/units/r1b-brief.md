# R1b — close the A2 verdicts on the core fix round

## Role and engine

You are the Sol implementer (GPT-5.6 Sol), `codex exec` `workspace-write`, rooted at
`/home/user/test`, sole writer from the clean committed baseline at `5e90bbe`. Perform this
directly; spawn nothing. The sandbox denies network and mounts `.git` read-only.

## Objective

Close the focused audit's broken claims on R1 — your engine's fix round — with the construction the
Orchestrator has probed, and add the regression the audit demanded.

## Authority

`/home/user/test/AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `names.md`,
`tests.md`, `patterns.md`. The audit verdict is
`/home/user/scaffold/.orkestrel/campaign/units/a2-verdict.md`; read it first.

## Probed facts — measured by the Orchestrator with controls; build on them, do not re-derive

- The tuple-annotated `Object.fromEntries` construction fails honestly at the return (TS2322), so
  the fromEntries route is closed for good.
- Writing through `Partial` of the readonly map is refused at a concrete union (TS2540): the
  current generic form compiles only through deferred checking. It must go.
- The honest shape compiles at generic and concrete instantiations, with inference intact and both
  negative controls failing where planted:

  ```ts
  const building: { -readonly [K in TName]?: RecorderInterface<TMap[TName]> } = {}
  for (const event of events) {
  	const recorder = createRecorder<TMap[TName]>()
  	source.on(event, recorder.handler)
  	building[event] = recorder
  }
  if (!isRecorderMapComplete<TMap, TName>(building, events)) {
  	throw new Error('Emitter recorder map is incomplete')
  }
  return building
  ```

  The uniform value type makes the write legal; per-key precision is the guard's claim.

## Owned files

- `src/core/factories.ts`
- `src/core/validators.ts`
- `tests/src/core/validators.test.ts` — new, per the mirror rule
- `tests/src/core/factories.test.ts`

Off-limits: everything else, `guides/` included (R4 owns the guide obligations).

## The work

1. **Adopt the probed construction** in `createRecorders`, verbatim in shape.
2. **Reshape the guard to a validated boundary over `unknown`**:
   `isRecorderMapComplete<TMap, TName>(value: unknown, events: readonly TName[]): value is RecorderMap<TMap, TName>`.
   It performs real per-key structural checks — for every listed event: an own property holding an
   object whose `handler` is a function and whose `calls` is an array — inside the existing
   try/catch totality, refusing hostile values with `false`. Document in its TSDoc that per-key
   tuple precision is the predicate's claim, proven by the factory's pairing (each recorder is
   wired to exactly the event it is stored under) and owned by a direct caller the same way.
   The second parameter deviates from the canonical single-argument guard row in
   `.claude/rules/patterns.md`; the Orchestrator has ruled the placement stands and records the
   rules finding — note the deviation in the TSDoc with one sentence, no apology.
3. **Move the guard's proofs** into the new `tests/src/core/validators.test.ts`, extending them to
   the structural refusals (a map whose member lacks `handler`, a hostile proxy, a primitive).
   `describe('createRecorders')` keeps only factory behavior.
4. **Add `@throws` to `createRecorders`**: `Thrown when a listed event has no recorder, which a
   well-formed events array cannot produce.` — matching the package's fixed form.
5. **Split the keying-limit TSDoc sentence** (audit claim 5's language ruling): state the
   condition (an array declared with a wider union than its contents), the observable consequence
   (the omitted key reads `undefined` at runtime under a non-optional type, and the guard reports
   `true` because it checks the listed events), and the remedy (pass a literal array or a tuple),
   as separate sentences with the component as subject.
6. **Add the scoped-exit regressions the audit's F3 demands**, using its own instrument: build the
   lifetime with `createSignal()` and pass `lifetime.signal` as the scope; assert `lifetime.count`
   reads 1 after the scoped add, and 0 again after (a) manual removal of the original callback and
   (b) a one-shot delivery — proving `registration[3]?.abort()` runs on both paths.

## Deviation contract

Stop and report when the probed construction fails to typecheck anywhere, or a repair needs an
unowned file. Ancillary wording is yours: decide, record, continue.

## Output

`Delivered` · `Validation` (exact commands, exit codes — include `npm run test:policy`, which must
see the new mirrored file) · `Controls` (which negative controls you ran and where they failed) ·
`Decisions` · `Deviations` (or none) · `Flags`.

## Acceptance criteria

1. All four tsc projects exit 0.
2. `npm run lint:check`, `npm run format:check` exit 0.
3. `npm run test:src:core` exit 0 with the new validators file collected; `npm run test:policy`
   exit 0.
4. `git status` shows changes only in owned files.
5. No `as`, `!`, `any`, `@ts-` directive; no `Partial` accumulator and no `Object.fromEntries` in
   `createRecorders`; no stated count in prose.
