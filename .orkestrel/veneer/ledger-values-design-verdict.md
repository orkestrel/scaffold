# LEDGER-VALUES design verdict

The Orchestrator reconciled this round on 2026-09-25. It carries the X-TENETS-STYLES findings on
claims 8 and 10 and the identity lens's two referrals (`units/tenets-styles/`). Two units follow,
serially, and no user ruling is needed.

## Lanes

- **Brief:** `units/ledger-values-design-brief.md`, one brief for both lanes.
- **Subjective lane:** `planner` on Opus 5.5, as a Workflow node. Its proposal is retained as
  `units/ledger-values-design-planner-proposal.md`.
- **Objective lane:** `analyst` on GPT-6 Astra through `codex exec --sandbox read-only`, thread
  `01a0d6b0-e793-7730-ade3-b41a070eb190`, exit 0. Its proposal is retained as
  `units/ledger-values-design-analyst-proposal.md`. It executed three collector sweeps at
  `0865c67`: the unattributed set is `.caption-bottom` alone, the inventory set differences are
  empty, and the blockquote border plant leaves the drift empty.
- Both lanes ran blind to each other. They agree on every ruling except the representation of a
  retune and the provenance mechanism, which the Orchestrator rules as follows.

## Rulings

1. **A retune is decided by resolving the value, never by the `Source` cell.** Both lanes. The
   `--vn-space-8` token has Source `elements` and still resolves to Bootstrap's `1rem`, so a
   Source-keyed rule is false.
   - Chromium resolves each departure pair in the row's mode at the default factors, in an isolated
     context, the way the § Reference map proof resolves token values.
   - A custom-property pair resolves through a typed probe property. The probe mapping is a constant
     in the centralized setup file, not a guide column.
   - A pair the resolver cannot decide fails, naming the pair. No pair falls back to routing
     silently.
2. **`retuned` joins the `Departure` union.** Planner's shape. The Orchestrator rejects the analyst's
   separate `Retuned` column.
   - `retuned` means the emitted value resolves to something other than the release value. It
     outranks every member except `dropped`.
   - Every other member then means "the same resolved value in different text". The guide's
     sentence that a `tokenized` row "routes the release value through a Veneer token" becomes true.
   - Reason: the `Departure` cell already answers why the text differs, so one cell keeps one
     reason. A separate boolean column would be a `—` sentinel on every non-tokenized row.
   - `declared` is renamed `restated`. Its definition covers "a form or a value the other members do
     not name", and after the split it covers only the form. Every `declared` row is reclassified in
     the same change, so the rename costs no extra rows.
3. **Canonical values join the ledger's acceptance.** Analyst's ruling. A token changed while its
   consumers' departure members stay unchanged must turn the ledger gate red. For example, doubling
   `--vn-radius-base` changes no member when every consumer row is already `retuned`.
   - The § Reference map value comparison moves into the ledger's gate and reuses the resolver.
   - It keeps one home. The `tokens.test.ts` case that compares the same values retires, or reads
     something the ledger does not.
4. **§ Additions records a value.** Both lanes.
   - The table gains a `Veneer` column, the name § Departures uses for the emitted value.
   - Each added declaration under an added selector gets its own value-bearing row. The selector row
     keeps name membership and writes `—` in `Veneer`.
   - A custom property is attributed by selector and condition. It is not de-duplicated by name
     across sites.
   - `(empty)` stays distinct from absence.
   - The value joins the drift comparison.
5. **An unattributed rule reports.** Both lanes.
   - `collectAdditions` stops skipping a rule that `attributeSelector` answers with `undefined`, or
     whose key has no vocabulary.
   - The scan returns an `unattributed` list beside `unrecorded` and `stale`, and a gate case
     expects it empty. The analyst's executed sweep names `.caption-bottom`, which gets an
     Additions selector row owned by `table` in the `components` layer with `caption-side: bottom`.
   - Reason for a list over a throw: the drift lists already report this way, and a throw would hide
     every other ledger case behind one error. The keyframes refusal stays a throw.
6. **The shipped key list derives from the inventory.** Both lanes.
   - The hand-written list in `tests/conformance.test.ts` is deleted.
   - The gate compares the sorted `Object.keys(inventory.components)` against the shipped
     components the guide's rows derive, through `scanLedgerDrift`.
   - A whole-key deferral branch waits for the first key deferred.
7. **Bootstrap provenance is derived through witnesses.** The Orchestrator merges both lanes.
   - Every `bootstrap`-sourced token must have a witness: at least one departure row that reads the
     token and resolves to the release value. That makes the row any member except `retuned` and
     `dropped`.
   - The scan names each `bootstrap` token with no witness, and the gate expects that list empty.
   - This is the planner's derived scan without the new column the analyst proposes. It also closes
     the hole in the planner's form, where a wrong `bootstrap` token read only beside an `elements`
     token in a retuned row goes unseen.
   - `RETAINED_COLOR_ALIASES` and `RETAINED_LENGTH_ALIASES` in `tests/setupStyles.ts` record the
     same fact, so they retire, with their `tokens.test.ts` cases and their `setupStyles.test.ts`
     pins.
   - Where a token cannot have a witness for a stated reason, the unit stops and reports the list.
     The successor round decides whether an `Upstream` locator is needed for those tokens alone.

## Units

| Unit             | Role and engine        | Scope                                                                                                                                                                                                                                                                  | Acceptance, cheapest first                                                                                                                                                                                                                                                                                                                                                   |
| ---------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LEDGER-ADDITIONS | `opus` on Opus 5.5, native | Rulings 4, 5, and 6. `tests/setupServer.ts` (the `Addition` type and the addition readers and collectors), `tests/setupServer.test.ts`, `tests/conformance.test.ts` (the shipped-components case and the ledger block), and `guides/veneer.md` § Additions and § Tests | Scoped typecheck and lint. The addition cases pass. The blockquote border plant reports unrecorded and stale. A planted `.audit-unrecorded` rule in `components` is listed as unattributed, and the real cascade lists none. A planted inventory key is reported unrecorded, and the real inventory reports none. The ledger cases, `test:guides`, and `test:policy` pass. |
| LEDGER-RETUNE    | `opus` on Opus 5.5, native | Rulings 1, 2, 3, and 7, after LEDGER-ADDITIONS lands. `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/tokens.test.ts`, and the guide's § Tokens legend, § Departures, and § Outside the ledger | The `.btn` `--bs-btn-font-size` row reads `retuned`, the `.accordion` `--bs-accordion-btn-padding-y` row reads `tokenized`, and the `theme` `--bs-primary` row reads `retuned`. A doubled radius token turns the gate red. A `bootstrap` token changed with its Reference map cell is named by the witness scan. A pair the resolver cannot decide fails, naming the pair. Scoped gates pass. |

- **Routing:** both units run natively on `opus`. The conformance project launches Chromium from a
  vitest worker, which is a grandchild process that a bench sandbox denies (orchestration Bench
  laws, rule 5).
- **Audit:** `analyst` on GPT-6 Astra holds the objective lane, because it wrote neither unit.
  `reviewer` on Opus 5.5 holds the subjective lane. `checker` on Sonnet reads the guide-row parity.
- **Shared files:** both units own `tests/setupServer.ts`, `tests/setupServer.test.ts`, and
  `tests/conformance.test.ts`, which D49 also opens to the engine's J-ORACLE hunks. Each unit's
  landing applies the J-ORACLE hunks the engine has recorded by then, per D49, and the briefs name
  that condition.
- **Observation, not a criterion:** LEDGER-RETUNE reports how long the resolver takes inside the
  conformance project.
