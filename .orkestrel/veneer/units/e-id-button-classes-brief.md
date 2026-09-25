# Unit E-ID-BUTTON-CLASSES — every button-built class's button form, at rest and in every state

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/veneer-ebcl` (branch `unit/ebcl`, cut from
the session branch at the E-ID-BUTTON-CASCADE landing, `LANDING_HEAD`). The objective implementation belongs to `sol` on
GPT-6 Astra, but a bench sandbox cannot drive the browser this unit's proofs live on (`.agents/orchestration.md` § Bench
laws, rule 5), so the unit runs on the native writing lane. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,architecture,documentation,writing,quality}.md`;
Veneer's `ROADMAP.md` § Tenets in the worktree; the design verdict
`/home/user/scaffold/.orkestrel/veneer/e-id-button-design-verdict.md`, which binds; and the CASCADE record,
`/home/user/scaffold/.orkestrel/veneer/units/e-id-button-cascade-report.md` and its audit verdict
`/home/user/scaffold/.orkestrel/veneer/units/ebc-audit-verdict.md`. No skill applies.

## Objective

The design verdict's exit, second half: every class the release builds on a `button` element lays out and paints on its
button form as the release's does, at rest, under hover, under press, under keyboard focus, and disabled, under a holder
that retunes the tokens the button surface reads. Each proof reads red when its partial's `button-reboot` include goes.

## Context

- **The cascade.** `src/styles/elements/_button.scss` puts the calibrated surface and its states on every `button` in the
  `elements` layer. The `button-reboot` mixin in `src/styles/_mixins.scss` writes the release's reboot back; each
  partial the verdict names includes it on `:where(button.<class>)` in the `components` layer: `_close.scss`,
  `_navbar.scss`, `_accordion.scss`, `_dropdown.scss`, `_nav.scss`, `_list-group.scss`, `_pagination.scss`, and
  `_carousel.scss` (the two controls, and the indicators through `:where(.carousel-indicators [data-bs-target])`).
- **The surface reads** `--vn-space-3`, `--vn-space-6`, `--vn-font-sans`, `--vn-size-2`, `--vn-weight-body`,
  `--vn-line-body`, `--vn-text-body-base`, `--vn-button-transparent`, `--vn-radius-base`, `--vn-button-shadow`,
  `--vn-button-highlight`, `--vn-button-opacity`, the state mixers, and the motion tokens (read the partial to confirm).
  CASCADE's holder, `BUTTON_HOLDER_STYLE` in `tests/setupStyles.ts`, retunes `--vn-weight-body`, `--vn-button-shadow`,
  and the inherited font. Widen it, or add a holder beside it, so that every surface property a leak could reach reads a
  value neither cascade produces unretuned.
- **The oracle.** A Veneer class value is calibrated, so it is not the release's literal: never compare a class-written
  value with the release's number. Compare forms instead. For each class, mount its button form and a non-button form of
  the same class (the anchor form where the release builds one, as for `.nav-link`, `.dropdown-item`,
  `.list-group-item`, and `.page-link`; a `div` or `span` form otherwise), under the same holder, in the Veneer cascade
  and in `node_modules/bootstrap/dist/css/bootstrap.css`. In every state and on every surface longhand, the Veneer
  button form must differ from the Veneer non-button form exactly where, and exactly as, the release's button form
  differs from the release's non-button form. A leaked surface declaration then reads as an extra difference, and a
  class-written value reads equal on both forms. CASCADE's `.btn` proof (the case titled `resolves every .btn form on a
  button as the same form resolves on an anchor, apart from the button appearance`) is the pattern; its file is in the
  owned set. The unit settles the oracle for a state a non-button form cannot enter (`:disabled`), and records how.
- **The fixtures.** Each class's markup is the release's documented markup for its button form (the search behind the
  class list: `/home/user/scaffold/.orkestrel/veneer/units/e-id-button-instruments/bs-button-classes.log.txt`).
- **Host.** Linux, bash; put `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`
  first on `PATH`, set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, and launch Chromium in a probe with
  `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'`. The harness environment block may name
  another worktree as the primary working directory; work in `/home/user/veneer-ebcl` with absolute paths. Format only
  with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`. Rebuild the styles with `npm run build:src:styles`
  before a styles run. Other worktrees run suites at the same time; a timing failure under load is an observation with
  its reading.

## Unknowns

- Whether any class's button form differs from the release in a state once the oracle reads it. A reset at rest in the
  `components` layer outranks every `elements` state rule, so none is expected; report each difference with its
  reading and fix it in the class's partial.
- Which non-button form each button-only class takes, and whether the release's own button-versus-non-button
  difference set is stable across states. Read it first and report it.

## Scope

**Owned.** `tests/src/styles/components/{close,navbar,accordion,dropdown,nav,list-group,pagination,carousel}.test.ts`;
`tests/src/styles/elements/button.test.ts`; `tests/src/styles/mixins.test.ts` for the minifier guard; the eight partials the Context names, where a reading shows a defect. **Shared** (return the hunks in the
report): `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `guides/veneer.md`. **Off-limits:** `src/browser/**`,
`src/core/**`, `tests/src/browser/**`, `tests/src/core/**`, `tests/setupServer.ts`, `tests/setupBrowser.ts`,
`tests/app/**`, `app/**`, the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`),
and every other partial. No git command that writes, no install, no `npm run format`; `npm run build:src:styles` and
`npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Read the release's button-versus-non-button difference set for each class in each state, and report it.
2. Add one proof per class, in its component's test file, reading its button form against its non-button form in both
   cascades under the holder, at rest and in each state the class takes, with the case matrix exported from
   `tests/setupStyles.ts`. Each proof is red when its partial's include goes; run that mutation per partial.
3. Guard the reset against the minifier. The build's minifier folds a longhand written after a `revert` shorthand in
   the same rule into one invalid shorthand (`transition: revert; transition-delay: 1s` compiles to
   `transition:revert 0s 1s`, which the browser drops; E-ID-BUTTON-CASCADE round 5 measured it). Add a proof, beside the
   mixin's property-set case in `tests/src/styles/mixins.test.ts`, that every declaration the `components` layer's
   `:where()` reset rules write whose value names `revert` has `revert` as its whole value; it reads red under that
   plant.
4. Update the guide's § Outside the ledger paragraph that begins "The button reboot rules come after those names" so it
   names the proofs that read the resets.
5. Run the owned files, then `npm run test:src:styles`, `npm run test:setup`, `npm run test:conformance`,
   `npm run test:guides`, and `npm run test:policy`. Record each gate's exit code in its log (append `echo "exit=$?"`)
   and each mutation's restore check in its log.

## Output

Write `tmp/units/ebcl-report.md` and return the same text: the difference sets from step 1; the oracle per state and
the disabled-state ruling; the proofs with their case titles; the mutation table (a kill counts only when the failing
case's message names an assertion failure) with log paths; any partial fix with its reading; the gate table with log
paths; the shared-file hunks; `tmp/units/ebcl.diff` (`git diff LANDING_HEAD`) and `tmp/units/ebcl-status.txt`. State no
count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles the holder values, the
non-button forms, the disabled-state oracle, the case names, and the guide wording. Stop and report
if a class needs a fix outside its own partial, or a selector the tenets forbid.

## Acceptance criteria

Each class the Context names has a proof reading its button form at rest and in each state it takes; each proof is red
when its partial's include goes, with an assertion failure; the minifier guard reads red under its plant;
the guide's paragraph names the proofs; every gate named in Execution step 5 exits 0.
