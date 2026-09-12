#!/usr/bin/env bash
set -euo pipefail

# Carrier: trial-ollama-hook.sh <label> <scaffold-tarball> <sha256>
# Purpose: stage the canonical Ollama tarball trial without publication or closure.

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
tarball=${2-}
digest=${3-}
target=C:/Users/mikes/WebstormProjects/ollama
out="$SCR/$label"
inspect="$out/inspect"

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
	run "branch-$suffix" 120s git -C "$target" branch --show-current
	run "head-$suffix" 120s git -C "$target" rev-parse HEAD
	run "status-$suffix" 120s git -C "$target" status --porcelain=v1 --untracked-files=all
	run "diff-$suffix" 120s git -C "$target" diff HEAD --binary
	run "index-$suffix" 120s git -C "$target" ls-files --stage
	run "manifests-$suffix" 120s sha256sum "$target/package.json" "$target/package-lock.json"
}

read_manifest_field() {
	local path="$1"
	local destination="$2"
	node --input-type=module -e "import { readFileSync } from 'node:fs'; const manifest=JSON.parse(readFileSync(process.argv[1],'utf8')); const entry=manifest.entries.find((candidate)=>candidate.destination===process.argv[2]); if (entry===undefined || typeof entry.storage!=='string') process.exit(1); process.stdout.write(entry.storage);" "$path" "$destination"
}

