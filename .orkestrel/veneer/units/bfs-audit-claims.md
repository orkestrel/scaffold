# B-FORMS-SELECT — audit claims

## Subject

The B-FORMS-SELECT unit's uncommitted writes in `/home/user/veneer-bfs` (detached at `2c10329`,
Veneer `main` with the passive family, VALIDATION, and RANGE landed), written by `opus` from
`/home/user/veneer-bfs/tmp/units/b-forms-select-brief.md` under the design
`/home/user/veneer-bfs/tmp/units/b-forms-design-verdict.md` (rulings 1 to 7, 9, 10, 11). One round so
far: this one. Review evidence: `.orkestrel/veneer/units/bfs.diff` (the whole diff against
`2c10329`; the new owned files were added with `git add -N` so the diff renders them),
`bfs-status.txt`, the report `.orkestrel/veneer/units/bfs-report.md`, and the writer's ROADMAP
patch `.orkestrel/veneer/units/bfs-roadmap.patch`; the frames sit under
`/home/user/veneer-bfs/tmp/capture/states/` (the `form-select*` files) and are the primary evidence
for every rendered claim, the source corroboration. The mutation instrument and its log:
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfs/mutate-2.py` and
`mutations-2.log.txt`.

## What the round decides

Whether B-FORMS-SELECT lands on Veneer `main` as the `form-select` baseline, with the Orchestrator's
shipped-key Set literal edit and the roadmap patch (its carrier text replaced by D26's), and whether
the writer's deviations stand: D1 (the theme scope's `select-indicator` entry left in place and
carried to B-FORMS-ASSETS under D26), D2 (the plain specimen named `Form select base`), D4 (the
`.form-select.is-valid:focus` and `.form-select.is-invalid:focus` ledger rows moved into the
`form-select` table by attribution).

## Already established — do not re-run

Verified by the Orchestrator directly, not taken from the writer's report: the worktree base
`2c10329`; `src/styles/index.scss:61` is `@use 'components/form-select';` directly before
`@use 'components/form-range';` at line 62; `tests/conformance.test.ts:105` lists `'form-select'`;
`ls tmp/capture/states | grep -c '^form-select'` returns 52 (7 scenarios × 4 variants as frames plus
6 subjects × 4 variants as accessibility artifacts); `guides/veneer.md` has `### Form select classes`
at line 723 before `### Form range classes` at 787, `#### \`form-select\`` at 2682 after the last
table, `#### \`is-invalid\`` at 2538 and `#### \`is-valid\`` at 2546; `src/styles/_tokens.scss`
carries `select-indicator` in `$dark` (line 103), `$icons` (line 143), and `$assets` (line 162), the
last still emitted by `_theme.scss` under the dark scope (D26's follow-up removes it after CHECK and
SELECT land); the partial reads `map.get(tokens.$icons, 'select-indicator')` at line 12 and
`map.get(tokens.$dark, 'select-indicator')` at line 85; the partial's `.form-select-sm` (line 65) and
`.form-select-lg` (line 73) are two per-variant blocks with no `@each`, which D30 rules take one
`@each`: that finding is already carried to the SELECT fix round, so rule the rest of claim 8 and do
not re-report it; the select's end padding is `calc(var(--vn-space-6) * 3)` (line 15), the idiom D33
adopts for the group's sized select.

## Unknowns

- Whether the focus border tint `color-mix(in srgb, var(--vn-palette-blue) 50%, var(--vn-palette-white-base))`
  is the release's `#86b7fe` mix with fractional channels retained (the CHECK round established this
  for the same expression; confirm the select's proof holds the tint within one channel step).
- Whether every rendered claim has a frame the portfolio shows: rule `NOT-EVIDENCED` where it does
  not, naming the missing capture. The focus page frame cannot show the ring legibly at page scale;
  the journey's readings after the shot are the family's evidence for a focus frame.
- Whether the `.form-select:-moz-focusring` ladder path (no resolved reading, no authored reading in
  Chromium's CSSOM, the compiled-cascade reading in `tests/setupStyles.test.ts`) is the reading
  design ruling 9's ladder prescribes for a selector the engine discards at parse time.

## The threshold

A finding is worth more than a clean pass: a defect that lands on `main` here reaches every later
forms unit and every consumer of the next release. `CONFIRMED` requires naming the attack that
failed; a claim about a proof is ruled on the mutation named and whether the assertions distinguish
it from the passing case. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED with
`file:line`.

## Claims

1. **The partial emits the key as recorded.** `src/styles/components/_form-select.scss` opens
   `@layer components` and emits every selector the inventory records under `form-select` that is
   the select's own (`.form-select`, its reduced-motion condition, `:focus`, `[multiple]`,
   `[size]:not([size="1"])`, `:disabled`, `:-moz-focusring`, `.form-select-sm`, `.form-select-lg`)
   with every declaration and condition the compiled release carries, tokenized per the report's
   table (`--vn-space-3`, `--vn-space-6`, `calc(var(--vn-space-6) * 3)`, `--vn-space-2`,
   `--vn-space-4`, `--vn-space-8`, `--vn-size-3`, `--vn-size-2`, `--vn-size-5`, `--vn-weight-body`,
   `--vn-line-body`, the transition through the mixin, the focus ring and tint per ruling 9, the
   `--bs-*` globals byte for byte, the carets through `map.get` per ruling 4), plus the dark rule
   `[data-bs-theme='dark'] .form-select` reading the `$dark` caret; it emits none of the
   floating-label, input-group, or validation selectors the key records (FLOATING, GROUP, and
   VALIDATION own them). Compile with `npx sass` and compare against `bootstrap.css`.
