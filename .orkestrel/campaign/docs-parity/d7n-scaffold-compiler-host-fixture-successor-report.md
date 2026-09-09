# Compiler host fixture

Changed `tests/src/core/Compiler.test.ts` inside `emits every selected group through its correct origin`.

```diff
-				'scripts/deps.sh',
-				'scripts/cursor.sh',
-				'scripts/codex.sh',
-				'scripts/ollama.sh',
+				'scripts',
```

Focused validation used `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/pass/scaffold-compiler-host-fixture/validate.sh`. The focused command exited `0`; its raw output is `tmp/pass/scaffold-compiler-host-fixture/focused.log.txt`, and its receipt is `tmp/pass/scaffold-compiler-host-fixture/focused.exit.txt`.

Scoped conformance exited `0`: `oxlint` recorded `tmp/pass/scaffold-compiler-host-fixture/lint.log.txt` and `lint.exit.txt`; `oxfmt --check` recorded `tmp/pass/scaffold-compiler-host-fixture/format.log.txt` and `format.exit.txt`.

No unresolved result remains in this fixture scope.
