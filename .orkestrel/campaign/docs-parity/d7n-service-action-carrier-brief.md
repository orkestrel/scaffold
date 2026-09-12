# Carry the bounded Scaffold service gates

## Role and objective

Act as the launch-named native builder. Execute directly and spawn nothing.
Create tmp/pass/scaffold-service-action.sh as an exact successor of
tmp/pass/scaffold-upper-action.sh. Preserve the original file. This unit owns
only the successor and tmp/units/d7n-service-action-carrier-report.md.

Read AGENTS.md, orchestration, applicable workspace, portability, writing and
quality rules; orkestrel-publish with wave; guides/README.md and the Scaffold
target-reading/service ownership contract. Read the predecessor in full.

## Exact change

Keep the predecessor arguments, manifest identity check, canonical target,
fresh-label refusal, timeout validation, stdout/stderr/exit capture and complete
before/after state captures unchanged. Add a header naming the successor, its
evidence directory and the added action selectors. Add these selectors to its
existing case without changing the existing actions:

| Action | Command array |
| --- | --- |
| regression | npm run test:src:bin -- tests/src/bin/CLI.test.ts -t "preserves the existing provisioner through target-reading audit and overwrite" |
| core | npm run test:src:core -- tests/src/core/factories.test.ts tests/src/core/validators.test.ts tests/src/core/parsers.test.ts tests/src/core/compilers.test.ts |
| server | npm run test:src:server -- tests/src/server/Materializer.test.ts |
| bin | npm run test:src:bin -- tests/src/bin/CLI.test.ts |
| build | npm run build |

Use real Bash arrays. Do not add eval, arbitrary command execution, environment
probing, retries, uploads or auth. Preserve the pass-env source and forward-slash
paths. The caller supplies the cap; root owns every execution and judgment.
The regression test is not planted yet, so do not execute an action.

## Scope and host

Work in canonical C:/Users/mikes/WebstormProjects/scaffold. Windows outer shell
is PowerShell; Git Bash is C:/Users/mikes/scoop/apps/git/current/bin/bash.exe.
Keep each shell call a plain command; no inline programs or command chains.
All product files, manifests, lockfiles, host inventory, campaign records and
other scripts are off-limits. You are not alone in the workspace; preserve
others' edits. Do not install, build, format the tree, run gates, commit, push,
read secrets or publish. Read-only inspection and bash syntax validation of
your own script are allowed.

## Acceptance and deviation

The successor must differ only by its identifying header and named selectors.
Run bash -n on that script, and report its actual exit. Return owned paths,
the exact predecessor delta, syntax result and any deviation. No source claim
or release acceptance follows from syntax. Unknowns: none. Stop and report any
conflict with the exact-change boundary; do not expand the instrument. No prose
counts or model names in the report. Keep the returned report immutable.
