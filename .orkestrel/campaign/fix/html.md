# Fix dossier: html

Verified fix-producing findings for the `html` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s08-01 — DRIFT

1. package=html file=`/home/user/fleet/html/src/core/types.ts:218` rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
   wrong: `HTMLHandlers<T>` is a pluralized type name, and the rule says "Never pluralize type names" — the singular `HTMLHandler` already exists at `types.ts:211`, so the two differ only by an `s`.
   repair: rename to `HTMLHandlerMap` (it is a per-category table, matching the `{Entity}EventMap` precedent), and update `HTMLInterface.fold`, `HTML.fold` (`HTML.ts:173`), `foldNode` (`helpers.ts:1222`), the barrel consumers, and the `## Types` row in `guides/html.md`.

## s08-02 — DRIFT-RESHAPE

2. package=html file=`/home/user/fleet/html/src/core/helpers.ts:37`, `:103`, `:474`, `:522` rule=`.claude/rules/typescript.md` § Types verdict=CONFIRMED
   wrong: four public exports declare their return contracts as inline anonymous types instead of in `types.ts` — `normalizeSource` returns an inline labeled tuple, `findOpenPosition` returns `{ readonly overflow: boolean; readonly position: number } | undefined`, and `scanComment` / `scanDoctype` each return `{ readonly node: …; readonly next: number }`. The package already proves its own convention: `scanRawText` returns the named `HTMLRawText` (`types.ts:191`), and the other two tuples are named `HTMLParseResult` / `HTMLDerivation`.
   repair: add `HTMLSource` (the normalize tuple), `HTMLOpenPosition`, `HTMLComment`, and `HTMLDoctype` to `src/core/types.ts` and annotate the four signatures with them; add the rows to the `### Types` table in `guides/html.md`.

### Verification

**Judge (DRIFT-RESHAPE/high):** The violation is real and both lanes concede it: four barrel-exported helpers declare public return contracts as inline anonymous types, against typescript.md § Types ("Put every reusable or public interface/type alias in the nearest authoritative `*/types.ts`"). The dispute is the repair, and the s

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/medium:** amend: name them for what they are — one `HTMLScan<TNode>` (`{ node, next }`) covering `scanComment` and `scanDoctype`, plus `HTMLSource` and `HTMLOpenPosition` — never `HTMLComment` / `HTMLDoctype`, which shadow the node types. Carry markdown's eight sibling signatures in the same wave.

## s08-04 — DRIFT

4. package=html file=`/home/user/fleet/html/src/core/factories.ts:57`, `:76`, `:95`, `:114` rule=`.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
   wrong: `createAttributeContract`, `createTextContract`, `createCommentContract`, and `createDoctypeContract` are each a one-line `return createContract(<x>Shape)`. Both operands are already public — `createContract` from the declared `@orkestrel/contract`, and each shape from this package's own barrel — so each function is a pass-through factory around a declared-dependency primitive with no added boundary, invariant, or narrower contract. `shapers.ts` proves the point: every one of its `@example` blocks (lines 21, 38, 57, 74) already shows the consumer calling `createContract(attributeShape)` directly.
   repair: delete the four functions and their barrel exposure, delete the `### Factories` rows for them in `guides/html.md:148` and the `createAttributeContract` fence at `:654`, and point the guide's `## Relationship with @orkestrel/contract` section at `createContract(<x>Shape)` as the supported call.

### Verification

**Judge (DRIFT/medium):** The subjective lane's EXCEPTION rests on one decisive claim — that the declared return type is where the shape value and the named AST type are checked against each other — and primary evidence refutes it twice. First, tests/src/core/shapers.test.ts already asserts `Infer<typeof <x>Shape>` against e

**Lane DRIFT/medium:** amend: as stated, plus retarget tests/src/core/factories.test.ts:43-90 onto createContract(<x>Shape).

**Lane EXCEPTION/high:** drop

## s08-06 — DRIFT-RESHAPE

6. package=html file=`/home/user/fleet/html/src/core/validators.ts:195`, `:205`, `:215`, `:225`, `:236` rule=`.claude/rules/architecture.md` § Kind purity verdict=EXEMPT
   wrong: `isVoidElement`, `isRawElement`, `isLiteralElement`, `isBlockElement`, and `isSafeURL` are boolean predicates over already-typed inputs, not total `Guard<T>` narrowers. The rule's own example places exactly this shape elsewhere: "`isVacant` is a predicate rather than a `Guard<T>`, so [it stays] in `helpers.ts`". The guide claims the arrangement deliberately — `guides/html.md:66` names "Two guard families" and describes "the name predicates" as a documented second family of `validators.ts`.
   repair: none as a defect. **Conflict to surface** per `AGENTS.md` § Authority and loading ("Rules state how to write… When they conflict, stop and surface the conflict"): the guide and `.claude/rules/architecture.md` § Kind purity disagree about where a non-`Guard` predicate lives. Settle it in one place — either move the five to `helpers.ts` and drop the guide's second family, or add the predicate family to the rule's kind table. Do not leave both texts standing.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: move isVoidElement, isRawElement, isLiteralElement, isBlockElement and isSafeURL (and isEmptyElement with them) into helpers.ts, relocate their guide rows from '### Validators' to '### Helpers', and reword the two-families prose to describe what they are rather than where they live. Do not escalate this as an unresolved rule-guide conflict.

