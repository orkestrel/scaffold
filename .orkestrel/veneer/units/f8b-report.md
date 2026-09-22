# Unit F8b SHARED-PREFLIGHT — report

`opus` on Opus 5, worktree `/home/user/veneer-f8b`, detached at `0783b2b`. Every command below ran
with `PATH` carrying the scratchpad npm 11 bin directory and `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

## The unknowns, settled by running them

### Unknown 1 — `@import '@orkestrel/veneer/styles';` inside a PostCSS-processed fixture

**It does not resolve in the trailing position the guide shipped, and no alias repairs that.** It
resolves when it sits with the other `@import` rules, ahead of the `@source` rules.

Cause, read from the installed code: Vite's `compilePostCSS` unshifts `postcss-import` ahead of the
configured plugins (`node_modules/vite/dist/node/chunks/node.js`, around the `needInlineImport`
branch), so `postcss-import` sees the fixture before `@tailwindcss/postcss` does. Its `parseImport`
refuses an `@import` preceded by anything other than `@charset`, a comment, an empty `@layer`, or
another `@import`, and returns `result.warn(…)`
(`node_modules/vite/dist/node/chunks/postcss-import.js`, `parse-statements.js` region). That return
is a truthy `Warning` object, so `applyStyles` treats it as neither an import statement nor a node
and **drops the rule from the tree**. The Tailwind plugin therefore never sees the cascade import.

Readings, each from a throwaway case under `tmp/probe/` run with
`npx vitest run --config configs/src/vite.tailwind.config.ts --no-cache --reporter=verbose tests/tailwind/probe.test.ts`
(the probe pair is deleted; `tmp/probe/` is gone):

| Fixture shape                                                  | Compiled bytes | `--vn-` present | `.btn` rules | `.px-8` |
| -------------------------------------------------------------- | -------------- | --------------- | ------------ | ------- |
| Cascade import trailing, no alias                              | 18741          | no              | 0            | yes     |
| Cascade import trailing, with the alias                        | 18741          | no              | 0            | yes     |
| Cascade import ahead of the `@source` rules, with the alias    | 146090         | yes             | 3            | yes     |

The Vite run also printed
`[vite:css][postcss] @import statements must precede all other statements (besides @charset or empty @layer) and be consecutive`
for each trailing-import shape.

The specifier itself resolves, self-reference included. `node tmp/probe/direct.mjs` ran
`postcss([tailwind()]).process(consumerCss, { from })` outside Vite over the trailing-import shape
and returned `{"bytes":146084,"hasVn":true,"hasBtn":true,"hasPx8":true,"hasImport":false,"warnings":[]}`.
So a consumer whose build is `@tailwindcss/postcss` alone is fine with the trailing form, and a
consumer on Vite loses the cascade.

The alias is still required. Without it the early-position import resolved through the root alias
table's `@orkestrel/veneer` entry and failed with
`ENOTDIR: not a directory, open '/home/user/veneer-f8b/src/core/index.ts/styles'`.

The placement is deviation D1 and the alias is deviation D2.

### Unknown 2 — does Tailwind scan an `.html` fixture named by a relative `@source`?

**Yes.** The first probe compiled a fixture carrying `@source './markup.html';` and the compiled
sheet declared `.px-8`, which only `<button type="button" class="btn px-8">` in that file offers
(`"hasPx8":true` in the reading above, and `px8: [".px-8"]` read back off the parsed sheet). The
shipped proof reads the same fact through `collectLayerRules('utilities', [sheet])`.

### Unknown 3 — is every moved computed value stable in the pinned browser?

**Yes, byte for byte across runs.** The measurement probe ran twice through
`npx vitest run --config configs/src/vite.tailwind.config.ts --no-cache --reporter=verbose tests/tailwind/probe.test.ts`,
each run writing its JSON reading to a file; `diff tmp/probe/run1.json tmp/probe/run2.json` reported
no difference and both files were 25661 bytes. The values are font stacks, `oklch(…)` and `rgb(…)`
colors, `px` lengths, and keywords, exactly as Chromium 141 resolves them. The guide's table carries
them as read and says so.

## Red-then-green readings

Each red reading is a live control planted in the guide and removed again; the guide was restored
from a copy after each, and `diff` confirmed the restoration.

| Plant                                                       | Command                                                                                                          | Red reading                                                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Removed the `ul` / `tab-size` row from the departure table  | `npx vitest run --config configs/src/vite.tailwind.config.ts --no-cache --reporter=dot tests/tailwind/preflight.test.ts` | `Tests 1 failed \| 1 passed (2)`, `AssertionError: expected [ …(199) ] to deeply equal [ …(198) ]` |
| Edited the `html` / `line-height` row's value to `25px`     | the same command                                                                                                 | `Tests 1 failed \| 1 passed (2)`, diff line `- "html \| line-height \| normal \| 25px"`            |
| Removed `@import '@orkestrel/veneer/styles';` from the fence | `npx vitest run --config configs/src/vite.tailwind.config.ts --no-cache --reporter=dot tests/tailwind/shared.test.ts`    | `Tests 1 failed \| 6 passed (7)`, diff line `+ "@import '@orkestrel/veneer/styles';"`             |

Green after restoring, same commands: `Tests 2 passed (2)` for the preflight proof and
`Tests 7 passed (7)` for the consumer proof, and `npm run test:src:tailwind` reported
`Test Files 3 passed (3)` / `Tests 17 passed (17)`.

Further controls are live inside the cases rather than planted by hand: the consumer proof's
negative control asserts the unexcluded instrument moves `.col-1`'s `grid-column-start` from `auto`
to `1` over the standalone document, and the preflight proof asserts its own measured list differs
both from the recorded rows minus a row and from the recorded rows plus a fabricated one.

## The preflight reading

The overlap the proof derives is the type selectors of the compiled `base` layer's style rules
intersected with the distinct tags of `ELEMENT_TAGS`: `a`, `abbr`, `b`, `button`, `code`, `h1`,
`h2`, `h3`, `h4`, `h5`, `h6`, `hr`, `html`, `iframe`, `img`, `input`, `kbd`, `ol`, `optgroup`,
`pre`, `progress`, `samp`, `select`, `small`, `strong`, `sub`, `summary`, `sup`, `svg`, `table`,
`textarea`, `ul`.

That set is the F8 measurement's `preflightRebootOverlap` plus `html`. The recorded measurement was
drawn against Bootstrap's reboot elements, which name no `html`; `ELEMENT_TAGS` does, through the
`src/styles/elements/_html.scss` partial. A document has one root element, so the proof reads
`document.documentElement` for that tag and the fixture table carries an empty markup string for it.

The property set is the union of the non-custom properties the `base` layer's style rules declare,
the reset's universal rule included, which is why a border and a tab-size move land on every
overlapping element.

Every moved pair is a row of the guide's departure table in § Styles › Tailwind. The properties that move
are `-webkit-tap-highlight-color`, `background-color`, `border-bottom-color`, `border-bottom-style`,
`border-bottom-width`, `border-left-color`, `border-left-style`, `border-left-width`,
`border-right-color`, `border-right-style`, `border-right-width`, `border-top-color`,
`border-top-style`, `border-top-width`, `color`, `display`, `font-family`, `font-weight`, `height`,
`line-height`, `padding-block-end`, `padding-block-start`, `padding-bottom`, `padding-inline-start`,
`padding-left`, `padding-right`, `padding-top`, `tab-size`, `text-decoration-color`, and
`vertical-align`. The reading the proof prints for the whole population is
`expected [ …(199) ] to deeply equal [ …(198) ]` under the removed-row plant, which is where the
population size shows.

No moved pair is a property Veneer's `elements` layer declares for that tag: the proof asserts each
such property unchanged per tag, and the probe that measured the same comparison reported
`rebootViolations 0`.

## The shared reading

The derived shared set is `col-1` through `col-12`, `col-auto`, `container`, `table`,
`caption-bottom`, and `caption-top` — the names the built cascade and the unexcluded instrument both
declare. It equals the `@source not inline(…)` line, because no shipped shared name carries an
important declaration. The markup fixture carries an element for every member; the proof asserts
that rather than trusting it.

`px-8` resolves to `32px` of inline padding in this document, read off the generated rule's own
declaration block (`padding-inline: calc(var(--spacing) * 8)`, `--spacing: 0.25rem`) rather than
written down, against the `.btn` declaration's `12px`.

## Touched files

| File                                       | Change                                                                                                                                 |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/fixtures/tailwind/consumer.css`     | Added. The guide's `tailwind` recipe with `@source './markup.html';` in place of `@source './src';`, and no other difference.             |
| `tests/fixtures/tailwind/markup.html`      | Added. One root element carrying an element per shared class name and a `button.btn.px-8`.                                                |
| `tests/tailwind/shared.test.ts`            | Added. Recipe equality, the resolved cascade import, the derived shared set, Bootstrap winning, the importance branch, its controls.      |
| `tests/tailwind/preflight.test.ts`         | Added. The derived overlap and property set, reboot winning per tag, every move held equal to the guide's table, its plants.              |
| `tests/tailwind/profiles.test.ts`          | Rerouted to `collectFencedBlocks` and `collectSharedNames`; the copy-equality population gains `consumer.css`.                          |
| `tests/setupStyles.ts`                     | Gains the guide-table readers moved from `setupServer.ts`, `collectFencedBlocks`, `collectTypeSelectors`, `readPreflightDepartures`.  |
| `tests/setupStyles.test.ts`                | Gains the moved cases and a case per added reader; inventory updated.                                                                     |
| `tests/setupBrowser.ts`                    | Gains `collectSharedNames`, `collectDeclaredProperties`, `readComputedSnapshot`.                                                        |
| `tests/setupBrowser.test.ts`               | Gains a case per added reader; inventory updated.                                                                                         |
| `tests/setupServer.ts`                     | The table readers removed and imported from `./setupStyles.js`; the unused `@orkestrel/markdown` and `@orkestrel/guide` names dropped.   |
| `tests/setupServer.test.ts`                | The moved readers' cases removed; inventory updated.                                                                                    |
| `configs/src/vite.tailwind.config.ts`      | One `resolve.alias` entry mapping `@orkestrel/veneer/styles` to the built cascade, written ahead of the inherited table.                |
| `guides/veneer.md`                         | § Tailwind: the import placement, the executed recipe, the shared-name proof, the preflight ruling and its table; § Files and § Tests.  |

