# Proposal: distinguish page lines, element references, and incomplete views

Preserve line-addressed reading. Correct reference accounting, put line addresses after their content, expose matches outside a requested range without moving its continuation window, and test explicit partial-view and action cues before implementation. The records establish the failures; they do not establish that any untested presentation fixes the 2B's search or the 4B's paging.

This proposal is read-only analysis. No model or browser test ran. The rendered candidate examples are derived from recorded text and projection code. Only this proposal file was written; the other redesign lane's output was not read.

## Evidence used

The following abbreviations identify absolute checkout roots: `S` is `C:/Users/mikes/WebstormProjects/scaffold`, `B` is `C:/Users/mikes/WebstormProjects/browser`, and `O` is `C:/Users/mikes/WebstormProjects/ollama`. Every abbreviated citation gives a path relative to its root and a line. Browser source was read at `b6dda22e3f6424cc7cdff13985c82f3336e945ed`.

The evidence rows separate recorded observations from conclusions that still require a model run.

| Row | Evidence and limit |
| --- | --- |
| E1 — completion baseline | M2diag reports 2B shipping and paging at 8/8, with cart, search, and checkout at 0/8. It reports 4B shipping, cart, search, and checkout at 8/8, with paging at 0/8. These are single attempts, not campaign acceptance. `O/tmp/codex/store-m2diag-report.md:4`, `:8`, `:9`, `:141`. |
| E2 — number interference | X1, removing line prefixes, changes every 4B cart first call from `click e11` to `click e7`. It also reduces 2B shipping to 1/8 and 4B search to 6/8. This supports interference from the prefixes, not a proven replacement format. `O/tmp/codex/store-ablate-2-report.md:5`, `:14`, `:21`. |
| E3 — continuation dependence | X2, removing the footer, reduces shipping to 0/8 on both models and 2B paging to 0/8. Declarative-footer A1 reduces 2B shipping to 6/8 and paging to 5/8; it leaves search at 0/8. `O/tmp/codex/store-ablate-2-report.md:15`, `:22`; `O/tmp/codex/store-ablate-report.md:8`, `:16`. |
| E4 — misplaced search | The cart call searches lines 47–52 for a link on line 11, receives no match, and enters C-loop or C-route. Search counts only text spans inside the requested range. `O/tmp/codex/store-m2diag-report.md:133`, `:134`; `O/tmp/codex/store-campaign5/M1/seeds/search.txt:15`; `B/src/core/helpers.ts:595`, `:604`, `:610`, `:714`. |
| E5 — search regression and historical confounding | The 0.0.26 A3 advertisement produces `type e4` with `kettle` and submission in 16/16 first replies. On the same seed, A2+capture instead produces `look`, after a journey description changes. The line-view diagnostics answer from catalogue prose without submitting a search. None of A0–A4 or X1–X6 restores 2B search. `O/tmp/codex/toolset-probe-last.md:11`, `:14`, `:30`, `:32`; `O/tmp/codex/store-m2diag-report.md:135`; `O/tmp/codex/store-ablate-report.md:7`; `O/tmp/codex/store-ablate-2-report.md:13`. |
| E6 — premature completeness | Every 4B paging attempt answers without a call. Its seed contains lines 1–34 of 80 and an explicit continuation footer. The failure persists through the tested factors. `O/tmp/codex/store-m2diag-report.md:137`; `O/tmp/codex/store-campaign5/M1/seeds/paging.txt:4`, `:39`; `O/tmp/codex/store-ablate-2-report.md:20`. |
| E7 — reference false failure | Every 2B checkout records exactly one order and the right confirmation code, but a reference-free read clears the harness's exposed set. A recorded call then successfully clicks the earlier `e3`. `O/tmp/codex/store-m2diag-report.md:136`; `O/tmp/codex/store-campaign5/M2diag/2b/logs/checkout-1.json:31`, `:42`, `:50`, `:71`; `O/tests/setupStore.ts:1143`, `:1156`. |
| E8 — format and bounds | The renderer prefixes each row with `N: `, reserves the exact footer, and stops at whole rows. The result limit is 4,000; the line-count bound is 100; the wrapping width is 800. `B/src/core/helpers.ts:792`, `:803`, `:807`, `:809`; `B/src/core/constants.ts:332`, `:847`, `:856`. |
| E9 — stability evidence and reporting gap | Element capture reuses a reference for the same session/backend node. The toolset compares complete projected content, but the renderer emits its change note only when requested `from > 1`. Header equality alone therefore cannot establish an unchanged page. `B/src/core/elements/BrowserElementManager.ts:410`, `:417`; `B/src/core/BrowserToolset.ts:793`, `:812`; `B/src/core/helpers.ts:755`. |
| E10 — paging claim | The oracle requires a successful model-issued read at a line named by an earlier model-issued read, with its actual window starting there. Actions and change notes invalidate earlier footers. The seed alone cannot supply that evidence. `O/tests/setupStore.ts:1442`, `:1449`, `:1454`, `:1461`; `O/tests/setupStore.test.ts:959`, `:977`. |

