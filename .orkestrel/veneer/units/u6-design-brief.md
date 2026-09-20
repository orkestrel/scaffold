# Unit U6-design — the Test package's journey additions, adversarial design round

## Role and engine

Two blind lanes on one brief: `planner` on native Opus 5 holds the subjective lane (shape,
naming, ergonomics, the voice of the verbs); `analyst` on Astra through `codex exec --sandbox read-only`
holds the objective lane (correctness, what the tester environment permits, what the installed
package already does). Each lane is a fresh context, sees only this brief and the files it names,
and returns a proposal; neither sees the other's. Perform the assignment directly and spawn
nothing; a bridge driver carries the brief unaltered and returns the journal.

## Question

What are the names, signatures, refusal voices, placements, and proofs of four additions to
`@orkestrel/test/browser` — a journey verb that hovers a resolved control by role and name; a
press-and-release pair (or a hold verb) that produces `:active` on a resolved control and clears
it; a `readStyle` form that reads a named pseudo-element; and a media-emulation helper for
reduced motion and print that restores on cleanup — such that U6 lands them in one unit in the
Test checkout and Veneer's Button unit consumes them?

## Context

Read, at these paths, in this order:

- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/instruments.md` — the
  U5 rows: `userEvent.hover` matches `:hover`; a CDP `Input.dispatchMouseEvent` press produces
  `:active` once the tester iframe's scale is applied (`frame.left + local.x * scale`, scale read
  as the iframe's painted width over its `innerWidth`, 0.379 on Chromium and 0.366 on Edge at the
  default project size); `getComputedStyle(element, '::after' | '::backdrop' | '::details-content')`
  returns used values; `cdp()` `Emulation.setEmulatedMedia` switches `prefers-reduced-motion`
  and `print` and restores with `{ media: '', features: [] }`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u5-probe.test.ts` — the
  exact code that took those readings.
- `C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts` — the journey layer as
  published at `0.0.18`: `clickAccessible` (`:376-412`, the role-and-name overloads and the
  refusal voice), `clickAccessibleWithin`, `pressKeys` (`:543`), `traverseAccessible` (`:563`),
  `waitForAnimations` (`:1200`), `readStyle` (`:2158`), and the resolver and voice helpers they
  share; `src/browser/types.ts` and `src/browser/constants.ts` for the option and voice shapes;
  `src/browser/index.ts` for the barrel.
- `C:/Users/mikes/WebstormProjects/test/guides/test.md` § Surface › Browser (`:221-628`),
  § Voices (`:989-1087`), § Limits (`:1481-1635`, the candidate table and its rulings), and
  § Patterns › "Drive an interface the way a person does" (`:2703` on).
- `C:/Users/mikes/WebstormProjects/test/tests/src/browser/` — how the existing verbs are proved
  with negative controls (read the proofs of `clickAccessible`, `pressKeys`, `waitForAnimations`,
  and `readStyle`).
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Design laws; `.claude/rules/names.md`
  (one-word entity members, `{verb}{Noun}` helpers, the fixed lifecycle vocabulary, fleet name
  ownership), `.claude/rules/tests.md`, `.claude/rules/browser.md`;
  `.agents/skills/orkestrel-prove-journey/SKILL.md` with `references/layer.md`.
- `C:/Users/mikes/WebstormProjects/test/node_modules/vitest/dist/browser.d.ts` and
  `node_modules/@vitest/browser/dist/index.d.ts` — what `userEvent`, `page`, and `cdp()` expose.

**Fixed decisions.** The additions live in `src/browser/helpers.ts` (verbs and readers) with
types in `types.ts` and voices in `constants.ts`; each resolves its target by role and accessible
name the way `clickAccessible` does and refuses in the same voice family; nothing wraps an
installed primitive only to rename it; the press mechanism is the CDP path U5 proved (a
`userEvent` path that cannot hold a button is not a substitute); the media helper returns what
the caller needs to restore and never leaves emulation on after a failed test; every name is
checked against the hosted guides' `Surface` rows (`node_modules/@orkestrel/scaffold/dist/host/guides/*.md`
under the Veneer checkout `C:/Users/mikes/WebstormProjects/veneer`).

**Host.** Read-only; write nothing; run nothing.

## Evidence to return

Each lane returns one proposal with these parts, every claim pointing at the site or rule it
rests on:

1. **Names and signatures.** For each addition: the export name, the full signature with its
   overloads, the option type if any, where it sits in `helpers.ts` relative to its siblings,
   and why the name follows the layer's vocabulary (or, for the pseudo-element read, why an
   overload of `readStyle` beats a new name, or the reverse).
2. **Mechanism.** How each is built from what the tester exposes (`userEvent.hover`, `cdp()`,
   `getComputedStyle`, `window.frameElement`), the iframe-scale mapping for the press, and how
   the hold and the emulation restore on error.
3. **Voices.** The exact refusal sentence each raises for an absent control, a control that is
   not hoverable or pressable, a pseudo-element the engine does not expose, and an emulation the
   provider cannot reach; each in the existing voice family.
4. **Proofs.** For each addition, the case that proves it and the negative control that must go
   red, in Test's own browser suite, naming the fixture markup and the reading.
5. **Guide rows.** The `Surface` row and, where a candidate table entry applies, the `Limits`
   ruling text to add.
6. **Risks.** What the tester may not permit (a scaled iframe on other project sizes, Edge,
   headless differences), and the smallest instrument that settles each.

## Bound

Read only the paths above. Propose one design; where the readings leave a fork, name it and rule
on it. Return no more than U6's implementer needs.

## Output

Return only, in this order: `Question` (one line); `Proposal` (parts 1 to 6); `Unknowns`;
`Journal` (the bench lane's session id; the native lane writes `native`); `Deviation`. No process
diary.
