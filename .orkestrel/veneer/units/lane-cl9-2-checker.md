<!-- workflow wf_1ed677d8-adb, agent a49aac3247b307daa, checker on sonnet, retained 2026-09-22 -->

## Verdict

**Claim 8 `[mechanical]` — Scope, law, and gates**

| Sub-check | Verdict | Evidence |
|---|---|---|
| Status identical to round 1, path for path | CONFIRMED | `tmp/audit/cl9-status.txt:1-15` and `tmp/audit/cl9-status-2.txt:1-15` are byte-identical listings (twelve paths, same modified/untracked markers). |
| `tests/setupConformance.ts` absent from both diffs | CONFIRMED | Not present as a diffed path in either `cl9-diff.patch` or `cl9-diff-2.patch`, and not listed in either status file. |
| `src/styles/_tokens.scss` absent from both diffs | CONFIRMED | Same — no entry in either status file or diff header set. |
| `src/core/constants.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, vendored files absent | CONFIRMED | None of these paths appear in either status listing (`cl9-status.txt`/`cl9-status-2.txt`), which is the exhaustive changed-path set for both rounds. |
| Added lines carry no `any`, no assertion outside `as const`, no non-null assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no default export, no skipped case, no case named for a control | CONFIRMED for the hunks read | `tests/setupStyles.ts:2249-2295` (round-2 guard) and `src/styles/components/_table.scss:1-142`, `app/browser/sections/TableSection.ts:1-20` contain no such tokens; `TableSection` uses `export class` (named, non-default) and no field visibility keywords. |
| Diff-to-diff delta confined to named files | CONFIRMED for the files checked | `guides/veneer.md`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`, `src/styles/index.scss`, and the three application-barrel files (`app/browser/Showcase.ts`, `app/browser/constants.ts`, `app/browser/index.ts`) show byte-identical hunks in `cl9-diff.patch` and `cl9-diff-2.patch` at matching line ranges. `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `src/styles/components/_table.scss` differ between rounds (the guard fix, the new regression case, and the `tokens.$aliased` role-list swap replacing a local `$roles:` declaration — `src/styles/components/_table.scss:906` round 1 vs `@use '../tokens';` round 2). |
| Every gate exits 0 (managed Chromium, Edge, independent verifier) | UNDECIDABLE — not in this lane's slice | No gate-run evidence (exit codes, logs) was supplied to this checker. A verifier lane runs the authoritative gate chain in this same round, blind to this lane; that run is not covered here. |

## Probe readings

- **Status identity**: confirmed, path for path, no addition or removal (see table).
- **Diff-to-diff delta**: `guides/veneer.md`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`, `src/styles/index.scss`, and the three application-barrel files are byte-identical across rounds. The changed files are `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `src/styles/components/_table.scss`.
- **The two guards**: `tests/setupStyles.ts:2288` (round 2) reads `!(previous?.char === ':' && !previous.literal) && complex.startsWith(':nth-child(even)', step.index)`, and the neighbouring legacy branch at `tests/setupStyles.ts:2299` reads `!(previous?.char === ':' && !previous.literal) && legacy`. Both now test the same expression. No other branch in `normalizeComplexSelector` (`tests/setupStyles.ts:2251-2302`) tests a preceding character without the `.literal` flag.
- **The regression case**: `tests/setupStyles.test.ts:411-429` calls `scanCompatibilityPresence` (imported at `tests/setupStyles.test.ts:390`) and `readCompatibility` (imported at `tests/setupStyles.test.ts:387`), the real exports from `setupConformance.js`, not local copies. The `inventory` object at `tests/setupStyles.test.ts:416-422` is constructed inline in the test body, not read from `./fixtures/oracle/inventory.json`.
- **The role loop**: `src/styles/components/_table.scss:948` reads `@each $role in tokens.$aliased`, importing `tokens` at line 852 (`@use '../tokens';`). This checker did not open `src/styles/_tokens.scss` (out of the mechanical claim's scope and not diffed) to enumerate `$aliased`'s members against a second list, so which of "the token module's two role lists" this is, and the other list's members, is UNDECIDABLE from the evidence supplied — that is a claim-5 judgment question outside this mechanical claim.
- **Law sweep over the round's added lines**: no `any`, no assertion outside `as const`, no non-null assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no default export, no skipped case, no case named for a control found in the diffed hunks read.

## Extra findings

None beyond claim 8's sub-items.

**Verdict: accept** — mechanical claim 8 CONFIRMED on every sub-item this lane can evidence; the gate-exit sub-item is UNDECIDABLE pending the independent verifier's reading, which is outside this lane's slice by the brief's own terms.
