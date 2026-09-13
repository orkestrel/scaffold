# Audit verdict — u-fix-6-audit (mechanical round)

Subject: `@orkestrel/scaffold@0.0.65` at `72ba0dd`, the chain `a6023fb..72ba0dd`, which changes
`ROADMAP.md` alone. Lane run: the mechanical checker on Cursor Grok 4.6 (session
`22d4cbe4-7212-4aea-8ea7-d5f6929975f8`, journal `tmp/cursor/u-fix-6-check.jsonl`, 472291 bytes),
retained under `lanes/u-fix-6-check-grok.md`, plus the Orchestrator's own sweeps.

Lanes not run: the subjective and objective judgment lanes. Reason, this round's own: the unit
edits `ROADMAP.md`, which ships nowhere (`package.json` `files`, `host.json` storage paths), every
replacement was prescribed from the previous round's three lanes, and the shipped surface is
byte-identical to the surface the U-fix-5 round confirmed (`pack-dry-run-6.md` against
`pack-dry-run-5.md`: same file set, same sizes). A judgment lane would rule on bytes it already
ruled on.

## Readings

- Every prescribed replacement in `u-fix-6-brief.md` and `u-fix-6b-brief.md` is EXACT at
  `72ba0dd` (Grok § (1)).
- Every backticked token in the scaffold rows from the crash row through the 0.0.65 successor row
  (`ROADMAP.md:371-462`) is followed by a noun (Grok § (2)); the Orchestrator's sweep over the
  same rows finds no token before punctuation, no backticked version, and direction words only
  inside quoted data.
- `git show --name-only 72ba0dd`: the code, the unit report with its successor return, both
  briefs, the integration pair, and the gate evidence in one commit; `final7.status.txt` every row
  exit 0.
- Grok's table also reaches a pre-existing scaffold row at `ROADMAP.md:545-565`, outside every
  campaign edit, where tokens sit without nouns and "newer" appears in prose. That row predates the
  campaign and was never in any brief's scope; the U-fix-3 brief already named a file-wide ROADMAP
  pass as a successor's, and this reading is its evidence.

## Ruling

The unit landed exactly as prescribed, the shipped surface is unchanged, and the release tip is
`72ba0dd`. The upload proceeds on the user's one-time code.

VERDICT: PASS
