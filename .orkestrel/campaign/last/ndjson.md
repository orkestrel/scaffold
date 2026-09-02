# Last changes: ndjson

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `293ed4a`, merge base with `origin/main` `0c5ed69`, layer L1, declared version 0.0.8, registry version 0.0.8.

## Commits since origin/main

```text
049aa60 2026-08-28 Update every dependency to the published latest
d354cd0 2026-08-28 Adopt the catalog and guide mirrors for the wave
08bdf24 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
26f06a7 2026-09-01 Apply the verified src-audit fixes
1d50483 2026-09-01 Adopt the renamed guide helpers in the parity test
ead03a1 2026-09-02 Apply the breaking rows in ndjson
e4a88c9 2026-09-02 Point the README at the guide that exists and state the declared engine floor
73a203b 2026-09-02 Point the README at the guide the package ships
293ed4a 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md         | 17 +++++++++--------
 README.md                           |  8 ++++----
 package.json                        |  6 +++---
 src/core/NDJSONParser.ts            | 14 +++++---------
 src/core/factories.ts               |  2 +-
 src/core/types.ts                   | 16 ++++++++++++----
 tests/guides.test.ts                | 22 +++++++++++-----------
 tests/src/core/NDJSONParser.test.ts | 33 +++++++++++++++++----------------
 tests/src/core/factories.test.ts    |  4 ++--
 9 files changed, 64 insertions(+), 58 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/types.ts b/src/core/types.ts
index 1736a97..125d4cc 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,15 +1,23 @@
 /**
- * A stateful NDJSON (newline-delimited JSON) stream parser: feed it string
+ * Represents a stateful NDJSON (newline-delimited JSON) stream parser: feed it string
  * chunks, get back the complete JSON objects decoded so far. A trailing partial
  * line is buffered until the rest arrives.
  */
 export interface NDJSONParserInterface {
 	/**
-	 * Append `chunk`, then return every COMPLETE `\n`-terminated line parsed to a
+	 * Appends `chunk`, then returns every COMPLETE `\n`-terminated line parsed to a
 	 * record (malformed / non-object lines are skipped); a trailing partial line
 	 * is retained for the next call.
+	 *
+	 * @param chunk - Stream text appended to the internal buffer before splitting
+	 * @returns Every complete line parsed to a record, in arrival order
 	 */
 	parse(chunk: string): ReadonlyArray<Record<string, unknown>>
-	/** Drop any buffered partial line - reset for a fresh stream. */
-	reset(): void
+	/**
+	 * Drops any buffered partial line, leaving the handle ready for a fresh
+	 * stream.
+	 *
+	 * @returns Nothing
+	 */
+	clear(): void
 }
```
