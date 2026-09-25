# J-MOTION-PROOFS-B rounds 1 and 2 — the objective lane's verdict (2026-09-25)

`analyst` on GPT-6 Astra, read-only `codex exec`, thread `01a0d778-5d20-7780-a936-6100229d08ad`, journal `tmp/codex/j-motion-proofs-b-audit.jsonl` (swept at acceptance). The brief is `units/j-motion-proofs-b-audit-analyst-brief.md`. The lane's final message follows verbatim.

This is a source review at `fd82ae9` against the recorded Chromium receipts. No tests were run.

References use `B/` for `src/browser/`, `T/` for `tests/src/browser/`, `U/` for the brief’s evidence directory, and `M/` for the worktree’s `tmp/j-motion-proofs-b/mutations/`.

| Claim | Verdict | Evidence and mutation discrimination |
|---|---|---|
| **1. No owned proof pins a motion value** | **CONFIRMED** | Declared durations use `readDuration`; assertions use positive readings, relative ordering, or ratios. The retained zero readings are absence controls. See `T/Toast.test.ts:67`, `:159`, `:209`; `T/Collapse.test.ts:61`, `:433`; `T/Tab.test.ts:66`, `:544`; `T/Carousel.test.ts:393`, `:415`. The nav-link duration assertion is gone. The planted cascade passes; the unconverted baseline fails its literal assertions (`U/j-motion-proofs-b-plant-control-base.log.txt:14`, `:39`). |
| **2. Each completion proof uses the stated rendered-motion observer** | **FAIL** | Collapse, Toast, and Tab use the described observer and event readings (`T/Collapse.test.ts:407`, `T/Toast.test.ts:96`, `T/Tab.test.ts:424`). Carousel instead samples animations directly after `next()` returns, asserts nonempty samples then, and records only unfinished/current animation totals at `slid` (`T/Carousel.test.ts:352`, `:365`, `:375`). Its assertions distinguish early completion under `r2-carousel-yield`, but the claimed uniform observer mechanism and event-time presence reading are false. |
| **3. Toast fix and supersession** | **CONFIRMED** | The removal starts another settle followed by the ownership/token door (`B/Toast.ts:220`, `:226`, `:227`). Rewind checks the original call’s identity before every write (`B/Toast.ts:292`, `:339`; `B/helpers.ts:982`). It cannot overwrite an accepted superseding call’s writes. `toast-base` fails the show/hide, repeated-show, and takeover cases by assertion; `toast-fadein-yield` distinguishes early completion, and `toast-fadein-door` distinguishes missing supersession detection (`M/toast-base.log.txt:19`, `:53`, `:81`; `M/toast-fadein-door.log.txt:18`). The shown-less refusal boundary is detailed below. |
| **4. Carousel fix** | **CONFIRMED** | `Promise.all` settles outgoing and incoming items together under the engine’s signal (`B/Carousel.ts:529`). The order proofs assert actual animation end-time ordering (`T/Carousel.test.ts:415`, `:464`, `:557`, `:606`). `r2-carousel-base` and `r2-carousel-incoming` fail the outgoing-longer cases with an unfinished animation; `r2-carousel-outgoing` fails the incoming-longer cases. These are assertion failures, including the fade variant’s delayed drop (`M/r2-carousel-base.log.txt:19`, `:44`; `M/r2-carousel-outgoing.log.txt:18`, `:44`). |
| **5. Mutations bind their named proofs** | **CONFIRMED** | Every mutation row included in the replay fails its named proof by `AssertionError`. Collateral non-assertion failures do not supply that evidence. The replay’s error classification agrees with the individual logs (`U/j-motion-proofs-b-replay-2.log.txt:182`). The mutation/proof mappings and collateral errors follow below. |
| **6. Plant** | **CONFIRMED** | The replay records passing owned files under the plant and scratch removal (`U/j-motion-proofs-b-replay-2.log.txt:201`). Removing the plant makes its probe fail by assertion (`plant-logs/control-unplanted-PlantProbe.log.txt:10`, `:73`). Baseline Collapse and Toast proofs fail against the plant; baseline Tab and Carousel pass (`U/j-motion-proofs-b-plant-control-base.log.txt:14`, `:39`, `:58`). The script copies before planting, and the planter rejects roots outside the worktree’s scratch tree (`U/j-motion-proofs-b-plant.sh:23`, `:27`; `U/j-motion-proofs-b-plant.py:26`). These controls distinguish the planted cascade from the unplanted cascade. |
| **7. Unit’s rulings follow E32** | **FAIL** | The absence controls and shipped Collapse imports hold (`T/Toast.test.ts:67`; `T/Tab.test.ts:69`; `T/Collapse.test.ts:16`, `:25`). The feedback exemption does not follow from E32’s amendment: that amendment expressly retains Tab and Carousel among bound engines and exempts synchronous engines (`decisions.md:369`). Carousel changes indicators but settles only items (`B/Carousel.ts:377`, `:416`, `:531`); its completion fixtures omit indicators (`T/Carousel.test.ts:343`). No mutation tests the excluded feedback population. A longer indicator transition therefore remains outside these proofs. |
| **8. Reduced motion** | **UNRESOLVED** | Staged reduced-motion cases exist for Collapse, Toast, and Carousel, with Carousel reading outgoing and incoming items in each variant (`T/Collapse.test.ts:451`; `T/Toast.test.ts:352`; `T/Carousel.test.ts:619`). Tab has no `stageMedia({ motion: false })` case; its zero-factor case changes a CSS variable (`T/Tab.test.ts:499`). The reduced-motion mixin supports the intended behavior (`src/styles/_mixins.scss:351`), but the receipts do not establish the stated Tab proof. No reduced-motion mutation is supplied. |
| **9. Behavioral prose is true** | **FAIL** | The changed fade-in wait, Carousel wait, event summary, and showcase synchronization match the code (`guides/veneer.md:1858`, `:2413`; `B/types.ts:2293`; `tests/app/browser/sections/EngineSection.test.ts:313`). However, Toast’s class remarks and guide promise an identity read after **each dispatch** (`B/Toast.ts:43`; `guides/veneer.md:2489`). After `shown` and `hidden`, the implementation checks only destruction, not identity (`B/Toast.ts:229`, `:269`). A `shown` listener starting `hide()` changes the identity while the outer `show()` still resolves `true`. This is a behavioral statement mismatch; the supplied mutations do not exercise it. |
| **10. Scope** | **CONFIRMED** | The `1290162..fd82ae9` changed-path set matches the claim. The integration receipts account for the guide, contracts, and showcase (`U/j-motion-proofs-b-integration-1.log.txt:3`; `U/j-motion-proofs-b-integration-2.log.txt:5`). The source replaces the former completion paths without retaining a compatibility branch (`B/Toast.ts:225`; `B/Carousel.ts:529`). |

