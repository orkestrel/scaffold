# Unit B-FORMS-CLOSE-SPECIMENS (`bfs`) — the validation tooltip specimens, the cascade-key prose, and the input-group focus comment

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bfs` (a worktree
detached at `d02bd46`, Veneer `main`, with `node_modules` installed by the Orchestrator). Perform
the assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-bfs` for
every command and file, and run every npm and npx command from `/home/user/veneer-bfs`. Do not
commit, push, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`,
or `git checkout-index`.

## Objective

The Input group section renders `Input group valid tooltip` and `Input group invalid tooltip`,
registered as resting element frames in `CaptureSubject` and `CASCADE_KEYS` with journey readings
of the tooltip's display, room, and stacking; the `CASCADE_KEYS` doc block and the cascade rest
case title enumerate no member; the input-group focus case's comment reads the shipped border
model; and the gates in § Acceptance criteria are green.

## Context

**Evidence.** The obligations are the `ROADMAP.md` § Carriers rows whose carrier cell names
`B-FORMS-CLOSE` (grep `B-FORMS-CLOSE` in `/home/user/veneer-bfs/ROADMAP.md`): the tooltip
specimens row (D6, D31), the cascade-key prose row, and the focus-comment clause of the round-6 row
("the input-group focus case's comment keeps the outer-column model of a browser-drawn border").
The other rows belong to sibling units and are off-limits here.

The design ruling is `/home/user/scaffold/.orkestrel/veneer/b-forms-close-design-verdict.md`
(R1, R11, R12; read it first). The terrain is
`/home/user/scaffold/.orkestrel/veneer/units/b-forms-close-terrain-report.md` (its `file:line`
pointers were taken at `53628aa`; locate each site by its symbol). Decisions D6 and D31 are in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`.

Sites, from grep at `d02bd46` (locate each by symbol; lines are approximate):

