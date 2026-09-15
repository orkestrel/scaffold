<!-- U4m — builder (Sonnet, native), mcp: the file header, one binding, one test name, one comment sentence (A4i reviewer R10–R13). Retained from the completion notification, 2026-09-15 (69 s, 23 tool uses). -->

27 paths, same set as expected. All acceptance criteria pass. No deviation.

## Report

**Touched files**

- `C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/ModelContext.test.ts:26-31` (R10 header) and `:219-220` (R11 binding)
- `C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/factories.test.ts:1327-1329` (R12 test name, R13 comment)
- `C:/Users/mikes/WebstormProjects/mcp/tests/src/browser/validators.test.ts:95-98` (R13 comment)

**Carrier 1 — R10, `ModelContext.test.ts:26-31`**

Before:
```
// src/browser/ModelContext.ts — the WebMCP bridge, driven in real Chromium against the
// IDL-faithful registry double. No browser exposes `document.modelContext` (the chromestatus
// record, read 2026-09-15 and last updated 2026-08-12, reports `Proposed` with `"flag": false`
// and `"origintrial": false`), so every scenario here proves the TRANSLATION and none of them
// claims the native integration; `factories.test.ts` records this page's own reading of the
// global.
```
After:
```
// src/browser/ModelContext.ts — the WebMCP bridge, driven in real Chromium against the
// IDL-faithful registry double. Every scenario against the double proves the TRANSLATION; the
// native block at the end of this file claims the integration where the host exposes the
// registry, and `factories.test.ts` holds this page's reading as the relationship between the
// property and what the factory returns. The dated reading of what browsers ship lives in the
// `## WebMCP parity` matrix in `guides/mcp.md`.
```

**Carrier 2 — R11, `ModelContext.test.ts:219-220`**

Before: `const pruned = fixture.registrations()…`; `expect(pruned.sort())…`
After: `const standing = fixture.registrations()…`; `expect(standing.sort())…`

**Carrier 3 — R12, `factories.test.ts:1327`**

Before: `it('builds a bridge exactly where this page exposes the registry', () => {`
After: `it('builds a bridge exactly where this page exposes the property', () => {`

**Carrier 4 — R13, `factories.test.ts:1328` and `validators.test.ts:96`**

`factories.test.ts` before: `// The relationship rather than the reading, so this holds on any host: the factory\n// answers a bridge exactly where the page carries the property. A host shipping the`
After: `// The assertion pins the relationship rather than the reading, so it holds on any host: the\n// factory answers a bridge exactly where the page carries the property. A host shipping the`

`validators.test.ts` before: `// The relationship rather than the reading, so this holds on any host: the guard accepts\n// this page exactly where it carries the property. A host shipping the property under a`
After: `// The assertion pins the relationship rather than the reading, so it holds on any host: the\n// guard accepts this page exactly where it carries the property. A host shipping the property\n// under a shape the guard refuses reddens here rather than reporting a refusal that reads\n// like the ordinary absence.`

**Acceptance readings**

1. `npm run format:check` — exit 0, "All matched files use the correct format."
2. `npm run lint:check` — exit 0, no output (clean).
3. `npm run test:src:browser -- tests/src/browser/ModelContext.test.ts tests/src/browser/factories.test.ts tests/src/browser/validators.test.ts` — exit 0, "Test Files 3 passed (3)", "Tests 129 passed | 2 skipped (131)".
4. Search results: `exposes the registry'` — none in `src`, `tests`, `guides`. `records this page's own reading` — none. `The relationship rather than the reading` — none. `const pruned` — none. `exposes the property'` — two matches, `factories.test.ts:1327` and `validators.test.ts:95`.
5. `git status --short --untracked-files=no` — 27 paths, matching the named checkpoint set exactly (no new or removed paths).

**Deviation state**: none. All quoted text was found exactly once at each named site; the scoped run and both non-mutating checks are green.