Toast’s failed-door trace distinguishes accepted supersession from a refused hide:

- An accepted later `show()` or `hide()` replaces `#change`. The older show fails `#owns` before examining `shown`; its rewind also fails ownership and writes nothing.
- If a hide starts while shown, and its `hide` listener removes `shown`, the hide still establishes its identity and expects `shown` absent (`B/Toast.ts:235–243`). The older show’s rewind cannot strip that hide’s `transition` write.
- If consumer code removes `shown` **before calling** `hide()`, that hide is refused at `B/Toast.ts:235`. It starts no change. The older show then fails its token door and may rewind its own `fade`/`transition` writes. That is direct-token takeover, not supersession by the refused hide.

The completion mutations discriminate as follows; each named failure is an `AssertionError`.

| Mutation | Proof distinguished from the passing case |
|---|---|
| `toast-base`, `toast-fadein-skip` | Show/hide completion, repeated-show completion, and fade-in takeover. |
| `toast-fadein-yield` | Show/hide and repeated-show completion: unfinished/current motion differs from the settled expectation. |
| `toast-fadein-door` | Fade-in takeover: the older show returns `true` instead of `false`. |
| `toast-show-skip`, `toast-show-yield` | Repeated-show completion; skip also fails intermediate-token assertions. |
| `toast-hide-skip`, `toast-hide-yield` | Show/hide completion and motion-factor ordering. |
| `collapse-show-skip`, `collapse-hide-skip` | Completion proof fails its positive-duration precondition. These distinguish synchronous completion, rather than establish the event-time reading. |
| `collapse-show-yield`, `collapse-hide-yield` | Completion proof fails its recorded settled-state assertion. |
| `tab-skip`, `tab-yield` | Pane completion and motion-factor ordering. |
| `r2-carousel-base`, `r2-carousel-incoming` | Outgoing-longer slide and fade cases: unfinished motion remains despite no current animation after cancellation. |
| `r2-carousel-outgoing` | Incoming-longer slide and fade cases: unfinished and current motion remain. |
| `r2-carousel-yield` | Ordinary, outgoing-longer, and incoming-longer completion in each variant; the queue case also fails by assertion. |

