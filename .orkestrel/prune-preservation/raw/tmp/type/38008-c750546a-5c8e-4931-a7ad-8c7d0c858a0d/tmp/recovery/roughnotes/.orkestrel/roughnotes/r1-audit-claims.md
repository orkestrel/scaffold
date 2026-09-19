# Unit R1 audit — the claims under test

The subject is the uncommitted change in the **roughnotes** checkout at
`C:\Users\mikes\WebstormProjects\roughnotes`, against the clean baseline `b432653`. One unit wrote
it: it replaced this workspace's `mergeOverride` with the hardened version `@orkestrel/scaffold`
committed at `f83ee063`, and added a conformance case per behaviour the hardening adds.

The hardened code survived four adversarial audit rounds in scaffold. **Audit the port and its
proofs, not the design those rounds settled.**

Evidence:

- `tmp/audit/r1-diff.patch` — the complete diff.
- `tmp/audit/r1-status.txt` — `git status --short` at dispatch.
- `.orkestrel/roughnotes/r1-brief.md` — what the unit was asked to do.
- `.orkestrel/roughnotes/r1-report.md` — its own account. A claim, never evidence.
- The source of truth for the port:
  `C:\Users\mikes\WebstormProjects\scaffold\vite.config.ts` at commit `f83ee063`. Read it there;
  never write in that checkout.
- The retained red scripts and logs under `tmp/units/`.

Re-derive every number you rule on.

## The claims

Rule on each: `CONFIRMED`, `REFUTED`, or `UNSETTLED`, with the evidence that decides it.

1. `mergeOverride` and `isNamedPlugin` are byte-identical to scaffold's committed bodies. Compare
   them yourself.
2. Every difference outside those bodies is named in the unit's report and is justified: the TSDoc
   frame this workspace's policy requires, the summary clause naming a private application rather
   than a package, and the rewritten `@returns` line.
3. The `@returns` line states a property the hardened merge actually holds. The line it replaced
   claimed one entry per plugin name, which the hardened merge does **not** hold — a base repeating
   a name keeps both entries, and two caller entries sharing a name both survive.
4. Each behaviour the change adds has a conformance case, and each case has a recorded red produced
   by mutating the subject rather than the assertion.
5. Each new case carries an in-file control that must fail, and each control contrasts against the
   behaviour the first draft had.
6. Every existing conformance case stayed unedited and is green. In particular the Vue-plugin case
   still discriminates: it passes for a new reason, and its bare-merge control still reports the
   plugin twice and still fails.
7. The doc block's claim that `tests/config.test.ts` drives every registered factory through the
   refusal is true of the vendored file **in this checkout**, and that file's sentinel carries both
   `command` and `mode`, so the narrowed discriminant still refuses it.
8. No wrapper and no journey project changed its effective configuration, and the measurement
   supporting that carries a negative control that fails.
9. No vendored file changed, and nothing outside the unit's owned list moved.
10. The added code carries no `any`, no `as`, no non-null assertion, and no suppression comment.
11. No Sass deprecation line appears in the build or the test run.

## Where to look hardest

- **The `@returns` rewrite.** Read it against the code. State whether it now overstates or
  understates what the merge holds, and whether a reader could predict the base-repeats-a-name
  result from it.
- **The nested-entry residual.** The unit reports that a nested override entry can still put a
  duplicate plugin name into the resolved configuration, because the merge selects over top-level
  entries only and Vite flattens recursively later. State whether the doc block is honest about that
  limit, and whether the case added for it proves the stated behaviour rather than a deduplication
  the merge does not claim.
- **The red scripts are Python.** Scaffold's retained instruments are Node. State whether that
  matters for reproducibility in this checkout, and whether each script restores the file on every
  failure path.
- **The Vue-plugin case's new reason.** Under the first draft a name-keyed map collapsed two Vue
  entries; under the hardened merge the override's entry replaces the base's in position. State
  whether the case's assertions still bind the behaviour they name, or whether they now pass
  incidentally.
- **One mutation reddened two cases.** The unit reports that dropping the replacement also reddens
  the base-repeat case. State whether that is honest overlap or a sign that one case does not
  isolate its behaviour.

## Out of scope

The design of the hardened merge, which four rounds settled in scaffold. Any change to what this
application paints or builds. The release: no version bump and no publish is part of this work.
