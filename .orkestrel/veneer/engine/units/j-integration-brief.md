# Unit J-INTEGRATION — the open code rows across Modal, Backdrop, Offcanvas, HostSnapshot, and Delegate

## Role and engine

`opus` on Opus 5.5, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash); the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration` (branch `unit/integration`, cut from Veneer `main` `e3031a3`, `npm ci` already run). J-POPOVER and J-SANITIZER run beside you in their own worktrees, on files this brief puts off-limits.

## Objective

Close the carried code rows `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-rows-reconcile-distillate.md` rules open and this brief names (INT1 to INT5), each with an executed proof, so the engine's modal family and its shared snapshot carry no known open defect.

## Context

**Read first, in order.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `workspace.md`, and `browser.md` in `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`; `decisions.md` in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/` (E13, E18 with its amendment, E19); the reconciliation distillate named in Objective; the rows of `plan.md` § Carried findings in the same folder whose first words INT1 to INT5 quote. A record a row cites that the folder no longer holds is read with `git -C C:/Users/mikes/WebstormProjects/scaffold show 9ebf73ff~1:.orkestrel/veneer/engine/units/<file>` (`fd96a0b1~1:` or `dc681254~1:` for W0 to W2, J-TOAST, and J-HELPERS records). Skill: none.

**Host.** Windows 11; Git Bash (`npm` and `npx` resolve to the `.cmd` shims); the browser project runs Chromium 153.0.8010.12; `npm run test:src:browser -- <file>` runs one file, `-t '<title>'` one case. `:root` carries `scroll-behavior: smooth` under `prefers-reduced-motion: no-preference`, so a test that scrolls passes `behavior: 'instant'`. The `prove` MCP server is not reachable to a subagent; record that you made no call. On this host write each multi-step program to a file and run the file, and keep each shell call one plain command.

