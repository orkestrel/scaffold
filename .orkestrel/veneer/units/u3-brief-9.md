# Unit U3 — successor brief 9: identifiers in the tokenizer, the guard's test, and three guide lines

## What changed and why

This brief supersedes `u3-brief-8.md` for the remainder of the unit; briefs 4 to 8
stand except where this brief says otherwise, and `u3-report-6.md` is the baseline. The
fifth audit round (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-verdict-5.md`,
lane reports beside it under `units/u3-audit-5-*`) confirmed the walker's grammar under every
attack the objective lane tried on strings, escapes, and groups, and found the one grammar the
walker does not carry: identifiers. Items 1 and 2 close it; the rest are one test and three
guide lines.

## Role and engine

Unchanged: `opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole
writer in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold
repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Law from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`,
`.claude/rules/tests.md`, `styles.md`, `names.md`, `typescript.md`, `writing.md`,
`documentation.md`, `quality.md` (§ Instruments: a settling instrument becomes a test).

## Scope

**Owned.** Everything briefs 4 to 8 own. **Off-limits.** Everything else, as brief 4 lists it.

## Execution

Perform the assignment directly and spawn nothing. Run the narrowest project after each step.

1. **Identifiers (analyst 10).** `extractCompoundTags` reads a leading tag with
   `/^([a-zA-Z][a-zA-Z0-9]*)/u`, which stops at `-`, `_`, and an escape, so `details-card` reads
   as `details` and `details-card summary` is exempted as the mandated pair; `detai\ls` reads as
   `detai`. Read an identifier by the CSS grammar through the walker's steps: `-`, `_`, letters,
   digits, and escapes, where a backslash followed by one to six hex digits and an optional
   whitespace decodes to that code point and a backslash followed by any other character decodes
   to that character (so `detai\ls` is `details`, and `det\ails` is `det`, a line feed, `ils`);
   compare the decoded tag. Cases with the analyst's readings: `details-card summary` true,
   `detai\ls summary` false, `det\ails summary` true, `details summary` false, plus the decoding
   itself (`extractCompoundTags('detai\ls')` is `['details']`).
2. **The functional name (analyst claim 1).** `extractCompoundTags` still tests
   `/:(?:is|where)$/u` against the text before an opener the walker classified. Read that name from
   the walker's steps instead (the identifier ending at the opener, preceded by `:`), compared
   case-insensitively, because a pseudo-class name is ASCII case-insensitive: `:IS(h1)+p` reads
   true; add it as a case. After this item no reader in `tests/setupStyles.ts` reads selector text
   except through `walkSelector` and the identifier reader of item 1, and their TSDoc says so.
3. **The guard's test (analyst 11).** `src/styles/_theme.scss`'s `@error` on an asset key
   `tokens.$dark` lacks has no test. Promote report 6's plant into one Node case in
   `tests/setupStyles.test.ts` that compiles the shipped `_theme.scss` through `sass` with a
   planted `$assets` entry (make `$assets` in `_tokens.scss` configurable with `!default` so the
   case injects the extra key through `@use '…/tokens' with (…)`, loading from `src/styles/`), asserts
   the error names the key, and a control that compiles the same entry with the key present in
   the configured `$dark` and emits the declaration. Change nothing else in `_tokens.scss`.
4. **The legend sentence (reviewer claim 2).** The `Source` legend table in `guides/veneer.md`
   (near line 95) follows a paragraph that never names it: add the one sentence, in the
   `#### Factors` form, naming that the table gives each `Source` value and what it names.
5. **The departures cells (reviewer 10).** The two Token cells reading
   `` `--vn-size-2`, through `--bs-body-font-size` `` and `` `--vn-font-sans`, through
   `--bs-font-sans-serif` `` read as truncated sentences beside bare token names. Give each its
   alias in the sentence after the table or as "reached through", so the column holds keys.
6. **The either/or (reviewer 12).** "the first animated consumer, which is the disclosure or
   drawer unit" names two units; write "the first unit that animates a keyword length".
7. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:src`,
   `test:src:styles`, `test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`,
   `test:setup:browser`, `test:conformance`, `test:guides`; then
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`, `PLAYWRIGHT_CHANNEL=msedge npm run test:src`,
   and `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`. Record each command's final lines.
   Take the built cascade's SHA-256 before and after; it must not move.

## Output

Write `u3-report-7.md` and return its content: the diff summary per file; every
identifier and pseudo-name reading before and after (the analyst's table plus the earlier ones);
the guard case's readings; the cascade digests; each gate's final lines on both engines;
deviations in the usual shape. Do not restate earlier reports.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; a `sass` compile the guard case cannot drive from the shipped partials (report the exact
error). Decide, record, and carry on from: the identifier reader's name and return shape, case
order, wording.

## Acceptance criteria

1. Every reading item 1 and item 2 name holds, and every earlier reading still holds.
2. `tests/setupStyles.test.ts` reddens when the `@error` guard is removed from `_theme.scss`.
3. `guides/veneer.md`: every table under § Tokens follows a sentence; the two Token cells are
   keys; no either/or names two units.
4. The cascade's SHA-256 is unchanged; every gate in item 7 exits 0 on managed Chromium and the
   three named ones on Edge.
5. `git status --porcelain` shows only owned files, the granted files, the integrated patch sites,
   and the reports.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the built
`dist/src/styles/index.css`.
