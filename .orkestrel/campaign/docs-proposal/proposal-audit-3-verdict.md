# Audit verdict — docs-proposal round 3

Subject: `PROPOSAL.md` after the round-2 patches (1307 lines). Brief: `tmp/units/docs-proposal-audit-3-brief.md`. Lanes run, blind, in Workflow `wf_a36bf00c-f17`: objective on `reviewer` (Opus 5), the recorded substitution for the dark Sol bench; `checker` on Sonnet in addition; `verifier` on Sonnet beside them for the gates. The subjective lane was not run this round: every round-2 subjective finding was applied as its own prescription and confirmed by the checker's text comparison, and round 3's claims were pointer, patch, and ruling truth.

Terminal lines: objective `VERDICT: FAIL 2, 4, 5; outside the claims: F1, F2`; checker `VERDICT: FAIL 1; outside the claims: none`; verifier `GATES: GREEN` (`npm run format:check` on 222 files, `npm run lint:check`, `git diff --check`, and the file's own `oxfmt --check`, each exit 0).

Held: claim 1 in substance (every patch at its site with its `new` string; the checker's three departures are textual — a wording the subjective lane left unprescribed, a bold boundary, and a dropped clause that the preceding sentence already carries), claim 3 (the splice ruling and its Materializer pointers), claim 6, claim 7.

Reconciliation: every remaining finding carries into the Orchestrator's recorded script `instruments/round-3-patches.py`, each patch adopting the objective lane's prescription:

| Finding | Patch tag | Ruling |
| --- | --- | --- |
| objective 2(a), 4 | `R3-pitch`, `R3-vendored` | the pitch is the blockquote at `guides/scaffold.md:3-7`; the vendored-set source is `:9-27`, covering `README.md:6-8` and `:10-23` |
| objective 2(c) | `R3-verb` | the verb table is a region inserted at `README.md:44`, between the flags and the per-verb sections |
| objective 2(b) | `R3-rec`, `R3-currency`, `R3-gate`, `R3-li` | one region per span at the Recommendation, the currency row, the rename gate cell, and the LI row |
| objective 5 | `R3-rename-today`, `R3-rename-gate` | the fence transcription in both Option 1 columns with the typecheck as its check |
| objective F1 | `R3-probe3`, `R3-probe5`, `R3-probe6` | item 3 leaves the probe list (its reading already sits in the risk row at the splice); the rest renumber |
| objective F2 | `R3-catalog-range`, `R3-recatalog-range` | `src/server/Materializer.ts:386-396` and `:1112-1161` at every site |
| checker 1 (O-F5) | `R3-bold` | the prescription's exact bold boundary |
| checker 1 (S-F3, S10) | none | Orchestrator wording kept: S-F3 had no prescribed text; S10's dropped clause is stated in the sentence before it |

After the script: `oxfmt --write PROPOSAL.md`, `oxfmt --check` clean, `git diff --check` clean, `npm run format:check` clean on 222 files, 1301 lines. Round 4 is a checker confirmation of the script alone.
