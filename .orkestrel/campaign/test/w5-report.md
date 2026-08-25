# Unit W5 report — test guide browser carriers

Every residue heading the brief named now has one carrier in `tests/src/browser/`, opening with its
exact marker line. The browser project, the scoped lint check, the scoped format check, and the
project typecheck are green.

## Touched files

- `/home/user/orkestrel/test/tests/src/browser/helpers.test.ts` — six fence carriers, each appended
  to the `describe` of the helper its fence is chiefly about; `createTeardown` added to the
  `@src/core` import for the mount carrier.
- `/home/user/orkestrel/test/tests/src/browser/factories.test.ts` — the capture-portfolio carrier
  appended to `describe('createPortfolio')`; `expandCaptures` added to the `@src/browser` import.

Diffstat:

```text
 tests/src/browser/factories.test.ts |  62 +++++++++++
 tests/src/browser/helpers.test.ts   | 202 +++++++++++++++++++++++++++++++++++-
 2 files changed, 263 insertions(+), 1 deletion(-)
```

`git status --porcelain` reports those two files modified and nothing else.

## Placement map

Placement rule applied: the carrier sits in the `describe` of the symbol its fence is chiefly about,
matching the landed `contrast`, `readRing`, and `createJournal` carriers. Where a fence drives
several symbols, the chosen host is named with its reason.

| Guide heading (`guides/test.md`)              | Carrier file and `describe`        | Marker line landed at | Host chosen because                                                       |
| --------------------------------------------- | ---------------------------------- | --------------------- | ------------------------------------------------------------------------- |
| "Build and mount a fixture" (:1952)           | `helpers.test.ts`, `mount`         | `:995`                | `mount` is the pivot `build` and `render` sit around in that fence        |
| "Drive an interface the way a person does" (:1987) | `helpers.test.ts`, `clickAccessible` | `:373`            | the journey layer's central verb, and the fence's role-first and region-first claims are click claims |
| "Drive a field the component listens to" (:2018) | `helpers.test.ts`, `typeInput`   | `:1111`               | the fence's split claim is `typeInput` against `commitInput`              |
| "Read the tokens and colors a theme declares" (:2101) | `helpers.test.ts`, `token`   | `:1964`               | the heading's own subject; `rootToken`, `rgba`, `colorEqual`, and `pixels` ride along |
| "Find a rule in the cascade" (:2129)          | `helpers.test.ts`, `findRule`      | `:1816`               | the fence's first and widest claim; `findKeyframes` and `readRules` ride along |
| "Remove an IndexedDB database" (:2157)        | `helpers.test.ts`, `removeDatabase` | `:1221`              | single-symbol fence                                                       |
| "Place a capture portfolio" (:2221)           | `factories.test.ts`, `createPortfolio` | `:256`            | `createPortfolio` lives in `src/browser/factories.ts`; the file already restores the viewport in `afterAll`, which an enabled `place` needs |

The exact marker lines as landed:

```text
tests/src/browser/helpers.test.ts:373    // guides/test.md → Patterns → "Drive an interface the way a person does". A browser fence
tests/src/browser/helpers.test.ts:995    // guides/test.md → Patterns → "Build and mount a fixture". A browser fence carries in this
tests/src/browser/helpers.test.ts:1111   // guides/test.md → Patterns → "Drive a field the component listens to". A browser fence carries
tests/src/browser/helpers.test.ts:1221   // guides/test.md → Patterns → "Remove an IndexedDB database". A browser fence carries in this
tests/src/browser/helpers.test.ts:1816   // guides/test.md → Patterns → "Find a rule in the cascade". A browser fence carries in this
tests/src/browser/helpers.test.ts:1964   // guides/test.md → Patterns → "Read the tokens and colors a theme declares". A browser fence
tests/src/browser/factories.test.ts:256  // guides/test.md → Patterns → "Place a capture portfolio". A browser fence carries in this
```

Each continues on its next line with `carries in this directory because the guides project runs with
the browser disabled.`, which is the landed pattern. A search for each heading string across
`tests/src/browser/` returns exactly one hit.

## What each carrier executes and asserts

