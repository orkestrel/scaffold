# J-TOOLTIP landing audit round 6 — the objective lane's verdict (GPT-6 Astra, retained 2026-09-24)

Thread `01a0d450-d77f-79b0-9f4d-63313198b817`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-tooltip-audit-6.jsonl` (launch copy under `tmp/codex/`); 33 commands; 473 s; usage {"input_tokens":2644847,"cached_input_tokens":2484096,"cache_write_input_tokens":0,"output_tokens":12793,"reasoning_output_tokens":4145}. Retained verbatim from the exec's last message.

---

OBJECTIVE lane. Source paths below are relative to `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip`; evidence filenames are relative to `scaffold/.orkestrel/veneer/engine/units`.

1. **CONFIRMED — merge preservation.** I attacked this by comparing the retained diff with the staged diff against `MERGE_HEAD`, inspecting removals, checking main’s Surface membership and order, and resolving the browser barrel through TypeScript. The retained diff matches. Main’s Surface names survive without duplicates or reordering; the styles section is unchanged. The resolved runtime exports exactly match `index.test.ts`’s expected list; deliberately excluding `Tooltip` makes that comparison fail.

   The additions follow Offcanvas in `src/browser/index.ts`, `constants.ts:514`, and `validators.ts:406`. The guide places Tooltip after Offcanvas and before Styles (`guides/veneer.md:2570`, `2840`). The removed guide lines concern `PlacementInput`, `TooltipSelectorMap`, and Tooltip’s compatibility row. No duplicate top-level declaration appeared in `helpers.ts`, `parsers.ts`, or `types.ts`. The attempted main-side omission was not found.

2. **CONFIRMED — `readClosest` integration.** I attacked the root boundary with a matching host, a match above the delegating host, and a modal ancestor above that host. `Tooltip.ts:282`, `595`, and `736` call the landed helper; no bare `.closest()` remains. The descendant lookup supplies the root and separately rejects the host itself. The modal lookups supply no root, so an ancestor above the tooltip host remains reachable.

   `helpers.ts:383` deliberately returns only an HTML closest match and refuses an out-of-root match; it does not continue searching beyond a rejected closest match. That is the landed helper’s documented behavior, not an accidental tooltip fallback.

3. **CONFIRMED — rebuild doors, with a bounded proof reading.** I attacked the rebuild with relocation and token removal during `show`, relocation during old-tip teardown, and a relocated stale tip from an earlier stopped show. `Tooltip.ts:339` captures the settled state before dispatch; `341` checks it before discard. After discard, `344` requires successful removal only when rebuilding a settled shown tip.

   The stale-tip case therefore permits a fresh show while preserving the relocated old node. `#discard` clears the old references and restores placement without moving a node outside its recorded container (`624–642`). This is the stated undo boundary.

   The red readings bind as follows:

   | Proof | Distinguishing mutation and evidence |
   |---|---|
   | Show listener relocates settled tip (`Tooltip.test.ts:2031`) | The round-4 source revert produces the named failure at `2054` in `j-tooltip-round5-red.log.txt`. It distinguishes the old implementation, **but does not independently pin the dispatch’s container read**: removing that read alone still reaches the later discard refusal. |
   | Show listener removes shown token (`2060`) | Replace `#holds(change, held)` with `#holds(change, undefined)`. Its false-result assertion fails; `j-tooltip-mutations-5.log.txt:21` names this case as `EXACT`. |
   | Closing listener relocates old tip (`2086`) | Remove `(held === true && !left)` from the post-discard refusal. Its false-result assertion fails; mutation log `:22` names this case as `EXACT`. |

   Thus the whole-file red binds the relocation regression to the former implementation; it does not prove which individual door catches it. I do not credit it with that stronger claim.

4. **CONFIRMED — teardown token read.** I attacked teardown with a closing listener that restores the token and also relocates the tip. Either failed condition prevents removal: `Tooltip.ts:636` checks the recorded container, and `637` checks the token when hiding. `#conceal` then refuses completion at `717`; no `hidden` event follows.

   The case at `Tooltip.test.ts:2118` checks the false result, retained parent, restored token, and absent completion event. Removing the token clause distinguishes the mutation from the passing implementation; `j-tooltip-mutations-5.log.txt:23` records the named `EXACT` failure, and the retained round-4 red also names it.

   Passing `false` during destruction intentionally removes a still-owned tip regardless of its token. It still preserves a relocated tip. After a takeover has cleared `#tip`, later destruction has no tip reference to remove; that is distinct from destruction directly encountering a still-owned tip.

