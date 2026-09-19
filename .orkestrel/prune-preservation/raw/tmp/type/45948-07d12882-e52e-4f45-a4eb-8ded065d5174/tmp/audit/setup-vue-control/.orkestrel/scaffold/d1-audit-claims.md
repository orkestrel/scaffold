# Unit D1 audit — the claims under test

The subject is unit D1 in the **scaffold** checkout at `C:\Users\mikes\WebstormProjects\scaffold`,
uncommitted on top of `53d4a58e`. It was written by Opus 5.

D1 changed a **vendored published surface**. `tests/config.test.ts` ships as
`dist/host/tests/config.test.ts` and reaches every target through `scaffold repair`, so a defect
here propagates to every consumer on the next release. Audit it on those terms.

## What D1 was asked to do

A case in `tests/config.test.ts` resolved a face project by probing only `configs/src/tsconfig.*.json`
and threw `The workspace declares no face project` when none existed. Every app-only workspace has no
`src` axis, so the case failed on all of them. It shipped in 0.0.71 and 0.0.72 and reddens the
roughnotes application today.

D1 was told to add a generated-workspace proof that catches the defect, record the failing run, then
close it — and to choose the fix's mechanism itself against three requirements:

- a workspace with no `src` axis must not fail the case;
- a workspace that has a `src` axis but no face project must still fail;
- the case must not silently pass while measuring nothing.

## Evidence

- `tmp/audit/d1-diff.patch` — the actual diff. This is the subject.
- `tmp/audit/d1-status.txt` — the actual working-tree status.
- `.orkestrel/scaffold/d1-brief.md` — what the unit was asked to do.
- `.orkestrel/scaffold/d1-report.md` — its own account. A claim, never evidence.
- `.orkestrel/scaffold/d1-red.log.txt` — the recorded failure, before the fix.
- `.orkestrel/scaffold/d1-green-2.log.txt` — the same command after the fix and rebuild.
- `.orkestrel/scaffold/d1-skipreport.log.txt` — the skip measured in a real app-only workspace.
- The tree itself: `tests/config.test.ts`, `tests/distribution.test.ts`, `host.json`.

Re-derive every number you rule on. Do not accept a count from the report.

## The claims

Rule on each: `CONFIRMED`, `REFUTED`, or `UNSETTLED`, with the evidence that decides it.

1. The face-project scope reading now sits in a case guarded by `it.skipIf(!published)`, where
   `published` is `existsSync(resolve(root, 'src'))`, and the original
   `The workspace declares no face project` throw is unchanged inside it.
2. A workspace carrying a `src` axis but no `configs/src/tsconfig.{core,browser,server}.json` still
   reaches that throw and still fails. The condition reads the axis directory, not the wrapper.
3. The host-independent helper readings — `parseProjectScope` refusals, `isStringList`,
   `buildExtractorOverride`, `packageManifestName`, `rewriteCoreSpecifier`, `isExtractorModule` —
   now run unconditionally, and none of them requires a `src` axis to be meaningful.
4. The skip is visible in the run output rather than silently passing. In an app-only workspace the
   `config` project reports one more skip and no more passes than this checkout does.
5. The new `tests/distribution.test.ts` case reaches the vendored `tests/config.test.ts` inside a
   real generated workspace, through that workspace's own declared `test` script.
6. An app-only generated workspace declares no `prepublishOnly` script, and the new case asserts its
   absence, so a future release that starts emitting it reddens here.
7. The two extracted helpers — `installPackedScaffold` and `installGeneratedWorkspace` — preserve the
   pre-existing core/server install case's behaviour exactly. Nothing that case asserted before is
   asserted less now.
8. `host.json` is regenerated consistently with the edited vendored bytes, and
   `dist/host/tests/config.test.ts` carries the corrected source.
9. The recorded red is genuine: it ran before the fix existed, and its failure is the face-project
   throw arriving from the generated workspace rather than from this checkout.
10. The diff adds no `any`, no `as`, no non-null assertion, and no suppression comment.
11. Nothing outside `tests/config.test.ts`, `tests/distribution.test.ts`, and `host.json` was
    modified, and no version was bumped.

## Where to look hardest

Unprompted hazards. Rule on each as a finding if it is real. **This half matters most: the changed
file is vendored into every target.**

- **The skip condition's shape.** `existsSync(resolve(root, 'src'))` tests a directory. State what
  happens for a workspace that carries a `src` directory holding something other than a published
  library, for a workspace whose `src` exists but is empty, and on a case-insensitive filesystem
  where `SRC` exists. Say whether any of those readings is wrong.
- **Collection-time evaluation.** `published` is computed at module scope, and `it.skipIf` is
  evaluated during collection. State whether `root` is correct at that moment and whether a workspace
  generated during the run could be measured against the wrong root.
- **The count change.** The `config` project moved from 173 to 174 because the case split in two.
  State whether anything else in this repository — a fixture, a golden digest, an expectation, a
  generated manifest, another test — asserts against the old count or against the old case name.
  A case NAME changed, and a name is an interface.
- **The helper extraction.** This refactor touches a case D1 was not asked to change. Read the
  pre-existing core/server case before and after. State whether any assertion was dropped, weakened,
  reordered, or moved behind a condition, and whether either helper silently changes the environment
  or the install flags that case used.
- **Vendored-surface consequences.** The new case name and the split reach every target through
  `repair`. State what a target that already carries the old file sees at its next repair, and
  whether any target's own gates could redden on the change rather than on the defect.
- **Coverage honesty of the chosen blueprint.** The new case uses
  `createBlueprint('proof', { app: ['core', 'server'] })`. State whether that shape genuinely
  exercises the defect's population, and whether an `app: ['browser']` workspace — which is what
  roughnotes actually is — would be caught by this proof or would slip past it.
- **The skip as a permanent hole.** After this change, no workspace without a `src` axis ever runs
  the scope reading. State whether anything now proves the scope reading itself still works, and
  where that proof lives.

## Out of scope

The release decision. Whether scaffold bumps and publishes is the repository owner's, and no lane
rules on it. Report a release consequence as a finding; do not recommend a release.
