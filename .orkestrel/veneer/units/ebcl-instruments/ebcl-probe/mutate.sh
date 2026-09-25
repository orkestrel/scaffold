#!/usr/bin/env bash
# Applies one named mutation to the source, rebuilds the styles, runs the named test files with the
# verbose and JSON reporters, restores the source from a backup inside this worktree, checks the
# restore by digest, by cmp, and by git diff --stat -- src, and rebuilds.
# Usage: tmp/units/ebcl-probe/mutate.sh <mutation> <test file>...
# Log: tmp/units/logs/ebcl-mutation-<mutation>.log.txt; JSON report beside it.
set -u
cd /home/user/veneer-ebcl
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
name=$1
shift
log=tmp/units/logs/ebcl-mutation-$name.log.txt
json=tmp/units/logs/ebcl-mutation-$name.json
case $name in
	close) file=src/styles/components/_close.scss; nth=1 ;;
	navbar) file=src/styles/components/_navbar.scss; nth=1 ;;
	accordion) file=src/styles/components/_accordion.scss; nth=1 ;;
	dropdown) file=src/styles/components/_dropdown.scss; nth=1 ;;
	nav) file=src/styles/components/_nav.scss; nth=1 ;;
	list-group) file=src/styles/components/_list-group.scss; nth=1 ;;
	pagination) file=src/styles/components/_pagination.scss; nth=1 ;;
	carousel-controls) file=src/styles/components/_carousel.scss; nth=1 ;;
	carousel-indicators) file=src/styles/components/_carousel.scss; nth=2 ;;
	minifier) file=src/styles/_mixins.scss; nth=0 ;;
	*) echo "unknown mutation $name"; exit 2 ;;
esac
{
	echo "# mutation $name on $file"
	before=$(sha256sum "$file" | cut -d' ' -f1)
	cp "$file" "tmp/units/ebcl-probe/$name.orig"
	python3 - "$file" "$nth" <<'PY'
import sys
path, nth = sys.argv[1], int(sys.argv[2])
text = open(path).read()
if nth == 0:
	old = '\ttransition: revert;\n'
	assert text.count(old) == 1, 'plant site not unique'
	text = text.replace(old, '\ttransition: revert;\n\ttransition-delay: 1s;\n')
else:
	line = '\t\t@include button-reboot;\n'
	parts = text.split(line)
	assert len(parts) > nth, 'include not found'
	text = line.join(parts[:nth]) + parts[nth] if len(parts) == nth + 1 else line.join(parts[:nth]) + '' + line.join(parts[nth:])
open(path, 'w').write(text)
PY
	echo "## applied diff"
	diff "tmp/units/ebcl-probe/$name.orig" "$file"
	echo "## build"
	npm run build:src:styles > /dev/null 2>&1
	echo "build exit=$?"
	if [ "$name" = minifier ]; then
		echo "## compiled transition declarations in the resets"
		grep -o 'transition:revert[^;}]*' dist/src/styles/index.css | sort | uniq -c
	fi
	echo "## run"
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose --reporter=json --outputFile.json="$json" "$@" 2>&1 | grep -v externalized
	echo "run exit=${PIPESTATUS[0]}"
	cp "tmp/units/ebcl-probe/$name.orig" "$file"
	after=$(sha256sum "$file" | cut -d' ' -f1)
	echo "## restore: before $before after $after $([ "$before" = "$after" ] && echo IDENTICAL || echo CHANGED)"
	cmp "tmp/units/ebcl-probe/$name.orig" "$file" && echo "cmp: restored file equals its backup"
	echo "git diff --stat -- src: [$(git diff --stat -- src)]"
	rm "tmp/units/ebcl-probe/$name.orig"
	npm run build:src:styles > /dev/null 2>&1
	echo "rebuild exit=$?"
} > "$log" 2>&1
tail -3 "$log"
