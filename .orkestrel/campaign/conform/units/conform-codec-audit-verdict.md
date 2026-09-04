# Audit verdict: unit conform-codec

Subject: the uncommitted unit in `/home/user/fleet/codec` (brief `briefs/conform-codec-brief.md`, audit brief `briefs/conform-codec-audit-brief.md`, report `reports/conform-codec-report.md`, evidence `units/conform-codec.diff.txt` and `units/conform-codec.status.txt`, proofs under `/home/user/work/evidence/codec-proofs/`), the L0 unit the round's first slice never dispatched: its refute ruling (`rulings/conform-codec.json`) confirmed codec-obj-1, codec-subj-2, codec-subj-3, and codec-subj-4, none breaking, and the gap surfaced through the round-verdict draft on 2026-09-04. Implemented by a Sonnet `builder` (`units/l0-codec-implement-sonnet.md`) from the refuter's amended forms, the Orchestrator routing the unit to the builder because every row is fully specified and touches no `src/**` file.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on Cursor Grok 4.6 (`units/l0-codec-r1-distill-grok.result.md`) | distillate |
| 1 | checker | `checker` on Cursor Grok 4.6 (`units/l0-codec-r1-checker-grok.result.md`), Luna being dark | PASS with two referrals |
| 1 | objective | `reviewer` on Claude Opus 5 (`units/l0-codec-objective-r1.md`), Sol being dark | AUDIT-R1-OBJECTIVE |

Subjective lane: not run in the audit round, by the round's design. Both lanes ran on substitute engines, the Cursor account's usage limit having darkened Sol and Luna; both were blind to each other.

## Rulings

- The checker's referrals on claim 3: the `kind` hits outside `tests/setup.ts:270` and its two readers (`guides/codec.md:113`, `src/core/validators.ts:93,136,162`, `tests/guides.test.ts:171`, `kinds` at `tests/setup.ts:636`) are different uses the row's repair excludes by stating "nothing else moves"; the row renamed a loop-local binding, not a member; the writer's sweep record names `tests/setup.ts` alone where the claim names five paths, a record gap the verdict carries here rather than a fix round. AUDIT-R1-RULING
- Breaking rows: none; no fleet consumer edit; codec's published `dist/` is unchanged (every row edits tests, the guide, and the README), so the bump ruling reads the published tarball's material diff at the wave.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/codec`, recorded in `units/land-codec.log.txt` and `units/conform-codec.audit.txt`, and the landing commit named in the state table.

## Terminal

AUDIT-TERMINAL
