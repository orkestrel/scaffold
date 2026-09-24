# Unit AP-TYPE — heading, display, size-utility, and legend sizes follow the release's responsive rule

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in the worktree `/home/user/veneer-apt` (branch `unit/apt`, cut from
Veneer `712ae72`).

## Objective

Below a 1200px viewport, `h1` to `h6`, `.h1` to `.h6`, `.fs-1` to `.fs-6`, `.display-1` to `.display-6`, and `legend`
resolve Bootstrap 5.3.8's responsive font size rule over their live size token, and from 1200px each resolves its token,
with the 14px body and the 600 heading weight unchanged.

## Context

**Evidence.** The design ruling is `/home/user/scaffold/.orkestrel/veneer/units/appearance-design-verdict.md`; read it
first, then the P8 sections of `appearance-design-planner-proposal.md` and `appearance-design-analyst-proposal.md`
beside it. The verdict wins where a proposal differs. The sites, with citations, are in
`appearance-instruments/appearance-sites-grok.md` § P8. Orchestrator samples, taken at `712ae72`:

```text
src/styles/_mixins.scss      @function heading-size($level) { @return var(--vn-size-#{9 - $level}); }
                             @mixin breakpoint-up($name) emits @media (width >= <boundary>); breakpoint(xl) is 1200px
src/styles/elements/_heading.scss     h#{$level} { font-size: heading-size($level); }
src/styles/components/_type.scss      .h#{$level} { font-size: heading-size($level); }
                                      .display-#{$level} { font-size: var(--vn-display-#{$level}); }
src/styles/utilities/_font.scss       $sizes from heading-size($level); @include utility(fs, font-size, $sizes, $infix)
                                      inside breakpoint-each, written at the empty infix alone
src/styles/elements/_fieldset.scss    legend { font-size: calc(var(--vn-size-6) * 0.85 + 0.3vw); }
                                      @include breakpoint-up(xl) { legend { font-size: var(--vn-size-6); } }
configs/src/vite.styles.config.ts     the src:styles project sets no browser viewport
tests/src/styles/elements/fieldset.test.ts   already drives the viewport with `page.viewport(width, height)`
```

**The rule.** For a size token `S`: `calc(S - max(S * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px))` below the `xl`
boundary, and `S` at and above it. The `max()` guard holds a size at or under 1.25rem fixed at every viewport, whatever
value a consumer retunes the token to. At the default tokens and a 16px root:

| Selectors | Token (default) | 390px | 1280px |
| --- | --- | --- | --- |
| `h1` `.h1` `.fs-1` | `--vn-size-8` 36px | 26.28px | 36px |
| `h2` `.h2` `.fs-2` | `--vn-size-7` 30px | 23.925px | 30px |
| `h3` `.h3` `.fs-3` `legend` | `--vn-size-6` 24px | 21.57px | 24px |
| `h4` `.h4` `.fs-4` | `--vn-size-5` 20px | 20px | 20px |
| `h5` `.h5` `.fs-5` | `--vn-size-4` 18px | 18px | 18px |
| `h6` `.h6` `.fs-6` | `--vn-size-3` 16px | 16px | 16px |
| `.display-1` to `.display-6` | 80, 72, 64, 56, 48, 40px | 43.55, 40.41, 37.27, 34.13, 30.99, 27.85px | 80, 72, 64, 56, 48, 40px |

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,writing,quality}.md`;
Veneer `ROADMAP.md` § Tenets and § Rulings (the APPEARANCE-RULING bullet); skill: none; guide: `guides/veneer.md`.

**Installed primitives.** `@orkestrel/test` 0.0.23 (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`) and
`@orkestrel/contract`; Vitest's `page.viewport` from the browser context, as `fieldset.test.ts` uses it. A viewport,
wait, or size-reading helper written in this unit whose job an installed export does is a defect.

**Host.** Linux, bash, working path `/home/user/veneer-apt`. `node_modules` is a hardlinked copy of Veneer's; do not run
`npm install` or `npm ci`. Chromium 141 is the Vitest browser. Network is open, and nothing in this unit needs it.

**Measurements.** Host Chromium 141 resolves a length divided by a length inside `calc()`, raw and through Sass
(`appearance-instruments/appearance-fluid-arithmetic.log.txt`): the analyst's equivalent form over a 101px `h1` retune
reads 51.7925px at 390 and 101px at 1280, and a 2.25rem size reads 26.28px at 390. The planner's form is the same value at
a 16px root; your first readings confirm it in this project.

**Control identifiers.** None. Name each test for the property it proves.

**Standing conditions.** A second unit, AP-COLOR, works the color rules in `/home/user/veneer-apc` at the same time; its
files are off-limits here. `tmp/` is the unit's own scratch.

## Unknowns

The `src:styles` project's default viewport width. Read it before editing (a one-line test under `tmp/probe/` logging
`innerWidth`, or the Vitest browser default in `node_modules`), record it in the report, and derive from it which existing
size pins go red at rest.

## Scope

**Owned.** `src/styles/_mixins.scss`; `src/styles/elements/_heading.scss`; `src/styles/components/_type.scss`;
`src/styles/utilities/_font.scss`; `src/styles/elements/_fieldset.scss`; `tests/src/styles/elements/heading.test.ts`;
`tests/src/styles/components/type.test.ts`; `tests/src/styles/utilities/font.test.ts`;
`tests/src/styles/elements/fieldset.test.ts`; `tests/src/styles/mixins.test.ts`; `tests/src/styles/fixtures/**`; and
every other `tests/src/styles/**/*.test.ts` file whose pinned size this change moves, except the files AP-COLOR owns.

