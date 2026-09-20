# Unit U3 — successor brief 12: the functional lists leave the grammar

## What changed and why

This brief supersedes `u3-brief-11.md` for the remainder of the unit; briefs 4 to 11
stand except where this brief says otherwise, and `u3-report-9.md` is the baseline. The
eighth audit round (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-verdict-8.md`,
lane reports beside it under `units/u3-audit-8-*`) refuted the expansion model twice over: a
compound's several `:is()`/`:where()` lists were unioned where an element must match every one,
and a host's incoming combinator was attached to an alternative's first compound where it reaches
the alternative's subject (`details + :is(.x summary)` is the sibling pair and reads false;
`details > :is(details summary)` is the mandated pair and reads true). The Orchestrator ruled that
the functional lists leave the grammar: the guard reads Veneer's own authored elements layer, that
layer writes no functional list, and a partial that would can write its selectors flat. The
stricter guard is the simpler one, and this brief removes what seven rounds added around it.

## Role and engine

Unchanged: `opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole
writer in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold
repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`, `git stash`,
`git reset`, `git clean`, or `git add`. Law from `C:/Users/mikes/WebstormProjects/scaffold`:
`AGENTS.md`, `.claude/rules/tests.md`, `names.md`, `typescript.md`, `writing.md`.

## Scope

**Owned.** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`. **Off-limits.** Everything else;
`tests/src/styles/index.test.ts` must read the same list after this brief.

## Execution

Perform the assignment directly and spawn nothing. Run `npm run test:setup` after each item.

1. **Refuse the functional lists.** `scanUnreadForm` names `functional list` for an `:is(` or
   `:where(` pseudo-class at any depth, in any case, decoded (`:IS(`, `:i\73(`), outside
   quotation; `matchesLooseTagPair` throws naming it. Delete `extractCompoundAlternatives`,
   `extractSelectorSubject`, `extractBareTag`, `mergeCompoundTags`, `expandCompoundSelector`,
   `expandComplexSelector`, and every case and TSDoc sentence that exists for them; keep
   `dropTaglessCompounds` only where `extractSelectorCompounds` still reads it (rename it for the
   module's own phrase, a compound naming no tag, if it stays). `extractCompoundTags` reads the
   compound's leading identifier through `readIdentifier` (a tag where the decoded text opens
   with an ASCII letter) and nothing else; a pseudo-class or pseudo-element other than the
   refused forms is part of its compound and names no tag. `matchesLooseTagPair` reads
   `extractSelectorCompounds` again over each complex selector of the list, with the middle drop
   as before. Every `:is()`/`:where()` reading in `tests/setupStyles.test.ts` becomes a refusal
   case or goes; keep one refusal case per spelling (`:is(h1, p)`, `:where(h1)+p`, `:IS(h1)+p`,
   `:i\73(h1)+p`, `:not(:is(h1))+p`) and the controls (`:not(h1)+p` true, `[title=':is(h1)'] + p`
   false, `h1[data-x=":is("] + p` true).
2. **Every other reading holds.** The escapes, identifiers, quoted boundaries, CSS whitespace,
   literal trim, `of` keyword, namespace, `:has()`, comment refusals, and every
   `matchesLooseTagPair`, `normalizeComplexSelector`, `splitTopLevelCompounds`,
   `splitTopLevelList`, `findGroupEnd`, `walkSelector`, `readEscape`, `readIdentifier`,
   `extractSelectorIdentifiers`, `extractCompoundTags`, and `extractSelectorCompounds` reading
   reports 4 to 9 record that does not involve `:is()` or `:where()` still holds; the direct
   assertion `extractCompoundTags('h1:not(p)')` is `['h1']` and `('h1:nth-child(2n)')` is
   `['h1']`.
3. **The reader list.** `walkSelector`'s TSDoc names, as a closed list, every reader that reads
   through it after item 1, and the grammar sentence drops the alternatives clause: the grammar is
   strings, escapes, groups, identifiers, combinators, and comma lists, with every pseudo-class
   and pseudo-element read as part of its compound naming no tag, and the fence naming the forms
   it refuses (namespace separator, `:has()` argument, `of` clause, comment, functional list).
4. **Prose.** Re-wrap every TSDoc block this unit wrote to `printWidth` 100 (`oxfmt` does not
   reflow comments); recast "so a form the grammar does not carry cannot pass as a permitted
   selector" positively; use the module's phrase "a compound naming no tag" wherever "tagless"
   appears.
5. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:setup`,
   `test:src:styles`, `test:src`, `test:setup:browser`, `test:conformance`, `test:guides`, then
   `npm test`; then `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`,
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src`, and
   `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`. Record each command's final lines and
   the cascade's SHA-256 after `build` (`8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1`).

## Output

Write `u3-report-10.md` and return its content: the diff per file (line counts before
and after); the export list before and after; every refusal reading; every retained reading
before and after; the grammar sentence; each gate's final lines on both engines; the digest;
deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; a shipped-cascade selector the fence now refuses; a retained reading item 2 cannot keep.
Decide, record, and carry on from: which cases merge, case order, wording.

## Acceptance criteria

1. `tests/setupStyles.ts` exports none of the six deleted readers; `matchesLooseTagPair` throws
   `functional list` on `:is(` and `:where(` in every spelling item 1 names.
2. Every retained reading item 2 names holds and is a case.
3. No TSDoc line in the two files exceeds 100 columns; the reader list is complete; no "tagless".
4. The elements-layer assertion reads the same list; the digest matches; every gate in item 5
   exits 0 on managed Chromium and the three named ones on Edge.
5. `git status --porcelain` adds nothing beyond the two owned files and the report to report 9's
   list.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
