# Audit verdict: unit conform-sqlite

Subject: the uncommitted unit in `/home/user/fleet/sqlite` (brief `briefs/conform-sqlite-brief.md`, audit brief `briefs/conform-sqlite-audit-brief.md`, report `reports/conform-sqlite-report.md`, evidence `units/conform-sqlite.diff.txt` and `units/conform-sqlite.status.txt`), workflow `wf_f5789004-34f` (L1b).

## Lanes

| Round | Lane | Role, engine | Terminal | Failing |
| --- | --- | --- | --- | --- |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench | FAIL | none; F1–F4 outside the claims (the unguarded native `return` on the iteration escape path among them) |
| 1 | checker | `checker` on Claude Sonnet | PASS | — |
| 2 | objective | `reviewer` on Claude Opus 5 | PASS | — |
| 2 | checker | `checker` on Claude Sonnet | PASS | — |

Subjective lane: not run in the audit rounds, by the round's design (the objective lane and the checker are the audit lanes of this conformance round; the subjective argument was taken in the finder round that produced the rows). The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution.

Fix round 1 (Opus `implementer`) closed F1–F4. On F2 it refuted the lane's stated vector by measurement (IteratorClose discards a `return` fault while the caller is already throwing) and re-aimed the guard at the reachable escape paths (`break`, early `return`, normal completion), with the control captured before the fix; the second objective round re-ran the instrument across every exit and held the fix.

## Rulings on the second round's referrals and observations

- R1 (`path` and `connected` have no Surface row in `guides/sqlite.md` while `src/server/types.ts:140-141` declares them): a pre-existing parity gap the sqlite-subj-12 repair exposed; carried as an added row of the sqlite follow-on unit (`briefs/followon/sqlite-engines-brief.md` § Added rows).
- R2 and R5 (`README.md:8-10` states the host's measured Node 22.22.2 rather than the engines floor; sqlite-subj-18 shipped that reading): closed by the same follow-on unit, whose README row states the floor `^22.18 || >=24.4` from the `node:sqlite` history; the negative control on an older Node is an observation this host cannot take.
- R3 (database's vendored `guides/sqlite.md` mirror is stale): a byte copy of the landed guide at database's landing, never a hand edit; recorded in the follow-on ledger.
- R4 (`DriverInterface` named in prose rather than by identifier at `src/server/types.ts:117-118` and `guides/sqlite.md:103`): no change. The unit resolved the row's internal contradiction as its deviation contract allowed, and no rule names the identifier form at a site without guide parity.
- O1 (`guides/sqlite.md:102`, "ships no deep import path" beside the `./package.json` export): carried as an added row of the follow-on unit with the lane's airtight form.
- O2 (`guides/sqlite.md:106` and `src/server/types.ts:102-104` scope the discarded finalize fault to `break` and early `return` while the guard covers every exit after the first step): carried as an added row of the follow-on unit with the lane's wording.
- O3 (the swallowed ROLLBACK fault at `src/server/SQLiteDatabase.ts:108-112` and `:119-123`): pre-existing behaviour outside the confirmed rows; recorded in the follow-on ledger against `transact` for a later change.
- O4 (the F2 instrument planted its control in a file the unit owns): the tree carries no planted line; the brief template's proof step is amended to name the plant file for a later unit rather than reopening this one.

## Structural claims

Claim 4's counts are writer-reported with the defect-naming tests present at the sites the lane names; claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/sqlite`, recorded in `units/land-conform.log` and `units/conform-sqlite.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 2, objective and checker), the deciding run at landing read every gate exit 0 (landed as sqlite `225bb1c`).
