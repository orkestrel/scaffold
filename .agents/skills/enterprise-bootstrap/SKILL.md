---
name: enterprise-bootstrap
description: >-
  Design and build distinctive, production-grade user interfaces with Bootstrap
  5.3 and intentional frontend craft, in any host project and on any stack. Use
  for Bootstrap user-interface work — creating, restyling, or
  extending pages, screens, components, layouts, app shells, dashboards, admin
  panels, SaaS tools, data tables, filter bars, forms, wizards, navigation,
  modals, empty/loading/error states, dark mode, marketing surfaces — whenever
  the task touches HTML/CSS/visual design, mentions Bootstrap or its components,
  or must look professional and avoid templated defaults. Covers aesthetics,
  typography, color modes, design tokens, accessibility (WCAG 2.2 AA),
  responsive layout, and enterprise app patterns. The `orkestrel-polish-surface`
  skill owns a requested verdict, round, or campaign over a surface that already
  renders, including a review that changes nothing. In that campaign's fix
  units, use this skill for Bootstrap craft.
---

# Enterprise Bootstrap

Set a deliberate visual direction, build it from Bootstrap 5.3 components and utilities, and settle
every claim about the result from what renders.

Open the reference that owns a subject before writing markup. Never guess a class name: an invented
utility (`.vw-50`, `.pointer-events-none`) has no rule in the shipped CSS and fails silently. Pick
components from [components.md](references/components.md) → Choosing components, take their markup
from the same file, and take fine layout from [utilities.md](references/utilities.md). Pick an
input's affordance from [inputs.md](references/inputs.md) by what the person is asked for, not by
what a schema calls the field. Where Bootstrap ships no component for the need — combobox, date
picker, tags input, data grid, tree — work the native-first ladder in
[bootstrap-reference.md](references/bootstrap-reference.md) → When not to hand-roll before building
one.

| Layer          | File                                                        | Holds                                                                             |
| -------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Operate        | `SKILL.md`                                                  | Process, decision rules, checklist                                                |
| Design craft   | [frontend-design.md](references/frontend-design.md)         | Aesthetic, typography, signature, interface copy, anti-defaults                   |
| Components     | [components.md](references/components.md)                   | Bootstrap component markup + enterprise selection notes                           |
| Inputs         | [inputs.md](references/inputs.md)                           | Affordance per input category, its alternates, its rung, its states               |
| Utilities      | [utilities.md](references/utilities.md)                     | Class index, helpers, composition notes                                           |
| Bootstrap deep | [bootstrap-reference.md](references/bootstrap-reference.md) | Color modes, theming/tokens, forms, JS lifecycle, a11y depth, enterprise patterns |
| Instruments    | [inspection.md](references/inspection.md)                   | Property, population, reading, negative control, and coverage per instrument      |

---

## Portability

1. **Assume no stack.** Infer it from the workspace. Do not assume Vue, React, a skin library, a folder layout, or a named product.
2. **Target Bootstrap 5.3.x** class names and behaviors. Hold a compatible skin that keeps `.btn`, `.card`, `.form-control`, and `data-bs-*` to the same contracts.
3. **Follow the project's code law.** Take language, layout, and forbidden patterns from its `AGENTS.md` file, its lint rules, and its design system. Take UI craft and Bootstrap usage from here, and never language law.
4. **Write framework-neutral markup** — semantic HTML plus Bootstrap classes. Wire behavior with what the project already uses; in an SPA prefer the framework-native Bootstrap wrappers over raw `bootstrap.*` JS ([bootstrap-reference.md](references/bootstrap-reference.md) → JavaScript lifecycle).
5. **Keep this folder intact** so the relative links between its files resolve. Install or vendor it wherever the tooling looks for skills; the paths are tooling-specific, the content is not.
6. **Use the project's installed Bootstrap** when it has one; otherwise take the CDN snippet from [bootstrap-reference.md](references/bootstrap-reference.md) → Quick start (5.3.8).
7. **Apply this package** to UI, Bootstrap, and visual-design work matching the frontmatter description. When the user points at it, treat it as authoritative for the visual pass.

