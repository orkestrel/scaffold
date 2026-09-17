# Proving what the browser resolved

Prove a style from what the browser resolved on the mounted surface. The `enterprise-bootstrap`
skill's [instruments reference](../../enterprise-bootstrap/references/inspection.md) names each
instrument's property, its population, and its coverage. Take those from there, the reading from
here, and the control from the builder this layer publishes for it.

## The vocabulary

```ts
import type {
	CaptureVariant,
	CensusFixture,
	CensusReading,
	Color,
	ContrastFixture,
	EscapeFixture,
} from '@orkestrel/test/browser'
import {
	CANVAS_COLOR,
	blendColor,
	buildCensus,
	buildContrast,
	buildEscapes,
	extractOrphans,
	extractStyles,
	findKeyframes,
	findRule,
	matchesColor,
	measureContrast,
	measureLuminance,
	parseCSSColor,
	pressKeys,
	readBackdrop,
	readCascade,
	readCensus,
	readClasses,
	readContrast,
	readLayers,
	readPixels,
	readRing,
	readRootToken,
	readRows,
	readStyle,
	readToken,
	traverseAccessible,
	waitForAnimations,
} from '@orkestrel/test/browser'
import { inject } from 'vitest'
```

## Assert the resolved value

- Read one property with `readStyle(element, property)` and a length with `readPixels(element, property)`. A
  class present in the markup and absent from the cascade resolves to nothing, and an assertion on
  the class list passes on it.
- Read `readPixels` as a measured contribution rather than a parsed length. A resolved value
  carrying no leading number reads as `0`, so read the text with `readStyle` where an unparsable
  value and a genuine zero are different findings.
- Never substitute `findRule` for a resolved read. It proves a declaration exists, and another rule
  may still win; reach for it where the stylesheet itself is the subject, and for `findKeyframes`
  where the animation's declaration is.
- Compare a color through `matchesColor` or `parseCSSColor` rather than by string. A browser normalizes a color
  expression, so a literal comparison fails on a value that resolved correctly.
- Take every reading after the paint settles. Await `waitForAnimations` on the element whose
  transition was running ([layer.md](layer.md) → The waits); a reading taken mid-transition reports
  an interpolated frame no state of the interface paints.

## Run per variant

The run axis is fixed in [SKILL.md](../SKILL.md) → Read the variant once. The matrix family's own
readings follow.

- Read `inject('variants')` for the declared list, and walk every entry inside one run. This family
  reads the whole matrix, where the capture family renders one variant per run.
- Compose each variant's `apply` in the test, and apply it with the variant's `width` and `height`
  before the readings. Take every reading for that variant before moving to the next.
- Name the attribute the surface actually reads in `apply`; a Bootstrap surface switches on
  `data-bs-theme`. An `apply` that sets another attribute leaves the run in the default theme, where
  every reading passes.
- Reach for the application's own theme control where the surface ships one, and assert the state it
  announces. Setting the attribute directly proves the stylesheet; driving the control proves the
  surface.
- Assert that the run read every declared variant. A matrix that silently walked one variant reports
  a pass for the theme nobody exercised.
- Report which variants a result covers beside it. A pairing that appears only in a state the run
  never entered is unmeasured.

Vitest `provide` carries serializable values only, so the provided variant carries `name`, `width`,
and `height`; `apply` does not cross that channel. Compose it in the test from the name the project
provided.

## Contrast and focus chrome

- Read a text pairing with `readContrast(element)`, which composites the painted ancestors to the first
  opaque layer, so a translucent tint reads as a tint over what shows through it.
- Pass `floor` only where the surface the stack really sits on is known, and pass `CANVAS_COLOR`
  where the browser paints onto its own canvas. Omitting `floor` refuses a stack whose painted layers
  are all translucent; take that refusal as the reading, because an assumed white canvas turns "this
  surface declares no background" into a number that reads like a measurement.
