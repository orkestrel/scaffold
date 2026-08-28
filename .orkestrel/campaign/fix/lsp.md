# Fix dossier: lsp

Verified fix-producing findings for the `lsp` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s15-29 — DRIFT-RESHAPE

29. package=lsp file=`/home/user/fleet/lsp/src/core/errors.ts:45-52` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: `isLSPError` re-lists all eight `LSPErrorCode` literals as an inline `===` chain, duplicating the union at `types.ts:333-341`. A ninth code added to the union makes every error carrying it fail `isLSPError`, which is the guard `LSPClient.#receiveChunk:444` depends on to recover a partial message list from a framing failure — so the drift surfaces as lost messages, not as a type error.
    repair: add `export const isLSPErrorCode: Guard<LSPErrorCode> = literalOf('spawn','framing','protocol','duplicate','server','timeout','aborted','closed')` to `src/core/validators.ts` and call it from `isLSPError`; better still, derive both the union and the guard from one frozen `LSP_ERROR_CODES` list in `constants.ts`.

### Verification

**Judge (DRIFT-RESHAPE/high):** The duplication and its silent failure mode are real and undefended, so the finding survives. Its primary repair does not: putting `isLSPErrorCode` in validators.ts and importing it from errors.ts runs an edge from a file the leaf pair sits above back into that pair, which architecture.md:84-89 refu

**Lane DRIFT/high:** amend: prefer the finding's own second option. Declare a frozen `LSP_ERROR_CODES` in `src/core/constants.ts`, derive `LSPErrorCode` from it with `as const` (`.claude/rules/typescript.md` § Types permits `as const` 'to derive a literal union from a value'), export `isLSPErrorCode: Guard<LSPErrorCode> = literalOf(...LSP_ERROR_CODES)` from `validators.ts`, and call it from `isLSPError`. Add the `guides/lsp.md` Surface rows and the `@example` blocks the new exports owe.

**Lane DRIFT-RESHAPE/high:** amend: take the finding's secondary repair only - declare one frozen `LSP_ERROR_CODES` in `src/core/constants.ts` beside `LSP_ENCODINGS` (constants.ts:17), derive `LSPErrorCode` as `(typeof LSP_ERROR_CODES)[number]`, and have `isLSPError` test membership through that constant. Do not add a guard to validators.ts and import it from errors.ts; that inverts the module layering architecture.md fixes.

## s15-30 — DRIFT-RESHAPE

30. package=lsp file=`/home/user/fleet/lsp/src/core/validators.ts:173,178,242,273` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: the guards re-list protocol literal sets the types already declare — `literalOf(1,2,3,4)` duplicates `LSPDiagnosticSeverity` (`types.ts:86`), `literalOf(1,2)` duplicates `LSPDiagnosticTag` (`types.ts:89`), and `literalOf(0,1,2)` duplicates `LSPTextDocumentSyncKind` (`types.ts:142`) at two sites.
    repair: declare `isLSPDiagnosticSeverity`, `isLSPDiagnosticTag`, and `isLSPTextDocumentSyncKind` once in `validators.ts` and compose them at the four call sites.

### Verification

**Judge (DRIFT-RESHAPE/high):** The repetition is real, undefended, and drifts silently because a hand-written type predicate is unchecked. The finding's repair closes only half of it: three new guards remove the call-site repetition while each literal set stays written twice, once as the union in types.ts and once inside the guar

**Lane DRIFT/high:** amend: as written, and account for the consequence. `.claude/rules/architecture.md` § Declaration placement requires 'Every declaration in a centralized file is exported', and `src/core/index.ts` star-exports `validators.js`, so the three new guards become published exports and each owes a `guides/lsp.md` Surface row and the `@example` finding 33 requires.

**Lane DRIFT-RESHAPE/medium:** amend: put `LSP_DIAGNOSTIC_SEVERITIES`, `LSP_DIAGNOSTIC_TAGS` and `LSP_SYNC_KINDS` as frozen tuples in `src/core/constants.ts` beside `LSP_ENCODINGS`, derive `LSPDiagnosticSeverity`, `LSPDiagnosticTag` and `LSPTextDocumentSyncKind` as `(typeof X)[number]`, and build the checks at validators.ts:173,178,242,273 from those constants - so each literal set is written once, not twice.

## s15-31 — DRIFT-RESHAPE

31. package=lsp file=`/home/user/fleet/lsp/src/core/LSPClient.ts:87-96,97-105,595-603,605-613` rule=`.claude/rules/typescript.md` § Types + `.claude/rules/architecture.md` § System constraints verdict=CONFIRMED
    wrong: `#pending` and `#publications` carry near-identical anonymous entry types declared inline in an implementation file (`resolve`, `reject`, `signal`, `abort`, plus `method` on one), and `#settle` and `#settlePublication` duplicate the same four-step settlement — look up, delete, remove the abort listener, resolve or reject. The reusable record type belongs in `types.ts`, and the repeated behaviour belongs in one implementation.
    repair: declare `export interface LSPPending<T> { readonly resolve: (value: T) => void; readonly reject: (reason?: unknown) => void; readonly signal: AbortSignal; readonly abort: () => void }` in `src/core/types.ts`, type both maps over it (`#pending` adding `method`), and route both settle methods through one `#settleEntry(map, key, value, failed)` private method.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: declare the shared record in `src/core/types.ts` as `LSPSettlement<T>` with readonly `resolve`, `reject`, `signal`, `abort`, and give it a `guides/lsp.md` Surface row and `@example` since it becomes public. Type `#publications` as `Map<LSPDocumentURI, LSPSettlement<readonly LSPDiagnostic[]>>` and `#pending` as `Map<JSONRPCId, LSPSettlement<unknown> & { readonly method: string }>`. Route both settle methods through one `#settleEntry` that takes the resolve transform as an argument, so the publication path keeps `Object.freeze([...value])` and the request path keeps the identity pass. Do not collapse the two resolve behaviours.

**Lane DRIFT-RESHAPE/high:** amend: declare `LSPPending<T>` in src/core/types.ts and type both maps over it as stated. For the settlement, extract only the shared prefix - lookup, delete, remove the abort listener - into one `#settleEntry`, and keep `#settlePublication` responsible for computing `Object.freeze([...value])` before it resolves. Do not merge the success branches; they differ deliberately.

## s15-33 — DRIFT

33. package=lsp file=`/home/user/fleet/lsp/src/core/validators.ts:33-293` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: none of the seventeen exported guards in the file carries an `@example`, while `errors.ts:31-35` gives one for `isLSPError` and the same package's `helpers.ts`, `parsers.ts`, and both `factories.ts` files give one for every export. `@example` is applicable to a guard — the sibling file proves it.
    repair: add a two-line `@example` to each guard in the form already used at `errors.ts:31-35`.

## s15-35 — DRIFT

35. package=lsp file=`/home/user/fleet/lsp/src/core/factories.ts:13`, `/home/user/fleet/lsp/src/core/LSPClient.ts:53`, `/home/user/fleet/lsp/src/server/factories.ts:12` rule=`.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
    wrong: public `@example` blocks import through relative source paths — `import type { LSPTransportInterface } from './types.js'` and `import { createLSPClient } from '../core/factories.js'`. Those resolve inside the repository and nowhere else; a consumer copying the example gets an unresolvable specifier.
    repair: replace with `@orkestrel/lsp` and `@orkestrel/lsp/server`, matching `guide` and `program`. Same caveat as finding 7 about the rule's stated scope.