The bindings remain the campaign's numbered lines, inline references, ranges, bounded windows, exact continuation, page-text search, unchanged budgets, and intact oracles. API design still goes to the user before implementation. `S/.orkestrel/veneer/lifecycle/reading/campaign.md:8`, `:20`, `:28`.

## Question 1: Numbers and references

**Change.** Render every addressed row as `CONTENT [line N]`. Preserve each element's canonical `eN` token and its role/name order. Keep heading syntax and link addresses. A reference-bearing row therefore puts its element reference before its line address; a prose row still carries its line address.

The following excerpts are derived candidate rows, not captured candidate output. The underlying catalogue rows are recorded in `O/tmp/codex/store-campaign5/M1/seeds/search.txt:5` through `:16`.

```text
e3 link "Checkout" /checkout [line 3]
Search products [line 5]
e4 searchbox "Search products" [line 6]
### e7 link "Cedar Tea Tray" /product/p3 [line 11]
- $41.00. A slatted cedar tray that drains into a hidden reservoir. [line 12]
```

Add the address after semantic wrapping. Do not change `BrowserLine` content, document order, reference allocation, or the wrapping width to accommodate the suffix. This preserves the fact's line 52 and the token's line 80 while permitting fewer rows to fit a result. The existing separation between spans, wrapping, and addressed rendering supplies this seam. `B/src/core/types.ts:2469`, `:2475`; `B/src/core/helpers.ts:415`, `:552`, `:807`.

**Failure class.** Target the 4B's wrong-reference cart detour and the reference/line confusion visible in X1's effects.

**Predicted effects — hypotheses tested by N.** For the 4B, cart can select `e7` directly because the leading number on that row is the actionable reference. Shipping, search, and checkout are expected to retain their successful behavior; paging receives a clearer address but no independent reason to continue. For the 2B, cart and checkout can benefit from a clearer reference; shipping and paging can still follow numbered addresses; search receives an old-format control prefix but is not expected to be solved by numbering alone. E2 supports the interference mechanism and specifically warns against assuming search recovery.

**Risk to passing tasks.** The 2B's shipping and paging might depend on a leading numeric address rather than a numbered address anywhere. The 4B's shipping, cart, search, and checkout might react to the changed token sequence or smaller windows. N must guard every passing cell in E1, including the 4B's eventual cart completion.

**Rulings and rejected options.** This keeps every row numbered and references inline. Reject bare `N: ` or `N | ` as the candidate because the row still opens with the competing number. Reject deleting numbers from prose or controls: that loses addressability and repeats X1's demonstrated shipping risk. Reject changing references to `rN`, accepting bare numbers, or aligning reference numbers with line numbers: each changes a valid reference contract to compensate for a presentation problem. Explicit leading `line N |` remains a possible format, but is not selected because it retains the distracting number before the reference and adds comparable text.

## Question 2: Search scope

**Change.** Add page-wide discovery without wrapping or silently relocating a continuation window.

Keep the existing matching algorithm and the existing in-range selection: case-folded words and prefix matches, highest score within the range, and preceding context. When that range has no match, scan the complete projection and report the best page-wide matches. Show the earliest best match as an addressed excerpt with its adjacent context, then show the requested window beginning at `from`. Label the excerpt and the window separately. A global miss must say that the whole page has no matching words; a range miss with earlier matches must not say that the page has no match. The unchanged matching and local-window mechanisms are in `B/src/core/helpers.ts:595`, `:620`, `:724`.

