# Audit verdict — unit voice-msg

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `234386a`
(`units/voice-msg.diff`, `units/voice-msg.status`, `units/voice-msg-report.md`).
Rewritten per the writer: imperative 40, verbless 95, name 2, returns 9. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 2)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Claude Opus 5 — the writer's engine, clean context, because the Sol bench is dark as the brief states.

1. Meaning kept in every rewritten first sentence — CONFIRMED. I read every hunk in /home/user/scaffold/tmp/units/voice/voice-msg.diff, not a sample. No rewrite drops a qualifier, adds a quantifier, or moves a referent. Hardest cases: constants.ts:129 "Header offset: property (directory) start sector." -> "Locates the property (directory) start sector in the header."; constants.ts:385 "FAT sector marker: this sector holds FAT data (-3)." -> "Marks a sector as holding FAT data (-3)."; types.ts:344 "Extracted attachment from an email message." -> "Represents an attachment extracted from an email message."; MSG.ts:209 "Current parser configuration." -> "Returns the current parser configuration." Every {@link} target, backtick token, hex literal, and parenthetical value is byte-identical.

2. Verb fits the symbol and the sentence never repeats the symbol's name — BROKEN. /home/user/fleet/msg/src/core/helpers.ts:231 reads " * Serves as the CFB-compliant directory name comparator." for `export function compareCFBName(a: string, b: string): number`. The rewrite bolts a copula onto the original noun phrase: it says what the symbol IS, where the rule requires what it DOES with an -s verb, and it restates the identifier (compare -> "comparator", CFB, Name). The wave's own transform rule says a first sentence that repeats the symbol's name is reworded so the name goes. Corroboration that this is the shipped house voice it missed: /home/user/fleet/msg/guides/msg.md:164-190 opens every sibling helper row with Constructs, Narrows, Reads, Converts, Rounds, Computes, Decodes. Right looks like: `Orders two directory names as the compound file format requires.` — an action opener that does not collide with the untouchable second sentence "Compares by UTF-16 length first, …", with both @param lines and the @returns line left byte-identical.

3. Boolean @returns reads "True if …; false otherwise" with the condition kept — CONFIRMED. All nine boolean-returning exports carry the form with their original condition verbatim: errors.ts:41, helpers.ts:51, helpers.ts:61, helpers.ts:195, validators.ts:7, validators.ts:17, validators.ts:27, validators.ts:43, validators.ts:67. A grep of every @returns under src/ shows no boolean return left in another wording and no non-boolean @returns converted by mistake.

4. No already-compliant sentence rewritten; no @example, @param, @remarks, @throws, or later sentence touched — CONFIRMED. Every removed first sentence was imperative (Create, Read, Rebuild, Narrow, Parse, Reconstitute, Extract, Decode) or a bare noun phrase; none opened with a third-person -s verb. inferExtension ("Infers …") and the MSG class paragraph, both already compliant, appear nowhere in the diff. Every changed line in all nine files is a *-prefixed description line or a boolean @returns line. The one structural edit — MSG.ts:1, deletion of the bare title line " * MSG" and its blank comment line — does not break the claim's letter: the deleted lines preceded the paragraph and the promoted paragraph's bytes are unchanged. See finding F1.

Findings outside the claims:

F1. The MSG.ts module-header deletion is outside the population the wave defined and needs the Orchestrator's ratification, not mine. /home/user/fleet/msg/src/core/MSG.ts:1 — the shared brief scopes the population to blocks attached to an exported declaration and to class members; a file header attached to nothing is in neither set. The writer reported it as a resolved deviation and the outcome reads well (the file opens third-person with no invented content). Why it matters: an unratified out-of-population edit sets the precedent every remaining package in the wave follows. Right looks like: rule the file-header case in or out once, and carry the ruling in the wave brief for the packages that have not run.

F2. "Caps" in a first sentence collides with an untouchable later sentence in two blocks. /home/user/fleet/msg/src/core/constants.ts:91 opens "Caps the recursion depth accepted by the directory hierarchy builder" while line 94, which the wave may not touch, closes "…this caps the recursion depth itself." constants.ts:394 opens "Caps the UTF-16 code units allowed in a CFB directory entry name (31)" and line 396 closes "…so the name itself is capped at 31 units." Why it matters: the block now says the same thing twice in the same words, which reads as an unfinished edit. Right looks like: an opener the later sentence does not use — "Holds the maximum recursion depth accepted by the directory hierarchy builder" and "Holds the maximum UTF-16 code units allowed in a CFB directory entry name (31)".

F3. "Caps the DIFAT entries" and "Caps the … code units" cap a set where the original capped a count. /home/user/fleet/msg/src/core/constants.ts:374 and constants.ts:394; the originals read "Maximum DIFAT entries …" and "Maximum UTF-16 code units …". Why it matters: the entries became the object of capping rather than their number; the trailing (109) and (31) carry the reading, but the precision the noun "maximum" supplied is gone. Right looks like: "Caps the number of DIFAT entries stored in the CFB header (109)."

F4. "Sets" describes an actor, and these are constants. /home/user/fleet/msg/src/core/constants.ts:46 and constants.ts:364 — "Sets the threshold below which …". Why it matters: every other constant in the file opens with a verb describing a value at rest (Holds, Names, Locates, Marks, Lists, Maps, Identifies), so "Sets" is the one verb in the sweep implying assignment. Right looks like: "Holds the threshold below which data is stored in the mini-stream."

