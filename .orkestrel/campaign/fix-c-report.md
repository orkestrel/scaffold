# FIX-C report — the setup question fires and advises correctly

Role `implementer`, Opus 5, clean context, sole serial writer.
Brief: `.orkestrel/campaign/fix-c-brief.md`.

## The root cause was a false premise in the brief that created this code

The W5 brief asserted that every setup module scaffold seeds is empty. That is true of
`tests/setup.ts` and false of `tests/setupGlobal.ts`, which seeds `export function setup(): void {}`.
The unit built on the premise, its comment restated it, and the guide repeated it.

## What replaced it, and why it generalizes

The predicate no longer tests emptiness and no longer special-cases a path by name. Each module's
bytes are held to **the seed this blueprint plans at that same path**, read from
`blueprintToTestArtifacts` — the same compiler that writes it. A seed that turns non-empty later
needs no change here.

Coverage is read **per module**: `tests/<name>.ts` is covered by `tests/<name>.test.ts` and nothing
else, which is the pairing the vendored policy proof resolves through `stemToPolicyCandidates`. The
`if (blueprint.setup) return undefined` short-circuit is gone, so writing one proof retires one
module instead of retiring the question.

The remedy is derived per module. Where it said "Add tests/setup.test.ts" for a list naming
`tests/setupServer.ts`, it now names each proof the listed modules actually want.

## The enumeration, which is what makes the fix safe

Every artifact `blueprintToTestArtifacts` emits, against a blueprint with every axis and flag on:
`tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupServer.ts`, and `tests/setupService.ts` seed
empty; `tests/setupGlobal.ts` seeds 33 bytes; every entry proof, the distribution proof, and the
integration seed are non-empty by design and are not modules this question admits.

The unit widened the sweep past `blueprintToTestArtifacts` to the whole compiled plan, because the
question reads the tests directory and does not care which compiler emitted a file. That found
exactly one further matching path — `tests/setupPolicy.ts`, host-origin and already excluded by
name.

## Failing first

`npm run test:src:bin` before the fix: **7 failed, 189 passed**. Two are the new cases for the
seeded global module and per-module coverage. Four are existing fixtures carrying
`tests/setupService.ts` whose remedy named `tests/setup.test.ts` — the defect was already latent in
the suite and nothing had asked the right question of it. After: **196 passed**.

## Executed readings

**A freshly materialized `global: true` workspace reports no setup question.** No CLI verb can
express that flag — `new` hard-codes it false, every other verb derives it from the file's presence,
and birth ownership means `repair` never writes an artifact a blueprint does not plan — so the unit
materialized through scaffold's own `Compiler` and `Materializer` exactly as `#create` does, then
audited with the real `dist/bin/main.js`. `tests/setupGlobal.ts` is 33 bytes, `audit` exits 0, and
the question list is empty.

**Both modules filled, no proof:** the question names `tests/setup.ts` and `tests/setupServer.ts`
and prescribes `tests/setup.test.ts, tests/setupServer.test.ts`.

**After writing `tests/setup.test.ts` alone:** the question names `tests/setupServer.ts` only. That
is defect 3 closed.

**Every filled module paired:** no setup question at all.

The unit reported an intermediate reading rather than hiding it: writing a setup proof makes the
workspace want the `setup` Vitest project, so the pre-existing `projects` advisory fires until the
manifest declares `test:setup`. That advisory is not this question and predates this unit; following
its own prescription and running `repair` closes it.

**Non-blocking throughout:** `audit` exits 0 with the question present, and `repair` — plain and
scoped to `tests` — exits 0 with empty stderr.

## A decision the unit settled well

The brief permitted a centralized constant. The unit declined: `src/core/constants.ts` re-exports
through the core barrel, so a constant there is a public export owing `guides/scaffold.md` a parity
row — the vendored file the brief told it to avoid. It used the literals the vendored policy proof
already uses.

## For FIX-E

The unit supplied the exact replacement text for both guide passages: the paragraph carrying
"emptiness is the whole rule, because every setup module scaffold seeds is empty", and the short
form later in the file. Both must state the seed-relative comparison and the per-module pairing.
