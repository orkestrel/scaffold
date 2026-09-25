<!-- Grok lane recon-records, session 6ddfef6f-ee64-4b66-8ea7-b124dd6713b4 -->

I'll read the brief and follow it exactly.The brief is a read-only records check. I'll pull the plan, decisions, logs, and the design verdict it names.The plan names the design verdict's exit criterion. I'll read that section and the decision amendments the index points at.## Question
Where the J-ENGINE records stand: landed, in flight, queue, carried findings, exit criterion, and stale lines. Read-only.

## Evidence

### 1. Landed
`scaffold/.orkestrel/veneer/engine/plan.md:32-37` names these units. Presence is against `scaffold/tmp/cursor/evidence/veneer-main-log.txt` (newest first; tip `0865c67` at line 1).

| Unit | Commit in § Landed | In the main log |
| --- | --- | --- |
| J-HOLDERS | `0865c67` | Yes, `veneer-main-log.txt:1` |
| J-CASCADE | `8bc940d` | Yes, `veneer-main-log.txt:8` |
| J-INTEGRATION | `4cd56a8` (shared with J-SAMEWAY) | Yes, `veneer-main-log.txt:10` |
| J-SAMEWAY | `4cd56a8` | Yes, `veneer-main-log.txt:10` |
| J-SNAPSHOT-SHARED | `6dd5034` | Yes, `veneer-main-log.txt:22` |
| J-SANITIZER-CONTEXT | `6d27028` | Yes, `veneer-main-log.txt:28` |
| J-GUARDS | `3acad4c` | Yes, `veneer-main-log.txt:34` |
| J-ROADMAP | `ca83afb` | Yes, `veneer-main-log.txt:40` |
| J-POPOVER | none stated | No hash to check. The log has `unit/popover` at `veneer-main-log.txt:52` (`e2f861f`) and `e5017dc` at line 53. § Landed does not bind either hash. |
| J-PLACEMENT-HOST | none stated | No hash to check. The string does not appear in the 120-commit log. |
| J-SANITIZER | none stated | No hash to check. The log has `unit/sanitizer` at `veneer-main-log.txt:44` (`b7ae0ee`) and `d5aaea4` at line 45. § Landed does not bind either hash. |
| earlier units | unnamed, no commits | Not checkable from § Landed. |

### 2. In flight
`plan.md:26-30`.

- **J-SAMEWAY-ENGINES-A.** In audit at `7511b82` on `unit/engines-a`; unit commit `9019d81` (`plan.md:27`). Branch log: `veneer-unit-branches.txt:1-4` (`2760f7e`, `7511b82`, `9019d81`, then `0865c67`). `7511b82` and `9019d81` are absent from `veneer-main-log.txt`. Not shown landed.
- **J-SAMEWAY-ENGINES-B.** Round 2, door tables into `tests/setupBrowser.ts`, over uncommitted round-1 work in `tmp/worktrees/engines-b` (`plan.md:28`). Branch log: `veneer-unit-branches.txt:8-11` (`b8a8805`, `54a6c2f`, then `8bc940d`). `b8a8805` and `54a6c2f` are absent from `veneer-main-log.txt`. Not shown landed.
- **J-NATIVE-PROBE.** The same paragraph says it is closed on Chromium 153; round 3 replaced round 2 (`plan.md:30`). `decisions.md:248-264` records that 153 reading. No native-probe commit appears in `veneer-main-log.txt`. Its files are still listed (`engine-units-listing.txt:150-160`). Not shown landed on Veneer `main`.

`plan.md:29` is the integration rule for both engines units, not a third unit.

### 3. Queue
`plan.md:39-47`.

