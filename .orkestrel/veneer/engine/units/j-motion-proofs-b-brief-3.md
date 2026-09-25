# Unit J-MOTION-PROOFS-B, round 3 — the audit's fixes: one pin, one reduced-motion case, one naming, and the Toast prose

**What changed from `j-motion-proofs-b-brief-2.md`, and why.** The audit of rounds 1 and 2 ruled FAIL 1, 8, 9 (`units/j-motion-proofs-b-audit-verdict.md`). This round carries every item the verdict gives to round 3, and nothing else. The shared motion recorder goes to J-MOTION-RECORDER. The identity sentence in the other engines goes to the J-RELEASE family units.

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium.

## Objective

The four motion proofs pin no kind of motion. Tab proves reduced motion as the other three do. The factor cases set the factor they compare. Every sentence about Toast's completion states what the code does.

## Context

**Evidence.** The verdict and the two lane verdicts it names are this round's source. Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- `units/j-motion-proofs-b-audit-verdict.md`;
- `units/j-motion-proofs-b-audit-objective-verdict.md`, claims 8 and 9;
- `units/j-motion-proofs-b-audit-reviewer-verdict.md`, § Required changes and § Design-fit defects, items 2 and 3.

Locate each site by its construct, because line numbers move:
1. **The pin.** In `Toast.test.ts`, the completion case asserts `expect(animation).toBeInstanceOf(CSSTransition)` on every recorded motion. Delete it. The case's positive-duration reading beside it stays.
2. **Reduced motion.** `Tab.test.ts` has no case under `stageMedia({ motion: false })`. Add one, in the shape of the Collapse, Toast, and Carousel cases: a swap creates no animation on either pane, and `shown` still dispatches.
3. **The naming.**
   - `Toast.test.ts` and `Tab.test.ts` name the duration read under the shipped cascade `released`, and say "the release's factor". `Carousel.test.ts` names the same reading `shipped`. Rename it `shipped`, and say "the shipped factor".
   - Each factor case must set the factor it compares for both readings, for example `:root { --vn-factor-motion: 1 }` before the first read. It must not rely on the shipped value being 1.
4. **The Toast prose.**
   - § Toast, the `shown` row: "After the fade in the `transition` token's removal starts" is false for `animated: false`. Write "After the `transition` token leaves; when `animated` is `true`, after the fade in that its removal starts finishes", or an equivalent that holds in both modes.
   - `Toast.ts` class remarks and § Toast's paragraph "A call carries the change identity …": a call reads its identity "after each write, dispatch, and await". After its completed event, it reads only whether the toast is live. State that exactly, in both places.
5. **Helper words** (`.claude/rules/writing.md` § Sentence and paragraph order):
   - `Toast.ts` class remarks and § Toast: "the fade in that removal starts" becomes "the fade in that the removal starts".
   - `Toast.test.ts`: "the fade in its removal starts" becomes "the fade in that its removal starts".
   - `Toast.test.ts`: the case title "… a show whose fade in a hide takes over …" becomes "… a show that a hide takes over during its fade in …".
   - `Carousel.ts` class remarks: "… to both items, when the host carries the `slide` token waits …" becomes "… to both items, then, when the host carries the `slide` token, waits …".

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `tests.md`, `browser.md`, `documentation.md`, and `writing.md`.
- `engine/decisions.md` § E24, § E32 with both amendments, and § E34.
- Skill: none. Guide: `guides/veneer.md` § Toast and § Carousel.

**Installed primitives.** `@orkestrel/test` for every wait and recorder.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b`, on `unit/motion-proofs-b` at `fd82ae9`. Rounds 1 and 2's instruments are under its `tmp/j-motion-proofs-b/`.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-motion-proofs-b/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** None beyond the red reading item 2 needs. Record whether the Tab reduced-motion case passes at `fd82ae9` before any engine change. It is a proof of existing behaviour, so it may pass there. If it does, give it a mutation that reddens it: an engine that forces a pane transition under reduced motion.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.** `tests/src/styles/elements/button.test.ts` reads red on `main` on this host, as a standing row. It is not this unit's.

## Unknowns

None.

## Scope

**Owned.**
- `tests/src/browser/Toast.test.ts`, `Tab.test.ts`, and `Carousel.test.ts`.
- `src/browser/Toast.ts` and `src/browser/Carousel.ts`: their class remarks only.
- `guides/veneer.md` § Toast and § Carousel.
- `tmp/j-motion-proofs-b/`.

**Shared (report-only).** None.

**Off-limits.**
- Every other file, including `tests/setupBrowser.ts`, `Collapse.test.ts`, and every other engine's remarks.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** The Toast completion case's type pin, and the factor cases' `released` names. Run the four motion files and `npm run test:guides` after the change.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the files touched;
- each item, 1 to 5, with its before and after;
- the Tab reduced-motion case: its title, its reading at `fd82ae9`, and its mutation's red reading naming an assertion;
- the plant run of the four files, and the plant's removal;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when an item needs an off-limits file or an engine change. You decide the wording of each corrected sentence within its item's rule, and each case's title.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. No owned test asserts a motion's type, duration, easing, or property list.
3. The Tab reduced-motion case exists and passes, and its mutation reddens it by an assertion.
4. The factor cases set both factors they compare, and the reading is named `shipped` in all three files.
5. Each corrected sentence holds for the code in both `animated` modes.
6. The four motion files pass in scoped runs, unplanted and against the plant. `npm run test:guides` exits 0.

**Observations, not criteria.** `npm run test:app` and the whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays the plant and the mutation, and gives the audit lane the diff, the status, your report, and its replay.
