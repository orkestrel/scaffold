# Consumers of @orkestrel/browser's TypeScript API (read 2026-10-06)

## Code consumers

Code imports from `@orkestrel/browser`, `/server`, and `/browser` sit only in browser itself and in ollama's tests:
- `tests/setupStore.ts`
- `tests/setupStore.test.ts`
- `tests/setupStore/types.ts`
- `tests/service/browser.test.ts`
- `tests/setupService.ts`
- `tests/setupServer.ts`
- `tests/setupServer.test.ts`

The reading: Grep for `from ['"]@orkestrel/browser` over every sibling checkout under C:/Users/mikes/WebstormProjects, excluding `node_modules`, `dist`, `tmp`, `.orkestrel`, and `guides`.

## Other references

- **Guide mirrors:** database, workflow, indexeddb, veneer, ollama, and scaffold each carry `guides/browser.md` as a vendored mirror, refreshed at each one's visit.
- **Declared but not imported:** desk, indexeddb, database, workflow, veneer, and scaffold declare `@orkestrel/browser` in `package.json`, but none imports it in its configs or test setup (Grep over `vite.config.ts`, `vitest.config.ts`, `configs/**/*.ts`, and `tests/setup*.ts`).

## The usage census

`api/browser-usage.json` was produced by `node tmp/units/export-usage.ts --package C:/Users/mikes/WebstormProjects/browser --root C:/Users/mikes/WebstormProjects`.

| Kind | Declarations | Used outside browser | Unused inside `src` outside their file |
| --- | --- | --- | --- |
| Function | 236 | 14 | 54 |
| Const | 125 | 4 | 3 |
| Class | 66 | 3 | 0 |
| Interface | 233 | 11 | 14 |
| Type | 61 | 1 | 8 |
| **Total** | **721** | | |

These are export lines across `src/core`, `src/server`, and `src/browser`.

The census counts tokens, so common words collide with other packages' own names: `Browser` appears in comments everywhere, and `decodeBase64` is codec's own. Read its "used outside" column with the import list in § Code consumers.
