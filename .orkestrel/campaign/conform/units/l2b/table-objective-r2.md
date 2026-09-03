## Lane held

Objective — correctness, constraints, and what the code and contracts actually permit. Recorded substitution for the dark GPT-5.6 Sol bench. My own engine wrote the subject.

## Per-claim verdicts

**1. Every row dispositioned — CONFIRMED.**
`/home/user/scaffold/tmp/units/conform/conform-table-report.md:12-25` gives every row a disposition. I verified both `noop` rows against the tree rather than the report: no `isBrowserVuePath` hit anywhere outside `node_modules`, and no `readonly id: string` data field on any implementation class in `src/**/*.ts`. Every `applied` row has at least one matching hunk in `/home/user/work/evidence/conform-table.diff`. No row is absent from the table. The partial application of `table-subj-2` is ruled under claims 2, 4, and 9, not here.

**2. Applied rows implement the refuter's operative repair — REFUTED (`table-subj-2`).**
The row's operative repair names three guide sites (`conform-table-brief.md:77`). Only one landed. Unchanged and now false in the tree:

- `/home/user/fleet/table/guides/table.md:172-175` enumerates the constructor's `SCHEMA` messages as the audit diagnostics and `The schema is not a table schema`. `/home/user/fleet/table/tests/src/core/Table.test.ts:114` — added by this diff — proves the constructor also raises `column "id" has metadata that cannot be owned`.
- `/home/user/fleet/table/guides/table.md:1298` still reads "which the guard and the audit refuse first", unqualified, contradicting both that test and the guide's own new sentence at `:226-230`.

No hunk touches either site (`conform-table.diff` jumps `@@ -159,13 +158,13 @@` → `@@ -186,7 +185,7 @@` and `@@ -1221,8 +1221,8 @@` → `@@ -1354,10 +1354,11 @@`). Every other row's operative text landed verbatim or as a proven equivalent; I checked `RowManager.ts:140-143`, `PaginationManager.ts:71-74`, `guides/table.md:1356-1358`, `:1441-1442`, `README.md:3,8,73,75`, `types.ts:806-811`, `validators.ts:55`, `guides.test.ts:752`, `types.ts:355-356`.

**Right looks like:** at `guides/table.md:175`, after `The schema is not a table schema`, add the third message the constructor rethrows unchanged from `cloneSchema` — `column "<key>" has metadata that cannot be owned`, raised when the column's `meta` answers the guard's read and the clone's read differently. At `guides/table.md:1298`, replace "which the guard and the audit refuse first" with "which the guard and the audit refuse first for every schema whose reads are stable".

**3. No old name survives — CONFIRMED.**
No symbol was renamed or removed, so the inflection sweep is vacuous: `src/core/index.ts` is absent from `/home/user/work/evidence/conform-table.status:1-10`. I re-derived the populations rather than reading the report's. `readFileSync` returns no hit across `README.md`, `guides/table.md`, `guides/README.md`, `src/**/*.ts`, `tests/src/**/*.ts`; its surviving hits are `tests/guides.test.ts` reading root files. `(?i)\bshould(s|ed|ing)?\b` returns no hit over those five paths plus `tests/guides.test.ts` and `tests/setup.ts`. `createTable never reaches it` returns no hit. The report's two prose sweep rows now name `{src,tests,guides}/**/*.{ts,md}` plus `README.md`, which covers all five required paths.

**4. Proofs and sweeps — REFUTED (`table-subj-2`).**
The behavioural rows hold. I read the controls, not the table: `table-obj-3-red.txt:38` `1 failed | 102 passed (103)` with the assertion at `RowManager.test.ts:114` naming the defect, `table-obj-3-green.txt` 103 passed; `table-obj-4-red.txt:33` `1 failed | 103 passed (104)` at `PaginationManager.test.ts:30`, `table-obj-4-green.txt` 104 passed. Both tests are in the diff (`conform-table.diff:605-617`, `:572-586`). `table-obj-2` deletes a test and repairs no source, so no red is owed.

