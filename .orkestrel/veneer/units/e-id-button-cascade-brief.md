# Unit E-ID-BUTTON-CASCADE — the button surface on the tag, and each button-built class's reset

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/veneer-ebc` (branch `unit/ebc`, cut from
the session branch at the E-ID landing, `LANDING_HEAD`). Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,architecture,documentation,writing,quality}.md`;
Veneer's `ROADMAP.md` § Tenets in the worktree; the design verdict
`/home/user/scaffold/.orkestrel/veneer/e-id-button-design-verdict.md`, which binds; and both design proposals it names,
for their matrices. No skill applies.

## Objective

Every `button` element takes the calibrated button surface and its states from the `elements` layer, whatever class it
carries. Each class the release builds on a `button` element writes the button reboot back on its button form, at zero
specificity, in the `components` layer, so the class lays out and paints as the release's.

## Context

- **The rule today.** `src/styles/elements/_button.scss` scopes the surface to `button:not([class], [data-bs-target])`.
  The guide's paragraph beginning "A bare button is a `button` element" states it, and the Tailwind paragraph beginning
  "A button styled with utility classes" relies on it (search `guides/veneer.md` for both).
- **The layers.** `src/styles/_tokens.scss` declares `@layer theme, reset, base, elements, components, utilities;`.
- **The mixin.** `src/styles/_mixins.scss` holds the component mixins; the `button-reboot` mixin joins them, named for
  the block it emits.
- **The partials.** `_close.scss`, `_navbar.scss`, `_accordion.scss`, `_dropdown.scss`, `_nav.scss`, `_list-group.scss`,
  `_pagination.scss`, and `_carousel.scss` under `src/styles/components/`. `.btn` in `_button.scss` takes no include.
- **The proofs today.** `tests/src/styles/elements/button.test.ts` and the `BUTTON_BARE_*` cases in
  `tests/setupStyles.ts` (search the name); `tests/src/styles/components/close.test.ts` carries bare-button wording;
  `tests/conformance.test.ts` names the forced-colors selector literal; `tests/fixtures/tailwind/markup.html` and
  `tests/service/tailwind/consumer.test.ts` carry the Tailwind pairing. Find every other site that names the scope by
  searching the tree for `not([class]`, `bare button`, `bare treatment`, and `no class claims`.
- **Host.** Linux, bash; put `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`
  first on `PATH`, set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, and launch Chromium in a probe with
  `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'`. Format only with
  `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`. Rebuild the styles with `npm run build:src:styles` before
  a styles run. `tests/app/browser/integration.test.ts` is excluded from `app:browser`; the landing chain runs it.

## Unknowns

- Whether each `revert` in the mixin reads the release's value on a `button` in Chromium (`font-weight`, `outline`,
  `transition`, `pointer-events`, `color`). Read each against the release's cascade on the same markup and write the
  literal where `revert` does not match; report each reading.
- Whether the ledger's selector normalizer, the positional scan, and the policy sweep accept the first `:where()` in
  Veneer's cascade. Run them and report.

## Scope

**Owned.** `src/styles/elements/_button.scss`; the include line and its comment in each named component partial; the
`button-reboot` mixin in `src/styles/_mixins.scss`; `tests/src/styles/elements/button.test.ts`; the mixin's proof in
`tests/src/styles/mixins.test.ts`; `tests/src/styles/components/close.test.ts` where its wording or transition case
names the old scope; `tests/conformance.test.ts` where a literal names the old selector; the Tailwind fixture and
consumer test; `app/browser/styles/_shell.scss` and `tests/app/browser/**` where a comment or title names the old scope.
**Shared** (return the hunks in the report): `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `guides/veneer.md`.
**Off-limits:** `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`, the vendored files
(`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), and every other partial. No git command that
writes, no install, no `npm run format`; `npm run build:src:styles` and `npm run build:src` are allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Write the mixin, the tag rule, and the includes per the design verdict.
2. Proofs, each red before the change or under a named mutation, run under a holder that retunes `--vn-weight-body` to
   700 and `--vn-button-shadow` to a visible shadow and sets `font: 600 19px/29px serif`, so a leaked declaration reads
   a value the release never produces:
   - `<button>`, `<button class="">`, `<button class="px-3">`, `<button class="order-action">`, and a classless
     `<button data-bs-target="#harbor">` outside a carousel read the surface's padding (the utility case reads the
     utility's), type, color, background, corner, shadow, and transition at rest, and read the classless button's
     values under hover, press, keyboard focus, and disabled; red when the `:not([class])` or the `[data-bs-target]`
     exclusion returns.
   - A consumer rule `.order-action { padding: 0; border-radius: 2px }`, unlayered and again inside
     `@layer components`, reads 0 and 2px with every other surface value intact; red when the surface's padding is
     marked `!important`.
   - The property names the `elements` button rule and its state rules declare equal the names the mixin declares, and
     no surface declaration is important; red when the surface gains a property the mixin lacks.
   - Every `.btn` form (filled, outline, link, sizes, disabled, checked through `.btn-check`) reads its readings from
     before the change, under the holder; red under a mutation that adds a surface property `.btn` does not write.
   - One class's button form (`button.nav-link` under a plain `.nav`) reads the release's corner, type, and shadow;
     red when its partial's include goes. E-ID-BUTTON-CLASSES reads the rest.
3. Update the guide's rows and prose to the shipped cascade: the paragraph that begins "A bare button is a `button`
   element" and the Tailwind paragraph become true of the tag rule, with no "bare button" term; each `:where()` reset is
   recorded as the ledger requires.
4. Run the owned files, then `npm run test:src:styles`, `npm run test:setup`, `npm run test:conformance`,
   `npm run test:guides`, `npm run test:policy`, and
   `npx vitest run --config vite.config.ts --no-cache --project app:browser`. Record each gate's exit code in its log
   (append `echo "exit=$?"`) and each mutation's restore check in its log.

## Output

Write `tmp/units/ebc-report.md` and return the same text: the changes; the `revert` readings and every literal written
in their place; the failing-first and mutation tables with log paths; the gate table with log paths; the shared-file
hunks; `tmp/units/ebc.diff` (`git diff LANDING_HEAD`) and `tmp/units/ebc-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles the proof fixtures, the
mixin's literals where `revert` misreads, the guide wording, and the case names. Stop and report if a class the
verdict names needs a reset in a state rather than at rest, or if a gate refuses `:where()`.

## Acceptance criteria

The tag rule reads no class or attribute; each named partial includes the reset on its button form and `.btn` includes
none; every proof in Execution step 2 is red under its named mutation; the guide carries no "bare button" term and
states the tag rule; every gate named in step 4 exits 0.
