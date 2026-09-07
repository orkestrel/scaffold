Lane held: checker emitter

**Claim 1 — every item landed in the diff as the brief states it; nothing else changed.**
PASS. `d7n-emitter-converge-fix.status.txt` lists exactly `M guides/emitter.md`, `M src/core/Emitter.ts`, `M tests/guides.test.ts` — the three files the brief's Scope names as owned (`guides/emitter.md`, the `Emitter` class doc block under `src/core/**`, `tests/guides.test.ts`). The diff shows exactly item 1 (examples binding hoisted out of the `it` callback, `tests/guides.test.ts:214-220`), item 2 (`GUIDE_SPEC` at `tests/guides.test.ts:273` region), item 3 (`Emitter.ts:13` doc block naming `EmitterInterface`, carried into `guides/emitter.md:63` by `--to guide`), and item 4 (the `Shape` convention sentence at `guides/emitter.md:67` and the three changed rows at `:74-76`). No fourth file, no unrelated hunk.

**Claim 2 — citations match the tree left; no count in prose; pin described only in the file's words.**
PASS. `grep -n "guides/emitter.md'" /home/user/fleet/emitter/tests/guides.test.ts` returns only `32:const GUIDE_SPEC = 'guides/emitter.md'`, matching the report's `:32` citation. The `:63`, `:75`, `:76` line citations match the current tree read directly (`Emitter` row at `:63`; `EmitterOptions` at `:75`; `EmitterInterface` at `:76`). No numeral appears in authored prose (diffstat and comparator JSON are quoted command output, not authored claims). No mention of "pin" anywhere in the report — the pin claim item does not apply to this package's report, so nothing falsifies it.

**Claim 3 — each named correction present as the audit finding asked.**
PASS, all four:
- Hoisted `examples` binding: `diff <(sed -n '191,210p' abort/tests/guides.test.ts) <(sed -n '211,230p' emitter/tests/guides.test.ts)` reported `IDENTICAL to pilot block` in the report; independently read, the pilot's block at `/home/user/fleet/abort/tests/guides.test.ts:212-218` is character-identical to the emitter diff's added lines.
- `GUIDE_SPEC`: confirmed above, single occurrence.
- Class row: `grep -rn "the emitter contract"` over the package returns no matches; `guides/emitter.md:63` and `src/core/Emitter.ts:13` both read `Implements \`EmitterInterface\` over…`.
- `Shape` idiom: `guides/emitter.md:67`'s convention sentence is byte-identical to `/home/user/fleet/budget/guides/budget.md:60`, so it is the fleet's shared wording. The comparator output pasted in the report (`missing: []`, `added: []`, three `changed` entries all naming column `"Shape"`) matches the actual diff exactly.

**Findings outside the claims (referral).** The report self-flags that adding `readonly` to the `EmitterHooks` `Shape` cell "sits outside the split F3 named" and asks the auditor to rule on it. This is a scope judgment (whether Ruling 12's "type alias's own type literal" clause extends to restoring a dropped modifier) that the checker cannot decide mechanically; the file stays inside the owned `guides/emitter.md`, so it does not break scope honesty, but whether it exceeds item 4's intended reach is a design-fit question for the subjective lane or the Orchestrator, not this lane.

VERDICT: PASS
