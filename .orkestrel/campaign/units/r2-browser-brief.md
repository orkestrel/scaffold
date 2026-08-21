# R2 — browser fix round from the A1 falsification verdicts

## Role and engine

You are the Opus 5 `implementer`, sole writer in `/home/user/test`, from the clean committed
baseline the Orchestrator hands you (R1's core fixes will be committed before you start). Perform
this directly; spawn nothing.

## Objective

Repair the browser findings the falsification round confirmed. Every repair below adopts an
auditor's prescription verbatim; each closes under a mutation or wording check, not a redesign.

## Authority

`/home/user/test/AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `names.md`,
`tests.md`, `browser.md`, `writing.md`. The verdicts:
`/home/user/scaffold/.orkestrel/campaign/units/a1-opus-verdict.md` and `a1-sol-verdict.md`;
reconciliation `/home/user/scaffold/.orkestrel/campaign/reconcile-a1.md`.

## Owned files

- `src/browser/helpers.ts`
- `src/browser/factories.ts`
- `tests/src/browser/helpers.test.ts`
- `tests/src/browser/factories.test.ts`

Off-limits: everything else, `guides/` included — the guide round follows you.

## The repairs

1. **`mount` TSDoc names the wrong defense** (Opus 9). It survives the wrapper test on
   composition — `render` and `rgba` need the returned element where `append` returns void —
   not on an invariant the body neither checks nor enforces. Rewrite the TSDoc to name
   composition; keep the connected-layout consequence as a consequence, not the justification.
2. **`style` TSDoc restates the padded premise with an uncheckable universal** (Opus 24b, quoting
   `helpers.ts:1563-1566`). Cut the spec-argument clause and the "on every engine" claim; keep the
   two checkable sentences — the value is trimmed, internal whitespace is kept.
3. **`typeInput`/`commitInput` dispatch a plain `Event`, never an `InputEvent`** (Opus 16). Add
   that to the absence list the TSDoc already carries at `helpers.ts:921-923`: a component reading
   `inputType` or testing `instanceof InputEvent` sees a plain `Event`.
4. **`readRules`/`readCascade` prose promises `@keyframes` children they never collect** (Opus
   F-4). `CSSKeyframesRule` is not a `CSSGroupingRule`. Say "nested grouping rules included" at
   both sites, name the `@keyframes` children as the exclusion, and point at `findKeyframes` as
   the door.
5. **`readCascade`'s behavior change is unpinned** (Sol 23, Opus 23). The consolidation changed
   insertion order (v0.0.8 popped a stack; the walk is now breadth-first) and widened the answer to
   class tokens declared inside grouping rules. Both are intentional. Pin both with tests: one
   asserting the breadth-first insertion order over a staged sheet with a top-level rule following
   a nested one, one asserting a class declared inside a `@media` block is admitted. Document both
   in the TSDoc as deliberate differences of the consolidation.
6. **`createDragEvent`'s `null` arm is dead** (Opus F-7). `new DragEvent` throws before the
   argument evaluates on any host lacking `DataTransfer`, and the pair ship together. Allocate the
   `DataTransfer` unconditionally, delete the guard and the remark sentence documenting a host that
   does not exist, and simplify the example if the platform's own nullable `dataTransfer` typing
   permits.

## Deviation contract

Stop and report when a repair requires a file outside the owned list or a scoped gate fails
outside your owned files. Wording calls are yours: decide, record, continue.

## Output

`Delivered` (file:line per repair) · `Validation` (exact commands, exit codes) · `Decisions` ·
`Deviations` (or none) · `Flags`.

## Acceptance criteria

1. `npm run check:src:browser` exit 0; root tsc exit 0.
2. `npm run lint:check`, `npm run format:check` exit 0.
3. `npm run test:src:browser` exit 0 with the two new pins collected and passing.
4. `git status` shows changes only in owned files.
5. No banned token, no stated count, no uncheckable universal in any TSDoc you touch.
