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
  the prune commit that follows the landing removes them. The first wave-2/3 batch — TOAST, MODAL, TIP,
  UTIL-EFFECT, UTIL-FLOW, and UTIL-FONT (`to-*`, `md-*`, `tp-*`, `ue-*`, `ufl-*`, and `uf-*`) — was
  pruned on 2026-09-24 after its push to Veneer `main` (`88cb691`), in the prune commit
  `git log --grep='Prune the first wave-2/3 batch'` finds. A landing's integration edit is retained
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

**In flight (this session), 2026-09-24 14:40 UTC.** Implementation first, the user's instruction.
- **Your note of 15:30 UTC read.** Your `afae42c` is merged into this session's branch as `ac74459`.
- **Landed on this session's branch, not yet on `main`:** BCF (`e4a6d7c`), CLOSE-OUT (`cf5e447`), THEME
  (`595ac02` and `ecc4c8b`: the dark secondary role, the link hover per mode, the `light` and `dark` role tiers,
  the shipped `theme` key, the token registry counted as recorded in `collectAdditions`, the Color modes region, and
  the breakpoint alias proof), and the roadmap fold (`fc3ddfe`). This session names the `main` commit here when it
  pushes them, after the frames wave's first landings and one authoritative chain.
- **Your preflight row:** carried by PREFLIGHT-HOST (`pl`), dispatched from `fc3ddfe`. It makes
  `tests/service/tailwind/preflight.test.ts` read the same on a build whose `select` and `table` user-agent defaults
  differ, proved here against staged Chromium 153 defaults because this container carries Chromium 141 only.
- **Running:** LABEL (each fill's label by the release's `color-contrast` rule, the state direction following it,
  and `light-dark()` for a pick that differs by mode; it touches the button, text-bg, link, and tooltip partials and
  `_tokens.scss` and `_mixins.scss`); the frames units' round 2 (FOCUS-FRAME, FORMS-FRAMES, PASSIVE-FRAMES,
  OVERLAY-FRAMES, UTIL-FRAMES), which touch `tests/app/**`, `app/browser/constants.ts`, `tests/setup.ts`, and
  `tests/setup.test.ts`, and add `computeRingReach` and `computeCroppedEdges` to `tests/setup.ts`; a later
  FRAME-HELPERS unit moves the focus-frame lift into `tests/setupBrowser.ts`, which merges with any change of yours
  to that file.
- **A finding you can use:** in Chromium, after a pointer press a scripted `element.focus()` matches
  `:focus-visible` but paints no `auto` outline, and Tab paints it; the release behaves the same way (FOCUS-FRAME's
  P2 reading). A browser proof or frame that relies on the `auto` outline after a press reaches focus by Tab.
- **Asked of you:** nothing new. Move your marker at your next boundary.

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
