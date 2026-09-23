# Unit CAROUSEL (`ca`) — the `carousel` key ships at rest

## Role and engine

`opus` on Opus 5.5 (the alias serves `claude-opus-5`), reached as a native Claude subagent in the worktree `/home/user/veneer-ca` (branch `unit/ca` from `c3ac297`). The executor that opens this brief is that subagent.

## Objective

The `carousel` key ships in `src/styles/components/_carousel.scss` exactly as the pinned inventory records it (the recorded control-icon data URIs less the `/*rtl:*/` comment, D5; `--bs-carousel-control-icon-filter` carrying the dark inversion; `.carousel-dark` reading `tokens.$dark` on the class; every transition through the `transition` mixin; `mask-image` refused, M8), a `Carousel` region rendering the captioned, fading, dark, and advancing carousels at rest with slides that are `img.img-fluid` over inline SVG documents, the mirrored browser proof, the ledger rows, and the guide section, with every shared-file change returned as an exact patch.

## Context

**Evidence.** The oracle surface for `carousel` is terrain § A (its selectors, properties, conditions, and the theme-scope triple that stays under `theme`, M8 and the B-CROSS verdict X1); the plugin obligation and the `Swipe` utility are terrain § B (Carousel); the dark-retune precedent on a class is `src/styles/components/_close.scss` (`.btn-close-white` and the filter) and the dark island reading is `tokens.$dark` on the component's rules (disclosure R3); the retained-variables and outside-ledger sentences the unit rewrites are `### Bootstrap variables Veneer retains` and the carousel sentence in `### Outside the ledger` in `guides/veneer.md` (M8: state which declarations the `carousel` key measures and drop "no shipped component claims them"). Read each before you edit and take every line number yourself.

**Law.** `AGENTS.md`; `.claude/rules/{styles,tests,browser,names,documentation,writing,architecture,typescript}.md`; the skill: none (the `enterprise-bootstrap` skill is reference craft, not process); the guide `guides/veneer.md` (§ Styles, § Compatibility, § Deferred selectors, § Departures, § Additions, § Showcase, § Tests); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (its rulings M1 to M20 and § Family record bind this unit); the terrain record `/home/user/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md` (§ A the oracle surface per key, § B the plugin obligations, § C Elements and Mailbox, § D what the tree carries, § E the rulings already landed, § F sizing, § G the files the family makes false). Where the terrain and the tree disagree, the tree wins and the unit reports the disagreement.

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/core/index.d.cts` and `dist/src/browser/index.d.cts`: `readStyle`, `readPixels`, `readHit`, `matchesColor`, `stageMedia`, `visitBreakpoint`, `waitForAnimations`, the recorders) and `@orkestrel/contract` (guards); the tree's own readers in `tests/setupStyles.ts` and `tests/setupBrowser.ts`. A helper, wait, or reader whose job an installed export does is a defect; the audit's checker probes the diff for export names.

**Host.** Linux, `bash`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` (the host npm is 10.9.7 and the manifest refuses it); Chromium 141 at `/opt/pw-browsers/chromium-1194` for the browser proofs; no sandbox; no network needed. Foreground commands longer than 10 minutes are the Orchestrator's.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored; never edit them. The shared files stay report-only: the worktree's gates that need a shared file (`check`, the section proof, the built cascade) are read on a validation copy the unit builds under `tmp/probe/base/` (`git archive <BASE> | tar -x -C tmp/probe/base`, `cp -al node_modules tmp/probe/base/node_modules`, the owned files copied over it, the patch applied), and the report records them as the copy's readings; delete `tmp/probe/` before the report. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are forbidden. Sibling units run in their own worktrees; their files are off-limits.

**Measurements.** Taken by the staging script at `c3ac297` (`npm ci --ignore-scripts` and `npm run build:src` exit 0, `tmp/units/ca-stage.log.txt`); the unit runs `npm run test:conformance` and the close proof `tests/src/styles/components/close.test.ts` first and records their exits as the baseline.

## Unknowns

- Whether an inline `img` leaves a baseline gap under a slide: read the gap and report it; do not patch it with a utility (B-UTILITIES has not shipped the display utilities).
- Whether a Tailwind utility shares a name with a carousel class: run the shared-name reading over the class names you ship and report; M17 makes `test:service` an observation unless a shared name appears.

## Scope

**Owned.** `src/styles/components/_carousel.scss`, `tests/src/styles/components/carousel.test.ts`, `app/browser/sections/CarouselSection.ts`, `tests/app/browser/sections/CarouselSection.test.ts`.

**Shared (report-only; return an exact patch against `c3ac297`).** `src/styles/index.scss` (`@use 'components/carousel'` between `popover` and `spinner` — with no `popover` line yet, directly before `spinner`, M19; the order case's stem map and expected list in `tests/conformance.test.ts` follow); `tests/setupStyles.ts` and `tests/setupStyles.test.ts` (the carousel case tables bound to the inventory); `tests/setup.ts` (the `CaptureSubject` members, the resting `CASCADE_KEYS` rows, and the driven rows `carousel-control-hover` and `carousel-control-focus` appended); `tests/app/browser/integration.test.ts` (the driven frames), `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`; `tests/conformance.test.ts` (`'carousel'` in `listed`, the order case); `tests/setupServer.test.ts` (the component set); `app/browser/constants.ts` (`CAROUSEL_COPY`, `CAROUSEL_SPECIMENS`), `app/browser/Showcase.ts`, `app/browser/index.ts` (the section after the disclosure regions and before the first utility region, M14); `guides/veneer.md` (the `_carousel.scss` § Files row; `### Carousel classes` in the barrel's position, with one sentence that the engine reads `slide` and no Veneer rule does, M12, and one sentence on the declined frames, M2; the `carousel` selector and variable rows; the Carousel `plugin` row in the R8 shape naming the `Swipe` utility and ending "Owner: J-ENGINE."; the two M8 rewrites; the `#### carousel` departure rows and any addition row exactly as the gate measures them; the § Showcase and § Tests links); `ROADMAP.md` (nothing).

