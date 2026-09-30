#!/usr/bin/env bash
# Successor of tmp/units/mtoast-gates.sh: re-runs the gates that read guides/veneer.md after the
# final Reason-cell edit (format, conformance, guides, policy), into the same log names.
cd /home/user/veneer-mtoast || exit 1
. tmp/units/mtoast-env.sh
gate() {
	local name=$1
	shift
	{
		echo "\$ $*"
		"$@"
		echo "exit=$?"
		cat /proc/loadavg
	} > "tmp/units/mtoast-$name.log.txt" 2>&1
	echo "$name $(grep '^exit=' "tmp/units/mtoast-$name.log.txt")"
}
gate format ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check src/styles/components/_toast.scss tests/src/styles/components/toast.test.ts guides/veneer.md

gate conformance npm run test:conformance
gate guides npm run test:guides
gate policy npm run test:policy