- **J-OVERLAYS** after J-HOLDERS and J-SAMEWAY-ENGINES-B (`plan.md:41`). J-HOLDERS has landed (`plan.md:33`, `veneer-main-log.txt:1`). J-SAMEWAY-ENGINES-B has not (`veneer-unit-branches.txt:9-10`).
- **J-COLLAPSE-SIZE** after J-SAMEWAY-ENGINES and a green Chromium 141 size reading (`plan.md:42-43`). Neither A nor B is on the main log. The prerequisite name `J-SAMEWAY-ENGINES` is not a unit heading in § Landed, § In flight, or § Queue. Those sections name `J-SAMEWAY-ENGINES-A` and `J-SAMEWAY-ENGINES-B` (`plan.md:27-28`).
- **J-ROWS**, prose rows (W5) (`plan.md:43`). No prerequisite stated.
- **J-ANCHOR-VISIBLE** (E29) only if Chromium 141's initial `position-visibility` is `always`, after J-SAMEWAY-ENGINES-B, J-ROWS, and the styles session's rule (`plan.md:44`). None of those three is recorded landed. Chromium 153's initial value is `anchors-visible` (`plan.md:44`, `decisions.md:258`).
- **J-ORACLE-RECORD**, the census, the fixes, and **J-ORACLE-GATE** (E28) (`plan.md:45`). Prerequisites J-SAMEWAY and J-SNAPSHOT-SHARED have landed (`plan.md:35-36`, `plan.md:45`, `veneer-main-log.txt:10`, `veneer-main-log.txt:22`). The styles-session answer on shared files is stated still open (`plan.md:24`, `plan.md:45`).
- **J-SHOWCASE** after the baseline closes (`plan.md:46`). That close is not recorded here.
- **E-VUE** after the exit criterion is met and the baseline closes (E26) (`plan.md:47`, `decisions.md:185`). Neither condition is recorded met.

No queued name also appears under § Landed. The struck sanitizer row (`plan.md:17`, `plan.md:22`) is not a queued unit.

### 4. Carried findings
Table `plan.md:61-97`. A row is open while it remains in the table (`plan.md:59`).

