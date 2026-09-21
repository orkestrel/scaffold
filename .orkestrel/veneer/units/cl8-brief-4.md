# Unit CL8 brief 4 — the fix round the audit forced

## What changed and why

Briefs 1, 2, and 3 stand in full. This brief carries the findings round 1 forced and nothing else.
Read the earlier briefs first. The audit's full reasoning is
`.orkestrel/veneer/cl8-audit-verdict.md`; each finding below names the lane that found it.

**Round 1 accepted your implementation.** Three lanes reconciled the record against the built
cascade by different means and agreed that every recorded grid selector ships at its condition, that
nothing extra ships, and that every withheld name is absent with a deferral row naming its owner.
Two lanes derived the percentage arithmetic independently and matched it to the record and to the
installed Bootstrap. Two lanes ruled the extraction order-preserving by reading the mixin bodies
rather than by trusting your instrument. The gates are green on both engines under an independent
verifier. Nothing in this brief reopens any of that.

## Finding 1 — the emitted vocabulary is not bound to anything (subjective lane, forcing)

**What the lane proved.** Your binding assertions compare the case tables against the compiled ramp
and against the inventory, in both directions. None of them reads what the partial actually emits.
The lane appended a step to `$offsets` in `src/styles/components/_grid.scss`, compiled in memory,
and got that selector in the cascade while both binding operands still agreed, because neither
moved. The presence scan does not catch it either: it checks that required names are present, never
that no extra name ships.

**You already wrote the fix.** `tmp/units/cl8-emission.mjs` compares the built cascade's grid
selectors and media conditions against the inventory minus the deferred families, normalizing
selector whitespace and equivalent minimum-width notation, and its controls reject a removed
condition and an added withheld selector. It is a launch-directory instrument rather than a proof.

**Retain that comparison as a shipped assertion.** Put it where the styles setup proof can run it,
reading the built cascade the way the shared-block sweep and the presence scan already read the
tree. It must fail in both directions: a recorded selector absent from the cascade at its condition,
and a grid selector in the cascade the record does not carry. Prove both directions with a control
you plant and remove, recording the command, its failing output, and the same command green.

**Read the built cascade, not the source.** `npm run build:src:styles` must precede the reading, as
it does for every proof that reads that artifact. Compare selectors and media conditions only. Do
not compare declaration values: the built artifact is minified, so value equality there asserts the
minifier's rounding rather than the code, which brief 3 already ruled.

## Finding 2 — an assertion that cannot fail (objective lane, forcing)

`tests/setupStyles.test.ts` asserts the breakpoint readings by re-deriving them with the same
expression that constructs them in `tests/setupStyles.ts`. Narrowing the construction would carry
the assertion along and leave it green, while the grid proof silently stopped reading the inactive
side of every breakpoint — which is the reading this family exists to hold.

Write the reading rows as literals, the way the sibling case in the same file already does for the
shared breakpoint table. Then plant a narrowing of the construction, record the assertion reddening,
and restore it.

## Finding 3 — the zero-boundary row sits outside every binding (objective lane)

The ramp comparison filters the zero-boundary row out before comparing, and the compiled ramp string
drops it too, so neither its name nor its boundary is compared with anything. A second zero-boundary
entry would go unread. Its two consumers also identify it by different fields — one by name, one by
boundary.

Key both consumers on the boundary, and assert the zero row's name against the ramp's own zero key
rather than filtering it out.

## Finding 4 — the ramp compilation is written twice (objective lane)

The same `compileString` call, its Sass source string, and its load paths appear twice in
`tests/setupStyles.test.ts`. Export one function from `tests/setupStyles.ts` that compiles the ramp
and returns its non-zero members, call it from both cases, and add its name to the exports
assertion.

## Finding 5 — a showcase assertion lost its discriminator (objective lane)

`tests/app/browser/sections/LayoutSection.test.ts` excludes a specimen by position to mean "this
container class also appears outside the navigation specimen". That held when the navigation
specimen was last. Your new specimens are appended after it, so the exclusion now removes a
different specimen and the navigation specimen satisfies the selector on its own for every name.

Address the specimen by name, the way the neighbouring assertions in the same file already do.

## Unknowns

- **Where the emitted-vocabulary proof belongs.** The styles setup proof reads the tree and the
  cascade already, and the conformance proof reads the cascade against the guide. Read both and put
  the assertion where its subject sits, then say in your report which you chose and why. If placing
  it requires a file outside your granted scope, stop and report rather than widening it.
- **Whether the emitted-vocabulary comparison duplicates the shared-block sweep's cascade reading**
  closely enough that the tests rule's duplication bar applies. Read both and say what you found.

## Scope

Briefs 1, 2, and 3's owned set. No new grant. In particular `tests/setupConformance.ts` stays
off-limits; if the assertion's natural home is that module, stop and report.

Do not touch the partial, the guide rows, the deferral rows, the conformance listing, or the
extraction. Round 1 accepted them.

## Execution

You are the engine reading this brief inside your own CLI. Perform the assignment directly and spawn
nothing. The working tree carries your own authored CL8 work; it is your output, not drift. HEAD is
the CL7 landing `a9172df`. The host facts in brief 1 § Execution still hold.

## Output

1. The emitted-vocabulary assertion, quoted, with where you put it and why.
2. Its two-direction control: the planted change, the command, its failing output, the restoration,
   and the same command green, with a digest showing the planted file restored.
3. Finding 2's control: the planted narrowing, the assertion reddening, and the restoration.
4. Findings 3, 4, and 5, each with what you changed.
5. Both Unknowns, with what you found.
6. The full gate chain's exit codes and final result lines, on managed Chromium and on Edge.
7. `git diff --stat` and `git status --porcelain --untracked-files=all`, actual output.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: where the new
assertion sits among its siblings, what the extracted ramp function is named, and how the showcase
assertion addresses its specimen. Stop and report if the emitted-vocabulary proof cannot be placed
inside the granted scope, or if a control cannot be made to redden.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build` exits 0.
4. The emitted-vocabulary assertion reddens on a recorded selector removed from the cascade and on
   an extra grid selector added to it, each shown with its command and output.
5. The readings assertion reddens when the construction is narrowed.
6. `npm test` exits 0 whole.
7. The styles, browser-setup, and app-browser projects exit 0 on Edge.
8. The status lists only files the four briefs own.