For the recorded cart call, the result must expose the real tray reference and preserve the requested window. This schematic example omits intervening window rows deliberately; its omissions are explanatory and must not appear in a tool result.

```text
Page matches for "Cedar Tea Tray": line 11.
Match context outside the requested range:
- $22.50. An end-grain birch board with a juice groove on one face. [line 10]
### e7 link "Cedar Tea Tray" /product/p3 [line 11]
- $41.00. A slatted cedar tray that drains into a hidden reservoir. [line 12]
Window:
Our workshop opens to visitors on the first Saturday of each month. Come and watch a kettle being hammered, or bring an old board and we will show you how to restore it. [line 47]
```

Reserve the requested window's header, next complete row, and exact footer before fitting supplemental match content. Bound the match-number list by the existing match cap and by available room. Never cut a reference or an addressed row. Fit the selected match row before optional adjacent context; if even that row cannot fit alongside the minimum window, return a bounded limit refusal rather than claiming the match was exposed. Normal-limit acceptance must include the complete tray excerpt. Existing metadata and whole-row reservation are the implementation seam, not permission to enlarge the limit. `B/src/core/constants.ts:850`; `B/src/core/helpers.ts:725`, `:808`.

The footer describes only the contiguous `Window` section. Supplemental excerpts cannot earn paging continuation credit. The parser must locate the window explicitly, rather than treating the first addressed match excerpt as its start.

**Failure class.** Target C-loop and C-route at their initial false range miss.

**Predicted effects — hypotheses tested by S and completion runs.** For the 2B, cart receives `e7` despite the misplaced `from`; checkout searches can also recover an earlier control. Shipping retains its in-range fact search. Paging keeps advancing even when `policy` matches its earlier heading. Search can still match kettle review prose and remains unresolved by this change. For the 4B, direct cart, search, and checkout paths are unchanged; shipping keeps its local search; paging is not fixed until it actually calls a tool. E4 supplies the cart mechanism; E5 limits the search prediction; E10 requires preserving the continuation position.

**Risk to passing tasks.** For 2B shipping and paging, added match context consumes window space and might distract from continuation. For 4B shipping, cart, search, and checkout, any unnecessary read can incur that same cost. In-range successful searches must retain their selected match, and complete attempts must remain within existing turns and time targets.

**Rulings and rejected options.** Keep a page-wide match row, with actual text and a reference when present; a numeric match index alone still asks the model to recover with another call. Reject unconditional wrapping to the earliest match. The 2B's passing paging transcript repeatedly searches `policy token` while continuing forward; global wrapping can repeatedly return the policy heading instead. `O/tmp/codex/store-campaign5/M2diag/2b/logs/paging-1.json:22`, `:31`, `:72`, `:76`; `O/tmp/codex/store-campaign5/M1/seeds/paging.txt:8`. Reject moving the main window backward only on a range miss for the same reason. Reject ignoring `to` or refusing combined search/range calls: either breaks the existing request or turns E4 into a refusal. This changes search semantics and needs the campaign's API approval, but leaves its rulings intact.

## Question 3: Truncation salience

**Change.** Keep a stable page-identity header and put a separate, explicit window-state line immediately after it. Retain the exact footer. Use `PARTIAL PAGE` when any document lines are absent, including a window that reaches the document's end but omits earlier content. Use `WHOLE PAGE` only when every line is present. Derive this state from the selected window; never store another flag.

Change the harness framing to `The browser returns this page window:`. That sentence does not assert that the window is partial when a short page is complete. The existing framing is `The browser shows this page:`. `O/tests/setupStore.ts:878`.

The following candidate opening is derived from the recorded policy seed and the combined presentation proposed here. Offline whole-row fitting yields 3,993 characters, ending at line 32 under the unchanged 4,000-character limit. This is a text-size calculation, not a browser or model measurement.

```text
page "Shipping policy" http://127.0.0.1:49171/policy (80 lines)
PARTIAL PAGE: window 1–32; later page text is not shown.
```

The source seed and fitting rule are `O/tmp/codex/store-campaign5/M1/seeds/paging.txt:4`, `:5`, `:39`, and `B/src/core/helpers.ts:803` through `:819`. Recompute the selected end while reserving both status and footer; do not transform the old footer while retaining a stale end coordinate.

