# Unit F1 — report

Every A1 finding's fix landed. `npm run check`, `test:src:core`, `test:policy`, and `test:guides`
exit 0. `test:src:server` and `test:src:bin` are red on the stale committed inventory alone, proved
below against a scratch copy carrying a regenerated `host.json` — the standing condition the brief
named for `test:config`, which reaches these two suites as well because the fixes edit
`guides/scaffold.md` and `.agents/skills/.../wave.md`, both staged paths.

## Touched files

| File                                                    | Change                                                                        |
| ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `src/core/constants.ts`                                 | `CANON_PATHS` remarks state the origin invariant and the deliberate overlap   |
| `src/core/helpers.ts`                                   | `inferGroup` docs-row comment states what the row holds                       |
| `src/core/compilers.ts`                                 | `blueprintToDocumentArtifacts` `@returns` names the pointers, drops the count |
| `src/core/templates.ts`                                 | `AGENTS.md` pointer body resolves `.agents/skills/` on each side              |
| `src/bin/CLI.ts`                                        | `now` removed from the advisory message and its comment                       |
| `src/server/helpers.ts`                                 | `filesToHost` `@example` witnesses a host-owned path with live bytes          |
| `tests/setupServer.ts`                                  | `STAGED_PATHS` and `createCheckout` remarks: invariant, members over counts   |
| `tests/policy.test.ts`                                  | skill-family case reads the canonical root as a literal, not the constant     |
| `README.md`                                             | the split stated without the "tool surface" coinage                           |
| `guides/scaffold.md`                                    | every false-universal location plus the one-term fix                          |
| `.agents/skills/orkestrel-publish/references/wave.md`   | step 3's consequence names the red policy gate                                |
| `tests/src/core/templates.test.ts`                      | pointer assertions extended to every read subject on each side                |

```text
 .../skills/orkestrel-publish/references/wave.md    |  6 ++-
 README.md                                          | 12 ++---
 guides/scaffold.md                                 | 63 +++++++++++++---------
 src/bin/CLI.ts                                     |  4 +-
 src/core/compilers.ts                              |  4 +-
 src/core/constants.ts                              | 16 ++++--
 src/core/helpers.ts                                |  4 +-
 src/core/templates.ts                              |  8 +--
 src/server/helpers.ts                              |  8 ++-
 tests/policy.test.ts                               | 10 +++-
 tests/setupServer.ts                               | 14 ++---
 tests/src/core/templates.test.ts                   | 10 ++--
 12 files changed, 100 insertions(+), 59 deletions(-)
```

## A — the false universal

**A1 `src/core/constants.ts`, `CANON_PATHS` remarks.**

Was:

> the installed package. No plan claims one, no target receives one, and the `AGENTS.md` and
> `CLAUDE.md` pointers scaffold plans are what name those two locations.
>
> The two sets are disjoint. A path in both would be planned into a target and withheld from it at
> once.

Now:

> the installed package. No host-origin artifact claims one, so no target receives the canon itself,
> and the `AGENTS.md` and `CLAUDE.md` pointers scaffold plans are what name each location.
>
> The one deliberate overlap sits on the plan rather than on these lists:
> `blueprintToDocumentArtifacts` plans those pointers at the `AGENTS.md` and `CLAUDE.md`
> destinations as this package's own template content, and the `canon` advisory subtracts exactly
> the paths that compiler plans.
>
> `HOST_PATHS` and `CANON_PATHS` are disjoint. A path in both would be copied into a target as a
> host artifact and refused by the overlay that keeps a host artifact current, at once.

The disjointness sentence names `HOST_PATHS` and `CANON_PATHS` instead of the count, and its
rationale is restated to one that is true: `filesToHost` takes floor bytes for a canon destination
and the CLI fetch list drops it, so a path in both sets would be written into a target and refused
by the overlay at once.

**A2 `guides/scaffold.md`, the groups paragraph.**

Was: `No group carries the instruction canon. A plan never claims a `CANON_PATHS` member, so no group
selection reaches one and no verb writes one into a target.` plus the pointer sentence.

Now:

> No group carries the instruction canon. No host-origin artifact claims a `CANON_PATHS` member, so
> no group selection reaches a staged contract and no verb copies one into a target. The one
> deliberate overlap is on the plan: the `docs` group carries the `AGENTS.md` and `CLAUDE.md`
> pointers that name where each contract is read instead, planned at those canon destinations as
> this package's own template content.

`writes` became `copies` in the second clause because `repair` does write at those paths.

