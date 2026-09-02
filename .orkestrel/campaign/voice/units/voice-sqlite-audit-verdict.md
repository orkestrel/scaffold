# Audit verdict — unit voice-sqlite

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `1ede0ae`
(`units/voice-sqlite.diff`, `units/voice-sqlite.status`, `units/voice-sqlite-report.md`).
Rewritten per the writer: imperative 7, verbless 14, name 2, returns 1. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (PASS)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice). Sol bench dark; this lane ran on the writer's engine, told so.

Rule text governing the audit, quoted from /home/user/fleet/sqlite/node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md:75-78 — "The first sentence states what the symbol does in the third person with an `-s` verb — `Creates`, `Returns`, `Checks whether` — and never repeats the symbol's name." and "a boolean return as \"True if …; false otherwise\"".

Coverage: I read every hunk of the diff (no sampling) and every `/** */` block in `/home/user/fleet/sqlite/src/server/` — types.ts, constants.ts, errors.ts, helpers.ts, SQLiteDatabase.ts, SQLiteStatement.ts, factories.ts, index.ts. The population is the 22 blocks the launch scan counted; 21 changed, `createSQLiteDatabase` untouched.

1. CONFIRMED — every rewritten first sentence keeps the meaning of the sentence it replaced.
   Every hunk, ruled individually:
   - SQLiteDatabase.ts:14 "A synchronous SQLite database over …" → "Represents a synchronous SQLite database over …"; subject, qualifiers, code tokens identical.
   - SQLiteDatabase.ts:74 "Close the connection — enables …" → "Closes the connection — enables …"; verb inflection only.
   - SQLiteStatement.ts:12 "A prepared statement over `node:sqlite`'s `StatementSync` — the only way the wrapper runs SQL." → "Represents a prepared statement over …"; the trailing clause is byte-identical.
   - errors.ts:12 "An error thrown by the SQLite wrapper." → "Represents an error thrown by the SQLite wrapper."
   - errors.ts:45 "Whether a value is a {@link SQLiteError}." → "Checks whether a value is a {@link SQLiteError}."; the link target is unchanged.
   - helpers.ts:14 "Convert" → "Converts"; helpers.ts:47 "Normalize" → "Normalizes"; the remainder of each sentence is byte-identical.
   - types.ts:14, 22, 32, 46, 53, 91, 109 — each gains "Represents" in front of the existing noun phrase with no other token moved.
   - types.ts:26 "Bind parameters for a prepared statement — positional …" → "Represents the bind parameters for a prepared statement — positional …". The pre-wave sentence was ambiguous between the noun phrase "bind parameters" and an imperative "Bind". The rewrite took the noun reading, which is the one the type carries; the imperative reading ("Binds parameters …") would have redescribed a type alias as an action. Correct call.
   - types.ts:63 "Options for `createSQLiteDatabase`." → "Represents the options for `createSQLiteDatabase`."; the added article is grammatically forced, not a qualifier.
   - types.ts:143, 150, 152 "Open"/"Commit"/"Roll back" → "Opens"/"Commits"/"Rolls back"; each block's following clause ("Throws the native fault …", "; throws the native fault …") is untouched.
   The only tokens dropped anywhere in the diff are the trailing parentheticals at constants.ts:4 and constants.ts:14: "(`SQLITE_CONSTRAINT`)" and "(`SQLITE_BUSY`)". Each restated verbatim the identifier declared two lines beneath it (constants.ts:11 `export const SQLITE_CONSTRAINT = 19`, constants.ts:21 `export const SQLITE_BUSY = 5`), so the drop removes no fact a reader of the symbol can lose, and the rule's "never repeats the symbol's name" clause required it. Meaning kept.

2. CONFIRMED — every rewritten first sentence opens with a third-person `-s` verb that fits the symbol, and none repeats its symbol's name.
   Verb fit by symbol kind: factories and actions take action verbs (helpers.ts:14 `Converts`, helpers.ts:47 `Normalizes`; SQLiteDatabase.ts:74 `Closes`; types.ts:143 `Opens`, 150 `Commits`, 152 `Rolls back`); the one predicate takes the rule's own named form (errors.ts:45 `Checks whether`); types, interfaces, and class summaries take `Represents` (types.ts:14, 22, 26, 32, 46, 53, 63, 91, 109; errors.ts:12; SQLiteDatabase.ts:14; SQLiteStatement.ts:12); the two constants take `Names` (constants.ts:4, 14), the form the wave brief fixes for a constant. No sentence's verb misdescribes its symbol.
   Name repetition: no rewritten sentence contains its own symbol's identifier. The near cases were checked and each names a different symbol or a domain noun — errors.ts:45 `isSQLiteError` links `SQLiteError`, the class it tests; types.ts:63 `SQLiteDatabaseOptions` names `createSQLiteDatabase`, the factory it configures; types.ts:14 `SQLiteValue` says "a value SQLite stores", the domain noun rather than the identifier. constants.ts:4 and 14 are the two blocks that previously did repeat the name, and the repetition is gone.

