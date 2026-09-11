Stopped on a fixture-byte deviation.

Expected: `app-only-toolchain.txt` to retain no terminal newline.
Found: the required value edits are present, but `apply_patch` added a terminal newline.
Evidence: the focused diff ends with:

```diff
-}
\ No newline at end of file
+}
```

The patch mechanism rejected the standard no-newline marker, so I did not use another edit path. No further changes were made after this finding.

Scoped formatter check passed:

```text
node node_modules/oxfmt/bin/oxfmt --check tests/src/bin/CLI.test.ts package.json
exit: 0
```
