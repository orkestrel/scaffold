1. **Scope — CONFIRMED.**
   - `cl-status.txt:1-2` lists only `tests/setupServer.ts` and `tests/setupServer.test.ts`.
   - `cl-shared.patch` has three file headers and no others: `guides/veneer.md` at line 1, `tests/conformance.test.ts` at line 112, and `tests/setupStyles.test.ts` at line 278.
   - No file from the off-limits list in `b-cross-cl-brief.md:76-79` appears.
   - The patch to `tests/setupStyles.test.ts` is one line (`media: []`, `cl-shared.patch:285`). § Family record in `b-cross-design-verdict.md:35` lists that file as shared, so the Orchestrator's admission of it holds.
   - I did not re-run the apply check. I take the Orchestrator's apply ruling as given.

2. **Media conditions (X6) — CONFIRMED.** Evidence: the code's assertions and `cl-mutations.log.txt`, which I read in full.
   - **Readers.** `readConditions` follows the `readDeferrals` pattern exactly (`setupServer.ts:1097-1127`, compared with `cl.diff:702-737`). The `{breakpoint}` template is expanded from `collectBreakpoints` over the release's `--bs-breakpoint-*` values (`cl.diff:792-801`). The exclusive upper bound is written `{breakpoint} - 0.02px` (`cl.diff:817-823`, `cl-shared.patch:54`).
   - **Stronger than X6.** The Bootstrap cells equal the inventory's `media` list. X6 asked only that each cell be in the list (`cl-shared.patch:239-243`).
   - **Plant C6, the `(min-width: 600px)` condition.** It reddens the media case (log:167-177). The first assertion (`cl-shared.patch:236-238`) compares the whole feature set, and the log shows 15 features against 14, so the assertion tells the plant apart from the passing case.
   - **Plant C2, the `print` row removed.** It reddens the same case (log:107-117): 14 against 13. The failure is a set difference, not a presence check.
   - **Mutation M7, the offset ignored.** It reddens the expansion case (log:71-80), because `cl.diff:502-509` pins `575.98px` and `1399.98px`.

3. **Keyframes (X7) — CONFIRMED.**
   - **Presence gate.** It returns the exact X7 message (`cl.diff:1159-1163`). Mutation M1 makes the gate unreachable. The assertion `toBe('Shipped component btn is missing keyframes btn-pulse')` at `cl.diff:351-353` then receives `undefined` and fails (log:1-10).
   - **Written fixture.** Deleting the keyframe reddens only the presence scan: `collectLedger` returns `{departures:[],additions:[]}` with and without the keyframe (`cl.diff:365-366`).
   - **Refusal.** Mutation M2 replaces the throw with `continue`, and the `toThrow('Keyframes orphan-spin answers to no shipped component')` assertion fails (log:12-21).
   - **Withheld-key ruling.** It fits X1.
     - X1 attributes by the record before the name. The existing `attributeSelector` remark (`setupServer.ts:2369-2371`) already keeps "a selector recorded only under a key this release withholds … outside the ledger". The keyframe loop now applies the same order (`cl.diff:1121-1129`).
     - A keyframe that a withheld key records is attributed, not "unattributed", so X7's refusal does not reach it.
     - The departure is bounded. If a withheld key's keyframe shipped, the keyframes parity case would fail (`cl-shared.patch:264-271`): the table must equal every cascade keyframe, and it must also equal the union of the shipped keys' recorded keyframes. No retained run exercises this.
   - **Both branches pinned.** `cl.diff:381-405` covers them. A shipped key (`table`) records `btn-pulse`, which the name `btn` would otherwise claim. A withheld key (`spinner`) records `orphan-spin`.
   - **Proof by reading only.** Suppose the record check were narrowed to shipped keys. Then `orphan-spin` would throw at `cl.diff:399`, and `toEqual([])` would never be reached. No run of that mutation is retained.
   - **X7's word "alone".** The unit reads it as "in the written fixture" (report:297-300). That reading is the only coherent one, because X7's own parity case reads the same cascade (C5, log:153-165).

