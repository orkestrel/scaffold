# J-HELPERS audit round 3 — the objective lane's verdict (GPT-6 Astra, retained 2026-09-24)

Thread `01a0d36c-005f-7303-8279-849fb4281c8a`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-helpers-audit-3.jsonl` (launch copy under `tmp/codex/`); 31 commands; 386 s; usage {"input_tokens":3048533,"cached_input_tokens":2864256,"cache_write_input_tokens":0,"output_tokens":9826,"reasoning_output_tokens":2494}. Retained verbatim from the exec's last message.

---

Objective lane — source review against `main`, installed Bootstrap 5.3.8, and retained execution evidence.

1. **CONFIRMED — `readOutermost`.** Attacked with a matching root, mixed selector-list matches, an SVG ancestor containing an HTML match, a document whose `html` and `body` match, and a fragment containing nested and independent matches. The query runs once; containment is judged before HTML filtering, preserving document order (`src/browser/helpers.ts:436`). The assertions distinguish these inputs (`tests/src/browser/helpers.test.ts:798`, `:810`, `:816`, `:826`, `:837`, `:844`).

   Restoring the former scoped query breaks the document and fragment assertions; bypassing nesting only for fragments breaks the fragment assertion; accepting every match breaks the nested cases; considering only the selector list’s last part breaks the mixed-list assertion. The retained failures name those cases (`j-helpers-mutations-3.log.txt:4`). The original red log independently records the document and fragment failures (`j-helpers-a-red.log.txt:11`, `:38`), followed by the green run (`j-helpers-a-green.log.txt:9`).

   Carousel still delegates its item reading directly; Collapse excludes nesting among all host/transition matches before selecting shown or transitioning siblings and excluding itself (`src/browser/Carousel.ts:558`; `src/browser/Collapse.ts:338`). Their round-2 and round-3 diff blocks are identical.

2. **CONFIRMED — dropdown light dismissal.** Attacked by disabling an already-open anchor toggle, then invoking `hide`, `toggle`, outside-click dismissal, and Tab-release dismissal. Explicit methods retain the disabled refusal; light dismissal passes `false` into the shared conceal path (`src/browser/Dropdown.ts:199`, `:238`, `:271`, `:319`, `:370`). The bypass preserves destroyed, in-flight, already-hidden, and prevented-event refusals. Post-dispatch checks and write-by-write ownership checks remain in place (`:322`, `:334`, `:291`).

   Bootstrap likewise checks `isDisabled` in `show` and `hide`, but calls `_completeHide` directly from `clearMenus` (`node_modules/bootstrap/js/src/dropdown.js:123`, `:159`, `:356`). The guide states the fieldset difference and the light-dismissal behavior (`guides/veneer.md:1460`, `:1505`).

   Changing `#conceal(click, false)` back to `true` fails the named regression. Restoring the token/platform-only predicate also fails it because explicit `hide` must refuse (`j-helpers-mutations-3.log.txt:13`, `:15`; `tests/src/browser/Dropdown.test.ts:540`). **Evidence bound:** the original red run stops at the outside-click assertion; it does not independently demonstrate a red Tab assertion (`j-helpers-b-red.log.txt:12`). The passing case asserts Tab focus and closure, and source inspection establishes that it reaches the same conceal path.

3. **CONFIRMED — remaining `closest` extractions.** Attacked ScrollSpy with a non-element event target and a nearest non-HTML `[href]` match. Its element guard precedes `readClosest`, and only an accepted HTML match reaches the section map, preserving `main`’s behavior (`src/browser/ScrollSpy.ts:371`; `src/browser/helpers.ts:380`).

   Attacked dismissal with an explicit outside target and an inside fallback ancestor. The unbounded target succeeds first, suppresses fallback, and then fails containment. A missing target permits fallback; a nearest SVG fallback is rejected without searching farther (`src/browser/Delegate.ts:636`). These operations preserve `main`’s order.

   The remaining bare `closest` calls perform menu/list traversal or existence checks; none retains the extracted closest-then-HTML-guard composition (`src/browser/Delegate.ts:750`; `src/browser/Dropdown.ts:306`; `src/browser/ScrollSpy.ts:317`, `:322`, `:331`).

4. **CONFIRMED — wording and returned contract patch.** Attacked the summaries against SVG-first rejection, root equality, `disabled="false"` on anchors versus buttons, inherited fieldset disabling, and a viewless document. The descriptions, remarks, and Surface rows agree with the implementations (`src/browser/helpers.ts:359`, `:444`, `:492`; `guides/veneer.md:73`, `:76`, `:77`).

   The returned `DropdownSelectorMap.trigger` patch describes refusal by `show`, `hide`, and `toggle` without applying that refusal to light dismissal (`j-helpers-report-3.md:195`). **Landing bound:** the worktree still contains the old sentence at `src/browser/types.ts:868`; the brief explicitly makes this a report-only patch. Its integration remains required at landing. Guide parity’s recorded exit is green (`j-helpers-gates-3.log.txt:87`).

