# Unit S4 — the journey axis is born with a browser application, and the manifest agrees with the wrapper

Fix round for the S audit (claims 1, 7, 10, 23 and findings F1, F4 of
`.orkestrel/campaign/s-audit-claims.md`; lane reports `.orkestrel/campaign/s-audit-objective-report.md` and
`.orkestrel/campaign/s-audit-subjective-report.md`; Orchestrator reproductions under
`.orkestrel/campaign/s-audit-reproduction/`). Unit S5 carries the skill and prose findings after
this unit lands; do not touch them here.

## Role and engine

`sol` on the Codex bench, model `gpt-6-astra` (the owner's standing substitution for
`gpt-5.6-sol`), inside `codex exec` under the `workspace-write` sandbox with
`-C C:/Users/mikes/WebstormProjects/scaffold`, the sole writer in that checkout. You open this
brief inside your own CLI; every later section is written for you.

## Objective

Make a browser application be born with the journey axis, make `audit` and `repair` report a
manifest that disagrees with the wrapper, pin the emitted `appJourney` factory's own collection and
browser enablement so the recorded mutations redden, and correct two TSDoc blocks whose stated rule
is not the implemented one.

## Context

**Evidence.** Measured by the Orchestrator on this host, 2026-09-17, at tip `0d03ec79`:

1. A fresh browser workspace has no axis (`c23-f1-probe.log.txt`, `c23-f1-probe.sh`):

   ```text
   $ node dist/bin/main.js new f1app --app browser --offline --target <scratch>
   wrapper present: no
   test:journey in scripts: 0
   appJourney in root: 0
   test chain: npm run test:app && npm run test:policy && npm run test:config
   ```

   `src/bin/CLI.ts:236` passes `setup: []` and no `journey` to `createBlueprint`, whose default is
   `false`. The design ruling D17 (`.orkestrel/campaign/design-verdict.md`) emits the axis "for
   every blueprint with `app` including `browser`"; the axis is inferred from the wrapper's
   presence on `audit` and `repair`, and at birth nothing writes the wrapper.

2. Writing the wrapper and running `repair` adds `test:journey` and `appJourney` and leaves the
   `test` chain unchanged; deleting the wrapper and running `repair` removes `appJourney` and
   leaves `test:journey` in the manifest; `audit` then reports nothing about it:

   ```text
   == write the wrapper, repair ==
   test:journey in scripts: 1      appJourney in root: 1
   test chain: npm run test:app && npm run test:policy && npm run test:config
   == delete the wrapper, repair ==
   test:journey in scripts: 1      appJourney in root: 0
   test chain: npm run test:app && npm run test:policy && npm run test:config
   == audit after deletion ==
   audit_EXIT=0   (no line mentions journey)
   ```

   `blueprintToWritableScripts` (`src/core/compilers.ts:459-463`) writes only `test:*` names other
   than `test:src` and `test:app`, and never removes an unplanned one; the `test` chain is not
   writable. The CLI's manifest question (`src/bin/CLI.ts:1036-1050`) reads `--project` names
   through `scriptToInvocations`, and `test:journey` names a `--config`, so it escapes.

3. Two mutations of the emitted `appJourney` factory leave every S1 control green
   (`c7-mutations-summary.txt`; the commands are in `c7-mutations.sh`): widening its
   `include: ['tests/app/browser/integration.test.ts']` (`src/core/templates.ts:359`) to
   `'tests/app/browser/**/*.test.ts'`, and setting its browser `enabled: true`
   (`src/core/templates.ts:364`) to `false`. `tests/src/core/compilers.test.ts:912` asserts the
   `appBrowser` exclusion string, which is a different site, and
   `tests/src/core/templates.test.ts:1078` never reads the factory's own `include` or `enabled`.

4. `tests/setupServer.ts:1530-1532` reads "Two forms sit outside the reading: an `import()` written
   in type position, which parses as a `TSImportType` node, and a load through a binding some other
   name holds." `readSpecifiers` (`:1572`) reads a `require` call only when its callee is the
   identifier `require`, so `require.resolve('pkg')` — a member-expression callee — is also
   outside the reading and the sentence omits it. The sentence also states a count.

5. `tests/setupPolicy.ts:1289-1290` reads "when its text names an `@orkestrel/` specifier";
   `:1307` gates on `fence.code.includes('@orkestrel/')`, which matches a comment or a string
   literal too. The implemented rule is the wider one and is right (it fails closed); the TSDoc
   states the narrower one.

