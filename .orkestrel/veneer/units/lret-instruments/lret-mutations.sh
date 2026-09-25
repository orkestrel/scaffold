#!/usr/bin/env bash
# Applies each mutation to tests/setupServer.ts, runs the resolver proofs, and restores the file
# byte for byte from a backup under tmp/units.
set -u
cd /home/user/veneer-lret
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cp tests/setupServer.ts tmp/units/setupServer.ts.backup
run() {
	local name="$1" old="$2" new="$3"
	python3 - "$old" "$new" <<'PY'
import sys
p='tests/setupServer.ts'
s=open(p).read()
old,new=sys.argv[1],sys.argv[2]
assert s.count(old)==1, old
open(p,'w').write(s.replace(old,new,1))
PY
	{
		echo "mutation=$name"
		cat /proc/loadavg
		npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts -t "ValueResolver|names each departure member" --reporter=verbose 2>&1 | grep -E "^ +(✓|×)|Tests "
		echo "exit=${PIPESTATUS[0]}"
	} > "tmp/units/lret-mutation-$name.log.txt"
	cp tmp/units/setupServer.ts.backup tests/setupServer.ts
	cmp tmp/units/setupServer.ts.backup tests/setupServer.ts && echo "restored=byte-identical" >> "tmp/units/lret-mutation-$name.log.txt"
}
run ignore-resolution "	if (resolution.recorded !== resolution.emitted) return 'retuned'
" ""
run text-compare "	if (resolution.recorded !== resolution.emitted) return 'retuned'" "	if (recorded !== emitted) return 'retuned'"
run route-undecided "	if (resolution === undefined) return undefined" "	if (resolution === undefined) return 'restated'"
run canonical-self "			emitted: [value],
		})),
	)
	for (const [index, [token, selector, condition, stated, value]] of pending.entries()) {" "			emitted: [stated],
		})),
	)
	for (const [index, [token, selector, condition, stated, value]] of pending.entries()) {"
run witness-retuned "			.filter((row) => row.departure !== 'retuned' && row.departure !== 'dropped')" "			.filter((row) => row.departure !== 'dropped')"
run colors-raw "export function normalizeResolvedColors(value: string): string {
	return value.replaceAll(" "export function normalizeResolvedColors(value: string): string {
	return value
	return value.replaceAll("
git diff --stat tests/setupServer.ts | tail -1
