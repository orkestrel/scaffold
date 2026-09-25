# Unit J-MOTION-PROOFS-A, round 5 — the showcase modal test waits for the modal's completion

Successor of `j-motion-proofs-a-brief-4.md`. Rounds 1 to 4 passed their audits (`units/j-motion-proofs-a-audit-4-verdict.md`).
- The landing chain merged Veneer `main` into `unit/motion-proofs-a` as `efb32fb`.
- The worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-a` is clean there.

## Why

The landing's `test:app` reads one red, and the red reproduces when the file runs alone:

```
FAIL |app:browser (chromium)| tests/app/browser/sections/EngineSection.test.ts:209:2 > EngineSection > opens the modal from its trigger, locks the page, and closes from its button and from Escape
AssertionError: expected <button type="button" …(3)></button> to be <div class="modal fade show" …(6)>…(1)</div> // Object.is equality
```

After the modal reopens, the case awaits `waitForAnimations(dialog)` and then reads `document.activeElement` synchronously. `Modal` now settles on the host and the dialog through `Promise.all`. Its focus step therefore runs after the case's continuation, and the case reads focus before the modal has moved it. The case relied on the old single-element settle resolving first, so the defect is the case's: it waits on a motion rather than on the modal's completion. E32 applies: a proof reads the engine's completion, not a motion's end.

## The obligation

- **S1.** The case waits for the modal's completion, which is `shown.vn.modal` after the show and `hidden.vn.modal` after each hide, before it reads focus and the page's state. Keep every assertion it makes.
- **S2.** Read the rest of `tests/app/` for a case that reads an engine's completion state right after awaiting an element's animations. For each one in a file you do not own, return an exact patch and edit nothing. `tests/app/browser/integration.test.ts` is the styles session's.
- **S3.** Run `npm run test:app` whole, and the four owned files.

## Scope

- **Owned:** `tests/app/browser/sections/EngineSection.test.ts`.
- **Report-only:** every other file under `tests/app/`.
- **Off-limits:** everything else. `src/browser/Modal.ts` does not change.

## Output

Your final message holds:
- the change;
- the red reading before it, and the green reading after;
- the S2 findings with any patches;
- `npm run test:app`'s output;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
