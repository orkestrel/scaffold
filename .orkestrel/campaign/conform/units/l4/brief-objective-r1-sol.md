## Per-claim verdicts

1. **CONFIRMED.** Every named row has an `applied` or `noop` disposition at `conform-brief-report.md:63-76`, with corresponding diff evidence.

2. **CONFIRMED.** Operative repairs appear at `src/core/helpers.ts:51-338,1266-1268,1327`, `src/core/BriefCompiler.ts:192-202`, `src/core/BriefManager.ts:84-86`, `src/core/validators.ts:40-251`, and `tests/guides.test.ts:342-494`. The `^import` sweep over the row’s source and test paths found every type import before value imports. The old-form sweep `Whether the outcome gates|@param result|@param data|Empty or all spaces|reasons idiom|Lowercase value builders|gate\(source:|add\(source:` over `src`, `tests`, `guides/brief.md`, `guides/README.md`, and `README.md` found no target violation. The `defaults to` hits at `guides/brief.md:367-376,683` are permitted because brief-subj-6 targets TSDoc under `src/core`.

3. **REFUTED.** The required inflection evidence is incomplete. The report records the base call-form sweep at `conform-brief-report.md:171-181`, but its case-insensitive inflection sweep covers only `gateDefinition` at `:183-184`. The required sweep over every renamed symbol was not recorded. My call-form sweep `\b(task|reference|manifest|outcome|given|example|citation|gap|risk|output|proof|brief|gateDefinition)\s*\(` over the prescribed paths found only the permitted `BriefManager.brief` method and `gap(s)` message text at `src/core/BriefManager.ts:74`, `src/core/types.ts:509`, and their callers. The smallest fix is to record the case-insensitive `-s`, `-ed`, and `-ing` sweep for every renamed symbol and rule each domain-word hit by sense.

4. **REFUTED.** The behavioural evidence binds: `test:src:core` reports `Tests 1 failed | 282 passed (283)` before the `deriveStatement` repair and `Tests 283 passed (283)` after it; the moved guide test reports `Tests 1 failed | 19 passed (20)` with its plant and `Tests 20 passed (20)` after restoration. However, the report gives no old-form sweep under brief-subj-5, brief-subj-7, or brief-subj-8 at `conform-brief-report.md:224-249`. The smallest fix is to add each exact pattern and the prescribed paths to those report entries.

5. **CONFIRMED.** Interface methods at `src/core/types.ts:477-515` match the guide tables at `guides/brief.md:643-696`; readonly data remains in the Surface rows at `guides/brief.md:118-122`. Public fences import `@orkestrel/brief`, and their value transcriptions appear at `tests/guides.test.ts:342-494`. The pattern `AGENTS(?:\.md)? §|AGENTS §` over touched source, tests, and prose returned empty. The pointer sweep `\b(above|below)\b` returned only permitted rank comparisons and reasons-operator literals at `guides/brief.md:545,1044` and `src/core/helpers.ts:349-355,669`.

6. **CONFIRMED.** The breaking section names the export renames, signature changes, consumer population, and migration forms at `conform-brief-report.md:334-369`. No published removal or rename is omitted.

7. **CONFIRMED.** Live `git status --short` matches `conform-brief.status:1-22`; every path is owned. No lockfile or vendored path appears. The old declaration sweep found no removed builder export, and `src/core/index.ts:1-11` contains only the package’s ordinary star exports, not a compatibility alias or shim.

8. **CONFIRMED for the auditable conjunct; deciding gate run NOT-EVIDENCED.** The pattern `\.(skip|only|todo)\s*\(|\bretry\b|\btimeout\b|\bTODO\b|\bFIXME\b|console\.|\bdebugger\b` returned empty over added diff lines and the allowed tree. The report names `format:check`, `lint:check`, `check`, `build`, and `test` with commands and exit readings at `conform-brief-report.md:315-321`. The Orchestrator’s landing run settles those gates.

9. **CONFIRMED.** The residue sweep from claim 8 returned empty. The disposition table at `conform-brief-report.md:63-76` agrees with the diff: applied rows have matching changes, while fleet-F1 and fleet-F2 have no implementation change.

## Findings outside the claims

O1. `writing.md` forbids `new`, `should`, and temporal `once` in developer prose. Violations occur at `src/core/types.ts:168`, `src/core/helpers.ts:190`, `guides/brief.md:415,417,429,980`, and `tests/guides.test.ts:391-465`. Use “the earlier `citation` function took,” “tests cover the changed code paths,” “Add no dependencies,” “Does validation message wording need to change?”, and “Does the result need to land as a diff or as full files?” Update each transcription with its guide text. Constructor syntax and the `once` variable are permitted code senses.

O2. `tests/guides.test.ts:340` counts a growable test set as “These two tests.” The right form is “These tests transcribe the guide’s flagship fences.”

## Referrals to the Orchestrator

R1. Will the landing run execute the ordered gate chain and settle claim 8’s `NOT-EVIDENCED` gate reading?

FAIL 3, 4