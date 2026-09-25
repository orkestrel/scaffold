# Unit RM-SCAFFOLD — forward the invocation mode, pin it, and prove the release branch fires

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/scaffold-rm` (branch `unit/rm`, cut from
scaffold's session branch at `BASE_COMMIT`). The `config` project spawns the linter and the end-to-end case spawns Vitest
and npm, a child's child a bench sandbox denies (`.agents/orchestration.md` § Bench laws, rule 5), so the unit runs on
the native writing lane. Read, in order: `/home/user/scaffold-rm/AGENTS.md`; the rules
`/home/user/scaffold-rm/.claude/rules/{workspace,tests,architecture,patterns,portability,typescript,names,documentation,writing,quality}.md`;
the design verdict `/home/user/scaffold/.orkestrel/veneer/release-mode-design-verdict.md`, which binds; and both
proposals it names (`/home/user/scaffold/.orkestrel/veneer/units/release-mode-design-planner-proposal.md` and
`release-mode-design-analyst-proposal.md` beside it), for their site lists and case designs. No skill applies.

## Objective

A project Vitest calls runs in the mode Vitest was invoked with, in every workspace scaffold generates and in scaffold
itself, so a distribution proof run with `--mode release` fails on missing evidence instead of skipping; the vendored
contract and an end-to-end case pin it.

## Context

- **The fix.** In `mergeOverride`, when the argument is the invocation record (it carries `command` and `mode`), return
  the base with `mode` set to the record's string `mode`, throwing when the record's `mode` is not a string; carry none
  of `command`, `isPreview`, or `isSsrBuild`; every other path of the merge is unchanged. The sites: the `vite` template
  in `src/core/templates.ts` (search `'command' in override`, with the comment above it), scaffold's own
  `vite.config.ts` (the same line), and the pinned text in `tests/src/core/compilers.test.ts` (the same line). The
  distribution template's `RELEASE` comment in `src/core/templates.ts` (search `MODE === 'release'`) names that the root
  factories carry the mode. `src/core/constants.ts` and `package.json` do not change.
- **The vendored contract.** `tests/config.test.ts` holds the case titled `emits every project as a factory so the
  release mode reaches its proof` and the case titled `keeps Vitest invocation fields out of project configurations`.
  Replace them with a case that drives every registered factory with a sentinel record and asserts each result carries
  the record's `mode` and none of its other fields, with controls that must fail: a factory that ignores the record, one
  that spreads it whole, and an inline entry. Title it for what it proves. The file keeps to `node:` modules and
  `vitest`.
- **The end-to-end pin.** In scaffold's own `tests/distribution.test.ts`, a case that exercises a generated consumer's
  configuration and distribution proof through npm against a local registry fixture that refuses `npm ping` (a
  `node:http` server on `127.0.0.1`, `listen(0)`, kept serving while the child runs), asserting the release run exits
  non-zero with the registry diagnostic and the ordinary run skips. A malformed configuration, a collection failure, a
  timeout, or an unrelated assertion must not satisfy the expected release failure.
- **Prose.** `guides/scaffold.md`'s release paragraph (search `--mode release`) gains the sentence that the root project
  factories carry the invocation mode into each project; update any guide or TSDoc sentence the change makes false.
- **Measurements already taken.** Under `--mode release`, a project test reads `test` in scaffold and in Veneer; a
  factory that returns `mode: invocation.mode` reads `release` and one that drops it reads `test`
  (`/home/user/scaffold/.orkestrel/veneer/units/release-mode-instruments/`).
- **Host.** Linux, bash; put `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`
  first on `PATH` (the system npm is 10.9.7 and fails `devEngines`). The npm registry answers from this host. The
  harness environment block may name another directory as the primary working directory; work in
  `/home/user/scaffold-rm` with absolute paths. Format only with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`.
  `dist/` is untracked and built by `npm run build`, which regenerates the vendored host inventory; run it after the
  source change and before any gate that reads `dist/`. Other checkouts run suites at the same time; a timing failure
  under load is an observation with its reading.

## Unknowns

- Whether any other scaffold test or fixture pins the old `mergeOverride` text or the old vendored cases (a golden
  digest over generated output, an inventory expectation). Derive the set by running the suites, and report each red
  with its fix.

## Scope

**Owned.** `src/core/templates.ts` (the `mergeOverride` span and comment, the `RELEASE` comment), `vite.config.ts`,
`tests/config.test.ts`, `tests/src/core/compilers.test.ts`, `tests/distribution.test.ts`, `guides/scaffold.md`, and every
test or fixture the change makes false, each named in the report. **Off-limits:** `src/core/constants.ts`,
`package.json`, `package-lock.json`, `.claude/**`, `.agents/**`, `.orkestrel/**`, and every file outside the owned set.
No git command that writes, no install, no `npm run format`; `npm run build` is allowed in this worktree.

## Execution

Perform the assignment directly and spawn nothing.

1. Write the replacement vendored case and the end-to-end case first, and run each red at baseline, recording the
   command and its failing count: `npx vitest run --config vite.config.ts --no-cache --project config -t "<title>"` and
   `npm run test:distribution -- -t "<title>"`.
2. Apply the fix at each site, then `npm run build`, then run both cases green.
3. Mutation: remove the forwarding line in `mergeOverride` in the template and in scaffold's own config; exactly the
   replacement case and the end-to-end case must redden, each with an assertion failure; restore byte-identically.
4. Host log: with `npm_config_registry` pointing at a closed local port, `npm run test:distribution -- --mode release`
   exits non-zero with the release-gate message, and the same command without `-- --mode release` exits 0 with skips;
   retain both.
5. Run `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test`, each logged to
   `tmp/units/rm-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/rm-report.md` and return the same text: the changes; the failing-first and green readings with
commands and counts; the mutation table; the host log; the list of tests the change made false and each fix; the gate
table; `tmp/units/rm.diff` (`git diff BASE_COMMIT`) and `tmp/units/rm-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles the case titles, the fixture
server, the comment wording, and the guide sentence. Stop and report if the fix needs `src/core/constants.ts` or
`package.json` to change, if the end-to-end case cannot tell the release failure from an unrelated failure, or if a
gate reads red outside the change's reach.

## Acceptance criteria

Both new cases read red at baseline and green after; the forwarding-line mutation reddens exactly them; the host log
shows the release run failing and the ordinary run skipping; every gate in Execution step 5 exits 0.
