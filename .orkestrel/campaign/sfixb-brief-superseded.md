# SFIX-B: make the guide's claims true, and give the toolchain comparison eyes

## Role and engine

Role `sol` implementer. Engine GPT-5.6 Sol, high effort, sandbox `workspace-write`, rooted at
`/home/user/scaffold`. You are the sole writer in this checkout for the duration of this unit.

## Objective

Close the findings an audit lens raised over `@orkestrel/scaffold` and an independent skeptic then
failed to refute. Two classes: a guide sentence that claims more than the code or the suite delivers,
and a comparison that cannot see the drift it exists to catch.

## Read first, in this order

1. `AGENTS.md` — in full
2. `.claude/rules/documentation.md`, `.claude/rules/tests.md`, `.claude/rules/writing.md`
3. `guides/scaffold.md` — the governing spec

## Sandbox warning, read before you plan

**Your sandbox refuses to write `.agents/`.** A unit before you got
`patch rejected: writing outside of the project; rejected by user approval settings` on
`.agents/orchestration.md`, while edits under `.claude/` were accepted. Nothing in this brief needs
`.agents/`. If you find yourself reaching for it, stop and report rather than finding another write
mechanism.

Your sandbox also denies a loopback listener, a nested install, an `rm -rf`, and a process one level
below a child you spawn. Use `rmdir` for an empty directory.

## The findings

**G1 — the guide claims a gate checks every backticked name.**

`guides/scaffold.md`'s Limits section says `tests/guides.test.ts` checks that every backticked name
in the file resolves. It does not: it checks Surface-table rows in both directions and named imports
in TypeScript fences, and nothing else. An inline span also names host globals, wire fields, external
contracts, and TypeScript syntax, so widening the gate would make it assert something it was never
built to check.

`@orkestrel/mcp` closed this exact claim by narrowing the sentence to the checks that run. Take the
same disposition unless you find a reason it does not apply here, and say so if you do.

**G2 — "the tests" is a false universal.**

`guides/scaffold.md` tells a reader to edit "the tests". `tests/policy.test.ts`,
`tests/setupPolicy.ts`, and `tests/config.test.ts` are vendored and content-owned: `repair` and
`overwrite` rewrite them on drift, so a reader who hand-edits one loses the edit without warning.
`scaffold audit --json` reports them as content-controlled rather than left alone.

Name which test files a reader owns and which the tooling restores. This is the package whose own
tooling does the restoring, so the guide must be exact.

**G3 — the restore row promises a write that does not happen.**

Read beside the row above it, `guides/scaffold.md`'s restore row promises a write creates an absent
birth-owned file. Only `materialize` into a vacant target does that. `repair` reports a deleted
birth-owned path as aligned and leaves it deleted. Reproduce this — delete a birth-owned file in a
scaffolded target under `tmp/`, run the audit, and read the status — then correct the row to what
happens.

**G4 — the advisory row states one branch as the whole rule.**

`guides/scaffold.md` says the advisory always names both a gate and a script line. The `ungated`
branch in `src/bin/CLI.ts` names only the gate, when a `test:<project>` script is already declared
but no gate chain invokes it. Correct the row to cover both branches.

**G5 — the error-code narrowing example omits the code every entity throws.**

`guides/scaffold.md`'s `ScaffoldErrorCode` narrowing example omits `DESTROYED`, which the union in
`src/core/types.ts` includes, which `Compiler` and `Materializer` both throw, and which the guide's
own method tables promise with "Every later call throws". Add it.

**G6 — the cycle diagnostic is unsound.**

`guides/scaffold.md` says an absent name in the layered catalog indicates a cycle. `catalogToLayers`
also skips a row whose registry lookup failed, so an absent name is as often a failed lookup. State
both causes, and say how a reader tells them apart.

**T1 — the toolchain comparison skips every non-`@orkestrel` key, and drift has already happened.**

`tests/src/core/constants.test.ts` compares `BASE_DEV_DEPENDENCIES` against scaffold's own manifest
but skips every key that does not start with `@orkestrel`. So a toolchain range scaffold hands to a
generated workspace can diverge from the one scaffold itself installs — and it has:
`src/core/constants.ts` declares `oxfmt` at `^0.62.0` while `package.json` carries `^0.64.0`.

