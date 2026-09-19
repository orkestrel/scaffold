# Unit 15 — retain the workspace-configuration proof

## Role and engine

`implementer` — Opus 5, native Claude subagent, this checkout, sole serial writer from the clean
committed baseline the Orchestrator names at launch.

## Objective

Give this workspace a home for proofs about its own configuration, and retain the proof unit 13
measured but could not keep.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md`, then `tmp/authority/rules/tests.md` — its workspace-proof table names
   the sanctioned project labels — plus `rules/workspace.md`, `rules/typescript.md`,
   `rules/quality.md`, `rules/writing.md`.
2. `.orkestrel/roughnotes/u13-report.md` — the proofs to retain, in its § 3, § 4 and § 7.
3. `tests/config.test.ts` — read it; do not edit it.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## The problem

Unit 13 changed this workspace's own `vite.config.ts` factories and measured their behaviour, but
could retain none of it. Its proof lives in `tmp/probe/override.test.ts`, which the `probe` workbench
collects, `npm test` never runs, and `.gitignore` excludes.

It had no owned file to put it in, and it was right about that. `tests/config.test.ts` is the obvious
home and it is **vendored**: `node_modules/@orkestrel/scaffold/dist/host/tests/config.test.ts` ships
it, `scaffold repair` restores it, and an edit there reverts silently and reports as drift in
`scaffold audit`. Do not edit it.

## The slot the model provides

`tests/config.test.ts` registers a workspace-proof project for any of the labels `policy`, `config`,
`guides`, `conformance`, `distribution`, `integration` whose `tests/<label>.test.ts` file exists,
each with include `tests/<label>.test.ts` and setup `./tests/setup.ts`. This workspace ships
`policy` and `config` and no others.

**`conformance` is the sanctioned, unused slot, and it is this workspace's own file rather than a
vendored one.** Take it.

Adding the file alone breaks the config gate: the vendored proof will then *require* a registered
project with that label. So the file, the factory, its registration, and its script land together.

## The work

1. **`tests/conformance.test.ts`** — the workspace's proof of its own configuration. Retain from unit
   13's probe:
   - an override reaches the returned browser configuration;
   - `appShowcase` differs from `appBrowser` only where a showcase differs, and restates nothing else;
   - an override reaches the showcase configuration;
   - the Vue plugin appears exactly once in every configuration these factories return, including
     when the caller's override carries plugins — with the **control** unit 13 wrote, proving a bare
     `mergeConfig` yields it twice, so the selection is shown to be load-bearing;
   - `mergeOverride` refuses a value carrying `command`, which is the Vitest invocation record a
     registered factory receives in the override position.
   Every one of those is an instrument, so each carries the control that must fail. Read
   `.claude/rules/quality.md` § Instruments before writing them.
2. **A `conformance` factory in `vite.config.ts`**, matching the shape `policy` and `config` already
   use, registered in `projects` as a function.
3. **A `test:conformance` script** in `package.json`, and `conformance` chained into `npm test`
   beside the other workspace proofs.

## Unknowns

- Where `conformance` belongs in the `npm test` chain's order. Rule on it; the chain currently runs
  app, journey, policy, config.
- Whether the vendored `tests/config.test.ts` asserts anything else about a `conformance` project
  beyond its include and setup — read it and say.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- The `conformance` project runs in Node with the browser disabled, like `policy` and `config`.
- `tests/config.test.ts` requires every entry in `projects` to be a function, and has a control that
  converts one entry to an inline configuration and must fail.
- Bootstrap emits 329 Sass deprecation warnings from its own imports. Standing condition.

## Scope

**Owned files:**

- New `tests/conformance.test.ts`
- `vite.config.ts` — only the `conformance` factory and its registration
- `package.json` — only the `test:conformance` script and the `test` chain

**Off-limits — do not edit, for any reason:**

- `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` — vendored
- everything under `app/` and `tests/app/`
- `guides/README.md`, `configs/`, `.orkestrel/`, `tmp/authority/`

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes. No `any`, `as`, `!`, or suppression comment.
4. `npm run test:conformance` runs the new project and passes.
5. Every assertion unit 13 measured is retained, including its two controls, and each instrument
   carries a control that must fail. Show each control failing — name the command and both counts.
6. `tests/config.test.ts` is unedited and its project passes, now requiring the `conformance` project
   it did not require before.
7. `npm test` exits 0 and runs the conformance project.
8. `npm run test:journey` is green for all four projects.
9. `npm run build` succeeds.

**Observations, not criteria:** the wall-clock durations; where you placed `conformance` in the chain.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a vendored file — stop and report if you believe you must. Do
not add a showcase wrapper, script, or dependency. Do not weaken an assertion to make a run green.

Where a detail is ancillary — a test's wording, the order of two independent assertions — decide it,
record it, and carry on.

## Output

Write your report to `tmp/units/u15-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **What is retained** — each assertion, and the control that proves it can fail.
3. **The controls' reds** — command and both counts per instrument.
4. **Rulings on the unknowns.**
5. **Observations.**
6. **What you did not close**, and why.

No process diary.
