# Unit V-taverna-2 — resume the visit from the install once middleware accepts server 0.0.17

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer (Codex
bench dark). Sole writer in `C:\Users\mikes\WebstormProjects\taverna`. Perform the assignment
directly and spawn nothing.

## Objective

Finish `visit-taverna-brief.md` from its step 4: install the catalog set, converge the
toolchain, read the gate chain, and repair what the new vendored rules redden in taverna's own
code.

## Context

The first pass (`visit-taverna-report.md` under `.orkestrel/scaffold/` in scaffold) stopped at
`npm install` on `@orkestrel/middleware` 0.0.18's peer `@orkestrel/server ^0.0.16`. This unit
launches after the registry serves a middleware whose peer accepts server 0.0.17; the
Orchestrator names that version and confirms it with `npm view` in the launch message. Re-pin
`@orkestrel/middleware` to that version with a caret first (the catalog table in
`.claude/agents/orkestrel.md` may still print 0.0.18; the registry wins).

The visit's committed state (`7721134`): every range at the catalog, the overwrite applied, the
e2e suites and the dev proxy given homes outside the planned files, the audit at exit 0 with the
setup-proof and TypeScript-major questions. Baseline lint reading before any install: 179
diagnostics — 76 `typescript(array-type)`, 57 `policy(no-nested-functions)`, 20
`typescript(consistent-type-imports)`, 15 `eslint(no-unused-vars)`, 7
`typescript(consistent-type-assertions)`, one each `vitest(expect-expect)`,
`typescript(no-this-alias)`, `import(no-unassigned-import)`, `eslint(require-yield)`; 118 under
`app/`, 61 under `tests/`; none in a vendored file.

Standing conditions: `git status --porcelain` shows the user's lockfile pair
(`D  package-lock.json`, `?? package-lock.json`); never stage, restore, or rewrite it; the
untracked file is the lockfile `npm install` reads and rewrites. Commit nothing. Host: Windows
11, Git Bash; Playwright Chromium installed.

## Steps

1. Re-pin middleware; `npm install`; record `npm ls @orkestrel/test @orkestrel/scaffold
   @orkestrel/middleware @orkestrel/server @orkestrel/contract`.
2. `npm run format` once. Then, each read bare: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test`.
3. Repair the lint set in taverna's own code the way lloyds did (`visit-lloyds-report.md`
   § Repairs): the repository's mutating `npm run lint` first, then the
   `policy/no-nested-functions` sites with terrain's shapes (field initializer, abort-signal
   listener, method shorthand, bound method, extraction to an exported tested leaf), then the
   rest by hand; prove every extracted leaf; record the count by rule before and after; stop on a
   red inside a vendored file or a repair that would change product behaviour.
4. Repair a `check` red the way lloyds' migration did (`lloyds-migration-report.md`): at the
   type, never with an assertion; a red inside product behaviour stops the unit.
5. Re-run the chain; then `npx scaffold audit`; record every remaining line with its owner.

## Scope

**Owned.** `package.json` (the middleware range), the untracked lockfile as `npm install`
rewrites it, `app/**` and `tests/**` where a new rule reddens them, new tests for leaves the
repair exports. **Off-limits.** Product chrome and behaviour; version; publish; vendored files;
`.claude/settings.local.json`.

## Output

Write `tmp/units/resume-taverna-report.md` and return it: the `npm ls` readings; each gate's
exit and summary before and after repair; each repair class with its counts; `git diff --stat`;
`git status --porcelain`; claims not closed.

## Deviation contract

Stop and report when the install still refuses, when a red sits inside a vendored file, or when
a repair would change product behaviour.

## Acceptance criteria

1. `npm ls` reads test 0.0.12, scaffold 0.0.60, and the named middleware; the audit exits 0 or
   every line is owned.
2. The gate chain is green, read bare, or every red is reported with its excerpt and owner.
