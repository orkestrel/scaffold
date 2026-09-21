# Veneer campaign handoff

Written 2026-09-21 for the next Claude Code session on this machine. Read this file, then
`plan.md` (its re-baseline record at the foot), then the latest verdict named under § State,
before dispatching anything. The law is unchanged: `AGENTS.md`, `.agents/orchestration.md`, and
`.claude/rules/*.md` in the scaffold checkout, read before every dispatch. Every path here is
relative to `C:/Users/mikes/WebstormProjects/scaffold` unless it names the Veneer checkout
`C:/Users/mikes/WebstormProjects/veneer`. This file is excluded from `units/retention-rewrite.mjs`
on purpose: the launch copies it names live under the scaffold checkout's ignored `TMP/`
folder, spelled here as `TMP/` to keep the rewriter off them; read `TMP/` as the literal
lowercase `tmp/` directory at the scaffold root.

## The campaign in one paragraph

Veneer is `@orkestrel/veneer`, a Bootstrap-compatible styles package piloting scaffold's styles
environment by hand. The plan is `plan.md` and the design tenets `tenets.txt`, both in this
folder. U1 to U7 (the Button family) are closed and landed. The Content/layout family is under
way, designed in `content-layout-design-verdict.md` as units CL0 to CL13 in mechanism order:
CL0 calibration (landed as `research/calibration-content.md`), CL1 the proof contract (landed),
CL2 tokens and breakpoint mixins (landed), CL3 the reset partial and the text Reboot tags
(returned, in audit), CL3b the muted-text and raised-surface tokens (added, see § State), CL4
the remaining Reboot tags flipping the `reboot` key, CL5 typography classes, CL6 links, CL7
containers, CL8 grid and gutters, CL9 tables, CL10 images and figures, CL11 the journey and
helper bounds, CL12 the guide pass, CL13 the portfolio verdict against Elements. Routing: CL1,
CL3, CL4, CL6 to CL9 on Astra (`sol`); CL2, CL3b, CL5, CL10 to CL12 on Opus (`opus`); CL13 the
portfolio verdict lanes. Every unit is scope-read by a checker before dispatch, audited on the
adversarial lanes plus a checker and a verifier, and landed by a script that refuses any file
outside the owned set.

## State at handoff

| Checkout | HEAD | Meaning |
| --- | --- | --- |
| Veneer | `9f5ffda` | CL2 landed and pushed; the working tree carries CL3's uncommitted files (58 paths outside the ignored `tmp/` at the last reading) |
| Scaffold | `6110229a` or later | every record through CL3's round-1 launch retained and pushed; `.orkestrel/veneer/` is the campaign folder |

Landed in Veneer during the last session: CL1 `00a5bdc` (`cl1-audit-verdict.md`, two rounds),
CL2 `9f5ffda` (`cl2-audit-verdict.md`, two rounds). Earlier landings are listed in the memory
file `veneer-campaign-state.md` and in `plan.md`.

**CL3 returned under brief 3 on Astra and is in its round-1 audit.** The unit was a
`codex exec` launched by `TMP/codex/cl3-2.sh` (journal `TMP/codex/cl3-2.jsonl`, thread
`01a0c397-fde9-7752-a904-3d76bff7ba31`, `exit=0` in `TMP/codex/cl3-2.err`). Its report is
retained as `units/cl3-report-2.md`; its owned files are uncommitted in the Veneer working
tree. Its effective brief is `units/cl3-brief-3.md` (a delta over `units/cl3-brief-2.md`, which
stays in force beneath it); `units/cl3-report.md` is the deviation stop the unit made under
brief 2 (the code family's token carried Bootstrap's pink while the calibration record reads
Elements' code as the body text on a 12 % tint), and brief 3 rules it: `--vn-text-code`
resolves to the body text, a new `--vn-surface-code` token joins the theme closure with its
registry leaf, proof, and guide row, and the token files are granted for that alone. The report
says every gate exited 0 on both browsers and every proof ran red then green, and it names
three calibration limits it could not close inside its grant:

- `address` and `dd` read the record's muted text (`--color-text-muted` in Elements: light
  `oklch(0.446 0.043 257.281)`, dark `oklch(0.704 0.04 256.788)`); Veneer has no muted text
  token (`--vn-text-secondary` is body text at 75 % alpha). They ship with inherited text.
