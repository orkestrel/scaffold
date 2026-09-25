# Unit TOKEN-PROOFS — every documented token group moves a shipped consumer when it is overridden

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, reached through the harness's Agent tool. It is the sole writer in
`/home/user/veneer-tkp` (branch `unit/tkp`, cut from the Veneer session branch at `LANDING_HEAD`, `node_modules`
hardlinked from `/home/user/veneer`). The proofs run in Chromium, which a bench sandbox cannot drive
(`.agents/orchestration.md` § Bench laws, rule 5), so the unit runs on the native writing lane. The harness may name
another directory as the primary working directory; start every shell command with `cd /home/user/veneer-tkp &&` and
give every file tool an absolute path under it.

## Objective

For each token group § Tokens documents that has no override proof today, one case overrides the token on an ancestor
and reads a shipped class or tag consumer's resolved property move, beside a control element outside the override. The
two duplicate stacking rows in § Tokens merge into one.

## Context

**Evidence.** Measured at the landing tree (`/home/user/veneer`, `a29fef7`):

- The tenets audit (`/home/user/scaffold/.orkestrel/veneer/units/tenets-styles/tenets-styles-audit-verdict.md`, claim 6,
  and `tenets-styles-tokens-verdict.md`, claim 6) found no case that overrides a token and reads a shipped consumer
  move for these groups: `link`, `form` (valid and invalid), `button`, `state` (hover, active, mixer), `weight`, and
  `ease`.
- The shipped readers, from `grep -rln -- "var(--TOKEN)" src/styles`:
  - `--vn-link-base`, `--vn-link-hover-base`, `--vn-link-decoration`: `elements/_a.scss`, `components/_button.scss`
    (the `.btn-link` form), and `_mixins.scss`.
  - `--vn-form-valid`, `--vn-form-invalid`: `_mixins.scss` (the validation mixin that `.is-valid`, `.is-invalid`,
    `.valid-feedback`, and `.invalid-feedback` compile from).
  - `--vn-state-hover`, `--vn-state-active`, `--vn-state-mixer`, `--vn-button-opacity`: `elements/_button.scss` and
    `components/_button.scss`.
  - `--vn-weight-heading`: `elements/_dl.scss`, `elements/_tr.scss`, and `_mixins.scss` (the heading mixin).
  - `--vn-ease-standard`: `components/_button.scss`, `elements/_button.scss`, and the form, carousel, and icon-link
    partials.
- `tests/src/styles/tokens.test.ts` holds the factor override cases (search `rescales every consumer when the density
  factor`). Each mounts a consumer, sets the token on `document.documentElement`, reads the move inside `try`, removes
  the override in `finally`, and reads the rest value again. The pattern here differs: the override sits on an ancestor
  and a control element sits outside it.
- `guides/veneer.md` § Tokens holds two rows whose Token cell is `` `--vn-stack-popover`, `-hint`, `-toast` `` (search
  that text). One row's Alias cell is `` `--bs-toast-zindex` ``, and the other's is
  `` `--bs-popover-zindex`, `--bs-tooltip-zindex` ``.

Re-take each reading in the worktree before editing, and report any that differ.

**Law.** `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,architecture,documentation,writing,quality}.md`;
Veneer's `ROADMAP.md` § Tenets, which asks that CSS-variable tokens be a supported customization and testing contract;
the guide `guides/veneer.md`. No skill applies.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/test/browser` (`readStyle`, `readPixels`, `readToken`,
`parseCSSColor`, `matchesColor`, and others). Read the guide's `## Surface` section at
`/home/user/scaffold/guides/test.md` or the declarations under `node_modules/@orkestrel/test/`. A reader, wait, or color
parser whose job an installed export does is a defect.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). The styles project reads the built cascade, so run
`npm run build:src:styles` before each styles test run and after each plant. Other worktrees run suites at the same
time.

**Measurements.** The unit takes every resolved value it asserts in its own worktree.

**Control identifiers.** None beyond the group names. Name each test for what it proves.

**Standing conditions.** `node_modules` is hardlinked. Never run `npm install` or `npm ci`.

## Unknowns

- Which shipped consumer of `--vn-weight-heading` is the plainest to read: the heading tags through the mixin, the `dt`
  of `dl`, or the table header. Choose one, and name why in the report.
