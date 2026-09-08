#!/usr/bin/env bash
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
set -euo pipefail

ISOLATED="$SCR/scaffold-path"
EVIDENCE="$(mktemp -d "$SCR/packed/path-bootstrap.XXXXXX")"
ARCHIVE="$EVIDENCE/orkestrel-scaffold-0.0.63.tgz"

if [[ ! -d "$ISOLATED" ]]; then
	echo "Missing isolated worktree: $ISOLATED" >&2
	exit 1
fi

for PATHNAME in \
	"$ISOLATED/dist/host/manifest.json" \
	"$ISOLATED/dist/host/tests/setupPolicy.ts" \
	"$ISOLATED/dist/host/tests/config.test.ts" \
	"$ISOLATED/dist/src/core/index.js"; do
	if [[ ! -f "$PATHNAME" ]]; then
		echo "Missing required build artifact: $PATHNAME" >&2
		exit 1
	fi
done

cmp "$ISOLATED/tests/setupPolicy.ts" "$SCAFFOLD/tests/setupPolicy.ts"
cmp "$ISOLATED/tests/config.test.ts" "$SCAFFOLD/tests/config.test.ts"

printf '%s\n' "$EVIDENCE"
git -C "$ISOLATED" rev-parse HEAD > "$EVIDENCE/git-head.txt"
git -C "$ISOLATED" status --short > "$EVIDENCE/git-status.txt"
sha256sum "$ISOLATED/package.json" "$ISOLATED/package-lock.json" > "$EVIDENCE/source-checksums.sha256"

(
	cd "$ISOLATED"
	npm pack --ignore-scripts --json --pack-destination "$EVIDENCE" > "$EVIDENCE/npm-pack.stdout.txt" 2> "$EVIDENCE/npm-pack.stderr.txt"
)

if [[ ! -f "$ARCHIVE" ]]; then
	echo "Missing packed artifact: $ARCHIVE" >&2
	exit 1
fi

sha256sum "$ARCHIVE" > "$EVIDENCE/artifact.sha256"
tar -tf "$ARCHIVE" > "$EVIDENCE/tar-members.txt"
tar -xOf "$ARCHIVE" package/package.json > "$EVIDENCE/packed-manifest.json"
tar -xOf "$ARCHIVE" package/dist/host/manifest.json > "$EVIDENCE/packed-host-manifest.json"
sha256sum "$EVIDENCE/packed-host-manifest.json" > "$EVIDENCE/packed-host-manifest.sha256"
tar -xOf "$ARCHIVE" package/dist/host/tests/setupPolicy.ts | sha256sum > "$EVIDENCE/packed-setup-policy.sha256"
tar -xOf "$ARCHIVE" package/dist/host/tests/config.test.ts | sha256sum > "$EVIDENCE/packed-config-test.sha256"

sha256sum --check "$EVIDENCE/source-checksums.sha256"
printf '%s\n' "$EVIDENCE"
cat "$EVIDENCE/source-checksums.sha256"
cat "$EVIDENCE/artifact.sha256"
cat "$EVIDENCE/packed-host-manifest.sha256"
cat "$EVIDENCE/packed-setup-policy.sha256"
cat "$EVIDENCE/packed-config-test.sha256"
