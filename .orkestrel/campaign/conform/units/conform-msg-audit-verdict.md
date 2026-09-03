# Audit verdict — unit conform-msg (2026-09-03)

Workflow `wf_ee0d6950-a8b` (`instruments/audit.workflow.js`, package msg), then one targeted fix round dispatched directly from `briefs/conform-msg-fix3-brief.md` and a direct checker pass. Lanes: `reviewer` on Claude Opus 5 holding the objective lane as the recorded substitution for the dark GPT-5.6 Sol bench (`codex` absent from PATH, probed 07:24 UTC); `checker` on Claude Sonnet. Writers: `implementer` on Claude Opus 5 (the resumed unit in `wf_0ab7f3dd-d5f`, the two workflow fix rounds, and fix round 3). Subject: the checkpoint commit 1a8821a (the earlier session's partial edits) plus the unit's uncommitted changes, judged with the dependency-pass commit 75a7b99 (`package.json` and `package-lock.json` alone, per `git show --stat 75a7b99`) excluded. Brief: `briefs/conform-msg-brief.md` (successor of `conform-msg-brief-1.md`); report: `reports/conform-msg-report.md`; evidence: `units/conform-msg.diff.txt`, `units/conform-msg.status.txt`, the checkpoint half at `evidence/conform-msg.checkpoint.diff`, the captured runner outputs under `evidence/msg-proofs/`; lane verdicts: `units/msg/*.json`.

| Round | Objective lane | Checker | Outcome |
| --- | --- | --- | --- |
| 1 | FAIL 8 (F1: the banned-term sweep population) | PASS | fix round 1: report and evidence only, no tree change |
| 2 | FAIL 3 7 8 (F1: `MSGMutableFieldData` doc and Surface row stated an index-signature write the readonly type refuses) | FAIL 3 7 (sweep paths; evidence spanning the dependency-pass commit) | fix round 2: F1 adopted with a mutation probe (`npm run check` exit 2 on the planted write, 0 restored); sweeps widened; evidence rescoped to `git diff HEAD` |
| 3 | FAIL 4 8 (F-1 report misquote; F-2 Errors-fence transcription asserted a `context` the fence never passed; F-3 `constants.ts:28-30` under two vocabularies) | not run (structured output failed the schema five times) | round budget spent; targeted fix round 3 from the Orchestrator's brief |
| 4 | not run (the three findings carried exact prescriptions adopted verbatim, each closed by a probe or a captured run) | PASS | accepted |

## Orchestrator's rulings

- Claims 4 and 8 are structural for a read-only lane: the failing-first counts and the gate chain are the writer's transcriptions. Claim 4 is settled by the eight captured runner outputs under `evidence/msg-proofs/` (`test:src` with msg-obj-8's `Object.freeze` reverted and restored, `test:guides` with the `.jpg` control planted and removed, `check` with the index-signature write planted and restored, and the F-2 fence stripped and restored), each restore byte-exact by `git diff --numstat HEAD`; claim 8 by the deciding run at landing.
- F-2's prescribed mutation probe did not redden on the fence edit alone, because nothing in the `guides` project read the fence body; the writer bound the transcription to the fence with a presence guard beside the executed assertion, after which the probe reddens on exactly that case. Accepted as the close `.claude/rules/documentation.md` § Parity sanctions.
- Claim 7: the `package.json` and `package-lock.json` hunks the round-2 lanes saw belong to 75a7b99; the unit's own manifest change is the `lint` script line. Confirmed by the round-4 checker on the rescoped evidence.
- The observations the fix rounds recorded outside the rows (`const data` bindings in `tests/src/core/helpers.test.ts`, the private `mutable` binding under msg-obj-9's reserved ruling, the msg-subj-13 same-class sites, the msg-subj-8 sibling vocabulary) are carried in `ledgers/followons.md`.

Ruling: ACCEPT at landing on the deciding gate run (`instruments/land-conform.mjs`: format:check, lint:check, check, build, test), recorded in the landing commit.

Terminal: `VERDICT: PASS`
