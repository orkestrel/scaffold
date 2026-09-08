#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

baseline=9b3003d14ca73c5218a7cb2a968f8b35600d3280
branch=claude/docs-parity-guides-entry-unit
target=C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-guides-entry
rootpackage=ca21d0993005c32bf4c1b5654db727d911ff01d82b9a82dd716d51e0fe5c0fd4
rootlock=4c418ce6a2987fdf93c82b5385c6bcf0438f242e46d33ef2610a3c2cac62542b

contract="$SCR/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz"
html="$SCR/d7n-html-stage.FBOpkx/packed/orkestrel-html-0.0.9.tgz"
markdown="$SCR/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz"
guide="$SCR/d7n-guide-stage.MQbCaa/packed/orkestrel-guide-0.0.18.tgz"
testtar="$SCR/packed/d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz"

test ! -e "$target"
if git -C "$SCAFFOLD" show-ref --verify --quiet "refs/heads/$branch"; then
	echo "Branch already exists: $branch" >&2
	exit 1
fi

evidence=$(mktemp -d "$SCR/d7n-scaffold-guides-prepare.XXXXXX")
printf '%s\n' "$evidence"

run() {
	local name=$1
	shift
	set +e
	"$@" > "$evidence/$name.log.txt" 2>&1
	local status=$?
	set -e
	printf '%s\n' "$status" > "$evidence/$name.exit.txt"
	return "$status"
}

printf '%s  %s\n' "$rootpackage" "$SCAFFOLD/package.json" > "$evidence/root-manifests.sha256"
printf '%s  %s\n' "$rootlock" "$SCAFFOLD/package-lock.json" >> "$evidence/root-manifests.sha256"
run root-before-status git -C "$SCAFFOLD" status --short
run root-before-digests sha256sum -c "$evidence/root-manifests.sha256"

printf '%s  %s\n' '88ef71a590f33edd9dc28bbdf65dc30ce9e2251fd9805807bb94bef0adcbca5a' "$contract" > "$evidence/artifacts.sha256"
printf '%s  %s\n' '970077f8671a978c271e7a790b78a6b44772d1f60d4e944fc381526c916c334b' "$html" >> "$evidence/artifacts.sha256"
printf '%s  %s\n' '02c46ebab1a401365ba73aafc9b644b7d21cf8924ee104364138dada2b10f9c3' "$markdown" >> "$evidence/artifacts.sha256"
printf '%s  %s\n' '8828ee3dfecc15d72d863f82c938c95a64d4323aa4d674a2f620735e62c61afc' "$guide" >> "$evidence/artifacts.sha256"
printf '%s  %s\n' 'd6ae5e57126d370b3316b528a8bd6dafaf2b64d9bdf52e73fead78065f7c5002' "$testtar" >> "$evidence/artifacts.sha256"
run artifact-digests sha256sum -c "$evidence/artifacts.sha256"

run worktree-add git -C "$SCAFFOLD" worktree add -b "$branch" "$target" "$baseline"
run worktree-baseline git -C "$target" rev-parse HEAD
test "$(< "$evidence/worktree-baseline.log.txt")" = "$baseline"

run worktree-before-status git -C "$target" status --short
sha256sum "$target/package.json" "$target/package-lock.json" > "$evidence/worktree-manifests.sha256"
run worktree-before-digests sha256sum -c "$evidence/worktree-manifests.sha256"
run npm-ci npm --prefix "$target" ci --ignore-scripts
run npm-artifacts npm --prefix "$target" install --no-save --ignore-scripts --package-lock=false "$contract" "$html" "$markdown" "$guide" "$testtar"
run worktree-after-digests sha256sum -c "$evidence/worktree-manifests.sha256"
run identities node /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/inspect-scaffold-guides.mjs "$target"
run npm-ls npm --prefix "$target" ls --all || true
run worktree-after-status git -C "$target" status --short
test ! -s "$evidence/worktree-after-status.log.txt"
run root-after-status git -C "$SCAFFOLD" status --short
run root-after-digests sha256sum -c "$evidence/root-manifests.sha256"
cmp "$evidence/root-before-status.log.txt" "$evidence/root-after-status.log.txt"

printf '%s\n' 'Preparation completed.'
