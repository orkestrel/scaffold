# Veneer execution plan

The executable plan of record is the `ROADMAP.md` file in the Veneer checkout at
`/home/user/veneer`, on branch `claude/inspiring-allen-t4qzv1` of
`https://github.com/mikesaintsg/veneer`, pushed to `main` at every gated landing. Read that file
first. It carries the tenets verbatim, the standing and design rulings, the routing, the standing
host conditions, the exit criterion, the phase queue with its family keys, the carrier register, and
the open decisions. Read the live state from the runs that recompute it (`git log` in each
repository, the conformance run, the gate chain), never from this file.

This folder keeps only what the open units read. Git history archives every closed round, and each
prune commit's message is the promotion record for what that commit removed.

## What the folder holds

- The design verdicts at this folder's root (`f8-design-verdict.md`, `f8c-design-verdict.md`, and the
  `b-*`, `label-contrast-`, and `b-portfolio-verify-` verdicts) are the closed families' rulings;
  X-RETENTION prunes them with the family records `units/b-passive-family.md`,
  `units/b-passive-baseline.md`, `units/b-collapse-family.md`, and `units/b-utilities-family.md`.
  `units/decisions-round-2.md` carries the user's rulings D2 to D13 verbatim and the
  Orchestrator's rulings from D14 on. `units/j-engine-research-report.md` and
  `units/j-engine-orkestrel-report.md` are the J-ENGINE phase's absorption records. `engine/` is the engine session's folder (D43),
  `j-engine-session-brief.md` its kickoff brief, and `j-engine-session-prompt.txt` the retained copy
  of the prompt.
- A live or unlanded unit's brief, report, audit claims, lane briefs, lane verdicts, round verdicts,
  launchers, diffs, status files, instruments, and logs sit under `units/` by unit prefix until the
  unit lands on Veneer `main`, and the prune commit after the landing removes them. Live on
  2026-09-24: APPEARANCE (`ap-color-*`, `apc-*`, `ap-type-*`, `apt-*`, `appearance-*`, and
  `audit-launchers/`), E-IDENTITY (`e-identity-*`), the Chromium 141 and release readings
  (`sanitizer-read/`, `receipts-read/`), and X-RETENTION's carry (`x-retention-carry-2-*`). Each prune
  commit's message is the promotion record for what it removed; read a pruned record with
  `git show <prune commit>~1:.orkestrel/veneer/units/<file>`, and find the commit with
  `git log --grep='Prune'`.
- The landing instruments: `units/land-unit.sh` (diff3 through `units/resolve-diff3.py`,
  `units/resolve-hunks.py`, and `units/resolve-files-table.py`), `units/sort-inventories.py` (sorted
  literal arrays and the shipped-key Set), `units/regen-portfolio.sh`, each landing's
  `units/verify-<unit>.sh` chain and `units/fold-<n>.py` roadmap fold while that landing is open,
  each landing's `units/<unit>-fast-gates.sh` with its `units/<unit>-landing-gates.log.txt`, and
  `units/codex-queue-2.sh` (the bench launcher queue; each lane launcher under `tmp/codex/` is a
  copy of the retained `units/<unit>-audit-analyst.sh`). A landing whose chain is deferred to a
  later unit's combined chain (a unit red only on a gap the later unit closes) keeps its stopped
  chain log as `units/<unit>-verify-stopped.log.txt` beside the reason.
- `units/x-retention-carry-2-brief.md` and `units/x-retention-carry-2-distillate.md` are the carry
  register the wave-2 prune read (GPT-5.6 Luna; the first register pair was superseded and pruned).
- The Codex bench was dark on quota from 2026-09-23 13:34 UTC to 15:18 UTC, when the user reset
  the limits and a bounded round trip came back (`codex exec --model gpt-6-astra`, thread
  `01a0ced9-1af4-7260-b880-adf089965967`, the answer `ready` in 15 s). Every objective lane
  dispatched in that window ran on Opus 5.5 as `reviewer` told it holds that lane, with a
  `<unit>-audit-objective-brief.md` beside the `analyst` brief it substituted for (the ALERT
  round, dispatched at 15:16, is the last of them); from 15:18 the objective lane is `analyst` on
  Astra again, re-probed at each dispatch.

## The engine session (D43)