test "$#" = 3 || fail 'evidence label, Scaffold tarball, and archive digest are required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label is unsafe'
[[ "$digest" =~ ^[0-9a-f]{64}$ ]] || fail 'archive digest must be lowercase SHA-256 hexadecimal'
test ! -e "$out" || fail 'evidence output exists'
test -d "$target/.git" || fail 'canonical Ollama target is absent'
tarball=$(realpath -e "$tarball") || fail 'Scaffold tarball is absent'
packed=$(realpath -e "$SCR/packed") || fail 'packed evidence directory is absent'
case "$tarball" in "$packed"/*) ;; *) fail 'Scaffold tarball is outside packed evidence' ;; esac
test -f "$tarball" || fail 'Scaffold tarball is not a regular file'
mkdir "$out"
mkdir "$inspect"

run archive-digest 120s sha256sum "$tarball"
test "$(cut -d ' ' -f 1 "$out/archive-digest.stdout.txt")" = "$digest" || fail 'Scaffold tarball digest differs'
run archive-list 120s tar -tzf "$tarball"
run archive-extract 120s tar -xzf "$tarball" -C "$inspect"
package="$inspect/package"
test -d "$package" || fail 'Scaffold tarball package root is absent'
run archive-name 120s node "$SCR/read-package-field.mjs" "$package/package.json" name
test "$(<"$out/archive-name.stdout.txt")" = @orkestrel/scaffold || fail 'Scaffold tarball name differs'
run archive-version 120s node "$SCR/read-package-field.mjs" "$package/package.json" version
test "$(<"$out/archive-version.stdout.txt")" = 0.0.65 || fail 'Scaffold tarball version differs'

run branch-before 120s git -C "$target" branch --show-current
test "$(<"$out/branch-before.stdout.txt")" = claude/orkestrel-npm-audit-deps-14ibta || fail 'Ollama campaign branch differs'
run head-before 120s git -C "$target" rev-parse HEAD
test "$(<"$out/head-before.stdout.txt")" = 53e5fd2f34942f4d8462c22e6be6f04313849763 || fail 'Ollama source HEAD differs'
run index-before 120s git -C "$target" diff --cached --quiet
test "$(<"$out/index-before.exit.txt")" = 0 || fail 'Ollama index differs'
run status-before 120s git -C "$target" status --porcelain=v1 --untracked-files=all
expected_status=$'.github/workflows/ci.yml\nguides/ollama.md'
test "$(sed -e 's/^ M //' -e 's/^?? //' "$out/status-before.stdout.txt")" = "$expected_status" || fail 'Ollama dirty paths differ'
run manifest-name 120s node "$SCR/read-package-field.mjs" "$target/package.json" name
test "$(<"$out/manifest-name.stdout.txt")" = @orkestrel/ollama || fail 'Ollama manifest name differs'
run manifest-version 120s node "$SCR/read-package-field.mjs" "$target/package.json" version
test "$(<"$out/manifest-version.stdout.txt")" = 0.0.15 || fail 'Ollama pending version differs'
capture before
run fetch 120s git -C "$target" fetch origin
run ancestry 120s git -C "$target" merge-base --is-ancestor origin/main HEAD
test "$(<"$out/ancestry.exit.txt")" = 0 || fail 'Ollama main does not contain origin/main'

runtime=('agent 0.0.21' 'budget 0.0.10' 'contract 0.0.17' 'ndjson 0.0.10' 'timeout 0.0.10' 'tool 0.0.14')
development=('abort 0.0.10' 'guide 0.0.18' 'probe 0.0.13' 'router 0.0.14' 'scaffold 0.0.64' 'server 0.0.19' 'test 0.0.14' 'workspace 0.0.8')
for pair in "${runtime[@]}"; do
	set -- $pair
	run "prior-runtime-$1" 120s npm pkg get "dependencies.@orkestrel/$1"
	test "$(<"$out/prior-runtime-$1.stdout.txt")" != '{}' || fail "runtime dependency slot is absent: $1"
	run "registry-$1" 120s npm view "@orkestrel/$1" version
	test "$(<"$out/registry-$1.stdout.txt")" = "$2" || fail "registry version differs: $1"
	done
for pair in "${development[@]}"; do
	set -- $pair
	run "prior-development-$1" 120s npm pkg get "devDependencies.@orkestrel/$1"
	test "$(<"$out/prior-development-$1.stdout.txt")" != '{}' || fail "development dependency slot is absent: $1"
	run "registry-$1" 120s npm view "@orkestrel/$1" version
	test "$(<"$out/registry-$1.stdout.txt")" = "$2" || fail "registry version differs: $1"
done
run peer-meta-before 120s npm pkg get peerDependenciesMeta
run ollama-sdk-before 120s npm pkg get devDependencies.ollama
run external-sdk-before 120s node "$SCR/read-package-field.mjs" "$target/package.json" devDependencies.ollama

for pair in "${runtime[@]}"; do
	set -- $pair
	run "set-runtime-$1" 120s npm pkg set "dependencies.@orkestrel/$1=^$2"
done
for pair in "${development[@]}"; do
	set -- $pair
	run "set-development-$1" 120s npm pkg set "devDependencies.@orkestrel/$1=^$2"
done
run install-registry 600s npm install --ignore-scripts
run changed-registry 120s git -C "$target" diff --name-only
while IFS= read -r path; do
	case "$path" in .github/workflows/ci.yml|guides/ollama.md|package.json|package-lock.json) ;; *) fail "unexpected registry preparation path: $path" ;; esac
done < "$out/changed-registry.stdout.txt"
run add-registry 120s git -C "$target" add -- .github/workflows/ci.yml guides/ollama.md package.json package-lock.json
run commit-registry 120s git -C "$target" -c user.name=Claude -c user.email=noreply@anthropic.com commit -m 'Prepare Ollama against published tooling' -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743'
run prepared-head 120s git -C "$target" rev-parse HEAD
run declared-scaffold 120s npm pkg get devDependencies.@orkestrel/scaffold
run registry-lock 120s sha256sum "$target/package.json" "$target/package-lock.json"

run install-tarball 600s npm install --ignore-scripts --no-save "$tarball"
run tarball-lock 120s sha256sum "$target/package.json" "$target/package-lock.json"
cmp "$out/registry-lock.stdout.txt" "$out/tarball-lock.stdout.txt" || fail 'tarball install changed manifest or lock'
run installed-scaffold-version 120s node "$SCR/read-package-field.mjs" "$target/node_modules/@orkestrel/scaffold/package.json" version
test "$(<"$out/installed-scaffold-version.stdout.txt")" = 0.0.65 || fail 'installed Scaffold version differs'
run installed-dist 120s diff -r "$package/dist" "$target/node_modules/@orkestrel/scaffold/dist"
run overwrite 180s node node_modules/@orkestrel/scaffold/dist/bin/main.js overwrite --offline
overwrite_status=$(<"$out/overwrite.exit.txt")
if [ "$overwrite_status" != 0 ]; then
	test "$overwrite_status" = 1 || fail 'offline overwrite failed'
	rg -F 'catalog' "$out/overwrite.stdout.txt" "$out/overwrite.stderr.txt" > /dev/null || fail 'offline overwrite exit lacks catalog diagnostic'
fi
run audit 180s node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline
test "$(<"$out/audit.exit.txt")" = 0 || fail 'offline audit differs'

test ! -e "$target/scripts/service.sh" || fail 'service script exists'
test -f "$target/scripts/ollama.sh" || fail 'Ollama script is absent'
host_manifest="$package/dist/host/manifest.json"
test -f "$host_manifest" || fail 'packed host manifest is absent'
ollama_storage=$(read_manifest_field "$host_manifest" scripts/ollama.sh) || fail 'Ollama host storage is absent'
settings_storage=$(read_manifest_field "$host_manifest" .claude/settings.json) || fail 'settings host storage is absent'
run ollama-host 120s cmp "$target/scripts/ollama.sh" "$package/dist/host/$ollama_storage"
run settings-host 120s cmp "$target/.claude/settings.json" "$package/dist/host/$settings_storage"
test ! -e "$target/scripts/docs.ts" || fail 'docs script remains'
test ! -e "$target/scripts/guides.ts" || fail 'guides script remains'
if run docs-command 120s npm pkg get scripts.docs; then
	test "$(<"$out/docs-command.stdout.txt")" = '{}' || run delete-docs-command 120s npm pkg delete scripts.docs
fi
capture after
run declared-scaffold-after 120s npm pkg get devDependencies.@orkestrel/scaffold
run lock-after 120s sha256sum "$target/package.json" "$target/package-lock.json"
printf 'TRIAL: %s\n' "$out"