5. **BROKEN — the `show` contract overstates hide takeover.** The sentence at [types.ts:1670](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/types.ts:1670) says a listener can start a hide and the show then resolves false and stops writing. The retained implementation and passing proof contradict it:

   - Start a fresh show and call `hide()` from `inserted`.
   - The tip lacks the shown token, so `#conceal` returns false before replacing the change identity (`Tooltip.ts:697`).
   - The show continues through promotion and its token write.
   - `Tooltip.test.ts:673–679` explicitly expects show `true`, hide `false`, and a shown tooltip.

   The guide’s opposite blanket statement also needs qualification: “a hide started before that write resolves `false`” (`guides/veneer.md:2760`) excludes the settled-tip rebuild. During that rebuild’s `show` dispatch, the old tip already carries the token, so a hide can take over before the replacement tip’s token write (`Tooltip.ts:339`, `697–699`). A hide started from `shown` instead begins a separate change after release; it does not invalidate the announced completion (`369–371`).

   **Smallest fix:** qualify the interface and guide by the actual state: a hide can take over while the tip is shown, including the settled-tip rebuild’s dispatch; before a fresh tip’s token write it is refused; completed-event listeners start independent changes. Preserve those implementation behaviors.

   The remaining attacked portions held:

   - P3 asserts false completion, retained relocation, open popover, and closure/restoration on destruction (`Tooltip.test.ts:1735–1745`). Removing the post-placement door produces its named `EXACT` failure (`j-tooltip-mutations-5.log.txt:13`). That row binds the stop after promotion, not a promise that positioning never occurred.
   - The restoration case reads the attributes **inside** the reaction after nested destruction returns (`Tooltip.test.ts:2164–2174`). A restore that ignores already-published pending targets would fail that assertion. `HostSnapshot.ts:152` walks those targets; the tooltip mutation instrument does not mutate `HostSnapshot`, so its rows do not supply a red reading for this case.
   - The value-returning calls use construction form (`Tooltip.ts:340`, `343`, `483`, `702`, `717`).
   - Bootstrap resumes at `_createPopper` after `inserted` without an ownership check (`node_modules/bootstrap/js/src/tooltip.js:212–217`). The guide’s comparison supports that absence of a check; it must not be read as a guarantee of successful completion after arbitrary disposal.

6. **CONFIRMED — recorded instrument, chains, and scope.** I attacked the record by checking the instrument’s classification logic, its actual named failures, restoration digests, retained gate output, and current Git state.

   `j-tooltip-mutations-5.py:358` reads individual assertion results; its `EXACT` classification requires a named failure without another failing case. The log records the claimed `EXACT`, `JOINED`, and `MISSED` distribution, the green controls, and ends:

   `receipt: restored byte for byte`

   The id-read mutation remains genuinely indistinguishable in this sequence: after destruction at the id write, the next occupancy step checks lifetime before another observable write (`Tooltip.ts:494`, `538–555`). That row proves no independent id-door binding.

   `j-tooltip-gates-6.log.txt:85–968` contains the independent successful gates, including the reported browser, guide, policy, conformance, and setup results. Current `HEAD` is `0807a4f`, `MERGE_HEAD` is `2d95b37`, and there are no unstaged or unmerged paths. Tooltip’s source is unchanged from round 5. The syntax inspection found literal `as const` annotations, which the governing TypeScript rule expressly permits, rather than type-overriding assertions. The reports record no writer commit or `prove` call.

**Findings fitting no claim:** none.

**Attacked and held**

- **Change sequence:** I traced content reads, template construction, token/id writes, slot release and fill, final content release, insertion, ARIA linking, `inserted`, placement, shown-token write, waits, and completion (`Tooltip.ts:325–374`, `476–556`). Build steps check lifetime/identity; published-tip steps additionally check parent/token. Destruction and re-entry stop subsequent forward steps. Returning owned content is the documented cleanup exception. Promotion retains the expressly recorded bound.
- **Hide sequence:** dispatch, token removal, wait, placement teardown, conditional removal, unlinking, and completion are guarded at their respective boundaries (`696–725`, `624–642`). Moving a node and then leaving it outside the recorded parent is preserved; destruction of a node still owned by the tooltip is intentional.
- **Delegation:** Tooltip has no `Delegate` route or E12 mark (`Delegate.ts:514–530`, `1005–1036`; `guides/veneer.md:2582`). Nested tooltip containers instead use the tooltip registry and their own ownership sets: the outer container declines a child owned by the inner container (`Tooltip.ts:736–751`). Aborting the owner removes listeners and destroys its children. Adding Tooltip to E12’s same-host refusal would introduce a route this landing does not declare.
- **Timing and parsing:** pending timers are cleared before replacement and on destruction; active hover/focus/click state prevents premature leave (`Tooltip.ts:807–842`). The retained timer mutations distinguish those behaviors. Payload events, throwing accessors, non-callable `setHTML`, negative/nonfinite delays, unknown triggers, and hostile fallback iterators are refused by the guards/parsers and their named mutation cases (`validators.ts:406–439`; `parsers.ts:242–356`). A structural callable sanitizer target is intentionally accepted.

**Referrals:** carry claim 5’s contract correction in the landing fix. Keep the already-reserved promotion guard with J-POPOVER. To pin relocation specifically at the rebuild dispatch, assert that the old placement remains promoted and unrestored when that dispatch stops the rebuild.

**Bounds:** this is a source review using retained executions, not a fresh browser run. Reaction ordering was checked against the [custom-element reaction rules](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions) and [popover algorithms](https://html.spec.whatwg.org/multipage/popover.html#show-popover). No browser suite, build, mutation, or `prove` call was run; there is no refused `prove` response to report. The independent replay remains the Orchestrator’s step.

VERDICT: FAIL 5; outside the claims: none
