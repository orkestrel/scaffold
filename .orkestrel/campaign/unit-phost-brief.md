# Unit P-host: probe's remaining host adaptations

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/probe`. You perform the assignment directly and spawn nothing.

## Objective

Close probe's remaining Windows test failures honestly: the four RuntimeStage proofs whose
FIXTURES call raw `symlinkSync(..., 'dir')`, and the four bin signal proofs whose mechanism
this host does not deliver. After this unit, probe's `src:server` and `src:bin` projects run
green on this host with every skip citing its measured mechanism.

## Context

Authority: `AGENTS.md`; `.claude/rules/tests.md` (a conditional skip cites the probed
mechanism, never the platform; probe host-varying properties at runtime),
`.claude/rules/typescript.md`, `.claude/rules/writing.md`. Skill: none.

Host facts, measured 2026-08-21: `symlinkSync` with type `'dir'` throws `EPERM` here; type
`'junction'` succeeds for directories and satisfies `lstatSync().isSymbolicLink()`,
`realpathSync` resolution, and refusal semantics identically (the whole link family in
`@orkestrel/test`'s own suite runs on junctions here). `child.kill('SIGTERM')` and
`child.kill('SIGINT')` on this host TERMINATE the child without running its signal handlers —
the outcome is `{ code: null, signal: 'SIGTERM' }` — so "the entry runs its graceful teardown
and exits 0 on a signal" is mechanism-absent through the `child.kill` door. The sibling
`tests/src/server/stages/LintStage.test.ts` already carries this wave's precedent: a
`readHostEnding(signal?)` runtime probe measuring how this host reports a killed child, and a
`context.skip` with a measured-mechanism citation for a fixture that cannot construct its
condition here. Follow those idioms.

The current failures (probe `test:src`, 2026-08-21, after units B and C):

- `src:server` RuntimeStage: `names the declared test path when the workspace is reached
  through a symbolic link` (fixture `symlinkSync(..., 'dir')` at ~`:119`), `refuses a generated
  specification beneath a symbolic link` (~`:153`), `preserves workspace classification when
  cleanup crosses a symbolic link`, and `raises progress for the caller's run and lowers it
  before the stage's cleanup` (this one's last reading was an `ENOENT` on a
  `.probe-cache/.../results.json` — its fixture may fail earlier in setup; diagnose it and
  report what it actually was).
- `src:bin`: `leaves the target clean when SIGTERM reaches the entry during boot`, `... during
  service`, and the SIGINT pair — all asserting `{ code: 0, signal: null }` where this host
  reports `{ code: null, signal: 'SIGTERM' | 'SIGINT' }`.

`dist/bin/main.js` was rebuilt by the Orchestrator against the current sources before this
dispatch; the bin suite drives a current artifact.

## The design

1. In `tests/setupServer.ts` (which carries this wave's `REFUSED_RUNTIME_TARGETS` probe —
   follow its idiom), add a capability constant probing whether this host creates a directory
   link the walker reads as a symbolic link: attempt `symlinkSync(target, link, 'dir')`; on
   `EPERM` attempt `'junction'`; true when either landed AND `lstatSync(link).isSymbolicLink()`
   holds. Name it for the mechanism (the test package's own suite calls the equivalent
   `DIRECTORY_LINKS`; that name is fine here too), and export beside the existing probe.
2. In `tests/src/server/stages/RuntimeStage.test.ts`, for each of the four proofs: convert the
   fixture's `symlinkSync(..., 'dir')` to `'junction'` and gate the proof
   `it.runIf(DIRECTORY_LINKS)`. The proofs' subjects — refusal and classification when a path
   crosses a symbolic link — are exactly what a junction exercises on this host, so they should
   PASS converted. A proof that still fails after conversion for another cause is a deviation:
   report it with the exact failure, do not patch `src/**`.
3. In `tests/src/bin/main.test.ts`, for the four signal proofs: probe the mechanism at runtime
   in the file's own helper idiom — spawn a short-lived real child that installs a SIGTERM
   handler exiting 0, `child.kill('SIGTERM')`, and read whether the handler ran (exit 0) or the
   host terminated it (`signal` set). Where the handler cannot run, the proof's condition
   cannot be constructed through this door: skip with the citation naming the measured
   mechanism and what remains unproven (the graceful path is unmeasured HERE, not proven
   correct), per the LintStage closed-input precedent. Do NOT weaken the assertions to accept
   the killed shape — a hard kill does not prove the "leaves the target clean" subject, whose
   Windows-side truth (sweep on next boot) is proven elsewhere (the orphan-sweep proofs).
4. `package.json`: add `"prepack": "npm run build"` to `scripts`, directly before
   `prepublishOnly` (the fleet-wide prepack adoption; the manifest is already modified by the
   tarball install — your line rides it, touch nothing else in the file).

## Scope

- Owned: `tests/setupServer.ts`, `tests/src/server/stages/RuntimeStage.test.ts`,
  `tests/src/bin/main.test.ts`, and in `package.json` the one `scripts.prepack` line.
- Off-limits: `src/**`, `guides/**`, every other file.
- Standing conditions, expected: the tree carries this wave's units (B, C) and the earlier
  session's modifications across `src/server/stages/`, `tests/`, and `guides/probe.md`, plus
  the tarball-installed `@orkestrel/test` in `package.json`/lockfile. Leave everything not
  yours. `tests/src/bin/main.test.ts` already carries a `/usr/bin/script` TTY skip and other
  host adaptations from the earlier session — follow their idiom and leave them.
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly the owned files to the standing entries.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned test/setup files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server tests/src/server/stages/RuntimeStage.test.ts`
   exits 0 on this host; report totals and name every skip with its gate.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:bin`
   exits 0 on this host; report totals; the four signal proofs are skipped with their measured
   citation (or passing, if your runtime probe finds the handler DOES run — report which).
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server`
   — report totals as an observation.
7. `node -p "JSON.parse(require('node:fs').readFileSync('package.json','utf8')).scripts.prepack"`
   prints `npm run build`.

## Output

The diff; raw output and exit code per criterion; the runtime probe's readings; the diagnosis
of the `raises progress` proof's actual failure; any deviation. No process diary.

## Deviation contract

Stop on: a converted proof failing for a non-fixture cause; the bin probe reading contradicting
the measured host facts; a criterion needing an off-limits file. Helper names, probe fixture
shapes, and skip wording are yours: decide, record, carry on.
