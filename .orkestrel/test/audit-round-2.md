# Audit round 2 — reconciliation, and the design ruling the seam is owed

| Lane | Engine | Terminal line |
| --- | --- | --- |
| Objective | GPT-5.6 Sol | `FAIL — 8 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims` |
| Subjective | Opus 5 | `FAIL — 6 broken, 5 unresolved, 0 not-evidenced, 1 finding outside the claims` |

The subjective lane was again read-only, but this time the brief said so, told it to mark
execution-dependent claims `UNRESOLVED`, and named the claims where reading is strongest. Its five
`UNRESOLVED` verdicts are honest rather than the disguised confirmations round 1 produced.

## The finding that matters most

**`@orkestrel/scaffold` already publishes `resolveContainedPath(root, path): string | undefined`.**

Verified: `/home/user/packages/scaffold/src/server/helpers.ts:534`, exported through the `./server`
entry, documented at `guides/scaffold.md:343`, and it refuses more than this package's version does in
one call — "a lexical escape, a physical link out of the root, and a dangling link whose raw target
contains a `..` segment". `@orkestrel/scaffold@^0.0.30` is a **devDependency of `@orkestrel/test`
itself and of all 41 packages**.

So the fix round published two exports whose job a primitive already installed everywhere does
better, with a name one word away from it.

`AGENTS.md` makes this a non-negotiable: *inspect the exact declared and installed `@orkestrel/*`
capabilities before implementing overlapping logic*. The absorption round did run a dedicated reuse
lane, and it was scoped to **test-helper categories**. Centralizing the containment predicate in the
fix round created a **new capability**, and the reuse check was never re-run against it. The creation
gate applies when a capability is created, and this one was created in a fix round where nobody
looked.

## The other confirmed findings, all reproduced here

| # | Finding | Reproduced |
| --- | --- | --- |
| R1 | The centralization **dropped a check**. `readInventory(root, [absoluteContainedPath])` now throws `Directory outside root` where the pre-centralization site accepted it | yes |
| R2 | `JSON.rawJSON('1e400')` bypasses the replacer; `roundTripJSON` returns `Infinity` | yes |
| R3 | Integer-named files break the documented key order: actual `["0","2","10","a.txt"]`, sorted `["0","10","2","a.txt"]` | yes |
| R4 | The centralization **half-happened**. `hasSymbolicLink` is called only from `createScratch`; `readInventory` keeps three inline checks with three terminal behaviours. The guide's "one rule, one implementation, a refusal cannot drift" is false | yes |
| R5 | The threat-model ruling is too broad. It binds both helpers to "directories the test itself created", which is false of `readInventory`, whose own documented usage walks a checkout | yes |
| R6 | `destroy()` leaves a **moved** allocation behind, while the guide says it removes what it allocated. The README states it correctly and the guide does not | accepted |
| R7 | Four `createScratch` branches have no test at all, including the `prefix` guard — `createScratch({ prefix: '../evil-' })` would allocate outside `tmpdir()` | accepted |
| R8 | The README gives `readInventory` one clause and no example, omitting its required second parameter. It is the only shipped documentation | accepted |

Both lanes independently ruled claim 13 `BROKEN`: not shippable in this state.

## What held

`createClock`'s strike survived attack from both directions, and the subjective lane found a second
reason the count alone did not carry: `mcp` and `middleware` expose different shapes (`now` versus
`clock`), so publishing one would have forced a consumer to convert for no gain. The membership rule
is now consistently applied, and the one fleet count independently recomputed — `captureError` at 13
— matched exactly. The trailing-separator fix held against every root form.

## The design ruling

`quality.md` fixes three rounds at one seam as the budget and directs that the next unit be a ruling
on the design rather than a fourth repair. The server containment seam has consumed rounds 1 and 2.
The ruling:

### 1. The two containment promises are different and stop being one mechanism

`createScratch` allocates its own directory at mode `0700`. `readInventory` walks a checkout it did
not create. Round 1 wrote one threat model over both, and that is the error behind R4 and R5.

- **`createScratch`** refuses a **lexically escaping** relative path. That catches the real accident —
  a test writing `../foo`. It does **not** walk segments for symlinks. Per-segment symlink walking is
  sandbox behaviour, this is not a sandbox by round 1's own ruling, and that walk is what generated
  findings in both rounds.
- **`readInventory`** keeps its three inline symlink refusals. They were never centralized because
  they are genuinely different decisions with different terminal behaviours — refuse the root, refuse
  a requested directory, skip an entry while walking. That is why the centralization half-happened:
  the shared helper never fitted.

### 2. `hasSymbolicLink` is deleted

Its only consumer is the segment walk that ruling 1 removes. Deleting it also removes half the
collision with `@orkestrel/scaffold`.

### 3. `resolveContained` stays, as one lexical predicate, and its overlap is recorded

It keeps four real call sites across both consumers. `patterns.md` requires the semantic difference
be proved before keeping a local variant, so the guide states it: **this one is lexical only and
dependency-free; `@orkestrel/scaffold`'s `resolveContainedPath` is lexical plus physical and lives in
a build tool.** A test-helper package taking a runtime dependency on the scaffolding tool to obtain a
path predicate is the wrong direction, and zero runtime dependencies remains load-bearing.

If that difference does not survive the next reader, the correct action is to delete
`resolveContained` from the public surface and let consumers import `resolveContainedPath` from the
`@orkestrel/scaffold` they already have — not to add a third variant.

### 4. The ordering guarantee is narrowed to what an object can keep

A plain object enumerates integer-index keys numerically before insertion order, so "sorted keys" is
unkeepable for integer-named files. The guide states the real guarantee: keys are root-relative and
forward-slash separated, and non-integer keys are inserted in sorted order. The alternative — return a
`ReadonlyMap` — breaks the structural match with `@orkestrel/guide`'s `SourceOptions.files` that the
whole `readInventory` design rests on, so the guarantee narrows rather than the shape changing.

## Carried into the fix round

R1, R2, R6, R7, R8, plus rulings 1 through 4, plus the `write` defect the subjective lane found
outside the claims: it calls `exists` for its throwing side effect, discards the answer, and then
re-derives the path with a plain `resolve`, so the value validated is not the value written. And the
`read`/`exists` TSDoc documents total predicates that actually throw on four conditions.
