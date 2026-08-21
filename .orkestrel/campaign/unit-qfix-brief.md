# Unit Q-fix: qualifier Premise two-mode precedence (batch audit F6)

## Role and engine

Role `builder`, engine Sonnet, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/qualifier`. Fully specified below. You perform the
assignment directly and spawn nothing.

## The finding

`Premise` carries a checked mode (`field` + `comparison`) and a described mode
(`description`), every member optional. `describePremise` (`src/core/helpers.ts`, the render
near lines 158-167) resolves an overlap by rendering the checked form and discarding
`description`, and a premise carrying `field` without `comparison` falls into described mode,
discarding the field. Neither behaviour is stated or fenced.

## The edits

1. `src/core/types.ts`, the `Premise` interface TSDoc: state the precedence — the checked
   form renders when `field` and `comparison` are both present and `description` is then
   unused; a premise missing either half of the checked pair renders as described. Keep the
   sentence to the observable rule; do not change any type.
2. `src/core/helpers.ts`, the `describePremise` TSDoc: add the described-mode example beside
   the existing checked example, and the same precedence sentence, per the fenced-example
   idiom the file already uses.
3. `guides/qualifier.md`, the clause near line 76 ("display-neutral evidence, checked or
   described"): expand it to state the precedence in prose.
4. `tests/src/core/helpers.test.ts`: two executed pins beside the existing render cases —
   a premise carrying `field`, `comparison`, AND `description` renders the checked form
   (assert the exact string, `description` absent from it); a premise carrying `field` and
   `description` but no `comparison` renders the described form (assert the exact string,
   the field name absent from it).

## Scope

- Owned: the four named files, the named passages only.
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs, or `git checkout`/`restore`/`stash`/`reset`/`clean`. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus the owned files;
   report before/after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned code files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`
   exits 0; totals reported.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The diff; raw output and exit code per criterion; any deviation. No process diary.

## Deviation contract

Stop on: either pin failing against the current renderer (that is a product finding about
`describePremise`, not a test to tune); a criterion unreachable. Wording within the fixed
content is yours: decide, record, carry on.