3. CONFIRMED — the one boolean `@returns` in the package reads the rule's form with its condition kept.
   errors.ts:48 "@returns True if `value` is a `SQLiteError`; false otherwise", from "@returns `true` when `value` is a `SQLiteError`". The condition is carried across verbatim, backticks included; the added "; false otherwise" is the form the rule fixes and is true of a type guard. No other export returns a boolean: `isSQLiteError` is the only boolean-returning function, and `connected` / `transacting` (types.ts:135-136) are readonly properties documented under `@remarks`, carrying no `@returns` tag.

4. CONFIRMED — no already-satisfying sentence was rewritten, and no `@example`, `@param`, `@remarks`, `@throws`, or later sentence was touched.
   Already-satisfying blocks: the one block in the package whose first sentence already opened third-person, factories.ts:5 "Creates a synchronous SQLite database over `node:sqlite`.", is absent from the diff and unchanged in the tree. Every one of the 21 rewritten openings was imperative or verbless before the change, so none was a rewrite of a compliant sentence.
   Untouched regions: the only changed lines in the diff are block first sentences plus the single `@returns` line claim 3 covers, which claim 4 does not list. `@remarks` appears in the diff as context only (constants.ts hunks at diff lines 47 and 56, helpers.ts hunks at diff lines 95 and 106, errors.ts hunk at diff line 69); `@param value - The value to test` at errors.ts:47 is context; no `@example` line appears as an added or removed line anywhere — the two examples in the package, errors.ts:21-30 and factories.ts:16-25, are unchanged. `@throws` does not occur in the package. The later sentences of multi-sentence blocks are untouched, including types.ts:143-147 where only "Open" → "Opens" moved and the following "Throws the native fault …" sentence stayed byte-identical.
   Scope: `/home/user/scaffold/tmp/units/voice/voice-sqlite.status` shows six ` M` entries, all under `src/server/`, all unstaged, so `git diff` captured the whole change with nothing staged behind it and no file outside `src/` modified.

Findings outside the claims:

Findings outside the claims. None of these breaks a claim; each names its carrier.

F1 — ragged comment wrap left by the rewrite (craft, minor, non-blocking).
/home/user/fleet/sqlite/src/server/types.ts:26, :32, :91 and /home/user/fleet/sqlite/src/server/SQLiteStatement.ts:12.
What is wrong: the added verb pushed each of these first lines to roughly 87-96 columns while the surrounding lines of the same block wrap near 80, so the block now has a visibly ragged right edge that no neighbouring block has. Example, types.ts:26-27 — line 26 runs to about 96 columns and line 27 stops at about 60.
Why it matters: a doc block is read as a paragraph. A single line jutting past the others reads as an unfinished edit and invites the next editor to reflow it, which is the change this wave forbids elsewhere.
What right looks like: re-wrap only the lines the first sentence itself occupies, to the block's existing column. That stays inside the wave's byte-identity constraint at these four sites because every line involved belongs to the first sentence. It does not apply at types.ts:109, where the first sentence shares line 111 with the following sentence, so the writer's choice there was forced.
Not a defect against printWidth: `.oxfmtrc.json` sets `printWidth` 100 and no line exceeds it, so the formatter gate is unaffected either way.

F2 — the package guide's summary column now paraphrases the pre-wave TSDoc (routing, non-blocking for this unit).
/home/user/fleet/sqlite/guides/sqlite.md:46 "Convert a thrown native `node:sqlite` error into a typed `SQLiteError`.", :47 "Normalize `SQLiteParameters` to …", :49 "Whether a value is a `SQLiteError`." — the exact pre-wave sentences of helpers.ts:14, helpers.ts:47 and errors.ts:45, which now read `Converts`, `Normalizes` and `Checks whether`.
Why it matters: the guide is the package's self-contained human surface, and its Helpers and errors table is where a reader meets these symbols first. Leaving it on the abandoned voice makes the guide the older document.
Weight, stated honestly: the divergence is not the wave's doing and is smaller than it looks. guides/sqlite.md:26 already read "Create a synchronous SQLite database …" while factories.ts:5 already read "Creates …", so the summary column was an independent register before this unit ran, not a mirror of TSDoc. The unit was correctly barred from guides and reported the pair rather than editing it.
What right looks like: a guide unit that either brings the summary column to the TSDoc voice across every row, including the row at :26 that was already out of step, or rules the column a deliberately different register and records that ruling once. Carrier: a guide unit, not this one.

F3 — the uniform `Represents` opener makes the interface and class twins read more alike (observation, non-blocking).
types.ts:109 and SQLiteDatabase.ts:14 now both open "Represents a synchronous SQLite database over `node:sqlite`'s `DatabaseSync`"; types.ts:91 and SQLiteStatement.ts:12 both open "Represents a prepared statement …".
Why it matters: in generated API output the contract and its sole implementation present the same opening line, so the first sentence stops distinguishing them. The duplication predates the wave (the pre-wave pairs were "A synchronous SQLite database over …" and "A prepared statement …"), and the shared verb sharpens it rather than creating it.
What right looks like, for a later doc unit: keep `Represents …` on the interface and open the class on what it is an implementation of — for example "Implements {@link SQLiteDatabaseInterface} over `node:sqlite`'s `DatabaseSync`." `Implements` is a third-person `-s` verb, so the rule is satisfied either way. Out of this unit's scope, which was voice migration only.

