# Unit redesign-U3 — journey rewiring for the Contents drawer

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI. You are the sole writer in the checkout `/home/user/.wave/veneer-redesign` (a detached veneer worktree carrying units U1 and U2 on top of `9fb2be1`; `node_modules` and `dist` in place). Owned files: `tests/setupBrowser.ts` (the showcase section only: the showcase and journey helpers, the statecharts, scenarios, and `collect*`/`read*` readings; never the oracle harness), `tests/setupBrowser.test.ts` (the showcase describe blocks only), `tests/app/browser/integration.test.ts`, and `tests/app/browser/Showcase.test.ts`. Nothing under `app/`, nothing in `tests/app/browser/factories.test.ts`, nothing under `src/`, nothing under `/home/user/veneer`. Commit nothing.

## Objective

Rulings 2, 3, and 9 and § 4 of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/redesign-2026-10-06/design-verdict.md` (read it whole first): the Contents index is an overlay drawer under the `lg` breakpoint, opened from the header's `Contents` disclosure (`details > summary`, `aria-controls="contents-panel"`) and folded with Bootstrap's `showing`, `show`, and `hiding` classes; from `lg` it is the sticky sidebar. Unit U2 landed the shell and the drawer in `app/browser/factories.ts` and `app/browser/Showcase.ts` (read both and `git -C WT log -2 --stat`); unit U1 landed `z-0` on the isolated card bodies. The journeys, the showcase proofs, and the setup helpers read the folded index today and fail under `lg`; this unit routes every Contents read through one seam, proves the drawer, and keeps every other row, line, and Journal entry byte-equal to the baseline.

## From U2

U2 landed at `d195bcf` and U1 at `28ef330` in this worktree (read `git -C WT show d195bcf --stat` and the diff). Its scratch readings, from run `redesign-u2-probe-4` at 390 × 844 under the Bootstrap face, are this unit's inputs:

- **Arrival:** the panel reads `position: fixed`, `visibility: hidden`, `transform: matrix(1,0,0,1,-390,0)`, `transition-duration: 0.3s`, top 116 px = header bottom.
- **Opening** (`clickDisclosure('Contents')`): the panel carries `showing` at once and reads `visible`; settled, it carries `show` only, `visible`, `transform: none`; the summary is focused, `readStates` returns `['expanded']`, and its class list reads `btn btn-sm btn-outline-secondary active`. Tab from the summary lands on the `Containers` link.
- **Escape:** the panel carries `show hiding` and stays `visible` through the slide; settled, it reads `hidden` with no transition class; the summary is focused, `collapsed`, with `text-body-emphasis` restored.
- **Link pick** (`Accordion`): `show hiding` at once, then `hidden` settled; `location.hash` reads `#accordion`; `document.activeElement` is `body` after the pick; **the next Tab lands on `button.accordion-button` "Shipping and delivery" inside `section#accordion`**. The drawer case asserts that landing (the first focusable inside the picked section).
- **Other routes:** `focusout` to `main` folds; a `blur()` with a null `relatedTarget` keeps it open; a trusted click on the header `h1` folds; under reduced motion (`stageMedia({ motion: false })`) the duration reads `0s` and each step settles in the same task.
- **Resize to 1280 × 800 with the drawer open:** the disclosure closes with no `show`, `showing`, or `hiding` left; the panel reads `position: sticky`, top 48 = header bottom, bottom 800 = `innerHeight`; no summary renders.
- **Settle mechanism:** `Showcase` completes a step when no `transform` CSS transition runs on the panel (`getAnimations()`), so a `waitForCondition` on the class and visibility predicates in the seam is the right wait; never a fixed sleep.
- **Inline styles at rest:** only `div#contents-panel` inside `body` carries a `style` attribute (`top`, `max-height`); the root keeps `scroll-padding-top`.
- **768 × 1024:** the header reads 48 px under every face with the disclosure on the row; the version span carries `d-md-none d-lg-inline` and does not render at 768.
- **Header neutrality (ruled):** `keeps the compact sticky header neutral under every face at narrow and wide viewports` is red at 390 under the `tailwindcss` face with one unexplained departure, `{"element":"15 details in #","property":"margin-inline-start"/"margin-left","before":"173.828px","after":"189.031px"}`: the disclosure's `ms-auto` margin takes the row's free space, which follows the sibling widths the case already attributes to the face. Extend the case's attribution with one category, `auto-margin`, for a `margin-left` or `margin-inline-start` departure on an element that declares the registry name `ms-auto` (match the declared class; the computed value is the used pixel margin), appended to that case's exclusion list, with a control: the same departure on an element without `ms-auto` stays unattributed and fails. Keep `ms-auto`.

