#!/usr/bin/env bash
# Applies one named plant, runs the proof the plant must move, and restores the planted file from a
# backup inside this worktree, checking the restore by digest and by cmp.
# Usage: tmp/units/ebcl-2-plant.sh <include|btn-leak|both-default|entry|r3>
# Log: tmp/units/ebcl-2-plant-<name>.log.txt
set -u
cd /home/user/veneer-ebcl
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
name=$1
log=tmp/units/ebcl-2-plant-$name.log.txt
backup=tmp/units/ebcl-2-plant-$name.orig
styles() {
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose "$@" 2>&1 | grep -v externalized
	echo "run exit=${PIPESTATUS[0]}"
}
setup_browser() {
	npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup:browser tests/setupBrowser.test.ts -t readFormDifferences 2>&1 | grep -v externalized
	echo "run exit=${PIPESTATUS[0]}"
}
setup_node() {
	npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts -t 'button reboot case table' 2>&1 | grep -v externalized
	echo "run exit=${PIPESTATUS[0]}"
}
# Replaces one unique text in a file with another, refusing a site that is absent or repeated.
plant() {
	python3 - "$1" "$2" "$3" <<'PY'
import sys
path, old, new = sys.argv[1], sys.argv[2], sys.argv[3]
text = open(path).read()
assert text.count(old) == 1, f'plant site in {path} occurs {text.count(old)} times'
open(path, 'w').write(text.replace(old, new))
PY
}
restore() {
	cp "$backup" "$file"
	after=$(sha256sum "$file" | cut -d' ' -f1)
	echo "## restore: before $before after $after $([ "$before" = "$after" ] && echo IDENTICAL || echo CHANGED)"
	cmp "$backup" "$file" && echo "cmp: restored file equals its backup"
	rm "$backup"
}
case $name in
	include) file=src/styles/components/_close.scss ;;
	btn-leak) file=src/styles/components/_button.scss ;;
	both-default) file=tests/src/styles/elements/button.test.ts ;;
	entry) file=tests/setupBrowser.ts ;;
	r3) file=tests/setupStyles.ts ;;
	*) echo "unknown plant $name"; exit 2 ;;
esac
{
	echo "# plant $name on $file"
	cat /proc/loadavg
	before=$(sha256sum "$file" | cut -d' ' -f1)
	cp "$file" "$backup"
	case $name in
		include)
			plant "$file" $'\t\t@include button-reboot;\n' ''
			echo "## applied diff"; diff "$backup" "$file"
			npm run build:src:styles > /dev/null 2>&1; echo "build exit=$?"
			echo "## run"; styles tests/src/styles/components/close.test.ts
			restore
			npm run build:src:styles > /dev/null 2>&1; echo "rebuild exit=$?"
			;;
		btn-leak)
			plant "$file" $'@layer components {\n\t.btn {\n' $'@layer components {\n\tbutton.btn {\n\t\topacity: var(--vn-button-opacity);\n\t}\n\n\t.btn {\n'
			echo "## applied diff"; diff "$backup" "$file"
			npm run build:src:styles > /dev/null 2>&1; echo "build exit=$?"
			echo "## run"; styles tests/src/styles/elements/button.test.ts -t 'form on a button'
			restore
			npm run build:src:styles > /dev/null 2>&1; echo "rebuild exit=$?"
			;;
		both-default)
			# Runs A and B apply the rule the brief names; runs C and D add the outline style, because a
			# Chromium 141 outline whose style is none computes its width to 0px, which run B reads.
			site=$'\t\t\tconst { veneer, release } = await readFormDifferences(pair, pair.states, BUTTON_HOLDER_STYLE)\n'
			for rule in 'outline-width: 3px' 'outline-width: 3px; outline-style: solid'; do
				cp "$backup" "$file"
				plant "$file" "$site" $'\t\t\t// both-default plant: the rule rides in the counterpart markup, so it lands in the document and in the release shadow root.\n\t\t\tconst { veneer, release } = await readFormDifferences(\n\t\t\t\t{ ...pair, counterpart: `<style>a.btn:active { '"$rule"$' }</style>${pair.counterpart}` },\n\t\t\t\tpair.states,\n\t\t\t\tBUTTON_HOLDER_STYLE,\n\t\t\t)\n'
				echo "## applied diff, both cascades, rule [$rule]"; diff "$backup" "$file"
				echo "## run, both cascades, rule [$rule]"; styles tests/src/styles/elements/button.test.ts -t 'form on a button'
				cp "$backup" "$file"
				plant "$file" "$site" $'\t\t\t// both-default plant: the rule loads into the document head alone, so the release shadow root never sees it.\n\t\t\tscene.load(\'a.btn:active { '"$rule"$' }\')\n\t\t\tconsole.log(`EBCL2-OUTLINE ${JSON.stringify({ rule: \''"$rule"$'\', width: readStyle(requireValue(scene.mount(\'<a class="btn" href="#harbor" style="'"$rule"$'">Harbor</a>\').querySelector(\'a\'), \'No anchor\'), \'outline-width\') })}`)\n'"$site"
				echo "## applied diff, the document alone, rule [$rule]"; diff "$backup" "$file"
				echo "## run, the document alone, rule [$rule]"; styles --silent=false tests/src/styles/elements/button.test.ts -t 'form on a button'
			done
			restore
			;;
		entry)
			plant "$file" $'\t\t\t\t\telement.blur()\n\t\t\t\t\tif (form === \'button\' && element instanceof HTMLButtonElement) element.disabled = true\n\t\t\t\t\tif (form === \'counterpart\' && pair.paired) {\n\t\t\t\t\t\telement.classList.add(\'disabled\')\n\t\t\t\t\t\telement.setAttribute(\'aria-disabled\', \'true\')\n\t\t\t\t\t}\n' $'\t\t\t\t\telement.blur()\n'
			echo "## applied diff"; diff "$backup" "$file"
			echo "## run, the reader's own proof"; setup_browser
			echo "## run, a reboot proof"; styles tests/src/styles/components/close.test.ts -t 'button reboot'
			restore
			;;
		r3)
			python3 - "$file" <<'PY'
import sys, re
path = sys.argv[1]
text = open(path).read()
start = text.index("\tObject.freeze({\n\t\tname: 'dropdown-item',")
end = text.index("\tObject.freeze({\n\t\tname: 'nav-link',")
open(path, 'w').write(text[:start] + text[end:])
PY
			echo "## applied diff"; diff "$backup" "$file"
			echo "## run"; setup_node
			restore
			;;
	esac
	echo "git diff --stat -- src: [$(git diff --stat -- src)]"
	cat /proc/loadavg
} > "$log" 2>&1
tail -4 "$log"
