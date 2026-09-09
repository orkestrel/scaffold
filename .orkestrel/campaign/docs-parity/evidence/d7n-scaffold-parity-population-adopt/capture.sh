#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$SCAFFOLD"
git diff -- tests/guides.test.ts tests/src/core/compilers.test.ts tests/setupServer.ts tests/src/core/templates.test.ts PROPOSAL.md > tmp/pass/scaffold-parity-population-adopt/product.diff.txt
git diff --stat -- tests/guides.test.ts tests/src/core/compilers.test.ts tests/setupServer.ts tests/src/core/templates.test.ts PROPOSAL.md > tmp/pass/scaffold-parity-population-adopt/product.diffstat.txt
git status --short > tmp/pass/scaffold-parity-population-adopt/status.txt
git diff --check -- tests/guides.test.ts tests/src/core/compilers.test.ts tests/setupServer.ts tests/src/core/templates.test.ts PROPOSAL.md > tmp/pass/scaffold-parity-population-adopt/diff-check.log.txt
