# Unit J-ROADMAP, round 2 — drop J-HELD from the carrier list

Successor of `j-roadmap-brief.md`, whose every section stands except the change below. Same role (`builder` on Sonnet, native), same worktree (`C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/roadmap`), same scope, output, and acceptance checks 4 and 5.

**What changed and why.** The Orchestrator's re-baseline of 2026-09-24 rules J-HELD satisfied: J-INTEGRATION round 2 implemented E22, and its cases close each J-HELD row ("returns the host to the hidden state and removes the backdrop when the host drops the shown token at each door after the show writes it", and "returns the host and its backdrop to the shown state when the host takes a hide over at each door after the shown token leaves", in `tests/src/browser/Modal.test.ts` and `Offcanvas.test.ts` on `unit/integration`). So the R1 sentence naming J-HELD as a carrier is false.

**The change.** In the J-ENGINE row's "Role and engine" cell, replace `and J-GUARDS, J-HELD, and J-SAMEWAY carry the findings the landing audits left open;` with `and J-GUARDS and J-SAMEWAY carry the findings the landing audits left open;`. Then run `npx oxfmt ROADMAP.md`, `npx oxfmt --check ROADMAP.md`, `git diff --stat`, and `npm run test:policy`.

**Output.** The `git diff` of `ROADMAP.md` against `b1d314d`, `git status --short`, and each command's exit code and last lines. Perform the assignment directly and spawn nothing.
