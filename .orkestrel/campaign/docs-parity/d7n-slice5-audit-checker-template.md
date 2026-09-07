Lane held: checker template

Claim-by-claim verdicts for `template`:

1. **PASS.** `d7n-template-prep.status.txt` and `d7n-template-prep.diff.txt` list exactly `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package-lock.json`, `package.json`, `tests/config.test.ts`, `tests/guides.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, `scripts/docs.ts` — matches the P.1 repair list plus the drop-in adaptation. `package.json` diff (`.diff.txt:1605-1626`) shows only the `docs` script row and the `0.0.6`→`0.0.7` version bump; the `@orkestrel/guide` `^0.0.17` range is untouched. `package-lock.json` diff (`:1074-1183`) shows only the root version and the dropped `vite-plugin-dts`/`@jridgewell/*` subtree.

2. **PASS.** `tests/guides.test.ts:112-124, 145-166` in the tree matches `/home/user/fleet/abort/tests/guides.test.ts:146-173` verbatim outside the package's own constants (`GUIDE_SPEC`, `MODULES`). `d7n-template-prep-report.md` quotes `test:guides` — `Tests 31 passed (31)` — as a run result.

3. **PASS.** `d7n-template-prep-report.md` item 3: `oxlint --deny-warnings` after `repair` found no `no-malformed-summary`/`no-banned-term` diagnostic (consistent with the P20 standing condition of `total 0 | summary 0 | banned 0`); no edit was made, so no fact could have moved.

4. **FAIL.** The `### Types` table's `Shape`-idiom convention sentence sits **after** the table (`guides/template.md:36-56`, sentence at lines 55-56, following the closing table row), not "above it" as the claim requires. The accepted pilot places the same sentence directly under the heading and **before** the table (`/home/user/fleet/abort/guides/abort.md:58-63`: `### Types` heading, then the sentence, then the table). Every other table heading requirement is met: `### Types` gains `Summary` beside `Shape`; `Behavior`/`Builds…` renamed `Summary`; `### Entities`→`### Classes` with both class rows present (`guides/template.md:159-164`).

5. **PASS.** `d7n-template-converge-report.md` Criterion 2's positional-cell comparison (108 non-`Summary` cells, only `Shape` cells differ, no `Kind`/`Returns`/first-column cell differs) and Criterion 3's per-row table of hand-rewritten blocks and reasons name each rewrite; `npm run docs` reads `disagreements found: 0` (Criterion 6), so every cell equals its block; distinct descriptions were written for rows that would have shared one sentence (`TemplateFillOptions` vs `TemplateFillContext`, etc.), and `TemplateError`'s repeated remark sentence was pruned (`.diff.txt:300-314`).

6. **PASS.** `#### Create a template and a registry` occurs once, heading-scoped (report: `grep -c` → `1`); body carries no triple-backtick run or terminator (report, Criterion 4); the fence and the `@example` are byte-equal after `--to source` (`written: 1`); every other `@example` (`shapers.ts`, `helpers.ts`, `TemplateManager.ts`, `Template.ts`, `errors.ts`) is untouched per the diffstat, which shows no other `@example` line changed.

7. **PASS.** `guides/template.md:3-5` and `README.md:3-5` are identical text with identical line breaks (report confirms byte-diff empty); no link, no bold, one noun phrase; displaced sentences moved to new opening prose (`guides/template.md:7-12`) restating no tagline clause; README's onboarding paragraph (`README.md:7-11`) is new prose, not tagline restatement.

8. **PASS.** `tests/guides.test.ts:91-129` (`.diff.txt:583-631`) matches the pilot's inline pin (`/home/user/fleet/abort/tests/guides.test.ts:72-93`) and README case (`:101-109`) exactly; `ROOT_FILES` includes `README.md`; `GUIDE_SPEC` constant present; each test named for what it proves (`pairs at least one example title…`, `opens the README with the guide tagline`). `d7n-template-converge-report.md` Criterion 1 quotes each case's red failure verbatim and Criterion 7 quotes the green `Tests 34 passed (34)`.

9. **PASS.** `git diff -U0 -- src/` shows only comment hunks (converge diffstat: `+270/-126` across doc-block-only files); no `{@link}` flattened; `TemplateError`'s repeated remark pruned. Grep of `guides/template.md` finds no count word outside a permitted indefinite-determiner sense and no all-caps emphasis word; the guide carries `## Tests` (`:238`) naming the checks descriptively with no SQ/MQ/EQ/RQ identifier; the titled heading reads as a demonstration.

10. **PASS.** `d7n-template-converge.status.txt` lists exactly `README.md`, `guides/template.md`, `src/core/constants.ts`, `src/core/errors.ts`, `src/core/factories.ts`, `src/core/templates/Template.ts`, `src/core/templates/TemplateManager.ts`, `src/core/types.ts`, `tests/guides.test.ts` — matches the diff's file set exactly.

11. **PASS.** `d7n-template-converge-report.md` Criterion 6 quotes `npm run docs` (`rows read: 1, disagreements found: 0`, exit 0), `--to guide`/`--to source` (`written: 0`); Criterion 7 quotes `oxfmt --check`, `oxlint`, `check`, `test:guides` (`34 passed`), `test:policy` (`90 passed | 1 skipped`), all exit 0.

12. **PASS.** Spot-checked citations (`NodeWebSocket.ts:196` is websocket's, not template's — no citation of that kind in template's reports) — for template, checked `src/core/factories.ts` and `src/core/types.ts` diff line ranges against the report's per-declaration table (Criterion 3); each matches the tree. No count stated in prose in either report.

13. **PASS.** `d7n-template-converge-report.md` § "Reader and seed defects met" states `None`, with supporting evidence (the 108-cell comparison, the `disagreements found: 0` reading). No defect claim needing a blocking ruling exists.

Claim-by-claim verdicts for `websocket`:

14. **PASS.** `d7n-websocket-prep.status.txt`/`.diff.txt` list exactly the P.1 repair set plus `tests/guides.test.ts` (item 2) and `tests/setup.ts`/`tests/setupServer.ts` (item 3, voice sites, both under `tests/**`). `package.json` diff (`:1605-1624`) shows only the `docs` script row and `0.0.11`→`0.0.12`; `package-lock.json` diff shows only the root version and the dropped `vite-plugin-dts` subtree; no `@orkestrel/*` range moved.

15. **PASS.** `tests/guides.test.ts:156-181, 219-238` matches the pilot's shape (`/home/user/fleet/abort/tests/guides.test.ts:146-173, 209-236`) outside the package's own constants. `d7n-websocket-prep-report.md` quotes `test:guides` — `Tests 22 passed (22)`.

16. **PASS.** `d7n-websocket-prep-report.md` item 3 lists nine before/after voice-rule pairs in `tests/setup.ts`/`tests/setupServer.ts`, each a third-person-verb conversion that keeps the sentence's facts (for example line 102's rewording avoids naming the `frame` symbol while keeping the fragmentation-clearing fact); no code token moved, no assertion value changed (confirmed by the empty-output `oxlint` run and `test:policy` green).

17. **PASS.** `guides/websocket.md` carries no table with a `Shape` column (Types table heads `API | Kind | Summary`), so the `Shape`-idiom requirement is vacuous. `### Factories`, `### Classes`, `### Errors`, `### Codec helpers`, `### Constants`, `### Types` all head `Summary` beside `Kind`; `## Methods` heads `Summary` beside `Returns` (`:120-125`); `### Entities`→`### Classes` (one class row, `NodeWebSocket`) — confirmed by the converge report's `awk` table-header dump (Criterion 2).

18. **PASS.** `d7n-websocket-converge-report.md` Criterion 3's per-declaration table and the "taken from source unchanged" list account for every cell; Criterion 6 reads `disagreements found: 0`; distinct descriptions were written where cells would have shared one sentence (`NodeWebSocketEventMap`/`NodeWebSocketOptions`/`NodeWebSocketInterface`); repeated `@remarks` sentences pruned for `WebSocketError`, the four `undefined`-answer helpers, and `WebSocketReadyState`.

19. **PASS.** `### Accept an upgrade and echo messages (server mode)` occurs once, heading-scoped (report: `grep -n` → one hit at `:177`); fence body carries neither a triple-backtick run nor a terminator (`sed | grep -c` → `0`); body equals the `@example` after `--to source` (`written: 1`); every other `@example` untouched (diffstat shows no other file's `@example` line moved).

20. **PASS.** `guides/websocket.md:3-6` and `README.md:3-6` (report Criterion 5) are the same text and line breaks, no link, no bold; displaced sentences (including a corrected factual claim about the `@orkestrel/emitter` runtime dependency) moved into new opening prose restating no tagline clause; README's onboarding paragraph is new prose.

21. **PASS.** `tests/guides.test.ts:82-120, 191-199` matches the pilot form exactly; `ROOT_FILES` includes `README.md`; `GUIDE_SPEC` present; tests named for what they prove; `d7n-websocket-converge-report.md` Criterion 1 quotes each red failure verbatim and Criterion 7 quotes green `Tests 25 passed (25)`.

22. **PASS.** Report Criterion 3 ran `git diff -U0 -- src/` filtered to non-comment lines and got no output — no code token moved. `{@link import('./errors.js').WebSocketError}` was flagged and replaced with the plain token rather than left to flatten (Criterion 3, `WebSocketErrorCode` row). `## Tests` (`:256-262`) names the checks descriptively with no SQ/MQ/EQ/RQ identifier. Voice sweep removed the `SERVER`/`CLIENT` all-caps emphasis and the "two cross-wired `PassThrough`s" count; remaining `both`/`one` hits in the current tree are all permitted senses (report's voice-sweep table).

23. **PASS.** `d7n-websocket-converge.status.txt` lists exactly `README.md`, `guides/websocket.md`, `src/server/NodeWebSocket.ts`, `src/server/constants.ts`, `src/server/errors.ts`, `src/server/factories.ts`, `src/server/helpers.ts`, `src/server/parsers.ts`, `src/server/types.ts`, `tests/guides.test.ts` — matches the diff's file set exactly.

24. **PASS.** Report Criterion 6 quotes `npm run docs` (`disagreements found: 0`, exit 0) and `--to guide`/`--to source` (`written: 0`); Criterion 7 quotes `oxfmt --check`, `oxlint`, `check`, `test:guides` (`25 passed`), `test:policy` (`90 passed | 1 skipped`), all exit 0.

25. **PASS.** Spot-checked `NodeWebSocket.ts:196` (`once: true`) against the tree — matches the report's citation exactly. `factories.ts:1-42` matches the report's Criterion 3/4 description of the titled example. No count stated in prose in either report.

26. **PASS.** Report § "Reader and seed defects met" names two readings (the `absent`/`absent` `## Methods` row and the `{@link import(...)}` rendering) and correctly rules both as the reader behaving as declared rather than a blocking defect, with the seed line supporting each. Neither blocks the guide's release; the ruling is evidenced, not asserted.

**Findings outside the numbered claims:**

- `guides/template.md:36-56` places its `### Types` `Shape`-idiom sentence after the table. The `d7n-template-converge-brief.md:21` itself instructs "state one `Shape` idiom with its convention sentence **under** that table," which conflicts with the audit's own claim 4 wording ("above it") and with the accepted pilot shape at `/home/user/fleet/abort/guides/abort.md:58-63` (sentence before the table). The writer followed its brief correctly; the brief's wording is the defect. What right looks like: move the sentence to sit directly under the `### Types` heading and before the table, matching the pilot, and correct the `d7n-template-*` brief template's wording from "under" to "above" for future units in this campaign. This belongs to `template` and to the campaign's brief-authoring process.

VERDICT: FAIL 4
