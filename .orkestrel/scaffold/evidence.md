# Evidence slice — skills campaign, read first-hand by the Orchestrator on 2026-09-02

Every path is relative to `C:\Users\mikes\WebstormProjects\` unless it starts with `scaffold/`.
Line numbers are from the reads taken on 2026-09-02. A claim with no line number was read from
the whole file.

## The subject: two skills vendored to the fleet

- `scaffold/.agents/skills/enterprise-bootstrap/` — `SKILL.md` (241 lines) and
  `references/frontend-design.md` (129), `components.md` (1021), `utilities.md` (312),
  `bootstrap-reference.md` (618). Portable by design: "Assume no stack" (`SKILL.md:44`), binds no
  Orkestrel rule, keeps its name outside the `orkestrel-` namespace by the exception in
  `scaffold/.claude/rules/documentation.md` § Workflow skills.
- `scaffold/.agents/skills/orkestrel-prove-journey/` — `SKILL.md` (132 lines),
  `references/layer.md` (131), `references/captures.md` (74).
- `scaffold/.agents/skills/orkestrel-polish-surface/references/capture-harness.md` owns
  portfolio review; `captures.md` and `SKILL.md` route review there.
- Every file under `.agents/skills/` is listed in `scaffold/host.json` and ships as
  `dist/host`, so a skill edit is a scaffold bump and a fleet `repair` visit
  (`scaffold/.agents/orchestration.md` § What a bump obliges).
- Skill shape law, `scaffold/.claude/rules/documentation.md` § Workflow skills: a skill directory
  holds `SKILL.md`, `agents/openai.yaml`, and the `references/*.md` files `SKILL.md` names, and
  nothing else. No `scripts/`, no `assets/`. `SKILL.md` stays concise; conditional detail goes to
  one-level `references/`. Frontmatter is `name` and a `description` carrying a `Use ` sentence.

## What `@orkestrel/test` 0.0.11 already publishes for browser proof

`test/src/browser/index.ts` re-exports `types`, `constants`, `helpers`, `factories`; it imports
`vitest/browser` at module scope, so it loads only inside Browser Mode.

- Resolver and reachability: `resolveAccessible` (`helpers.ts:164–183`), `resolveRendered` (123),
  `isReachable` (57), `isRendered` (96), `isOutsideViewport` (25). Failure voices are the ones
  `layer.md` prescribes, plus region and disclosure variants (`test/guides/test.md` § Voices).
- Verbs: `clickAccessible` (207), `clickAccessibleWithin` (245), `clickDisclosure` (291),
  `typeAccessible` (319), `fillAccessible` (342), `pressKeys` (357), `traverseAccessible` (373).
- Perception: `readPerception` (418), `readPage` (461), `readFocus` (478), `readValue` (500),
  `readText` (529), `readRole` (559), `readName` (603), `readStates` (661), `describeTree` (723),
  `describeFocus` (772) — the last two render an accessibility tree and a tab order as text.
- Fixtures: `build` (828), `mount` (868), `render` (898), `typeInput` (940), `commitInput` (961),
  `clearStorage` (979), `removeDatabase` (1005), `waitForFrame` (804).
- Color and contrast: `parseColor` (1038), `rgba` (1092), `colorEqual` (1128), `blendColor`
  (1155), `measureLuminance` (1177), `measureContrast` (1202), `readLayers` (1231),
  `readBackdrop` (1266), `contrast` (1307) — composites translucent layers to the first opaque
  ancestor and refuses an unpainted stack unless a `floor` is supplied — and `readRing` (1363)
  for focus chrome.
- Cascade: `readCascade` (1409) returns every class token the loaded stylesheets define;
  `readRules` (1447), `findRule` (1485), `findKeyframes` (1509), `readRows` (1533),
  `extractOrphans` (1570) returns markup of every element carrying a child class with no parent
  class above it; `style` (1593), `token` (1621), `rootToken` (1642), `pixels` (1669).
- Capture: `stagePane` (1713), `releasePane` (1761), `captureFrame` (1791), `expandCaptures`
  (1836); `createPortfolio` (`factories.ts:106`) with `PortfolioOptions { states, variants,
  variant, directory, enabled? }` and `CaptureVariant { name, width, height, apply? }` — one
  variant per run, `<state>--<variant>.png`, refuses an unregistered variant at creation and an
  unregistered or repeated state at `place`.
- Journal: `createJournal` (`factories.ts:207`) records `{ action, trigger, result }` steps and
  every console line and uncaught failure.
- Constants: `ACCESSIBLE_ROLES`, `CONTENT_ROLES`, `FIELD_ROLES`, `HEADER_ROLES`, `IMPLICIT_ROLES`,
  `FOCUSABLE_SELECTOR`, `CANVAS_COLOR`, `CAPTURE_PANE`.
- Contradiction: `orkestrel-prove-journey/references/layer.md` opens "Implement the signatures
  below as a contract in the workspace's browser test setup module; never copy them as source",
  and `SKILL.md` § Build or verify the journey layer says to add a helper "only where
  `@orkestrel/test` publishes none". The package now publishes every signature `layer.md`
  lists. `captures.md` prescribes a hook `capture(state)` returning `undefined` when unflagged;
  the package's `place` does the same.
- The `enterprise-bootstrap` "Mechanical proof" instruments (`SKILL.md:86–92`) — composited
  contrast, authored classes against the shipped cascade with a population floor and an absent
  control, one glyph one meaning — map onto `contrast`/`readLayers`, `readCascade`/`readRows`/
  `extractOrphans`, and nothing yet for the glyph registry. The skill names none of them.

## The form vocabulary

`form/src/core/types.ts`: `FieldControl = text | editor | password | number | date | time |
datetime | color | confirm | select | checkbox | file`. `confirm` is a lone on/off box holding a
boolean; `checkbox` is the multi-choice group; `datetime` is `datetime-local`. `SelectField.open`
admits a value the list does not offer (a datalist or suggestion list). `FieldBase` carries
`label`, `help`, `group`, `hidden`, `locked`, `disabled`, `rule`, `meta`. `FieldRule` carries
`required`, `minimum`, `maximum`, `step`, `pattern`, `email`, `url`, `integer`, `alphanumeric`,
`custom`. `FormInterface` exposes `values`, `baseline`, `errors` (`{ field, message, rule? }`),
`touched`, `disabled`, `status`, `valid`, `dirty`, `answer`.

`form/guides/form.md` § Controls: "A browser range is a `number` with `minimum`, `maximum`, and
`step`. A radio group is a `select` and … the affordance to draw is the renderer's decision. A
datalist is a `select` with `open`." The visibility table (lines 908–917): `hidden` keeps the
field out of the rendered form, `locked` renders it without edits, both still validated and
submitted; `disabled` renders without edits or is omitted, neither validated nor submitted.
Concept inventory (1620–1645) parks presentation hints, input masks, accessibility ids,
first-error focus, constraint-API binding, and `FormData` on the renderer or a future
`src/browser`. The package ships no browser environment.

## How the fleet renders inputs today

- `taverna/app/browser/components/EntityField.vue`: one component maps a `control` axis onto
  `textarea.form-control`, `select.form-select`, a segmented `btn-group[role=radiogroup]` of
  `btn-check` radios with `btn btn-outline-secondary` labels, `form-check form-switch` with
  `role="switch"`, `input[type=date].form-control`, and `input.form-control` for the rest. Labels
  are `form-label small fw-medium text-body-secondary d-block`; required is a `text-danger`
  asterisk with `aria-hidden`; errors are `invalid-feedback d-block` with `aria-invalid` and
  `aria-describedby`. Read mode keeps the same control with `readonly`/`disabled` plus the
  chrome string `bg-transparent border-secondary border-opacity-10 shadow-none` so view and edit
  never reflow — a utility combination chosen because Halfmoon has no `border-transparent`.
  The comment says `form-control-plaintext` was rejected for its zero horizontal padding.
- `taverna/app/browser/components/EntityPicker.vue`: an APG combobox — `input[role=combobox]`
  with `aria-expanded`, `aria-controls`, `aria-autocomplete=list`, `aria-activedescendant`,
  a `ul[role=listbox].dropdown-menu.show.w-100.shadow` of `dropdown-item` buttons, debounced
  search, a clear button in an `input-group`, and `dropdown-item-text` for "No matches".
- `taverna/app/browser/components/ConfirmDialog.vue`: Bootstrap `Modal` JS driven by an `open`
  prop, teleported to body, restores `role="alertdialog"` after `shown.bs.modal`, captures and
  restores the invoker's focus, no `fade` so hide completes before unmount.
- `taverna/app/browser/types.ts:112`: `FieldView { name, label, control, value?, options?,
  error?, required?, pending? }` — its own `FieldControl`, not `@orkestrel/form`'s.
- `taverna/app/browser/styles/main.css`: Halfmoon plus its modern core; `data-bs-theme` on
  `<html>` flipped by `useTheme`.
- `terrain/app/browser/components/Toolbar.vue`: one `btn-primary` per bar; Delete swaps
  `btn-outline-danger` for `btn-outline-secondary` while disabled and carries its reason through
  `aria-describedby` to a `visually-hidden` span; `btn-sm` and `btn-group-sm` gated to `md` and
  up by a `useMedia` composable; two real Bootstrap `Dropdown` instances disposed on unmount;
  `navbar navbar-expand-lg bg-body-tertiary border-bottom d-print-none`. Every decision is
  written as a comment beside the markup.
- `terrain/app/browser/styles/_tokens.scss` and `_theme.scss`: the brand is set by retuning
  Halfmoon's `--bs-<name>-hue` and `--bs-<name>-saturation` under
  `html[data-bs-core='modern']` and its `[data-bs-theme='dark']` twin; `index.scss` carries the
  campaign's single authored CSS exception, a `:focus-visible` outline for the controls whose
  vendor ring fell under 3:1.
- `terrain/tests/app/browser/styles/tokens.test.ts`: reads `--bs-primary` per theme, proves a
  decreasing heading ramp, proves every focus indicator above 3:1 in both themes by tabbing
  through real controls, and carries a negative control that must read under 3:1. The luminance
  math is written inline twice; `@orkestrel/test/browser` `readRing` and `contrast` now do it.
- `terrain/tests/setupBrowser.ts` and `taverna/tests/setupBrowser.ts` load the real cascade,
  set `data-bs-core`, and define `typeInput`/`commitInput` and IndexedDB fixtures locally;
  `taverna` also defines `DESKTOP = 1280×800`, `MOBILE = 390×844`, and `viewport()` over
  `page.viewport`, reset in `afterEach`.
- `lloyds/app/browser/styles/main.scss`: a custom `.form-check-input-danger` class over
  `--bs-danger` tokens, because Bootstrap ships no `form-check` color variant.
- `mailbox/app/browser/pages/`: `DatePickerPage`, `TimePickerPage`, `RangeSliderPage`,
  `RatingPage`, `UploadPage`, `TagPage`, `StepperPage`, `SplitterPage`, `StatPage`,
  `EmptyStatePage`, `SkeletonPage` — custom class contracts (`.date-picker`, `.date-cell`,
  `.dropzone`, `.upload-zone`) over `--bs-<component>-*` tokens on a Tailwind foundation. These
  are the affordances Bootstrap 5.3 ships no component for.

## Interactive and visual test tooling in the fleet

- Statechart contract, identical in `elements/tests/setup.ts:473–486` and `veneer/tests/setup.ts`:
  `StateTransition { name, from, event, to }` and `StateScenario { transition, arrange, act,
  assert }`; `runScenarios(scenarios, build)` in `elements/tests/setupBrowser.ts:498` and
  `runScenarios(name, build, scenarios)` with `settle(element, eventName)` in
  `veneer/tests/setupBrowser.ts:98`. Veneer drives real Bootstrap components — Modal, Offcanvas,
  Collapse, Alert, Tabs, Tooltip, Popover — through `source × event → target` tables
  (`veneer/tests/app/browser/*.test.ts`).
- `elements/app/browser/playgrounds/StatechartHarness.vue`: a Vue harness that renders the
  widget in a stage, lists every transition with a per-row play button and `Play all`, shows a
  state badge and an event log, paints pass/fail per row, narrates through a `role="status"`
  announcer, exposes `data-statechart-status|passed|failed|total` for automation, deep-links
  `?scenario=<slug>` and `?autoplay=all` from the route hash, and runs an optional `demo()` that
  leaves the widget in its most visually meaningful state for a human or a vision model.
  `elements/tests/app/browser/playgrounds.test.ts` mounts each page, presses `Play all`, polls
  the status attribute, and asserts `passed` with zero failures.
- `veneer/tests/src/styles/rendered.test.ts`: renders the whole showcase `index.html` body in
  light and dark and snapshots a computed-style matrix (`color`, `background-color`, borders,
  radii, paddings, margins, font, `box-shadow`, `gap`, `display`, …) per element.
  `switches.test.ts` proves `data-vn-radius` and `data-vn-density` retune resolved pixels.
  `veneer/app/browser/index.html` has a Live switches panel (`data-vn-attr` radios for theme,
  radius, density).
- `elements/src/browser/inspector/`: a DOM-walking content-model inspector over a W3C corpus
  returning severity-ranked findings with stable paths and spec citations
  (`elements/guides/inspector.md`).
- Style primitives `mount`, `render`, `build`, `style`, `token`, `rootToken`, `rgba`,
  `colorEqual`, `pixels`, `findRule` are defined locally in `elements/tests/setupStyles.ts`,
  `veneer/tests/setupStyles.ts`, `mailbox/tests/setupStyles.ts`; `@orkestrel/test/browser` now
  exports the same names.
- `probe/guides/probe.md`: the `prove` MCP tool takes a `Claim` — a case, a negative control,
  and a test — and runs both through the workspace's TypeScript, Oxlint, and Vitest, minting a
  `receipt` when the case is clean and the control breaks where declared.
  `probe/src/server/helpers.ts:534` `inferTestProject`: `tmp/probe/**` names the `probe`
  project; `tests/{src,app}/<environment>/**` names `<axis>:<environment>`. Every fleet
  `vite.config.ts` composes `probe` with `browser: { enabled: false }`. So a claim whose test
  path is `tests/app/browser/…` would infer `app:browser`, a Playwright Chromium project; whether
  the runtime overlay works there is unproven (Grok slice `absorb-tooling` is asked to settle it).

## Rules that bind a rewrite

- `scaffold/AGENTS.md` § Writing and § Instruction files: every line a directive; no counts;
  no aphorisms; state the finding as the rule; one home per rule.
- `scaffold/.claude/rules/writing.md`: `must`/`can`/`might`, never `should`; no `ensure`; code
  tokens followed by a noun; substitution table.
- `scaffold/.claude/rules/tests.md`: real implementations only; `@orkestrel/test` owns shared
  helpers; browser tests use the real browser; `integration.test.ts` is the journey home;
  probes live in `tmp/probe/` under the `probe` project; capture portfolios stay out of version
  control; cross-cutting proofs have fixed paths.
- `scaffold/.claude/rules/styles.md`: `_tokens.scss` / `_theme.scss` / `_mixins.scss` /
  `index.scss`; never a literal color; verify against the shipped resolved cascade.
- `scaffold/.claude/rules/browser.md`: utilities for layout, token-backed semantic classes for
  chrome, `[data-theme]` retheme through tokens, native platform APIs first.
- `scaffold/.claude/rules/quality.md` § Instruments: an instrument is not evidence until it has
  failed; pair every probe with a negative control from outside its population; call `prove`
  when a claim can name its project, case, and control.