**A3 `guides/scaffold.md`, the staged-for-reading paragraph.**

Was: `A release stages every one of them and no plan claims one, so no target receives a copy.`

Now:

> A release stages every one of them and no plan claims those staged bytes, so no target receives a
> copy of a contract. At the `AGENTS.md` and `CLAUDE.md` destinations a target receives the pointers
> instead: different content at the same paths, planned as this package's own template content.

**A4 `guides/scaffold.md`, the canon-question paragraph.**

Was: `No verb writes or deletes a canon path, so refusing `repair` over this question would block
every write on a gap no write can close.`

Now:

> No verb writes or deletes a path this question names, because the subtraction removes exactly the
> paths a plan claims, so refusing `repair` over this question would block every write on a gap no
> write can close.

**A5 `guides/scaffold.md`, the one-reading sentence.**

Now:

> `HOST_PATHS` and `CANON_PATHS` are disjoint. A path in both would be copied into a target as a
> host artifact and refused by the overlay that keeps a host artifact current, at once.
> `isCanonPath` is the one reading of canon membership, matching a member and anything beneath a
> member that is a directory, so staging, the live overlay, and the executable's advisory never
> disagree about what a path is. The document compiler deliberately plans the `AGENTS.md` and
> `CLAUDE.md` pointers at canon destinations as this package's own template content, and the
> advisory subtracts exactly the paths that compiler plans.

`the compiler` in the never-disagree list became `staging`, because the compiler's reading is the
one the advisory subtracts rather than one of the three that agree.

**A6 `tests/setupServer.ts`.** `STAGED_PATHS` remarks now read `The stager walks `HOST_PATHS` and
`CANON_PATHS` alike … No host artifact claims a canon path, which is why {@link buildFleetManifest}
stays on `HOST_PATHS` while {@link createCheckout} and {@link buildCheckoutManifest} read this.`,
replacing `both lists`, `No plan claims a canon path`, and `the two checkout fixtures`.

The literal phrase `two lists` sat in the adjacent `createCheckout` remarks rather than in
`STAGED_PATHS`. The A1 ruling on claim 10 covers the phrase wherever it appears, so I fixed it
there too: `The stager reads {@link STAGED_PATHS} out of core, where `HOST_PATHS` and `CANON_PATHS`
are fixed and no test can vary either`. Recorded here as an item-6 extension, not a new finding.

## B — writing-law hits

**B7 `src/core/compilers.ts`.** `@returns The birth-owned package front page and the two
content-owned root instruction pointers.` → `@returns The birth-owned package front page and the
content-owned `AGENTS.md` and `CLAUDE.md` pointers.`

**B8 `src/bin/CLI.ts`.** `the installed package now supplies` → `the installed package supplies`;
`and now stages them for reading instead` → `and stages them for reading instead`. No test asserts
that message text (`grep -rn "now supplies\|superseded instruction" tests/ src/` returns only the
source line).

## C — the inverted comment

`src/core/helpers.ts`. Was `// The licence and the root instruction documents are the workspace's own
prose.` Now:

```ts
// The row holds the licence, the workspace's own front page, and the
// scaffold-owned root pointers. The group carries placement rather than
// authorship, so `Ownership` is what separates them.
```

## D — one term for the vendored set

**D10 `README.md`.** Was `The tool surface is vendored: every target receives its own copy, and the
verbs write it and compare it.` Now:

> Every target carries its own copy of the vendored set — its toolchain, its policy proofs, its
> harness wiring — and the verbs write it and compare it.

The canon list and the checkout/installed fallback sentence are unchanged apart from re-wrapping.

**D11 `guides/scaffold.md`, the intro.** Was `That root stages the tool surface and the instruction
canon … `HOST_PATHS` names the tool surface: every target receives a copy`. Now:

> That root stages the vendored set and the instruction canon, and a target meets them differently.
> `HOST_PATHS` names the vendored set — the toolchain, the policy proofs, the harness wiring — and
> every target carries its own copy, which the verbs write and compare.

This agrees with the already-shipped `HOST_PATHS` is the vendored set at the vendored-data-root
section. `grep -rn "tool surface" README.md guides/ src/ tests/ .agents/` returns nothing.

## E — the wave's red gate