From 2026-09-23 the J-ENGINE campaign runs in a second Claude Code session (D43 in
`units/decisions-round-2.md`). It works on `main` in both repositories, each unit in its own worktree on a
`unit/<unit>` branch cut from `main` (E4, E14). Its
records live under `engine/` in this folder (`engine/plan.md`, `engine/units/`, and its design
verdicts at that folder's root); this session writes nothing under `engine/`, and the engine
session writes nothing else here. Its kickoff brief is `j-engine-session-brief.md` beside this
file, and the prompt the user pastes into it is `prompt.txt` in the Veneer root (retained here as
`j-engine-session-prompt.txt`). Ownership: the engine session owns `src/browser/**`, `src/core/**`,
`tests/src/browser/**`, `tests/src/core/**`, the guide's engine sections and the `engine` and
`plugin` rows' cells, and `### The engine session` in the roadmap; this session owns the rest and
adds a `plugin` row (status `accepted`, owner J-ENGINE) per landed family. Both sessions treat
`tests/setup.ts`, `tests/setupBrowser.ts`, `package.json`, and `README.md` as report-only until a
landing applies a change. Veneer's `ROADMAP.md` § Protocol › § The engine session is the home of
the reconciliation protocol both sessions follow (the marker, the boundaries at which each session
fetches and reads the other's records, the pending shared changes, the decisions files, the
`plugin` rows, and the marker in every report); § Intersession state in this file carries this
session's side of it.

## Intersession state

**Note to the engine session (2026-09-24 05:10 UTC; read this first).** This session is the styles
session; it never touches `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`,
or the guide's `## Engine` sections.

- **The second batch is on this session's branch, not yet on Veneer `main`.** UTIL-PAINT, OFFCANVAS
  (the `offcanvas` key), UTIL-TEXT, UTIL-SPACING, RESIDUE, BACKGROUND-SIZE, JOURNEY-BUDGET, and
  BARE-BUTTON landed as `07b5342` to `dc92a09`. Their capture run fails, so the batch waits before
  its `main` push.
- **Why it waits: two capture-harness defects, carried by PAGE-FRAME (`pf`).** Every page frame at
  the 1280-wide variants is 1280 by 53410 pixels, 260.8 MiB decoded, which the browser refuses to
  decode in the `readFrame` function; and the `bottom-offcanvas` region at 390 is read at the viewport
  pane, where `30vh` holds, and shot after the capture restages the pane to the document's height. The
  `FrameManager` class in `tests/setupBrowser.ts` is the unit's subject, so a change of yours to that
  file merges with PAGE-FRAME's at landing; J-BINDER round 3's recorder is expected there.
- **Next from this session, in order:** PAGE-FRAME; the second batch's `main` push; RAMP-DOWN
  (accepted); FADE (the `transition` key) and LEDGER; BCF (the disclosure family's capture fixes).
- **A failure on Veneer `main` for you (read 2026-09-24 10:50 UTC).** The case "flips to the opposite
  side when the preferred side overflows, and tries the listed fallbacks instead when given" in
  `tests/src/browser/Placement.test.ts` fails at `7e96cf8`, run alone on a clean worktree of `main` in
  this container: `expected [ 986, false, true ] to deeply equal [ 896, true, true ]`. This session's
  merge of `main` (`84908de` on its branch) carries the same reading and changes no engine file, so the
  failure is `main`'s; this session does not touch `tests/src/browser/**`, and records it here.
- **`main` merged into this session's branch as `84908de`.** The § Compatibility table conflicted and
  resolved row by row, with your re-padded rows and changed plugin cells kept.
- **Your `e24e2c3`, read and kept.**
- **Asked of you:** move your marker in `engine/plan.md` at your next boundary.

**Marker.** Read 2026-09-24 05:10 UTC: Veneer `origin/main` `88cb691`; scaffold `origin/main`
`9cbe3248` (your W2 retention), merged into this session's branch. Your `engine/plan.md` note reads
Veneer `88cb691` and names the W2 wave in worktrees cut from `e24e2c3`.

**Bench record (2026-09-24).** The Opus 5.5 bench went dark at about 05:49 UTC on the account's
weekly usage limit, which stopped PAGE-FRAME, BCF, and FADE round 3 mid-work; the container then
restarted. At 10:39 UTC a bounded round trip came back from each bench (a native `opus` subagent and a
`codex exec` on `gpt-6-astra`, thread `01a0d300-5e17-70c1-898a-928052bbb16c`), and the three units
resumed in their worktrees with their contexts intact. LEDGER landed as `51f002e` and RAMP-DOWN as
`015fc90` on this session's branch.

**In flight (this session), 2026-09-25 01:40 UTC.** Implementation first, the user's instruction.
- **Veneer `main` is `dbc7e0f`**, pushed: E-ID-RECORD `6c26b14`, E-ID-LAYOUT `dd4300a`, E-ID-CODE `4edb3c6`, E-ID-FLOW
  `b4825e0`, J-FIXTURES `e07b3a6`, the roadmap fold, and this session's merge of your J-SNAPSHOT-SHARED (`6dd5034`).
  The landing chain over `6d27028` read format, lint, types, and build green; styles 1495, setup 321, conformance 26,
  guides, policy 109 with 1 skipped, `app:browser` 223, `setup:browser` 88, and the journey 252 with capture and 252
  without. The merge over your landing read format, lint, types, conformance, guides, policy, `src:browser` 926 with 2
  skipped, and `setup:browser` 88 green (`units/eid-landing/`). The landings change `src/styles/**`,
  `tests/src/styles/**`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `app/browser/constants.ts`,
  `tests/app/browser/sections/ContentSection.test.ts`, and the guide's style rows; J-FIXTURES changes the three lookups
  and adds `requireMatch`, `MatchMessages`, and `SAMPLE_MESSAGES` in `tests/setupBrowser.ts` and its test.
- **Your fixture-lookups row closes:** J-FIXTURES landed as `e07b3a6` (`units/jf-audit-2-verdict.md`); the roadmap's
  row reads closed.
- **In flight here:** E-ID-FLOW-2 (Bootstrap's reboot margins on `dl`, `pre`, `hr`, and `figure`) and
  E-ID-BUTTON-CASCADE (`e-id-button-design-verdict.md`: the button surface sits on the `button` tag whatever class it
  carries, and each class the release builds on a button, among them `.btn-close`, `.navbar-toggler`,
  `.accordion-button`, `.dropdown-item`, `.nav-link`, `.list-group-item`, `.page-link`, and the carousel controls and
  indicators, resets it on its button form at zero specificity in the `components` layer), both from `e07b3a6`. They
  change `src/styles/**`, the matching style and app tests, the setup style tables, and the guide, and no engine file.
  E-ID-BUTTON-CLASSES follows CASCADE.
- **Motion:** still with the user; neither session changes motion before the ruling.
- **Next here:** E-RECEIPTS and P1 SCAFFOLD-PROPAGATE. E-VUE waits on the user's ruling.

## Landing procedure

Before every landing, `git fetch origin main` and merge `origin/main` into the session branch (a
merge commit, never a rebase of pushed history), because the engine session lands on `main` too;
re-run the fast gates on the merge result, and resolve a conflict in `guides/veneer.md` or
`ROADMAP.md` in favour of the session that owns the section or row. A non-fast-forward push of
`main` means the engine session landed first: merge again, re-run, push again.


Run `units/land-unit.sh` (the worktree commits on `unit/<u>` and cherry-picks onto the session
branch; a conflict takes `git merge-file --diff3` and `units/resolve-diff3.py`), then
`units/sort-inventories.py`, the unit's integration edits, and the ledger merge; then the
verification sequence (the refresh loop, the portfolio regeneration per variant with the plain
journey, the authoritative chain); then the roadmap fold, the push of the session branch, and the
push to `main` after the chain is green. The regeneration precedes the chain because the portfolio
guard requires every registered frame whenever any frame is present. F8c lands as one squashed
commit from `unit/f8b` (`commit-tree` over the worktree's tree with parent `0783b2b`, tagged
`land/f8c`), cherry-picked the same way.

## Process corrections (2026-09-23, the conventions audit)

- A fix round runs both lanes on its claims file (`analyst` on Astra and `reviewer` on Opus, blind),
  at least one on an engine that did not write the round; a single-lane fix audit is a deviation.
- The landing chain is the verifier's evidence, never a lane claim: a claims file carries no "Gates"
  claim; a lane runs the scoped command it can run and reports its exit code as evidence for the
  claim that names it.
- A reviewer lane's targets are numbered claims in the round's shared claims file, never a
  "beyond the claims" paragraph in the lane brief.
- A brief's Evidence and Measurements rows paste the command and its output; a derivation is an
  Unknown the unit measures first.
- A file sits in one Scope row: Shared means the unit returns a patch, so a shared file is not also
  off-limits.
- A retained artifact names retained paths in full (`/home/user/scaffold/.orkestrel/veneer/units/…`);
  the journal and last-message paths stay under `tmp/codex/` as the launch record.
- The round verdict's terminal line keeps the fixed shape; referral routing and settlements sit in
  the body. A round accepts on a PASS terminal line after reconciliation drops the claims-file
  faults on the record; a FAIL that stands needs a fix round.
- An Orchestrator ruling appended to a lane's returned verdict is a defect: the ruling goes to the
  round verdict file, and the lane file stays as returned.
- A claims file states the rules' requirements and nothing beyond them: the 100-column bar on prose
  and comments is not a house gate (oxfmt preserves prose wrap and does not reflow comments, base
  lines exceed it, and no rule states it), so it leaves the claims files; a rewrap rides a round
  that already edits the paragraph and never opens a round by itself.
- A claims file or lane brief that cites a pruned record names it by its history path
  (`git -C /home/user/scaffold show <prune-commit>~1:.orkestrel/veneer/units/<file>`), never by the
  working-tree path the prune removed; a lane cannot check a citation that resolves to nothing.
