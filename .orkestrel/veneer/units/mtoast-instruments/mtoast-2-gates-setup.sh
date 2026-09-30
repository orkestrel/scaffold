#!/usr/bin/env bash
# Successor of tmp/units/mtoast-2-gates.sh: re-runs format and setup after the setup case title edit,
# into the same -2 log names.
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
	} > "tmp/units/mtoast-$name-2.log.txt" 2>&1
	echo "$name $(grep '^exit=' "tmp/units/mtoast-$name-2.log.txt")"
}
gate format ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check src/styles/components/_toast.scss tests/src/styles/components/toast.test.ts tests/src/styles/components/fade.test.ts tests/setupStyles.ts tests/setupStyles.test.ts guides/veneer.md
gate setup npm run test:setup
