# Unit U3 — successor brief 11: alternatives by expansion, the `of` keyword, the literal trim, two sentences

## What changed and why

This brief supersedes `u3-brief-10.md` for the remainder of the unit; briefs 4 to 10
stand except where this brief says otherwise, and `u3-report-8.md` is the baseline. The
seventh audit round (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-verdict-7.md`,
lane reports beside it under `units/u3-audit-7-*`) confirmed the whitespace, the quoted boundary,
the promoted cases, the sentence, and the scope, and found four things: an `:is()` alternative
read by its subject alone disagrees with the same selector written flat (`:is(h1 .x) p` false
against `h1 .x p` true), the `of` fence misses a decoded or punctuation-bounded keyword, the list
trim removes an escaped trailing whitespace, and two TSDoc sentences break the writing law.

## Role and engine

Unchanged: `opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole
writer in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold
repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`, and no `git add`. Law from `C:/Users/mikes/WebstormProjects/scaffold`:
`AGENTS.md`, `.claude/rules/tests.md`, `names.md`, `typescript.md`, `writing.md`.

## Scope

**Owned.** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`. **Off-limits.** Everything else;
`tests/src/styles/index.test.ts` must read the same list after this brief, and if it does not,
stop and report the selector.

## Execution

Perform the assignment directly and spawn nothing. Run `npm run test:setup` after each item.

1. **Alternatives by expansion (analyst claim 4; reviewer 10, 11).** Define an `:is()` or
   `:where()` alternative as the selector it stands for: `X:is(A, B) Y` reads as the list
   `X·A Y, X·B Y`, where `·` merges the alternative's rightmost compound into the host compound
   (its tags join the host's; a host and a subject naming different tags is a selector that
   matches nothing and reads as no pair) and the alternative's earlier compounds and combinators
   precede it. A pair anywhere in an expansion counts; the existing rule that a tagless compound
   is skipped applies inside an expansion as outside. Required readings: `:is(h1 .x) p` true and
   `h1 .x p` true (the same selector), `extractSelectorCompounds('h1 .x p')` is `h1` joined to
   `p` by the descendant combinator (the middle-drop case), `:is(h1 p)` true, `:is(.title > h1)+p`
   true, `:where(.title > h1)+p` true, `:is(details p) summary` true, `:is(details) summary` false,
   `:is(details .x) summary` false (the drop makes it the mandated pair), `:is(h1,p)` false,
   `p:is(p, .lead)` false, `h1:is(p) + p` false (matches nothing), `:is(h1 .x p)` true,
   `h1 :is(.x p)` true, `:is(h1)>:where(p)` true, and every reading reports 4 to 8 record. Each
   new reading is a case; rewrite the TSDoc of `extractCompoundTags`, `extractSelectorSubject` (or
   its successor), and `matchesLooseTagPair` to the expansion rule.
2. **The `of` keyword (analyst claim 6).** `scanUnreadForm` compares raw whitespace-separated
   text against `of`; the keyword is an identifier and reads through `readIdentifier`, decoded and
   case-folded, bounded by anything that is not an identifier character. Required: each of
   `li:nth-child(2n \6f f .x) + p`, `li:nth-child(2n o\66 .x) + p`, `li:nth-child(2n \6f\66 .x)+p`,
   `li:nth-child(2n of.x) + p`, `li:nth-child(2n of[x])+p`, `li:nth-child(2n of:is(.x))+p`,
   `:is(li:nth-child(2n OF.x)) + p`, and `:not(li:nth-child(2n of.x))` throws naming `of clause`;
   the controls `li:nth-child(2n\ of .x)+p` (one identifier `2n of`, no refusal, true),
   `li:nth-child(2n) + p` true, and `li:nth-child(2n+1) + p` true hold; each is a case.
3. **The literal trim (analyst 10).** `splitTopLevelList` trims each item with
   `trimCSSWhitespace`, which strips a trailing whitespace an escape owns. Trim only whitespace
   the walk reports as syntax. Required: `splitTopLevelList('h1\ ,p')` is `['h1\ ', 'p']`,
   `extractCompoundTags(':is(h1\ ,p)')` is `['h1 ', 'p']`, `matchesLooseTagPair('details summary\ ')`
   true, `('details summary\<TAB>')` true (write the tab as `\t` in the source), `('details
   :is(summary\ )')` true, `('details :is(summary)')` false; each is a case.
4. **Two sentences and one clause (analyst claim 7; reviewer 12, 13).** `walkSelector`'s TSDoc:
   "A reader wanting an identifier" gives software a faculty; write that a reader obtains an
   identifier through `readIdentifier`. "so a form one reader must not misread cannot be misread
   by one reader alone" is a double negative; write "so every reader answers that form the same
   way". The exception sentence names `BOOTSTRAP_SCOPE_PATTERNS`; add that the scope path compares
   the selector `normalizeSelectorText` collapses and reads no compound, combinator, or group.
5. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:setup`,
   `test:src:styles`, `test:src`, `test:setup:browser`, `test:conformance`, `test:guides`, then
   `npm test`; then `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`,
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src`, and
   `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`. Record each command's final lines and
   the cascade's SHA-256 after `build` (`8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1`).

## Output

Write `u3-report-9.md` and return its content: the diff per file; every reading this
brief names before and after, and every earlier reading after; the expansion rule as the TSDoc
states it; each gate's final lines on both engines; the digest; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; a shipped-cascade selector whose pair reading changes; an earlier reading the expansion rule
cannot keep (report the input and the meaning). Decide, record, and carry on from: the expansion
reader's name and shape, case order, wording.

## Acceptance criteria

1. Every reading this brief names holds and is a case; every earlier reading still holds.
2. `scanUnreadForm` reads the `of` keyword through `readIdentifier`; no selector reader trims a
   literal whitespace.
3. The two sentences and the clause read as item 4 states.
4. The elements-layer assertion reads the same list; the digest matches; every gate in item 5
   exits 0 on managed Chromium and the three named ones on Edge.
5. `git status --porcelain` adds nothing beyond the two owned files and the report to report 8's
   list.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
