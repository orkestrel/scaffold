## Fix round 2

Closes the round-2 objective lane's refutation of claim 4 and findings F1 and F2
(`units/l3/sea-objective-r2.md`).

- Rewrote the sea-subj-7 row of § Failing-first controls: the command cell now names the scoped
  `npx vitest run` command, the red cell reads `2 failed, 17 passed (19)` with the
  `this.#emitter.destroyed` guard planted out of `src/server/seas/SEA.ts`, the green cell reads
  `19 passed (19)` with the guard restored, and the files cell names `sea-subj-7-red.txt` and
  `sea-subj-7-green.txt`. Read both captures to take the counts.
- Rewrote the opening status claim to state that `git status --short` lists the unit's Owned
  paths plus `package.json`, carrying the Orchestrator's hunks of 18:56 UTC (the `"seal"` keyword
  removed for sea-subj-2, `engines.node` raised to `>=24.8.0` for sea-subj-19), with `README.md`
  the same row's carrier.
- Rewrote the § Shared-file patches paragraph to record that the Orchestrator applied the keyword
  deletion at 18:56 UTC in the same edit as sea-subj-19, keeping the diff block as the record of
  what was applied.
- Rewrote the sentence at the former `report.md:221` to read "Recorded under § Sweeps (fix round
  1)."

Capture files read: `/home/user/work/evidence/sea-proofs/sea-subj-7-red.txt`,
`/home/user/work/evidence/sea-proofs/sea-subj-7-green.txt`, and
`/home/user/work/evidence/conform-sea.status`.
