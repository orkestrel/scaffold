#!/usr/bin/env bash
# commit-scaffold-hook-candidate.sh records hook-release evidence under the supplied label.
# Predecessor: commit-scaffold-hook-release.sh. Checkpoint source; publication remains withheld.
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
digest=${2-}
target="$SCAFFOLD"
prepublish="$SCR/d7n-scaffold-hook-prepublish-http"
binding="$SCR/d7n-scaffold-hook-candidate-binding"
pack="$SCR/packed/d7n-scaffold-hook-release-pack"
verdict="$SCAFFOLD/.orkestrel/campaign/docs-parity/d7n-scaffold-hook-candidate-verdict.md"
archive="$pack/orkestrel-scaffold-0.0.65.tgz"
out="$SCR/$label"

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

test "$#" = 2 || fail 'evidence label and archive digest are required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be safe'
[[ "$digest" =~ ^[0-9a-f]{64}$ ]] || fail 'archive digest must be lowercase SHA-256 hexadecimal'
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
test "$(cut -d ' ' -f 1 "$out/archive-current.sha256")" = "$digest" || fail 'packed archive digest differs'

run_git branch-before branch --show-current
test "$(<"$out/branch-before.stdout.txt")" = main || fail 'Scaffold branch differs'
run_git head-before rev-parse HEAD
test "$(<"$out/head-before.stdout.txt")" = e3d5167ecf85512d28949aaa3b387b0f02133bac || fail 'Scaffold HEAD differs'
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
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" version)" = 0.0.65 || fail 'Scaffold manifest version differs'

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
		.agents/skills/enterprise-bootstrap/SKILL.md|.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md|.agents/skills/enterprise-bootstrap/references/color-modes.md|.agents/skills/enterprise-bootstrap/references/frontend-design.md|.agents/skills/enterprise-bootstrap/references/inspection.md|.claude/rules/workspace.md|.claude/settings.json|.claude/skills/enterprise-bootstrap/SKILL.md|guides/scaffold.md|host.json|package-lock.json|package.json|scripts/ollama.sh|src/core/constants.ts|src/core/templates.ts|src/core/types.ts|tests/distribution.test.ts|tests/setupServer.ts|tests/src/core/fixtures/app-only-toolchain.txt|tests/src/core/fixtures/setup-false-manifest.txt|tests/src/core/fixtures/source-manifest.txt|tests/src/server/helpers.test.ts)
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
run_git commit -c user.name=Claude -c user.email=noreply@anthropic.com commit -m 'Checkpoint shared Ollama setup pending Linux release proof' -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743'
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
