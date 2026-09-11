---
name: enterprise-bootstrap
description: >-
  Design and build distinctive, production-grade UI with Bootstrap 5.3 on any
  stack. Use for any Bootstrap interface work — creating, restyling, or
  extending pages, screens, components, layouts, app shells, dashboards, admin
  panels, SaaS tools, data tables, filter bars, forms, wizards, navigation,
  modals, empty/loading/error states, dark mode, marketing surfaces — whenever
  the task touches HTML/CSS/visual design, mentions Bootstrap or its components,
  asks for visual hierarchy, polish, a design system, or spacing/type/color
  scales, or must look professional rather than like stock Bootstrap. Covers
  aesthetics, typography, color modes, design tokens, elevation, finishing
  details, accessibility (WCAG 2.2 AA), responsive layout, and enterprise app
  patterns. The `orkestrel-polish-surface` skill owns a requested verdict,
  round, or campaign over a surface that already renders, including a review
  that changes nothing; in that campaign's fix units, use this skill for
  Bootstrap craft.
---

# Enterprise Bootstrap

Start with the person's task, give it a deliberate visual hierarchy, and build it from Bootstrap
5.3 components and utilities. Settle claims about the result from what renders.

Open the reference that owns the decision before writing markup. Pick components and their
structure from [components.md](references/components.md), input affordances from
[inputs.md](references/inputs.md), and fine layout from [utilities.md](references/utilities.md). Take narrow composition and breakpoint
behavior from [responsive-layout.md](references/responsive-layout.md) before building the shell.
Never guess a class name: an invented utility has no shipped rule and fails silently. Where
Bootstrap ships no component — combobox, date picker, tags input, data grid, tree — work the
native-first ladder in [bootstrap-reference.md](references/bootstrap-reference.md) → When not to
hand-roll before building one.

| Layer          | File                                                        | Holds                                                              |
| -------------- | ----------------------------------------------------------- | ------------------------------------------------------------------ |
| Operate        | `SKILL.md`                                                  | Process, decision rules, checklist                                 |
| Design craft   | [frontend-design.md](references/frontend-design.md)         | Hierarchy, spacing, type, color, depth, imagery, signature, copy   |
| Components     | [components.md](references/components.md)                   | Bootstrap markup and enterprise selection notes                    |
| Inputs         | [inputs.md](references/inputs.md)                           | Affordance, alternates, styling rung, and states per category      |
| Responsive     | [responsive-layout.md](references/responsive-layout.md)     | Narrow-first layout, task parity, containers, overlays, proof      |
| Color modes    | [color-modes.md](references/color-modes.md)                 | Inheritance, surface ownership, nested modes, component exceptions |
| Utilities      | [utilities.md](references/utilities.md)                     | Class index, helpers, composition                                  |
| Bootstrap deep | [bootstrap-reference.md](references/bootstrap-reference.md) | Theming, forms, lifecycle, accessibility, enterprise patterns      |
| Instruments    | [inspection.md](references/inspection.md)                   | Mechanical evidence contracts and rendered review criteria         |

Take the operating rules here over a lookup example. Adapt example heading levels, action rank,
labels, and paint to the host surface. Move illustrative inline declarations through the styling
ladder before shipping; their presence in a lookup is not an exemption.

---

## Portability

1. **Assume no stack.** Infer it from the workspace. Do not assume Vue, React, a skin library, a folder layout, or a named product.
2. **Target Bootstrap 5.3.x** class names and behaviors. Hold a compatible skin to the same component contracts.
3. **Follow the project's code law.** Take language, layout, and forbidden patterns from `AGENTS.md`, lint rules, and the design system. Take UI craft and Bootstrap usage from here, never language law. Preserve existing tokens and identity unless the brief authorizes changing them.
4. **Write framework-neutral markup** — semantic HTML plus Bootstrap classes. Wire behavior with the project's stack; in an SPA prefer framework-native Bootstrap wrappers over competing DOM ownership ([bootstrap-reference.md](references/bootstrap-reference.md) → JavaScript lifecycle).
5. **Keep this folder intact** so its relative links resolve. Install or vendor it wherever the tooling looks for skills; the paths are tooling-specific, the content is not.
6. **Use the installed Bootstrap.** Otherwise take the pinned CDN example from [bootstrap-reference.md](references/bootstrap-reference.md) → Quick start. Do not upgrade dependencies as a side effect of a visual pass.
7. **Apply this package** to the work in its frontmatter. For a requested verdict, round, or campaign over an already rendering surface, use `orkestrel-polish-surface`; use this skill for the campaign's Bootstrap fixes.