`table-subj-2` is a documentation row and carries no sweep in § Sweeps (`report:74-84`), and its second old form is not gone — `guides/table.md:1298`. A recorded sweep for `which the guard and the audit refuse first` would have caught it.

**Right looks like:** after the claim-2 repair lands, record in § Sweeps the pattern `createTable never reaches it|which the guard and the audit refuse first` over `{src,tests,guides}/**/*.{ts,md}` plus `README.md`, reading empty.

*Attacked and held:* the accessor case at `tests/src/core/Table.test.ts:92-115` pins the constructor's exact `meta` read sequence (`stable = 3`). I traced it against `src/core/Table.ts:65`, `src/core/cloners.ts:29,31` and the count is correct, the comment at `:93-95` is accurate, and no lever other than read-count distinguishes `cloneSchema`'s read from the constructor's re-guard, because `src/core/validators.ts:107-111` clones `meta` inside the guard. The coupling is intrinsic to the proof and the comment names it. Not a defect.

**5. Guide parity — CONFIRMED.**
No export moved, so no Surface or Methods row is owed a change; `src/core/index.ts` is untouched and every `src/core/types.ts` hunk is doc-only (`conform-table.diff:426-466`). `TextColumn`, newly type-imported by the test, is a real export (`src/core/types.ts:102`). `guides/table.md:1356-1358`'s repaired sentence is true of the shipped tree: `tests/guides.test.ts:71-79` declares `INTERNAL` as the manager classes plus `KeyManager` and nothing else. No `AGENTS §` citation exists in any touched file; every hit sits in the vendored mirrors `guides/guide.md` and `guides/emitter.md`. `test:guides` reads 82 passed in `gate-test.txt:71`.

**6. Breaking changes named — CONFIRMED.**
Nothing renames or removes a published symbol. `src/core/index.ts` is absent from `conform-table.status:1-10`, and every `types.ts` and `validators.ts` hunk changes doc prose only, leaving each signature intact. `report:177-179` records that.

*Observation, not a defect:* `rows.move` and `pagination.move` change observable behaviour for a non-finite argument. The refuter labelled both rows non-breaking, the new behaviour is what `src/core/types.ts:455-456` and `:782-783` now document, and the brief's § Breaking is scoped to renames and removals.

**7. Scope — CONFIRMED.**
`/home/user/work/evidence/conform-table.status:1-10` lists ten modified files, every one under the brief's Owned row. `package-lock.json`, `node_modules/**`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` are absent, and no untracked file appears. Every hunk in `conform-table.diff` belongs to a file at least one row's `Where` names. No compatibility alias, re-export, or shim is added anywhere in the diff.

**8. First conjunct CONFIRMED; independent gate run NOT-EVIDENCED.**
No `.skip`, `.only`, `.todo`, retry, or timeout appears on any line of `/home/user/work/evidence/conform-table.diff`; I swept the file for `\.(skip|only|todo)\(`, `retry`, and `timeout` separately and both returned nothing. `vite.config.ts` is unmodified, so no timeout was inflated there. `report:193-199` names `format:check`, `lint:check`, `check`, `build`, and `test` each with its command and exit 0. `gate-test.txt` is timestamped 16:32:59, after the accessor run at 16:32:26, so it reads the post-fix tree: `src:core` 104, `policy` 111, `config` 46, `setup` 12, `guides` 82. The independent gate reading is the Orchestrator's deciding run at landing, which no read-only lane can take: NOT-EVIDENCED, and the landing settles it.

**9. Nothing hidden — REFUTED.**
The first conjunct holds: no TODO, FIXME, `debugger`, `console.`, or commented-out code on any added line.

The second fails. The disposition table's `table-subj-2` cell (`report:18`) reads `applied` and directs the reader to "the deviation below" as its standing record. That deviation (`report:162-165`) states in the present tense: "nothing from this row is in the tree. `guides/table.md` lines 227-229, 173-176, and 1298 are unchanged ... `git diff --stat -- tests/src/core/Table.test.ts` reports 25 deletions and 0 insertions". The diff contradicts both clauses: hunk `@@ -225,9 +224,11 @@` (`conform-table.diff:142-153`) changes old lines 227-229, and hunk `@@ -114,6 +89,31 @@` (`:536`) adds 25 lines to that test file.

