# Audit brief — U5 `d7-guide-drift-cost` (`45832d8`) and `d7-guide-links-fix` (`7c60ea1`) in `/home/user/fleet/guide`

## Lanes

Three lanes, blind, clean contexts, one brief: a **subjective** lane (`reviewer`, Opus 5: design fit, naming, the doc blocks' voice, the guide's prose), an **objective** lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: correctness, what the code permits, the evidence behind every claim), and a **checker** (`checker`, Sonnet: the mechanical claims, scope honesty, report honesty). Each lane reads the evidence, then the tree at `7c60ea1`, and rules every claim with `file:line` evidence.

## Evidence (under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`)

- U5: `d7-guide-drift-cost-brief.md`, `d7-guide-drift-cost-report.md`, `d7-guide-drift-cost.diff.txt`, `d7-guide-drift-cost.status.txt`; the timing instrument retained as `instruments/d7/u5/timing.mjs`.
- The links fix: `d7-guide-links-fix-brief.md`, `d7-guide-links-fix-report.md`, `d7-guide-links-fix.diff.txt`, `d7-guide-links-fix.status.txt`; the audit that produced its findings, `d7-guide-links-audit-verdict.md`.
- The tree: `/home/user/fleet/guide` at `7c60ea1` (`git log --oneline -3` reads `7c60ea1`, `45832d8`, `caa97b2`); `src/core/helpers.ts`, `src/core/sources/Source.ts`, `src/core/types.ts`, `src/core/index.ts`, `guides/guide.md`, `tests/src/core/helpers.test.ts`, `tests/src/core/sources/Source.test.ts`.
- The rules: `/home/user/scaffold/AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/tests.md`, `.claude/rules/writing.md`, `.claude/rules/documentation.md` § Parity.

## Claims

U5:

1. The U5 diff touches `guides/guide.md`, `src/core/helpers.ts`, `src/core/sources/Source.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/sources/Source.test.ts` and nothing else; `src/core/types.ts`, `package.json`, and the lockfile are unchanged; the version stays `0.0.18`.
2. `collectDeclarations` is a module-scope export of `src/core/helpers.ts` reached through the barrel, carries a doc block in the repository's voice, has a `## Surface` row in `guides/guide.md` whose `Summary` equals its description paragraph in the compared form, and is tested for the map's keying over interface, generic-with-base, and class heads, a file with no head, a head opening no column-zero close, a repeated key, and an absent or metacharacter-carrying name; `extractDeclaration` is the named lookup over it and keeps its callers.
3. `Source` memoizes the scope's declaration map, each name's members, and each example collection per instance, keyed so no argument answers under another's key (the module-wide `examples()` under the absent name), and a second instance derives its own; the memo guard in `Source.test.ts` pins expected records and the report's planted control (one shared slot) reddens exactly that case.
4. `#scanDeclarations` keeps the earlier per-file rules in the same order: `selectModuleKeys` in sorted order, the first file's entry for a key, an entry with neither body nor bases skipped; `#scanMethods` keeps the interface-then-class resolution `methods` inlined before; every returned record of `findDrift`, `surface()`, `methods()`, `examples()`, and `collectTitles` is unchanged (the instrument's `drift 0` on both readings; `test:src:core` 611, `test:guides` 54, `test:policy` 90 green).
5. The doc claim "a head that opens no column-zero close is skipped and the scan continues, so a later real declaration still answers" was unreachable on both readers, and the corrected sentence ("a head that opens none records nothing") is true of the code at `7c60ea1`; the guide's extraction-model prose says the same.
6. No nested function, no assertion, no `any`, every returned collection readonly (`ReadonlyMap`, `readonly MethodEntry[]`), no compatibility shim, the memo fields `#`-private; the helper's name and the memo's shape fit `.claude/rules/architecture.md` (one class per file, helpers centralized) and `.claude/rules/names.md`.

The links fix:

7. The rule in `normalizeSummary` is: a module part before `#` is a token carrying `@` or `/`; text before a `#` carrying neither travels whole. The regex `(?:import\([^)]*\)\.|[^}|#\s]*[@/][^}|#\s]*#)?` implements that rule and only that; `{@link @scope/pkg#Name}` → `` `Name` ``, `{@link ./widgets.js#Widget}` → `` `Widget` ``, `{@link Owner#member}` → `` `Owner#member` ``, `{@link #member}` → `` `#member` ``, the inline import form unchanged, a label still rendered whole.
8. The new cases read red before the rule changed (`2 failed | 611 passed`) and green after (`613 passed`); the renamed case `drops the module part of a package-qualified target` keeps its assertions and gains the path-qualified one; no existing case moved.
9. One term throughout: "TSDoc's package-qualified form" in the doc block, the `@remarks`, the guide bullet, and the test name; "JSDoc's member reference" for what travels whole; `declaration reference` appears nowhere in the package; the bullet in `guides/guide.md` states one clause in one line with one example and ends ", outside a located span."; the description's module-part clause binds to the target, not the label.
10. `guides/guide.md`'s `normalizeSummary` cell was written by `npm run docs -- --to guide` (not by hand) and `npm run docs` reads `rows read: 1, disagreements found: 0` after `npm run build`.
11. Every fleet `#` form the report measured renders as the guide cell documenting it writes it (`template/guides/template.md:38` against `template/src/core/types.ts:57`: agree), and the fleet writes no unscoped package-qualified target, so the rule's stated limit (`{@link pkg#Name}` travels whole) has no live consumer.
12. Both reports' `file:line` citations match the tree the units left; neither states a count in prose; U5's report names the scope judgment it left to the Orchestrator (a new module-scope export, `types.ts` untouched) rather than deciding it.

## Output

Per claim PASS, FAIL, or CANNOT RULE with `file:line` evidence; findings outside the claims (each with what right looks like); one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`. Open with `Lane held: <lane>`. You run no command and edit nothing; read the retained diffs and reports, then the tree. No process diary. Perform the assignment directly and spawn nothing.