- Read focus chrome with `readRing(control)`, after focus arrived through `traverseAccessible`,
  `pressKeys`, or a real click. Pass `worn` where the chrome is painted onto a second element such
  as a label. It reports `undefined` for a control not matching `:focus-visible`, for the browser's
  own automatic ring, and for a focus style that only repaints the fill — treat each as a finding
  about the surface rather than as a pass.
- Reach for `measureContrast`, `measureLuminance`, `blendColor`, `readLayers`, and `readBackdrop`
  only where the composite itself is the subject. Never re-derive `readContrast` from them.

## The published controls

Take each reading's control from the builder this layer publishes for it, so no workspace's control
drifts into a fixture that cannot fail. `.claude/rules/quality.md` § Instruments owns the law that
control satisfies.

| Reading         | Control                   | What it carries                                                                        |
| --------------- | ------------------------- | -------------------------------------------------------------------------------------- |
| `readContrast`  | `buildContrast(bar)`      | A translucent tint over an opaque floor, with a `refused` and an `accepted` foreground |
| `extractStyles` | `buildEscapes(permitted)` | An inline declaration, an embedded `<style>` element, and the sheet the id exempts     |
| `readCensus`    | `buildCensus()`           | An HTML token and an SVG token, neither declared by any loaded stylesheet              |

- Append each control's `root` to the same surface root the reading walks, take the reading, and
  remove it afterwards. Every builder returns detached nodes and mounts nothing, so where the
  control is read is the caller's decision.
- Assert on the fields the builder returns rather than on a token or a selector written down in the
  test. `buildCensus` hands back its own tokens, and `buildContrast` hands back `refused` and
  `accepted` by name.
- Require the `refused` foreground to read under the bar and the `accepted` one to reach it, in the
  same run as the production readings. `buildContrast` refuses a bar its own stack cannot straddle,
  and that refusal is the reading: no pair it can compose settles that bar.
- Pass the exempt id the policy owns to `buildEscapes`, so the reader must leave the permitted sheet
  alone rather than passing by rejecting every `<style>` element.

## The authored-class census

Take the property, the population, and the coverage from the instruments reference → Authored class
in the shipped cascade. This is the reading.

- Read the census with `readCensus(root)`, which walks the mounted surface, reports `elements` as
  the population it read, lists every `tokens` value the markup carries, and lists as `undeclared`
  the tokens no loaded stylesheet declares. It refuses a walk that read no element.
- Assert on `elements` as well as on `undeclared`. An empty walk reports no undeclared token, and so
  does markup whose every class the cascade declares.
- Take `root` from the mounted surface, so the census covers what rendered rather than what a
  template file spells.
- Read `readClasses` and `readCascade` directly only where one side of the difference is the
  subject. `readCensus` is the reading, and re-deriving it drops the population it reports.
- Append `buildCensus().root` to that same `root`, so the control reaches the difference through the
  same walk rather than beside it.

## Style escapes

Take the property, the population, the named exemptions, and the coverage from the instruments
reference → Style escapes. This is the reading.

- Read escapes with `extractStyles(root)`, which returns the markup of every hit it found.
- Take the reading before any journey drives the surface, because the population is the undriven
  tree.
- Append `buildEscapes(permitted).root` to that same `root`, so the control reaches the reading
  through `extractStyles`.
- Reach for `extractOrphans` where the finding is a child element rendered outside its required
  parent, and `readRows` where the subject is a repeated row's rendered text.

## Tokens

- Read a token with `readToken(element, name)` where inheritance matters and `readRootToken(name)` where the
  document declares it. The leading dashes are optional in each.
- Compare values, never presence. An absent token and one declared empty both read as `''`, and a
  `var()` naming an undeclared property resolves to the inherited color rather than refusing, so an
  assertion on presence passes on a token nobody declared.
- Read each token once per variant and assert the values differ where the design says the variants
  differ. A pair of variants that resolves a token identically is a theme that did not switch.

## The engine bound

Every reading here comes from the one engine the gate renders.

- State that bound with the result. A claim about another engine's resolved value is unproven until
  a reading taken on that engine records it.
- Read the limit and the condition that reopens it from the emitted `configs/browsers.ts` doc block,
  which the generated workspace ships, rather than from a copy in the suite.
