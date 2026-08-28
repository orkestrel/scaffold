# Fix dossier: guide

Verified fix-producing findings for the `guide` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s15-11 — DRIFT

11. package=guide file=`/home/user/fleet/guide/src/core/helpers.ts:14`, `/home/user/fleet/guide/src/core/parsers.ts:3`, `/home/user/fleet/guide/src/core/Guide.ts:2` rule=`.claude/rules/typescript.md` § Syntax and imports verdict=CONFIRMED
    wrong: an `import type` declaration follows value imports in each file — `helpers.ts` puts value imports on lines 2-13 before the type block at 14-21, `parsers.ts` puts value imports on 1-2 before the type import on 3, and `Guide.ts` puts a value import on 1 before the type import on 2. The rule places every `import type` before value imports. No file in router, program, or lsp does this.
    repair: move each `import type` block above the value imports in the three files.

## s15-12 — DRIFT-RESHAPE

12. package=guide file=`/home/user/fleet/guide/src/core/types.ts:7,16` rule=`AGENTS.md` § Design laws (Named discriminants) verdict=CONFIRMED
    wrong: `SurfaceSymbol` carries `readonly kind: ExportKind`, and the union is named `ExportKind`. The law names the axis that varies and bans `kind` and `type` outright. The axis here is the declaration form.
    repair: rename the type to `ExportDeclaration` and the property to `declaration`, updating `validators.ts:23,46`, `shapers.ts:23`, `helpers.ts:662-663,996,1001,1039,1044,1215,1228`, `sources/Source.ts`, and the `Kind` column contract in `constants.ts` and `guides/guide.md`. The guide's markdown column header stays `Kind` — that is the documented table's own external text, not this package's discriminant.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: do not rename. Close this the way finding 34 closes the same spelling in lsp — keep `kind` and `ExportKind`, and add an `@remarks` on `SurfaceSymbol` and a note beside its `guides/guide.md` Surface row stating that `kind` mirrors the guide Surface table's own `Kind` column header, which this package locates by text and cannot rename. If the campaign wants the axis renamed anyway, it is a fleet unit that renames the markdown column and the property together across all 47 consumers, not a guide-local edit.

**Lane DRIFT-RESHAPE/medium:** amend: rename the axis to a word this package does not already use for something else - `ExportForm` / `readonly form: ExportForm` - never `declaration`, which collides with `DeclarationHead` (types.ts:264) and `declarationBody` (helpers.ts:1092). Scope the change to include every fleet package's `tests/guides.test.ts`, which reads `symbol.kind`. If the fleet-wide cost is refused, close it the way finding 34 closes its twin: keep `kind` and record on `SurfaceSymbol` that it mirrors the guide table's `Kind` column header.

## s15-14 — DRIFT-RESHAPE

14. package=guide file=`/home/user/fleet/guide/src/core/types.ts:7`, `/home/user/fleet/guide/src/core/validators.ts:23-29,44-47,62-65,80-85`, `/home/user/fleet/guide/src/core/shapers.ts:21-24,39-42,57-62` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") + `.claude/rules/patterns.md` § Validation and contracts verdict=CONFIRMED
    wrong: each of the three data types is defined three times — the TypeScript type in `types.ts`, a `recordOf` guard in `validators.ts`, and an independent `objectShape` in `shapers.ts`. The five `ExportKind` literals in particular appear at `types.ts:7`, `validators.ts:24-28`, and `shapers.ts:23`. Nothing derives one from another, so a sixth kind added to the type leaves both runtime definitions silently narrower. The rules require the parser and guard to derive from one source or to prove the round trip, and admit the shape DSL only where it earns its complexity.
    repair: pick one source. Derive the guards from the shapes (`export const isSurfaceSymbol: Guard<SurfaceSymbol> = createContract(surfaceSymbolShape).is`) and delete the duplicate `recordOf` definitions, or delete `shapers.ts` and keep the combinator guards. Either way, derive `ExportKind` from a single frozen literal list.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: take only the finding's last sentence. Declare one frozen `EXPORT_KINDS` list in `src/core/constants.ts`, derive `ExportKind` from it with `as const` (`.claude/rules/typescript.md` § Types permits `as const` 'to derive a literal union from a value'), and feed both `literalOf(...EXPORT_KINDS)` in validators.ts and `literalShape(EXPORT_KINDS)` in shapers.ts from it. Leave the guard and the shape as separate compiled paths, and add a parity test asserting each guard and its shape's compiled guard agree, which is patterns.md's own 'test the round trip' escape. Do not make validators.ts import shapers.ts.

