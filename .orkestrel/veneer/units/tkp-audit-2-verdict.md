# TOKEN-PROOFS audit round 2 — verdict

The Orchestrator's reconciliation of the second audit round over TOKEN-PROOFS rounds 2 and 3, on one claims file
(`tkp-audit-2-claims.md`): the objective lane, `analyst` on GPT-6 Astra (`tkp-audit-2-objective-verdict.md`, journal
`tmp/codex/tkp-audit-2-analyst.jsonl`, thread `01a0d6f7-db1f-7423-b9a2-246953a5cc1d`), and the subjective lane,
`reviewer` on Opus 5.5 (`tkp-audit-2-subjective-verdict.md`), blind to each other. The writer was `opus` on Opus 5.5, so
the objective lane ran on an engine that did not write the work. No checker ran: the claims are not mechanical counts or
paths, and both lanes read the retained logs line by line.

**Verdict: FAIL 5, 6, 8; outside the claims: F-OVERRIDE-HEADER.** This round is the seam's third, so the Orchestrator
rules the fix and a `builder` round applies it verbatim (`token-proofs-brief-4.md`).

## Claims

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 The hover decoration plant | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The plain-ancestor placement case | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 The alias case | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 The scope case | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 § Customization is true | BROKEN | BROKEN | BROKEN, both defects accepted |
| 6 Every placement item has an executed assertion | BROKEN | CONFIRMED | BROKEN, closed by claim 5's fix |
| 7 Gates | CONFIRMED | CONFIRMED | CONFIRMED |
| 8 Scope and law | CONFIRMED | BROKEN | BROKEN on the writing rule |

- **Claim 5, the objective defect.** The mode-scope item names "the close button and carousel values" among the
  values a canonical-token override moves. `--bs-btn-close-filter` and `--bs-carousel-control-icon-filter` are
  literals each mode scope selects (`src/styles/_mixins.scss`, the `theme-tokens` mixin, around line 531; the values
  map in `src/styles/_tokens.scss`, around line 142), so no token override moves them. Both citations resolve.
- **Claim 5, the subjective defect.** The any-other-element item lists the rules that read a token directly behind a
  colon, parallel to items presented as complete, and the list is not complete: `.btn` declares
  `--bs-btn-border-radius: var(--vn-radius-base)` and a focus shadow over `--vn-focus-width` and `--vn-focus-color`
  (`src/styles/components/_button.scss`, around lines 25 and 28). The root-only item then reads as if a
  `[data-bs-theme]` override leaves the radii and focus ring width alone, where `.btn` follows it. Citations resolve.
- **Claim 6.** The objective lane's mutation (the carousel caption re-declared as a literal) survives because the
  item enumerates families no case reads. The subjective lane's reading holds for membership: the case comparing the
  dark scope's `--bs-*` set pins which aliases each scope re-declares. The fix removes the enumeration: § Color modes
  already states which names a mode scope declares again, so § Customization states the mechanism and points there,
  and each remaining example names a consumer an executed case reads.
- **Claim 8.** `.claude/rules/writing.md` § Code tokens requires a noun after a code token. Two sites write a bare
  `:root`; both sit inside the replaced list.
- **F-OVERRIDE-HEADER, accepted.** The `describe('ancestor token overrides')` header comment says each case sets one
  token and reads a consumer beside a twin, which is false for the placement, alias, and scope cases, and the scope
  case's comment names two sets by position ("the first set and not the second"), which `AGENTS.md` § Writing forbids.

## Findings not carried

- The reviewer's "attacked and held" notes (the scope case's title, the placement case's overlap with the round-1
  cases, and D51a's "emphasis … backgrounds" wording) are ruled on the record: the title reads, the overlap is a
  simplification candidate and not a defect, and the replaced text drops the emphasis-background wording.

## Carrier

`token-proofs-brief-4.md`, `builder` on Sonnet: the replacement paragraph and the two comment rewrites, verbatim. The
paragraph is the Orchestrator's text, so its audit runs `analyst` on Astra, an engine the Orchestrator does not share.
