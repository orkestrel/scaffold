#!/usr/bin/env bash
set -euo pipefail

# Carrier: close-dependent-registry-toolchain-release.sh <package> <expected> <version> <visit> <label>
# Evidence: tmp/pass/<label>.
# Successor: close a toolchain-admitting dependent registry visit.

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
expected=${2-}
version=${3-}
visit=${4-}
label=${5-}
target="$FLEET/$package"
out="$SCR/$label"
pack="$SCR/packed/$visit-pack"
prepublish="$SCR/$visit-prepublish"
verdict="$SCAFFOLD/.orkestrel/campaign/docs-parity/d7n-$package-dependent-registry-prepared-verdict.md"
guidepack="$SCR/packed/d7n-guide-registry-native-pack/extract/package/dist"
scaffoldpack="$SCR/packed/d7n-scaffold-upper-git-final-pack/extract/package/dist"

fail() { printf '%s\n' "$1" >&2; exit 1; }

run() {
	local name="$1" cap="$2" status=0
	shift 2
	if timeout --kill-after=15s "$cap" "$@" > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then status=0; else status=$?; fi
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	return "$status"
}

capture() {
	local suffix="$1"
	git -C "$target" branch --show-current > "$out/branch-$suffix.txt"
	git -C "$target" rev-parse HEAD > "$out/head-$suffix.txt"
	git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-$suffix.txt"
	git -C "$target" diff HEAD --binary > "$out/diff-$suffix.txt"
	git -C "$target" ls-files --stage > "$out/index-$suffix.txt"
	sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-$suffix.sha256"
}

case "$package" in
	brief) pending=0.0.8; runtime=('contract 0.0.17' 'emitter 0.0.10' 'interpret 0.0.13' 'reason 0.0.10') ;;
	mcp) pending=0.0.29; runtime=('codec 0.0.3' 'contract 0.0.17' 'emitter 0.0.10' 'process 0.0.11' 'sse 0.0.7' 'tool 0.0.14' 'websocket 0.0.12') ;;
	middleware) pending=0.0.20; runtime=('abort 0.0.10' 'budget 0.0.10' 'contract 0.0.17' 'timeout 0.0.10') ;;
	program) pending=0.0.13; runtime=('contract 0.0.17' 'emitter 0.0.10' 'qualifier 0.0.14' 'rater 0.0.14' 'reason 0.0.10') ;;
	worker) pending=0.0.12; runtime=('contract 0.0.17' 'database 0.0.14' 'emitter 0.0.10' 'pool 0.0.11' 'queue 0.0.13') ;;
	workflow) pending=0.0.18; runtime=('abort 0.0.10' 'budget 0.0.10' 'contract 0.0.17' 'database 0.0.14' 'emitter 0.0.10' 'queue 0.0.13' 'timeout 0.0.10') ;;
	*) fail 'package is not a remaining native consumer' ;;
esac
development=('guide 0.0.18' 'scaffold 0.0.64' 'test 0.0.14' 'probe 0.0.12')
fields=()
toolchain=('devDependencies.@microsoft/api-extractor' 'devDependencies.@types/node' 'devDependencies.oxfmt' 'devDependencies.oxlint' 'devDependencies.typescript' 'devDependencies.vite' 'devDependencies.vitest')
preserved=()
case "$package" in
	mcp)
		fields=('peerDependencies.@orkestrel/router 0.0.14' 'peerDependencies.@orkestrel/server 0.0.19' 'devDependencies.@orkestrel/router 0.0.14' 'devDependencies.@orkestrel/server 0.0.19')
		preserved+=('devDependencies.@modelcontextprotocol/conformance')
		toolchain+=('devDependencies.@vitest/browser-playwright' 'devDependencies.playwright')
		;;
	middleware)
		fields=('peerDependencies.@orkestrel/database 0.0.14' 'peerDependencies.@orkestrel/server 0.0.19' 'devDependencies.@orkestrel/database 0.0.14' 'devDependencies.@orkestrel/router 0.0.14' 'devDependencies.@orkestrel/server 0.0.19')
		;;
	workflow)
		toolchain+=('devDependencies.@vitest/browser-playwright' 'devDependencies.playwright')
		;;
esac

