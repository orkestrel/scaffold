# Veneer tree conformance audit — the built tree against scaffold's law, first half

## Role and engine

Two lanes read this one brief, blind to each other, each a clean-context native subagent that
performs the assignment directly and spawns nothing, edits nothing, and runs nothing:

- `checker` on native Sonnet — the letter of the law: every rule sentence a file, a name, a
  declaration, or a placement breaks.
- `reviewer` on native Opus 5 — design fit and convention: what the fleet's packages actually do,
  API shape, naming, guide voice, test practice.

## Objective

List every place the Veneer tree, as built so far, departs from scaffold's `AGENTS.md`, its rule
files, and the fleet's conventions, so each can be corrected before another unit builds on it.
The defect class to catch: `src/browser/color-mode/ColorMode.ts` nests one class in a
singular, hyphenated folder, where `.claude/rules/architecture.md` § Entity subfolders nests
class files only for a family, in a lowercase plural folder, and `names.md` § Files and folders
fixes the domain folder form; the fleet keeps a lone class flat (`scaffold/src/core/Compiler.ts`,
`console/src/core/Capture.ts`) and nests a family (`console/src/core/loggers/Logger.ts`). That
instance is known; find its siblings and everything else.

## Context

Law, read completely first, from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`;
`.agents/orchestration.md` § Permission floor (you run nothing); every `.claude/rules/*.md`
(`names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `workspace.md`,
`application.md`, `browser.md`, `styles.md`, `portability.md`, `documentation.md`, `writing.md`,
`quality.md`); `guides/scaffold.md` § Reading a target. Fleet convention evidence: the `src/`,
`app/`, `tests/`, and `guides/` layouts of `C:/Users/mikes/WebstormProjects/test`,
`C:/Users/mikes/WebstormProjects/roughnotes`, and `C:/Users/mikes/WebstormProjects/console`.

Subject: `C:/Users/mikes/WebstormProjects/veneer`, this half only — `src/browser/**`,
`app/**`, `tests/src/browser/**`, `tests/app/**`, `configs/**`, `vite.config.ts`,
`tsconfig.json`, `package.json`, `.oxlintrc.json`, `.oxfmtrc.json`, `.editorconfig`,
`.gitattributes`, `.gitignore`, `.prettierignore`, `tests/setup.ts` as it stands at `HEAD`
(`git show HEAD:tests/setup.ts` is off-limits because you run nothing; read the working copy and
note that a live writer may be editing it), `tests/guides.test.ts`, `tests/conformance.test.ts`,
`tests/distribution.test.ts`, `tests/config.test.ts`, `tests/setupBrowser.test.ts`,
`tests/setupConformance*.ts`. A writer (U3) is live in the checkout and owns `src/styles/**`,
`src/core/**`, `tests/src/styles/**`, `tests/src/core/**`, `tests/setupStyles*.ts`,
`tests/setupBrowser.ts`, `guides/veneer.md`, `guides/tokens.md`, `guides/README.md`, and
`README.md`: do not read those, and do not report on them; they are audited at that unit's own
round. Vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `AGENTS.md`, `CLAUDE.md`,
`.claude/**`, `scripts/**`) are scaffold's and are outside the subject, except where a
package-owned file contradicts what they require.

Judge each file against the rules that name it: placement and kind purity, one class per
implementation file, no module-scope declaration outside a kind file, barrel shape, naming forms
(`{Entity}Interface`, `{Entity}Options`, single-word entity members, lifecycle vocabulary), the
non-negotiables (`any`, assertions, non-null, `@ts-` directives, default exports, mocks and
spies, readonly), test rules (mirroring, helpers in `tests/setup*.ts`, browser test practice,
fixtures placement), workspace and application rules (environment boundaries, entries, config
wrappers), and writing rules in TSDoc and comments (counts, banned terms, time words).

## Output

One table `Site (file:line) | Finding | Law or convention (file:line, quoted) | Weight |
Correction`, weight one of `forces a fix` (the tree holds something a rule forbids or the fleet
does not do) or `bound` (permitted, but a reader could misapply); rows ordered by weight, then
by path. Group siblings of one defect into one row naming every site. Then one paragraph naming
the law files and subject files read, and any file you could not read. No verdict line, no
process diary.
