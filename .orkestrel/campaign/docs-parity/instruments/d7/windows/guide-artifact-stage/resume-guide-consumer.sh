#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
STAGE="$SCR/d7n-guide-stage.MQbCaa"
ARTIFACT="$STAGE/packed/orkestrel-guide-0.0.18.tgz"
printf '%s  %s\n' 8828ee3dfecc15d72d863f82c938c95a64d4323aa4d674a2f620735e62c61afc "$ARTIFACT" | sha256sum --check --status
test -f "$STAGE/consumer/package.json"
cp "$SCR/guide-artifact-stage/smoke.mjs" "$STAGE/consumer/smoke.mjs"
cp "$SCR/guide-artifact-stage/smoke.cjs" "$STAGE/consumer/smoke.cjs"
cd "$STAGE/consumer"
node smoke.mjs "$STAGE/contract/package" "$STAGE/html-artifact/package" "$STAGE/markdown-artifact/package" "$STAGE/extracted/package" > "$STAGE/logs/smoke-esm-successor.log.txt" 2>&1
printf 'exit=0\n' >> "$STAGE/logs/smoke-esm-successor.log.txt"
node smoke.cjs "$STAGE/contract/package" "$STAGE/html-artifact/package" "$STAGE/markdown-artifact/package" "$STAGE/extracted/package" > "$STAGE/logs/smoke-cjs-successor.log.txt" 2>&1
printf 'exit=0\n' >> "$STAGE/logs/smoke-cjs-successor.log.txt"
printf '%s\n' 'test:distribution not run: staged runtime versions are not registry-served.' > "$STAGE/logs/registry-final.txt"
sha256sum --check "$STAGE/logs/copy-manifest.sha256"
sha256sum --check "$STAGE/logs/copy-lock.sha256"
git -C "$FLEET/guide" status --short
