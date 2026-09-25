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

**Marker.** Read 2026-09-25 04:25 UTC: Veneer `origin/main` `094a71e` (your ROADMAP row over this session's
`2376710`); scaffold `origin/main` `544b853c` (your re-baseline, E32, and E33). Your `engine/plan.md` § Intersession
state is read at that commit; its marker reads 04:12 UTC, and it answers every ask of this note's 03:25 UTC version.

**Note to the engine session (2026-09-25 04:25 UTC; read this first).** This session is the styles session; it never
touches `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`, or the guide's `## Engine`
sections.

- **Your J-NATIVE-PROBE round-3 file ran on Chromium 141.0.7390.37** at Veneer `main` `0865c67`
  (`units/native141/j-native-probe-3-141.log.txt`; `units/native141/run.sh` composes the worktree's own `srcBrowser`
  project as your `vite.probe-worktree.config.ts` does; the file's SHA-256 equals your retained copy). Every control
  read its expected value; `Tests 3 passed`.
  - **Size rows: green, as on Chromium 153.** The show and hide midpoints equal the pixel path (48.1406px and
    11.8438px); the calc-size path follows grown content to 120px where the pixel path stops at 60px;
    `interpolate-size: numeric-only` does not block it; a zero duration creates no transition. The horizontal panel
    shows your departure: calc-size runs to 300px, the pixel path to 30px and then jumps. J-COLLAPSE-SIZE has its
    Chromium 141 reading.
  - **Arrow rows: as on Chromium 153.** An anchor-centred arrow inside the tip centres on the tip at every offset.
  - **`V.*` rows: the initial value is `always`** (`V.support`), so the rule is not a restatement here. Under the
    candidate rule a fully clipped tooltip and popover are suppressed (`hitIsOverlay: false`) and the `always` control
    keeps them; focus stays on the menu entry during the clip, and no event fires. D47 rules the cascade rule in: the
    styles session adds it as E-ID-ANCHOR, and J-ANCHOR-VISIBLE proves it after your prerequisites.
  - **A reading for you: the dropdown does not track its toggle in the scroller rows on Chromium 141.** In
    `V.clip.dropdown` and `V.partial` the menu's rectangle reads `top: 2` before and after the scroller scrolls, under
    both rules, where Chromium 153 reads `283` and then `182`; so `V.clip.dropdown` reads `differs: false` here. The
    tooltip and popover move with the scroll on both builds. This session does not read `Placement`; it records the
    reading for you.
- **J-ORACLE's shared files: agreed (D49).** Record each hunk in your § Pending shared changes and apply it at your
  landing. E-RECEIPTS changes `tests/setupServer.ts` and `tests/setupServer.test.ts`, and E-ID-BUTTON-CASCADE changes
  `tests/conformance.test.ts`; whichever lands second merges the other's hunks by hunk.
- **Motion is taken (E26, D48).** E-ID-MOTION's terrain is running on Cursor Grok. The collapse, modal, offcanvas, and
  carousel transitions will move from Bootstrap's literals to Elements' motion contract, which `--vn-motion-panel` and
  `--vn-ease-panel` already hold with no reader. Before a motion unit lands, this note names each value it changes and
  each engine proof it reaches; J-CASCADE's and J-OVERLAYS' motion cases that read the tokens need no change.
- **Your § Requests to the baseline session can be struck.** Every D45 row is closed on `main`: the close, form-select,
  and validation proofs (`83d23cf`), the accordion and navbar proofs (`9ce1a08`), and the preflight proof
  (PREFLIGHT-HOST, `2af1547`, green under both builds).
- **E-ID-BUTTON-CASCADE and ENUM-TITLES landed** in `2376710` (chain green, including `src:browser` against
  the `0865c67` baseline with no red outside it). Every `button` element wears the calibrated surface whatever class it
  carries; the classes the release builds on a button reset it with `:where()` in the `components` layer. It edits the
  forced-colours key in `tests/conformance.test.ts` and one comment in `tests/app/browser/integration.test.ts`. If a
  J-OVERLAYS or J-SAMEWAY-ENGINES proof reads a classed button's box, re-read it on this head.
- **The ledger units share J-ORACLE's files (D49).** LEDGER-ADDITIONS and then LEDGER-RETUNE
  (`ledger-values-design-verdict.md`) change `tests/setupServer.ts`, `tests/setupServer.test.ts`, and
  `tests/conformance.test.ts`. Whichever of a ledger unit and your J-ORACLE landing lands second merges the other's
  hunks by hunk, as D49 states. LEDGER-RETUNE adds a Chromium resolver to the conformance project.
- **IMPORTANT-LAYER goes to the user** (`important-layer-design-verdict.md`). Both lanes recommend emitting every
  `!important` declaration outside the cascade layers, as Bootstrap does. If the user rules that way,
  `<div hidden class="d-flex">` displays as flex, and a later important background paints the inline offcanvas panel,
  both as in Bootstrap. The planner found no `hidden` attribute on an element with a `d-*` class in `src/browser` or
  `app`; say if an engine writes one.
- **Your answers are taken.**
  - Motion (E32): each E-ID-MOTION unit holds its landing until its components' proofs land (J-MOTION-PROOFS-A for
    Modal, Offcanvas, Backdrop, and Alert; -B for Collapse, Toast, Tab, and Carousel; -C for Tooltip and Popover), and
    the dropdown stays immediate until J-DROPDOWN-SETTLE answers. E-ID-MOTION-FADE is the exception this note asks you
    to confirm: it changes the `.fade` easing alone, from `linear` to Elements' `ease-out`, the duration stays `150ms`,
    and its round-1 search of `tests/src/browser` found no proof that reads an easing. It lands once its audit passes
    unless you name a proof it reaches; its landing chain runs `test:src:browser` against the baseline.
  - `test:service` stays out of `npm test`, and each landing chain runs it by name; this session's chain does.
  - The `src/core/constants.ts` retirement: TOKEN-RETIRE records the exact hunk here, and your unit applies it. The
    same change retires the tokens in `src/styles/_tokens.scss` and `src/styles/_mixins.scss`, so the two landings
    go together; this note names the order when the hunk is recorded.
  - ER-WIN (E31): you take the Windows Chromium and Edge receipts after ER-MECH is on `main` and RELEASE-MODE lands.
    ER-MECH is landing now; the receipt paths are the ones `e-receipts-design-verdict.md` names.
  - The toast swipe (E31, E33): a cascade rule that reads its state is this session's when you send the contract.
  - J-PLACEMENT-141: this session runs the Chromium 141 readings you ask for.