**Failure class.** Target P-premature.

**Predicted effects — hypotheses tested by H.** For 4B paging, an explicit incomplete-evidence statement before the prose may prevent its claim to have reviewed the whole page. Its shipping can retain continuation and its cart, search, and checkout can retain visible-element actions. For the 2B, shipping and paging can retain continuation, but cart, search, and checkout might become more read-biased. E6 establishes the false completeness judgment; it does not prove that a stronger header changes it.

**Risk to passing tasks.** Extra metadata can shorten 2B shipping/paging windows and encourage unnecessary reads in 4B cart/search/checkout. The 4B shipping guard also matters: footer removal already demonstrated that a total-line count alone is insufficient, E3.

**Rulings and rejected options.** Keep state in both header and footer. Header-only loses the successful local continuation cue. Footer-only has already coexisted with P-premature. Reject task-specific warnings such as claiming that an answer or token lies later: the renderer cannot know that. Reject describing a final partial window as the whole page. All rulings remain intact.

## Question 4: The footer's pull

**Change.** Keep the executable continuation, but state its purpose explicitly. Use the following footer for the combined catalogue candidate, whose offline fit ends at line 43 and measures 3,900 characters. Its source is `O/tmp/codex/store-campaign5/M1/seeds/search.txt:4` through `:51`, with the same E8 fitting rule.

```text
[lines 1–43 of 52; 9 after; for more page text, call read with from 44]
```

For a middle window, print omitted counts before and after. At the end, omit the next-call clause and state `end of page`, while the header still says `PARTIAL PAGE` if earlier lines are missing. Every action result uses the same rule.

Pair this purpose-qualified continuation with visible action cues from Question 5. Apply the same formatting to every task. Do not decide whether to show a footer from the user's requested task or from a page's having a search box.

**Failure class.** Target the 2B's shared initial continuation on cart, search, and checkout, while protecting shipping and paging.

**Predicted effects — hypotheses tested by F and the combined arm.** For 2B cart/search/checkout, the footer can be read as an option for obtaining more text rather than the prescribed next action; the row cues supply the competing action. For 2B shipping/paging, the explicit tool, parameter, and coordinate remain. For 4B shipping, those same cues remain; cart/search/checkout are expected to stay action-oriented; paging needs H as well. E3 is evidence against deleting the command and evidence that a wording change alone is inadequate.

**Risk to passing tasks.** The 2B might lose its learned footer response even though the command remains; this directly risks shipping and paging. The 4B might also lose shipping continuation or add reads to its passing action tasks. Treat these as measured risks, not as resolved by grammatical clarity.

**Rulings and rejected options.** Reject omitting the footer, changing it to an unexplained number, or hiding it on pages with controls: shipping opens on the same catalogue as the action tasks. `O/tests/setupStore.ts:285`; `O/tmp/codex/store-measure-report.md:85`, `:94`. Reject restoring A1 alone, because its recorded regressions and search failure are explicit. The selected footer still names the actual next line and keeps every ruling.

## Question 5: The 2B's search

**Change.** Restore the reference-first control row, add a truthful tool cue to supported controls, and distinguish page-text search from submitting a site's search field in the read description.

Use `[type]` for references with roles accepted by `BROWSER_TYPED_ROLES`, and `[click]` for link/button references. Omit the cue on disabled controls. The cue names an available operation, not a completed action or a promise that an element cannot disappear. Keep it presentation syntax outside searchable text, and attach it after semantic wrapping so it cannot renumber later prose. The role set already governs typing; reuse it. `B/src/core/constants.ts:387`, `:397`; `B/src/core/helpers.ts:502`, `:504`.

The combined candidate makes the search field and button distinguishable without mentioning the task query.

```text
e4 searchbox "Search products" [type] [line 6]
e5 button "Search" [click] [line 7]
### e7 link "Cedar Tea Tray" /product/p3 [click] [line 11]
```

Use the following read copy. The parameter names and required `from` remain; the description measurements were calculated offline from these exact strings.

| Field | Exact copy | Measured characters |
| --- | --- | ---: |
| Description | `Reads text already on the page and locates its elements. Site search uses the page's search field.` | 98 |
| `from` | `First line of the window: 1 for the top, or the next line named in a footer.` | 76 |
| `to` | `Last line of the window. Default: as many whole lines as fit.` | 61 |
| `search` | `Words on this page. If the range has no match, also shows matches elsewhere.` | 76 |

