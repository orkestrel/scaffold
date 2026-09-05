<!-- workflow wf_742cd5c9-418, agent a61b48fdb9742b733, captured from journal.jsonl -->

## Per-claim verdicts

**Claim 1 — REFUTED.** The round-3 brief (`/home/user/scaffold/tmp/units/ts7-probe-fix-2-brief.md`) edit 8 prescribes replacing
```
const served: unknown = bridged.value
if (isRecord(served) && isFunction(served.createProgram)) return bridged.value
```
with
```
const served = bridged.value
if (isRecord(served) && isFunction(served.createProgram)) return served
```
The site (`/home/user/fleet/probe/src/server/helpers.ts:445-446`) reads:
```
const served: unknown = bridged.value
if (isRecord(served) && isFunction(served.createProgram)) return bridged.value
```
That is the pre-edit text, not the prescribed text — the successor unit `ts7-probe-fix-3` (brief `/home/user/scaffold/tmp/units/ts7-probe-fix-3-brief.md`) explicitly reverted edit 8 back to the `unknown`-alias shape because the prescribed shape reddened `npm run check` (`ts7-probe-fix-3-report.md:5`: before exit 1 with `TS2322`, after exit 0). So not every one of the nine edits "reads at its site as written there" — edit 8 does not. The remaining eight edits (1-7, 9) were each verified at their cited sites and read as prescribed:
- Edit 1: `src/core/types.ts:231` — confirmed verbatim.
- Edit 2: `guides/probe.md:210` (Surface row) — confirmed verbatim.
- Edit 3: `src/server/Probe.ts` comment — "...is the case the `^7.0.0` term admits." confirmed.
- Edit 4: `tests/src/core/errors.test.ts:176-190` — single `writeWorkspaceFixture(bridgeless, { version: '7.0.2' })` call, comment kept, import sorted (`../../setup.js` < `../../setupServer.js`); confirmed, no inline writes remain.
- Edit 5: `src/core/types.ts:248,250` — both doc lines confirmed.
- Edit 6: `guides/probe.md:212` (`loadWorkspaceModule` row) — confirmed, "...where one was raised." present.
- Edit 7: `guides/probe.md:662-665` — bullet text confirmed, rewrapped lines each under 100 columns (measured ~91-99 chars).
- Edit 9: `it.runIf(DIRECTORY_LINKS)` gating confirmed at all four sites (see claim 5).
No writing-rule violation (banned substitution-table terms, count statements, unspaced em dash) found in any of the amended sentences. Because the claim requires all nine, and edit 8 fails, the claim as a whole is refuted.

**Claim 5 — CONFIRMED.** Grep across the tree for `bridged:\s*true` returns exactly four sites, each inside an `it.runIf(DIRECTORY_LINKS)` block:
- `tests/src/server/stages/TypeStage.test.ts:267` (`it.runIf`) / `:272` (`bridged: true`).
- `tests/src/server/helpers.test.ts:650` (`it.runIf`) / `:659` and `:664` (two `bridged: true` calls gated by the same one `it`, matching the brief's "gate that one `it` once" instruction).
- `tests/src/server/Probe.test.ts:605` (`it.runIf`) / `:614` (`bridged: true`).
- `tests/setupServer.test.ts:49` (`it.runIf`) / `:69` (`bridged: true`).
`DIRECTORY_LINKS` is imported in each of the four files at the point of use (`tests/src/server/Probe.test.ts:31`, `tests/src/server/helpers.test.ts:38`, `tests/src/server/stages/TypeStage.test.ts:10`, `tests/setupServer.test.ts:7`). The `bridged` option's TSDoc (`tests/setupServer.ts:191-195`) reads "A row passing it runs under `DIRECTORY_LINKS`, because the link is a directory link." Every other `it` row in these files that calls `writeWorkspaceFixture` without `bridged: true` (e.g. `helpers.test.ts` "refuses a compiler carrying no in-process API...", "refuses a bridge that resolves...", "refuses a workspace that installs no typescript at all"; `Probe.test.ts` "refuses a workspace whose typescript carries no in-process compiler API", "names an unsupported TypeScript installation...") is a plain `it`, ungated.

**Claim 7 — CONFIRMED**, with a scope caveat. `git status --short` (`/home/user/scaffold/tmp/units/ts7-probe-fix-2.status.txt`) and the diff's 13 `diff --git` headers list only: `guides/probe.md`, `package-lock.json`, `package.json`, `src/core/types.ts`, `src/server/Probe.ts`, `src/server/helpers.ts`, `src/server/stages/TypeStage.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/src/core/errors.test.ts`, `tests/src/server/Probe.test.ts`, `tests/src/server/helpers.test.ts`, `tests/src/server/stages/TypeStage.test.ts`. `tests/setupPolicy.ts`, `tests/distribution.test.ts`, and `tests/guides.test.ts` do not appear at all — zero changes, trivially compliant. `package.json`'s diff is confined to adding `@typescript/typescript6` as a dependency and peer dependency and widening the `typescript` peer range; `package-lock.json`'s diff is confined to the matching new `@typescript/typescript6`/`@typescript/old` entries plus the removal of `libc` rows across the platform-specific `oxlint`/`@oxc-*` packages — both consistent with "the landing units and the Orchestrator's lockfile pass account for" per the audit brief's own "Already established" statement that the missing `libc` rows are the accepted, recorded campaign measurement. `src/core/types.ts` changes are confined to the `Toolchain` doc block; `src/server/helpers.ts` changes outside edit 8's line range match the successor unit's scope (`src/server/helpers.ts:431-444` only, per its brief and report). `src/server/stages/TypeStage.ts` and the non-comment portion of `src/server/Probe.ts` (the `collectRangeMajors` call site) fall outside both round-3 units' owned sets, but neither the round-3 builder's report nor the successor's report claims to have touched them, and the audit brief's "Already established" section records "the scope" as already confirmed in round 2 — I did not have the landing-unit briefs in evidence to re-derive that ownership independently, and treated it as settled per the "do not re-rule" instruction rather than re-litigating it here.

## Findings outside the claims

1. `/home/user/scaffold/tmp/units/ts7-probe-fix-2-brief.md:38` (edit 8's own rationale) is falsified by the successor's own measurement (`ts7-probe-fix-3-report.md:5,61`): the brief asserts the bridge branch typechecks "exactly as `loaded` is at `:431-435`," but the `||`-guarded workspace branch narrows differently than the bare `&&`-guarded bridge branch, so the two sites are not the same shape. This is why claim 1 fails, and it means the round-3 brief itself carried a wrong technical claim that a later unit had to correct — worth carrying forward as a lesson for future briefs asserting shape parity by analogy rather than by independent compile check.

VERDICT: FAIL 1; outside the claims: none
