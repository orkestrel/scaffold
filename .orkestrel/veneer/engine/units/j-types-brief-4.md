# Unit J-TYPES — successor brief 4: the per-element entry of the sanitizer dictionary

This brief supersedes `j-types-brief-3.md` for the unit's fourth round. What changed and why: audit round 3 (`j-types-audit-3-verdict.md`, terminal line `FAIL 2`) found that `SanitizerConfig.elements`, typed `readonly string[]`, cannot express R10's per-tag attribute allowlist (Bootstrap keeps `href` on `a` and drops it on `b` under `allow: { a: ['href'], b: [] }`), while the HTML standard's dictionary admits a `{ name, attributes }` entry in `elements` and Chromium 153 honours it (the Orchestrator's probes `j-types-3-probe-sanitizer-2.log.txt`, `perElement`, and `j-types-3-probe-sanitizer-3.log.txt`, `perElement.plusGlobal`, `perElement.bHref`, `elementsOnly.data`, `elementsOnly.dataFalse`). Round 3's tree stays uncommitted in the worktree; this round edits on top of it.

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`. The executor that opens this brief is that subagent, the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` (branch `unit/types`, base `1868007` of Veneer `main`), whose tree carries round 3's edits to `src/browser/types.ts` and `guides/veneer.md`, uncommitted.

## Objective

Apply edit E12 so the sanitizer dictionary mirror expresses a per-element attribute list, its `dataAttributes` field states the platform's defaults and validity constraint, and the rationale for the mirror sits in one home under one name for the standard, with the guide's rows in parity and every check green, the scoped browser build first.

## Context

**Evidence.** Round 3's diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-3.diff` (the declarations you edit, around lines 396 to 437 of `src/browser/types.ts`); the reconciled verdict `j-types-audit-3-verdict.md` and the lane verdicts `j-types-audit-3-objective-verdict.md` (claim 2's failing input) and `j-types-audit-3-subjective-verdict.md` (F1, B1, B3); the probe readings, taken by the Orchestrator on Chromium 153.0.8010.12 through `setHTML`'s dictionary path: `j-types-3-probe-sanitizer-2.log.txt`, where `{ elements: [{ name: 'a', attributes: ['href'] }, 'span'], attributes: ['class'] }` over `<a href="https://x" title="t" class="c">a</a><span href="https://y" class="c">s</span>` yields `<a href="https://x" class="c">a</a><span class="c">s</span>`; and `j-types-3-probe-sanitizer-3.log.txt`, where `{ elements: ['span'] }` (no `attributes`) keeps `data-x`, `title`, and `class` on the span, `{ elements: ['span'], dataAttributes: false }` throws `TypeError: Failed to execute 'setHTML' on 'Element': Invalid Sanitizer configuration.`, `{ elements: [{ name: 'a', attributes: ['href'] }, 'b'] }` with no global list keeps `href` on both `b` and `a` (the safe baseline's attributes apply where no `attributes` list is given), and `{ elements: [{ name: 'a', attributes: ['href'] }, 'b'], attributes: ['class'] }` keeps `href` on `a` alone and `class` on both. The installed 6.0.3 library's declaration of the dictionary and its entry type: `node_modules/typescript/lib/lib.dom.d.ts` around lines 2640 to 2658 (`SanitizerConfig`, `SanitizerElementNamespaceWithAttributes`), read for the field names, never referenced from the contract.

**Law.** As in `j-types-brief-3.md`: `AGENTS.md`; `names.md` (a mirrored external dictionary keeps its field names and its TSDoc names the format), `typescript.md` § TSDoc, `documentation.md` § Parity, `writing.md`; E6 and E7 in `decisions.md`; skill: none.

**Host and standing conditions.** As in `j-types-brief-3.md`. The tree is dirty with round 3's two modified files and stays so; commit nothing.

## The edit