Make the comparison cover every key. Then rule on the `oxfmt` divergence itself: decide which range
is correct and align them. State which you moved and why. Prove the repaired comparison fails against
a planted divergence and passes without it, planting in a file this unit owns and naming exactly how
you removed it.

**T2 — the guides project proves name resolution only.**

No assertion evaluates a guide fence or checks the value its trailing comment claims. Rule on whether
that gap is closable here without new capability, and either close it or state precisely what it
would take. This claim asks for a ruling and, if cheap, an implementation — not a new framework.

## Scope

- **Owned:** `guides/scaffold.md`, `guides/README.md`, `tests/guides.test.ts`,
  `tests/src/core/constants.test.ts`, `src/core/constants.ts` for the `oxfmt` range only, and
  `package.json` for the `oxfmt` devDependency range only.
- **Off-limits:** every other file, and `.agents/` entirely. Do not change the version. Do not touch
  `.orkestrel/`, `src/bin/`, or any other field of `package.json`. `package-lock.json` is off-limits:
  do not run `npm install` or `npm ci`, which would also destroy an unsaved dependency install this
  tree depends on to typecheck.

## A standing condition you must not disturb

`node_modules` holds an unsaved `@orkestrel/process` 0.0.4 tarball install. Without it
`src/bin/CLI.ts` cannot resolve `@orkestrel/process/server` and the tree cannot typecheck. Any
command that rewrites `node_modules` destroys it. Do not run `npm install`, `npm ci`, or
`npm update`.

If you change the `oxfmt` range in `package.json`, that changes a declared dependency **without
installing it**, which is intended: the range is the subject, and the Orchestrator reconciles the
install afterwards. Report it plainly.

## Host conditions

- The tree is committed and clean at `ee886cf`. Untracked `tmp/` files are expected.
- `guides/*.md` other than `guides/scaffold.md` and `guides/README.md` are refetched mirrors. Out of
  scope.
- The network is unavailable. Do not fetch.
- Do not run `npm run build`, tree-wide `npm run format`, or the whole `npm test`.

## Execution

Perform this assignment directly. Spawn nothing.

## Prohibitions

- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Each discards a
  working-tree change silently, and this tree has no other copy of your work. To undo your own edit,
  undo exactly that edit.
- Never commit, push, install, or read a credential.
- No `any`, no `as`, no `!`, no `@ts-ignore`, no `@ts-expect-error`, no `eslint-disable`.
- No mocks, behavioral fakes, module replacement, or framework spies.
- State no count in any prose you write, and never name a list item by its position. This repository
  is the home of the rule that says so.

## Acceptance criteria

Close them in this order and report each command with its exit code and counts.

1. G3's real behaviour is reproduced and recorded before the guide row changes. Paste the commands
   and their output.
2. The repaired `constants.test.ts` comparison fails against a planted divergence and passes without
   it. Record both readings and the exact plant-and-remove steps.
3. `node -e` printing `BASE_DEV_DEPENDENCIES.oxfmt` and `package.json`'s `devDependencies.oxfmt`
   shows the same range.
4. `npm run lint:check` exits 0.
5. `npm run check` exits 0.
6. `npx vitest run --config vite.config.ts --project src:core` exits 0. Report its counts.
7. `npx vitest run --config vite.config.ts --project guides` exits 0. Report its counts.

## Deviation contract

Stop and report if the objective itself conflicts with what you find: expected, found, exact
evidence, done or not done, and at most one short hypothesis. An ancillary choice — a wording, where
a paragraph sits — is yours to decide, record, and carry on from. Reaching for `.agents/`, for
`npm install`, or for any file outside the owned list stops the unit.

## Output

Write your report to `tmp/codex/sfixb-report.md` and make it your final message too. It contains: the
files you touched and what changed in each; G3's reproduction with its exact commands and output;
your ruling on G1, T1's `oxfmt` direction, and T2, each with the reason; the exact plant-and-remove
steps; each acceptance criterion with its exit code and counts; an **Observations** section for every
reading your sandbox denied; and anything you could not close. No process diary.