The tool description measures 17 words. Measure the complete serialized definitions too; passing the individual copy bound does not establish the total bound. Existing read copy explicitly invites learning a fact or finding an element, and describes only matches at or after `from`. `B/src/core/constants.ts:454`, `:469`.

**Historical ruling.** The record cannot identify one old-format feature that caused `type e4`. The old outline begins control rows with `e4 searchbox`, separates headings from referenced links, and lacks line prefixes; the line projection adds prefixes, folds product headings, and offers text search through the same read tool. `S/.orkestrel/veneer/lifecycle/reading/absorb.md:13`, `:16`, `:19`; `B/src/core/helpers.ts:303`, `:319`, `:807`. However, the old seed already contains kettle review prose, and changing only a journey description changes the old first call, E5. The old-format explanation is therefore confounded by tool definitions and prompt changes; deleting line numbers already failed to recover search, E2.

**Failure class.** Target S-answer, with secondary benefit against typing into buttons in C-loop.

**Predicted effects — hypotheses tested by A, D, and the combined arm.** For 2B search, the action cue adjacent to `e4` and the explicit scope of `read.search` can restore a submitted site search instead of treating review prose as results. This is the proposed restoration mechanism, not an observed restoration. Cart and checkout can also choose their visible control; shipping and paging still need read. For the 4B, search already succeeds, so the goal is preservation; cart can avoid a detour with N; checkout can keep its form flow; shipping and paging gain no necessary factual content from action cues. E5 supports the distinction that needs restoring, while E4 records why a button/type cue could matter.

**Risk to passing tasks.** Additional action cues might divert 2B shipping/paging and 4B shipping into controls. Definition changes might disturb 4B cart/search/checkout even when semantically accurate; E5 demonstrates sensitivity to seemingly unrelated copy. The combined candidate must pass guards, not merely produce a more plausible first reply.

**Rulings and rejected options.** Reject claiming that the record proves a unique cause. Reject renaming `search` to `find`, which X6 tested without search recovery. Reject removing reviews, hiding matching prose, making `read.search` submit a form, or supplying query/product-specific suggestions: each changes the task or conflates intents. Reject restoring `look`/`plain` or advertising journey tools to reproduce an old prompt. The proposed cues are page-derived capabilities, and the copy contains no task answer. Every ruling remains intact.

## Question 6: Reference tracking

**Change.** Accumulate exposed references across successful reads of an unchanged page. A window containing no references adds nothing; it does not erase prior exposure. Reset on a page change, tab/context change, or an action boundary before collecting the following view. Check an action's supplied reference against the preceding exposure set before applying that reset.

The claim is that a model uses a reference it was shown for this page. Requiring that reference to appear in the most recent slice is a stronger, different claim. It is incompatible with retaining knowledge across disjoint windows of an unchanged page. E7 observes the resulting false failure; E9 observes that browser references survive repeated captures.

Do not implement this as an unqualified union or a same-URL check. Emit the existing projection-change note on a changed read from line 1 as well as on a continuation. A successful unchanged read can then extend the set; changed content or a changed stable page header resets it. Preserve the identity header independently of window-state text, so a change of range alone cannot reset the set. Treat capture/document-loss refusals as invalidation; a parseable argument refusal alone exposes no references. An action without a returned view conservatively leaves no retained exposure. These rules avoid requiring a public revision parameter for the measured store paths, while keeping unknown state conservative. The reporting gap that must close is `B/src/core/helpers.ts:755`; the existing comparison is `B/src/core/BrowserToolset.ts:793`.

In the harness prompt, replace `from the latest result` with `shown on this unchanged page`. Update retry predicates and assertions through the same shared helper; do not special-case checkout. The existing shared predicate delegates to that helper. `O/tests/setupStore.ts:138`, `:1347`.

**Failure class.** Target O-reference.

**Predicted effects.** The false latest-window failure is **observed**, E7. Reclassification of the archived checkout path as valid reference use is a **derived expectation**, to be checked by offline rescoring before a live run. For the 2B, checkout can pass without changing its actual order flow; shipping/paging gain no task behavior, and cart/search retain their task failures until other changes work. For the 4B, shipping/cart/search/checkout retain their valid exposure paths; paging gains nothing because it makes no call. Those preservation effects are hypotheses for the regression matrix, not retrospective acceptance claims.

