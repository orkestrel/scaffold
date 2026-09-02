# Unit contract-fixup — close the contract unit's audit findings

## Role and engine

`implementer` on Claude Opus 5, a native subagent (the Sol bench is dark; substitution recorded).
You perform the assignment directly and spawn nothing.

## Objective

The contract unit's audit findings are closed in `@orkestrel/contract` at commit `d24e79c`: the
guide describes the package as it now is, the two engine classes share one verb for the container
branches of their walk, the raw errors the engines throw carry their door's name rather than an
interned class name, the renamed import sits in sorted position, and every finding the objective
lane adds below is closed as ruled.

## Context

**Findings from the subjective lane, each with its ruling** (`.orkestrel/campaign/fix/units/contract-audit-verdict.md`):

1. **`guides/contract.md:425`** still says `schemaToShape`'s recursion is carried by "the five
   exported internals" listed above it; those rows are gone and the walk is interned in
   `SchemaShaper`. Ruling: rewrite the sentence to name `schemaToShape` as the sole entry and state
   that its walk is interned, in the wording the guide already uses for `canonicalStringify` at
   `:557`. No count.
2. **`guides/contract.md:549`** (`readSampleMemo` row) still says both sample doors call it before
   storing a schema and that either door reaches a caller-supplied `WeakMap` and `Map`. After the
   unit there is one sample door and `SampleInferer` builds its own memo (`SampleInferer.ts:61`);
   the function's TSDoc at `helpers.ts:404-414` already says so. Ruling: rewrite the row to the
   TSDoc's account, under `samplesToSchema`'s name, dropping the caller-supplied framing.
3. **Verb alternation across the sibling engines.** `ValueInferer` names its container branches
   `#walkArray` and `#walkRecord`; `SampleInferer` names the same position `#inferRecords`. Ruling:
   one verb — rename `SampleInferer.#inferRecords` to `#walkRecords`; `#infer` stays the entry on
   both.
4. **Unsorted import.** `tests/setup.ts:69` places `matchesISOInstant` where `isValidISOInstant`
   sat. Ruling: move it to its case-insensitive sorted position.
5. **Interned class names in raw errors.** `SampleInferer.ts:175,179,211` and
   `ValueInferer.ts:217` throw `INTRINSICS.error('SampleInferer: …')` / `'ValueInferer: …'`; the
   door wraps the message but the raw error rides as `cause` and names a symbol absent from the
   barrel and the guide. Ruling: prefix each raw message with the door it serves
   (`samplesToSchema:` for `SampleInferer`, `valueToSchema:` for `ValueInferer`; `SchemaShaper`'s
   the same way under `schemaToShape:` if it throws with its own name). Move the tests that assert
   those messages.
6. **`canonicalizeValue` folded rather than interned** (claim 3, s03-01). Ruled by the
   Orchestrator as an amendment, no code change: the canonical walk holds only call-local state
   (an ancestors set, an encodings memo, a frame stack) and no entity state, so it is a pure leaf
   under "Functional core, imperative shell", and the finding's complaint — state parameters on
   published signatures — is closed by the fold. Leave `canonicalStringify` as it is.
7. **Mirrored tests for the three engine files.** Ruled by the Orchestrator: not required. The
   mirror rule in `.claude/rules/tests.md` places a test where one exists and the policy sweep
   passed; the engines are interned and driven at their doors (`inferers.test.ts`,
   `shapers.test.ts`). No new test file.
8. **Report count** ("121 call sites across 12 source files"): a retention artifact, not product
   prose; no change.

**Findings from the objective lane**, appended below under "Objective findings" when they arrive,
each with its ruling.

**Law.** `AGENTS.md`; `.claude/rules/names.md` (the vendored copy predates the vocabulary; the
landed text is quoted in `contract-brief.md` § Vocabulary); `.claude/rules/architecture.md`;
`.claude/rules/documentation.md` § Parity; `.claude/rules/tests.md`.

**Host.** Linux, bash. Repository `/home/user/fleet/contract`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch (`d24e79c`), `node_modules`
installed with the dev closure staged. Do not run `npm install`. The user may be working on
contract in another session; `origin/main` is at the merge base (`3193da1`) at dispatch and you do
not fetch, merge, or rebase.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/core/SampleInferer.ts`, `src/core/ValueInferer.ts`, `src/core/SchemaShaper.ts`,
`guides/contract.md`, `tests/setup.ts`, `tests/src/core/**` where a moved message or renamed
private needs it, and any file an objective finding below names.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, `src/core/helpers.ts` unless an objective
finding names it, every other file, every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the rulings in order,
run the word-boundary sweep for `inferRecords`, `SampleInferer:`, `ValueInferer:`, and
`SchemaShaper:` over `src`, `tests`, and `guides`, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the sweep and its hits; each gate command with its exit code and an excerpt for any
failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a ruling above contradicts a test the unit did not anticipate, or when a gate
fails for a cause you cannot attribute. Decide, record, and carry on from the wording of a guide
sentence or a message.

## Acceptance criteria

1. `guides/contract.md` names no exported spine as carrying `schemaToShape`'s recursion and
   describes `readSampleMemo` as the TSDoc does.
2. `rg -n 'inferRecords|SampleInferer:|ValueInferer:|SchemaShaper:' src tests guides` returns no
   hit.
3. `matchesISOInstant` sits in sorted position in `tests/setup.ts`.
4. Every objective finding below is closed as ruled.
5. The gate chain exits 0.
6. `git status --short` lists only owned files.

## Objective findings

Each with its ruling; these are part of this unit's scope and acceptance.

9. **`pinMembers` guide row** (`guides/contract.md`, the row saying "Every exported class calls it
   from a `static` block"): `SchemaShaper`, `ValueInferer`, and `SampleInferer` are `export class`
   declarations that call no `pinMembers` and are barrelled by nothing. Ruling: the sentence
   narrows to the classes the barrel publishes ("Every published class calls it from a `static`
   block"); the interned engines stay as they are.
10. **`SampleMemo`, `buildSampleMemo`, `readSampleMemo`** remain exported while no door accepts a
    caller-supplied memo. Ruling: they stay exported as the walk's own memo and its leaves (export
    and test reusable logic); finding 2's rewrite of the `readSampleMemo` row extends to the
    `SampleMemo` and `buildSampleMemo` rows so all three describe the memo `SampleInferer` builds
    for its own walk, and none describes a caller handing one in.
11. **s03-01 `canonicalizeValue`**: the objective lane corroborates that the fold is
    behavior-preserving (same stack machine, memo, refusals, and key sort; only the caller-supplied
    `ancestors` parameter and its restoring `finally` disappear). Ratified as an amendment in the
    ruling record by the Orchestrator; no code change (finding 6 stands).
12. **s03-22 radius** under-scopes the moved key set (the radius file lists only `describe`,
    `define`, `prototype`, `declare`, `parent`; `read`, `write`, `members`, `present`, `apply`,
    `construct` moved too). The Orchestrator's concern, not this unit's: every consumer brief names
    the full moved set and the compiler against the staged tarball is the scope.

Acceptance criteria 7 and 8 follow: 7. the `pinMembers` row names published classes; 8. the three
memo rows describe the walk's own memo.
