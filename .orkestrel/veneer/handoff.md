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
| Veneer | `ea82419` | CL5 landed and pushed; the tracked tree is clean unless a successor is live |
| Scaffold | confirm with `git log --oneline -1` | every record through CL5's landing retained and pushed; `.orkestrel/veneer/` is tracked |

Landed in Veneer so far: CL1 `00a5bdc`, CL2 `9f5ffda`, CL3 `9bb306e`, CL3b `d822d59`, CL4
`bc580c1`, CL4b `5240e36`, CL5 `ea82419`. Each has a verdict file named for it. Earlier landings
are listed in the memory file `veneer-campaign-state.md` and in `plan.md`.

**CL3 and CL3b** land the reset partial, the text tag partials with mirrored proofs, the first
shared blocks consolidated into mixins, the content section, and the Content colour tokens. The
dark theme's mix anchor is pinned to a literal so no dark role tier moved when the raised surface
took the record's value; `tests/src/styles/integration.test.ts:92` is the standing falsifier.

**CL4 and CL4b** land the remaining Reboot tag partials, the `reboot` compatibility key with its
presence scan, the excluded rows, the selector canonicalization the build's downlevelling needs,
the folder sweep that turned every shared block in the element folder into a mixin, and the two
proof obligations CL4's own audit found.

**CL5 lands the typography and content classes** at `ea82419`, accepted after one fix round. Four
component partials, two showcase regions, and sixteen keys flipped to `shipped` and joined to the
listed set. Its heading and display class twins read the tokens their tags read, proved by
comparing the tag and the class in one host and by a retune matrix covering every level.

## What to do first: CL5's two successors, then CL6

Both are implementation work CL5's audit found and CL5's scope barred. Both are briefed and
retained; neither has run.

**CL5b** (`units/cl5b-brief.md`, `sol` on Astra) extracts the two declaration blocks duplicated
across the element and component folders and lands the shared-block sweep as a standing proof so
the rule stops needing an auditor. **Its scope is measured, not estimated:** two instruments agree
the whole open space is two pairs over 44 partials and 946 pairs
(`units/sweep-styles-authored.log.txt`, `units/sweep-styles-source-2.log.txt`). The precise
instrument needs `source-map-js`, which this package does not declare, so the brief bars it and
the dependency-free text form reproduces the same answer. **A scope read is dispatched**
(`units/cl5b-scope-read-brief.md`) whose row 1 settles where a filesystem-reading proof can live;
fold its answer into `units/cl5b-brief-2.md` before dispatching.

**CL5c** (`units/cl5c-brief.md`, `opus`) replaces three near-identical specimen sections with one
implementation, applies the twin rule to the mark pair, and closes round 2's two proof-integrity
gaps. Its mark ruling rests on `units/cl5-twin-measurement.md`: Elements sets its own mark tokens
to the CSS system colours, Veneer's tag reproduces that, and the class is the side that departs.

**CL6** is an Astra unit whose terrain is mapped (`units/cl6-scout-report.md`) and whose central
ruling is measured (`units/cl6-retune-measurement.md`). Scope-read its brief before dispatch.

## Then CL5 to CL13

Per `content-layout-design-verdict.md` § Units (the routing ledger is there). Brief each from
the design row, the planner's criteria (`units/content-layout-design-planner-report.md`), and
the analyst's unit (`units/content-layout-design-analyst-report.md`); scope-read first. CL5 is
landed; the bounds it was to carry that no landed unit closed — the stripe light-scope assertion,
the shell's document-global `main` id, and the description-list case field's name — pass to the
next unit that owns each file. CL6 (Astra) carries the
link map's retune and the anchor's `--vn-link-*` versus `--bs-*` binding. CL11 carries
`visitBreakpoint`'s bare `finally`, the hold's two uncased refusals, the U7c `resolveButton`
rename, and `driveOracle` root scoping. CL12 carries every guide bound a unit reported. CL13
reuses the U7f portfolio shape (`u7f-verdict.md`, `units/u7f-harness-3.mjs`,
`units/u7f-recapture.sh`).

## Standing rulings from the user (binding)

- Implementation over prose. Comments and guides are the bare minimum to pass; audits cover
  implementation only (correctness, rule compliance, test sufficiency, scope honesty). A
  wording finding is a bound folded into the next implementation unit, never a fix round.
  Reaffirmed by the user during CL5's round 1, with the mechanism that enforces it: **a claims
  file carries no guide-row claim at all.** A claim asserting a property of a guide row invites
  every lane to audit prose, which is how CL5's round produced two guide findings under a ruling
  that bars them. Judge a guide row only where a unit's own criterion names it, and carry its
  facts as a bound for the unit that owns the guide.
- **Write a claim only from a source you read, never from the unit's report.** Five claim-drafting
  defects across this campaign share one root: the report said something, the Orchestrator
  restated it as a claim, and a lane found the nuance the report had smoothed over. Every claim
  must either carry the Orchestrator's own check of the primary source, or be written as what the
  unit reports rather than as what is true. The five, each caught by a lane:
  - Stating what a failing run left passing, when the later assertions never executed.
  - Claiming two artifacts identical without taking the measurement first.
  - Claiming something of every member of a set, contradicting an exception the same claims file
    named a few lines earlier.
  - Writing a guide-row claim under a ruling that bars auditing prose, which instructs every lane
    to audit prose whatever the brief says beside it.
  - Claiming a unit exceeded its brief without reading the Unknown in that brief which had told
    the unit to settle exactly that question.
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

Carried bounds, each with its carrier: CL4b took the horizontal rule's `border: 0` pin and the
content section's name control and is landed; CL5 takes the markup half of that control, which
CL4b's brief scoped out (`cl4b-audit-verdict.md` reviewer 7), the stripe light-scope assertion
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

Open questions for the user, to report at the family's acceptance, grouped by the decision each
one asks for. Report them in these groups rather than as one list: the groups are what makes the
report answerable.

**Rendered appearance the user may want to overrule.** Each is a value the package ships that a
reading justifies and a person might still reject.

- The outline pair's ghost on its own canvas.
- Dark primary's white text below the 4.5:1 contrast floor, shared with Elements.
- The latched `.active` equalling the `:active` mix, and dimmed against active cyan in dark.
- The repaired control sitting near Outline secondary.
- The fixed heading scale: Veneer's headings are smaller than Bootstrap's at every level but the
  sixth, and CL5's class twins follow the tag rather than Bootstrap's fluid sizes.
- The mark highlight following the system colours Elements measured rather than Bootstrap's
  highlight properties, so retuning those Bootstrap properties moves nothing (CL5c's ruling).
- The link colours moving to the values the record measured, so a consumer who matched the
  current link colour sees it change (CL6's ruling).

**Accepted differences from Bootstrap.** Each ships knowingly and needs no decision unless the
user disagrees.

- The grid judged against the pinned Bootstrap page rather than an Elements specimen.
- The build dropping vendor prefixes it judges redundant for its targets.
- The `::-moz-focus-inner` exclusion, so no Gecko inner-focus repair ships.
- The two deferral grammars.
- The container key's navigation combinators shipping while the navigation family stays deferred,
  so those rules reference a class this cascade never defines (CL7's ruling).

**Decisions that are the user's alone.**

- The registry's later majors: `@vitest/browser-playwright`, `typescript`, `vitest`.
- The `pool: 'forks'` pin in scaffold's vendored `vite.config.ts`.

**Cross-package.**

- The forced-colours axis, which is Test-side.

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
