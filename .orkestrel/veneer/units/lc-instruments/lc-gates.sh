#!/usr/bin/env bash
# lc-gates.sh: runs the unit's gates. The format check over the owned files runs in the worktree;
# every other gate runs in tmp/probe/lc-scratch, the worktree with tmp/units/lc-shared.patch
# applied. Each gate's command, exit, and log land in tmp/units/lc-gate-<n>.log.txt, and the
# summary in tmp/units/lc-gates.log.txt.
set -uo pipefail
root=/home/user/veneer-lc
scratch=$root/tmp/probe/lc-scratch
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
owned="src/styles/_tokens.scss src/styles/_mixins.scss src/styles/_theme.scss src/styles/components/_button.scss src/styles/utilities/_color-bg.scss src/styles/utilities/_link.scss src/styles/components/_validation.scss tests/src/styles/fixtures/mixins.scss tests/src/styles/fixtures/contrast.scss tests/src/styles/mixins.test.ts tests/src/styles/components/button.test.ts tests/src/styles/elements/button.test.ts tests/src/styles/utilities/color-bg.test.ts tests/src/styles/utilities/link.test.ts tests/src/styles/components/validation.test.ts"
shared="tests/setupStyles.ts tests/setupStyles.test.ts guides/veneer.md"
proofs="tests/src/styles/mixins.test.ts tests/src/styles/components/button.test.ts tests/src/styles/elements/button.test.ts tests/src/styles/utilities/color-bg.test.ts tests/src/styles/utilities/link.test.ts tests/src/styles/components/validation.test.ts"
summary=$root/tmp/units/lc-gates.log.txt
: > "$summary"
n=0
gate() {
	local where=$1
	shift
	n=$((n + 1))
	local log=$root/tmp/units/lc-gate-$n.log.txt
	(cd "$where" && echo "# cwd: $where" && echo "# command: $*" && eval "$@") > "$log" 2>&1
	local code=$?
	local line
	line=$(sed 's/\x1b\[[0-9;]*m//g' "$log" | grep -E 'Tests  |Test Files|Found [0-9]+ warning|Finished in|All matched files|error TS|problems|passed|failed' | tail -2 | tr '\n' ' ')
	echo "gate $n | $where | $* | exit $code | $line" >> "$summary"
}
bash "$root/tmp/units/lc-sync.sh" > /dev/null
gate "$root" npx oxfmt --config .oxfmtrc.json --check $owned
gate "$scratch" npx oxfmt --config .oxfmtrc.json --check $owned $shared
gate "$scratch" npm run lint:check
gate "$scratch" npm run check
gate "$scratch" npm run build:src
gate "$scratch" npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot $proofs
gate "$scratch" npm run test:setup
gate "$scratch" npm run test:conformance
gate "$scratch" npm run test:guides
gate "$root" npm run check
cat "$summary"
