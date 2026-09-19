#!/usr/bin/env bash
# S5 chain: the claim-7 mutation closure first (it mutates src/core/templates.ts and restores it),
# then the S5 gate reading over the restored tree with the build regenerating host.json.
set -u
cd C:/Users/mikes/WebstormProjects/scaffold || exit 1
bash tmp/audit/s-fix-c7-mutations.sh > tmp/audit/s-fix-c7-mutations-summary.txt 2>&1
echo "mutations_EXIT=$?"
git diff --stat -- src/core/templates.ts | wc -l
bash tmp/verify/s5-gates.sh > tmp/verify/s5-gates-summary.txt 2>&1
echo "gates_EXIT=$?"
