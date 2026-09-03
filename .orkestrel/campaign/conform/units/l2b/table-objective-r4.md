## Lane held

Objective — correctness, constraints, and what the code and contracts actually permit. Recorded substitution for the dark GPT-5.6 Sol bench. My own engine wrote the subject; every reading below is re-derived from the tree, not from the report.

## Per-claim verdicts

**1. Every row dispositioned — CONFIRMED** (by reference to `table-objective-r3.md:7-8`). Fix round 3's sole tree hunk is `/home/user/work/evidence/conform-table.diff:604`, the assertion; `^[+-].*toThrow\(` over the diff returns that line and nothing else. `conform-table-report.md:12-25` still gives every row a disposition, and the `table-subj-2` cell at `:18` is still `applied` after the F4 note edit.

**2. Applied rows implement the operative repair — CONFIRMED** (by reference to `table-objective-r3.md:10-15`). The hunk changed no guide site. `guides/table.md:175-178`, `:229-233`, and `:1301` read as round 3 verified them, re-read here.

**3. No old name survives — CONFIRMED** (by reference to `table-objective-r3.md:17-18`). The round renamed nothing; `diff:604` is the only added line and carries no old form.

**4. Proofs and sweeps — CONFIRMED.** I re-ran all four § Sweeps rows myself over the population the row names, excluding `node_modules`:
- `is the one path that` over `{src,tests,guides}/**/*.{ts,md}` and `README.md` — 0 hits (matches `report:85`).
- `refuse first\.` — 0 hits (`report:86`).
- `createTable never reaches it|which the guard and the audit refuse first` — 1 hit, `guides/table.md:1301` (`report:87`).
- The number-word sweep over `src/**/*.ts` and `tests/**/*.ts` outside the four named files, excluding `one` — exactly the eight listed at `report:88`: `src/core/types.ts:277`, `:393`, `:855`, `src/core/helpers.ts:128`, `:132`, `:173`, `tests/guides.test.ts:708`, `tests/src/core/helpers.test.ts:243`; each is an arity or an example magnitude as read. Glob population verified live (a control pattern returned `src/core/types.ts:277`). The fabricated hit is gone from `report:315-323`, which now names `guides/table.md:1301` alone, and the record sits in § Sweeps. Behavioural rows are untouched by the hunk.

**5. Guide parity — CONFIRMED** (by reference to `table-objective-r3.md:25-26`). Re-ran the changed-line guard sweep: `refuse first|not a table schema|metadata that cannot|one path that` over `tests/**/*.ts` returns only `tests/src/core/Table.test.ts:114`, so no fence transcription or presence guard quotes a changed line. No export moved.

**6. Breaking changes named — CONFIRMED** (by reference to `table-objective-r3.md:28-29`). The hunk wrote no file under `src/**`; `/home/user/work/evidence/conform-table.status:1-10` lists the same modified set with `src/core/index.ts` absent.

**7. Scope — CONFIRMED** (by reference to `table-objective-r3.md:31-32`). `conform-table.status:1-10` lists the same ten modified files, no untracked file; `^\+\+\+ ` over the diff returns the same ten paths. `tests/src/core/Table.test.ts` is fix round 3's Owned row (`conform-table-fix3-brief.md:19`).

**8. First conjunct CONFIRMED; independent gate run NOT-EVIDENCED.** `^\+.*(\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|debugger|console\.)`, case-insensitive, returns no match over the regenerated `conform-table.diff`, which carries the fix round's added line at `:604`. `vite.config.ts` is absent from `conform-table.status:1-10`. The gate table at `report:399-405` was taken inside the unit's own exec: NOT-EVIDENCED, settled by the Orchestrator's deciding run at landing.

**9. Nothing hidden — CONFIRMED** (same sweep as claim 8, plus `table-objective-r3.md:37-38`). The one-for-one line replacement leaves the diffstat at `report:53` correct.

**F3 — CLOSED.** `tests/src/core/Table.test.ts:114` reads `expect(() => new Table(schema)).toThrow(/^column "id" has metadata that cannot be owned$/)`. `src/core/cloners.ts:34-38` raises exactly that message; `src/core/errors.ts:19-20` passes it to `super` unmodified; `src/core/Table.ts:66` rethrows the `TableError` unchanged. The wrapping form live at `src/core/Table.ts:68` produces `The table schema is unusable: …`, which the `^` anchor rejects, so the guide's "rethrows unchanged" claim at `guides/table.md:176-178` now breaks a test when it goes false. Closed on code reading alone, independent of the unit's own green run.

**F4 — CLOSED.** `report:18` cites `guides/table.md:229-233` (the scoped sentence spans exactly those lines) and names `:175-178` and `:1301`, both verified in the tree. `report:33` names the title rename, and `tests/src/core/Table.test.ts:29` reads `it('exposes each interface member set exactly', …)`. `report:37` names the Guards-paragraph sentence and the scoped `SCHEMA` row, both present. `report:167` reads "per the evidence recorded earlier in this section", and that evidence sits at `report:118-164`, earlier.

## Findings outside the claims

**F5. The unit introduced a banned cross-reference into shipped guide prose.** `/home/user/fleet/table/guides/table.md:1172-1173` reads "It reports the domain faults listed **below** and every budget breach **above**." That line is added by this unit (`conform-table.diff:306-308`); the line it replaced (`diff:303-304`) read "It reports seven domain faults and every budget breach above", so the tally-deletion rewrite introduced `below` where none stood. `.claude/rules/writing.md` § Code tokens, references, and links requires `preceding`, `following`, `earlier`, or `later`, and bans `above` and `below`. This matters because the sentence ships to every consumer who reads the guide, and no gate sees it.

**Prescription:** at `guides/table.md:1172-1173` write "It reports the domain faults listed following and every budget breach stated earlier."; run `npm --prefix /home/user/fleet/table run format:check` and `npm --prefix /home/user/fleet/table run test:guides` green. `guides/table.md:1218` ("the `## Surface` rows above") carries the same banned sense but is a pure rewrap of pre-existing wording (`diff:316-317` removed and `:320` re-added the identical clause); close it in the same edit as "the `## Surface` rows stated earlier" if the Orchestrator rules a rewrapped line owned.

Ruled and not raised: `conform-table.diff:31` ("the layer above") is an architectural sense, not a document pointer, and is permitted.

## Referrals to the Orchestrator

**R-A. The audit brief's threshold is not met while F5 stands, though every claim holds.** `conform-table-audit-brief.md:21` requires no substantiated finding outside the claims. F5 is one word of shipped guide prose and closes with a report-only-plus-guide edit that owes `format:check` and `test:guides` and no other gate. Rule whether that rides as a fourth fix round or is carried to the package's next change under `AGENTS.md` § TTTDD's out-of-scope rule; the tree is otherwise correct and every round-3 refutation and finding is closed on my own re-derivation.

**R-B. The report's own prose carries `below` at `conform-table-report.md:58` and `:81` and `above` at `:156`.** Round 3's F4 named only `:162`, and the fix closed exactly that. These are round-1 record prose, not shipped product. No ruling of mine; rule whether the campaign record is swept for the same class at retention.

PASS
