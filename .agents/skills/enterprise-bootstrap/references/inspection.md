# Instruments

Reach for an instrument where a capture cannot settle the claim. Run it against the compiled
cascade the page loads, with its negative controls under the same conditions. Treat a missed
negative control as a broken instrument and refuse its reading as evidence;
`.claude/rules/quality.md` owns that law where present.

Keep mechanical results separate from visual judgments. Take each entry's property, population,
reading, negative control, and coverage as its contract. Report failures and untested coverage, not
a pass label alone.

- **Report the population.** Name the membership rule and count what the extractor walked. An
  expected but empty population fails. Mark a genuinely absent feature not applicable with its
  reason; do not count it as passing.
- **Keep controls independent.** Construct known-invalid fixtures in the harness, outside the
  production population and the accepted set. Include them in the test run through the same
  extraction path, and exclude them from production counts. Do not filter the defect out before
  the reader can see it.
- **Test extraction as well as reading.** Pair a directly fed fixture with one appended to the
  tree, stylesheet, or registry wherever extraction exists. Remove harness mutations afterward.
- **Bound the claim.** Name files, routes, themes, viewports, states, and exclusions actually read.
  Unsupported input and unavailable tooling remain open, never passed by assumption.

## Contents

- [Authored class in the shipped cascade](#authored-class-in-the-shipped-cascade)
- [Declared class combinations](#declared-class-combinations)
- [Style escapes](#style-escapes)
- [Token discipline](#token-discipline)
- [Declared design scales](#declared-design-scales)
- [Custom rule doing a utility's job](#custom-rule-doing-a-utilitys-job)
- [Color-mode inheritance](#color-mode-inheritance)
- [Composited contrast in both themes](#composited-contrast-in-both-themes)
- [One glyph, one meaning](#one-glyph-one-meaning)
- [Responsive task and reflow](#responsive-task-and-reflow)
- [Responsive interaction continuity](#responsive-interaction-continuity)
- [Rendered design review](#rendered-design-review)
- [When an authored rule is already earned](#when-an-authored-rule-is-already-earned)

## Authored class in the shipped cascade

- **Property.** Every styling class the surface authors resolves in the loaded CSS. Separately name
  legitimate behavior/test hooks that require no CSS; never excuse an intended utility as a hook.
- **Population.** Authored class tokens, including SVG and conditional states, against vendor,
  skin, dependency, generated-utility, and project stylesheets actually loaded.
- **Reading.** Parse selectors, subtract the defined styling tokens from the authored set, and
  report each unresolved token with its source. Enumerate declared conditional classes not reached
  in the mounted tree separately; an unreachable stylesheet is an open dependency, not an empty one.
- **Negative control.** Feed an undefined styling token to the reader, then append a harness SVG
  carrying that token through the same tree extractor. Both must be reported.
- **Coverage.** The two controls cover set comparison and extraction, including SVG's non-string
  `className`. Use `getAttribute('class')` or an equivalent safe reader. Resolution does not prove
  the rule wins the cascade, paints the intended result, or covers a state never enumerated.

## Declared class combinations

- **Property.** Reused multi-utility chrome has one named declaration and a stated invariant.
- **Population.** Declared combinations and the authored instances of those reusable patterns.
  Declare the pattern scope; do not require a registry entry for every one-off layout string.
- **Reading.** Compare token sets within that scope to the named contracts. Report an undeclared
  or divergent instance. Keep utility order irrelevant unless the host's class merger makes it
  meaningful; record that merger when it applies.
- **Negative control.** Feed a combination one utility away from its contract, then append an
  instance carrying that mutation through the same extractor, including an SVG fixture. Report both.
- **Coverage.** This proves instances match declarations, not that an invariant renders correctly.
  Pair geometry or contrast invariants with their own measurements. Never substitute utility-count
  or mixed-category heuristics; a valid transparent read-only treatment can use several utilities.

## Style escapes

- **Property.** Authored markup carries no `style` attribute or `<style>` element.
- **Population.** Authored templates and the freshly mounted, undriven tree. Keep source and mounted
  readings distinct so generated framework styles are not mistaken for authored declarations.
- **Reading.** Report inline declarations and embedded style elements with their source or element.
  Record framework/runtime exemptions by producer and purpose, never a blanket component exemption.
  Bootstrap overlay positioning and conditional-visibility directives may write runtime styles.
- **Negative control.** Feed an element with an inline declaration, then append an inline-styled
  element and a `<style>` element to the harness tree. Every non-exempt fixture must be reported.
- **Coverage.** This covers authored and mount-time escapes, not later interactions or third-party
  internals outside the declared scope. Drive later states separately when making claims about them.

## Token discipline

- **Property.** Literal colors live only in declared primitive definitions. Semantic and component
  paint resolve through the declared token layers in each shipped color mode.
- **Population.** Project-authored color declarations and token references, the named primitive
  definition locations, and custom-painted properties reached in each theme and state.
- **Reading.** Parse declarations, not color-looking text in comments or strings. Permit raw colors
  only in the named primitive definitions; reject literals in component paint, unresolved or cyclic
  references, and a component bypassing semantic tokens. Check RGB partners where consumed. A theme
  pair may resolve identically unless the design contract requires it to differ.
- **Negative control.** Accept a valid primitive definition as a positive fixture. Feed a literal
  component fill and an undefined token reference; append both to a harness stylesheet through the
  same extractor. The valid definition must survive and every invalid fixture must fail.
- **Coverage.** This proves declared paint follows the token boundary in the read scope. It does not
  prove mode adaptation, foreground ownership, legibility, or visual quality. Use Color-mode inheritance for the cascade contract. Vendor literals are not authored violations;
  rendered contrast still measures their effect. Inline paint belongs to Style escapes.

## Declared design scales

- **Property.** Authored type, spacing, width, radius, and elevation treatments use declared roles,
  shipped scale steps, or documented extensions rather than untracked one-off values.
- **Population.** The project's scale/role definitions and authored declarations consuming them.
  Include breakpoint rules, component variants, and any declared fluid sizing formulas.
- **Reading.** Resolve each treatment to its role or accepted step. Report undeclared values,
  missing generated selectors, `em` font sizes, and `.small` nested inside `.small`. Validate fluid formulas against their declared bounds; do not reject
  legitimate intermediate computed values as off-scale. Confirm required grouping relationships in
  the rendered review rather than inferring them from token names.
- **Negative control.** Feed an undeclared spacing value and append an off-scale type declaration
  through the stylesheet extractor. Report both. Accept a declared fluid value inside its bounds.
- **Coverage.** This checks consistency with a system, not whether the system suits the task. A
  perfectly on-scale layout can still have ambiguous grouping, poor line breaks, or the wrong density.

## Custom rule doing a utility's job

- **Property.** Each authored selector expresses a need no shipped utility expresses, or records
  why the utility does not fit. Declared component-variable overrides and generated utilities stay
  on their extension rung; they are not automatically bespoke styling violations.
- **Population.** Project-authored selectors, their declarations, and the loaded utility rules.
- **Reading.** Compare declarations and name the equivalent utility when one exists. Report a
  duplicate without a recorded reason. Read mixed-purpose rules too; adding an unrelated declaration
  does not excuse the duplicated part.
- **Negative control.** Feed a rule that exactly repeats a shipped padding utility, then append it
  through the stylesheet extractor. Report it in both runs.
- **Coverage.** This checks expressible equivalence, not the intent or merit of an exception. Review
  the reason and styling-rung authorization separately; specificity and state scope can matter.

## Color-mode inheritance

- **Property.** Ordinary content inherits its body or component foreground. Quiet adaptive fills
  add no arbitrary text color. Intentional solid and local-mode boundaries own a measured pair;
  native component states retain their foreground behavior. Take the contract from
  [color-modes.md](color-modes.md).
- **Population.** Rendered text, status marks, badges, tags, links, fields, selected controls, table
  cells, and overlays in the actual loaded build. Include supported nested modes, skin overrides,
  and portal mount points; name the boundaries that own an explicit foreground.
- **Reading.** Drive the existing mounted tree from light to dark and back. Read computed text,
  painted backgrounds, relevant custom properties, and winning declarations after each transition.
  Confirm quiet ordinary text matches its intended inherited foreground; identify the owner when
  a component legitimately differs. Check supported system preference and reload behavior when the
  mode controller is in scope. A class-name match or a changing variable alone does not pass.
- **Negative control.** Add fixed `text-dark` on a dark body surface, a stock `.badge` with a subtle
  fill but no inheritance reset in light mode, and an opposite-mode plain region without its owned
  foreground/background pair. Require the reader to detect each violated contract. For projects
  using aliases, add a root-resolved foreground alias inherited into an opposite-mode scope.
  Verify each control is invalid in that build; a class name alone does not establish the defect.
- **Coverage.** Pair the cascade reading with Composited contrast; correct inheritance can still
  produce insufficient contrast on a changed surface. An isolated stock fixture establishes only
  that fixture's behavior, not the host skin or application. Unreached states and mounts stay open.

## Composited contrast in both themes

- **Property.** Every measured pairing meets the package bar: 4.5:1 for information-bearing text,
  3:1 for meaningful textless marks and state/focus chrome, in each declared theme and reached state.
- **Population.** Rendered text and meaningful graphics, their actual surfaces, and all paint layers
  affecting contrast. Name exemptions for disabled controls; do not exempt readable metadata.
- **Reading.** Composite translucent backgrounds onto the opaque base and translucent foregrounds
  onto that result before calculating contrast. Include ancestor opacity where relevant. Report the
  pairing, ratio, bar, theme, and state for each failure. Take the mechanics from
  [bootstrap-reference.md](bootstrap-reference.md) → Measuring the bars.
- **Negative control.** Feed an opaque pair known to fail and a translucent stack whose composited
  ratio fails although a flat read would pass. Append both through the rendered-pair extractor and
  require all failures. Include the same theme scopes and paint mechanism as the production run.
- **Coverage.** Flat computed colors cannot settle text over images, gradients, masks, blend modes,
  or unsupported compositing. Read the actual background under the text with an appropriate method,
  or mark the pairing open. Never average an image into a passing color. Name unvisited states;
  measurements from one surface, theme, or crop do not establish another.

## One glyph, one meaning

- **Property.** Each registered status meaning takes one glyph; each registered glyph serves one
  status meaning and resolves in the icon set the product ships.
- **Population.** The surface's status registry and the shipped icon set. Keep generic action icons
  outside this status-only contract unless the project explicitly includes them.
- **Reading.** Report duplicate meanings, a status glyph bound to two meanings, and missing glyphs.
- **Negative control.** Feed a second meaning for a registered glyph and an unavailable glyph name;
  append equivalent invalid entries through the registry extractor. Report both kinds of failure.
- **Coverage.** This proves registry consistency, not that the markup uses the correct glyph or that
  its optical size and contrast work. Capture the states that use the marks and inspect their names.

## Responsive task and reflow

- **Property.** The declared task remains readable and operable without unintended page overflow,
  concealed content, or clipped controls at the widths in [responsive-layout.md](responsive-layout.md).
- **Population.** Changed routes, responsive regions, required task fields/actions, local scrollers,
  and their reached data states. Include conditional content and loaded fonts/assets. Name the
  Bootstrap build and every environment substitution; a missing dependency is not a passing page.
- **Reading.** Record viewport and container bounds, document width, local client/scroll dimensions,
  critical text bounds, effective target sizes, and required content/action visibility. Check both
  sides of each actual transition. Use a small declared rounding tolerance. Keep intentional data
  scrolling separate from document overflow; identify the owner and prove reach to its final item.
  Read task regions as well as `documentElement.scrollWidth`; hidden overflow is not a repair.
- **Negative control.** Feed a too-wide region to the bounds reader; append an oversized child,
  conceal it behind a clipping parent, and hide a required primary action in separate harness runs.
  Each defect must be reported by the same production extraction path. Include a positive local
  table scroller so the reader cannot pass by banning all overflow.
- **Coverage.** Test 320/390 CSS px, a wide view, each used boundary, long content, and short height.
  Record enlarged-text and real browser-zoom tests separately. Reducing the viewport is a reflow
  proxy, not execution of 400% browser zoom. Geometry does not establish aesthetics, full text
  contrast, real-device keyboard behavior, or an exhaustive accessibility result.

## Responsive interaction continuity

- **Property.** Narrow/wide changes preserve access, state, and meaningful focus; responsive chrome
  does not leave a stale overlay, scroll lock, or trap.
- **Population.** Navigation triggers/panels, forms, selections, filters, sort/pagination, disclosures,
  and overlays changed by a breakpoint. Record which controls are functional and which are fixtures.
- **Reading.** Complete the narrow primary flow. Open/close navigation with pointer and keyboard,
  test Escape/focus return, resize while open, and return below the threshold. Carry selected IDs,
  filters, sort, field values, and active detail context through both directions. Check reachable
  dialog actions in a short viewport and with enlarged text. Confirm actual row/filter changes,
  not merely `aria-sort`, labels, or a success message.
- **Negative control.** Remove the required narrow trigger, break its target, and erase a selected
  record during a harness resize. Drive the same interaction assertions; each must fail. Mark an
  absent component not applicable rather than treating an empty locator set as success.
- **Coverage.** Desktop mouse, keyboard, and emulated touch are separate runs. Keep real-device
  browser chrome/soft keyboard, unsupported engines, persistence, and server actions open unless
  exercised. For dual presentations, inspect IDs and the accessibility tree: only the active view
  may expose its controls. Attribute presence alone does not establish any interaction result.

## Rendered design review

Use captures for these judgments, not synthetic negative controls. Record the criterion, capture,
viewport/theme/state, finding, and disposition. A missing capture leaves the judgment open. For a
requested review round or campaign, use `orkestrel-polish-surface` rather than creating one here.

- **Task and hierarchy:** the main information and action lead; supporting content remains readable;
  labels, semantics, and destructive rank match the work. Check a grayscale view as a hierarchy aid.
- **Grouping and density:** inter-group gaps exceed internal gaps; labels/help/errors stay with the
  right control after wrapping. Width serves the content; rails, forms, and tables use it deliberately.
- **Type and reflow:** line length, baseline alignment, line-height, numeric comparison, and fallback
  text work at the declared widths and enlarged text. No essential content is clipped or hidden.
- **Color, depth, and imagery:** light/dark transitions preserve hierarchy without gratuitous text overrides; color has a second encoding;
  elevation describes layers; crops and icon sizes preserve useful detail; the frame stays quiet.
- **States and restraint:** first-use, filtered-empty, loading, partial, and error retain a useful
  next step. Long or missing content holds up. The signature belongs to the brief; accessories do not
  compete with the task. Motion-free operation remains complete.

A visual review does not establish keyboard behavior, contrast arithmetic, or full WCAG conformance.
Pair each such claim with the relevant instrument or interaction test and its actual coverage.

## When an authored rule is already earned

Leave rung 4 to the developer, per [SKILL.md](../SKILL.md) → When custom CSS is justified. Write a
rule without asking only when every condition holds:

- an instrument reports a vendor failure against a stated requirement, such as a focus ring below
  3:1 or information-bearing status text below 4.5:1;
- the rule cites the instrument, failing reading, and required bar beside it;
- rungs 1–3 cannot restore the requirement, and the rule repairs that failure without unrelated polish;
- the rule uses `--bs-*` paint tokens and declared scales, and the repaired result is re-measured in
  every affected theme and state.

A visual preference alone does not open this exception. Treat anything wider as a proposal: name
what the rule would buy and stop until authorized.
