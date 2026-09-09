#!/usr/bin/env bash
# Direct-checkout successor of prepare-scaffold-guides.sh. No worktree creation or npm ci.
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
target="$SCAFFOLD"
evidence="$SCR/guides-direct-prepare"
test ! -e "$evidence"
mkdir -p "$evidence"
run() {
  local name=$1
  shift
  set +e
  "$@" > "$evidence/$name.log.txt" 2>&1
  local status=$?
  set -e
  printf '%s\n' "$status" > "$evidence/$name.exit.txt"
  return "$status"
}
contract="$SCR/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz"
html="$SCR/d7n-html-stage.FBOpkx/packed/orkestrel-html-0.0.9.tgz"
markdown="$SCR/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz"
guide="$SCR/d7n-guide-stage.MQbCaa/packed/orkestrel-guide-0.0.18.tgz"
testtar="$SCR/packed/d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz"
printf '%s  %s\n' '88ef71a590f33edd9dc28bbdf65dc30ce9e2251fd9805807bb94bef0adcbca5a' "$contract" > "$evidence/artifacts.sha256"
printf '%s  %s\n' '970077f8671a978c271e7a790b78a6b44772d1f60d4e944fc381526c916c334b' "$html" >> "$evidence/artifacts.sha256"
printf '%s  %s\n' '02c46ebab1a401365ba73aafc9b644b7d21cf8924ee104364138dada2b10f9c3' "$markdown" >> "$evidence/artifacts.sha256"
printf '%s  %s\n' '8828ee3dfecc15d72d863f82c938c95a64d4323aa4d674a2f620735e62c61afc' "$guide" >> "$evidence/artifacts.sha256"
printf '%s  %s\n' 'd6ae5e57126d370b3316b528a8bd6dafaf2b64d9bdf52e73fead78065f7c5002' "$testtar" >> "$evidence/artifacts.sha256"
run artifact-digests sha256sum -c "$evidence/artifacts.sha256"
sha256sum "$target/package.json" "$target/package-lock.json" > "$evidence/manifests.sha256"
run index-before git -C "$target" ls-files --stage -- package.json package-lock.json
run npm-artifacts npm --prefix "$target" install --no-save --ignore-scripts --package-lock=false "$contract" "$html" "$markdown" "$guide" "$testtar"
run manifest-preservation sha256sum -c "$evidence/manifests.sha256"
run index-after git -C "$target" ls-files --stage -- package.json package-lock.json
cmp "$evidence/index-before.log.txt" "$evidence/index-after.log.txt"
run identities node "$SCR/inspect-scaffold-guides.mjs" "$target"
sha256sum "$target/node_modules/@orkestrel/guide/dist/src/core/index.js" > "$evidence/guide.sha256"
printf '%s\n' "$evidence"

