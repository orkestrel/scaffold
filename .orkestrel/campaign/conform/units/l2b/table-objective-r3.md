## Lane held

Objective — correctness, constraints, and what the code and contracts actually permit. Recorded substitution for the dark GPT-5.6 Sol bench. My own engine wrote the subject, and I re-derived every reading below from the tree rather than from the report.

## Per-claim verdicts

**1. Every row dispositioned — CONFIRMED** (by reference to `/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/table-objective-r2.md:7-8`).
The fix round's hunks are `conform-table.diff:133-141`, `:154-165`, `:340-353`, and `:542-543` — three `guides/table.md` prose sites and one test title. None touches a disposition cell. `conform-table-report.md:12-25` still gives every row a disposition, and `/home/user/work/evidence/conform-table.status:1-10` still lists the same modified files, so round 2's evidence for this claim is unchanged.

**2. Applied rows implement the refuter's operative repair — CONFIRMED.**
All three sites round 2 named landed, and each is true of the code:

- `/home/user/fleet/table/guides/table.md:175-178` (`conform-table.diff:138-141`) names `column "<key>" has metadata that cannot be owned`. `src/core/cloners.ts:36` raises that exact string and `src/core/Table.ts:66` rethrows the `TableError` unchanged, so "rethrows unchanged" is true.
- `guides/table.md:1301` (`:349`) now ends "refuse first for every schema whose reads are stable".
- `guides/table.md:231-233` (`:161-165`) drops the uniqueness clause; `is the one path that` returns no hit anywhere outside `node_modules`.

**3. No old name survives — CONFIRMED** (by reference to `table-objective-r2.md:20-21`).
The fix round renamed no symbol: the only identifier-bearing hunk is the test title at `conform-table.diff:542-543`. `^\+.*should` over the whole diff, case-insensitive, returns no hit, so the `should` sweep population round 2 re-derived is undisturbed, and no new old-form word entered the tree.

**4. Proofs and sweeps — REFUTED (documentation row `table-subj-2`).**
The behavioural rows hold; no fix-round hunk touches their tests or captures. The documentation row's recorded sweep is false. `conform-table-report.md:310-317` states the pattern "matches `guides/table.md:226` (`` `createTable` never reaches it for a schema whose reads are stable, because … ``)". I ran `createTable never reaches it` over the checkout outside `node_modules`: **no hit**. The phrase exists nowhere on one line — `guides/table.md:229-230` wraps it across lines and backticks `createTable`. Line 226 is the `cloneRow` sentence. The alternation returns exactly one hit, `guides/table.md:1301`. The record also sits in § Fix round 2, not in § Sweeps as the round-2 prescription and the fix brief's row 5 both required.

**Right looks like:** delete the fabricated hit and add a § Sweeps row (after `report:84`) carrying the patterns that discriminate the old forms and that I confirmed read empty over `{src,tests,guides}/**/*.{ts,md}` plus `README.md`: `is the one path that` — 0 hits — and `refuse first\.` — 0 hits. Record the alternation, if kept, with its actual single hit `guides/table.md:1301`, ruled the row-2 result. In the same row, give the number-word sweep's non-`one` hits by `file:line` — `src/core/types.ts:277`, `:393`, `:855`, `src/core/helpers.ts:128`, `:132`, `:173`, `tests/guides.test.ts:708`, `tests/src/core/helpers.test.ts:243` — each an arity or an example magnitude, as I re-ran it.

**5. Guide parity — CONFIRMED** (by reference to `table-objective-r2.md:32-33`).
The fix round changed prose only. No method table, Surface row, or export moved; the errors-table hunk (`conform-table.diff:340-353`) changes the `SCHEMA` cell text and column padding alone. No added line carries `AGENTS §`; the sole `@src/` added line is a test import (`:534`), which the guide-example rule does not reach. `refuse first|not a table schema|metadata that cannot|one path that` over `tests/**` returns only `tests/src/core/Table.test.ts:114`, so no fence transcription or presence guard quotes a changed line.

**6. Breaking changes named — CONFIRMED** (by reference to `table-objective-r2.md:35-36`).
The fix round wrote no file under `src/**`: its hunks are confined to `guides/table.md` and `tests/src/core/Table.test.ts`. `/home/user/work/evidence/conform-table.status:1-10` shows the same modified set with `src/core/index.ts` absent, so no published symbol moved and `conform-table-report.md:178` still holds.

**7. Scope — CONFIRMED** (by reference to `table-objective-r2.md:40-41`).
`/home/user/work/evidence/conform-table.status:1-10` lists the same ten modified files and no untracked file. Both files the fix round wrote — `guides/table.md` and `tests/src/core/Table.test.ts` — are in that round's Owned row (`conform-table-fix2-brief.md:23`). `package-lock.json`, `node_modules`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` remain absent, and no alias, re-export, or shim was added.

