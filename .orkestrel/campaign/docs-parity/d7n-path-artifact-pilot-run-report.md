# d7n path artifact pilot run report

## Status

Authored the saved Git Bash launcher at `tmp/pass/path-artifact-pilot/run.sh`.
It was not executed.

## Source

```bash
#!/usr/bin/env bash
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
set -euo pipefail

PILOT="$SCR/path-artifact-pilot"
ARCHIVE="$SCR/packed/path-bootstrap.4ppVCf/orkestrel-scaffold-0.0.63.tgz"
EXPECTED="94cb80312c6ed57d78a0c67930d6c153fe2355be8c93df4f8429bd13306fed3b"

if [[ ! -f "$PILOT/package.json" ]]; then
	echo "Missing pilot manifest: $PILOT/package.json" >&2
	exit 1
fi

if [[ -e "$PILOT/node_modules" ]]; then
	echo "Pilot node_modules already exists: $PILOT/node_modules" >&2
	exit 1
fi

if [[ -e "$PILOT/package-lock.json" ]]; then
	echo "Pilot package-lock.json already exists: $PILOT/package-lock.json" >&2
	exit 1
fi

printf '%s  %s\n' "$EXPECTED" "$ARCHIVE" | sha256sum --check --status
EVIDENCE="$(mktemp -d "$SCR/path-artifact-pilot.XXXXXX")"
RESULT="$EVIDENCE/result"

printf '%s\n' "$EVIDENCE"
sha256sum "$PILOT/package.json" > "$EVIDENCE/package-before.sha256"
(
	cd "$PILOT"
	npm install --no-save --ignore-scripts --package-lock=false --no-audit --no-fund "$ARCHIVE" > "$EVIDENCE/install.stdout.txt" 2> "$EVIDENCE/install.stderr.txt"
)
sha256sum --check "$EVIDENCE/package-before.sha256"

if [[ -e "$PILOT/package-lock.json" ]]; then
	echo "Pilot installation created package-lock.json: $PILOT/package-lock.json" >&2
	exit 1
fi

set +e
(
	cd "$PILOT"
	node main.mjs "$RESULT" > "$EVIDENCE/pilot.stdout.txt" 2> "$EVIDENCE/pilot.stderr.txt"
)
STATUS=$?
set -e
printf '%s\n' "$STATUS" > "$EVIDENCE/pilot.exit.txt"

if [[ "$STATUS" -ne 0 ]]; then
	exit "$STATUS"
fi

printf '%s\n' "$EVIDENCE/package-before.sha256"
printf '%s\n' "$EVIDENCE/install.stdout.txt"
printf '%s\n' "$EVIDENCE/install.stderr.txt"
printf '%s\n' "$EVIDENCE/pilot.stdout.txt"
printf '%s\n' "$EVIDENCE/pilot.stderr.txt"
printf '%s\n' "$EVIDENCE/pilot.exit.txt"
```

## Validation

`bash -n tmp/pass/path-artifact-pilot/run.sh` exited `0`.

No installation or pilot execution ran.
