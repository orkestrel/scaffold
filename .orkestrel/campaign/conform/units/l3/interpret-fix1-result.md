## Fix round 1

Closed the round-1 objective lane's refutation of claim 4 (`units/l3/interpret-objective-r1.md`
§ Required change R-1). § Sweeps now carries the interpret-obj-6 row and a widened `complete` row.

1. **Added the interpret-obj-6 row.** `grep -rniE "zero-dependency|ESM-only|no CommonJS build|Node\.js
   >= 22$"` over `src`, `tests`, `README.md`, `guides/interpret.md`, and `guides/README.md` returns
   one hit — `tests/distribution.test.ts:60`, an unrelated comment describing the `require`
   condition's `.d.mts` declaration extension, not the removed package-format claim. Every one of the
   row's old forms is gone.
2. **Rewrote the `complete` row.** Ran `grep -rniE "\bcomplete(s|d|ing)?\b"` at a word boundary over
   the inflections, over `src`, `tests`, `README.md`, `guides/interpret.md`, and `guides/README.md`
   — `guides/README.md` now in the population. Every hit is ruled by sense: the derivation sentence
   at `types.ts:277` and `guides/interpret.md:69`; the absence assertions at `Interpret.test.ts:99-100`,
   `Clarifier.test.ts:28`, and `Extractor.test.ts:43`; and the English adjective or its inflections
   at every remaining site. `guides/README.md` carries no hit.

Report path: `/home/user/scaffold/tmp/units/conform/conform-interpret-report.md`. No file under `/home/user/fleet` changed.
