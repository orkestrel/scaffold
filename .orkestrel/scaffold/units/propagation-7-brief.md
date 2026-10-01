# Unit propagation-7 — the rule and skill sentences for surfaces and extensions

Fill every section. Write `none` in an empty one.

## Role and engine

`opus` on Claude Opus 5.5, native Agent dispatch, edits only. You have no working shell on this host: run no command, and list under Output the commands the Orchestrator runs for you. You are the sole writer of Markdown under `.claude/rules/`, `AGENTS.md`, and `.agents/skills/orkestrel-journey/SKILL.md` in `C:/Users/mikes/WebstormProjects/scaffold`; a code unit edits `src/`, `tests/`, and `configs/` at the same time, so never touch those.

## Objective

Land ruling 7 of `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-design-verdict.md`, with the setup amendment in ruling 2, as directive sentences in the rule files, `AGENTS.md`, and the journey skill, so an agent working in a generated workspace or in a target reads the surfaces, the extensions, the setup proof law, and the placement law from the rules rather than from veneer's hand edits.

## Context

- **Evidence.** The round verdict (rulings 1 to 5 for the facts, ruling 2's setup amendment, ruling 7 for the sentences); the planner proposal `tmp/units/propagation-design-planner-proposal.md` answer 7 (the exact sentences per file, the J9 skill wording) and answer 1 (the vocabulary: surface, extension, framework, axis, face); the analyst proposal `tmp/units/propagation-design-analyst-proposal.md` answer 7 (the `application.md`, `documentation.md:26`, `workspace.md:68`, `:106`, `:192` additions) and answer 1 (the reserved names and the migration guard). Read the planner's answer 7 whole before editing: it carries the sentences the verdict adopts.
- **Present text.** `.claude/rules/workspace.md` § Environments (`src/styles` as an optional SCSS bundle; `src/styles/index.ts` as the side-effect entry), § Aliases, § Configuration authority (`:64` leaves; `:68` wrapper imports), § Build outputs (`dist/showcase`, `:106` declarations), § Test project matrix (`src:styles` row with `setupStyles.ts`; the `setup` and `setup:browser` rows; the paragraph at "Define the Node `setup` project only when…"; `:192` setup assets), § Script intent (`show`, `build:showcase` to `dist/showcase`, the paragraph "Run `show` only after formatting"), § Tooling ("Browser framework: Vue 3 when present"). `.claude/rules/tests.md:21-23` (setup proof resolution), `:60` (the `tests/setup*.test.ts` row), `:63-67` (project placement of setup proofs). `.claude/rules/application.md` (the browser application, `vue` on it, `--surfaces` unknown at `:17`). `.claude/rules/browser.md` (Vue placement). `.claude/rules/styles.md` (the kind table, `src/styles` entry and barrels, the order statement; amended 2026-09-30 for recreation surfaces). `.claude/rules/documentation.md:26` (showcase). `AGENTS.md` § Project model. `.agents/skills/orkestrel-journey/SKILL.md` (`surface` for a rendered screen; `:34` Matrix where more than one variant).
- **Law.** `.claude/rules/writing.md` § Instruction files (every line a directive; trigger and action; one home per rule; no persuasion; no history), § Substitutions (the banned terms the prose sweep reads: never `should`, `now`, `new`, `latest`, `currently`, `via`, `simply`, `just`, `e.g.`, `etc.`, `above`, `below`); `AGENTS.md` § Writing; `.claude/rules/documentation.md` § Workflow skills (frontmatter shape; `SKILL.md` concise). `AGENTS.md` stays under 200 lines.
- **Host.** Windows 11; CRLF-free files (LF); tabs where the file uses tabs; keep every Markdown table aligned the way Oxfmt leaves it (the Orchestrator runs `format` and reports).

## Unknowns

- Whether the policy sweep's prose scan reads a sentence you add as a banned term in its banned sense (`master`, `once`, `since`, `above`, `below` are ruled by sense). Write around every row of the substitution table and the Orchestrator's `test:policy` run settles it.

## Scope

- **Owned.** `AGENTS.md`, `.claude/rules/workspace.md`, `.claude/rules/tests.md`, `.claude/rules/styles.md`, `.claude/rules/application.md`, `.claude/rules/browser.md`, `.claude/rules/documentation.md`, `.agents/skills/orkestrel-journey/SKILL.md`.
- **Shared (report-only).** `.claude/rules/names.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `guides/scaffold.md` (`propagation-8` rewrites it), `.claude/skills/orkestrel-journey/SKILL.md` (a bridge; it loads the canonical file and changes only if the canonical `description` changes).
- **Off-limits.** `src/**`, `tests/**`, `configs/**`, `guides/**`, `.orkestrel/**`, `host.json`, `package.json`, the veneer checkout, every other skill.
- **Made false by this change.** `dist/showcase`, `show`, `demo/showcase.html`, and the `build-id` timestamp as the showcase contract; `tests/setupBrowser.test.ts` as the only browser setup proof; Vue as a property of every browser application; `src/styles/index.ts` as the side-effect entry (`sheet.ts` is); the `src:styles` row as the only sheet project.
- **Tools and limits.** Read, Grep, Glob, Edit, Write. No shell.

## Execution

Write each sentence as the rule, in the file that owns the subject, and point at it from elsewhere rather than restating it. In order:

1. `AGENTS.md` § Project model: add the surfaces and extensions in two lines at most: the browser surface (`src/browser`, `app/browser`, the journey, the showcase) and the styles surface (`src/styles` and its themes); an extension adds to a surface, the `vue` browser extension at `src/vue` and `app/vue`, a named styles extension at `src/<name>`; the placement law (a face imports core and browser, never a sibling face; `app/vue` may import `app/browser`; published source never imports private app code holds). Keep the file under 200 lines; count after editing and report the count.
2. `.claude/rules/workspace.md`: § Environments gains `src/vue/`, `app/vue/`, and `src/<name>/` sheet-face rows and replaces the `src/styles/index.ts` sentence with the `sheet.ts` entry (a sheet face's `sheet.ts` imports `./index.scss` alone and `index.ts` star-exports it); § Aliases gains `@src/vue`, `@app/vue`, and `@src/<name>` with the rule that every face has an alias; `:68` lets a `configs/src/*.config.ts` wrapper import the root config and the permitted leaves; § Build outputs replaces `dist/showcase` with root `showcase/<mode>.html` and `:106` states the declaration rollup (a face that imports `@src/core` or `@src/browser` rewrites those specifiers to the published subpaths in its emitted declarations); § Test project matrix gains one row per sheet face through one Chromium composition with `setup.ts`, `setupBrowser.ts`, `setupStyles.ts`, and `isolate: false`, the `setup:browser` row collects `tests/setupBrowser.test.ts` and `tests/setupStyles.test.ts`, the `setup` row excludes both, the defining paragraph keys `setup:browser` on either proof, the `journey:<variant>` row names the mode-aware factory (`appJourney(variant, variants, mode?)` resolving `browser` or an app-side browser extension), and `:192` loads only the setup assets the selected proofs require; § Script intent replaces `show` and `build:showcase` with `showcase`, `showcase:<framework>`, `build:showcase`, `build:showcase:<framework>`, and the `prepublishOnly` rebuild, and deletes the "Run `show` only after formatting" paragraph; § Tooling replaces "Vue 3 when present" with "the `vue` extension where selected"; the `optimizeDeps.include` law lands once: every browser project pre-bundles `@orkestrel/test`, `@orkestrel/test/browser`, `@orkestrel/contract` where declared, and `vue` where the project renders Vue.
3. `.claude/rules/tests.md`: `:21-23` states the mirror in both directions (a root `tests/setup<Name>.test.ts` resolves to `tests/setup<Name>.ts`; a root `tests/setup<Name>.ts` that declares an export has `tests/setup<Name>.test.ts` or is imported by `tests/setup.test.ts`; a vendored module is outside the population) and names the policy sweep as its instrument; `:63-67` puts `tests/setupBrowser.test.ts` and `tests/setupStyles.test.ts` in `setup:browser` and every other root setup proof in `setup`; the `tests/setup*.test.ts` row stays.
4. `.claude/rules/application.md`: `app/browser` is framework-independent (`main.ts` renders through the DOM, `check:app:browser` through `tsc`); the Vue application lives in `app/vue` with `main.ts`, `index.html`, `App.vue`, `check:app:vue` through `vue-tsc`, `dev:vue`; the showcase builds one page per mode into root `showcase/` with the final-page stamp; a target whose `app/browser` holds a `.vue` file moves it to `app/vue` (the generator's `repair` raises a blocking question naming the move); the creation options `--styles`, `--themes`, `--showcase`, and `--extend <surface:name,…>` with their requirements, journey implied by `--app browser`; keep `--surfaces` unknown at `:17`.
5. `.claude/rules/browser.md`: Vue code lives in `src/vue` and `app/vue`; `src/browser` and `app/browser` hold no `.vue` file and import no `vue` module; `app/vue` may import `app/browser` and `src/vue` may import `src/browser`; the manifest declares `vue` as an optional peer only for the `./vue` export, and the build externalizes `vue` and its subpaths and refuses `@vue/*`.
6. `.claude/rules/styles.md`: every sheet face (`src/styles`, each `src/<name>`) carries the same kind files and barrels with `sheet.ts` as the entry; the per-sheet order statement rule stays its one home; a themes barrel at `src/styles/themes/index.scss` beside `sheet.ts` carries its own order statement; `tests/setupStyles.ts` is the one home of the CSSOM instruments and `tests/setupStyles.test.ts` proves them.
7. `.claude/rules/documentation.md:26`: "Demonstrate public API in application source, prove its journeys there, and rebuild the selected showcase pages for publication." plus the planner's concept-index sentence (the showcase column counts a page per mode).
8. `.agents/skills/orkestrel-journey/SKILL.md`: replace `surface` with `screen` wherever the word names a rendered screen (keep `surface` where it names a generator surface, if anywhere); state that the seeded arrival journey proves Matrix when the wrapper declares more than one variant. Keep frontmatter `name` and `description` unchanged unless a sentence there uses `surface` for a screen; if `description` changes, say so under Output so the Orchestrator mirrors the bridge.
9. Sweep every owned file for the substitution table's unconditional rows and for `should`.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-7-report.md` with: each file and the sentences added, replaced, or deleted (as a diff-shaped list, not a diary); the `AGENTS.md` line count; the commands the Orchestrator runs (`npx oxfmt --config .oxfmtrc.json --check <owned files>`, `npm run test:policy`) and what each must show; every deviation. Your final message is that report verbatim.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a sentence ruling 7 prescribes contradicts a sentence in a rule file outside the owned set, when `AGENTS.md` cannot stay under 200 lines, or when a verdict ruling is silent on a fact a sentence needs.

## Acceptance criteria

1. Every ruling-7 sentence and the ruling-2 setup amendment has one home; no owned file restates a rule another owned file states.
2. No owned file carries a banned term in its banned sense; the Orchestrator's `npm run test:policy` and `oxfmt --check` exit 0.
3. `AGENTS.md` is under 200 lines.
4. No file outside the owned set changes.

**Observations, not criteria.** `guides/scaffold.md` sentences that now disagree with the rules (`propagation-8` rewrites the guide).

## Review evidence

The diff and `git status --porcelain`; the report file.
