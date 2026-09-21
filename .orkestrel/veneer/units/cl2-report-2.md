# Unit CL2 — fix round report (brief 3)

Every finding brief 3 carried is closed inside the owned files, each new assertion reddened on a
plant before it went green, every plant is reverted, and every gate exits 0 on managed Chromium and
on Edge. No deviation: nothing stopped, and no fix needed a file outside the owned set.

Owned files touched: `tests/setupStyles.ts`, `tests/setupBrowser.test.ts`,
`tests/src/styles/tokens.test.ts`, and this report.

## Finding 1 — the hidden constant in `tests/setupStyles.ts`

**Change as landed.** The `MEDIA_WIDTH_CONDITION` declaration and its doc block are deleted. The
regex literal sits inside `parseMediaWidth`'s body, at its single call site:

```ts
export function parseMediaWidth(condition: string): number | undefined {
	const matched =
		/\bwidth\s*[<>]=?\s*(-?\d+(?:\.\d+)?)px|\b(?:min|max)-width\s*:\s*(-?\d+(?:\.\d+)?)px/u.exec(
			condition,
		)
	if (matched === null) return undefined
	const width = matched[1] ?? matched[2]
	if (width === undefined) return undefined
	return Number.parseFloat(width)
}
```

**Site.** `tests/setupStyles.ts:1059`.

**Prose the deleted block carried.** Its one load-bearing clause — the first alternative reads the
range form Veneer authors and the second the legacy pair, each carrying the width as the condition's
one length — is folded into the function's existing `@remarks`, which already stated why the two
spellings are read as one boundary. The function is the only reader, so no other site loses it.

**Files the brief barred.** `tests/setupStyles.test.ts` is untouched. Its export inventory never
named the constant, so the inventory case is unchanged.

**No hidden declaration remains.** The pattern and its scope, run over the whole file:

```text
$ grep -n "^\(const\|let\|var\|function\|class\|interface\|type\|enum\) " tests/setupStyles.ts
(no output)
```

Every module-scope declaration in the file carries `export`.

**Proof.** Brief 3 asked no red proof here, because the fold relocates a declaration and changes no
behaviour. The behavioural cover is the existing spelling case, which runs both alternatives
(`(width >= 576px)`, `(width < 0px)`, `(min-width: 576px)`, `(max-width: 575.98px)`,
`screen and (width >= 1400px)`) plus the unit and axis refusals:

```text
$ npm run test:setup
 Test Files  3 passed (3)
      Tests  126 passed (126)
EXIT=0
```

## Findings 2 and 3 — the `collectMediaConditions` case in `tests/setupBrowser.test.ts`

**Change as landed.** The fixture's second gate reads `(width < 768px)` rather than `(width < 576px)`,
the gated reading asserts `[576, 768]`, and the `readRules()` assertion that the shipped cascade
already satisfied is replaced by the pair the flat walk cannot produce.

**Site.** `tests/setupBrowser.test.ts:631-658`, inside the case
`reports the gate around a selector, where the installed rule walk reports the gate and the gated rule apart`.
The fixture line is at 635, the ordered reading at 644-646, and the replacement pair at 653-657:

```ts
		// The two gates carry different widths, so the reading binds their order as well as their
		// membership, and it stays serialization-agnostic by comparing the widths rather than the
		// condition text.
		expect(collectMediaConditions(rules, '  .vn-probe-gated  ').map(parseMediaWidth)).toEqual([
			576, 768,
		])
		expect(collectMediaConditions(rules, '.vn-probe-absent')).toEqual([])
		// The installed walk reports the media rule and the rule it holds as two entries of one flat
		// list, so both fixture gates come back whichever selector the caller is asking about, and a
		// reading taken from it cannot say which gate holds which selector. This walk answers per
		// selector, so the fixture rule that sits under no gate reports nothing.
		const flat = readRules().flatMap((rule) =>
			rule instanceof CSSMediaRule ? [parseMediaWidth(rule.conditionText)] : [],
		)
		expect(flat).toContain(576)
		expect(flat).toContain(768)
		expect(collectMediaConditions(rules, '.vn-probe-open')).toEqual([])
```

**The ungated selector settled.** `.vn-probe-open` is the fixture's own rule outside the
`@layer components` block, so it is declared in the same sheet and gated by neither media rule. The
`.vn-probe-absent` reading, which no rule declares at all, stays where it was, so the case still
separates "declared and ungated" from "not declared".

**The flat reading's bound.** `readRules()` walks every sheet the page loaded, so the list also
carries the cascade's `prefers-reduced-motion` and `forced-colors` conditions, which
`parseMediaWidth` reports as `undefined`. The assertion therefore reads membership of the two
fixture widths rather than equality against a whole list that the loaded cascade can grow.

