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
breakpoint mixins (landed), CL3 the reset partial and the text Reboot tags (returned, in
audit), CL3b the muted-text and raised-surface tokens (added, § State), CL4 the remaining Reboot
tags flipping the `reboot` key, CL5 typography classes, CL6 links, CL7 containers, CL8 grid and
gutters, CL9 tables, CL10 images and figures, CL11 the journey and helper bounds, CL12 the guide
pass, CL13 the portfolio verdict against Elements. Routing: CL1, CL3, CL4, CL6 to CL9 on Astra
(`sol`); CL2, CL3b, CL5, CL10 to CL12 on Opus (`opus`); CL13 the portfolio verdict lanes. Every
unit is scope-read before dispatch, audited on the adversarial lanes plus a checker and a
verifier, and landed by a script that refuses any file outside the owned set.

## State at handoff

| Checkout | HEAD | Meaning |
| --- | --- | --- |
| Veneer | `9f5ffda` | CL2 landed and pushed; the working tree carries CL3's uncommitted files (58 paths outside the ignored `tmp/` at the last reading) |
| Scaffold | `83591056` or later (confirm with `git log --oneline -1`) | every record through CL3's round-1 launch retained and pushed; `.orkestrel/veneer/` is tracked |

Landed in Veneer during the last session: CL1 `00a5bdc` (`cl1-audit-verdict.md`, two rounds),
CL2 `9f5ffda` (`cl2-audit-verdict.md`, two rounds). Earlier landings are listed in the memory
file `veneer-campaign-state.md` and in `plan.md`.

**CL3 returned under brief 3 on Astra and is in its round-1 audit.** The unit was a
`codex exec` launched by `TMP/codex/cl3-2.sh` (journal `TMP/codex/cl3-2.jsonl`, thread
`01a0c397-fde9-7752-a904-3d76bff7ba31`, `exit=0` in `TMP/codex/cl3-2.err`; the exec ran about
30 minutes). Its report is retained as `units/cl3-report-2.md`; its owned files are uncommitted
in the Veneer working tree. Its effective brief is `units/cl3-brief-3.md` (a delta over
`units/cl3-brief-2.md`, which stays in force beneath it); `units/cl3-report.md` is the deviation
stop the unit made under brief 2 (the code family's token carried Bootstrap's pink while the
calibration record reads Elements' code as the body text on a 12 % tint), and brief 3 rules it:
`--vn-text-code` resolves to the body text, a new `--vn-surface-code` token joins the theme
closure with its registry leaf, proof, and guide row, and the token files are granted for that
alone. The report says every gate exited 0 on both browsers and every proof ran red then green,
and it names three calibration limits it could not close inside its grant:

- `address` and `dd` read the record's muted text (`--color-text-muted` in Elements: light
  `oklch(0.446 0.043 257.281)`, dark `oklch(0.704 0.04 256.788)`); Veneer has no muted text
  token (`--vn-text-secondary` is body text at 75 % alpha). They ship with inherited text.
- The linked anchor's colours read the record's values; Veneer's link tokens differ
  (`--vn-link-rgb` `8, 65, 234` light). The partial binds the tokens; equality with the record
  is not proven.
- `pre`, `samp`, and `var` read a raised surface in the record (`--color-surface-raised`);
  Veneer's `--vn-surface-raised` differs slightly and was not granted. They ship transparent.

Ruled (the last entry of `plan.md`): the link colours are CL6's (the links unit retunes the
link map); the muted text and the raised surface are a token gap of the code family's class,
closed by an added unit CL3b, a full unit with its own brief, scope read, audit, and landing, on
Opus after CL3 lands and before CL4: a `--vn-text-muted` token with theme maps, closure,
`text.muted` leaf, proof, and guide row; the `--vn-surface-raised` retune to the record; the
rebinding of `_address.scss`, `_dl.scss`, `_pre.scss`, `_samp.scss`, and `_var.scss` with their
proofs. CL3 lands with the limits recorded in its report and claims; no CL3 file is edited for
them. The `b` tag is not landed (CL4 carries it, `units/cl4-brief.md`). The claims file for
CL3's round 1 is `cl3-audit-claims.md` (launch copy `TMP/audit/cl3-audit-claims.md`) and states
the rulings.

**Round 1 is reconciled (`cl3-audit-verdict.md`): fix round.** The Astra analyst (subjective)
and the Opus reviewer (objective) confirmed every claim; the checker and the verifier did not
run, because a user message typed into the session while their workflow ran was relayed into
both subagents as a superseding instruction (their returns are retained as
`units/lane-cl3-checker.md` and `units/lane-cl3-verifier.md`); round 2 runs all four lanes. The
fix brief is `units/cl3-brief-4.md` (the shell's `main` id and its fragment proof; one mixin for
the code family's shared text treatment; the mirrored proofs' case tables moved into
`tests/setupStyles.ts` with its inventory; the `console.log` residue deleted; the unlayered
important plant in the reset proof). Carried: `_var.scss`'s literal mono stack and `_pre.scss`'s
untokenized line height to CL3b; the anchor's `--vn-link-*` binding versus the `--bs-*` aliases
to CL6.

