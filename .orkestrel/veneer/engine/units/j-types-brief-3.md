# Unit J-TYPES — successor brief 3: the declaration rollup's `Sanitizer` reference

This brief supersedes `j-types-brief-2.md` for the unit's third round. What changed and why: the landing gate chain on Veneer `main` at `1868007` (`j-types-landing-gates.log.txt`) failed `npm run build` at `build:src:browser`, where the declaration rollup (API Extractor 7.59.2, which bundles its own TypeScript 5.9.3 under `node_modules/@microsoft/api-extractor/node_modules/typescript`) stops with `Internal Error: Unable to follow symbol for "Sanitizer"`: that compiler's `lib.dom.d.ts` declares no `Sanitizer`, while the project's TypeScript 6.0.3 does, and `SetHTMLOptions.sanitizer?: Sanitizer` in `src/browser/types.ts` puts the global into the public declaration graph. The public contracts must reference no symbol the rollup's compiler lacks. The Orchestrator's probe (`j-types-3-probe-sanitizer.test.ts`, its readings in `j-types-3-probe-sanitizer.log.txt`, Chromium 153.0.8010.12) shows that `setHTML` accepts the HTML standard's `SanitizerConfig` dictionary as its `sanitizer` option and honours `elements`, `attributes`, and `dataAttributes` on that path exactly as the constructed `Sanitizer` did in terrain probe 2 (`aria-*` is still no wildcard; a `javascript:` `href` is dropped with the element kept), so the contract carries the dictionary and no `Sanitizer` object. E7 in `engine/decisions.md` records the R10 amendment.

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`. The executor that opens this brief is that subagent, the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` (branch `unit/types`, base `1868007` of Veneer `main`, installed from the lockfile), which is clean at dispatch.

## Objective

Remove every reference to the DOM global `Sanitizer` from `src/browser/types.ts` by declaring the `SanitizerConfig` dictionary the platform's `setHTML` reads, so `npm run build:src:browser` completes its declaration rollup, with the guide's § Surface row added and every check green.

## Context

**Evidence.** The gate report `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-landing-gates.log.txt` (gate 4's excerpt and the Orchestrator's reading at its end); the probe `j-types-3-probe-sanitizer.test.ts` and its log `j-types-3-probe-sanitizer.log.txt` beside it, whose `PROBE` line reads, for `{ sanitizer: { elements: ['b', 'a', 'span'], attributes: ['class', 'href', 'aria-label', 'title'], dataAttributes: false } }`, the output `<b class="c">b</b><a href="https://x" aria-label="l">a</a><span title="t">s</span>`, for `dataAttributes: true` the kept `data-x`, for `attributes` given and `dataAttributes` absent the dropped `data-x`, for `attributes: ['aria-*']` the dropped `aria-label`, for `{ sanitizer: {} }` the default safe baseline, and for a `javascript:` `href` the attribute dropped and the element kept; the round-2 delta `j-types-2-types-delta.diff` for the `SetHTMLOptions` and `SanitizeTargetInterface` declarations as they stand (around lines 400 to 428 of `src/browser/types.ts`); the design verdict R10 (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md`) as amended by E7 (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`).

**Law.** `AGENTS.md`; `.claude/rules/names.md` (§ General vocabulary: a mirrored external dictionary keeps its field names and its TSDoc names the format), `typescript.md` (§ TSDoc), `documentation.md` § Parity, `writing.md`; E6 (`decisions.md`): no alias, re-export, `@deprecated` tag, fallback path, or wrapper survives a change, and the unit deletes what its change makes dead, updating every consumer in this unit; skill: none.

**Host.** As in `j-types-brief.md`: Windows 11, Git Bash, the worktree root, npm `12.0.2`, no network. `npm run build:src:browser` writes `dist/src/browser/` in the worktree, which is expected and ignored; the rollup step is the one that failed on `main`, so its exit code is this round's proof.

