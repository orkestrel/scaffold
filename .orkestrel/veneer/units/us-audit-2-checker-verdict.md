# Checker verdict — UTIL-SPACER (`us`) audit round 2, claims 1, 4, 6, 7 (`checker` on Sonnet)

## Claim 1 — Delta and scope: CONFIRMED.

- `us-2-status.txt:1-10` lists exactly the ten owned files and no other entry.
- `us-2.diff` touches exactly those files (headers at `us-2.diff:1,103,136,230,264,319,367,464,573,736`).
- `us-shared-2.patch:1-482` touches exactly `app/browser/constants.ts`, `tests/setup.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.ts`, `guides/veneer.md`, and `ROADMAP.md`.
- No `tests/setup.css` or fixture-CSS entry appears in the status, consistent with the report's restoration claim (`b-utilities-us-report-2.md:178`).

## Claim 4 — Built cascade unchanged: UNRESOLVED.

The only evidence is the writer's report (`b-utilities-us-report-2.md:75-93`: the digest `df76aab7…ed765` matching twice, "baseline rules missing or changed in build: []", the `gap` and `column-gap` additions with zero problems); no retained log or Orchestrator-side run covers the digest. The mutation that would falsify the claim is a digest mismatch or a nonzero `compare.mjs` diff. Run needed and not seen: `bash tmp/units/us-instruments/baseline.sh` and `npm run build:src` inside `/home/user/veneer-us`.

## Claim 6 — Service proofs and the shared patch: UNRESOLVED.

Confirmed by direct textual comparison: the `profiles.test.ts` exact equality (`us-2.diff:391`); the guide sentence "The gap steps `gap-0` to `gap-5` are shipped names off the line:" (`us-shared-2.patch:233`); the § Styles mixin-contract paragraph and the separate `### Gap utilities` section (`:195-208, 266-299`); the reworded partial-importance sentence (`:223-241`); the § Files row (`:217-218`); the `#### column-gap` and `#### gap` rows (`:320, 404`); the compatibility rows in the ruled wording (`:452-453`); the § Showcase and § Tests references (`:461-463, 470-471`); the `ROADMAP.md` CL8b cell with the `<landing hash>` placeholder (`:482`); `column-gap` and `gap` in `tests/conformance.test.ts` and `tests/setupServer.test.ts` (`:69,77,166,174`); the patch applying to `87ff1d0` (`us-2-measurements.txt:10-11`). Resting on the report alone: controls C and D red (`b-utilities-us-report-2.md:145-146`) and round 1's controls A and B still red. Run needed and not seen: `bash tmp/units/us-instruments/mutate-service-2.sh` in `/home/user/veneer-us`.

## Claim 7 — Law and report: BROKEN.

- The report states counts: `b-utilities-us-report-2.md:8` "One ancillary choice departs from the ruling's wording." and `:9` "One pre-existing defect sits outside scope and is recorded for the Orchestrator (§ Observations)."
- The report's `## Deviations` (`:174-179`) names the specimen wrap, the ROADMAP cell nouns, the off-limits `tests/setup.css` control, and the report-only files; the § Tailwind rewording appears only under `## Changes by finding` (`:27`), not bounded as a deviation.
- Token nouns, forbidden syntax, and banned terms, sampled across `us-shared-2.patch:195-299` and the TypeScript hunks of `us-2.diff`: no violation.
- The report records each criterion's command and result line (`:61-71`) and retains the baseline step (`:75`).

Findings outside the claims (the counts listed under claim 7): `b-utilities-us-report-2.md:8`, `:9`; `:197` quotes the diffstat with its command, permitted.

VERDICT: FAIL 4, 6, 7; outside the claims: report states counts at `b-utilities-us-report-2.md:8-9` (carried under claim 7)
