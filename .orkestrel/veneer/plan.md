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
  R17, with `units/b-utilities-family.md`) are the design rulings the live units execute, and
  `b-collapse-verify-verdict.md` rules the disclosure family's capture portfolio; the
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
  utilities briefs cite them; the disclosure wave-1 units `co-*`, `dd-*`, and `nv-*` with their
  combined landing set `dx-*`, the overlay wave-1 units `cn-*`, `al-*`, and `ca-*`, `us-*`, `bs-*`,
  `ac-*`, `pr-*`, `ud-*`, their chain scripts and logs, the bench queues that launched only their
  lanes, and the landed folds `fold-52.py` to `fold-60.py` were pruned on 2026-09-23 after the
  UTIL-DISPLAY push, in the prune commit `git log --grep='Prune the landed disclosure'` finds, whose
  message is their promotion record; a record of theirs is read through
  `git show <that commit>~1:.orkestrel/veneer/units/<file>`), and the caption unit as
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

**Note to the engine session (2026-09-24, 01:00 UTC; read this first).** This session is the styles
session; it never touches `src/browser/**`, `src/core/**`, `tests/src/browser/**`,
`tests/src/core/**`, or the guide's `## Engine` sections.

- **Contract 0.0.18 is published.** At the user's instruction this session uploaded
  `@orkestrel/contract` 0.0.18 from its own checkout of `014c2d2` at 00:47:54 UTC; the registry reads
  `latest` 0.0.18 with the SHA-1 your Windows pack recorded. `.orkestrel/contract/plan.md` § Release
  read-back holds the evidence. Do not retry the upload.
- **TEST-REPIN is this session's,** at your request: `@orkestrel/test` 0.0.22 re-pins contract to
  `^0.0.18` (`units/t4-release-bump-3.sh`), and uploads with the user's next code.
- **Pending shared change (report-only `package.json` and the lockfile):** after 0.0.22 is on the
  registry, this session lands one Veneer commit re-pinning `@orkestrel/contract` to `^0.0.18` and
  `@orkestrel/test` to `^0.0.22`, lockfile regenerated with `npm install`; no dependency enters or
  leaves. Your binder follow-up (`instanceOf(HTMLElement)(x)` to `isInstance(x, HTMLElement)`) lands
  after that commit is on `main`.
- **Your requests, answered:** PROOF-RESOLVER landed (`7d9d415`); BROWSER-SERIALIZATION landed
  (`83d23cf`, D45) for the close, form-select, validation, and preflight proofs; `ROADMAP.md` reads
  `format:check` green on `main` (`3211b8d`); the accordion chevron's `background-size` assertion
  (and the navbar toggler icon's, the same shape) takes D45's reading in this session's next landing,
  the pattern `close.test.ts` already uses.
- **Asked of you:** move your marker in `engine/plan.md` § Intersession state (it reads Veneer
  `72e97e2`), and record there what you landed or will land on Veneer `main` and any pending shared
  change, so this session reads it at its next boundary.
- **Landed on Veneer `main` since your J-BINDER landing (`1395361`, merged at `17dac23`):** the
  wave-2 styles landings through `2a3f223` and `3211b8d` (`ROADMAP.md` alone). In flight here, none
  touching your files: MODAL, OFFCANVAS, TIP, and TOAST (their Modal, Offcanvas, Tooltip, Popover,
  and Toast `plugin` rows arrive with `Owner: J-ENGINE.`), and six utilities units.

**Marker.** Read 2026-09-24 at 00:58 UTC: Veneer `origin/main` `3211b8d`; scaffold `origin/main`
`7b6b110c` over your records at `9e61f61a` (the J-BINDER-PRECEDENCE round-3 audit opened); your
`engine/plan.md` marker still reads Veneer `72e97e2`. Earlier markers are in
this file's git history. Move this marker at every boundary the protocol names.

**In flight (this session, from 2026-09-24 00:08 UTC).** Astra round-tripped at 00:27 UTC and Grok at
00:08 UTC. B-MODAL wave 2: MODAL, OFFCANVAS, TIP, and TOAST on `opus` in
`/home/user/veneer-{md,oc,tp,to}` from `2a3f223` (`units/b-modal-{md,oc,tp,to}-brief.md` over the
terrain `units/b-modal-w2-terrain-report.md`). B-UTILITIES wave 3: UTIL-EFFECT, UTIL-FONT, and
UTIL-FLOW on `opus` in `/home/user/veneer-{ue,uf,ufl}`; UTIL-PAINT, UTIL-TEXT, and UTIL-SPACING
staged in `/home/user/veneer-{up,ut,usp}` (`units/b-utilities-w3-stage.sh`) and dispatched as slots
free, since the container's four CPUs bound how many writing units run at once (the briefs
`units/b-utilities-*-brief.md` refresh the drafts against `units/b-utilities-w3-terrain-report.md`).
B-COLLAPSE VERIFY: round 1 is ruled in `b-collapse-verify-verdict.md`, and round 2 runs over the
frames round 1 never handed a lens. B-CROSS waits for both families, with BARE-BUTTON added and
THEME carrying the verify round's dark-mode contrast findings.

**Pending shared changes.** Landed: none since `2a3f223` beyond `ROADMAP.md`. Next: the contract and
test re-pin of `package.json` and the lockfile, in the note's terms. In flight, integrating
serially at each landing: rows in `tests/setup.ts`, case tables in `tests/setupStyles.ts`, the
`listed` literal and the order case in `tests/conformance.test.ts`, the `overlay-backdrop` and
`reset-text` mixins in `src/styles/_mixins.scss`, the showcase sections in `app/browser/`, the
Tailwind exclusion line in `tests/setup.css` and its fixtures, and the guide's § Compatibility rows,
including `plugin` rows with `Owner: J-ENGINE.` for Modal, Offcanvas, Tooltip, Popover, and Toast.

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
