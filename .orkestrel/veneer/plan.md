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

- `f8-design-verdict.md` (amended by `f8c-design-verdict.md`), `b-passive-design-verdict.md`,
  `b-sweep-design-verdict.md`, `b-forms-design-verdict.md`, `b-forms-close-design-verdict.md`
  (the close's units, its rulings R1 to R12, and its exit criterion), `b-forms-label-design-verdict.md`
  (the `form` key's rulings A to L, with D re-baselined by the B-FORMS-LABEL-CASCADE round-2 audit),
  `b-passive-close-design-verdict.md` (the family close's units CLOSE-REGISTRY, CLOSE-MOTION,
  CLOSE-GUIDE, CLOSE-ID, and CLOSE-VERIFY, its rulings R1 to R11, and its exit criterion),
  `b-collapse-design-verdict.md` (the disclosure family's units COLLAPSE, DROPDOWN, NAV, ACCORDION,
  TOGGLES, NAVBAR, and VERIFY under D41, R1 to R19, with `units/b-collapse-family.md`), and
  `b-utilities-design-verdict.md` (UTIL-SPACER, the eight mechanism units, and UTIL-VERIFY, R1 to
  R17, with `units/b-utilities-family.md`) are the design rulings the live units execute; the
  B-MODAL … B-CAROUSEL and B-CROSS design rounds run on their briefs `units/b-modal-design-brief.md`
  and `units/b-cross-design-brief.md` with the terrains `units/b-modal-terrain-report.md` and
  `units/b-cross-terrain-report.md`; `units/j-engine-research-report.md` and
  `units/j-engine-orkestrel-report.md` are the J-ENGINE phase's absorption records. `engine/` is the engine session's folder (D43), `j-engine-session-brief.md` its kickoff brief, and `j-engine-session-prompt.txt` the retained copy of the prompt. `units/decisions-round-2.md` carries the user's rulings D2
  to D13 verbatim and the Orchestrator's rulings from D14 on. `units/b-passive-family.md` and
  `units/b-passive-baseline.md` bind every B unit. `units/b-forms-terrain-report.md`,
  `units/b-forms-close-terrain-report.md`, `units/b-forms-label-terrain-report.md`,
  `units/b-passive-close-terrain-report.md`, `units/f8-terrain-report.md`, and
  `units/f8-terrain-3-report.md` are the terrain records the open briefs point at (the
  `f8-tailwind-intersection.json` measurement was pruned at `dddc59a` and a brief cites it by its
  history path, `git -C /home/user/scaffold show dddc59a~1:.orkestrel/veneer/units/f8-tailwind-intersection.json`); each design round's lane proposals sit beside its
  verdict as `units/<round>-design-<lane>-proposal.md` until the round's last unit lands.
- A live or unlanded unit's brief, report, audit claims, lane briefs, lane verdicts, round verdicts,
  launchers, diffs, status files, plant instruments, and logs sit under `units/` by unit prefix
  (`b-forms-<key>-*` for the writing unit and `bf<letter>-*` for its audit rounds, the close's
  units as `b-forms-close-<unit>-*` with `bfs-*`, `bft-*`, and `bff-*` for their rounds, the label
  units as `b-forms-label-<unit>-*` with `bfw-*` and `bfl-*`, the family close's units as
  `close-<unit>-*` with `cr-*`, `cm-*`, `cg-*`, and `ci-*` (pruned after their landings, with
  the passive carrier units `bpo-*`, `bpp-*`, and `bpog-*` and the landed folds `fold-43.py` to
  `fold-51.py`; the close's design verdict, proposals, and terrain stay while the disclosure and
  utilities briefs cite them), and the caption unit as
  `f7b-*`; the disclosure family's units as `b-collapse-<unit>-*` with `co-*`, `dd-*`, `nv-*`,
  `ac-*`, `tg-*`, and `nb-*`, the utilities family's as `b-utilities-<unit>-*` with `us-*`, `up-*`,
  `ut-*`, `uf-*`, `usp-*`, `ud-*`, `upl-*`, `ufl-*`, and `ue-*`, and the passive carrier units as
  `b-passive-order-*` with `bpo-*`, `b-passive-prose-*` with `bpp-*`, and
  `b-passive-order-guide-*` with `bpog-*`, and the overlay family's units as `b-modal-<unit>-*`
  with `cn-*`, `al-*`, and `ca-*`) until the unit lands on Veneer `main`, and
  the prune commit that follows the landing removes them. A landing's integration edit is retained
  as `units/<unit>-probe-<unit>-integration*.py` with its `units/<unit>-integration.diff` and the
  landing checker's brief and verdict, in the same set.
- The landing instruments: `units/land-unit.sh` (diff3 through `units/resolve-diff3.py`,
  `units/resolve-hunks.py`, and `units/resolve-files-table.py`), `units/sort-inventories.py` (sorted
  literal arrays and the shipped-key Set), `units/regen-portfolio.sh`, each landing's
  `units/verify-<unit>.sh` chain and `units/fold-<n>.py` roadmap fold while that landing is open,
  each landing's `units/<unit>-fast-gates.sh` with its `units/<unit>-landing-gates.log.txt`, and
  `units/codex-queue-2.sh` (the bench launcher queue; each lane launcher under `tmp/codex/` is a
  copy of the retained `units/<unit>-audit-analyst.sh`). A landing whose chain is deferred to a
  later unit's combined chain (a unit red only on a gap the later unit closes) keeps its stopped
  chain log as `units/<unit>-verify-stopped.log.txt` beside the reason.
- `units/x-retention-carry-brief.md` and `units/x-retention-carry-distillate.md` are the carry
  register X-RETENTION reads.
- The Codex bench was dark on quota from 2026-09-23 13:34 UTC to 15:18 UTC, when the user reset
  the limits and a bounded round trip came back (`codex exec --model gpt-6-astra`, thread
  `01a0ced9-1af4-7260-b880-adf089965967`, the answer `ready` in 15 s). Every objective lane
  dispatched in that window ran on Opus 5.5 as `reviewer` told it holds that lane, with a
  `<unit>-audit-objective-brief.md` beside the `analyst` brief it substituted for (the ALERT
  round, dispatched at 15:16, is the last of them); from 15:18 the objective lane is `analyst` on
  Astra again, re-probed at each dispatch.

## The engine session (D43)

From 2026-09-23 the J-ENGINE campaign runs in a second Claude Code session on its own
harness-designated branch in both repositories, per D43 in `units/decisions-round-2.md`. Its
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

**Marker.** Veneer `origin/main` `55ca0cd` (the engine session's rollup fix, J-TYPES rounds 3 and 4 under E7, landed at once over this session's CAROUSEL landing `518faf0`; the `SanitizerConfig` mirror in `src/browser/types.ts` and its guide rows), scaffold `origin/main` `e9899fbc` (the engine session's J-BINDER audit records, the J-ENGINE-SHAPE amendments R1 to R19 in `engine/j-engine-design-verdict.md` § Amendments, `engine/units/j-types-brief-5.md`, E10 and E11), read 2026-09-23 at 18:33 UTC. Previous marker: Veneer `518faf0`, scaffold `19420f51`, read at 18:08 UTC. The engine session's landings on Veneer `main` since the previous marker: `55ca0cd`. This session's branch fast-forwards to `55ca0cd`, where `npm run build:src` reads green (`units/base-build-55ca0cd.log.txt`, exit 0 at 18:34 UTC), so the rollup that was red on `cc8e1c1` at the DOM global `Sanitizer` is repaired and this session's landings resume the full chain. Its decisions read through E11 (E6 no aliases or shims; E7 the sanitizer dictionary; E8 native timers; E9 Orkestrel conventions with Bootstrap's classes and attributes as overridable defaults; E10 `Snapshot` becomes `HostSnapshot` and `isHost` is deleted for `isInstance`; E11 wire events take the `{verb}.vn.{entity}` form, the platform floor is the Chromium family, Elements and Mailbox are the prior art, and the scope is Bootstrap's native set). Its J-ENGINE-SHAPE round amended its design verdict (per-entity `classes`, `attributes`, and `selectors` groups with default tables, R19; the `SanitizerInterface` port with `NativeSanitizer`; `emitEvent` and `resolveOptions`); J-TYPES round 5 carries the contract changes, and J-BINDER round 2 follows it. Its own plan's marker still reads Veneer `30978a8` and scaffold `48f8453d` at `e9899fbc`; its landing message records that its checkout pulled this session's CAROUSEL push and landed the rollup fix over it. J-BINDER is writing in its `veneer-binder` worktree. Its cascade-availability line reads `carousel` absent at `30978a8`; from `518faf0` the `carousel` key is landed with its Carousel `plugin` row (`Owner: J-ENGINE.`), and the engine re-reads that line at its boundary. The engine session's E5 excludes from its landing gate the rows red on its Windows host with Chromium 153; D45 rules that those proofs assert computed geometry and build-independent values, and BROWSER-SERIALIZATION (`builder`, `/home/user/veneer-bs` from `97ac9ab`, verified by `checker`) landed it as `83d23cf` on 2026-09-23 at 17:23 UTC: the close, form-select, and validation style proofs accept every serialization Chromium writes for one computed value, and the preflight service proof compares each move by tag, property, and preflight value, each green here on Chromium 141. The engine session reads those rows on its Chromium 153 host at its next landing and, where green, retires the E5 exclusion for them; a row still red there is a defect this session owns, reported through `engine/decisions.md`. The ALERT landing merges `97ac9ab` before its push. The engine session's records sit under `engine/` (its plan, `engine/decisions.md` with E1
to E4, and its terrain record); its landing on Veneer `main` since the previous marker is `376d84a`
(the removal of `prompt.txt`, E4). Under E4 it works on `main` in both repositories, so every landing
here merges `origin/main` into the session branch before the push and `main` is fast-forwarded from
the merge result. Its in-flight work at this reading: the J-ENGINE design round (`planner` and
`analyst`, blind on `engine/units/j-engine-design-brief.md`), with no writing unit dispatched and no
Veneer file owned; its pending shared changes: none recorded. Move this marker at every boundary the
protocol names.

**In flight (this session).** The disclosure wave landed on Veneer `main` as `a658879` (DROPDOWN `4476fb0`, NAV `c43fc7b`, COLLAPSE `f3624fc`, the fold `1945ba5`, the merge of `origin/main`), the chain green on that tree. B-COLLAPSE wave 2 (ACCORDION `/home/user/veneer-ac`, TOGGLES `/home/user/veneer-tg`, NAVBAR `/home/user/veneer-nb`) on `opus` from `a658879`. ALERT (accepted, round 2) landing next on the session branch. UTIL-DISPLAY (`/home/user/veneer-ud`)
and UTIL-PLACEMENT (`/home/user/veneer-upl`) on `opus` from `e4e6a40`. ALERT landed as `f31f24c` (on `main` at `30978a8`). CAROUSEL landed as `2071f8f` on the session branch (over three rounds; the landing checker, the fast gates, the regeneration with the R3 caption reading at 390, and the chain green, the `test:config` cross-talk reading re-run alone green; `ca-landing-measurements.txt`). UTIL-DISPLAY round 2 on `opus` (`/home/user/veneer-ud`). UTIL-PLACEMENT round 2 on `opus` (`/home/user/veneer-upl`). TOGGLES returned and in audit round 1 (`analyst` on Astra, `reviewer` on Opus 5.5, `checker`). BROWSER-SERIALIZATION landed as `83d23cf`. CONDITIONS
and UTIL-SPACER landed (`8ca1609`, `746d3e9`). Each unit owns its partial under
`src/styles/`, its proof under `tests/src/styles/`, and its section and section proof under
`app/browser/sections/` and `tests/app/browser/sections/`; each returns a report-only patch over
`tests/setup.ts` (rows appended at the registry's end), `tests/setupStyles.ts`,
`tests/setupStyles.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`,
`tests/app/browser/integration.test.ts`, the showcase wiring under `app/browser/`, and
`guides/veneer.md` (its own section, its rows, and its `plugin` row).

**Requests from the engine session.** Its design verdict (`engine/j-engine-design-verdict.md` § Pending shared changes and requests to the baseline) asks the baseline to extend the conformance Proof resolver beyond Button's recording so a shipped `plugin` row's Proof cell can name a test file; until then a shipped plugin row carries Proof `—` and names its proof in the Obligation cell. Carrier: PROOF-RESOLVER, a `builder` unit on Sonnet after the B-MODAL wave-1 landings, briefed from `tests/setupServer.test.ts`'s resolver and the guide's § Compatibility Proof column; the engine session is told at the next boundary through this record.

**Pending shared changes.** UTIL-PLACEMENT's landing adds a focused-start-control builder to `tests/setupBrowser.ts` (a shared browser fixture the section and style proofs import) and case tables to `tests/setupStyles.ts`; CLOSE-OUT carries a prose sweep of the landed `### Gap utilities` section's bare class tokens and the carousel's hidden-label markup revisit. UTIL-PLACEMENT's landing changes the Tailwind exclusion line in `tests/setup.css`, both fixtures, and both recipe fences (the `start-*` and `end-*` names join it), changes `tests/service/tailwind/consumer.test.ts` so the importance-branch case reads each element on its own name's longhands, and appends its registry rows and the `skip-link-focus` driven row. UTIL-DISPLAY's landing changes the `CaptureStem` type in `tests/setup.ts` so it drops a comma before it hyphenates spaces, as the `buildStem` function does at run time (a subject name with a comma, `Fill, grow, and shrink`, typechecks), with a typed constant and its assertion in `tests/setup.test.ts`; no runtime behaviour changes. The ALERT landing's alert rows and its Alert `plugin` row are on `main` at `30978a8`; CAROUSEL, ACCORDION, TOGGLES, and NAVBAR follow with the same shape (NAVBAR retires the `$assets` map in `src/styles/_tokens.scss` and its `_theme.scss` walk). The disclosure landing's rows and its Collapse, Dropdown, Tab, and ScrollSpy `plugin` rows are on `main` at `a658879`.
In general, `tests/setup.ts` gains `CASCADE_KEYS` rows, `DRIVEN_KEYS` rows, and `CaptureSubject`
members with each landing, append-only at the registry's end. `guides/veneer.md`
gains a `plugin` row with `Owner: J-ENGINE.` for Collapse, Dropdown, Tab, ScrollSpy, Alert, and
Carousel as those families land, and later for Modal, Offcanvas, Tooltip, Popover, and Toast. No
change to `tests/setupBrowser.ts`, to the `package.json` exports map, or to `README.md` is pending.

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
