# B-FORMS-CLOSE design verdict

Reconciled by the Orchestrator from the two blind lanes on
`units/b-forms-close-design-brief.md`: `planner` on Opus 5.5 (native subagent, task
`a7deb092045c40d14`, retained as `units/b-forms-close-design-planner-proposal.md`) and `analyst` on
GPT-6 Astra (`codex exec --sandbox read-only`, session `01a0cd42-b946-7ec2-9d59-4388aa37f5b5`,
retained as `units/b-forms-close-design-analyst-proposal.md`). Terrain:
`units/b-forms-close-terrain-report.md` (Cursor Grok). Tree: Veneer `d02bd46` (main and the
session branch), which the analyst inspected; the planner read `53628aa` and treated the RENAME
names as current, so the two lanes read one tree.

## Units and routing ledger

| Unit | Short name | Role and engine | Owns | Order |
| --- | --- | --- | --- | --- |
| B-FORMS-CLOSE-SPECIMENS | `bfs` | `opus` on Opus 5.5, native, worktree `/home/user/veneer-bfs` | `app/browser/constants.ts`, `tests/setup.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/sections/InputGroupSection.test.ts` | parallel with `bft` from `d02bd46` |
| B-FORMS-CLOSE-TABLES | `bft` | `opus` on Opus 5.5, native, worktree `/home/user/veneer-bft` | `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`, `tests/src/styles/components/input-group.test.ts`, `tests/src/styles/components/form-range.test.ts` | parallel with `bfs` from `d02bd46` |
| B-FORMS-CLOSE-FORCED | `bff` | `opus` on Opus 5.5, native, worktree from the tree `bft` lands on | `src/styles/_mixins.scss`, the forms partials `_form-control.scss`, `_form-select.scss`, `_form-check.scss`, `_form-range.scss`, `_validation.scss`, their proofs, `tests/src/styles/mixins.test.ts`, `guides/veneer.md` | after `bft` lands |
| B-FORMS-LABEL | `bfl` | `opus` on Opus 5.5, native | the `form` key: `_form-label.scss`, `form-label.test.ts`, `FormLabelSection.ts`, the deferral rows, the inventories | after `bff` lands; its own design round |

Every unit's audit round runs `analyst` on Astra (objective), `reviewer` on Opus (subjective), and
`checker` on Sonnet, blind, on one claims file. The Orchestrator's tracked `verify-<unit>.sh` chain
takes the authoritative gates after each landing, as every earlier B unit was landed.

**Routing deviation, recorded.** By work class `bft` and `bff` are objective and belong on `sol`.
Each owns a browser proof that drives Chromium (`input-group.test.ts`; the forced-colours readings
under `stageMedia`), which the Codex sandbox denies (`listen` fails `EPERM`), so each runs on the
harness's native writing lane, the F8d precedent `ROADMAP.md` records. `bfs` drives the journey and
is subjective (specimen shape and remark voice), so it is on its own engine. The analyst's
`B-FORMS-CLOSE-VERIFY` unit is the Orchestrator's tracked chain and its retained log; it is not a
separate dispatch.

**Refused shapes, on the record.** The analyst's single `CASCADE` unit (one writer over the tables,
the partials, the proofs, and the guide) is split into `bft` and `bff` so the table reshape and the
forced-colours change audit separately and `bfs` runs beside `bft`. The planner's `U4 LITERAL-PROBE`
builder unit is folded into `bft` as its first step (R4), because the plant, its removal, and the
gate readings are a scripted run the same unit retains as its instrument, and a separate dispatch
adds a round for no independent reading.

## Rulings

- **R1 Tooltip frame form.** Adopt the planner's option C. Each tooltip specimen's `[data-specimen]`
  container holds the validated `.input-group.has-validation` (addon, control carrying `.is-valid`
  or `.is-invalid` with a unique name and an `aria-describedby` naming the tooltip, the tooltip as
  the group's last child) followed by a second, button-led group (`.btn` then `.form-control`, unique
  names) that is the in-flow room the tooltip hangs over. The frame is the resting element frame the
  existing lift already photographs. The journey reads `display: block` on both tooltip keys, the
  room (the tooltip's bottom edge at or above the frame element's bottom edge on the lifted copy),
  and the stacking (`document.elementFromPoint` inside the tooltip and the following button returns
  the tooltip; the tooltip rule writes `z-index: 5`, the group's button rests at `z-index: 2`). The
  analyst's shell-owned wrapper with reserved space is refused: it edits showcase layout to hide the
  release's own overlap and gives no stacking reading. The overlap is the release's behaviour and the
  specimen remark says so.
- **R2 Validated colour width.** Bind it: `width: calc(var(--vn-space-24) + calc(1.5em + 0.75rem))`
  in `_validation.scss`, so only the release's `$form-color-width` binds to a token and the icon room
  stays literal. Sass flattens the nested `calc`; the ledger cells for the four width entries
  (`.was-validated .form-control-color:valid`, `:invalid`, `.form-control-color.is-valid`,
  `.is-invalid`) take the compiled value read from the build with departure `tokenized`, keeping
  Bootstrap's recorded value. The existing `81` pixel expectations hold at density 1. The proof adds
  a density reading (validated width minus resting width is the same at `--vn-factor-density: 2` as
  at 1) and a direct `--vn-space-24` override reading; a scoped native-validity case
  (`.was-validated .form-control-color:invalid` established through `setCustomValidity`) rides the
  existing scoped case where one exists and is added where none does.
- **R3 Forced branch, not the whole mixin.** Extract the forced branch of `focus-ring` into a
  `forced-ring($width: var(--vn-focus-width), $highlight: var(--vn-focus-highlight))` mixin that
  emits `@include forced-colors { outline: $width solid $highlight; @content; }`; `focus-ring`
  includes it with `box-shadow: $reset` as content so every `.btn*` block compiles byte-identical.
  `.form-control:focus`, `.form-select:focus`, `.form-check-input:focus`, and `.form-range:focus`
  keep the release's `outline: 0` and shadow and add `@include forced-ring;` (the range indicator
  sits on the host; the thumb shadow stays). No shadow reset is authored on the forms rules: forced
  colours paint no `box-shadow`, which is D37's premise. Whole-mixin adoption is refused (it writes
  `outline: none` where the release writes `0`, a needless departure per rule, and puts a shadow on
  `.form-range:focus`).
