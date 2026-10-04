# Unit flip-header (R12): the compact sticky showcase header

## Role and engine

astra on GPT-6 Astra (effort high), run as `codex exec` at `danger-full-access`. Executor: BENCH_ENGINE. You are the only writer of tracked files in `/home/user/veneer`. The falsify analyst lane may still write `/home/user/veneer/tmp/units/flip-falsify/**` while you run; its files may appear in `git status --porcelain`: list them and change none. Every path in this brief is absolute, or it names a file under `/home/user/veneer` in prose.

## Objective

Implement the user's ruling R12 of 2026-10-04 on the showcase header in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6` (head `473edd6` at brief time). The header becomes a short, compact toolbar that sticks to the top of the viewport under every face and color mode:

- Short face labels in the Stylesheets group.
- The brand and the version on one line.
- The status sentence kept for assistive technology and visually hidden.
- Compact at 390 px, face-neutral chrome, and a scroll margin so the sticky header never covers a heading the contents navigation scrolls to.

Update every case and reading that names a label or reads the header. Rerun the P4-style chrome reading, and rebuild `/home/user/veneer/showcase/browser.html`. Commit nothing.

## Context

- **The ruling.** `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/brief.md` § R12 (the user's words, and the Orchestrator's ruling). The capture of the header at 390 px is `/home/user/scaffold/tmp/codex/header-390-capture.jpg`. R12 supersedes the copy document's labels (§ 1 rulings 1.2 to 1.4) and the header layout (§ 5 rulings 5.2, 5.5). The vocabulary rulings of § 7 stand.
- **Evidence.** Read these in order before editing:
  1. `/home/user/scaffold/tmp/codex/flip-copy.md` § 1, § 5, § 7, § 8 (titles keep the § 8 shape: lower-case first word, present-tense verb, no closing period).
  2. `/home/user/scaffold/tmp/codex/flip-showcase-brief.md` (U5b: the chrome replacement rules, the P4 rerun, the test case map) and `/home/user/scaffold/tmp/codex/flip-journeys-brief.md` and `/home/user/scaffold/tmp/codex/flip-journeys-8-brief.md` (the header readings, the statechart harness, the host-bound classification).
  3. `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md` § 5 (the chrome rule: no chrome class reads differently between faces).
  4. `/home/user/veneer/tmp/units/flip-showcase/p4.ts` and its sibling modules in that folder (the P4 chrome reading you copy; never edit it in place).
  5. `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` § Host-bound set (the journey failures that do not count against you).
