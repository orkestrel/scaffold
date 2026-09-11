#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
target="$SCAFFOLD"
prepublish="$SCR/d7n-scaffold-upper-git-final-prepublish"
binding="$SCR/d7n-scaffold-upper-commit-binding"
pack="$SCR/packed/d7n-scaffold-upper-git-final-pack"
verdict="$SCAFFOLD/.orkestrel/campaign/docs-parity/d7n-scaffold-upper-prepared-verdict.md"
archive="$pack/orkestrel-scaffold-0.0.64.tgz"
out="$SCR/$label"
digest=a4e7078da602619e54384dbc7bdddaf25a2fdc6af0842a55004b8328365b8be7

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

run_git() {
	local name="$1"
	shift
	local status=0
	if timeout --kill-after=15s 120s git -C "$target" "$@" > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	return "$status"
}

[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be safe'
test "$#" = 1 || fail 'evidence label is required'
test ! -e "$out" || fail 'evidence output exists'
mkdir "$out"
test -f "$verdict" || fail 'prepared verdict is absent'
grep -Fx 'VERDICT: PASS' "$verdict" > /dev/null || fail 'prepared verdict does not pass'
test "$(<"$prepublish/action.exit.txt")" = 0 || fail 'final prepublish receipt differs'
test "$(<"$binding/action.exit.txt")" = 0 || fail 'commit binding receipt differs'
test "$(<"$pack/pack.exit.txt")" = 0 || fail 'pack receipt differs'
test -f "$archive" || fail 'packed archive is absent'
sha256sum "$archive" > "$out/archive-current.sha256"
cmp "$pack/archive.sha256" "$out/archive-current.sha256"
grep -Fx "$digest  $archive" "$out/archive-current.sha256" > /dev/null || fail 'packed archive digest differs'

run_git branch-before branch --show-current
test "$(<"$out/branch-before.stdout.txt")" = main || fail 'Scaffold branch differs'
run_git head-before rev-parse HEAD
test "$(<"$out/head-before.stdout.txt")" = 502428f11b792feab233120d1de395b197117610 || fail 'Scaffold HEAD differs'
run_git index-before diff --cached --quiet
test "$(<"$out/index-before.exit.txt")" = 0 || fail 'Scaffold has staged input'
run_git untracked-before ls-files --others --exclude-standard
mapfile -t untracked < "$out/untracked-before.stdout.txt"
for path in "${untracked[@]}"; do
	case "$path" in
		.orkestrel/campaign/docs-parity|.orkestrel/campaign/docs-parity/*) ;;
		*) fail "Scaffold has untracked input outside the campaign folder: $path" ;;
	esac
done
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = @orkestrel/scaffold || fail 'Scaffold manifest name differs'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" version)" = 0.0.64 || fail 'Scaffold manifest version differs'

run_git diff-current diff HEAD --binary
cmp "$binding/diff-after.txt" "$out/diff-current.stdout.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-current.sha256"
cmp "$binding/manifests-after.sha256" "$out/manifests-current.sha256"
run_git index-current ls-files --stage
cmp "$binding/index-after.txt" "$out/index-current.stdout.txt"
cmp "$pack/extract/package/package.json" "$target/package.json"
diff -r "$pack/extract/package/dist" "$target/dist" > "$out/dist-before.diff.txt"

run_git changed diff --name-only
mapfile -t paths < "$out/changed.stdout.txt"
test "${#paths[@]}" -gt 0 || fail 'Scaffold preparation diff is empty'
product=()
for path in "${paths[@]}"; do
	case "$path" in
		.claude/agents/orkestrel.md|guides/console.md|guides/contract.md|guides/emitter.md|guides/html.md|guides/markdown.md|guides/probe.md|guides/process.md|guides/scaffold.md|guides/template.md|guides/test.md|host.json|package.json|package-lock.json|src/bin/CLI.ts|src/bin/helpers.ts|tests/src/bin/CLI.test.ts|tests/src/bin/helpers.test.ts|tests/src/core/fixtures/app-only-toolchain.txt|tests/src/core/fixtures/setup-false-manifest.txt|tests/src/core/fixtures/source-manifest.txt)
			product+=("$path")
			;;
		.orkestrel/campaign/docs-parity|.orkestrel/campaign/docs-parity/*) ;;
		*) fail "Scaffold preparation path is not allowed: $path" ;;
	esac
done

run_git fetch fetch origin
test "$(<"$out/fetch.exit.txt")" = 0 || fail 'Scaffold origin fetch failed'
run_git ancestry merge-base --is-ancestor origin/main HEAD
test "$(<"$out/ancestry.exit.txt")" = 0 || fail 'Scaffold main does not contain origin/main'
run_git status-before status --porcelain=v1 --untracked-files=all
run_git diff-before diff HEAD --binary
run_git add-product add -- "${product[@]}"
run_git add-campaign add -- .orkestrel/campaign/docs-parity
run_git index-staged ls-files --stage
run_git commit -c user.name=Claude -c user.email=noreply@anthropic.com commit -m 'Prepare Scaffold release with bounded Git inventory' -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743'
test "$(<"$out/commit.exit.txt")" = 0 || fail 'Scaffold release commit failed'
run_git head-release rev-parse HEAD
run_git status-committed status --porcelain=v1 --untracked-files=all
test ! -s "$out/status-committed.stdout.txt" || fail 'Scaffold is not clean after commit'
run_git branch-committed branch --show-current
test "$(<"$out/branch-committed.stdout.txt")" = main || fail 'Scaffold branch changed after commit'

run_git push push origin HEAD:main HEAD:claude/orkestrel-npm-audit-deps-14ibta HEAD:claude/docs-parity-windows-01a0810d
test "$(<"$out/push.exit.txt")" = 0 || fail 'Scaffold release push failed'
run_git remote-main ls-remote origin refs/heads/main
run_git remote-campaign ls-remote origin refs/heads/claude/orkestrel-npm-audit-deps-14ibta
run_git remote-docs ls-remote origin refs/heads/claude/docs-parity-windows-01a0810d
head="$(<"$out/head-release.stdout.txt")"
for receipt in remote-main remote-campaign remote-docs; do
	awk -v head="$head" '$1 == head { found = 1 } END { exit found ? 0 : 1 }' "$out/$receipt.stdout.txt" || fail "origin ref differs from release HEAD: $receipt"
done
cmp "$pack/extract/package/package.json" "$target/package.json"
diff -r "$pack/extract/package/dist" "$target/dist" > "$out/dist-after.diff.txt"
run_git branch-after branch --show-current
test "$(<"$out/branch-after.stdout.txt")" = main || fail 'Scaffold main is not checked out'
run_git head-after rev-parse HEAD
run_git status-after status --porcelain=v1 --untracked-files=all
test ! -s "$out/status-after.stdout.txt" || fail 'Scaffold is not clean after push'
printf '%s\n' "$out"
