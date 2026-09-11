#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
expected=${2-}
prepublish_label=${3-}
label=${4-}

case "$package" in
	console|database|form|markdown|pool|process|reason|router|table|template|websocket) ;;
	*) printf 'Package is outside the selected layer.\n' >&2; exit 1 ;;
esac
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]]
[[ "$prepublish_label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]]
target="$FLEET/$package"
prepublish="$SCR/$prepublish_label"
out="$SCR/$label"
test ! -e "$out"
test "$(git -C "$target" branch --show-current)" = claude/orkestrel-npm-audit-deps-14ibta
test "$(git -C "$target" rev-parse HEAD)" = "$expected"
test "$(<"$prepublish/action.exit.txt")" = 0
mapfile -t untracked < <(git -C "$target" ls-files --others --exclude-standard)
if [ "$package" = markdown ]; then
	test "${#untracked[@]}" -eq 1
	test "${untracked[0]}" = tests/setupGuides.ts
fi
for path in "${untracked[@]}"; do
	if [ "$package" = markdown ] && [ "$path" = tests/setupGuides.ts ]; then
		test -f "$SCR/d7n-markdown-following-extra-before.txt"
		test -f "$SCR/d7n-markdown-following-extra-after.txt"
		test "$(git -C "$target" hash-object tests/setupGuides.ts)" = "$(<"$SCR/d7n-markdown-following-extra-before.txt")"
		test "$(git -C "$target" hash-object tests/setupGuides.ts)" = "$(<"$SCR/d7n-markdown-following-extra-after.txt")"
	else
		printf 'Unexpected untracked source preparation path: %s\n' "$path" >&2; exit 1
	fi
done
git -C "$target" diff --cached --quiet
cmp "$prepublish/manifests-after.sha256" <(sha256sum "$target/package.json" "$target/package-lock.json")
cmp "$prepublish/diff-after.txt" <(git -C "$target" diff HEAD --binary)
cmp "$prepublish/index-after.txt" <(git -C "$target" ls-files --stage)
mapfile -t paths < <(git -C "$target" diff --name-only)
if [ "$package" = markdown ] && [ "${#untracked[@]}" -eq 1 ]; then
	paths+=(tests/setupGuides.ts)
fi
test "${#paths[@]}" -gt 0
for path in "${paths[@]}"; do
	case "$path" in
		package.json|tests/guides.test.ts|tests/config.test.ts|tests/setupPolicy.ts) ;;
		tests/setupServer.test.ts) [ "$package" = database ] || { printf 'Unexpected source preparation path: %s\n' "$path" >&2; exit 1; } ;;
		tests/setupGuides.ts) [ "$package" = markdown ] || { printf 'Unexpected source preparation path: %s\n' "$path" >&2; exit 1; } ;;
		*) printf 'Unexpected source preparation path: %s\n' "$path" >&2; exit 1 ;;
	esac
done
for path in tests/config.test.ts tests/setupPolicy.ts; do
	cmp "$target/$path" "$target/node_modules/@orkestrel/scaffold/dist/host/$path"
done
mkdir "$out"
git -C "$target" diff HEAD --binary > "$out/diff.txt"
if [ "$package" = markdown ]; then
	status=0
	if git -C "$target" diff --no-index --binary /dev/null "$target/tests/setupGuides.ts" > "$out/added.diff.txt"; then
		printf 'Markdown added-file comparison did not produce a diff.\n' >&2; exit 1
	else
		status=$?
		test "$status" -eq 1 || exit "$status"
	fi
fi
git -C "$target" status --porcelain=v1 > "$out/status-before.txt"
git -C "$target" add -- "${paths[@]}"
git -C "$target" -c user.name=Claude -c user.email=noreply@anthropic.com commit -m "Adopt the native guides entry and current generated policy" -m $'Co-Authored-By: Claude <noreply@anthropic.com>\nClaude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743' > "$out/commit.stdout.txt" 2> "$out/commit.stderr.txt"
git -C "$target" rev-parse HEAD > "$out/head.txt"
git -C "$target" status --porcelain=v1 > "$out/status-after.txt"
test ! -s "$out/status-after.txt"
printf '%s %s\n' "$package" "$(<"$out/head.txt")"
