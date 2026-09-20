# Unit U1-conform — successor brief 2: the showcase drives the published cascade

## What changed and why

This brief supersedes `u1-conform-brief.md` for the remainder of the unit; that brief
stands except where this one says otherwise, and `u1-conform-report.md` is the baseline.
The audit (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u1-conform-audit-verdict.md`,
lane reports beside it under `units/u1-conform-audit-*`) confirmed every claim but one: the sentence
added under `## Showcase` in `guides/veneer.md` says the showcase proves the published CSS, and it
does not — `mountShowcase` in `tests/setupBrowser.ts` loads the app's own stylesheet alone, and
`app/browser/styles/_shell.scss` paints `body` in a layer that sorts after every published layer,
so the served page overrides the `elements` layer's body paint. The unit's own deviation 7 recorded
both facts. The Orchestrator rules that the sentence becomes true rather than narrower: the shell
loads the published cascade wherever it is mounted and stops overriding it. The objective lane
added two findings this brief carries: the app entry loads its partial through `meta.load-css`
where `.claude/rules/styles.md` § Centralized files has the barrel load partials with `@use`; and
`extractSpecifiers` in `tests/setupConformance.ts` reads a `require` argument only as a `Literal`
while its dynamic `import` branch also reads a substitution-free template literal, so
``require(`bootstrap`)`` extracts nothing and the distribution predicate accepts it.

## Role and engine

`opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold repair`;
no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`, `git stash`, `git reset`,
`git clean`, or `git add`. Law from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`,
`.claude/rules/styles.md`, `tests.md`, `documentation.md`, `writing.md`.

## Context

`HEAD` is `d8b0e65`; the working tree carries the U1-conform change and the Orchestrator's manifest
step (`package.json`, `package-lock.json`), all uncommitted and all staying as they are.
`app/browser/main.ts` loads `../../src/styles/index.scss` and then `./styles/index.scss`;
`tests/setupBrowser.ts` line 31 loads `../app/browser/styles/index.scss` alone. The published
cascade declares its layer order in `src/styles/_tokens.scss` line 3 (`theme, reset, base,
elements, components, utilities`), and `src/styles/elements/_body.scss` paints `body` from
`--vn-surface-body-base` and `--vn-text-body-base` inside `elements`; the shell's `body` rule in
`_shell.scss` (`Canvas`, `CanvasText`) sits in `shell`, outside that order, and so sorts last.
`tests/app/browser/integration.test.ts` lines 78 to 92 read `document.body`'s background in light
and dark and assert they differ. The audit's two bounds this brief also carries: `## Tests` in
`guides/veneer.md` links `integration.test.ts` and not `tests/app/browser/Showcase.test.ts`
(reviewer 13); the `it` title `executes the scheme-validation example verdicts` in
`tests/guides.test.ts` line 59 names the mode axis by its old term (report deviation 6).

## Scope

**Owned.** `app/browser/styles/**`, `tests/setupBrowser.ts` (the `mountShowcase` stylesheet loads
alone), `tests/app/browser/**`, `guides/veneer.md` (the `## Showcase` sentence and the `## Tests`
links alone), `tests/guides.test.ts` (the one `it` title alone), `tests/setupConformance.ts` (the
`require` branch of `extractSpecifiers` and its doc block alone), `tests/setupConformance.test.ts`
(the cases for that branch), the report. **Off-limits.** Everything else, including `src/**`,
`app/browser/*.ts`, `app/browser/index.html`, `tests/setupBrowser.test.ts`, `tests/src/**`,
`tests/conformance.test.ts`, `tests/distribution.test.ts`, `package.json`.

## Execution

Perform the assignment directly and spawn nothing. Run `npm run test:app` and `npm run test:journey`
after each item.

1. **The mount loads the cascade.** `mountShowcase` in `tests/setupBrowser.ts` loads
   `../src/styles/index.scss` and then `../app/browser/styles/index.scss`, in the order `main.ts`
   loads them, and nothing else changes in that file. Record, before the change, what
   `document.body`'s background and colour resolve to in the light and dark journeys (the system
   `Canvas` readings), and after it.
