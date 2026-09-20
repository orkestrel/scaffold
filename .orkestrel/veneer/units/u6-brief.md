# Unit U6 — the Test package's journey additions

## Role and engine

`sol` on `gpt-6-astra`, reached through `codex exec --sandbox workspace-write` rooted at this
checkout (`C:/Users/mikes/WebstormProjects/test`). You are the engine reading this brief inside
your own CLI: perform the assignment directly and spawn nothing. You are the sole writer in this
checkout for the life of this unit.

## Objective

Add to `@orkestrel/test/browser` the four capabilities Veneer's Button unit consumes and U5
proved reachable — a hover verb, a pointer hold with its release, a pseudo-element form of the
style readers, and a media stage with its release — plus the one CDP door they share; prove each
in this package's own browser suite with negative controls on managed Chromium; document them in
`guides/test.md` with the surface, voices, limits, bounds, and patterns; and leave every gate
green. Publish nothing.

## Context

**The design.** Implement the subjective lane's proposal,
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-design-planner-report.md`,
as amended by the Orchestrator's rulings in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-design-verdict.md`. Where the two
disagree, the verdict wins. The objective lane's report (`u6-design-analyst-report.md`)
supplies the teardown-on-failure proofs and the risk list; read its § Proofs and § Risks once.

**Readings the design rests on.**
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/instruments.md` (the U5 rows:
`userEvent.hover` matches `:hover`; a CDP `Input.dispatchMouseEvent` press lands once the tester
iframe's scale is applied; pseudo-element used values; media emulation and its restore) and
`research/instruments/media-probe.output.txt` (`matchMedia('print')` follows
`Emulation.setEmulatedMedia` on both engines; `CSS.supports('selector(::before)')` and the other
real pseudo-elements read true, an invented one reads false, and `:hover` reads true, so the `::`
check must precede the `CSS.supports` check).

**The checkout.** Clean at `f49bc7f` (`chore: release test 0.0.18`), `node_modules` installed.
The journey layer is `src/browser/helpers.ts` (`clickAccessible` `:376`, `clickDisclosure` to
`:474`, `typeAccessible` `:492`, `pressKeys` `:543`, `traverseAccessible` `:563`,
`waitForAnimations` `:1200`, `readStyle` `:2158`, `readPixels` `:2234`, `stagePane`/`releasePane`
to `:2402`), with `src/browser/types.ts`, `src/browser/constants.ts` (alphabetical; `CAPTURE_PANE`
`:50`, `IMPLICIT_ROLES` `:161`), and `src/browser/index.ts`. `invokeUnchecked` and `readProperty`
are this package's unchecked-boundary helpers (`guides/test.md:1514`). The browser project runs
with `fileParallelism: false` (`vite.config.ts:155`), so a staged medium cannot leak across files.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/tests.md`,
`typescript.md`, `names.md`, `architecture.md`, `browser.md`, `documentation.md`, `writing.md`;
the skill `.agents/skills/orkestrel-align-packages/SKILL.md` on its lane for this package, and
`.agents/skills/orkestrel-prove-journey/SKILL.md` with `references/layer.md` and
`references/styles.md` for the layer's contract. All under `C:/Users/mikes/WebstormProjects/scaffold/`.
Do not edit the skill files: their vocabulary update is a separate scaffold unit and this brief
records it.

**Host.** PowerShell inside the Codex sandbox with script execution disabled: run scripts as
`npm.cmd run <name>` and binaries as `npx.cmd <bin>`. Network denied: no install, no publish.
`prove` is blocked here. `.git` is read-only: no `git` command that takes the index lock;
`git status` and `git diff` work. Managed Chromium runs the browser projects inside this sandbox
(proved 2026-09-20 in a sibling checkout).

**Fleet name ownership.** Before declaring a public name, read
`C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/scaffold/dist/host/guides/*.md`
for a `Surface` row carrying it; `hoverAccessible`, `holdAccessible`, `releasePointer`,
`stageMedia`, `releaseMedia`, `sendProtocol`, `MediaOptions`, and `POINTER_HOLD` were free on
2026-09-20 by both lanes' reads; check again and record it.

**Control identifiers.** `PLANT-SCALE` (the hold pressed at the unscaled point, through
`sendProtocol`, as the suite's own negative control), `PLANT-PSEUDO` (a build of `readStyle` that
drops the `pseudo` argument must redden the element-versus-pseudo comparison), `PLANT-RELEASE`
(omit the release and the post-cleanup reading must redden). Name each test for what it proves.

## Unknowns

- Whether `document.activeElement` is the pressed button after a protocol press on Edge as well
  as on Chromium; U5 read it so on both. Assert it in the case, not inside the verb, and record
  the reading.
- Whether a `deviceScaleFactor` other than `1` reaches the provider's page here; the hold's
  `:active` read-back refuses rather than misreports if it does. Record the reading of
  `devicePixelRatio` in the hold case.

## Scope

