#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
target="$FLEET/guide"
evidence="$SCR/guides-extraction/dependencies"
mkdir -p "$evidence"
contract="$SCR/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz"
html="$SCR/d7n-html-stage.FBOpkx/packed/orkestrel-html-0.0.9.tgz"
markdown="$SCR/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz"
testtar="$SCR/packed/d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz"
sha256sum "$contract" "$html" "$markdown" "$testtar" > "$evidence/artifacts.sha256"
sha256sum "$target/package.json" "$target/package-lock.json" > "$evidence/manifests.sha256"
git -C "$target" ls-files --stage -- package.json package-lock.json > "$evidence/index-before.txt"
timeout 600 npm --prefix "$target" install --no-save --ignore-scripts --package-lock=false "$contract" "$html" "$markdown" "$testtar" > "$evidence/install.log.txt" 2>&1
sha256sum -c "$evidence/manifests.sha256" > "$evidence/preservation.log.txt"
git -C "$target" ls-files --stage -- package.json package-lock.json > "$evidence/index-after.txt"
cmp "$evidence/index-before.txt" "$evidence/index-after.txt"
printf 'Guide dependency preparation completed\n'
