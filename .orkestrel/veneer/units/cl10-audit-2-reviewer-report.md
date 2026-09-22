<!-- reviewer on native Opus 5, native subagent, clean context, read-only. Held the OBJECTIVE lane of
CL10 round 2: the lanes swap back from round 1 because Astra wrote the fix round. Transcribed by the
Orchestrator from the agent's returned result, because a native read-only lane holds no write tool and
produces no report file. Its brief is cl10-audit-2-reviewer-brief.md; the claims it ruled on are
../cl10-audit-2-claims.md. Terminal line: Verdict: accept. -->

# CL10 audit round 2 — objective lane report

The lane holds no shell and no write tools, so every reading is a direct read of a file's own bytes or
of an artifact on disk, never a re-run. The admission expression was read out of `tests/setupStyles.ts`
in `collectGridVocabulary`, never from a transcription.

## Rulings

| Claim | Ruling |
| --- | --- |
| 1 | CONFIRMED. Read the boundary class character by character: the negated class refuses an ASCII word character, a backslash, every code point from U+0080 through the astral range, and the hyphen; the alternation restores the hyphen as the family separator and adds the end anchor. Under the unicode flag an astral character is one code point, so the range reaches it. |
| 2 | CONFIRMED. The boundary group sits once, outside the alternation, and applies to every alternative. The earlier form carried two separate branches, so the fix is structural rather than special-cased. The control exercises a non-ASCII and an escaped extension after each earlier grid, gutter, and table prefix. |
| 3 | CONFIRMED — the restructure is equivalent. The lookahead removes the hyphen branch for that alternative alone, leaving class-or-end, which is the old semantics plus the strengthening. No other alternative can match a string beginning with that word, so no backtracking path readmits a longer hyphenated name. A retained case still asserts the longer bare name refused and the exact name admitted. |
| 4 | CONFIRMED for its substance; the admitted figure is the unit's report alone. The instrument hardcodes the pre-fix expression and extracts the post-fix one from the source file's own bytes, and that extraction is sound because the admission expression is the FIRST such match in the file. The reading was then settled without the instrument: a search for a prefix followed by a non-ASCII or escaped character returns nothing in either built cascade and nothing in the record, so neither side of the comparison holds a candidate and the fix moves no selector. |
| 5 | CONFIRMED. Mutation: restore the ASCII-only class. Every non-ASCII, astral, and escaped form across all prefixes becomes admitted, so the control's first two expectations turn from empty into non-empty — which is the reading the report quotes. The admitted punctuation forms are read separately: the pseudo-class colon, the descendant space, the child combinator, the attribute bracket, the chained class dot, the comma through selector splitting, and the legacy pseudo-element normalizing to its double-colon form. The last block's expected array is in the collector's own sort order, so it is not accidentally order-insensitive. |
| 6 | CONFIRMED. The reader is exported with a full contract block. The icon-shift case calls it six times and declares no local function: a search for arrow syntax in that file returns only anonymous callbacks passed directly as arguments, which are the exceptions the design laws state. |
| 7 | CONFIRMED. The browser setup hunk is a single addition with no deletion. Its proof gained the import, two cases, and the export-list entry. Nothing else in either file moved. |
| 8 | CONFIRMED. Mutation: reverse the subtraction — the first assertion's expected value becomes the failure the report quotes. Two further mutations are distinguished: substituting a computed offset for the two client rectangles, caught by a translated child; and dropping the parent's own rectangle, caught by a moved and translated parent. The child read is the SVG element, so the case the reader exists for is the case under test, and the refusal case asserts the thrown message. |
| 9 | CONFIRMED. The tests rule places DOM helpers in the browser setup module and cascade helpers in the styles one, and the styles module is loaded by a Node project where no DOM exists. No installed export duplicates it: the nearest candidates resolve a computed style property, sum document-coordinate edges for a frame height, test a rectangle against the viewport, or return an element. The name follows the module-helper verb-noun form. |
| 10 | CONFIRMED. The loop destructures in its header and imports only the math module; the round-1 list-module import and its index reads are gone, and no list call remains. The declaration body is unchanged, so the emitted text cannot move. The emitted values are independently checkable and correct: the built cascade carries exactly the four percentages the case table and the guide's precision paragraph state. |
| 11 | CONFIRMED. The comparison now sorts both sides. Mutation: delete one of the hover-rule selectors — the actual array holds two entries against three expected and the equality fails; an added selector fails the same way on length. Sorting removed order sensitivity, not membership sensitivity. |
| 12 | CONFIRMED. The Notes cell moved and both substitutions are true of the code, which declares the underline color through Veneer's link triplet and the transition through Veneer's motion tokens. The row's component, category, deferral, and status columns are unchanged, and the other three rows are byte-identical to round 1, so no row's granularity moved. |
| 13 | CONFIRMED. The case lost its async keyword and its resolved-promise await; every assertion is unchanged. The removed await was a microtask that never yielded to layout, and the pixel reader forces layout itself, so the readings are the same readings. |
| 14 | CONFIRMED. The constant sits in its alphabetical position relative to its neighbours, and both sides of the comparison sort. |
| 15 | CONFIRMED, and the trade is right. The container loop still covers every named table; the entry loop covers the three object-bearing ones. Mutation on an object-bearing table still fails, and the nested readings, cell, and row assertions are untouched. No mutation exists that the removed assertions could have caught: the dropped tables hold string literals only, and a frozen check on a primitive is unconditionally true. |
| 16 | CONFIRMED. An independent search across the test tree returns exactly the declaration, the setup proof, and the sibling table proof. The sibling proof appears in neither the status nor the diff, and no table constant's values changed. |
| 17 | CONFIRMED. The case now builds its rows from a typed literal and no longer calls the guide reader, whose import was removed. It still drives the real presence scanner twice. Mutation: make the scanner stop reporting a missing selector and the negative control receives nothing and fails; a mutation removing the equivalence fails the positive assertion instead. Guide state can no longer reach the case. |
| 18 | CONFIRMED. The equivalence case appears in no hunk, and the styles setup module's diff carries exactly three hunks — the doc block, the one admission-expression line, and the two added exports. The terrain's ruling that this needs no change was followed rather than worked around. |
| 19 | CONFIRMED, with the verifier still owning the authoritative run. The saved runner reads the native exit code immediately after each stage and exits with the first non-zero, which correctly neutralizes PowerShell turning npm's stderr notice into an error record. The retained logs were read directly rather than the report's tables: ten project summaries all passed, with no occurrence of a failure anywhere, and the Edge logs carry their own counts. The only error text in any log is the record the runner exists to neutralize. |
| 20 | CONFIRMED. Every status entry falls inside the two effective briefs' owned sets. None of the off-limits paths appears, the vendored policy paths included. The new type-only import reads the off-limits conformance module without editing it, which the scope permits. |
| 21 | CONFIRMED. The three recorded departures are byte-identical to round 1, the deferral table gained no row, and the compatibility table's added rows are unchanged but for the one Notes cell. The only source edit is the ratio loop's destructuring, whose emitted values were read out of the built cascade and found to be the four the record names. |
| 22 | CONFIRMED — handled honestly. The rule requiring that call fires on a question about a TypeScript edit, and this round's forcing question was a runtime regular expression, so the call was arguably not owed at all. The unit attempted it anyway, recorded the exact refusal, stated no receipt was issued, and stated the test readings are not represented as one. It then adopted the instrument that settled the claim as a permanent control case rather than leaving it a one-off probe. |
| 23 | CONFIRMED. Every account in the report that could be checked against the tree holds, including the status block, the consumer search, the instrument's behaviour, and the existence of the eight gate logs at their named paths. No claim in the report is contradicted by the tree. |

## Findings outside the claims

- **24. Observation, forces no round — the surplus-detection population narrowed, correctly.** Were the
  cascade ever to emit a non-ASCII extension of a prefix, that selector is now refused from both the
  built side and the recorded side, so the multiset comparison would not report it, where the old
  expression would have. This is not a lost check: such a selector is a different class under CSS, and
  the comparison's membership rule is the named class families rather than an out-of-family surplus.
  The fix closes the gap between what the instrument says it matches and what it does match, and the
  doc block now states the rule it implements. Recorded so a later round does not rediscover it as a
  regression.
- **25. Observation, forces no round.** The local inventory literal inside the normalizer regression
  case supplies selectors as plain strings where the real oracle supplies objects. That literal is
  untouched by this round, which replaced only the rows above it, so it predates the round and belongs
  to whichever unit next owns that case.

Only the admitted figure of claim 4 and the exit codes behind claim 19 could not be broken either way,
because both require a run and this lane holds no shell. The substance of each was settled by other
evidence, and the gate result belongs to the verifier regardless.

Verdict: accept