**Law.** `AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `patterns.md`,
`tests.md`, `workspace.md`, `documentation.md`, `writing.md`. Skill: none. Guide:
`guides/scaffold.md` (the `new` verb, the questions, the journey axis; keep every Summary cell equal
to its doc block, per `tests/guides.test.ts`).

**Installed primitives.** `@orkestrel/test` 0.0.17, `@orkestrel/guide` (parity through
`tests/guides.test.ts`).

**Host.** Windows 11. Your sandbox: PowerShell with script execution disabled, so run npm through
`npm.cmd run <script> -- <args>`; no network; `.git` read-only; no grandchild process, so `prove`
and a browser launch are unavailable — record such a proof as an observation naming the exact
command. File writes can round-trip through cp1252: never rewrite a line carrying a non-ASCII
code point through your shell; edit such a file only through your own patch tool, and report every
line you touched that carries one. Vitest scoped runs write a temporary config under
`node_modules/.vite-temp`, which your sandbox permits.

**Measurements.** Baseline `0d03ec79`, clean. The Orchestrator's gate reading over that tree:
`.orkestrel/campaign/s3-gates-summary.txt`, `s3b-gates-summary.txt`, `s3-2-gates-summary.txt`
(every stage exit 0 except the `build:host` staging precondition, which the full `build` clears).
`npm run test:src:core` reads `Tests 425 passed (425)`; `npm run test:src:bin` reads
`Tests 258 passed (258)`; `npm run test:config` reads `Tests 173 passed | 1 skipped (174)`;
`npm run test:setup` reads `Tests 161 passed | 3 skipped (164)`; `npm run test:guides` reads
`Tests 23 passed (23)`.

**Control identifiers.** `S4-C1` through `S4-C6`. Name a test for what it proves, never for the
control label.

**Standing conditions.** `host.json` reads stale after a vendored edit (`tests/setupServer.ts`,
`tests/setupPolicy.ts` are vendored) until the Orchestrator's build; the inventory case in
`test:config` reddens for that reason alone. `.orkestrel/campaign/` is untracked and off-limits.
The three manifest fixtures under `tests/src/core/fixtures/` carry `^0.0.17`; a change to the
default blueprint moves whichever of them carries a browser application, and you update that
fixture from the run.

## Unknowns

- Whether the `test` chain question already fires as a `differing` question on `repair` when the
  wrapper is present and the chain lacks `test:journey`. The probe tailed four lines of the repair
  report and saw none. Read the CLI's script comparison (`src/bin/CLI.ts` after `:1050`), run the
  case, and report what fires today before adding the arm this brief rules; if the existing
  question already names the missing invocation, extend its message rather than adding a second
  question for the same fact.

## The rulings to implement

1. **Birth.** In `src/bin/CLI.ts` `#create`, pass `journey: app.includes('browser')` to
   `createBlueprint`, so `new --app browser` writes the birth-owned wrapper, emits `appJourney`
   and the `app:browser` exclusion in the root, plans `test:journey`, and invokes it from `test`.
   A workspace without a browser application is unchanged. `setup` stays `[]`.
2. **Agreement.** Extend the CLI's manifest question (`src/bin/CLI.ts:1036-1050` and its
   invocation reader) so a `test:*` script whose invocation names `--config <path>` reports, in
   the same non-blocking question and the same `configs` group, when `<path>` is neither a path
   the plan emits nor a file present in the target — worded for a configuration the way the
   existing text is worded for a project. Add the reverse arm: when the plan emits `test:journey`
   and the manifest's `test` chain does not invoke `npm run test:journey`, report a non-blocking
   question naming the missing invocation and where it goes (after `npm run test:app`). `repair`
   writes neither the `test` chain nor an unplanned script; both stay report-only.
3. **Pins.** In `tests/src/core/templates.test.ts` (the case at `:1078`) assert, against the
   emitted root text, that the `appJourney` factory's own body carries
   `include: ['tests/app/browser/integration.test.ts']` and `enabled: true`, matched inside the
   factory rather than anywhere in the file. Record each mutation from evidence item 3 red against
   that case and green restored.
4. **`readSpecifiers` TSDoc.** Rewrite `tests/setupServer.ts:1530-1532` without the number,
   naming each form outside the reading: an `import()` in type position (`TSImportType`), a load
   through a binding some other name holds, and a `require` reached through a member expression
   such as `require.resolve`. Add the member-expression case to `tests/setupServer.test.ts` beside
   the existing `createRequire` case, asserting the reading omits it.
