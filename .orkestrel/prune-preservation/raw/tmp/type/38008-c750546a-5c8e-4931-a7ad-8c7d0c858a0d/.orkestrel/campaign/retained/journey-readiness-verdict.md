# Production-readiness verdict — the prove-journey pass

Run 2026-09-16 against commit `18234fb`. Eight independent lenses, one per acceptance area of
`orkestrel-prove-journey`, each reading the real suite and running what settled it. Every claimed gap
was then put to a refuter instructed to default to rejecting it. 66 agents, 0 errors.

**Ten gaps survived, of which eight are distinct.** The campaign's redesign is complete and its gates
are green; what follows is what the proof layer still owes before this ships.

## Blocking

**R1 — keyboard reachability is proven on a minority of surfaces.** `traverseAccessible` has four
call sites. One targets a masthead destination, one the skip link (which the skill excludes as the
case that does not count), one a fixture button the test builds itself, and one runs only inside the
matrix family. Products, product detail, publications, article detail, marketplace, about,
newsletter, media, shop, shop detail, and payment carry their own reachable controls that no walk
reaches. The payment surface is the sharpest: its journey places three states and never sends a Tab.
Fails SKILL.md "Reach each surface's own controls through forward Tab traversal in at least one
journey" and the Accept bullet "keyboard-only reachability proven on every surface the journeys
cover".

**R2 — two refusal checks accept any of the three voices the resolver throws**, and they sit exactly
where the application produces the present-but-unreachable voice. `setup.ts`'s `openSite` and
`closeSite` pass on `refusal !== undefined`. Their doc comment says wide viewports "paint no
trigger", but `App.vue` renders the toggler unconditionally inside a `d-lg-none` wrapper, so at 1280
the element is present and hidden. The run's own artifacts confirm it: `light-390.txt` lists
`button "Menu"` at focus position 9, `light-1280.txt` lists it nowhere. Fails "Assert the exact
failure voice the case means. Never write an assertion that accepts more than one voice."

**R3 — the product-detail and shop-detail journeys assert their outcome with text already on the
listing they are standing on.** Neither detail screen is proven to have opened. This is the same
class of false green as the submit guards: a passing assertion that cannot distinguish arrival from
never having left.

**R4 — the composited-contrast instrument's negative control never fails.** Every harness control the
run composes reads through an element painting its own opaque background, so the compositing the
reader exists for — the ancestor walk and the alpha blend — is never exercised. An instrument that
has not failed is not evidence.

**R5 — the authored-class census never reports the population it walked**, only refuses an empty one,
and the population it walks is the home screen alone.

**R6 — the style-escape control covers only the inline-attribute half.** The `<style>`-element branch
the property exists to catch is never fed, there is no permitted fixture the reader must leave alone,
and the reading reports no population.

## Major

**R7 — the storage-failure leg of the transport family is unproven.** No failing store is ever built.
The skill requires an inert configurable implementation that stalls a read, fails a fixed number of
reads, or fails a write, plus the visible half in a journey: the failure sentence a person reads and
the retry control that clears it. The application has a reachable storage failure whose visible half
is a theme control that silently does nothing.

**R8 — the shop department filter carries `aria-pressed` and no journey ever presses it.** One of the
surface's state-carrying controls has no journey at all.

**R9 — journeys press state-carrying controls and never assert the state those controls announce.**
`readStates` is imported and called once, reading `invalid`. No journey asserts `pressed` on a filter
or on the theme control.

## Minor

**R10 — `home` is placed three interactions after the assertion that proves the surface is in the
home condition**, one of which opens and dismisses the offcanvas.

## Ruled not owed: the statechart family

The skill declares Statechart "Where a journey drives a control that carries state", and this
surface's journeys do drive controls carrying `aria-pressed`. On that reading the Orchestrator
expected the family to be owed, and the assessing lens raised eight gaps against it, five blocking.

**Every one was refuted, on the same ground, by independent refuters — and the refutation is correct.**
`references/statechart.md` fixes what the family is: a `StateTransition` "typed on the entity's own
state and event unions, so a row naming a state the entity does not have fails to typecheck." Rough
Notes declares no such entity. Its stateful controls are view-local `ref`s inside single-file
components, not entities publishing a state union and an event union. Declaring those unions solely
so a table could be typed on them would be inventing domain types to satisfy a test, against
`AGENTS.md` § Design laws — "Real domain states only … not decorative labels for facts already
represented."

The trigger is met in appearance and not in the form the reference requires. The family is **not
owed**, and `guides/README.md`'s existing statement that this surface carries no statechart family
and no harness stands.

Two claims inside those refuted gaps survive on their own as ordinary journey findings rather than as
statechart findings, and are carried above as R8 and R9.

## What the pass confirmed

The lenses actively checked and sustained nothing against: the intent coverage of all fifteen routes;
the declaration proof and its bidirectional family equality; the per-variant matrix run; the
registry-times-variants filename proof and the state-placement proof; the capture-run disk
membership; the written artifact per variant; the vocabulary sweep; and the repository gates.

## Disposition

R1, R2, R3, R7, R8, R9, R10 → unit 11, the journey and transport layer.
R4, R5, R6 → unit 12, the style instruments.

Both units own `tests/app/browser/integration.test.ts` and `tests/app/browser/setup.ts`, so they run
serially.