---

## The mandate

1. **Design direction** — take a point of view rooted in the _subject_ (audience, job-to-be-done, vernacular). Take one justified aesthetic risk, in one place.
2. **Bootstrap execution** — take components and utilities first, custom CSS only when the system cannot express the need, and paint through `--bs-*` so light and dark both survive.

Match the density to the context: a marketing page can open with a thesis-hero, an authenticated
tool opens with clarity and scan paths. In product UI put the signature in the chrome, never in the
data ([frontend-design.md](references/frontend-design.md) → Where the signature lives).

---

## Process

Read [frontend-design.md](references/frontend-design.md) before setting a direction; it owns subject
grounding, hero and thesis, typography, structure, motion, restraint, and interface copy. Then work
this loop:

1. **Ground** — name the subject, the audience, and the screen's single job, and state them. Use known user preferences and prior designs as hints, not templates.
2. **Plan** — build a token system: **color** (4–6 named values), **type** (display / body / utility), **layout** (prose plus ASCII if useful), **signature** (one memorable element).
3. **Critique the plan** — if swapping the logo would make it "any SaaS", revise. Avoid the clustered AI defaults unless the brief asks for them: cream + #F4F1EA + serif + terracotta; near-black + acid green or vermilion; broadsheet hairlines, zero radius, dense columns. The brief wins when it pins a direction.
4. **Build** — compose Bootstrap components and utilities; map the plan's tokens onto theme variables or a thin skin, with no scattered one-off hex ([bootstrap-reference.md](references/bootstrap-reference.md) → Theming & design tokens). Watch selector specificity: a utility and a custom rule that cancel each other show up as padding and margin bugs.
5. **Critique the render** — remove one accessory. Check contrast, focus, `prefers-reduced-motion`, mobile, and every data state. Critique what rendered, not the markup.

Show a direction only after it satisfies the brief and the quality floor, and keep every earlier
draft private ([frontend-design.md](references/frontend-design.md) → Process).

**Rendered proof.** Settle every claim about a screen from a capture, never from source alone;
`.agents/orchestration.md` owns this law where it is present. Take captures at every viewport and
every theme the surface declares, plus an accessibility snapshot, as the review input, and use source only to corroborate
the mechanism. For a full review-round campaign built on that evidence, use the
`orkestrel-polish-surface` skill instead of improvising one here.

**Mechanical proof.** Run every instrument in [inspection.md](references/inspection.md) with the
negative control it names, and treat an instrument whose negative control passes as broken;
`.claude/rules/quality.md` owns that law where it is present. Those instruments settle what a capture
cannot: composited contrast, authored classes against the shipped cascade, declared class
combinations, style escapes, token discipline, a custom rule doing a utility's job, and one glyph per
meaning. Hold every check the deliverable lists to that shape, whether or not inspection.md names
it: each states its population, its negative control, and its coverage, and a check that cannot
name a negative control is recorded as open rather than listed as a check.

---

## Bootstrap operating principles

1. **Mobile first** — build the smallest screen first, then `sm` / `md` / `lg` / `xl` / `xxl`.
2. **Semantic HTML** — use `nav`, `main`, and `section`, and hold the heading order.
3. **Work down the styling ladder that follows** — component classes, then utilities, then Bootstrap's own extension points.
4. **Test every breakpoint you claim.**
5. **Reach for Bootstrap's own transitions before writing custom animation**, spend one orchestrated moment at most, and wrap any custom animation in `prefers-reduced-motion: no-preference` ([bootstrap-reference.md](references/bootstrap-reference.md) → Reduced motion).
6. **Resolve every treatment in the shipped cascade** — Bootstrap plus every skin and dependency stylesheet the page pulls in — never from docs memory. A class with no rule of its own can still inherit one, and a token pair that passes in stock Bootstrap can fail under a compatible skin. Measure the `*-subtle` / `*-emphasis` recipes too, once per theme, with a reader that composites the translucent layers ([bootstrap-reference.md](references/bootstrap-reference.md) → Measuring the bars).

