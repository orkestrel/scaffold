<!-- workflow wf_5326ee42-961, agent ad168c2ea15c111ed, captured from journal.jsonl -->

## Per-claim verdicts

**Claim 1** — CONFIRMED. Each of the eight edits reads at its site as prescribed, and no amended sentence violates `AGENTS.md` § Writing or `.claude/rules/writing.md`.

- Edit 1 (`guides/scaffold.md`): the round-3 "replace" source — "so a public declaration naming a lib type that compiler lacks fails the rollup until `@microsoft/api-extractor` bundles a later one." — was placed at this exact site by the predecessor unit (`/home/user/scaffold/tmp/units/ts7-seven-fix-brief.md:28`, confirmed landed at `/home/user/scaffold/tmp/units/ts7-seven-fix-report.md:12`). The diff (`/home/user/scaffold/tmp/units/ts7-seven-fix-2.diff.txt:105-129`) shows the final text "so a public declaration resolves only the lib types that compiler provides." present verbatim. No count, no ambiguous pronoun, no banned substitution term.
- Edit 2: predecessor text "That workspace's `audit` reports one non-blocking `dependencies` question, the crossed-major reading every foreign row earns: …" is confirmed at `ts7-seven-fix-brief.md:29`. The diff shows "reports a non-blocking" in the final state (diff.txt:126). This removes the count-of-a-growable-set violation ("one … question") the earlier round's own edit had introduced — the correct fix.
- Edit 3 (`tests/src/core/constants.test.ts:194`): predecessor text "That range is a floor of the same form" confirmed at `ts7-seven-fix-brief.md:34`/report.md:18. Diff (diff.txt:344-348) shows the final "`APP_BROWSER_TYPESCRIPT_RANGE` is a floor of the same form" — resolves the ambiguous-pronoun defect the writing rules forbid.
- Edit 4 (`tests/src/core/compilers.test.ts:1445`): diff.txt:316 shows the exact prescribed name `"sets the rollup's compiler folder override in every declaration-rolling face"`.
- Edit 5 (`tests/setupServer.ts:1681-1687`): diff.txt:230-259 shows `published`/`latest` bound once and the callback parameter renamed to `entry` exactly as prescribed.
- Edit 6/7 (`tests/setupServer.test.ts`): diff.txt:170-193 shows `['0.0.4', '0.0.8']`, `latest: '0.0.4'`, ordering `'0.0.4'` then `'0.0.8'`, and the added `refuses to publish no version at all` row with the prescribed message.
- Edit 8 (`PROPOSAL.md:354-356`): predecessor text "…entries, preview surfaces that 7.1 replaces, and `@orkestrel/guide`'s `Source`" confirmed at `ts7-seven-fix-brief.md:36`/report.md:20. Diff (diff.txt:20-26) shows the final em-dash clause "preview surfaces carrying no stability promise, whose shape 7.1's different API can change" verbatim, at ≤100 columns.

**Claim 6** — CONFIRMED. `host.json`'s only two hunks in the diff are the `guides/scaffold.md` entry's `digest` field (`ts7-seven-fix-2.diff.txt:146-152`) and the trailing root `digest` field (`ts7-seven-fix-2.diff.txt:159-160`). No other `host.json` hunk appears anywhere in the 351-line diff.

**Claim 7** — REFUTED. `src/core/templates.ts` is confirmed absent from both the diff and the status file (neither `ts7-seven-fix-2.diff.txt` nor `ts7-seven-fix-2.status.txt` names it), but the first clause is false: `/home/user/scaffold/tmp/units/ts7-seven-fix-2.status.txt:1-2` lists `M .orkestrel/campaign/ts7/ledger.md` and `M .orkestrel/campaign/ts7/orchestrator-measurements.md` as modified. Neither file sits in either unit's owned set — the round-3 brief's off-limits list is "everything else, `.orkestrel/**`, `tmp/**` …" (`ts7-seven-fix-2-brief.md:44`), and the predecessor brief's off-limits list likewise names `.orkestrel/**` (`ts7-seven-fix-brief.md:45`). Both files changed in the tracked tree the claim covers, so "no file outside the two units' owned sets changed" does not hold as stated.

## Findings outside the claims

None. A full-diff sweep for the banned substitution terms (`should`, `via`, `just`, `simply`, `ensure`, `once`, `new`, `latest`, `currently`, `now`, `utilize`, `leverage`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`, `dummy`) across every prose hunk in `ts7-seven-fix-2.diff.txt` (`PROPOSAL.md`, `ROADMAP.md`, `guides/scaffold.md`, `tests/setupServer.ts` TSDoc, `tests/src/core/compilers.test.ts` comment) turned up only in-code identifiers (`dist-tags.latest`, `new Error`), each exempt as a literal code token, and no prose-sense hit.

VERDICT: FAIL 7; outside the claims: none
