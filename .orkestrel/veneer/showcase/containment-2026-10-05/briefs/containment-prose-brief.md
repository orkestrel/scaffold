# Unit containment-prose — Guide and roadmap text for the showcase containment ruling

## Role and engine

`opus` as a native subagent in the worktree `/home/user/.wave/veneer-containment` after the proofs unit lands its changes there; sole writer of the owned files. Executor: NATIVE_SUBAGENT.

## Objective

The guide states the specimen geometry contract the containment ruling made true, with every case title it names resolving to a proof, and the roadmap carries the landing row and the deferred follow-up.

## Context

- **Evidence.** `/home/user/veneer/tmp/units/containment/design-verdict.md` (ruling, deferred items, amendment text), `tmp/units/containment/markup/report.md` (the spellings applied, the census-2 readings), `tmp/units/containment/proofs/report.md` (the proof titles and their red and green readings), `tmp/units/containment/planner-proposal.md` § Guide changes (the drafted paragraphs, adopted with the edits below).
- **Where the text goes.** `guides/veneer.md` § Showcase (opens at about `:2079`; the chrome paragraph near `:2102`), a new subsection `### Specimen geometry` after § Faces (`:2160`) and before § Class coverage, and the composition table's `w-100` sentence (`:1321-1324`), which survives unchanged as a statement about a consumer's markup. `ROADMAP.md`: a row beside `:144` (the showcase landing row) and a § Next item for the deferred Tailwind-section percentage reference specimen.
- **Law.** `/home/user/scaffold/.claude/rules/writing.md` (voice, `must`/`can`, no `should`, present tense, numerals, serial comma, headings in sentence case), `/home/user/scaffold/.claude/rules/documentation.md` (every case title backticked in the guide resolves to a test title; a prose claim about behavior has an executed assertion behind it; introduce every table with a sentence), `/home/user/scaffold/AGENTS.md` § Writing.
- **Parity.** `npm run test:guides` reads the guide against the sources; `npm run test:policy` sweeps the prose for banned terms; the proofs' titles are the ones the proofs unit landed, read from its report, never from the planner's draft.
- **Host.** Node and the queue as the markup brief states; `test:guides` and `test:policy` are Node suites and run through the queue with `env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH`.

## Unknowns

- Whether the guide's § Faces sentence "the three faces render the same markup" needs a clause: it stays true (the markup is the same under every face) and gains no clause; say so in the report if a reviewer could read it otherwise.

## Scope

- **Owned.** `guides/veneer.md` § Showcase, § Faces (no sentence change expected), the new § Specimen geometry; `ROADMAP.md`.
- **Shared (report-only).** The scaffold flip verdict amendments (rulings 4, 8, 14, the chrome paragraph): the design verdict carries the text; the Orchestrator applies it in scaffold.
- **Off-limits.** Every other guide section; `app/**`; `tests/**`; `src/**`.
- **Made false by this change.** `tests/guides.test.ts` parity when a backticked title does not resolve; `tests/setupPolicy.ts` prose sweep on a banned term.
- **Tools and limits.** Read, Edit, Write, and the two queued Node suites; no commit.

## Text to land

1. **§ Showcase, after the chrome paragraph (about `:2102`):** "A card body whose specimens each fill its width carries the `vstack` class and a `row-gap-*` class, and those specimens carry no width class, because a `vstack` child takes the full width under every face; a card body whose specimens sit side by side keeps the `d-flex` and `flex-wrap` classes."
2. **New `### Specimen geometry` after § Faces.** Opening paragraph: "Every specimen holds the geometry the `bootstrap` face gives it under the other two faces. Tailwind defines Bootstrap's percentage names `w-25`, `w-50`, `w-75`, `w-100`, `h-25`, `h-50`, `h-75`, `h-100`, `top-50`, `top-100`, `bottom-50`, `bottom-100`, `start-50`, `start-100`, `end-50`, and `end-100` as spacing multiples, so under the `tailwindcss` face the `w-100` class reads `400px`, as the composition table in the Tailwind compatibility sheet section states. The page writes those names only in the Sizing matrix and the Position utilities section, which demonstrate them: their frames clip, so a marker that Tailwind's reading moves stays inside its figure, and each caption states the reading under the layer. Elsewhere the page spells each intent with names both systems read alike, as the following table states:" then the table with columns Intent, Spelling, Specimen and these rows: fill the card body (a `vstack` card body and no width class; Alerts); a fraction of the container (`col-3`, `col-6`, `col-9`, or `col-12`; Progress, the carousels); center a sized box on one axis (`start-0 end-0 mx-auto`, or `top-0 bottom-0 my-auto`; tooltip and popover arrows); center content over a box (`top-0 start-0 bottom-0 end-0` with `d-flex align-items-center justify-content-center`; Layer below the content); center a badge on a corner (a `top-0 end-0` anchor holding a `top-0 start-0 translate-middle` badge; Counters on buttons); a transform that keeps its place (`offset-6 translate-middle-x`; Fixed top and bottom); hold a frozen panel inside its frame (a positioned wrapper sized by `col-9` or by a `ratio-21x9` box; the offcanvas previews); a term that truncates inside a wrapping body (`mw-100` on the wrapper; the Typography description lists). Closing paragraph: "Bootstrap documents the grid column classes as widths outside a row for placeholders, and the exclusion keeps them Bootstrap's under the recipe, so a page of your own can write `col-12` where Bootstrap markup must read the same width with and without Tailwind." followed by one sentence per proof naming its backticked title and linking its file, in the form the guide uses elsewhere ("The `TITLE` case reads …; see the [browser journeys](../tests/app/browser/integration.test.ts)."), with the titles taken from the proofs unit's report.
3. **`ROADMAP.md`:** beside `:144` a row "Showcase containment, landed 2026-10-05 at `COMMIT`: specimen markup keeps one geometry under the three faces; the 16 percentage names stay in the Sizing matrix and the Position utilities section, whose frames clip; the containment, z-index, progress, and section proofs pin it." (the Orchestrator fills `COMMIT`), and under § Next: "A Tailwind-section percentage reference specimen that shows `w-50` beside `w-1/2` and the other fraction spellings under the three faces, which grows `TAILWIND_CLASSES`, regenerates `app/browser/recipe.json`, and adds the fraction tokens to the census limit (deferred by the containment verdict of 2026-10-05)."

## Execution

Perform the assignment yourself and spawn nothing.

## Output

The diff of the two files, `git status --porcelain`, and a short report `/home/user/veneer/tmp/units/containment/prose/report.md` naming each title resolved and the two suites' exits. No process diary.

## Deviation contract

Stop and report when a proof title in the proofs report differs from the design verdict's expectation in a way that changes a sentence's meaning, or when the parity suite refuses a link. Settle wording yourself within the writing rules.

## Acceptance criteria

1. Through the queue: `npm run test:guides` exit 0.
2. Through the queue: `npm run test:policy` exit 0.
3. `npm run format:check` exit 0 on the owned files.

**Observations, not criteria.** none.

**Measurement.** none.

## Review evidence

The diff and the report.
