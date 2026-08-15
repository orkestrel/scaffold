# U8 — polish convergence: the portfolio, the measurements, and the carriers

## Role and engine

`implementer`, engine **Opus 5**, native, high effort. Sole serial writer in
`/workspace/supervisor` from clean committed baseline **4d452ca**. Perform directly, spawn
nothing, no commits/pushes/installs.

## Dispatch-named skills (binding process)

1. **`orkestrel-polish-surface`** — the canonical skill at
   `.agents/skills/orkestrel-polish-surface/SKILL.md` (via the repo's `.claude/skills` bridge)
   and every reference it requires. It owns the state registry, the theme-and-viewport variant
   matrix, the filename and capture-run membership proofs, and the verdict shapes.
2. **`orkestrel-human-journey`** — journeys are the capture entry path: arrive, act, converge,
   then capture. The journey layer in `tests/setupBrowser.ts` and the integration setup is the
   instrument set.

`AGENTS.md` and the mapped rules bind as always; the exit criterion this unit serves:
"Signature readout live at both viewports/themes with measured contrast (≥4.5:1 text, ≥3:1
marks)" and "polish-surface rounds converged on one final portfolio; every unit's pixel proofs
on file."

## The unit

1. **The registry and matrix** per the skill: register the campaign's states (login incl.
   refused; roster rail with live/decayed/departed rows; the open run with reply forms; the
   History destination's five states, the filter states incl. both empty sentences; the
   staleness affordance; the terminal run; the stream-fault notices) and generate the
   portfolio from acceptance journeys at both viewports × both themes, with the filename and
   membership proofs green in an ordinary run.
2. **Measured contrast** (exit item 6): measure — not eyeball — the signature readout and the
   campaign's new copy (help texts, scope line, empty sentences, status lines, badges/marks)
   at both themes: ≥4.5:1 informative text, ≥3:1 marks and focus chrome. The measurement is a
   test that computes ratios from the rendered colors; a frame corroborates.
3. **The reply and feed story on film** (user instruction): journeys that park a run on a
   confirm prompt AND a choice prompt, answer each through the interface, and film the feed
   arriving (records, transcript, terminal registers) — the content-pane interaction story an
   operator actually lives.
4. **The three H7 carriers**: quote the interpolated filter term in the phrase (so typed text
   is delimited from the app's own words — update the ruled strings and their tests
   coherently); stabilize the filter-button column so Clear entering/leaving does not resize
   the inputs; one casing for "run ID" across label/help/status.
5. **The accumulated polish pool**, each judged per the skill (fix or record-as-finding):
   390px glyph legibility; mis-tap adjacency at the rail rows; the triple "updates stopped"
   voice when stream and pages fail together; the Address row's raw-JSON display; the
   fault-voice inventory under multi-channel failure; navbar/banner shrink at narrow widths.

## Scope

**Owned:** `app/browser/**` (components, styles per the styles rule), the browser test tree,
`tests/setupBrowser.ts`, the capture harness files the skill's references fix, `demo/` if the
showcase regenerates. **Off-limits:** `app/server/**`, `app/core/**` except additive constants
the skill's harness needs, `src/**`, `guides/**` (report the parity delta — item 4's string
changes may touch guide prose parity; report exactly).

## Environment facts

Native, listener-capable; Chromium at `/opt/pw-browsers`. Real dist-server capture flows are
the Orchestrator's established harness — your portfolio comes from the vitest browser capture
project the skill owns. Run the full browser suites and gates before reporting.

## Acceptance criteria

1. Registry × variants complete with both proofs green; the portfolio generated in an
   ordinary run.
2. The contrast measurements green as tests with the ratios reported.
3. The reply/feed journeys green with their films in the portfolio.
4. Items 4-5 each closed as a fix or a recorded finding with its evidence.
5. All gates and the full browser suites green; the parity delta reported exactly.

## Output

Touched files + diffstat; the registry list and variant count; the measured ratio table;
per-criterion proofs with commands and tails; the parity delta; `git status --porcelain`;
deviations or none. No diary.
