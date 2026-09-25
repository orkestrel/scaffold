# ER-MECH audit — claims

Subject: ER-MECH round 1 in `/home/user/veneer-erm` (branch `unit/erm`, uncommitted over Veneer `873f715`), briefed by
`er-mech-brief.md` under `/home/user/scaffold/.orkestrel/veneer/e-receipts-design-verdict.md`, written by `opus` on
Opus 5.5, and reported in `er-mech-report.md`. The unit stopped on one criterion: `--mode release` never reaches the
test file, a defect the Orchestrator reproduced in Veneer and in scaffold and sent to its own design round
(`release-mode-design-brief.md`); that criterion is not a claim here. Evidence: `erm.diff`, `erm-status.txt`, and the
logs and instruments under `erm-instruments/`. All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A unit
report's prose is not a claim subject. A plant counts as a kill only when the failing case's message names an
assertion failure or the reader's own refusal message. Rule every claim.

1. **Types and readers.** `Runtime`, `Receipt`, and `SupportedHost` in `tests/setupServer.ts` carry the fields the
   design verdict names (with `revision` on `Receipt`), every property readonly and absence as `undefined`;
   `readSupportedHosts` and `readReceipts` parse the guide's `### Supported hosts` and `### Receipts` tables and throw
   on a malformed or missing cell, naming the row; `readRuntime` reads the build from `browser.version()`, the npm
   version from `npm_config_user_agent`, and throws when that variable is absent.
2. **Reader proofs.** The planted three-part build, malformed date, `Result` outside `Pass` and `Fail`, and missing
   cell each fail with the reader's refusal message, and each restore is byte-identical
   (`erm-instruments/logs/erm-plant-{build,date,result,cell}.log.txt`).
3. **Gates.** `tests/guides.test.ts` asserts each gate the verdict lists (every receipt names a supported host; a host
   with no owner has a passing receipt; a host with a passing receipt names no owner; Node and npm meet the
   `package.json` floors, refusing a floor not in the `>=x.y.z` form; every command names a `package.json` script; no
   row repeats), and each planted control fails its own gate with an assertion failure
   (`erm-plant-{stale,channel,floor,script,repeat,unowned,host}.log.txt`).
4. **Live runtime.** The live `readRuntime` case agrees with an independent reading of the Node version, the platform,
   and the build, and the `runtime-node` and `runtime-build` plants each kill it with an assertion failure.
5. **Release-host case.** In `tests/distribution.test.ts`, the release-host case launches through `resolveBrowser`,
   refuses a remote browser, reads `readRuntime`, fails under `RELEASE` naming every value a receipt row needs, and
   skips with the same values otherwise; the `release` plant (`RELEASE = true`) fails it with that message.
6. **The guide.** `## Hosts` sits after `## Compatibility` and before `## Tests`; `### Supported hosts` holds the
   verdict's hosts, each owned; `### Receipts` holds a header and no row; no sentence in the section claims a receipt
   that does not exist or a behaviour no proof reads.
7. **Reuse and law.** The readers reuse `compareVersions` and `VERSION_PATTERN` from `@orkestrel/scaffold` rather than
   copying them; every new export appears in the export inventory in `tests/setupServer.test.ts`; the diff adds no
   `any`, prohibited assertion, non-null assertion, suppression, nested function declaration, or hidden helper; every
   added case title states what the case proves.
8. **Scope.** Every changed path is owned in the brief; the status and the diff name the same files.
