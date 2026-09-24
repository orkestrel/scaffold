# J-SCROLLSPY — round 3 brief, the landing round (successor to `j-scrollspy-brief-2.md`, which stays in place unedited)

What changed and why: round 2 was audited by the analyst on GPT-6 Astra and the checker; the reconciled verdict `j-scrollspy-audit-2-verdict.md` passes the unit and names what the landing folds. This round lands the unit: the Orchestrator committed your rounds on `unit/scrollspy` as `6d8bd13` (`units/j-scrollspy-landing-message.txt`) and merged Veneer `main` `f377579` (the J-ALERT and J-TAB landings) into the branch; the merge stopped on conflicts, and the worktree is mid-merge with conflict markers in nine files. You resolve the merge in the working tree, fold the shared delegate members, and run the full chain. You do not commit; the Orchestrator commits the merge from your working tree.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the writer of rounds 1 and 2, resumed in the same worktree.

## Objective

A conflict-free working tree on `unit/scrollspy` that carries the landed Alert and Tab and the ScrollSpy unit together, with one delegate, and every gate green.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/scrollspy`, branch `unit/scrollspy`, mid-merge (`git status` shows `UU` for the conflicted files; `MERGE_HEAD` is `f377579`). Conflict blocks, counted by `<<<<<<<` markers: `guides/veneer.md` (4: the § Surface rows around the `Delegate` row near line 40, the example fences near line 479, the § Delegation paragraph near line 647, and the `#### ScrollSpy` versus `#### Alert` and `#### Tab` sections near line 876), `src/browser/Delegate.ts` (7), `src/browser/constants.ts` (2), `src/browser/index.ts` (1), `src/browser/parsers.ts` (1), `src/browser/validators.ts` (1), `tests/src/browser/Delegate.test.ts` (3), `tests/src/browser/index.test.ts` (3), `tests/src/browser/validators.test.ts` (3). The Orchestrator already resolved the guide's Compatibility table block (main's rows with your `plugin` row re-applied through `j-w2-resolve-guide-2.py`); do not touch that table beyond the formatter's re-pad. Do not commit, do not run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git merge --abort`; resolve by editing the files and leave the markers gone. `git add` of a resolved file is permitted so `git diff --diff-filter=U` reads empty when you finish.
- What `main` brings that you did not have: `src/browser/Alert.ts` and `src/browser/Tab.ts` with their tests, `AlertVocabulary` and `TabVocabulary`, `isDisabled` and `computeNeighbor` and `readControls` and `readTarget` in `helpers.ts`, and in `Delegate.ts` the alert route (`#routeAlert`, `#reach`, `#locate`), the tab routes (`#routeTab`, `#routeTabKey`), the `keydown` listener and `#press`, the `#alert` and `#tab` fields, one `#conflicts` over a `Set` of the constructing hosts (the button host, the unowned collapse panels, the alert, the tab control), `#closest`, and `#construct(engine)`; the merged class remarks describing those; the guide's `#### Alert` and `#### Tab`, their § Surface rows, and the Compatibility table with the Alert and Tab `plugin` rows shipped. Read `main`'s `src/browser/Delegate.ts` whole (`git show main:src/browser/Delegate.ts`) before resolving.
- Sources under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: `j-scrollspy-audit-2-verdict.md` (§ Carried to the landing round), `j-scrollspy-report-2.md`, `../decisions.md` (E12, E15, E16). The Tab landing's `j-tab-report-3.md` and `j-tab-report-4.md` show how that unit folded the same members and where `isDisabled` lives (`helpers.ts`, per E16 as amended).
- Host facts: `npm ci` fails `EPERM` in this worktree on a tailwind binary WebStorm holds; the packages are installed from `e24e2c3`'s lockfile, and `main` moved no dependency between `e24e2c3` and `f377579`, so run no install. The `HostSnapshot` suite prints an expected `SyntaxError` diagnostic about an empty `DOMTokenList` token while passing.

## Items

**A. Resolve every conflict by keeping both units.** In `constants.ts`, `index.ts`, `parsers.ts`, `validators.ts`, `validators.test.ts`, `index.test.ts`, and the § Surface rows of the guide, both sides add: keep `main`'s (Alert, Tab) additions first and yours after, in each file's existing order (the barrel's component order, the guide's component order, which places ScrollSpy after Tab). In `tests/src/browser/Delegate.test.ts`, keep both units' cases. In the guide's example fences, keep `main`'s Alert and Tab examples and your ScrollSpy example after them; in the `####` sections, keep `#### Alert` and `#### Tab` from `main` and `#### ScrollSpy` after them; in § Delegation, keep `main`'s paragraph and add your scan sentences where the round-2 text placed them. Check that the Alert, Tab, and ScrollSpy `plugin` rows all read `shipped` with their Proof paths.

**B. One delegate.** In `src/browser/Delegate.ts`: the `#driven`, `#owned`, and `#acquire` unions carry `Button | Collapse | Alert | Tab | ScrollSpy`; `#discard` reads all five registries; the construction scan is folded into one private method beside the routes (the verdict's carry: a method the constructor calls after the vocabularies resolve and before the listeners install, acquiring a scrollspy for every unowned host the selector matches, destroying every acquired engine and rethrowing when one refuses); `#conflicts` unchanged (a scrollspy host is no click-route host); `#activate` and `#press` as `main` has them; one `#closest`, one `#construct`; the class summary reads "Activates data-attribute hosts through a root's delegated click and key listeners and a scan at construction." and the class remarks merge `main`'s description with your scan paragraph; the `DelegateInterface.destroy` TSDoc and its Methods row read the click and key listeners and every engine it owns, including the scanned ones, in one sentence. Delete every duplicate path (E6).

**C. Gates.** The full chain in the worktree: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md` (the table re-pads) then `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser` (the Alert, Tab, and ScrollSpy suites together); `npm run test:guides`; `npm run test:policy`; the three builds; `npm run test:conformance`; `npm run test:setup`; each exit 0. Re-run your round-2 instrument's rows that touch `Delegate.ts` against the merged file (re-anchor the rows whose text moved into the scan method) and report the result; log the run as `tmp/j-scrollspy/mutations-3.log.txt` from `tmp/j-scrollspy/mutations-3.py`.

## Scope

Owned: every file the merge conflicted, plus `src/browser/types.ts` (the `DelegateInterface.destroy` sentence only), `tmp/j-scrollspy/**`. Off-limits: `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `Alert.ts`, `Tab.ts`, `ScrollSpy.ts` (your own engine stays as round 2 left it), `helpers.ts`, `tests/setupBrowser.ts`, `ROADMAP.md`, every vendored file. No install, no commit, no discarding git command.

## Execution

Perform the assignment directly and spawn nothing. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Output

Your final message: the conflict resolution per file (one line each), the delegate fold (the scan method's name and place, the members kept, the members deleted), the merged summary and remarks, the gate table with exits and summary lines, the instrument re-run result, `git status --short`, and the deviation state.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: the scan method's name, the order of the merged class remarks, and the placement of the scan sentences in § Delegation. Stop and report if a conflict cannot be resolved inside the owned files or if a gate outside your items reddens.