[[ "$expected" =~ ^[0-9a-f]{40}$ ]] || fail 'expected source HEAD is unsafe'
[[ "$version" =~ ^0\.0\.[0-9]+$ ]] || fail 'pending version is unsafe'
[[ "$visit" =~ ^d7n-[[:alnum:]._-]+-final-registry-visit$ ]] || fail 'visit label is unsafe'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'closure label is unsafe'
test "$version" = "$pending" || fail 'pending version differs'
test "$visit" = "d7n-$package-final-registry-visit" || fail 'visit differs'
test -d "$target/.git" || fail 'canonical target is absent'
test ! -e "$out" || fail 'closure evidence exists'
test -f "$verdict" || fail 'prepared verdict is absent'
test "$(awk '{ sub(/\r$/, ""); if (NF) verdict=$0 } END { print verdict }' "$verdict")" = 'VERDICT: PASS' || fail 'prepared verdict does not pass'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail 'manifest name differs'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" version)" = "$version" || fail 'manifest version differs'
test "$(git -C "$target" branch --show-current)" = claude/orkestrel-npm-audit-deps-14ibta || fail 'campaign branch differs'
test "$(git -C "$target" rev-parse HEAD)" = "$expected" || fail 'source HEAD differs'
test "$expected" = "$(<"$SCR/$visit/prepared-head.stdout.txt")" || fail 'prepared HEAD differs'
test "$expected" = "$(<"$pack/head-after.txt")" || fail 'packed HEAD differs'
git -C "$target" diff --cached --quiet || fail 'staged input is refused'
test -z "$(git -C "$target" ls-files --others --exclude-standard)" || fail 'untracked input is refused'
test "$(<"$SCR/$visit/pack.exit.txt")" = 0 || fail 'visit pack failed'
test "$(<"$prepublish/action.exit.txt")" = 0 || fail 'visit prepublish failed'
cmp "$pack/manifests-after.sha256" <(sha256sum "$target/package.json" "$target/package-lock.json")
cmp "$pack/diff-after.txt" <(git -C "$target" diff HEAD --binary)
cmp "$pack/index-after.txt" <(git -C "$target" ls-files --stage)

mkdir "$out"
capture before
run packed-manifest 60s cmp "$pack/extract/package/package.json" "$target/package.json"
run packed-dist 120s diff -r "$pack/extract/package/dist" "$target/dist"
run archive-sha256 60s sha256sum --check "$pack/archive.sha256"
run native-manifest 60s node "$SCR/verify-upper-native-manifest.mjs" "$target/package.json"

for pair in "${runtime[@]}"; do
	set -- $pair
	key="dependencies.@orkestrel/$1"
	pin=$(printf '%s' "$key" | tr './@' '---')
	run "pin-$pin" 60s npm --prefix "$target" pkg get "$key"
	test "$(<"$out/pin-$pin.stdout.txt")" = "^$2" || fail "runtime range differs: $key"
done
for pair in "${development[@]}"; do
	set -- $pair
	key="devDependencies.@orkestrel/$1"
	pin=$(printf '%s' "$key" | tr './@' '---')
	run "pin-$pin" 60s npm --prefix "$target" pkg get "$key"
	test "$(<"$out/pin-$pin.stdout.txt")" = "^$2" || fail "development range differs: $key"
done
for pair in "${fields[@]}"; do
	set -- $pair
	pin=$(printf '%s' "$1" | tr './@' '---')
	run "pin-$pin" 60s npm --prefix "$target" pkg get "$1"
	test "$(<"$out/pin-$pin.stdout.txt")" = "^$2" || fail "peer or development range differs: $1"
done
test ! -e "$target/scripts/docs.ts" || fail 'retired docs script remains'
test ! -e "$target/scripts/guides.ts" || fail 'retired guides script remains'
run guide-version 60s node "$SCR/read-package-field.mjs" "$target/node_modules/@orkestrel/guide/package.json" version
test "$(<"$out/guide-version.stdout.txt")" = 0.0.18 || fail 'installed Guide version differs'
run scaffold-version 60s node "$SCR/read-package-field.mjs" "$target/node_modules/@orkestrel/scaffold/package.json" version
test "$(<"$out/scaffold-version.stdout.txt")" = 0.0.64 || fail 'installed Scaffold version differs'
run guide-dist 120s diff -r "$guidepack" "$target/node_modules/@orkestrel/guide/dist"
run scaffold-dist 120s diff -r "$scaffoldpack" "$target/node_modules/@orkestrel/scaffold/dist"
run peer-meta 60s npm --prefix "$target" pkg get peerDependenciesMeta
test "$(<"$SCR/$visit/peer-meta-before.exit.txt")" = 0 || fail 'visit initial peer metadata receipt failed'
test "$(<"$SCR/$visit/peer-meta-final.exit.txt")" = 0 || fail 'visit peer metadata receipt failed'
cmp "$SCR/$visit/peer-meta-before.stdout.txt" "$SCR/$visit/peer-meta-final.stdout.txt" || fail 'visit peer metadata changed'
cmp "$SCR/$visit/peer-meta-final.stdout.txt" "$out/peer-meta.stdout.txt" || fail 'current peer metadata differs from visit'
for key in "${toolchain[@]}"; do
	externalkey=$(printf '%s' "$key" | tr './@' '---')
	test -f "$SCR/$visit/external-before-$externalkey.stdout.txt" || fail "toolchain before receipt is absent: $key"
	test -f "$SCR/$visit/external-registry-$externalkey.stdout.txt" || fail "toolchain registry receipt is absent: $key"
	test -f "$SCR/$visit/external-final-$externalkey.stdout.txt" || fail "toolchain final receipt is absent: $key"
	test "$(<"$SCR/$visit/external-before-$externalkey.exit.txt")" = 0 || fail "toolchain before receipt failed: $key"
	test "$(<"$SCR/$visit/external-registry-$externalkey.exit.txt")" = 0 || fail "toolchain registry receipt failed: $key"
	test "$(<"$SCR/$visit/external-final-$externalkey.exit.txt")" = 0 || fail "toolchain final receipt failed: $key"
	test "$(<"$SCR/$visit/external-final-$externalkey.stdout.txt")" = "^$(<"$SCR/$visit/external-registry-$externalkey.stdout.txt")" || fail "visit toolchain range lacks registry support: $key"
	run "external-$externalkey" 60s npm --prefix "$target" pkg get "$key"
	cmp "$SCR/$visit/external-final-$externalkey.stdout.txt" "$out/external-$externalkey.stdout.txt" || fail "current toolchain range differs from visit: $key"
