# Unit D2 audit — the claims under test

The subject is the **whole change** in the scaffold checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, uncommitted on top of `53d4a58e`: unit D1's work, unit
D2's corrections to it, and the Orchestrator's integration of D2's returned shared-file patch.
D2 was written by Opus 5.

`tests/config.test.ts` is a **vendored published surface**. It ships as
`dist/host/tests/config.test.ts` and reaches every target through `scaffold repair`, so a defect here
propagates to every consumer on the next release. This change is being prepared for that release now.

## What came before

Round one rejected D1 on both lanes. The blocking finding was that D1's skip predicate,
`existsSync(resolve(root, 'src'))`, accepted a regular file, an empty directory, a directory holding
no recognized environment, and a case-folded name — so the original defect survived in a narrower
population. D2 was dispatched to close that and the round's other findings **without changing the
mechanism**: the case stays split, the scope half stays conditioned by a skip, and no guard replaces
it.

Read `.orkestrel/scaffold/d1-audit-verdict.md` for the reconciliation, and
`.orkestrel/scaffold/d2-report.md` for D2's account. The report is a claim, never evidence.

## Evidence

- `tmp/audit/d2-diff.patch` — the actual diff. This is the subject.
- `tmp/audit/d2-status.txt` and `tmp/audit/d2-head.txt` — the actual working-tree state, captured
  live. **Trust these over any session-start snapshot in your own context; that snapshot is stale and
  has already produced one false scope allegation in this campaign.**
- `.orkestrel/scaffold/d2-prefix.log.txt` — the four workspace shapes measured before the fix.
- `.orkestrel/scaffold/d2-postfix.log.txt` — the same four shapes after it.
- `.orkestrel/scaffold/d2-gates.log.txt` — the definitive gate chain.
- `.orkestrel/scaffold/d2-instruments/` — the instruments that produced them.
- The live tree: `tests/config.test.ts`, `tests/distribution.test.ts`, `tests/setupServer.ts`,
  `tests/setupServer.test.ts`, `host.json`.

Re-derive every number you rule on.

## The claims

Rule on each: `CONFIRMED`, `REFUTED`, or `UNSETTLED`, with the evidence that decides it.

1. The skip predicate now derives from a physical source environment — the environment names
   filtered by a directory test — and matches what `isPhysicalDirectory` at
   `src/server/helpers.ts:412-415` and `targetToEnvironments` at `src/bin/helpers.ts:899-903` do,
   including their treatment of a symbolic link.
2. A workspace declaring a recognized source environment and vendoring no
   `configs/src/tsconfig.{core,browser,server}.json` still fails with
   `The workspace declares no face project`. The recorded run in `d2-postfix.log.txt` shows it.
3. A workspace carrying an unrelated `src` entry — a regular file, or an empty directory — no longer
   fails the scope case. The pre-fix run shows both shapes failing and the post-fix run shows both
   skipping.
4. The re-taken skip measurement is uncontaminated: its workspace sits in the operating system's
   temporary directory with no `node_modules` reachable by walking up, and it reports
   `171 passed | 3 skipped (174)` against this checkout's `173 passed | 1 skipped (174)`.
5. The module-scope constant is named `publishes`, matching the term this file and
   `src/core/compilers.ts` already use for the same fact, and the two case-locals it collided with
   were qualified rather than renamed to a second synonym.
6. The skip comment now states only what a reader can check in their own output, and the case name
   carries its condition in the bracket form this repository already uses.
7. `installPackedScaffold`, `installGeneratedWorkspace`, and `readManifestVersion` now live in
   `tests/setupServer.ts` and are imported rather than declared in the test file, which is what
   `.claude/rules/tests.md` § Shared test infrastructure requires. Every `expect` stayed in the
   cases.
8. `installGeneratedWorkspace` returns the facts its callers need, so neither caller rebuilds the
   materialization path and neither re-parses a manifest the helper already parsed.
9. No comment in `tests/config.test.ts` or `tests/distribution.test.ts` carries the word `here`.
10. The added and moved code carries no `any`, no `as`, no non-null assertion, and no suppression
    comment.
11. Nothing was modified outside `tests/config.test.ts`, `tests/distribution.test.ts`,
    `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `host.json`, and no version was bumped.
12. `host.json` and `dist/host/tests/config.test.ts` carry the corrected bytes, and the digest D2
    reports for both — `be9396127a75212a23e8a8578ed86d03b271d5f6f51c903469133fc5cac6caf0` — is the
    real digest of the file.

## Where to look hardest

Unprompted hazards. Rule on each as a finding if it is real. **This half matters most: the release
that ships this is being prepared now.**

- **Does the vendored file import anything that is not vendored?** `tests/config.test.ts` ships to
  every target. `tests/setupServer.ts` does **not** ship — the host set is `config.test.ts`,
  `policy.test.ts`, and `setupPolicy.ts`. State every module the vendored file imports, and whether
  each resolves inside a target that receives only the vendored set. A vendored test importing a
  module targets do not receive is a release that reddens every target on `repair`.
- **The case-insensitive decision.** D2 deliberately kept `SRC/CORE` resolving as a source
  environment, arguing the repository's own derivation folds case the same way. Rule on whether that
  is right, and on whether a target on a case-sensitive filesystem and one on a case-insensitive
  filesystem now disagree about whether the same tree publishes.
- **`lstatSync` against `isPhysicalDirectory`.** State whether the two agree on every input that
  matters: a symbolic link to a directory, a junction, a broken link, and a directory the process
  cannot stat. Name any input where the test and the mechanism it claims to match diverge.
- **The helper move's blast radius.** `tests/setupServer.ts` is loaded by other setup consumers.
  State whether moving `NPM_LAUNCHER`, `readManifestVersion`, and the two install helpers there adds
  a load-time cost, a new import edge, or a cycle for any consumer that does not use them.
- **Throws replacing assertions inside the helpers.** Each former `expect` became a throw. State
  whether any diagnostic got weaker — a failure that used to name the actual and expected values and
  now names only a message.
- **The returned shape.** `TestGeneratedWorkspace` and `TestGeneratedPin` are new exported
  contracts. Rule them against `AGENTS.md` § Design laws: single-word entity members, readonly
  properties, types in the right file, and whether the sub-entity earns its existence.
- **The scope sentence D2 flagged.** D2 added a sentence naming the blueprint's coverage limit into a
  comment it was rewriting. The round-one verdict listed that finding as recorded-and-not-carried,
  so the brief did not carry it and D2 flagged the overrun itself. State whether the sentence is
  accurate; the Orchestrator has ruled on whether it stays.
- **What the target actually sees.** A target that repairs receives the new vendored bytes. State
  what changes in its own `npm test` output, and whether any target could redden on this change
  rather than on the defect it closes.

## Out of scope

The release decision, and the mechanism. Whether scaffold bumps and publishes is the repository
owner's. The split and the skip are settled by round one and are not reopened; a finding that asks
for a guard or for the single case to return will be dropped.
