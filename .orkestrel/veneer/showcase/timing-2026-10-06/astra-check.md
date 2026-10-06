## 1. Ruling 2: modal refusal — HOLDS, within the shipped table

[Modal.ts:232](/home/user/.wave/veneer-containment/src/browser/Modal.ts:232) confirms emission, conditional `overflow-y` write, `modal-static` addition, transition wait, focus, class removal, second wait, and overflow restoration. Precisely, the first wait is **armed before focus** and awaited afterward. The fallback duration includes 5 ms at `helpers.ts:935–945`.

`Trap.ts` contains no attribute or class writes. The observer at `tests/setupBrowser.ts:3519–3527` ignores `style` records.

The predicate covers both static-dialog refusals—Escape and backdrop—not only Escape. Both enter `#prevent`; the specimen declares no initial inline overflow (`app/browser/sections/modal.html:82–90`). The remaining unchanged modal rows are hidden Escape and trapped Tab (`tests/setupBrowser.ts:5300–5334`); they do not require a bounce wait. Existing modal tests use the proposed predicate at `Modal.test.ts:409–415` and `:464–470`.

This establishes the predicate’s applicability to these specimens. It does not identify the actual mutation in `jb2b-1`, whose report records only the aggregate refusal error.

## 2. Ruling 3: teardown, panel scope, and counts — HOLDS

The teardown chain is synchronous once `destroyShowcase()` begins:

- `buildJourney` → `buildShowcase`: `tests/setupBrowser.ts:1417–1423`.
- `buildShowcase` → `destroyShowcase`: `:1398–1402`.
- `destroyShowcase` → `journeyVeneer.destroy()`: `:1494–1499`.
- Owned components are destroyed synchronously: `src/browser/Veneer.ts:115–128`.
- Tip destruction removes its panel synchronously: `src/browser/Tip.ts:267–291`.

This removes the preceding journey’s owned engine panels. The reuse comment belongs to `buildComponent`, at `tests/setupBrowser.ts:3663–3669`.

The direct-child predicate **can be true** despite static specimens inside `main`. Engine panels default to `body` at `Tip.ts:203`; the `app/browser` TypeScript and HTML contain no `container:` option or `data-bs-container`. Static specimens such as `tooltips.html:57` and `popovers.html:50` are nested descendants, excluded by a direct-child query.

Scanning every available `journey/dark-390.txt` found 44 files; nine contain the relevant tooltip preservation rows. Their results are:

| Run | Light 390: line → `excluded` | Dark 390: line → `excluded` |
|---|---:|---:|
| `completion-b3-journey-after-2` | 370 → 10766 | 377 → 10766 |
| `completion-b3-journey-after-3` | 370 → 10766 | 377 → 10766 |
| `completion-b3-journey-after-3b` | 370 → 10766 | 377 → 10766 |
| `completion-b3-journey-after-4` | 370 → 10766 | 377 → 10763 |
| `completion-b4-journey` | 376 → 10766 | 383 → 10766 |
| `jb2-1` | 370 → 10766 | 377 → 10766 |
| `jb2-2` | 370 → 10766 | 377 → 10766 |
| `jb2b-1` | 370 → 10763 | 377 → 10766 |
| `jb2b-2` | 370 → 10763 | 377 → 10766 |

Thus **15/18 read 10766**. Every corresponding 1280 tooltip row reads 10763, at lines 356/363, or 362/369 for `completion-b4-journey`.

The lifecycle distinctions also hold: `panel` exists at `Tip.ts:141–143`; `phase` can read hidden while a panel remains connected at `:312–320`; the hidden event is not an unconditional disconnection signal at `:322–324`.

## 3. Ruling 4: popover measurements and titles — HOLDS

The named `report.json` assertion results reproduce:

| Run | Popover motion=true, ms | `outside.seconds` |
|---|---:|---:|
| `jb2b-1` | 102631.90000000596 | 58.14 |
| `jb2b-2` | 69602.39999999851 | 53.69 |
| `completion-b4-journey` | 165767.59999999404 | 57.33 |

The load values occur in each `measure.jsonl` summary, respectively at lines 5302, 5397, and 6006. The popover ratio is **2.3816362654**. Across the six named runs, motion=false ranges from 10801.1 to 13307.7 ms.

`it.each([row])` preserves these title strings when the row values, enclosing suite, and templates remain unchanged. Vitest formats `$family` and `$motion` from the row object (`node_modules/@vitest/runner/dist/chunk-artifact.js:2016–2033`, `:2188–2198`). Neither template uses an index placeholder, so resetting the `each` index changes no title.

