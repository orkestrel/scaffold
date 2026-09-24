# J-TAB — round 2 brief (successor to `j-tab-brief.md`, which stays in place unedited)

What changed and why: round 1 (`j-tab-report.md`) returned green and was audited by the analyst on GPT-6 Astra, the reviewer on Opus 5.5, and the checker; the Orchestrator's reconciled verdict `j-tab-audit-verdict.md` reads `FAIL 2, 3, 4, 6, 7`. This brief carries each finding to one item and names its source beside it. Everything else in the round-1 brief binds here as written.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the round-1 writer, resumed in the same worktree.

## Objective

Close the audit findings in the tab worktree so that every gate is green again and the round-2 instrument reddens every named case, including the new proofs red first.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab`, branch `unit/tab` from Veneer `main` `e24e2c3`, your round-1 work uncommitted. Do not merge `main` and do not commit. The Orchestrator's replay of your round-1 instrument ran in this tree before you resume and restored every byte (`j-tab-mutations-orchestrator.log.txt`).
- Sources, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: `j-tab-audit-verdict.md` (the rulings), `j-tab-audit-objective-verdict.md` (claims 2, 3, 4, 6, 7, and F1: the vectors item A, B, F, and G rest on), `j-tab-audit-subjective-verdict.md` (claim 4's refuted clause, claim 7, F1 to F7, R1 and R2), `j-tab-audit-checker-verdict.md`, and `j-alert-2.diff` (the Alert unit's round 2, whose `Delegate.#conflicts` collects every constructing host into one `Set` and whose `#closest` returns the closest match inside the root; item C copies that shape so the landing merge folds). Read the three verdicts before editing.
- Veneer `main` is at `88cb691`; J-ISINSTANCE (`e7b187f`) rewrote the `instanceOf(HTMLElement)(host)` reads in the delegate routes to `isInstance`. Item C rewrites the same lines; the landing merge takes your version.

## Unknowns

- Whether the "destroys the tab when its signal aborts…" case distinguishes a dropped live abort subscription (the objective lane read the round-1 row "the signal is ignored" as changing the constructor condition alone). Item F has you add the row and report which case it reddens; strengthen the case if none does.

## Items