**"Build and mount a fixture"** — `mount > mounts a built fixture and takes every one back out on one
hook`. Builds the `section` with its `classes` and `attributes`, mounts it, registers its removal on
a `createTeardown` list, appends the built `button` inside it, then renders the markup form and the
tag form. Asserts the panel's tag, class, `aria-label`, and attachment; the appended button's text,
`type`, and `pixels(save, 'padding-left') === 12` against a declared `.primary` rule, which is the
"resolves against the cascade" claim; that `render(markup)` hands back the attached container
(`DIV`, carrying the parsed button) and `render('h2', 'title')` the attached element itself (an
`HTMLHeadingElement` carrying the class); and that after `teardown.destroy()` none of the panel, the
container, or the heading is connected — the fence's registration claim.

**"Drive an interface the way a person does"** — `clickAccessible > runs one journey by role and name
alone, touching no element`. One fixture carries the labelled `Runs` field, a tab with its own panel
labelled by it, twin `Monthly income · ready` controls in `Ledger` and `Vault`, an `Evaluate` button,
and a `Run` region with padded text and visually hidden text. Asserts `readValue('textbox', 'Runs')
=== '3'` after `typeAccessible`; that the bare name is refused with `Interactive target "Drafts" is
ambiguous across 2 elements`, which is the collision the fence's comment claims, and that
`clickAccessible('tab', 'Drafts')` then activates the tab once; that `clickAccessibleWithin('Ledger',
'button', 'Monthly income')` is heard once in the Ledger and never in the Vault; that
`traverseAccessible('Evaluate')` returns the `#evaluate` button and that `document.activeElement` is
that same node, with no `focus()` call anywhere; and that `readPerception('Run')` is
`'Scored 3 of 3 on the first pass'` — whitespace collapsed, hidden-but-read text kept.

**"Drive a field the component listens to"** — `typeInput > sends one input for a keystroke and an
input then a change for a commit`. Renders `<input aria-label="Runs" value="0">` and records, per
event, the name, that it bubbles, the field's value at dispatch, and that the event is a plain
`Event` and not an `InputEvent`. Asserts `typeInput(field, '3')` produces exactly
`[['input', true, '3', true]]` and `field.value === '3'`; that `commitInput(field, '4')` produces
`[['input', true, '4', true], ['change', true, '4', true]]` and `field.value === '4'`. The container
is removed in a `finally`, which is the fence's closing line.

**"Read the tokens and colors a theme declares"** — `token > reads the theme through the cascade,
resolves its colors, and measures its lengths`. Declares `:root { --ink: rgb(1, 2, 3) }` and
`.card { padding-left: 12px }`, mounts a `span.card`. Asserts every value the fence's comments claim:
`rootToken('ink')` and `rootToken('--ink')` both `'rgb(1, 2, 3)'`; `token(card, 'ink')` the same by
inheritance; `token(card, 'absent') === ''`; `rgba('var(--ink)') === [1, 2, 3, 1]`;
`rgba('rebeccapurple') === [102, 51, 153, 1]`; `rgba('not-a-color')` undefined;
`colorEqual('rebeccapurple', 'rgb(102, 51, 153)')` and `colorEqual(token(card, 'ink'), 'rgb(1, 2,
3)')` both true; `pixels(card, 'padding-left') === 12`; and `pixels(card, 'width') === 0`, pinned by
`style(card, 'width') === 'auto'` beside it so the zero is the fence's stated case rather than an
accident.

**"Find a rule in the cascade"** — `findRule > finds a grouped rule and a named animation, and
reports nothing for either miss`. Declares `.card { padding: 8px }` inside a media query and a
`slide` animation with a `from` stop and a `to` stop. Asserts the grouped rule's `padding` reads
`'8px'`; `findRule('.never-declared')` undefined; `findKeyframes('slide')` carrying two stops;
`findKeyframes('slid')` undefined, which is the exact-name claim; that `slide` is among the
`CSSKeyframesRule` values `readRules()` returns; and that `readRules()` returns no `CSSKeyframeRule`,
which is the fence's claim that the stops inside an animation never appear in that list.

**"Remove an IndexedDB database"** — `removeDatabase > deletes an absent database, refuses a held
one, and deletes it after the close`. Asserts `removeDatabase('never-created')` resolves, which is
what makes the fence's unconditional `afterEach` hook safe; opens a real `ledger` connection and
asserts the call rejects with `IndexedDB database "ledger" is blocked by an open connection`; closes
the connection in a `finally`, asserts the same call then resolves, and reads the deletion back
through `indexedDB.databases()` rather than trusting the resolve. The fence prints the blocked arm
last as prose; the carrier runs it while the one connection is open, which is the only order that
proves both arms with one connection.

