#!/usr/bin/env bash
# Round 2 gates for LEDGER-ADDITIONS: re-runs the table writer against the final guide and diffs its
# formatted output with the guide table, then runs each acceptance gate into its own log.
set -u
cd /home/user/veneer-lad
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
gate() {
	local name=$1; shift
	{ echo "load=$(cat /proc/loadavg)"; "$@"; echo "exit=$?"; } > "tmp/units/lad-2-$name.log.txt" 2>&1
}
mkdir -p tmp/probe
cp tmp/units/lad-2-table-writer.test.ts tmp/probe/lad-2-table-writer.test.ts
gate table-writer npm run test:probe -- tmp/probe/lad-2-table-writer.test.ts
rm -r tmp/probe
cp tmp/units/lad-2-table.md tmp/units/lad-2-table-formatted.md
./node_modules/.bin/oxfmt --config .oxfmtrc.json tmp/units/lad-2-table-formatted.md > /dev/null
python3 - <<'PY'
g = open('/home/user/veneer-lad/guides/veneer.md').read().split('\n')
a, b = g.index('### Additions'), g.index('### Outside the ledger')
open('/home/user/veneer-lad/tmp/units/lad-2-guide-table.md', 'w').write('\n'.join(l for l in g[a:b] if l.startswith('|')) + '\n')
PY
gate table-diff diff tmp/units/lad-2-guide-table.md tmp/units/lad-2-table-formatted.md
gate oxfmt-owned ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check guides/veneer.md tests/setupServer.ts tests/setupServer.test.ts tests/conformance.test.ts
gate check npm run check
gate lint-check npm run lint:check
gate setup npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts
gate test-conformance npm run test:conformance
gate test-guides npm run test:guides
gate test-policy npm run test:policy
gate format-check npm run format:check
