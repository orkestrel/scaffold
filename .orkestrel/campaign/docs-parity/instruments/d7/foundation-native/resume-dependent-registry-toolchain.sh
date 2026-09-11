#!/usr/bin/env bash
set -euo pipefail

# Carrier: resume-dependent-registry-toolchain.sh d7n-brief-final-registry-visit
# Evidence: resume-prefixed receipts in the stopped visit, then its final action and pack suffixes.
# Successor: resume the stopped Brief visit after its completed registry install.

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
package=brief
target="$FLEET/$package"
out="$SCR/$label"
install="$SCR/$label-install"
guidepack="$SCR/packed/d7n-guide-registry-native-pack/extract/package/dist"
scaffoldpack="$SCR/packed/d7n-scaffold-upper-git-final-pack/extract/package/dist"
expected=aeea7a504f9cff8342797bd26b35213536df73f1
version=0.0.8
baseline=0.0.7
runtime=('contract 0.0.17' 'emitter 0.0.10' 'interpret 0.0.13' 'reason 0.0.10')
priorranges=('contract 0.0.16' 'emitter 0.0.9' 'interpret 0.0.12' 'reason 0.0.9' 'guide 0.0.17' 'scaffold 0.0.63' 'test 0.0.13')
toolchain=('devDependencies.@microsoft/api-extractor' 'devDependencies.@types/node' 'devDependencies.oxfmt' 'devDependencies.oxlint' 'devDependencies.typescript' 'devDependencies.vite' 'devDependencies.vitest')

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

run() {
	local name="$1"
	local cap="$2"
	local status=0
	shift 2
	test ! -e "$out/$name.stdout.txt" || fail "resume receipt exists: $name.stdout.txt"
	test ! -e "$out/$name.stderr.txt" || fail "resume receipt exists: $name.stderr.txt"
	test ! -e "$out/$name.exit.txt" || fail "resume receipt exists: $name.exit.txt"
	if (cd "$target" && timeout --kill-after=15s "$cap" "$@") > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	printf '%q ' "$@" >> "$out/commands-resume.txt"
	printf '\n' >> "$out/commands-resume.txt"
	return "$status"
}

captureAfter() {
	for name in branch head status diff index manifests authored; do
		test ! -e "$out/$name-after.txt" || fail "final capture exists: $name-after.txt"
	done
	test ! -e "$out/manifests-after.sha256" || fail 'final manifest capture exists'
	test ! -e "$out/authored-after.sha256" || fail 'final authored capture exists'
	git -C "$target" branch --show-current > "$out/branch-after.txt"
	git -C "$target" rev-parse HEAD > "$out/head-after.txt"
	git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-after.txt"
	git -C "$target" diff HEAD --binary > "$out/diff-after.txt"
	git -C "$target" ls-files --stage > "$out/index-after.txt"
	sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-after.sha256"
	sha256sum "$target/guides/$package.md" "$target/tests/guides.test.ts" > "$out/authored-after.sha256"
}

requireAbsent() {
	local name="$1"
	local pattern="$2"
	if run "$name" 120s rg -n -P "$pattern" src tests; then
		fail "self-pin search found a required edit: $name"
	fi
	test "$(<"$out/$name.exit.txt")" = 1 || fail "self-pin search failed: $name"
}

test "$label" = d7n-brief-final-registry-visit || fail 'resume label is not the stopped Brief visit'
test -d "$target/.git" || fail 'canonical Brief target is absent'
test -d "$out" || fail 'stopped visit evidence is absent'
test -d "$install" || fail 'completed install evidence is absent'
test ! -e "$out/commands-resume.txt" || fail 'resume command receipt exists'
if compgen -G "$out/resume-*" > /dev/null; then fail 'resume evidence exists'; fi
if compgen -G "$out/external-registry-*" > /dev/null; then fail 'final registry evidence exists'; fi
if compgen -G "$out/external-final-*" > /dev/null; then fail 'final external evidence exists'; fi
test ! -e "$out/peer-meta-final.stdout.txt" || fail 'final peer metadata evidence exists'
for name in registry-lock-local roots self-version format prepublish pack; do
	test ! -e "$out/$name.exit.txt" || fail "final action receipt exists: $name"
done
for suffix in format prepublish; do
	test ! -e "$SCR/$label-$suffix" || fail "final action evidence exists: $label-$suffix"
done
test ! -e "$SCR/packed/$label-pack" || fail "packing evidence exists: $label-pack"
test ! -e "$out/status-after.txt" || fail 'parent final capture exists'

test "$(<"$out/prepared-head.stdout.txt")" = "$expected" || fail 'prepared HEAD receipt differs'
for name in overwrite audit lock install final-guide-version final-guide-dist final-scaffold-version final-scaffold-dist; do
	test -f "$out/$name.exit.txt" || fail "completed receipt is absent: $name"
	test "$(<"$out/$name.exit.txt")" = 0 || fail "completed receipt failed: $name"
done
test "$(<"$install/action.exit.txt")" = 0 || fail 'completed install action failed'
test "$(<"$out/final-guide-version.stdout.txt")" = 0.0.18 || fail 'completed Guide receipt differs'
test "$(<"$out/final-scaffold-version.stdout.txt")" = 0.0.64 || fail 'completed Scaffold receipt differs'
cmp "$out/authored-before.sha256" "$out/authored-after-overwrite.sha256" || fail 'reviewed authored receipts differ'
for key in "${toolchain[@]}"; do
	externalkey=$(printf '%s' "$key" | tr './@' '---')
	test "$(<"$out/external-before-$externalkey.exit.txt")" = 0 || fail "stopped external receipt failed: $key"
	[[ "$(<"$out/external-before-$externalkey.stdout.txt")" =~ ^\^[0-9]+\.[0-9]+\.[0-9]+([-.][[:alnum:].-]+)?$ ]] || fail "stopped toolchain field is absent or unsafe: $key"
