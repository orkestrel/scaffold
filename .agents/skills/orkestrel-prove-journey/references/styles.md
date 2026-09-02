# Proving what the browser resolved

Prove a style from what the browser resolved on the mounted surface. The `enterprise-bootstrap`
skill's [instruments reference](../../enterprise-bootstrap/references/inspection.md) names each
instrument's property, its population, and the negative controls that must fail. Take those from
there and the reading from here.

## Assert the resolved value

- Read one property with `style(element, property)` and a length with `pixels(element, property)`. A
  class present in the markup and absent from the cascade resolves to nothing, and an assertion on
  the class list passes on it.
- Never substitute `findRule` for a resolved read. It proves a declaration exists, and another rule
  may still win; reach for it where the stylesheet itself is the subject.
- Compare a color through `colorEqual` or `rgba` rather than by string. A browser normalizes a color
  expression, so a literal comparison fails on a value that resolved correctly.

## Run per variant

The run axis is fixed in [SKILL.md](../SKILL.md) → Read the variant once. The matrix family's own
readings follow.

- Apply each variant's `apply` and its `width` and `height` before the readings, and take every
  reading for that variant before moving to the next.
- Name the attribute the surface actually reads in `apply`; a Bootstrap surface switches on
  `data-bs-theme`. An `apply` that sets another attribute leaves the run in the default theme, where
  every reading passes.
- Assert that the run read every declared variant. A matrix that silently walked one variant reports
  a pass for the theme nobody exercised.
- Report which variants a result covers beside it. A pairing that appears only in a state the run
  never entered is unmeasured.

## Contrast and focus chrome

- Read a text pairing with `contrast(element)`, which composites the painted ancestors to the first
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
- Carry the negative controls the composited-contrast instrument names, in the same run and composed
  in the harness rather than taken from the surface. An instrument whose negative control passes is
  broken, and its readings are not evidence.
- Reach for `measureContrast`, `measureLuminance`, `blendColor`, `readLayers`, and `readBackdrop`
  only where the composite itself is the subject. Never re-derive `contrast` from them.

## The authored-class census

Take the property, the population, and the negative controls from the instruments reference →
Authored class in the shipped cascade. This is the reading.

- Read the census as the difference between `readClasses(root)` of the mounted surface and
  `readCascade()`. A token in the difference is a class the markup uses and no loaded stylesheet
  declares.
- Take `root` from the mounted surface, so the census covers what rendered rather than what a
  template file spells.
- Report what `readClasses` walked as the population, and fail a run that walked none.
- Append the extraction-door negative control to that same `root`, so it reaches the difference
  through `readClasses` rather than beside it.

## Style escapes

Take the property, the population, the named exemptions, and the negative control from the
instruments reference → Style escapes. This is the reading.

- Read escapes with `extractStyles(root)`, which returns the markup of every hit it found.
- Take the reading before any journey drives the surface, because the population is the undriven
  tree.
- Append the harness-built negative control element to that same `root`, so it reaches the reading
  through `extractStyles`.
- Reach for `extractOrphans` where the finding is a child element rendered outside its required
  parent, and `readRows` where the subject is a repeated row's rendered text.

## Tokens

- Read a token with `token(element, name)` where inheritance matters and `rootToken(name)` where the
  document declares it. The leading dashes are optional in each.
- Compare values, never presence. An absent token and one declared empty both read as `''`, and a
  `var()` naming an undeclared property resolves to the inherited color rather than refusing, so an
  assertion on presence passes on a token nobody declared.
- Read each token once per variant and assert the values differ where the design says the variants
  differ. A pair of variants that resolves a token identically is a theme that did not switch.