- **Current code at brief time.** Read every item before editing:
  - `/home/user/veneer/app/browser/factories.ts` `createShell` (from :735): the header `header.border-bottom.bg-body-tertiary`; the bar `container-xxl d-flex flex-wrap align-items-center row-gap-3 column-gap-3 py-3`; the brand `div.me-auto` holding `h1.h4.mb-0.d-flex.align-items-center.gap-2` (the `box-seam` icon and `Veneer`) and a second line `p.small.text-body-secondary.mb-0` reading `Bootstrap 5.3.8 on Veneer CSS` (a string literal at :776; no constant holds the version); the controls `d-flex flex-wrap align-items-center row-gap-3 column-gap-3` holding `createChoices(document, 'Stylesheets', FACES, face)`, `createChoices(document, 'Color mode', THEMES, theme)`, and the status `p.small.text-body-secondary.mb-0` with `role="status"` and `aria-label="Showcase state"`. `createChoices` (:714) already builds `btn-group btn-group-sm`. The contents region renders a flowing copy (`d-lg-none`) and a sticky copy `d-none d-lg-block sticky-lg-top vh-100 overflow-y-auto py-3`. `createContents` (:652) links each section by `#${section.id}`; `createSection` (:556) gives each section its id and an `h3` title. Group headings are `h2` with id `group-${group.id}`.
  - `/home/user/veneer/app/browser/constants.ts`: `TITLE` :21, `FACES` :31 to :34 (labels `Bootstrap only`, `Tailwind without the layer`, `Tailwind with the layer`; TSDoc example :28), `THEMES` :45.
  - `/home/user/veneer/app/browser/helpers.ts` `describeState` (its TSDoc example names a label).
  - `/home/user/veneer/app/browser/Showcase.ts`, `/home/user/veneer/app/browser/types.ts`, `/home/user/veneer/app/browser/main.ts`, `/home/user/veneer/app/browser/index.html` (holds no header; the header is built by `createShell`).
  - `/home/user/veneer/app/browser/sections/tailwindcss.html` :7, :11, :18: the introduction paragraphs open with `<strong>Bootstrap only</strong>`, `<strong>Tailwind without the layer</strong>`, `<strong>Tailwind with the layer</strong>` (copy rulings 1.11 to 1.13).
  - The showcase has no scrollspy on its contents navigation (the only `data-bs-spy` markup is the specimen in `/home/user/veneer/app/browser/sections/live-components.html`), no stylesheet of its own, and `CLASS_NAMES` holds no `scroll-margin` or `scroll-padding` utility (verified with `grep` at brief time; confirm).
  - `CLASS_NAMES.bootstrap.utilities` in `/home/user/veneer/src/core/constants.ts` holds `position-sticky` (:3611), `top-0` (:3963), `z-3` (:3999), `bg-body` (:2322), `border-bottom` (:2373), `column-gap-2` (:2430), `flex-md-nowrap` (:2644), `justify-content-md-between` (:2871), `visually-hidden` (:1924), `sticky-top` (:1846); `row-gap-2` sits under the `row` prefix (:1775). Confirm each.
  - Tests: `/home/user/veneer/tests/app/browser/Showcase.test.ts`, `constants.test.ts`, `factories.test.ts`, `helpers.test.ts`, `/home/user/veneer/tests/app/browser/sections/integration.test.ts`; `/home/user/veneer/tests/setupBrowser.ts` showcase section (`FACE_LABELS` :232, `readFace` and `isFace` near :717, `applyFace` near :796, `readShowcaseChrome` :1072, the face press helper near :1606, `FACE_SCENARIOS` :1680 with row names `… through the Bootstrap only button`, `buildPairScenarios` :1886, `TAILWIND_READINGS` :286); `/home/user/veneer/tests/setupBrowser.test.ts` describes `showcase mount` :245 and `applyFace and applyTheme` :778; `/home/user/veneer/tests/app/browser/integration.test.ts` (J1 :189 with the 390 header measurement :212 to :226, J2 :245, J4 :354, J6 :395, the paired engine states case :816, the readings and partition case :944, the statechart face and pair rows).
  - `/home/user/veneer/guides/veneer.md` § Showcase (:1840) and § Faces (:1883), and the journey prose at :2184 to :2188: read only. The guide follows the unit; the Orchestrator applies your strings.
- **Law.**
  - `/home/user/scaffold/AGENTS.md`: the non-negotiables (no `any`, no `as` beyond `as const`, no `!`, no `@ts-*`, lint-disable, or formatter-ignore directives, no new npm package, no mocks), the environment boundary (`/home/user/veneer/tests/setupBrowser.ts` imports no value from the app folder, only types), no nested functions, readonly interface properties, types before implementation, `{verb}{Noun}` helpers, derive state, the wrapper law.
  - `/home/user/scaffold/.claude/rules/tests.md` (one behavior per case, planted and removed controls), `/home/user/scaffold/.claude/rules/typescript.md` (update each TSDoc contract your change makes false), `/home/user/scaffold/.claude/rules/writing.md`, `/home/user/scaffold/.claude/rules/names.md`, `/home/user/scaffold/.claude/rules/styles.md`. The contrast cases stay.
- **Installed primitives.** In `/home/user/veneer/node_modules`: `vitest` browser, `@orkestrel/test` (`requireValue`, `waitForCondition`), `@orkestrel/test/browser` (`readStyle`, `readClasses`, `readName`, `readPerception`, `readContrast`, `clickAccessible`, `isRendered`), `playwright` (for the P4 copy). Reuse the existing helpers (`mount`, `parkShowcasePointer`, `resolveRendered`); a local twin of an existing helper is a defect.
- **Host.**
  - Linux POSIX. Run from `/home/user/veneer`, with `/home/user/.wave/npm11/node_modules/.bin` first on `PATH` (npm 11). Chromium 141.0.7390.37 under Playwright; the P4 copy launches it as the U5b copy does.
  - Sandbox `danger-full-access`: no network, installs, or commits.
  - A nested `git` may report "not a git repository". Do not diagnose that; your own `git status --porcelain` is the authority.
  - `/home/user/veneer/tmp/` and `/home/user/veneer/dist/` are ignored. Create the folder /home/user/veneer/tmp/units/flip-header (it does not exist yet).
