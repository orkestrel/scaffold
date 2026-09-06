#!/usr/bin/env bash
# Write one phase-A visit brief per fleet checkout from the template, filling the package, its faces, and its carries.
# Usage: generate-visit-briefs.sh <scaffold-range-recorded> [package ...]  (no package list = every checkout under /home/user/fleet)
set -eu
SP=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6
RANGE=$1; shift
if [ $# -eq 0 ]; then set -- $(ls /home/user/fleet/); fi
for n in "$@"; do
  d=/home/user/fleet/$n
  faces=$(ls "$d"/configs/src/vite.*.config.ts 2>/dev/null | sed -E 's|.*/vite\.([a-z]+)\.config\.ts|\1|' | grep -v '^bin$' | tr '\n' ' ' | sed 's/ $//')
  extra=""
  case "$n" in
    probe) extra="\`configs/src/vite.bin.config.ts\` carries no \`dts(\` call and stays as it is. This checkout is the \`@orkestrel/probe\` package itself, so its own \`@orkestrel/probe\` range does not exist and its \`peerDependencies.typescript\` stays \`^6.0.3\`." ;;
    database) extra="\`tests/setupServer.ts\` and \`tests/setupServer.test.ts\` import \`typescript\` and are U10's, off-limits here; \`lint:check\` reddens on them under the head start's restriction, so report that red as the expected standing condition and do not stop on it." ;;
    lsp) extra="\`tests/setupConformance.ts\` imports \`typescript\` and is U11's, off-limits here; \`lint:check\` reddens on it under the head start's restriction, so report that red as the expected standing condition and do not stop on it." ;;
    browser) extra="A prior run of this brief completed steps 2 and 3 (the manifest row is gone and both face configs call \`declarationRollup\`) and was refused the deletion; the Orchestrator then removed the old proof and ran \`repair\` and \`audit\` (no drift), so \`tests/distribution.test.ts\` is already regenerated when you start and \`git status --short\` shows the prior run's edits. Confirm each of those states rather than redoing them, run \`audit --offline\` yourself, then continue from step 5." ;;
    codec) extra="\`tests/setupServer.ts\` and \`tests/setupServer.test.ts\` import \`node:vm\`, which the lint restriction does not name and the exit criterion does not reach; leave them." ;;
  esac
  mkdir -p "$d/tmp/units" "$SP/visits/briefs"
  sed -e "s|<PACKAGE>|$n|g" -e "s|<FACES>|$faces|g" -e "s|<SCAFFOLD_RANGE>|$RANGE|g" -e "s|<EXTRA>|$extra|g" "$SP/visits/visit-brief-template.md" > "$SP/visits/briefs/ts6-u12-visit-$n-brief.md"
  cp "$SP/visits/briefs/ts6-u12-visit-$n-brief.md" "$d/tmp/units/ts6-u12-visit-brief.md"
  vextra=""
  case "$n" in
    database) vextra="Step 6 is expected red on \`tests/setupServer.ts\` and \`tests/setupServer.test.ts\` alone (U10's importers); report that red as the standing condition and let it decide the terminal line only if another file is named." ;;
    lsp) vextra="Step 6 is expected red on \`tests/setupConformance.ts\` alone (U11's importer); report that red as the standing condition and let it decide the terminal line only if another file is named." ;;
  esac
  sed -e "s|<PACKAGE>|$n|g" -e "s|<EXTRA>|$vextra|g" "$SP/visits/visit-verify-template.md" > "$SP/visits/briefs/ts6-u12-visit-$n-verify-brief.md"
  cp "$SP/visits/briefs/ts6-u12-visit-$n-verify-brief.md" "$d/tmp/units/ts6-u12-visit-verify-brief.md"
  echo "$n: faces=[$faces] extra=$([ -n "$extra" ] && echo yes || echo no)"
done
