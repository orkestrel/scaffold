#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
target="$FLEET/lsp"
out="$SCR/$label"
guide="$SCR/packed/d7n-guide-upper-final-pack/orkestrel-guide-0.0.18.tgz"
scaffold="$SCR/packed/d7n-scaffold-guides-api-accepted/orkestrel-scaffold-0.0.64.tgz"

[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]]
test ! -e "$out"
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = '@orkestrel/lsp'
test "$(sha256sum "$guide" | cut -d ' ' -f 1)" = c3bcbc4fd28d66a38dab69741835fd434b64bb23c9f0d128707a3b88ee19daaa
test "$(sha256sum "$scaffold" | cut -d ' ' -f 1)" = 5d4aa6553555074692cd7cf87e224a360f753c86424926d85ccc559b28e1815c
mkdir "$out"
git -C "$target" rev-parse HEAD > "$out/head-before.txt"
git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-before.txt"
git -C "$target" diff HEAD --binary > "$out/diff-before.txt"
git -C "$target" ls-files --stage > "$out/index-before.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-before.sha256"
cp "$target/package.json" "$out/package-before.json"
status=0
if timeout --kill-after=15s 600s npm --prefix "$target" install --no-save --ignore-scripts "$guide" "$scaffold" @orkestrel/test@0.0.14 > "$out/install.stdout.txt" 2> "$out/install.stderr.txt"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$out/install.exit.txt"
git -C "$target" rev-parse HEAD > "$out/head-after.txt"
git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-after.txt"
git -C "$target" diff HEAD --binary > "$out/diff-after.txt"
git -C "$target" ls-files --stage > "$out/index-after.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-after.sha256"
cmp "$out/head-before.txt" "$out/head-after.txt"
cmp "$out/status-before.txt" "$out/status-after.txt"
cmp "$out/diff-before.txt" "$out/diff-after.txt"
cmp "$out/index-before.txt" "$out/index-after.txt"
cmp "$out/manifests-before.sha256" "$out/manifests-after.sha256"
test "$status" -eq 0
diff -r "$SCR/packed/d7n-guide-upper-final-pack/extract/package/dist" "$target/node_modules/@orkestrel/guide/dist" > "$out/guide-dist.diff.txt"
printf '0\n' > "$out/guide-dist.exit.txt"
diff -r "$SCR/packed/d7n-scaffold-guides-api-accepted/extract/package/dist" "$target/node_modules/@orkestrel/scaffold/dist" > "$out/scaffold-dist.diff.txt"
printf '0\n' > "$out/scaffold-dist.exit.txt"
node "$SCR/read-package-field.mjs" "$target/node_modules/vscode-languageserver-protocol/package.json" version > "$out/protocol-version.txt"
printf '%s\n' "$out"