**Risk to passing tasks.** A missed reset could falsely admit a stale reference in any task. An excessive reset could falsely reject a passing 4B cart/search/checkout path, or either model's shipping after navigation. A format parser could also mistake a prose token or a receipt's retrospective reference for a fresh exposure. Test those cases before accepting reclassification. The unchanged-page guarantee is limited to observations available at the boundary; the actual element action must still reject a reference invalidated between observation and action.

**Rulings and rejected options.** This preserves the no-invention claim and preserves exactly-one-order, buyer, and confirmation checks. `O/tests/setupStore.ts:1526`. It deliberately removes the stronger latest-slice restriction recorded in the earlier plan, so report that amendment explicitly; do not describe it as preserving every byte of the old predicate. `S/.orkestrel/veneer/lifecycle/reading/plan.md:187`. Reject keeping that restriction by reprinting all earlier controls in every result: it spends the reading budget on duplicate material. Reject union across navigation, or deletion of the reference oracle: both weaken the claim. No campaign ruling needs relaxation.

## Question 7: Validation before implementation

**Change.** Test presentation with transformations of actual recorded or captured bytes. Test semantic changes with the real package implementation. Keep first-call productivity separate from task completion and from the reference-accounting correction.

The existing ablation instrument transforms seed/system/definition bytes, executes a first read, and judges the returned call. It does not run the model's next turn after that result. `O/tmp/probes/store-ablate.test.ts:65`, `:71`, `:87`, `:97`, `:107`. Consequently, it can test whether a seed changes tool choice, but cannot establish that an outside-range match row breaks C-loop.

The validation methods are assigned as follows.

| Change | Before package implementation | Required implementation proof |
| --- | --- | --- |
| N — suffix addresses | Transform every seed row and refit complete rows within the unchanged bound. Retain real line indices and content. | Shared renderer, action receipts, journey listings, and parsers agree on addresses and limits. |
| H — partial state and framing | Transform header/framing bytes, recomputing the selected range. Test the header and framing separately before attributing their joint effect. | State derives from the actual selected window, including end windows and empty/whole pages. |
| F — purpose-qualified footer | Transform the footer and recompute room. | Every emitted continuation equals the next omitted line. |
| A — control cues | Annotate supported real control rows; keep content and references. | Derive cues from existing roles/states; exclude cues from text matching; preserve wrapping and numbering. |
| D — read copy | Substitute the exact definitions, keeping schema shape and ordering. | Copy tests, guide parity, and real handler behavior match the description. |
| S — outside-range discovery | Offline calculations can establish which actual rows match. A seed-only transform cannot test recovery after a result. | Implement the search result in the package and run actual calls followed by model continuation. Do not substitute a fabricated tool result for acceptance. |
| R — reference accounting | Rescore immutable transcripts under both rules; report every changed classification. | Real unchanged reads, changed reads, navigation, action boundaries, and refused calls prove the reset rules. |

**Failure class.** Prevent attributing a first-call or scoring change to a completed task. This applies to C-loop, S-answer, O-reference, P-premature, and the passing 4B cart detour.

**Predicted effects and risks.** Instrumentation alone is expected to leave both models' behavior unchanged on every task when bytes are identical. That is an input-equality hypothesis checked by the control. Parser drift or mislabeled result sections can create false successes in any cell; E10 specifically makes a match excerpt dangerous to the paging judge. Use an absent-tool negative control, an unexposed-reference control, and a shifted-window control. A probe's exit code establishes collection, not task success; M2diag explicitly makes that distinction. `O/tmp/codex/store-m2diag-report.md:141`.

**Rulings.** No live validation ran in this lane. The proposed matrix preserves model settings, task prompts, fixture answers and line positions, limits, and attempt policies. Byte transforms are diagnostic evidence only; campaign acceptance uses the installed candidate package.

## Ranked change set

Apply the following order to the candidate, then remove a presentation addition only if the declared comparison shows that it contributes no required improvement and its removal preserves the guards.