**Brief 4 returned (`units/cl3-report-3.md`, thread `01a0c3c0-f6f7-71b2-9490-78058c00893f`,
exit 0, about 35 minutes):** every finding closed inside the owned files, every gate green on
both browsers; the fix also moved `BUTTON_BARE_VALUES` from `button.test.ts` into the setup
module under the same table rule. The round-2 evidence is rendered (`units/cl3-diff-2.patch.txt`,
`units/cl3-status-2.txt`) and the claims are written (`cl3-audit-claims-2.md`).

**Round 2 is reconciled (`cl3-audit-verdict.md` § Round 2): fix round.** All four lanes ran;
every carried fix is confirmed and the verifier reports every gate green on both browsers. One
rule-compliance finding forces round 3: `_sub.scss` and `_sup.scss` share a script-text block
that belongs in a mixin. Carried out of the unit: the `surface-code` theme-map key to CL3b; the
heading letter-spacing row and the shell's document-global `main` id to CL5.

**Brief 5 is running on Astra at the end of the last session**: `units/cl3-brief-5.md` (the
script-text mixin, the duplicate `text-size-adjust` dropped from `_body.scss`, and a sweep of
every partial for any other shared block), launched by `TMP/codex/cl3-4.sh` (journal
`TMP/codex/cl3-4.jsonl`, thread `01a0c3d8-ba0e-7661-a6ad-7d51fcca2e0c`; `exit=` appears in
`TMP/codex/cl3-4.err` when it ends; a small fix exec has taken 20 to 35 minutes). Its report is
`C:/Users/mikes/WebstormProjects/veneer/tmp/units/cl3-report-4.md`, its last message
`TMP/codex/cl3-4-last.md`. The round-3 kit is derived and on disk:
`TMP/units/cl3-audit-3-reviewer-brief.md`, `TMP/units/cl3-audit-3-checker-brief.md`,
`TMP/codex/cl3-audit-3-analyst.sh` with its watch, and `units/cl3-audit-3-wf.js`, all naming
`cl3-audit-claims-3.md`, `cl3-diff-3.patch`, `cl3-status-3.txt`, `units/cl3-brief-5.md`, and
`units/cl3-report-4.md`.

## What to do first: close CL3

1. Run `ps -eo pid,comm | grep -i codex`; while a `codex` process is live, brief 5 is still
   running: wait for `exit=` in `TMP/codex/cl3-4.err` rather than relaunching. If the exec died
   without an exit line, judge the tree by the report's presence and the owned files' mtimes
   (`.agents/orchestration.md` § Reading liveness) and relaunch by copying `TMP/codex/cl3-4.sh`
   to `cl3-5.sh` with the same brief.
2. Retain the report as `units/cl3-report-4.md` with a header naming the journal and thread.
   Render round 3's evidence: `bash units/render-cl3.sh -3` writes `TMP/audit/cl3-diff-3.patch`
   and `TMP/audit/cl3-status-3.txt`; copy them to `units/cl3-diff-3.patch.txt` and
   `units/cl3-status-3.txt`. Write `TMP/audit/cl3-audit-claims-3.md` in the shape of
   `cl3-audit-claims-2.md` (one claim per carried finding, one for the sweep's result, and the
   `[mechanical]` scope, law, and gates claim); copy it to `cl3-audit-claims-3.md`.
3. Launch round 3's four lanes together, blind to each other: `bash TMP/codex/cl3-audit-3-analyst.sh`
   as a background command with a Monitor on `bash TMP/codex/cl3-audit-3-analyst-watch.sh` (an
   audit lane has taken 10 to 20 minutes), and
   `Workflow({ scriptPath: 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-audit-3-wf.js' })`
   (a round has taken 5 to 16 minutes). Do not type into the session while a Workflow runs: the
   harness relays a user message into its subagents as a superseding instruction, which is how
   round 1 lost two lanes. If a lane never finished, re-run only that lane (the Workflow with
   `resumeFromRunId`, which replays completed agents from cache).
