# U3-policy gate report 2 (verifier, native Sonnet, through workflow wf_cfc2c7c3-7f3, over the round-9 tree, 2026-09-20)

Orchestrator's reading: the red is `tests/config.test.ts:2535`, a case that asserts no new `orkestrel-declarations-*` entry appears in the operating system's temporary directory during a declaration roll; the U6 closing verifier was building the Test checkout at the same time through the same scaffold code path, so the shared directory gained entries the case did not create. A proof reading a global namespace is a proof-isolation defect outside this unit (scaffold task); the deciding re-run runs alone after every other chain exits. The staged `A .orkestrel/…/u3-policy-report-9.md` that vanished mid-run was the Orchestrator's own records commit landing beside the verifier, not a write by it.

## Gate Report — U3-policy-gate (scaffold, round-9 policy change, dirty tree)

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain \| grep -v '^??'` | 0 | `A  .orkestrel/veneer/units/u3-policy-report-9.md`, ` M .claude/rules/styles.md`, ` M guides/scaffold.md`, ` M host.json`, ` M tests/policy.test.ts`, ` M tests/setupPolicy.ts` |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 4018ms on 228 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | (no warnings emitted) |
| 4 | `npm run check` | 0 | all four `tsc --noEmit` sub-runs (`check`, `check:src:core`, `check:src:server`, `check:src:bin`) completed with no diagnostics printed |
| 5 | `npm run build` | 0 | `build-host: staged 175 file(s) into dist/host` / `build-inventory: staged 175 file(s) into host.json` |
| 6 | `npm test` | **1** | see excerpt below |
| 7 | `git status --porcelain \| grep -v '^??'` + `git diff --stat -- host.json` | 0 | see verbatim readings below |
| 8 | `node -e "..."` (version/engines) | 0 | `0.0.75 {"node":">=22.18.0"}` |

### Step 6 failure excerpt — `npm test`

The chain (`test:src:core && test:src:server && test:src:bin && test:policy && test:config && test:setup && test:guides`) ran `test:src:core` (426 passed), `test:src:server` (469 passed, 7 skipped), `test:src:bin` (267 passed), `test:policy` (123 passed), then failed inside `test:config`:

```
FAIL  |config| tests/config.test.ts > configuration helpers > rolls one face into a single declaration and rewrites its core specifier
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ tests/config.test.ts:2535:55
    2533|      entry.startsWith('orkestrel-declarations-'),
    2534|     )
    2535|     expect(after.every((entry) => before.has(entry))).toBe(true)
       |                                                       ^
    2536|
    2537|     // The face ships exactly one declaration: the emit's scratch tree…

 Test Files  1 failed (1)
      Tests  1 failed | 172 passed | 1 skipped (174)
```

Suspected owning file: `C:\Users\mikes\WebstormProjects\scaffold\tests\config.test.ts:2535` (case: "rolls one face into a single declaration and rewrites its core specifier"), asserting no new `orkestrel-declarations-*` scratch entries survive the roll.

Because `test:config` failed, `test:setup` and `test:guides` never ran in this chain (`&&` stops the sequence).

### Step 7 — status readings verbatim

`git status --porcelain | grep -v '^??'` (after the full run):
```
 M .claude/rules/styles.md
 M guides/scaffold.md
 M host.json
 M tests/policy.test.ts
 M tests/setupPolicy.ts
```

`git diff --stat -- host.json` (matches the pre-build reading):
```
 host.json | 10 +++++-----
 1 file changed, 5 insertions(+), 5 deletions(-)
```

## Overall verdict

RED. First failure: `npm test` (step 6), exit 1, in `tests/config.test.ts:2535` under `test:config`.

## Anomalies

- A prior `npm test` invocation piped directly through `tail` (not through a file, exit code not captured correctly) appeared to complete the entire chain including `test:guides` (23 passed) with no visible failure. The properly captured re-run (redirected to a file, exit code read directly from `npm test` itself) failed deterministically at `test:config`. This is a run-to-run inconsistency in the test chain's outcome — treat step 6's RED reading as authoritative (correct exit-code capture) but flag the discrepancy as unresolved flakiness or ordering sensitivity in `test:config`.
- The initially staged addition `A  .orkestrel/veneer/units/u3-policy-report-9.md`, present in the step-1 `git status --porcelain` reading, was absent from every later `git status --porcelain` reading (step 7 and the intermediate re-check), with no write command issued by this verifier. The git index changed state during the run (most likely during the test chain, which exercises `scaffold` git-touching code paths).