Referral to the Orchestrator (I hold no objective lane here): I ruled on voice and meaning only. The gate chain results in the writer's report, the byte-identity of the built artifacts, and the acceptance re-run of `voice-scan.mjs` are unverified by me and belong to `verifier` or `checker`. The report also records a shared-scratchpad collision — a sibling lane overwrote a generically named instrument file (`scan-one.mjs`) mid-unit — which is a dispatch-hygiene matter for you, not a defect in this diff.

## Checker lane (FAIL 2)

Per-claim verdicts below.

Findings outside the claims:

Claim 1 — CONFIRMED. Every `-`/`+` pair in `/home/user/scaffold/tmp/units/voice/voice-sqlite.diff` sits inside a `/** … */` block (lines 9-10, 18-19, 31-32, 44-45, 53-54, 66-67, 75-80, 92-93, 100-102, 114-115, 123-124, 128-129, 134-137, 144-145, 151-153, 160-162, 169-172, 178-180, 187-194, 196-200 of the diff file); no hunk touches a non-comment line. No code token changed.

Claim 2 — BROKEN. In `src/server/constants.ts` the rewrite dropped a whole backtick token rather than keeping it byte-identical:
- diff lines 43-45: `- * SQLite result code for a constraint violation (\`SQLITE_CONSTRAINT\`).` → `+ * Names the SQLite result code for a constraint violation.` — the backtick token `` `SQLITE_CONSTRAINT` `` present in the removed line is absent from the added line.
- diff lines 52-54: same pattern for `` `SQLITE_BUSY` ``.
This is a deliberate, disclosed decision (report.md lines 72-76, "Decisions taken inside the rule"), argued as required by the brief's own "never repeats the symbol's name" clause overriding "keep every code token" in that one case. That is a genuine tension between two clauses of the writer's brief (`voice-sqlite-brief.md`), not a mechanical slip, and resolving which clause wins is a judgment call this checker does not make. Recorded as BROKEN against claim 2's literal text, with a referral: the Orchestrator (or a subjective lane if running) must rule whether dropping the repeated-name backtick token is within the writer's brief or a violation of claim 2's byte-identical requirement. All other backtick tokens, `{@link …}` references, and URLs across the diff are unchanged (for example `{@link SQLiteError}` at diff lines 70, 79, 92, 152; `{@link SQLiteParameters}` at line 102; `{@link SQLiteDatabaseInterface.transacting}` at line 192 all persist verbatim).

Claim 3 — CONFIRMED. `/home/user/scaffold/tmp/units/voice/voice-sqlite.status` lists only `src/server/SQLiteDatabase.ts`, `src/server/SQLiteStatement.ts`, `src/server/constants.ts`, `src/server/errors.ts`, `src/server/helpers.ts`, `src/server/types.ts` — all under `src/`. Nothing under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, or `configs/` appears.

Claim 4 — CONFIRMED. A grep for the imperative-verb-first pattern and the disallowed `@returns` forms over `/home/user/fleet/sqlite/src` returned no matches. `/home/user/fleet/sqlite/app` does not exist (confirmed by glob), consistent with the report's statement that the package has no `app/` directory.

Claim 5 — CONFIRMED on quoted evidence. `/home/user/scaffold/tmp/units/voice/voice-sqlite-report.md` lines 45-51 quote `npm run format:check` (exit 0), `npm run lint:check` (exit 0), `npm run check` (exit 0), `npm run build` (exit 0), and `npm test` (exit 0) with brief notes. Per the brief this rules CONFIRMED, subject to the Orchestrator's own landing-chain run remaining authoritative.

Findings outside the claims:
- The guide-drift observation the writer recorded (report.md lines 83-88: `guides/sqlite.md` surface-table descriptions still echo the old, pre-rewrite first sentences for `wrapError`, `isSQLiteError`, `SQLiteRunResult`, `SQLiteDatabaseOptions`, `SQLiteStatement`) is accurate and material: the guide is out of voice with the TSDoc it paraphrases, though no existing parity test catches prose-voice drift. This is legitimately out of this unit's scope (guide was off-limits) but should be carried forward as its own unit if the wave wants guide voice aligned too.

## Orchestrator

Checker claim 2 broke on the writer dropping the `SQLITE_CONSTRAINT` and `SQLITE_BUSY` code tokens from two constants' first sentences under the name clause, disclosed in the report; the subjective lane passed the sentences. Ruling: the drop stands — the sentence still names the value (the result code for a constraint violation, for a busy database) and the identifier is the symbol's own name; later checker briefs record such a drop as an observation. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