`.agents/skills/orkestrel-publish/references/wave.md`, the visit's canon-deletion step. Was `so a
visit that skips this step leaves the target holding instructions nothing updates and the question
firing on the next audit.` Now:

> and this deletion cannot be deferred past the quality gates: `scaffold overwrite` has already
> replaced the target's `AGENTS.md` with the pointer, which carries no rule map, so
> `inspectPolicyRuleMap` reports `the rule map names every rule file` for every file a kept
> `.claude/rules` directory still holds and the policy sweep is red until this deletion runs.

Verified against `tests/setupPolicy.ts:1653-1678`: the inspector returns `[]` only when
`.claude/rules` resolves to nothing, and otherwise reports one violation per rule file absent from
the root instruction file's rule map. The steps are named by their commands rather than by their
numbers, per `.claude/rules/writing.md`.

## F — the pointer body's fourth resolution

`src/core/templates.ts`. The sibling bullet gained `` `../scaffold/.agents/skills/` `` and the
installed bullet gained `` `node_modules/@orkestrel/scaffold/dist/host/agents/skills/` ``. The
installed spelling is what `pathToStorage('.agents/skills')` yields (`agents/skills`), and both
sibling paths exist in this checkout. Every `@` stays inside a code span and no template token was
added; `tests/src/core/templates.test.ts`'s import and placeholder cases still pass.

`tests/src/core/templates.test.ts` extends rather than weakens the pin: the case now asserts each
read subject on each side, adding the rules directory on both sides as well as the skills tree.

**Failing first.** With the baseline `src/core/templates.ts` restored under the extended assertions,
in a scratch copy:

```text
 FAIL  |src:core| tests/src/core/templates.test.ts > pointer documents > names the sibling checkout and the installed copy for each canon contract
AssertionError: expected '# AGENTS.md\n\nThe `@orkestrel/scaffo…' to contain '`../scaffold/.agents/skills/`'
 Test Files  1 failed (1)
      Tests  1 failed | 31 skipped (32)
