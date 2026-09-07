# Audit verdict — D7.guide R1, over U0 `d7-guide-headstart` and U1 `d7-guide-readers`

## Round 1 (2026-09-07, Workflow `wf_549a1bfd-278`)

Lanes: subjective `reviewer` (Opus 5), objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet). All three ran and returned verdicts; no lane was not run. Brief: `d7-guide-readers-audit-brief.md`. Returns: `d7-guide-readers-audit-subjective.md` (`VERDICT: FAIL 9`), `d7-guide-readers-audit-objective.md` (`VERDICT: FAIL 3, 9`), `d7-guide-readers-audit-checker.md` (`VERDICT: FAIL 3 9`).

### Rulings per claim

- **Claim 3 — FAIL, closed by the Orchestrator.** The objective lane and the checker read `package-lock.json:3` and `:9` still at `0.0.17`; P15's sweep excluded the lockfile by construction. The lockfile-only install (`npm install --package-lock-only --ignore-scripts --no-audit --no-fund` under npm 11.19.1, `instruments/d7/u1fix/lockfile.log.txt`) rewrote the root version to `0.0.18` and dropped the `vite-plugin-dts` subtree the lockfile carried after the manifest stopped declaring it — a staleness older than this campaign that `npm ci` would have refused. Committed as `aee1477` on the guide's branch with the `scripts/deps.sh` marker written. P15's line names the sweep's extensions (subjective O4).
- **Claim 9 — FAIL as worded; the code stands on the compared paragraph, and one clause goes.** Every lane read the compared paragraph naming the `name` overload. The subjective lane's ruling is adopted: the compared paragraph becomes the cell for a method carrying both overloads, so the pointer to the other half belongs in it, and the guide's cell already carries the same pointer. The objective lane's deletion is not taken, for that reason. The claim's last conjunct is struck. The checker's reading of the `#scanExamples` line comment as a noun phrase is recorded as outside the voice rule, which governs a doc block's description paragraph and not a `//` comment. The subjective lane's F3 stands: the trailing clause `so the overloads split the axis at the declaration head against its members` at `src/core/types.ts:382-383` restates the preceding sentence and introduces a word the guide never defines; it goes in the fix round.
- **Claims 1, 2, 4, 5, 7, 8, 10, 11 — PASS** on every lane that ruled them; the objective lane's reading of `collectKeys`'s grammar (a head key holds one space and no dot, a member key a dot and no space, so `key.includes('.')` partitions exactly) closes the subjective lane's referral R1.
- **Claims 6, 12 — CANNOT RULE** (subjective, checker): the red-first counts and the gate readings rest on the writer's report alone. Carried to the fix round's closure `verifier`, which runs `test:src:core` and `test:guides` independently; the objective lane's finding 2 (U0's gate set omitted the projects reading the fixture it edited) is closed by the same run and by U3's whole-chain sweep.
- **Claim 13 — FAIL in part** (objective 6, checker): the U1 report cites `guides/guide.md:466` for a sentence opening at `:467`; the U0 report cites `helpers.ts:5` for text sitting on `:6`. Both retained reports are annotated.

### Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| The EQ row omits `exported`, so it states a reach wider than the readers have | subjective F1 | U1-fix, item 1 |
| The `extractExamples` doc clause `under every keyword that grammar heads` cannot be read on the first pass | subjective F2 | U1-fix, item 2 |
| The `name` overload's trailing `axis` clause restates its sentence and names a concept the guide never defines | subjective F3 | U1-fix, item 3 |
| The untitled-block control passes on an explicit `title: undefined` | objective 3, subjective R2 | U1-fix, item 4 |
| `collectTitles` gives a head's title precedence over a member's of the same text, unstated | objective 4 | U1-fix, item 5 |
| The lockfile left at `0.0.17`, and stale since the `vite-plugin-dts` removal | claim 3 | closed, `aee1477` |
| The re-padded header row of the `SourceInterface` table | subjective F4, objective 5 | accepted; U2's brief scopes header text off-limits and padding formatter-owned |
| The `examples` cell and its table change voice under U2's `--to guide` | subjective F5 | U2's brief |
| The head key parsed by hand at each reader; the head keyword list with several homes | subjective F6, F7 | recorded for the next change in `plan.md`, outside this campaign |
| The report citations | objective 6, checker | annotated in the retained reports |
| P15's sweep bound | subjective O4 | `orchestrator-measurements.md` § P15 |

VERDICT: FAIL 3, 9, 13

## Round 2 (2026-09-07, closure of U1-fix, Workflow `wf_5a8f1174-65f`)

Lanes: `checker` (Sonnet) on the seven mechanical claims of `d7-guide-readers-fix-closure-brief.md`, `verifier` (Sonnet) on the scoped gates. The reviewer lanes did not run this round: the fix adopts the round-1 findings verbatim as exact edits, so the closure is mechanical. Returns: `d7-guide-readers-fix-checker.md` (`VERDICT: FAIL 7`), `d7-guide-readers-fix-verifier.md` (`GATES: GREEN`).

- **Claims 1 to 6 — PASS** on the diff and the tree: the four files and their five hunks, the EQ row's `exported`, the doc clause wrapped under 100 columns, the `name` overload ending at `instead.`, `toStrictEqual`, the precedence sentence verbatim.
- **Claim 7 — FAIL, corrected.** The report's closing sentence stated a count (`All five before-texts`); the retained report is corrected with the annotation. The gate readings the checker could not confirm are confirmed by the verifier: `format:check`, `lint:check`, `check`, `test:src:core` (598 passed), `test:guides` (51 passed), `test:policy` (90 passed | 1 skipped) green, `build` green, `docs` at `rows read: 1, disagreements found: 139` — the independent run round 1's claims 6 and 12 waited on.
- Round 1's carried findings each landed or were recorded as the table there states.

VERDICT: PASS
