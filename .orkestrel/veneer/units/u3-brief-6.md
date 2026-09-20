# Unit U3 — successor brief 6: the round-2 audit fixes

## What changed and why

This brief supersedes `u3-brief-5.md` for the remainder of the unit; briefs 4 and 5
stand except where this brief says otherwise, and `u3-report-3.md` is the baseline. The
second audit round (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-verdict-2.md`,
lane reports beside it under `units/u3-audit-2-*`) confirmed the fold, the oracle, the proofs,
the shared infrastructure, the installed-surface boundary, and the names, and refuted seven
claims on specific sites. Every item below names its source.

## Role and engine

Unchanged: `opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole
writer in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold
repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Law from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`,
`.claude/rules/tests.md`, `architecture.md`, `styles.md`, `names.md`, `typescript.md`,
`writing.md`, `documentation.md`.

## Scope

**Owned.** Everything briefs 4 and 5 own. **Off-limits.** Everything else, as brief 4 lists it.

## Execution

Perform the assignment directly and spawn nothing. Run the narrowest project after each step.

1. **The alpha form (analyst claim 4; reviewer 16).** `guides/veneer.md:160` teaches
   `rgb(var(--vn-color-primary-rgb) / 0.5)`; the triplet is comma-separated, so that declaration
   is invalid and paints nothing. Write `rgba(var(--vn-color-primary-rgb), 0.5)`, the form the
   section's opener and the cascade use, and make sure the customization fence the integration
   proof executes carries the same form.
2. **The deferred section (reviewer 17).** § Deferred names opens by saying its names are not
   declared, then documents `interpolate-size: allow-keywords`, which is declared and proved.
   Move that paragraph out of § Deferred names into the section that holds motion (or the
   departures), so § Deferred names lists only names the release does not declare.
3. **The factor rows (reviewer claim 2).** In § Reference map, each factor row's `Source` cell must
   give the value it targets: `1`, the neutral multiplier of the named scale.
4. **The `Source` sentence (reviewer 20).** `guides/veneer.md:88` says each table's `Source` cell
   names where the value comes from; the tier and departures tables carry no such column. Scope
   the sentence to the reference-map tables.
5. **The coupling sentence (reviewer 18).** `tests/src/styles/integration.test.ts` says "so
   changing the fence changes this string", which nothing enforces. Write it as the instruction it
   is: the recipe string is copied from the fence and must change with it.
6. **The inset shadow (analyst claim 3; reviewer 19).** `src/styles/_tokens.scss:219`
   `--vn-shadow-inset` carries no `var(--vn-factor-elevation)` multiplier while the numbered rungs
   do, and the registry groups it under `shadow`. Multiply its lengths by the factor like the
   rungs; update the guide row; the values proof reads it at the neutral factor.
7. **The selector scanner (analyst claim 9).** `extractSelectorTags` splits the normalized
   selector on spaces without respecting parentheses, and `extractCompoundTag` takes only the
   first `:is()`/`:where()` alternative. The analyst's executed readings: `:is(h1, p)` reads as a
   pair (must not: a list inside one compound is not two compounds), `:is(.title,h1)+p` reads as
   no pair (must: `h1` sits in the list and `+ p` follows). Tokenize with parentheses respected
   and read every bare-tag alternative of an `:is()`/`:where()` list as a tag of that compound;
   add the four readings (`:is(h1, p)` false, `:where(h1, p)` false, `:is(.title,h1)+p` true,
   `h1, p` false) as cases beside the existing ones; rewrite the two TSDoc blocks to what the
   readers now do.
8. **Literal colours outside `_tokens.scss` (analyst claim 12).** `src/styles/_theme.scss:22-26`
   declares the five image-valued dark variables with hex colours inside their data URIs. The
   guide's own architecture puts every value in `_tokens.scss`'s value maps and only the scopes in
   `_theme.scss`, and `.claude/rules/styles.md` names `_tokens.scss` as the one file a literal
   colour may appear in. Move those five values into the dark value map in `_tokens.scss` (the
   `theme-tokens` mixin then emits them in the dark scope), leaving `_theme.scss` with scopes and
   includes alone; rewrite the comment that travelled with them; keep `THEME_DARK_ADDITIONS` and
   the dark-partition proof green.
9. **Data tables in proofs (analyst claim 13).** `tests.md` puts data tables in a setup file at
   any size. Move `CASCADE` from `tests/setupBrowser.test.ts` to `tests/setupBrowser.ts` as an
   exported frozen constant named for what it is (a probe cascade); `PINNED_VERSION`,
   `PINNED_DIGEST`, and `CASCADE` from `tests/setupStyles.test.ts` to `tests/setupStyles.ts`
   (the Bootstrap identity and the read cascade text); `RECIPE` from
   `tests/src/styles/integration.test.ts` to `tests/setupStyles.ts` (the customization recipe);
   `TOKEN_PREFIX` from `tests/src/core/index.test.ts` to `tests/setup.ts`. Each is
   `UPPER_SNAKE_CASE` and frozen where it is a collection. The module-scope registry
   `const specimens: Element[] = []` in `tests/setupBrowser.ts` is a hidden mutable declaration:
   make it an exported entity (one class with `#` state and the mount, load, and clear behaviour
   the three functions carry, with one exported instance the proofs share), or have the functions
   take and return the registry explicitly; either way nothing at module scope is unexported or
   mutable data.
