# U6 audit — numbered claims

Subject: the U6 diff in the Test checkout `C:/Users/mikes/WebstormProjects/test`, from `f49bc7f`
(0.0.18) to the working tree the dispatch names, made by Astra (`codex exec`, thread
`01a0be31-81c3-7262-b16a-3dfb9ff70b0c`) from `units/u6-brief.md`, with its report
`units/u6-report.md`. Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and
the deciding evidence (`file:line` or exact text). Read the actual diff (`units/u6-diff.patch.txt`)
and the checkout, never the report alone. The design the unit implements is
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-design-planner-report.md`
as amended by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-design-verdict.md`;
where they disagree the verdict wins. Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`
and `.claude/rules/` there.

1. **Types and constant.** `src/browser/types.ts` declares `MediaOptions` with exactly the
   readonly optional booleans `print` and `motion`, each with a TSDoc description paragraph;
   `src/browser/constants.ts` declares `POINTER_HOLD` as `'data-pointer-hold'` in alphabetical
   position; both are exported through `src/browser/index.ts`.
2. **One CDP door.** `sendProtocol(method, params)` is the only place `cdp()` is invoked for
   the new verbs; it reaches `send` through `readProperty` and `invokeUnchecked` (no `as`, no
   `any`, no `!`), refuses `Browser provider exposes no DevTools session` when the session has no
   callable `send`, and returns `Promise<void>`.
3. **Hover.** `hoverAccessible` has the `(name)` and `(role, name)` overloads of
   `clickAccessible`, resolves through the same resolver (so the absent, gated, ambiguous, and
   unreachable voices are unchanged), and calls `userEvent.hover` on the resolved element with
   no other side effect.
4. **Hold.** `holdAccessible` refuses a second hold with `Pointer is already held at <x>x<y>`
   before pressing; computes the scaled point from `window.frameElement`'s painted box over
   `innerWidth` (scale `1` at top level); sends `mouseMoved` then `mousePressed` with
   `button: 'left'`, `buttons: 1`, `clickCount: 1`; parks `POINTER_HOLD` on the tester root with
   the value `<x>x<y>`; waits a frame; reads `matches(':active')` back and, when false, releases
   before refusing `Interactive target "<name>" did not enter the pressed state`, leaving no
   marker.
5. **Release.** `releasePointer` reads and removes the marker, sends `mouseReleased` at the
   recorded point only when a marker was present, sends `mouseMoved` to the origin
   unconditionally, waits a frame, and resolves without throwing on an idle pointer, so
   `afterEach(releasePointer)` is safe.
6. **Pseudo read.** `readStyle(element, property, pseudo?)` refuses a `pseudo` that does not start
   with `::` (`Pseudo-element "<pseudo>" must start with "::"`) before consulting
   `CSS.supports(\`selector(${pseudo})\`)` (`Pseudo-element "<pseudo>" is not one this engine
   exposes`), then reads `getComputedStyle(element, pseudo)`; `readPixels` forwards the same
   parameter and parses through the one reader; a call without `pseudo` is byte-for-byte the
   former behavior.
7. **Media stage.** `stageMedia(options)` refuses `{}` with `Media emulation was staged with
   nothing to emulate`; maps `motion: false` to `prefers-reduced-motion: reduce`, `motion: true`
   to `no-preference`, `print: true` to `media: 'print'`, `print: false` to `media: 'screen'`, and
   re-sends an omitted axis's effective reading (read through `matchMedia`) because the command
   replaces the whole emulation state, so a staged axis survives a later stage of the other one;
   sends `Emulation.setEmulatedMedia`; waits a frame;
   verifies each staged axis except `print: false` through `matchMedia`; releases before refusing
   `Media emulation did not reach the tester: <query>`. `releaseMedia` sends
   `{ media: '', features: [] }`, waits a frame, and is safe on an unstaged tester.
8. **Proof coverage.** `tests/src/browser/helpers.test.ts` carries, with `afterEach(releasePointer)`
   and `afterEach(releaseMedia)`: the hover case with the twin control and the absent refusal; the
   hold case with `:active` paint, `document.activeElement`, and the post-release reading; the
   unscaled-point negative control through `sendProtocol`; the covered control; the double hold;
   the idle release; the second viewport `390 × 844`; the pseudo reads with the element-versus-
   pseudo control, `::backdrop`, `::details-content`, and the two refusals; the media sequence
   with `{ motion: true }` pinning the base, `{ motion: false }`, `{ print: true }`, the release
   assertion, and the `{}` refusal; the teardown-on-failure cases (sentinel after a hold or a
   stage, the hook releasing, the next case reading the restored state; an explicit release
   followed by the hook without a second release).
9. **Controls.** The first report records `PLANT-SCALE`, `PLANT-PSEUDO`, and `PLANT-RELEASE` each
   turning its named assertion red with the exact assertion text (logs retained beside it); the
   tree carries no plant; no case name carries a control tag; the whole browser project ran green
   after the removals (the second report).
10. **Guide parity.** `guides/test.md` carries a `Surface` row for each of `MediaOptions`,
    `POINTER_HOLD`, `sendProtocol`, `hoverAccessible`, `holdAccessible`, `releasePointer`,
    `stageMedia`, `releaseMedia`, with `Summary` cells equal to the TSDoc description paragraphs;
    the `readStyle` and `readPixels` signature cells carry `pseudo?: string`; the `Voices` rows
    quote the shipped sentences exactly; the `Limits` rows and the `Bounds` bullets the planner
    drafted are present; the Patterns fences are transcribed into cases; `test:guides` is green.
11. **Names.** Every declared public name is absent from every `Surface` row under
    `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/scaffold/dist/host/guides/*.md`,
    and the report records the check.
12. **Scope and law.** Only the owned files changed (`src/browser/types.ts`, `constants.ts`,
    `helpers.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md`, and `tests/setup.ts` for
    three `ROUTED_FENCES` entries mapping the new Patterns headings to
    `tests/src/browser/helpers.test.ts`); `package.json`, `configs/**`, `tests/setupPolicy.ts`,
    `tests/policy.test.ts`, `tests/config.test.ts`, `src/core/**`, `src/server/**` are unchanged;
    no `any`, `as`, `!`, `@ts-*`, `eslint-disable`, nested function declaration, or module-scope
    helper left unexported and untested; no mock or fake of project-owned behavior.
13. **Gates.** Every gate the report lists reproduces green on the same tree on managed Chromium,
    and `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` is green on Edge.