- **Standing conditions.** At start, record `git status --porcelain` (expect no tracked change), `git log --oneline -3`, `sha256sum dist/src/bootstrap/index.css showcase/browser.html`, and one baseline run each of `npm run test:app:browser` and `npm run test:setup:browser`, with exits and failing titles.

## Implementation

Each item can be checked against its acceptance.

1. **Labels.**
   - `FACES` in `/home/user/veneer/app/browser/constants.ts`, in this order: `{ value: 'bootstrap', label: 'Bootstrap' }`, `{ value: 'unexcluded', label: 'Tailwind, no layer' }`, `{ value: 'tailwindcss', label: 'Tailwind + layer' }`. Identifiers stay. Visible text equals the accessible name. Update its TSDoc example.
   - The group's accessible name stays `Stylesheets`, with no visible title. The Color mode group keeps `Light` and `Dark`.
   - The status sentence keeps its form through `describeState` (`<face label>, <mode> color mode`, for example `Tailwind + layer, dark color mode`), keeps `role="status"` and `aria-label="Showcase state"`, and carries `visually-hidden` in place of its visible classes. Update `describeState`'s TSDoc example.
   - `FACE_LABELS` in `/home/user/veneer/tests/setupBrowser.ts` follows the three labels; the `FACE_SCENARIOS` row names follow (`… through the Bootstrap button`, `… through the Tailwind, no layer button`, `… through the Tailwind + layer button`).
   - The Tailwind section introduction (`/home/user/veneer/app/browser/sections/tailwindcss.html`): replace only the text of the three `<strong>` lead-ins with the three labels; every other word of rulings 1.11 to 1.13 stays verbatim. Captions that read `Bootstrap only:` or `under Bootstrap only` stay: they name a sheet set in prose, not a button.
2. **Brand line.** One line: `h1` reading `Veneer` (the `box-seam` icon stays before it, `aria-hidden` as today) at a small size, with `Bootstrap 5.3.8` beside it in muted small text on the same line, inside the `h1`'s line box or a sibling on the same flex row. The second line is gone. The version text is `Bootstrap 5.3.8`; keep it a literal in `createShell` (no constant holds it today; add none). The heading's accessible name stays exactly `Veneer` (J1 reads `getByRole('heading', { name: 'Veneer', exact: true, level: 1 })`), so the version must not sit inside the `h1`'s accessible name.
3. **Sticky and compact.**
   - The `header` (the `banner` landmark) carries `position-sticky top-0 z-3 bg-body border-bottom` in place of `border-bottom bg-body-tertiary`.
   - The bar keeps `container-xxl` (its horizontal gutter) and takes `py-2` for `py-3`. Do not add `px-3`: Bootstrap's `px-3` is 1rem and Tailwind's is 0.75rem, so it departs under the `tailwindcss` face. Every spacing name in the header must read the same under the three faces: Bootstrap-only names, or shared names whose values agree (steps `0`, `1`, `2`).
   - The buttons stay `btn-sm` (from `btn-group-sm`).
   - At 390 × 844 the header's box height leaves at least 70% of the viewport height for content (header height ≤ 253 px). Measure and report the header box at 390 × 844 and at 1280 × 800.
   - The three face buttons and the two mode buttons fit without a button's text wrapping: each button's height equals one line box, measured as the P4 header reading measures (button boxes, group box, `buttonsWrap`, `overflow`).
4. **Mobile layout.**
   - At 390 px: the brand line, then one wrapping row holding the Stylesheets group and the Color mode group (`d-flex flex-wrap align-items-center column-gap-2 row-gap-2`).
   - At 768 px and wider: one row with the brand left and the groups right (`justify-content-md-between` on the bar, with `flex-md-nowrap` if needed).
   - No `gap-*` class on header chrome; use `row-gap-*` and `column-gap-*` (the U5b chrome replacement rule).
