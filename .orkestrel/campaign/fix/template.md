# Fix dossier: template

Verified fix-producing findings for the `template` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s17-14 — DRIFT-RESHAPE

14. package=`template` file=`template/src/core/helpers.ts:189` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Shape values → `*/shapers.ts`) + `.claude/rules/names.md` § Fixed derivation/construction forms (`*Shape` is a value, "not a function or type") verdict=CONFIRMED
    wrong: `placeholderShape` is a function producing a `ContractShape`, so it is a shaper sitting in `helpers.ts`, and its name takes the `*Shape` form the rule reserves for a shape **value**. Both halves are wrong at once.
    repair: Create `template/src/core/shapers.ts`, move the function there, rename it to the verb form its file implies (`shapePlaceholders`), add `export * from './shapers.js'` to `index.ts`, and update `Template.ts:14,74` and the guide's surface row.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: create template/src/core/shapers.ts, move `placeholderShape` there UNCHANGED (no rename), add `export * from './shapers.js'` to index.ts, and update the guide's Surface row placement only.

**Lane DRIFT-RESHAPE/high:** amend: move `placeholderShape` unchanged to a new template/src/core/shapers.ts, add `export * from './shapers.js'` to index.ts, and leave the name alone. Only the import in Template.ts:14 changes; the published surface and the guide row stay as they are.

## s17-15 — DRIFT-RESHAPE

15. package=`template` file=`template/src/core/helpers.ts:135-156` and `template/src/core/Template.ts:157-173` rule=`AGENTS.md` § Work process step 5 (Consolidate) + `.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: `fillTemplate` and `Template#validate` each carry their own copy of the token scan — fresh `RegExp` from `FILL_PATTERN`, trim the raw token, find the declared placeholder by exact name, fall back to `token.split('.')`, resolve through `resolveSafeField`, then apply `required !== false`. `Template.ts:127-131` states the two must agree exactly; nothing but hand-maintenance makes them.
    repair: Extract one exported leaf in `helpers.ts` — `scanTokens(content, values, placeholders): readonly { token, value, declared, required }[]` — walking the pattern once, and have `fillTemplate` build its output and `validate` build its `missing` list from that one walk. Unit-test the leaf.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: extract one exported leaf that yields per-match `{ text, index, token, value, declared, required }` including the escape case, so `fillTemplate` rebuilds its output and `validate` builds `missing` from the same walk; unit-test the leaf and add its guide Surface row.

**Lane DRIFT-RESHAPE/medium:** amend: extract one exported leaf carrying the per-token resolution — `resolveToken(record, placeholders, token): { value, declared, required }` — unit-test it, and have fillTemplate's `replace` callback and validate's `matchAll` loop both call it. Each keeps its own walk; the one rule has one implementation. Keep the R1 agreement suite.

## s17-16 — DRIFT

16. package=`template` file=`template/src/core/types.ts:185` and `template/src/core/TemplateManager.ts:71` rule=`.claude/rules/names.md` § Tallies ("A lone unambiguous tally is `count`") + § General vocabulary ("Do not alternate `count`/`length`/`size`/`total`") verdict=CONFIRMED
    wrong: `TemplateManagerInterface.size` is the manager's only tally, so the rule fixes it as `count`. `RelationManagerInterface.count`, `WorkspaceManagerInterface.count`, `WorkspaceInterface.count`, and `WorkerInterface.count` all use `count` for the same fact, so `size` is a lone synonym across the slice.
    repair: Rename to `count` in `types.ts:185` and `TemplateManager.ts:71`, and update the guide's `TemplateManagerInterface` surface row and the `## Methods` preamble at `guides/template.md:146`.

## s17-17 — DRIFT-RESHAPE

17. package=`template` file=`template/src/core/types.ts:190` and `template/src/core/TemplateManager.ts:113` rule=`.claude/rules/patterns.md` § Managers § Accessors (`entity(key): EntityInterface | undefined`) + `.claude/rules/typescript.md` § Errors and outcomes ("Optional missing lookup → Return `undefined`") verdict=CONFIRMED
    wrong: `template(id): TemplateInterface` throws `TemplateError` coded `NOTFOUND` for an unknown id where the accessor pattern and the outcome table both fix `undefined`. `guides/template.md:185` labels this row "AGENTS §9.1 singular accessor" — the guide asserts conformance to the very rule the signature breaks, so the drift is documented as compliance.
    repair: Return `TemplateInterface | undefined` from `template(id)` and delete `#throwNotFound`. Keep the throw only where a value is required to proceed — `fill` / `validate` / `parameters` by id — and say so in the guide row rather than claiming the accessor pattern.

### Verification