**Lane DRIFT-RESHAPE/medium:** amend: do not leave this as an open conflict for adjudication. Move `isVoidElement`, `isRawElement`, `isLiteralElement`, `isBlockElement`, `isSafeURL`, and `isEmptyElement` to `src/core/helpers.ts`, rewrite the guide's 'Two guard families' paragraph to describe the split across the leaf pair, and carry markdown's six sibling predicates in the same wave.

## s08-07 — DRIFT

7. package=html file=`/home/user/fleet/html/src/core/helpers.ts:687`, `:742`, `:761`, `:795`, `:853`, `:890`, `:1041`, `:1186`, `:1313`, `:1416`, `:1452`, `:1488`, `:1536` rule=`.claude/rules/patterns.md` § Declared ecosystem capabilities verdict=CONFIRMED
   wrong: thirteen helpers hand-roll `try { … } catch { return fallback }` for totality, while the same package reaches for the declared safe-exception boundary `attempt` from `@orkestrel/contract` in `HTML.ts:235`, `HTML.ts:278`, and `validators.ts:104`. The rule names "safe exception boundary" in its list of primitives to reuse rather than reimplement, and `AGENTS.md` § Design laws requires one term per concept. The totality contract itself is documented at `guides/html.md:96` and is not in question — only the second mechanism is.
   repair: route each of the thirteen through `attempt`, reading `outcome.success ? outcome.value : <fallback>`, so the package has one exception boundary. Where a generator (`walkNodes`, `helpers.ts:1186`) cannot wrap its body in `attempt`, state that in a `//` comment beside the remaining `try`.

## s08-08 — DRIFT

8. package=html file=`/home/user/fleet/html/src/core/HTML.ts:234`, `:277` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: `sanitize` and `distill` each swallow every thrown value and return `new HTML({ category: 'document', children: [] })`, but neither TSDoc states it. The rule requires "State a prerequisite and the failure behavior wherever the symbol has either," and `@returns` on both reads only "A new handle over the sanitized/distilled document" — a caller reading the published `.d.ts` cannot tell an empty result from an empty input. The behavior itself is intentional and documented at `guides/html.md:288` ("Every pass fails CLOSED… produces an empty document rather than an escaping error"), so only the TSDoc is missing.
   repair: add to each `@returns`: "A new handle over the …ed document; an empty document when any step throws, because the pass fails closed." Add the same sentence to `HTMLInterface.sanitize` / `.distill` in `types.ts:394`, `:400`.

## s08-09 — DRIFT

9. package=html file=`/home/user/fleet/html/src/core/types.ts:278`, `:309` rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
   wrong: `SanitizeOptions` and `DistillOptions` name an operation, not an entity, and the required form is `{Entity}Options`. Every other type this package star-exports carries the `HTML` entity prefix or a `Node` suffix (`HTMLAttribute`, `HTMLSpan`, `HTMLRawText`, `ElementNode`), so these two are the only bare generic names on a barrel that a consumer star-imports.
   repair: rename to `HTMLSanitizeOptions` and `HTMLDistillOptions`, update `HTMLInterface`, `HTML.sanitize` / `.distill`, and the `guides/html.md:34`, `:35` rows.

## s08-10 — DRIFT

10. package=html file=`/home/user/fleet/html/src/core/helpers.ts`, `validators.ts`, `factories.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: TSDoc first sentences use the imperative rather than the required third-person `-s` verb. Confirmed fleet-wide by the convention lane (html: 35 imperative to 11 third-person). Affected files: `src/core/helpers.ts`, `src/core/validators.ts`, `src/core/factories.ts`. (`constants.ts` and `shapers.ts` use noun phrases for data constants, which the sweep did not count; rule the noun-phrase form once, fleet-wide, with the imperative one.)
    repair: convert each first sentence to the third person — `Lowercase only ASCII…` → `Lowercases only the ASCII…`, `Determine whether…` → `Checks whether…`, `Create an HTML handle…` → `Creates an HTML handle…`.

