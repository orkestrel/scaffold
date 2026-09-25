# TOKEN-PROOFS audit round 5 — verdict

The Orchestrator's ruling on the check of TOKEN-PROOFS round 6 (`tkp-audit-5-claims.md`). One lane ran, `analyst` on
GPT-6 Astra (`tkp-audit-5-objective-verdict.md`, thread `01a0d72f-9145-7cc3-bde8-dd9cea8c3ccd`), because the round checks
the Orchestrator's own text and Astra wrote none of it. No subjective lane ran: the round rules on the truth of ruled
text, which is the objective lane's question.

**Verdict: FAIL 5, 6; claims 1 and 7 settled; outside the claims: none.**

| Claim | Objective (Astra) | Ruling |
| --- | --- | --- |
| 1 Verbatim | BROKEN (line wrapping) | CONFIRMED on the words; the claim's "byte for byte" was the Orchestrator's wording |
| 2 The placement text | CONFIRMED | CONFIRMED |
| 3 The root-with-mode assertion | CONFIRMED | CONFIRMED |
| 4 The § Color modes sentence | CONFIRMED | CONFIRMED |
| 5 The fourth item and the rest of the prose | BROKEN | BROKEN |
| 6 Titles and writing | BROKEN | BROKEN |
| 7 Gates | UNRESOLVED | settled at landing |

- **Claim 1.** The words equal the brief's Items; oxfmt re-wraps the lines. The claims file asked for byte equality,
  which no formatted paragraph keeps. No change.
- **Claim 5.** The unit's patch for the fourth item ("below the root") is still too broad: a `[data-bs-theme]` element
  below the root that carries an inline alias override passes the value to its child, because its own declaration wins
  over its mode scope's. The describe block's header comment repeats the false exception.
- **Claim 6.** The scope case's comment says a document-element override stops at "a mode scope that re-declares the
  token itself", which is false where the document element carries the mode: its override wins over its own mode
  scope. No assertion reads that state for the primary token.
- **Claim 7.** The landing chain runs `npm run test:policy` on the merged tree and takes the deciding reading.

## The source of the recurring defect

This is the fourth check of the placement text, and each has found the same class of defect from a new angle: an
exception stated in absolute terms ("the root", "below the root", "a mode scope"). The true exception is relative. An
override reaches everything inside the element that carries it, except a subtree whose element declares the token
again, and the mechanism sentence already says that: "an element inside it that declares the token again gives its own
subtree that value." Each list item and comment then restated the exception in absolute terms, and each restatement
was a new place to be wrong. Round 7 deletes the restatements, points the mechanism sentence at the mode scope as its
example, and adds the missing assertion. The next check sweeps every sentence in the guide and the tokens test that
states where an override stops, not only the edited ones.

## Carrier

TOKEN-PROOFS round 7 (`token-proofs-brief-7.md`, `builder` on Sonnet), then `analyst` on GPT-6 Astra checks the text
and the sweep (`tkp-audit-6`).