---

## The mandate

1. **Design direction** — ground hierarchy and character in the subject, audience, and job. Preserve an existing signature or introduce a coherent one when the brief calls for it; spend aesthetic risk only where the brief leaves room.
2. **Bootstrap execution** — take components and utilities first, extend the system only for a real gap, and preserve Bootstrap's adaptive surfaces and component-owned foregrounds. Take color decisions from [color-modes.md](references/color-modes.md); a `--bs-*` prefix alone does not establish mode support.

A marketing page may lead with a thesis-hero; an authenticated tool leads with the work. Keep its
signature in the frame and its data conventional enough to scan. A distinctive shell never excuses
a confusing feature ([frontend-design.md](references/frontend-design.md) → Where the signature lives).

---

## Process

Read [frontend-design.md](references/frontend-design.md) before setting a direction. It owns the
visual decisions; the loop here owns their order.

1. **Ground** — state the subject, audience, single job, primary action, and existing constraints. Use real content; mark fixture data as such. Start with a feature, not a navigation shell.
2. **Plan** — record each region's narrow layout, expansion threshold, content/action parity, and overflow policy in a responsive contract. Render the primary task at 320 and 390 CSS px before expanding the shell. Settle reading order and grouping in low fidelity before paint, and hold color until the arrangement reads in grayscale (body surfaces, inherited text, weight, and spacing only). Reuse or define a compact system: **color families and surface ownership**, **type roles and scale**, **spacing and width roles**, **radius and elevation**, **a coherent signature where the brief calls for one**. Set personality once through four levers — typeface, primary color, radius family, copy register — and hold it on every screen. Record changes, not a parallel system. Take each scale's Bootstrap source, shipped steps, and gaps from [bootstrap-reference.md](references/bootstrap-reference.md) → Define the working scales.
3. **Critique the plan** — reject unclear hierarchy, invented functionality, and interchangeable styling. Follow a pinned brief; otherwise take character from the subject rather than clustered AI defaults. Do not manufacture novelty inside an established product.
4. **Build** — implement the smallest useful flow and its data states, then refine the working feature. Use documented components and shipped utilities; map shared tokens once. Fix conflicting declarations rather than adding specificity. Extend the next feature after this one works.
5. **Critique the render** — complete the primary flow at narrow width first; then read task, hierarchy, grouping, type, contrast, states, and signature in order. Fix the earliest failure first. Remove a needless accessory if one exists; never remove useful information to meet a quota.

Keep exploratory drafts private. Deliver the selected direction, the changes, and their evidence
limits, not every discarded variation.

**Rendered proof.** Capture the declared viewports, themes, and states, plus an accessibility
snapshot. Use captures for visual claims and source to explain mechanisms; use interaction tests
for behavior. `.agents/orchestration.md` owns this law where present. Name the coverage and any
unverified state. Without a render-capable environment, report visual verification as open, never
as passed. Route a requested review campaign to `orkestrel-polish-surface`.

**Mechanical proof.** Run applicable instruments in [inspection.md](references/inspection.md) with
their negative controls. Report population, reading, control result, and coverage. A control the
reader misses invalidates the run; an expected but empty population fails. Record a genuinely
absent feature as not applicable with a reason, not as a pass. `.claude/rules/quality.md` owns this
law where present. Keep qualitative design review separate from instrument results: named criteria
and captures are evidence, not fabricated mechanical tests or a beauty score.

---

## Bootstrap operating principles

1. **Mobile first** — unprefixed classes define a complete narrow task; breakpoint classes enhance it when its container has room. Use the contract in [responsive-layout.md](references/responsive-layout.md), not a desktop composition with wrapping added later.
2. **Semantic HTML** — use landmarks and hold heading order; choose visual size independently of heading level.
3. **Work down the styling ladder** — component classes, utilities, then Bootstrap's extension points.
4. **Test behavior, not class presence.** Check 320 and 390 CSS px, a wide view, and immediately below/at/above each used threshold. Drive state and theme transitions; enlarge text and use long content. Distinguish viewport reflow, browser zoom, and text-resize tests.
5. **Take Bootstrap's transitions first.** Use custom motion only where it serves the task or signature, and respect `prefers-reduced-motion` ([bootstrap-reference.md](references/bootstrap-reference.md) → Reduced motion).
6. **Resolve treatments in the shipped cascade** — Bootstrap, skins, and dependency stylesheets. A token name or class recipe is not a contrast guarantee. Measure foregrounds, surfaces, and translucent layers in each declared theme and state.

