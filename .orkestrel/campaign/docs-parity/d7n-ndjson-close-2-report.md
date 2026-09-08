# Report — `d7n-ndjson-close-2` (ndjson: the closing checker's findings)

## Item 1 — Ruling 21 fence lead-in

```diff
diff --git a/guides/ndjson.md b/guides/ndjson.md
index 71a9182..6e7a946 100644
--- a/guides/ndjson.md
+++ b/guides/ndjson.md
@@ -45,6 +45,9 @@ and a type alias's own type literal with a union's arms escaped as `\|`.
 | ----------------------- | --------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
 | `NDJSONParserInterface` | interface | `{} plus parse, clear` | Represents the stateful NDJSON (newline-delimited JSON) stream-parser contract a consumer holds — a `parse` that turns each string chunk into the complete records decoded so far, and a `clear` that drops the buffered partial line. |
 
+Types a helper's parameter as `NDJSONParserInterface` and returns the records
+its `parse` call completes:
+
 ```ts
 import type { NDJSONParserInterface } from '@orkestrel/ndjson'
```

`tests/guides.test.ts` carries no diff: `git status --short` shows no change to it.

## Acceptance criteria

1. `git status --short` — `M guides/ndjson.md` (owned file only).
2. `grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/ndjson.md` — no output. `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/ndjson.md` — no output. `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` — no output.
3. `npx oxfmt --config .oxfmtrc.json --check guides/ndjson.md tests/guides.test.ts` — `All matched files use the correct format.` exit 0. `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` — exit 0, no output.
4. `PATH=/opt/npm11/bin:$PATH npm run docs` — `rows read: 1, disagreements found: 0`. `npm run docs -- --to guide` — `rows read: 1, disagreements found: 0, written: 0, reported: 0`. `npm run docs -- --to source` — `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` — `Test Files  1 passed (1)`, `Tests  31 passed (31)`, `Duration  425ms`, exit 0.
