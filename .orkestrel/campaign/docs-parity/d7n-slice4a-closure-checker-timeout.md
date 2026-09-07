Lane held: checker timeout

**Claim 1 — Every item the fix brief names landed in the diff as stated, and nothing else changed (scope honesty).**
PASS.
- Item 1 (hoisted `examples` binding): confirmed in `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-timeout-converge-fix.diff.txt` — the `examples` ternary moved above `describe(...)`, matching the report's byte-diff check against the pilot.
- Item 2 (`GUIDE_SPEC` order): diff moves `GUIDE_SPEC` from after `ROOT_FILES` to between `EXAMPLE_LANGUAGE` and `MODULES`.
- Item 3 (`Shape` idiom on `TimeoutOptions`): diff rewrites the row to `` `{ id?, ms, signal? }` ``, bare names with `?`, matching Ruling 12 in `rulings.md`.
- Item 4 (`Shape` members' sentence): diff reworks the paragraph under the Types table to name `id`/`ms`/`signal`/`expired` as the `Shape` cell's members and `start`/`clear` as the methods. The writer also corrected the `## Methods` lead paragraph carrying the identical false phrase ("stay Surface rows") — an ancillary, in-file, same-finding extension the writer recorded, permitted under the anatomy's ancillary-conflict clause.
- Item 5 (prose): `clear()` verb fix, both `CLEARS`→`clears` sites, plus the swept Contract-item-3 count removal, all present in the diff.
- Item 6: `npm run docs` at zero, both directions `written: 0`, scoped suites green — all shown in the report's criterion 2 block.
- Scope: `d7n-timeout-converge-fix.status.txt` lists only `guides/timeout.md` and `tests/guides.test.ts` modified, both owned; `README.md` untouched as the report states. Nothing off-limits touched.

**Claim 2 — Report citations match the tree left; report states no count in prose; the pin is described only in words the file carries.**
FAIL.
- Citations check out: the report's grep hits at `guides/timeout.md:42` and `:132` are consistent with the diff's hunk offsets (the `Shape`-table hunk at original line 78 adds one line, shifting the later `CLEARS` occurrence from the brief's pre-edit `:131` to post-edit `:132`; the earlier occurrence at original line 42 is unaffected and unshifted) — this part is accurate.
- The pin element does not apply to timeout (no pin claim in this package's brief or diff); vacuous.
- The "no count in prose" requirement fails. The report states counts as authored prose, not as quoted tool output: "a single `changed` entry whose `col` is `Shape`" (Criterion 3 section), "one prose hit, `guides/timeout.md:19`, corrected" (Item 5), and "The sweep found one further site" (Item 5). Each names a count on a set that can grow (entries, hits, sites), which `AGENTS.md` § Writing and the fix brief's own output contract ("No count in prose") forbid.

**Claim 3 — The named corrections are each present as the audit's finding asked.**
PASS.
- Examples binding hoist matches the pilot form (report's `diff`/`awk` comparison exits 0).
- Constants' order matches the pilot's position.
- `Shape` idiom matches Ruling 12 exactly (bare names, `?` for optional, no types).
- `Shape` members' sentence renamed to the interface's `readonly` members with `start`/`clear` named as methods, closing objective F6.
- Prose corrections (`clear()` as a verb, `CLEARS`→`clears` at both sites) present in the diff.

Findings outside the claims: none identified beyond the count-in-prose violation already ruled under claim 2.

VERDICT: FAIL 2
