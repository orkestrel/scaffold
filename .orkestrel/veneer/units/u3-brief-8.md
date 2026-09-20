# Unit U3 — successor brief 8: one selector tokenizer, the guide's table sentences, and four small closes

## What changed and why

This brief supersedes `u3-brief-7.md` for the remainder of the unit; briefs 4 to 7
stand except where this brief says otherwise, and `u3-report-5.md` is the baseline. The
fourth audit round (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-verdict-4.md`,
lane reports beside it under `units/u3-audit-4-*`) confirmed everything brief 7 did and refuted
three claims on the sites below. The selector scanner has opened one grammar case per round —
functional lists, attribute strings, escaped quotes, quoted parentheses, escaped identifiers —
because each reader carries its own partial tokenizer. Item 1 closes that seam once.

## Role and engine

Unchanged: `opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole
writer in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold
repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Law from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`,
`.claude/rules/tests.md`, `styles.md`, `names.md`, `typescript.md`, `writing.md`,
`documentation.md`.

## Scope

**Owned.** Everything briefs 4 to 7 own. **Off-limits.** Everything else, as brief 4 lists it.

## Execution

Perform the assignment directly and spawn nothing. Run the narrowest project after each step.

1. **One tokenizer (analyst claims 1 and 2).** The lanes executed two more misreads:
   `matchesLooseTagPair(':is(.title[title="("], h1)+p')` reads false and must read true, and
   `matchesLooseTagPair('h1[title="("], p')` reads true and must read false, because
   `splitTopLevelList` counts a quoted parenthesis as nesting; and `normalizeComplexSelector`
   turns `h1\+p` into `h1\ + p`, reading an escaped `+` as a combinator, where the escaped
   identifier must pass through unchanged and name one compound. Write one exported walker in
   `tests/setupStyles.ts` that steps through selector text honouring strings (either quote, with
   backslash escapes inside), backslash escapes outside strings (the escaped character is
   literal), and groups (parentheses and brackets, nested), and have `findGroupEnd`,
   `splitTopLevelList`, `splitTopLevelCompounds`, and `normalizeComplexSelector` all read through
   it, so no reader carries its own partial grammar. Keep every existing reading green, add the
   four new readings as cases (with the `x` controls the analyst used: replacing the quoted `(`
   by `x` flips each of the first two), and state the tokenizer's grammar in one TSDoc that the
   readers' TSDoc refer to. A selector form outside that grammar is not read wrong silently: say
   in the same TSDoc what the walker does with an unterminated string or group (the existing
   `findGroupEnd` unclosed-group case fixes the shape).
2. **The bare tables (reviewer 16; claim 9).** `.claude/rules/writing.md` § Structure: introduce
   every table in a guide with a complete sentence naming what follows. Under
   `#### Text and surface`, `#### Links`, `#### Type`, `#### Space, border, radius, and elevation`,
   and `#### Motion, focus, validation, breakpoints, and stacking`, add that sentence in the form
   `#### Factors` and `#### Palette and gray ramp` already carry.
3. **`role-each` (reviewer 17; analyst 4).** Ruling: retained. Its shipped include is
   `theme-tokens`; its fixture include is the isolated paint proof of the tier math, which is why
   it is a mixin and `theme-assets` was not. Record that reason in one comment at the mixin's
   declaration in `src/styles/_mixins.scss`, stated against `.claude/rules/styles.md`'s one-caller
   rule.
4. **The header (reviewer 18).** `tests/setupConformance.ts:2-3` says the module is loaded by the
   `conformance` project alone; `tests/setupStyles.test.ts` now imports `readBootstrapCascade`
   from it under the `setup` project. Name the projects that load it.
5. **The orphan paragraph (reviewer 19).** The `interpolate-size: allow-keywords` paragraph sits
   inside § Reference map's motion subsection among `--vn-*` token tables; it is a declaration on
   the document element. Move it to the § Showcase paragraph that describes the document and body
   baseline (or give the baseline its own subsection there), leaving § Reference map to tokens.
6. **The map join (reviewer 21).** In `src/styles/_theme.scss`'s `@each` over `tokens.$assets`, a
   key `tokens.$dark` lacks would emit an empty declaration. Guard it: `@error` naming the key
   when `map.has-key` is false, so the build fails instead of shipping `--bs-…: ;`. Add nothing
   else there.
7. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:src`,
   `test:src:styles`, `test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`,
   `test:setup:browser`, `test:conformance`, `test:guides`; then
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`, `PLAYWRIGHT_CHANNEL=msedge npm run test:src`,
   and `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`. Record each command's final lines.

## Output

Write `u3-report-6.md` and return its content: the diff summary per file; the
tokenizer's grammar sentence; every scanner and normalizer reading (the four new ones with their
controls, and every earlier one) before and after; the asset snapshot comparison; each gate's
final lines on both engines; deviations in the usual shape. Do not restate earlier reports.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; an earlier reading the unified walker cannot keep. Decide, record, and carry on from:
naming of the walker, its return shape, wording, case order.

## Acceptance criteria

1. Every scanner and normalizer reading named in this brief and in reports 4 and 5 holds; no
   reader in `tests/setupStyles.ts` scans selector text except through the one walker.
2. Every table in `guides/veneer.md` § Tokens follows a sentence naming what it lists.
3. `src/styles/_theme.scss` fails the build on an asset key `$dark` lacks; the emitted bytes are
   unchanged otherwise.
4. Every gate in item 7 exits 0 on managed Chromium and the three named ones on Edge.
5. `git status --porcelain` shows only owned files, the granted files, the integrated patch sites,
   and the reports.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the built
`dist/src/styles/index.css`.
