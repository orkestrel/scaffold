Lane held: checker sqlite

**Claim 1 — PASS.** `d7n-sqlite-prep.status.txt` lists exactly `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package-lock.json`, `package.json`, `src/server/SQLiteDatabase.ts`, `src/server/types.ts`, `tests/config.test.ts`, `tests/guides.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, plus untracked `scripts/docs.ts` — the P21 repair list plus item 2's `tests/guides.test.ts` plus item 3's two voice-fix files plus the bump. `package.json`'s diff (`d7n-sqlite-prep.diff.txt:1605-1626`) touches only `version` and the `docs` script row. A `grep` for `@orkestrel/guide|@orkestrel/contract` across the whole diff returns no hit, so no `@orkestrel/*` range moved.

**Claim 2 — PASS.** `tests/guides.test.ts` diff in the prep report matches the pilot's shape at `/home/user/fleet/abort/tests/guides.test.ts:146-171` (methods loop: `members`/`documented` bound once, mapped to `.name`) and `:191-210` (examples loop: `documented` bound once above the `describe`). The prep report quotes `test:guides`: `Tests 33 passed (33)`.

**Claim 3 — PASS.** Both voice-site edits (`SQLiteDatabase.ts:92`, `types.ts:79` per `d7n-sqlite-prep.diff.txt:1627-1651`) are comment-only, keep the excluded-cases fact (identity comparison / not-out-of-range-alone), move no code token, and `test:policy` after the edits reads `90 passed | 1 skipped`, showing no assertion changed. `npm run test:policy`'s prose rule named no `guides/**`/`README.md` line, so the "and nothing else" prose-sweep clause never engaged.

**Claim 4 — PASS.** `guides/sqlite.md` (tree) heads every `## Surface` and `## Methods` table `Summary` beside only `Kind` or `Returns` (lines 33, 39, 46, 53, 62, 86, 100). `### Entities` became `### Classes` (line 37) with both class rows present. No `Shape` column exists in this guide, so the `Shape`-idiom clause is inert, matching the converge report's own reading.

**Claim 5 — PASS.** Spot-checked cells against blocks: `createSQLiteDatabase` guide cell = `factories.ts:5` description verbatim; `SQLiteDatabase` class row = `SQLiteDatabase.ts` description verbatim. `SQLiteDatabase`/`SQLiteStatement` rows are distinct from their respective interface rows. `wrapError`'s repeated remark ("The single boundary mapping…") was pruned per the diff. No `Shape` column exists, so the literal-preservation clause is vacuous, as the converge report states.

**Claim 6 — PASS.** `grep '@example'` over `src/**` (tree) returns exactly two files, `factories.ts` and `errors.ts`; only `factories.ts:15` is titled (`Connect, execute, and round-trip a row`). `grep -n '^#+ Connect, execute, and round-trip a row' guides/sqlite.md` returns one line (37 → actually the single match found by the tool). The fence body (`factories.ts:16-25`) equals the guide fence at `guides/sqlite.md:125-134` and carries no three-backtick run or `*/` terminator.

**Claim 7 — PASS.** `guides/sqlite.md:3-5` and `README.md:3-5` carry the identical blockquote text and line breaks, no link, no bold. The guide's opening prose (`:7-12`) carries the displaced ORM/no-query-builder and Source/Requires clauses without restating the tagline. The README's onboarding paragraph (`:7-11`) is new synthesized onboarding, matching the pilot's own pattern at `/home/user/fleet/abort/README.md:7-10`.

**Claim 8 — PASS.** `tests/guides.test.ts` (tree) carries the equality case inside the manifest loop's `describe(entry.concept)` block (`:184-192`), the pin in the inline form with no local predicate and the both-sides failure line (`:75-96`), the README case with two `not.toBeUndefined()` guards (`:104-113`), `README.md` in `ROOT_FILES` (`:48`), and a `GUIDE_SPEC` constant (`:34`). Each test name states what it proves. The converge report's Criterion 1 quotes each case red on the unconverged tree with its failing lines, and Criterion 7 quotes `test:guides` green (`36 passed (36)`).

**Claim 9 — PASS.** Every hunk in `d7n-sqlite-converge.diff.txt` sits inside a `/** */` doc block or an added inline `/** */` method summary; no non-comment code line changed. No `{@link}` was flattened out of a description: `helpers.ts`'s `{@link SQLiteError}` and `types.ts`'s `{@link SQLiteParameters}` both survive in their descriptions after the edit — only the guide's compared cell reads them as code tokens, per the P16 comparator. No description repeats its own `@remarks` (spot-checked `SQLiteDatabase.ts`, `wrapError`, `SQLiteError`). `## Tests` (`guides/sqlite.md:288`) names the equality gate descriptively, no SQ/MQ/EQ/RQ identifier. The titled heading reads as a demonstration. No all-caps emphasis or count appears in the touched guide/README prose.

**Claim 10 — PASS.** `d7n-sqlite-converge.status.txt` lists exactly `README.md`, `guides/sqlite.md`, seven `src/server/*.ts` files (all doc-block-only per the diff), and `tests/guides.test.ts`.

**Claim 11 — PASS.** Converge report Criterion 6 quotes `npm run docs` (`exit 0: rows read: 1, disagreements found: 0`), `--to guide` and `--to source` (`written: 0, reported: 0` each); Criterion 7 quotes `oxfmt --check` (exit 0), `oxlint` (exit 0), `check` (exit 0), `test:guides` (`36 passed (36)`), `test:policy` (`90 passed | 1 skipped`).

**Claim 12 — FAIL.** Both reports state a count in prose, which the report-honesty clause bars:
- `d7n-sqlite-prep-report.md:158`: "plus `src/server/SQLiteDatabase.ts` and `src/server/types.ts` (item 3, **the two** `no-banned-term` sites listed above)" — states "two" as a count of a growable set (diagnostic sites), authored prose rather than quoted command output.
- `d7n-sqlite-converge-report.md:47`: "**Two** header cells moved, both `Behavior` to `Summary`, at baseline lines 77 and 91" — states "Two" as a count of header cells before naming the members, which `AGENTS.md` § Writing requires deleting rather than stating alongside the names.

All other `file:line` citations checked against the tree (`guides/sqlite.md:33,39,46,53,62,86,100`; `factories.ts:15`; `errors.ts:23`) match exactly.

**Claim 13 — PASS (vacuous).** The converge report's "Reader and seed defects" section states "None met"; the prep report names no reader or seed defect (its one deviation is the pre-existing, unrelated `test:config` `tsconfig.core.json` gap, not a reader/seed defect). No defect exists to rule blocking or not.

## Findings outside the claims

- The `test:config` deviation in the prep report (a vendored `tests/config.test.ts` hardcoding `configs/src/tsconfig.core.json` for a package with no `core` module) self-resolved by the converge report's tree with no edit to that file (`git diff --stat tests/config.test.ts` empty per both reports); right looks like the Orchestrator taking the authoritative `test:config` reading itself, as the converge report already recommends, rather than either unit being blamed.
- The two count violations in claim 12 are a `.claude/rules/writing.md` / `AGENTS.md` § Writing defect in the retained reports, not in the shipped package artifacts (`guides/sqlite.md`, `README.md`, `src/**` are clean of stated counts per claim 9's review). Right looks like re-authoring the two sentences to name the members without the numeral ("the `no-banned-term` sites listed above"; "The `Behavior` header cells at baseline lines 77 and 91 moved to `Summary`").

VERDICT: FAIL 12