5. **`inspectSkillImports` TSDoc.** Restate `tests/setupPolicy.ts:1289-1290` as the implemented
   rule: a refused fence reports when its text carries an `@orkestrel/` substring anywhere,
   comments and string literals included, because error recovery drops the statements after the
   failure.
6. **Guide.** Update `guides/scaffold.md` where it describes the `new` verb's blueprint, the
   journey axis, and the questions, so each sentence names the emitted behaviour after this unit.
   Keep every Summary cell equal to its doc block.

## Scope

**Owned.** `src/bin/CLI.ts`, `src/core/compilers.ts`, `src/core/types.ts` (only if the question
shape must widen), `tests/src/bin/CLI.test.ts`, `tests/src/core/compilers.test.ts`,
`tests/src/core/templates.test.ts`, `tests/src/core/fixtures/*.txt` (the manifest fixtures the
default moves), `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setupPolicy.ts`,
`guides/scaffold.md`.

**Shared (report-only).** None.

**Off-limits.** `src/core/templates.ts` (the emitted factory text is right; the pins go in the
tests), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.test.ts`, every file
under `.agents/`, `.claude/`, `.codex/`, `.cursor/`, `ROADMAP.md`, `host.json`, `package.json`,
`package-lock.json`, `.orkestrel/**`.

**What asserts the state this change ends.** `tests/src/bin/CLI.test.ts` (the `new` default and
both question arms), `tests/src/core/compilers.test.ts:912-937` (journey wiring), the three manifest
fixtures, `tests/src/core/templates.test.ts:1078`, `tests/setupServer.test.ts`,
`tests/guides.test.ts` (Summary parity), `tests/config.test.ts` (the inventory case, after the
Orchestrator's build).

**Tools and limits.** Your patch tool and shell. No commit, push, install, tree-wide `format` or
`lint --fix` or `build`, and no `git checkout`, `git restore`, `git stash`, `git reset`,
`git clean`. Format and lint only your owned files with
`.\node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --write <files>` and
`.\node_modules\.bin\oxlint.cmd --config .oxlintrc.json --deny-warnings <files>`.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing.

## Output

Return, as your final message, the report: the diff stat and `git status --short`; each ruling's
landing site; each control's command with its red and green readings; the answer to the unknown;
every non-ASCII line you touched; the gate table (scoped format and lint over owned files,
`npm.cmd run check`, `npm.cmd run test:src:core`, `test:src:bin`, `test:config`, `test:setup`,
`test:guides`) with exit codes and totals lines; the claims you flag as least certain. No process
diary. The Orchestrator takes the report from `--output-last-message`.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle question wording, test names,
and where in `guides/scaffold.md` a sentence sits. Stop and report if ruling 2 needs a change to
`Question`'s shape beyond an optional field, if the existing `differing` question already covers
the reverse arm in a way that makes ruling 2's second arm a duplicate (report which and stop), or
if a manifest fixture outside the three named moves.

## Acceptance criteria

Cheap first.

- **S4-C1.** `new --app browser` in a scratch target (a CLI test through the real command, as the
  existing `CLI.test.ts` scratch-target cases do) writes `configs/app/vite.journey.config.ts`,
  emits `appJourney` in `vite.config.ts`, plans `test:journey`, and its `test` chain invokes it
  after `npm run test:app`; `new --app core` writes none of those. Red before ruling 1, green
  after.
- **S4-C2.** With the wrapper deleted from a generated browser target, `audit` reports a
  non-blocking `configs`-group question naming `test:journey` and its unresolved `--config` path;
  with the wrapper present and `test:journey` removed from the chain, `audit` reports the missing
  invocation. Red before ruling 2, green after, each arm its own case.
- **S4-C3.** The `templates.test.ts` pin reddens under each of the two mutations in evidence
  item 3 and passes restored; record the three readings.
- **S4-C4.** `tests/setupServer.test.ts` reads `require.resolve('pkg')` as outside the reading;
  `grep -n "Two forms" tests/setupServer.ts` matches nothing; the TSDoc names the three forms.
- **S4-C5.** `tests/setupPolicy.ts:1289-1290` states the substring rule; `npm.cmd run test:policy`
  and `npm.cmd run test:setup` exit 0.
- **S4-C6.** Scoped format and lint over owned files exit 0; `npm.cmd run check` exit 0;
  `test:src:core`, `test:src:bin`, `test:guides`, `test:setup` exit 0.

**Observations, not criteria.** `test:config`'s inventory case until the Orchestrator's build; the
whole `npm test` chain; anything needing a browser.

## Review evidence

The actual diff and the actual `git status --short` output, in the report.