**Red then green.** The command is the same in every run:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser -t 'reports the gate around a selector'
```

| Reader state                                | Result                            |
| ------------------------------------------- | --------------------------------- |
| Unchanged, after the fixture and expectation edit | `Tests 1 passed \| 32 skipped (33)`, exit 0 |
| Plant A: every gate replaced by the first one     | `Tests 1 failed \| 32 skipped (33)`         |
| Plant B: a gate reported for any declared selector | `Tests 1 failed \| 32 skipped (33)`        |
| Unchanged, after both plants reverted             | `Tests 1 passed \| 32 skipped (33)`, exit 0 |

Plant A is the plant brief 3 named — `collectMediaConditions` returns its first matching condition
for every match. It reddens finding 2's assertion, at `tests/setupBrowser.test.ts:644`:

```text
- Expected
+ Received
  [
    576,
-   768,
+   576,
  ]
```

`[576, 576]` is exactly what the round-1 fixture asserted, so the round-1 reading accepted this
reader and this one refuses it.

Plant B is the defect finding 3's replacement claims to catch — a reader that confuses "this
selector is declared somewhere in the rules" with "this selector sits under this gate", which is the
reading the flat walk gives. It reddens at `tests/setupBrowser.test.ts:657`, and the round-1
`.not.toEqual([])` assertion it replaced passes under it:

```text
AssertionError: expected [ '(width >= 576px)', …(1) ] to deeply equal []

- []
+ [
+   "(width >= 576px)",
+   "(width < 768px)",
+ ]
```

**Condition serialization.** That failure output is the raw `conditionText` Chromium returned: it
serializes the authored range syntax verbatim, `(width >= 576px)` and `(width < 768px)`. I did not
capture Edge's raw text; what the Edge gate establishes is that the parsed reading is `[576, 768]`
there too, which is the property the assertion rests on.

**Plant removal.** `tests/setupBrowser.ts` was edited for the plants alone and is back to the body
CL2 landed:

```text
$ grep -n "const gates\|const declared\|gates.map(\|const first =" tests/setupBrowser.ts
(no output)

$ git diff --stat tests/setupBrowser.ts
 tests/setupBrowser.ts | 36 ++++++++++++++++++++++++++++++++++++
 1 file changed, 36 insertions(+)
