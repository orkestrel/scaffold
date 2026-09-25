# Unit E-ID-MOTION-COLLAPSE round 2 — the chevron is proved through its running transition, and the prose says what the case measures

Successor to `e-id-motion-collapse-brief-2.md`, which stays in place unedited and still binds except where this brief
overrides it. What changed: round 1 (`9e1fe4e` on `unit/mcol`) was audited in `mcol-audit-verdict.md` (FAIL 3, 6, 7;
F1 to F3; R1). This round carries those findings and nothing else. Claim 1 was the Orchestrator's wording, and its change
holds.

## Role and engine

`opus` on Opus 5.5, the same sole writer in `/home/user/veneer-mcol` (branch `unit/mcol` at `9e1fe4e`), resumed. Read
`mcol-audit-verdict.md`, `mcol-audit-objective-verdict.md` (claims 3, 6, and 7), and `mcol-audit-subjective-verdict.md`
(claim 6, F1 to F3, and R1 to R3), all under `/home/user/scaffold/.orkestrel/veneer/units/`. The Law, Host, Tools, and
Deviation contract of the earlier briefs bind unchanged.

## Objective

The chevron case reads the running `::after` transition in each direction, its timing, its start, midpoint, and end
frames, through a `sampleTransition` that takes a pseudo-element; a frozen turn fails it; and every sentence and comment
the audit named states what the code and the case do.

## Scope, added to the earlier briefs'

**Owned, added.** In `tests/setupBrowser.ts`, the `sampleTransition` function and its doc block only; in
`tests/setupBrowser.test.ts`, the `describe('sampleTransition')` cases. Both files are shared with the engine session,
which lands J-MOTION-RECORDER in them later; return the exact hunk of each in the report, and the Orchestrator sends it
to the engine session before the landing. Every other line of both files stays off-limits.

## Items

1. **The reader (claims 3 and 7, R1).** Apply your round-1 patch: `sampleTransition(element, property, pseudo?)` reads
   `element.getAnimations({ subtree: pseudo !== undefined })`, keeps the `CSSTransition` whose effect targets `element`
   with `pseudoElement` equal to `pseudo` (or `null` when it is omitted), and reads its frames with
   `readStyle(element, property, pseudo)`. Update the doc block: the `@param pseudo` line, and the `@throws` line and the
   `requireValue` guard the filter makes unreachable (keep the doc block true of what the function throws). Add a
   `setup:browser` case in `describe('sampleTransition')` that samples a `::after` transition with the parameter and
   reads `undefined` for the same transition without it, and keep the existing cases green.
2. **The chevron case (claims 3 and 7).** In each direction (a button taking the `collapsed` class and a button losing
   it), read the running `transform` through `sampleTransition(button, 'transform', '::after')`: its duration and easing
   equal the resolved `--vn-motion-feedback` and `--vn-ease-standard`, its start frame is the frame it leaves, its
   midpoint frame differs from both endpoints, and the button's settled frame is `matrix(-1, 0, 0, -1, 0, 0)` expanded
   and `none` collapsed. Keep the doubled-factor ratio and the zero-factor and reduced-motion readings.
3. **Plants.** Add to a successor script `tmp/units/mcol-plants-2.mjs`, each logged to `tmp/units/mcol-plant-<name>.log.txt`
   and restored byte-identically: **`chevron-frozen`**, the chevron's transition written with `steps(1, end)` as its
   easing, which fails the midpoint reading; **`reader-pseudo`**, the `pseudoElement` filter removed from
   `sampleTransition`, which fails the new `setup:browser` case. Re-run the round-1 plants too.
4. **Claim 6, the guide.** In § Accordion classes, state that the chevron turns its `transform` between `none` and the
   release's own `rotate(-180deg)` over `--vn-motion-feedback` on `--vn-ease-standard`, and rewrite the chevron proof
   sentences to name the readings Item 2's case takes. In § Collapse classes, rewrite the departure bullet so it names the
   difference a consumer sees from the release's `ease`: the panel curve starts at speed rather than easing in (read the
   curve's control points before writing it).
5. **F1 to F3.** In `_accordion.scss`, the header names the chevron timing among the values that depart from the release,
   and the chevron comment states both directions. In `_collapse.scss`, the comment says the engine writes inline the
   size an opening panel grows to and clears it so a closing panel shrinks to this rule's zero. In `fade.test.ts`,
   replace `expect(closing?.[0]).toBe('height')` with `expect(closing).not.toEqual(fading)` and keep the comment; the
   `fade-order` plant must still fail the case.
6. **The report.** State, per case, what it drives and what it reads.

## Execution

Perform the assignment directly and spawn nothing. Write Items 1 and 2's cases first and run them red on the round-1 tree
(the reader without the parameter, the chevron case reading a running transition), then Items 1 to 6, then every
Acceptance gate, logged under `tmp/units/` with the `-2` suffix.

## Output

Write `tmp/units/mcol-report-2.md` and return the same text: the red and green readings with commands and counts; the
case coverage table; the plant table (every plant); the two shared-file hunks; the guide and comment sentences as
written; the gate table; `tmp/units/mcol-2.diff` (`git diff 9e1fe4e`) and `tmp/units/mcol-2-status.txt`. State no count
in prose.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files.
2. Each plant fails a case with an `AssertionError`, per its log, and restores identically.
3. `npm run test:setup`, `npx vitest run --config vite.config.ts --no-cache --project setup:browser
   tests/setupBrowser.test.ts`, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0;
   after `npm run build:src`, the `Collapse` engine proofs and `npm run test:app` exit 0.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on Opus
5.5 on a successor claims file.
