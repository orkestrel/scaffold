# Unit U-styles-guide — successor brief 2: the sentences the tree contradicts

## What changed and why

This brief supersedes `u-styles-guide-brief.md` for the remainder of the unit; that
brief stands except where this one says otherwise, and `u-styles-guide-report.md` is
the baseline. The audit (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u-styles-guide-audit-verdict.md`,
lane reports beside it under `units/u-styles-guide-audit-*`) confirmed the section's place,
shape, files, scripts, README paragraph, and scope, and refuted sentences the tree contradicts
or the writing law bars, listed under Execution.

## Role and engine

`opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold repair`;
no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`, `git stash`, `git reset`,
`git clean`, or `git add`. Law from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`
§ Writing, `.claude/rules/writing.md`, `documentation.md`.

## Context

`HEAD` is `fbbda43`; the working tree carries the U-styles-guide change (`guides/veneer.md`,
`guides/README.md`), uncommitted and staying. The facts behind each sentence: `vite.config.ts`'s
`srcCore()` factory installs no plugin, and `configs/src/vite.core.config.ts` line 10 plants
`environmentBoundary('src/core')`, while the root's `srcBrowser()` and `appBrowser()` factories
plant it on `src/browser` and `app/browser`; `tests/src/styles/mixins.test.ts` compiles its own
fixture partial `tests/src/styles/fixtures/mixins.scss` and reads declarations from it, and
`tests/src/styles/tokens.test.ts` also drives written declarations (a two-token cycle, an invalid
value), so not every case under `tests/src/styles/` reads the shipped cascade; the proofs under
`tests/src/styles/` prove the cascade, the tokens, the theme, the mixins, and the elements, and no
proof asserts the alias, the project registration, or the configuration plugins for the axis.

## Scope

**Owned.** `guides/veneer.md` (the `## Styles` section alone), the report. **Off-limits.**
Everything else, `guides/README.md` included.

## Execution

Perform the assignment directly and spawn nothing. Run `npm run test:guides` after each item.

1. **The count.** "Veneer publishes its cascade as one standalone stylesheet." becomes "Veneer
   publishes its cascade through a standalone stylesheet subpath, `./styles`." (no count, and the
   sentence names what the consumer reaches rather than how many files the directory holds).
2. **Nouns after code tokens.** Under `writing.md` § Code tokens, every backticked token in the
   section is followed by a noun. The audit named "through its `setupFiles` instead" (twice in
   the section: write "through its `setupFiles` array"), "`test:src:styles` builds first" (write
   "The `test:src:styles` script builds first"), and "`import/no-unassigned-import` permits" (write
   "The `import/no-unassigned-import` rule permits"). Sweep the whole section and the fence's
   surrounding sentences for the same shape and repair each; a token that names a file, script,
   rule, option, array, project, factory, helper, subpath, or key takes that word.
3. **The proof subject.** The sentence after the scripts table narrows to what is true: the
   `test:src:styles` script builds first because the proof's subject is the compiled cascade —
   the project loads `dist/src/styles/index.css` through its `setupFiles` array, and the cases
   that read the shipped cascade read the rules the browser resolved from that file rather than
   the declarations the SCSS sources carry; the mixin proofs compile a fixture partial of their
   own, and the token proofs also drive declarations the case writes.
4. **The boundary attribution.** Departure 3 states who plants the boundary: the root's
   `srcBrowser` and `appBrowser` factories plant `environmentBoundary` on `src/browser` and
   `app/browser`, and the `configs/src/vite.core.config.ts` wrapper plants it on `src/core`; the
   rest of the departure stands.
5. **The coverage sentence.** Departure 5's last sentence states what the styles proofs cover and
   what nothing covers: the proofs under `tests/src/styles/` prove the cascade, the tokens, the
   theme, the mixins, and the elements, and no proof asserts the alias, the project registration,
   or the configuration plugins for the axis; that gap is a departure recorded here, not covered.
6. **The replaced fields.** The `### Files` paragraph that lists what the wrapper replaces adds
   the build options: it replaces the plugins, the output directory, the library entry, the build
   options (keeping the root's build-log handler and dropping the browser externals and output
   paths), and the test fields it inherits.
7. **The workspace rows.** The sentence opening `### Departures from the workspace rows` names
   the rows the way the rule keys them: `.claude/rules/workspace.md` carries a row for the styles
   axis (`src/styles/` in its environment table, `@src/styles` in its alias table, and the
   matching rows of its build-output, test-project, and scoped-check tables); write no `src:styles`
   key for a row the rule does not key so.
8. **The list form.** The departures carry no order or rank, so the numbered list becomes a
   bulleted list with the same bold leads (`writing.md` § Structure numbers a list only where
   order or rank matters).
9. **Gates.** `npm run test:guides`, `npm run test:policy`, `npm run format:check`; record each
   command's final lines.

## Output

Write `u-styles-guide-report-2.md` and return its content: the diff; each changed
sentence before and after; the sweep of item 2 (every token repaired, with its line); each
command's final lines; `git status --porcelain` (tracked rows only); deviations in the usual
shape.

## Deviation contract

Stop and report on: a guide gate red after your own fix; a fact in this brief the tree
contradicts. Decide, record, and carry on from: wording within the meaning fixed here.

## Acceptance criteria

1. Items 1 and 3 to 8 read as stated; item 2's sweep leaves no bare code token in the section.
2. `test:guides`, `test:policy`, and `format:check` exit 0.
3. `git status --porcelain` lists `guides/README.md` and `guides/veneer.md` exactly.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
