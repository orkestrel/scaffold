<!-- workflow wf_af01f2ec-fc2, agent adc9d3070e35724f5, captured from journal.jsonl -->

Per-claim verdicts, all evidence drawn from `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-policy-plugin.diff.txt`.

**1. `tests/setupPolicy.ts` and `configs/policy.ts` name no compiler specifier; `configs/policy.ts` declares no import.**
PASS. Diff removes `import * as ts from 'typescript'` from `tests/setupPolicy.ts` (diff.txt:1728) and every `ts.*` call site in that file (all functions between diff.txt:1886–2476 deleted). No `import` line is added to `configs/policy.ts` anywhere in its diff hunk (diff.txt:100–918).

**2. Every rule needing the syntax tree moved to the plugin; no remaining sweep rule reads a syntax tree.**
PASS. `hasPolicyModifier`, `getPolicyLine`, `isFunctionDomainPath`, `expressionToPolicyFunction`, `hasModulePolicyFunction`, `nestsPolicyFunction`, `hasNestedPolicyFunction`, `inspectFunctionDomain`, `inspectPolicyFunctionName`, `inspectPolicyVariables`, `inspectPolicyConstants`, `isPolicyDeclaration`, `inspectPolicySource(s)`, `readPolicySources`, `matchesPolicySplit`, `matchesPolicyTerminator`, `importsPolicyTerminator`, `inspectPolicyEndingNode/Source/Endings` are all deleted (diff.txt:1886–2476); `inspectPolicyPortability` now calls only `inspectPolicyRuleMap`, `inspectPolicyFilenames`, `inspectPolicyScripts` (diff.txt:2485–2491), none of which parses syntax.

**3. Every register lives in `configs/policy.ts` alone; sweep imports it from there; no drift.**
PASS on single-file placement: `CENTRAL_SOURCE_FILES`, `FUNCTION_SOURCE_FILES`, `DATA_SOURCE_FILES`, `DATA_EXEMPT_FILES`, `FUNCTION_DOMAIN_FOLDERS`, `POLICY_AMBIENT_SUFFIXES` are deleted from `tests/setupPolicy.ts` (diff.txt:1768–1843) and added only to `configs/policy.ts` (diff.txt:180–258). The "sweep imports it from there" clause is moot rather than false: no surviving sweep function reads any register (see claim 12), so there is nothing left for the sweep to import.

