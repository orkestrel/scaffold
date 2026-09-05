<!-- workflow wf_771a9101-0fb, agent af8c75ac2a045e0f0, captured from journal.jsonl -->

## Per-claim verdicts

**Claim 1 — REFUTED.** Every prescribed edit (items 1–10) reads at its cited site with the exact prescribed text (verified token-for-token against `tmp/units/ts7-seven-fix-brief.md` items 1–10 and the diff), but two of the amended sentences violate the writing rules the claim itself binds:

- `guides/scaffold.md:1159` (diff line 132–133): "That workspace's `audit` reports **one** non-blocking `dependencies` question" states a count of a growable set — the number of dependency questions `audit` can report for a workspace, which is not fixed at one in general (`guides/scaffold.md:1198-1199`, unedited, shows a foreign row can carry two such questions: "one for a floor below the newest release … and one for a newer major"). `AGENTS.md` § Writing: "**NEVER state a count.** A number answering 'how many' about a set anyone can add to is a count." "A" or "a non-blocking … question" carries the same meaning without the count.
- `tests/src/core/constants.test.ts:194`: "so it receives `APP_BROWSER_TYPESCRIPT_RANGE` instead of the shared range. **That range** is a floor of the same form, so it answers to the same pattern." Two range nouns precede the pronoun (`APP_BROWSER_TYPESCRIPT_RANGE` and "the shared range"); on proximity "That range" attaches to "the shared range," but the sentence is only informative if it names `APP_BROWSER_TYPESCRIPT_RANGE` (the value the test actually receives and checks against `TOOLCHAIN_RANGE_PATTERN` at `constants.test.ts:201`) — a comparison of "the shared range" to itself is vacuous. `.claude/rules/writing.md` and `AGENTS.md` § Writing require naming the noun wherever the reader could attach the pronoun to another referent; this is exactly that case.

Items 1, 2, 4, 5, 6, 7, 9, 10 read as prescribed with no further writing-rule defect found in their added text (checked against the substitution table, voice, condition-first order; none of `should`, `via`, `just`, `simply`, `ensure`, temporal `once`, dating `new`/`latest`, `currently`, `now`, `utilize`, `leverage`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`, `dummy` appear in prose outside code tokens). Item 9's four rewraps change no word outside the two locations item 10 independently amends (verified against `tmp/units/ts7-seven-fix.diff.txt:5-58`).

**Claim 6 — CONFIRMED.** `host.json`'s entire diff (`tmp/units/ts7-seven-fix.diff.txt:148-167`) touches exactly two digest fields: the `guides/scaffold.md` storage entry's `digest` (line 156-157) and the file's own trailing top-level `digest` (line 165-166, confirmed at `host.json:775` as the closing root property). No other entry in `host.json` changed.

**Claim 7 — CONFIRMED.** `tmp/units/ts7-seven-fix.status.txt` lists modified files as exactly: `.orkestrel/campaign/ts7/ledger.md` (excluded by the claim's own carve-out), `PROPOSAL.md`, `ROADMAP.md`, `guides/scaffold.md`, `host.json`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/constants.test.ts` — the nine files the claim names, no more. The six untracked (`??`) entries are all under `.orkestrel/campaign/ts7/`, covered by the same carve-out. `src/core/templates.ts` (the item 11 plant) is absent from status, consistent with the report's byte-identical-restore claim.

Claims 2–5 are outside this checker's required-full scope per the dispatch ("Rule on claims 1, 6, and 7 in full"); not ruled here.

## Findings outside the claims

None. Both defects found sit inside claim 1's own text (items 3 and 8 of the prescribed edits) and are reported there.

VERDICT: FAIL 1; outside the claims: none
