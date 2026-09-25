# Unit J-CASCADE — the fade engines' proofs run on the shipped cascade and follow the motion tokens

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree.

## Objective

Every fade engine outside the overlays (Alert, Tab, Toast, Tooltip, and Popover) proves its completed events against the shipped `_tokens.scss` and `_fade.scss`, and shows that those events follow `--vn-factor-motion`. One trusted touch drag proves the carousel swipe on the shipped carousel cascade.

## Context

**Evidence.** The carried row in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md` § Carried findings (the row naming the Alert, Tab, Toast, Tooltip, and Delegate proofs) came from the J-TENETS audit (`units/j-tenets-rendered-report.md` and `units/j-tenets-identity-report.md`). The Orchestrator read these facts at Veneer `main` `6d27028`:
- The tests carrying a stand-in `.fade` string: `git grep -l '\.fade' main -- tests/src/browser` returns `Alert`, `Delegate`, `Modal`, `Offcanvas`, `Tab`, `Toast`, and `Tooltip`. The comments beside the Alert, Tab, Toast, and Tooltip strings say the shipped cascade has no fade. That is false: `src/styles/components/_fade.scss` ships `.fade` with `@include transition(opacity var(--vn-motion-feedback) linear)`.
- The tokens: `src/styles/_tokens.scss` declares `--vn-factor-motion: 1`, `--vn-motion-feedback: calc(150ms * var(--vn-factor-motion))`, and `--vn-motion-panel: calc(250ms * var(--vn-factor-motion))`. Among the engine families' sheets, only `_fade.scss` and the carousel controls' opacity in `_carousel.scss` read a motion token. Collapse, modal, offcanvas, and the carousel slide use literal durations, which the styles session owns (E26).
- The `transition` mixin in `src/styles/_mixins.scss` sets `transition: none` under reduced motion.
- The pattern for loading a shipped sheet: `tests/src/browser/Offcanvas.test.ts` imports `_tokens.scss?inline`, `_fade.scss?inline`, and `_offcanvas.scss?inline`, and a case loads each with `scene.load(sheet)` from `tests/setupBrowser.ts`. Copy the imports and the `scene.load` calls. Offcanvas's file is not yours.
- The component sheets exist: `_alert.scss`, `_nav.scss`, `_toast.scss`, `_tooltip.scss`, `_popover.scss`, and `_carousel.scss` under `src/styles/components/`.
- Trusted touch already runs in this tree: `tests/src/browser/Carousel.test.ts` enables `Emulation.setTouchEmulationEnabled` and sends `Input.dispatchTouchEvent` `touchStart` and `touchEnd` through `sendProtocol` from `@orkestrel/test/browser`. A drag adds `touchMove` points between them. Every swipe proof so far dispatches synthetic pointer events.
- Popover's default is `animated: true`, and every Popover case constructs it with `animated: false`.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/browser.md`, `.claude/rules/typescript.md`, `.claude/rules/names.md`, and `.claude/rules/quality.md`, all under `C:/Users/mikes/WebstormProjects/scaffold/`. The decisions `engine/decisions.md` § E5, E11, E13, E24, E25, and E26. Skill: none. Guide: `guides/veneer.md` § Engine in the Veneer tree.

**Installed primitives.** `@orkestrel/test` (its `browser` entry: `sendProtocol`, `createPointerEvent`, `pressKeys`, `hoverAccessible`, and the rest; read `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` first) and `@orkestrel/contract`. A helper, wait, or recorder that duplicates an installed export or a `tests/setupBrowser.ts` export is a defect.

