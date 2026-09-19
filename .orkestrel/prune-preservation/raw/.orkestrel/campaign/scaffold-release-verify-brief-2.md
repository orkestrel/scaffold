# Verify the release after aligning version expectations

Act as verifier on Terra. Read previous `scaffold-release-verify-brief.md` and its authority. Keep its exact checkout, commands, read-only limits, report shape and ownership. Spawn nothing; do not fix any source or install anything.

The Orchestrator ran the builder-authored `tmp/release/align-scaffold-0.0.75.ps1` and reviewed its diff. It changes only exact scaffold/test range literals in `tests/src/core/fixtures/app-only-toolchain.txt`, `source-manifest.txt`, `setup-false-manifest.txt`, and CLI.test.ts's missing-dependency guidance. Package version0.0.75 and test range^0.0.18 were already prepared. Runtime source is unchanged.

Run `npm.cmd run prepublishOnly` again as the authoritative chain. Capture its complete output under this release candidate's tmp, preserving exit-code truth. Stop on failure; report exact failure excerpts. If it passes, report final git status and identify any generated tracked changes. Run `git diff --check` too. No additional suite repetition is needed after this chain passes.

Return commands, exit codes, reached stages, the exact log path and GATES terminal line. The earlier red already binds the stale expectations; this successor must read the green or the new failure.