**Owned.** `src/browser/types.ts`, `src/browser/constants.ts`, `src/browser/helpers.ts`,
`src/browser/index.ts` (only if a barrel line is needed), `tests/src/browser/helpers.test.ts`,
`tests/src/browser/constants.test.ts` (only if the constant needs a proof there),
`guides/test.md`, `README.md` (only if the pitch or a listed capability must move).

**Shared (report-only).** `package.json`. **Off-limits.** Every vendored and content-owned path,
`configs/**`, `tests/setup*.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `src/core/**`,
`src/server/**`.

**What asserts the state this change ends.** `tests/src/browser/index.test.ts` if it pins the
browser export set; `tests/guides.test.ts` (every new export documented, every `Summary` cell
equal to its TSDoc description paragraph); the `Limits` and `Voices` sections' own parity.

**Tools and limits.** The Codex patch tool; `npm.cmd`, `npx.cmd`, `node`, `git status`,
`git diff`. No install, no `git` write, no tree-wide `format`.

## Execution

Perform the assignment directly and spawn nothing. Types first, then constants, then the
helpers, then the proofs, then the guide.

1. `MediaOptions` in `types.ts` after `StateOptions`; `POINTER_HOLD` in `constants.ts` in its
   alphabetical place, as the planner wrote them.
2. `sendProtocol(method, params)` after `clickDisclosure`, through `readProperty` and
   `invokeUnchecked`, refusing `Browser provider exposes no DevTools session`.
3. `hoverAccessible`, `holdAccessible`, `releasePointer` after it and before `typeAccessible`,
   with the mechanisms and voices the planner wrote (the hold: resolve, refuse a double hold,
   compute the scaled point from `window.frameElement`'s painted box over `innerWidth` or scale
   `1` at top level, `mouseMoved` then `mousePressed` with `button: 'left'`, `buttons: 1`,
   `clickCount: 1`, park `POINTER_HOLD`, `waitForFrame`, read `:active` back and release-then-refuse
   with `Interactive target "<name>" did not enter the pressed state`; the release: read and
   remove the marker, `mouseReleased` at the recorded point when present, an unconditional
   `mouseMoved` to the origin, `waitForFrame`, never throwing on an idle pointer).
4. `readStyle` and `readPixels` gain `pseudo?: string` with the two refusals (`must start with
   "::"`, `is not one this engine exposes`) checked in that order before the read.
5. `stageMedia` and `releaseMedia` after `releasePane`, as the planner wrote them: the payload
   from the options, `{}` refused, `waitForFrame`, verification through `matchMedia` for each
   staged axis except `print: false`, release before refusing; the release sends
   `{ media: '', features: [] }` and waits a frame.
6. Proofs in `tests/src/browser/helpers.test.ts` beside their siblings, with
   `afterEach(releasePointer)` and `afterEach(releaseMedia)`: every case of the planner's § 4
   (hover with the twin control and the refusal; hold with the unscaled control through
   `sendProtocol`, the covered control, the double hold, the idle release, the second viewport
   `390 × 844`; the pseudo reads with the element-versus-pseudo control, the `::backdrop` and
   `::details-content` fixtures, and the two refusals; the media sequence with the base pinned by
   `{ motion: true }`, the release assertion, and the `{}` refusal) plus the analyst's
   teardown-on-failure cases (a sentinel thrown after a hold or a stage, the `afterEach` release
   running, the browser state read restored in a following case; an explicit release followed by
   the hook causing no second release). Transcribe each new Patterns fence into a case per the
   file's convention.
7. `guides/test.md`: the Surface rows, the signature cells of `readStyle` and `readPixels`, the
   Voices rows, the Limits candidate rows, the Bounds bullets, and the three Patterns sections
   exactly as the planner drafted them, with the verdict's key names (`print`, `motion`).
8. Gates: `npm.cmd run format:check`, `lint:check`, `check`, `build`, then `test:src`,
   `test:app` if present, `test:policy`, `test:config`, `test:guides`, and every other project the
   `test` script chains; record each command's final lines.

## Output

Write `u6-report.md` in this checkout and return its content: the files changed; the
name checks; each control's red and green readings; the two unknowns' readings; each gate
command's final lines; the exact voices as shipped; and every deviation with expected, found,
exact evidence, done or not done, and at most one hypothesis. No process diary.

## Deviation contract

Stop and report on: a rule that forbids a declaration the verdict requires; a gate that stays red
after your own fix inside owned files; a need to edit an off-limits file; a provider that cannot
launch. Decide, record, and carry on from: fixture markup beyond what the design names, case
order, helper placement within the named ranges, and TSDoc wording.

## Acceptance criteria

1. `format:check`, `lint:check`, `check`, `build` exit 0.
2. Every test project exits 0 on managed Chromium.
3. Each of the three controls turned its named assertion red and every plant is removed.
4. `git status --porcelain` shows only owned files changed and the report present.

**Observations, not criteria.** Edge (`PLAYWRIGHT_CHANNEL=msedge`): the Orchestrator runs the
browser project there after you return; the tarball pack and Veneer install: the Orchestrator's.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the built `dist/`.