**Host.** Windows 11 with Git Bash. The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/cascade` on branch `unit/cascade`, cut from Veneer `main` at `6dd5034` (J-SNAPSHOT-SHARED's landing). The browser is Chromium 153 through the Vitest browser project `src:browser`. A foreground shell call is capped at 10 minutes. The approval classifier blocks heredocs, `python -`, `node -e`, and `&&` chains that carry a program, so write each program to a file under `tmp/j-cascade/` and run the file. The network is available and needed for nothing.

**Measurements.** Take these before any edit and put them in the report: the scoped run `npm run test:src:browser -- tests/src/browser/Alert.test.ts tests/src/browser/Tab.test.ts tests/src/browser/Toast.test.ts tests/src/browser/Tooltip.test.ts tests/src/browser/Popover.test.ts tests/src/browser/Carousel.test.ts` at the base, and each stand-in string with the cases that load it, located by symbol.

**Control identifiers.** C1 is the shipped cascade. C2 is the motion factor. C3 is the trusted swipe. Name each test for what it proves, never for these labels.

**Standing conditions.** The J-SAMEWAY unit writes in another worktree and owns `Modal`, `Offcanvas`, `Backdrop`, `Delegate`, and `tests/setupBrowser.ts`. The styles session writes `src/styles/**`. A whole-suite browser run on this host can miss a timing deadline under load; re-run a timing failure alone once and report both readings.

## Unknowns

- Whether a trusted `touchMove` drag reaches the carousel's `Swipe` as a pointer drag under `touch-action: pan-y` on Chromium 153. Report the reading. If the platform cancels the pointer, report the `pointercancel` reading and stop on C3, because that is a finding rather than a failure.
- Whether Popover's animated path and each fade engine's completed event hold on the shipped cascade. A red reading is a defect: fix it in the owned source under E5's red-first rule, or stop if the fix needs `types.ts`.

## Scope

**Owned.**
- `tests/src/browser/Alert.test.ts`, `Tab.test.ts`, `Toast.test.ts`, `Tooltip.test.ts`, `Popover.test.ts`, and `Carousel.test.ts`.
- On a red proof only: `src/browser/Alert.ts`, `Tab.ts`, `Toast.ts`, `Tooltip.ts`, `Popover.ts`, `Carousel.ts`, `Swipe.ts`, and `helpers.ts`, with `tests/src/browser/Swipe.test.ts` and `helpers.test.ts`. When a source mechanism changes, you also own the sentence in `guides/veneer.md` § Engine that states it, and nothing else in the guide.
- Your probe and instrument home, `tmp/j-cascade/`.

**Shared (report-only).** None.

**Off-limits.** `src/browser/Modal.ts`, `Offcanvas.ts`, `Backdrop.ts`, and `Delegate.ts`, with their tests (J-SAMEWAY). `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`. `src/browser/types.ts`. `src/styles/**`. Every other guide passage. The vendored files: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.**
- The four false comments and their stand-in strings are removed.
- A case in the owned files asserting `transitionDuration` of `0s` on a sheet the unit now loads with `_fade.scss` becomes false. Re-derive these by running the scoped files.
- The Delegate stand-in and the Modal and Offcanvas motion-factor cases are carried to J-OVERLAYS, which runs after J-SAMEWAY lands.

**Tools and limits.** Read, Grep, Glob, Edit, Write, and Bash. Commit nothing. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Install nothing. Format only your owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`, never prettier.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message is the report. It holds:
- the files touched;
- the base measurements;
- for each obligation (C1, C2, C3), the cases with their red and green readings verbatim, or the reason a case was green from the start;
- the mutation table copied from the instrument's log;
- the instrument's refusal rule;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — when:
- an obligation needs an off-limits file or a `types.ts` change;
- a trusted drag cannot reach the swipe;
- a shipped-cascade proof reads red for a reason owned by the cascade rather than the engine.

Settle these yourself and record each choice in the report: the order of cases, the case titles, whether a motion-factor case sets the factor on the host or the root, and how to read the running transition.

## Acceptance criteria

1. `npm run check:src:browser`, `npm run lint:check`, and `npm run format:check` exit 0.
2. **C1, the shipped cascade.** Every Alert, Tab, Toast, and Tooltip case that waits on a fade loads `_tokens.scss` and `_fade.scss` with the component's own sheet, and no stand-in `.fade` string or false comment remains in the owned files. A Popover case constructs with the default `animated: true` under the shipped `_tokens.scss`, `_fade.scss`, and `_popover.scss`, and proves its shown and hidden events with trusted input.
3. **C2, the motion factor.** For each of Alert, Tab, Toast, Tooltip, and Popover, one case proves that the completed event follows `--vn-factor-motion`. With the factor at `0`, the event arrives with no running transition. With a large factor, the running transition's duration reads the scaled token, the event has not arrived, and it arrives after the transition finishes. Use no fake clock, no timer wait, and no mock.
4. **C3, the trusted swipe.** One Carousel case drags with trusted `Input.dispatchTouchEvent` points (`touchStart`, `touchMove`, `touchEnd`) on the shipped `_carousel.scss`, and the carousel slides in the drag's direction. Otherwise the report carries the stop reading from § Unknowns.
5. **The instrument binds.** `tmp/j-cascade/mutations.py` plants one mutation per obligation seam: the engine's wait, the fade token read, and the swipe distance or direction. It runs each named case, reads that case's failure message, and refuses a kill caused by a `ReferenceError`, a `TypeError` naming an unbound identifier, a syntax or transform error, or a collection failure. It restores every source byte for byte and holds one control row. Demonstrate the refusal with one planted unbound identifier.
6. The scoped run of the six owned test files, plus any owned source's test file, exits 0.

**Observations, not criteria.** The whole `npm run test:src:browser` reading, which the Orchestrator takes after you exit.

## Review evidence

The Orchestrator commits your work on `unit/cascade` and supplies the lanes with the commit's diff, `git status`, your report, and its own replay of your instrument, including each killed case's failure message.
