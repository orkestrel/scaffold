# Unit showcase-proofs-3 — the proofs, with claim 11 corrected

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\veneer-wt-page`, branch `showcase-proofs` at `7593cfe`. Commit once at the end; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Objective

Do the unit `tmp/codex/showcase-proofs-brief.md` describes (it governs except where this brief rules otherwise), after reading the two stopped runs' reports (`tmp/codex/showcase-proofs-run1.md` and `tmp/codex/showcase-proofs-report.md`).

## Rulings

- **Claim 11, tab, pill, and list.** Bootstrap's Tab plugin gives inactive siblings `tabindex="-1"` at boot and its arrow navigation skips disabled siblings (`src/browser/Tab.ts:61`, `:203`, as Bootstrap's `tab.js` does), so a disabled tab, pill, or list trigger is not keyboard-reachable in Bootstrap either. Their refusal rows activate the `.disabled` trigger with a real pointer click and read the state unchanged; each row must fail when that family's `restricted: true` is removed. The other six families (alert, toast, modal, and offcanvas dismiss; offcanvas toggle; dropdown toggle) keep keyboard rows. Record the Bootstrap reference in the report.
- **The page unit's focusability assertion.** `tests/app/browser/factories.test.ts` asserts `tabIndex === 0` on the mounted specimens before the engine boots. Move that assertion after boot for the six keyboard families, and for tab, pill, and list assert the post-boot roving `tabindex` Bootstrap writes. This file joins your ownership for that change.
- **Your authority.** Where a carried item's premise conflicts with Bootstrap 5.3.8's own behavior (verify against `node_modules/bootstrap/js/src/` or the oracle), follow Bootstrap, adapt the proof to prove the same property, and record the case in the report. Stop only for a defect you cannot repair inside your ownership without changing engine source (`src/`), a public type, or the page's markup.

## Output

Write the report to `tmp/codex/showcase-proofs-3-report.md` and return it as your final message, in the first brief's output shape, plus a table of every premise you adapted under § Your authority with its Bootstrap reference. No process diary.

## Deviation contract

Stop only under § Your authority's stop condition, and then report: expected, found, evidence, done or not done, and one hypothesis.
