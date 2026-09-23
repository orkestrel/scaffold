#!/usr/bin/env bash
# Runs the alert proof on the validation copy tmp/probe/base once per named partial: `control` is the
# shipped partial, and every other name is mutations/<name>.scss from derive.py. Each run rebuilds
# the styles first, writes logs/<name>.log.txt, and prints the exit, the red cases, and the tally.
# `loop-roles` also runs the conformance project into logs/loop-roles.conformance.log.txt. The
# shipped partial is restored and rebuilt at the end.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
root=/home/user/veneer-al
base=$root/tmp/probe/base
here=$root/tmp/units/al-instruments-2
shipped=$root/src/styles/components/_alert.scss
cd "$base"
for name in "$@"; do
	if [ "$name" = control ]; then source=$shipped; else source=$here/mutations/$name.scss; fi
	cp "$source" src/styles/components/_alert.scss
	npm run build:src:styles > "$here/logs/$name.build.log.txt" 2>&1 || echo "$name build failed"
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/alert.test.ts > "$here/logs/$name.log.txt" 2>&1
	echo "== $name exit=$?"
	grep -E "^\s+×" "$here/logs/$name.log.txt" | sed 's/^\s*//'
	grep -E "^\s+(Tests|RUN) " "$here/logs/$name.log.txt"
	if [ "$name" = loop-roles ]; then
		npm run test:conformance > "$here/logs/$name.conformance.log.txt" 2>&1
		echo "== $name conformance exit=$?"
		grep -E "^\s+×|^ FAIL|Tests " "$here/logs/$name.conformance.log.txt"
	fi
done
cp "$shipped" src/styles/components/_alert.scss
npm run build:src:styles > "$here/logs/restore.build.log.txt" 2>&1
echo "restored exit=$?"