- **E12 (round-3 claim 2, F1, B1, B3).** Declare `export interface SanitizerElementNamespaceWithAttributes` beside `SanitizerConfig`, the mirror of the HTML standard's dictionary of that name (the installed 6.0.3 library declares it at `lib.dom.d.ts` around line 2655 with `name`, `namespace`, `attributes`, and `removeAttributes`; the mirror carries the two fields R10 uses), with `readonly name: string` (the element name) and `readonly attributes?: readonly string[]` (the attribute names kept on that element beside the global `attributes` list); the standard's `elements` entry is its `SanitizerElementWithAttributes` typedef, a string or that dictionary, which the `elements` leaf's union expresses without a second alias, its summary in the `-s` verb voice without naming the symbol and its `@remarks` naming the standard's dictionary. Type `SanitizerConfig.elements` as `readonly (string | SanitizerElementNamespaceWithAttributes)[]`, its TSDoc stating that a string names an element kept with the global attributes and an entry names an element kept with its own attributes as well. Rewrite the `dataAttributes` TSDoc: if `true`, every `data-*` attribute is kept; if `false`, each is dropped; the field is valid only beside `attributes`, and the platform refuses a configuration that names it alone; Default: kept when `attributes` is absent, dropped when `attributes` is given. Move the rationale for the mirror into one home, the `@remarks` of `SetHTMLOptions` (the owner of the `sanitizer` field), stating that the declaration rollup compiles with TypeScript 5.9.3, whose DOM library declares no sanitizer types, so the contract carries the dictionary rather than a sanitizer object; leave the `SanitizerConfig` and `SanitizeTargetInterface` remarks to what each type is, with no second copy of that rationale. Name the source "the HTML standard" in every sentence that names it (no "WHATWG"). Add the `SanitizerElementNamespaceWithAttributes` § Surface row beside `SanitizerConfig`, and update the `SanitizerConfig`, `SetHTMLOptions`, and `SanitizeTargetInterface` rows where their description paragraphs change.

## Unknowns

1. Whether oxfmt re-pads the § Surface table for the new row or a widened Summary: format a scratch copy first and report the hunks.

## Scope

**Owned.** `src/browser/types.ts`; in `guides/veneer.md`, the § Surface rows of `SanitizerElementNamespaceWithAttributes`, `SanitizerConfig`, `SetHTMLOptions`, and `SanitizeTargetInterface`, and the `SanitizeTargetInterface` § Methods table.

**Shared (report-only).** None. **Off-limits.** Every other file, as in `j-types-brief.md` § Scope.

**Tools and limits.** As in `j-types-brief-3.md`, `npm run build:src:browser` included as the first acceptance command.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write the report to `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/j-types-report-4.md` and return its path with a five-line summary. The report carries: the declarations after the edit, verbatim; the rulings you took with the rule that bounds each; the output of every acceptance command verbatim, the rollup's exit code first; the type probe of criterion 4 with its exact diagnostics; the answer to the Unknown; `git status --short`, `git diff --stat`, and the full diff, naming which hunks are this round's. No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Ancillary choices you settle yourself: every sentence's wording and the order of the leaves. Stop and report when the rollup fails after the edit or an off-limits file must change.

## Acceptance criteria

1. `npm run build:src:browser` exits 0 in the worktree, reported first and verbatim.
2. `npm run check:src:browser` exits 0; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts` and `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md` exit 0.
3. `grep -n "Sanitizer" src/browser/types.ts` returns no reference to the global `Sanitizer` as a type, value, or constructor, and `grep -n "WHATWG" src/browser/types.ts guides/veneer.md` returns nothing.
4. A type-level probe compiled with `npx tsc --ignoreConfig --noEmit --strict --exactOptionalPropertyTypes --lib ESNext,DOM --target ESNext --module preserve --moduleResolution bundler --allowImportingTsExtensions` against the worktree's `types.ts` compiles a `SanitizerConfig` value `{ elements: [{ name: 'a', attributes: ['href'] }, 'b'], attributes: ['class'], dataAttributes: false }` and a value `{ elements: ['span'] }`, and refuses `{ elements: [42] }` and `{ elements: [{ attributes: ['href'] }] }` (no `name`), with the exact diagnostics reported.
5. `npm run test:guides` and `npm run test:policy` pass, each reported verbatim.

**Observations, not criteria.** `npm run test:src:browser -- tests/src/browser/index.test.ts`.

## Review evidence

The actual diff and the actual `git status --short` of the worktree, captured by the Orchestrator beside this brief as `j-types-4.diff` and `j-types-4-status.txt`, and the report named under Output.
