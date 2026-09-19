# Unit S3-2 — name `buildRefusal` in the statechart reference

Successor to `.orkestrel/campaign/s3-brief.md`, which stays
unedited. **What changed and why:** the S3 brief stated that the installed `@orkestrel/test` carried
the packed 0.0.17 surface. It carried a tarball packed between units T2 and T3, whose core entry did
not export `buildRefusal`, so S3 could not fence the symbol and reported the deviation with the
carrier this unit runs. `@orkestrel/test@0.0.17` has published since (`+ @orkestrel/test@0.0.17`,
2026-09-17) and this checkout is re-pinned to it, so the binding resolves.

## Role and engine

`builder` on Claude Sonnet, a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`,
and `Bash`, the sole writer in the `C:/Users/mikes/WebstormProjects/scaffold` checkout. You open this
brief yourself; every later section is written for you.

## Objective

Add `buildRefusal` to the import fence in
`.agents/skills/orkestrel-prove-journey/references/statechart.md` and name it in the two bullets
that already teach the refused build, so the reference names the helper the guide ships for the
sentence it describes.

## Context

**Evidence.** Measured by the Orchestrator in this checkout after the re-pin:

```text
$ node -p "require('./node_modules/@orkestrel/test/package.json').version"
0.0.17

$ grep -n "export declare function buildRefusal" node_modules/@orkestrel/test/dist/src/core/index.d.ts
20:export declare function buildRefusal(name: string, cause: unknown): Error;

$ grep -n "buildRefusal" .agents/skills/orkestrel-prove-journey/references/statechart.md
(no output)
```

The reference's current fence (`references/statechart.md` → The vocabulary) imports from
`@orkestrel/test`: `STATECHART_ATTRIBUTES`, `STATECHART_STATUSES`, `executeScenario`,
`executeScenarios`, `requireValue`. Its § Run the table "Let the runner name the failure" bullet ends
with "and a builder that refuses raises `<name>: build refused` with its own refusal as the `cause`."
Its § Mount the harness `execute` bullet ends with "and a builder that refuses fails its own row
under the runner's own refusal sentence rather than ending the run."

**Law.** `AGENTS.md` § Writing and § Instruction files; `.claude/rules/writing.md` (never inflect,
pluralize, or possessivize a code token); `.claude/rules/documentation.md` § Workflow skills (every
taught symbol sits in a named import inside a fence). Skill: none. Guide: none.

**Installed primitives.** `@orkestrel/test` 0.0.17, `dist/src/core/index.d.ts` line 20.

**Host.** Windows 11; Bash; edit through your editor tools so no non-ASCII code point round-trips
through cp1252. The file carries em dashes and arrows; touch only the lines named here.

**Measurements.** Baseline: the checkpoint the dispatch message names, carrying unit S3 with the
Orchestrator's gate reading green over the re-pinned tree.

**Control identifiers.** `S3-2-C1` through `S3-2-C3`.

**Standing conditions.** `host.json` reads stale after a vendored edit until the Orchestrator's
build; the inventory case in `test:config` reddens for that reason alone. `tmp/probe/` holds
retired instruments from earlier units; leave them.

## Unknowns

None. The three edits are fully specified in the following section.

## Scope

**Owned.** `.agents/skills/orkestrel-prove-journey/references/statechart.md`.

**Shared (report-only).** None.

**Off-limits.** Everything else, including the other reference files, `SKILL.md`, `guides/**`,
`src/**`, `tests/**`, `host.json`, and `package.json`.

**What asserts the state this change ends.** `tests/policy.test.ts` (the fenced-import sweep over
the skill family) and `npm run format:check`.

**Tools and limits.** All of your tools. No commit, push, install, or `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`. Format the owned file with
`./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --write <file>` before the checks; never run
the tree-wide `format` or `lint`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## The edits

1. **The fence.** In § The vocabulary, inside the value import from `@orkestrel/test`, insert the
   line `	buildRefusal,` between `	STATECHART_STATUSES,` and `	executeScenario,`.
2. **§ Run the table.** Replace the final sentence fragment of the "Let the runner name the failure"
   bullet, from "and a builder that refuses raises" to the end of the bullet, with:

   > and a builder that refuses raises `<name>: build refused` with its own refusal as the `cause`.
   > `buildRefusal(name, cause)` from `@orkestrel/test` builds that same error, so an assertion on
   > a refused build compares against what it returns rather than against a spelled string.

   Rewrap the bullet to the file's line width; the formatter leaves Markdown prose wrapping alone,
   so wrap it by hand to the same width its neighbours use.
3. **§ Mount the harness.** In the bullet beginning "Take `execute` as reporting on the whole
   table", replace "under the runner's own refusal sentence rather than ending the run" with "under
   the sentence `buildRefusal` builds rather than ending the run".

Make no other change.

## Output

Write `.orkestrel/campaign/s3-2-report.md` with: the diff of the owned file (`git diff -- <file>`), the
`git status --short` output, and the command and reading behind each acceptance criterion. No
process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle line wrapping yourself. Stop and
report if the installed core entry does not export `buildRefusal`, if either quoted sentence is
absent from the file, or if `npm run test:policy` reports a violation naming any file other than the
owned one.

## Acceptance criteria

Cheap first.

- **S3-2-C1.** `grep -c "buildRefusal" .agents/skills/orkestrel-prove-journey/references/statechart.md`
  reports `3`: the fence line, the § Run the table sentence, and the § Mount the harness clause.
- **S3-2-C2.** `npm run format:check` exits 0.
- **S3-2-C3.** `npm run test:policy` exits 0, and the skill sweep reports no violation. Before the
  edit, the sweep reported nothing for this file because the symbol was not fenced; after it, the
  binding resolves against `node_modules/@orkestrel/test/dist/src/core/index.d.ts`. Prove the
  sweep reads the fence by copying the file to `tmp/probe/s3-2/planted-statechart.md`, changing
  the inserted line to `	buildRefusal2,`, running `inspectSkillImports(process.cwd(), path,
  content)` from `tests/setupPolicy.ts` over the copy through a test file under `tmp/probe/`
  collected by the `probe` project (`npx vitest run --config vite.config.ts --no-cache
  --reporter=verbose --project probe <file>`), and reading one violation naming `buildRefusal2`.
  Delete the planted copy and retire the probe test file to a `.txt` suffix afterwards. Name the
  probe test for what it proves, never for the control label.

**Observations, not criteria.** `npm run test:config` reddens on the host inventory case until the
Orchestrator's build; report its reading without acting on it.

## Review evidence

The actual diff of the owned file and the actual `git status --short` output, in the report.
