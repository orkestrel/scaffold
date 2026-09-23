# cr audit, subjective lane (`reviewer` on Opus 5.5) — verdict

Brief: `units/cr-audit-reviewer-brief.md`. Claims: `units/cr-audit-claims.md`.

**Lane held: subjective. Engine: Opus 5.5. Subject: CLOSE-REGISTRY (`cr`), worktree `/home/user/veneer-cr` over `7398772`.**

The design of the change holds. One finding outside the claims forces a FAIL: the unit's own prose says every `DRIVEN_KEYS` row is driven, but one row is a reading at rest. Claims 4, 5, and 6 are UNRESOLVED from this lane. For 4 and 5, only the writer's own runs show the gates green. For 6, the open questions are mechanical and are referred to the objective lane.

## Numbered verdicts

1. **CONFIRMED.** `cr-status.txt` lists only the three owned files; the diff headers name the same. Attack: I looked for an edit to `src/**`, `app/**`, another `tests/**` file, or `ROADMAP.md`, and found none. The only retired-name hit outside `tests` and `app` is `ROADMAP.md:396`, a row from before this change.

2. **CONFIRMED.** The table is at `tests/setup.ts:1087-1110`: frozen rows in landing order. `CAPTURE_KEYS` is the fixed spread (`tests/setup.ts:1123-1127`). The doc block at `tests/setup.ts:1068-1086` names no member and states the population as a rule. The `CASCADE_KEYS` doc block names `DRIVEN_KEYS` at `tests/setup.ts:327-328`. Attack: I walked every retired doc block against the journey cases; every placement reason now sits in a case (Button focus `integration.test.ts:378-380`; hover and active `:478-481`; Toggle `:597-600`; Validation `:741-744`, `:761-763`; Pagination `:776-781`; Check group `:881-884`, `:902-904`, `:920-922`, `:953-958`; Range `:1008-1009`; Floating `:1044-1047`, `:1068-1074`; Select `:1108`, `:1122-1123`; Control `:1158-1159`; List group `:1199-1206`; Close `:1309-1316`, `:1357-1361`; Form check `:1410-1414`, `:1427-1428`, `:1482-1485`; Input group `:1519-1523`, `:1531-1535`). The sentences the unit dropped were each stale, or replaced by the table's rule.

3. **CONFIRMED.** My own recount from `cr.diff`: the only rows removed and re-added are the Button rows (old `tests/setup.ts:317-322`, re-added unchanged at `:1088-1091`); every other driven row is an unchanged context line; no `SHOWCASE_KEYS` or `CASCADE_KEYS` row changes. The retired-name grep (excluding `node_modules`, `dist`, and `tmp`) returns only `ROADMAP.md:396`; the `_KEYS: readonly Capture` grep returns `:318 SHOWCASE_KEYS`, `:1087 DRIVEN_KEYS`, and `:1123 CAPTURE_KEYS`.

4. **UNRESOLVED.** The proofs' design held under attack: the export-name case and the spread case at `tests/setup.test.ts:57` and `:71`; the driven-row case (`:98-142`) states each exemption's reason, has a staleness check (`:132-136`), and keeps the explicit checkbox list (`:139-141`). Each recorded mutation is distinguished (the spread at `:71`; the stem-prefix check at `:108`; the membership check at `:127`), and two unrecorded ones are too (exempting a subject with a resting row; dropping `Check group` from the exempt set). Open: the green `npm run test:setup` run and the mutation results rest on the writer's artifacts; settles with the verifier's run.

5. **UNRESOLVED.** The selection design held (`integration.test.ts:745-747`, `:767`, `:1048-1050`); the family is derived rather than stored, as R2 requires; the retired imports are gone (`:73-80`). Open: `npm run test:app` cannot exercise these edits because the `app:browser` project excludes the file (`vite.config.ts:187`); settles with the journey run in the Orchestrator's landing chain.

6. **UNRESOLVED.** Voice held: no count ("8000 pixels" is a measurement; "once for each state" is the permitted sense), no banned term, no `any`, `as`, `!`, suppression, mock, nested function beyond a callback passed directly, or helper. Open: the code-token-noun rule and the report's result lines, referred to the objective lane.

## Findings outside the claims

**F1. The unit's prose calls every `DRIVEN_KEYS` row a drive, but one row is a reading at rest.** The rewritten sentence at `tests/setup.ts:366-367` ("where a journey drives the state its scenario names before it shoots the frame") is false for `check-group-checked`, whose case (`integration.test.ts:880-941`) drives nothing. It contradicts the same doc block's "drives or reads a state" (`:327`), the table's rule (`:1075-1076`), and the case's exemption reason (`tests/setup.test.ts:120-122`). The same slip at `tests/setup.ts:1082-1083` ("once for each state its family drives") and in the case title at `tests/setup.test.ts:98` ("for one state beyond rest"). Right: "where a journey drives or reads the state its scenario names before it shoots the frame"; "once for each state its family drives or reads"; retitle the case so it holds for every row, for example "names each driven row for its subject's stem and one state, on a specimen the resting registry photographs or one it exempts by name". Keep the name `DRIVEN_KEYS`.

## Attacked and held

- **Design fit.** The flat table with its family derived from the specimen tables fits AGENTS.md § Derive state and removes the per-family spread rewrite D20 names.
- **Exemption set.** Each exemption carries its reason, and the staleness check reddens a drift.
- **Validation selection.** A future driven row on a validation specimen would be placed twice, and the placed-equals-registered case at `integration.test.ts:1670` catches it loudly.
- **Doc block wording, non-blocking.** The opening line of the `DRIVEN_KEYS` doc block takes more than one read; accurate.
- **Cross-references.** Cases citing "the reason the Button focus scenario is one" resolve to the focus case's comment (`integration.test.ts:378-380`).

## Referrals

- **To the objective lane:** the bare `rest` token at `tests/setup.test.ts:101`; bare `{@link}` tokens at `tests/setup.ts:328`, `:366`, and `:1080` (rule whether the house convention exempts a linked constant); the misreported grow-spinner result line (`close-registry-report.md:93` reads 244 passed where the run log reads 245).
- **To the Orchestrator:** no run has executed the consumer edits in `tests/app/browser/integration.test.ts`; claim 5 settles only on the journey run in the landing chain.

VERDICT: FAIL 4, 5, 6; outside the claims: F1