## 4. Ruling 5: animation API and load evidence — REFUTED in the peak range

The API and provenance claims hold:

- `waitForAnimations(element, options?: WaitOptions)` exists in `@orkestrel/test/dist/src/browser/index.d.ts:3161`.
- The implementation waits on animation `finished` promises and rereads after completion or cancellation (`index.js:1329–1374`).
- [j0c4-history.md:26](/home/user/veneer/tmp/codex/j0c4-history.md:26) identifies 774.5 ms as a **scroll settle**, from diagnostics passing 66 tests with walls of 305.69 and 319.32 s.
- `completion-b3-journey-after-3b/report.json` records the offcanvas failure at 1000.5 ms with `transform` still reported running. This is a censored reading, not a successful settle.

The load comparison recomputes as follows. Peaks are CPU seconds per wall second.

| Run | Wall seconds | Outside CPU seconds | Peak | Summary line |
|---|---:|---:|---:|---:|
| `completion-b3-journey-before` | 493.962 | 41.90 | 1.28950 | 4843 |
| `jb2-1` | 546.807 | 62.45 | 1.31056 | 5342 |
| `jb2-2` | 547.652 | 55.33 | 1.38880 | 5355 |
| `jb2b-1` | 544.307 | 58.14 | 1.49602 | 5302 |
| `jb2b-2` | 550.959 | 53.69 | **1.50983** | 5397 |
| `completion-b4-journey` | 618.627 | 57.33 | 1.20226 | 6006 |
| `completion-b3-journey-after-3b` | 561.992 | 116.28 | 3.21284 | 5482 |

The draft’s band peak range **1.20–1.50 is incorrect**; rounded to two decimals, it is **1.20–1.51**.

The report names the transition property, but not its effect target or start time. It therefore does not independently establish that one particular 0.3 s offcanvas transition ran continuously for the entire measured second.

## 5. Ruling 6: scrollspy completion — REFUTED

**The polling arithmetic is wrong.** `previous` starts at −1 and `settled` at zero (`tests/setupBrowser.ts:5611–5618`). The immediate first read establishes the position without incrementing. Eight subsequent unchanged reads require **nine evaluations and eight nominal 10 ms delays: approximately 80 ms plus scheduling and callback cost**, followed by a frame. The implementation supplies no 70–80 ms upper bound (`@orkestrel/test/dist/src/core/index.js:239–251`).

The `after-3b` figures hold: `top=160`, `height=255`, `extent=1378`; therefore 415 < 1378. But focus inside the region does not prove which element consumed a key. The existing source explicitly records that boundary Home/End can scroll the outer page **while focus remains inside** (`tests/setupBrowser.ts:5684–5685`). The proposed focus check does not establish the draft’s exhaustive two-case diagnosis.

The proposed `Promise.all([waitForEvent(...), pressKeys(key)])` subscribes first: `waitForEvent` invokes `subscribe` before its first suspension (`core/index.js:429–455`).