```text
app/browser/constants.ts:1518   INPUT_GROUP_SPECIMENS doc block: "No specimen renders a validation tooltip: the tooltip hangs below the group it is positioned against and would cover the specimen after it."
app/browser/constants.ts:1521   export const INPUT_GROUP_SPECIMENS: readonly MarkupSpecimen[]
app/browser/constants.ts:1547   name: 'Input group validation'
app/browser/constants.ts:638    VALIDATION_SPECIMENS remark: "No row renders a validation tooltip: the release positions one ... partials, and a tooltip with no positioned ancestor resolves `top: 100%` against the initial ..."
tests/setup.ts:95-100           CaptureSubject: 'Input group addons' | 'Input group button' | 'Input group large' | 'Input group plain' | 'Input group small' | 'Input group validation'
tests/setup.ts:295              export interface CascadeKey extends CaptureKey { selector; property }
tests/setup.ts:340-389          CASCADE_KEYS doc block (enumerates "the capped container, the numbered-column row, the base table, and the role link" twice)
tests/setup.ts:390              export const CASCADE_KEYS: readonly CascadeKey[]
tests/setup.ts:896              scenario: 'input-group-validation', subject: 'Input group validation'
tests/app/browser/integration.test.ts:608   it('renders the container, the row, the table, and the link the cascade ships, in both modes'
tests/app/browser/integration.test.ts:617   for (const key of CASCADE_KEYS)
tests/app/browser/sections/InputGroupSection.test.ts:64   expect(region.querySelector('.valid-tooltip, .invalid-tooltip')).toBeNull()
src/styles/components/_validation.scss:21-40  .{state}-tooltip { position: absolute; top: 100%; z-index: 5; display: none; ... margin-top: 0.1rem } and the reveal rule `.is-#{$state} ~ .#{$state}-tooltip { display: block }`
src/styles/components/_input-group.scss:35,42,46  the group's stacking: focused/validated children at z-index 5, the button at z-index 2
```

`tests/setup.test.ts` holds the registry uniqueness case; it is shared and must stay green.
`tests/app/browser/integration.test.ts` around line 928 records the blank-frame measurement the
lift exists for. The `driveTraversal` walk installed from `@orkestrel/test` stops at the first
element it reaches twice, so a focus walk crossing the `Form control date` specimen starts from a
preceding control; the range, select, and input-group cases show the pattern. The precedent for a
specimen whose room is in-flow content is the ButtonGroupSection remark on carrying enough groups
to wrap rather than declaring a width (grep `enough groups` in `app/browser/constants.ts`).

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{browser,tests,names,writing,documentation,styles}.md`.
Skill: none. Guide: `guides/veneer.md` is shared (see § Scope).

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`:
`driveTraversal`, `readSpecimen`, `stageMedia`, `FRAMES`, `readRegion`, `readName`, `readStates`)
and `@orkestrel/contract`. A helper, guard, wait, recorder, or deferred whose job an installed
export does is a defect; the audit's checker probes the diff for export names.

**Host.** Linux, bash, `/home/user/veneer-bfs`. Run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
as the first command of every shell (the manifest's `devEngines` pin refuses npm 10 with
`EBADDEVENGINES`). Never run `corepack use`. Chromium is installed; the journey drives it. A
`CAPTURE=1 npm run test:journey` run of one variant takes about two minutes and writes frames under
`tests/fixtures/portfolio/`; the Orchestrator takes the authoritative regeneration after landing, so
run it once for one variant as an observation and do not commit its frames (leave the portfolio
tree as it is, or restore the frames you regenerated by overwriting them with the same run's result
only if the run changes them; report what changed).

**Measurements.** The tooltip rule writes `position: absolute; top: 100%; margin-top: 0.1rem;
z-index: 5`, so a tooltip sits wholly outside its group's border box and over whatever follows the
group. The group's button rests at `z-index: 2`. Take the room and stacking readings before writing
their assertions.

**Control identifiers.** R1, R11, R12, D6, D31 are this brief's labels. Name a test for what it
proves, never for the label that specified it.

**Standing conditions.** The tree is clean at `d02bd46`. `npm run test:journey` without
`CAPTURE=1` reads the committed frames; the case
`reads every frame this variant left in the portfolio directory inside its declared region` reads
the committed portfolio, so a scenario registered with no frame reddens it until the Orchestrator
regenerates — report that reading as an observation, not a failure of the unit.

## Unknowns

- Whether the journey's traversal cases that cross the Input group section meet the new focusable
  controls as extra stops. Run `npm run test:journey` and report which cases changed and how you
  settled them within owned files.

## Scope

**Owned.** `app/browser/constants.ts` (only `INPUT_GROUP_SPECIMENS` and its doc block,
`INPUT_GROUP_COPY`, and the tooltip clause of the `VALIDATION_SPECIMENS` remark; R11 lifts the
append-only rule for these), `tests/setup.ts` (only the `CaptureSubject` union, the `CASCADE_KEYS`
rows and its doc block, and the capture registry rows for the two scenarios),
`tests/app/browser/integration.test.ts`, `tests/app/browser/sections/InputGroupSection.test.ts`,
`tmp/units/bfs-report.md`.

**Shared (report-only).** `tests/setup.test.ts` (its uniqueness case must stay green; stop if it
reddens), `guides/veneer.md` (return one sentence for § Input group classes naming the tooltip
frames, as exact text in the report; the Orchestrator lands it), `ROADMAP.md`,
`tests/setupStyles.ts` and its proof, every `src/**` file, the portfolio frames.

**Off-limits.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`configs/**`, `package*.json`, `vite.config.ts`, `tsconfig.json` (the paths `scaffold repair`
restores); `src/styles/**`; `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
`tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`,
`tests/src/**` (the sibling `bft` unit owns them); every file not named in Owned.

**What asserts the state this change ends.** `app/browser/constants.ts` (the "No specimen renders a
validation tooltip" sentence and the `VALIDATION_SPECIMENS` reason clause; Owned);
`InputGroupSection.test.ts` (the null tooltip query and any one-group-per-specimen assertion;
Owned); `tests/setup.ts` (the union and rows lacking the names; the doc block's enumerations;
Owned); `integration.test.ts` (the rest case title; the focus comment "outer column"; Owned);
`guides/veneer.md` (§ Input group classes lacks the frame sentence; Shared, carried by the
Orchestrator's integration edit); the § Tests stem table lacks the tooltip stems (carried by
B-PASSIVE-CLOSE's existing row; record only). Search bound: `grep -rn "tooltip" app tests guides`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive
git. Runtime probes go under `tmp/probe/`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bfs-report.md` in the worktree: the diff summary (`git status --porcelain` and
`git diff --stat`), each acceptance criterion with the exact command and its result line, the
observations (journey and capture readings), the exact guide sentence for the Orchestrator to land,
the unknown's answer, and the claims you flag as weakest. Return the same content as your final
message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — where the tree disagrees with the verdict's R1 geometry (a tooltip that cannot be
read on the lifted copy, a stacking reading the release's `z-index` does not give), where
`tests/setup.test.ts` reddens, or where a criterion needs a file outside Owned. Decide, record,
and carry on for the specimen markup's exact names, the remark wording, where the rows sit in the
section's render order, and how a traversal case starts.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
2. `npm run test:setup` exits 0 (the uniqueness case in `tests/setup.test.ts` stays green).
3. `npm run test:app` exits 0. `InputGroupSection.test.ts` lists both tooltip specimens by name,
   asserts each tooltip specimen's first group holds its tooltip, that the control's
   `aria-describedby` names the tooltip's id, that the tooltip is visible, and that every control and
   button name in the region is unique; the null tooltip query is gone.
4. `INPUT_GROUP_SPECIMENS` gains `Input group valid tooltip` and `Input group invalid tooltip`
   directly after `Input group validation`. Each is a `.input-group.has-validation` with an addon, a
   control carrying `.is-valid` or `.is-invalid` with a unique accessible name and an
   `aria-describedby` naming the tooltip, and the tooltip as the group's last child, followed inside
   the same specimen by a second, button-led group (`.btn` then `.form-control`, unique names). No
   inline style. The specimen doc block says the second group is the room the tooltip hangs over and
   that the overlap is the release's positioning.
5. `tests/setup.ts`: `CaptureSubject` gains both names in the Input group run's alphabetical order;
   the capture registry gains `input-group-valid-tooltip` and `input-group-invalid-tooltip` as
   resting element frames over the specimens; `CASCADE_KEYS` gains one row per specimen with
   selector `.is-valid ~ .valid-tooltip` and `.is-invalid ~ .invalid-tooltip` and property
   `display`; the doc block describes the population by its rule (every resting key a journey
   photographs, with its specimen, the selector the frame's region is read on, and the property its
   own rule sets; families append rows) and names no member; the blank-frame measurement stays,
   bound to where it was measured.
6. `integration.test.ts`: the rest case is retitled `reads every resting cascade key the same on its
   lifted frame as in the showcase, in light and dark`; it reads each tooltip key as
   `display: block` in light and dark; on the lifted copy it reads the tooltip's bottom edge at or
   above the frame element's bottom edge; it reads `document.elementFromPoint` at a point inside both
   the tooltip and the following group's button and expects the tooltip. The input-group focus
   comment reads that the button's leading border paints over the border the two share until the
   control is lifted past it.
7. `npm run test:journey` exits 0 apart from the portfolio-frame case named under Standing
   conditions; report every case that changed.

**Observations, not criteria.** One `CAPTURE=1 npm run test:journey` run for one variant (report the
frames it lists for both scenarios and their sizes); the whole `npm test`.

## Review evidence

The actual diff (`git diff`) and `git status --porcelain` from the worktree, the report, and the
one-variant capture reading. The Orchestrator supplies the regenerated frames to the audit.
