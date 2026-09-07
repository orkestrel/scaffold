# Orchestrator measurements — guide and TSDoc parity

Taken 2026-09-06 (23:3x to 23:5x UTC) on the four-CPU container, Node v22.22.2, scaffold at `f9117f0c`, guide at its phase A tip; scaffold's oxfmt 0.65.0 and oxlint 1.80.0, guide's oxlint 1.81.0. Each probe names its control.

## P1 — `renderMarkdown` fidelity (`instruments/p1/`, `p1-render.log.txt`)

Scaffold's `## Surface` table (19 committed lines, column-aligned) rendered through `@orkestrel/markdown`'s `renderMarkdown` comes back one-space padded (`| Name | Kind | Summary |`), so it is not byte-identical to the committed bytes; the render is idempotent over its own output. Control: an in-cell edit (`One` → `EDITED One` in the `Artifact` row) diffs the render; a first control that appended an extra cell did not, because the parser drops an excess cell, and is recorded as a mis-built control.

## P1b — oxfmt restores the committed form (`p1b-oxfmt-align.log.txt`)

`oxfmt --write` (0.65.0, scaffold's `.oxfmtrc.json`) over the one-space-padded render re-aligns the whole table byte for byte to the committed bytes. Reading: the gate compares parsed entries, never bytes; the propagation path is render or splice, then the checkout's own formatter, and the result is the committed form.

## P3 — the first equality run over scaffold's own guide (`instruments/p3/p3-equality.mjs`, `p3-equality.log.txt`)

Every exported declaration under `src/core` and `src/server` is paired by name with a Surface row and carries a doc block; every Surface row's `Summary` cell differs from its doc paragraph, and the difference is systematic: the guide carries the noun phrase (`One file in a plan, …`) and the doc block the third-person sentence (`Represents one file in a plan, …`; `Names …`; `Lists …`). The Methods rows differ the same way, and one method carries no doc block. Reading: under the amendment the guide cells adopt the sentence, which `npm run docs -- --to guide` does in one run per package, and the review of that run is the editorial cost the objective lane named. The instrument's guide reader locates the compared column by header (`Summary`, `Behavior`, `Role`) and its source reader attaches a block comment to the export it precedes by range through `parseSync`'s `ParseResult.comments`; the regex count of `/** … */ export` blocks exceeds the attached count by the non-declaration exports, which D1's control refines per shape.

## P4 — the `jsdoc` rewrite (`p4-jsdoc.log.txt`)

`oxfmt --write` with `jsdoc: true` over a copy of `src/core` rewrites every file that carries a block tag: it reorders tags (`@param` and `@returns` move after `@remarks` and `@example`), re-wraps lines, and tab-indents example fences inside the comment; the description paragraph's words are unchanged. Reading: `jsdoc` stays unset; the reader collapses whitespace and reads the paragraph before the first block tag, so wrapping is outside the comparison, and the `@example` reader unwraps the continuation marker and leading indentation before comparing bodies.

## P5 — an oxlint rule reporting on a comment (`instruments/p5/`, `p5-comment-report.log.txt`)

A throwaway plugin rule reads `context.sourceCode.getAllComments()`, whose members carry `type`, `value` (the text after `/*`, so a doc block's value begins with `*`), `start`, `end`, `range`, and `loc`, and `context.report` accepts both `{ node: comment }` and `{ loc: comment.loc }`; the diagnostic lands at the comment's position under oxlint 1.80.0 (scaffold) and 1.81.0 (guide). Reading: the voice rules can report on a doc block; `PolicyContext` re-declares that shape structurally.

## P6 — provenance spans

The installed `@orkestrel/markdown` declaration gives `parseProvenance` a `Map<MarkdownNode, MarkdownSpan>` with `start` and `end` per node, populated by the table and list collectors (`collectTable(lines, start, spans)`), so a table node's source span exists for the splice.

## P7 — the example pairs already known to disagree

`createBlueprint` (`src/core/factories.ts:36-42` against `guides/scaffold.md:762-773`, the guide's richer program executed by `tests/guides.test.ts:212-221`), `Materializer` (`src/server/Materializer.ts:117-127` against `guides/scaffold.md:1415-1426`, the guide adding the result read), and `Compiler` (`src/core/Compiler.ts:72-80` against `guides/scaffold.md:877-886`, diverged) — recorded from the absorption; under decision 4 the guide fence wins and the doc block adopts it in D6.

## P8 — a doc-comment edit moves the published declaration

`dist/src/core/index.d.ts` carries the doc blocks: the `@remarks`, `@example`, and `{@link` tags occur 291 times in the shipped file, so a TSDoc convergence changes the declaration a consumer installs and bumps the package under `.agents/orchestration.md` § What a bump obliges. The owner rules whether that bump rides the API-removal wave.

## P9 — the banned-term sweep over scaffold's own prose (`instruments/p9/`, `p9-terms.log.txt`)

The sweep D3 will vendor, run as a probe over every Markdown file scaffold authors (guides, `README.md`, `.claude/rules`, `.claude/agents`, `.codex`, `.agents`, `AGENTS.md`, `CLAUDE.md`, `ROADMAP.md`, `PROPOSAL.md`), with fence bodies and inline code spans excluded and every term of `.claude/rules/writing.md` § Substitutions whose ban is unconditional matched across inflections. Control: a file carrying one prose hit, one hit inside a fence, and one inside a code span reports the prose hit alone. `guides/scaffold.md`, `guides/README.md`, `README.md`, and `.claude/rules/writing.md` (its table's terms are code spans) report nothing. The hits: the fleet's guide mirrors under `guides/` (outside the sweep as mirrors; each package meets its own under D7.n), the `enterprise-bootstrap` references (`via`, `e.g.`, `etc.`, `easy`, `currently`, `just`), `.agents/orchestration.md`, `.agents/skills/orkestrel-debrief/references/field-testing.md`, `.agents/skills/orkestrel-falsify/references/reconcile.md`, `.claude/rules/architecture.md`, `.claude/rules/quality.md`, `AGENTS.md`, and `PROPOSAL.md` (outside the sweep's population). Reading: the canon the fleet vendors carries the hits, so a vendored sweep reds every target until scaffold's own prose is clean; a prose unit (D3-pre) precedes D3, and D3's brief names the population exactly.