- Whether `--vn-state-mixer` moves a resolved paint that Chromium exposes on `.btn:hover`. If no consumer's resolved
  value moves, stop and report the reading rather than asserting on a declaration.

## Scope

**Owned.** `tests/src/styles/tokens.test.ts` (new cases only, in one `describe` block named for the contract they
prove); `guides/veneer.md` (the two stacking rows in § Tokens, merged into one, and the § Tests entries for the new
cases).

**Shared (report-only).** `tests/setupStyles.ts` and `tests/setupBrowser.ts`. If a case needs a reusable helper, return
its exact patch instead of writing it.

**Off-limits.** `src/**`, `tests/src/styles/**` other than `tokens.test.ts`, `tests/setupServer.ts`, `tests/setup.ts`,
`tests/app/**`, `app/**`, the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`),
`vite.config.ts`, `package.json`, and `ROADMAP.md`. The retirement of `--vn-focus-reset` and of the tertiary role's
`-subtle`, `-border`, and `-rgb` tiers belongs to TOKEN-RETIRE, which waits on the engine session's answer about
`src/core/constants.ts`.

**What asserts the state this change ends.** The stacking-row merge makes one row false: the `collectReferenceRows`
reader and the reference-map value case read every row, so run `npx vitest run --project src:styles
tests/src/styles/tokens.test.ts` and `npm run test:guides` after the merge and report any case the merge breaks.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format only with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.
`npm run build:src:styles` is allowed. Plant only in `src/styles/**`, and restore each plant byte-identically.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings, then answer the Unknowns.
2. Write one case per group:
   - `--vn-link-base` on an `a` and a `.btn-link`;
   - `--vn-link-hover-base` and `--vn-link-decoration` on the same consumers, under hover where the token applies;
   - `--vn-form-valid` on a `.is-valid` control's border and a `.valid-feedback`;
   - `--vn-form-invalid` on a `.is-invalid` control's border and an `.invalid-feedback`;
   - `--vn-state-hover` and `--vn-state-active` on a `.btn`'s fill under a real hover and a pointer hold;
   - `--vn-state-mixer` on the consumer the Unknown names;
   - `--vn-button-opacity` on a disabled `.btn`;
   - `--vn-weight-heading` on the consumer the Unknown names;
   - `--vn-ease-standard` on a `.btn`'s transition timing function.
   Each case mounts the consumer inside an ancestor that sets the token, and a twin consumer outside it. It asserts that
   the inside consumer's resolved property equals the override, and that the twin keeps the rest value.
3. Merge the stacking rows into one whose Alias cell names `--bs-popover-zindex`, `--bs-tooltip-zindex`, and
   `--bs-toast-zindex`.
4. Mutation per group: in the partial, write the consumer's declaration as a literal equal to its resolved rest value.
   Rebuild, run the case, and log it to `tmp/units/tkp-plant-<group>.log.txt`. The case must fail with an
   `AssertionError`, and the twin's reading must hold. Restore byte-identically, and record the restoring
   `git diff --stat` reading.
5. Run each gate named in Acceptance, logged to `tmp/units/tkp-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/tkp-report.md` and return the same text. It holds:

- the Evidence re-readings;
- the Unknowns' answers;
- the cases, by title;
- the mutation table (group, plant, command, failing assertion, restored);
- the gate table;
- `tmp/units/tkp.diff` (`git diff LANDING_HEAD`) and `tmp/units/tkp-status.txt` (`git status --short`).

State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.

- **Stop and report** when:
  - a group's token moves no resolved property of any shipped consumer;
  - a case needs a file outside Owned;
  - a gate reads red outside the change's reach.
- **Settle yourself:** the case titles, the `describe` block's name, the choice of consumer where Evidence names
  several, and the ancestor markup.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt leaves the owned files unchanged.
2. `npx vitest run --project src:styles tests/src/styles/tokens.test.ts` passes with a case per group named in
   Execution step 2.
3. Each group's mutation fails its case with an `AssertionError`, and the twin's reading holds, per the mutation logs.
4. § Tokens holds one stacking row, and `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** `npm run test:src:styles` over the whole styles project. The Orchestrator runs the
authoritative chain at landing.

## Review evidence

The unit's diff (`tmp/units/tkp.diff`), its status output, the mutation logs, and the gate logs. The audit runs
`analyst` on GPT-6 Astra (objective lane) and `reviewer` on Opus 5.5 (subjective lane).
