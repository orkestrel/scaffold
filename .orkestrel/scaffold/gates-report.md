# Gate evidence — the campaign repositories (2026-09-02)

Independent `verifier` runs on Sonnet, one per repository, reading each gate bare, per
`gates-brief.md`. Terrain's row lands after unit U6 returns.

| Repository | Commit | format:check | lint:check | check | build | test | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| test | `ce75175` | 0 | 0 | 0 | 0 | 0 — 455 passed / 9 skipped; 111; 46; 24; 38 passed / 1 skipped | GREEN |
| form | `2f07735` | 0 | 0 | 0 | 0 | 0 — 13; 48 | GREEN |
| scaffold | `0b29939` | 0 | 0 | 0 | 0 | 1 — 3 snapshot mismatches in `tests/src/core/compilers.test.ts`, 370 passed | RED (test) |
| scaffold | `969fe8a` | 0 | 0 | 0 | 0 | 0 — 373; 425 passed / 6 skipped; 209; 111; 46; 17 | GREEN |

## The scaffold red, and its correction

The three failing cases compare the blueprint compiler's emitted toolchain against snapshot
fixtures; the compiler reads `@orkestrel/probe` from this manifest's `devDependencies`
(`src/core/constants.ts:462`). The manifest pin moved to `^0.0.11` in `4246327` (the release-wave
commit of 2026-08-28) after the fixtures were last written at `^0.0.10` in `82704b5` (the 0.0.59
release commit), so the red predates this campaign and surfaced here only because the campaign
synced the lockfile and installed. The Orchestrator corrected the drift in the three fixtures
(commit "Move the toolchain fixtures to the probe pin the manifest declares"); `npm run
test:src:core` then reads 373 passed. The scaffold verifier re-runs the whole chain on the
corrected commit; that reading replaces the row above when it lands.

## The second scaffold red, and its correction

With the snapshot drift corrected, the chain reached `src:server` and stopped on `listCanonPaths` → "lists a canon path a target really holds and not one it redirects to": the case links a file, `@orkestrel/test`'s `link` needs the symbolic-link privilege for a file on Windows and falls back to a junction only for a directory, so the host refused `EPERM`. The Orchestrator gated the case on `supportsFileLinks()` from `@orkestrel/test/server`, the cited mechanism `.claude/rules/tests.md` asks for; `src:server` reads 425 passed and 6 skipped. Pre-existing, host-specific, outside the campaign. The verifier re-runs the chain a second time.
