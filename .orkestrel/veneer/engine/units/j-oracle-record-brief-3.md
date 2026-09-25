# Unit J-ORACLE-RECORD, round 3 — exact scroll, tags, and ordered content

Successor of `j-oracle-record-brief-2.md`, whose sections, and round 1's, stand except where this brief replaces them.
- Round 2 is committed as `c66e317` on `unit/oracle-record`.
- The worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-record` is clean there.

## Why

Round 2's audit ruled `VERDICT: FAIL 3, 5` (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-record-audit-2-verdict.md`). Read it, both lanes' verdicts, and `decisions.md` § E28 with both of its amendments of 2026-09-25.

## The obligations

- **R3-1: exact scroll.** The reader records scroll offsets as the platform reports them, without rounding. Add a case that tells `10` from `10.25`, read red on round 2's source.
- **R3-2: tags.** The reader records each element's tag, and the comparator reports a difference. Add a case, read red on round 2's source, in which one side replaces a `button` with a `div` under the same id.
- **R3-3: ordered content.** The reader records each element's content: the ordered sequence of its child nodes, each text run with whitespace collapsed, and each child element by label. The content facet replaces the own-text facet, and the comparator reports a difference in it. Add cases, each read red on round 2's source:
  - swapped siblings;
  - `A<span>X</span>B` against `<span>X</span>AB`.
- **R3-4: exhaustiveness.** `drivePluginAction`'s `switch` ends in a `never` check, so a `PluginAction` member added later fails to compile until it is handled.
- **R3-5: the wording.**
  - Around line 4891, "engine work scheduled past the quiet interval" becomes "work a plugin schedules past the quiet interval, such as a tooltip `delay`".
  - `inferPluginState`'s `@param report` reads "What one evaluation of the page reported, as the {@link reportPluginPage} function returns it."
  - The test title that reads "…and reads each one own text, parent, and scroll offsets" names the facets the case reads, in a grammatical sentence.
- **Re-record and re-census.**
  - Re-record every fixture with `ORACLE_REFRESH=1`. `button.json` stays byte-identical.
  - Re-run the census, and report every departure the new facets add.
  - Add a mutation row per new facet: a planted tag change, a planted sibling reorder, and a planted text placement. Add a row for a fractional scroll difference too, if a plugin's scroll can land on a fraction.

## Scope, standing conditions, and output

As round 2. Do not merge `main`. The output adds, per obligation, the red reading on round 2's source.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