- **R3a Plaintext excluded on evidence.** `.form-control-plaintext:focus { outline: 0 }` draws no
  indicator in any mode in the release, so forced colours remove nothing there and D37 does not
  reach it. The guide states the limit. The analyst's "cover every host that suppresses its outline"
  is refused for plaintext as an addition beyond the release; the all-modes gap is the release's.
- **R3b Validation precedence.** The validation partial's `:focus` rules write `border-color` and
  `box-shadow`, not `outline`, so the forced outline on `.form-control:focus` survives them. The
  proof reads a focused `.form-control.is-invalid` under `stageMedia({ forced: true })`; the
  mutation is `outline: 0` added to a validated `:focus` rule.
- **R4 Literal-declaration reading.** Both lanes read that the conformance additions case
  (`records every emitted name the official inventory lacks`) already reports the plant. `bft`
  runs the on-disk probe first (plant `letter-spacing: 0.01em` on `.form-control` in
  `_form-control.scss`, a property no row values or reads and no Additions row names; build;
  `test:setup` green; the `form-control.test.ts` browser proof green; `test:conformance` red with
  `form-control | .form-control { letter-spacing } | — | declaration`; remove the plant; hash equal
  to baseline) as a retained script under `tmp/units/`, then adds the analyst's permanent case: an
  in-memory copy of the real expanded cascade with one unrecorded literal appended on
  `.form-control` inside the components layer, run through the existing `collectLedger` and
  `scanLedgerDrift` path against the real inventory, shipped keys, and guide, asserting the exact
  addition with the unmodified cascade as the control. The reader is unchanged. The
  `FORM_CONTROL_CASES` remark gains one sentence naming that gate as the reporter.
- **R5 The `form` key.** The family verdict gives B-FORMS-CLOSE the `form` key
  (`_form-label.scss`, `form-label.test.ts`, `FormLabelSection.ts`, retiring the three
  `.col-form-label*` deferral rows). The rows the brief enumerated omit it and no `_form-label.scss`
  exists at `d02bd46`. It stays in the family exit and lands as the successor unit B-FORMS-LABEL
  (`bfl`) after `bff`, with its own design round, because it touches files every close unit owns.
- **R6 `FORM_FLOATING_CASES`.** Its joined-string `reads` shape is outside the enumerated rows.
  Carrier: `bfl`. `ROADMAP.md` § Carriers gains the row at `bfs`'s fold.
- **R7 One per-property extraction.** `bft` owns `tests/setupServer.ts` and its proof to export one
  `collectDeclarationReads` helper (a compiled cascade to a map keyed by selector and condition of
  property to the custom properties its declaration reads), routes the text-control, input-group,
  and range Node cases through it, and tests it. A third inline copy is refused under
  `.claude/rules/tests.md`.
- **R8 Stale forced-colours sentences.** `bff` owns `tests/src/styles/mixins.test.ts` (its
  forced-colors case moves to `stageMedia({ forced: true })` and drops the "no forced-colors axis"
  explanation) and the guide's § Compatibility sentence "Button's forced-colors browser reading
  remains open" (closed by T2 and F9 per `ROADMAP.md`).
