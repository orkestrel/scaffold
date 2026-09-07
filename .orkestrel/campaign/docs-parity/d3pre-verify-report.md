# Gate report — D3-pre voice-converge (scaffold)

## 1. `node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs /home/user/scaffold src app configs tests scripts | tail -2`

PASS (exit 0)

```
FILES 58 BLOCKS 662 FLAGGED 0 NODOC 35
first words:
```

Matches expected `FLAGGED 0 NODOC 35`.

## 2. `node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs .orkestrel/campaign/docs-parity/instruments/p10 . | tail -2`

PASS (exit 0)

```
FILES 1 BLOCKS 4 FLAGGED 3 NODOC 0
first words: The=1 Create=1 Returns=1
```

Matches expected `FLAGGED 3` control.

## 3. `node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold | tail -3`

PASS (exit 0)

```
FILES 80 HITS 0
```

Matches expected `HITS 0`.

## 4. `node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold .orkestrel/campaign/docs-parity/instruments/p9/control.md | grep -c 'control.md:3'`

PASS (exit 0)

```
3
```

Matches expected `3`.

## 5. Comment-scoped substitution-term sweep

PASS (exit 1, no matching lines)

No output — no substitution-table hit sits inside a `//` or `/*` comment in `src`, `configs`, `tests`, or `scripts`.

## 6. `npm run format:check`

PASS (exit 0) — `All matched files use the correct format.`

## 7. `npm run lint:check`

PASS (exit 0) — no warnings or errors reported.

## 8. `npm run check`

PASS (exit 0) — `tsc --noEmit` for root, `check:src:core`, `check:src:server`, `check:src:bin` all completed with no diagnostics.

## 9. `npm run build`

PASS (exit 0) — all build steps completed; tail shows `build-inventory: staged 121 file(s) into host.json`.

## 10. `npm run build:inventory && git diff --stat -- host.json`

FAIL — `build:inventory` itself exits 0, but the diff is non-empty:

```
 host.json | 26 +++++++++++++-------------
 1 file changed, 13 insertions(+), 13 deletions(-)
```

13 digests differ (for example `AGENTS.md`, `.agents/orchestration.md`, three `enterprise-bootstrap` reference files). The brief names a non-empty diff here as RED. Owning files: `/home/user/scaffold/host.json` (stale digests) and the uncommitted-but-modified tracked source it should reflect — `/home/user/scaffold/.agents/orchestration.md`, `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/ROADMAP.md`, several `.agents/skills/*` and `.claude/rules/*` files, `/home/user/scaffold/configs/helpers.ts`, `/home/user/scaffold/configs/policy.ts`, `/home/user/scaffold/src/server/Materializer.ts`, and three `tests/*` files.

## 11. `npm test`

PASS (exit 0) — main suite 245/245, `test:policy` 77/77, `test:config` 111 passed | 1 skipped (112), `test:setup` 74/74, `test:guides` 17/17.

## 12. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`

PASS (exit 0) — 5/5 tests, duration 84.61s.

## 13. `git status --short`

Reported for context: 18 modified tracked files (`.agents/orchestration.md`, `AGENTS.md`, `ROADMAP.md`, several skill/rule references, `configs/helpers.ts`, `configs/policy.ts`, `host.json`, `src/server/Materializer.ts`, three `tests/*` files) and 4 untracked files under `.orkestrel/campaign/docs-parity/`.

## Overall verdict

RED. Gate 10 fails its own acceptance condition: `host.json` does not reflect the current vendored checkout bytes (non-empty diff). Every other gate passes.

## Anomalies

- None observed. Every command produced a clean single-shot exit code; no Vitest row needed a re-run.

Report written to `/home/user/scaffold/tmp/units/docs-d3pre-verify-report.md`.

GATES: RED npm run build:inventory && git diff --stat -- host.json