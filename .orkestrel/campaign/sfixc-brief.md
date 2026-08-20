# SFIX-C: carry the toolchain alignment into the tests that consume it

## Role and engine

Role `sol` implementer. Engine GPT-5.6 Sol, high effort, sandbox `workspace-write`, rooted at
`/home/user/scaffold`. You are the sole writer in this checkout for the duration of this unit.

## Objective

A unit before you raised `BASE_DEV_DEPENDENCIES` to match this package's own manifest, and **stopped
under its deviation contract** because two test files consume that constant and its brief did not own
them. It was right to stop; the scoping error was the dispatcher's.

Close the tree. `npm run check` is green; `npx vitest run --config vite.config.ts --project src:core`
is RED, and making it green is your whole objective.

## What already landed, at `a4e9488`

- `src/core/constants.ts` — `oxfmt` `^0.64.0`, `oxlint` `^1.79.0`, `vite` `~8.2.1`, `vitest`
  `^4.1.11`, each matching `package.json`.
- `tests/src/core/constants.test.ts` — the comparison now reaches every key, proved by a planted
  divergence.
- `guides/scaffold.md` — six corrected claims.
- `tests/guides.test.ts` — executable examples.

None of that is yours to revisit.

## The failure you are closing

Raising the ranges changes the manifest a generated workspace receives, which changes its digest.
`tests/src/core/compilers.test.ts` asserts the old digest and the old ranges:

```text
Expected: b96f5ba814a45d8b683eaf2d5b6e062827fa388cfcc78895e57c76fc72d5b99b
Received: 985b411df26f45c51548e15fc11017b0566c0df4992e435c47c2e2fa8146c750

- "oxfmt": "^0.62.0"      + "oxfmt": "^0.64.0"
- "oxlint": "^1.77.0"     + "oxlint": "^1.79.0"
- "vite": "~8.2.0"        + "vite": "~8.2.1"
- "vitest": "^4.1.10"     + "vitest": "^4.1.11"
```

`tests/src/bin/CLI.test.ts` also consumes the constant. Check it and carry it if it needs carrying.

**Read every expectation you change.** A digest is a golden value: regenerating it is correct only
when the input changed for the reason you believe. Confirm each changed range is one of the four
above and nothing else moved, and say so in your report. If a fixture changed for any other reason,
stop and report.

## Rule the digest's own worth while you are here

A golden digest that a unit regenerates whenever it fails proves nothing after the first
regeneration. Rule, in one short section of your report, on whether this assertion earns its place:
what it catches that the per-range comparison beside it does not, and whether it should be a digest,
an explicit expectation, or removed. Do not act on that ruling — record it. `AGENTS.md` § Design laws
and `.claude/rules/tests.md` decide it.

## Scope

- **Owned:** `tests/src/core/compilers.test.ts`, `tests/src/bin/CLI.test.ts`, and any fixture either
  reads that carries the four ranges or the digest.
- **Off-limits:** `src/`, `guides/`, `package.json`, `package-lock.json`, `vite.config.ts`,
  `tests/src/core/constants.test.ts`, `tests/guides.test.ts`, and every other file. The vendored
  host — `AGENTS.md`, `CLAUDE.md`, `.agents/`, `.claude/`, `.codex/`, `.cursor/`,
  `configs/helpers.ts`, `scripts/*.sh`, `tests/config.test.ts`, `tests/policy.test.ts`,
  `tests/setupPolicy.ts` — is owned by this package's own vendoring and restored by `repair`. Do not
  change the version.

## A standing condition you must not disturb

`node_modules` holds an unsaved `@orkestrel/process` 0.0.4 tarball install. Without it
`src/bin/CLI.ts` cannot resolve `@orkestrel/process/server` and this tree cannot typecheck. Any
command that rewrites `node_modules` destroys it. **Do not run `npm install`, `npm ci`, or
`npm update`.**

## Host conditions

- The tree is committed and clean at `a4e9488`. Untracked files under `tmp/` are expected, including
  a scaffolded target a previous unit left at `tmp/codex/sfixb-g3-target/` with its `README.md`
  deliberately deleted. Leave it alone.
- **Your sandbox denies a loopback listener, a nested install, an `rm -rf`, a process one level below
  a child you spawn, and a write to `.agents/`.** Template proofs that spawn a child cannot pass
  inside it. Never work around a denial and never change a test to suit your sandbox. Report each
  denied reading as an observation naming the exact command; the Orchestrator takes it on the host.
- Use `rmdir` for an empty directory and `rm -f` for a single file.
- The network is unavailable.
- Do not run `npm run build`, tree-wide `npm run format`, or the whole `npm test`.

## Execution

Perform this assignment directly. Spawn nothing.

## Prohibitions

- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Never commit, push, install, or read a credential.
- No `any`, no `as`, no `!`, no `@ts-ignore`, no `@ts-expect-error`, no `eslint-disable`.
- No mocks, behavioral fakes, module replacement, or framework spies.
- State no count in any prose you write, and never name a list item by its position. This repository
  is the home of the rule that says so.

## Acceptance criteria

Close them in this order and report each command with its exit code and counts.

1. Every expectation you changed is accounted for: name each one, the old value, the new value, and
   why it moved. A value you cannot explain stops the unit.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npx vitest run --config vite.config.ts --project src:core` exits 0. Report its counts. This is
   the objective.
5. `npx vitest run --config vite.config.ts --project src:bin` exits 0. Report its counts, or report
   it as a denied observation with the exact host command.

## Deviation contract

Stop and report if the objective itself conflicts with what you find: expected, found, exact
evidence, done or not done, and at most one short hypothesis. An ancillary choice — a comment's
wording — is yours to decide, record, and carry on from. A fixture that changed for a reason outside
the four ranges is not ancillary: it stops the unit.

## Output

Write your report to `tmp/codex/sfixc-report.md` and make it your final message too. It contains: the
files you touched; every changed expectation with its old value, new value, and reason; your ruling
on whether the digest assertion earns its place; each acceptance criterion with its exit code and
counts; an **Observations** section for every denied reading with its exact host command; and
anything you could not close. No process diary.