**Standing conditions.** E6 (no alias, shim, or `@deprecated`); the element guard `isInstance(x, HTMLElement)`; no dependency; every write sequence reads its lifetime and its door after each write, dispatch, or `await` a reaction can run inside (E18's idiom, which the siblings share). No mock, spy, module replacement, or fake clock (AGENTS.md): real engines, real events, `@orkestrel/test` recorders and waits.

**Test in widening rings.** While an obligation is open, run only the file that pins it (narrowed with `-t` while one case is red); when it closes, run the files its edit reaches; run the whole browser suite once, after every obligation is closed. Implementation and its proofs come first; touch comments and guide prose only where a gate requires it or your change makes a sentence false.

**The obligations (each an edit and a proof; red first where the behaviour is new).**

- **INT1 The Modal under the shipped cascade.** The `modal` key has shipped under `src/styles/components/`, yet `tests/src/browser/Modal.test.ts` (the comment around line 22) still reads Bootstrap's modal declarations from a test-local sheet "because no modal key ships". Prove the Modal's motion and stacking against the shipped cascade: find how a browser test in this repository loads the shipped cascade (the app section tests import `src/styles/index.scss`; `readCascadeSheet` in `tests/setupBrowser.ts` names Veneer's sheet) and whether `workspace.md`'s environment boundaries admit that import from `tests/src/browser/` (run `npx oxlint` on the file to settle it). Retire the test-local sheet wherever the shipped key covers what it declared, and correct the false comment. If the boundary refuses the import from `tests/src/browser/`, stop and report the refusal with the lint output rather than moving the case into `tests/app/`.
- **INT2 The held backdrop.** Two rows: a Modal whose hide a reaction stops keeps its faded backdrop connected until a later show or destruction; and a Modal without the `fade` token whose hide door fails after `Backdrop.hide()` resolves keeps a connected backdrop carrying neither `fade` nor `show`, which the `overlay-backdrop` mixin paints opaque, while the modal is shown again. Run the question first: write the two cases (the stopped hide with and without `fade`) and read the backdrop's tokens and computed opacity under the shipped cascade after the stop. The modal stays shown after a stopped hide, so its backdrop must read as the shown state's (the `show` token and the shown opacity). Where it does not, repair `Modal` or `Backdrop` so the stopped hide returns the backdrop to its shown state, red first, with the door read after each write.
- **INT3 The delegate's route half.** `Delegate`'s per-click mark `static #driven` keys each event by route constructor, and two routes now read it (the Modal route and the Offcanvas route, around `Delegate.ts` lines 878 and 947). Add the proof the row names: a host matching two routes, one trusted click, and an assertion that distinguishes the mutation that collapses the per-route key (one mark per event for every route) from the passing case. `Delegate.ts` is off-limits: if the proof exposes a defect, stop and report it with the red reading.
- **INT4 The snapshot's private shapes.** `HostSnapshot.ts` writes the presence shape `{ readonly element: HTMLElement; readonly attribute: 'class' | 'style' }` inline more than once (around lines 90 to 100), and mixes `ReadonlyArray<…>` with `readonly …[]`. Give each shape one declaration where `architecture.md` puts a type (a class file holds one class plus imports), use one array form, and keep every HostSnapshot case green; add no case for the pure restructure.
- **INT5 The sibling idiom's backdrop writes.** E18 forbids exempting a write from the door by classification, and `Offcanvas` writes its backdrop without a door read after each write. Run the question: write a case in which a reaction to each backdrop write (the insertion, the `show` token, the removal) takes the change over (a `hide` during the show's backdrop write, a `show` during the hide's backdrop removal) and read whether the offcanvas finishes the stale change. Where it does, repair `Offcanvas` with the E18 idiom, red first; where it does not, the case stays as the proof and you record why the write needs no door.

## Unknowns

1. INT1's import route from `tests/src/browser/`: settle it by lint and a run, and record the route.
2. INT2's reading: whether the held backdrop is wrong in both states, one, or neither; record the tokens and opacity you read.
3. INT5's reading: which backdrop writes, if any, let a stale change finish.

## Scope

**Owned.** `src/browser/Modal.ts`, `src/browser/Backdrop.ts`, `src/browser/Offcanvas.ts`, `src/browser/HostSnapshot.ts`, and their tests `tests/src/browser/Modal.test.ts`, `Backdrop.test.ts`, `Offcanvas.test.ts`, `HostSnapshot.test.ts`; `tests/src/browser/Delegate.test.ts` (INT3's case only); a new `tests/src/browser/integration.test.ts` if INT1 or INT2 needs one; `src/browser/types.ts` for the `Modal*`, `Backdrop*`, `Offcanvas*`, and `HostSnapshot*` declarations only, and only where INT4 needs a home or a change makes a sentence false; `guides/veneer.md` in `#### Modal` and `#### Offcanvas` for a sentence your change makes false; `tmp/j-integration/**`.

**Shared (report-only).** `tests/setupBrowser.ts` (return a needed fixture as an exact diff whose headers name `tests/setupBrowser.ts`).

**Off-limits.** `src/browser/Delegate.ts`, `Tooltip.ts`, `Placement.ts`, `Popover.ts`, `sanitizers/**`, `helpers.ts`, `validators.ts`, `constants.ts`, `parsers.ts`, `index.ts`, and every other engine file and its test; `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/src/styles/**`, `tests/service/**`, `src/styles/**`, `app/**`, `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`, `ROADMAP.md`.

**What asserts the state this change ends.** The owned test files; `tests/guides.test.ts` read-only; `tests/policy.test.ts` read-only. Search bound before your first edit, and report its output: `grep -rn "test-local sheet\|No modal key ships\|ReadonlyArray<{" src/browser tests/src/browser`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. No install, commit, push, or discarding git command (`checkout`, `restore`, `stash`, `reset`, `clean`). No tree-wide `format`, `lint --fix`, or `build`. Scoped validation: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` (`--write` on your own files where it fails, then `--check`). Write the acceptance chain to `tmp/j-integration/acceptance.sh` and run the file; keep each log under `tmp/j-integration/`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return the report as your final message: the files touched; per obligation, what was built and the case that pins it with its red reading (where the behaviour is new) and its green reading, verbatim; the Unknowns' answers with the readings behind them; every `types.ts` change as its own diff block; every shared-file patch as an exact diff; for each new case, the mutation it distinguishes and the reading that shows it reddens under that mutation (run it: plant, run the one case, restore, and report the digest before and after); the verbatim output of every acceptance command; `git status --short` and `git diff --stat`; the deviation state. No process diary.

## Deviation contract

Follow `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md` § Deviation protocol. Stop and report on: a defect in an off-limits file (`Delegate.ts` above all); an import boundary that refuses INT1's route; a contract sentence in `types.ts` the behaviour cannot satisfy without a change beyond the owned declarations; a gate red you cannot close inside the owned files. Decide, record, and carry on for: the order of cases, the wording of comments and guide sentences, where a declaration sits inside its centralized file, and the rulings the Unknowns name.

## Acceptance criteria

1. `npm run check:src:browser` exit 0; the scoped oxlint and oxfmt checks exit 0; `npm run check` exit 0.
2. Each INT case present, with its red reading before a fix (INT2 and INT5 where a fix landed) and its mutation reading.
3. The owned test files green, then the whole `npm run test:src:browser` green on Chromium 153.0.8010.12.
4. `npm run test:guides` and `npm run test:policy` green.
5. The search bound returns no false "no modal key ships" comment and one array form in `HostSnapshot.ts`.
6. The status lists only owned files plus any shared file whose diff is returned.

## Review evidence

The actual diff (`git diff HEAD` with new files intent-to-add) and `git status --short`, captured by the Orchestrator as `j-integration.diff` and `j-integration-status.txt`, and the report; the audit runs `analyst` on Astra (objective: the door reads, the backdrop states, the proofs' binding) and `checker` on Sonnet.
