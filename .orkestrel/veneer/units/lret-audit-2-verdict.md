# LEDGER-RETUNE audit round 2 — verdict

The Orchestrator's reconciliation of the audit of LEDGER-RETUNE round 2 on one claims file (`lret-audit-2-claims.md`):
the objective lane, `analyst` on GPT-6 Astra (`lret-audit-2-objective-verdict.md`, thread
`01a0d7e9-8608-73a3-991b-41385bf528ce`, journal `tmp/codex/lret-audit-2-analyst.jsonl`); the subjective lane, `reviewer`
on Opus 5.5 (`lret-audit-2-subjective-verdict.md`); and `checker` on Sonnet (`lret-audit-2-checker-lane.md`, claims 4,
5, and 9). The lanes ran blind to each other. The writer was `opus` on Opus 5.5, so the objective lane ran on an engine
that did not write the work. The Orchestrator settled the subjective lane's referrals by running them: R1 and R2 through
the unit's resolver (`lret-instruments/audit-2-probe/referrals.log.txt`), the `<custom-ident>` boundary in Chromium 141
(`lret-instruments/audit-2-probe/custom-ident.log.txt`), and R4 by the unit's answer (`lret-audit-2-r4-answer.md`).

**Verdict: FAIL 1, 2, 6, 8; outside the claims: F1, F2.** The repaint decisions, the names and retirements, the rows,
the timing budget, and the scope hold.

## Claims

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 The resolver is faithful | BROKEN | UNRESOLVED | — | BROKEN |
| 2 Canonical values and witnesses | BROKEN | CONFIRMED | — | BROKEN |
| 3 Every repaint pair is decided | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 The names and the retirements | CONFIRMED | CONFIRMED | PASS | CONFIRMED |
| 5 The rows | CONFIRMED | CONFIRMED | PASS | CONFIRMED |
| 6 The proofs | UNRESOLVED | UNRESOLVED | — | BROKEN on the removal statement; the kills hold |
| 7 Timing | CONFIRMED | UNRESOLVED | — | CONFIRMED |
| 8 The guide | BROKEN | BROKEN | — | BROKEN |
| 9 Scope and gates | CONFIRMED | CONFIRMED | PASS | CONFIRMED |

- **Claim 1.** The construction still reads alike some pairs a consumer's page can render apart.
  - Executed by the Orchestrator: `1cqw` against `1vw` on `width` reads `12.7969px` on both sides, because no setting
    establishes a query container. The controls `1em` against `16px` (apart) and `16px` against `1pc` (alike) hold.
  - Executed by the objective lane on the source helpers: `extractMatchedCompound` drops `:not()` and `:has()`, so
    `.card:has(> span)` builds a childless `div.card` that misses a declaration its compound supplies.
  - By the objective lane's arithmetic over the settings: `1lh` against `1rlh` (no setting varies a line height),
    `1vmin` against `1vh` (every viewport is landscape), and `max(0px, min(1em - 16px, 1rem - 16px))` against `0px`
    (no setting changes the font size and the root size together).
- **Claim 2, the objective lane's executed site selection.** A `:root` declaration disappears from the comparison when a
  `[data-bs-theme=light]` scope redeclares the token, and a selector naming both modes in one `:is()` is compared in the
  light mode alone. The subjective lane confirmed the push branch without those inputs, so the executed inputs rule.
- **Claim 6.** Every paired case has its `AssertionError` on the record, and every restore is byte-identical (both
  lanes). The report's statement that each syntax it removed from `PROBE_SYNTAXES` computes values the same way as a kept
  syntax or the `font-family` rung is false for `<custom-ident>`: Chromium 141 computes `SERIF` and `serif` apart under
  `<custom-ident>` and alike under `font-family` (`custom-ident.log.txt`), and the resolver reads the custom-property pair
  alike (`referrals.log.txt`). The objective lane also shows that real rows reached the removed `<length>` and `<number>`
  syntaxes, with their members unchanged.
- **Claim 7.** The lines at 08:53 and 08:54 in `lret-instruments/r2/probe/timing.txt` ran before the same-text short
  circuit, and the line at 08:56 ran with temporary instrumentation, as the unit states; the four concurrent runs at 08:57
  set the `9950 ms` reading, and `LEDGER_TIMEOUT` follows the `ORACLE_TIMEOUT` rule. The report left those lines out.
- **Claim 8.** Each of these guide sentences is false:
  - "each matching its compound" (§ Departures preamble), by claim 1's `:not()` and `:has()` outputs;
  - the every-declaration and every-applicable-mode statements (§ Reference map preamble, § Outside the ledger), by
    claim 2;
  - the witness sentence's "arithmetic on the token witnesses nothing", which the passing
    `calc(var(--vn-container-sm) * 1)` fixture contradicts (objective);
  - "A stated value and a declaration that both resolve to nothing, as an `inherit` and an `initial` do", which holds for
    an `inherit` at `:root` only, repeated in the `scanCanonicalValues` doc block (subjective).

## Findings outside the claims

- **F1 (subjective), accepted.** The `Resolution` doc block omits the parent reading, and the pinned `line-height`
  `inherit` case reads `1px`, which is `PARENT_VALUES[0]`.
- **F2 (subjective), accepted.** The probe-syntax case is named for the brief's input condition, not for what it proves.
- **Non-blocking design notes (subjective), carried.** The resolver finds the `base` setting by position in a
  `Readonly<Record<string, ResolverSetting>>`; `inferScopeMode` returns a mode, not a scope. The objective lane notes that
  no retained case binds a `PARENT_VALUES` entry past `1px` (R3), and that a custom-property `currentColor` pair is
  unmeasured.

## The seam

Claims 1, 2, and 8 are the resolver's faithfulness claim: round 1 found holes in it (strings, sibling mode, and unbuilt
compounds, `lret-audit-verdict.md`), and round 2 finds more through new inputs. The next round is the third
at this seam, so it is a ruling, not a repair (`.claude/rules/quality.md` § Rounds and verdicts). The Orchestrator
measured reachability over every real ledger pair (`lret-instruments/audit-2-probe/reachability.txt`): no real pair
reads a container unit, `vmin` or `vmax`, `ex` or `ch`, `attr()`, `env()`, `:has()`, or `:is()`; and
`:not()`, `lh`, `currentColor`, and `max()` each reach real pairs, which that file lists; no real pair reads `min()`
or `clamp()`. `ledger-boundary-design-brief.md` sends
the boundary to `planner` on Opus 5.5 and `analyst` on GPT-6 Astra.

## Carriers

LEDGER-RETUNE round 3 carries claims 1, 2, 6, and 8, F1, F2, and the non-blocking notes, in the shape the
LEDGER-BOUNDARY ruling fixes. Its brief is written after that ruling.
