# Unit STATES round 2 — the reduced-motion declarations return, the moving frame is the sampled frame, and one centre-region helper

Successor to `states-brief.md`. What changed: the audit (`sts-audit-verdict.md`) confirmed the press, disabled, and
link-button proofs and the prose. It carries claim 3 (a reduced-motion twin on another property passes), claim 5 (the
moving frame is shot twice and can race the transition's end), claim 7 and F3 (the repeated centre-region calculation),
F1 (the `getAnimations` limit has no assertion), and F2 (a guide sentence about the gauge's rounding).

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/veneer-sts`, which holds round 1
uncommitted over Veneer `2376710`. Start every shell command with `cd /home/user/veneer-sts &&` and give every file tool
an absolute path under it. Read `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,browser,names,typescript,architecture,documentation,writing,quality}.md`;
and the audit verdict and both lane verdicts under `/home/user/scaffold/.orkestrel/veneer/units/`. No skill applies.

## Objective

The thumb's reduced-motion reading refuses any surviving transition. The moving-frame assertion reads the frame the
wait accepted. One exported helper returns an element's centre region, proved and adopted at every site.

## Context

**Evidence.** Measured by the audit lanes:
- A twin declaring `transition: box-shadow 7.5s ease` passes both the centre pixel and the transition-only declaration
  filter.
- The release requires `transition: none` under the reduced-motion condition (`tests/fixtures/oracle/inventory.json`,
  the thumb row).
- The `waitForCondition` predicate in the transition case discards its accepted screenshot and shoots again.
- The centre-region literal
  `{ x: box.width / 2 - 2, y: box.height / 2 - 2, width: 4, height: 4 }` repeats at the form-range sites, and
  `tests/app/browser/integration.test.ts` reads a frame's centre inline.
- `guides/veneer.md` § Form range classes states that Chromium lists no animation for the thumb in
  `document.getAnimations()`, and it holds a sentence on the gauge's rounding.

**Law.**
- `.claude/rules/architecture.md`: a repeated calculation goes through one export.
- `.claude/rules/tests.md`: a setup helper's proof sits in its sibling `tests/setup*.test.ts`.
- `.claude/rules/documentation.md` § Parity.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/test/browser`.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run styles tests with
`npx vitest run --config configs/src/vite.styles.config.ts <files>` after `npm run build:src:styles`. Write every log,
backup, and script under your worktree's `tmp/units/`, and never into the scratchpad.

**Measurements.** Take every reading in this worktree.

**Control identifiers.** F1 to F3 are the audit's labels. Name each test for what it proves.

**Standing conditions.** Round 1's changes stay, apart from the edits below.

## Unknowns

None.

## Scope

**Owned.** `tests/src/styles/components/form-range.test.ts`; `tests/setupBrowser.ts` (one centre-region export and its
types only; the file is shared with the engine session, so change nothing else); `tests/setupBrowser.test.ts` (its
proof, and its entry in the export-list case); `tests/app/browser/integration.test.ts` (the one inline centre read,
adopting the helper); `guides/veneer.md` § Form range classes; and `tmp/units/`.

**Shared (report-only).** None.

**Off-limits.** `src/**` except during a plant, restored byte-identically, and every other path.

**What asserts the state this change ends.** The export-list case in `tests/setupBrowser.test.ts`, which enumerates the
module's exports.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Execution

Perform the assignment directly and spawn nothing.

1. **Claim 3.** Restore the declaration readings in the transition case: under the reduced-motion condition, the gated
   thumb rule declares `transition-property: none` and a `0s` duration. Keep the rendered collapse readings beside them.
   Plant a twin of `transition: box-shadow 7.5s ease`. The case must fail with an assertion. Log it to
   `tmp/units/sts-2-plant-twin-other.log.txt`.
2. **Claim 5.** The wait returns the frame it accepts, and the assertion reads that same frame. The predicate accepts
   only a frame that differs from both the started and the held fills. State the capture budget, the stretched
   factor's duration against a shot's time, in the case comment.
3. **Claim 7 and F3.**
   - Add one `tests/setupBrowser.ts` export that returns a square `FrameRegion` of a given device-pixel size at an
     element's centre, read after the pane is staged.
   - Prove it in `tests/setupBrowser.test.ts` with a control of an off-centre element.
   - Adopt it at every form-range site and at the inline centre read in `tests/app/browser/integration.test.ts`.
   - Add its name to the export-list case.
4. **F1.** Assert `document.getAnimations()` is empty while the hold lasts, after the moving shot. Add a comment saying
   this assertion reports an engine that starts listing the thumb's transition.
5. **F2.** Delete the gauge-rounding sentence from § Form range classes, and keep the rationale in the case comment.
6. **Gates.** Run each gate in Acceptance, logged to `tmp/units/sts-2-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/sts-report-2.md` and return the same text. It holds:
- the changes, by case;
- the helper's name and proof;
- the plant table and the gate table;
- `tmp/units/sts-2.diff` (`git diff 2376710`) and `tmp/units/sts-2-status.txt`.

State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when the app test's inline read is not a centre region the helper can serve, or when a gate reads
  red outside a timeout under load.
- Settle yourself the helper's name under `.claude/rules/names.md`, the case titles, and the comments.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt leaves the owned files unchanged.
2. `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/form-range.test.ts
   tests/src/styles/components/button.test.ts` passes.
3. `npx vitest run --config vite.config.ts --no-cache --project setup:browser` passes.
4. The twin plant fails with an assertion, per its log.
5. `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** The app browser project, which the Orchestrator runs at landing.

## Review evidence

The diff and status, the plant log, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on
Opus 5.5.