4. Read the lanes: the analyst from `TMP/codex/cl3-audit-3-analyst-last.md` (retain as
   `units/cl3-audit-3-analyst-report.md` with the journal path and thread id in a header
   comment); the native lanes by `node units/dump-lanes.mjs <runId> cl3-3`, which writes
   `units/lane-cl3-3-reviewer.md`, `-checker.md`, and `-verifier.md` from the agents' role
   files. Append `## Round 3` to `cl3-audit-verdict.md` in the shape of its rounds 1 and 2
   (one table with a column per lane, findings, carried bounds, one terminal line); a lane that
   answered something other than its brief is recorded as not run and re-run alone. A further
   fix round is `TMP/units/cl3-brief-6.md` on Astra, launched by a copy of `TMP/codex/cl3-4.sh`
   with the brief and report names bumped, its kit derived by `sed` from the `TMP/` round-3
   kits (never from the retained copies).
5. On accept: write `TMP/units/cl3-land-message.txt` (shape: `units/cl2-land-message.txt`;
   name the recorded limits and their carriers), run `bash TMP/units/cl3-land.sh` (its
   allowlist carries brief 3's grants and the `src/styles/elements/_*.scss` and
   `tests/src/styles/elements/*.test.ts` globs), retain `TMP/units/cl3-land.log.txt` as
   `units/cl3-land.log.txt`, append the re-baseline entry to `plan.md`, update the memory file,
   run `node units/retention-rewrite.mjs` from the scaffold root, and commit scaffold by
   pathspec with a message file you write under `TMP/units/` (for example
   `TMP/units/cl3-accept-message.txt`, shape: the last scaffold commits, `git log -3`):
   `git add -- .orkestrel/veneer`, `git -c core.hooksPath=/dev/null commit -q -F TMP/units/cl3-accept-message.txt`,
   `git push -q origin main`. Never `git add -A`.

## Then CL3b, then CL4

CL3b (Opus): brief it from the last entry of `plan.md` and brief 3's shape (`units/cl3-brief-3.md`
§ Ruling and § Scope show how a token lands: theme maps in `_tokens.scss`, the closure line in
`_mixins.scss`, the registry leaf in `src/core/constants.ts`, the value proof in
`tests/src/styles/tokens.test.ts`, the guide row), scope-read it, dispatch it with the Agent
tool (`opus`, background), audit it with the Opus reviewer subjective and the Astra analyst
objective (Opus wrote it), land it with a `TMP/units/cl3b-land.sh` derived from
`TMP/units/cl2-land.sh`.

CL4 (Astra): `units/cl4-brief.md` is drafted with the placeholder `CL3_LANDING_SHA` (replace it
with CL3b's landing, the tree CL4 starts from); its terrain is `units/cl4-scout-report.md`
(Grok, every `reboot` inventory selector by family with its owner and guard verdict). Steps:
`sed -i 's/CL3_LANDING_SHA/<sha>/' TMP/units/cl4-brief.md`; scope-read it (§ How every unit
runs, step 1); fold the readings and amendments into `TMP/units/cl4-brief-2.md`; stage it into
`C:/Users/mikes/WebstormProjects/veneer/tmp/units/` and verify with `diff -q`; derive
`TMP/codex/cl4.sh` and `cl4-watch.sh` from `TMP/codex/cl3-2.sh` and `cl3-2-watch.sh` (the
launcher's prompt names the brief and the report path); launch as a background command with a
Monitor; derive the audit kit from the `TMP/` copies (the `TMP/units/cl3-audit-*` briefs,
`TMP/codex/cl3-audit-analyst.sh` and its watch, `TMP/units/cl3-gate-brief.md`,
`TMP/units/cl3-land.sh`) and from `units/cl3-audit-wf.js` and `units/render-cl3.sh` (replace the
base `9f5ffda` with the tree CL4 starts from), with the owned set from the brief. CL4 lands the
`b` tag, the form, table, media, and interactive partials, the `reboot` Compatibility row as
`shipped`, `listed` growing to `['btn', 'reboot']`, and the `Excluded` rows.

After CL4: CL5 to CL13 per `content-layout-design-verdict.md` § Units (routing ledger there).
Brief each from the design row, the planner's criteria (`units/content-layout-design-planner-report.md`),
and the analyst's unit (`units/content-layout-design-analyst-report.md`); scope-read first. CL13
reuses the U7f portfolio shape (`u7f-verdict.md`, `units/u7f-harness-3.mjs`, `units/u7f-recapture.sh`).

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

## Memory

The auto-memory index `C:/Users/mikes/.claude/projects/C--Users-mikes-WebstormProjects-scaffold/memory/MEMORY.md`
points at `veneer-campaign-state.md` (the campaign state), `codex-bench-dark.md` (routing),
`codex-exec-sandbox-facts.md`, `desktop-harness-facts.md`, `brief-scope-derivation.md`,
`implementation-over-prose.md`, and the other standing rulings. Update
`veneer-campaign-state.md` at every landing.
