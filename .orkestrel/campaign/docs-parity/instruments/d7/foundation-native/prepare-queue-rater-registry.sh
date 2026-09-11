#!/usr/bin/env bash
set -euo pipefail

# Predecessor: prepare-native-consumer-registry-final.sh
# Scope: Queue and Rater registry preparation.

# Predecessor: prepare-native-consumer-registry.sh
# Correction: bind prior-range validation and searches to replaced ranges.

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
label=${2-}
target="$FLEET/$package"
out="$SCR/$label"
guide="$FLEET/guide"
scaffold="$SCAFFOLD"
verdict="$SCAFFOLD/.orkestrel/campaign/docs-parity/d7n-queue-rater-native-source-verdict.md"
guidepack="$SCR/packed/d7n-guide-registry-native-pack/extract/package/dist"
scaffoldpack="$SCR/packed/d7n-scaffold-upper-git-final-pack/extract/package/dist"

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

run() {
	local name="$1"
	local cap="$2"
	local status=0
	shift 2
	if (cd "$target" && timeout --kill-after=15s "$cap" "$@") > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	printf '%q ' "$@" >> "$out/commands.txt"
	printf '\n' >> "$out/commands.txt"
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
	sha256sum "$target/guides/$package.md" "$target/tests/guides.test.ts" > "$out/authored-$suffix.sha256"
}

requireAbsent() {
	local name="$1"
	local pattern="$2"
	if run "$name" 120s rg -n -P "$pattern" src tests; then
		fail "self-pin search found a required edit: $name"
	fi
	test "$(<"$out/$name.exit.txt")" = 1 || fail "self-pin search failed: $name"
}

case "$package" in
	queue)
		expected=0eb2177ecc4dd098eadedf2cafab0a0a72029229
		version=0.0.13
		baseline=0.0.12
		runtime=('abort 0.0.10' 'contract 0.0.17' 'database 0.0.14' 'emitter 0.0.10' 'timeout 0.0.10')
		priorruntime=('abort 0.0.9' 'contract 0.0.16' 'database 0.0.13' 'emitter 0.0.9' 'timeout 0.0.9')
		;;
	rater)
		expected=86fe697199e83d124b414f7e421acaae67bc51c4
		version=0.0.14
		baseline=0.0.13
		runtime=('contract 0.0.17' 'emitter 0.0.10' 'reason 0.0.10')
		priorruntime=('contract 0.0.16' 'emitter 0.0.9' 'reason 0.0.9')
		;;
	*) fail 'package is not Queue or Rater' ;;
esac

priorpins=(
	"${priorruntime[@]}"
	'guide 0.0.17'
	'scaffold 0.0.63'
	'test 0.0.13'
	'probe 0.0.12'
)
priorranges=(
	"${priorruntime[@]}"
	'guide 0.0.17'
	'scaffold 0.0.63'
	'test 0.0.13'
)

[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label is unsafe'
test -d "$target/.git" || fail 'canonical target is absent'
test ! -e "$out" || fail 'evidence exists'
test -f "$verdict" || fail 'preserved source verdict is absent'
grep -Fx 'VERDICT: PASS' "$verdict" > /dev/null || fail 'preserved source verdict does not pass'
mkdir "$out"

run branch 120s git -C "$target" branch --show-current
test "$(<"$out/branch.stdout.txt")" = claude/orkestrel-npm-audit-deps-14ibta || fail 'campaign branch differs'
run head 120s git -C "$target" rev-parse HEAD
test "$(<"$out/head.stdout.txt")" = "$expected" || fail 'source HEAD differs'
run index 120s git -C "$target" diff --cached --quiet
test "$(<"$out/index.exit.txt")" = 0 || fail 'index differs'
run status 120s git -C "$target" status --porcelain=v1 --untracked-files=all
test ! -s "$out/status.stdout.txt" || fail 'tree differs'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail 'manifest name differs'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" version)" = "$version" || fail 'manifest version differs'
capture before

for pair in "${priorpins[@]}"; do
	set -- $pair
	if [[ "$1" = guide || "$1" = scaffold || "$1" = test || "$1" = probe ]]; then
		key="devDependencies.@orkestrel/$1"
	else
		key="dependencies.@orkestrel/$1"
	fi
	prior=$(printf '%s' "$key" | tr './@' '---')
	run "prior-$prior" 120s npm pkg get "$key"
	test "$(<"$out/prior-$prior.stdout.txt")" = "^$2" || fail "prior range differs: $key"
done

for pair in "$package $baseline" 'guide 0.0.18' 'scaffold 0.0.64' 'test 0.0.14' 'probe 0.0.12' "${runtime[@]}"; do
	set -- $pair
	run "registry-$1" 120s npm view "@orkestrel/$1" version
	test "$(<"$out/registry-$1.stdout.txt")" = "$2" || fail "registry version differs: $1"
done

for suffix in lock install format prepublish; do
	test ! -e "$SCR/$label-$suffix" || fail "action evidence exists: $label-$suffix"
done
test ! -e "$SCR/packed/$label-pack" || fail "packing evidence exists: $label-pack"
run fetch 120s git -C "$target" fetch origin
run ancestry 120s git -C "$target" merge-base --is-ancestor origin/main HEAD

run install-dev 600s npm install --save-dev --ignore-scripts @orkestrel/guide@^0.0.18 @orkestrel/scaffold@^0.0.64 @orkestrel/test@^0.0.14
runtimeinstall=()
for pair in "${runtime[@]}"; do
	set -- $pair
	runtimeinstall+=("@orkestrel/$1@^$2")
done
run install-runtime 600s npm install --save-prod --ignore-scripts "${runtimeinstall[@]}"
run changed 120s git -C "$target" diff --name-only
while IFS= read -r path; do
	case "$path" in
		package.json|package-lock.json) ;;
		*) fail "unexpected install path: $path" ;;
	esac
