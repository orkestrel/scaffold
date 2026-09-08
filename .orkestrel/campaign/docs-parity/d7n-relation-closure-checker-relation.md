Lane held: checker relation

**Claim 1 — scope honesty.** PASS. `d7n-relation-converge-fix.status.txt` lists exactly: `README.md`, `guides/relation.md`, `src/core/Model.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/guides.test.ts` — matching the claim's named set, nothing else.

**Claim 2 — report citations match the tree except the standing condition's exception.** PASS. Every hunk quoted in `d7n-relation-converge-fix-report.md` (items 1–7, criteria 1–5) was checked against `d7n-relation-converge-fix.diff.txt` and matches byte for byte, except the README lead-in material the standing condition names (§ Item 6, § Ancillary decisions, and — as further corroboration — the report's diffstat "70 insertions" versus the retained diff's actual 64 `+` lines (`grep -c '^\+[^+]'` = 64, `grep -c '^-[^-]'` = 61): the 6-line gap is exactly the two 3-line README lead-ins the Orchestrator struck before landing per Ruling 24. The current tip's `README.md:12-14` and `:23-25` confirm the `## Install` and `## Usage` fences sit bare under their headings, matching the pilot `/home/user/fleet/abort/README.md:12-14`. This is the same "point" the standing condition names, not a further defect. The report states no count in prose (scanned all narrative sentences; only durations, exit codes, and quoted command output with numerals appear).

**Claim 3 — each correction present.**
- RL1: PASS — `guides/relation.md:3-6` and `README.md:3-6` read identically "records loaded or found," no code token as a verb.
- RL2: PASS — `guides/relation.md:102` reads `OperationOptions plus { limit?, offset?, sort?, direction? }`; the `### Types` sentence at `:82` carries the Ruling 21 clause verbatim.
- RL3: PASS — `guides/relation.md:193` header reads "Foreign key location"; all fence comments (`:21-22`, `:170-172`, `README.md:45-46`) and `src/core/factories.ts:31-33` read "foreign key"; the titled pair stays equal. The sole surviving `FK` at `src/core/helpers.ts:45` is a runtime error string, correctly excluded.
- RL4: PASS — independent sweeps (`grep -rnE '\b[A-Z]{3,}\b' src`, `guides/relation.md`, `README.md`) show only permitted hits: error codes (`INVALID`, `UNKNOWN_RELATION`, `NOT_THROUGH`, `ABORTED`), `ORM`, `API`, `CRUD`, `ESM`, `MIT`, `LICENSE`, `AGENTS.md`, `README.md`. No `THIS`, `RELATED`, `NAME`, `COUNT`, `AFTER`, `PUSH`, or `ONCE` remains anywhere in `src` or the two documents.
- RL5: PASS — `tests/guides.test.ts:1-3` equals the pilot's `/home/user/fleet/abort/tests/guides.test.ts:1-3` byte for byte; the region `const root = ` (line 58) through the manifest loop's closing brace (line 269) is structurally identical to the pilot's corresponding region (lines 47-258), with only the package's own constants/imports (excluded by rule) and its own appended describe block after.
- RL6: PASS — one lead-in sentence sits between `### Defining relations` (`guides/relation.md:151`) and its fence (`:156`); every other guide fence under a heading already carries prose before it; the README's `## Install` and `## Usage` fences sit directly under their headings with no lead-in, per Ruling 24.
- RL7: PASS — `guides/relation.md:118`'s `Returns` cell reads `Promise<Loaded<T> | undefined>` with no "(or array)" chrome.

Findings outside the claims: none beyond the diffstat/README-lead-in discrepancy already reconciled under the standing condition.

Referrals: none — every claim resolved on direct evidence.

VERDICT: PASS
