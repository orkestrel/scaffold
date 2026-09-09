#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

guide="$FLEET/guide"
installed="$SCAFFOLD/node_modules/@orkestrel/guide"

sha256sum "$guide/dist/src/core/index.js" "$guide/dist/src/core/index.d.ts" "$installed/dist/src/core/index.js" "$installed/dist/src/core/index.d.ts"
cmp "$guide/dist/src/core/index.js" "$installed/dist/src/core/index.js"
cmp "$guide/dist/src/core/index.d.ts" "$installed/dist/src/core/index.d.ts"