**Shared (report-only).** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `guides/veneer.md`. Edit them in this
worktree as the proofs and gates need, then write `git diff -- tests/setupStyles.ts tests/setupStyles.test.ts
guides/veneer.md` to `tmp/units/apt-shared.patch`. The Orchestrator integrates that patch after AP-COLOR's. In the guide,
change only the ledger rows for this unit's selectors (the base `font-size` rows, the `@media` cap rows that read
`dropped` becoming kept `tokenized` rows, and cap rows added for `h5`, `h6`, `.h5`, `.h6`, `.fs-5`, and `.fs-6`), and the
prose stating that these sizes stay fixed across viewports, which becomes the rule and its 1.25rem floor.

**Off-limits.** `src/styles/_tokens.scss`; `src/styles/utilities/_color.scss`; `src/styles/utilities/_link.scss`;
`src/styles/components/_button.scss`; the color, link, button, validation, `a`, token, and theme test files AP-COLOR
owns; `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` (vendored); `package.json` and
`package-lock.json`; `ROADMAP.md`. If a criterion needs one of these files, stop and report the exact hunk.

**What asserts the state this change ends.** Derive it by running `npm run test:src:styles` once before editing and once
after the source change, and read each red. Known members: the size tables in `tests/setupStyles.ts` (around its
`FONT_SIZE` and heading tables), `tests/src/styles/elements/heading.test.ts`, `tests/src/styles/components/type.test.ts`,
`tests/src/styles/utilities/font.test.ts`, `tests/src/styles/elements/fieldset.test.ts`, and the ledger rows
`tests/conformance.test.ts` reads from `guides/veneer.md`. A pin at the project's default viewport that reads a size
above 1.25rem goes red; move the pin to an explicit `page.viewport` width rather than to the default.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`, `git restore`,
`git stash`, `git reset`, or `git clean`. Run `oxfmt` through `npm run format` only on owned and shared files you
changed; never run prettier.

## Execution

Perform the assignment directly and spawn nothing.

1. **One mechanism in `_mixins.scss`.** A function returning the fluid value for a size, and a mixin emitting the fluid
   `font-size` declaration and its `breakpoint-up(xl)` cap of the token itself. Name both per
   `.claude/rules/names.md` and `styles.md`; `heading-size` stays.
2. **Consumers.** `_heading.scss`, `_type.scss` (the `.h*` and `.display-*` rules), and `_fieldset.scss` (`legend`, which
   drops its hand formula) include the mixin. `_font.scss` writes the fluid `.fs-*` values through the `utility` mixin
   and writes their caps, with `!important`, in one `breakpoint-up(xl)` block after the walk. Every consumer, h4 to h6
   included, gets its cap. Heading weight, display weight, and line heights stay.
3. **Proofs**, each an executed assertion in the owned test file for that surface, with independent numeric
   expectations from a TypeScript oracle of the rule in that test (not read back from CSS):
   - every selector in the table at 390 and at 1280, in the table's values;
   - with `--vn-size-8` retuned to 101px: `h1`, `.h1`, and `.fs-1` read 51.7925px at 390 and 101px at 1280, and the
     readings at 1199 and 1200 differ by less than 0.1px;
   - with `--vn-size-3` retuned to 12px, `h6` reads 12px at 390 (the floor holds below 1.25rem);
   - with `--vn-size-4` retuned to 32px, `h5` becomes fluid at 390 and reads 32px at 1280;
   - `<h1 class="fs-6">` reads the `.fs-6` size at 390 and at 1280;
   - `h1` keeps weight 600 and the display classes keep weight 300.
4. **Mutations.** Run each, confirm the named proof reddens, restore the exact edit, and log each run: a literal size in
   place of the token (the retune reads 36, not 101, at 1280); the cap removed (1280 reads the fluid value); the
   boundary moved to `xxl` (1280 reads fluid); the `max()` guard removed (the 12px `h6` retune reads above 12 at 390);
   the `.fs-*` caps without `!important` (`.fs-1` reads 36.96px, not 36px, at 1280, because the important fluid value
   outranks the cap).

## Output

Write `tmp/units/apt-report.md` and return the same text: the default viewport reading, each change by file, the proof
table (proof, file, what it reads), the mutation table (mutation, the proof that reddened, log path), the gate table
with log paths, and the paths of `tmp/units/apt.diff` (`git diff 712ae72` over owned files),
`tmp/units/apt-shared.patch`, and `tmp/units/apt-status.txt` (`git status --short`). Keep every log under `tmp/units/`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when Chromium 141 in this project
does not resolve the rule's `100vw / 1200px` term, when a reading departs from the table by more than 0.01px, or when a
criterion needs an off-limits file. Settle yourself: the function and mixin names, test names and placement, the order
of the `.fs-*` cap block among the utilities, and where a guide sentence sits.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0, each logged with its exit status.
2. `npm run test:src:styles` exits 0, logged.
3. `npm run test:setup` and `npm run test:conformance` exit 0, each logged.
4. `npm run test:guides` exits 0, logged.
5. Every proof in Execution step 3 exists and passes, and every mutation in step 4 reddened its named proof, each logged.
6. `git diff 712ae72 --stat` names only owned and shared files.

**Observations, not criteria.** `npm run test:journey` and the whole `npm test` chain: run neither; the Orchestrator runs
them after landing.

## Review evidence

The Orchestrator supplies `apt.diff`, `apt-shared.patch`, `apt-status.txt`, the report, and the logs to the audit
lanes, with captures of the heading, display, and form specimens at 390 and 1280 in light and dark.
