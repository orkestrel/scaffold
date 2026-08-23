# What a published 0.0.50 actually reaches

Measured 2026-08-23, against `/home/user/orkestrel/indexeddb` with the packed candidate.

## The finding

**A repaired distribution proof does not reach a target that already has one.**

`blueprintToTestArtifacts` plans `tests/distribution.test.ts` at `ownership: 'presence'`:

```text
  tests/setup.ts                    ownership=birth    origin=template
  tests/setupBrowser.ts             ownership=birth    origin=template
  tests/src/browser/index.test.ts   ownership=birth    origin=template
  tests/distribution.test.ts        ownership=presence origin=template
```

Presence restores an absent path and never touches a present one. So `overwrite` against a target
holding a proof reports it unchanged, whatever the candidate's proof now says:

```text
0 of 121 planned paths drifted from the plan. Audit compared bytes at 109, existence at 5, and nothing at 7.
.agents/orchestration.md replaced (5 lines added).
1 written, 121 unchanged, 0 removed in /home/user/orkestrel/indexeddb.
```

One file written, and it was not the proof. The target's proof still contains no `RUNTIME_CONDITIONS`
— it is the pre-FIX-J text.

## The false green this produced, and how it was caught

The first single-target run reported `Tests 5 passed | 2 skipped`, exit 0, and proved nothing: it ran
the **old** proof. The write count is what exposed it — one path written, and the diffstat for
`tests/distribution.test.ts` empty. A run whose subject never arrived reports the same green as a run
whose subject passed.

This is the reason the FIX-J audit's demand mattered. Its subjective lane established that the
emitted proof executes nowhere in scaffold's own repository, because scaffold's
`tests/distribution.test.ts` is bespoke and presence ownership leaves it alone. The same ownership
rule that hides the proof from scaffold's own gates also withholds every repair from the fleet.

## This is the design, not a regression

Presence ownership is deliberate and the guide states it: a target that wrote a better proof keeps
it, and a target lacking one is reported as drift. The documented path for receiving a regenerated
proof is to delete the file and run a writing verb, which is what the guide already tells a
maintainer whose workspace gained a browser face.

So the rule is right and its consequence is sharp, and the consequence had not been stated anywhere:

- **A newly materialized workspace** gets the repaired proof.
- **An existing target** keeps its proof across every future `scaffold` release until someone deletes
  it. Publishing 0.0.50 does not repair the fleet's proofs.

## What follows for this release

- The fleet re-propagation must delete `tests/distribution.test.ts` before the writing verb, or it
  measures the old proof on every target and reports eleven green readings that mean nothing.
- The reach limit belongs in the guide, beside the ownership rule, so a maintainer knows a scaffold
  release does not update the proof they already have.
- Whether scaffold should offer a verb that replaces a generated proof it still owns — distinguishing
  "the package wrote its own" from "the package holds an older generated one" — is a design question
  for a successor, not a change to make inside a release round.