1. **Repair R and change reporting.** Close the demonstrable checkout scoring defect and its invalidation seam before interpreting pass counts.
2. **Apply N.** Separate line addresses from reference tokens without deleting either.
3. **Add S.** Return the missed tray reference while keeping forward paging intact.
4. **Apply H and F together with their separate diagnostics.** State that a window is partial and retain an explicit, purpose-qualified continuation.
5. **Add A and D.** Restore visible control affordances and describe page search accurately; retain them only on measured benefit with passing-task preservation.

This is one candidate, not a claim that sufficiency or minimality is already proven. R repairs an evidenced contract mismatch. N and S address evidenced mechanisms. H, F, A, and D remain behavioral hypotheses; E5 and E6 require that qualification.

## Validation matrix and decisions

Run the following stages in order. Preserve the recorded port order `49171, 49173, 49177, 49181, 49183, 49187, 49189, 49193`, the task interleave, temperature 0, context 16,384, prediction cap 256, and the existing attempt/turn deadlines. Those settings and the diagnostic iteration bound are recorded at `O/tmp/codex/store-ablate-2-report.md:30`, `:123`, and `O/tmp/codex/store-m2diag-report.md:141`.

| Stage | Matrix | Decision stated before execution |
| --- | --- | --- |
| Offline evidence | Rescore every M2diag transcript under R; fit transformed recorded seeds; verify copy size, exact row content, and parser negative controls. | Stop on any invalid reference newly admitted across a change, lost task condition, answer leakage, bound violation, or line-52/line-80 movement. Do not promote rescored records to acceptance runs. |
| Presentation first replies | Baseline and N, H, F, A, D, then their combined presentation, on both models, all tasks, across the recorded ports. Within H, separate header-only and framing-only evidence from their combination. Execute pure first reads against the baseline implementation and label its unchanged search semantics. | Report every cell. Keep baseline guards for 2B shipping/paging and 4B shipping/search/checkout. A candidate losing a recorded passing first-call draw fails that guard. Cart recovery is judged again at completion because E1's 4B cart succeeds after an unproductive first call. |
| Candidate deterministic proof | Real package code for N/H/F/A/D/S and the harness R rule, with source/project tests before live runs. | Any failed acceptance criterion stops. Require the unchanged fact and token positions, genuine result bounds, change detection, and exact continuation credit. |
| Candidate M1 | First replies for both models, all tasks, across the recorded ports; execute each first read against the candidate. | Retain the plan's stop at 2/8 or fewer productive first calls for a task. Parser updates adapt syntax only. A recovered search call must still submit through the search field; a cart read must actually expose its target. |
| Candidate M2 | Single attempts to completion across those ports, both models, without retries. | Require 8/8 for every previously passing E1 cell. Require at least 7/8 for repaired failing cells to reach confirmation. Classify every failure and every 4B cart detour; do not use an average across tasks. |
| Confirmation | The prescribed 16 clean store-task runs on the 2B, followed by the prescribed 2 runs on the 4B, followed by the journey case. | Retain the existing attempt policy. A failed run ends that candidate's series; a changed build starts its confirmation afresh. Every task must pass in every required run, and the journey must pass without a second submission. |

The M1/M2 promotion rules and confirmation counts come from `S/.orkestrel/veneer/lifecycle/reading/plan.md:197` through `:202` and `campaign.md:53` through `:56`. The stricter preservation guard at M2 protects the observed passing cells rather than treating a regression to 7/8 as an improvement.

The smallest observed fall an eight-port preservation guard can detect is one lost success, or 12.5 percentage points. This is a finite-sample guard, not a population confidence claim. Record exact per-port inputs, tool-definition hashes, complete replies, result bytes, daemon/model identity, and model reload duration. A changed control input or identity invalidates attribution; do not mask ports or rerun a failed draw until it passes. E5's historical comparison explicitly warns that port-masked equality is insufficient. `O/tmp/codex/toolset-probe-last.md:56`.

Keep the existing per-attempt reporting targets: shipping 16 s/35 s, cart 15 s/25 s, search 28 s/27 s, checkout 14 s/20 s, and paging 15 s/31 s for 2B/4B respectively. Read any over-target transcript; do not raise the target after the run. `S/.orkestrel/veneer/lifecycle/reading/plan.md:204` through `:214`. Report actual turn counts; shortening the 4B cart detour is a hypothesis, not a precredited time saving.