**8. First conjunct CONFIRMED; independent gate run NOT-EVIDENCED.**
`^\+.*(\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|debugger|console\.)`, case-insensitive, returns no match over `/home/user/work/evidence/conform-table.diff`, which covers every line the fix round added. `vite.config.ts` is absent from `conform-table.status:1-10`, so no timeout was inflated. The gate readings at `conform-table-report.md:331-341` were taken inside the unit's own exec: NOT-EVIDENCED, and the Orchestrator's deciding run at landing settles it.

**9. Nothing hidden — CONFIRMED.**
No TODO, FIXME, `debugger`, `console.`, or commented-out code on any added line (same sweep as claim 8). Round 2's two refutations are closed: `conform-table-report.md:103` is relabelled "as first attempted", and `:162-166` states the row's current state instead of "nothing from this row is in the tree". The diffstat is regenerated and correct — I counted `^\+` 156 and `^-` 125 in the diff, minus ten file headers each, giving the 146 insertions and 115 deletions at `report:53`. The disposition cell's stale line citation is F4, not a mismatch of disposition.

**F1 — CLOSED.** `/home/user/fleet/table/tests/src/core/Table.test.ts:29` reads `it('exposes each interface member set exactly', …)` (`conform-table.diff:542-543`). I re-ran the number-word sweep over `src/**/*.ts` and `tests/**/*.ts` outside the four excluded files: every remaining hit is an arity ("Compares two cells", "two lens lists") or an example magnitude ("ten thousand rows", `'twelve'` as a data literal). No tally over a growable set survives. The recording is thin, and its repair rides in the claim-4 prescription.

**F2 — CLOSED.** `guides/table.md:231-233` now reads "reaches it, and it refuses with `column "<key>" has metadata that cannot be owned`". `is the one path that` returns no hit outside `node_modules`, so the uniqueness claim is gone from the package.

## Findings outside the claims

**F3. The guide's "rethrows unchanged" claim is not pinned by an assertion that would break if it went false.**
`/home/user/fleet/table/guides/table.md:175-178` claims the constructor rethrows `cloneSchema`'s message unchanged. The only assertion is the substring form at `/home/user/fleet/table/tests/src/core/Table.test.ts:114`, `toThrow('column "id" has metadata that cannot be owned')`, which still passes if the constructor wraps the message the way `src/core/Table.ts:68` wraps the sibling path (`The table schema is unusable: …`). `.claude/rules/documentation.md` § Parity requires the executed assertion that breaks when the prose claim goes false. This matters because the wrapping prefix is live in the same constructor, so the drift the sentence forbids is one edit away and no gate sees it.

**Prescription:** at `tests/src/core/Table.test.ts:114` write `expect(() => new Table(schema)).toThrow(/^column "id" has metadata that cannot be owned$/)`, and run `npm --prefix /home/user/fleet/table run test:src` green.

**F4. The report's citations into the guide are stale by the fix round's own reflow.**
`/home/user/scaffold/tmp/units/conform/conform-table-report.md:18` cites `guides/table.md:226-228` for the scoped sentence, which sits at `guides/table.md:229-233` after this round's edits and the `oxfmt` reflow the builder records at `report:339-341`; line 226 is now the `cloneRow` sentence. `report:162` reads "per the evidence below" while that evidence sits at `report:114-160`, earlier in the same section, and `.claude/rules/writing.md` § Code tokens, references, and links bans `below`. `report:33` and `report:37` describe the two files the fix round wrote without naming what it wrote.

**Prescription:** at `report:18` cite `guides/table.md:229-233` and name the two sites this round added (`:175-178`, `:1301`); at `report:162` write "per the evidence recorded earlier in this section"; at `report:33` add the title rename at `tests/src/core/Table.test.ts:29`, and at `report:37` add the Guards-paragraph sentence and the scoped `SCHEMA` row.

## Referrals to the Orchestrator

**R-A. The tree is right and only the record is wrong.** Every material repair round 2 prescribed is in the tree and provable: I verified the three guide sites, the test title, both discriminating sweeps reading empty, and the regenerated diffstat. Claim 4 fails on `conform-table-report.md:310-317` alone. Rule whether the closing unit is a report-only `builder` re-dispatch carrying F4 and the claim-4 prescription, with no gate re-run owed because no gate-bearing file changes, or an Orchestrator-owned record correction that then needs its own brief, report pair, and an auditor under `.agents/orchestration.md` § Dispatch anatomy. F3 changes a test file and does owe `test:src`, so it belongs in a separate unit or a separate row with that gate named.

**R-B. Round 1's R2 has a carrier and needs no further action here.** `/home/user/scaffold/.orkestrel/campaign/conform/ledgers/followons.md:23` carries the read-count design question to the next design matrix, and `conform-table-report.md:279-282` records that routing. Confirming only; no ruling of mine.

FAIL 4; outside the claims: F3, F4
