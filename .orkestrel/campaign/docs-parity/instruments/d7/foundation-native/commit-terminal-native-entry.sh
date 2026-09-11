#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
expected=${2-}
prepublish_label=${3-}
label=${4-}
target="$FLEET/$package"
prepublish="$SCR/$prepublish_label"
out="$SCR/$label"
verdict="$SCAFFOLD/.orkestrel/campaign/docs-parity/d7n-terminal-corrected-source-verdict.md"

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

test "$package" = terminal || fail 'package is not Terminal'
[[ "$expected" =~ ^[0-9a-f]{40}$ ]] || fail 'expected source HEAD is unsafe'
[[ "$prepublish_label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'prepublish label is unsafe'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'output label is unsafe'
test "$expected" = 0b01536068f396c9c5e92f5fca93a107d598f201 || fail 'unexpected Terminal source HEAD'
test ! -e "$out" || fail 'output exists'
test -f "$verdict" || fail 'Terminal source verdict is absent'
grep -Fx 'VERDICT: PASS' "$verdict" > /dev/null || fail 'Terminal source verdict does not pass'
test "$(git -C "$target" branch --show-current)" = claude/orkestrel-npm-audit-deps-14ibta || fail 'campaign branch differs'
test "$(git -C "$target" rev-parse HEAD)" = "$expected" || fail 'source HEAD differs'
test "$(<"$prepublish/action.exit.txt")" = 0 || fail 'prepublish failed'
git -C "$target" diff --cached --quiet || fail 'staged input is refused'
test -z "$(git -C "$target" ls-files --others --exclude-standard)" || fail 'untracked input is refused'
cmp "$prepublish/manifests-after.sha256" <(sha256sum "$target/package.json" "$target/package-lock.json")
cmp "$prepublish/diff-after.txt" <(git -C "$target" diff HEAD --binary)
cmp "$prepublish/index-after.txt" <(git -C "$target" ls-files --stage)

mapfile -t paths < <(git -C "$target" diff --name-only)
test "${#paths[@]}" -gt 0 || fail 'source delta is absent'
for path in "${paths[@]}"; do
	case "$path" in
		package.json|tests/guides.test.ts|tests/config.test.ts|tests/setupPolicy.ts|guides/terminal.md|src/core/TerminalManager.ts|src/core/helpers.ts|src/core/types.ts|src/server/Terminal.ts|src/server/helpers.ts) ;;
		*) fail "source preparation path is not allowed: $path" ;;
	esac
done
for path in tests/config.test.ts tests/setupPolicy.ts; do
	cmp "$target/$path" "$target/node_modules/@orkestrel/scaffold/dist/host/$path"
done

mkdir "$out"
git -C "$target" diff HEAD --binary > "$out/diff.txt"
git -C "$target" status --porcelain=v1 > "$out/status-before.txt"
git -C "$target" add -- "${paths[@]}"
git -C "$target" -c user.name=Claude -c user.email=noreply@anthropic.com commit -m 'Adopt the native guides entry and current generated policy' -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743' > "$out/commit.stdout.txt" 2> "$out/commit.stderr.txt"
git -C "$target" rev-parse HEAD > "$out/head.txt"
git -C "$target" status --porcelain=v1 > "$out/status-after.txt"
test ! -s "$out/status-after.txt" || fail 'Terminal tree is not clean'
printf '%s %s\n' "$package" "$(<"$out/head.txt")"