done
for key in "${preserved[@]}"; do
	externalkey=$(printf '%s' "$key" | tr './@' '---')
	test "$(<"$SCR/$visit/external-before-$externalkey.exit.txt")" = 0 || fail "preserved external before receipt failed: $key"
	test "$(<"$SCR/$visit/external-final-$externalkey.exit.txt")" = 0 || fail "preserved external final receipt failed: $key"
	cmp "$SCR/$visit/external-before-$externalkey.stdout.txt" "$SCR/$visit/external-final-$externalkey.stdout.txt" || fail "preserved external range changed: $key"
	run "external-$externalkey" 60s npm --prefix "$target" pkg get "$key"
	cmp "$SCR/$visit/external-final-$externalkey.stdout.txt" "$out/external-$externalkey.stdout.txt" || fail "current preserved range differs from visit: $key"
done

run fetch 60s git -C "$target" fetch origin
run ancestry 60s git -C "$target" merge-base --is-ancestor origin/main HEAD
mapfile -t changed < <(git -C "$target" diff --name-only HEAD)
test "${#changed[@]}" -gt 0 || fail 'no final preparation paths exist'
for path in "${changed[@]}"; do
	case "$path" in
		package.json|package-lock.json|.claude/agents/orkestrel.md|scripts/docs.ts) ;;
		guides/*.md)
			name=${path#guides/}
			name=${name%.md}
			allowed=false
			for pair in "${runtime[@]}" "${development[@]}" "${fields[@]}"; do
				set -- $pair
				declared=${1##*/}
				test "$name" = "$declared" && allowed=true
			done
			"$allowed" || fail "changed mirror is not declared: $path"
			;;
		*) fail "changed path is not allowed: $path" ;;
	esac
done
for path in "${changed[@]}"; do git -C "$target" add -- "$path"; done
run commit 120s git -C "$target" -c user.name=Claude -c user.email=noreply@anthropic.com commit -m "Prepare $package release" -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743'
release="$(git -C "$target" rev-parse HEAD)"
printf '%s\n' "$release" > "$out/release-head.txt"
run push-campaign 120s git -C "$target" push -u origin claude/orkestrel-npm-audit-deps-14ibta
run push-main 120s git -C "$target" push origin HEAD:main
test -z "$(git -C "$target" status --porcelain=v1 --untracked-files=all)" || fail 'campaign ref is not clean'
if git -C "$target" show-ref --verify --quiet refs/heads/main; then
	run switch-main 60s git -C "$target" switch main
	run merge-main 60s git -C "$target" merge --ff-only origin/main
else
	status=$?
	test "$status" -eq 1 || fail 'main reference read failed'
	run create-main 60s git -C "$target" switch -c main --track origin/main
fi
test "$(git -C "$target" branch --show-current)" = main || fail 'local main is absent'
test -z "$(git -C "$target" status --porcelain=v1 --untracked-files=all)" || fail 'local main is not clean'
test "$(git -C "$target" rev-parse HEAD)" = "$release" || fail 'local main differs from release'
for pair in 'ref-origin-main origin/main' 'ref-campaign refs/heads/claude/orkestrel-npm-audit-deps-14ibta' 'ref-origin-campaign origin/claude/orkestrel-npm-audit-deps-14ibta'; do
	set -- $pair
	run "$1" 60s git -C "$target" rev-parse "$2"
	test "$(<"$out/$1.stdout.txt")" = "$release" || fail "release ref differs: $1"
done
capture after
run final-head 60s git -C "$target" rev-parse HEAD
run final-guide-version 60s node "$SCR/read-package-field.mjs" "$target/node_modules/@orkestrel/guide/package.json" version
test "$(<"$out/final-guide-version.stdout.txt")" = 0.0.18 || fail 'final Guide version differs'
run final-scaffold-version 60s node "$SCR/read-package-field.mjs" "$target/node_modules/@orkestrel/scaffold/package.json" version
test "$(<"$out/final-scaffold-version.stdout.txt")" = 0.0.64 || fail 'final Scaffold version differs'
run final-guide-dist 120s diff -r "$guidepack" "$target/node_modules/@orkestrel/guide/dist"
run final-scaffold-dist 120s diff -r "$scaffoldpack" "$target/node_modules/@orkestrel/scaffold/dist"
run final-manifest 60s cmp "$pack/extract/package/package.json" "$target/package.json"
run final-dist 120s diff -r "$pack/extract/package/dist" "$target/dist"
printf '%s\n' "$out"
