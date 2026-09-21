# Veneer campaign handoff

Written 2026-09-21 for the next Claude Code session on this machine. Read this file, then the
appended entries at the end of `plan.md` (the last entries of the file, after its earlier
re-baseline record), then the latest verdict named under § State, before dispatching anything.
The law is unchanged: `AGENTS.md`, `.agents/orchestration.md`, and `.claude/rules/*.md` in the
scaffold checkout, read before every dispatch.

**How paths read here.** A bare file name (`plan.md`, `cl2-audit-verdict.md`) and a `units/…`
path resolve under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`, the campaign
folder. `TMP/…` is the scaffold checkout's ignored launch folder, the literal lowercase
`C:/Users/mikes/WebstormProjects/scaffold/tmp/`, spelled in capitals so that
`units/retention-rewrite.mjs` (which is also told to skip this file by name) never rewrites
it. `AGENTS.md`, `.agents/…`, and `.claude/…` sit at the scaffold root. Veneer paths name the
checkout `C:/Users/mikes/WebstormProjects/veneer` in full.

## The campaign in one paragraph

Veneer is `@orkestrel/veneer`, a Bootstrap-compatible styles package piloting scaffold's styles
environment by hand. The plan is `plan.md` and the design tenets `tenets.txt`. U1 to U7 (the
Button family) are closed and landed. The Content/layout family is under way, designed in
`content-layout-design-verdict.md` as units CL0 to CL13 in mechanism order: CL0 calibration
(landed as `research/calibration-content.md`), CL1 the proof contract (landed), CL2 tokens and
breakpoint mixins (landed), CL3 the reset partial and the text Reboot tags (landed), CL3b the
muted-text and raised-surface tokens (landed), CL4 the remaining Reboot
tags flipping the `reboot` key, CL5 typography classes, CL6 links, CL7 containers, CL8 grid and
gutters, CL9 tables, CL10 images and figures, CL11 the journey and helper bounds, CL12 the guide
pass, CL13 the portfolio verdict against Elements. Routing: CL1, CL3, CL4, CL6 to CL9 on Astra
(`sol`); CL2, CL3b, CL5, CL10 to CL12 on Opus (`opus`); CL13 the portfolio verdict lanes. Every
unit is scope-read before dispatch, audited on the adversarial lanes plus a checker and a
verifier, and landed by a script that refuses any file outside the owned set.

## State at handoff

| Checkout | HEAD | Meaning |
| --- | --- | --- |
| Veneer | `bc580c1` | CL4 landed and pushed; the tracked tree is clean |
| Scaffold | confirm with `git log --oneline -1` | every record through CL4's landing retained and pushed; `.orkestrel/veneer/` is tracked |

Landed in Veneer so far: CL1 `00a5bdc` (`cl1-audit-verdict.md`, two rounds), CL2 `9f5ffda`
(`cl2-audit-verdict.md`, two rounds), CL3 `9bb306e` (`cl3-audit-verdict.md`, three rounds), CL3b
`d822d59` (`cl3b-audit-verdict.md`, two rounds), CL4 `bc580c1` (`cl4-audit-verdict.md`, two
rounds). Earlier landings are listed in the memory file `veneer-campaign-state.md` and in
`plan.md`.

**CL3 and CL3b are closed and landed.** Together they land the reset partial, the text tag
partials with mirrored proofs whose case tables and mode table live in `tests/setupStyles.ts`,
the first shared blocks consolidated into mixins, `ContentSection` with the shell's main region
addressable by fragment, and the Content colour tokens: `--vn-text-muted`, the retuned
`--vn-surface-raised`, `--vn-surface-code` in the theme maps, the `font.mono` group, and
`--vn-line-code`. The dark theme's mix anchor is pinned to the literal `oklch(0.235 0.013 256)`
so no dark role tier moved when the raised surface took the record's value;
`tests/src/styles/integration.test.ts:92` pins that tier and is the standing falsifier.

**CL4 is closed and landed at `bc580c1`**, accepted on all four lanes after one fix round. It
ships the remaining Reboot tag partials with their proofs, the `reboot` compatibility key with
the presence scan comparing the pinned inventory against the built cascade, the excluded rows
with the reason each carries, the selector canonicalization that folds the legacy pseudo-element
spellings the build downlevels to, the legend boundary reading `breakpoint-up(xl)`, the folder
sweep that turned every shared declaration block into a mixin, the non-visible focus proof, and
the two Bootstrap departures recorded in the guide. Its four deviation stops and both audit
rounds are in `cl4-audit-verdict.md` and in `plan.md`.

Still open from those units, each with its carrier: the link colours' equality with the record is
CL6's; a later component surface unit measures its own raised value rather than assuming
`--vn-surface-raised` still names the popover surface (CL12 restates the guide sentence); the
description-list case field's name and the mode-invariant token case's duplicate registration go
to the next unit that touches them.

## What to do first: CL4b, then CL5

**CL4b** is a small successor unit carrying CL4's two proof obligations, both found by its audit
and both test-side. No later unit in the plan owns either file, which is why they take a unit
rather than diluting CL5.

1. Pin the `border: 0` that `box-reset` supplies to the horizontal rule. Its proof pins the
   margin and the block-start border only, so dropping the include returns the user-agent border
   on the other sides with the suite green.
2. Give `ContentSection`'s name and markup assertions an independent control. They compare the
   specimen table against itself, so the tag sequence is the only control the file has.

Route it to `builder` on the cheap native tier with both obligations fully specified, audit it
with one lane on an engine the Orchestrator does not share plus a `checker`, and land it the way
every unit lands.

**CL5** is an Opus unit, so its lanes take the default assignment: the Opus reviewer holds the
SUBJECTIVE lane and the Astra analyst the OBJECTIVE lane. Its terrain is already mapped and
retained at `units/cl5-scout-report.md`, so its brief does not re-read the inventory. The ruling
its brief carries is already taken: the `.h1` through `.h6` and `.display-*` class twins read the
same tokens their tag partials read rather than Bootstrap's fluid sizes, so a heading tag and its
class twin agree inside Veneer. The fixed heading scale is already an open question reported to
the user, and the display tokens for the large-viewport caps already exist in the token file.

## Then CL5 to CL13

Per `content-layout-design-verdict.md` § Units (the routing ledger is there). Brief each from
the design row, the planner's criteria (`units/content-layout-design-planner-report.md`), and
the analyst's unit (`units/content-layout-design-analyst-report.md`); scope-read first. CL5
(Opus) carries the stripe light-scope assertion, the heading letter-spacing row, the shell's
document-global `main` id, and the description-list case field's name. CL6 (Astra) carries the
link map's retune and the anchor's `--vn-link-*` versus `--bs-*` binding. CL11 carries
`visitBreakpoint`'s bare `finally`, the hold's two uncased refusals, the U7c `resolveButton`
rename, and `driveOracle` root scoping. CL12 carries every guide bound a unit reported. CL13
reuses the U7f portfolio shape (`u7f-verdict.md`, `units/u7f-harness-3.mjs`,
`units/u7f-recapture.sh`).

## Standing rulings from the user (binding)

- Implementation over prose. Comments and guides are the bare minimum to pass; audits cover
  implementation only (correctness, rule compliance, test sufficiency, scope honesty). A
  wording finding is a bound folded into the next implementation unit, never a fix round.
- One guide per package: `guides/veneer.md` only. Surfaces are core, browser, server, styles
  only; Vue is a deferred service; no invented surfaces (no subpath export, side-effect entry,
  build wrapper, or rule amendment beyond scaffold's shape).
- Veneer pilots the styles environment by hand; implement nothing in scaffold for it.
- A lone class sits flat at its environment root; families live in lowercase plural folders.
- No RTL work. Orkestrel packages may be declared as dependencies; any other dependency is
  the user's call. Publishing is OTP-based only; never paste a token or password; never read
  `~/.npmrc` or a credential file.
- Routing: Codex bench lanes on `gpt-6-astra` only (never Sol); Cursor only for Grok 4.6; Opus
  lanes native; one bench lane at a time per bench.
- Exclusions and open design questions are reported to the user at the owning unit's
  acceptance (the family's, for Content/layout).

## How every unit runs

1. The brief is a file first: `TMP/units/<unit>-brief[-n].md` from `.agents/templates/brief.md`,
   scope-read against the live tree before a bench dispatch (CL2's read found mixins that did
   not exist; CL3's found a barrel and a guide row that did not). A scope read is mechanical
   conformance evidence, which `.agents/orchestration.md` § Tedious work routes to `grok` first
   and to the native `checker` only after the ladder steps past Grok: dispatch `grok` with the
   scope-read brief and record the step. The last session sent CL1's to CL3's scope reads
   straight to the native `checker` without recording a ladder step; that is a recorded
   deviation, not the rule.
2. Stage it into `C:/Users/mikes/WebstormProjects/veneer/tmp/units/` and verify `diff -q`. A
   bench writer opens the staged copy.
3. Launch: a bench unit through `TMP/codex/<unit>[-n].sh` (derive it from `TMP/codex/cl3-2.sh`;
   the script's own `timeout 7200` is the cap and its prompt names the brief and the report) as
   a background Bash command, with a Monitor over `TMP/codex/<unit>-watch.sh`; a native unit
   through the Agent tool (`opus` for the writer) in the background. Confirm the journal grew
   past its header before recording the launch.
4. The report returns as the unit's last message and as
   `C:/Users/mikes/WebstormProjects/veneer/tmp/units/<unit>-report[-n].md`; retain it under
   `units/`, with the bench journal path and thread id in a header comment. Retained reports
   written before this session's fix of `retention-rewrite.mjs` cite their journal as
   `units/<unit>.jsonl`; read that as the swept launch path `TMP/codex/<unit>.jsonl`, and rely on
   the thread id for provenance.
5. Evidence for read-only lanes: `units/render-<unit>.sh` renders the diff and status into
   `TMP/audit/`; retain both. Claims: `TMP/audit/<unit>-audit-claims[-n].md`, the one authority
   for claim numbers, retained beside the verdict.
6. Lanes, launched together and blind to each other: the Opus reviewer and the Astra analyst
   hold opposite lanes, swapped so the writer's engine does not hold the objective lane (after
   an Astra unit: Opus objective, Astra subjective; after an Opus unit: reversed); a checker
   rules the `[mechanical]` claims; a verifier runs the gate brief. The Workflow script names
   `agentType` and `model` per node.
7. Verdict `<unit>-audit-verdict.md`: one table per round with a column per lane, findings,
   carried bounds, one terminal line per round; a fix round is a delta brief
   `<unit>-brief-<n>.md` on the writer's engine, audited by the engine that did not write it.
8. Land with `TMP/units/<unit>-land.sh` (refuses any changed file outside ALLOWED; commits by
   pathspec with `-c core.hooksPath=/dev/null -F <message>`; pushes). Retain the log, add the
   plan entry, update memory, `node units/retention-rewrite.mjs`, commit scaffold by pathspec,
   push.

## Instruments (retained under `units/`)

| File | Use |
| --- | --- |
| `retention-rewrite.mjs` | run from the scaffold root before every commit; rewrites `tmp/` paths inside retained copies to their retained names (journals and `.err` streams keep their launch paths), so a retained launcher points at `units/`: derive a new launcher from the `TMP/codex/` copy, never from the retained one; this handoff is excluded |
| `dump-lanes.mjs` | `node units/dump-lanes.mjs <runId> <prefix> [journalPath]`; finds the Workflow journal under any session folder of this project and writes `units/lane-<prefix>-<role>.md` per lane from the agents' role files |
| `render-cl3.sh`, `render-cl2.sh` | render a unit's audit evidence into `TMP/audit/`; `render-cl3.sh [suffix]` diffs over `9f5ffda` |
| `cl3-audit-wf.js` (and the `cl1-`, `cl2-` scripts) | the Workflow scripts of the audit rounds, reading the `TMP/units/` briefs; a `-2` script names the `-2` briefs |
| `cl3-land.sh`, `cl2-land.sh`, `cl1-land.sh` | landing scripts with their allowlists (retained copies; the runnable ones are under `TMP/units/`) |
| `cl3-2.sh`, `cl3-2-watch.sh`, `cl3-audit-analyst.sh`, `cl3-audit-analyst-watch.sh` | the bench launchers (paths rewritten in the retained copies; the runnable copies are under `TMP/codex/`) |
| `u7f-harness-3.mjs`, `u7f-recapture.sh` | the Elements capture harness and the recapture that runs last before assembling a portfolio |
| `handoff-check-wf.js`, `handoff-check-verifier.md`, `handoff-check-critic.md` | the lanes that verified this file; re-run the Workflow after editing it |

## Bounds carried and open questions

Carried bounds, each with its carrier: CL4b takes the horizontal rule's `border: 0` pin and the
content section's independent control (`cl4-audit-verdict.md` round 2); CL5 takes the stripe
light-scope assertion
(`cl2-audit-verdict.md` round 2), the heading letter-spacing row and the shell's document-global
`main` id (`cl3-audit-verdict.md` round 2), the description-list case field's name and the
mode-invariant token case's duplicate registration (`cl3b-audit-verdict.md`); CL6 takes the link
map's retune and the anchor's `--vn-link-*` versus `--bs-*` binding (`cl3-audit-verdict.md`
round 1); CL11 takes `visitBreakpoint`'s bare `finally` restore, the hold's two uncased refusals
(`cl1-audit-verdict.md` round 2), the U7c `resolveButton` prefix rename, and `driveOracle` root
scoping; CL12 takes every guide bound a unit reported, including the sentence that still
promises component surfaces will consume `--vn-surface-raised` now that it carries the code
block's reading; the first unit that lands a component surface reading that token measures its
own value rather than assuming this one; the Test 0.0.19 release (user-directed, OTP) takes the
`captureFrame` element bounds and the forced-colours `MediaOptions` axis.

Open questions for the user, to report at the family's acceptance: the outline pair's ghost on
its own canvas; dark primary's white text below 4.5:1 (shared with Elements); the latched
`.active` equalling the `:active` mix; dimmed versus active cyan in dark; the repaired control
near Outline secondary; the forced-colours axis (Test-side); the `pool: 'forks'` pin in
scaffold's vendored `vite.config.ts`; the registry's later majors (`@vitest/browser-playwright`,
`typescript`, `vitest`); the two deferral grammars; the grid judged against the pinned
Bootstrap page (an accepted difference); the build dropping vendor prefixes it judges redundant
for its targets; the `::-moz-focus-inner` exclusion meaning no Gecko inner-focus repair ships;
the fixed heading scale, which CL5's class twins now follow rather than Bootstrap's fluid sizes.

## Gotchas that cost time last session

- A user message typed while a Workflow runs is relayed into its live subagents as a
  superseding instruction; the lanes answer it instead of their briefs and return no verdict.
  Send nothing into the session while lanes run, and treat a lane that answered something
  other than its brief as not run.
- The `src:styles` project loads the built cascade: rebuild with `npm run build:src:styles`
  after any `.scss` edit before a styles proof is read, or a plant reports green against the
  stale build.
- A heredoc with quotes in Bash on this host fails the shell or the approval classifier; write
  files with the Write tool and run scripts from files.
- `retention-rewrite.mjs` rewrites every `tmp/` path inside a retained copy, including a watch
  script's journal path and prose that names the launch folder; derive runnable scripts from
  the launch copies, and keep any file that must name the launch folder out of its reach.
- A bench lane's `-last.md` is the report; its thread id is in the journal's first line.
- The conformance presence scan reads only the guide's Compatibility rows, so bare-tag
  selectors are not scanned until CL4 adds the `reboot` row.
- `RETAINED_COLOR_ALIASES` in `tests/setupStyles.ts` does not pin `--bs-code-color`; the
  presence name lists do.

- Never put backticks inside a program you pass to `node -e` or any other shell argument: Git Bash
  runs them as command substitution before the program is parsed, and the text that reaches the
  program is silently stripped. Write the program to a file and run the file, and pass any text
  it inserts as a file path rather than as a literal. `units/splice-handoff.mjs` does that
  for this file.

## Memory

The auto-memory index `C:/Users/mikes/.claude/projects/C--Users-mikes-WebstormProjects-scaffold/memory/MEMORY.md`
points at `veneer-campaign-state.md` (the campaign state), `codex-bench-dark.md` (routing),
`codex-exec-sandbox-facts.md`, `desktop-harness-facts.md`, `brief-scope-derivation.md`,
`implementation-over-prose.md`, and the other standing rulings. Update
`veneer-campaign-state.md` at every landing.
