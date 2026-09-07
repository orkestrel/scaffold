## Claim-by-claim verdicts

**1. The equality case — PASS**
`tests/guides.test.ts:169-174` places `it('keeps every compared summary and example equal to its source', …)` directly after `documents the members of every behavioural declaration` (ends `:163`). It builds `{ spec: entry.spec, drift: findDrift(guide, source) }` per `inspected` record, filters to non-empty `drift`, and asserts `toEqual([])`, matching the file's other collectors (e.g. `:97`, `:107`, `:117`, `:162`, `:218`). `findDrift` is imported at `:7` between `extractFenceImports` and `findMissing`, preserving the list's alphabetical order. `inspected` is built only from `parseManifest(index, 'guides')` rows (`:64-74`), and the report's Unknowns answer (`d4-scaffold-gate-report.md:283-287`) confirms `index rows: ['guides/scaffold.md']` — mirrors are excluded, so the case covers exactly the concept-index rows.

**2. The README case — PASS**
`tests/guides.test.ts:179-188`: `createGuide(requireValue(files['README.md'])).tagline()` is compared against `documented.guide.tagline()` where `documented = inspected.find(({ entry }) => entry.spec === 'guides/scaffold.md')`. Both sides are asserted `not.toBeUndefined()` before `expect(pitch).toBe(tagline)`. Direction and lookup match the claim.

**3. Red-first — FAIL**
The claim asserts "the report records the two new cases red and every other case green." `d4-scaffold-gate-report.md:106-117` (§ The failing-first evidence) instead records **three** red cases (`keeps every compared summary…`, `opens the README…`, and `publishes read without the former files reader method [pre-existing]`), and `d4-scaffold-gate-report.md:300` states criterion 5 is explicitly "**Not met.**" with `Tests 3 failed | 16 passed (19)`. The drift-list mechanics themselves spot-check correctly — `WriteTransaction.establish`'s guide cell ("Establish one directory…", `guides/scaffold.md:469`) versus the source doc block ("Establishes one directory…", `src/server/WriteTransaction.ts:318`) is a genuine disagreement — but the "every other case green" half of the claim is contradicted by the report's own evidence.

**4. The rules — PASS**
`.claude/rules/documentation.md:35-42` (current state) carries the two bullets verbatim and in order, replacing the single voice bullet; `d4-scaffold-gate.diff.txt:5-18` shows no other line of the file moved. `.claude/rules/tests.md:54`'s row reads "Every documented API exists, every public API is documented, every compared summary, example, and pitch equals its source, and every executable fence returns what the guide says it returns," matching `d4-scaffold-gate.diff.txt:43` and the brief (`d4-scaffold-gate-brief.md:34`). The bullets agree with Ruling 6 (`rulings.md:24`): the `Summary` cell adopts the doc block's sentence, and the tagline/pitch are noun phrases and blockquotes.

**5. Nothing converged — PASS**
`d4-fix.status.txt:1-5` lists exactly `.claude/rules/documentation.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`, `host.json`, `tests/guides.test.ts`. `d4-fix.diff.txt:83-120` shows `host.json` moving only by digest value (three rule-file digests plus the root digest), with the same entry set — no guide cell, doc block, README line, or fence changed anywhere in the diff.

**6. The consumer patches (D4-fix) — CANNOT RULE**
Statically confirmed: `SourceInterface.methods(name)` and `MethodGroup.methods` return `readonly MethodEntry[]` (`node_modules/@orkestrel/guide/dist/src/core/index.d.ts:1547`, `:2141`); the patched cases map to `.name` before comparing (`tests/guides.test.ts:126-133`, `:140`, `:149-153`); `documents the members of every behavioural declaration` compares names rather than object strings (same lines); `source.methods('UpstreamInterface').map((method) => method.name)` sits at `tests/guides.test.ts:202-205`; `.claude/rules/workspace.md:132` states the gate text matching the brief. What is missing: independent evidence that `publishes read without the former files reader method` is green and that `test:guides` is red on exactly the two new cases. The only evidence for both is `d4-fix-2-report.md:18`'s self-quoted command and exit code — the writer quoting itself — with no independent (`verifier` or lane-run) confirmation in the supplied evidence.

**7. Report honesty — FAIL**
Two independent mechanical defects in `d4-scaffold-gate-report.md`:
- Stale `file:line` citations. The report's Edits table cites `tests/guides.test.ts:154-163` for the equality case and `:165-177` for the README case (`d4-scaffold-gate-report.md:77,79`), and criterion 1 cites `:155`, `:160`, `:165`, `:168`, `:169`, `:173`, `:174`, `:176` (`d4-scaffold-gate-report.md:293`). At the file's new state these cases sit at `:169-174` and `:179-188` respectively — the fix round's added `.map()` lines shifted everything below `documents the members of every behavioural declaration` downward, and the report's citations were never re-based.
- Counts of a growable set in prose, contrary to `AGENTS.md` § Writing ("NEVER state a count"): `d4-scaffold-gate-report.md:121` ("all 315 report…"), `:130` ("(143 keys)"), `:183` ("(172 keys)"), `:280` ("surface rows 293, method rows 22, titled examples 0"). The drift list is a set that can grow or shrink as documentation converges, so each of these is a banned count rather than a permitted value.

## Findings outside the claims

- `d4-scaffold-gate-report.md`'s Edits-table line citations (`:77`, `:79`) and criterion-1 line citations (`:293`) are stale against the current `tests/guides.test.ts`; a reader following them lands on the wrong lines. Right look: re-cite against post-fix line numbers, or note in the report that the fix round renumbers the cited sites.
- `d4-scaffold-gate-report.md` states multiple counts of the drift-key population (`:121`, `:130`, `:183`, `:280`), which `AGENTS.md` § Writing forbids for any growable set. Right look: name the members or drop the number, per the rule's own guidance.

VERDICT: FAIL 3, 7
