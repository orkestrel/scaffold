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

**Marker.** Read 2026-09-25 08:25 UTC: Veneer `origin/main` `2f7b4a7` (this session's TOKEN-PROOFS and
TAILWIND-RECIPE landing); scaffold `origin/main` at your `63aedfd9`. Your `engine/plan.md`,
`engine/units/note-to-styles-0725.md`, and `engine/units/host-chromium-153-reading.md` § Fourth standing reading are
read at `63aedfd9`.

**Note to the engine session (2026-09-25 08:25 UTC; read this first).** This session is the styles session; it never
touches `src/browser/**`, `src/core/**`, `tests/src/browser/**`, or `tests/src/core/**`, and in the guide's `## Engine`
sections it writes only the one hunk named under E-ID-MOTION-MODAL.

- **TOKEN-PROOFS and TAILWIND-RECIPE are on `main`** (`3a4043f`, `23b2d0f`, fold `2f7b4a7`). Your ENGINES-B landing
  merges them. J-TAILWIND-PROBE can build on `tests/fixtures/tailwind/preflight.css`.
- **E-ID-MOTION-MODAL and E-ID-MOTION-FACTOR are accepted and integrated** on this session's branch (`d09a7fb`,
  `fac6289`, integration `c3ef630`, and FACTORS-LEDGER `6052e25`, which names § Departures and § Additions in
  § Factors' closing sentence). The landing chain runs after Astra's check of that sentence, then this session
  pushes `main`. **Two hunks land in your files; merge each by hunk:**
  - `guides/veneer.md` `## Engine` Offcanvas: "the fade partial fades the backdrop through its `.fade` rule" becomes
    "the `overlay-backdrop` mixin fades the backdrop over the `--vn-motion-panel` token".
  - `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`: `sweepMotionFactor`, its `TOKEN_NAMES` import, its
    proof, and its export-list entry.
- **Your fourth standing reading is answered by REBOOT-153** (`units/reboot-153-brief.md`, `builder` on Sonnet,
  writing from `6052e25`). The release's map carries only `outline-width`, so both release forms read one outline
  style, and the pressed button's is `none`. `readFormDifferences` will read every outline and border width whose line
  style is `none` or `hidden` at `0px` (`normalizeLineWidths` and `LINE_STYLES` in `tests/setupBrowser.ts`, with a
  pure proof and an export-list entry). This host reads such a width at `0px` already, so no rendered case reads red
  here. **Request:** after REBOOT-153 reaches `main`, read the four button-reboot files and `button.test.ts` on your
  Chromium 153 host, and record the reading in your host file.
- **E-ID-ANCHOR is under audit.** The subjective lane ruled FAIL 4 and 7 with F1 and F2
  (`units/anchor-audit-subjective-verdict.md`): the "shows only while its toggle is visible" sentence overclaims on
  both builds (`V.viewport`, `V.partial`), and the dropdown paint claim is false on Chromium 141 until
  J-PLACEMENT-141-FIX lands. The Astra lane is still running. The fix round states only the computed value on both
  builds and the Chromium 141 limit for the dropdown's paint; your D47 and E29 record the combined
  `:where(.dropdown-menu, .tooltip, .popover)` rule, and the shipped shape is one rule per partial through the
  `anchor-visibility` mixin, on attribution evidence.
- **LEDGER-RETUNE is in round 2** (`ledger-retune-brief-2.md`, `opus`), in `tests/setupServer.ts`,
  `tests/setupServer.test.ts`, and `tests/conformance.test.ts`. It merges your J-ORACLE-RECORD hunks at its landing
  (D49).
- **Standing answers.** Each E-ID-MOTION unit on a waiting engine (collapse, offcanvas, carousel, tooltip, popover,
  toast) holds its landing until your J-MOTION-PROOFS unit for that component lands on `main` (E32, as amended);
  J-MOTION-PROOFS-B's acceptance releases collapse, carousel, and toast here once it is on `main`. TOKEN-RETIRE
  records the `src/core/constants.ts` hunk here for your unit when it runs; it has not run. This session runs the
  Chromium 141 readings you ask for.

**In flight (this session), 2026-09-25 08:25 UTC.** Implementation and its audit first, the user's instruction.
- **Landing:** MODAL and FACTOR (`eid-chain-12.sh` after the FACTORS-LEDGER check on Astra).
- **Writing:** LEDGER-RETUNE round 2 (`opus`) and REBOOT-153 (`builder`).
- **Under audit:** E-ID-ANCHOR (Astra lane running; the subjective lane returned).

**Next here, in order:** the MODAL and FACTOR landing and `main` push; E-ID-MOTION-OFFCANVAS from that landing;
E-ID-ANCHOR's fix round; REBOOT-153's check and landing; LEDGER-RETUNE's audit and landing, regenerating the dialog's
departure rows; the collapse, carousel, and toast motion units after your J-MOTION-PROOFS-B is on `main`; tooltip and
popover after J-MOTION-PROOFS-C; RM-RELEASE with the user's one-time code, then P1 SCAFFOLD-PROPAGATE and the
ER-LINUX receipt; IMPORTANT-EMIT after the user rules.

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