- **R9 Range population.** The range Node case stays exact over the inventory's selectors and
  conditions (its `written` keys equal the inventory's keyed rules), and it gains the per-property
  comparison under a `FormRangeCase` interface (`selector`, `engine`, `condition`, `reads` keyed by
  property). A forced-colours block `bff` adds on `.form-range:focus` sits under a condition the
  inventory never records, so it is Veneer's addition and the additions ledger holds it; `bft` gives
  the `written` filter the rule that a block under a condition the inventory records for no rule of
  the key is excluded from the equality and reported by the additions reader instead, with the
  comment saying so. The form-control Node case already compares rows against the inventory's keyed
  rules and looks up compiled blocks by row, so a forced block on `.form-control:focus` needs no row.
- **R10 Passive `:focus` rules.** `.page-link:focus` and `.btn-close:focus` write `outline: 0` with
  a shadow ring. D37 covers forms. Carrier: B-PASSIVE-CLOSE-B, with `forced-ring` as the mechanism.
- **R11 Shared-file grants.** The family's append-only rule on `tests/setupStyles.ts`,
  `tests/setup.ts`, and `app/browser/constants.ts` is lifted for these units to the bounded
  rewrites and deletions their briefs name (the `INPUT_GROUP_ROUNDING` retirement, the
  `FORM_RANGE_CASES` reshape, the `CASCADE_KEYS` doc block, the specimen remarks). Every other
  shared file stays report-only.
- **R12 Guide sentences from `bfs` and `bft`.** `bfs` returns the § Input group classes sentence
  naming the tooltip frames; `bft` returns the rewritten closing paragraph of § Input group classes
  (from "The text control and select classes carry no radius…" through the floating-wrapper
  sentence). Each lands as an Orchestrator integration edit of the exact returned text at that
  unit's landing, verified by that round's `checker`, so `main` never carries the fixture-era prose
  beside the retired fixture. `bff` owns the guide for the width, ledger, forced-colours, and
  `focus-ring` prose.

## Findings and carriers

| Finding | Carrier |
| --- | --- |
| Tooltip specimens, frames, journey readings (D6, D31) | `bfs` |
| `CASCADE_KEYS` doc block and rest case title enumerate members | `bfs` |
| Input-group focus comment's outer-column model (round 6) | `bfs` |
| § Input group classes frame sentence | `bfs` returns; Orchestrator integration edit at `bfs` landing |
| `INPUT_GROUP_ROUNDING` retirement, corner comments, fixture doc block (D31, round 6) | `bft` |
| `FORM_RANGE_CASES` per-property `reads` map and Node comparison | `bft` |
| Literal-declaration reading (probe and permanent case) | `bft` |
| One `collectDeclarationReads` helper (R7) | `bft` |
| § Input group classes closing paragraph | `bft` returns; Orchestrator integration edit at `bft` landing |
| Forms focus indicator under forced colours (D37), `forced-ring` | `bff` |
| Validated colour width binding, ledger cells, density proof | `bff` |
| `mixins.test.ts` forced case and § Compatibility sentence (R8) | `bff` |
| Additions rows and forms-section prose for the forced blocks | `bff` |
| The `form` key (R5) | `bfl` |
| `FORM_FLOATING_CASES` joined-string `reads` (R6) | `bfl` |
| `.page-link:focus` and `.btn-close:focus` under forced colours (R10) | B-PASSIVE-CLOSE-B |
| § Tests stem table lacks the tooltip stems | B-PASSIVE-CLOSE (existing row) |
| Plaintext focus draws no indicator in any mode (R3a) | excluded on evidence; the guide states the limit (`bff`) |

## Exit criterion

B-FORMS-CLOSE ends when each capability is implemented, repaired, or excluded on evidence, and the
full chain (`format:check`, `lint:check`, `check`, `build`, `test`, `test:service`, and
`CAPTURE=1` journey regeneration) is green on the integrated tree in the Orchestrator's tracked run.

- Tooltip specimens render in the Input group section, are registered in `CaptureSubject` and
  `CASCADE_KEYS`, have frames in every variant, and pass the display, room, and stacking readings.
- No `INPUT_GROUP_ROUNDING` remains in `tests/` or `guides/`; the corner proofs read the shipped
  radius; every round-6 sentence reads the shipped radius, border, and floating rules.
- The `CASCADE_KEYS` doc block and the rest case title enumerate no member.
- The validated colour width reads `--vn-space-24`; its ledger cells are `tokenized`; the density
  and override readings pass.
- `FORM_RANGE_CASES` has a property-keyed `reads` map under `FormRangeCase`; the range Node case
  uses the shared per-property comparison; the extraction has one exported home.
- The literal-declaration reading is pinned by the in-memory conformance case, recorded by the
  retained probe, and named in the `FORM_CONTROL_CASES` remark.
- Every forms control that draws a shadow ring draws a system-highlight outline under forced
  colours through `forced-ring`, the button compile is byte-identical, the proofs read it under
  `stageMedia({ forced: true })`, and the Additions rows and prose are landed. Plaintext is excluded
  on evidence.
- The `form` key lands through `bfl`, or the Orchestrator records its exclusion.

## Lanes

Both lanes ran on the one brief, blind, and returned proposals; neither is empty. The analyst's
journal head carries the `thread.started` event with the session id named in the preamble, and its
launcher (`units/b-forms-close-design-analyst.sh`) names `--model gpt-6-astra`.
