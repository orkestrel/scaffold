# Verdict: the vendored-set self-hosting change (commit 83f47be)

Reviewer lane on Opus 5 (writer: GPT-5.6 Sol). Read-only audit; the lane's Write-less allowlist meant
the verdict returned in-message, recorded here by the Orchestrator verbatim in substance.

## Per-claim verdicts

| # | Verdict | Evidence |
|---|---------|----------|
| C1 | BROKEN | `tests/src/server/helpers.test.ts:148` names the subject "every vendored code file"; lines 153 and 155 restrict the population to `.ts`, `.js`, and `.json`. `HOST_PATHS` vendors four shell scripts that are executable code (`EXECUTABLE_PATHS`, `constants.ts:182-187`) plus `.codex/config.toml`; none is in the population, and `.mts`, `.cts`, `.mjs`, `.cjs`, `.vue` are excluded for any future vendored file. No comment states the covered set. The missing-path skip at line 151 is not a hole: `stageHost` refuses a missing `HOST_PATHS` entry (`src/server/helpers.ts:1155-1171`). |
| C2 | BROKEN on the membership half; the emptiness guard holds | Line 158 fails on a fully empty population. But the population has two branches — the directory glob (line 153) and the file filter (line 155) — and the only anchor names a file-branch member. The directory branch matched zero files, so it contributed nothing and nothing would report it if it stopped working — the exact state `.claude/rules/tests.md` names: "A glob spanning two locations passes a size check while one of them matches nothing." |
| C3 | BROKEN | Line 162 matched `@orkestrel/…` only between a single or double quote. A template-literal specifier evaded it; string concatenation evaded it. The reachable-today spellings (side-effect, dynamic, `require`, type-only, `export * from`) all quote the specifier. The matcher also over-matched: any quoted mention in a comment, data table, or JSON value tripped it, and `.mcp.json` plus `.claude/settings.json` are command registries in the population. |
| C4 | CONFIRMED | `tests/setupPolicy.ts:70-83`. Attacks that failed: absolute POSIX, `..` in every position, backslash escapes folded by `normalizePolicyPath`, UNC, percent-encoded dot-dot (never decoded), empty string, Windows drive form (`join` treats `C:` as an ordinary segment). Symlink escape unreachable: fresh `mkdtempSync` root, no link operation exposed. Contract stricter than the replaced one; no call site regressed. |
| C5 | CONFIRMED | `workspace.md:76-78` states the law once; `tests.md:149-151` states only the exception and points at `workspace.md`. The parenthetical file list is a second copy of a membership fact `HOST_PATHS` owns, load-bearing inside a target where `HOST_PATHS` is absent — recorded as a finding, not a break. |
| C6 | CONFIRMED | Both additions are directives with an observable trigger before the instruction; rationale subordinate and judgment-bearing; no discovery history. Nothing to quote as failing. |
| C7 | CONFIRMED | No `describe`/`it`/`expect` in `tests/setupPolicy.ts`; both new declarations exported; the returned-literal members are the sanctioned factory shape. |
| C8 | BROKEN | The commit changed two files the unit's brief put off-limits: `src/core/templates.ts` and `vite.config.ts` (the `testTimeout` half). Sol's report lists neither, so those edits were the Orchestrator's own, arriving in the same commit with no brief or auditor of record — the case `.agents/orchestration.md` § Acceptance laws names. Content ruled in C9; ownership referred to the Orchestrator. Rest of C8 held: no other `src/**` moved; artifact and digest pins untouched. |
| C9 | BROKEN on the number; both sub-checks passed | The two files agreed and the byte-identity test guards the agreement. But `30_000` equalled the sum of the two `15_000` `spawnSync` caps inside the project's slowest test (`tests/config.test.ts:596,601`), so Vitest's timeout fires at or before the children's own and reports a bare timeout instead of the child diagnostic — the same diagnostic-free red the commit set out to remove. Fix: raise both to `45_000`. |
| C10 | BROKEN | The duplicated behaviour was licensed; the duplicated name was not. `createScratch` and `ScratchInterface` resolved to two different contracts inside `tests/` at once (the package's in `setupServer.ts:65` and `templates.test.ts:2,9`; the vendored one in `setupPolicy.ts:54,66`), and a call copied between two files was a silent contract change. Fix: rename to `createPolicyScratch` / `PolicyScratchInterface`. On the rest: the other nine eligible vendored files want no `@orkestrel` import; the law's cost is this one duplicate and is worth paying. |

## Disposition

All five BROKEN claims were closed by the fix round recorded in `vendored-import-fix.md` /
`vendored-import-fix.report.md` (commit da01121), which adopted the auditor's prescriptions verbatim
and closed on mutation probes per the falsify law: the guard reddens for a quoted import and for a
backtick import; the containment case reddens with its throw disabled. C8's ownership finding is
resolved by the record itself: the `testTimeout` half is documented in commit 83f47be's message, its
content was ruled in C9, and its correction landed with the fix round.

VERDICT: FAIL (five findings, all closed in da01121)
