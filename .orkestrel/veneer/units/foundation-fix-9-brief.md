# Unit foundation-fix-9 — the guide's per-surface contract sections

Fill every section. Write `none` in an empty one.

## Role and engine

`opus` on Claude Opus 5.5, native Agent dispatch. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/veneer` for this unit's duration. This lane has no shell: write the guide and the transcription, and name in your report the commands the Orchestrator runs for you, in order.

## Objective

Give `guides/veneer.md` one section per published surface (`.`, `./browser`, `./vue`, `./bootstrap`, `./tailwindcss`, `./styles`, `./styles/themes`) that states what the surface ships, its CSS and Sass import lines, the cascade-layer order statement and the layers the surface writes, a table of the consumer's override paths, and the real-Tailwind load-order limit, in the guide voice the rules fix, so `npm run test:guides` stays green and a consumer can predict the cascade from the guide alone.

## Context

- **Evidence.** The design round's verdict `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/foundation-design-verdict.md`: § The user's rulings (the lift unless pivotal; the drop-in baseline first; the optional Vue peer for `./vue` alone; "Bootstrap wins on a shared class" bound to the Tailwind compatibility layer; the showcase rebuilt by `prepublishOnly`), rulings 1 through 5 and 8, and § Proposal wording in `foundation-design-planner-proposal.md` § Proposal (one paragraph per surface) beside it. The rewritten `ROADMAP.md` in the veneer checkout (unit F3, landed before you) is the plan of record for every sentence you write about a surface; where the guide and the roadmap would disagree, stop.
- **Present shape** (read the tree). `guides/veneer.md` (created by `foundation-fix-2`, revised by `foundation-fix-3`) carries the tagline, the Surface table for `.` (`TOKEN_NAMES`, `TokenMap`, `TokenName`, `TokenLeaf`), and the flagship fence that `tests/guides.test.ts` transcribes; `guides/README.md` is the map. `README.md`'s pitch equals the guide's tagline. `src/*/_tokens.scss` open with `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;`; `src/bootstrap/_mixins.scss` holds `layer` and `unlayer` and `_tokens.scss` holds `$layered`; `src/styles/_mixins.scss` holds `retune`; `package.json` `exports` maps every CSS face to `dist/src/<face>/index.css` and its `/scss` twin to the Sass barrel, `./styles/themes` included. `tests/integration.test.ts` proves the composition and the override cases; `tests/src/<face>/index.test.ts` proves each face in Chromium.
- **Law.** The veneer checkout's own `AGENTS.md` and `.claude/rules/`: `documentation.md` (parity through `findDrift`; a Summary cell equals the doc-block description; a titled `@example` equals the guide fence; fences import through the published specifier; every backticked API resolves; falsify a prose claim the way you falsify a code claim, so a sentence about behaviour points at the proof that pins it), `writing.md` (present tense, `you`, imperative for recipes, no banned terms, introduce every list, table, and fence with a sentence, a code token followed by a noun, link text is a title introduced by `see`), `tests.md` (transcribe each flagship fence and assert the values its comments claim). `guides/README.md` keeps the concept index and the directory index.
- **Host.** Never commit. The policy sweep reads every authored Markdown file for banned terms; the Orchestrator runs it.

## Unknowns

- Whether `@orkestrel/guide` accepts a heading per surface without a `## Methods` table for a surface that ships no behavioural interface; `foundation-fix-2` pinned the present report, and the Orchestrator reads the guides proof after you.

## Scope

- **Owned.** `guides/veneer.md`, `guides/README.md`, `tests/guides.test.ts` (only where a fence you change is transcribed there), `README.md` (only the pitch line if the tagline changes).
- **Shared (report-only).** `src/core/constants.ts` (report a doc-block sentence you would change; do not edit).
- **Off-limits.** everything else in the veneer checkout, `.orkestrel/**`, everything under `C:/Users/mikes/WebstormProjects/scaffold`.
- **Made false by this change.** none.
- **Tools and limits.** Read, Grep, Glob, Edit, Write. No shell. The Orchestrator runs `npx oxfmt --config .oxfmtrc.json --check guides tests/guides.test.ts README.md`, `npm run test:guides`, and `npm run test:policy`.

## Execution

1. Read the verdict's rulings, the roadmap, the exports map, the three `_tokens.scss` files, both mixins files, and the proofs named under Present shape, so every sentence you write names a pinned behaviour.
2. For each surface, one `##` section in export order with: one paragraph of what it ships; a `css` fence with the `@import '@orkestrel/veneer/<face>'` line and a `scss` fence with the `@use '@orkestrel/veneer/<face>/scss'` line where the surface has one (for `./bootstrap/scss`, show `with ($layered: false)` as the drop-in form and say the built sheet is the layered form); the order statement and the layers the surface writes (Bootstrap: `bootstrap` plus unlayered `!important`; Tailwind: `theme`, `reset`, `elements`, `components`, `utilities`; styles: those plus `surfaces`, `composables`, `modifiers`; themes: `theme`; none writes `base`); a table of override paths (an unlayered `!important` later at equal or higher specificity; a layered `!important` at any specificity; a `--bs-*` token unlayered or in `theme`; source order inside the layer; any unlayered normal rule at any specificity, named as the one departure from a drop-in); and for `./styles/themes` the `data-vn-theme` opt-in, the island behaviour, the inheritance limit, and the rule that a pack root inside a dark ancestor carries its own `data-bs-theme`.
3. One `## Composition` section: the load-order rule (whichever Veneer sheet loads first fixes the order; a `@layer` statement may precede `@import`, so a consumer entry can open with the full statement), the real-Tailwind recipe (the full statement written inside the Tailwind entry before `@import 'tailwindcss'`, never a separate Veneer sheet linked ahead of a separately compiled Tailwind sheet, because Tailwind prepends its own `@layer properties;` to its compiled output and that layer, which carries the `@property` fallback for engines without `@property`, must stay first; shared class names withheld from the compatibility sheet and excluded in the recipe), and the limit when Tailwind loads first, each pointing at the proof in `tests/integration.test.ts` by its case title. The `properties` fact is measured in `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/absorb-tailwind-distillate.md` rows T8 and C3.
4. Keep the `.` section's Surface table and flagship fence as they are unless the roadmap changed a name; keep the transcription in `tests/guides.test.ts` equal to the fence.
5. `guides/README.md`: the concept index runs spec ↔ source ↔ tests ↔ showcase for each surface.

## Output

Write `C:/Users/mikes/WebstormProjects/veneer/tmp/units/foundation-fix-9-report.md` with: the files changed; the sections added; every proof each behaviour sentence points at; the commands for the Orchestrator in order; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when the roadmap and a proof disagree about a surface, when a sentence would claim a behaviour no test pins, or when the change needs an edit outside the owned files.

## Acceptance criteria

1. `npm run test:guides` and `npm run test:policy` exit 0 when the Orchestrator runs them; the scoped format check exits 0.
2. Every surface section carries the import lines, the order statement, the layers written, the override table, and the proof pointers; the Composition section names the first-load limit.
3. `git status --porcelain` adds only owned files.

**Observations, not criteria.** A doc-block sentence in `src/core/constants.ts` you would change.

## Review evidence

The diff and `git status --porcelain`; the report file; the Orchestrator's gate log.
