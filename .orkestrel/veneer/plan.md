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

**Marker.** Read 2026-09-25 07:25 UTC: Veneer `origin/main` `0a0a252` (this session's E-ID-MOTION-REDUCED and
E-ID-BUTTON-CLASSES landing, merged over your J-ORACLE-RECORD `63eabbd`); scaffold `origin/main` at your `cc31dc5b`.
Your `engine/plan.md` and `engine/units/note-to-styles-0725.md` are read at `cc31dc5b` (E35, J-RELEASE-CORE, and
ENGINES-B round 5 touch no styles file).

**Note to the engine session (2026-09-25 07:25 UTC; read this first).** This session is the styles session; it never
touches `src/browser/**`, `src/core/**`, `tests/src/browser/**`, or `tests/src/core/**`, and in the guide's `## Engine`
sections it writes only the one hunk named under E-ID-MOTION-MODAL.

- **E-ID-MOTION-REDUCED and E-ID-BUTTON-CLASSES are on `main`** (`0879800`, `dd5d1b1`, integration `611f381`, fold
  `fd38ef1`, merged over your `63eabbd` as `0a0a252`). The landing chain read every gate green, `src:browser` with
  no red outside the `0865c67` baseline and both journeys at 252 passed
  (`units/eid-landing/logs/eid-chain-10-summary.log.txt`); the merged tree read the whole-tree checks, `test:setup`,
  `test:conformance`, `test:src:styles`, `setup:browser`, and `app:browser` green
  (`units/eid-landing/logs/merge-gates-10.log.txt`). **Your third standing row closes here:** the `.btn` form case of
  `button.test.ts` compares the Veneer map of button-versus-anchor differences with the release's map, read in the
  same browser (`readFormDifferences` in `tests/setupBrowser.ts`), so a default that moves both cascades cancels.
  Read it on your Chromium 153 host at your next landing.
- **J-ORACLE-RECORD merged cleanly** into this session's tree; your `build` renames in `tests/setupServer.ts` and
  `tests/setupServer.test.ts` are kept as you wrote them.
- **E-ID-MOTION-MODAL is in its round 2** (`mmod-audit-verdict.md`). Round 1 moved the dialog to `scale(0.96)` over
  `--vn-motion-panel` on `--vn-ease-panel`, and the host and both backdrops to `--vn-motion-panel` on `--vn-ease-out`
  through the one `overlay-backdrop` mixin; your `Modal`, `Backdrop`, and `Offcanvas` proofs and `npm run test:app`
  read green on it. **One hunk lands in your `## Engine` Offcanvas section:** the paragraph that says "the fade
  partial fades the backdrop through its `.fade` rule" becomes "the `overlay-backdrop` mixin fades the backdrop over
  the `--vn-motion-panel` token", because this unit makes the old sentence false; the panel's `0.3s` wording is
  unchanged, and both audit lanes read the new sentence true. Merge it by hunk. Round 2 touches only its wrap there.
- **LEDGER-RETUNE is writing** from `73326c7` in `tests/setupServer.ts`, `tests/setupServer.test.ts`, and
  `tests/conformance.test.ts`; it merges your J-ORACLE-RECORD hunks at its landing (D49).
- **TOKEN-PROOFS is in round 10** (`token-proofs-brief-10.md`): the last sentences about where an override reaches
  state their conditions, each read in Chromium 141 by an asserted probe (`tkp-instruments/r10/`). No engine file
  changes.
- **TAILWIND-RECIPE is accepted** and lands with TOKEN-PROOFS next. Your J-TAILWIND-PROBE can build on
  `tests/fixtures/tailwind/preflight.css` after it lands; the recipe keeps Tailwind's automatic source detection, and
  the layer order, control variables, and source lines its proofs read move to `tests/setupService.ts`.
- **E-ID-MOTION-FACTOR round 2 is under audit** (`mfac-audit-2-claims.md`). It adds `sweepMotionFactor` to
  `tests/setupBrowser.ts` (the reader, its `TOKEN_NAMES` import, its proof, and its export-list entry only); merge it
  by hunk beside your helpers. Every factor read now stays in `src/styles/_tokens.scss`. Its Tab finding is yours in
  J-MOTION-PROOFS-B, as your note records.
- **E-ID-ANCHOR dispatches from this landing** (`e-id-anchor-brief.md`): `position-visibility: anchors-visible` on the
  promoted dropdown menu, tooltip, and popover in the open popover state, from the Chromium 141 reading you asked for.
- **Standing answers.** Each E-ID-MOTION unit on a waiting engine (collapse, offcanvas, carousel, tooltip, popover,
  toast) holds its landing until your J-MOTION-PROOFS unit for that component lands (E32); MODAL's engines are covered
  by J-MOTION-PROOFS-A. TOKEN-RETIRE records the `src/core/constants.ts` hunk here for your unit when it runs; it has
  not run. This session runs the Chromium 141 readings you ask for.

**In flight (this session), 2026-09-25 07:25 UTC.** Implementation and its audit first, the user's instruction.
- **Writing:** TOKEN-PROOFS round 10 (`builder` on Sonnet), then its check on Astra.
- **Under audit:** E-ID-MOTION-FACTOR round 2 (`analyst` on Astra and `reviewer` on Opus 5.5).
- **Accepted, waiting to land:** TAILWIND-RECIPE (`twr-audit-3-verdict.md`), with TOKEN-PROOFS.
- **Writing:** E-ID-MOTION-MODAL round 2 and LEDGER-RETUNE, each `opus` on Opus 5.5.

**Next here, in order:** one landing for TOKEN-PROOFS and TAILWIND-RECIPE; E-ID-ANCHOR from this landing; the audits of
MODAL round 2, FACTOR round 2, and LEDGER-RETUNE, then their landings, whichever of MODAL and LEDGER-RETUNE lands second
regenerating the dialog's departure rows; E-ID-MOTION-OFFCANVAS after MODAL lands; RM-RELEASE with the user's
one-time code, then P1 SCAFFOLD-PROPAGATE and the ER-LINUX receipt; the remaining motion units as your J-MOTION-PROOFS-B
and C land; IMPORTANT-EMIT after the user rules.

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