### The styling ladder

Reach a rung only when the preceding one cannot express the need.

1. **Documented component structure.** Keep required elements, nesting, modifiers, behavior, and ARIA. Use optional headers, titles, and footers only when the content needs them; a component example is not a mandate to add empty chrome.
2. **Shipped utilities.** Compose spacing, flex, sizing, text, border, and color classes from [utilities.md](references/utilities.md). Verify extensions exist in the loaded build before authoring them.
3. **Bootstrap extension points.** Use component `--bs-{component}-*` variables or the Sass utilities API for a recurring system gap. Declare the role once, compile where required, and verify the emitted rule.
4. **Developer-authorized custom CSS.** Propose what Bootstrap cannot express and why. Take this rung unasked only under [inspection.md](references/inspection.md) → When an authored rule is already earned.

Keep authored styles in the project's stylesheet and token layer, never a `style` attribute or a
page/component `<style>` block. Do not duplicate a shipped utility. Keep raw values in declared
primitive definitions, not component paint. These are package boundaries, not claims that inline
CSS or custom rules cannot participate in a cascade.

### Hierarchy & actions

| Rank or meaning | Typical choice                                                         |
| --------------- | ---------------------------------------------------------------------- |
| Primary         | `btn btn-primary` — at most one dominant action per active task region |
| Secondary       | A quieter neutral or outline variant, measured on its actual surface   |
| Tertiary        | `btn btn-link` for an action; a real link for navigation               |
| Destructive     | Rank first; strong `btn-danger` for the final destructive commit       |
| Status          | Quiet badge or alert treatment; icon + color + word                    |

Choose rank before hue. Do not make every action solid or every destructive action dominant.
Outline and link-style controls are allowed only when their text, boundary or state cue, and focus
meet the applicable bars across actual surfaces and states. Use a measured solid variant when the
quieter one cannot pass. Never use an inert button as decoration.

Re-measure fills under opacity, overlays, or a skin. Keep the destructive confirmation ladder from
[bootstrap-reference.md](references/bootstrap-reference.md) → Destructive actions; visual rank does
not lower the required friction. Draw a textless status mark as an icon glyph, not an empty badge
([components.md](references/components.md) → Badge).

### Surfaces, color, contrast

- **Hold the package bars:** ≥ 4.5:1 for all information-bearing text, including large text, captions, and metadata; ≥ 3:1 for meaningful textless marks and state/focus chrome. The text floor is deliberately stricter than WCAG's large-text exception. Measure every declared theme and reached state; do not generalize one reading to all surfaces.
- **Inherit ordinary text.** When content owns no background, add no foreground override. Prefer `bg-body`, `bg-body-secondary`, `bg-body-tertiary`, and `bg-*-subtle` for quiet surfaces; do not automatically add a text-color utility to them. Follow [color-modes.md](references/color-modes.md) for exceptions and component-owned colors.
- **Keep supporting text readable.** Start with inherited color, spacing, and weight. Use `text-body-secondary` for a deliberate secondary tier — it clears 4.5:1 on every stock body surface in both modes — not for every caption. `text-body-tertiary` is body color at 50 % alpha and measures 3.0–4.1:1 on those surfaces: decoration or disabled only, never a caption someone reads. A third readable tier is a declared opaque token. Never quiet text with opacity, and do not carry a neutral secondary tier blindly onto a colored fill; inherit its tested foreground first, using a scoped opaque same-hue tier only when needed ([color-modes.md](references/color-modes.md) → Text tiers).
- **Pair intentional solid surfaces; preserve selected foregrounds.** Let the owning component set its foreground and background, or use a tested solid pair. Do not recolor ordinary children. Keep status encoded by icon and word and capture the selected state.
- **Inside subtle fills, measure the children against that fill.** Badge, button, and caption recipes need their own readings; a page-background result does not transfer into a card or alert.
- **Exempt disabled controls from the contrast bars**, but visibly neutralize an unavailable destructive action and explain why with `aria-describedby`; `title` may supplement, never replace, the explanation.
- **Verify mode transitions and boundaries.** Take adaptive-versus-fixed utilities, nested `data-bs-theme` scopes, badges, tables, and overlay mounts from [color-modes.md](references/color-modes.md). An attribute or variable name is not proof of painted adaptation.
- **Bound variable backgrounds.** For text over imagery, gradients, or overlays, measure the actual painted background under the text. A flat-color reader or an average image sample cannot settle that claim.

