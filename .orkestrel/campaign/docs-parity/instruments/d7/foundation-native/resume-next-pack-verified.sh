#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

capture() {
	local suffix="$1"
	git -C "$target" rev-parse HEAD > "$out/head-$suffix.txt"
	git -C "$target" branch --show-current > "$out/branch-$suffix.txt"
	git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-$suffix.txt"
	git -C "$target" diff HEAD --binary > "$out/diff-$suffix.txt"
	git -C "$target" ls-files --stage > "$out/index-$suffix.txt"
	sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-$suffix.sha256"
}

case "$package" in
	ndjson)
		head='1c12979e74cfb80b47238dae8a8495c2ad928982'
		version='0.0.10'
		baseline='0.0.9'
		;;
	tool)
		head='bf895011e6ca9d2dfa2587a9607542fa5729261d'
		version='0.0.14'
		baseline='0.0.13'
		;;
	*) fail 'package must be ndjson or tool' ;;
esac

target="$FLEET/$package"
visit="$SCR/d7n-$package-next-final"
standalone="$SCR/d7n-$package-next-final-alone-prepublish"
out="$SCR/d7n-$package-next-final-alone"
test -d "$target/.git" || fail 'canonical target is absent'
test ! -e "$out" || fail 'recovery evidence exists'
test "$(git -C "$target" rev-parse HEAD)" = "$head" || fail 'source HEAD differs'
test "$(git -C "$target" branch --show-current)" = claude/orkestrel-npm-audit-deps-14ibta || fail 'campaign branch differs'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail 'manifest name differs'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" version)" = "$version" || fail 'manifest version differs'
git -C "$target" diff --cached --quiet || fail 'staged input is refused'
test -z "$(git -C "$target" ls-files --others --exclude-standard)" || fail 'untracked input is refused'
for receipt in audit lock ci format; do
	test "$(<"$visit/d7n-$package-next-final-$receipt.exit.txt")" = 0 || fail "preparation receipt differs: $receipt"
done
for receipt in catalog guide-mirror tooling; do
	test "$(<"$visit/$receipt.exit.txt")" = 0 || fail "preparation receipt differs: $receipt"
done
test "$(<"$visit/d7n-$package-next-final-overwrite.exit.txt")" = 1 || fail 'offline overwrite did not fail as recorded'
grep -Fx "The catalog step did not complete: USAGE: 'catalog' does not take --offline." "$SCR/d7n-$package-next-final-overwrite/action.stderr.txt" > /dev/null || fail 'offline overwrite refusal differs'
test "$(<"$visit/d7n-$package-next-final-prepublish.exit.txt")" = 1 || fail 'original prepublish did not fail as recorded'
test "$(<"$standalone/action.exit.txt")" = 0 || fail 'standalone prepublish did not succeed'
cmp "$standalone/manifests-after.sha256" <(sha256sum "$target/package.json" "$target/package-lock.json")
cmp "$standalone/diff-after.txt" <(git -C "$target" diff HEAD --binary)
cmp "$standalone/index-after.txt" <(git -C "$target" ls-files --stage)

mkdir "$out"
capture before
printf '%s\n%s\n' "$visit" "$standalone" > "$out/commands.txt"
status=0
if bash "$SCR/pack-next-layer-final-verified.sh" "$package" "d7n-$package-next-final-alone-pack" "$version" "d7n-$package-next-final-alone-prepublish" "$baseline" > "$out/pack.stdout.txt" 2> "$out/pack.stderr.txt"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$out/pack.exit.txt"
capture after
cmp "$out/head-before.txt" "$out/head-after.txt"
cmp "$out/branch-before.txt" "$out/branch-after.txt"
cmp "$out/status-before.txt" "$out/status-after.txt"
cmp "$out/diff-before.txt" "$out/diff-after.txt"
cmp "$out/index-before.txt" "$out/index-after.txt"
cmp "$out/manifests-before.sha256" "$out/manifests-after.sha256"
exit "$status"
