# Unit U-styles-guide — the `## Styles` section of the one guide

## Role and engine

`opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold repair`;
no tree-wide `format` or lint `--fix`; never `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`.

## Objective

Record the styles-environment pilot in `guides/veneer.md` so a consumer learns how to load the
cascade and a later scaffold generator can read the axis's shape and every departure from the
workspace rules with its cause. The design verdict
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/styles-axis-design-verdict.md`) fixes
the section's name, place, and contents; U-styles-config (`units/u-styles-config-report.md`
beside it) fixed the facts.

## Law

From `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md` § Writing; `.claude/rules/writing.md`;
`.claude/rules/documentation.md` (§ Parity, § Guide examples: fences import through the published
specifier); `.claude/rules/workspace.md` (every row naming `styles`). Veneer's `tests/guides.test.ts`
is the gate: fence languages `ts`, `css`, `scss`, `html`; backticked API names must resolve to real
exports, so the section names file paths and script names and never a bare identifier.

## Context

`guides/veneer.md` carries `## Surface`, `## Methods`, `## Examples`, `## Tokens` (with its
subsections), `## Showcase`, `## Tests`. `guides/README.md:17` says "That guide's § Tokens is the
reference for the stylesheet face". The user's rulings: one guide per package; nothing about RTL
(write no sentence about `index.rtl.css`); Veneer pilots the styles environment scaffold does not
generate.

## Scope

**Owned.** `guides/veneer.md` (the new section and its links), `guides/README.md` (the sentence
at line 17). **Off-limits.** Everything else.

## Execution

Perform the assignment directly and spawn nothing.

1. Add `## Styles` between `## Examples` and `## Tokens`, opening with one paragraph naming the
   published artifact and one fence loading it through the published specifier
   (`import '@orkestrel/veneer/styles'` in a `ts` fence, with the sentence that the specifier
   resolves to standalone CSS and a `<link>` consumer serves the resolved file).
2. `### Files` — a table: `src/styles/index.scss` (the compilation barrel), `src/styles/index.ts`
   (the side-effect entry and the build's lib entry), `configs/src/vite.styles.config.ts` (the
   wrapper, composed from the root's browser factory), `configs/src/tsconfig.styles.json`
   (check-only), `tests/setupStyles.ts`, `tests/src/styles/`. Read each file before describing it.
3. `### Scripts` — a table: `build:src:styles`, `check:src:styles`, `test:src:styles` with each
   one's contract and parent chain (`build:src`, `check:src`, `test:src`), and the sentence that
   `test:src:styles` builds first because the proof's subject is the compiled cascade.
4. `### Departures from the workspace rows` — the numbered list from the verdict, each with its
   cause, in this order: no `@src/styles` alias (the root `tsconfig.json` is content-owned; the
   shell imports `../../src/styles/index.scss`; a generator that emits the alias widens the
   `import/no-unassigned-import` allowlist in the same release); the wrapper composes the root's
   browser factory and replaces its differing fields by assignment because the root cannot carry
   a styles factory and the root's merger keeps a base plugin no override names (the browser
   environment boundary) and concatenates every other array (write that reason, and never that
   the merger cannot replace the output boundary: it replaces a same-named plugin, and every
   output boundary shares one name); no environment boundary and no lint fence owns `src/styles`; `src:styles` is
   registered in its own wrapper, so the root's `--project` selection and the `probe` workbench
   cannot reach it; the vendored `tests/config.test.ts` iterates the generated environments and
   asserts nothing about the axis; `tests/setup.css` arrives with the Tailwind unit. Close with
   the generator sentence: scaffold's `SRC_MATRIX` is closed on `core`, `browser`, and `server`,
   so the axis is hand-authored and its two configuration files are package-owned; emitting it
   means the alias in the root `tsconfig.json`, the lint allowlist entry and fence, a `src/styles`
   owner in the environment boundary, a `srcStyles` factory and project registration in the root
   `vite.config.ts`, and the environment lists in `tests/config.test.ts`.
5. Rewrite `guides/README.md:17` so § Styles is the reference for the stylesheet face's build and
   loading and § Tokens for what it declares.
6. Gates: `npm run test:guides`, `npm run test:policy`, `npm run format:check`.

## Output

Write `u-styles-guide-report.md` and return its content: the section as written, the
README sentence, each gate's final lines, deviations in the usual shape.

## Deviation contract

Stop and report on: a guide gate red after your own fix; a fact in the verdict the tree
contradicts. Decide, record, and carry on from: wording within the meaning fixed here, table
column names.

## Acceptance criteria

1. `## Styles` sits between `## Examples` and `## Tokens` with the four parts above.
2. No sentence names `index.rtl.css` or `rtl`.
3. `guides/README.md:17` names § Styles and § Tokens as stated.
4. `test:guides`, `test:policy`, `format:check` exit 0.
5. `git status --porcelain` shows only the two owned files and the report.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; `guides/veneer.md`.
