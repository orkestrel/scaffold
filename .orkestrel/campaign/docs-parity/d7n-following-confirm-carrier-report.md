Created `tmp/pass/confirm-following-layer.sh`.

`bash -n tmp/pass/confirm-following-layer.sh` exit: `0`

`git diff --no-index` exit: `1` (expected: files differ)

```diff
diff --git a/tmp/pass/confirm-initial-layer.sh b/tmp/pass/confirm-following-layer.sh
index 67c9c46c..0ef1889e 100644
--- a/tmp/pass/confirm-initial-layer.sh
+++ b/tmp/pass/confirm-following-layer.sh
@@ -2,7 +2,9 @@
 set -euo pipefail
 source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
 
-out="$SCR/d7n-initial-layer-final-state"
+label=${1-}
+[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || { printf '%s\n' 'output label must be safe' >&2; exit 1; }
+out="$SCR/$label"
 test ! -e "$out"
 mkdir "$out"
 
@@ -10,8 +12,9 @@ confirm() {
 	local package="$1"
 	local version="$2"
 	local target="$FLEET/$package"
-	local packed="$SCR/packed/d7n-$package-publish-final"
-	local gated="$SCR/d7n-$package-final-prepublish"
+	local packed="$SCR/packed/d7n-$package-following-final-pack"
+	local gated="$SCR/d7n-$package-following-final-prepublish"
+	local closure="$SCR/d7n-$package-following-close"
 	local record="$out/$package"
 	mkdir "$record"
 	git -C "$target" fetch origin > "$record/fetch.stdout.txt" 2> "$record/fetch.stderr.txt"
@@ -26,7 +29,9 @@ confirm() {
 	test "$(node "$SCR/read-package-field.mjs" "$target/package.json" version)" = "$version"
 	test "$(<"$gated/action.exit.txt")" = 0
 	test "$(<"$packed/pack.exit.txt")" = 0
-	test "$(<"$packed/baseline-dist.diff-qr.exit.txt")" = 0
+	test "$(git -C "$target" rev-parse HEAD)" = "$(<"$closure/release-head.txt")"
+	test "$(<"$closure/final-manifest.exit.txt")" = 0
+	test "$(<"$closure/final-dist.exit.txt")" = 0
 	sha256sum --check "$packed/archive.sha256" > "$record/archive-check.txt"
 	sha256sum --check "$gated/manifests-after.sha256" > "$record/manifest-check.txt"
 	cmp "$packed/extract/package/package.json" "$target/package.json"
@@ -35,9 +40,15 @@ confirm() {
 	printf '%s %s main %s\n' "$package" "$version" "$(git -C "$target" rev-parse HEAD)"
 }
 
-confirm contract 0.0.17
-confirm codec 0.0.3
-confirm msg 0.0.10
-confirm sse 0.0.7
-confirm test 0.0.14
+confirm console 0.0.13
+confirm database 0.0.14
+confirm form 0.0.6
+confirm markdown 0.0.14
+confirm pool 0.0.11
+confirm process 0.0.11
+confirm reason 0.0.10
+confirm router 0.0.14
+confirm table 0.0.5
+confirm template 0.0.7
+confirm websocket 0.0.12
 printf '0\n' > "$out/confirmation.exit.txt"
```