F5. "and/or" survives inside a sentence this unit rewrote. /home/user/fleet/msg/src/core/helpers.ts:515 — "Derives the EmailFormat from a file name and/or MIME type." .claude/rules/writing.md § Substitutions replaces and/or with and, or, or both. Why it matters: the wave exists to bring this prose under the writing rules and the line was already being edited. Right looks like: "Derives the EmailFormat from a file name, a MIME type, or both." The same phrase sits at /home/user/fleet/msg/guides/msg.md:184, which this unit may not edit, so the pair needs one successor unit owning both — not a re-dispatch of voice-msg.

F6 (observation, no change required). /home/user/fleet/msg/src/core/MSG.ts:209 uses "Returns" for the options getter while MSG.ts:217 and MSG.ts:225 use "Holds" for chain and fields. The split tracks a real difference — options hands back a copy, the others expose stored state — so I rule the inconsistency deliberate and keep it.

Guide coherence: no guide edit is owed. /home/user/fleet/msg/guides/msg.md describes symbols in its own table-cell voice and quotes no rewritten TSDoc sentence, so nothing went stale when the TSDoc voice moved. Its helper table's third-person Behavior column now agrees with the TSDoc it previously did not match, which is a coherence gain.

Referral to the Orchestrator (I hold only this lane; the Sol bench is dark): the claim that the diff contains no non-comment token, and the gate chain's exit codes, are mechanical and objective. I read every hunk as *-prefixed comment lines and saw no code token move, but that reading is corroboration — route the mechanical confirmation to checker and the authoritative gate run to verifier after any fix for claim 2 lands. I give no verdict on either.

## Checker lane (PASS)

Per-claim verdicts for unit voice-msg (checker lane)

Findings outside the claims:

1. CONFIRMED. Every `-`/`+` pair in voice-msg.diff sits inside a `/**...*/` comment block (verified visually across all 9 hunks in MSG.ts, constants.ts, errors.ts, factories.ts, helpers.ts, parsers.ts, shapers.ts, types.ts, validators.ts) and a supplementary grep for changed lines containing an identifier-plus-open-paren call pattern (`^[+-].*[a-zA-Z0-9]\(`) over the diff file returned no matches. No hunk touches a code token.

2. CONFIRMED, with observations matching the two named exceptions. Every `{@link …}` and backtick token in a rewritten first line or `@returns` line is byte-identical to the removed line, except:
   - the boolean `@returns` rewrites (`errors.ts:501-502`, `helpers.ts:548-550,558-562,627-629`, `validators.ts:1075-1077,1087-1089,1099-1101,1111-1114,1125-1127`), where the backticked `` `true` `` or bare `true`/`True when` token was replaced with `True if …; false otherwise` per the mandated form;
   - `MSG.ts:1-8`, where the bare unbacktracked title line `MSG` (not a backtick token) was dropped, promoting the existing third-person paragraph — this is prose text, not a backtick/`{@link}`/URL token, so it sits outside this claim's scope rather than inside its exception, but no such token was altered there either.
   No other backtick token, `{@link …}` reference, or URL differs between the removed and added lines in the diff.

3. CONFIRMED. `voice-msg.status:1-9` lists only `src/core/MSG.ts`, `src/core/constants.ts`, `src/core/errors.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/parsers.ts`, `src/core/shapers.ts`, `src/core/types.ts`, `src/core/validators.ts`. Nothing under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, or `configs/` appears.

4. CONFIRMED. Two sweeps of the tree's `src/` (the package has no `app/`):
   - a case-insensitive grep for `\* {verb}( or backtick)` over the named imperative-verb list returned one hit, `helpers.ts:138: * count never loses precision to float64 rounding.` — read against context (`helpers.ts:135-142`), this is a continuation line of a doc block whose first line (line 136) already reads `Converts a Windows FILETIME …`, so it is a false-positive continuation match, not a doc block whose first line opens imperatively.
   - a grep for `@returns (Whether|`true`|true )` returned no matches.
   The sweep returns no genuine hit.

5. UNRESOLVED per the claim's own rule: the report (`voice-msg-report.md:49-59`) quotes the exact command and exit code for every gate (`format:check` 0, `lint:check` 0, `check` 0, `build` 0, `test` 0, with excerpted output for each), so this rules CONFIRMED on the quoted evidence; the Orchestrator's landing chain remains the authoritative run per the claim's own qualifier.

Findings outside the claims: none identified. The diffstat in the report (9 files, 145 insertions, 147 deletions) matches the diff's file list and the two-line deletion in MSG.ts (title plus blank comment line) accounts for the net -2. No test, guide, or README file references any of the rewritten TSDoc first sentences (report's own search, `voice-msg-report.md:104-106`, is consistent with the diff's off-limits-file exclusion already confirmed under claim 3).

## Orchestrator

Subjective claim 2 broke on `compareCFBName` (`Serves as the … comparator`, a copula restating the identifier). Ruled with the lane: `Orders two directory names as the compound file format requires.` (fix-up brief `voice-msg-fixup-brief.md`, builder on Sonnet). The writer's deletion of the title-only `MSG` module header in favour of the third-person paragraph beneath it is accepted (a title has no sentence to reword). Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