4. **Condition-keyed priority — CONFIRMED.** Evidence: the code and log:93-105 and 207-225.
   - `collectDeclarationPriorities` splits the selector list with `list.comma` and keys each selector with its normalized condition (`cl.diff:1074-1089`).
   - **Swap C1.** It turns the key below the boundary to `[true]` and the key above it to `[false]`. The join comparison at `cl-shared.patch:209-219` names both keys; the log shows "expected [ …(2) ] to deeply equal []".
   - **Control C1b.** The case as it stood at `42fd88e` stays green, with the swap held in the built cascade (log:217-225).
   - **Fixture proof.** Mutation M4 removes the condition from the key and reddens the fixture proof (log:34-43). That proof also pins the rival reading, the set comparison, as agreeing (`cl.diff:563-565`), so it separates the two readings.
   - The comment and title of the conformance case read true.

5. **The `__proto__` digest — CONFIRMED.**
   - Both maps get a null prototype (`cl.diff:1199-1206`).
   - Mutation M3 removes the null prototype from the digests map. `Object.keys(...)` then returns only `['bootstrap.css']`, which fails the check at `cl.diff:179` (log:23-32).
   - **Components half.** If the null prototype came off the components map, `cl.diff:181` (`['__proto__']` against `[]`) and `cl.diff:183` would fail. I confirm this by reading only; no run is retained.
   - The report states that the components half has no mutation of its own (report:141-142).

6. **Guide — BROKEN.**
   - **What holds.**
     - Every "Written by" cell matches the source (`src/styles/_mixins.scss:154-220`, `_reset.scss:10`, `utilities/_display.scss:13`). No `prefers-color-scheme` exists in `src/styles`.
     - Every "Reduced motion" cell matches `bootstrap.css:4987-4991` and `6269-6273`, and has no placeholder rule.
     - The parity cases redden on a removed row (C2 and C3), in the conformance project.
     - The one-term-per-concept requirement holds: "animation" for the thing, and "keyframes" for the at-rule and the table.
   - **(a) Width.** The guide wraps at `printWidth: 100` (`.oxfmtrc.json:7`), and oxfmt keeps Markdown line breaks as written, so `format:check` cannot catch these lines:
     - `cl-shared.patch:17` is 111 characters.
     - `:43` is 101 characters.
     - `:44` breaks raggedly at 40 characters ("below it, so it writes no condition. The").
     - `:63` is 109 characters.
     - Fix: reflow each paragraph to 100 columns.
   - **(b) The § Files row is false (`cl-shared.patch:26`).**
     - The row says `tests/setupServer.ts` reads "the rows of every guide table a proof reads". But `tests/setupStyles.ts` reads the § Tokens Reference map tables (`setupStyles.ts:751-764`) and the Preflight departure table (`setupStyles.ts:1089-1092`). Its own row, `cl-shared.patch:24`, says so.
     - The wording was chosen to fit the width of the table (report:285-287).
     - Fix: name the tables the module reads, for example "the guide's compatibility rows and its § Styles ledger, deferral, media condition, and keyframes rows". Accept the table reflow if that wording forces one.
   - **(c) False routing sentence (`cl-shared.patch:90-91`).**
     - The sentence says an animation "reaches either this table or § Additions". The keyframes parity case (`cl-shared.patch:264-271`) requires every cascade keyframe to be a table row, and every row to be a keyframe that a shipped key records.
     - So an unrecorded animation fails that case whether or not it has a row. § Additions is never a green home for an animation.
     - Fix: state that the parity case refuses any animation the inventory does not record under a shipped key, and that the refusal in `collectAdditions` names an animation no key claims.
   - **(d) Treatment sentence (`cl-shared.patch:84`).** "Each treatment is a rule of its own key" is false for the `placeholder-glow` and `placeholder-wave` rows, whose treatment is that no rule exists. Fix: "Each written treatment…", or state the placeholder case.

