This looks complete. Let me return the final report content as required.

## Fix round 3

Closes audit round 3's refutation of claim 4 (the § Fix round 2 sweep record stated a hit that does not exist and sat outside § Sweeps), F3 (the guide's "rethrows unchanged" claim was pinned only by a substring assertion), and F4 (stale citations in this report). Round 3 held every other claim.

**Row 1, the sweep record.** § Fix round 2's row 5 stated that the alternation matches `guides/table.md:226` and quoted `createTable never reaches it`; that phrase exists on no single line of the checkout — `guides/table.md:229-230` wraps `` `createTable` never reaches `` across a line break. Deleted that false quotation from § Fix round 2's row 5 and restated it to name the alternation's actual single hit, `guides/table.md:1301`. Added a § Sweeps row after the original `isBrowserVuePath` row, carrying every pattern re-run with the Grep tool over `{src,tests,guides}/**/*.{ts,md}` plus `README.md`, excluding `node_modules`:

- `is the one path that` — 0 hits.
- `refuse first\.` — 0 hits.
- `createTable never reaches it|which the guard and the audit refuse first` — 1 hit, `guides/table.md:1301`, ruled the row-2 result.
- The number-word sweep `\b(two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b`, case-insensitive, over `src/**/*.ts` and `tests/**/*.ts` outside `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`: 8 hits other than `one`, each ruled an arity or an example magnitude as read — `src/core/types.ts:277` ("Compares two cells"), `src/core/types.ts:393` ("separates two"), `src/core/types.ts:855` ("ten thousand rows"), `src/core/helpers.ts:128` ("two lens lists"), `src/core/helpers.ts:132` ("two terms"), `src/core/helpers.ts:173` ("Compares two cells"), `tests/guides.test.ts:708` (`'twelve'` as a data literal), and `tests/src/core/helpers.test.ts:243` ("two lens lists").

**Row 2, the anchored assertion.** `tests/src/core/Table.test.ts:114` now reads `expect(() => new Table(schema)).toThrow(/^column "id" has metadata that cannot be owned$/)`, an anchored pattern that a wrapping prefix such as the one at `src/core/Table.ts:68` would fail. Ran `npm --prefix /home/user/fleet/table run test:src > /home/user/work/evidence/table-proofs/table-fix3-test-src.txt 2>&1`: 16 test files passed (16), 104 tests passed (104).

**Row 3, the citations.** At report line 18, `table-subj-2`'s note now cites `guides/table.md:229-233` for the scoped sentence and names the two sites fix round 2 added (`guides/table.md:175-178`, `guides/table.md:1301`). At report line 162, "per the evidence below" now reads "per the evidence recorded earlier in this section". At report line 33, the `tests/src/core/Table.test.ts` note now names the title rename at `tests/src/core/Table.test.ts:29`. At report line 37, the `guides/table.md` note now names the Guards-paragraph sentence and the scoped `SCHEMA` row fix round 2 added.

**Gates.**

| Command | Exit |
| --- | --- |
| `npm --prefix /home/user/fleet/table run format:check` | 0 |
| `npm --prefix /home/user/fleet/table run lint:check` | 0 |
| `npm --prefix /home/user/fleet/table run check` | 0 |
| `npm --prefix /home/user/fleet/table run build` | 0 |
| `npm --prefix /home/user/fleet/table test` | 0 |

`npm test` totals: `src:core` 104 passed, `policy` 111 passed, `config` 46 passed, `setup` 12 passed, `guides` 82 passed (the `src:core` count is unchanged at 104; the anchored assertion tightened an existing case rather than adding one).

`cd /home/user/fleet/table && npx scaffold audit --offline` exit 0, summary line: `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

`node /home/user/scaffold/tmp/work/evidence.mjs table`: `/home/user/work/evidence/conform-table.diff` 662 lines, `/home/user/work/evidence/conform-table.status` 10 entries (the same Owned files as § Fix round 1). `git -C /home/user/fleet/table status --short` lists the same ten modified files under Owned, and no untracked file.

---

Files changed:
- `/home/user/fleet/table/tests/src/core/Table.test.ts` — line 114 now uses the anchored regex assertion `toThrow(/^column "id" has metadata that cannot be owned$/)`.
- `/home/user/scaffold/tmp/units/conform/conform-table-report.md` — deleted the fabricated sweep-hit quotation in § Fix round 2 row 5, added a § Sweeps row with the four re-run patterns and results, corrected the stale citations at lines 18, 33, 37, and 162, and added the § Fix round 3 section above.
- Evidence files under `/home/user/work/evidence/table-proofs/`: `table-fix3-test-src.txt`, `table-fix3-format-check.txt`, `table-fix3-lint-check.txt`, `table-fix3-check.txt`, `table-fix3-build.txt`, `table-fix3-test.txt`, `table-fix3-audit.txt`, `table-fix3-evidence.txt`, `table-fix3-git-status.txt`.

No deviation occurred: every quoted line in the brief and the round-3 audit sat within tolerance of the named location, and every gate exited 0.