1. `plan.md:63` — `fill` `@returns` on `TooltipInterface` and `PopoverInterface` omit the in-flight refusal and inline `display: none`. Carrier J-ROWS. Closes with the two `@returns` sentences in `src/browser/types.ts`.
2. `plan.md:64` — `DropdownOptions.placement` summary and `static` leaf disagree with R9 and `_inNavbar`; `PlacementOptions` names `Placement` early. Carrier J-ROWS. Closes with the two summaries in `src/browser/types.ts` and their guide Summary cells.
3. `plan.md:65` — `typescript.md` names the boolean TSDoc form for a parameter and a return, not a property. Carrier: the user (a vendored scaffold rule file). Closes with a scaffold rule edit, outside this campaign. **Flag:** carrier is not a named unit. **Flag:** carrier is not in the queue or in flight.
4. `plan.md:66` — per-entity `### Vocabulary` mapping tables (R18), plus round 6's two accounting rows. Carrier J-ROWS. Closes with a vocabulary mapping table in each entity's guide subsection.
5. `plan.md:67` — each entity's subsection and `show` TSDoc state what "taken over" reads as; the popover's `show` TSDoc lacks it. Carrier J-ROWS. Closes with that sentence where it is missing.
6. `plan.md:68` — `@orkestrel/contract` `isInstance` narrows to `object`. Carrier: the user (a contract-package edit). Closes with a contract package change, outside this campaign. **Flag:** carrier is not a named unit. **Flag:** carrier is not in the queue or in flight.
7. `plan.md:69` — offcanvas responsive-hide departures from Bootstrap. Carrier J-ROWS. Closes with the offcanvas Compatibility row and the guide's departure bullets.
8. `plan.md:70` — the guide's Engine layer-rule sentence, deferred by the ScrollSpy round-2 verdict. Carrier J-ROWS. Closes with the guide edit that closes every `engine` row's Status and Obligation cells.
9. `plan.md:71` — `readButton`, `readSpecimen`, `readSubject`, and `readOracleButton` repeat one shape. Carrier J-FIXTURES, carried by the styles session. Closes with one lookup helper, or their removal. **Flag:** J-FIXTURES is not in this plan's queue or in flight.
10. `plan.md:72` — `Placement` has no guide section of its own. Carrier J-ROWS. Closes with a `#### Placement` section and its Methods table, beside the popover's arrow default.
11. `plan.md:73` — `#### Tab` and `#### Carousel` name a shared per-target record across engines. Carrier J-SNAPSHOT-SHARED. Closes with one record per saved target, or the sentences restating the bound. **Flag:** carrier has landed (`plan.md:36`, `veneer-main-log.txt:22`) and the row is still in the table. **Flag:** carrier is not now in the queue or in flight.
12. `plan.md:74` — snapshot round-2 wording bounds (Carousel restatement, Modal "presence record", `written`, `readonly HostSnapshotTarget[]`, `#### Dropdown` antecedent). Carrier J-ROWS. Closes when each sentence reads as the bound names.
13. `plan.md:75` — tooltip prose bounds B7, B8, B10. Carrier J-ROWS. Closes when each sentence is corrected, or ruled already closed on the landed source.
14. `plan.md:76` — a same-direction takeover stops the change before its writes finish (Offcanvas hide, Modal show). Carrier J-SAMEWAY. Closes with a case per door per engine, red first on `7fd28dc`. **Flag:** carrier has landed (`plan.md:35`, `veneer-main-log.txt:10`) and the row is still open. **Flag:** carrier is not now in the queue or in flight.
15. `plan.md:77` — `Collapse`, `Toast`, `Dropdown`, and `Tooltip` stop a change whose host moves the token toward its own end. Carrier J-SAMEWAY-ENGINES, after J-SAMEWAY lands. Closes with E24 applied per engine, a case per door red first. J-SAMEWAY has landed (`plan.md:35`). **Flag:** the carrier name `J-SAMEWAY-ENGINES` is not an in-flight or queued heading; the live names are A and B (`plan.md:27-28`).
16. `plan.md:78` — `readTag` `@example` spells the SVG namespace URI beside `SANITIZER_SVG_NAMESPACE`. Carrier J-ROWS. Closes when the example reads the constant.
17. `plan.md:79` — `Modal.ts` and `Offcanvas.ts` comments and the `#### Modal` sentence still state the retired take-and-publish model after E25. Carrier J-SAMEWAY (an exact patch at its landing). Closes when both sentences read E25's model. **Flag:** carrier has landed (`plan.md:35`) and the row is still open.
18. `plan.md:80` — a construction that saves or claims before a throwing read leaves a holder. Carrier J-SAMEWAY for `Modal` and `Offcanvas`; J-SNAPSHOT-SHARED round 2 for every other engine. Closes when each construction releases what it saved and claimed, a case per engine. **Flag:** both carriers have landed (`plan.md:35-36`) and the row is still open.
19. `plan.md:81` — `Modal`'s `#holdOpen` and `#releaseOpen`, `Isolation`'s claims, and `ScrollLock`'s holder set hand-roll the E25 holder rule. Carrier J-HOLDERS, after J-SAMEWAY and J-SNAPSHOT-SHARED land. Closes when each routes through the shared record, or a ruling says why one stays. **Flag:** carrier has landed (`plan.md:33`, `veneer-main-log.txt:1`) and the row is still open.
20. `plan.md:82` — fade proofs wait on a test-local `.fade` rule; Popover's animated path has no case; no proof varies the motion tokens; trusted touch drag unread. Carrier J-CASCADE for Alert, Tab, Toast, Tooltip, Popover, and the Carousel swipe; J-OVERLAYS for the Delegate stand-in and the Modal and Offcanvas motion-factor cases. Closes when each proof loads the shipped sheets, the false comments go, a Popover `animated: true` case runs, a motion-factor case per fade engine and Offcanvas shows the completed event after the token, and a trusted touch drag slides the carousel or reads the platform's cancel. **Flag:** J-CASCADE has landed (`plan.md:34`, `veneer-main-log.txt:8`) and the row is still open. J-OVERLAYS remains queued (`plan.md:41`).
21. `plan.md:83` — no Tab or Shift+Tab case in a shown Modal or Offcanvas; nested overlays have no real-engine proof. Carrier J-OVERLAYS, after J-SAMEWAY lands. Closes with the Tab traversal read red first where focus leaves the dialog, the guide's focus sentence true of it, and each composition driven with real engines. J-SAMEWAY has landed (`plan.md:35`). J-OVERLAYS is queued (`plan.md:41`).
22. `plan.md:84` — invoker commands, `interpolate-size` / `calc-size()`, `hidden="until-found"`, and CSS `anchor()` unruled at the J-TENETS audit. Carrier: ruled E27 (invokers and until-found refused; anchored arrow refused on Chromium 153; `calc-size()` green on 153, so J-COLLAPSE-SIZE adopts after the styles session's Chromium 141 run of `units/j-native-probe-3.test.ts`). Closes with the 141 size rows, then J-COLLAPSE-SIZE or its recorded refusal. **Flag:** the carrier cell is a ruling and a host reading, and also the queued unit J-COLLAPSE-SIZE (`plan.md:43`).
23. `plan.md:85` — missing TSDoc and `@example`s; the `engine | event` Obligation cell; `plugin` rows that read `shipped` while the Obligation names excluded behaviour. Carrier J-ROWS. Closes with the TSDoc and examples, each `plugin` row stating its departures, and the event row checked against `dom/event-handler.js`.
24. `plan.md:86` — only Button's parity comes from Bootstrap's artifact; the other eleven plugins check that a proof file exists. Carrier J-ORACLE (E26). Closes when every `plugin` row's proof compares against a per-plugin recording of Bootstrap 5.3.8. **Flag:** `J-ORACLE` is not a queued or in-flight heading. The queue names J-ORACLE-RECORD, the census, the fixes, and J-ORACLE-GATE (`plan.md:45`).
25. `plan.md:87` — no engine motion follows Elements; Elements interaction mechanisms are neither taken nor refused. Carrier: the styles session for the motion values (E26); J-CASCADE for completed events following the tokens; E29 for the interaction mechanisms (`anchors-visible` by J-NATIVE-PROBE round 2's `V.*` rows, then J-ANCHOR-VISIBLE). Closes when the styles session's motion unit lands, J-CASCADE's cases vary the tokens, and the `V.*` rows are read on both hosts, then the rule and J-ANCHOR-VISIBLE, or the refusal is recorded. **Flag:** J-CASCADE has landed (`plan.md:34`) and the row is still open. **Flag:** the styles session and E29 are not named units in this queue or in flight. `plan.md:30` says round 2's `V.*` rows could not tell the cases apart and round 3 replaced round 2.
26. `plan.md:88` — a consumer `hide-popover` or `toggle-popover` invoker, or `hidePopover()`, closes a promoted menu, tip, or popover and the engine does not see it. Carrier J-SAMEWAY-ENGINES (Dropdown, Tooltip, Popover). Closes with a case per engine, red first: an external close completes the hide, or the engine refuses it on the record. **Flag:** carrier name `J-SAMEWAY-ENGINES` is not a queued or in-flight heading. The branch subjects for Dropdown, Tooltip, and Popover are on `unit/engines-b` (`veneer-unit-branches.txt:9-10`).
27. `plan.md:89` — `HostSnapshot` writes `{ target, key }` inline in four places; the record and presence map values are inline the same way. Carrier J-HOLDERS. Closes when each shape is named once. **Flag:** carrier has landed (`plan.md:33`) and the row is still open.
28. `plan.md:90` — the guide does not state E30's two limits (shadowed form controls; XML-to-HTML attribute case). Carrier J-ROWS. Closes when the guide's § Engine states both once.
29. `plan.md:91` — the guide does not state that the backdrop is the engine's own element, or that a Modal or Offcanvas host is in a connected document. Carrier J-ROWS. Closes when the guide's § Engine states the rule beside E30's limits.
30. `plan.md:92` — the guide does not state that replacing `document.body` while an overlay holds its scroll lock is outside the contract. Carrier J-ROWS. Closes when the guide's § Engine states that limit beside E30's.
31. `plan.md:93` — the guide does not state the overlapping whole-`class` or whole-`style` target, or that `clear()` as a presence record's final departure leaves an emptied attribute. Carrier J-ROWS. Closes when § Ownership and restoration states both.
32. `plan.md:94` — on Chromium 153, `position-visibility` is `anchors-visible` by default, and the guide does not say so. Carrier J-ROWS, after the styles session's Chromium 141 reading. Closes when the guide states the platform default and its focus limit.
33. `plan.md:95` — no `ScrollLock` signal case; the ColorMode persist case distinguishes neither a present value's restoration nor the error's identity. Carrier J-HOLDERS, with `tests/src/browser/ColorMode.test.ts` granted. Closes with a signal case and a present-value case asserting `toBe(error)`, each read red under a mutation. **Flag:** carrier has landed (`plan.md:33`) and the row is still open.
34. `plan.md:96` — the Veneer `ROADMAP.md` J-ENGINE row lists carrier units and goes stale at each re-baseline. Carrier J-ROWS. Closes when the cell points at this section.
35. `plan.md:97` — a stopped show captures change identity after `isolation.destroy()` ran consumer code, and `backdrop.show()` adds `show` after a reaction started `hide()`. Carrier J-SAMEWAY. Closes when each reaction point the sweep reads incoherent is red first, under one invariant. **Flag:** carrier has landed (`plan.md:35`) and the row is still open.

**Duplicate:** no two rows state the same finding and the same close. Rows `plan.md:82` and `plan.md:87` both give J-CASCADE the motion-token proofs, with different closes. Rows `plan.md:87` and `plan.md:94` both carry the `anchors-visible` default, with different closes (a cascade rule and J-ANCHOR-VISIBLE, versus a J-ROWS guide sentence). Rows `plan.md:76` and `plan.md:97` both name J-SAMEWAY for re-entry, with different invariants.

### 5. Exit criterion
`plan.md:125-127` names the design verdict's items 1 to 9, the kickoff's acceptance items 1 to 6, and E26's oracle addition. The shape amendment is `j-engine-design-verdict.md:101`: item 2 adds R19; item 3 reads "the sanitizer port and its native adapter" in place of "sanitizer".

Design verdict, `j-engine-design-verdict.md:59-67`:

1. Every public engine contract is in `src/browser/types.ts`; `src/core/types.ts` is ruled unchanged. **None closes it.**
2. Event mechanism (R2, R3), ownership and restoration (R4), delegation with observer release (R5), transition completion (R6), plus R19; `TRANSITION_END` and every fixed fallback stay excluded. **None closes it.**
3. Focus, placement, `Backdrop`, `ScrollLock`, `Swipe`, the sanitizer port and its native adapter, and template, each with its first consumer. **None closes it.**
4. Each plugin obligation is implemented with its five-concern proof row. **None closes it.**
5. Every `engine` row is ruled per R15; every `plugin` row reads `shipped` after its cascade lands, or is retained pending with the baseline as the named gate. **None closes it.** `plan.md:51` says every engine family's cascade key has landed, read at `3203369`. That sentence does not close item 5.
6. Every `@orkestrel/*` candidate is ruled (R14) with the user's ruling recorded. **None closes it.**
7. `./browser/auto`, the jQuery rows, `isRTL`, and `CloseWatcher` (R7) stay excluded or deferred on the record. **None closes it.**
8. The seed's post-destroy defect is repaired (R16). **None closes it.**
9. The guide's engine sections are true of what shipped, `tests/guides.test.ts` is green, and the gate chain exits 0 on `main` at every landing. **None closes it.**

Kickoff acceptance, `j-engine-session-brief.md:279-297`:

1. Both type files carry every public engine contract, and the design verdict is retained with its routing ledger. **None closes it.** `plan.md:7` says the folder holds `j-engine-design-verdict.md`. That sentence does not say the contracts are complete.
2. Each shared mechanism landed with its first consumer and its mutation; the fixed transition fallback, `./browser/auto`, jQuery registration, and `isRTL` stay refused. **None closes it.**
3. Each plugin obligation's unit landed, with lifecycle, cancellation, focus, motion, and cleanup proved per component in Chromium 141, and its `plugin` row `shipped` with a Proof cell only after that key's cascade has landed. **None closes it.**
4. Every `@orkestrel/*` candidate is ruled in the design verdict; every runtime dependency change carries the user's ruling in its commit message. **None closes it.**
5. `format:check`, `lint:check`, `check`, `build`, `test`, and `test:service` exit 0 on `main` at every engine landing. **None closes it.** Related, not a close: `plan.md:33`, `plan.md:34`, `plan.md:35`, and `plan.md:36` report green gates for J-HOLDERS, J-CASCADE, J-INTEGRATION/J-SAMEWAY, and J-SNAPSHOT-SHARED. `plan.md:35` names `test:src:browser` 967, `test:setup` 321, `test:setup:browser` 88, `test:app` 223, `test:journey` 252, conformance 26, and every build.
6. The guide's engine sections and rows are true of what shipped, `tests/guides.test.ts` is green, ROADMAP `### The engine session` records the closure, and the engine records are pruned with their promotion record. **None closes it.** `plan.md:13` names earlier prune commits. That sentence does not record campaign closure.

**E26.** `plan.md:127` and `decisions.md:183`: every `plugin` row's proof compares against an independent recording of Bootstrap's bundle (J-ORACLE). **None closes it.** It is still queued, and the styles-file answer is still open (`plan.md:45`, `plan.md:24`). `decisions.md:184-185` records the other two E26 rulings (Elements motion to the styles session; E-VUE after the close). `plan.md:20-21` says those two questions are ruled. Those sentences do not close the oracle addition.

### 6. Stale lines
Lines the supplied evidence shows are no longer true:

- `plan.md:17` — the marker says Veneer `origin/main` is `6d27028`. The main log's tip is `0865c67` (`veneer-main-log.txt:1`). `6d27028` is `veneer-main-log.txt:28`. § Landed records four later landings at `plan.md:33-36`.
- `plan.md:23` — "whichever lands second merges the other's" hunk of `tests/setupBrowser.ts`. `plan.md:35` says the merge at `4cd56a8` already resolved J-FIXTURES' export conflict with `dbc7e0f`, and `plan.md:53` says J-SAMEWAY's nine row tables landed with `4cd56a8`.
- `plan.md:24` — "In flight are J-SAMEWAY round 3, J-CASCADE, and J-NATIVE-PROBE round 2." J-SAMEWAY round 3 is recorded landed and closed (`plan.md:35`, `veneer-main-log.txt:10`). J-CASCADE is recorded landed (`plan.md:34`, `veneer-main-log.txt:8`). J-NATIVE-PROBE round 2 was replaced by round 3 (`plan.md:30`, `decisions.md:248`).
- `plan.md:24` — "J-NATIVE-PROBE round 2's file comes to you for its Chromium 141 run when it returns." Round 3's file is `units/j-native-probe-3.test.ts` (`plan.md:30`, `engine-units-listing.txt:154`), and the 153 run is recorded (`decisions.md:248`).
- `plan.md:24` — planning for J-ORACLE "starts after J-SAMEWAY and J-SNAPSHOT-SHARED land." Both are in § Landed (`plan.md:35-36`). The styles answer is the clause `plan.md:45` still calls open.
- `plan.md:27` — J-SAMEWAY-ENGINES-A "is in audit" and the lanes "run" on the claims. The units listing already has `j-sameway-engines-a-audit-verdict.md`, the objective verdict, and the checker verdict (`engine-units-listing.txt:205-210`). `decisions.md:286-297` records that audit and assigns round 2. The branch tip above `0865c67` is still `7511b82` (`veneer-unit-branches.txt:2-3`); no later unit commit is in that branch listing.
- `plan.md:28` — J-SAMEWAY-ENGINES-B round 2 is "over its uncommitted round-1 work". `veneer-unit-branches.txt:9-10` shows `b8a8805` and `54a6c2f` on `unit/engines-b`.
- `plan.md:53` — "Pending shared changes. None are open." `plan.md:28-29` says both engines units still return `tests/setupBrowser*` as report-only patches for the Orchestrator to integrate at landing, and engines-B is moving door tables into that file.

`plan.md:30` says J-NATIVE-PROBE is closed on Chromium 153 while the heading at `plan.md:26` files it under In flight. The 141 run is still the decider for J-COLLAPSE-SIZE (`plan.md:30`, `decisions.md:256`). The 153 close is recorded; a Veneer landing of J-NATIVE-PROBE is not in the main log.

## Distillate
The marker is `6d27028`. The main-log tip is `0865c67`. Named § Landed commits through J-HOLDERS are on that log. The note still calls J-SAMEWAY round 3, J-CASCADE, and J-NATIVE-PROBE round 2 in flight. Live branch work not on the main log: J-SAMEWAY-ENGINES-A at `7511b82` on `unit/engines-a` (audit verdicts and an E24 amendment already recorded; round 2 assigned), and J-SAMEWAY-ENGINES-B at `b8a8805` / `54a6c2f` on `unit/engines-b`. J-NATIVE-PROBE's Chromium 153 reading is recorded; the Chromium 141 run of `j-native-probe-3.test.ts` is still the gate for J-COLLAPSE-SIZE and for whether J-ANCHOR-VISIBLE runs. J-ORACLE-RECORD's named code prerequisites have landed; the styles-session answer on its shared files is still open in the plan. Thirty-five carried rows are still in the table. Rows at `plan.md:73`, `plan.md:76`, `plan.md:79`, `plan.md:80`, `plan.md:81`, `plan.md:82`, `plan.md:87`, `plan.md:89`, `plan.md:95`, and `plan.md:97` still name a carrier § Landed records. No design-verdict item, kickoff acceptance item, or the E26 oracle addition is closed in `plan.md` or `decisions.md`.

## Unknowns
- Scaffold `origin/main` versus the marker `590adbea` (`plan.md:17`). No scaffold log was in the evidence set.
- Whether J-FIXTURES has landed. The marker and `plan.md:23` still describe it as landing with the E-ID units. `plan.md:35` says the `4cd56a8` merge resolved an export conflict with `dbc7e0f`. The main log does not label a commit J-FIXTURES.
- Landing hashes for J-POPOVER, J-PLACEMENT-HOST, J-SANITIZER, and the unnamed earlier units. § Landed states none. J-PLACEMENT-HOST is outside the 120-commit log. Popover and sanitizer lines in that log are not bound by the plan.
- Whether the open rows whose carriers have landed were left unstruck after the patch, or are still open in the source. This read did not open Veneer source. The table still lists them (`plan.md:59`).
- Engines-B's worktree. The branch file shows commits. `plan.md:28` says the round-1 work is uncommitted. The worktree itself was not inspected.
- The Chromium 141 native-probe result. `decisions.md:256` and `plan.md:30` say it is still awaited. It is not in these evidence files.
- Whether `plan.md:82` and `plan.md:87`, or `plan.md:87` and `plan.md:94`, are duplicates. The closes differ. No second record strikes either pair.

## Journal
Read `scaffold/.orkestrel/veneer/engine/plan.md` whole. Read `decisions.md` headings and each "amended at" paragraph, with `scaffold/tmp/cursor/evidence/decisions-index.txt`. Read `veneer-main-log.txt`, `veneer-unit-branches.txt`, and `engine-units-listing.txt`. Read `j-engine-session-brief.md` § Acceptance criteria (`j-engine-session-brief.md:279-300`). Read `j-engine-design-verdict.md` § Exit criterion and the exit amendment (`j-engine-design-verdict.md:55-69`, `j-engine-design-verdict.md:101`). No file was edited.

## Deviation
None.