**Standing conditions.** The worktree is clean at `1868007`. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and off-limits. The `collapse`, `dropdown`, `nav`, and `alert` cascade keys have landed on `main`; nothing in this unit reads them.

## The edit

- **E11 (gate 4).** Declare `export interface SanitizerConfig` in `src/browser/types.ts` beside `SetHTMLOptions`, a structural mirror of the HTML standard's `SanitizerConfig` dictionary carrying only the fields R10 uses: `readonly elements?: readonly string[]` (the element names kept), `readonly attributes?: readonly string[]` (the attribute names kept on every element), and `readonly dataAttributes?: boolean` (if `true`, every `data-*` attribute is kept; if `false`, each is dropped; Default: dropped when `attributes` is given, per the probe), each leaf's TSDoc naming the dictionary field it mirrors, the interface's summary naming the standard's dictionary. Change `SetHTMLOptions.sanitizer` to `readonly sanitizer?: SanitizerConfig` with its TSDoc stating the default is the platform's safe baseline. Rewrite the `SanitizeTargetInterface` `@remarks` and its `setHTML` `@example` so neither mentions or constructs a `Sanitizer` object: the remarks state that the DOM library of TypeScript 6.0.3 omits `setHTML` and that the declaration rollup's compiler declares no `Sanitizer`, so the contract carries the dictionary; the example passes `{ sanitizer: { elements: ['b'] } }`. Add the `SanitizerConfig` § Surface row to the guide (Kind `interface`, Summary equal to the description paragraph), keeping the table's padding as the formatter leaves it. `grep -n "Sanitizer" src/browser/types.ts` then returns only `SanitizerConfig` declarations and references and prose that names the dictionary or the platform's sanitizer method.

## Unknowns

1. Whether oxfmt re-pads the § Surface table for the new row: format a scratch copy first, as the earlier rounds did, and report the hunks.

## Scope

**Owned.** `src/browser/types.ts`; in `guides/veneer.md`, the § Surface rows of `SanitizerConfig`, `SetHTMLOptions`, and `SanitizeTargetInterface` and the `SanitizeTargetInterface` § Methods table.

**Shared (report-only).** None. `tests/src/browser/index.test.ts` stays unmoved (a type-only change); confirm with `npm run test:src:browser -- tests/src/browser/index.test.ts` and report the reading.

**Off-limits.** Every other file, as in `j-types-brief.md` § Scope.

**Tools and limits.** As in `j-types-brief.md`, plus `npm run build:src:browser` (the scoped browser build, this round's proof; never `npm run build`). No install, no commit, no push, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write the report to `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/j-types-report-3.md` and return its path with a five-line summary. The report carries: the declarations after the edit, verbatim; the rulings you took inside the owned scope with the rule that bounds each; the output of every acceptance command verbatim, the rollup's exit code first; the answer to the Unknown; `git status --short`, `git diff --stat`, and the full diff. No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Ancillary choices you settle yourself: the exact wording of every sentence, and the order of the three leaves. Stop and report when `npm run build:src:browser` still fails after the edit (paste its output whole), when an off-limits file must change, or when the rollup names another symbol it cannot follow.

## Acceptance criteria

1. `npm run build:src:browser` exits 0 in the worktree (the declaration rollup completes), reported first and verbatim.
2. `npm run check:src:browser` exits 0; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts` and `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md` exit 0.
3. `grep -n "Sanitizer" src/browser/types.ts` returns no line referencing a `Sanitizer` type or constructor: every hit is `SanitizerConfig` or prose naming the dictionary or the platform's sanitizer.
4. `npm run test:guides` and `npm run test:policy` pass, each reported verbatim.

**Observations, not criteria.** `npm run test:src:browser -- tests/src/browser/index.test.ts` (the Orchestrator takes the authoritative run).

## Review evidence

The actual diff and the actual `git status --short` of the worktree, captured by the Orchestrator beside this brief as `j-types-3.diff` and `j-types-3-status.txt`, and the report named under Output.
