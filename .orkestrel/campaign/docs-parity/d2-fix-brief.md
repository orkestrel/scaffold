# Unit brief — D2-fix: close the audit round's findings on guide-render, and build D5's locator

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent. Sole writer in `/home/user/fleet/guide`. Perform the assignment directly and spawn nothing.

## Objective

Every finding `d2-audit-verdict.md` round 1 carries closes as prescribed here (G1 to G10), and the package gains the one reader D5's seed needs, `locateComment`, so a seed can find a doc block by its compared key and splice a replacement back.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`, `.claude/rules/quality.md` § Instruments.
2. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d2-guide-render-brief.md`, `d2-guide-render-report.md`, `d2-audit-verdict.md`, `d2-audit-subjective.md`, `d2-audit-objective.md`, `d2-audit-checker.md`, `instruments/d2/r2-pipe-span-3.mjs` with `r2-pipe-span-3.log.txt`, and `plan.md` § Re-baseline (after D2 returned).
3. The files you own at their uncommitted D2 state, and the installed `@orkestrel/markdown` declaration at `node_modules/@orkestrel/markdown/dist/src/core/index.d.ts`.

## Standing conditions

- The tree carries D2's five modified files uncommitted (`guides/guide.md`, `src/core/constants.ts`, `src/core/helpers.ts`, `tests/guides.test.ts`, `tests/src/core/helpers.test.ts`); that state is what you edit. Never run a discard-class git command, never commit, never `npm install`.
- `node_modules/@orkestrel/scaffold` is the campaign's head start installed with `--no-save`; an `npm install` restores the registry copy over it.
- The parser's node discriminant is `element`, not `type`. A raw `|` inside a hand-written code span splits a table row at parse time; `renderMarkdown` writes a code span holding `|` inside a table cell as `` `\|` `` and reads it back to the same cell (the Orchestrator's measurement in `instruments/d2/r2-pipe-span-3.log.txt`).
- Linux, bash, Node v22.22.2; oxlint 1.81.0; the host's command classifier refuses `npx scaffold …`, and this unit needs no scaffold command.

## Edits, exact

**G1. The width is a caller's choice with a documented default.** Rename `WIDTH` to `WRAP_WIDTH` (`src/core/constants.ts:63`, its guide row, every `{@link}`). Its TSDoc states a character budget: the default number of characters a re-wrapped description line stays inside, counting a tab as one character; the `printWidth` claim goes from the TSDoc and the guide row. `replaceSummary` gains a third parameter `width` defaulting to `WRAP_WIDTH`; its TSDoc names the parameter and the character accounting.

**G2. One miss shape across the four replacers.** `replaceSummary` and `replaceExample` return `string | undefined`, and `undefined` means "not replaced", the meaning `replaceCell` and `replaceFence` already carry. `replaceSummary` returns `undefined` for a comment that is not a doc block and for a summary carrying no word (the empty summary no longer deletes; the doc block and the case named `leaves a block carrying its tags alone when the summary is empty` are rewritten for the refusal they prove); a tagless block with a matching summary returns the input. `replaceExample` returns `undefined` when no `@example` carries the title (or, for an untitled request, when the block carries no untitled `@example`) and when `example.code` carries a line its three-backtick fence cannot enclose (the objective lane's finding B); add the tagless-block case and the fence-enclosure case. Every TSDoc states its miss.

**G3. `replaceCell`'s identity check compares the compared forms** (`src/core/helpers.ts:2495`): normalize the argument the way `extractRowSummary`'s value is normalized before comparing. Add the case: a summary carrying a double space or a `{@link}` is a fixed point on the second run.

**G4. The compared form's code-span clause, in `normalizeSummary`.** Land these steps in this order: locate every single-backtick code span with no inner backtick (the delimiter set `buildCell` recognizes) before the `{@link}` expansion; expand `{@link}` outside those spans only, and leave a `{@link}` inside a span literal; collapse whitespace; then trim every boundary whitespace inside each located span, keeping one space for a span whose content is all whitespace. A multi-backtick span is outside the compared form's representable set and stays untouched; say so in the TSDoc and the guide. Update `normalizeSummary`'s TSDoc (the sentence "A code span stays a code span" becomes the trim rule), the guide's clause list at `guides/guide.md:353-357` ("Nothing else is transformed" and the `{@link}` sentence), and restore `` ` | ` `` at `guides/guide.md:497` (`src/core/types.ts:200` already says it). Rewrite `MethodGroup`'s description in `src/core/types.ts` so no code span carries a backtick (name the H4 heading that carries the interface name as a code span, without nesting), and name that exclusion in the guide's clause list. Cases: a padded span converges on both sides; a one-sided space; an all-whitespace span; a `{@link}` inside a span stays literal on both sides; a multi-backtick span untouched; the corpus round trip re-run after the clause with its reading recorded — the `\|` escape is measured, so a red there is a deviation, not a workaround.

**G5. The guide's prose.** Replace the round-trip sentence at `guides/guide.md:565-567` with the caller's obligation (the renderers produce the block a guide section contains, and reading one back parses it under the section heading the caller supplies), and add to `tests/guides.test.ts` an executed assertion that renders a Surface table, prefixes `## Surface`, and reads the symbols back. Remove "with one rule the campaign fixes" at `:591` and state the rule on its own authority (the guide fence wins on example content because a package's suite executes its guide's fences and nothing executes a doc comment). Rewrite the seed sentences at `:559` and `:594` in the present tense for what exists (a script you write reads the file, chooses the direction, and writes the result back; the gate reports and never writes). Rename the section heading to `The renderers and the replacers`.