**A. The outgoing-phase door (claim 2, objective; the subjective lane's R1).** From the write that removes the outgoing control's `active` token on, every door of `show` also reads that no control of the host's list other than the host carries `active` (the `#sibling()` read), in addition to the token sets it reads today; the read-then-write order and the `#change` identity stay, and E15's carve-out (the newest call wins on the same tab) stays. Red-first proofs, each red on the round-1 source: (i) A active and focused, B inactive, live engines for both, a once-only `blur` listener on A that calls `A.show()`; `B.show()` resolves `false`, writes nothing after the blur, and leaves A active with its pane shown, B inactive, and one `shown.vn.tab`, on A; (ii) a custom-element reaction on A's `class` attribute that shows a third control C when A loses `active`: `B.show()` resolves `false` and C ends alone active. Instrument rows: "the outgoing phase reads no sibling" (drop the sibling read from the door) must redden (i) and (ii).

**B. Delegate lifetime in the tab route (claim 4, objective; the subjective lane's R2).** `#routeTab` reads `this.#controller.signal.aborted` before it prevents or marks, as `#routeCollapse` and the Alert unit's `#reach` do; after `new Tab(control, this.#tab)` returns, when the delegate was destroyed inside that construction (a reaction to an initial attribute write), the route destroys that engine, acquires nothing, and drives nothing. Red-first proofs: a consumer-owned `Button` on the control whose `toggle.vn.button` listener destroys the delegate (the click marks, constructs, and shows nothing for the tab route; `Tab.find(control)` stays undefined; the observer is not re-attached); a custom element in the list whose `role` attribute reaction destroys the delegate during construction (the engine is destroyed, `Tab.find(control)` undefined). Instrument rows for both reads.

**C. One `#conflicts` (the subjective lane's F1; E6).** Delete `#contends`. `#conflicts(target)` collects, inside the root and only where the route's registry holds no engine, the click's button host, the panels its collapse trigger names, and its tab control, into one list, and refuses the click when a `Set` of them is smaller than the list, the form `j-alert-2.diff` gives it; `#activate` calls `#conflicts` alone. Add `#closest(target, selector)` (the closest match the root contains) from that diff and route `#routeButton`, `#routeCollapse`, `#routeTab`, `#routeTabKey`, and `#conflicts` through it. The existing refusal and route cases pin it; report the scoped run.

**D. The listener-count row (claim 4, subjective).** An instrument row that drops the `keydown` `addEventListener` and reddens "registers one click and one key listener on the root and releases both and its engines" by name.

**E. `TabVocabulary`, `readControls`, `computeNeighbor` (known before the round; the subjective lane's F6).** Add `TabVocabulary` to `types.ts` mirroring `CollapseVocabulary` (`classes`, `attributes`, `selectors`, readonly, TSDoc in the same form), its § Surface row, and type `Delegate.#tab` with it. Export `readControls(list: HTMLElement, selectors: Pick<TabSelectorMap, 'link' | 'entry' | 'toggle' | 'trigger'>): readonly HTMLElement[]` from `helpers.ts` (the `:is(link, entry):not(toggle), trigger` query filtered to `HTMLElement`, TSDoc naming Bootstrap's `_getChildren`), with cases in `helpers.test.ts`; `Tab` and `Delegate.#routeTabKey` call it and `Tab.#controls` goes. Change `computeNeighbor` to `(list: readonly T[], current: T | undefined, forward: boolean, wrap: boolean)` with the same semantics (an absent `current` reads as not in the list), the Dropdown unit's signature, so the landing keeps one declaration; update its TSDoc, its cases, and the call site.

**F. Patch C adopted, with its bound (claim 3).** Apply patch C in the tree: the reverse iteration in `destroy` and `#release`, its proof, and the `Delegate` class remarks stating that destruction runs in the reverse of acquisition (the subjective lane's F7). Replace the guide sentence with the bound: destroying in the reverse of acquisition restores a list when each tab's first swap saved the list's own values; a control clicked while already active before another tab swapped leaves the list with the values a later tab found first, a bound J-SNAPSHOT-SHARED closes after W2. Add the instrument row "the live abort subscription is dropped" (remove the `signal.addEventListener('abort', …)` binding alone) and report which case it reddens; strengthen "destroys the tab when its signal aborts, and at construction when it arrived aborted" if none does.

**G. Sentences the source makes false (claims 6 and 7; the objective lane's F1; the subjective lane's F2 and claim 7).** Apply patch A in the tree (`types.ts` is granted) with these changes, and keep every § Surface and Methods row equal to its TSDoc: the `TabInterface` summary; the `show` `@returns` names a listener activating another control before the swap as its own reason, and the takeover as another; `TabInterface.destroy`; `DelegateInterface.destroy` ("Releases the click and key listeners and destroys every engine it owns."); `DelegateOptions.root` ("Receives delegated clicks and keys. Default: `document`."); `TabClassMap.disabled` ("Marks a control that delegated clicks leave inactive and delegated keys pass over. Default: `disabled`."); the `Delegate` class summary and its § Surface row ("Activates data-attribute hosts through a root's delegated click and key listeners."); the `#activate` comment (one refusal, three routes). In the guide: § Delegation's "listens for clicks on its root" becomes "listens for clicks and keys on its root" and "removes the listener and the observer" becomes "removes the listeners and the observer" (the additive `tab` option sentence stays out; W5 carries it); under `#### Tab`, the shipped `_nav.scss` transitions the control's colors and supplies no pane fade (replace "animates neither"); the `hidden.bs.tab` departure states that Bootstrap dispatches it when the outgoing completion runs, which waits on an outgoing control carrying `fade` and otherwise runs before the incoming control takes `active`.

**H. Names and types (the subjective lane's F3 to F5).** Name the door parameters of `#holds`, `#apply`, and `#select` for the element each token list is read on, in this class's terms (the host's and the pane's), and name `#select`'s element parameter `control`. Rename `#record` to `#save`. Rename `#planRoles` and `#writeRoles` to names covering roles and states. Replace the `readonly [HTMLElement, string, string]` tuple with a named readonly record type in `types.ts` (an element, an attribute name, and its value, with TSDoc) and `#dropdown`'s inline return type with a named readonly record type there (`wrapper`, `toggle`, `menu`); neither needs a § Surface row unless `test:guides` asks for one.

Not yours: `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `tests/setupBrowser.ts`, `ROADMAP.md`, every vendored file, the `tab` option sentence in § Delegation, the shared-target restoration (J-SNAPSHOT-SHARED), executing the guide fence.

## Scope

Owned: `src/browser/Tab.ts`, `src/browser/Delegate.ts`, `src/browser/constants.ts`, `src/browser/helpers.ts`, `src/browser/validators.ts`, `src/browser/index.ts`, `src/browser/types.ts` (items E, G, H only), `tests/src/browser/Tab.test.ts`, `tests/src/browser/Delegate.test.ts`, `tests/src/browser/helpers.test.ts`, `tests/src/browser/validators.test.ts`, `tests/src/browser/index.test.ts`, `guides/veneer.md` (the Tab § Surface rows, the `Delegate` § Surface row, the `DelegateInterface` and `TabInterface` Methods rows, the Tab fence, `#### Tab`, the two § Delegation sentences item G names, and the `plugin` row), `tmp/j-tab/**`. Off-limits: everything else. Tools: read, edit, write, the scoped commands under Acceptance. No install, no commit, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, no merge.

## Execution

Perform the assignment directly in the worktree and spawn nothing. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Output

Your final message is the report, in the round-1 shape: files touched, per item the red reading and the green reading with the exact command, the instrument (`tmp/j-tab/mutations-2.py`, `tmp/j-tab/mutations-2.log.txt`, every round-1 row kept and the new rows added, one full run, receipt), the acceptance commands with exit codes and summary lines, `git status --short` and `git diff --stat`, and the deviation state. No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: the names item H asks for within its constraints, the fixtures of the new proofs, the instrument row titles, and where each new case sits. Stop and report if an item cannot be closed inside the owned files or if a gate outside your items reddens.

## Acceptance criteria

In this order, each exit 0 from the worktree: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; `npm run build:src:core`, `npm run build:src:styles`, `npm run build:src:browser`; `npm run test:conformance`; `npm run test:setup`. The instrument's full run reddens every row's named case and ends `receipt: restored byte for byte`.

## Review evidence

The Orchestrator captures the diff and status with its own gate run after you return; your report carries the status and diffstat.