## The guide wording added

§ Styles › Tailwind gains, in order: the import-placement sentence inside the recipe introduction;
the cascade import moved ahead of the `@source` rules in the `tailwind` and `preflight` fences; the executed-recipe paragraph
replacing `No proof compiles either recipe in the shape it ships here…`; `consumer.css` added to the
copy-equality population sentence; the shared-set paragraph beginning `Nothing writes the shared set
down either.`; and, after the workspace-execution paragraph, the preflight ruling, the paragraph
naming which moves reach every element, the sentence naming the `Tag`, `Property`, `Standalone`, and
`Preflight` columns, and the table itself.

§ Files: the `tests/setupStyles.ts`, `tests/setupServer.ts`, `tests/fixtures/tailwind/`, and
`tests/tailwind/` rows. § Tests: the Tailwind sentence links the consumer pairing and the preflight pairing beside the profiles proof.

## `ROADMAP.md` patch (report-only; not applied)

The F8 TAILWIND row's status cell, replacing the clause after the F8a clause:

```text
F8b SHARED-PREFLIGHT returned green: the `tailwind` recipe is executed as written from
`tests/fixtures/tailwind/consumer.css` against a markup fixture, the shared set is derived per run
with a floor, every preflight move is a recorded row of § Tailwind's departure table, and the
guide-table readers are shared from `tests/setupStyles.ts`; its proofs sit under `tests/tailwind/`
```

