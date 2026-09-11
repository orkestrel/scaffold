#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
target="$FLEET/guide"
prepublish="$SCR/d7n-guide-upper-final-prepublish"
pack="$SCR/packed/d7n-guide-upper-final-pack"
out="$SCR/$label"

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be safe'
test "$#" = 1 || fail 'evidence label is required'
test ! -e "$out" || fail 'evidence output exists'
test "$(git -C "$target" branch --show-current)" = claude/orkestrel-npm-audit-deps-14ibta || fail 'Guide branch differs'
test "$(git -C "$target" rev-parse HEAD)" = 327470a6e2e0c056c811e9f48a5ed429fe7ba70e || fail 'Guide HEAD differs'
git -C "$target" diff --cached --quiet || fail 'Guide has staged input'
test -z "$(git -C "$target" ls-files --others --exclude-standard)" || fail 'Guide has untracked input'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = @orkestrel/guide || fail 'Guide manifest name differs'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" version)" = 0.0.18 || fail 'Guide manifest version differs'
test "$(<"$prepublish/action.exit.txt")" = 0 || fail 'Guide prepublish receipt differs'
cmp "$prepublish/manifests-after.sha256" <(sha256sum "$target/package.json" "$target/package-lock.json")
cmp "$prepublish/diff-after.txt" <(git -C "$target" diff HEAD --binary)
cmp "$prepublish/index-after.txt" <(git -C "$target" ls-files --stage)
test "$(<"$pack/pack.exit.txt")" = 0 || fail 'Guide pack receipt differs'
cmp "$pack/extract/package/package.json" "$target/package.json"
diff -r "$pack/extract/package/dist" "$target/dist" > /dev/null

mapfile -t paths < <(git -C "$target" diff --name-only)
test "${#paths[@]}" -gt 0 || fail 'Guide preparation diff is empty'
for path in "${paths[@]}"; do
	case "$path" in
		.claude/agents/orkestrel.md|guides/contract.md|guides/markdown.md|guides/probe.md|guides/scaffold.md|guides/test.md|package.json|package-lock.json) ;;
		*) fail "Guide preparation path is not allowed: $path" ;;
	esac
done

mkdir "$out"
git -C "$target" status --porcelain=v1 > "$out/status-before.txt"
git -C "$target" diff HEAD --binary > "$out/diff-before.txt"
git -C "$target" add -- "${paths[@]}"
status=0
if git -C "$target" -c user.name=Claude -c user.email=noreply@anthropic.com commit -m 'Prepare Guide runtime pins and tooling' -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743' > "$out/commit.stdout.txt" 2> "$out/commit.stderr.txt"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$out/commit.exit.txt"
test "$status" -eq 0
git -C "$target" rev-parse HEAD > "$out/head-after.txt"
git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-after.txt"
test ! -s "$out/status-after.txt" || fail 'Guide is not clean after commit'
printf '%s\n' "$out"