**Two frames are not a completion contract.** HTML orders scroll steps before animation-frame callbacks and intersection computation afterward. IntersectionObserver notification is then a separately queued task; task-queue selection does not guarantee its delivery before the next animation frame. The draft changes “normally comes after” into a guarantee that the standards do not provide. [HTML processing model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model), [IntersectionObserver task delivery](https://w3c.github.io/IntersectionObserver/#queue-intersection-observer-task).

Chromium **141.0.7390.37 on this host**, with the proposed element-scroller keyboard sequence, remains **unverified**. U5’s future case cannot be cited as existing evidence.

## 6. Rule R — REFUTED

The clauses do not form an executable measurement rule as written.

| Clause | Finding |
|---|---|
| **R1: eligible runs** | `end.json`, `measure.jsonl`, and assertion status supply duration, load, and pass/fail. They do not record an immutable source tree or lock ownership. R1 also admits only full journeys, whereas U9 sizes the witness from integration-project command runs. |
| **R2: margin** | The arithmetic rounds correctly: 618.6/494.0 = **1.2522267206**. Its interpretation as variance on one tree is false. |
| **R3: wait budget and slack** | Computing this requires individual successful wait durations and the enclosing timeout. U1’s specified report inputs provide neither: assertion results contain duration and status, but no timeout or inner ceiling. U1 does not specify reading U7’s `Settle probe` entries. |
| **R4: test timeout** | The formula is computable after supplying the missing inner ceiling and eligible duration population. Those inputs must be explicit; they cannot be recovered from the listed JSON fields alone. |
| **R5: load relationship** | “Do not follow `outside.seconds`” has no operational definition. U1 cannot reproducibly mark every R5 case from this instruction. |
| **R6: re-derivation trigger** | The comparison is executable once each timing entry is mapped to its bound and margin. The proposed records do not specify that mapping for individual waits. |
| **R7: constants** | Executable once the preceding measurement gaps are resolved. |

The endpoint runs used different code:

- `completion-b3-journey-before/start.json:19`: cwd `/home/user/.wave/veneer-containment`; start 00:33:05. The checkout reflog places HEAD at **`ec37454`**.
- `completion-b4-journey/start.json:17`: the same cwd; start 05:24:39. The reflog places HEAD at **`06ff28e`**, whose tree is identical to amended commit **`638435a`**: `ec931b2a37c3aac02147e58b17ce53619ecf028c`.

Between these trees, B3 materially expands preservation work; the two relevant test files differ by 551 insertions and 305 deletions. The reports corroborate changed cost: the preservation cases go from **13.213/10.671 s** in `before` to **106.147/85.905 s** in B4.

Excluding `completion-b3-journey-before` from sizing the changed preservation implementation is therefore **right**. Continuing to use its wall time as the denominator of a supposedly same-tree margin is **wrong**.

R1 permits a passed measured test inside an otherwise failed run. Consequently, `jb0-2`’s exit 1 is not independently sufficient to reject all its measurements, as draft line 28 suggests. Its popover assertion failed, but its header assertions passed; source comparability remains a separate requirement.

## 7. Units U1–U9 — REFUTED

The instrument references here resolve to the available [recorded instrument directory](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/journey-cost-2026-10-05/instruments).

| Unit | Ownership, acceptance, and ordering finding |
|---|---|
| **U1** | One instrument file is sufficient for a report reader. The acceptance figures name runs, but reproducing R3/R4 requires additional inputs for wait measurements, enclosing timeouts, and inner ceilings. Its declared output cannot establish U8’s slack criterion from the specified inputs. |
| **U2** | The owned integration file is sufficient for the diagnostic. Placement before U3 is correct. The repeat-until-10766 instruction has no outcome for runs that never reproduce it; it cannot promise completion. |
| **U3** | The owned files cover the helper, proof, and reader. Its historical-baseline criterion is impossible on the supplied tree: B4 already adds unrelated `Container widths` and `Breakpoint scroll wrappers` rows. These appear at `completion-b4-journey/journey/dark-390.txt:239–240` and are absent from J-B2. U3 cannot differ **only** on tooltip preservation while preserving every other row. `lanes.md:89` already records these accepted B4 differences. |
| **U4** | Ownership covers the helper and both proof locations. The specified file and full-run gates are identifiable. Acceptance proves Escape only; it does not itself prove the broader shipped-refusal coverage discussed in item 1. |
| **U5** | Ownership is sufficient. Its acceptance cannot establish a standards-guaranteed two-frame barrier. The no-movement path also conflates boundary scrolling with nondirectional keys such as Escape. Preserve those separate cases in the helper’s specification. |
| **U6** | Ownership is sufficient. Timing entries containing `seconds`/`milliseconds` are excluded by recorded `compare.ts:101–108,226–228`. The harness sets failure state before announcing (`browser/index.js:3879–3882`), supporting immediate logging. The scratch failure criterion is concrete. |
| **U7** | **Its required artifacts are not produced by its command.** Recorded `run.ts:124–145` starts sampling only for `--kind journey`; `:197–211` likewise copies journey artifacts only for that kind. U7 requests `--kind command` but requires `outside.seconds`. Existing `scrollspy-ab-*` command folders corroborate the absence of `measure.jsonl`. U7 also cannot intercept direct animation imports in `tests/app/browser/integration.test.ts` or the header wait in `Showcase.test.ts` by shadowing imports solely in `setupBrowser.ts`. |
| **U8** | The owned files cover the listed changes, and the existing bare animation-call inventory matches. But replacing `Showcase.test.ts:416–420` changes the predicate: “every button has no animations” becomes “the header subtree has no running finite animation.” This contradicts U8’s own “must not change … any predicate.” The existing control at `setupBrowser.test.ts:501–519` exercises `waitForCondition`, not `waitForAnimations`. |
| **U9** | Ownership covers timeout registration. Its integration command runs conflict with R1 and lack the load artifact U1 requires. “Every title” matching `jb2b-1/report.json` must be scoped to journey titles: that report contains no witness integration title. |

U2’s position before its dependent repair is correct. U7’s position before U8/U9 is also a valid dependency, but its collection protocol is unusable as specified. Furthermore, observing a ratio of 1.252 does not demonstrate capture of the historical 2.382 popover variation.

No separate cross-unit mutation of the preserved scenario lists, observer filter, or engine files is required by the listed edits. The concrete conflicts are the acceptance and measurement contradictions identified above.

The shared launch example also fails for an assigned checkout outside `/home/user/veneer`: its relative `--outputFile` resolves under `CHECKOUT`, while the run folder resolves under `/home/user/veneer`. Recorded `run.ts:293–306` rejects that mismatch. Use an absolute reporter output path.

## 8. Records to amend — REFUTED in part

Against the brief and the newest lane entries—B5 at `lanes.md:73–77`, B6 at `:79–85`, and B4 at `:87–91`:

| Proposed correction | Result |
|---|---|
| **Count and J-B2 split** | **HOLDS.** Item 2 reproduces it. `lanes.md:89`’s “once” claim needs correction. |
| **Tip exposes more than `phase`** | **HOLDS.** `Tip.ts:141–143` exposes `panel`; `:324` emits the profile’s hidden event, subject to its preceding branches. |
| **`buildJourney` rebuilds** | **HOLDS.** The brief confuses it with `buildComponent`; the prior-panel explanation in `lanes.md:89` also needs correction. |
| **Replace the landing baseline after U3** | **HOLDS conditionally.** A corrected deterministic reading needs a new baseline, but U3 must also account for already accepted B4 differences. This remains an Orchestrator decision, not an accomplished replacement. |
| **Compare requires `--host-bound` and `--out`** | **HOLDS.** Recorded `compare.ts:1,26–27` specifies both. |
| **774.5 ms was “not … from a passing four-project run”** | **REFUTED as a correction.** `j0c4-history.md:26` explicitly says the diagnostics passed 66 tests and reports the four variants. It establishes that the measured property was scrolling; it does not establish the proposed negation. |
| **After-3b load and simultaneous failures** | **HOLDS.** Its summary records 116.28 outside CPU seconds, and its report contains both named failures. |
| **Record load beside wall time** | **HOLDS.** But `measure.jsonl` measures visible process CPU consumption; it does **not** verify ownership of `/home/user/.wave/journey.lock` (`measure.ts:194–202`). |
| **Lane M folders and exit** | **HOLDS.** Both starts name `/home/user/.wave/journey-cost/M`; `jb0-2/end.json` records 1061.414 s and exit 1. |
| **`scrollspy-ab-*` readings unavailable** | **REFUTED.** All four folders and reports exist. Their results are below. |

The scrollspy assertion durations are:

| Run | Assertion duration, ms | Wall seconds | Result |
|---|---:|---:|---|
| `scrollspy-ab-b3-1` | 56166.0 | 68.136 | passed |
| `scrollspy-ab-b3-2` | 56736.8 | 70.119 | passed |
| `scrollspy-ab-base-1` | 56459.6 | 73.538 | passed |
| `scrollspy-ab-base-2` | 56112.7 | 67.968 | passed |

Thus **56.1–56.7 s describes test durations**, not run walls. These substantiate the isolated-pass record at `lanes.md:107`; they do not prove the full-run failure’s cause.

## Other refuted claims

1. **The motion=true modal explanation is stated as established fact.** Draft line 51 attributes completion specifically to the transition’s `finished` chain. `helpers.ts:945–949` races that path against a padded timer. Neither the passing reports nor the failure report identifies the winning path.

2. **Teardown proves the stray came from the act.** Draft line 65 establishes only that a preceding owned panel is removed. The same iteration also mounts, applies a theme, boots the engine, and arranges the scenario before acting (`tests/app/browser/integration.test.ts:1248–1267`). Those earlier steps have not been excluded.

3. **Scrollspy activation occurs only when active-link identity changes.** Draft line 123 overstates the implementation. `Scrollspy.ts:137` checks `#processed`; `:123` can reset that field on a nonintersecting entry without clearing another currently active link. A subsequent activation can therefore emit without a distinct previously active link. The event still cannot reliably terminate every press.

4. **Logging makes the outer timeout trip “only on a hang.”** Draft lines 30 and 145–146 overstate what logging changes. Vitest still fails any case exceeding its elapsed-time bound (`chunk-artifact.js:2288–2294`), including a finite slow execution. Logging preserves already announced failures; it does not change timeout semantics.

## Three most consequential findings

1. **Rule R cannot yet produce defensible budgets:** its fixed margin mixes changed workloads, and U7/U9’s command runs omit load evidence that R and U1 require.
2. **U3’s acceptance is impossible against J-B2 as written:** the supplied tree already carries accepted B4 row changes that U3 must preserve.
3. **U5’s two-frame guarantee is unsupported:** render-step ordering does not guarantee IntersectionObserver notification before the second frame.