### The styling ladder

Work down these rungs in order. Reach a rung only when the preceding one cannot express the need.

1. **The component's own classes, in its documented structure.** Use the right elements, nesting, class names, and required ARIA: a card is `.card` wrapping `.card-body` wrapping `.card-title`, not a `div` with borrowed padding. Modifier classes, affordance states, color modes, and responsive behavior all hang off that structure.
2. **Bootstrap utilities, for refinement.** Spacing, flex, display, sizing, text, borders, color. Compose utilities rather than reaching past them, and use only classes that exist in [utilities.md](references/utilities.md).
3. **Bootstrap's own extension points.** Component `--bs-{component}-*` variables and the utilities API, when a real gap remains after the component-class and utility tiers.
4. **Leave anything beyond Bootstrap's conventions to the developer.** Stop at rung 3 and say plainly what rung 4 would require. Take rung 4 unasked only where [inspection.md](references/inspection.md) → When an authored rule is already earned opens it.

Never reach first for any of these, because each ends the cascade for that element and then survives
no `--bs-*` retheming, no breakpoint change, and no color-mode change:

- a `style="..."` attribute;
- a `<style>` block in a page or component;
- a new stylesheet rule for something a utility already does.

### Hierarchy & actions

| Intent      | Typical choice                                                      |
| ----------- | ------------------------------------------------------------------- |
| Primary     | `btn btn-primary` — **one** clear primary per region                |
| Secondary   | `btn-secondary` — solid, so the surface underneath cannot change it |
| Destructive | `btn-danger` + the confirmation ladder                              |
| Tertiary    | `btn-link` or text links                                            |
| Status      | `badge` / `alert` / `*-emphasis` — **icon + color + word**          |

**Give any action that carries information or consequence a solid `btn-*` class, and keep outline
buttons decorative.** Against stock Bootstrap the whole `btn-outline-*` family misses 4.5:1 across
the dark theme and on light tinted surfaces — cards, subtle alerts — because an outline button
paints no background of its own and borrows the surface it sits on.

**Re-measure a solid fill whenever anything layers over it** — an `opacity-*` utility, a translucent
overlay, a skin's own tint — because the stock fills sit at the 4.5:1 bar with nothing to spare.

Draw a status mark with **no text** as an icon glyph, never as a `badge`
([components.md](references/components.md) → Badge).

### Surfaces, color, contrast

- **Measure these contrast bars in both themes:** **≥ 4.5:1** for anything information-bearing — `small`, captions, and meta text included — and **≥ 3:1** for textless marks, state indicators, and the hover/focus chrome that carries state. Verify Bootstrap's own palette too; the docs admit some defaults fall short. Read both themes — a pairing that passes light routinely fails dark.
- **Take the `-emphasis` pair for information-bearing status text.** Plain `text-success` and `text-danger` miss the bar across the dark theme and on light tinted surfaces, and `text-warning` is theme-asymmetric — unreadable on light, comfortable on dark. Never make a plain semantic color the encoding; use it only as decoration beside an encoding that already passes.
- **Tier text a person must read `text-body-secondary` or better**, and keep `text-body-tertiary` for decorative marks: tertiary measures under 4.5:1 on every surface in both themes, so it carries no information anywhere.
- **Inside `alert-*` and the `*-subtle` backgrounds, take `-emphasis` for information-bearing text and a solid `btn-*` class for every button.** A subtle fill degrades everything inside it one notch, so outline buttons and plain semantic text fail there even in light.
- **Carry no tone class inside a primary fill.** On `.active`, `.bg-primary`, and `text-bg-*` surfaces every tone class measured lands under the bar in both themes, the `-emphasis` family included, because the fill supplies its own contrast color and the tone class overrides it with one tuned for a different background. Let the surface's contrast color take the text, keep the status encoded by icon and word, and verify by capturing the selected state ([components.md](references/components.md) → Selection fills).
- Exempt a disabled control from the bars, but never leave a disabled **destructive** control at full danger saturation — at full strength it still reads as armed. Neutralize the danger tone while the control is disabled and carry the reason on the control with `aria-describedby` (plus `title` for pointer users), never `title` alone.
- Prefer `bg-body`, `bg-body-secondary`, `bg-body-tertiary` over raw `bg-white` / `bg-light`, and drive custom paint from `var(--bs-…)` — they track `data-bs-theme`, a hard-coded hex does not.
- Take pairings from `text-bg-*`, `*-subtle`, `*-emphasis`, and `text-body` / `text-body-secondary`. `text-muted` is deprecated — use `text-body-secondary`.
- On **dark surfaces**, scope `data-bs-theme="dark"` rather than the deprecated `*-dark` component classes `navbar-dark`, `dropdown-menu-dark`, `btn-close-white`, and `carousel-dark`; gray-on-dark outlines often fail contrast.
- Support `data-bs-theme="light"` and `dark` when the product offers both, and take the mechanics from [bootstrap-reference.md](references/bootstrap-reference.md) → Color modes.