5. **CONFIRMED — preserved extraction state.** Comparison of the retained round-2 and round-3 diffs confines changes to the repairs and wording named above. The current source hashes equal the mutation log’s before/after hashes (`j-helpers-mutations-3.log.txt:1`, `:32`). The status contains the owned paths (`j-helpers-3-status.txt:1`).

   The route attacks held:

   - **Closest and target bounds:** SVG-first rejection, self/root inclusion, an outside closest ancestor, and an outside first target followed by an inside target retain their intended results. Delegate’s preflight and routes retain their root bounds; Tab’s list/wrapper readings and the tab-key list reading remain unbounded, with the chosen keyboard control checked afterward (`src/browser/Delegate.ts:507`, `:669`, `:682`; `src/browser/Tab.ts:257`, `:268`, `:289`; `src/browser/helpers.ts:190`).
   - **Sibling order:** Dropdown reads following, preceding, then parent descendants and skips non-HTML matches. Delegate reads preceding, following, then parent descendants, selects the first enabled match, and only then applies the HTML/root guard. ScrollSpy takes the nearest preceding match before its HTML check. A non-HTML match therefore stops the latter readings where `main` stopped them (`src/browser/Dropdown.ts:375`; `src/browser/Delegate.ts:745`; `src/browser/ScrollSpy.ts:329`).
   - **Scrollbar timing:** ScrollLock still measures before hiding overflow and again afterward, retaining the intervening abort/view check. Modal measures its host’s document at the same adjustment point (`src/browser/ScrollLock.ts:73`, `:80`; `src/browser/Modal.ts:416`). The null-view mutation binds the viewless assertion; it does not establish nonzero scrollbar behavior (`tests/src/browser/helpers.test.ts:907`).
   - **Disabled routing:** Alert, modal-dismiss, toast-dismiss, tab click/key, and dropdown click/key retain the shared predicate and their previous prevention/mark ordering. Button, Collapse, Carousel, and modal-opening routes retain no disabled check. ScrollSpy’s hash-bearing anchor/area population cannot acquire native `:disabled` behavior through this extraction (`src/browser/Delegate.ts:615`, `:636`, `:652`, `:674`, `:697`, `:749`; `src/browser/ScrollSpy.ts:248`). Dropdown-entry navigation intentionally retains its separate selector (`src/browser/Delegate.ts:732`).
   - **E12 and destruction:** Conflict refusal remains before routing or marking. Marks remain keyed by event, entity, and driven host. An outside collapse panel remains unmarked; destruction checks leave unreached hosts available to a live outer delegate. Existing engines still remove their corresponding construction conflict (`src/browser/Delegate.ts:474`, `:534`, `:580`, `:820`, `:885`; `tests/src/browser/Delegate.test.ts:881`, `:942`, `:983`).

   The whole-file mutation rows bind their named assertions, rather than merely reporting a failing suite (`j-helpers-mutations-3.py:181`). In particular:

   | Proof | Mutation distinguished |
   |---|---|
   | Closest SVG rejection | Widening the guard or continuing to a farther HTML ancestor |
   | Closest containment | Bounding the starting element instead of the returned match |
   | Bounded target | Searching for a later inside match |
   | Sibling order | Reversing direction or returning farthest first |
   | Delegate disabled/ordering cases | Taking the disabled toggle, deleting following siblings, reversing precedence, or deleting parent fallback |
   | Dropdown menu cases | Deleting either sibling branch or parent fallback, reversing precedence, or accepting SVG |
   | ScrollSpy parent reaction | Choosing the farther preceding link or omitting the preceding parent |

   The assertions identify the selected host/menu or require the nearest parent’s destruction reaction (`tests/src/browser/Delegate.test.ts:2301`, `:2327`; `tests/src/browser/Dropdown.test.ts:815`, `:845`; `tests/src/browser/ScrollSpy.test.ts:798`). Thus the recorded `EXACT` and `JOINED` rows bind those mutations. The containment row does **not** independently prove evaluation order between otherwise equivalent checks.

   The barrel exports and export-list assertions agree (`src/browser/index.ts:3`; `tests/src/browser/index.test.ts:147`, `:157`).

6. **UNRESOLVED — independent mutation replay; remaining clauses confirmed.** The required `j-helpers-mutations-3-orchestrator.log.txt` is absent. The Orchestrator’s replay, with named failures, unmutated greens, and restoration verification, settles this clause.

   The supplied gate exits agree with the claim (`j-helpers-gates-3.log.txt:20`, `:74`, `:87`, `:100`, `:122`, `:134`, `:147`, `:160`, `:198`, `:741`). Attacking scope through the complete diff and whitespace-insensitive guide diff found no additional source changes or prohibited added TypeScript constructs; the large Surface change is padding around the authorized rows. The writer records no `prove` call, and the retained chain contains no install, commit, or discarding git operation (`j-helpers-report-3.md:11`; `j-helpers-acceptance-3.sh:1`). These confirm the records, not an independently observed history of every writer action.

**Findings fitting no claim:** none substantiated.

**Attacked and held:** The dropdown event guard rejects keyboard events as click payloads and contains throwing accessors; the engine supplies `undefined` for Tab dismissal, matching `DropdownDetail` (`src/browser/validators.ts:258`; `src/browser/types.ts:809`; `tests/src/browser/validators.test.ts:326`). The dismissal, offset, and static parsers remain unchanged and preserve their declared invalid-input behavior (`src/browser/parsers.ts:120`, `:143`, `:170`). E12 permits different-host routes and its documented cross-delegate configuration; neither is a same-delegate conflict defect.

**Referrals:** Orchestrator — complete the independent mutation replay and integrate the returned `types.ts` patch before landing.

**Bounds:** No browser test, build, mutation, or gate was rerun. No files were written and no agents were spawned. No `prove` call was made; no refused-call receipt was produced. Behavioral conclusions rely on source comparison and retained executions, not fresh execution by this lane. E13’s carried restoration bounds remain outside this extraction.

VERDICT: FAIL 6; outside the claims: none
