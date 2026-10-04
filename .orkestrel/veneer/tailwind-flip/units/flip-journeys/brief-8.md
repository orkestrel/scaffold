# Unit flip-journeys-8 — the middle face's documented break and the loaded-run failures

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files.

## Objective

Finish unit U6 from the tree the seventh run left uncommitted (`/home/user/scaffold/tmp/codex/flip-journeys-7-last.md`; the complete report `/home/user/veneer/tmp/units/flip-journeys/seventh-report.md`; the diagnosis `/home/user/veneer/tmp/units/flip-journeys/seventh-diagnosis.md`), under the earlier briefs and the rulings in § Rulings. Done and accepted: the partition (1665 signatures, zero violations at both widths, every control effective, 53 s focused and 67 s in the full run), the statechart rows, the 23 triples, the header reading, `check`, `lint:check`, `format:check`, `test:setup:browser` (134), `test:app:browser` (234), the builds. Open: six journey failures and the budget.

## Rulings

1. **The middle face's collapsed panels are the documented break, not a failure.** Under `unexcluded`, Tailwind's `.collapse { visibility: collapse }` in its `utilities` layer beats Bootstrap's `.collapse` in the `bootstrap` layer, so every shown collapse panel (`#navbar-open-menu`, `#accordion-default-shipping`, `#collapse-shown-panel`) reads `visibility: collapse` with empty `innerText`; that is R1 without the layer, the departure the face exists to show, and the specimen row 6 already reads `visible / collapse / visible`. The paired engine states case therefore asserts the engine's output (inline `style`, `data-popper-placement`, `data-bs-popper`, the class tokens the engine writes, body `style`) equal over the three faces, reads the panel sentence and visibility under `bootstrap` and `tailwindcss` only, and under `unexcluded` asserts `visibility: collapse` on each shown collapse panel as the documented departure (a planted exclusion of `collapse` from the `unexcluded` compile would turn it `visible` and fail the case: state whether that control is cheap enough to keep; drop it with the reason if not). Retitle the case in the copy document's § 8 shape so the title names the three faces and the documented departure.
2. **Load-sensitive cases get one repeat, no retry in code.** Run the full `npm run test:journey` twice after ruling 1. A case that fails in one run and passes in the other (J8's toast `opacity: 0` under `.toast.showing`, the light-1280 popover `Billing status description is shown`, the dark-390 collapse enter burst) is reported as load-sensitive with both readings and the case's own timing; a case that fails in both runs is reported with its reading and its diagnosis. No timeout is raised, no retry is added, no case is deleted.
3. **The accordion (light-390, motion=false) and tooltip (dark-390, motion=true) failures** sit in the engine section's observers (`actOnDisclosureControl`, the refusal recorder), which this lane does not write. Report both with the trace readings the seventh run took and whether each reproduces in both full runs; the Orchestrator reads the pre-flip base on this host afterwards and rules host-bound or flip-induced.
4. **The budget** is reported, not met: the three-face journey (nine face rows, six pair rows, 23 readings under three faces, the partition) is more work than the 235 s journey it replaces; report both full-run wall times, the partition's share, and the longest ten cases with their seconds, for the Orchestrator's ruling.

## Acceptance criteria

`npm run check`; `npm run lint:check`; `npm run format:check`; `npm run test:setup:browser`; `npm run build`; `npm run build:showcase` (digest reported); `npm run test:journey` twice (every failing title per run with its classification under rulings 2 and 3; no failure outside those classes); `npm run test:app:browser`; `git diff --check`; `sha256sum dist/src/bootstrap/index.css` at `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.

## Scope

As the earlier briefs. Nothing committed.

## Return shape

Finding first: both journey runs' results and wall times, every failing title with its class, the retitled case and its control decision, the longest ten cases; the acceptance exits; `git status --porcelain`.

## Deviation contract

As the earlier briefs; a failure outside rulings 2 and 3 after ruling 1 is a stop with its reading.
