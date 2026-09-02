# Unit U3s3 report — an exact accessible name beside an `aria-hidden` glyph

`implementer` on Opus 5, standing in for the Sol implementer, sole writer in
`C:\Users\mikes\WebstormProjects\test`. Done. Nothing committed. No deviation.

## The mechanism and its bound

`resolveRendered` now runs two passes, and only the first one can return an element.

- **Visible pass.** `page.getByRole(role, { name, exact: true })`, with `includeHidden` dropped. The
  role engine then computes the name the accessibility tree publishes, which excludes every
  `aria-hidden` subtree, so an icon glyph contributes nothing and the exact string matches again.
  Every element the resolver returns, refuses as unreachable, or reports as ambiguous comes from
  this pass, so no approximation can reach the choice of element.
- **Hidden pass.** It runs only when the visible pass found nothing at all, and it returns no
  element — it chooses between `No interactive element has the accessible name "X"` and
  `Interactive target "X" is not visible and focus-reachable`. Seeing a folded control requires
  `includeHidden: true`, which puts the glyph back into the computed name, so the pass matches a
  pattern instead of the exact string.

The pattern is the one new export, `computeNamePattern(name: string): RegExp`, in
`src/browser/helpers.ts`. It collapses the requested name's whitespace, escapes its
regular-expression punctuation, and anchors it between two runs of characters that are neither
letters nor digits: `^[^\p{L}\p{N}]*NAME[^\p{L}\p{N}]*$`. The role engine accepts a `RegExp` for
`name` and tests it against the same normalized computed name it compares a string against, so
nothing here re-implements the accessible-name algorithm.

The hidden pass keeps `exact: true` beside the pattern, and that flag is load-bearing for a reason
the name does not suggest: it is the engine's case-sensitivity switch, so with `exact: false` the
engine uppercases the computed name before testing the pattern against it and a lowercase letter in
the requested name never matches.

**Decided exactly.** A glyph made of characters carrying no letter and no digit, at either edge or
both — which is what an icon font paints, and what a `+`, a `·`, or a private-use codepoint is. The
exact contract holds: `Add` matches neither `Add building` nor `\uF4FE Add building`, in either
pass.

**Approximated, and only in the voice.** A hidden icon whose own content is a word defeats the
pattern, so a folded target beside it is refused as absent rather than as unreachable. A name
differing from the requested one by punctuation alone satisfies it, so `Save` reports a folded
`Save!` as unreachable rather than as absent. Both cost a refusal voice; neither can return, refuse,
or disambiguate an element, because the visible pass owns every element decision.

## Failing proof before the fix

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts
```

Before the change, with the proof cases in place: **4 failed | 193 passed (197)**.

- `resolveRendered > resolves an exact name that sits beside an aria-hidden icon glyph`
- `resolveRendered > refuses a folded control beside a glyph as hidden rather than absent`
- `resolveRendered > keeps the exact contract in the hidden pass as well as the visible one`
- `readPerception > reads a region whose label carries an aria-hidden glyph`

After the change, the same command: **201 passed (201)** — 197 plus the four `computeNamePattern`
unit cases added with the fix.

The suite grew twice more afterwards, so the current reading of the same command is
**203 passed (203)**, and the whole project reads **234 passed (234)** against a **221 passed (221)**
baseline taken before any edit.

### The control for the two consequence cases

Two added cases pin a behaviour change the visible pass causes rather than the glyph defect, so they
were reddened separately. Restoring `includeHidden: true` on the two visible-pass queries alone, with
the hidden pass left standing and the whole final suite in place, the same command reports
**5 failed | 198 passed (203)**, and the two are among the five:

- `resolveRendered > refuses a control an aria-hidden ancestor withholds rather than returning it`
- `readPerception > refuses a region the accessibility tree withholds, painted or not`

Both queries were then restored and the same command reports 203 passed.

## Each site's ruling

| Site                                          | Ruling                                                                                                                                                                                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resolveRendered`, formerly line 129 (exact)  | **Changed.** Split into the visible pass and the hidden pass described earlier.                                                                                                                                                                           |
| `readPerception`, formerly line 422 (exact)   | **Changed, one pass.** `includeHidden` dropped; no hidden pass added. Absence and concealment share its single refusal, `Named region "X" is not visible`, so a second pass would carry no information.                                                    |
| `clickAccessibleWithin`, formerly line 251    | **Unchanged.** The region query already omits `includeHidden`, so a region label carrying a glyph already resolved.                                                                                                                                       |
| `clickAccessibleWithin`, formerly line 252    | **Unchanged.** The loose match reads the glyph-carrying computed name and still finds `Monthly income` inside it, and the verb owns one refusal for a control it cannot reach, absent or hidden. A case in the suite proves the behaviour rather than assuming it. |

