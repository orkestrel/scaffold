# Unit V visit — bring one consumer repository to the catalog's latest packages and canon

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. You are the sole writer in the target
checkout the dispatch names. Perform the visit directly and spawn nothing.

## Objective

Bring the target onto the latest published `@orkestrel/*` packages and the current scaffold canon
through the fleet visit `.agents/skills/orkestrel-publish/references/wave.md` § Visit a repository
fixes, run the gates, and repair only what the visit itself broke, so that no later finding in
this campaign comes from a stale package or a stale structure.

## Context

**Evidence.**

- The catalog: the table in `C:\Users\mikes\WebstormProjects\scaffold\.claude\agents\orkestrel.md`
  (versions per package). Regenerating it needs the registry and is the Orchestrator's; treat
  the committed table as the reading for this visit and report any range the registry refuses.
- The procedure: `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-publish\references\wave.md`
  § Visit a repository, read in full first. The verbs are documented in
  `C:\Users\mikes\WebstormProjects\scaffold\guides\scaffold.md` (`audit`, `repair`, `catalog`,
  `overwrite`, `--offline`, `--dirty`).
- The target's `package.json` `devDependencies` and `dependencies` — read every `@orkestrel/*`
  range and compare with the catalog.
- `.agents/orchestration.md` § What a bump obliges: a development-dependency bump re-pins, proves
  the gates, and commits; it bumps no version and publishes nothing.

**Law.** `AGENTS.md` and every rule the target's own tree carries after the overwrite (the
overwrite may replace them; read them again after it runs). Skill: `orkestrel-publish` § Visit a
repository only. Guide: the target's `guides/README.md`.

**Host.** Windows 11, Git Bash. Network is available for `npm install`. Playwright Chromium is
installed under `%LOCALAPPDATA%\ms-playwright` for a browser project.

**Measurements.** Record `git rev-parse --short HEAD`, `git status --porcelain`, and every
`@orkestrel/*` range before the first write, and again after the visit.

**Control identifiers.** none.

**Standing conditions.** The dispatch names any file expected dirty, any unpublished tarball to
re-stage, and any pre-existing gate reading.

## Unknowns

- Whether the overwrite changes vendored test infrastructure (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `configs/**`) in a way that reddens the target's
  own suites. Report each red as the visit's finding with the exact excerpt; repair a red that a
  vendored file's new rule exposes in the target's own code, and stop and report a red inside a
  vendored file itself.

## Scope

**Owned.** `package.json`, `package-lock.json`, every file the overwrite writes or deletes, and
the target's own source and test files only where a new rule the overwrite installed reddens them.

**Shared (report-only).** none.

**Off-limits.** The target's product behaviour: fix a rule violation, never a feature. No version
bump. No publish.

**What asserts the state this change ends.** The target's own gate chain.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for `npm`, `npx scaffold …`, and the
gate scripts. Commit nothing; no `git checkout`/`restore`/`stash`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## The visit, in order

1. Re-pin `@orkestrel/scaffold` to the catalog's version with a caret and run `npm install`.
2. Run `npx scaffold overwrite`; where it refuses on uncommitted work, read the refusal and
   report it rather than passing `--dirty`. Prove the sweep with `npx scaffold audit` exiting `0`.
3. Re-pin every other `@orkestrel/*` range to the catalog's version with a caret. Where the
   dispatch names an unpublished tarball for one package, leave that package's manifest range at
   the catalog version and re-stage the tarball with `npm install --no-save <tarball>` after the
   full install, so `node_modules` holds the campaign's build while the manifest keeps a registry
   range.
4. Run the full `npm install`.
5. Run `npm run format` (the mutating script) once to converge generated writes.
6. Run the gate chain in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run build`, `npm test`. Read each bare.
7. Where a gate is red because a new rule reddens the target's own code, repair the code, re-run
   that gate, and record the red-then-green. Where it is red inside a vendored file, stop and
   report.

## Output

Return, as your final message, the report you also write to `tmp/units/visit-<target>-report.md`
in the target checkout: the range table before and after, the overwrite's own summary and the
audit exit code, every file the overwrite wrote or deleted (from `git status --porcelain`), each
gate's bare summary line with its exit code, each repair with its red-then-green, and every claim
you could not close.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when the
overwrite refuses, when a red sits inside a vendored file, when a registry range is refused, or
when a repair would change product behaviour. Decide, record, and carry on for the order of
edits and the wording of a comment.

## Acceptance criteria

1. `npx scaffold audit` exits `0` after the overwrite.
2. Every `@orkestrel/*` range in the manifest equals the catalog's version with a caret.
3. The gate chain is green, read bare, or every red is reported with its excerpt and its owner.

## Review evidence

Code change: `git diff --stat` and `git status --porcelain` in the report.
