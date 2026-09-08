#!/usr/bin/env bash
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
set -euo pipefail

ABORT="$FLEET/abort"
EXPECTED='3dad185df1df4168102c3f49905756e2d7861b6a'
BRANCH='claude/orkestrel-npm-audit-deps-14ibta'
CONTRACT_TARBALL="$SCR/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz"
CONTRACT_HASH='88ef71a590f33edd9dc28bbdf65dc30ce9e2251fd9805807bb94bef0adcbca5a'
GUIDE_TARBALL="$SCR/packed/d7n-guide-bootstrap.47Q7XT/orkestrel-guide-0.0.18.tgz"
GUIDE_HASH='3a60e83f4c6319f029106f3d9588ed186639f72c222a34045326439cfff73519'
ROOT="$SCAFFOLD/tmp/pass/contract-abort-stage"
PROBE=$(mktemp -d "$SCAFFOLD/tmp/probe/d7n-contract-abort-stage.XXXXXX")
LOGS="$PROBE/logs"
COPY="$PROBE/abort"
CONSUMER="$PROBE/consumer"
PACKED="$PROBE/packed"
CONTRACT_EXTRACT="$PROBE/contract"
mkdir -p "$LOGS" "$COPY" "$PACKED" "$CONSUMER" "$CONTRACT_EXTRACT"
printf '%s\n' "$PROBE"

run() {
	local name=$1
	shift
	local status
	{
		printf '+'
		printf ' %q' "$@"
		printf '\n'
		if "$@"; then status=0; else status=$?; fi
		printf 'exit=%s\n' "$status"
	} >"$LOGS/$name.log.txt" 2>&1
	return "$status"
}

finish() {
	local status=$1
	set +e
	git -C "$ABORT" status --porcelain=v1 --untracked-files=all >"$LOGS/status-after.txt"
	git -C "$ABORT" diff --binary >"$LOGS/diff-after.txt"
	sha256sum "$ABORT/package.json" >"$LOGS/manifest-after.sha256"
	sha256sum "$ABORT/package-lock.json" >"$LOGS/lock-after.sha256"
	if [ "$status" -eq 0 ]; then
		cmp "$LOGS/status-before.txt" "$LOGS/status-after.txt" || status=1
		cmp "$LOGS/diff-before.txt" "$LOGS/diff-after.txt" || status=1
		cmp "$LOGS/manifest-before.sha256" "$LOGS/manifest-after.sha256" || status=1
		cmp "$LOGS/lock-before.sha256" "$LOGS/lock-after.sha256" || status=1
	fi
	printf 'logs: %s\n' "$LOGS"
	exit "$status"
}

trap 'finish "$?"' EXIT

[ -d "$ABORT/.git" ] || { printf '%s\n' 'Missing Abort checkout.' >&2; exit 1; }
[ -z "$(git -C "$ABORT" status --porcelain=v1 --untracked-files=all)" ] || { printf '%s\n' 'Abort checkout is dirty.' >&2; exit 1; }
[ "$(git -C "$ABORT" branch --show-current)" = "$BRANCH" ] || { printf '%s\n' 'Abort branch differs from the campaign branch.' >&2; exit 1; }
[ "$(git -C "$ABORT" rev-parse HEAD)" = "$EXPECTED" ] || { printf '%s\n' 'Abort HEAD differs from the measured commit.' >&2; exit 1; }
git -C "$ABORT" status --porcelain=v1 --untracked-files=all >"$LOGS/status-before.txt"
git -C "$ABORT" diff --binary >"$LOGS/diff-before.txt"
sha256sum "$ABORT/package.json" >"$LOGS/manifest-before.sha256"
sha256sum "$ABORT/package-lock.json" >"$LOGS/lock-before.sha256"

run fetch git -C "$ABORT" fetch origin
git -C "$ABORT" merge-base --is-ancestor origin/main HEAD || { printf '%s\n' 'origin/main is not an ancestor of Abort HEAD.' >&2; exit 1; }
[ -z "$(git -C "$ABORT" status --porcelain=v1 --untracked-files=all)" ] || { printf '%s\n' 'Abort checkout changed after fetch.' >&2; exit 1; }
[ "$(git -C "$ABORT" branch --show-current)" = "$BRANCH" ] || { printf '%s\n' 'Abort branch changed after fetch.' >&2; exit 1; }
[ "$(git -C "$ABORT" rev-parse HEAD)" = "$EXPECTED" ] || { printf '%s\n' 'Abort HEAD changed after fetch.' >&2; exit 1; }

printf '%s  %s\n' "$CONTRACT_HASH" "$CONTRACT_TARBALL" | sha256sum --check --status
printf '%s  %s\n' "$GUIDE_HASH" "$GUIDE_TARBALL" | sha256sum --check --status
run archive git -C "$ABORT" archive --format=tar -o "$PROBE/abort.tar" "$EXPECTED"
run extract tar -xf "$PROBE/abort.tar" -C "$COPY"
run contract-extract tar -xzf "$CONTRACT_TARBALL" -C "$CONTRACT_EXTRACT"

run ci npm --prefix "$COPY" ci --ignore-scripts
run mutate node "$ROOT/mutate.mjs" "$COPY/package.json"
sha256sum "$COPY/package.json" >"$LOGS/copy-manifest.sha256"
run install npm --prefix "$COPY" install --no-save --ignore-scripts --package-lock=false "$CONTRACT_TARBALL" "$GUIDE_TARBALL"
sha256sum --check "$LOGS/copy-manifest.sha256"
run installed node "$ROOT/inspect.mjs" "$COPY/package.json" >"$LOGS/installed.txt"
run check npm --prefix "$COPY" run check:src
run build npm --prefix "$COPY" run build:src
run test npm --prefix "$COPY" run test:src
sha256sum --check "$LOGS/copy-manifest.sha256"

run pack npm --prefix "$COPY" pack --ignore-scripts --pack-destination "$PACKED"
ABORT_TARBALL="$PACKED/orkestrel-abort-0.0.10.tgz"
[ -f "$ABORT_TARBALL" ] || { printf '%s\n' 'Abort staging tarball is missing.' >&2; exit 1; }
sha256sum "$ABORT_TARBALL" >"$LOGS/abort-artifact.sha256"
tar -tf "$ABORT_TARBALL" >"$LOGS/abort-artifact-members.txt"
sha256sum --check "$LOGS/copy-manifest.sha256"

cp "$ROOT/consumer-package.json" "$CONSUMER/package.json"
cp "$ROOT/smoke.mjs" "$CONSUMER/smoke.mjs"
cp "$ROOT/smoke.cjs" "$CONSUMER/smoke.cjs"
cp "$ROOT/functions.cjs" "$CONSUMER/functions.cjs"
run consumer-install npm --prefix "$CONSUMER" install --no-save --ignore-scripts --package-lock=false --no-audit --no-fund "$CONTRACT_TARBALL" "$ABORT_TARBALL"
cd "$CONSUMER"
run smoke-esm node smoke.mjs "$CONTRACT_EXTRACT/package"
run smoke-cjs node smoke.cjs "$CONTRACT_EXTRACT/package"
