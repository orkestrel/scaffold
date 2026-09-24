# J-TAB — round 3 brief, the landing round (successor to `j-tab-brief-2.md`, which stays in place unedited)

What changed and why: round 2 was audited by the analyst on GPT-6 Astra and the checker; the reconciled verdict `j-tab-audit-2-verdict.md` accepts the mechanism and carries one guide sentence and one helper remark. This round lands the unit: the Orchestrator committed your rounds on `unit/tab` (`units/j-tab-landing-message.txt`) and merged Veneer `main` `41ba3b7` (the J-ALERT landing) into the branch; the merge stopped on conflicts, and the worktree is mid-merge with conflict markers in eight files. You resolve the merge in the working tree, fold the shared delegate members, adopt E16's helper, fix the two sentences, and run the full chain. You do not commit; the Orchestrator commits the merge from your working tree.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the writer of rounds 1 and 2, resumed in the same worktree.

## Objective

A conflict-free working tree on `unit/tab` that carries the landed Alert and the Tab unit together, with one delegate, and every gate green.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab`, branch `unit/tab`, mid-merge (`git status` shows `UU` for the conflicted files; `MERGE_HEAD` is `41ba3b7`). Conflict blocks: `guides/veneer.md` (4), `src/browser/Delegate.ts` (16), `src/browser/constants.ts` (1), `src/browser/index.ts` (1), `src/browser/types.ts` (1), `src/browser/validators.ts` (1), `tests/src/browser/Delegate.test.ts` (4), `tests/src/browser/validators.test.ts` (2). Do not commit, do not run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git merge --abort`; resolve by editing the files and leave the markers gone. `git add` of a resolved file is permitted so `git diff --diff-filter=U` reads empty when you finish.
- What `main` brings that you did not have: `src/browser/Alert.ts`, its tests, `AlertVocabulary`, and in `Delegate.ts` the alert route (`#routeAlert`, `#reach`, `#locate`), the `#alert` field, one `#conflicts` over a `Set` of the constructing hosts (the button host, the unowned collapse panels, the alert), and `#closest`; the `Delegate` class remarks describing those; the guide's `#### Alert`, the Alert § Surface rows, and the Compatibility table as the styles session re-padded it (`88cb691`) with the Alert `plugin` row shipped. Read `main`'s `src/browser/Delegate.ts` whole (`git show main:src/browser/Delegate.ts`) before resolving.
- Sources under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: `j-tab-audit-2-verdict.md`, `j-tab-audit-2-objective-verdict.md` (claim 6 and F1, the two sentences), `../decisions.md` E16 (the shared `disabled` reading), `j-w2-resolve-guide.py` (resolves the Compatibility table's conflict blocks by taking `main`'s rows and re-applying a unit's `plugin` row; run it as `python C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-w2-resolve-guide.py tab Tab` from any directory, then resolve the guide's remaining blocks by hand).
- Host facts: `npm ci` fails `EPERM` in this worktree on a tailwind binary WebStorm holds; the packages are installed from `e24e2c3`'s lockfile, and `main` moved no dependency, so run no install.

## Items

**A. Resolve every conflict by keeping both units.** In `constants.ts`, `index.ts`, `types.ts`, `validators.ts`, `validators.test.ts`, and the § Surface and `#### …` blocks of the guide, both sides add: keep `main`'s (Alert) additions first and yours after, in each file's existing order (the barrel's component order, the guide's component order). In `tests/src/browser/Delegate.test.ts`, keep both units' cases; where the listener-count case exists on both sides, keep yours (`[root, root]`). In the guide's Compatibility table, run `j-w2-resolve-guide.py tab Tab`, then check the Tab and Alert `plugin` rows both read `shipped` with their Proof paths. In § Delegation, keep `main`'s paragraph with your two sentence corrections applied (clicks and keys; the listeners).

**B. One delegate.** In `src/browser/Delegate.ts`: the `#driven`, `#owned`, and `#acquire` unions carry `Button | Collapse | Alert | Tab`; `#discard` reads all four registries; one `#conflicts` collects, through `#closest`, the button host, the unowned collapse panels, the alert `#locate` resolves, and the tab control, each only where its registry holds no engine, and refuses on a `Set` smaller than the list; `#activate` runs `#conflicts`, then `#routeButton`, `#routeCollapse`, `#routeAlert`, `#routeTab`; one `#closest`; one `#construct` used by every route that constructs (generalize yours so `#routeAlert` uses it too, or keep `#routeAlert`'s direct acquisition only if you can state why a construction that writes nothing needs no lifetime read after it); the `keydown` listener and `#press` as yours; the class remarks merged into one description covering the button, collapse, alert, and tab routes, the key route, the refusal, the reverse-order destruction, and the release. Delete every duplicate path (E6).

**C. E16, the one `disabled` reading.** Add `isDisabled(element: Element, token: string): boolean` to `src/browser/validators.ts` with Bootstrap's `isDisabled` semantics (the token, the platform's `:disabled` state, or a `disabled` attribute whose value is not `false`), TSDoc, a § Surface row, `index.test.ts`'s export list, and cases in `validators.test.ts`. `#routeTab`, `#routeTabKey`, and the alert's `#locate` call it; delete `Delegate.#disabled`. Under `#### Tab`, delete the departure that a `disabled` attribute disables whatever its value, and state the reading once under § Delegation's refusal sentence or the Tab route paragraph; rewrite any case asserting `disabled="false"` disables so it asserts it enables. The Alert guide's route sentence gains the same reading if it states one.

**D. The two sentences (round-2 claim 6 and F1).** Under `#### Tab`, the click on an already-active control saves no swap tokens while construction still records its initial attribute writes. In `helpers.ts`, the `readControls` remark: a dropdown toggle is excluded unless it also matches `trigger`.

**E. Gates.** The full chain in the worktree: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md` (the table re-pads) then `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser` (the Alert and Tab suites together); `npm run test:guides`; `npm run test:policy`; the three builds; `npm run test:conformance`; `npm run test:setup`; each exit 0. Re-run your round-2 instrument's rows that touch `Delegate.ts` against the merged file (a dry match is enough where the mutation text still applies; re-anchor and re-run the rows whose text moved) and report the result.

## Scope

Owned: every file the merge conflicted plus `src/browser/helpers.ts` (the remark), `tests/src/browser/index.test.ts`, `guides/veneer.md`, `tmp/j-tab/**`. Off-limits: `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `Alert.ts` (read it; change nothing), `tests/setupBrowser.ts`, `ROADMAP.md`, every vendored file. No install, no commit, no discarding git command.

## Execution

Perform the assignment directly and spawn nothing. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Output

Your final message: the conflict resolution per file (one line each), the delegate fold (the members kept, the members deleted), the E16 helper and its call sites, the two sentences before and after, the gate table with exits and summary lines, the instrument re-run result, `git status --short`, and the deviation state.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: the order of the merged class remarks, whether `#construct` generalizes over the routes, and the fixture of any rewritten disabled case. Stop and report if a conflict cannot be resolved inside the owned files or if a gate outside your items reddens.