2. **The shell stops painting the body.** Delete the `body` rule from `_shell.scss`; keep the
   `color-scheme` rules and the layer; rewrite the comment for what the shell now owns (the
   document's scheme in each mode, and nothing the published cascade paints). Where a journey or
   app assertion read the shell's paint, it now reads the `elements` layer's token paint; every
   assertion keeps its meaning and its pass.
3. **The entry loads with `@use`.** `app/browser/styles/index.scss` becomes the barrel
   `styles.md` describes: it loads its partial with `@use` and carries no `sass:meta`, no
   `meta.load-css`, and no order statement of its own. The app's layer order is declared the way
   the published side declares it (`src/styles/_tokens.scss` line 3, the first statement of the
   first-loaded partial): `@layer shell;` opens `_shell.scss`, ahead of the `@layer shell { … }`
   block. Then compile the entry (through `npm run build` or a scoped `sass` invocation under
   `tmp/`) and record the first statements of the emitted CSS: the `@layer shell;` statement
   precedes the block (the audit's referral).
4. **The sentence.** Under `## Showcase` in `guides/veneer.md`, the sentence states that the shell
   is framework-free by design so the showcase drives the published cascade and engine with no
   framework between them and what renders, while scaffold mandates the Vue toolchain for an
   `app/browser` environment. Claim only what item 1 and item 2 make true. In `## Tests`, link
   `tests/app/browser/Showcase.test.ts` beside the journey. Keep `test:guides` green.
5. **The title.** Rename the `it` at `tests/guides.test.ts` line 59 for `isColorModeState`, the
   guard the case executes; change nothing else in the file.
6. **The template-literal `require`.** Red first: add to `tests/setupConformance.test.ts` the
   case that ``extractSpecifiers('require(`bootstrap`)')`` is `['bootstrap']` beside the existing
   `require` case, run `npm run test:setup`, and record the failing count and message. Then make
   the `require` branch of `extractSpecifiers` read a substitution-free `TemplateLiteral` argument
   the way the dynamic `import` branch at line 123 does (one shared reading of "a string an
   argument node carries" where that removes the duplication; export and case it if it becomes a
   helper), update the doc block at line 103, and record the same command green. Add the
   controls ``require(`${name}`)`` (a substitution: extracts nothing) and `require(name)` (an
   identifier: extracts nothing).
7. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:setup`,
   `test:conformance`, `test:app`, `test:journey`, `test:setup:browser`, `test:guides`,
   `test:policy`; then `PLAYWRIGHT_CHANNEL=msedge npm run test:app` and
   `PLAYWRIGHT_CHANNEL=msedge npm run test:journey`. Record each command's final lines.
   `test:distribution` is the Orchestrator's verifier's.

## Output

Write `u1-conform-report-2.md` and return its content: the diff per file; the body
readings before and after (item 1); the emitted CSS head (item 3); the sentence as written; the
red and green runs of item 6; each gate's final lines on both engines; deviations in the usual
shape.

## Deviation contract

Stop and report on: a journey or app assertion that cannot keep its meaning under the token paint;
a gate red after your own fix inside owned files; a need to edit an off-limits file; an emitted
order that contradicts the `index.scss` comment. Decide, record, and carry on from: wording within
the meaning fixed here, the comment's text.

## Acceptance criteria

1. `mountShowcase` loads the published cascade before the app stylesheet; `_shell.scss` carries no
   `body` rule and opens with `@layer shell;`; `index.scss` loads the partial with `@use` and names
   no `sass:meta`; the emitted CSS opens with the order statement; the served page and every
   showcase proof paint `body` from the `elements` layer.
2. The `## Showcase` sentence claims only what the tree does; `## Tests` links the `Showcase`
   proof; the `it` title names the guard.
3. ``extractSpecifiers('require(`bootstrap`)')`` is `['bootstrap']`, the case ran red before the
   change and green after, and the two controls extract nothing.
4. Every gate in item 7 exits 0 on managed Chromium and the two named ones on Edge.
5. `git status --porcelain` adds nothing beyond the owned files and the report to the audit's
   status list (`units/u1-conform-status.txt`).

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; `guides/veneer.md`.