```

With the fixed template in the same copy: `Tests 1 passed | 31 skipped (32)`.

## G — the false example

`src/server/helpers.ts`, the `filesToHost` `@example`. Was:

```ts
filesToHost([{ path: 'AGENTS.md', lookup: 'found', hex: '23204167656e74730a' }], floor)
// { manifest: { entries: [ … ], roots: [ … ], digest: '…' }, bytes: { 'AGENTS.md': '…' } }
```

Now:

```ts
// A floor declaring the host-owned `scripts/codex.sh` path and the canon
// `AGENTS.md` destination. The script's live bytes are taken; the canon
// destination keeps the floor's.
filesToHost([{ path: 'scripts/codex.sh', lookup: 'found', hex: '23212f62696e2f73680a' }], floor)
// { manifest: { entries: [ … ], roots: [ … ], digest: '…' },
//   bytes: { 'scripts/codex.sh': '23212f62696e2f73680a', 'AGENTS.md': floor.bytes['AGENTS.md'] } }
```

**Falsified first, then proved**, both against `dist/src/server/index.js` from a scratchpad script.
The shipped example:

```text
shipped example result: undefined
claimed bytes['AGENTS.md'] === the live hex: false
```

The rewritten example, with a negative control dropping the host-owned row:

```text
defined: true
script bytes: 23212f62696e2f73680a
canon bytes: 23204167656e74730a === floor: true
control (no script row): undefined
```

## H — the vendored instrument

`tests/policy.test.ts`, the skill-family case. `const root = join(process.cwd(), SKILL_FAMILY_ROOT)`
→ `const root = join(process.cwd(), '.agents', 'skills')`, composed through `node:path` so no
separator literal is concatenated. The comment gained:

```ts
// The root is spelled here as literal segments rather than read from
// `SKILL_FAMILY_ROOT`, and that literal is what makes this read a second
// mechanism. Both sides reading the constant would move together when it drifts,
// so the case would stay green for every value the constant ever holds. Against
// the literal, a drifted constant desyncs the sides and reddens this case in a
// workspace that has the tree, while a workspace without one still passes on
// both readings being empty.
```

`SKILL_FAMILY_ROOT` stays imported and used by the planted-skill controls at
`tests/policy.test.ts:538-539`. No mirrored test pins this file's bytes: the references at
`tests/src/core/Compiler.test.ts:29` and `tests/distribution.test.ts:277` are membership rows only.

**Mutation probe**, run entirely in the scratch copy so the subject tree was never planted. All four
quadrants, each the named case run alone:

| case                | `SKILL_FAMILY_ROOT` | canonical root | result                                    |
| ------------------- | ------------------- | -------------- | ------------------------------------------ |
| baseline `0f22a45`  | `.agents/skills`    | present        | 1 passed                                  |
| baseline `0f22a45`  | `.agents/skill`     | present        | 1 passed — the tautology the round found  |
| F1                  | `.agents/skill`     | present        | 1 failed, `expected false to be true`     |
| F1                  | `.agents/skills`    | present        | 1 passed                                  |
| F1                  | `.agents/skills`    | absent         | 1 passed                                  |

The baseline case is green under both constant values, so it discriminated nothing; the F1 case
reddens on the drift and stays green where the tree is absent, which is exactly what its comment
claims.

## Scoped validation

| command                | exit | reading                                                        |
| ---------------------- | ---- | --------------------------------------------------------------- |
| `npm run check`        | 0    | root, `src:core`, `src:server`, `src:bin` all clean             |
| `npm run test:src:core`| 0    | Test Files 8 passed (8); Tests 373 passed (373)                 |
| `npm run test:policy`  | 0    | Test Files 1 passed (1); Tests 111 passed (111)                 |
| `npm run test:guides`  | 0    | Test Files 1 passed (1); Tests 17 passed (17)                   |
| `npm run test:src:server` | 1 | Tests 1 failed \| 417 passed (418) — stale inventory, see below |
| `npm run test:src:bin` | 1    | Tests 5 failed \| 201 passed (206) — stale inventory, see below |

`git status --porcelain` lists only the twelve owned files in the touched-files table.

Acceptance criterion 4, each pattern swept over `src/ tests/ guides/ README.md
.agents/skills/orkestrel-publish/`: `now supplies` 0, `now stages` 0, `tool surface` 0, `the two
content-owned` 0, `No plan claims one, no target receives one` 0.

**Observations, not criteria.** `test:config` exits 1 with exactly one failing case,
`keeps the committed host inventory aligned with the vendored checkout bytes`, naming
`.agents/skills/orkestrel-publish/references/wave.md, guides/scaffold.md, tests/policy.test.ts`. I
ran neither the full `npm test` nor `npm run build`.

## Deviation state

**One deviation, reported rather than repaired: the stale-inventory red reaches `test:src:server`
and `test:src:bin`, not `test:config` alone.** The brief's standing condition named `test:config`
because item H moves `tests/policy.test.ts`. Items A and E also edit staged paths —
`guides/scaffold.md` is a `HOST_PATHS` member and
`.agents/skills/orkestrel-publish/references/wave.md` sits under the `CANON_PATHS` member
`.agents/skills` — so three `host.json` digests move, and `readHostFloor()` in source mode reads the
repository against that committed inventory and throws.

Expected: acceptance criterion 2 green on all five suites. Found: two suites red on
`ScaffoldError: The vendored host cannot read the declared file at
.agents/skills/orkestrel-publish/references/wave.md`, thrown from `src/server/helpers.ts:1128`.

Evidence that the inventory is the whole cause:

- A freshly staged inventory (written to the scratchpad, never to `host.json`) differs from the
  committed one in exactly the three files this unit edited, plus the membership digest. No entry
  added, none removed, `roots` identical.
- In a scratch copy of the checkout carrying this unit's edits and a regenerated `host.json`,
  `src:bin` is `Test Files 3 passed (3); Tests 206 passed (206)`, and `src:server`'s only failure is
  `matchesExecutablePath` shelling out to `git ls-files` in a directory with no `.git` — an artifact
  of the copy, not of the change.

Settling command, which is the Orchestrator's because `host.json` is off-limits to this unit:
`npm run build` (or `npm run build:inventory`), then re-run `test:src:server`, `test:src:bin`, and
`test:config`.

Nothing else deviated. No quoted location failed to match. Two edits go slightly beyond the
enumerated item list, both recorded in place above and both inside this unit's stated objective of
stating the true invariant everywhere the false universal ships:

1. `guides/scaffold.md`, the `HOST_PATHS`-to-`CANON_PATHS` move paragraph: `what changes is that no
   plan claims it` → `what changes is that no host artifact claims it`, and the following clause
   scoped to `where no artifact is planned at that path`. The unscoped form is false for the
   pointer pair.
2. `guides/scaffold.md`, the Limits entry `No verb removes a superseded instruction copy`: added
   `so it replaces the `AGENTS.md` and `CLAUDE.md` copies with the pointers planned there and leaves
   every other copy alone`, which is what makes the following `audit` reports no drift against them
   true.

Markdown paragraphs I rewrote were re-wrapped to the file's ambient width; that accounts for the
line churn in `guides/scaffold.md` and `README.md` beyond the sentences quoted here.