done < "$out/changed.stdout.txt"
run guide-version 120s node "$SCR/read-package-field.mjs" "$target/node_modules/@orkestrel/guide/package.json" version
test "$(<"$out/guide-version.stdout.txt")" = 0.0.18 || fail 'Guide install differs'
run scaffold-version 120s node "$SCR/read-package-field.mjs" "$target/node_modules/@orkestrel/scaffold/package.json" version
test "$(<"$out/scaffold-version.stdout.txt")" = 0.0.64 || fail 'Scaffold install differs'
run guide-dist 120s diff -r "$guidepack" "$target/node_modules/@orkestrel/guide/dist"
run scaffold-dist 120s diff -r "$scaffoldpack" "$target/node_modules/@orkestrel/scaffold/dist"
run add 120s git -C "$target" add -- package.json package-lock.json
run commit 120s git -C "$target" -c user.name=Claude -c user.email=noreply@anthropic.com commit -m "Prepare $package against published tooling" -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743'
run prepared-head 120s git -C "$target" rev-parse HEAD
run push 120s git -C "$target" push origin HEAD:claude/orkestrel-npm-audit-deps-14ibta

run overwrite 180s node node_modules/@orkestrel/scaffold/dist/bin/main.js overwrite
run audit 180s node node_modules/@orkestrel/scaffold/dist/bin/main.js audit
run docs-delete 120s npm pkg delete scripts.docs
run native-manifest 120s node "$SCR/verify-upper-native-manifest.mjs" "$target/package.json"
test ! -e "$target/scripts/docs.ts" || fail 'docs script remains'
test ! -e "$target/scripts/guides.ts" || fail 'guides script remains'
run guide-mirror 120s cmp "$target/guides/guide.md" "$guide/guides/guide.md"
run scaffold-mirror 120s cmp "$target/guides/scaffold.md" "$scaffold/guides/scaffold.md"
sha256sum "$target/guides/$package.md" "$target/tests/guides.test.ts" > "$out/authored-after-overwrite.sha256"
cmp "$out/authored-before.sha256" "$out/authored-after-overwrite.sha256"

run lock 600s bash "$SCR/upper-layer-action.sh" "$package" lock "$label-lock" 600s
run install 600s bash "$SCR/upper-layer-action.sh" "$package" install "$label-install" 600s
run final-guide-version 120s node "$SCR/read-package-field.mjs" "$target/node_modules/@orkestrel/guide/package.json" version
test "$(<"$out/final-guide-version.stdout.txt")" = 0.0.18 || fail 'final Guide install differs'
run final-scaffold-version 120s node "$SCR/read-package-field.mjs" "$target/node_modules/@orkestrel/scaffold/package.json" version
test "$(<"$out/final-scaffold-version.stdout.txt")" = 0.0.64 || fail 'final Scaffold install differs'
run final-guide-dist 120s diff -r "$guidepack" "$target/node_modules/@orkestrel/guide/dist"
run final-scaffold-dist 120s diff -r "$scaffoldpack" "$target/node_modules/@orkestrel/scaffold/dist"
run roots 120s npm ls --depth=0

for pair in "${runtime[@]}" 'devDependencies.@orkestrel/guide 0.0.18' 'devDependencies.@orkestrel/scaffold 0.0.64' 'devDependencies.@orkestrel/test 0.0.14' 'devDependencies.@orkestrel/probe 0.0.12'; do
	set -- $pair
	if [[ "$1" != *.* ]]; then
		key="dependencies.@orkestrel/$1"
	else
		key="$1"
	fi
	pin=$(printf '%s' "$key" | tr './@' '---')
	run "pin-$pin" 120s npm pkg get "$key"
	test "$(<"$out/pin-$pin.stdout.txt")" = "^$2" || fail "pin differs: $key"
done

baselinepattern=${baseline//./\\.}
requireAbsent self-version "(?<![0-9])$baselinepattern(?![0-9])"
for pair in "${priorranges[@]}"; do
	set -- $pair
	rangepattern=${2//./\\.}
	requireAbsent "prior-$1" "(?<![0-9])\\^$rangepattern(?![0-9])"
done

run format 120s bash "$SCR/upper-layer-action.sh" "$package" format "$label-format" 120s
run prepublish 900s bash "$SCR/upper-layer-action.sh" "$package" prepublish "$label-prepublish" 900s
run pack 600s bash "$SCR/pack-upper-layer-final-verified.sh" "$package" "$label-pack" "$version" "$label-prepublish" "$baseline"
capture after
cmp "$out/prepared-head.stdout.txt" "$out/head-after.txt" || fail 'source commit moved after preparation'
printf '%s\n' "$out"