5. **Scroll margin and the sticky contents copy.**
   - Every target of the contents navigation (each section the links name with `#${section.id}`, and each group heading if linked) scrolls to a position whose top sits at the header's height plus 8 px.
   - No Bootstrap scroll-margin utility exists, the showcase has no stylesheet of its own, and the contents navigation has no scrollspy, so a class or `data-bs-offset` cannot carry it. Default mechanism: `Showcase` observes the header with a `ResizeObserver` and writes `scroll-padding-top` (header height plus 8 px) as an inline style on `document.documentElement`; `destroy` disconnects the observer and restores the prior inline value, so the existing `restores the title, a %s data-bs-theme, the head, and the body on destroy` case still passes and gains the root style in its reading. `createShell` stays free of `style` attributes (the factories case `carries only registry, engine marker, icon, and Tailwind class tokens, no style attribute, and unique ids` stays green).
   - The sticky contents copy (`sticky-lg-top`, `z-index` 1020, `top` 0) would slide under or over the sticky header at 992 px and wider. The same observer writes the header height as the copy's inline `top` and reduces its height by the same amount, so the copy never overlaps the header and its last link stays reachable. Read and report the copy's top against the header's bottom at 1280 after scrolling.
   - If you find a mechanism with fewer moving parts that meets both readings, use it and record why; a mechanism that adds a class outside the registry is refused.
   - Reading: at 1280 × 800 and 390 × 844, click the contents link of a section deep in the page and of the first section; after the scroll settles, the target heading's top is at or below the header's bottom (report both numbers). Add this as a case.
6. **Chrome neutrality.** Every header class reads the same under the three faces. Add one case (in `/home/user/veneer/tests/app/browser/Showcase.test.ts` or `/home/user/veneer/tests/app/browser/sections/integration.test.ts`) that reads the header's computed `position`, `top`, `z-index`, `background-color`, and box under each face at 390 and 1280 and asserts equality, with a planted non-neutral class (`px-3` on the bar) as the control that fails it.
7. **Tests and readings.** Update every case that names a label, reads the status line, the header height, or the five buttons' order. At brief time:
   - `/home/user/veneer/tests/app/browser/Showcase.test.ts`: the label rows and status strings at :77, :85 to :87, :104 to :156, :203, :228 to :230, :254 to :271, :289 to :299, and `reads every header button at 4.5:1 or more, pressed or not, in both color modes` (:278; it must pass with `btn-sm` and the `bg-body` header).
   - `/home/user/veneer/tests/app/browser/constants.test.ts` `labels the stylesheet and color-mode buttons and titles the page` (:306).
   - `/home/user/veneer/tests/app/browser/factories.test.ts` `presses %s and %s and reads them in the status line` (:778), `builds the skip link, banner, controls, contents region, and main landmark` (:791; it reads the three labels, the header classes, the visually hidden status, and the single brand line, with the removed control that no header element carries `gap-*`).
   - `/home/user/veneer/tests/app/browser/helpers.test.ts` the `describeState` expectations (:151 to :158).
   - `/home/user/veneer/tests/setupBrowser.ts` showcase section: `FACE_LABELS`, the `FACE_SCENARIOS` names, `readShowcaseChrome` if it reads the header, and any helper that reads the 390 header; `/home/user/veneer/tests/setupBrowser.test.ts` describes `showcase mount` and `applyFace and applyTheme`.
   - `/home/user/veneer/tests/app/browser/integration.test.ts`: J1 (the labels; the 390 header measurement gains the header box and the 70% bound), J2 (the five buttons in order with the labels), J4, the face statechart rows and pair rows, and the paired engine states case if it names a label.
   - Grep `/home/user/veneer/tests` and `/home/user/veneer/app` for each old label and for `on Veneer CSS` after the edit; report zero hits outside prose the brief keeps (the Tailwind section captions).
   - List every amended or added case by file and title in the report.
8. **The P4-style chrome reading.** Copy `/home/user/veneer/tmp/units/flip-showcase/p4.ts` and its modules into the folder /home/user/veneer/tmp/units/flip-header (it does not exist yet) and adapt the copy: after `npm run build:app:browser`, read the chrome under each face at 1280 and 390 and report zero Bootstrap-only departures in the chrome between faces (no box or longhand of a chrome element differs between `bootstrap`, `unexcluded`, and `tailwindcss`), plus the header box and the five button boxes at 390. Run it twice and `cmp` the outputs: byte-identical, with no timestamp or duration in the file. Exit nonzero when an expectation fails.
9. **Copy and guide.** Write no guide prose and no copy-document edit. Report the strings U7b needs for `/home/user/veneer/guides/veneer.md` § Showcase, § Faces, and the journey prose, and for the copy document § 1 and § 5: the three labels, the status example, the brand line, the header description at 390 and at 768 and wider.
10. **The showcase build.** After every other gate is green, run `npm run build:showcase` and report `sha256sum showcase/browser.html` before and after and its `build-id` line. Commit nothing.

