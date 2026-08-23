# Unit W3 report — close the four audit findings

Role `implementer`, Opus 5, clean context, sole serial writer. The unit did not write the code it
fixed. Brief: `.orkestrel/campaign/unit-w3-brief.md`. Verdict answered:
`.orkestrel/campaign/audit-w2-verdict.md`.

Only `src/core/compilers.ts` and `src/core/templates.ts` changed. This repository's own
`tests/distribution.test.ts` and everything under `guides/` are byte-untouched.

## The brief prescribed a fix that does not work, and the unit measured it

The finding was that the scratch tree leaks because `afterAll` registers after the code that can
throw past it. The brief prescribed moving the registration earlier. The unit probed that before
writing it and found it **necessary but not sufficient**: Vitest does not run a module-scope
`afterAll` when the module throws during collection, so a file that registers the teardown and then
throws still leaves its directory behind.

The implemented fix keeps the earlier registration and puts the throwing work inside `openStage()`
with a `catch` that removes the scratch tree and rethrows. Registration order and the absence of a
surviving directory are separate criteria and neither would have closed alone.

This is the rule about running a question rather than reasoning about it, applied to the
Orchestrator's own prescription. The brief was wrong and the unit was right to measure it.

## The control, both directions

Forced release-mode registry failure through `npm_config_registry` pointed at a dead port, run in a
generated workspace, counting `/tmp/distribution-*` before and after:

| Subject                                        | Before | After  |
| ---------------------------------------------- | ------ | ------ |
| Pre-fix control, teardown below the throw       | 3      | **4**  |
| Fixed template                                  | 4      | **4**  |

Measured again on the second throw path, with a forced throw as the first statement of
`buildStage()`: the fixed template held at 4, the control went to 5. Both runs failed the gate as
required, so the control is a leak difference rather than a behaviour difference.

## The other three findings

The staging boolean is now `const STAGE = openStage()` followed by `const STAGED = STAGE !==
undefined`, true when the stage exists, with the sole call site reading `if (!STAGED)`. It is
load-bearing rather than decorative: TypeScript's aliased-const narrowing makes it the narrowing
gate, and deleting the guard makes `tsc` refuse the assignment.

The rewrapped TSDoc paragraph is byte-identical in wording. The width check now returns only the two
`@example` import lines, which cannot be broken.

Every stage-gated test skips through `context.skip` naming the mechanism and carries
`[requires the registry]` in its title, matching the browser branch.

## A formatter interaction the unit had to settle

Removing `it.skipIf(STAGED)(` shortens each call's head enough that oxfmt hugs the arrow function,
pushing the header past the vendored `printWidth` of 100, which the emitted-width test rejects.
Three test titles were shortened to fit. The unit recorded this rather than widening the limit.

## The unknown, answered

`MODULE_EMITTERS` is not a line total. It is the emitter tally per module path — for each blueprint
and module path the selection matrix emits, projected onto the path. The distribution entry
therefore did not move and needed no update.

## Recorded and ruled, not carried

The unit noted that the `it.runIf(!entry.browser)` and `it.runIf(entry.browser)` selection skips
report with no note. **Ruled: correct as is.** Those are branch selection over a stage that exists,
not a conditional skip over missing evidence, so `.claude/rules/tests.md`'s citation requirement
does not reach them and a note there would be noise.

Residue outside the repository: a teardown probe directory and the two deliberate leaks the control
runs produced, left in place as criterion 9's evidence. The permission system denied every removal
attempted outside the repository. Scratch workspaces remain under `/home/user/w3-proof/`.
