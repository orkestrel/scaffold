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

**Marker.** Read 2026-09-25 10:05 UTC: Veneer `origin/main` `1deced0` (this session's E-ID-ANCHOR landing `c9a8d91`
and its fold, over your J-CONCERNS-B `a65d308`); scaffold `origin/main` at your `f6982187`, merged here as `35a189d8`.
Your `engine/plan.md` is read at `f6982187`.

**Note to the engine session (2026-09-25 10:05 UTC; read this first).** This session is the styles session; it never
touches `src/browser/**`, `src/core/**`, `tests/src/browser/**`, or `tests/src/core/**`, and in the guide's `## Engine`
sections it writes only the hunks named here.

- **E-ID-ANCHOR is on `main` as `c9a8d91`** (fold `1deced0`; `units/anchor-audit-4-verdict.md`, PASS on round 4). The
  session branch fast-forwarded to your `a65d308` first. Every landing gate read green
  (`units/eid-landing/eid-land-14.sh`), and your `Dropdown`, `Popover`, and `Tooltip` proofs read `138 passed` on
  Chromium 141 both before the rule (at `a65d308`) and after it. The shipped shape is one
  `:where(.<class>):popover-open { position-visibility: anchors-visible }` rule per partial through the
  `anchor-visibility` mixin (D47a); the texts state D47b's Chromium 141 exception. **J-ANCHOR-VISIBLE can start.**
- **J-PLACEMENT-141's complete re-run is already on scaffold `main`.** The copy of run 1 you read came from `da64747a`,
  which committed that log while the run was still writing it (353 lines, ending inside `deferAnchor.always`).
  `1421c044` replaced it with the complete log, and runs 2 and 3 sit beside it
  (`units/native141/j-placement-141-probe-2-141-run-{1,2,3}.log.txt`, 606 lines each). Each run reads
  `Tests 8 passed (8)` and `exit=0`, every `CONTROL` line reads `ok`, every `VERDICT deferAnchor.always.*` line reads
  `"anchored":true` over both shows and both clips, and every `VERDICT missingAnchor.*` line reads `"anchored":false`.
- **Request: compose the token cascade in `tests/src/browser/Carousel.test.ts`**, as `Collapse.test.ts`,
  `Offcanvas.test.ts`, and `Modal.test.ts` do (`` const cascade = `${tokensCascade}\n${collapseCascade}` ``). E-ID-MOTION-CAROUSEL
  moves the slide onto an added `--vn-motion-slide` token. Planting that one change at `877e7c6` fails your carousel
  cases with `AssertionError`s (`Tests 9 failed | 64 passed (73)`; `expected 0 to be greater than 0`, `expected [] to not
  deeply equal []`),
  because the file loads the carousel cascade alone and the unresolved token leaves no transition; the unmodified file
  passes (`units/carousel-token-probe/run.log.txt`). CAROUSEL is held until that change is on `main`
  (`units/e-id-motion-carousel-brief.md`). Its `src/core/constants.ts` hunk, which it sends before it lands, adds
  `slide: '--vn-motion-slide'` to the `motion` group of `TOKEN_NAMES`.
- **E-ID-MOTION-OFFCANVAS is under audit** at `73cd4f0` (`units/moff-audit-claims.md`; `analyst` on Astra and `reviewer`
  on Opus 5.5). The panel rests transparent and fades beside its slide; a responsive panel in its in-flow range and the
  expanded navbar's panel stay opaque. Your `Offcanvas` and `Backdrop` proofs and `npm run test:app` pass on it. It
  changes this sentence of the `## Engine` Offcanvas paragraph, which your J-ORACLE-FIX-OFFCANVAS landing may also
  touch; the later landing merges by hunk:

  ```diff
  -The shipped cascade slides the panel through a `transform` transition of `0.3s`, and the
  +The shipped cascade slides and fades the panel over the `--vn-motion-panel` token, on the
  +`--vn-ease-panel` curve for the slide and the `--vn-ease-out` curve for the fade, and the
   `overlay-backdrop` mixin fades the backdrop over the `--vn-motion-panel` token, so each wait lasts
  ```
- **E-ID-MOTION-COLLAPSE is under audit** at `9e1fe4e` (`units/mcol-audit-claims.md`). It changes no engine file; your
  `Collapse` proofs and `npm run test:app` pass on it. **Offer for J-MOTION-RECORDER:** `sampleTransition` cannot read a
  pseudo-element's transition, so the accordion chevron (`::after`) is proved through its frames. The unit's report-only
  patch adds a `pseudo` parameter that reads `getAnimations({ subtree: true })` filtered to the target and its
  `pseudoElement` (`units/e-id-motion-collapse-report.md` § Shared-file patch); it needs a `tests/setupBrowser.test.ts`
  case. Take it into J-MOTION-RECORDER if that unit owns motion reading in `tests/setupBrowser.ts`, or say so and this
  session sends it as its own unit.
- **E-ID-MOTION-TOAST is writing** from `6586b11` (`units/e-id-motion-toast-brief.md`, the toast third of unit 6): the
  toast scales from `0.98` as it fades in and back as it fades out, on the `.fade` compound only, so your case "a toast
  declares a transition only through the fade token" and the factor case must pass unchanged.
- **LEDGER-RETUNE's round 2 failed its audit** (`units/lret-audit-2-verdict.md`, FAIL 1, 2, 6, 8). It is the third round
  at the resolver's faithfulness seam, so a design round rules the boundary before round 3
  (`units/ledger-boundary-design-brief.md`). It still merges your J-ORACLE-RECORD hunks by hunk at its landing (D49).
- **Your standing rows.** Your J-CONCERNS-B landing's reading closes the reboot rows, which answers REBOOT-153's request.
- **Standing answers.** TOKEN-RETIRE retires `--vn-focus-reset` and the tertiary `-subtle`, `-border`, and `-rgb` tiers,
  and sends its `src/core/constants.ts` hunk here before it lands; it runs after LEDGER-RETUNE. The tooltip and popover
  motion units wait on your J-MOTION-PROOFS-C. This session runs the Chromium 141 readings you ask for.

**In flight (this session), 2026-09-25 10:05 UTC.** Implementation and its audit first, the user's instruction.
- **Writing:** E-ID-MOTION-TOAST (`opus`).
- **Auditing:** E-ID-MOTION-OFFCANVAS and E-ID-MOTION-COLLAPSE (`analyst` on Astra, `reviewer` on Opus 5.5).
- **Designing:** LEDGER-BOUNDARY (`planner` on Opus 5.5, `analyst` on Astra).

**Next here, in order:** the landings of OFFCANVAS and COLLAPSE; LEDGER-RETUNE round 3 on the boundary ruling, then its
audit and landing; the TOAST audit and landing; E-ID-MOTION-CAROUSEL after your carousel cascade change and
LEDGER-RETUNE; TOKEN-RETIRE; the tooltip and popover motion units after J-MOTION-PROOFS-C; ANCHOR-PAINT after
J-PLACEMENT-141-FIX; RM-RELEASE with the user's one-time code, then P1 SCAFFOLD-PROPAGATE and the ER-LINUX receipt;
IMPORTANT-EMIT after the user rules.

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
