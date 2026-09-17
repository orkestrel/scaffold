# Gate report — scaffold checkout, 2026-09-16

## Gate 1: `npm run format:check`
PASS (exit 0). "All matched files use the correct format." across 224 files.

## Gate 2: `npm run lint:check`
PASS (exit 0). `oxlint --config .oxlintrc.json --deny-warnings .` produced no findings.

## Gate 3: `npm run check`
PASS (exit 0). `tsc --noEmit` on the root project plus `check:src:core`, `check:src:server`,
`check:src:bin` all completed with no diagnostics.

## Gate 4: `npm run build`
PASS (exit 0). `build:src:core`, `build:src:server`, `build:src:bin`, `build:host`, and
`build:inventory` all completed. `build:host` staged 172 files into `dist/host`;
`build:inventory` staged 172 entries into `host.json`.

Expected stderr, not a failure: API Extractor's compiler-version notices —
"Analysis will use the bundled TypeScript version 5.9.3" and "*** The target project appears to
use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API
Extractor." These are informational notices from `api-extractor`, printed on every build regardless
of outcome, and the build exit code stayed 0.

## Gate 5: `npm test`
PASS (exit 0). Per-project counts:

| Project        | Test files  | Tests                        |
| -------------- | ----------- | ----------------------------- |
| `src:core`     | 9 passed    | 422 passed                    |
| `src:server`   | 5 passed    | 466 passed, 7 skipped (473)   |
| `src:bin`      | 3 passed    | 257 passed                    |
| `policy`       | 1 passed    | 102 passed                    |
| `config`       | 1 passed    | 172 passed, 1 skipped (173)   |
| `setup`        | 3 passed    | 118 passed, 3 skipped (121)   |
| `guides`       | 1 passed    | 23 passed                     |

Expected stderr, not a failure: `tests/src/core/templates.test.ts` deliberately loads a malformed
`vite.config.ts` fixture to prove config-load validation. Its two lines —
"[MIXED_EXPORTS]" warning and "failed to load config from
...tmp\scaffold-e2-peers-RdQqJo\malformed\vite.config.ts" — are the test's own assertion target
(a config load it expects to fail), not a suite failure. `config.test.ts` also prints the same
API Extractor compiler-version notices as Gate 4, for the same reason.

## Gate 6: `git status --short`
Modified: `.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md`,
`.agents/skills/enterprise-bootstrap/references/color-modes.md`,
`.agents/skills/enterprise-bootstrap/references/components.md`,
`.agents/skills/orkestrel-prove-journey/SKILL.md`,
`.agents/skills/orkestrel-prove-journey/references/layer.md`,
`.agents/skills/orkestrel-prove-journey/references/statechart.md`,
`.agents/skills/orkestrel-prove-journey/references/styles.md`, `host.json`.
Untracked: `.orkestrel/campaign/k1-brief.md`, `.orkestrel/campaign/k1-report.md`,
`.orkestrel/campaign/k2-brief.md`, `.orkestrel/campaign/skill-survey-verified-plan.md`,
`.orkestrel/scaffold/post-landing-audit.log.txt`. This matches the dispatch's description of a
tree dirty by design (staged skill edits plus a regenerated `host.json`); nothing here was cleaned.

## Gate 7: `git diff --stat`
```
 .../references/bootstrap-reference.md              | 42 ++++++++++++++++++----
 .../enterprise-bootstrap/references/color-modes.md |  5 +--
 .../enterprise-bootstrap/references/components.md  |  2 +-
 .agents/skills/orkestrel-prove-journey/SKILL.md    | 23 +++++++-----
 .../orkestrel-prove-journey/references/layer.md    | 31 ++++++++--------
 .../references/statechart.md                       |  7 ++--
 .../orkestrel-prove-journey/references/styles.md   |  6 +++-
 host.json                                          | 16 ++++-----
 8 files changed, 89 insertions(+), 43 deletions(-)
```

## Gate 8: `git diff --check`
PASS (exit 0). No whitespace errors reported.

## `host.json` after build: expected, not drift
`git diff --stat host.json` reports 16 changed lines (8 insertions, 8 deletions). Since
`.agents/skills/**` vendors into `dist/host`, and `host.json` records one digest line per staged
entry, this is 8 entry digests moving to match the 7 edited skill files (one skill directory,
`orkestrel-prove-journey`, touched 4 files under it, which can move more than one entry's digest
depending on how entries are keyed). Per the dispatch, this is the documented vendoring behavior,
not drift, and is not treated as a gate failure.

## Overall verdict
GREEN. Every gate passed by exit code: format:check, lint:check, check, build, and test all
exited 0, and `git diff --check` found no whitespace errors.

## Anomalies
None observed. No flakes, no cache weirdness. One pre-existing terrain note: at session start,
`node_modules/.orkestrel-lock.sha256` did not match the current `package-lock.json` digest
(computed `0732daef7c4d8252ceca15c7dbdb2439cdcf297c45ffbd36c52155231f06142f`, marker empty). This
verifier ran no install and made no marker changes, per the read-only gate-runner mandate; all five
gates still passed against the existing `node_modules`, so the mismatch had no observed effect on
this run.

GATES: GREEN