**G6. The corpus tests read the real spans.** In `tests/src/core/helpers.test.ts`, build the corpus through `extractSourceLines` and `extractSourceComments` rather than a regex scan, and describe it honestly; assert a floor on the corpus size and on the described subset (a value tied to what `src/` ships); run one `replaceSummary` result through `collectSummaries` over `extractSourceLines` and assert the new description comes back.

**G7. `wrapText`'s over-length token.** Its TSDoc states that a token longer than the width stands on its own line; add the case.

**G8. The report.** Re-run each of the D2 report's four mutations against the shipped test file and record the totals from those runs (the D2 report's totals were taken two cases short); name every path the earlier `npm run test:probe` probe wrote and deleted; disclose every prose edit this round makes; state no count in prose.

**G9. `locateComment` for the seed.** Add `locateComment(text: string, key: string): <span> | undefined` in `src/core/helpers.ts`: over one file's text, the character offsets `{ start, end }` of the `/** … */` block a compared key (a `computeSymbolKey` symbol key or an `Owner.member` key) attaches to, read the way `extractSourceComments` attaches blocks, so a seed can `slice` the block, call `replaceSummary` or `replaceExample`, and splice the result with `spliceSpan`. Use the package's existing span record where one exists; otherwise add `SourceSpan { readonly start: number; readonly end: number }` to `src/core/types.ts` with its shape, guard, and contract. Cases over the D1 control fixtures (an overload set, a block separated from its declaration by a blank line, a block inside a template literal, a re-export-only barrel) plus a member key; a guide row; record the name you settle if `locateComment` cannot hold.

**G10. Instruments with logs.** Re-run `tmp/u3-wrap.mjs`, `tmp/u3b-width.mjs`, `tmp/u7-summary.mjs`, `tmp/u2d-control.mjs`, and `tmp/u2e-idem.mjs` against the tree after your edits, each writing `<name>.log.txt` beside itself under `tmp/`, and name the paths in the report; the Orchestrator retains them.

## Scope

- Owned: `src/core/types.ts`, `src/core/helpers.ts`, `src/core/constants.ts`, `src/core/shapers.ts`, `src/core/validators.ts`, `src/core/factories.ts`, `guides/guide.md`, `tests/src/core/**`, `tests/guides.test.ts`, `tmp/**`.
- Off-limits: everything else, `tests/setup.ts` included (the reader promotion stays recorded), `package.json`, `package-lock.json`, `configs/**`, `README.md`, `src/core/Guide.ts`, `src/core/sources/Source.ts`.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:guides`, `npm test`, `node tmp/<instrument>.mjs`. Never `npm install`, `npm run build`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -n "WIDTH" src/core/constants.ts src/core/helpers.ts guides/guide.md` prints `WRAP_WIDTH` sites only; `grep -n "export function locateComment\|export function replace" src/core/helpers.ts` prints the locator and the four replacers with `string | undefined` returns; `grep -n "campaign" guides/guide.md` prints nothing.
2. `npm run format:check` exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:src:core` exits 0 with the cases G2 to G7 and G9 name present, and the four mutation totals recorded against this suite.
4. `npm run test:guides` exits 0 with the G5 assertion and the G9 row present.
5. Observation: `npm test` exit code and last lines.

## Output

Write `/home/user/fleet/guide/tmp/units/docs-d2-fix-report.md`: one line per edit G1 to G10 with `file:line` at the final tree; the mutation table; the instrument paths; the corpus round trip's reading after the clause; each criterion with exit code and last lines; `git status --short` and `git diff --stat`; flagged claims; no count in prose. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when the corpus round trip reddens after the clause, when a criterion needs an off-limits file, when `locateComment`'s span cannot be derived from the readers `extractSourceComments` uses without a second scanner, or when a gate fails outside the owned files. The span record's name if `SourceSpan` collides, the case wording, and the placement of the G5 paragraph are yours to decide and record.
