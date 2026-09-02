# Instruments

These instruments settle what a capture cannot. Each one states a property of the surface, the
population it walks, the reading that settles it, the negative control that proves the reading can
fail, and the coverage it does not have.

Run every instrument with its control, in the same conditions, on the real compiled cascade the page
loads. An instrument whose control passes is broken, and its reading is not evidence;
`.claude/rules/quality.md` owns that law where it is present.

These rules bind every entry here.

- **Report the population.** A reading carries the population it walked. An empty population fails
  the run, because an extractor that quietly matched nothing satisfies every other assertion.
- **Draw the control from outside the population.** Name the membership rule first, then pick a
  control the rule excludes. A control taken from inside the population proves only that the
  instrument discriminates among cases it already handles.

## Contents

- [Authored class in the shipped cascade](#authored-class-in-the-shipped-cascade)
- [Declared class combinations](#declared-class-combinations)
- [Style escapes](#style-escapes)
- [Token discipline](#token-discipline)
- [Custom rule doing a utility's job](#custom-rule-doing-a-utilitys-job)
- [Composited contrast in both themes](#composited-contrast-in-both-themes)
- [One glyph, one meaning](#one-glyph-one-meaning)
- [When an authored rule is already earned](#when-an-authored-rule-is-already-earned)

## Authored class in the shipped cascade

- **Property.** Every class token the surface's own templates and components author has a rule in
  the compiled CSS the page loads.
- **Population.** The class tokens the authored markup carries, read against every stylesheet the
  page loads: the vendor build, each skin, and the project's own.
- **Reading.** Subtract the tokens the loaded stylesheets define from the tokens the markup carries.
  A remainder fails the run and names each token with the file that authored it. Report the token
  population walked, and fail a run that walked none.
- **Control.** A token no stylesheet defines, fed to the reading rather than planted in the markup.
  It sits outside the population, which is authored tokens the cascade resolves, and the reading must
  report it.
- **Coverage.** It proves authored tokens are a subset of the cascade. It says nothing about a
  cascade rule nobody authored, a token a build step or a script adds after the read, or whether a
  resolved rule paints what the author intended.

## Declared class combinations

- **Property.** Every multi-utility chrome string the surface reuses is declared once by name with
  the invariant it holds, and the markup carries no undeclared combination.
- **Population.** The declared combinations, each with its name and its invariant, and every
  multi-utility string the authored markup carries.
- **Reading.** Match each string in the markup against the declared set. An undeclared combination
  fails and names the element that carries it.
- **Control.** A string one utility away from a declared combination, fed to the reading. It sits
  outside the declared set and the reading must refuse it.
- **Coverage.** It proves reused chrome is declared. It does not prove a declared invariant is true,
  and it does not read a single utility used alone.
- **Never substitute a cancellation heuristic.** A rule that flags a string for its utility count, or
  for mixing categories, refuses the legitimate transparent read chrome that keeps a read view and an
  edit view from reflowing. An instrument that flags the best existing answer gets switched off, and
  then nothing is checked.

## Style escapes

- **Property.** The surface's own markup carries no `style` attribute and no `<style>` element.
- **Population.** The elements of a freshly mounted, undriven tree — the surface as authored, before
  any interaction drives it.
- **Reading.** Collect every element carrying an inline declaration or an embedded style element and
  report it with its markup. Any hit fails.
- **Exemptions, declared by name.** The framework's own runtime styles are outside the property: a
  Bootstrap Modal, Offcanvas, Collapse, or Dropdown writes inline styles as it runs, and a
  conditional-visibility directive such as `v-show` emits `style="display: none"` at mount. Name each
  exemption in the instrument. Run the reading on an undriven tree, because a reading taken after a
  journey drives the surface reports on the framework rather than on the author.
- **Control.** An element carrying an inline declaration, built in the harness rather than taken from
  the surface, fed to the reading. It sits outside the surface's own markup and the reading must
  report it.
- **Coverage.** It reads authored markup at mount. It does not see a style a component writes after
  the person interacts, a rule authored in a stylesheet, or an escape inside a third-party
  component's own markup.

## Token discipline

- **Property.** No authored rule carries a literal color, and every custom paint resolves through a
  token in each color mode the product ships.
- **Population.** The project's own authored stylesheet rules, and the resolved value of each
  custom-painted property in each color mode.
- **Reading.** A literal color in an authored declaration fails. For each custom paint, read the
  resolved value once per mode; a mode that leaves it unresolved fails, and so does a pair of modes
  that resolve it identically where the design says the modes differ.
- **Control.** A rule carrying a literal color, and a paint whose token the cascade does not define,
  both fed to the reading rather than authored into the surface. Each sits outside the population of
  authored rules that pass, and the reading must report both.
- **Coverage.** It covers authored rules and the paints it was given. It does not judge whether the
  chosen token is the right one, and it reads no vendor rule and no inline declaration — style
  escapes covers those.

## Custom rule doing a utility's job

- **Property.** Every authored selector expresses something no shipped utility expresses, or records
  the reason the utility does not fit.
- **Population.** The selectors in the project's own stylesheets.
- **Reading.** For each selector, name the utility that would carry the same declarations. A selector
  a shipped utility already expresses fails unless it carries the recorded reason.
- **Control.** A rule restating a shipped utility exactly — a padding declaration matching a spacing
  step — fed to the reading rather than authored into the stylesheet. It sits outside the set of
  authored selectors that pass, and the reading must report it.
- **Coverage.** It reads declarations, not intent. A rule that does a utility's job alongside
  something else passes it, so a person still reads the authored stylesheet.

## Composited contrast in both themes

- **Property.** Every pairing the surface paints meets its bar in every theme: 4.5:1 for anything
  information-bearing, 3:1 for textless marks and the chrome that carries state.
- **Population.** The pairings the surface renders, read per theme on the compiled cascade, with
  every translucent layer composited. Disabled controls are exempt, per
  [SKILL.md](../SKILL.md) → Surfaces, color, contrast.
- **Reading.** Composite the painted layers, read the ratio, and fail anything under its bar with the
  pairing named. Mechanics: [bootstrap-reference.md](bootstrap-reference.md) → Measuring the bars.
- **Control.** A pairing composed in the harness whose ratio is known to sit under the bar, not one
  taken from the surface. It sits outside the rendered population and the reading must fail it.
- **Coverage.** It measures what rendered, in the themes and viewports the run entered. A pairing
  that appears only in a state the run never reached is unmeasured, so name the states the run
  covered beside the result.

## One glyph, one meaning

- **Property.** Each status meaning takes one glyph, each glyph serves one meaning, and every
  registered glyph resolves in the icon set the product actually ships.
- **Population.** The registry of meanings and glyphs the surface uses, and the shipped icon set.
- **Reading.** A meaning registered twice, a glyph registered against two meanings, or a glyph the
  shipped set does not resolve fails, each named.
- **Control.** A registry entry binding a second meaning to a glyph already registered, plus a glyph
  name the shipped set lacks. Both sit outside the registered set, and the reading must report both.
- **Coverage.** It proves the registry is consistent and resolvable. It does not prove the markup
  draws the registered glyph for the meaning it carries, so pair it with a capture of the states that
  use marks.

## When an authored rule is already earned

Rung 4 stays the developer's call, per [SKILL.md](../SKILL.md) → When custom CSS is justified. One
exception stands, and a measurement rather than a judgment opens it. Write an authored rule without
asking only when every one of these holds:

- an instrument in this file reports the vendor cascade failing a stated bar — the focus ring under
  3:1, the status text under 4.5:1, the shipped component with no variant for the state the surface
  must show;
- the rule cites that reading beside it, naming the instrument, the bar, and the value read;
- the rule restores the bar and does nothing else;
- the rule is written over `--bs-*` tokens, so both color modes move with the theme.

Anything wider is still a proposal: name what the rule would buy, and stop.