**Judge (DRIFT-RESHAPE/high):** The deviation is real and documented as compliance rather than as a reasoned exception, so it is not an EXCEPTION. The repair is wrong on a mechanical point: `fill`, `validate` and `parameters` reach `#throwNotFound` only through `template(id)`, so deleting the helper deletes the throws the repair s

**Lane DRIFT/high:** amend: return `TemplateInterface | undefined`, drop `#throwNotFound` from the accessor, keep the `NOTFOUND` throw for `fill` / `validate` / `parameters`, and update BOTH guides/template.md:178-180,187 AND tests/src/core/TemplateManager.test.ts:78-83.

**Lane DRIFT-RESHAPE/medium:** amend: return `TemplateInterface | undefined` from `template(id)` and keep `#throwNotFound` for `fill` / `validate` / `parameters`. Update the guide row at guides/template.md:185, the NOTFOUND preamble at guides/template.md:178-180, the TSDoc at TemplateManager.ts:105-112 and types.ts:179, and the test at tests/src/core/TemplateManager.test.ts:78.

## s17-18 — DRIFT-RESHAPE

18. package=`template` file=`template/src/core/types.ts:194-197` and `template/src/core/TemplateManager.ts:174,198` rule=`AGENTS.md` § Design laws ("One concept, one term") + `.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
    wrong: `remove()` with no argument and `clear()` both empty the registry, differing only in which event fires (`remove` per instance versus one `clear`). A consumer has two public verbs for one outcome and no way to predict which one the package means.
    repair: Drop the no-argument `remove()` overload from the interface and the implementation, leaving `remove(id)` / `remove(ids)` for the targeted forms and `clear()` as the sole remove-all. Emit `remove` per instance from inside `clear()` before emitting `clear`, so no observation is lost.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The overlap is real and unique in the fleet: this is the only interface carrying both members, and workspace resolves the same overlap by keeping `clear()` as the sole remove-all. The finding's event half is harmful — it inflates one signal into N+1 and contradicts the fleet's own stated rule for `c

**Lane INVALID/high:** drop

**Lane DRIFT-RESHAPE/medium:** amend: drop the no-argument `remove()` overload from types.ts:194-197 and TemplateManager.ts:174-179, matching WorkspaceInterface / WorkspaceManagerInterface, and leave `clear()`'s single `clear` emission unchanged. A consumer wanting per-instance observation of a full purge calls `remove(manager.templates().map((one) => one.id))`.

## s17-20 — DRIFT

20. package=`template` file=`template/src/core/types.ts:188` and `template/src/core/helpers.ts:125` rule=`.claude/rules/typescript.md` § Types ("Put every reusable or public interface/type alias in the nearest authoritative `*/types.ts`") + `AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts`") verdict=CONFIRMED
    wrong: Two public signatures declare their options shape inline: `register(template, options?: { readonly replace?: boolean })` and `fillTemplate(content, values, options?: TemplateFillOptions & { readonly placeholders?: readonly TemplatePlaceholder[] })`. Both are public option bags with no name a consumer can import or a guide row can reference.
    repair: Declare `TemplateRegisterOptions { readonly replace?: boolean }` and `TemplateFillContext extends TemplateFillOptions { readonly placeholders?: readonly TemplatePlaceholder[] }` in `types.ts`, and reference them from both signatures.

## s17-22 — DRIFT-RESHAPE

22. package=`template` file=`template/src/core/Template.ts:33-40` rule=`.claude/rules/architecture.md` § Class order (private `#` fields, then constructor, then "Public interface: getters, then methods") verdict=CONFIRMED
    wrong: `Template` declares eight public data members as plain instance fields assigned in the constructor body, where the class-order rule's public tier is getters over `#` fields. Every other class in the slice — `Rater`, `Model`, `Worker`, `Workspace`, `WorkspaceManager`, `NodeWebSocket`, `Thread` — holds its state in `#` fields and exposes readonly getters, so `Template` is the single outlier and its fields are the only ones a consumer can see the storage of.
    repair: Move `id`, `name`, `content`, `placeholders`, `summary`, `description`, `category`, and `tags` to `#` fields and expose each through a readonly getter typed as `TemplateInterface` declares it. `definition()` reads the `#` fields directly.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The cited section orders members; it mandates the `#`-field-plus-getter form only for child managers, and five fleet classes hold public readonly data fields the same way. What the cited lines do break is the tier order: public members precede the `#` fields. The eight-getter rewrite is churn no rul

**Lane INVALID/medium:** amend: reject the getter rewrite; if anything is corrected here, move the public readonly fields BELOW the `#` fields so the declaration order matches the section's tier list.

**Lane DRIFT/high:** stands

