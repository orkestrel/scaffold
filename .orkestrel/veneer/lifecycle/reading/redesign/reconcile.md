# Reconciliation: the line-view redesign (2026-10-07)

**Inputs:**
- the brief `design-brief.md`;
- the Opus planner's `proposal-planner.md`;
- the Astra analyst's `proposal-analyst.md`.

The two lanes worked blind to each other.

## Where the lanes agree

| Point | Shared position |
| --- | --- |
| Reference tracking | The exposed set accumulates across reads of one unchanged page and resets on a page change. Both lanes hold that the claim "the model never invents a reference" survives. The analyst requires the amendment to be reported, because the stricter latest-window rule is removed |
| Search past `from` | Report matches outside the requested range, and never move the window or wrap. Wrapping would pull the 2B's forward paging back to the policy heading (`M2diag/2b/logs/paging-1.json`) |
| The footer | It stays, because removing it took shipping to 0 of 8 on both models (X2) |
| Line numbers | Every line keeps a number, and references stay inline. Bare `N: ` beside a bare `eN` is the defect (X1 moved 4B cart from `e11` to `e7`) |
| 4B paging | A second header line states that the view is partial. The harness framing "The browser shows this page:" asserts a whole page |
| Evidence limits | Neither lane claims that a record proves the 2B search fix or the 4B paging fix. Both stay hypotheses for measurement |

## Where they split, and how each split is settled

Unit `store-validate` measures each split on both models (ollama `tmp/codex/store-validate-brief.md`), with guards and selection rules stated before the run.

| Split | Planner | Analyst | Settled by |
| --- | --- | --- | --- |
| Number and reference form | `11: ### link "Cedar Tea Tray" [ref=e7] /product/p3` | `### e7 link "Cedar Tea Tray" /product/p3 [line 11]` | Arms L1 against N1, ruled on 4B cart, guarded |
| Partial-view line | `This read shows lines 1–34 of 80; lines 35–80 are not shown yet.` | `PARTIAL PAGE: window 1–32; later page text is not shown.` | Arms H1 and H2, ruled on 4B paging |
| Harness framing | `The browser's first read of the page:` | `The browser returns this page window:` | Arms G1 and G2 |
| 2B search | One system-prompt sentence: "use the site's search box" | `[type]` and `[click]` cues on control rows, and new `read` copy | Arms P1, K1, and D1, ruled on 2B search, guarded |
| The footer | Keep its exact bytes | Add a purpose: "for more page text" | Arm F1, guarded |
| Search result shape | One quoted element line in the header, only when an element line is the best match outside the window | A page-wide match row, plus an excerpt with context and a labelled window | The Orchestrator's ruling, which follows |

## The Orchestrator's rulings

1. **Search past `from`.** Search keeps today's in-range behavior when the range has a match. When the range has none and the page does, the reply adds one line between the header and the window: `No line from F on matches "Q"; the best match is line M:`, followed by line M quoted in full, whatever it holds.
   - **Unchanged:** the window does not move, and the footer describes only the window.
   - **Rejected from the analyst's shape:**
     - the page-wide number list;
     - the context lines.

     The planner's reason holds: both add backward pull and bytes, and no task needs them.
   - **Rejected from the planner's shape:** the element-only restriction, because a fact searched from a wrong `from` needs the same help. This is browser behavior, so it needs the package's code, not a byte transform. It is validated by completion runs after implementation.
2. **Reference tracking.** Adopt rule R, with the analyst's conditions:
   - an action's supplied reference is checked before the reset;
   - a changed read from line 1 also emits the change note, which closes the reporting gap at browser `src/core/helpers.ts:755`;
   - a refusal for a reference not in view counts as unlisted.

   The amendment goes to the user, because "never weaken an oracle's claim" is the user's ruling. Stage 0 of `store-validate` rescores the M2diag transcripts first.
3. **M1's role.** M2diag showed that a first call does not predict completion: the 4B passed cart after `click e11`, and the 2B completed the checkout order after reading first. So M1 is reported as a diagnostic and no longer stops the series; M2 is the gate. The checkout judge counts a read that shows the `Checkout` link, as the cart judge already counts the tray link. Acceptance stays at M3, 16 clean runs, then M4 and M5.
4. **User approval.** After validation, the change set goes to the user with the measured arms. That covers the presentation contract, the search reply, and rule R. Implementation starts after approval.