**Lane DRIFT-RESHAPE/high:** amend: keep both validators.ts and shapers.ts. Close only the literal duplication: declare one frozen `EXPORT_KINDS` in `src/core/constants.ts`, derive `ExportKind` as `(typeof EXPORT_KINDS)[number]`, and feed both `literalOf` and `literalShape` from it, following probe/src/core/constants.ts:14, types.ts:17 and validators.ts:39. Update tests/src/core/shapers.test.ts:26-32 to assert against the same constant.

## s15-15 — DRIFT

15. package=guide file=`/home/user/fleet/guide/src/core/helpers.ts:773-775` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly") + `.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: `fenceImports` returns `ReadonlyArray<{ specifier: string; names: readonly string[] }>` — an anonymous public return type declared inline in an implementation-adjacent file, whose `specifier` member is mutable.
    repair: declare `export interface FenceImport { readonly specifier: string; readonly names: readonly string[] }` in `src/core/types.ts` and change the return type to `readonly FenceImport[]`; the local accumulator at line 776 takes `FenceImport[]`.

## s15-16 — DRIFT-RESHAPE

16. package=guide file=`/home/user/fleet/guide/src/core/helpers.ts:606,662,723,773,888,910,934,952,985,1029,1092,1136,1161,1434,1465` rule=`.claude/rules/names.md` § Standalone helpers verdict=CONFIRMED
    wrong: fifteen exported module helpers are noun phrases rather than `{verb}{Noun}`, and none is a one-word helper whose meaning and arguments are unmistakable: `moduleKey`, `symbolKey`, `missingSymbols`, `fenceImports`, `firstCode`, `cellLinks`, `identifierOf`, `kindIndex`, `exportsFrom`, `hiddenFrom`, `declarationBody`, `memberMethods`, `sectionBlocks`, `examplesFrom`, `exampleMethods`. The same file names others correctly (`extractSourceLines`, `normalizeDirectories`, `selectModuleKeys`, `findMissing`, `resolvePath`, `joinHead`), so the file is internally inconsistent about its own rule.
    repair: rename each to its verb form and update every call site and the guide's Surface rows — `computeModuleKey`, `computeSymbolKey`, `findMissingSymbols`, `parseFenceImports`, `findFirstCode`, `extractCellLinks`, `extractIdentifier`, `findKindIndex`, `extractExports`, `extractHidden`, `extractDeclarationBody`, `extractMemberMethods`, `selectSectionBlocks`, `extractExamples`, `extractExampleMethods`.

### Verification

**Judge (DRIFT-RESHAPE/high):** The rule and the code are both as the finding states, and the hunt for a recorded choice comes back empty, so the violation is real. The repair as written is not sound: `parseFenceImports` claims a form the rules reserve for coercion to `T | undefined`, and the finding scopes the change to guide whi

**Lane DRIFT/high:** amend: as written, except `fenceImports` becomes `extractFenceImports`, not `parseFenceImports` — `.claude/rules/names.md` § Fixed derivation/construction forms reserves `parse*` for a coercion producing `T | undefined`, and `extract*` already carries this file's meaning. Scope the unit to update all 47 packages' `tests/guides.test.ts` in the same change, per AGENTS § Design laws 'No compatibility shims. This is greenfield. Update every consumer in the same change.', plus the `guides/guide.md` Surface rows at 71-101.

**Lane DRIFT-RESHAPE/medium:** amend: apply the rename list with one substitution - `extractFenceImports`, not `parseFenceImports`, because `parse*` is reserved for coercion producing `T | undefined` (names.md § Fixed derivation/construction forms) and `extract*` is the prefix this file already uses for structure extraction. Apply `identifierOf`'s rename once, per finding 17's reshaped form, rather than twice.

