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
muted-text and raised-surface tokens (added, running, § State), CL4 the remaining Reboot
tags flipping the `reboot` key, CL5 typography classes, CL6 links, CL7 containers, CL8 grid and
gutters, CL9 tables, CL10 images and figures, CL11 the journey and helper bounds, CL12 the guide
pass, CL13 the portfolio verdict against Elements. Routing: CL1, CL3, CL4, CL6 to CL9 on Astra
(`sol`); CL2, CL3b, CL5, CL10 to CL12 on Opus (`opus`); CL13 the portfolio verdict lanes. Every
unit is scope-read before dispatch, audited on the adversarial lanes plus a checker and a
verifier, and landed by a script that refuses any file outside the owned set.

## State at handoff

| Checkout | HEAD | Meaning |
| --- | --- | --- |
| Veneer | `9bb306e` | CL3 landed and pushed; the tracked tree is clean |
| Scaffold | `7f10e9c6` or later (confirm with `git log --oneline -1`) | every record through CL3's acceptance retained and pushed; `.orkestrel/veneer/` is tracked |

Landed in Veneer during the last session: CL1 `00a5bdc` (`cl1-audit-verdict.md`, two rounds),
CL2 `9f5ffda` (`cl2-audit-verdict.md`, two rounds), CL3 `9bb306e` (`cl3-audit-verdict.md`, three
rounds). Earlier landings are listed in the memory file `veneer-campaign-state.md` and in
`plan.md`.

