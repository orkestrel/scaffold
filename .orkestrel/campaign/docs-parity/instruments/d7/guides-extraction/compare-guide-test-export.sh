#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCR/d7n-guide-setup-export-artifact"
test -f "$out/artifact.json"
diff -r "$SCR/packed/d7n-guide-api-correction/extract/package/dist/src" "$FLEET/guide/dist/src" > "$out/full-dist.diff.txt"
diff -r "$FLEET/guide/dist/src" "$SCAFFOLD/node_modules/@orkestrel/guide/dist/src" > "$out/full-installed.diff.txt"
cmp "$SCR/packed/d7n-guide-api-correction/extract/package/README.md" "$FLEET/guide/README.md"
printf '0\n' > "$out/full-dist.exit.txt"
printf 'Packed, canonical and installed dist/src trees are byte-equal.\n'