## Behaviour change beyond the glyph, recorded

Dropping `includeHidden` from the visible pass means an `aria-hidden` control that is painted and
clickable is now refused as not visible and focus-reachable, where it was previously returned. The
same holds for an `aria-hidden` region under `readPerception`. This follows the layer's own premise
and `isRendered`'s contract — the accessibility tree does not present it — and both are pinned by
tests and stated in the guide.

## The cases in the suite

All in `tests/src/browser/helpers.test.ts`, against a fixture stylesheet declaring
`.glyph::before { content: "\uF4FE" }` and an `<i class="glyph" aria-hidden="true">` icon. Case 1
asserts the computed `::before` content before it asserts the resolver, so a stylesheet that failed
to apply reddens instead of proving nothing.

| Brief case | Test                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------- |
| 1          | `resolveRendered > resolves an exact name that sits beside an aria-hidden icon glyph`            |
| 2          | `resolveRendered > refuses a folded control beside a glyph as hidden rather than absent`         |
| 3          | `resolveRendered > refuses a folded control carrying no glyph as hidden rather than absent`      |
| 4          | `resolveRendered > refuses a name the page carries nowhere, hidden or not`                      |
| 5          | `resolveRendered > keeps the exact contract in the hidden pass as well as the visible one`      |
| 6          | `readPerception > reads a region whose label carries an aria-hidden glyph`                      |
| 7          | `clickAccessibleWithin > activates a glyph-captioned control inside a glyph-labelled region`    |

Beside them: four `computeNamePattern` cases covering both edges of the bound, the punctuation
literal, and the whitespace collapse; and the two consequence cases named earlier.

## Guide lines changed

`guides/test.md`:

- Browser helpers table: a `computeNamePattern` row after `resolveRendered`.
- The resolver section: a paragraph stating the two passes, which one returns an element, and which
  refusal the other decides; a paragraph on `computeNamePattern` and both edges of its tolerance; a
  paragraph on `readPerception` running one pass and why.
- The `clickAccessibleWithin` paragraph: the loose match reads the hidden-inclusive name, and the
  verb owns one refusal, so it needs no second pass.
- The coverage narrative for `tests/src/browser/helpers.test.ts`: the glyph cases, the
  `computeNamePattern` cases, the withheld control and the withheld region, and the region-scoped
  glyph case.

`README.md` was not touched. Nothing in the suite reads it for parity.

## Scoped gate readings

```text
npm run format:check   All matched files use the correct format. (59 files)
npm run lint:check     exit 0
npm run check          exit 0
npm run test:src:browser   234 passed (234), 2 files
npm run test:guides        38 passed | 1 skipped (39)
npm run test:policy        111 passed (111)
```

The guides project ran because the change adds a public export and edits the guide; the policy
sweep ran because the change adds a source declaration. The skip in the guides project is
pre-existing and conditional on a host link capability.

```text
git diff --stat
 guides/test.md                    |  45 +++++++++++--
 src/browser/helpers.ts            |  68 ++++++++++++++++++--
 tests/src/browser/helpers.test.ts | 130 ++++++++++++++++++++++++++++++++++++++
 3 files changed, 232 insertions(+), 11 deletions(-)

git status --porcelain
 M guides/test.md
 M src/browser/helpers.ts
 M tests/src/browser/helpers.test.ts
```

## Claims I could not close

- **The whole-suite reading.** Only the browser, guides, and policy projects were run here.
  `npm test` and the distribution proof belong to an independent verifier.
- **The terrain shell.** The fix is proved against constructed markup in this repository. Nothing
  here re-measured terrain's mounted shell, so the finding that motivated the unit is closed by
  construction rather than by re-running its original reading.
- **Icon fonts other than the private-use shape.** The bound is stated and unit-tested against a
  private-use codepoint and against punctuation. An icon set painting a letter or a digit as its
  glyph is named as a known edge and is not exercised by a fixture.
