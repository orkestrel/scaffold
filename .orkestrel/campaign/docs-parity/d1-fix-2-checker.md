Confirmed — only one RN mention, and it states the separator as `|` (bare pipe), not ` | ` (space-pipe-space). This is a real mismatch between the file's actual state and both the fix brief's requirement and the report's own claim (report line 19 asserts it was written as `` ` | ` ``).

## Per-claim verdicts

**Claim 1 — FAIL.**
`findUnnamed` removal, `extractUnnamed(document)` with TSDoc, `GuideInterface.unnamed()`, `Guide` caching, and the test wiring all check out:
- `/home/user/fleet/guide/src/core/helpers.ts:1409-1424` — `extractUnnamed(document)` with TSDoc naming `{@link GuideInterface.unnamed}`.
- `/home/user/fleet/guide/src/core/types.ts:206-211` — `unnamed(): readonly string[]` with contract and `@example`.
- `/home/user/fleet/guide/src/core/Guide.ts:462,473,492-494` — `#unnamed` cached once at construction, returned by accessor.
- `/home/user/fleet/guide/tests/guides.test.ts:92` — `expect(guide.unnamed()).toEqual([])`; no `@orkestrel/markdown` import in that file (grep, no matches).
- `/home/user/fleet/guide/guides/guide.md:46,233,280` — Types, Methods, and extraction-model prose carry `unnamed`.

But the RN catalog row's separator is wrong. Report line 19 and the fix brief both require the separator written as space-pipe-space, and `/home/user/fleet/guide/guides/guide.md:477` reads "read through `extractCellText` and joined by `|`" — a bare pipe, not `` ` | ` ``. The actual implementation at `/home/user/fleet/guide/src/core/helpers.ts:1433` does join with `' | '` (space-pipe-space), and the helpers TSDoc at `helpers.ts:1412-1413` states it correctly ("joined by `` ` | ` ``"), so only the guide's RN row drifted from both the code and the report's own claim about it.

**Claim 2 — PASS.**
- `/home/user/fleet/guide/guides/guide.md:280` — enumeration lists `tagline` and `unnamed`.
- `grep -rn "block-position" src guides tests` (run over `/home/user/fleet/guide`) — no matches.
- `/home/user/fleet/guide/guides/guide.md:333-334` — "`\|` are markdown syntax the parser resolves, so those clauses reach only a guide cell" states `\|` as guide-side.

**Claim 3 — PASS.**
- `/home/user/fleet/guide/src/core/helpers.ts:1547` — `maskFences` exported; TSDoc at `:1531-1546`.
- Wired at `helpers.ts:1676` (`extractExampleLines`), `:1698` (`collectSummaries`), `:1724` (`collectExamples` tag match, reused at `:1732/:1735` for the next-tag search on the same `masked` value).
- Tests: `maskFences` cases at `/home/user/fleet/guide/tests/src/core/helpers.test.ts:2227-2264`; the three fenced-body cases at `:2305`, `:2310`, `:2316`.
- Guide states the rule at `/home/user/fleet/guide/guides/guide.md:342-346`.

**Claim 4 — PASS.**
- Pairing paragraph: `/home/user/fleet/guide/guides/guide.md:355`.
- EQ row: `guides/guide.md:512`.
- `findDrift` TSDoc: `/home/user/fleet/guide/src/core/helpers.ts:1941`.
- `grep -n "A heading pairs one fence" src guides` — no matches.

**Claim 5 — PASS.**
- `/home/user/fleet/guide/README.md:126-127` — `tagline()` and `unnamed()` in the projections list.
- `README.md:139,143,146` — `findDrift` and `extractUnnamed` entries after `findMissingSymbols` (line 137).
- `grep -n "block-position" README.md` — no matches.

**Claim 6 — PASS.**
- `/home/user/scaffold/.orkestrel/campaign/docs-parity/d1-fix-2.status.txt` lists the D1 owned set (matching the report's own `git status --short` at report:227-244, minus the pre-patch absence of `README.md`) plus `README.md`.
- The failing-first cases the report names (report:92-99) exist verbatim at `tests/src/core/helpers.test.ts:2305,2310,2316`.
- Each criterion in the report (§ Criteria, report:149-221) states an exit code (`exit 0` throughout).
- The "Flagged claims" section (report:273-280) states each item as a limit or observation, not a deviation.

VERDICT: FAIL 1