10. **Writing hits (analyst claims 4, 13).** `src/styles/_theme.scss:5` "Both modes",
    `tests/setupStyles.ts:537` "both modes", `:556` "two projects": name the members or drop the
    tally.
11. **The member-shape rule (analyst 16).** `guides/veneer.md:83` says a member is a group exactly
    where the cascade declares more than one property for it; `src/core/constants.ts` groups
    `text.secondary`, `text.tertiary`, and `surface.raised` around `base` alone. Read the
    `theme-tokens` mixin and `$roles`: if the mixin emits `-base` for every retuned role, amend the
    rule to say so (a retuned role always carries `base`, and the triplet where the cascade
    declares it) and keep the groups; otherwise flatten those three to leaves and rename their
    cascade tokens accordingly. Record the decision in the guide's rule sentence.
12. **Rival cleanup (analyst 17).** In `tests/setupBrowser.test.ts` the rival nodes installed
    `render` and `mount` create are removed after the assertions; a failed assertion leaks them
    into every later case. Remove them in `finally`.
13. **The exclusion sentence (analyst claim 5).** The TSDoc of `RETAINED_COLOR_ALIASES` explains
    the pairing exclusions and `RETAINED_LENGTH_ALIASES` the radius one; neither says why the
    text-valued tokens (`--vn-font-mono`, `--vn-surface-gradient`) are outside both tables. Add
    that sentence where it belongs.
14. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:src`,
    `test:src:styles`, `test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`,
    `test:setup:browser`, `test:conformance`, `test:guides`; then
    `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`, `PLAYWRIGHT_CHANNEL=msedge npm run test:src`,
    and `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`. Record each command's final lines.

## Output

Write `u3-report-4.md` and return its content: the diff summary per file; the four
scanner readings before and after; the decision on item 11 with the mixin reading behind it; the
shape chosen for item 9's registry; each gate's final lines on both engines; deviations in the
usual shape. Do not restate earlier reports.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; a dark-partition or oracle proof that item 8 reddens and you cannot close inside owned files.
Decide, record, and carry on from: names of the moved constants within the rules, the registry's
shape between the two admitted ones, section placement for item 2, wording.

## Acceptance criteria

1. No literal colour outside `src/styles/_tokens.scss` under `src/styles/**`.
2. No module-scope `const` data in any proof file; nothing unexported or mutable at module scope
   in `tests/setup*.ts`.
3. The four scanner readings match item 7.
4. `guides/veneer.md:160`'s form is `rgba(var(--vn-color-primary-rgb), 0.5)`; § Deferred names
   holds only undeclared names; the member-shape rule and the registry agree.
5. Every gate in item 14 exits 0 on managed Chromium and the three named ones on Edge.
6. `git status --porcelain` shows only owned files, the granted files, the integrated patch sites,
   and the reports.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the built
`dist/src/styles/index.css`.
