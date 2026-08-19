# Implementation unit — admit a foreign peer in a scaffold blueprint

You are the sole serial writer in `/home/user/scaffold`, from a clean committed baseline.
Read `AGENTS.md`, `.claude/rules/architecture.md`, `.claude/rules/names.md`,
`.claude/rules/typescript.md`, `.claude/rules/tests.md`, and `.claude/rules/documentation.md`
before editing. No dispatch-named skill applies.

## Objective

Let `Blueprint.peers` carry a foreign peer such as `typescript` at a floor range, while fleet peers
keep the caret discipline, and close the defect the widening makes reachable.

The rule, in one sentence a developer must be able to predict: **a peer in the `@orkestrel` scope is
a fleet pin; every other peer is a floor.**

## The design is already ruled. Implement it; do not redesign it.

Two independent design lanes agreed on the substance. Where they differed, the ruling below is the
Orchestrator's and is final.

1. **Partition by the literal scope prefix**, `peer.name.startsWith('@orkestrel/')`. Do NOT
   partition by whether `DEPENDENCY_NAME_PATTERN` matches: a malformed reserved name such as
   `@orkestrel/router.core` must stay on the fleet branch and fail its name rule there, never
   escape into the foreign branch.
2. **Call `dependenciesToQuestions` twice** over the two partitions. Its signature does not change,
   it gains no mode, no selector, and no discriminator. Both calls report `field: 'peers'`. Do not
   add a `DependencySyntax` type or any selector function: that is published surface for an
   internal need, and `AGENTS.md` refuses it.
3. **Rename `EXTRA_NAME_PATTERN` to `FOREIGN_NAME_PATTERN`**, value byte-identical. It is about to
   govern two lists, so its current name would state a falsehood. It has exactly three consumers:
   its declaration at `src/core/constants.ts:278`, the import at `src/core/compilers.ts:28`, and
   the call at `src/core/compilers.ts:1795`, plus one guide row at `guides/scaffold.md:105`.
   Rewrite its `@remarks` to state the membership rule — a name this package does not publish,
   which therefore reaches no path — rather than "development extra".
4. **Add `FLOOR_RANGE_PATTERN`** as `/^>=(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/`. It
   admits only `>=` with a canonical three-component version. It refuses `>=6`, `>=6.0`, `>6.0.0`,
   `>= 6.0.0`, `^6.0.3`, `~8.2.0`, `6.0.0`, a prerelease, and a compound such as `>=6.0.0 <7.0.0`.
   It is byte-identical to `ENGINES_PATTERN` at `src/core/constants.ts:299` and must still be its
   own constant, because the two obligations are independent: `engines` floors the Node runtime a
   workspace supports and a peer floors a tool the consumer supplies, and either can move without
   the other. Its TSDoc carries that reason.
5. **Close the toolchain shadow.** This is measured, not hypothetical. Running
   `blueprintToDevDependencies` today over `peers: [{ name: 'typescript', range: '>=6.0.0' }]`
   returns `typescript: '>=6.0.0'`, overwriting the shared pin `^6.0.3` that a baseline blueprint
   returns. `src/core/compilers.ts:237` is the line. A peer whose name `BASE_DEV_DEPENDENCIES`
   already pins must not overwrite that pin; a fleet peer not in that baseline still lands in
   `devDependencies`, because a peer is not installed by the workspace that declares it and
   developing against one requires it present. Verify the fleet case still yields
   `@orkestrel/router: '^0.0.10'`.

## Owned files

- `src/core/constants.ts`
- `src/core/compilers.ts`
- `src/core/types.ts` — documentation only. `Blueprint.peers` keeps its type. The `@remarks`
  claiming `dependencies` and `peers` are both runtime `@orkestrel/*` packages becomes false and
  must state the scope rule instead.
- `guides/scaffold.md` — the `EXTRA_NAME_PATTERN` row at `:105`, new rows for both constants in
  alphabetical position, and the paragraph near `:590` stating that a blocking question closes
  `Blueprint.peers` to `@orkestrel/*`. That sentence becomes false; rewrite it around the scope
  rule and keep the distinction it draws between `Blueprint.peers` and the emitted `peers` binding.
- `tests/src/core/compilers.test.ts`

## Off-limits — do not edit

`src/bin/CLI.ts`, `src/core/helpers.ts`, `src/core/validators.ts`, `PROBE.md`, every other file.

Each is deliberate and each would break something real if widened:

- `src/bin/CLI.ts:905` collects fleet catalog rows and `:990` validates `--deps`, which names
  packages the registry is asked about. A foreign name must never reach a registry lookup.
