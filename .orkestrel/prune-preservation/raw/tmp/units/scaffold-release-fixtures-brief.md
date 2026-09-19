# Align the prepared release expectations

Act as builder on Terra. Read canonical AGENTS.md, .agents/orchestration.md, rules tests/typescript/portability/writing, orkestrel-publish and its required references, and guides/README.md. Perform this fully specified script-authoring unit directly; spawn nothing. You are not alone: preserve all other work.

Own only `tmp/release/align-scaffold-0.0.75.ps1` in canonical Scaffold. Author but do not execute the script. The Orchestrator runs release mutations after reviewing your instrument.

Target exactly `C:/Users/mikes/WebstormProjects/scaffold/tmp/release/scaffold-0.0.75`, HEAD 178c7cbbe4f125e4d6ca33e54918f12f9339f5e9, package version0.0.75, test dependency ^0.0.18. Verify these guards. Refuse tracked status outside package.json and package-lock.json before writing. Refuse if a replacement target is missing or appears more than once in each named file. Validate every input before any write.

Use UTF-8 without BOM, preserve each file's existing newlines, and replace only these exact dependency lines:

- In `tests/src/core/fixtures/app-only-toolchain.txt`, `tests/src/core/fixtures/source-manifest.txt`, `tests/src/core/fixtures/setup-false-manifest.txt`, change `"@orkestrel/scaffold": "^0.0.74"` to `"@orkestrel/scaffold": "^0.0.75"`, and `"@orkestrel/test": "^0.0.17"` to `"@orkestrel/test": "^0.0.18"`.
- In `tests/src/bin/CLI.test.ts`, replace only `"@orkestrel/test": "^0.0.17"` by `"@orkestrel/test": "^0.0.18"` in the audit-guidance expected message. Do not change @orkestrel/contract0.0.17.

The independent prepublishOnly run passed format/lint/check/build and reddened core compiler fixture assertions at449,508,521 and CLI.test.ts1225 on these exact received ranges. Server, policy, config, setup, guides, and release distribution checks passed. This unit changes release expectations only, no runtime code.

Do not install, execute npm, commit, push, publish, format any tree, or write target source yourself. Validate your PowerShell syntax with the parser and return the script path and guards. The Orchestrator will run it, inspect git diff, then send the release candidate for independent gates. Stop and report any mismatch rather than widening the replacements.