The § Files touched diffstat is stale by the same round: `report:50` reports `tests/src/core/Table.test.ts | 25 -----` and `report:53` reports `103 insertions(+), 102 deletions(-)`, while the diff carries 26 insertions and 26 deletions in that file and 128 insertions against 103 deletions overall.

**Right looks like:** relabel `report:103` as `## Deviation — row table-subj-2 as first attempted` and rewrite its "Done or not done" paragraph to state what stands now — the fixture and the prescribed assertion are refuted, `src/core/Table.ts` is unchanged, and the row landed as § Fix round 1 records. Regenerate the diffstat from the final tree.

## Findings outside the claims

**F1. A count of a growable set survives in a file this unit edited.**
`/home/user/fleet/table/tests/src/core/Table.test.ts:29` reads `it('exposes exactly the seven interface member sets', …)`. `AGENTS.md` § Writing: "**NEVER state a count.** A number answering 'how many' about a set anyone can add to is a count." The package can declare an eighth interface. This is the defect class row `table-subj-5` fixed at `tests/guides.test.ts:752` in this same diff, two cases below the block row `table-obj-2` deleted from the same `describe`.

The sweep that would have caught it was never run over that population: `report:81` runs the numeral sweep over `guides/table.md` and `report:80` over `README.md`, and neither `src/**` nor `tests/**` is swept for a general numeral.

**Prescription:** rename the case to `exposes each interface's member set exactly`. Then run `(?i)\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b` over `src/**/*.ts` and `tests/**/*.ts`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, and rule each hit by sense in § Sweeps. I ran that population: `types.ts:277,393`, `helpers.ts:128,132,173`, `types.ts:855`, and `helpers.test.ts:243` are arities or example magnitudes and stay; `Table.test.ts:29` is the sole tally.

**F2. The new guide sentence makes a uniqueness claim no test proves.**
`/home/user/fleet/table/guides/table.md:228-230` reads "is the one path that reaches it". `.claude/rules/writing.md` § Claims and time: "Claim only what the reader can check. Never write `ensure`, `guarantee`, a superlative … as a claim about behavior." The shipped test proves one path reaches the branch, not that no other does. The refuter's own text made no uniqueness claim ("does reach it", `conform-table-brief.md:77`); the claim entered through the fix brief.

**Prescription:** at `guides/table.md:228-230` write "a `meta` that answers the guard's read with ownable JSON and the clone's read with something no clone can own reaches it, and it refuses with `column "<key>" has metadata that cannot be owned`", deleting "is the one path that".

## Referrals to the Orchestrator

**R1. Round 1's own objective verdict named the Guards paragraph as still owed, and no brief carried it.**
`/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/table-objective-r1.md:46` ends R1 with "the successor edit is one clause at `guides/table.md:226-228` … plus, if you keep it, the third `SCHEMA` message in the Guards paragraph". `conform-table-fix1-brief.md:27` then scoped Owned to "`guides/table.md` (lines 226-228 only)", and `conform-table-fix1b-brief.md` did not restore it. `guides/table.md:1298` was named by neither. `.agents/orchestration.md` § Carry every finding: "A finding with no carrier is a dropped finding." Rule whether both sites were struck or dropped, and record the ruling in the successor brief either way. My claim-2 prescription assumes dropped.

**R2. R2 of round 1 is still open and the fix round raised its cost.**
`table-objective-r1.md:48` refers the design question of whether the package should carry a read-count dependency on `column.meta` at all — reading it once in `src/core/Table.ts:65` and passing that value into `cloneSchema` would close it. The fix round's accessor case now pins the exact read sequence (`tests/src/core/Table.test.ts:96`, `stable = 3`), so that refactor reddens the test and needs the same brief. This is a code ruling outside every conformance row and needs a successor design brief, not a row.

VERDICT: FAIL 2, 4, 9; outside the claims: F1, F2