## Implementation units

The following units run only after the design ruling and the applicable presentation evidence. Commands belong to Astra on this host; Opus supplies contract/copy judgment with commands run by the Orchestrator. No writing units share a checkout concurrently.

| Unit | Owned files | Dependencies and acceptance |
| --- | --- | --- |
| Presentation probes — Astra | `O/tmp/probes/store-ablate.test.ts`, `O/tmp/probes/store-helpers.ts`, and its explicitly assigned result directory under `O/tmp/codex/` | Before package edits. Preserve raw inputs and implement the declared transformations and syntax-aware diagnostic parser. Prove identity transform equality, complete-row fitting, and negative controls. Return counts, not a pass claim from probe exit alone. |
| Contract and copy — Opus | `B/src/core/types.ts`, `B/src/core/constants.ts` | After the design ruling. Keep tool names and parameter shapes; describe S's local window plus global discovery. Define any reusable result-layout data as readonly types before use. No public revision parameter, extra tool, or format mode. Pin copy and existing total bounds; the Orchestrator runs checks. |
| Projection and change reporting — Astra | `B/src/core/helpers.ts`, `B/src/core/BrowserToolset.ts`, `B/tests/src/core/helpers.test.ts`, `B/tests/src/core/BrowserToolset.test.ts`, `B/tests/service/toolset.test.ts`, `B/tests/service/document.test.ts` | After contract/copy. Implement N/H/F/A/S and unconditional changed-read reporting. Prove local hits, global fallback, global misses, reversed/out-of-range arguments, over-cap matches, small result limits, Unicode, action receipts, and identical numbering across unchanged reads. Prove that a range-miss fallback does not move its window. Exercise both page and DOM placements. Run touched files, their projects, and scoped checks. |
| Listing and transport conformance — Astra | `B/tests/src/core/BrowserJourneyToolset.test.ts`, `B/tests/src/server/BrowserMCPServer.test.ts`, `B/tests/service/journey.test.ts`, `B/tests/service/browse.test.ts`, `B/tests/distribution.test.ts` | After projection. Adapt shared-format expectations; verify journey results and MCP text remain wholly bounded and continuation coordinates remain exact. Production changes in `BrowserJourneyToolset.ts` or `BrowserMCPServer.ts` require explicit ownership if tests expose a separate formatting path; do not add aliases or enlarge vocabulary. |
| Harness accounting and parser — Astra | `O/tests/setupStore.ts`, `O/tests/setupStore/types.ts`, `O/tests/setupStore.test.ts`, `O/tests/service/browser.test.ts`, `O/tmp/probes/store-helpers.ts` | After candidate browser availability and after the probe writer releases the shared helper. Implement R, framing, suffix parsing, and explicit window parsing. Check prior exposure before clearing on actions. Prove empty unchanged reads retain exposure, changed reads from line 1 clear it, navigation/reloads invalidate, unexposed references still fail, and supplemental matches cannot earn continuation credit. Keep task predicates shared by retry and assertion. Pin the fact at line 52, token at line 80, absent seed answers, exact cart/search conditions, and exactly one checkout order. |
| Guide and parity — Opus | `B/guides/browser.md`, `O/guides/browser.md`, and assigned TSDoc on changed exports | After behavior settles. Document suffix addresses, partial state, local windows with outside-range matches, reference lifetime, and prompt procedure. Refresh the ollama guide as an upstream mirror. The Orchestrator runs guide proofs. |
| Independent audit, gates, and measurement | Read-only over the integrated diff and assigned records | Audit numbered contract claims and risky seams on an engine that did not write them. Then run the campaign's required gates and the declared M1-through-journey sequence. Verify actual results before acceptance. |

Keep the agent's string-result work and the release order already established by the campaign: browser 0.0.27 and agent 0.0.27, then the ollama re-pin and release. This redesign supplies no reason to reopen the agent's encoding design. `S/.orkestrel/veneer/lifecycle/reading/campaign.md:47`, `:58`.

The unresolved behavioral risks are 2B search recovery and 4B paging continuation. The evidence does not justify guaranteeing either. No proposal here drops a user ruling; the required user decision is approval of the amended presentation/search contract before implementation, as the campaign already requires.
