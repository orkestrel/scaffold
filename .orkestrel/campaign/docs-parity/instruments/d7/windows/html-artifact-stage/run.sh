#!/usr/bin/env bash
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
set -euo pipefail

HTML="$FLEET/html"
EXPECTED='0b953169d8a541a8b2bc91f0170c301bd5b9cdca'
BRANCH='claude/orkestrel-npm-audit-deps-14ibta'
CONTRACT_TARBALL="$SCR/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz"
CONTRACT_HASH='88ef71a590f33edd9dc28bbdf65dc30ce9e2251fd9805807bb94bef0adcbca5a'
GUIDE_TARBALL="$SCR/packed/d7n-guide-bootstrap.47Q7XT/orkestrel-guide-0.0.18.tgz"
GUIDE_HASH='3a60e83f4c6319f029106f3d9588ed186639f72c222a34045326439cfff73519'
TEST_TARBALL="$SCR/packed/d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz"
TEST_HASH='d6ae5e57126d370b3316b528a8bd6dafaf2b64d9bdf52e73fead78065f7c5002'
ROOT="$SCAFFOLD/tmp/pass/html-artifact-stage"
STAGE=$(mktemp -d "$SCAFFOLD/tmp/pass/d7n-html-stage.XXXXXX")
LOGS="$STAGE/logs"
COPY="$STAGE/html"
CONSUMER="$STAGE/consumer"
PACKED="$STAGE/packed"
EXTRACTED="$STAGE/extracted"
CONTRACT_EXTRACT="$STAGE/contract"
REPAIR="$STAGE/repair"
mkdir -p "$LOGS" "$COPY" "$PACKED" "$EXTRACTED" "$CONSUMER" "$CONTRACT_EXTRACT"
printf '%s\n' "$STAGE"

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
	git -C "$HTML" status --porcelain=v1 --untracked-files=all >"$LOGS/status-after.txt"
	git -C "$HTML" diff --binary >"$LOGS/diff-after.txt"
	sha256sum "$HTML/package.json" >"$LOGS/manifest-after.sha256"
	sha256sum "$HTML/package-lock.json" >"$LOGS/lock-after.sha256"
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

[ -d "$HTML/.git" ] || { printf '%s\n' 'Missing HTML checkout.' >&2; exit 1; }
[ -z "$(git -C "$HTML" status --porcelain=v1 --untracked-files=all)" ] || { printf '%s\n' 'HTML checkout is dirty.' >&2; exit 1; }
[ "$(git -C "$HTML" branch --show-current)" = "$BRANCH" ] || { printf '%s\n' 'HTML branch differs from the campaign branch.' >&2; exit 1; }
[ "$(git -C "$HTML" rev-parse HEAD)" = "$EXPECTED" ] || { printf '%s\n' 'HTML HEAD differs from the measured commit.' >&2; exit 1; }
git -C "$HTML" status --porcelain=v1 --untracked-files=all >"$LOGS/status-before.txt"
git -C "$HTML" diff --binary >"$LOGS/diff-before.txt"
sha256sum "$HTML/package.json" >"$LOGS/manifest-before.sha256"
sha256sum "$HTML/package-lock.json" >"$LOGS/lock-before.sha256"

run fetch git -C "$HTML" fetch origin
git -C "$HTML" merge-base --is-ancestor origin/main HEAD || { printf '%s\n' 'origin/main is not an ancestor of HTML HEAD.' >&2; exit 1; }
[ -z "$(git -C "$HTML" status --porcelain=v1 --untracked-files=all)" ] || { printf '%s\n' 'HTML checkout changed after fetch.' >&2; exit 1; }
[ "$(git -C "$HTML" branch --show-current)" = "$BRANCH" ] || { printf '%s\n' 'HTML branch changed after fetch.' >&2; exit 1; }
[ "$(git -C "$HTML" rev-parse HEAD)" = "$EXPECTED" ] || { printf '%s\n' 'HTML HEAD changed after fetch.' >&2; exit 1; }
run view npm view @orkestrel/html version versions --json