**4. Every moved rule has an invalid/valid `RuleTester` pair whose boundary a report-call deletion would redden.**
PASS by structural reading (no test execution performed, per the brief's "run no command"). Each `report*` function's only effect is its `context.report(...)` call; every invalid case asserts a specific `errors: [{ messageId }]`, so removing the call that emits that `messageId` drops the assertion to zero errors. Verified concretely for `HIDDEN_RULE` (diff.txt:963–989: unexported top-level declaration in `helpers.ts`/`constants.ts` triggers `reportHidden`'s sole `context.report` at diff.txt:548) and for `PLACEMENT_RULE`'s unregistered-folder case (diff.txt:1129–1133, tied to `reportPlacement`'s report call at diff.txt:597). `CONSTANT_RULE` and `DOMAIN_RULE` each carry multiple `context.report` sites keyed to distinct `messageId`s (diff.txt:601–615, 640–666); each invalid case still reddens on removal of its own site.

**5. Every moved rule keys on the path suffix, never an absolute prefix.**
PASS. `pathToPolicyFile` and `pathToPolicyFolder` (diff.txt:291–301) take the file name and folder from `lastIndexOf('/')` with no root anchor; `isPolicyDomain` (diff.txt:321–333) matches `folder === registered || folder.endsWith('/'+registered)`, a suffix test, not a prefix test.

**6. `PolicyContext` names only members rules read, readonly, no `any`/assertion/suppression/nested-function violation.**
PASS. `PolicyContext` gained only `readonly filename: string` (diff.txt:144), used by every new report function via `context.filename`. No `any`, `as`, `@ts-*`, or `eslint-disable` appears in the added code (diff.txt:100–918). New module-scope helpers (`pathToPolicyFile`, `fileToPolicyStem`, `isPolicyDomain`, etc.) contain no nested function declarations; arrow callbacks appear only as direct arguments to `.some`/`.map` or as object-literal property values in `create()`, matching the file's existing pattern.

**7. `.oxlintrc.json` populations match the sweep's globs; ambient files excluded; no `typescript` restricted-import row added.**
PASS. New overrides: `["app/**/*.{cts,mts,ts,tsx}","src/**/*.{cts,mts,ts,tsx}"]` for the nine placement rules (diff.txt:77–90), and `["app/**/*.ts","configs/**/*.ts","src/**/*.ts"]` for `policy/no-host-line-endings` (diff.txt:91–96), matching `POLICY_PLACEMENT_GLOBS`/`POLICY_ENDING_GLOBS` (diff.txt:269–279). Ambient files stay excluded through each rule's `isPolicyAmbient(context.filename)` guard (diff.txt:545, 552, 560, 573, 585, 601, 618, 630, 640, 669, 676) rather than a glob negation. No `typescript` restricted-import row appears in the `.oxlintrc.json` diff hunk.

**8. No `POLICY_CONTROLS` row left unread; no test skipped/disabled/quarantined.**
PASS. Every `POLICY_CONTROLS`/`PORTABILITY_POLICY_CONTROLS` row tied to a moved rule is deleted alongside its reader (diff.txt:2516–2704, 2708–2787). No `.skip`, `.todo`, `.only`, or `oxlint-disable`/`eslint-disable` is introduced anywhere in the diff.

**9. Report's claimed changed files match status; no file outside the owned set changed.**
PASS. `u2-policy-plugin-report.md`'s "Tree state" section lists exactly `.oxlintrc.json`, `configs/policy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` (report:233–238), matching `u2-policy-plugin.status.txt` lines 2–6. `.claude/rules/architecture.md` (status.txt:1) is the separately-applied shared-file patch the report returns rather than edits itself (report:251–256), consistent with the brief's off-limits list.

**10. Names follow `.claude/rules/names.md`.**
PASS. New interface members are single-word (`PolicyContext.filename`, `PolicyBinding.node`/`.name`, diff.txt:126–136, 144). New helpers follow `{verb}{Noun}`: `pathToPolicyFile`, `fileToPolicyStem`, `isPolicyAmbient`, `isPolicyDomain`, `identifierToPolicyName`, `expressionToPolicyText`, `functionToPolicyRegion`, `statementToPolicyBindings`, `reportHidden`/`reportType`/`reportClass`/`reportData`/`reportPlacement`/`reportConstant`/`reportParser`/`reportFactory`/`reportDomain`/`reportEnding`/`reportEndingImport` (diff.txt:291–679). `PolicyExpression.kind` is a pre-existing AST-mirroring field widened in place (diff.txt:111–112), not a newly introduced discriminant.

**11. The unit's flagged claims hold on the code.**
PASS on all three sub-claims. `fileToPolicyStem` (diff.txt:304–307) strips any last extension via `lastIndexOf('.')`, stricter than the deleted `basename(file, '.ts')` (diff.txt:2069), so it only adds diagnostics, never removes one the sweep gave. `isPolicyDomain`'s suffix match (diff.txt:321–333) cannot false-positive inside the `app/**`/`src/**` population, because a path outside those top-level folders is never linted, so no candidate folder can produce the matching suffix from an unintended nesting. `functionToPolicyRegion`'s parent walk (diff.txt:440–450) returns `undefined` immediately when `node.parent` is absent, so a dropped `parent` reddens the placement-rule invalid cases (for example diff.txt:1129–1133).

**12. `tests/setupPolicy.ts` importing nothing from `configs/policy.ts` is correct.**
PASS. Every remaining sweep function (`inspectPolicySuppressions`, `inspectPolicyConfiguration`, `inspectPolicyRuleMap`, `inspectPolicyFilenames`/`FilenamePaths`, `readPolicyPaths`, `inspectPolicyScripts`, `inspectPolicyMirrors`/`MirrorPaths`, `testToPolicyStem`, `stemToPolicyCandidates`, the skill/bridge families) is unchanged or already register-free; every function that once read `CENTRAL_SOURCE_FILES`, `FUNCTION_SOURCE_FILES`, `DATA_SOURCE_FILES`, `DATA_EXEMPT_FILES`, `FUNCTION_DOMAIN_FOLDERS`, or `POLICY_AMBIENT_SUFFIXES` is among the deleted functions (diff.txt:1886–2476). No residual reference to any register remains in the sweep's diff hunk.

**13. The applied `.claude/rules/architecture.md` patch matches the code's final state.**
PASS. "The `policy` Oxlint plugin (`configs/policy.ts`) enforces syntactic placement... The fleet policy sweep... enforces what a path or a text reading decides" (diff.txt:9–18) matches the plugin/sweep split shown in claims 2 and 12. The `POLICY_ENDING_GLOBS` bullet (diff.txt:35–40) matches `ENDING_RULE`'s population. The `DATA_EXEMPT_FILES` and `FUNCTION_DOMAIN_FOLDERS` bullets (diff.txt:46–50, 60–66) point at `configs/policy.ts`, their actual new home. No sentence in the patched section still attributes a proof to a deleted sweep reader (`inspectPolicySource`, `readPolicySources`, `inspectPolicyEndings`, and so on all no longer exist per claim 2).

VERDICT: PASS
