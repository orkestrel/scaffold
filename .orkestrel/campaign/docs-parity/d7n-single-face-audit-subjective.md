Lane held: subjective (design fit, voice, and shape), over `/home/user/fleet/sqlite` and `/home/user/fleet/indexeddb`.

## sqlite

**1. PASS.** `d7n-sqlite-prep.diff.txt` and `d7n-sqlite-prep.status.txt` list the P21 repair set (`.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, new `scripts/docs.ts`), `tests/guides.test.ts`, the two `no-banned-term` sites the report names (`src/server/SQLiteDatabase.ts`, `src/server/types.ts`), `package.json` (version `0.0.11` + the `docs` row only, diff lines 1609-1623), and `package-lock.json` (root version + extraneous subtrees). `@orkestrel/guide` stays `^0.0.17` and `@orkestrel/contract` `^0.0.16` at `/home/user/fleet/sqlite/package.json:74,78` — no range moved.

**2. FAIL.** Every `findMissing` / `findUnexampled` call passes names and `members` / `documented` are bound once per `describe`, but the mapped `examples` is not at the examples loop's own scope: `/home/user/fleet/sqlite/tests/guides.test.ts:221-227` binds it inside the `it` body, where the pilot binds it above the `describe` at `/home/user/fleet/abort/tests/guides.test.ts:212-218`. indexeddb's P.1 hoisted it correctly (`/home/user/fleet/indexeddb/tests/guides.test.ts`, prep diff lines 2252-2262), so one slice ships two shapes of the shared drop-in. Right: move the `examples` binding above `describe(\`${group.interface} examples\`)`, leaving only `fences` and the assertion in the `it`. The `test:guides` summary rests on the writer's report alone and is unresolved here.

**3. PASS.** `not just "is a connection open"` → `not "is a connection open" alone` and `not just out-of-range ones` → `not out-of-range ones alone` keep every fact, move no code token, and change no assertion value (prep diff lines 1631-1650).

**4. PASS.** `guides/sqlite.md:33,39,46,53,62` head `API | Kind | Summary`; `:86,100` head `Method | Returns | Summary`; `### Entities` became `### Classes` at `:37` with both class rows; `### Helpers and errors` is mixed and rightly keeps its heading; no `Shape` column exists, so the Ruling 12 conjunct is inert.

**5. PASS.** Sampled against source: the widest cell `guides/sqlite.md:72` equals `src/server/types.ts` `SQLiteDatabaseInterface`'s description; the Types row `SQLiteExecuteResult` (`:68`) equals its rewritten description with the 2^53 caveat moved into a new `@remarks`; the Methods row `SQLiteStatementInterface.execute` (`:102`) equals its member block. Rows are distinct (`SQLiteDatabase` vs `SQLiteDatabaseInterface`, `get`/`all`/`iterate`), and the report names each hand-rewritten block.

**6. PASS.** One titled block, `@example Connect, execute, and round-trip a row` on the primary factory (`src/server/factories.ts`), title equal to the single heading `guides/sqlite.md:123`, body equal to the fence at `:126-133`, with no three-backtick run and no `*/`.

**7. PASS.** `guides/sqlite.md:3-5` and `README.md:3-5` are one noun phrase, same line breaks, no link, no bold; the displaced sentences sit at `guides/sqlite.md:7-12`; neither opening paragraph restates a tagline clause; the README keeps its onboarding, experimental note, and sections. See finding F2 on the link the tagline shed.

**8. PASS structurally.** The equality case sits inside the manifest loop's `describe` (`tests/guides.test.ts:184-192`), the pin is at file scope in the pilot's guard-and-continue form with no local predicate and the both-sides failure line (`:75-97`), the README case carries both `not.toBeUndefined()` guards (`:104-113`), `README.md` is in `ROOT_FILES` (`:48`), `GUIDE_SPEC` names the spec (`:34`), and each case is named for what it proves. The red-first and green readings rest on the writer's report alone and are unresolved.

**9. PASS.** Every `src/**` hunk sits inside a doc block; no code token moved; `{@link SQLiteError}` / `{@link SQLiteParameters}` survive in descriptions rather than flattening; no description repeats its own `@remarks`; the escaped `` `SQLiteValue \| undefined` `` cell survives at `:96`; `## Tests` names the gate descriptively at `:288` with no SQ/MQ/EQ/RQ token; the titled heading reads as a demonstration; no count in the unit's own prose. Residual all-caps predates the unit — see F4.

**10. PASS.** `d7n-sqlite-converge.status.txt` lists `README.md`, `guides/sqlite.md`, seven `src/server/*.ts` doc-block hunks, and `tests/guides.test.ts` — nothing else.

**11. CANNOT RULE.** The gate readings' only evidence is the writer's own report. They need `verifier`.

**12. FAIL.** `d7n-sqlite-prep-report.md:247` cites "the failing assertion at line 2141 hardcodes `resolve(root, 'configs/src/tsconfig.core.json')`". The tree that commit leaves reads a face walk at `/home/user/fleet/sqlite/tests/config.test.ts:2139-2148`, and the same P.1 diff contains that walk (prep diff lines 2110-2119). No successor pair reconciles the two. Right: add a successor note beside both P.1 records naming who corrected the vendored `tests/config.test.ts`, in which scaffold change, and that it supersedes the deviation section. Neither report states a count in prose.

**13. PASS, with the ruling.** The one defect the reports name is the seed defect in scaffold-vendored `tests/config.test.ts`; it was real on its evidence when measured (`ENOENT .../configs/src/tsconfig.core.json`, and `/home/user/fleet/sqlite/configs/src/` holds only `tsconfig.server.json` and `vite.server.config.ts`), and it is already closed on the committed tree. **It does not block `@orkestrel/guide@0.0.18`** — it is a scaffold vendored-surface defect, not a reader defect. The P.2 report names none.

## indexeddb

**14. PASS.** `d7n-indexeddb-prep.status.txt` lists the P21 repair set, `tests/guides.test.ts`, the four files the report's item 3 names, `package.json`, and `package-lock.json`. The `^0.0.17` guide range is untouched.

**15. PASS (code half).** Each call passes names; `members` and `documented` bind once per `describe`; the mapped `examples` binds at the examples loop's own scope above its `describe` (prep diff lines 2252-2262), matching the pilot. No case's meaning changed. The `test:guides` summary is writer-report-only.

**16. PASS.** Each voice and prose-sweep edit keeps its facts, opens on a third-person verb without naming its symbol (`Builds`, `Defines`, `Returns`, `Represents`), applies one substitution row per line, moves no code token, and changes no assertion.

**17. FAIL.** `guides/indexeddb.md:44` heads `### Stores, indexes, cursors, transactions` over a table whose every row's `Kind` is `class`. The claim requires `### Classes`. The converge report records the reason (class rows spread over three descriptive groupings, so renaming one would be false of the others), and the plan's Ruling 5 triggers only on `### Entities` or an H3-documented class — so the resolution is an Orchestrator ruling, not a unit edit: either gather `IndexedDBDatabase`, the five store/index/cursor/transaction classes, and `IndexedDBError` into one `### Classes` table as the pilot does, or amend the criterion to Ruling 5's trigger and record the exemption.

**18. FAIL.** Facts the Types cells carried are now absent from both the row and the block. `IndexedDBDatabaseInterface`'s cell carried `` (`database` / `name` / `version` / `stores` / `open`) ``; the cell at `guides/indexeddb.md:99` drops them, the block at `/home/user/fleet/indexeddb/src/browser/types.ts:446-460` names only `stores` and `open` in `@remarks`, and `database`, `name`, and `version` survive only in the added body sentence at `guides/indexeddb.md:122`. The same holds for the cursor, transaction, store, index, and upgrade-manager rows and for the four data-only shapes gathered into the paragraph at `:108`. Right: carry them in a `Shape` column on `### Types` with Ruling 12's convention sentence — the pilot's device at `/home/user/fleet/abort/guides/abort.md:60-65` — and delete the bolt-on paragraph and the `Its readonly data members are …` lines that duplicate what a `Shape` cell holds. The remaining conjuncts hold: cells equal their descriptions, the report names each hand-rewritten block, and no description restates its own `@remarks`.

**19. PASS mechanically.** One titled block, `@example Feature-detecting before opening a database` on the primary factory (`src/browser/factories.ts:21`), title equal to the single heading `guides/indexeddb.md:262`, body equal to the fence at `:264-271`, no three-backtick run, no `*/`. See F3 on what that choice costs the block's reader.

**20. FAIL.** `guides/indexeddb.md:8` opens "Its job is to turn IndexedDB's event-driven, callback-shaped, structurally-untyped surface into one you can `await` — and nothing more", which restates the tagline's closing clause at `:6` ("over `await` instead of raw `IDBRequest` events"). Right: keep the new characterization and drop the repeated proposition — for example "It types IndexedDB's event-driven, callback-shaped, structurally-untyped surface and adds nothing more." The README paragraph at `README.md:8-11` restates nothing and stands.

**21. PASS structurally.** The equality case sits inside the manifest loop's `describe`, the pin is the pilot's guard-and-continue form with no local predicate and the both-sides failure line, the README case carries both guards, `README.md` is in `ROOT_FILES`, and `GUIDE_SPEC` replaced the file's own `PACKAGE_GUIDE` rather than sitting beside it — one home, the right call. Each case is named for what it proves. The red-first and green readings are writer-report-only and unresolved.

**22. PASS.** Every `src/**` hunk sits inside a doc block; no code token moved; no `{@link}` flattened and no description repeats its own `@remarks`; the escaped `\|` cells (`Promise<Row \| undefined>`, `Promise<IndexedDBCursorInterface \| null>`) survive intact; `## Tests` names the gate descriptively at `:466`; the titled heading reads as a demonstration; no count in the unit's own prose. Residual all-caps predates the unit — see F4.

**23. PASS.** `d7n-indexeddb-converge.status.txt` lists `README.md`, `guides/indexeddb.md`, six `src/browser/*.ts` doc-block hunks, and `tests/guides.test.ts`.

**24. CANNOT RULE.** Writer-report-only evidence.

**25. FAIL.** `d7n-indexeddb-prep-report.md:31` cites `tests/config.test.ts:2137-2142` as hardcoding the `core` project; the committed file walks the faces, and the converge report's R4 reads it that way at `:2140-2146`. Same retention gap as sqlite's claim 12, same fix. No count in prose in either report.

**26. PASS, with the rulings.** R1 (an inherited member's summary resolves to the base block) is real on the planted-summary probe; not blocking — it is the reader behaving as specified, and the guide already says the extending tables repeat those rows. R2 (the brief's worklist block is a tail) and R3 (the seed's total counts the pitch row, `findDrift` does not) are real and are record-accuracy notes; not blocking. R4 is real and confirms the sqlite finding; not blocking. E1 (a scratchpad file read back holding another package's guide) is real on its evidence and is referred — not blocking the guide's release.

## Findings outside the claims

**F1 — the slice ships two substitutes for the missing `Shape` column (sqlite and indexeddb).** Neither guide carries `Shape`. sqlite folded each type's members into the description sentence, so the cell and the block both hold them (`guides/sqlite.md:64-72`). indexeddb stripped them from the descriptions and added guide-body prose (`guides/indexeddb.md:108,122,135,150,171,186,198,210,227,237`). Both are new devices, and they differ inside one slice. Right: rule one idiom fleet-wide before the next slice — the pilot's `Shape` column with Ruling 12's convention sentence is the device that already exists; sqlite's fold is the acceptable alternative only if ruled explicitly and applied to both.

**F2 — sqlite lost its upstream reference.** The baseline tagline linked `[`node:sqlite`](https://nodejs.org/api/sqlite.html)`; `nodejs.org` now appears in no Markdown file in `/home/user/fleet/sqlite`. Ruling 4 bars a link in the tagline, not from the guide. Right: re-attach it in the opening prose at `guides/sqlite.md:7-12`, beside the `Requires Node.js` sentence.

**F3 — indexeddb's primary factory lost its demonstrating example.** The `@example` on `createIndexedDBDatabase` was a schema with a `byAge` index and an index-backed `rangeFromKey` read; it is now a feature-detect plus one `set` over an index-free store (`src/browser/factories.ts:21-29`). A consumer hovering the factory no longer sees the schema shape the factory exists to take. Right: extend the fence under `guides/indexeddb.md:262` to declare `users: { path: 'id', indexes: [{ name: 'byAge', path: 'age' }] }` and show one index-backed read inside the `if`, keeping the heading, then re-run `--to source`.

**F4 — residual all-caps emphasis in owned guide files.** `guides/sqlite.md:116` (`OLD`), `:230` (`EVERY`); `guides/indexeddb.md:327` (`AND`), `:348` (`NEW`); and `tests/src/browser/IndexedDBDatabase.test.ts` keeps `BOTH` beside the line the voice unit edited. Right: replace each with plain wording ("the earlier connection", "every integer column", "closes and deletes", "the new position") in the pass that next owns those files.

**F5 — indexeddb repeats 11 identical rows across three tables.** `guides/indexeddb.md:137-149`, `:155-168`, `:211-222` now carry byte-identical `Summary` cells for the shared record-store verbs, and the transaction-bound table no longer says in its rows that the calls run inside the transaction. The `####` paragraphs carry it. Right: leave as is for this slice and refer the reader question in R-d.

**F6 — a vendored fix landed inside both P.1 commits with no successor pair.** Both P.1 reports still carry a deviation their own retained diffs close. Right: write the successor note before the slice integrates, per § Dispatch anatomy, and settle whether the vendored `tests/config.test.ts` change obliges a `scaffold` `dist/host` bump and a fleet re-propagation.

## Referrals to the objective lane

- **R-a.** Whether the `tests/config.test.ts` face walk arrived from `repair` or from a later out-of-unit edit, and what that means for the `test:config` reading each P.1 unit recorded.
- **R-b.** sqlite's lockfile dropped the root `vite-plugin-dts` devDependency entry and the `@jridgewell` / `@rollup/pluginutils` subtrees; confirm the lockfile matches `package.json` and that `npm ci` is clean.
- **R-c.** indexeddb E1: whether any measurement in the converge report rests on the contaminated scratchpad copy, given the unit re-derived the cell comparison from `git show`.
- **R-d.** Whether `findDrift` resolving an inherited member to the base declaration's block is a reader defect to close before `@orkestrel/guide@0.0.18`, or the intended contract.

VERDICT: FAIL 2 12 17 18 20 25