**Off-limits.** Every other unit's owned files (ALERT: `_alert.scss`, `alert.test.ts`, `AlertSection.ts`, `AlertSection.test.ts`; CONDITIONS: `tests/setupServer.ts`; the disclosure and utilities units' files), `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`, `tests/setupServer.ts`, `tests/fixtures/**` (except the Tailwind fixtures if a shared name appears, reported first), `app/browser/styles/**`, `src/styles/_tokens.scss`, `src/styles/_theme.scss`, `src/styles/_mixins.scss`, every other partial, `configs/**`, `package.json`, `package-lock.json`, `README.md`, the vendored files.

**What asserts the state this change ends.** The `BOOTSTRAP_ROOT_VARIABLES` and `BOOTSTRAP_DARK_VARIABLES` lists in `tests/setupStyles.ts` (they list the release's names and stay true; read them); the `listed` literal and the order case (Shared); the showcase enumerations (Shared); `tests/guides.test.ts` (through the patch at integration). Search bound: grep `'pagination'` across `tests/`, `app/`, and `src/` and re-derive the set at `c3ac297`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; no tree-wide `format` or lint `--fix`; `npm run build:src` and `npm run build:src:styles` are permitted in the validation copy; scoped runs only; a runtime probe lives under `tmp/probe/` and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report file `/home/user/veneer-ca/tmp/units/ca-report.md`: the touched files, the ledger rows the gate measured, the resting rows and subjects, the R19 proof matrix (each recorded selector and condition mapped to its case, its distinguishing mutation, its specimen, and its scenario), the failing-first and mutation record with commands, each gate's command and result line on the validation copy, the shared-name reading, the guide text, and the exact shared patch (a unified diff against `c3ac297`, also written to `tmp/units/ca-shared.patch`). The report states no count of a growable set and uses no banned term. Delivered as that file plus the same text as the final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — per `.agents/orchestration.md` § Deviation protocol when a recorded selector cannot be rendered without an inline style or an unshipped class, when a mutation the criteria name cannot be distinguished by any assertion, or when the ledger gate throws a claim collision. Decide, record, and carry on for the specimen copy, the case names, where the guide section's paragraphs sit, the exact `:has()` qualifiers of capture rows, and the position of new rows at the end of their tables.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the validation copy: `npm run check` exits 0; `npm run build:src` exits 0 and the built cascade carries every `carousel` selector the inventory records with its declarations and conditions, the control icons as the recorded data URIs (compared through `normalizeDeclarationValue`, the trailing space the release leaves trimmed), and no other rule naming those classes (the report lists them against the inventory).
3. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/carousel.test.ts` exits 0 on the validation copy, and each case distinguishes its named mutation: at rest only `.active`, `-next`, and `-prev` display (mutation: `.carousel-item` written `display: block`); in an `.active.carousel-item-start` plus `.carousel-item-next.carousel-item-start` pair the active item reads `translateX(-100%)` and the next item `none`, mirrored for `-prev`/`-end` (mutation: a `:not(.carousel-item-start)` guard dropped, giving the next item `translateX(100%)`); under `.carousel-fade` the active item reads opacity `1` and `z-index` `1` with `transform: none` and the others `0`, with the `opacity 0s 0.6s` delay (mutation: the delay dropped); the item, control, and indicator transitions read `none` under `stageMedia(REDUCED_MOTION)` (mutation: a bare `transition` in place of the mixin); the control geometry, its opacity moving from `0.5` to `0.9` on hover and focus, and its filter reading the variable (mutation: a literal filter); the prev icon is the left chevron (mutation: the icons swapped); the indicator's content box with transparent borders and `.active` at opacity `1` (mutation: `box-sizing: border-box`); the caption insets and colour variable (mutation: a literal white); `.carousel-dark` and a dark island each retune the three variables and a light island inside a dark one restores them (mutation: `.carousel-dark` omitting one); `.pointer-event` reads `touch-action: pan-y` (mutation: the rule dropped); under `stageMedia({ forced: true })` a focused control reads opacity `0.9` (M16).
4. The section proof exits 0 on the validation copy under the config the sibling section proofs use, asserting the region contract, no `[style]`, the four specimens (`Captioned carousel` with indicators carrying `data-bs-target` and `aria-current`, controls named by `aria-label`, and captions; `Fading carousel`; `Dark carousel` over light pictures; `Advancing carousel` with the incoming slide painting), and no specimen writing `slide` (M12).
5. `npm run test:conformance` exits 0 on the validation copy with `carousel` in `listed` and the presence, ledger, deferral, and priority gates green; `npm run test:guides` and `npm run test:policy` exit 0 there.
6. The report carries each item of § Output (the declined frames recorded per M2: a lone `carousel-item-next` and `pointer-event` render no frame), and the patch passes `git apply --check` on the validation copy.

## Review evidence

`git -C /home/user/veneer-ca diff c3ac297` (with the new files rendered through `git diff --no-index /dev/null <file>`) and `git -C /home/user/veneer-ca status --porcelain` at hand-back (`ca.diff`, `ca-status.txt`), the patch `ca-shared.patch`, and the report.
