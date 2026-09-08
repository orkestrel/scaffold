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

## 5. Comment-scoped substitution-term sweep (`grep -rn ... | grep -E '^\S+:\s*(//|/?\*)'`)

PASS (exit 1, no matching lines)

No output — no substitution-table hit sits inside a `//` or `/*` comment in `src`, `configs`, `tests`, or `scripts`.

## 6. `npm run format:check`

PASS (exit 0)

```
All matched files use the correct format.
Finished in 9334ms on 222 files using 4 threads.
```

## 7. `npm run lint:check`

PASS (exit 0)

No warnings or errors reported.

## 8. `npm run check`

PASS (exit 0)

`tsc --noEmit` for the root project plus `check:src:core`, `check:src:server`, and `check:src:bin` all completed with no diagnostics printed.

## 9. `npm run build`

PASS (exit 0)

All build steps (`core`, `server`, `bin`, `build:host`, `build:inventory`) completed; the tail shows `build-inventory: staged 121 file(s) into host.json`.

## 10. `npm run build:inventory && git diff --stat -- host.json`

FAIL (`build:inventory` exit 0, but the stated acceptance condition — an empty diff — fails)

```
> @orkestrel/scaffold@0.0.63 build:inventory
> node -e "..." 
build-inventory: staged 121 file(s) into host.json

 host.json | 26 +++++++++++++-------------
 1 file changed, 13 insertions(+), 13 deletions(-)
```

`host.json` is not aligned with the current vendored checkout bytes: 13 digests differ (for example `AGENTS.md`, `.agents/orchestration.md`, three `enterprise-bootstrap` reference files). The brief names a non-empty diff here as RED regardless of the command's own exit code.

Owning files: `host.json` (stale digests), and the tracked source files whose content changed since the committed inventory was last regenerated — `git status --short` shows uncommitted edits to `.agents/orchestration.md`, `AGENTS.md`, `ROADMAP.md`, several `.agents/skills/*` and `.claude/rules/*` files, `configs/helpers.ts`, `configs/policy.ts`, `src/server/Materializer.ts`, and three `tests/*` files.

## 11. `npm test`

PASS (exit 0)

```
main suite:  Test Files  3 passed (3)   Tests  245 passed (245)
test:policy: Test Files  1 passed (1)   Tests  77 passed (77)
test:config: Test Files  1 passed (1)   Tests  111 passed | 1 skipped (112)
test:setup:  Test Files  2 passed (2)   Tests  74 passed (74)
test:guides: Test Files  1 passed (1)   Tests  17 passed (17)
```

## 12. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`

PASS (exit 0)

```
Test Files  1 passed (1)
     Tests  5 passed (5)
Duration  84.61s
```

## 13. `git status --short`

Reported for context (not a pass/fail gate):

```
 M .agents/orchestration.md
 M .agents/skills/enterprise-bootstrap/references/bootstrap-reference.md
 M .agents/skills/enterprise-bootstrap/references/frontend-design.md
 M .agents/skills/enterprise-bootstrap/references/utilities.md
 M .agents/skills/orkestrel-debrief/references/field-testing.md
 M .agents/skills/orkestrel-falsify/references/reconcile.md
 M .claude/rules/architecture.md
 M .claude/rules/quality.md
 M AGENTS.md
 M ROADMAP.md
 M configs/helpers.ts
 M configs/policy.ts
 M host.json
 M src/server/Materializer.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/src/core/templates.test.ts
?? .orkestrel/campaign/docs-parity/d1-audit-checker.md
?? .orkestrel/campaign/docs-parity/d1-audit-objective.md
?? .orkestrel/campaign/docs-parity/d1-audit-subjective.md
?? .orkestrel/campaign/docs-parity/d1-verify-report.md
```

## Overall verdict

RED. Gate 10 (`npm run build:inventory && git diff --stat -- host.json`) fails its own acceptance condition: the diff is non-empty, so `host.json` does not reflect the current vendored checkout bytes. Every other gate passes.

## Anomalies

- None observed. Every command produced a clean single-shot exit code; no Vitest row needed a re-run.

GATES: RED npm run build:inventory && git diff --stat -- host.json
