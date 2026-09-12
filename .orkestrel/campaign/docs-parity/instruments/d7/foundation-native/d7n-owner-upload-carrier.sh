#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

mode=${1-}
label=${2-}
out="$SCR/$label"
scaffold="$SCAFFOLD"
ollama=C:/Users/mikes/WebstormProjects/ollama
toolbox="$FLEET/toolbox"
campaign=.orkestrel/campaign/docs-parity

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

finish() {
	local status=$?
	printf '%s\n' "$status" > "$out/terminal.exit.txt"
}

run() {
	local name="$1"
	shift
	local status=0
	if timeout --kill-after=15s 120s "$@" > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	printf '%q ' "$@" >> "$out/commands.txt"
	printf '\n' >> "$out/commands.txt"
	return "$status"
}

run_target() {
	local name="$1"
	local target="$2"
	shift 2
	run "$name" bash -lc 'cd "$1" && shift && "$@"' bash "$target" "$@"
}

capture() {
	local name="$1"
	local target="$2"
	run "$name-branch" git -C "$target" branch --show-current
	run "$name-head" git -C "$target" rev-parse HEAD
	run "$name-status" git -C "$target" status --porcelain=v1 --untracked-files=all
	run "$name-diff" git -C "$target" diff HEAD --binary
	run "$name-index" git -C "$target" ls-files --stage
}

check_archive() {
	local name="$1"
	local target="$2"
	local version="$3"
	local folder="$4"
	local digest="$5"
	local gate="$6"
	local packed="$SCR/packed/$folder"
	local archive="$packed/orkestrel-$name-$version.tgz"
	test "$(<"$gate/action.exit.txt")" = 0 || fail "$name prepublish receipt differs"
	test "$(<"$packed/pack.exit.txt")" = 0 || fail "$name pack receipt differs"
	run "$name-archive" sha256sum "$archive"
	test "$(cut -d ' ' -f 1 "$out/$name-archive.stdout.txt")" = "$digest" || fail "$name archive digest differs"
	run "$name-manifest" cmp "$packed/extract/package/package.json" "$target/package.json"
	run "$name-dist" diff -r "$packed/extract/package/dist" "$target/dist"
}

check_manifest() {
	local name="$1"
	local target="$2"
	local version="$3"
	run "$name-name" node "$SCR/read-package-field.mjs" "$target/package.json" name
	test "$(<"$out/$name-name.stdout.txt")" = "@orkestrel/$name" || fail "$name manifest name differs"
	run "$name-version" node "$SCR/read-package-field.mjs" "$target/package.json" version
	test "$(<"$out/$name-version.stdout.txt")" = "$version" || fail "$name manifest version differs"
}

read_receipt() {
	node --input-type=module -e "import { readFileSync } from 'node:fs'; process.stdout.write(readFileSync(process.argv[1], 'utf8').trim());" "$1"
}

test "$#" = 2 || fail 'mode and evidence label are required'
case "$mode" in promote|checkpoint) ;; *) fail 'mode must be promote or checkpoint' ;; esac
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label is unsafe'
test ! -e "$out" || fail 'evidence output exists'
mkdir "$out"
trap finish EXIT

