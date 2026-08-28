# Fix dossier: sqlite

Verified fix-producing findings for the `sqlite` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s18-10 — DRIFT-RESHAPE

10. package=sqlite file=`src/server/types.ts:70` rule=`.claude/rules/names.md` § Entity-scoped names, `.claude/rules/patterns.md` § Options verdict=CONFIRMED
    wrong: `foreignKeys` is a two-word ungrouped option key. Its four siblings (`path`, `readonly`, `timeout`, `bigints`) are all one word, so the flat bag is the right shape and only this key breaks it.
    repair: Rename to `constraints` at `types.ts:70` (it is a boolean asserting foreign-key constraint enforcement) and update `SQLiteDatabase.ts:34`, `:42`, `:63`, the `types.ts:58-60` remark, `guides/sqlite.md:14`, `:60`, `:202`, `:212`, `:275`.

### Verification

**Judge (DRIFT-RESHAPE/high):** The violation is real and better founded than the finding states: this package documents shortening every other native option name, so nothing defends `foreignKeys`. The repair word is wrong. `constraints` collides with the term the package has already fixed for the general violation class (`'CONSTR

**Lane DRIFT-RESHAPE/high:** amend: rename to `foreign` rather than `constraints`, keeping the qualifier the entity noun does not supply and leaving `'CONSTRAINT'` unambiguous. Update `SQLiteDatabase.ts:34`, `:42`, `:63`, the `types.ts:57-58` remark, and `guides/sqlite.md:14`, `:60`, `:202`, `:212`, `:275`.

**Lane DRIFT/medium:** amend: rename to `references`, not `constraints` — the latter reads as enabling every constraint class while the option enables foreign-key enforcement alone. Apply at types.ts:70, the types.ts:57-58 remark, SQLiteDatabase.ts:34, :42, :63, and guides/sqlite.md:14, :60, :202, :212, :275.

## s18-11 — DRIFT-RESHAPE

11. package=sqlite file=`src/server/types.ts:123` (and `src/server/SQLiteDatabase.ts:79`) rule=`.claude/rules/names.md` § Rejected naming (abbreviations), § Fixed lifecycle vocabulary verdict=CONFIRMED
    wrong: `exec` is an abbreviation of `execute`, and `execute` is a fixed lifecycle verb with the exact meaning this method has ("Run primary work to completion"). The rule bans abbreviations by name and fixes the full verb's meaning.
    repair: Rename to `execute(sql)` at `types.ts:123` and `SQLiteDatabase.ts:79`, update the internal call sites `SQLiteDatabase.ts:134`, `:138`, `:142`, `:148`, `:149`, the `factories.ts:22` example, and `guides/sqlite.md:12`, `:120`, `:226`, `:253`.

### Verification

**Judge (DRIFT-RESHAPE/high):** `exec` abbreviates a verb the lifecycle table fixes with this method's meaning, sqlite is the only fleet interface using it, and the mirror defence fails because this wrapper already renames `open` to `connect`, `isTransaction` to `transacting`, and three native option names. The guide's 'thin typed

**Lane DRIFT/high:** amend: the rename to `execute(sql)` stands. Correct the site list — `SQLiteDatabase.ts:149` is a `prepare` call, not an `exec` call, and the list must add `SQLiteDatabase.ts:20`, `types.ts:101`, and `guides/sqlite.md:32`, `:80`, `:113`, `:275`.

**Lane EXCEPTION/high:** drop

## s18-12 — DRIFT-RESHAPE

12. package=sqlite file=`src/server/types.ts:125` (and `src/server/SQLiteDatabase.ts:100`) rule=`.claude/rules/names.md` § General vocabulary ("Properties are nouns; methods are verbs"), § Value-level identifiers verdict=CONFIRMED
    wrong: `transaction<R>(scope)` is a noun naming a method that runs work. It is not an accessor, so the manager-accessor noun form does not cover it.
    repair: Rename to `transact<R>(scope)` at `types.ts:125` and `SQLiteDatabase.ts:100`, and update `SQLiteDatabase.ts:126`, `types.ts:107-113`, `guides/sqlite.md:108`, `:109`, `:147`, `:157`, `:268`, `:269`.

### Verification

**Judge (DRIFT-RESHAPE/high):** The noun-named method is a real violation of the quoted rule, and the subjective lane's blanket EXCEPTION overstates its case: the nearest sibling wrapper uses verbs (`read` / `write`) and its driver omits `transaction` entirely, so `transaction` is fixed at the driver layer rather than the wrapper

**Lane DRIFT-RESHAPE/high:** amend: do not rename `sqlite` alone. Either run the rename fleet-wide in layer order (`@orkestrel/database` at `types.ts:408` and `:599` first, then `sqlite`), or record `transaction(scope)` as the shared database-domain term and close the finding against that decision. If the rename proceeds, add `guides/sqlite.md:32` and `:79` to the site list.

**Lane EXCEPTION/high:** drop

## s18-15 — DRIFT

15. package=sqlite file=`src/server/helpers.ts:59-63` rule=`.claude/rules/architecture.md` § Centralized-file pattern, `.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: `bindParameters` is a barrelled public export whose return type is an anonymous union declared inline in the signature. A public function's return type is a public type and belongs in `types.ts`; a consumer cannot name it to hold the result.
    repair: Declare `export type SQLiteBinding = { readonly positional: readonly SQLiteValue[] } | { readonly named: Readonly<Record<string, SQLiteValue>> }` in `types.ts`, annotate `bindParameters` with it at `helpers.ts:61-63`, and add the row to the surface table in `guides/sqlite.md`.

## s18-30 — DRIFT

30. package=sqlite file=`src/server/types.ts:131` rule=`.claude/rules/documentation.md` § Parity, `.claude/rules/writing.md` § Code tokens, references, and links verdict=CONFIRMED
    wrong: The `begin()` TSDoc points a consumer at `guides/src/sqlite.md`. The guide is at `guides/sqlite.md`; `guides/src/` does not exist in this checkout.
    repair: Correct the path to `guides/sqlite.md` at `types.ts:131`.