**CL3 is closed and landed as `9bb306e`** after three audit rounds (`cl3-audit-verdict.md`;
briefs `units/cl3-brief-2.md` to `-5.md`, reports `units/cl3-report.md` to `-4.md`, the landing
log `units/cl3-land.log.txt`). Round 3 accepted on all four lanes. Three colour limits are
recorded rather than closed in it: the muted text of `address` and `dd`, the raised surface of
`pre`, `samp`, and `var` (both CL3b's), and the link colours' equality with the record (CL6's).
The `b` tag is CL4's.

**CL3b returned and its round 1 is reconciled (`cl3b-audit-verdict.md`): fix round.** The unit
(`units/cl3b-report.md`) measured the dark anchor hazard and pinned the anchor to
`oklch(0.235 0.013 256)`, so every dark role border tier holds its `9bb306e` value while
`--vn-surface-raised` moves to the record; it landed `--vn-text-muted`, the `surface-code` map
key, a `font.mono` group with `--vn-font-mono-base` and `--vn-font-mono-short`, `--vn-line-code`,
the rebinding of the five partials, and the corner-radius rows. All four lanes ran and the
verifier is green on both browsers. Claim 4 is refuted on necessity and recorded: the registry's
path law does not compel the group, so the rename stands on the name the brief's instruction
implies; no code changes. One defect forces round 2.

**Brief 3 is running on Opus at the end of the last session**: `units/cl3b-brief-3.md` (the
inline mode matrices in `tests/src/styles/tokens.test.ts` read the setup module's `TEXT_MODES`,
including a third one CL3 left behind, plus a sweep of the styles suite). Its report will be
`C:/Users/mikes/WebstormProjects/veneer/tmp/units/cl3b-report-2.md`; an Agent dispatch returns it
as the agent's final message, so read it from that file if the session ended first.

CL3b's round-2 kit is the round-1 kit with `-2` names: derive it by `sed` from the `TMP/` copies
(`TMP/units/cl3b-audit-reviewer-brief.md`, `cl3b-audit-checker-brief.md`, `cl3b-gate-brief.md`,
`TMP/codex/cl3b-audit-analyst.sh` and its watch) and from `units/cl3b-audit-wf.js`, with the
claims in `TMP/audit/cl3b-audit-claims-2.md` and the evidence from
`bash units/render-cl3b.sh -2`. The landing kit is ready: `TMP/units/cl3b-land.sh` (its allowlist
is CL3b's owned set plus the two element globs) and `TMP/units/cl3b-land-message.txt`.

## What to do first: close CL3b

CL3b is an Opus unit, so its lanes stay swapped as CL2's were: the **Opus reviewer holds the
SUBJECTIVE lane and the Astra analyst the OBJECTIVE lane**. Round 1's kit is on disk and round
2's is one `sed` away from it.

1. Run `ps -eo pid,comm | grep -i codex` and expect nothing (brief 3 is a native Agent, not a
   bench exec). Read brief 3's report: an Agent dispatch returns it as the agent's final
   message; if the session ended first, read
   `C:/Users/mikes/WebstormProjects/veneer/tmp/units/cl3b-report-2.md`. Retain it as
   `units/cl3b-report-2.md`.
2. Render round 2's evidence: `bash units/render-cl3b.sh -2` writes
   `TMP/audit/cl3b-diff-2.patch` and `TMP/audit/cl3b-status-2.txt`; retain both as
   `units/cl3b-diff-2.patch.txt` and `units/cl3b-status-2.txt`. Write
   `TMP/audit/cl3b-audit-claims-2.md` (shape: `cl3-audit-claims-3.md`): one claim for the fix,
   one for the sweep's result, and the `[mechanical]` scope, law, and gates claim. Retain it as
   `cl3b-audit-claims-2.md`.
3. Derive the `-2` kit by `sed` from the `TMP/` round-1 copies (never from the retained ones)
   and copy `units/cl3b-audit-wf.js` to `units/cl3b-audit-2-wf.js` naming the `-2` briefs.
   Launch the four lanes together and blind: the analyst as a background command with a Monitor
   on its watch, and the Workflow by absolute `scriptPath`. Do not type into the session while a
   Workflow runs.
4. Read the lanes (`node units/dump-lanes.mjs <runId> cl3b-2`, which names them by role; the
   analyst from its `-last.md` with the journal path and thread id in a header comment), append
   `## Round 2` to `cl3b-audit-verdict.md` in its round-1 shape, and on accept run
   `bash TMP/units/cl3b-land.sh` (its message file `TMP/units/cl3b-land-message.txt` is already
   written).
5. Retain the log as `units/cl3b-land.log.txt`, append the plan entry, update
   `veneer-campaign-state.md`, run `node units/retention-rewrite.mjs` from the scaffold root, and
   commit scaffold by pathspec with a message file under `TMP/units/`. Never `git add -A`.

## Then CL4

`units/cl4-brief.md` is drafted with the placeholder `CL3_LANDING_SHA`; replace it with CL3b's
landing, which is the tree CL4 starts from. Its terrain is `units/cl4-scout-report.md` (Grok:
every `reboot` inventory selector by family with its owner and guard verdict). Steps:
`sed -i 's/CL3_LANDING_SHA/<sha>/' TMP/units/cl4-brief.md`; scope-read it (§ How every unit runs,
step 1); fold the readings and amendments into `TMP/units/cl4-brief-2.md`; stage it into
`C:/Users/mikes/WebstormProjects/veneer/tmp/units/` and verify with `diff -q`; derive
`TMP/codex/cl4.sh` and `cl4-watch.sh` from `TMP/codex/cl3-4.sh` and its watch (the launcher's
prompt names the brief and the report path); launch as a background command with a Monitor;
derive the audit kit from the `TMP/` CL3 round-3 copies (CL4 is an Astra unit, so the lanes sit
as CL3's did: Opus reviewer objective, Astra analyst subjective) and from
`units/cl3-audit-3-wf.js` and `units/render-cl3.sh` with CL4's base. CL4 lands the `b` tag, the
form, table, media, and interactive partials, the `reboot` Compatibility row as `shipped`,
`listed` growing to `['btn', 'reboot']`, and the `Excluded` rows.

After CL4: CL5 to CL13 per `content-layout-design-verdict.md` § Units (routing ledger there).
Brief each from the design row, the planner's criteria (`units/content-layout-design-planner-report.md`),
and the analyst's unit (`units/content-layout-design-analyst-report.md`); scope-read first. CL5
carries the stripe light-scope assertion, the heading letter-spacing row, and the shell's
document-global `main` id. CL13 reuses the U7f portfolio shape (`u7f-verdict.md`,
`units/u7f-harness-3.mjs`, `units/u7f-recapture.sh`).

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

Carried bounds (each names its carrier): CL3b takes the muted text and raised surface (above);
CL6 takes the link map's retune; CL5 takes the stripe light-scope assertion
(`cl2-audit-verdict.md` round 2, reviewer 6); CL11 takes `visitBreakpoint`'s bare `finally`
restore, the hold's two uncased refusals (`cl1-audit-verdict.md` round 2, reviewer 6 and 7),
the U7c `resolveButton` prefix rename, and `driveOracle` root scoping; CL12 takes any guide
bound a unit reports (CL3's report asks it to keep the guide's calibration claims within the
measured bindings); the Test 0.0.19 release (user-directed, OTP) takes the `captureFrame`
element bounds and the forced-colours `MediaOptions` axis.

Open questions for the user, to report at the family's acceptance: the outline pair's ghost on
its own canvas; dark primary's white text below 4.5:1 (shared with Elements); the latched
`.active` equalling the `:active` mix; dimmed versus active cyan in dark; the repaired control
near Outline secondary; the forced-colours axis (Test-side); the `pool: 'forks'` pin in
scaffold's vendored `vite.config.ts`; the registry's later majors (`@vitest/browser-playwright`,
`typescript`, `vitest`); the two deferral grammars; the grid judged against the pinned
Bootstrap page (an accepted difference).

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