### Density, layout, responsive

Take [responsive-layout.md](references/responsive-layout.md) as the layout contract. Preserve the
primary task, reading order, and access to information at every width. A contained horizontal
table can pass document-overflow checks and still fail the task; inspect both.

- Choose density for the task. Start each gap one step too large, render, and step down; compress where throughput or comparison requires it, not because the default felt cramped. Keep targets ≥ 24×24 CSS px as the package floor; measure hit areas, never infer them from `btn-sm`.
- Take compact controls together across a row: `btn-sm`, `form-control-sm`, `form-select-sm`, and `input-group-sm`. Do not shrink body text or targets to force one-row layouts.
- Keep inter-group gaps larger than internal gaps. Bound forms, rails, and prose by content with a maximum width; let comparison tables use the width they need. Use percentage columns only where things should scale together — a `col-*` login card or `col-3` sidebar changes width at every breakpoint ([bootstrap-reference.md](references/bootstrap-reference.md) → Breakpoints & layout).
- Use `.card` where an independent group earns containment. Try spacing and type before more borders, fills, or shadows. Keep elevation tied to layering, not every available box.
- Stack search, controls, and action groups at the base; expand them only when they fit. Reserve horizontal scrolling for named two-dimensional content, not ordinary toolbars.
- Reflow before truncating task-critical information. Scale large headings and outer space independently of body text and controls. Swap conditional chrome in place so selection or feedback does not shift the task.
- Take layout, wide-data strategies, and frame mechanics from [bootstrap-reference.md](references/bootstrap-reference.md) → Enterprise patterns, and class composition from [utilities.md](references/utilities.md) → Composition habits.

### States & feedback

- **Ship ideal, empty, loading, partial, and error states on each data surface.** Build them within the feature cycle, not after the polished populated screen. Take the detailed contracts and feedback channels from [bootstrap-reference.md](references/bootstrap-reference.md) → The data states, Feedback discipline.
- **Distinguish first-use from filtered-empty.** First-use offers a useful create/import action and drops inert chrome; filtered-empty preserves active filters and the clear path. Errors preserve context and offer recovery. Never invent progress or success.
- **Build a blocking decision on native `<dialog>`** unless the project already uses Bootstrap modals. Preserve platform focus, dismissal, and top-layer behavior; dress the interior with Bootstrap components ([components.md](references/components.md) → Modal).
- **Prefer undo for reversible actions.** Take interruption and confirmation rules from [bootstrap-reference.md](references/bootstrap-reference.md) → Destructive actions.

### Forms

- Choose the affordance by what the person is asked for in [inputs.md](references/inputs.md), and draw its fixed state set. Keep read-only/edit geometry stable and preserve the non-drag path for uploads.
- Give every field a visible label or `.form-floating`, never placeholder-only. Removing redundant labels on displayed data does not apply to inputs. Naming a form does not name its individual controls.
- Keep label, control, help, and error closer to each other than to the next field group. Use extra columns for genuinely related fields or supporting explanation, not to fill a wide canvas.
- Validate on blur, re-validate error fields on input, and re-check on submit. Keep submit enabled; never disable it merely because fields are invalid. Show a focusable error summary and linked inline feedback (`aria-describedby`, `aria-invalid`).
- Take validation mechanics, autosave, and multi-step rules from [bootstrap-reference.md](references/bootstrap-reference.md) → Forms in production, Wizards & multi-step forms.

### When custom CSS is justified

Exhaust rungs 1–3 before proposing a custom rule. Name the unmet requirement and the smallest rule
that would satisfy it. A desire for a signature does not waive the styling ladder.

Take a rule unasked only when an instrument in [inspection.md](references/inspection.md) proves a
vendor failure, the rule cites that reading, restores the bar and nothing else, and uses theme
tokens. Otherwise wait for developer authorization. An unavailable Sass build is not permission to
silently invent a second CSS system.

When authorized, or when that exception opens:

- Name the rule in Bootstrap vocabulary and document the gap.
- Use `var(--bs-…)` for paint and declared scales for type, spacing, radius, and elevation.
- Use logical properties so RTL survives.
- Keep the rule in the project's stylesheet, with the smallest scope and no utility duplication.

---

## Accessibility baseline

- Give the page a skip link, landmarks, and ordered headings; visual size does not dictate heading level.
- Name icon-only controls and keep targets ≥ 24×24 CSS px. Preserve visible labels within accessible names.
- Use `aria-current` for the current navigation item, `aria-selected` for selectable tabs, and native checked state for checkboxes/radios. Do not apply one selection attribute to every widget.
- Wire disclosures with `aria-expanded` and `aria-controls`; wire help/errors with `aria-describedby` and invalid fields with `aria-invalid`.
- Match announcements to urgency: polite status for routine async results, alerts for urgent failures. Do not infer urgency solely from an alert's visual styling.
- Associate a form with its existing visible name through `aria-labelledby` where useful; keep each field's own visible label.
- Preserve visible focus, clear of sticky chrome. Manage focus on SPA route change, failed submit, and row deletion; use the platform or existing dialog implementation for containment and restoration.
- Never encode meaning by color alone. Measure contrast, including state cues, against actual surfaces.
- Preserve content and operation under enlarged text and narrow reflow; do not hide essential content to pass a viewport check.
- Give drag interactions a non-drag alternative. Respect reduced motion. Give images alternatives appropriate to their role.
- Dispose Bootstrap instances on SPA unmount, or use the framework-native wrapper's lifecycle.

Take WCAG 2.2 details, APG contracts, and focus recipes from
[bootstrap-reference.md](references/bootstrap-reference.md) → Accessibility. A passing subset of
these checks is not a claim of full accessibility conformance.

---

## Production checklist

```
Progress:
- [ ] Project code law, installed stack, existing identity, and scope held
- [ ] Subject, audience, single job, primary action, and real/fixture content identified
- [ ] Feature hierarchy settled before shell/detail; plan specific to the brief
- [ ] Color families and surface ownership, type, spacing/width, radius, elevation, and signature declared or reused
- [ ] Typeface, primary color, radius family, and copy register set once and held; arrangement read in grayscale before hue
- [ ] Type sizes in `rem` from the scale or its generated steps; no `em` sizes, nested `.small`, or off-scale spacing
- [ ] Components and utilities resolved in the shipped build; input affordances and states taken from their references
- [ ] Styling ladder held; no authored inline styles, embedded style blocks, or unearned utility duplication
- [ ] Tokens mapped through semantics to components; literals confined to declared primitives
- [ ] Ordinary/subtle content inherits; solid exceptions own their pair; no fixed leaf color conceals a mode failure
- [ ] Secondary tier is `text-body-secondary` or a declared opaque token; no opacity or unreadable tertiary tone; secondary text on colored surfaces measured rather than assumed
- [ ] Light/dark transitions, supported nested scopes, and overlay mounts tested without rebuilding the UI
- [ ] Primary action clear; supporting content readable; destructive rank and friction both correct
- [ ] Group spacing unambiguous; widths content-led; type/baseline/line length suitable
- [ ] All data states built; first-use and filtered-empty distinct; errors recoverable; no invented progress
- [ ] Images bounded and legible; depth serves layering; accents, tints, and shadows each earn their place; no needless accessories
- [ ] Contrast measured in supported themes/states: ≥ 4.5:1 text, ≥ 3:1 meaningful marks and state/focus chrome
- [ ] Keyboard, labels, announcements, targets, reduced motion, and non-drag paths checked
- [ ] Forms retain visible labels, blur/submit validation, and summary + inline errors
- [ ] Responsive contract recorded; primary task works at 320/390 CSS px before wide-screen enhancement
- [ ] Used breakpoint boundaries, actual container widths, long content, enlarged text, and short-height overlays checked
- [ ] Essential fields/actions remain reachable; local data scrolling is named, keyboard-operable, and not used to mask page overflow
- [ ] Navigation open/close/resize and selection/filter preservation tested; RTL covered when claimed
- [ ] Runtime behavior and SPA lifecycle tested where changed
- [ ] Rendered review names criteria and captures at declared widths/themes/states, plus accessibility snapshot
- [ ] Mechanical results name population, negative controls, and coverage; absent features marked not applicable with reason
- [ ] Untested, unsupported, or failed verification listed as open; no source-only visual pass or full-conformance claim
```
