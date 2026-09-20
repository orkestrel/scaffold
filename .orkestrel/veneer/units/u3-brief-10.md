# Unit U3 — successor brief 10: the grammar's last constructs, and its fence

## What changed and why

This brief supersedes `u3-brief-9.md` for the remainder of the unit; briefs 4 to 9
stand except where this brief says otherwise, and `u3-report-7.md` is the baseline. The
sixth audit round (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-verdict-6.md`,
lane reports beside it under `units/u3-audit-6-*`) confirmed brief 9's readings and executed
three more the readers get wrong, plus three readings report 7 said were promoted and were not.
The selector readers have opened one grammar case per round for six rounds. This brief carries
the constructs the objective lane found, and then fences the grammar: a form the readers do not
carry makes them throw naming it, so a misread cannot pass silently again.

## Role and engine

Unchanged: `opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole
writer in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold
repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Law from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`,
`.claude/rules/tests.md`, `names.md`, `typescript.md`, `writing.md`.

## Scope

**Owned.** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `tests/src/styles/index.test.ts`
where item 4 changes what the pair rule reads. **Off-limits.** Everything else.

## Execution

Perform the assignment directly and spawn nothing. Run `npm run test:setup` after each item.

1. **The unpromoted readings (both lanes; reviewer 12).** Add as cases: `matchesLooseTagPair('h1\64 p')`
   false; `matchesLooseTagPair('h1\64x p')` true; `extractCompoundTags('h1\+p')` `['h1+p']`;
   `readEscape('\d800', 0)` and `readEscape('\110000', 0)` each stand for U+FFFD with their
   spans (5 and 7); `readEscape('\10FFFF', 0)` stands for U+10FFFF. Write the backslash once in
   the source string.
2. **The quoted-text boundary (analyst claim 1).** `readIdentifier(walkSelector('[a="\64"]'), 4)`
   returns `{ text: 'd', end: 7 }` and must return `undefined`: the reader decodes a backslash
   before checking that the step is quoted. Refuse a start on a quoted step, and a step that
   turns quoted mid-identifier ends it; add the reading and its control (`[a="d"]` at 4).
3. **CSS whitespace (analyst claim 1).** The escape terminator, the normalizer's collapsing, and
   the compound splitter's separators use JavaScript's `\s`, which includes U+00A0; CSS whitespace
   is space, tab, line feed, carriage return, and form feed, and U+00A0 is an identifier
   character. Use one exported CSS-whitespace predicate everywhere selector text is split or
   collapsed. Readings: `matchesLooseTagPair('det\61\u00A0ils summary')` true (the tag is
   `deta`, U+00A0, `ils`), `matchesLooseTagPair('h1\u00A0p')` false (one identifier),
   `normalizeComplexSelector('h1\u00A0p')` unchanged, `splitTopLevelCompounds('h1\u00A0p')` one
   compound, `extractCompoundTags('det\61\u00A0ils')` `['deta\u00A0ils']`, with `h1 p` as the
   control; each a case.
4. **Complex alternatives (analyst 10).** An `:is()`/`:where()` alternative is a complex selector,
   not a compound. Read each alternative through the complex-selector reader: a loose pair inside
   an alternative counts (`:is(h1 p)` true, `:is(.title > h1)+p` true through the alternative's
   subject `h1` joined by `+` to `p`), and an alternative's subject — its rightmost compound —
   supplies the tags the enclosing compound pairs with its neighbours (`:is(details p) summary`
   true because `p` pairs with `summary`; `:is(details) summary` false, the mandated pair;
   `:where(.title > h1)+p` true; `:is(h1,p)` false, no pair). Keep every earlier reading; add
   these as cases; rewrite the TSDoc of `extractCompoundTags` and `matchesLooseTagPair` to what
   they now read. If `tests/src/styles/index.test.ts`'s pair assertion over the shipped cascade
   changes its reading, report the selector and stop; it must not.
5. **The sentence (reviewer 10).** `walkSelector`'s TSDoc says no reader in the module reads
   selector text any other way; carry the carve-out into it: the whole-scope patterns in
   `extractBootstrapVariables` match a scope selector as a whole and read no compound,
   combinator, or group.
6. **The fence.** State the grammar the readers carry in `walkSelector`'s TSDoc as the complete
   list (strings, escapes, groups, identifiers, combinators, comma lists, and functional
   `:is()`/`:where()` alternatives as complex selectors, every other pseudo-class and
   pseudo-element read as a compound with no tag), and make `matchesLooseTagPair` throw an error
   naming the form for a selector carrying a construct outside it: a namespace separator `|`, a
   `:has(` or `:nth-*( … of` argument, or a `/*` comment. Add a case per refused form. The
   shipped cascade carries none of them, so the elements-layer assertion reads the same list.
7. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:setup`,
   `test:src:styles`, `test:src`, `test:setup:browser`, `test:conformance`, `test:guides`, then
   `npm test`; then `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`,
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src`, and
   `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`. Record each command's final lines and
   the cascade's SHA-256 after `build` (`8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1`).

## Output

Write `u3-report-8.md` and return its content: the diff per file; every reading this
brief names before and after, and every earlier reading after; the grammar sentence; each refused
form's error; each gate's final lines on both engines; the digest; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; a shipped-cascade selector whose pair reading changes; an earlier reading item 4 cannot
keep. Decide, record, and carry on from: the predicate's name, the reader's return shape for
alternatives, case order, wording.

## Acceptance criteria

1. Every reading in this brief holds and is a case; every earlier reading still holds.
2. `readIdentifier` returns `undefined` for a start on a quoted step; no selector reader uses `\s`.
3. `matchesLooseTagPair` throws, naming the form, on `|`, `:has(`, an `of` clause, and `/*`.
4. The elements-layer pair assertion over the shipped cascade reads the same list; the digest
   matches; every gate in item 7 exits 0 on managed Chromium and the three named ones on Edge.
5. `git status --porcelain` adds nothing beyond the owned files and the report to report 7's
   list.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