The older `carousel-skip`, `carousel-yield`, and `carousel-outgoing` logs also contain assertion failures. Their named completion/order proofs distinguish their mutations (`M/carousel-skip.log.txt:69`, `:84`; `M/carousel-yield.log.txt:20`, `:46`, `:72`; `M/carousel-outgoing.log.txt:17`). They are historical receipts: the replay explicitly replaces those rows with the round-2 rows (`tools/replay-motion-proofs-b-2.sh:4`).

These are the collateral non-assertion failures requested in claim 5:

| Mutation | Collateral case and error | Named proof’s own failure |
|---|---|---|
| `toast-show-skip` | “stops a show when the transition token leaves during its await, dispatching no shown event” — `Error: No transition`; “clears a pending delay when a show is accepted, even when that show stops before it completes” — `Error: No transition` (`M/toast-show-skip.log.txt:175`, `:188`). | `AssertionError`, at lines 26 and 49. |
| `toast-hide-skip` | “completes a hide when the shown token leaves during its transition, dispatching hidden and leaving no showing token” — `Error: No transition` (`M/toast-hide-skip.log.txt:77`). | `AssertionError`, at lines 20 and 43. |
| `collapse-hide-skip` | “returns a hide when the shown token returns during its transition, leaving the panel shown at its full height with no hidden event” — `Error: No transition` (`M/collapse-hide-skip.log.txt:110`). | `AssertionError`, at line 77. |
| `toast-show-yield` | The same stopped-show and pending-delay cases named for `toast-show-skip` — `AbortError` (`M/toast-show-yield.log.txt:47`, `:51`). | `AssertionError`, at line 19. |
| `toast-hide-yield` | The same hide-completion case named for `toast-hide-skip` — `AbortError` (`M/toast-hide-yield.log.txt:75`). | `AssertionError`, at lines 19 and 47. |
| `collapse-hide-yield` | The same hide-return case named for `collapse-hide-skip` — `AbortError` (`M/collapse-hide-yield.log.txt:46`). | `AssertionError`, at line 18. |

A behavior defect outside these motion claims follows from the source and belongs to E35’s existing ownership work:

- **Toast restores a token it never changed.** Smallest input: construct a toast on `<div class="toast fade">` with `{ animated: false, autohide: false }`; call `show()`; remove `fade` yourself; call `destroy()`. Destruction adds `fade` back. `#save` records it unconditionally despite the disabled animated write (`B/Toast.ts:194`, `:198`, `:346`), and snapshot restoration writes the recorded presence (`B/HostSnapshot.ts:112`, `:146`, `:319`). This contradicts E35’s change-aware ownership rule (`decisions.md:427`, `:441`). This witness is source-derived, not newly executed.

VERDICT: FAIL 2, 7, 8, 9