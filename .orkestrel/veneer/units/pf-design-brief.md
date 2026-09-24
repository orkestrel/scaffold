# Design brief — PAGE-FRAME (`pf`), the capture decode ceiling at the 1280-wide variants

## Role and engine

Two lanes on one brief, blind to each other: `planner` on Opus 5.5 (native subagent, clean context,
read-only) holds the **subjective** lane (what a page frame claims and shows, where the bound lives,
how the guide and the TSDoc state it); `analyst` on GPT-6 Astra (`codex exec --sandbox read-only`
rooted at `/home/user/veneer`) holds the **objective** lane (correctness, constraints, what the
capture harness, the browser, and the gates permit). Each lane performs the design directly, spawns
nothing, edits nothing, and returns a proposal; the Orchestrator reconciles the two into the unit's
brief.

## Objective

A unit plan that makes every page frame the capture journey writes at every registered variant read
back through the `readFrame` function and the `measureVariation` function, and keeps it readable as
later families add showcase sections: the shape, the owned files, the guide and TSDoc sentences the
change makes false, the acceptance criteria, the mutation each proof must distinguish, the risks,
and the rulings the Orchestrator must take before dispatch.

## Context

**The failure.** The batch-2 capture run (`CAPTURE=1` at the `light-1280` variant, over the session
head `dc92a09` of `/home/user/veneer`) fails the case `portfolio > reads every frame this variant left
in the portfolio directory inside its declared region` with `Capture frame at
tmp/capture/states/showcase--light-1280.png is not an image this browser decodes`, caused by
`EncodingError: The source image cannot be decoded`. The throw is the `image.decode()` call in the
`readFrame` function of the installed `@orkestrel/test` 0.0.22
(`node_modules/@orkestrel/test/dist/src/browser/index.js`, search `async function readFrame`). The
`measureVariation` function in `tests/setupBrowser.ts` decodes the same file the same way.

**The measurement.** PNG header dimensions read from `tmp/capture/states/` in `/home/user/veneer`
after that run (the command is a Python `struct.unpack('>II', header[16:24])` over each file):

| Frame | Width × height | Decoded RGBA | Read back |
| --- | --- | --- | --- |
| `showcase--dark-1280.png`, batch 1 (session head before batch 2) | 1280 × 41954 | 204.9 MiB | yes, the batch-1 capture run passed |
| `showcase--light-1280.png`, batch 2 | 1280 × 53410 | 260.8 MiB | no |
| `page-strip-hover--light-1280.png`, batch 2 | 1280 × 53442 | 260.9 MiB | not reached |
| `showcase--light-390.png`, batch 2 | 390 × 44684 | 66.5 MiB | yes |

Every page frame at the 1280-wide variants measures 53410 or 53442 pixels tall, so every one of them
is over the ceiling, not the arrival frame alone. The ceiling lies between 204.9 MiB and 260.8 MiB;
its exact value is unmeasured. The document is taller at 1280 than at 390; which sections make the
difference is unmeasured.

**The mechanism.** The `FrameManager` class in `tests/setupBrowser.ts` places an element frame
through its `place` method and a page frame through its `page` method; both reach the portfolio's
`place` method, and a page frame passes no element. The installed `captureFrame` function (same
`index.js`, search `async function captureFrame`) stages the pane to the document's content height
and shoots the whole page when no element is given. The integration file
`tests/app/browser/integration.test.ts` calls the `page` method at every site `grep -n
"FRAMES.page(" tests/app/browser/integration.test.ts` lists: the arrival frame (the `showcase`
scenario, subject the `Showcase` region) and the keyboard-focus and pointer states the journey drives
in the live document. The `SHOWCASE_KEYS` table in `tests/setup.ts` and its TSDoc, the `CascadeKey`
TSDoc there (the measured "element frame comes back blank white" ruling for specimens deep in the
document), the `FrameManager` TSDoc, and the guide's § Showcase stem table (`guides/veneer.md`,
search `The page frame, read through the region at rest`) state what a page frame covers.

**Growth.** Every family that lands adds a showcase section: FADE and LEDGER run in worktrees from
`42fd88e`, and THEME, BCF, and CLOSE-OUT follow. A bound that holds the whole document under the
ceiling today fails again at a later landing.

**Standing constraints.**
- A change to `@orkestrel/test` needs a release, which needs the user's one-time code; the user is not
  available for a release in this batch. Rule a Test-side change as a carrier for a later release,
  never as this unit's dependency.
- `AGENTS.md` § Non-negotiable rules: no mocks, no fakes, no module replacement; real implementations.
- The capture portfolio is the review input for rendered claims (`.agents/orchestration.md` § Acceptance
  laws), so a bound must keep each frame's declared region inside what the frame shows.
- The vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` are off-limits.

**Law.** `/home/user/veneer/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,names,typescript,architecture,documentation,writing,quality}.md`;
skill: none.

## Unknowns

- The exact decode ceiling. A lane that needs it names the probe that measures it; the Orchestrator
  runs it.
- Which sections make the 1280 document taller than the 390 one. A lane reads the section and
  specimen sources for responsive rules that add height at the `lg` and `xl` boundaries, and reports
  what it found or that the reading did not settle it.

## Scope

Read-only for both lanes: `/home/user/veneer` (the session head `dc92a09`) and the installed
`node_modules/@orkestrel/test`. No file is owned.

## Execution

Each lane performs the design directly and spawns nothing.

## Output

One proposal, and nothing else:
1. **Options.** Every shape you considered, each with its cost and a ruling. Include at least: bounding
   the document a page frame shoots (for example, the sections that do not hold the subject are taken
   out of the layout for the shot); shooting the focus and pointer states as element frames of a
   lifted copy, as the resting cascade keys are shot; making the arrival frame an element frame of the
   page's opening; a Test-side reader that decodes an oversized frame. Rule each against the growth
   and the standing constraints.
2. **Recommendation.** The one shape you recommend, the files it owns, the files and sentences it
   makes false, and the bound it keeps as sections are added.
3. **Proofs.** Each proof the unit adds or changes, and the mutation it must distinguish.
4. **Acceptance criteria.** Cheap first; the capture run at `light-1280` and `dark-1280` is the
   Orchestrator's observation, not a unit criterion.
5. **Risks and rulings.** What the Orchestrator must decide before dispatch.

Cite each fact as `path` plus a symbol or a case title. State no tally of a growable set.
