## Checker verdict — D4-fix-3

**1. L1 (equality bullet exact; voice bullet after it unchanged by this round).** PASS. `.claude/rules/documentation.md:35-41` reads exactly the seven lines the fix-3 brief quotes (`d4-fix-3-brief.md:24-30`), verified by direct read. The report's edit list (`d4-fix-3-report.md:5-11`) shows only this bullet edited; the following voice bullet at `.claude/rules/documentation.md:42-44` is not among this round's edits or its acceptance criteria, so it is unchanged by this unit.

**2. L2 (`Proves` cells byte-equal; `diff -w` scope).** PASS. `.claude/rules/workspace.md:132`'s `Proves` cell text and `.claude/rules/tests.md:55`'s `Proves` cell text are identical strings ("Every documented API exists, every public API is documented, every compared summary, example, and pitch equals its source, and every executable fence returns what the guide says it returns"), confirmed by direct read of both files. Manual line-by-line comparison of the `d4-fix-3.diff.txt` `workspace.md` hunk (lines 54-82) shows every non-`guides` row's `Proves` text is byte-identical old-to-new (only column padding differs), and the separator row's dash run lengthens with the widened column — the only non-whitespace changes are the `guides` row content and the separator row's dash count, consistent with a `git diff -w` result touching only those two lines.

**3. L3 (comment text exact).** PASS. `tests/guides.test.ts:165-170` reads exactly the six lines the fix-3 brief quotes (`d4-fix-3-brief.md:38-43`), verified by direct read, ending on "so an untitled `@example` block is outside this case."

**4. L4 and L5 (no spread; `listed` chain; pitch-before-tagline).** PASS. `tests/guides.test.ts:126-129` reads `const listed = group.methods.map((method) => method.name).sort().join(', ')` (oxfmt-wrapped, same chain, no spread); `grep -c "\[\.\.\.group.methods\]"` would find none — confirmed by direct read, no spread token anywhere in the file. `tests/guides.test.ts:187-188` orders `expect(pitch).not.toBeUndefined()` before `expect(tagline).not.toBeUndefined()`.

**5. L6 and L7 (digest readings; host.json diff shape; four case citations without a count).** PASS. The report (`d4-fix-3-report.md:51-53`) states one digest value held across the `build:inventory` re-run. `host.json`'s diff (`d4-fix-3.diff.txt:85-122`) changes only `digest` values on the same three entries plus the top-level digest — no entry added or removed. The L7 section (`d4-fix-3-report.md:29-34`) cites `tests/guides.test.ts:171`, `:181`, `:204`, and `:120`; direct read confirms each line is exactly the named `it(...)` declaration, and the section states no count of a growable set.

**6. Scope (status file; `tests.md` diff untouched by this round; every report `file:line` matches).** FAIL. The status-file part and the `tests.md` part hold: `d4-fix-3.status.txt` lists exactly the five named files, and `tests.md`'s diff (`d4-fix-3.diff.txt:23-51`) is a single row-content change (the `guides` row's `Proves` cell) that the report attributes to a prior round (`d4-fix-3-report.md:78-79`), consistent with the round not touching it.

But the report's own `file:line` citations do not all match the files at their new state:
- `d4-fix-3-report.md:5` cites `.claude/rules/documentation.md:35-40` for the equality bullet; the bullet actually runs `35-41` (line 41, "the gate.", is part of the bullet and is excluded from the cited range) — confirmed by direct read of `documentation.md:35-41`.
- `d4-fix-3-report.md:17` cites `tests/guides.test.ts:165-169` for the L3 comment; the comment actually runs `165-170` (line 170, "so an untitled `@example` block is outside this case.", is excluded) — confirmed by direct read.
- `d4-fix-3-report.md:21-22` cites `tests/guides.test.ts:186-187` for the pitch-before-tagline assertions; those assertions are actually at lines `187-188` (line 186 is `const tagline = documented.guide.tagline()`, not an assertion) — confirmed by direct read.

Re-dispatch instruction: correct the three `file:line` citations in `d4-fix-3-report.md` (documentation.md bullet to `35-41`, the L3 comment to `165-170`, the README-case assertions to `187-188`) so every cited range matches the files at their current state.

**Referrals.** None — every claim rules mechanically on the supplied evidence.

VERDICT: FAIL 6