if [ "$mode" = promote ]; then
	check_manifest scaffold "$scaffold" 0.0.65
	check_manifest ollama "$ollama" 0.0.15
	check_manifest toolbox "$toolbox" 0.0.13
	capture scaffold "$scaffold"
	test "$(<"$out/scaffold-branch.stdout.txt")" = main || fail 'Scaffold branch differs'
	while IFS= read -r path; do
		case "$path" in prompt.txt|$campaign|$campaign/*) ;; *) fail "Scaffold dirty path differs: $path" ;; esac
	done < "$out/scaffold-status.stdout.txt"
	capture ollama "$ollama"
	test "$(<"$out/ollama-branch.stdout.txt")" = claude/orkestrel-npm-audit-deps-14ibta || fail 'Ollama campaign branch differs'
	test "$(<"$out/ollama-head.stdout.txt")" = d6e868d886f2968edbcaf125a207966a6ae8dd15 || fail 'Ollama release HEAD differs'
	test ! -s "$out/ollama-status.stdout.txt" || fail 'Ollama tree differs'
	capture toolbox "$toolbox"
	test "$(<"$out/toolbox-branch.stdout.txt")" = main || fail 'Toolbox branch differs'
	test "$(<"$out/toolbox-head.stdout.txt")" = 21068c362ec4c8cf79432da11402ae5350ba1fce || fail 'Toolbox release HEAD differs'
	test ! -s "$out/toolbox-status.stdout.txt" || fail 'Toolbox tree differs'
	for name in scaffold ollama toolbox; do
		case "$name" in scaffold) target="$scaffold" ;; ollama) target="$ollama" ;; toolbox) target="$toolbox" ;; esac
		run "$name-fetch" git -C "$target" fetch origin
		run "$name-ancestry" git -C "$target" merge-base --is-ancestor origin/main HEAD
		test "$(<"$out/$name-ancestry.exit.txt")" = 0 || fail "$name origin main diverges"
	done
	check_archive scaffold "$scaffold" 0.0.65 d7n-scaffold-hook-release-pack 08a4066e3b03cae0b525d8d0238952c4791fc394208f289d966c531639aded44 "$SCR/d7n-scaffold-hook-prepublish-http"
	check_archive ollama "$ollama" 0.0.15 d7n-ollama-hook-trial-pack e78e800159eaf29fd636ec13be146309645a51fdbe1d8bae2b90c2c281131843 "$SCR/d7n-ollama-owner-registry-prepublish"
	check_archive toolbox "$toolbox" 0.0.13 d7n-toolbox-final-registry-visit-pack cf60177fb42d036c9747e3e192b0e7429d5105984c0e554cd8d176c207032e78 "$SCR/d7n-toolbox-final-registry-visit-prepublish"
	run_target ollama-scaffold node_modules/@orkestrel/scaffold node "$SCR/read-package-field.mjs" package.json version
	test "$(<"$out/ollama-scaffold.stdout.txt")" = 0.0.64 || fail 'Ollama installed Scaffold differs'
	run_target ollama-guide node_modules/@orkestrel/guide node "$SCR/read-package-field.mjs" package.json version
	test "$(<"$out/ollama-guide.stdout.txt")" = 0.0.18 || fail 'Ollama installed Guide differs'
	test "$(<"$SCR/d7n-ollama-owner-registry-prepublish/action.exit.txt")" = 0 || fail 'Ollama prepublish differs'
	run ollama-gate-manifests sha256sum "$ollama/package.json" "$ollama/package-lock.json"
	cmp "$SCR/d7n-ollama-owner-registry-prepublish/manifests-after.sha256" "$out/ollama-gate-manifests.stdout.txt" || fail 'Ollama gate manifest hash differs'
	test ! -s "$SCR/d7n-ollama-owner-registry-prepublish/status-after.txt" || fail 'Ollama gate status differs'
	for name in scaffold toolbox; do
		case "$name" in scaffold) target="$scaffold" ;; toolbox) target="$toolbox" ;; esac
		for ref in main claude/orkestrel-npm-audit-deps-14ibta claude/docs-parity-windows-01a0810d; do
			run "$name-${ref//\//-}" git -C "$target" rev-parse "origin/$ref"
			test "$(<"$out/$name-${ref//\//-}.stdout.txt")" = "$(git -C "$target" rev-parse HEAD)" || fail "$name remote ref differs: $ref"
		done
	done
	run ollama-campaign git -C "$ollama" rev-parse origin/claude/orkestrel-npm-audit-deps-14ibta
	test "$(<"$out/ollama-campaign.stdout.txt")" = "$(<"$out/ollama-head.stdout.txt")" || fail 'Ollama campaign remote differs'
	run ollama-push-campaign git -C "$ollama" push -u origin claude/orkestrel-npm-audit-deps-14ibta
	run ollama-push-main git -C "$ollama" push origin HEAD:main
	if git -C "$ollama" show-ref --verify --quiet refs/heads/main; then
		run ollama-switch-main git -C "$ollama" switch main
		run ollama-main-ancestor git -C "$ollama" merge-base --is-ancestor main origin/main
		test "$(<"$out/ollama-main-ancestor.exit.txt")" = 0 || fail 'Ollama local main diverges'
		run ollama-merge-main git -C "$ollama" merge --ff-only origin/main
	else
		run ollama-create-main git -C "$ollama" switch -c main --track origin/main
	fi
	capture ollama-final "$ollama"
	test "$(<"$out/ollama-final-branch.stdout.txt")" = main || fail 'Ollama final branch differs'
	test ! -s "$out/ollama-final-status.stdout.txt" || fail 'Ollama final tree differs'
	run ollama-origin-main git -C "$ollama" rev-parse origin/main
	run ollama-origin-campaign git -C "$ollama" rev-parse origin/claude/orkestrel-npm-audit-deps-14ibta
	test "$(<"$out/ollama-final-head.stdout.txt")" = "$(<"$out/ollama-origin-main.stdout.txt")" || fail 'Ollama origin main differs'
	test "$(<"$out/ollama-final-head.stdout.txt")" = "$(<"$out/ollama-origin-campaign.stdout.txt")" || fail 'Ollama origin campaign differs'
	printf '0\n' > "$out/promotion.exit.txt"
	printf '%s\n' "$out"
	exit 0
fi

run checkpoint-branch git -C "$scaffold" branch --show-current
test "$(<"$out/checkpoint-branch.stdout.txt")" = main || fail 'Scaffold branch differs'
run checkpoint-head git -C "$scaffold" rev-parse HEAD
test "$(<"$out/checkpoint-head.stdout.txt")" = aabc03c96b6d37847cb8dc0daaa667c486b5b02f || fail 'Scaffold release HEAD differs'
run checkpoint-index git -C "$scaffold" diff --cached --quiet
test "$(<"$out/checkpoint-index.exit.txt")" = 0 || fail 'Scaffold index differs'
run checkpoint-status git -C "$scaffold" status --porcelain=v1 --untracked-files=all
while IFS= read -r path; do
	case "$path" in prompt.txt|$campaign|$campaign/*) ;; *) fail "Scaffold dirty path differs: $path" ;; esac
done < "$out/checkpoint-status.stdout.txt"
test "$(<"$SCR/d7n-owner-upload-main/promotion.exit.txt")" = 0 || fail 'promotion receipt differs'
test "$(read_receipt "$SCR/d7n-owner-upload-prompt-parse/parse.exit.txt")" = 0 || fail 'prompt parser receipt differs'
run checkpoint-fetch git -C "$scaffold" fetch origin
run checkpoint-ancestry git -C "$scaffold" merge-base --is-ancestor origin/main HEAD
test "$(<"$out/checkpoint-ancestry.exit.txt")" = 0 || fail 'Scaffold origin main diverges'
run checkpoint-check git -C "$scaffold" diff --check
run checkpoint-add git -C "$scaffold" add -- prompt.txt "$campaign"
run checkpoint-commit git -C "$scaffold" -c user.name=Claude -c user.email=noreply@anthropic.com commit --only prompt.txt "$campaign" -m 'Prepare owner-approved upload handoff' -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743'
run checkpoint-push git -C "$scaffold" push origin HEAD:main HEAD:claude/orkestrel-npm-audit-deps-14ibta HEAD:claude/docs-parity-windows-01a0810d
for ref in main claude/orkestrel-npm-audit-deps-14ibta claude/docs-parity-windows-01a0810d; do
	run "checkpoint-${ref//\//-}" git -C "$scaffold" rev-parse "origin/$ref"
	test "$(<"$out/checkpoint-${ref//\//-}.stdout.txt")" = "$(git -C "$scaffold" rev-parse HEAD)" || fail "Scaffold remote ref differs: $ref"
done
run checkpoint-final-status git -C "$scaffold" status --porcelain=v1 --untracked-files=all
test ! -s "$out/checkpoint-final-status.stdout.txt" || fail 'Scaffold final tree differs'
run checkpoint-final-head git -C "$scaffold" rev-parse HEAD
printf '%s\n' "$out"
