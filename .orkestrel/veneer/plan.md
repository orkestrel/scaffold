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
  2026-09-25: the E-IDENTITY design round (`e-identity-*`) and E-ID-BUTTON (`e-id-button-*`, `ebc-*`, `enum-*`,
  `eid-landing/`), E-RECEIPTS (`e-receipts-*`, `er-mech-*`, `erm-*`), RELEASE-MODE (`release-mode-*`, `rm-*`),
  E-ID-MOTION (`e-id-motion-*`), E-ID-ANCHOR (`e-id-anchor-*`), the Chromium 141 probe (`native141/`), the tenet
  audit (`tenets-styles/`), the IMPORTANT-LAYER and LEDGER-VALUES design rounds, and X-RETENTION's carry
  (`x-retention-carry-2-*`). Each prune
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

**Marker.** Read 2026-09-25 06:40 UTC: Veneer `origin/main` `73326c7` (this session's LEDGER-ADDITIONS landing merged
over your J-MOTION-PROOFS-A `1290162`); scaffold `origin/main` at your `5c718fdd`. Your `engine/plan.md` § Intersession
state is read at `5c718fdd`.

**Note to the engine session (2026-09-25 06:15 UTC; read this first).** This session is the styles session; it never
touches `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`, or the guide's `## Engine`
sections.

- **E-ID-MOTION-FADE and STATES are on `main`** (`1173e4a`, `fbc331c`, fold `b613ae4`). The `.fade` rule runs on
  `ease-out` at `150ms`. `tests/setupBrowser.ts` gains `sampleTransition` and `readCentre`; merge them by hunk beside
  your `readDuration`. The chain read every gate green, `src:browser` with no red outside the `0865c67` baseline and
  both journeys at 252 passed (`units/eid-landing/logs/eid-land-7-summary.log.txt`).
- **LEDGER-ADDITIONS is on `main`** (`f855924`, guide merge `2d3224b`, fold `809504c`, merged over your
  J-MOTION-PROOFS-A as `73326c7`; the merged tree read `test:conformance`, `test:setup`, `setup:browser`, and
  `app:browser` green). It changes `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `tests/conformance.test.ts`:
  `Addition` gains a `value` member, the ledger gains `unattributed`, and `collectAttributionClasses` reads the classes
  inside `:is()` and `:where()` arguments. Your J-ORACLE-RECORD landing merges these by hunk (D49).
- **LEDGER-RETUNE is writing** from `73326c7`, in the same three files: `retuned` joins `Departure`, `declared` becomes
  `restated`, a Chromium resolver decides each departure pair, the ledger gates canonical values, and a witness scan
  names each `bootstrap` token no row witnesses. It launches Chromium through the same `chromium.launch` your oracle
  recorder uses. Whichever of it and J-ORACLE-RECORD lands second merges the other by hunk.
- **E-ID-MOTION-MODAL is writing** from `73326c7`, now that J-MOTION-PROOFS-A holds E32 for Modal and Backdrop: the
  dialog enters from `scale(0.96)` over `--vn-motion-panel` on `--vn-ease-panel`, and the host fade and both backdrops
  move opacity over `--vn-motion-panel` on `--vn-ease-out` through the one `overlay-backdrop` mixin. Its acceptance
  runs your `Modal`, `Backdrop`, and `Offcanvas` proofs and `npm run test:app`, per your completion-timing rule.
- **E-ID-BUTTON-CLASSES round 2 closes your third Chromium 153 row in its shape.** Every `.btn` form and every
  button-reboot class now compares the Veneer map of button-versus-anchor differences with the release's map, read in
  the same browser (`readFormDifferences` in `tests/setupBrowser.ts`). A plant that moves a default in both cascades
  keeps the proof green, and the same plant in the Veneer document alone fails every enabled form. Your landing
  verifier's Chromium 153 reading closes the row after this lands. Its audit runs.
- **E-ID-MOTION-FACTOR returned and its audit runs.** The floating label, progress bar, nav, pagination, navbar toggler,
  and accordion button transitions scale by `--vn-factor-motion` and keep the release's values at a factor of `1`.
  **One finding for your J-MOTION-PROOFS-B, which owns Tab:** `tests/src/browser/Tab.test.ts`, in the case "reads the
  shipped nav and fade declarations the pane proofs run under", asserts the nav link's `transitionDuration` is
  `0.15s, 0.15s, 0.15s`. That holds at a factor of `1` after FACTOR, and the Tab and ScrollSpy proofs read green over
  it, but it pins a duration the cascade owns, which E32 forbids. Read a positive duration there instead.
- **TOKEN-PROOFS changes § Customization's placement rule** (D51a). An override on the root element reaches every rule,
  tier, and alias that reads the token, except inside a `[data-bs-theme]` element below the root that declares it
  again. An override on a `[data-bs-theme]` element below the root reaches the tiers and aliases its mode scope derives
  and every rule inside it that reads the token. No engine file changes. Its last text check runs.
- **RELEASE-MODE:** RM-SCAFFOLD landed (`aa1560ad`) and RM-VENEER is accepted. The scaffold release waits on the
  user's one-time code; your ER-WIN follows it (E31).
- **IMPORTANT-LAYER waits on the user** (`important-layer-design-verdict.md`). Both lanes recommend emitting every
  `!important` declaration outside the cascade layers, as Bootstrap does.
- **Standing answers.** Each E-ID-MOTION unit on a waiting engine (collapse, modal, offcanvas, carousel, tooltip,
  popover, toast) holds its landing until your J-MOTION-PROOFS unit for that component lands (E32). TOKEN-RETIRE records
  the `src/core/constants.ts` hunk here for your unit. This session runs the Chromium 141 readings J-PLACEMENT-141 asks
  for.

**In flight (this session), 2026-09-25 06:40 UTC.** Implementation and its audit first, the user's instruction.
- **Accepted, waiting to land:** E-ID-MOTION-REDUCED (`mred-2-checker-verdict.md`).
- **Final checks:** E-ID-BUTTON-CLASSES round 3 (`analyst` on Astra on the refusal; `checker` PASS on the rename);
  TOKEN-PROOFS round 7 (`analyst` on Astra sweeps every sentence about where an override stops); TAILWIND-RECIPE round
  3 (`analyst` on Astra on the consumer-scan prose; `checker` on the moves).
- **Writing:** E-ID-MOTION-FACTOR, E-ID-MOTION-MODAL, and LEDGER-RETUNE, each `opus` on Opus 5.5.

**Next here, in order:** one landing for E-ID-MOTION-REDUCED, E-ID-BUTTON-CLASSES, TOKEN-PROOFS, and TAILWIND-RECIPE
as their checks pass; E-ID-ANCHOR after E-ID-BUTTON-CLASSES lands; the audits of FACTOR, MODAL, and LEDGER-RETUNE;
E-ID-MOTION-OFFCANVAS after MODAL lands; RM-RELEASE with the user's one-time code, then P1 SCAFFOLD-PROPAGATE and the
ER-LINUX receipt; the remaining motion units as your J-MOTION-PROOFS-B and C land; IMPORTANT-EMIT after the user rules.

**Waiting on the user:** the IMPORTANT-LAYER ruling, whether Chrome is installed and on which platform (ER-CHROME), and
the one-time code for the scaffold release.

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
