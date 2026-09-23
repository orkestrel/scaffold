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

**Note to the engine session (2026-09-23, 22:45 UTC; read this first).** What lands on Veneer `main` from this session, as soon as `@orkestrel/test` 0.0.21 is on the registry: UTIL-PLACEMENT (`ac96f81`: the position, sizing, visibility, and visually-hidden keys; a focused-start-control builder in `tests/setupBrowser.ts`, case tables in `tests/setupStyles.ts`, the offset names on the Tailwind exclusion line in `tests/setup.css`, registry rows in `tests/setup.ts`), the width-steps capture edit (`5fb8b41`), NAVBAR (`009b95a`: the navbar key, `tests/setup.ts` rows, the Navbar `plugin` row with `Owner: J-ENGINE.`, the `$assets` map retired from `src/styles/_tokens.scss`, the nav list in `app/browser/constants.ts`), the specimen band (`5d7f3b9`: a bottom padding on a `[data-specimen]` container whose child is the `.viewport` frame, in `app/browser/styles/_shell.scss`; the frame's own box is unchanged), the re-pin of `@orkestrel/test` to `^0.0.21`, and the regenerated capture portfolio. None of it touches `src/browser/**`, `src/core/**`, or the guide's `## Engine` sections. `@orkestrel/test` 0.0.21 (its `main` at `7ce88a8`) ends a clipped descendant at its frame in `measureContent` (the `readClipEdge` and `clipsOverflow` helpers) and keeps `@orkestrel/contract` at `^0.0.17`, at the user's instruction, so this session's styles work does not wait on the contract release. The contract's 0.0.18 re-pin is yours: re-pin Veneer's `@orkestrel/contract` to `^0.0.18` in the same commit that re-pins `@orkestrel/test` to a re-pin release carrying `^0.0.18` (0.0.22), or Veneer installs two contract copies. The test package's re-pin release takes `units/t4-release-bump-2.sh` (it refuses until the registry serves contract 0.0.18, re-pins every `@orkestrel` range to the registry, bumps, and runs `prepublishOnly`), with its version literal moved from 0.0.21 to 0.0.22; say at your boundary which session runs it. Carried to a later `@orkestrel/test` change, with no unit in either session: the test files' local fixture classes and helpers (`units/tm-fixture-population.txt`).

**Resumed on Opus 5.5 (2026-09-23, read at resumption).** Scaffold `origin/main` `07b2ff80` merged: the engine session ran J-BINDER round 3 and opened the contract campaign (`.orkestrel/contract/plan.md`): `@orkestrel/contract` 0.0.18 fixes the `isInstance` narrowing and publishes with the user's one-time code, then Veneer re-pins. Pending shared change and layer order this session binds itself to: `@orkestrel/test` depends on `@orkestrel/contract` at runtime (`^0.0.17`), so contract 0.0.18 obliges test to re-pin, re-run, and republish. The T4 release carries that re-pin when 0.0.18 is on the registry at release time, as `@orkestrel/test` 0.0.21 on `^0.0.18`; when it is not, 0.0.21 ships on `^0.0.17` and a re-pin release follows contract 0.0.18. Veneer's re-pin of `@orkestrel/test` lands in the commit that re-pins contract where both are on the registry, so Veneer never installs two copies of contract; whichever session lands a re-pin second merges `origin/main` and regenerates `package-lock.json` with `npm install`, never by hand. Veneer `origin/main` is `51a8fa0`, unchanged.

**Marker.** (Read again at 21:06 UTC before the handoff to Opus 5.5: Veneer `origin/main` `51a8fa0` unchanged, the session branch at `5fb8b41`; scaffold `origin/main` `f1bd3c05`, the engine session's J-BINDER round-2 audit and round-3 brief merged, its J-TYPES rounds landed on Veneer `main` as `a7d1441` and `f538d48`.) Veneer `origin/main` `51a8fa0` (this session's TOGGLES landing `1adc7af`, the roadmap re-pad `d0c1eff`, and the fold commit, merged with the engine session's landings `a7d1441` and `f538d48` and pushed at 20:28 UTC), scaffold `origin/main` `efc00ef7` (this session's prune, resolvers, and probes over the engine session's J-TYPES round-9 and round-10 records at `e19c58fb`), read 2026-09-23 at 20:28 UTC. Previous marker: Veneer `72e97e2`, scaffold `52d06324`, read at 20:02 UTC. The engine session's landings on Veneer `main` since the previous marker: `a7d1441` (J-TYPES round 5: the `.vn.` wire names typed by entity, the per-entity `classes`, `attributes`, and `selectors` groups, the `SanitizerInterface` port, `HostSnapshot`) and `f538d48` (rounds 6 to 10: the composite selector defaults reduced to their foreign part, the key-language sentences, the renamed `parent`, `descendants`, and `step`, the backdrop pass-through and the offcanvas `fade` token, the scroll lock's class map deleted, the lifetime resize listener, the `dataAttributes` default), each touching `src/browser/types.ts` and the guide's Surface rows and Methods cells only. This session's TOGGLES chain ran on `d0c1eff` before those landings arrived; the merge auto-merged `guides/veneer.md` with no conflict, and the fast gates over the merge commit `51a8fa0` (`units/merge-51a8fa0-gates.log.txt`) are the record that the merged tree reads green. Its pending shared changes at this reading: J-TYPES rounds 5 to 9 rewrite `src/browser/types.ts` and the guide's `## Engine` and § Surface prose (no file this session's units own); J-BINDER round 2 edits the guide's `## Engine` subsections and adds a `ButtonSection` patch; the J-COLLAPSE brief names `tests/setup.ts` and `tests/setupBrowser.ts` as report-only patches, and this session reads those patches at the boundary before its NAVBAR landing, which appends `tests/setup.ts` rows. The J-OFFCANVAS carried finding on the resize listener (`engine/plan.md` § Carried findings) names no Veneer file this session owns. This session answers the engine session's Proof-resolver request at `7d9d415`: a shipped `plugin` row's Proof cell can name a `tests/**.test.ts` file (the `isProofFile` predicate in `tests/setupServer.ts`; a missing file is a conformance finding; a non-plugin row keeps the recording lookup), so a J-ENGINE unit cites its own proof file from the row it owns. The pending shared change this session recorded at the previous marker, the `CaptureStem` type in `tests/setup.ts` dropping a comma before it hyphenates spaces, landed in `47aab1d` and is on `main` at `72e97e2`. Pending shared changes from this session at this reading: TOGGLES landed (`tests/setup.ts` rows, `tests/setupStyles.ts` case tables, the guide's deferral table with the split-toggle rows deleted and its § Dropdown classes prose); UTIL-PLACEMENT adds a focused-start-control builder to `tests/setupBrowser.ts`, case tables to `tests/setupStyles.ts`, the Tailwind exclusion line in `tests/setup.css`, and registry rows; NAVBAR appends `tests/setup.ts` rows and a `plugin` row with `Owner: J-ENGINE.`, retires the `$assets` map in `src/styles/_tokens.scss`, and edits the nav list in `app/browser/constants.ts`.  The engine session's landings on Veneer `main` since the previous marker: `55ca0cd`. This session's branch fast-forwards to `55ca0cd`, where `npm run build:src` reads green (`units/base-build-55ca0cd.log.txt`, exit 0 at 18:34 UTC), so the rollup that was red on `cc8e1c1` at the DOM global `Sanitizer` is repaired and this session's landings resume the full chain. Its decisions read through E11 (E6 no aliases or shims; E7 the sanitizer dictionary; E8 native timers; E9 Orkestrel conventions with Bootstrap's classes and attributes as overridable defaults; E10 `Snapshot` becomes `HostSnapshot` and `isHost` is deleted for `isInstance`; E11 wire events take the `{verb}.vn.{entity}` form, the platform floor is the Chromium family, Elements and Mailbox are the prior art, and the scope is Bootstrap's native set). Its J-ENGINE-SHAPE round amended its design verdict (per-entity `classes`, `attributes`, and `selectors` groups with default tables, R19; the `SanitizerInterface` port with `NativeSanitizer`; `emitEvent` and `resolveOptions`); J-TYPES round 5 carries the contract changes, and J-BINDER round 2 follows it. At scaffold `fb803f0c` (read at 19:05 UTC) the engine session had retained its J-TYPES round-5 checker verdict, briefed J-BINDER round 2, and re-derived the J-COLLAPSE brief, whose scope names `tests/setup.ts` and `tests/setupBrowser.ts` as report-only patches (a pending shared change to read at the next boundary); Veneer `origin/main` was still `55ca0cd`. Its own plan's marker still reads Veneer `30978a8` and scaffold `48f8453d`; its landing message records that its checkout pulled this session's CAROUSEL push and landed the rollup fix over it. J-BINDER is writing in its `veneer-binder` worktree. Its cascade-availability line reads `carousel` absent at `30978a8`; from `518faf0` the `carousel` key is landed with its Carousel `plugin` row (`Owner: J-ENGINE.`), and the engine re-reads that line at its boundary. The engine session's E5 excludes from its landing gate the rows red on its Windows host with Chromium 153; D45 rules that those proofs assert computed geometry and build-independent values, and BROWSER-SERIALIZATION (`builder`, `/home/user/veneer-bs` from `97ac9ab`, verified by `checker`) landed it as `83d23cf` on 2026-09-23 at 17:23 UTC: the close, form-select, and validation style proofs accept every serialization Chromium writes for one computed value, and the preflight service proof compares each move by tag, property, and preflight value, each green here on Chromium 141. The engine session reads those rows on its Chromium 153 host at its next landing and, where green, retires the E5 exclusion for them; a row still red there is a defect this session owns, reported through `engine/decisions.md`. The ALERT landing merges `97ac9ab` before its push. The engine session's records sit under `engine/` (its plan, `engine/decisions.md` with E1
to E4, and its terrain record); its landing on Veneer `main` since the previous marker is `376d84a`
(the removal of `prompt.txt`, E4). Under E4 it works on `main` in both repositories, so every landing
here merges `origin/main` into the session branch before the push and `main` is fast-forwarded from
the merge result. Its in-flight work at this reading: the J-ENGINE design round (`planner` and
`analyst`, blind on `engine/units/j-engine-design-brief.md`), with no writing unit dispatched and no
Veneer file owned; its pending shared changes: none recorded. Move this marker at every boundary the
protocol names.

**In flight (this session).** The disclosure wave landed on Veneer `main` as `a658879` (DROPDOWN `4476fb0`, NAV `c43fc7b`, COLLAPSE `f3624fc`, the fold `1945ba5`, the merge of `origin/main`), the chain green on that tree. B-COLLAPSE wave 2 (ACCORDION `/home/user/veneer-ac`, TOGGLES `/home/user/veneer-tg`, NAVBAR `/home/user/veneer-nb`) on `opus` from `a658879`. TOGGLES round 3 (`units/tg-brief-3.md`, `builder` on Sonnet, after round 2's `units/tg-audit-2-verdict.md`) is accepted (`units/tg-audit-3-verdict.md`) and landed as `1adc7af` on the session branch over `72e97e2` (`units/tg-landing.diff`, `units/tg-resolve.py`, `units/land-seams.py`, and `units/table-merge3.py` for the deferral table, `units/tg-landing-table.txt`; the landing checker `units/tg-landing-checker-verdict.md`; the fast gates `units/tg-fast-gates.log.txt`; the roadmap re-pad `d0c1eff`, `units/tg-format-fix.log.txt`; the chain `units/main-tg-gates.log.txt`). ACCORDION round 2 reconciled PASS (`units/ac-audit-2-verdict.md`: every code claim confirmed in every lane; the report's bare tokens record-only) and landed as `53d3c21` on the session branch over `55ca0cd` with `units/land-seams.py`, the landing checker, and the fast gates green; its verification chain read green, the roadmap folded (`05ff42a`), and PROOF-RESOLVER (accepted) cherry-picked as `7d9d415` under scoped gates; pushed to `main` at 19:19 UTC (the ACCORDION and PROOF-RESOLVER records are pruned; see the inventory). UTIL-DISPLAY round 3 is accepted and landed as `47aab1d` on the session branch over `7d9d415` with `units/land-seams.py`, the landing checker, the fast gates, and the chain green, the seam blank line `d6f4dbe`, and the fold `72e97e2`, pushed to `main` at 20:02 UTC (its records are pruned; see the inventory). UTIL-PLACEMENT round 4 is accepted (`units/upl-audit-4-verdict.md`) and landed as `ac96f81` on the session branch over `51a8fa0` (`units/upl-land.sh`, `units/upl-resolve-2.py`, `units/table-merge3.py`; the landing checker settled by the replay `units/upl-landing-replay.txt`; the load-order edits `units/upl-landing-order.py` and `units/upl-landing-order-2.py`; the chain `units/main-upl-gates.log.txt` green but the journey census), then the capture edit `5fb8b41` (the width-steps floor); the session branch is pushed at `5fb8b41`, `main` stays at `51a8fa0`. The regeneration refuses every page-wide frame because `measureContent` in `@orkestrel/test` 0.0.20 reads a clipped viewport-height placeholder's whole rectangle; T4 TEST-CLIP (`units/t4-test-clip-brief.md`, `-2.md`, `-3.md`, the Orchestrator's own unit in `/home/user/test`, committed on that checkout's branch `claude/inspiring-allen-t4qzv1` as the handoff commit over the 0.0.20 release `936bc4a`) repairs it: rounds 1 and 2 are audited (`units/t4-audit-2-verdict.md`: the clip edge must be read from the selected visual box, round 3's E9), the full chain of the test package reads green on round 2 (`units/t4-full-gates.log.txt`), and the head-start tarball over Veneer settles every frame (`units/t4-headstart-2.log.txt`), leaving the census's flat-fill refusals ruled in `units/upl-landing-capture-note.txt`. At 22:05 UTC (Opus 5.5): NAVBAR landed as `009b95a` and the specimen band as `5d7f3b9` on the Veneer session branch (pushed; `main` stays at `51a8fa0`). The band moved from the frame to the specimen container (`units/upl-landing-frame-band-3.py`): the frame's transparent border (`units/upl-landing-frame-band-2.py`) turned the census green (`units/t4-capture-probe.txt`) but broke the Position section's frame proofs (`units/band-gates.log.txt`); band 3 keeps them green (`units/band-3-gates.log.txt`, the conformance red there a stale `dist/` built before NAVBAR) and its census reading runs in `units/t4-capture-probe-2.sh`. T4 TEST-CLIP is code-complete at round 3 (`7104241`); rounds 4 to 7 corrected its documentation (`units/t4-r4-brief.md` to `units/t4-r7-brief.md`, the Orchestrator's own units, audited by `analyst` on Astra through `units/codex-queue-27.sh` to `units/codex-queue-30.sh`, the last verdict `units/t4-audit-6-analyst-verdict.md` confirming every behavioural claim; round 7 under `checker`). TEST-MATRICES (`units/tm-brief.md`, `builder`) landed as `46336ac` with the Orchestrator's fixes `7911f63`, `bfbb5f4`, and `af1a25e` (`units/tm-fix-brief.md`; audits `units/tm-audit-checker-verdict.md`, `units/tm-audit-analyst-verdict.md`, closed by `units/t4-audit-6-analyst-verdict.md`). Carried to a later `@orkestrel/test` change, with no unit in this campaign: the test files' local fixture classes and helpers (`units/tm-fixture-population.txt`), which `.claude/rules/tests.md` places in the setup modules. The `@orkestrel/test` 0.0.21 visit runs (`units/t4-release-prep.sh`); then `units/t4-release-bump.sh`, the push to the test package's `main`, and the user's one-time code at the upload; then `units/veneer-021.sh` (re-pin, regeneration, the authoritative chain), the portfolio commit, `units/fold-63.py`, the merge of `origin/main`, the push of the branch and `main`, the marker, and the prune. The contract campaign's 0.0.18 is not imminent (its round 3 runs), so 0.0.21 keeps `^0.0.17` and a re-pin release follows 0.0.18. NAVBAR round 2 returned on `opus` (`units/b-collapse-nb-report-2.md`, the three round-2 patches) and is in audit round 2 (`analyst` on Astra through `codex-queue-17.sh`, `reviewer` on Opus 5.5, `checker` returned with its command sub-clauses settled in `units/nb-audit-2-settling.txt`). UTIL-DISPLAY and UTIL-PLACEMENT round 3 returned on `builder` (`units/b-utilities-ud-report-3.md`, `units/b-utilities-upl-report-3.md`) and are in their mechanical audits (`checker` on Sonnet and `analyst` on Astra through `codex-queue-19.sh` and `codex-queue-18.sh`); their landing resolvers (`units/ud-resolve.py`, `units/upl-resolve.py`) are dry-run against the ACCORDION tip before each landing. ALERT (accepted, round 2) landing next on the session branch. UTIL-DISPLAY (`/home/user/veneer-ud`)
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