## s15-17 — DRIFT-RESHAPE

17. package=guide file=`/home/user/fleet/guide/src/core/helpers.ts:934` rule=`.claude/rules/names.md` § Fixed derivation/construction forms verdict=CONFIRMED
    wrong: `identifierOf(code: string): string` takes the reserved `*Of` form, which the rules fix to a builder combining constituent parts into a container, guard, or value (`arrayOf(guard)`, `boundsOf(min, max)`). This is a projection from a code span to its identifier prefix, not a builder.
    repair: rename to `extractIdentifier` (the `extract*` prefix has one project-wide meaning and matches what it does) and update `helpers.ts:1205,1226,1259,1268` and the guide row. This is covered by the rename list in finding 16; it is listed separately because the reserved-form breach is a distinct rule.

### Verification

**Judge (DRIFT-RESHAPE/medium):** Both lanes are right that the reserved-form breach is real: this is a projection, and the rules give `*Of` to builders. The dispute is only the replacement name, and the package's own evidence settles it against the finding. The TSDoc and the guide both call the operation normalization, `normalizeDi

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/medium:** amend: rename to `normalizeIdentifier`, not `extractIdentifier`, matching guides/guide.md:254 ("normalize every identifier through `identifierOf`") and the sibling `normalizeDirectories` at helpers.ts:580. Update helpers.ts:1205,1226,1259,1268, the guide's Surface row, and fold this into finding 16's single rename pass.

## s15-19 — DRIFT

19. package=guide file=`/home/user/fleet/guide/src/core/types.ts:82,84,86,136,178,180,251`; `factories.ts:19,39,61,83,102,121`; `parsers.ts:8`; `helpers.ts:26,821,855,1051,1322`; `validators.ts:11,32,50,68` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: TSDoc first sentences are bare imperatives ("Create", "Parse", "Resolve", "Compile", "Join", "Select", "Extract") or bare noun phrases on call signatures ("The `##` heading names, in document order", "Every direct declaration in the selected module keys…", "Whether `value` is one of the five…"). The rule fixes the third-person `-s` form for the first sentence. `guides/guide.md:142-147` already writes these as "Creates …", so the source and its own guide disagree.
    repair: rewrite each opener — "Creates a structured `GuideInterface` view…", "Parses a `## By concept` manifest table…", "Returns the `##` heading names, in document order.", "Checks whether `value` is one of the five documented `ExportKind` literals."

## s15-20 — DRIFT-RESHAPE

20. package=guide file=`/home/user/fleet/guide/src/core/types.ts:82,84,86,136,178,180,256` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `GuideInterface.sections`, `.surface`, `.methods` and `SourceInterface.exports`, `.methods`, `.exists` and `SourceManagerInterface.source` carry no `@example` and no `@returns`, while their direct siblings in the same interfaces do (`links` at 88-96, `tests` at 97-105, `fences` at 106-115, `surface` at 137-176, `hidden` at 181-194, `examples` at 195-220). `@example` is plainly applicable here — this package's own `Source.examples()` reflects exactly that tag.
    repair: add `@returns` and a one-line `@example` to each of the seven members, matching the form already used at `types.ts:88-96`.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: add a one-line `@example` to the six members that lack one (`sections`, `surface`, `methods` on `GuideInterface`; `exports`, `methods(name)`, `exists` on `SourceInterface`; plus `source` on `SourceManagerInterface`), matching the form at types.ts:88-96. Add `@returns` only where it is absent — leave `source(specifier)`'s existing `@returns` alone. Also add the `@param name` and `@param relative` tags the finding missed on types.ts:178 and 180.

**Lane DRIFT-RESHAPE/medium:** amend: add the missing `@param` to `methods(name)` and `exists(relative)` and the missing `@returns` to `sections`, `surface`, `methods`, `exports`, `methods(name)` and `exists`. Add no `@example` - guides/guide.md:410-412,439-443,459-461 already carries the worked call for each member on the route guides/guide.md:372-379 defines - and strike `SourceManagerInterface.source` from the finding, which already has `@param` and `@returns`.