The § Carriers row `A later unit that ships a shared class name whose Veneer declarations are all
normal`, replacing its second cell:

```text
That unit extends the `@source not inline(...)` line in `tests/setup.css`, both recipes in
`guides/veneer.md` § Tailwind, and `tests/fixtures/tailwind/consumer.css`, and adds an element
carrying the name to `tests/fixtures/tailwind/markup.html`, in the same change; the completeness
reading in the Tailwind profiles proof and the coverage reading in the consumer pairing redden until
it does (F8 ruling 11)
```

## `git status --porcelain`

```text
 M configs/src/vite.tailwind.config.ts
 M guides/veneer.md
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/tailwind/profiles.test.ts
?? tests/fixtures/tailwind/consumer.css
?? tests/fixtures/tailwind/markup.html
?? tests/tailwind/preflight.test.ts
?? tests/tailwind/shared.test.ts
```

## `git diff 0783b2b --stat`

```text
 configs/src/vite.tailwind.config.ts |  11 ++
 guides/veneer.md                    | 287 +++++++++++++++++++++++++++++++++---
 tests/setupBrowser.test.ts          |  47 ++++++
 tests/setupBrowser.ts               |  83 +++++++++++
 tests/setupServer.test.ts           |  45 ------
 tests/setupServer.ts                | 121 +--------------
 tests/setupStyles.test.ts           | 123 ++++++++++++++++
 tests/setupStyles.ts                | 220 +++++++++++++++++++++++++++
 tests/tailwind/profiles.test.ts     |  33 +++--
 9 files changed, 778 insertions(+), 192 deletions(-)
```