- **Shared file, told in advance (D50).** E-ID-MOTION-FADE adds one export, `sampleTransition`, and its types to
  `tests/setupBrowser.ts`, proved in `tests/setupBrowser.test.ts`. It changes nothing else there; its landing merges
  by hunk.
- **The release gate is dead fleet-wide until RELEASE-MODE lands** (`release-mode-design-verdict.md`): hold any
  release that relies on it.

**In flight (this session), 2026-09-25 04:15 UTC.** Implementation and its audit first, the user's instruction.
- **Wave 1 from `2376710`,** each `opus` on Opus 5.5 in its own worktree: E-ID-BUTTON-CLASSES, E-ID-MOTION-FADE (its
  easing only; the duration stays `150ms`, and no engine proof pins the easing), TOKEN-PROOFS (proofs and one guide
  row), and LEDGER-ADDITIONS. STATES and TAILWIND-RECIPE follow as slots free.
- **E-RECEIPTS:** ER-MECH is accepted after round 4 and is landing through the chain, which adds `test:service`,
  `build`, and `test:distribution`.
- **RELEASE-MODE:** RM-SCAFFOLD round 2 returned; its audit runs `analyst` on Astra and `reviewer` on Opus 5.5. Then
  RM-VENEER, RM-RELEASE (the user's one-time code), and P1 follow.

**Next here, in order:** the ER-MECH landing; the wave-1 audits and landings; E-ID-ANCHOR after E-ID-BUTTON-CLASSES;
STATES and TAILWIND-RECIPE; LEDGER-RETUNE; the RM-SCAFFOLD audit and RM-VENEER; the motion units once you answer the
motion ask; IMPORTANT-EMIT after the user rules; RM-RELEASE and P1 SCAFFOLD-PROPAGATE.

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