### Density, layout, responsive

- Take enterprise density from `table-sm`, `btn-sm` / `btn-group-sm`, and compact toolbars, but keep every interactive target **≥ 24×24px**, measured on the rendered box rather than assumed from the class (WCAG 2.2); pad hit areas rather than shrinking them.
- Where information density is the screen's job, take the `-sm` family across a control row together — `btn-sm` with `form-control-sm`, `form-select-sm`, `input-group-sm` — so the row shares one height. Never mix control sizes within one row.
- Take `.card` where grouping earns it; otherwise carry the grouping with spacing and type.
- Swap conditional chrome in place. A bulk-action bar or an alert that shoves the toolbar down shifts the layout mid-task.
- Take the app shell, dense tables, filter bars, and the ranked responsive strategies for wide data from [bootstrap-reference.md](references/bootstrap-reference.md) → Enterprise patterns, and spacing, toolbar, truncation, and print composition from [utilities.md](references/utilities.md) → Composition habits.

### States & feedback

- **Ship every one of these states on every data surface:** ideal, empty, loading, partial, error. Treat the surface as unfinished until every one exists. Take loading thresholds, empty and error specifics, and the channel matrix for toast / inline alert / banner / modal from [bootstrap-reference.md](references/bootstrap-reference.md) → The data states, Feedback discipline.
- **Build a blocking decision on the native `<dialog>`.** `showModal()` brings focus containment, Esc, an inert background, and top-layer stacking from the platform, with no instance to construct and none to leak on unmount. Dress it with Bootstrap chrome inside ([components.md](references/components.md) → Modal). Reach for `.modal` and its JS only when the project already drives its dialogs that way.
- **Make a destructive action undoable rather than interrupting**, and take the ladder and the confirmation contracts from [bootstrap-reference.md](references/bootstrap-reference.md) → Destructive actions.

### Forms

- Choose each field's affordance in [inputs.md](references/inputs.md) → The catalog by what the person is asked for, draw every state in that file's fixed set, and obey its cross-category rules — read-only chrome, the locked select, the chosen filter's accent tone, the non-drag path for a file drop.
- Give every field a visible label (top-aligned by default) or `.form-floating` — never placeholder-only.
- Validate on **blur**, re-validate error fields on input, re-check everything on submit, and keep submit **enabled**. Never disable submit as a validation strategy.
- Pair a focusable error summary with inline `.invalid-feedback` per field (`aria-describedby`, `aria-invalid`).
- Take layout, validation mechanics and their assistive-technology limitation, input groups, autosave, and multi-step rules from [bootstrap-reference.md](references/bootstrap-reference.md) → Forms in production, Wizards & multi-step forms.

### When custom CSS is justified

Treat custom CSS as rung 4 and the developer's decision: propose it, name what it buys, and take it
unprompted only under the exception that follows. Exhaust rungs 1–3 first — correct component
structure, then utilities, then the extension points: component `--bs-{component}-*` variables for
restyling, the utilities API for missing utility steps
([bootstrap-reference.md](references/bootstrap-reference.md) → Theming).