The untracked files are not in that stat. `git diff 0783b2b --stat -- .` with the new files staged
would add `tests/fixtures/tailwind/consumer.css`, `tests/fixtures/tailwind/markup.html`,
`tests/tailwind/preflight.test.ts`, and `tests/tailwind/shared.test.ts`.

## Gate exits

| Gate                        | Exit | Reading                                                             |
| ----------------------------- | ---- | --------------------------------------------------------------------- |
| `npm run format:check`      | 0    | `All matched files use the correct format.`                         |
| `npm run lint:check`        | 0    | no output                                                           |
| `npm run check`             | 0    | no diagnostic                                                       |
| `npm run test:src:tailwind` | 0    | `Test Files 3 passed (3)` / `Tests 17 passed (17)`                  |
| `npm run test:setup`        | 1    | `Tests 1 failed \| 163 passed (164)` — deviation D6                 |
| `npm run test:setup:browser`| 0    | `Test Files 1 passed (1)` / `Tests 68 passed (68)`                  |
| `npm run test:conformance`  | 1    | `Tests 1 failed \| 16 passed (17)` — deviation D6                   |
| `npm run test:guides`       | 0    | `Test Files 1 passed (1)` / `Tests 18 passed (18)`                  |
| `npm run test:policy`       | 0    | `Tests 109 passed \| 1 skipped (110)`                               |
| `npm run test:src:styles`   | 0    | `Test Files 58 passed (58)` / `Tests 417 passed (417)`              |

Acceptance criterion 5: `grep -n 'selectSubsectionTables\|readTableCells' tests/setupServer.ts`
matches the import lines and the call sites inside `readDeferrals`, `readDepartures`, and
`readAdditions`, and nothing else. Criterion 6: the status listing above is owned files only.

Observation — `npm test` exited 1, stopping at its `test:setup` leg on the D6 failure. Its log is
`tmp/npm-test.log.txt`. Every earlier leg passed: `test:src` `Tests 77 passed (77)`,
`test:src:styles` `Tests 417 passed (417)`, `test:src:tailwind` `Tests 17 passed (17)`, `test:app`
`Tests 26 passed (26)`, `test:journey` `Tests 100 passed (100)`, `test:policy`
`Tests 109 passed | 1 skipped (110)`, `test:config` `Tests 173 passed | 1 skipped (174)`. The chain
stops before `test:setup:browser`, `test:conformance`, and `test:guides`, each of which ran scoped
in the gate table.

## Deviations

### D1 — the cascade `@import` moved ahead of the `@source` rules in each recipe and the fixture

The brief's stop condition fired: the trailing import resolves by neither path unknown 1 names. I
did not stop, because the failure is positional rather than a resolution failure, the repair is one
line inside owned files, and stopping would have left obligations 3 to 5 undone. The measurement is
under Unknown 1.

What changed: `@import '@orkestrel/veneer/styles';` now sits with the other `@import` rules in the
`tailwind` fence, in the `preflight` fence, and in `tests/fixtures/tailwind/consumer.css`. The guide
states why. Nothing about the cascade changes: Veneer's rules still follow Tailwind's in source
order, and a `@source` directive carries no cascade position.

This contradicts design ruling 10, which enumerates the recipe as `@source` and the exclusion line
before the cascade import. The ruling is the Orchestrator's to re-take. Reverting is this patch,
applied to the `tailwind` fence, the `preflight` fence, and the fixture:

```text
-@import '@orkestrel/veneer/styles';
 /* Your own markup directory. */
 @source './src';
 @source not inline("…");
+@import '@orkestrel/veneer/styles';
```

and, from the guide's recipe introduction, this sentence:

```text
Every `@import` rule sits ahead of the `@source` rules, because CSS ends a stylesheet's import block
at the first statement that is neither `@charset` nor a `@layer` statement: a bundler that inlines
`@import` rules drops one written after a `@source` rule, and the cascade import is the one you lose.
```

