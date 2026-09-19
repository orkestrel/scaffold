# Unit D1 — prove the vendored config test against an app-only workspace, then close the defect it catches

## Role and engine

`opus` — Opus 5, native Claude subagent, the **scaffold** checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, sole serial writer from a clean committed baseline.

**Why native rather than the Sol bench.** This unit's proof performs a nested `npm install` and a
nested `npm run` inside a generated workspace. `.agents/orchestration.md` § Bench laws records that a
bench sandbox denies a grandchild process and a nested install with `EPERM`, and that a Node process
spawned by a bench unit's own Node process has unreliable stdio, which fails as a false green. The
subject is therefore unmeasurable on a bench. Routing recorded rather than assumed.

## The defect

A case in `tests/config.test.ts` at line 2153 resolves a face project unconditionally:

```ts
const faces = ['core', 'browser', 'server']
const face = faces.find((candidate) =>
	existsSync(resolve(root, `configs/src/tsconfig.${candidate}.json`)),
)
if (face === undefined) throw new Error('The workspace declares no face project')
```

Every path it probes sits under `configs/src/`. A workspace with no `src` axis vendors no
`configs/src/` wrapper, so `face` is always `undefined` and the case throws.

That file is vendored: it ships as `dist/host/tests/config.test.ts` and every target receives it
through `scaffold repair`. So the case reddens **every app-only target that repairs**, and one has:
the roughnotes application, whose `npm test` exits 1 on exactly this case after adopting 0.0.72.

The defect is a relocation rather than a new fault. Commit `f4494c1b` on 2026-09-07 wrote this
`faces` walk to fix the same case hardcoding `configs/src/tsconfig.core.json`, which its message
records as reddening "every browser-only or server-only target". That change repaired the
environment axis and left the `src`-versus-`app` axis untouched, so the defect moved one level up. It
shipped in 0.0.71 and 0.0.72.

## Why nothing caught it

`tests/distribution.test.ts` builds a real generated workspace, installs it from a packed tarball,
and runs its gate chain — the case near line 930 ends on:

```ts
const gates = spawnSync(npm, ['run', 'prepublishOnly'], { cwd: target, /* omitted */ })
expect(gates.status, `${gates.stdout}\n${gates.stderr}`).toBe(0)
```

The machinery is sound. What it has never been pointed at is an app-only workspace. Every
`createBlueprint` call in that file declares a `src` axis:

```text
tests/distribution.test.ts:69   createBlueprint('router', { src: ['core'] })
tests/distribution.test.ts:662  core.createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })
tests/distribution.test.ts:930  createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })
```

Separately, `tests/distribution.test.ts:680` asserts `workspace.has('generated/tests/config.test.ts')`
— that the vendored file is **present**. Presence is not passage.
`.claude/rules/documentation.md` names that exact failure for prose: asserting that a sentence
appears is not asserting that it is true. The same holds for a vendored test.

`createBlueprint` takes `app` alongside `src` (`src/core/factories.ts:50-56`), each defaulting to an
empty list, so `createBlueprint('proof', { app: ['core', 'browser'] })` declares the app-only shape.

## Objective

Add a generated-workspace proof over an app-only blueprint that runs that workspace's own gates, watch
it fail on this defect, then close the defect and watch it pass.

Follow `AGENTS.md` § TTTDD: **record the exact command and its failing output before writing the
fix**, then record the same command green. A case that never ran red does not bind to the defect it
claims.

## The work, in order

1. **Add the app-only case** to `tests/distribution.test.ts`, modelled on the existing
   install-and-run-gates case. Reuse that case's machinery — the packed tarball, the `provisionNpm`
   floor handling, the lockfile assertions — rather than writing a second mechanism.
2. **Run it and record the red.** Capture the exact failure, which must be
   `The workspace declares no face project` arriving from the generated workspace's own
   `test:config` run. If the chain does not reach `test:config`, that is itself a finding: report it
   and say what the chain does run.
