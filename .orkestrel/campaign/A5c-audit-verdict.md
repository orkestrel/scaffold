# A5c — audit verdict (U5c + U5d + U5e, the mcp composition receipts)

Round of 2026-09-15 on the mcp tree at `8d97dd0` plus U5c, U5d, and U5e (uncommitted). Subject:
`A5c-diff.patch.txt`, the three unit reports, the Orchestrator's release-mode run
`A5c-distribution-orchestrator.log.txt`, gates `U5e-mcp-gates-orchestrator.log.txt` and
`U5e-mcp-gates-test-full.log.txt`, the tail projects `A5c-tail-gates.log.txt`, and the probes
`P25-u5d-receipt-probe.md`, `P27-reflow-probe.md`, and `P28-u5e-teardown-probe.md`. Brief:
`A5c-audit-brief.md` (claims 1–14).

## Lanes

| Lane | Engine | Ran | Verdict |
| --- | --- | --- | --- |
| checker (mechanical) | Sonnet | yes — `A5c-audit-checker.md` | PASS, `outside: none` |
| analyst (objective, the cross-engine lane) | GPT-6 Astra | yes — `A5c-audit-analyst.md` (thread `01a0a67c-bb9d-7ab2-8ed1-05366b41b194`) | FAIL 2 6 8 14 |
| reviewer (subjective) | Opus 5 | yes — `A5c-audit-reviewer.md` | PASS on every claim; outside F1–F4 |

Claude Opus 5 wrote U5c, U5d, and U5e, so the analyst on Astra is the only lane whose engine did
not write them, which is what the fix-round rule requires. No seam fan-out ran this round: the
delta is a fix round whose findings were enumerated, and `.agents/orchestration.md` § Context and
decomposition says to change the lenses in a successor round rather than repeat them.

## Reconciliation

### Closed

- **Claims 2 and 8 (Astra UNRESOLVED).** Each names the sandbox's inability to run Chromium or an
  install, and each names the reading that settles it. Claim 2 is settled by probe P28, the
  Orchestrator's own replay: a planted specifier trips the stage's own guard after the consumer is
  installed and the browser launched, and no `distribution-*` tree survives. Claim 8 Astra
  corroborated from inside its sandbox by invoking the extracted route against the installed agent:
  it reproduced the refusal status and found that accepting the wrong credential answers a
  different status and breaks the pin, which is the receipt binding. The reviewer confirmed both
  independently.
- **Claim 1 (the residue).** Confirmed by every lane, and by probe P27, whose control reports the
  pre-fix sites and whose post-fix reading is clean.
- **Claims 3, 4, 5, 7, 9, 10, 11, 12, 13.** Confirmed by every lane that ruled on them, each with
  file-and-line evidence, and the counts sweep re-run independently by the checker and the reviewer
  rather than taken from the unit's report.

### Adopted

| Finding | Source | Carrier |
| --- | --- | --- |
| The reached-file assertion does not pin what its comment advertises: deleting the relative-only core entry from the list leaves it green, because a relative edge never becomes an import-map key, so a walk that stopped following relative edges would shrink the set silently | Astra claim 6, corroborated by reviewer F4 | U5f 1 |
| The teardown comment's clause "never opened anything to close" is false: the browser is launched before the guard that can throw and the child exists before the origin read, and the surrounding `catch` is what cleans each up | Astra, recommended | U5f 2 |
| The page fixture labels its run functions with this campaign's own exit-criterion identifiers, which resolve to nothing inside the package and are wrong as written — one token labels two scenarios while the refusal and control scenarios carry none | reviewer F1 (required, and explicitly not release-holding) | U5g 1 |
| The paint script's composition, including its argument key, is authored once per side, and the relay receipt's comparison depends on both sides running the same script | reviewer F2 | U5g 2 |
| The guide's refusal bullet makes the `authorize` callback answer the status; the callback rejects the credential and the installed relay answers | reviewer F3 | U5g 3 |

U5f owns `tests/distribution.test.ts`; U5g owns the fixtures and the guide. They run in sequence,
not together, because one checkout takes one writer at a time.

### Ruled

- **Claim 14, ship.** The reviewer confirms and the checker confirms the mechanical half; Astra
  held it only on claim 6, which U5f closes. Every lane agrees the bump's trigger is not this
  delta — the package publishes `dist/src` and `README.md`, and the delta touches only tests and
  one guide section — but the `src/**` work already beneath this baseline, read against the
  published artifact in `K-dist-compare-mcp-v31.txt`. mcp releases as 0.0.31 once the scaffold
  0.0.69 re-pin clears the policy row and `prepublishOnly` runs green end to end.
- **The `neither`/`either` class.** The reviewer found campaign-added uses that its own count
  sweep's pattern would have missed, and ruled each permitted in the sense the repository's own
  canon uses. Adopted as ruled; no edit.
- **Reviewer F4, whether `files ⊇ imports` can fail at all.** It cannot: the walk pushes each
  resolved target into both sets in one loop, so that half holds by construction. That is the same
  defect Astra's claim 6 measured from the other side, and U5f's closure assertion is what gives
  the group a half that can fail. The referral is answered here rather than carried.

### Carried forward

A5b's twelve carry-forwards stand unchanged; both native lanes checked their findings against that
list before reporting, and the reviewer confirmed the synthetic-test one remains open. Nothing new
is added to it by this round.

VERDICT: FAIL 6 (carried by U5f), with the reviewer's F1, F2, and F3 carried by U5g
