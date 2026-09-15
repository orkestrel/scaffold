<!-- U4e-d — builder (Sonnet, native), mcp: the guide's server/discover reply comment advertises the tools family. Retained from the completion notification, 2026-09-15 (35 s, 7 tool uses). -->

The diff shows U4e's existing hunks unchanged plus exactly the named comment change (lines 92-93). No deviation.

## Report

**Before (line 3451):**
```
//   "capabilities":{"tools":{}},"resultType":"complete","ttlMs":60000,"cacheScope":"private",
//   "_meta":{"io.modelcontextprotocol/serverInfo":{"name":"docs","version":"1.0.0"}}}}
```

**After (lines 3451-3453):**
```
//   "capabilities":{"tools":{"listChanged":true}},"resultType":"complete","ttlMs":60000,
//   "cacheScope":"private",
//   "_meta":{"io.modelcontextprotocol/serverInfo":{"name":"docs","version":"1.0.0"}}}}
```

**Acceptance readings**

1. `npm run format:check` — exit 0. Output: "All matched files use the correct format."
2. `npm run test:guides` — exit 0. Output: "Test Files 1 passed (1); Tests 201 passed (201)."
3. `git diff HEAD -- guides/mcp.md` — shows only U4e's prior hunks plus this comment's three-line change (lines 92-93 of the diff, following the existing `//   "capabilities":{"tools":{"listChanged":true}}...` and new `"cacheScope":"private",` line). No other lines touched.

**Deviation state:** none. The quoted line was found exactly once; `test:guides` was green.

File changed: `C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md`
