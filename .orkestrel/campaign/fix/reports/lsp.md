# Fix report: lsp

## Dispositions

- **s15-29** applied (src/core/constants.ts, src/core/types.ts, src/core/errors.ts, guides/lsp.md): Re-verified: isLSPError still re-listed every code as an inline === chain. Applied the part both lanes and the judge share — a frozen LSP_ERROR_CODES in constants.ts, LSPErrorCode derived as (typeof LSP_ERROR_CODES)[number], and isLSPError testing membership with LSP_ERROR_CODES.some(...), matching the process and probe idiom. Did not add isLSPErrorCode to validators.ts: that edge runs from errors.ts up into the leaf pair, which the judge and one lane both refuse. Added the LSP_ERROR_CODES guide Surface row.
- **s15-30** applied (src/core/constants.ts, src/core/types.ts, src/core/validators.ts, guides/lsp.md): Re-verified all four call sites. Applied the union of the two lane corrections, which are complementary rather than conflicting: frozen LSP_DIAGNOSTIC_SEVERITIES, LSP_DIAGNOSTIC_TAGS, and LSP_SYNC_KINDS in constants.ts; LSPDiagnosticSeverity, LSPDiagnosticTag, and LSPTextDocumentSyncKind derived from them; isLSPDiagnosticSeverity, isLSPDiagnosticTag, and isLSPTextDocumentSyncKind declared once in validators.ts as Guard consts built from those constants; composed at all four sites. Each literal set is now written once. Added guide Surface rows for the constants and the guards. The guards' Kind column is const, not function, because the barrel-parity check keys on declaration kind — a function row failed 'documents every barrel export'. Derived unions are structurally identical to the hand-written ones, so the published surface is unchanged.
- **s15-31** applied (src/core/types.ts, src/core/LSPClient.ts, guides/lsp.md): Re-verified: both maps still carried inline anonymous entry types and both settle methods still repeated the same prefix. Declared LSPPending<T> in types.ts (the finding's name, kept by the high lane; the medium lane's LSPSettlement was the minority), typed #pending as LSPPending<unknown> & { readonly method: string } and #publications as LSPPending<readonly LSPDiagnostic[]>. Extracted only the shared prefix — lookup, delete, remove the abort listener — into #settleEntry<Key, Value>; the resolve branches stay apart, so #settlePublication still computes Object.freeze([...value]). Added the LSPPending guide Surface row; gave it no @example, because no interface in types.ts carries one and guide parity requires examples only for function-kind rows.
- **s15-33** applied (src/core/validators.ts): Re-verified: no guard in the file carried an @example. Added a two-line @example to each of the seventeen existing guards in the errors.ts form, and to the three guards finding s15-30 introduced. Two examples take a leading const range line so they stand alone.
- **s15-35** applied (src/core/factories.ts, src/core/LSPClient.ts, src/server/factories.ts): Re-verified all three sites. Replaced './types.js' with '@orkestrel/lsp' in the createLSPClient and LSPClient examples, and '../core/factories.js' with '@orkestrel/lsp' in the createStdioClientTransport example. The server example needs no '@orkestrel/lsp/server' import because createStdioClientTransport is the documented symbol itself.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2245ms on 62 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (exit 0, no diagnostics)
- npm run check: pass — tsc --noEmit --project tsconfig.json, then check:src:core and check:src:server (exit 0, no diagnostics)
- npm run build: pass — dist/src/server/index.js 9.04 kB | gzip: 3.01 kB; built in 2.27s; Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
- npm test: pass — src 159 passed (9 files); policy 111 passed; setup 13 passed; config 46 passed; guides 27 passed; conformance 243 passed

## Diffstat

```text
 guides/lsp.md           |  42 ++++++++-----
 src/core/LSPClient.ts   |  46 ++++++--------
 src/core/constants.ts   |  32 ++++++++++
 src/core/errors.ts      |  14 ++---
 src/core/factories.ts   |   2 +-
 src/core/types.ts       |  45 ++++++++-----
 src/core/validators.ts  | 163 ++++++++++++++++++++++++++++++++++++++++++++++--
 src/server/factories.ts |   2 +-
 8 files changed, 273 insertions(+), 73 deletions(-)
```

- dist moves: true

## Deviations

No blocking deviation; three decisions worth surfacing. (1) s15-29 lane split was settled by the brief's shared-detail rule, not by me: one lane wanted isLSPErrorCode exported from validators.ts and called from errors.ts, which the judge and the other lane both refuse as a downward edge into the leaf pair. I applied only the shared repair, so no guard was added for the error codes and the constant is read directly. (2) s15-31 lanes named the shared record differently (LSPPending vs LSPSettlement); I took LSPPending, which the finding and the high lane share. (3) The three new guards are listed in guides/lsp.md with Kind `const`. A `function` row fails the guides-parity assertion 'documents every barrel export', which keys on the declaration kind — the source reports `const isLSPDiagnosticSeverity`. This differs from how probe's guide lists its equivalent const guards, so a fleet-wide guide-kind convention may be worth a later ruling; it is outside this unit's scope. No off-limits file was modified; `npm run lint` and `npm run format` were run once to converge and touched only the files listed in the diffstat. The tree is uncommitted.
