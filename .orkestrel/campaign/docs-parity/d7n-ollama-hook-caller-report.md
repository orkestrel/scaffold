Changed the CI and guide caller to `bash scripts/ollama.sh`.

```diff
diff --git a/.github/workflows/ci.yml b/.github/workflows/ci.yml
@@
-        run: bash scripts/service.sh
+        run: bash scripts/ollama.sh
diff --git a/guides/ollama.md b/guides/ollama.md
@@
-... `bash scripts/service.sh` brings the daemon and model up before the battery in CI.
+... `bash scripts/ollama.sh` brings the daemon and model up before the battery in CI.
```

`git diff --check` exited 0. No runtime checks run; Root owns propagation and live-service evidence.

```text
## claude/orkestrel-npm-audit-deps-14ibta...origin/claude/orkestrel-npm-audit-deps-14ibta
 M .github/workflows/ci.yml
 M guides/ollama.md
```
