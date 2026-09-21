# CL7's rulings, taken from the terrain map

The Orchestrator's decisions on what `units/cl7-scout-report.md` surfaced, so CL7's brief carries
them rather than meeting them as deviation stops.

## The navigation combinators ship

Seven selectors on the container key qualify a container by a navbar ancestor, and none of them
is deferred. Navigation is a deferred family, so this cascade defines no navbar.

**Ruling: ship them.** Their four declarations are self-contained layout on the container itself,
they complete the key without invoking the exclusion machinery, and the rule simply never matches
until a consumer brings their own navigation markup, at which point it is correct. Excluding them
would require explaining why a container-key selector is absent from a cascade that ships the
container, and the deferral table's existing rows defer selectors the package chooses not to
style, not selectors it styles under an ancestor it does not define.

The proof reads them by mounting a container inside an element carrying the navbar class, which
costs the package nothing and does not make the navbar a shipped component. Say so in the report
so the guide's owner can record that the class is referenced and not defined.

## The gutter properties need variable rows

The key's properties are the two gutter custom properties, so unlike CL5's keys this one is not
admitted by the empty-properties branch of the function deciding what counts as shipped. CL7
gives the key the variable rows that function requires, each resting on a proof that reads the
property's resolved value rather than its presence in source.

## The container widths need a home, and it is not the ramp

The container payload widths are `540px`, `720px`, `960px`, `1140px`, and `1320px`, and they are
not the ramp widths the breakpoints carry. No token's name contains `container` or `gutter`
today. The space scale's twelfth member is `1.5rem` scaled by density, which matches the gutter
value as a number and is not a named gutter token.

**Ruling: the widths and the gutter take tokens of their own**, emitted beside the breakpoint
tokens, because the styles rule bars a literal length outside the token file and these five
values are a published scale a consumer retunes. The brief grants the token file for those
additions alone. The gutter token is the one the container's padding computes from, so the
Bootstrap gutter properties alias it rather than the reverse.

**Measure the blast radius before adding them**, as CL6 must for the link tokens: the space
scale's twelfth member currently carries the same value, so a consumer reading it may be relying
on the coincidence. Report which consumers resolve differently before and after, and stop if one
outside the owned set moves.

## The proof drives the viewport through what exists

The breakpoint case table and the viewport visitor already apply below, at, and above every
published boundary and read computed style, so the container proof needs no new driving
mechanism. What it needs is an expected-value table for the payload widths, which is new rows in
the styles setup module beside the existing case tables.

The case table's lowest reading sits below the first boundary, which is exactly the floor a
container proof needs to read the fluid width before any cap applies. Use it.
