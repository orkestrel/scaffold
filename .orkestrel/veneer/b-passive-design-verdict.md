# B-PASSIVE design verdict (Orchestrator reconciliation, 2026-09-22)

Lanes: `planner` on Opus 5 (`units/b-passive-design-planner-proposal.md`) and `analyst` on GPT-6
Astra, thread `01a0ca5d-db72-7fe2-b402-6f9dc86b243b` (`units/b-passive-design-analyst-proposal.md`),
blind to each other on `units/b-passive-design-brief.md` over `units/b-passive-terrain-report.md`.

## Rulings

1. **Split.** Both lanes keep the five-way grouping: B-PASSIVE-A `badge`, `breadcrumb`,
   `btn-close`; B-PASSIVE-B `btn-group`, `btn-toolbar`; B-PASSIVE-C `card`, `list-group`;
   B-PASSIVE-D `pagination`; B-PASSIVE-E `progress`, `spinner`, `placeholder`. Ruled.
2. **The size twins stay in `_button.scss`.** The planner's reading wins over the analyst's
   "transfer": Bootstrap emits `.btn-group-sm > .btn` and `.btn-group-lg > .btn` inside the `.btn-sm`
   and `.btn-lg` rules through `@extend`, which is where `_button.scss` already emits them; moving
   them would be a departure and cross-partial `@extend` is banned. B-PASSIVE-B authors nothing for
   them and owns neither `_button.scss` nor `button.test.ts`.
3. **Schedule.** All five units run in parallel worktrees from the commit that lands F5b, F5c, F6,
   and F7 (the analyst's D5 argument: the twin must be gone before a B unit's acceptance claims it),
   without the planner's serial pilot: the pattern the pilot would set is fixed in the briefs
   instead (the `TableSection` grain, the `### Table classes` heading voice, F5b's ledger row voice,
   the `<KEY>_*_CASES` naming, F7's registry shape). The planner's three ordering rulings apply to
   every unit so the shared-file edits are derivable blind: sections alphabetical by region name
   appended after `Table`; the barrel in Bootstrap's `bootstrap.scss` order appended after
   `@use 'components/vr'`; every shared-file edit an append at a named anchor or a disjoint whole-row
   deletion, never a rewrite of an existing line. The Orchestrator integrates each worktree serially
   by cherry-pick in barrel order (B, C, A, D, E) and resolves the append hunks mechanically. A serial
   B-PASSIVE-CLOSE unit follows: family prose, the `listed` reconciliation, one `verifier` chain, and
   the capture-portfolio verdict round.
4. **Naming.** The planner's table: `_badge.scss`, `_breadcrumb.scss`, `_close.scss`,
   `_button-group.scss`, `_card.scss`, `_list-group.scss`, `_pagination.scss`, `_placeholder.scss`,
   `_progress.scss` (`as progress-component`, the only alias), `_spinner.scss`; mirrored proofs;
   one `SpecimenSection` subclass per key (`BadgeSection` to `SpinnerSection`) with `<KEY>_COPY` and
   `<KEY>_SPECIMENS`; one `### <Key> classes` heading per key in barrel order after `### Helper
   classes`. The analyst's `-component` suffix on every namespace is refused: the tree aliases only on
   collision.
5. **Showcase.** One section per key; ramps derived from a source list and one `.map`; every
   specimen a whole-specimen frame with background; `-<step>` suffixes only for keys whose cascade
   paints an interaction state (btn-close, pagination, list-group actions, btn-group). The analyst's
   coverage matrix (inventory selector and condition → proof case, subject, specimen, capture step)
   is a required report section for every unit.
6. **Elements layer.** The two `progress` rules coexist; no other bare-element rule.
7. **Deferred rows.** A unit deletes a name's deferral row in the same change that ships the name,
   or does not emit the name; foreign-owned rules are authored absent (Overlays, Disclosure, Forms
   sets as the planner lists them). The `.btn-group-sm/-lg` twins have no row to retire.
8. **Departures and additions.** Every Mailbox and Elements behaviour that adds a name or a
   declaration the inventory lacks is refused (both lanes' tables agree, member by member). Bootstrap's
   own `.btn .badge` offset and the spinner's reduced-motion slowdown ship as recorded. Tokenizing
   ceiling: only onto an existing `--vn-*` token that already resolves to Bootstrap's value; otherwise
   Bootstrap's literal and no row; no B unit adds a token. Bootstrap values already referencing
   `--bs-*` globals record nothing.
9. **The placeholder reduced-motion conflict.** The lanes disagree: the planner argues the
   `styles.md` § Prohibitions line ("Animations include reduced-motion animation: none") wins and the
   gate ships as an addition row; the analyst argues D2 and D6 (Bootstrap's set exactly, Bootstrap
   wins) keep Bootstrap's glow and wave running under reduced motion. Ruled per D6, provisionally:
   Bootstrap's behaviour ships, no addition, and the styles rule's line is read as governing Veneer's
   own animations, not a recorded Bootstrap animation. No gate enforces that line mechanically
   (`tests/setupPolicy.ts` and `.oxlintrc.json` carry no reduced-motion check, 2026-09-22). Surfaced
   to the user as the one rule-versus-ruling conflict; the ruling flips only on the user's word.
10. **Proof shape.** The planner's four readings per key (token beside property; override; factor;
    mode) plus the analyst's breakpoint boundaries (`576px`, `768px`, `992px`, `1200px`, `1400px`)
    and value assertions table; installed `@orkestrel/test` exports as both lanes list them
    (`findRule` is a substring lookup and never proves completeness); `waitForAnimations` excludes
    infinite animations, so spinner and placeholder proofs assert phases from timeline readings.
11. **Measurements the briefs take from the landed tree** (open until F5b and F7 land): whether
    `collectDepartures` compares the at-rule condition textually or normalized; the capture
    registry's post-F7 anchors; F5b's recorded status for `--bs-btn-close-filter`; the shape of
    F5b's ledger rows.

## Routing ledger

Every unit `opus` (served `claude-opus-5`); each audit round `analyst` on Astra (objective),
`reviewer` on Opus (subjective), `checker` on Sonnet; `verifier` on Sonnet for the close. The
Orchestrator integrates.

VERDICT: the plan above; briefs B-PASSIVE-A to E drafted after F5b, F5c, F6, and F7 land.

## Amendment D17 — a specimen whose resting paint is empty registers no frame (2026-09-22)

The capture instrument resets every animation to its first step before the shot. A grow spinner's
first step is `transform: scale(0)` at `opacity: 0`, so its frame region declares no pixel (an empty
region or a uniform frame, as B-PASSIVE-E measured on every variant), and no host, border, or
background changes what the subject itself paints. Ruling 5's whole-specimen frame is amended for
that case alone: a specimen whose only paint is an animation frame after its first step renders in
the showcase, registers no capture scenario, records the reason in the registry's doc comment and
in the guide's § Showcase, and its proof reads the animation timeline instead. Every other
specimen keeps ruling 5 unchanged. The objective lane's request for a bordered host is refused on
this reading: the host would be the frame's only paint, and a frame of a host is not a frame of the
subject.
