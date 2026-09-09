# Align the compiler host-path fixture

Act as native builder on Terra. Perform this exact bounded update directly;
spawn nothing. You are not alone in the fleet. The other scaffold writer is frozen.
Own only C:/Users/mikes/WebstormProjects/scaffold/tests/src/core/Compiler.test.ts
and this unit's tmp report. Preserve every other dirty or staged path. No installs,
Git mutations, source changes, package copies, worktrees, or publication.

Read AGENTS.md, .agents/orchestration.md, applicable tests, TypeScript, names,
portability, writing and quality rules, orkestrel-harden-package with its
centralization reference, guides/README.md and the host-ownership portion of
guides/scaffold.md. Ruling 35 assigns the scripts directory to scaffold. Read
d7n-scripts-ownership-fix-brief.md and its landing in the campaign for that decision.

Root's whole scaffold test command failed on the stale host artifact path fixture.
Root reran Compiler.test.ts alone and reproduced the exact failure, terminal
bf189d exit 1; raw output is tmp/pass/d7n-scaffold-compiler-root-red/test.log.txt.
The actual plan carries the scripts directory; the fixture still names its shell
members individually. This is the accepted ownership change, not a new behavior.

In the expected host-origin path array inside the test named
'emits every selected group through its correct origin', replace the entries
scripts/deps.sh, scripts/cursor.sh, scripts/codex.sh, and scripts/ollama.sh with
the entry scripts. Leave the sorted exact-array assertion and other paths intact.
Do not change the implementation or derive the expected value from HOST_PATHS.

Use apply_patch and forward-slash paths. Run the same focused command as root:

```text
node node_modules/vitest/vitest.mjs run tests/src/core/Compiler.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core
```

Run scoped lint/format checks for the changed test. Put a multistep invocation in a
saved script sourcing scaffold/tmp/pass/pass-env.sh and invoke the explicit Git Bash
executable. Retain raw output. Root owns the full ordered rerun and final independent
review. Stop if the exact requested array change does not settle this fixture;
report the actual result without broadening into another fix.

Return tmp/units/d7n-scaffold-compiler-host-fixture-report.md with the exact patch,
focused command/exit/log and scoped conformance readings. Never state prose counts.