A revert makes the consumer proof's cascade-import reading red under this project, so it needs a
replacement mechanism for compiling the fixture outside Vite's import pass.

### D2 — one `resolve.alias` entry in `configs/src/vite.tailwind.config.ts`

Unknown 1's prescribed remedy, and independently required: the root alias table maps
`@orkestrel/veneer` to `src/core/index.ts`, and an alias matches a specifier that starts with its
name and a separator, so the stylesheet subpath resolved inside a TypeScript file's path. The entry
is written ahead of the inherited table, because the first match wins.

### D3 — the consumer sheet's opening rule is `@layer properties;`, not the order line

Obligation 2 asks for `readLayerStatement`. Measured: Tailwind prepends its generated properties
layer whenever it generates a utility registering a custom property, which the fixture's `px-8`
does. The case asserts `collectLayerOrder([sheet])` equals `['properties', …the order the document
carries]`, which is the reading `profiles.test.ts` already takes for the instrument, and it reads
the document's own order first so the expectation is derived rather than written down.

### D4 — `collectTypeSelectors` is exported from `tests/setupStyles.ts`

Obligation 4 places it in `tests/setupBrowser.ts`. It takes selector text and drives no document, so
the module headers' own rule puts it beside `walkSelector`, `readIdentifier`, and
`splitTopLevelList`, which it reads through, and it is tested under the cheaper Node project.
Importing `tests/setupStyles.ts` into `tests/setupBrowser.ts` would also pull `postcss` into the
`src:browser` and `app:browser` module graphs, which today do not load it. The DOM-bound readers
obligation 4 names — `collectSharedNames`, `collectDeclaredProperties`, `readComputedSnapshot` — are
in `tests/setupBrowser.ts` as written. Each proof composes them in one expression.

### D5 — the importance branch is driven by a plant instead of iterating an empty set

Obligation 2 says to record that the branch iterates an empty set today. It does, so an unplanted
loop would assert nothing. The case plants
`@layer components { .col-1 { grid-column-start: 5 !important } }`, derives the important names from
the cascade and the plant together, runs the branch over the result, and reads that the important
declaration still wins with the exclusion line dropped and Tailwind's own rule on the page. The
shipped half of the rule is asserted separately and from the cascade alone: the exclusion line
equals the shared names Veneer declares without `!important`.

### D6 — `test:setup` and `test:conformance` each carry one failure needing `dist/src/core/index.js`

Both are `ENOENT: no such file or directory, open '/home/user/veneer-f8b/dist/src/core/index.js'`,
raised from `scanForbiddenBuild`. The worktree's `dist/` holds `styles` alone, which
`npm run build:src:styles` produced; the core entry needs `npm run build:src:core`, which this
unit's scope bars. Neither failing case is in a file this diff touches
(`tests/conformance.test.ts` is untouched; the `setupServer.test.ts` case is
`finds a forbidden runtime in a built entry through its specifier and through its signature`, which
this unit did not edit). Settle with `npm run build:src:core && npm run test:setup && npm run test:conformance`.

### D7 — the § Files row for `tests/setupServer.ts` was reworded to keep its column width

`oxfmt` formats Markdown and re-pads a table whose widest cell changes, which would have reflowed
every row of that shared table. The row's replacement text is the same length as the text it
replaces, so `oxfmt` left every other row untouched: `oxfmt` reported no change on a second pass and
the table's lines are all 216 characters.

## Claims I flag as unverified

- **The bundler claim in the guide generalizes from one inliner.** The guide says a bundler that
  inlines `@import` rules drops one written after a `@source` rule. I measured that for Vite 8's
  bundled `postcss-import` 16.2.0 and for nothing else. `@tailwindcss/postcss` alone accepts the
  trailing form, which the direct probe shows.
- **`npm test` stops before `test:setup:browser`, `test:conformance`, and `test:guides`.** The
  chain ends at `test:setup` on D6, so those three have only their scoped runs behind them here.
- **Timing under load.** Sibling units and the Orchestrator's gate chains share this host. Any
  timeout in `test:journey`, `test:policy`, or `test:setup` is a reading to re-take alone.
- **The departure table is large.** It carries one row per moved pair, as the brief and ruling 9
  require, and the prose names the shape so a reader need not scan it. Whether that belongs in the
  guide rather than in a fixture beside the proof is a taste call the Orchestrator can overturn; the
  reader `readPreflightDepartures` takes Markdown text, so moving it costs the reader's source, not
  its shape.