done
test "$(<"$out/external-after-devDependencies--microsoft-api-extractor.exit.txt")" = 0 || fail 'stopped api-extractor comparison is incomplete'

test "$(git -C "$target" branch --show-current)" = claude/orkestrel-npm-audit-deps-14ibta || fail 'campaign branch differs'
test "$(git -C "$target" rev-parse HEAD)" = "$expected" || fail 'preparation HEAD differs'
git -C "$target" diff --cached --quiet || fail 'index differs'
test -z "$(git -C "$target" ls-files --others --exclude-standard)" || fail 'untracked input is refused'
cmp "$install/status-after.txt" <(git -C "$target" status --porcelain=v1 --untracked-files=all) || fail 'status differs from completed install'
cmp "$install/diff-after.txt" <(git -C "$target" diff HEAD --binary) || fail 'diff differs from completed install'
cmp "$install/index-after.txt" <(git -C "$target" ls-files --stage) || fail 'index differs from completed install'
cmp "$install/manifests-after.sha256" <(sha256sum "$target/package.json" "$target/package-lock.json") || fail 'manifests differ from completed install'
sha256sum "$target/guides/$package.md" "$target/tests/guides.test.ts" > "$out/authored-resume.sha256"
cmp "$out/authored-before.sha256" "$out/authored-resume.sha256" || fail 'reviewed authored files differ'
git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/resume-status.txt"
git -C "$target" diff HEAD --binary > "$out/resume-diff.txt"
git -C "$target" ls-files --stage > "$out/resume-index.txt"
printf '%s\n' 'completed install; resume begins at external and optional metadata validation' > "$out/resume-boundary.txt"

run resume-guide-version 120s node "$SCR/read-package-field.mjs" "$target/node_modules/@orkestrel/guide/package.json" version
test "$(<"$out/resume-guide-version.stdout.txt")" = 0.0.18 || fail 'current Guide install differs'
run resume-scaffold-version 120s node "$SCR/read-package-field.mjs" "$target/node_modules/@orkestrel/scaffold/package.json" version
test "$(<"$out/resume-scaffold-version.stdout.txt")" = 0.0.64 || fail 'current Scaffold install differs'
run resume-guide-dist 120s diff -r "$guidepack" "$target/node_modules/@orkestrel/guide/dist"
run resume-scaffold-dist 120s diff -r "$scaffoldpack" "$target/node_modules/@orkestrel/scaffold/dist"

run peer-meta-final 120s npm pkg get peerDependenciesMeta
cmp "$out/peer-meta-before.stdout.txt" "$out/peer-meta-final.stdout.txt" || fail 'peer metadata differs'
for key in "${toolchain[@]}"; do
	externalkey=$(printf '%s' "$key" | tr './@' '---')
	dependency=${key#*.}
	run "external-registry-$externalkey" 120s npm view "$dependency" version
	[[ "$(<"$out/external-registry-$externalkey.stdout.txt")" =~ ^[0-9]+\.[0-9]+\.[0-9]+([-.][[:alnum:].-]+)?$ ]] || fail "toolchain registry version is unsafe: $dependency"
	run "external-final-$externalkey" 120s npm pkg get "$key"
	test "$(<"$out/external-final-$externalkey.stdout.txt")" = "^$(<"$out/external-registry-$externalkey.stdout.txt")" || fail "toolchain range differs: $key"
done

if run registry-lock-local 120s rg -n -e 'file:|link:|workspace:|"link"[[:space:]]*:[[:space:]]*true' package.json package-lock.json; then
	fail 'manifest or lock has a local resolution'
fi
test "$(<"$out/registry-lock-local.exit.txt")" = 1 || fail 'local resolution scan failed'
run roots 120s npm ls --depth=0

for pair in "${runtime[@]}" 'devDependencies.@orkestrel/guide 0.0.18' 'devDependencies.@orkestrel/scaffold 0.0.64' 'devDependencies.@orkestrel/test 0.0.14' 'devDependencies.@orkestrel/probe 0.0.12'; do
	set -- $pair
	if [[ "$1" != *.* ]]; then key="dependencies.@orkestrel/$1"; else key="$1"; fi
	pin=$(printf '%s' "$key" | tr './@' '---')
	run "pin-$pin" 120s npm pkg get "$key"
	test "$(<"$out/pin-$pin.stdout.txt")" = "^$2" || fail "pin differs: $key"
done

baselinepattern=${baseline//./\\.}
requireAbsent self-version "(?<![0-9])$baselinepattern(?![0-9])"
for pair in "${priorranges[@]}"; do
	set -- $pair
	rangepattern=${2//./\\.}
	prior=$(printf '%s' "$1" | tr './@' '---')
	requireAbsent "prior-$prior" "(?<![0-9])\\^$rangepattern(?![0-9])"
done

run format 120s bash "$SCR/upper-layer-action.sh" "$package" format "$label-format" 120s
run prepublish 900s bash "$SCR/upper-layer-action.sh" "$package" prepublish "$label-prepublish" 900s
run pack 600s bash "$SCR/pack-dependent-final-verified.sh" "$package" "$label-pack" "$version" "$label-prepublish" "$baseline"
captureAfter
cmp "$out/authored-before.sha256" "$out/authored-after.sha256" || fail 'reviewed authored files moved during resume'
cmp "$out/prepared-head.stdout.txt" "$out/head-after.txt" || fail 'preparation HEAD moved during resume'
printf '%s\n' "$out"