## Unknowns

- Whether `readPerception('Showcase state')` reads a `visually-hidden` status as it reads a visible one (it should, because the element stays rendered and named); a difference is a stop.
- Whether the bar fits on one row at 768 px with the short labels.
- Whether J2's tab order changes when the brand line and the groups share a row (it must not: skip link, the five buttons, then contents).
- Whether the scroll padding moves the J6 or statechart readings that scroll the page; report any reading that moves.

## Scope

- **Owned.**
  - `/home/user/veneer/app/browser/**` for the header, its constants, labels, factory, `Showcase`, `describeState`'s TSDoc, and the three `<strong>` lead-ins of the Tailwind section introduction. `/home/user/veneer/app/browser/recipe.json` stays unchanged.
  - `/home/user/veneer/tests/app/browser/**` for the header cases and the added cases.
  - The showcase section of `/home/user/veneer/tests/setupBrowser.ts` and its describes in `/home/user/veneer/tests/setupBrowser.test.ts` (labels, the header reading, the face rows).
  - `/home/user/veneer/tests/app/browser/integration.test.ts` (J1, J2, J4, the face and pair rows, the header reading).
  - everything under /home/user/veneer/tmp/units/flip-header (create it).
  - `/home/user/veneer/showcase/browser.html`, through `npm run build:showcase` only.
- **Off-limits.**
  - The engine section of `/home/user/veneer/tests/setupBrowser.ts`, `/home/user/veneer/src/**`, the sheets, the records (`/home/user/veneer/app/browser/recipe.json`), `/home/user/veneer/guides/**`, `/home/user/veneer/tests/integration.test.ts`, `/home/user/veneer/tests/conformance.test.ts`, `/home/user/veneer/package.json`, the lockfile, `/home/user/veneer/vite.config.ts`, `/home/user/veneer/configs/`, `/home/user/veneer/tmp/probes/`, `/home/user/veneer/tmp/units/flip-showcase/` (read only), `/home/user/veneer/tmp/units/flip-falsify/`.
  - Forbidden operations: npm install, commit, push, any credential, `git stash`, `git add`, `git reset`, `git checkout`, or any destructive command; a tree-wide mutating gate (`npm run lint`, `npm run format`). Format only owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`, and say which. The bootstrap digest `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` stays unchanged.
- **Tools and limits.** `node`; the `npm run` scripts named here; `npx vitest run --config vite.config.ts --project <project> <file> -t "<title>"`; `npx oxfmt` on owned files; `sha256sum`; `cmp`; `grep`; `git status --porcelain`; `git diff`; `git show HEAD:<path>`.

## Execution

Do the assignment yourself and spawn nothing. Order:

1. The re-reads and the baseline.
2. Labels, brand line, status, and the header classes, with the `constants`, `factories`, `helpers`, and `Showcase` cases.
3. The scroll padding and the sticky contents offset in `Showcase`, with their cases, then the chrome neutrality case.
4. `/home/user/veneer/tests/setupBrowser.ts` showcase section and its describes, then `/home/user/veneer/tests/app/browser/integration.test.ts`.
5. `npm run build:app:browser`, then the P4-style reading, twice.
6. The gates, then `npm run build:showcase`.

Fix every failure in owned files before you report.

## Output

Write the final message through the last-message file, with no process diary:

1. Lead with the findings:
   - the header box height at 390 × 844 and at 1280 × 800, and the share of the viewport height left for content;
   - the five buttons' boxes at 390 and the group boxes, with `buttonsWrap` and `overflow`;
   - the scroll-margin mechanism chosen and its reading (the target heading's top and the header's bottom after a contents click, at both widths), and the sticky contents copy's top against the header's bottom at 1280;
   - the chrome neutrality reading per face and width, and the P4-style result with the `cmp` result;
   - the case list per test file, each marked kept, amended (how), deleted (why), or added;
   - the new strings for the guide and the copy document (item 9);
   - each gate's exit code.
2. Paths: every edited file and the files under the folder /home/user/veneer/tmp/units/flip-header (it does not exist yet).
3. `sha256sum showcase/browser.html` before and after, and its `build-id` line.
4. Every `npm run test:journey` failing title, each ruled against § Host-bound set of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` (in the set, or new).
5. Anything not run, with the exact error or skip line.
6. The final `git status --porcelain`, with the falsify lane's entries listed as not yours.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when any of these happens:

- A sandbox write is rejected. Never try another write mechanism.
- A header class reads differently between faces and no face-neutral registry class replaces it.
- The header at 390 × 844 exceeds 30% of the viewport height, or a header button's text wraps, with the classes this brief pins.
- The contrast case fails under `btn-sm` or `bg-body`.
- The scroll margin cannot be carried without a class outside the registry, or without breaking the destroy restoration case.
- `readPerception` reads the visually hidden status differently from the visible one.
- A journey failure outside the host-bound set appears.
- The bootstrap digest `7932f7a5…` changes, or `/home/user/veneer/app/browser/recipe.json` must change.
- A file outside Owned must change, including the engine section of `/home/user/veneer/tests/setupBrowser.ts`.

Settle ancillary choices yourself and record them: added test titles (in the § 8 shape), the small heading size class, the exact flex classes of the brand line, helper names in the P4 copy.

## Acceptance criteria

Run each bare, in order, from `/home/user/veneer`, and report each exit:

1. `npm run check`
2. `npm run lint:check`
3. `npm run format:check`
4. `npm run test:app:browser`
5. `npm run test:setup:browser`
6. `npm run build`
7. `npm run build:showcase`; report `sha256sum showcase/browser.html`.
8. `npm run test:journey`; list every failing title and rule each against § Host-bound set of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md`. None may be new.
9. `git diff --check`
10. `sha256sum dist/src/bootstrap/index.css` equals `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.

Also: `node tmp/units/flip-header/p4.ts` twice after `npm run build:app:browser`, each exit 0, and `cmp` of the two outputs exit 0.

## Review evidence

The actual diff, the header and button boxes, the scroll reading, the chrome neutrality reading, the P4-style output, the case table, the `/home/user/veneer/showcase/browser.html` digest, and `git status --porcelain`.

## Rulings appended before launch

The driver sets these defaults from the evidence; the Orchestrator confirms or replaces each before launch.

- **Launch order.** This unit launches after the falsify analyst lane finishes reading the page.
- **Padding.** R12 named `py-2 px-3`; `px-3` departs under the `tailwindcss` face (1rem against 0.75rem), so the bar keeps `container-xxl` for its gutter and takes `py-2` only.
- **Version string.** No constant holds it; the literal `Bootstrap 5.3.8 on Veneer CSS` in `createShell` becomes `Bootstrap 5.3.8`, kept a literal.
- **Scroll margin.** The contents navigation has no scrollspy, so the scrollspy offset does not apply; the default is the `ResizeObserver` on the header in `Showcase` writing `scroll-padding-top` on the root and the sticky contents copy's `top`.
- **Introduction lead-ins.** The three `<strong>` face names in the Tailwind section introduction follow the button labels; the captions keep `Bootstrap only` as prose.
- **Icon.** The `box-seam` icon stays before `Veneer`.
- **Cap.** 5400 s.

## Orchestrator confirmation before launch

The eight defaults stand as written: `py-2` with the `container-xxl` gutter and spacing steps of 0, 1, or 2 (a planted `px-3` as the neutrality control); the version literal shortened to `Bootstrap 5.3.8` outside the `h1`'s accessible name; the `ResizeObserver` that writes `scroll-padding-top` on the root and the contents column's `top`, disconnected and restored on `destroy`; only the three `<strong>` lead-ins of the Tailwind section take the new labels; the status stays a polite live region named `Showcase state`, visually hidden; `bg-body` with the contrast case passing; the icon kept; the `FACE_SCENARIOS` names follow the new labels. The sandbox is `danger-full-access`, as every Chromium-reading lane of this flip. The unit launches after the falsify analyst lane finishes; its entries under `tmp/units/flip-falsify/` are not yours.