3. **Fix the case** in `tests/config.test.ts`.
4. **Rebuild**, so `dist/host` and `host.json` carry the corrected bytes. `npm run build` runs
   `build:host` and `build:inventory`, and every gate that reads a generated artifact must follow it.
5. **Re-run and record the green.**

## The fix's requirement, not its mechanism

The case must satisfy each of these. Choose the mechanism yourself and record the ruling with its
reasoning.

- A workspace with no `src` axis must not fail this case. It publishes no library, so it has no
  declaration roll-up to measure.
- A workspace that **has** a `src` axis but carries no face project must still fail. That is the
  condition the throw was written for and it stays reachable.
- The case must not silently pass while measuring nothing. A green that proves nothing is worse than
  the throw, because it hides the absence.

Unit M1 recommended guarding the throw on `existsSync(resolve(root, 'src'))`. Treat that as one
candidate, not as the decision. Rule on whether skipping, guarding, or asserting the precondition
serves a reader auditing this case, and say why the others lose.

## Unknowns

- **Whether an app-only generated workspace's `prepublishOnly` chain reaches `test:config`.** Not
  established. Establish it before relying on it, and report what the chain runs. If it does not
  reach `test:config`, invoke that project directly in the generated workspace and say that you did.
- **Whether an app-only blueprint generates cleanly at all.** No distribution case has built one.
  Report any blocker the compiler returns rather than working around it.
- **Whether other vendored cases also fail on an app-only workspace.** The new proof may redden on
  more than the face-project throw. Report every failure it surfaces. Fix only the face-project one
  in this unit and report the rest as findings.

## Scope

**Owned files:** `tests/distribution.test.ts`, `tests/config.test.ts`, and the generated artifacts
`npm run build` restages — `dist/`, `host.json`.

**Off-limits:** `src/`, `configs/`, `app/`, every other file under `tests/`, `.claude/`, `.agents/`,
`ROADMAP.md`, `package.json`, and `.orkestrel/`.

Do not bump the version and do not publish. The release decision is the owner's and is deliberately
not part of this unit. Do not commit or push. Install no new dependency.

Run no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

Never silence a rule: no `eslint-disable`, no `oxlint-disable`, no suppression comment, no `any`, no
`as`, and no non-null assertion. `AGENTS.md` bars each.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- Write any multi-step command to a script file and run the file. A heredoc, a `node -e`, or an
  `&&` chain trips the shell's approval classifier and stalls an unattended run.
- `npm run test:distribution` is the isolated project that runs these cases. It packs, installs, and
  runs a full gate chain in a temporary workspace, so it is slow — budget minutes, not seconds.
- The `tmp/` tree was swept at acceptance a moment ago, so write your instruments under `tmp/units/`
  and expect nothing there from an earlier session.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first. The rebuild precedes every gate that reads a generated artifact.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. The recorded red exists: the exact command, and the failure text naming the face-project throw,
   captured **before** the fix.
5. `npm run build` exits 0, and `host.json` plus `dist/host/tests/config.test.ts` carry the corrected
   bytes.
6. The same command from criterion 4 now exits 0.
7. `npm run test:distribution` exits 0 with its counts reported.
8. `npm test` exits 0 with per-project counts reported.
9. `git status --short` shows no path outside the owned list.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Stop and report where closing the defect
requires editing an off-limits file, or where an app-only workspace cannot be generated at all.

Settle these yourself and record each choice: the fix's mechanism, where the new case sits in the
file, its name, and how much of the existing case's machinery it shares versus restates.

## Output

Write your report to `tmp/units/d1-report.md`, and make your final message the same content: done or
not done per criterion; the recorded red with its exact command and output; the fix's mechanism and
why the alternatives lose; what the generated workspace's gate chain actually runs; every other
failure the app-only proof surfaced; and what you did not close.

No process diary.
