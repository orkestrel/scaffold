#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
exec > >(tee "$SCR/bootstrap/head-starts.log.txt") 2>&1
test "$(sha256sum "$FLEET/guide/dist/src/core/index.js" | cut -c1-8)" = 2b76b363
test -f "$SCR/packed/orkestrel-probe-0.0.13.tgz"
for pkg in probe agent ollama workflow program brief lsp toolbox database terminal mcp; do
  bash "$SCR/head-start.sh" "$pkg"
  test "$(sha256sum "$FLEET/$pkg/node_modules/@orkestrel/guide/dist/src/core/index.js" | cut -c1-8)" = 2b76b363
  if rg '^EXIT [1-9]' "$SCR/headstart/$pkg.log.txt"; then exit 1; fi
done