7. **Law and report — BROKEN.**
   - **Code — holds.**
     - No `any`, no `as`, no `!` non-null assertion, and no suppression appears. The only new callbacks are arguments (`cl.diff:820`, `1122`, `1194`).
     - Every export the unit adds has TSDoc and a test: `readConditions`, `readKeyframes`, `collectBreakpoints`, `renderBreakpointTemplate`, `expandConditions`, `normalizeMediaFeature`, `collectMediaFeatures`, and `collectDeclarationPriorities`.
     - `#condition` follows its sibling `#layer`/`#framed` pattern.
     - The names and shape fit the existing readers.
       - `ConditionRow` and `KeyframesRow` beside `DeferralRow` and `DepartureRow`.
       - `readConditions` and `readKeyframes` mirror `readDeferrals`.
       - `recorded` for the release form, as in `DepartureRow.recorded`.
       - `component` for the Key cell, as in `CompatibilityRow`, `DepartureRow`, and `Addition`.
       - `writer` and `motion` are single words.
   - **Report — broken.**
     - **Temporal words:**
       - "the new and the existing" (`b-cross-cl-report.md:124`)
       - "the new exports" (`:212`)
       - "once `OracleInventory` gains" (`:289`)
       - "The new guide sections" (`:292`)
     - **Code tokens with no noun:**
       - the list labels at `:93`, `:96`, `:99`, and `:102`, for example "`normalizeMediaCondition`: removes…"
       - "from `42fd88e`" (`:3`)
       - "is named `component`" and "column is `Key`" (`:283`)
     - **A count of a growable set:** "Two readings did not get an isolated red run" (`:136`).
     - **Gate result lines — hold.** They are quoted where the log prints one. `lint:check` and `check` print none, and the report says so (`cl-gates-final.log.txt:9-21`).
   - **Counts the report states:**
     - diffstat 413/427, "2 files changed, 805 insertions(+), 35 deletions(-)", and 82/120/1
     - `12 failed | 283 passed (295)`, `295 passed (295)`, and `285 passed (285)`
     - `1 failed | 294 passed`, `3 failed | 292 passed`, `2 failed | 22 passed`, `1 failed | 23 passed`, and `24 passed`
     - `19 passed`, `109 passed | 1 skipped (110)`, and 415 files
     - 5340 against 3434 keys, and 0 mismatches
     - 233 against 242 characters
     - "Two readings" and "Both parity cases"

**Findings outside the claims**
- **F1 — code tokens with no noun in the added TSDoc.**
  - Locations:
    - `cl.diff:629-633`: "`condition` is the form…", "`recorded` is undefined…", "`writer` names…"
    - `cl.diff:645-647`: "`component` is…", "`motion` the treatment…"
    - `cl.diff:667`: "`media` carries…"
  - `w2-w3-note-1.md:7` extends the noun rule to TSDoc. The existing `DepartureRow` remark has the same pattern.
  - Fix: write "the `condition` member" and so on.
- **F2 — a stale case title.**
  - The conformance case is titled "carries every shipped component selector and custom property in the built cascade". It now also fails on a missing keyframe (`cl-mutations.log.txt:162-164`, message "Shipped component placeholder is miss…").
  - The shared patch leaves the title unchanged, so the title no longer names what the case proves.
  - Fix: add "and every recorded animation" to the title.
- **F3 — retained report paths resolve to nothing.**
  - The retained report's review-evidence list (`b-cross-cl-report.md:51-55`) names `/home/user/veneer-cl/.orkestrel/veneer/units/…`. That tree holds no `.orkestrel` files (Glob returned no matches).
  - It also names `cl-instruments/cl-report.md`, which is not retained.
  - This is the Orchestrator's retention rewrite. Fix: point those paths at `/home/user/scaffold/.orkestrel/veneer/units/`.

**Attacked and held**
- **The `{breakpoint} - 0.02px` subtraction.** I tested whether this template earns its place against a plain `{breakpoint}` template. It does: without it, the release column could not state the release's own `575.98px` form.
- **Unused row members.** No proof consumes the `writer` and `motion` members. This matches `readDeferrals`, which reads its `reason` column the same way. I found no defect.
- **Hard-coded offcanvas keys.** The two keys in the priority case are the swap's floor, not a population of cases. `w2-w3-note-1.md` item 5 does not reach them.

**Referrals to the objective lane**
- **Presence gate scope.** The keyframes check runs only on a `selector` row (`cl.diff:1159`). Check whether any shipped key records keyframes but has no shipped selector row. If one does, X7's "every keyframe name a shipped key records" is not enforced for that key.
- **Unreachable `keyframes` addition.** The parity case (`cl-shared.patch:264-271`) means a `keyframes` addition from `collectAdditions` can never sit in a green suite on the real sheet. Rule whether the `keyframes` member of `AdditionCategory` and that path stay as they are, or whether X7 intends it. This underlies F6(c).

**Dispatch note:** the brief's Output asks for "the counts the report states". Listing those counts is itself counting a growable set, which `AGENTS.md` § Writing forbids. I listed them because the brief explicitly asks for them.

VERDICT: FAIL 6, 7; outside the claims: F1, F2, F3