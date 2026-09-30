#!/usr/bin/env bash
# Successor of tmp/units/mtoast-2-gates-setup.sh: re-runs lint and check after the setup case title
# edit, into the same -2 log names.
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
gate lint npm run lint:check
gate check npm run check