```

The diff against `00a5bdc` is insertions alone, so no line of the file's committed content moved.

## Finding 4 — the stripe case in `tests/src/styles/tokens.test.ts`

**Change as landed.** The case opens with an observable placement assertion against the dark
closure's own declaration list, and the value assertions are kept unchanged. The comment that
claimed a stripe declared outside the closure "reads empty in a mode scope" is replaced, because
that claim is what reviewer 11 falsified: an island inherits the `:root` value.

**Site.** `tests/src/styles/tokens.test.ts:288-296`:

```ts
	it('resolves the stripe percentage to the retained Bootstrap tint in each mode', () => {
		const sheet = requireValue(readCascadeSheet(), 'The document loaded no Veneer cascade')
		// A mode island inherits the `:root` value, so a reading taken on the island holds wherever
		// the stripe is declared. The dark closure's own declaration list is what places the stripe
		// beside the hover and active percentages.
		expect(
			collectScopeProperties(collectNestedRules(sheet.cssRules), "[data-bs-theme='dark']"),
		).toContain(TOKEN_NAMES.state.stripe)
```

`rules` is obtained the way the sibling case `re-declares every theme-dependent name inside each mode
scope` obtains it, through `readCascadeSheet()` and `collectNestedRules`, so the reading is taken
from the shipped cascade rather than from a fixture. `collectScopeProperties` normalizes the
selector's quotes, so `"[data-bs-theme='dark']"` matches whatever form the engine serializes.

**Red then green.** The plant moves `--vn-state-stripe` out of the `theme-tokens` mixin in
`src/styles/_mixins.scss` into the first `:root` block of `src/styles/_tokens.scss` as
`--vn-state-stripe: 5%`. The command in every run:

```text
npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot -t 'resolves the stripe percentage'
```

| Cascade and assertion state                                   | Result                              |
| -------------------------------------------------------------- | ----------------------------------- |
| Shipped placement, new assertion present                        | `Tests 1 passed \| 108 skipped (109)`, exit 0 |
| Plant applied, rebuilt, new assertion present                   | `Tests 1 failed \| 108 skipped (109)`         |
| Plant applied, rebuilt, new assertion replaced by `void sheet`  | `Tests 1 passed \| 108 skipped (109)`         |
| Plant reverted, rebuilt, new assertion present                  | `Tests 1 passed \| 108 skipped (109)`, exit 0 |

The red run fails at `tests/src/styles/tokens.test.ts:295`:

```text
AssertionError: expected [ '--lightningcss-light', …(124) ] to include '--vn-state-stripe'
```

The control run is the third row: with the new assertion taken out and the plant still in the
cascade, the case's value assertions pass. That is reviewer 11's finding reproduced under a run —
the round-1 readings bound the resolved value and not the placement, and the new assertion is what
binds the placement.

**A fact the next unit needs.** The `src:styles` project loads `./dist/src/styles/index.css` as a
setup file, so an edit to `src/styles/*.scss` reaches the case only after `npm run build:src:styles`.
My first plant run skipped the rebuild and reported green against the stale cascade; the row above
is the rebuilt run. A styles proof driven from a source edit must rebuild before it is read.

**Plant removal.** `src/styles/_mixins.scss` and `src/styles/_tokens.scss` were edited for the plant
alone and carry the shipped placement again, and the temporary `void sheet` line is gone from the
owned test:

```text
$ grep -rn -- "--vn-state-stripe" src/styles/
src/styles/_mixins.scss:136:	--vn-state-stripe: #{map.get($values, 'state-stripe')};

$ grep -n "void sheet" tests/src/styles/tokens.test.ts
(no output)
```

The declaration sits inside `theme-tokens` and nowhere else, and no `:root` block declares it.

## Gates

Each gate ran from the Veneer checkout with the plants removed. Node gates are engine-independent;
the browser projects ran on managed Chromium and then with `PLAYWRIGHT_CHANNEL=msedge`, which
`configs/browsers.ts:303` turns into `launchOptions.channel = 'msedge'`.

| Gate                                          | Exit | Final lines                                                          |
| --------------------------------------------- | ---- | -------------------------------------------------------------------- |
| `npm run format:check`                        | 0    | `All matched files use the correct format.` / `Finished in 755ms on 96 files using 16 threads.` |
| `npm run lint:check`                          | 0    | No diagnostic printed                                                |
| `npm run check`                               | 0    | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json`, no diagnostic |
| `npm run test:setup`                          | 0    | `Test Files 3 passed (3)` / `Tests 126 passed (126)` / `Duration 6.36s` |
| `npm run test:setup:browser` (Chromium)       | 0    | `Test Files 1 passed (1)` / `Tests 33 passed (33)` / `Duration 4.16s` |
| `npm run test:src:styles` (Chromium)          | 0    | `Test Files 9 passed (9)` / `Tests 109 passed (109)` / `Duration 19.98s` |
| `npm run test:setup:browser` (Edge)           | 0    | `Test Files 1 passed (1)` / `Tests 33 passed (33)` / `Duration 4.56s` |
| `npm run test:src:styles` (Edge)              | 0    | `Test Files 9 passed (9)` / `Tests 109 passed (109)` / `Duration 21.09s` |

## Tree state

```text
$ git diff --stat
 guides/veneer.md                      |  65 ++++++++++++---------
 src/core/constants.ts                 |  11 ++++
 src/styles/_mixins.scss               |  51 ++++++++++++++++
 src/styles/_tokens.scss               |  30 ++++++----
 tests/setupBrowser.test.ts            |  32 +++++++++-
 tests/setupBrowser.ts                 |  36 ++++++++++++
 tests/setupStyles.test.ts             |  31 ++++++++++
 tests/setupStyles.ts                  |  25 ++++++++
 tests/src/styles/fixtures/mixins.scss |  17 ++++++
 tests/src/styles/mixins.test.ts       | 106 +++++++++++++++++++++++++++++++++-
 tests/src/styles/tokens.test.ts       |  85 +++++++++++++++++++++++++++
 11 files changed, 447 insertions(+), 42 deletions(-)

$ git status --porcelain --untracked-files=all
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_tokens.scss
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/fixtures/mixins.scss
 M tests/src/styles/mixins.test.ts
 M tests/src/styles/tokens.test.ts
```

The status lists the CL2 files brief 3 named and nothing else. `tmp/` is ignored, so this report adds
no entry. HEAD is unchanged at `00a5bdc`: nothing was committed, pushed, or restored, and no
`git checkout`, `restore`, `stash`, `reset`, or `clean` ran.

## Acceptance criteria

| Criterion                                                                           | State |
| ------------------------------------------------------------------------------------ | ----- |
| `tests/setupStyles.ts` has no unexported module-scope declaration; `parseMediaWidth` reads both spellings; `npm run test:setup` exits 0 | Met, with the grep and the run recorded under finding 1 |
| The reader case asserts `[576, 768]` and an empty result for an ungated selector, and reddened on the reader plant | Met, plant A and plant B recorded under findings 2 and 3 |
| The stripe case asserts the dark scope carries `--vn-state-stripe`, and reddened on the placement plant | Met, with the control run recorded under finding 4 |
| Every gate exits 0 on managed Chromium and Edge                                      | Met, § Gates |
| The status lists the CL2 files and nothing else; the plants are gone                 | Met, § Tree state and the removal greps |

## Observations, not criteria

- Reading the sibling case `re-declares every theme-dependent name inside each mode scope`, its
  assertion compares the light scope's canonical names against the dark scope's, so a stripe absent
  from each passes it. That is a source reading rather than a run: I ran the plant under the `-t`
  filter for the stripe case alone, so I did not measure the rest of the `src:styles` project against
  the plant.
- `.vn-probe-absent` and `.vn-probe-open` both redden under a reader that ignores its selector
  entirely, so plant B was narrowed to a reader that matches any declared selector, which isolates
  the `.vn-probe-open` assertion and leaves the rest of the case green.