## Seam (`tests/setupBrowser.ts`)

Add, beside `collectContrastSubjects`, two exported helpers with TSDoc per `/home/user/scaffold/.claude/rules/typescript.md`:

- `openContents(): Promise<void>` does nothing when no `Contents` summary is rendered (from `lg`) or when its `details` is open. Otherwise it calls `clickDisclosure('Contents')` (from `@orkestrel/test`) and waits, under `COMPONENT_WAIT`, until the panel `#contents-panel` reads `visibility: visible`, carries `show`, and carries neither `showing` nor `hiding`.
- `clickContents(name: string): Promise<void>` awaits `openContents()`, calls `clickAccessibleWithin('Contents', 'link', name)`, and, under `lg`, waits under `COMPONENT_WAIT` until the panel reads `visibility: hidden` and carries none of `show`, `showing`, or `hiding`; from `lg` it waits for nothing more.

Route the seven Contents click sites through `clickContents` (`arrangeAlertVisibility`, `arrangeAccordionSelection`, `arrangeTooltipVisibility`, `actOnTipControl`, `actOnToastControl`, `actOnOverlayControl`, `revealScrollspy`; grep `clickAccessibleWithin(` with `'Contents'` on the same or the next line). No `COMPONENT_TABLES` row changes.

## Journeys (`tests/app/browser/integration.test.ts`)

- `STATES` gains `'contents-drawer'` after `'contents-index'` (77 states; the portfolio case derives its counts from `STATES`).
- J1, at 390 before the Contents readings: the summary is rendered, `readRole` reads `button`, `readName` reads `Contents`, `readStates` contains `collapsed`, `resolveRendered('link', 'Containers')` throws; then `await openContents()`, `JOURNAL.record('open', 'Contents', 'expanded')`, and the existing reads run (the uppercase group labels, exactly one rendered nav). At 1280 no summary is rendered. In every variant J1 places `contents-drawer` on `#contents-panel` after the open step and `contents-index` as today. The `390 header` reading stays byte-equal.
- J2, at 390: insert `['button', 'Contents']` between `Dark` and `Containers`; on reaching it read `collapsed`, press `{Enter}`, wait for the drawer to settle open (reuse the predicate of `openContents`, not a sleep), read `expanded`, `JOURNAL.record('press', 'Enter on Contents', 'expanded')`, then `{Tab}` reaches `Containers`. After the walk at 390, press `{Escape}`, wait for the fold to settle, read the summary focused and `collapsed`, and record it. The 1280 path and the Shift+Tab counts stay.
- J3: `await openContents()` before each `resolveRendered('link', section.title)` read, `clickContents(section.title)` in place of `clickAccessible('link', ...)`; at 390 read the drawer folded after each click (the helper waits for it). The heading landing, the scrollers, and the captures stay.
- The variant case: `await openContents()` after `applyFace('tailwindcss')` and before `collectContrastSubjects()`.

## Showcase proofs (`tests/app/browser/Showcase.test.ts`)