- `src/core/helpers.ts:789` is why `manifestToDependencies` can promise every row is a fleet
  dependency, and why `audit` and `overwrite` touch only fleet ranges. Widening it would have
  `overwrite` start rewriting a target's `typescript` pin.
- `src/core/validators.ts` needs nothing: `isDependency` is structural, and `isDependencyName`
  stays narrow because `Mirror` and `CatalogEntry` reach fleet paths through it.
- `DEPENDENCY_NAME_PATTERN`, `ORKESTREL_RANGE_PATTERN`, and `EXTRA_RANGE_PATTERN` keep their exact
  values. The first is the only closure on the `nameToGuide` path-safety property.

## Proof discipline

Insert the failing proof before the fix and record both counts.

1. Before editing, run the narrowest relevant project and record the exact command and its failing
   count for a new case asserting `blueprintToQuestions` returns no question over
   `peers: [{ name: 'typescript', range: '>=6.0.0' }]`. It must fail first.
2. Implement.
3. Run the same command and record it green.

## Tests this owes, in `tests/src/core/compilers.test.ts`

Each row is a separate assertion, and the negative controls are drawn from outside the widened set,
which is what makes the instrument discriminate rather than merely pass.

| Proof | Assertion |
| --- | --- |
| Foreign peer admitted | `peers: [{ name: 'typescript', range: '>=6.0.0' }]` yields no question |
| Fleet peer may not floor | `peers: [{ name: '@orkestrel/router', range: '>=0.0.10' }]` yields a blocking `peers` question |
| Foreign peer may not pin | `peers: [{ name: 'typescript', range: '^6.0.3' }]` yields a blocking `peers` question |
| Malformed fleet name stays on the fleet branch | `peers: [{ name: '@orkestrel/router.core', range: '^0.0.10' }]` yields a blocking `peers` question |
| No traversal enters the widened door | `peers: [{ name: '@orkestrel/../etc', range: '>=1.0.0' }]` yields a blocking question |
| Toolchain pin survives a peer | `blueprintToDevDependencies` with the `typescript` floor peer returns `typescript: '^6.0.3'` |
| A fleet peer still reaches devDependencies | the same call with `@orkestrel/router ^0.0.10` returns that exact range |
| The artifact carries both facts | `blueprintToManifest` emits `peerDependencies.typescript` as `>=6.0.0` while `devDependencies.typescript` stays `^6.0.3` |
| `FLOOR_RANGE_PATTERN` rows | the admit and refuse sets named in item 4, beside the existing pattern block near `:33` |

`tests/src/core/compilers.test.ts:521-560` carries a comment asserting the constraint this change
removes, and its fixture uses `@orkestrel/emitter` precisely because a foreign peer was
unreachable. Replace the fixture with `vitest` and rewrite the comment. A comment stating a removed
constraint is a defect of the same kind as a wrong return value.

Confirm `tests/src/core/constants.test.ts` still passes untouched: the base pins do not move.

## Execution

Perform this assignment directly and spawn nothing. Do not install dependencies, commit, push, or
run a tree-wide mutating gate. Validate read-only and scoped to your owned files:
`npm run check`, then `npx vitest run --config vite.config.ts --project src:core`.

The exec sandbox mounts `.git` read-only, so every `git` command that takes the index lock fails.
Restore a file by rewriting its text, and prove it with `git diff --exit-code -- <file>`.

## Deviation contract

Stop and report if the primary objective conflicts with what you find: expected, found, exact
evidence, done or not done, and at most one short hypothesis. Do not investigate beyond that or
alter the plan. An ancillary choice — where a paragraph sits, which heading a row takes — is yours
to decide, record, and carry on from.

## Acceptance criteria

1. `blueprintToQuestions` admits a foreign peer at a floor and refuses a foreign peer at a pin.
2. Fleet peers still require the caret; a fleet-scoped malformed name still fails on the fleet branch.
3. `blueprintToDevDependencies` no longer overwrites a `BASE_DEV_DEPENDENCIES` pin with a peer range.
4. `FOREIGN_NAME_PATTERN` replaces `EXTRA_NAME_PATTERN` at every consumer, with no compatibility alias.
5. `npm run check` exits 0 and the `src:core` project passes.
6. Guide rows and the falsified paragraph are corrected.

## Output

Return only: the files you changed with a one-line reason each, the failing count before and the
green count after with their exact commands, any deviation, and anything you decided that the brief
left open. No process diary.