- The linked anchor's colours read the record's values; Veneer's link tokens differ
  (`--vn-link-rgb` `8, 65, 234` light). The partial binds the tokens; equality with the record
  is not proven.
- `pre`, `samp`, and `var` read a raised surface in the record (`--color-surface-raised`);
  Veneer's `--vn-surface-raised` differs slightly and was not granted. They ship transparent.

Ruled (recorded in `plan.md`'s last entry): the link colours are CL6's (the links unit retunes
the link map); the muted text and the raised surface are a token gap of the code family's
class, closed by an added unit CL3b on Opus after CL3 lands and before CL4 (a `--vn-text-muted`
token with theme maps, closure, `text.muted` leaf, proof, and guide row; the
`--vn-surface-raised` retune to the record; the rebinding of `_address.scss`, `_dl.scss`,
`_pre.scss`, `_samp.scss`, and `_var.scss` with their proofs). CL3 lands with the limits
recorded. The `b` tag is not landed (CL4 carries it, `units/cl4-brief.md`). The claims file for
CL3's round 1 is `cl3-audit-claims.md` (launch copy `TMP/audit/cl3-audit-claims.md`) and states
the rulings.

**Round 1's four lanes were launched at the end of the last session** and may have finished
while no session was attached:

- The Astra analyst (SUBJECTIVE, because Astra wrote the unit): journal
  `TMP/codex/cl3-audit-analyst.jsonl`, thread `01a0c3b5-3583-7b80-807a-b2b71c1a6606`; its
  verdict is `TMP/codex/cl3-audit-analyst-last.md` once `TMP/codex/cl3-audit-analyst.err`
  carries an `exit=` line.
- Workflow run `wf_f704f705-60e`: the Opus reviewer (OBJECTIVE), the checker, the verifier over
  `TMP/units/cl3-gate-brief.md`. Its journal lives under the old session's folder; the dump
  script finds it by run id.

## What to do first: close CL3

1. Run `ps -eo pid,comm | grep -i codex` and expect nothing; if a `codex` process is live, the
   analyst lane is still running: wait for the `exit=` line rather than relaunching.
2. Read the lanes from disk: `cat TMP/codex/cl3-audit-analyst-last.md`, then
   `node units/dump-lanes.mjs wf_f704f705-60e cl3` and rename the dumps by content
   (`Step | Command | Exit` is the verifier, `Lane held` opens the reviewer, the rest is the
   checker) to `units/lane-cl3-{reviewer,checker,verifier}.md`, fixing the `label unknown`
   header. Retain the analyst's verdict as `units/cl3-audit-analyst-report.md` with a header
   comment naming the journal path and thread id. If a lane never finished (no `exit=` line,
   or fewer than three `result` rows), re-run only that lane: the analyst by
   `bash TMP/codex/cl3-audit-analyst.sh` as a background command with a Monitor on
   `bash TMP/codex/cl3-audit-analyst-watch.sh`; the native lanes by
   `Workflow({ scriptPath: '<absolute path of units/cl3-audit-wf.js>', resumeFromRunId: 'wf_f704f705-60e' })`
   (completed agents replay from cache; the script's briefs are the `TMP/units/cl3-audit-*`
   and `TMP/units/cl3-gate-brief.md` launch copies, present on disk).
3. Reconcile into `cl3-audit-verdict.md` (shape: `cl2-audit-verdict.md`): a claim table per
   lane over `cl3-audit-claims.md`, findings, carried bounds, one terminal line. A fix round
   goes back to Astra with `TMP/units/cl3-brief-4.md` (a delta brief), launched by a copy of
   `TMP/codex/cl3-2.sh` with the brief and report names bumped and a copy of
   `TMP/codex/cl3-2-watch.sh`, then audited again with `-2` kits (derive them from the round-1
   kits with `sed`, as `units/cl2-audit-2-*` were), with the claims in
   `TMP/audit/cl3-audit-claims-2.md` and the evidence from `bash units/render-cl3.sh -2`.
4. On accept: write `TMP/units/cl3-land-message.txt` (shape: `units/cl2-land-message.txt`;
   name the recorded limits and their carriers), run `bash TMP/units/cl3-land.sh` (its
   allowlist carries brief 3's grants and the `src/styles/elements/_*.scss` and
   `tests/src/styles/elements/*.test.ts` globs), retain `TMP/units/cl3-land.log.txt` as
   `units/cl3-land.log.txt`, append the re-baseline entry to `plan.md`, update the memory file,
   run `node units/retention-rewrite.mjs` from the scaffold root, and commit by pathspec:
   `git add -- .orkestrel/veneer` then `git -c core.hooksPath=/dev/null commit -q -F <message file>`
   and `git push -q origin main`. Never `git add -A`.

## Then CL3b, then CL4

CL3b (Opus): brief it from `plan.md`'s last entry and brief 3's shape (`units/cl3-brief-3.md`
§ Ruling and § Scope show how a token lands: theme maps in `_tokens.scss`, the closure line in
`_mixins.scss`, the registry leaf in `src/core/constants.ts`, the value proof in
`tests/src/styles/tokens.test.ts`, the guide row), scope-read it, dispatch it with the Agent
tool (`opus`, background), audit it with the Opus reviewer subjective and the Astra analyst
objective (Opus wrote it), land it.

CL4 (Astra): `units/cl4-brief.md` is drafted with the placeholder `CL3_LANDING_SHA` (replace it
with CL3b's landing, the tree CL4 starts from); its terrain is `units/cl4-scout-report.md`
(Grok, every `reboot` inventory selector by family with its owner and guard verdict). Steps:
`sed -i 's/CL3_LANDING_SHA/<sha>/' TMP/units/cl4-brief.md`; write a scope-read brief in the
shape of `units/cl3-scope-read-brief.md` and dispatch a `checker` Agent on `sonnet`; fold its
readings and amendments into `TMP/units/cl4-brief-2.md`; stage it into
`C:/Users/mikes/WebstormProjects/veneer/tmp/units/` and verify with `diff -q`; derive
`TMP/codex/cl4.sh` and `cl4-watch.sh` from `TMP/codex/cl3-2.sh` and `cl3-2-watch.sh` (the
launcher's prompt names the brief and the report path); launch as a background command with a
Monitor; derive the audit kit (the `TMP/units/cl3-audit-*` briefs, `TMP/codex/cl3-audit-analyst.sh`,
`TMP/units/cl3-gate-brief.md`, `units/cl3-audit-wf.js`, `TMP/units/cl3-land.sh`) with the owned
set from the brief. CL4 lands the `b` tag, the form, table, media, and interactive partials,
the `reboot` Compatibility row as `shipped`, `listed` growing to `['btn', 'reboot']`, and the
`Excluded` rows.

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
   scope-read by a `checker` Agent against the live tree before a bench dispatch (CL2's read
   found mixins that did not exist; CL3's found a barrel and a guide row that did not).
2. Stage it into `C:/Users/mikes/WebstormProjects/veneer/tmp/units/` and verify `diff -q`. A
   bench writer opens the staged copy.
3. Launch: a bench unit through `TMP/codex/<unit>[-n].sh` (`timeout 7200 codex exec --json -C
   <veneer> --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"'
   --output-last-message <last.md> "<prompt>" < /dev/null > <journal> 2> <err>; echo
   "exit=$?" >> <err>`) as a background Bash command, with a Monitor over
   `TMP/codex/<unit>-watch.sh`; a native unit through the Agent tool (`opus` for the writer,
   `checker` for a scope read) in the background. Confirm the journal grew past its header.
4. The report returns as the unit's last message and as
   `C:/Users/mikes/WebstormProjects/veneer/tmp/units/<unit>-report[-n].md`; retain it under
   `units/`, with the bench thread id in a header comment.
5. Evidence for read-only lanes: `units/render-<unit>.sh` renders the diff and status into
   `TMP/audit/`; retain both. Claims: `TMP/audit/<unit>-audit-claims[-n].md`, the one authority
   for claim numbers, retained beside the verdict.
6. Lanes: the Opus reviewer and the Astra analyst hold opposite lanes, swapped so the writer's
   engine does not hold the objective lane (after an Astra unit: Opus objective, Astra
   subjective; after an Opus unit: reversed); a checker rules the `[mechanical]` claims; a
   verifier runs the gate brief. The Workflow script names `agentType` and `model` per node.
7. Verdict `<unit>-audit-verdict.md` with one terminal line per round; a fix round is a delta
   brief `<unit>-brief-<n>.md` on the writer's engine, audited by the engine that did not
   write it.
8. Land with `TMP/units/<unit>-land.sh` (refuses any changed file outside ALLOWED; commits by
   pathspec with `-c core.hooksPath=/dev/null -F <message>`; pushes). Retain the log, add the
   plan entry, update memory, `node units/retention-rewrite.mjs`, commit scaffold by pathspec,
   push.

## Instruments (retained under `units/`)

| File | Use |
| --- | --- |
| `retention-rewrite.mjs` | run from the scaffold root before every commit; rewrites `tmp/` paths inside retained copies to their retained names, so a retained launcher points at `units/`, not the launch folder: derive a new launcher from the `TMP/codex/` copy, never from the retained one; this handoff is excluded |
| `dump-lanes.mjs` | `node units/dump-lanes.mjs <runId> <prefix> [journalPath]`; finds the Workflow journal under any session folder of this project; rename the dumps by content afterwards |
| `render-cl3.sh`, `render-cl2.sh` | render a unit's audit evidence into `TMP/audit/`; `render-cl3.sh [suffix]` diffs over `9f5ffda` |
| `cl3-audit-wf.js` (and the `cl1-`, `cl2-` scripts) | the Workflow scripts of the audit rounds, reading the `TMP/units/` briefs; a `-2` script names the `-2` briefs |
| `cl3-land.sh`, `cl2-land.sh`, `cl1-land.sh` | landing scripts with their allowlists (retained copies; the runnable ones are under `TMP/units/`) |
| `cl3-2.sh`, `cl3-2-watch.sh`, `cl3-audit-analyst.sh`, `cl3-audit-analyst-watch.sh` | the bench launchers (paths rewritten in the retained copies; the runnable copies are under `TMP/codex/`) |
| `u7f-harness-3.mjs`, `u7f-recapture.sh` | the Elements capture harness and the recapture that runs last before assembling a portfolio |

The scratchpad of the last session (`C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/8082b48a-b39d-4cfd-ae0c-2f5c853292c4/scratchpad/`)
holds only copies of these and older residue; nothing there is needed.

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

- The `src:styles` project loads the built cascade: rebuild with `npm run build:src:styles`
  after any `.scss` edit before a styles proof is read, or a plant reports green against the
  stale build.
- A heredoc with quotes in Bash on this host fails the shell or the approval classifier; write
  files with the Write tool and run scripts from files.
- Never edit a script while a shell runs it; copy and launch the copy.
- `retention-rewrite.mjs` rewrites every `tmp/` path inside a retained copy, including a watch
  script's journal path and prose that names the launch folder; derive runnable scripts from
  the launch copies, and keep any file that must name the launch folder out of its reach.
- `dump-lanes.mjs` names files by agent id; rename by content, never by the word `Referrals`.
- A bench lane's `-last.md` is the report; its thread id is in the journal's first line.
- The conformance presence scan reads only the guide's Compatibility rows, so bare-tag
  selectors are not scanned until CL4 adds the `reboot` row.
- `RETAINED_COLOR_ALIASES` in `tests/setupStyles.ts` does not pin `--bs-code-color`; the
  presence name lists do.
- Foreground Bash is capped at ten minutes; every bench exec, Workflow, and full gate chain
  runs as a background command.

## Memory

The auto-memory index `C:/Users/mikes/.claude/projects/C--Users-mikes-WebstormProjects-scaffold/memory/MEMORY.md`
points at `veneer-campaign-state.md` (the campaign state), `codex-bench-dark.md` (routing),
`codex-exec-sandbox-facts.md`, `desktop-harness-facts.md`, `brief-scope-derivation.md`,
`implementation-over-prose.md`, and the other standing rulings. Update
`veneer-campaign-state.md` at every landing.