2. **The barrel order is the release's.** `form-select` loads directly before `form-range` and
   after `validation` (line 55): rule whether any `form-select` rule ties a `validation` rule at
   equal specificity so that the load order decides (the release loads form-select before
   validation), naming the pair and the settling reading if one exists.
3. **The proof reads what it claims.** `tests/src/styles/components/form-select.test.ts` reads each
   recorded declaration on the element its selector matches, the border, fill, and disabled surface
   in each mode through `readStates`, the direct-declaration retune, the space-scale reading under
   density, the reduced-motion gate under `stageMedia({ motion: false })`, the ring after keyboard
   focus through `traverseAccessible` held to `FOCUS_RING` in each mode and the tint within one
   channel step of `#86b7fe`, the `[multiple]` and `[size]` forms with the `size="1"` control keeping
   the caret, the disabled traversal refusal, the dark caret inside a dark scope with a wrapper retune
   reaching neither caret and a nested light island keeping the dark caret, and asserts the CSSOM
   carries no `:-moz-focusring` rule; `tests/setupStyles.test.ts` holds `FORM_SELECT_CASES` and
   `FORM_SELECT_FOCUS` to the pinned inventory and reads the Gecko reset out of the compiled cascade.
   Rule each mutation in the report's table (wrong caret URI; dark rule removed; ring width `0.25rem`;
   `background-image: none` removed from the list rule; transition without the mixin; `[size]`
   without the `:not([size="1"])` exclusion; padding as literals; the `:-moz-focusring` rule removed)
   on whether the named assertions distinguish it, and name any recorded declaration no case reads.
4. **The showcase and the registry.** `FormSelectSection.ts` renders the region `Form select` with
   the specimens `FORM_SELECT_SPECIMENS` declares (`Form select base`, small, large, multiple, sized,
   disabled); `CASCADE_KEYS` gains six resting rows; `FORM_SELECT_KEYS` carries `form-select-base-focus`
   as a page frame; the journey reaches the plain select through the keyboard and reads its state
   after the shot; every scenario has its frame at every variant; the named frames show what the
   report claims (the caret on the base select, no caret on the multiple select, the dark caret at
   `dark-*`). D2 stands (`readSubject` refuses a specimen sharing the region's name; `Close control`
   and `Form check box` are the precedents).
5. **The accounting.** `form-select` sits sorted in `listed`; its selector and variable rows sit in
   § Compatibility; the `#### \`form-select\`` table carries the `tokenized` rows the report lists,
   the `dropped` `-webkit-appearance` and `-moz-appearance` rows, and the two `is-*:focus` rows D4
   moved (rule that `attributeSelector` attributes `.form-select.is-valid:focus` to `form-select`
   by running it, and that the `is-valid` and `is-invalid` tables lost exactly those rows); no
   deferral row names a `form-select` selector; no addition row is owed; the § Bootstrap variables
   paragraph's correction is true against `_tokens.scss` and `_theme.scss`.
6. **The guide.** `### Form select classes` sits directly before `### Form range classes` in that
   section's shape and voice, names the caret maps and the dark rule, states the ladder path for
   `:-moz-focusring` as compiled-contract evidence, states the theme-scope limit D26 carries, and
   names its § Files row and § Tests link; the added prose follows `writing.md` (no banned term, no
   count, `should`-free, a code token followed by a noun).
7. **D1 stands and its patch is exact.** `_theme.scss` still emits `--bs-form-select-bg-img` under
   the dark scope; the component's own rule declares the variable on the element, so the inherited
   theme value is never read there (rule from the cascade: a declaration on the element outranks an
   inherited custom property); the report's removal patch (one `$assets` line) and its named
   false-going files (`theme.test.ts` › `carries the dark-only component assets…`, `tokens.test.ts`
   › `re-declares every theme-dependent name…`, the guide sentence) are complete for B-FORMS-ASSETS.
8. **The law holds** (D30's `@each` finding excluded, already carried). Across the diff: no `any`,
   `as` (other than `as const`), `!`, or suppression; no nested function beyond a callback passed or
   returned directly; every exported table frozen and `{QUALIFIER}_{NOUN}`-named; no helper whose job
   an installed `@orkestrel/test` export does; no literal colour outside `_tokens.scss`; the one
   transition through the mixin.
9. **Scope is honest.** `bfs-status.txt` lists the four owned files as `A` and the thirteen shared
   files as `M`, all in the brief's owned or shared set; `tmp/probe/` is absent; `_tokens.scss`,
   `_theme.scss`, `_validation.scss`, `tests/setupServer*.ts`, `tests/src/styles/components/validation.test.ts`,
   `ROADMAP.md`, and every vendored file are untouched.
10. **Gates.** `format:check` (266 files), `lint:check`, `check`, `build:src`, `test:src:styles` (71
    files, 641 passed), `test:app` (55 passed), `test:guides` (18), `test:policy` (109 passed, 1
    skipped), `test:journey` (132 passed), and the four `CAPTURE=1` runs (33 passed each) exit 0;
    `test:setup` and `test:conformance` are red only on the Set literal (O1) and the sibling-absent
    presence reading (O2). UNRESOLVED until the Orchestrator's independent chain at the landing; run
    `npm run check` yourself where the sandbox allows it.

## Observation for the lanes

The GROUP reviewer's R4: GROUP writes the sized select's end padding in a group as
`var(--vn-space-24)` (3rem) while this unit writes the select's own as `calc(var(--vn-space-6) * 3)`;
D33 changes GROUP's to `calc(var(--vn-space-6) * 4)`. Rule whether the select's caret room
(`background-position: right var(--vn-space-6) center`, `background-size: 16px 12px`) stays clear of
the text under `--vn-factor-density: 2`, where the end padding doubles and the caret's inset doubles.
