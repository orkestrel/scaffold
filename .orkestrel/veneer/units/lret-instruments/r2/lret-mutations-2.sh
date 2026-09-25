#!/usr/bin/env bash
# Runs each round-2 mutation and plant that tmp/units/r2/lret-mutation.py tables, one at a time:
# applies it, runs the paired cases with vitest's full verbose output, restores every edited file
# from its backup, and checks the restore byte for byte. Each run logs to
# tmp/units/r2/lret-mutation-<name>.log.txt with the command first, the load, the applied diff, the
# full output, the exit status, and the restoring `git diff --stat`. An optional argument list runs
# only the named entries. A plant on src/styles rebuilds the styles before its run and after its
# restore, so the next run reads the restored cascade.
. /home/user/veneer-lret/tmp/units/r2/env.sh
set -u
names=("$@")
if [ ${#names[@]} -eq 0 ]; then
	mapfile -t names < <(python3 tmp/units/r2/lret-mutation.py list | cut -f1)
fi
for name in "${names[@]}"; do
	row=$(python3 tmp/units/r2/lret-mutation.py list | awk -F'\t' -v n="$name" '$1 == n')
	project=$(printf '%s' "$row" | cut -f2)
	pattern=$(printf '%s' "$row" | cut -f3)
	build=$(printf '%s' "$row" | cut -f4)
	files=$(printf '%s' "$row" | cut -f5)
	file=tests/setupServer.test.ts
	[ "$project" = conformance ] && file=tests/conformance.test.ts
	log="tmp/units/r2/lret-mutation-$name.log.txt"
	command="npx vitest run --config vite.config.ts --no-cache --project $project $file -t \"$pattern\" --reporter=verbose"
	{
		echo "command: $command"
		echo "mutation=$name files=$files"
		echo "load $(cat /proc/loadavg)"
	} > "$log"
	if ! python3 tmp/units/r2/lret-mutation.py apply "$name" >> "$log" 2>&1; then
		echo "apply failed" >> "$log"
		echo "$name apply-failed"
		continue
	fi
	git diff -- $files >> "$log"
	if [ "$build" = build ]; then
		npm run build:src:styles > /dev/null 2>&1
		echo "build:src:styles exit=$?" >> "$log"
	fi
	npx vitest run --config vite.config.ts --no-cache --project "$project" "$file" -t "$pattern" --reporter=verbose >> "$log" 2>&1
	echo "exit=$?" >> "$log"
	python3 tmp/units/r2/lret-mutation.py restore "$name"
	for path in $files; do
		if cmp -s "tmp/units/r2/backup-${path//\//_}" "$path"; then
			echo "restored $path byte-identical" >> "$log"
		else
			echo "restore FAILED for $path" >> "$log"
		fi
	done
	if [ "$build" = build ]; then
		npm run build:src:styles > /dev/null 2>&1
		echo "rebuild after restore exit=$?" >> "$log"
	fi
	echo '--- git diff --stat after restore' >> "$log"
	git diff --stat -- $files >> "$log"
	echo "$name $(grep -c 'AssertionError' "$log") assertion-errors $(grep '^exit=' "$log")"
done
