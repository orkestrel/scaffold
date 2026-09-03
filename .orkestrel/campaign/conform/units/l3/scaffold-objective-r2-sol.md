## Per-claim verdicts

### Claim 1 — CONFIRMED
The disposition table names every brief row at `tmp/units/conform/conform-scaffold-report.md:10-24`. The `ReadAllowance` exemption supports `scaffold-obj-4` at `src/server/types.ts:347-357`. Sweeps for `isBrowserVuePath` under `tests/**` and `readonly id: string` under `src/**` returned no matches, supporting the fleet noops.

### Claim 2 — REFUTED
The scaffold-subj-7 repair remains inaccurate. `README.md:10-13` says every target carries the vendored set, and `guides/scaffold.md:16-19` repeats that claim. In fact, `HOST_PATHS` is a candidate set whose selected subset excludes a workspace’s own guide at `src/core/helpers.ts:486-501`, as tested at `tests/src/core/helpers.test.ts:367-377` and correctly documented at `guides/scaffold.md:1195-1199`.

The member descriptions also collapse distinct policy files. `HOST_PATHS` contains the policy register, policy proof, and policy plugin at `src/core/constants.ts:138-142`. `README.md:11` calls the register and proof “policy proofs”; `guides/scaffold.md:16-17` omits the proof from its description.

Smallest complete fix: say each target carries the paths it selects, and name the policy register, proof, and plugin separately in every vendored-set description.

### Claim 3 — CONFIRMED
The word-boundary sweep `\b(extractFenceImports|findMissingSymbols)\b` and case-insensitive inflection sweep `\b(extractFenceImport(?:s|ed|ing)?|findMissingSymbol(?:s|ed|ing)?)\b` returned no matches across `src/**`, `tests/**`, `guides/scaffold.md`, `guides/README.md`, and `README.md`. Current uses are `fenceImports` and `missingSymbols` at `tests/guides.test.ts:6-11,102-112,188`.

### Claim 4 — CONFIRMED
The restored scaffold-subj-1 sweep for `upstream reader emits|reader emits \`release\`|\`mirror\`, \`error\`|Errors are emitted immediately` found only the corrected sentence at `guides/scaffold.md:1513`.

The broader old-form sweep found permitted TSDoc voice at `src/core/helpers.ts:172,251` and `src/server/helpers.ts:834,878`, plus unrelated behavior prose and test names. The failing-first records name commands and measured red/green results at `tmp/units/conform/conform-scaffold-report.md:88-156`. Their defect tests appear at `tests/src/core/factories.test.ts:30-91`, `tests/src/bin/helpers.test.ts:537`, `tests/src/bin/CLI.test.ts:427`, `tests/src/server/WriteTransaction.test.ts:206-227`, `tests/src/server/helpers.test.ts:1582`, and `tests/distribution.test.ts:305`.

### Claim 5 — CONFIRMED
No public scaffold export changed. The dependency adoption uses the installed names at `tests/guides.test.ts:6-11,102-112,188`. A sweep for `AGENTS\s*§` over the touched files returned no matches, and a sweep for `@src/` in `guides/scaffold.md` returned no matches.

### Claim 6 — CONFIRMED
The report states that no published symbol was renamed or removed at `tmp/units/conform/conform-scaffold-report.md:273-274`. It identifies the moved vendored surface and the required target re-pin and `repair` action at `tmp/units/conform/conform-scaffold-report.md:275-283`.

### Claim 7 — CONFIRMED
The unit status is recorded at `/home/user/work/evidence/conform-scaffold.status:11-24`. Every production path is Owned under `tmp/units/conform/conform-scaffold-brief.md:33-37`, subject to the standing amendments for `host.json` and `tests/guides.test.ts`. No off-limits path, `package-lock.json`, or `node_modules` path appears. The old-name sweeps found no compatibility alias or shim.

### Claim 8 — CONFIRMED on skip control; gate reading NOT-EVIDENCED
The changed conditional skips use the host capability probe at `tests/src/server/WriteTransaction.test.ts:203-227` and `tests/src/server/helpers.test.ts:1578-1582`; they replace existing platform predicates without adding skip behavior. Added-line sweeps found no `.only`, `.todo`, retry configuration, or inflated timeout. The independent landing gates are NOT-EVIDENCED in this read-only lane.

### Claim 9 — CONFIRMED
Added-line sweeps for `TODO|FIXME|XXX|debugger|console\.(log|debug)` and suppression directives returned no production matches. The existing `console.log` text at `src/core/compilers.ts:283` is part of a generated copy script, not entered debug residue. The report’s disposition table matches the production hunks and noops.

## Findings outside the claims

O1 — Source documentation defect. `src/core/constants.ts:114-123` says every target holds the vendored files, then says a plan carries only the selected subset. `src/core/helpers.ts:486-501` establishes the subset behavior. Correct the universal sentence to describe selected paths. Owner: scaffold core documentation.

## Referrals to the Orchestrator

R1 — Did the landing run `format:check`, `lint:check`, `check`, `build`, and `test` on the final tree with exit 0?

R2 — Does the claim-2 fix round own the related TSDoc correction at `src/core/constants.ts:114-123`, or does another scaffold unit own it?

FAIL 2