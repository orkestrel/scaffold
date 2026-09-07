#!/usr/bin/env bash
# U0b d7-guide-headstart successor — supersedes u0-headstart.sh, which stopped before the commit:
# the `tests/setup.ts` fix targeted line 13 (the diagnostic's block-start line) while the text sits
# on line 14. This file fixes the site by pattern, re-runs the gates the edit touches, and commits.
# Log: u0b-headstart.log.txt beside it.
set -u
G=/home/user/fleet/guide
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/u0
cd "$G" || exit 9
fail=0
step() { echo; echo "== $*"; }
gate() { step "$1"; npm run "$1" 2>&1 | tail -${2:-6}; local code=${PIPESTATUS[0]}; echo "EXIT $code"; [ "$code" -eq 0 ] || fail=1; }
step "criterion 3: tests/setup.ts by pattern"
sed -i 's#^ \* Require markdown whose first block is a table\.$# * Requires markdown whose first block is a table.#' tests/setup.ts
sed -n 13,15p tests/setup.ts
git diff -- tests/setup.ts | grep '^[-+]' | grep -v '^[-+][-+]'
gate format:check 3
gate lint:check 8
gate check 3
step "criterion 4 summary"; echo "fail=$fail"
if [ "$fail" -ne 0 ]; then echo "STOP: a gate read red; no commit"; exit 1; fi
step "criterion 6: commit by path"
git add -- package.json .oxlintrc.json configs/helpers.ts configs/policy.ts tests/config.test.ts tests/policy.test.ts tests/setupPolicy.ts tsconfig.json scripts/docs.ts tests/fixtures/broken/missing-example/module/helpers.ts tests/fixtures/good/tests/widget.test.ts tests/setup.ts
git status --short; echo "(status end)"
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F "$SCR/u0-message.txt" && git log -1 --stat --format='%h %s' | head -20
step "status after commit"; git status --short; echo "(status end)"
step "push"; git push -u origin claude/orkestrel-npm-audit-deps-14ibta 2>&1 | tail -3; echo "EXIT ${PIPESTATUS[0]}"
