# Capture the frozen Guide API draft

Act as the native Terra builder. Author only
tmp/pass/capture-guide-api-hold.sh and return its syntax receipt. Spawn nothing.
Read AGENTS.md, .agents/orchestration.md, portability and writing rules. Preserve
all product and index state. No installs, tests, Git mutation, pack or execution.

Write a Bash script sourcing the existing canonical pass-env.sh. It creates only
the absent tmp/pass/d7n-guide-api-hold evidence directory. Capture canonical Guide
HEAD, branch, complete git diff HEAD, complete git status --short and untracked
paths, using git -C. Copy only the exact draft paths into evidence/source while
preserving their relative paths: src/server/types.ts, src/server/index.ts,
src/server/helpers.ts, src/server/parsers.ts, src/server/GuideCommand.ts,
tests/setupServer.ts and tests/src/server/GuideCommand.test.ts. Refuse a missing
source. Capture Guide package.json and guides/README.md there as metadata/spec
evidence. Record SHA256 for each copied source and compare it to the canonical
file after copying. Capture the same Git diff/status after and compare to before.
Do not read .env files, credentials or untracked files outside the named list.
This is an evidence slice, never an executable package copy or worktree.

Before reading the diff, inspect its changed path inventory only. Refuse any path
outside guides/guide.md, src/core/Parity.ts, src/core/constants.ts,
src/core/factories.ts, src/core/helpers.ts, src/core/index.ts, src/core/shapers.ts,
src/core/types.ts, src/core/validators.ts, tests/guides.test.ts, tests/setup.ts,
tests/src/core/Parity.test.ts, tests/src/core/factories.test.ts,
tests/src/core/helpers.test.ts, tests/src/core/shapers.test.ts,
tests/src/core/validators.test.ts, tsconfig.json and vite.config.ts. Root read
the complete actual status at b1bf8c; this is the tracked changed population.
Unknown future changes must refuse before their contents are read. There is no
secret path in this admitted population. Untracked copying stays the exact list
already named. Do not treat a hypothetical future secret as evidence of a secret
in the frozen draft.

Validate Bash syntax through the explicit Git Bash executable. Root runs the
saved capture before dispatching independent API-compliance review.
