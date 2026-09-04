# Audit verdict: unit conform-brief

Subject: the uncommitted unit in `/home/user/fleet/brief` (brief `briefs/conform-brief-brief.md` with its addendum, audit brief `briefs/conform-brief-audit-brief.md`, fix briefs `briefs/conform-brief-fix1-brief.md` to `conform-brief-fix2-brief.md` with the successors `fix1b`, `fix1c`, and `fix2b`, report `reports/conform-brief-report.md`, evidence `units/conform-brief.diff.txt` and `units/conform-brief.status.txt`, proofs under `/home/user/work/evidence/brief-proofs/`), implemented by a direct Opus `implementer` (`units/l4/brief-implement-direct.md`) from the Luna-reconciled rulings (`units/l4/brief-reconcile-luna.md`) with the addendum's consumer edits taken first.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/brief-r1-distill-grok.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna, three times across the successor fix rounds (`units/l4/brief-r1-checker-luna.result.md` FAIL 5; `brief-r1b-checker-luna.result.md` FAIL 5, 7, 9; `brief-r1c-checker-luna.result.md` PASS) | PASS after fix round 1c |
| 1 | objective | GPT-5.6 Sol through the Cursor bench, read-only (`units/l4/brief-objective-r1-sol.md`) | FAIL 3, 4 with O1, O2, R1 |
| 2 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/brief-r2-distill-grok.result.md`) | distillate |
| 2 | checker | `checker` on Cursor Grok 4.6 (`units/l4/brief-r2-checker-grok.result.md`), Luna being dark | PASS |
| 2 | objective | `reviewer` on Claude Opus 5 (`units/l4/brief-objective-r2.md`), Sol being dark | FAIL 3, 6 with O1, O2, R1, R2 |

Subjective lane: not run in the audit rounds, by the round's design. The objective lane ran on Sol through the Cursor bench in round 1 and on the Opus `reviewer` in round 2 after the Cursor account's usage limit darkened the API models; the checker moved from Luna to Grok 4.6 for the same reason.

Fix round 1 and its successors 1b and 1c, Sol writers (`units/l4/brief-fix1-sol-result.md` to `brief-fix1c-sol-result.md`): the documented fence values asserted, the retained `above`, the remaining document pointers, every builder value the Builders fence documents. Fix round 1b's pointer sweep edited the vendored `tests/policy.test.ts` under a scope line that read `tests/**` without the vendored exclusion; the Orchestrator restored the committed file and the rule that a scope line naming `tests/**` or `src/**` names the vendored set off-limits in the same sentence is in `ledgers/followons.md`. Fix round 2 and its successor 2b, Opus `implementer` writers (`units/l4/brief-fix2-opus-result.md`, `brief-fix2b-opus-result.md`): the sweep records, the banned words in the guide and its transcriptions (`new` as a dating word, `should`, temporal `once`), the counted comment at `tests/guides.test.ts:340`, and the banned-sense sites the sweep reached outside its scope, granted by the successor. Fix round 3, a Sonnet `builder` (`units/l4/brief-fix3-sonnet-result.md`): the round-2 objective lane's prescriptions adopted verbatim.

## Rulings

- Round 1 claims 3, 4 and the checker's claims 5, 7, 9: closed by fix rounds 1 to 2b; round 2's checker confirms every claim on the tree.
- Round 2 claims 3 and 6 with O1 and O2: closed by fix round 3, a Sonnet `builder` adopting the lane's prescriptions verbatim (`briefs/conform-brief-fix3-brief.md`, `units/l4/brief-fix3-sonnet-result.md`) — the doc block at `src/core/types.ts:168-170` names the 0.0.6 release instead of the removed `citation` export, § Breaking names `INTERPRETATION_MEMBERS` losing `'complete'`, § Gates states its readings predate the fix rounds, the pointer reads `tests/guides.test.ts:342`; the Orchestrator verified each adoption on the tree by sweep. O1's gate reading is the landing run.
- Round 2 R1: sample strings inside a code fence or a test fixture are data, exempt from the substitution table (`ledgers/followons.md`). R2: the evidence generator passes `--text`, so `tests/src/core/parsers.test.ts` renders in the retained diff.
- Round 1 R1: the landing's deciding run executes the full gate chain on the final tree.
- Breaking rows (`brief-obj-3`, `brief-subj-1`: the builders renamed to the `build` form, `deriveStatement` returning `string | undefined`, `buildExample`'s second parameter named `output`): no fleet consumer (no `package.json` under `/home/user/fleet` depends on `@orkestrel/brief`); the bump ruling carries them for the registry's consumers of 0.0.6.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/brief`, recorded in `units/land-brief.log` and `units/conform-brief.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (each round's refutations closed by the fix round that followed; round 2's checker confirms the tree and the Orchestrator verified fix round 3's adoptions by sweep); landed as 71d12f8 with the full chain green and the offline audit clean.
