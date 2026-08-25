# Unit VISIT-brief — report

## Advisory as taken

`npx --no-install scaffold audit`, run first, reported:

```
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add
tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert,
so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

plus the 48-path manifest drift table (docs/orchestration groups, all already stale or foreign
before this dispatch). The `dependencies` advisory is fleet-wide and out of scope per the brief.
One module was reported under `setup:`: `tests/setup.ts`.

## Proof file

`tests/setup.test.ts` — 27 cases across 9 `describe` blocks, one per behavioral contract the
consuming suites (`tests/src/core/**`, `tests/policy.test.ts`, `tests/config.test.ts`) rely on:

- **task and manifest fixtures** — `buildTask` returns the fixed `refactor`/`code` task the
  suites key assertions on; `buildManifest` returns four disjoint, populated partitions.
- **buildBrief and buildReadyInput** — `buildBrief` composes from `buildTask`/`buildManifest`;
  an override replaces only the named section; `buildReadyInput` mirrors `buildBrief`'s fields.
- **FIRST_RULE and CAPTURED_RULE** — frozen, opposite-conclusion rule results.
- **interpret fixtures** — `buildInterpret` registers a template when `matched` and raises an
  ambiguity when not; `buildFailingInterpret` throws only from `interpret` and delegates every
  other member to a real engine; `buildForeignInterpret` carries the given value on a computed
  entity and forces the required ambiguity.
- **AccessorInterpretation and its engines** — every member is a prototype getter (`Object.keys`
  reports none own); `buildAccessorInterpret` returns that instance from a real engine.
- **ShiftingAccessorInterpretation and ShiftingForeignInterpretation** — each shifts to a second
  reading on the second access; the foreign variant carries a fixed function-valued entity across
  shifts; `buildShiftingInterpret` returns a fresh instance (fresh counters) per call.
- **buildAdversarialValues** — includes a self-referential object and a null-prototype hostile
  record, plus the nullish/numeric-edge/collection vocabulary a total guard must refuse.
- **readErrorCode and readErrorContext** — read `code`/`context` from a real `BriefError`, and
  return `undefined` for a non-`BriefError` value.
- **reason fixtures** — `buildPermissiveEvaluator` reports every check met, singly and batched;
  `buildCountingReason` answers each member differently after its first read while
  `buildStableReason` freezes the first answer; `buildShiftingReason`'s `ShiftingLogicalResult`
  turns `conclusion` true only on the third read and carries a fixed function-valued `leaf`;
  `buildSilentReason` refuses through `conclusion` alone with no failing rule;
  `readConclusion` returns `undefined` for a non-logical `ReasonResult`.
- **buildInheritedActions** — resolves an inherited key through the prototype while owning none.

Each subject fixture that wraps a real `@orkestrel/interpret` or `@orkestrel/reason` engine is
driven through that real engine (`createInterpret`, `createReason`), never replaced; expected
values are derived independently (literal expectations, `briefToSubject`/`gateDefinition` real
composition) rather than by re-reading the fixture's own output.

## Mutation control

One control, mutating `tests/setup.test.ts` line 39 from
`expect(task.operation).toBe('refactor')` to `expect(task.operation).toBe('migrate')`, run through
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`. Failing line:

```
tests/setup.test.ts:39:26
Expected: "migrate"
Received: "refactor"
```

Restored to `toBe('refactor')` and reconfirmed 27/27 green.

## Retained differing values

`repair --groups manifest` wrote `test:setup` (`vitest run --config vite.config.ts --no-cache
--reporter=dot --project setup`) with no other manifest-group script retained differing. The `test`
chain was adopted through `npm pkg set` to
`npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run
test:guides`, placing `test:setup` between `test:config` and `test:guides` per the planned order.
`test:guides` already carried `--no-cache`; no change was needed there. The full `repair` then
wrote `vite.config.ts` (added the `setup` project, `include: ['tests/setup*.test.ts']`) and 48
vendored orchestration/docs files (`CLAUDE.md`, `.agents/**`, `.claude/agents/**`,
`.claude/rules/documentation.md`, `.codex/agents/**`) back to plan; no manifest script value was
retained differing beyond the two adoptions above. `npm run format` reformatted one file
(`tests/setup.test.ts`) with no semantic change.

## Gates, each read bare

```
npm run format:check → All matched files use the correct format. (151 files)
npm run lint:check   → clean exit, no diagnostics
npm run check        → clean exit (tsconfig.json, then configs/src/tsconfig.core.json)
npm run build        → build:src:core succeeded, dist/src/core/index.{js,cjs,d.ts,d.cts} written
npm test             → test:src 282/282, test:policy 93/93, test:config 46/46,
                        test:setup 27/27, test:guides 18/18 — all passed
```

`npx --no-install scaffold audit` re-run after the visit reports no `setup:` advisory; only the
out-of-scope `dependencies: typescript declares major 6` line and the seven foreign
`orkestrel-human-journey`/`.claude/agents/codex.md`/`.codex/agents/claude.toml` paths remain,
left alone per the brief's standing conditions.

## Deviations

None. The brief's standing-condition correction (clean tree at dispatch, not dirty from the
re-pin) held: `git status` was clean before this unit's edits.