printf '%s  %s\n' "$CONTRACT_HASH" "$CONTRACT_TARBALL" | sha256sum --check --status
printf '%s  %s\n' "$GUIDE_HASH" "$GUIDE_TARBALL" | sha256sum --check --status
printf '%s  %s\n' "$TEST_HASH" "$TEST_TARBALL" | sha256sum --check --status
run archive git -C "$HTML" archive --format=tar -o "$STAGE/html.tar" "$EXPECTED"
run extract tar -xf "$STAGE/html.tar" -C "$COPY"
run repository git -C "$COPY" init
run contract-extract tar -xzf "$CONTRACT_TARBALL" -C "$CONTRACT_EXTRACT"

run ci npm --prefix "$COPY" ci --ignore-scripts
run repair node "$SCAFFOLD/tmp/pass/path-artifact-pilot/html.mjs" "$STAGE" "$COPY" "$REPAIR"
run mutate node "$ROOT/mutate.mjs" "$COPY/package.json" "$LOGS/view.log.txt"
sha256sum "$COPY/package.json" >"$LOGS/copy-manifest.sha256"
sha256sum "$COPY/package-lock.json" >"$LOGS/copy-lock.sha256"
run install npm --prefix "$COPY" install --no-save --ignore-scripts --package-lock=false "$CONTRACT_TARBALL" "$GUIDE_TARBALL" "$TEST_TARBALL"
sha256sum --check "$LOGS/copy-manifest.sha256"
sha256sum --check "$LOGS/copy-lock.sha256"
run installed node "$ROOT/inspect.mjs" "$COPY/package.json"
if run nested npm --prefix "$COPY" ls --all; then
	:
else
	printf '%s\n' 'npm ls reported the expected bootstrap invalid-range observation.' >>"$LOGS/nested.log.txt"
fi
run format npm --prefix "$COPY" run format:check
run lint npm --prefix "$COPY" run lint:check
run check npm --prefix "$COPY" run check
run build npm --prefix "$COPY" run build
run test npm --prefix "$COPY" test
sha256sum --check "$LOGS/copy-manifest.sha256"
sha256sum --check "$LOGS/copy-lock.sha256"

cd "$COPY"
run pack npm pack --ignore-scripts --pack-destination "$PACKED"
HTML_TARBALL="$PACKED/orkestrel-html-0.0.9.tgz"
[ -f "$HTML_TARBALL" ] || { printf '%s\n' 'HTML staging tarball is missing.' >&2; exit 1; }
sha256sum "$HTML_TARBALL" >"$LOGS/html-artifact.sha256"
run artifact-extract tar -xzf "$HTML_TARBALL" -C "$EXTRACTED"
cmp "$EXTRACTED/package/package.json" "$COPY/package.json"
diff -qr "$EXTRACTED/package/dist" "$COPY/dist" >"$LOGS/dist-diff.txt"
node "$ROOT/metadata.mjs" "$LOGS/metadata.json" "$EXPECTED" "$HTML_TARBALL" "$CONTRACT_TARBALL" "$GUIDE_TARBALL" "$TEST_TARBALL" "$CONTRACT_HASH" "$GUIDE_HASH" "$TEST_HASH"
sha256sum --check "$LOGS/copy-manifest.sha256"
sha256sum --check "$LOGS/copy-lock.sha256"

cp "$ROOT/consumer-package.json" "$CONSUMER/package.json"
cp "$ROOT/smoke.mjs" "$CONSUMER/smoke.mjs"
cp "$ROOT/smoke.cjs" "$CONSUMER/smoke.cjs"
cp "$ROOT/functions.cjs" "$CONSUMER/functions.cjs"
run consumer-install npm --prefix "$CONSUMER" install --no-save --ignore-scripts --package-lock=false --no-audit --no-fund "$CONTRACT_TARBALL" "$HTML_TARBALL"
cd "$CONSUMER"
run smoke-esm node smoke.mjs "$CONTRACT_EXTRACT/package"
run smoke-cjs node smoke.cjs "$CONTRACT_EXTRACT/package"
printf '%s\n' 'test:distribution not run: Contract ^0.0.17 is not registry-served.' >"$LOGS/registry-final.txt"