Take an authored rule without asking only where an instrument in
[inspection.md](references/inspection.md) reports the vendor cascade failing a stated bar, the rule
cites that reading, the rule restores the bar and does nothing else, and the rule is written over
tokens. [inspection.md](references/inspection.md) → When an authored rule is already earned states
the whole condition. Treat anything wider as a proposal.

When the developer authorizes it, or that exception opens:

- Name it in Bootstrap vocabulary.
- Take colors from `var(--bs-…)` and theme tokens so light and dark both work.
- Use logical properties (`margin-inline-start`, not `margin-left`) so RTL works.
- Keep the surface area minimal and document why.
- Write a stylesheet rule, never a `style` attribute or a `<style>` block.

---

## Accessibility baseline

- Give the page a skip link to main, landmarks, and `h1` → `h2` heading order.
- Name every icon-only control with `aria-label`, and keep every target ≥ 24×24px.
- Mark active nav and tabs with `aria-current` / `aria-selected` — exactly one `aria-current` per selection.
- Wire every disclosure with `aria-expanded` and `aria-controls`.
- Wire help and errors with `aria-describedby`, and mark a failed field `aria-invalid`.
- Match the live region to the message: `role="status"` for an async status mark, `role="alert"` for an alert-styled notice.
- Associate a form with the name its host already gives the request (`aria-labelledby`) rather than repeating the prompt as its own label.
- Keep focus visible: keep the Bootstrap rings, use the `.focus-ring` helper for custom elements, and never write `outline: none`.
- Keep focus clear of sticky chrome (`scroll-margin-top`), and move focus deliberately on SPA route change, failed submit, and row delete.
- Never carry meaning by color alone, and verify the contrast.
- Give every drag interaction a non-drag alternative.
- Give every dialog `aria-labelledby`, let the platform or Bootstrap trap and restore focus rather than scripting it, and dispose Bootstrap instances in an SPA on unmount.

Take WCAG 2.2 deltas, APG pattern contracts, reduced motion, and SPA focus recipes from
[bootstrap-reference.md](references/bootstrap-reference.md) → Accessibility.

---

## Production checklist

```
Progress:
- [ ] Every check that follows, inspection.md instrument or not, reports its population, names the negative control that failed, and states its coverage; a check that can name no negative control is listed as open instead
- [ ] Project code law followed; no wrong-stack assumptions
- [ ] Subject, audience, single job stated
- [ ] Design plan critiqued against the AI defaults: palette, type, layout, one signature
- [ ] Shell from components.md, utilities from utilities.md; no invented class
- [ ] Input affordances from inputs.md; every state in its fixed set drawn, per field
- [ ] Styling ladder held: no `style` attribute, no `<style>` block, no custom rule doing a utility's job
- [ ] Plan tokens mapped to theme / --bs-* (no hex scatter); light and dark both shipped where both are offered
- [ ] Copy in user language, verbs consistent, empty/error/loading text useful
- [ ] Every state per data surface: ideal / empty / loading / partial / error
- [ ] Contrast composited and measured in both themes: ≥ 4.5:1 information-bearing (small included), ≥ 3:1 marks and state chrome; meaning not color-alone
- [ ] Tiers held: `-emphasis` for information-bearing status, solid buttons for real actions, no tone class inside a filled surface
- [ ] Every treatment resolved in the shipped cascade, not from docs memory
- [ ] Keyboard: focus visible, not obscured, targets ≥ 24px, icon controls named
- [ ] Reduced motion respected; every drag has a non-drag path
- [ ] Forms: labels visible, blur validation, error summary + inline, submit enabled
- [ ] Claimed breakpoints spot-checked; RTL-safe (start/end only)
- [ ] States present: hover / focus / disabled / invalid / active
- [ ] SPA hygiene: JS instances disposed on unmount, or framework wrappers used
- [ ] Rendered proof: captures at every viewport and every theme the surface declares + an accessibility snapshot
```