- `reads every header button at 4.5:1 or more, pressed or not, in both color modes`: the suite's default viewport is 414 px, under `lg`; call `await openContents()` after each face click and before `collectContrastSubjects()`, and add the summary's ratio at 4.5 or more, `collapsed` and `expanded`, in both color modes.
- `lands first and deep contents headings below the sticky header after a viewport resize`: `clickAccessible('link', name)` becomes `clickContents(name)`; at 390 read the summary `collapsed` after each landing; the 1280 sticky assertions stay.
- `keeps the compact sticky header neutral under every face at narrow and wide viewports`: no code edit; report its `Header height` log at 390, 768, and 1280 per face.
- Add the case titled exactly `folds the contents into a drawer under the lg breakpoint and opens it from the Contents disclosure`. At 390 × 844 under the Bootstrap face: arrival reads the summary rendered and `collapsed`, the panel `position: fixed` and `visibility: hidden`, and `resolveRendered('link', 'Containers')` throwing; `clickDisclosure('Contents')` reads `expanded`, the panel `visible` with `transform: none` after settling, one rendered nav whose 72 links are each rendered and reachable, `countDialogs()` 0 and `collectOverlays()` empty while open; `{Tab}` from the summary reaches `Containers` and `{Shift>}{Tab}{/Shift}` returns to the summary with the drawer still open; `{Escape}` folds it (hidden after settling) and focuses the summary; open again and a click on the `Veneer` heading folds it; open again, Tab to `Containers`, then Shift+Tab twice to `Dark` folds it (the `focusout` route); open again and a click on the `Accordion` link folds it, `location.hash` reads `#accordion`, the Accordion heading settles under the header, and the next `{Tab}` lands where U2 read it (§ From U2); with the drawer open over the Tooltips section and then over the Popovers section (scroll the document there first), every Contents link hit-tests to itself or a descendant (`document.elementFromPoint` at its center); a resize to 1280 × 800 with the drawer open reads the panel `position: sticky` with none of `show`, `showing`, or `hiding`, and no summary rendered; at 1280 a planted `open` attribute on the `details` renders no second nav and writes no inline style (the control). Restore the viewport in `finally`.

## Setup proofs (`tests/setupBrowser.test.ts`)

- The population reading (`collects the Bootstrap groups up to the Tailwind group and the contrast subjects`): `await openContents()` before `collectContrastSubjects()`; the pre-mount `toThrow` stays.
- Add a case for the seam: at the 414 px default a first `openContents()` opens (summary `expanded`, the nav rendered), a second does nothing (no toggle, still `expanded`); `clickContents('Accordion')` lands `#accordion` and settles folded; the written control: `clickAccessibleWithin('Contents', 'link', 'Accordion')` with the drawer folded throws; at 1280 × 800 `openContents()` does nothing and throws nothing.

## Gates

`WT` is `/home/user/.wave/veneer-redesign`; `RUNS` is `/home/user/veneer/tmp/units/journey-cost/runs`. Direct: `WT/node_modules/.bin/oxfmt --config WT/.oxfmtrc.json --check` and `WT/node_modules/.bin/oxlint --config WT/.oxlintrc.json --deny-warnings` on the four owned files; `git -C WT diff --check`; `git -C WT status --porcelain` lists exactly the four files. Through the host queue, a fresh folder each (`flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder RUNS/redesign-u3-NAME --kind command --cwd WT -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`):

1. typecheck `WT/node_modules/.bin/tsc --noEmit --project WT/tsconfig.json`;
2. `setup:browser` (`WT/node_modules/.bin/vitest run --config WT/vite.config.ts --configLoader runner --no-cache --reporter=dot --project setup:browser`), every case green;
3. `app:browser` (same form, `--project app:browser`), every case green;
4. the full journey, `--kind journey`, with `CAPTURE=0` in the env and `WT/node_modules/.bin/vitest run --config WT/configs/app/vite.journey.config.ts --no-cache --reporter=dot --reporter=json --outputFile=RUNS/redesign-u3-journey-1/report.json` (the folder name in `--folder` and in `--outputFile` agree), all four variants green; the journey host-bound set is empty, so any failure is yours;
5. the compare, direct: `node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline RUNS/task75-u3-journey-1 --baseline RUNS/task75-u3-journey-2 --baseline RUNS/landing-7853d17-2-journey --candidate RUNS/redesign-u3-journey-1 --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.md --registration 94/0 --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json --out RUNS/redesign-u3-journey-1/compare.md`. It exits 67 by design. Classify every line under `## Differences` against verdict § 6's predicted set and list any line outside it; an outside line is a defect of this unit unless you show, with evidence, that U1 or U2 caused it.

Never `cd`; never run vitest outside the queue; a reused folder exits 65; one re-run for a Vite optimizer import failure before any test body.

## Output

Final message: the diff; the `Header height` readings; the Tab landing after a pick as the case reads it; the compare's difference lines, each classified as predicted or outside; `git status --porcelain`; each gate's command, folder, exit, and bare result; every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
