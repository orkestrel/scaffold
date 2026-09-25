# Unit J-CONCERNS-A, round 3 — ScrollSpy's smooth scroll honours reduced motion, the focus case leaves no history entry, and a nested toggle is proved

Successor of `j-concerns-a-brief-2.md`, whose sections, and round 1's, stand except where this brief replaces them.
- Round 2 is committed as `bcea965` on `unit/concerns-a`, over the merge `bd5c882`.
- The worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-a` is clean there.

## Why

The audit ruled `VERDICT: FAIL 3, 7` in its objective lane, `analyst` on GPT-6 Astra (`units/j-concerns-a-audit-objective-verdict.md`). Read that verdict. The checker job on Grok passed claims 7 and 8 (`units/j-concerns-a-audit-checker-verdict.md`). The Orchestrator rules:
- **Claim 3.** `decisions.md` § E34, recorded from this finding, rules that an engine gates the motion it starts in script on `matchesReducedMotion`. Read it whole. Your case `scrolls the host smoothly under staged reduced motion, reading no motion preference` pins the behaviour E34 refuses.
- **Claim 7.** The keyboard-focus case's control link runs a native fragment navigation. That navigation adds a session-history entry, and `history.replaceState` in the cleanup changes only that entry's URL. The case therefore leaves state behind.
- **Outside the claims.** No case covers a toggle listener that calls `toggle()` again. The lane found no source defect on that path.

## The obligations

- **R1 (E34).**
  - `ScrollSpy`'s `#scrollTo` scrolls with `behavior: 'instant'` while `matchesReducedMotion(host)` reads true, and smoothly otherwise. Use the helper in `src/browser/helpers.ts`, and write no second preference read.
  - Rewrite the reduced-motion case so that it proves the new behaviour: under staged reduced motion, the scroll reaches the section with no intermediate position.
  - Record the case's red reading on `bcea965`'s `ScrollSpy.ts` before the fix, then the green reading at your tip.
  - The existing smooth cases stay green with no preference staged.
  - Retire your `scrollspy-reduced` mutation, which is now the fix, and add a row that removes the gate.
- **R2 (claim 7).** The keyboard-focus case leaves no session-history entry behind. Choose one of these, and say which:
  - drop the native-navigation control, because the `scrollspy-navigate` mutation already distinguishes the prevented navigation;
  - or keep a control that proves the same thing without a navigation that adds an entry.

  Either way, the case still reads red under `scrollspy-focus-section` and `scrollspy-navigate`.
- **R3.** Add a Button case: a toggle listener that calls `toggle()` once. The outer call returns the state the host carries at its end, and the events arrive in the order the calls made them. Name the mutation it reddens, and record the red reading.

## Scope

- **Owned:**
  - `tests/src/browser/ScrollSpy.test.ts` and `tests/src/browser/Button.test.ts`;
  - `src/browser/ScrollSpy.ts`, for R1 alone;
  - `tmp/j-concerns-a/`.
- **Report-only:** `guides/veneer.md`. Return an exact patch against your tip for every sentence R1 makes false, including § ScrollSpy's smooth-scroll sentences and `ScrollSpyOptions.smooth`'s summary row if its TSDoc changes. Check the patch with `git apply --check`. If `ScrollSpyOptions.smooth`'s TSDoc in `src/browser/types.ts` states the scroll's behaviour, return a patch for it too.
- **Off-limits:** as rounds 1 and 2.

## Output

Your final message holds:
- the files touched;
- the R1 change, its red and green readings verbatim, and the new mutation row's reading;
- which R2 option you chose, with the focus mutations' readings;
- the R3 case, its mutation, and its red reading;
- the report-only patches' paths and their `git apply --check` output;
- the acceptance output verbatim: `npm run check`, `npm run lint:check`, `npm run format:check`, and both owned files in a scoped run;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
