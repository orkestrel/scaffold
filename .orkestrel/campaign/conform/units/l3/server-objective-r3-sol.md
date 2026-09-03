## Per-claim verdicts

1. **CONFIRMED.** The disposition table covers every named row as `applied` or `noop` at `/home/user/scaffold/tmp/units/conform/conform-server-report.md:20-41`. The status matches the reported touched files.

2. **CONFIRMED.** The applied repairs appear at `src/server/validators.ts:28-30`, `src/server/helpers.ts:106-110`, `src/server/helpers.ts:850-852`, `src/server/Server.ts:391-440`, `src/server/Stream.ts:70-72`, and `src/server/types.ts:720-769`. Sweeps for the removed implementations `new Error('next()…')`, `Array.from(new Uint8Array(digest)`, and `new Headers({ ...SSE_HEADERS` over `src`, `tests`, `guides/server.md`, `guides/README.md`, and `README.md` returned no match.

3. **REFUTED.** Correct sweeps for `\brequestEncoding(?:s|ed|ing)?\b` and `\bresolvePort(?:s|ed|ing)?\b` over `src`, `tests`, `guides/server.md`, `guides/README.md`, and `README.md` returned no match. The writer’s recorded `requestEncoding` pattern uses escaped alternation and no word boundary, while the `item` sweep covers only `src`; see `/home/user/scaffold/tmp/units/conform/conform-server-report.md:102-104`. The required full-path `item` sweep returns permitted senses at `tests/src/server/helpers.test.ts:747`, `tests/config.test.ts:2`, and `guides/server.md:327`. Smallest fix: record valid word-boundary and inflection sweeps over every required path, ruling those prose and protocol hits as permitted.

4. **REFUTED.** The report says documentation rows rely on its sweeps at `/home/user/scaffold/tmp/units/conform/conform-server-report.md:95-99`, but its sweep table at `:100-119` carries no old-form sweep for `server-obj-8`, `server-obj-11`, `server-obj-12`, `server-subj-8`, or `server-subj-10`. Smallest fix: record each missing old-form pattern and the full required path population.

5. **CONFIRMED.** The guide documents `parseEncoding` and `isAddressInfo` at `guides/server.md:119-125`, readonly data at `guides/server.md:155-168`, and exact method tables at `guides/server.md:197-241`. Fence transcriptions appear at `tests/guides.test.ts:189-252`; public guide fences import published specifiers at `guides/server.md:425-449`. The sweep `AGENTS[^\n]*§|§ ?[0-9]+` over the required owned paths returned only permitted RFC 7232 references at `src/server/helpers.ts:826`, `:858`, `:875`, and `tests/src/server/helpers.test.ts:703`.

6. **CONFIRMED.** The report names the `requestEncoding` rename with the consumer edit at `/home/user/scaffold/tmp/units/conform/conform-server-report.md:139-166`, the SSE merge change at `:168-169`, and the double-`next` error-class change at `:171-172`.

7. **CONFIRMED.** Every path in `/home/user/work/evidence/conform-server.status:1-18` is owned. No lockfile, vendored file, configuration, script, dependency field, or `node_modules` path appears. Sweeps for `requestEncoding` and `resolvePort` found no compatibility alias or shim.

8. **CONFIRMED** for the auditable conjunct. The added-line sweep `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` over `/home/user/work/evidence/conform-server.diff` returned only dependency-guide uses of `timeout` at lines 56-58. The independent gate reading is **NOT-EVIDENCED** and belongs to the Orchestrator’s landing run.

9. **CONFIRMED.** The added-line sweep for `TODO|FIXME|console\.|debugger|@ts-(nocheck|ignore|expect-error)|(eslint|oxlint)-disable` over `/home/user/work/evidence/conform-server.diff` returned no match. The report’s dispositions at `/home/user/scaffold/tmp/units/conform/conform-server-report.md:20-41` match the diff.

## Findings outside the claims

None.

## Referrals to the Orchestrator

R1. Does the established `server-obj-1` ruling permit `isAddressInfo({ port: 4000 })` to return `true` while declaring the value an `AddressInfo` with required `address` and `family` members? See `src/server/validators.ts:28-30` and `tests/src/server/validators.test.ts:7-17`.

R2. Does the established `fleet-F2` ruling classify moving `id` from an enumerable own field to a prototype getter as non-breaking for object spread, `Object.keys`, and serialization? See `src/server/Server.ts:83-84`, `:142`, and `:160-162`.

FAIL 3, 4