**"Place a capture portfolio"** — `createPortfolio > answers what a full portfolio holds and what
this run placed`. Declares the fence's states and variants, including the `dark-390` variant whose
`apply` sets `data-theme`, and creates the enabled portfolio against
`../../../tmp/capture/states`. Asserts `expandCaptures(states, variants)` has four entries;
`portfolio.files` equals the four literal names and equals that expansion; that
`place('start-empty')` ran the variant's `apply` (`data-theme` is `dark`), wrote
`tmp/capture/states/start-empty--dark-390.png`, that the file reads back non-empty, and that
`portfolio.states` records the placement; that a portfolio omitting `enabled` resolves `undefined`
and records nothing, which is the fence's comment about an ordinary run; and that
`place('answer-partial')` rejects with `Capture state "answer-partial" is not registered`. The
`data-theme` attribute is removed in a `finally`.

## Validation

Every command was run from `/home/user/orkestrel/test`.

| Command                                                                        | Result                                   |
| ------------------------------------------------------------------------------ | ---------------------------------------- |
| `npm run test:src:browser`                                                     | 2 files passed, 208 tests passed, 17.04s |
| `npx oxfmt --config .oxfmtrc.json --check tests/src/browser/`                   | exit 0, "All matched files use the correct format." |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/src/browser/`         | exit 0, no diagnostics                   |
| `npx tsc --noEmit --project tsconfig.json`                                     | exit 0                                   |
| `npm run test:guides` (observation, not a criterion)                           | 1 file passed, 22 tests passed           |

Each new carrier was confirmed to run, by a name-filtered verbose run:

```text
✓ tests/src/browser/helpers.test.ts:373  > clickAccessible > runs one journey by role and name alone, touching no element
✓ tests/src/browser/helpers.test.ts:995  > mount > mounts a built fixture and takes every one back out on one hook
✓ tests/src/browser/helpers.test.ts:1111 > typeInput > sends one input for a keystroke and an input then a change for a commit
✓ tests/src/browser/helpers.test.ts:1221 > removeDatabase > deletes an absent database, refuses a held one, and deletes it after the close
✓ tests/src/browser/helpers.test.ts:1816 > findRule > finds a grouped rule and a named animation, and reports nothing for either miss
✓ tests/src/browser/helpers.test.ts:1964 > token > reads the theme through the cascade, resolves its colors, and measures its lengths
✓ tests/src/browser/factories.test.ts:256 > createPortfolio > answers what a full portfolio holds and what this run placed
```

## The carriers were proved able to fail

These are transcriptions rather than defect fixes, so no test ran red against a live defect. Each was
instead proved to bite: one fence-derived value in each carrier was mutated (`'surface'` to
`'surface-x'`; the collapsed perception string re-padded; the `input` value `'3'` to `'0'`;
`rgba('var(--ink)')` to `[1, 2, 3, 0.5]`; the `slide` stop count to 3; `open connection` to
`open cursor`; the expansion length to 5), and the same filtered command reported `Tests 7 failed |
201 skipped (208)` — one failure per carrier. The mutations were then restored from copies taken
before the run, and the full project returned to `208 passed`. The lint instrument was checked the
same way: a planted `const value: any = 1` in `tmp/w5-lint-probe.ts` produced
`typescript(no-explicit-any)` and exit 1, and the probe file was removed.

## Observation on the guide, for a guide-owning successor

Not a deviation: the fence line is true as written. The "Read the tokens and colors a theme declares"
fence claims `pixels(card, 'width') // 0 — a width resolving to `auto` carries no number`, and its
preamble says only that `.card` sets `padding-left: 12px` and that `card` is a mounted element
carrying that class. That zero holds only where the box resolves `width` to `auto`. Measured on
Chromium in this project: with `card` a mounted `div.card`, `style(card, 'width')` returned `'402px'`
and the assertion read `expected '402px' to be 'auto'`; with `card` a mounted `span.card` it returned
`'auto'` and `pixels` returned `0`. The carrier therefore uses an inline box and pins
`style(card, 'width') === 'auto'` beside the zero. A guide-owning unit can name the element as inline
in that fence's preamble if the ambiguity is worth closing.

## Deviation state

No deviation. No fence failed to execute as documented. Off-limits files were not touched:
`tests/guides.test.ts`, `guides/test.md`, `tests/setup*.ts`, `src/**`, and `package.json` are
unmodified. No git state was changed and nothing was committed.
