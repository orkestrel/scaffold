# Proving what the browser resolved

Prove a style from what the browser resolved on the mounted surface. Each instrument here names the
property it proves, the population it walks, and the control that must fail, in the
`enterprise-bootstrap` skill's
[instruments reference](../../enterprise-bootstrap/references/inspection.md). Take the property from
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

Run every style assertion once per declared variant, inside one run.

- Apply each variant's `apply` and its `width` and `height` before the readings, and take every
  reading for that variant before moving to the next.
- Name the attribute the surface actually reads in `apply`. A Bootstrap surface switches on
  `data-bs-theme`, so an `apply` copied from an example setting another attribute leaves the run in
  the default theme and every reading passes.
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
- Carry a control that must read under the bar in the same run, composed in the harness rather than
  taken from the surface. An instrument whose control passes is broken, and its readings are not
  evidence.
- Reach for `measureContrast`, `measureLuminance`, `blendColor`, `readLayers`, and `readBackdrop`
  only where the composite itself is the subject. Never re-derive `contrast` from them.

## The authored-class census

- Read the census as the difference between `readClasses(root)` of the mounted surface and
  `readCascade()`. A token in the difference is a class the markup uses and no loaded stylesheet
  declares.
- Take `root` from the mounted surface, so the census covers what rendered rather than what a
  template file spells.
- Report the population `readClasses` walked, and fail a run that walked none. An extractor that
  quietly matched nothing satisfies every other assertion.
- Carry a control token no stylesheet defines, fed to the reading rather than planted in the markup.
  It sits outside the population of authored tokens the cascade resolves, and the reading must
  report it.

## Style escapes

- Read escapes with `extractStyles(root)` on a freshly mounted, undriven surface. It returns the
  markup of every element carrying a non-empty `style` attribute and of every `<style>` element.
- Take the reading before any journey drives the surface. A reading taken after reports on the
  framework rather than on the author.
- Name every exemption in the instrument. A Bootstrap Modal, Offcanvas, Collapse, or Dropdown writes
  inline styles as it runs, and a conditional-visibility directive such as `v-show` emits
  `style="display: none"` at mount.
- Carry a control element with an inline declaration, built in the harness rather than taken from the
  surface, and require the reading to report it.
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
