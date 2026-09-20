# u7d-bounds — audit verdict, 2026-09-20

Subject: unit u7d-bounds in the Veneer checkout, written by `opus` on Opus 5 (native Agent lane)
under `units/u7d-bounds-brief.md`, report `units/u7d-bounds-report.md`. Claims:
`u7d-bounds-audit-claims.md`. Evidence rendered for the read-only lanes:
`units/u7d-bounds-diff.patch.txt` (`git diff 7da6bb1 -- . ':(exclude)tmp'`) and
`units/u7d-bounds-status.txt`. Landing: `units/u7d-bounds-land.sh`,
`units/u7d-bounds-land-message.txt`, `units/u7d-bounds-land.log.txt`.

## Lanes

Opus wrote the unit, so Astra holds the objective lane and Opus the subjective lane (the default
assignment; no swap needed). All four ran, blind to each other, on one claims file.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0c123-4c01-77b2-b015-aa3f57d98ea5`, exit 0 | `units/u7d-bounds-audit-analyst.sh`, `units/u7d-bounds-audit-analyst-report.md` | accept |
| subjective | `reviewer` | native Opus 5, Workflow `wf_8db70e17-fda` | `units/u7d-bounds-audit-reviewer-brief.md`, `units/lane-u7d-bounds-reviewer.md` | accept |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/u7d-bounds-audit-checker-brief.md`, `units/lane-u7d-bounds-checker.md` | accept |
| gates | `verifier` | native Sonnet, the same Workflow | `units/u7d-bounds-gate-brief.md`, `units/lane-u7d-bounds-verifier.md` | every step exit 0, `npm test` included |

## Claims

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 paint doc blocks true | REFUTED as wording (the matrices sentence is too broad: legacy RGB skips the matrices) | CONFIRMED, wording bounds 15 to 18 | — | CONFIRMED on the substance the brief fixed (no unread-colour claim; the added reading named; the dated agreement; the caveats kept; no body changed); the analyst's overstatements are bounds |
| 2 cases as agreement | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 3 the unknown run first | CONFIRMED from the probe logs | UNDECIDABLE (readings live in the report only) | — | CONFIRMED from the unit's `tmp/u7d-bounds/probe.log.txt` and `probe2.log.txt`, which the analyst read |
| 4 `every` row shipped | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 digest in the chdir case | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 6 manifest-rooted pinned-release case | CONFIRMED as written | CONFIRMED | — | CONFIRMED; the hoisted-install half of finding 17 stays open (analyst 14) |
| 7 refusal label | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 8 binding reach and the deletion | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 9 scope and law | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 10 cases kept | CONFIRMED within scope | CONFIRMED | CONFIRMED | CONFIRMED |
| 11 gates | UNDECIDABLE | UNDECIDABLE | — | CONFIRMED from the verifier: fourteen steps exit 0 on Chromium and Edge, `npm test` exit 0, `scaffold audit` 0 of 48 paths drifted |

## Bounds carried

None forces a round. Every bound below goes to one successor, `u7-setup-tidy` (a native unit
after U7a lands, before U7b), except where another carrier is named.

- analyst 12, reviewer 15, 16, 17, 18: the paint wrappers' doc blocks overstate (matrix conversion
  for every form; universal agreement; a "derived from the matrices" provenance; an ambiguous
  `This`; a dated colour no case pins; a paragraph repeated in both blocks). The successor
  removes the wrappers: `readPaintedColor` and `matchesPaintedColor` measured equal to the
  installed reader, so the styles proofs compare through `matchesColor` over `readStyle` strings
  and the wrappers' blocks go with them (`AGENTS.md` § No superfluous wrappers). U7a's brief
  already tells its new proofs to take no dependency on the wrapper.
- analyst 13, reviewer 20: the chdir case's pool comment names the wrong failure (`process.chdir`
  is unavailable in a worker thread) and the `setup` project pins no pool. [`u7-setup-tidy`: pin
  `pool: 'forks'` on the `setup` project in `vite.config.ts` and point the comment at it]
- analyst 14, 15, reviewer 19: `BOOTSTRAP_CASCADE_PATH` is workspace-relative and the comment
  names a browser consumer that does not exist; the release pin and the digest live under two
  names in two modules that import each other. [`u7-setup-tidy`: one pin and one digest,
  imported; delete the relative constant if no consumer remains]
- analyst 16: exact-over-fallback binding precedence has no live regression case. [the unit that
  lands the first real `btn | event` ledger row]
- analyst 17: the report says the out-of-gamut pairs agree exactly; `probe2` shows agreement
  within tolerance (`[0,170,0,1]` against `[0,169.67…,0,1]`). Recorded here; the report is not
  edited.
- reviewer 12: `readCompatibility` still labels an incomplete row by its (possibly empty) cells.
  [`u7-setup-tidy`: the position-and-first-cell label `readDeferrals` uses]
- reviewer 13, 14: the surviving `btn | event` fallback answers no ledger row and refuses with
  `recording contradicts obligation`, blaming the fixture. [`u7-setup-tidy`: the reach assertion
  covers fallbacks; the refusal names the binding]
- reviewer 21, 22: the collector's summary reads awkwardly; the refusal label prints a cell
  without its column. [`u7-setup-tidy`]

## Rulings

- The wrappers stay in this unit because their consumers (`tests/src/styles/**`) were off-limits;
  their removal is the successor's first item, not a reopening of this unit.
- The report's item 6 decision (delete the unreachable named binding rather than add a second
  unreachable fallback) stands; the reviewer's finding 13 narrows what remains and is carried.

## Terminal

Verdict: accept. Land in Veneer by pathspec; U7a launches on the landing.
