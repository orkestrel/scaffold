# Fix round 3 — unit conform-msg

## Role and engine

`implementer` on Claude Opus 5, a native subagent, the sole writer in `/home/user/fleet/msg`. Perform the assignment directly and spawn nothing.

## Subject

The unit brief is `/home/user/scaffold/tmp/units/conform/conform-msg-brief.md` (its Host paragraph's shell discipline binds this round too) and the writer's report is `/home/user/scaffold/tmp/units/conform/conform-msg-report.md`. The tree carries the unit's uncommitted changes on the baseline 75a7b99 (the dependency-pass commit over the checkpoint 1a8821a). Evidence: `/home/user/work/evidence/conform-msg.diff` (`git diff HEAD`), `/home/user/work/evidence/conform-msg.checkpoint.diff`, `/home/user/work/evidence/conform-msg.status`.

## The round-3 verdict

Objective lane (Claude Opus 5, the recorded substitution for the dark Sol bench): `/home/user/work/msgaudit/07-msg-objective-r3-ad7de918023781fc2.json` — `FAIL 4 8`, with findings F-1, F-2, and F-3 outside the claims, each carrying an exact prescription. The checker lane did not return in round 3 (its structured output failed the schema five times); its round-2 findings on claims 3 and 7 were closed by fix round 2. Read the verdict in full.

## Orchestrator rulings

1. **Claim 8** is structural and settles at the landing's deciding run. Re-run the gate chain bare and record each exit code.
2. **Claim 4** is settled by the artifacts the lane names, not by prose: write the runner's own captured output to files under `/home/user/work/evidence/msg-proofs/` — `test-src-reverted.txt` and `test-src-applied.txt` for `npm run test:src` with the `Object.freeze` change of msg-obj-8 reverted and then restored; `test-guides-control.txt` and `test-guides-clean.txt` for `npm run test:guides` with the `.jpg` control planted and then removed; `check-write-planted.txt` and `check-write-restored.txt` for `npm run check` with the index-signature write `fields[key] = value` planted at `src/core/MSG.ts:1133` and then restored. Capture each with `npm run <script> > <file> 2>&1` as one plain command; every plant is an exact Edit reversed by the inverse Edit, and `git diff HEAD -- <file>` after each restore must show the same hunk set as before the plant (record that reading). Name the six files in the report's § Failing-first proofs.
3. **F-1**: adopt verbatim — replace the report's `src/core/types.ts:79-81 before` block with the three removed lines exactly as `conform-msg.diff:919-921` carries them, including `via index signature`, and add the one sentence to the msg-subj-13 row stating that `types.ts:80`'s `via` left the tree with F1's block rewrite rather than with a substitution edit.
4. **F-2**: adopt the lane's first option — add the context to the fence so `guides/msg.md:148` reads `throw new MSGError('MALFORMED', 'bad input', { offset: 8 })` and the transcription stands. Then run the mutation probe: with the context removed from the fence again, `npm run test:guides` must fail on the transcription's assertion; restore the fence and record both readings in the report.
5. **F-3**: adopt the lane's prescribed `src/core/constants.ts:28-30` block verbatim and the guide row it matches; re-run the sweeps the finding names and record them.

## Method and output

Adopt the rulings, re-run the gate chain, rewrite `/home/user/scaffold/tmp/units/conform/conform-msg-report.md` so it describes the whole unit as it now stands with a `## Fix round 3` section naming each finding and what closed it, and refresh `/home/user/work/evidence/conform-msg.diff` (`git diff HEAD` after `git add -N` on every created file) and `/home/user/work/evidence/conform-msg.status` (`git status --short`). Do not commit, stage beyond `git add -N`, push, install, or run any discarding git command; undo every plant by editing. Return the structured output.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a ruling contradicts the tree in a way you cannot close inside Owned. Decide, record, and carry on from an ancillary question.
