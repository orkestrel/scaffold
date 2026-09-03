Same ten files as prior rounds, all under Owned across rounds. Task complete.

## Report — Fix round 4

Read `guides/table.md:1172-1173` and `:1218` before editing, per round 4's F5 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/table-objective-r4.md`).

## Fix round 4

Closes audit round 4's F5: the tally-deletion rewrite's `below` at `guides/table.md:1172-1173` and the rewrapped `above` at `guides/table.md:1218` both read as a `.claude/rules/writing.md` § Code tokens, references, and links fix, one vocabulary in one file.

**Row 1.** `guides/table.md:1173` now reads: `` `auditTable` is the semantic pass beyond structural validation. It reports the domain faults listed following and every budget breach stated earlier. The shape alone cannot see them, except an unownable `meta`, ``.

**Row 2.** `guides/table.md:1218` now reads: `` nothing to. Every readonly data member stays in the `## Surface` rows stated earlier and is not repeated ``.

**Row 3, presence guards.** Grep of `tests/guides.test.ts` for the two old sentences ("listed below", "breach above", "rows above") returned no match; the file carries no presence guard quoting either line. Ran `npm --prefix /home/user/fleet/table run test:guides > /home/user/work/evidence/table-proofs/table-fix4-guides.txt 2>&1`: 1 test file passed (1), 82 tests passed (82).

**Row 4, the sweep.** Ran `\b(above|below)\b`, case-insensitive, over `guides/table.md`, `README.md`, `src/**`, and `tests/**`, excluding `node_modules` and the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`.

| Site | Text | Sense | Ruling |
| --- | --- | --- | --- |
| `guides/table.md:56` | "Everything below is exported" | document reference | outside Owned — finding, unfixed |
| `guides/table.md:106` | "the readonly state below" | document reference | outside Owned — finding, unfixed |
| `guides/table.md:195` | "hostile-reflection boundary below" | document reference | outside Owned — finding, unfixed |
| `guides/table.md:227` | "subject to the core's hostile-reflection boundary below" | document reference | outside Owned — finding, unfixed |
| `guides/table.md:488` | "the line every refusal below is measured against" | document reference | outside Owned — finding, unfixed |
| `guides/table.md:1495` | "the worked examples above executed" | document reference | outside Owned — finding, unfixed |
| `README.md:77` | "the layer above" | architectural sense | stays |
| `tests/src/core/tables/PaginationManager.test.ts:39` | "floors a page size below one" | magnitude sense | stays |
| `tests/guides.test.ts:233` | "Each test below transcribes" | document reference, in a source comment | outside Owned — finding, unfixed |

No hit in `src/**`. The six document-reference hits outside the two Owned lines are findings this unit records rather than fixes, per the row's scope.

**Gates.**

| Command | Exit |
| --- | --- |
| `npm --prefix /home/user/fleet/table run format:check` | 0 |
| `npm --prefix /home/user/fleet/table run lint:check` | 0 |
| `npm --prefix /home/user/fleet/table run check` | 0 |
| `npm --prefix /home/user/fleet/table run build` | 0 |
| `npm --prefix /home/user/fleet/table test` | 0 |

Converged with `npx oxfmt --config .oxfmtrc.json guides/table.md` once before the gate chain; `format:check` read green after, with no further reformatting needed for the two edited lines.

`cd /home/user/fleet/table && npx scaffold audit --offline` exit 0, summary line: `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

`node /home/user/scaffold/tmp/work/evidence.mjs table`: `/home/user/work/evidence/conform-table.diff` 662 lines, `/home/user/work/evidence/conform-table.status` 10 entries (the same Owned files as § Fix round 1).

Files touched: `/home/user/fleet/table/guides/table.md`, `/home/user/scaffold/tmp/units/conform/conform-table-report.md`. `tests/guides.test.ts` was inspected but required no change (no presence guard matched). `git -C /home/user/fleet/table status --short` still lists the same ten modified files, all under Owned across rounds, no untracked file.
