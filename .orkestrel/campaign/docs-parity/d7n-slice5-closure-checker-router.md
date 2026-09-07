Lane held: checker router

**Claim 1 — Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file).**
PASS. `d7n-router-converge-fix.status.txt` lists exactly the 8 files the brief scoped as owned (`guides/router.md`, `src/core/DispatchGroup.ts`, `src/core/Group.ts`, `src/core/constants.ts`, `src/core/factories.ts`, `src/core/types.ts`, `src/server/handlers.ts`, `tests/guides.test.ts`) — all inside "doc blocks under `src/**`", `guides/router.md`, and `tests/guides.test.ts`, none in the off-limits list. Cross-checked against `/home/user/fleet/router` live files:
- R1 (drop-in hoist, header lines) confirmed byte-for-byte in `/home/user/fleet/router/tests/guides.test.ts:1-3,59`.
- R2 (`Shape` idiom) confirmed in `/home/user/fleet/router/guides/router.md:61,124` and every interface/type/const row.
- R3 (titled pair) confirmed: `### Register and match` heading at `guides/router.md:19`, `@example Register and match` at `src/core/factories.ts:24`, untitled `@example` at `src/server/handlers.ts:79` (diff line 253-254).
- R4 (links) confirmed complete against the original converge diff `d7n-router-converge.diff.txt` (lines 616-702, 1038-1071): exactly the four flattened `{@link import('./x.js').Name}` sites (`DispatchGroup.ts`, `Group.ts`, `constants.ts` ×2, `types.ts` ×2) — the fix diff restores every one and no site was missed or over-restored.
- `grep -rn '@example \S' src/` independently run returns exactly `src/core/factories.ts:24: * @example Register and match`; `grep -n '…' guides/router.md` and the interface-colon pattern both return nothing, matching the report's claims.

**Claim 2 — The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries.**
FAIL. Citations match the tree (verified above), and the drop-in wording matches the file exactly. But the report states counts in prose, which `AGENTS.md` § Writing bans unconditionally ("NEVER state a count... rules, rows, members, exports, files, options, steps, cases, stages, findings, and tests are such sets"):
- `d7n-router-converge-fix-report.md` Item 3: "the block held the three `createRouter` lines the fence already carried" — states a count of lines.
- Same report, Item 2: "`IdentifierStartChar` spells all fifty-three arms." — states a count of union arms, a set that can grow.
- Same report, Item 1: "The diff against the pilot from `describe(` on is one hunk" — states a count of diff hunks, in the report's own prose (not quoted tool output).
These are the report's authored sentences, not verbatim command output, so they are not exempt as "a measurement quoted with the run that produced it."

**Claim 3 — Each named correction is present as the audit's finding asked (router: hoisted `examples`, the drop-in's two sentences, the `Shape` idiom per Ruling 15's wording/bare names/`plus`/no `…`/no `+` or `/`, the titled pair on `createRouter` under a Ruling 9 heading with `createListener` untitled, every `{@link import('./x.js').Name}` restored with cells reading bare names).**
PASS, independently verified against the live tree in `/home/user/fleet/router`:
- Hoisted `examples` binding sits at the `for (const group of guide.methods())` loop scope, `tests/guides.test.ts:229-238`, before the `describe` call — matches the pilot's shape.
- Drop-in sentences: `tests/guides.test.ts:2` reads "The constants that follow are this package's own"; `:59` reads "the assertion that follows it fails when a name here stops being stranded" — both the Ruling 13 (amended) canonical text.
- `Shape` idiom: convention sentence at `guides/router.md:61,124` is Ruling 15's wording verbatim (plus Ruling 18's second sentence at line 61); every interface row uses `{ bareName, bareName? } plus method, method`; every alias spells its literal whole with `\|`; independently grepped and found no `…`, no colon-typed interface cell, no stray `} + ` or member-separating `/` in the Shape columns.
- Titled pair: `### Register and match` heading sits directly above the `## Surface` fence (`guides/router.md:19-22`), `createRouter`'s `@example` is titled the same text (`src/core/factories.ts:24`), `createListener`'s `@example` title was removed (`src/server/handlers.ts:79`, diff confirms `- * @example Basic server` / `+ * @example`).
- Every `{@link import('./x.js').Name}` link flattened in the converge diff is restored, confirmed against the original converge diff's four sites (see Claim 1).

**Findings outside the claims:** The `DispatchResult` Shape cell keeps discriminant literal values (`{ status: 'matched', match } | ...`) rather than pure bare names — the report justifies this as necessary under Ruling 19 to avoid a meaningless `{ status }` repeated three times. Whether this reading of Ruling 12/19 is correct is a judgment call outside mechanical conformance; referred to the Orchestrator/subjective lane rather than ruled here.

**Referrals:** Whether the `DispatchResult` Shape cell's discriminant-literal exception is a permitted reading of Ruling 12/19, or a deviation requiring correction.

VERDICT: FAIL 2
