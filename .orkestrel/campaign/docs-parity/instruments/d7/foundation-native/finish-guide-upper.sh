#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
expected=${2-}
version=${3-}
baseline=${4-}
label=${5-}
target="$FLEET/$package"
visit="$SCR/$label"

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

capture() {
	local suffix="$1"
	git -C "$target" rev-parse HEAD > "$visit/head-$suffix.txt"
	git -C "$target" branch --show-current > "$visit/branch-$suffix.txt"
	git -C "$target" status --porcelain=v1 --untracked-files=all > "$visit/status-$suffix.txt"
	git -C "$target" diff HEAD --binary > "$visit/diff-$suffix.txt"
	git -C "$target" ls-files --stage > "$visit/index-$suffix.txt"
	sha256sum "$target/package.json" "$target/package-lock.json" > "$visit/manifests-$suffix.sha256"
}

run_action() {
	local action="$1"
	local label="$label-$2"
	local cap="$3"
	local status=0
	if bash "$SCR/upper-layer-action.sh" "$package" "$action" "$label" "$cap" > "$visit/$label.stdout.txt" 2> "$visit/$label.stderr.txt"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$visit/$label.exit.txt"
	printf '%s %s\n' "$action" "$cap" >> "$visit/commands.txt"
	return "$status"
}

run_direct() {
	local name="$1"
	local cap="$2"
	shift 2
	local status=0
	if (cd "$target" && timeout --kill-after=15s "$cap" "$@") > "$visit/$name.stdout.txt" 2> "$visit/$name.stderr.txt"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$visit/$name.exit.txt"
	printf '%q ' "$@" >> "$visit/commands.txt"
	printf '\n' >> "$visit/commands.txt"
	return "$status"
}

case "$package" in
	guide) ;;
	*) fail 'package is outside the upper layer' ;;
esac
test -n "$expected" || fail 'expected source commit is required'
test -d "$target/.git" || fail "canonical package directory is absent: $target"
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'visit evidence label is unsafe'
test ! -e "$visit" || fail "visit evidence exists: $visit"
test "$(git -C "$target" branch --show-current)" = 'claude/orkestrel-npm-audit-deps-14ibta' || fail 'target branch differs from the campaign branch.'
test "$(git -C "$target" rev-parse HEAD)" = "$expected" || fail 'target HEAD differs from the expected source commit.'
test -z "$(git -C "$target" status --porcelain=v1 --untracked-files=all)" || fail 'target tree must be clean before final preparation.'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail 'target manifest name differs from the selected canonical package.'
for suffix in overwrite audit lock ci format prepublish tooling-installed; do
	test ! -e "$SCR/$label-$suffix" || fail "action evidence exists: $label-$suffix"
done
test ! -e "$SCR/packed/$label-pack" || fail "packing evidence exists: $label-pack"

mkdir "$visit"
capture before
installed="$target/node_modules/@orkestrel/scaffold/dist/host/claude/agents/orkestrel.md"
if git -C "$target" diff --no-index --ignore-space-at-eol '--ignore-matching-lines=^|' -- "$installed" .claude/agents/orkestrel.md > "$visit/catalog-agent.diff.txt" 2> "$visit/catalog-agent.stderr.txt"; then
	printf '0\n' > "$visit/catalog-agent.exit.txt"
else
	status=$?
	printf '%s\n' "$status" > "$visit/catalog-agent.exit.txt"
	if [ "$status" -eq 1 ]; then
		fail 'catalog agent body differs from the installed floor; root migration is required.'
	fi
	exit "$status"
fi

status=0
if run_action overwrite overwrite 180s; then
	:
else
	status=$?
	test "$status" -eq 1 || exit "$status"
fi
overwrite="$SCR/$label-overwrite"
test "$(<"$overwrite/action.exit.txt")" = '1' || fail 'offline overwrite did not exit one.'
grep -Fx "The catalog step did not complete: USAGE: 'catalog' does not take --offline." "$overwrite/action.stderr.txt" > /dev/null || fail 'offline overwrite did not report the required catalog note.'
status=0
run_action audit audit 120s
test "$(<"$SCR/$label-audit/action.exit.txt")" = '0' || fail 'offline audit did not exit zero.'
run_direct docs-delete 60s npm pkg delete scripts.docs
test "$(<"$visit/docs-delete.exit.txt")" = '0' || fail 'docs script deletion failed.'
run_direct catalog 180s node node_modules/@orkestrel/scaffold/dist/bin/main.js catalog
test "$(<"$visit/catalog.exit.txt")" = '0' || fail 'catalog failed.'
run_direct guide-mirror 120s node "$SCR/mirror-parity-guide.mjs" "$FLEET/guide/guides/guide.md" "$target"
test "$(<"$visit/guide-mirror.exit.txt")" = '0' || fail 'Guide mirror refresh failed.'
cmp "$target/guides/guide.md" "$FLEET/guide/guides/guide.md"
cmp "$target/guides/scaffold.md" "$SCAFFOLD/guides/scaffold.md"
run_action lock lock 600s
run_action install ci 600s
if bash "$SCR/install-guide-upper-tooling.sh" "$package" "$label-tooling-installed" > "$visit/tooling.stdout.txt" 2> "$visit/tooling.stderr.txt"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$visit/tooling.exit.txt"
test "$status" -eq 0
run_action format format 120s
run_action prepublish prepublish 900s
if bash "$SCR/pack-next-layer-final-verified.sh" "$package" "$label-pack" "$version" "$label-prepublish" "$baseline" > "$visit/pack.stdout.txt" 2> "$visit/pack.stderr.txt"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$visit/pack.exit.txt"
test "$status" -eq 0
capture after
cmp "$visit/head-before.txt" "$visit/head-after.txt"
cmp "$visit/branch-before.txt" "$visit/branch-after.txt"
printf '%s\n' "$visit"
