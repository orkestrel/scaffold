# Unit V-supervisor — bring supervisor to scaffold 0.0.60 and the catalog

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer (Codex
bench dark). Sole writer in `C:\Users\mikes\WebstormProjects\supervisor`. Perform the assignment
directly and spawn nothing.

## Objective

Run the fleet visit from step 2 (`wave.md` § Visit a repository) so that `npx scaffold audit`
exits 0, every `@orkestrel/*` range (runtime included, contract at the latest) equals the
catalog with a caret, the suites the overwrite removes from the planned config keep a home the
plan does not own, and the gate chain is green with the new lint rule repaired in supervisor's
own `src/**` and `app/**`.

## Context

Read first: `wave.md` § Visit a repository and § Rule on the bump; `guides/scaffold.md`
§ Ownership (935–1052), the scripts and projects rules (600–639, 1005–1009), § Limits
(1515–1533: a gitignored canon copy is a permanent foreign finding; MCP registration lives in the
harness's local scope, never in `.mcp.json`). Evidence:
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\probe-drift-report.md` § Supervisor,
`absorb-consumers-report.md` § supervisor, `visit-terrain-report.md`.

Prepared and committed at `8ac9712`: the stale catalog agent removed; hooks and permissions in
the ignored `.claude/settings.local.json`; the tracked `.mcp.json` recorded (servers `codex`
and `probe`) and left for the overwrite to remove. The manifest still declares scaffold
`^0.0.50`, test `^0.0.10`, probe `^0.0.2`, and stale runtime ranges; step 1 re-pins scaffold
first. The registry serves scaffold 0.0.60 and test 0.0.12 when this unit launches.

Supervisor is a published package (`@orkestrel/supervisor`; `files` is `dist/src` and
`README.md`). Its runtime `dependencies` move to the catalog (contract to `^0.0.15` while its own
dependents may still declare `^0.0.13`; record `npm ls @orkestrel/contract` and the typecheck
over both copies; do not restore `^0.0.13`). A moved runtime range is published surface, so the
Orchestrator bumps and publishes after this unit; read and record `npm view
@orkestrel/supervisor version` (the registry head the bump moves from) but move no version.

Standing conditions: the tree is clean apart from the prepare commit. Commit nothing. Host:
Windows 11, Git Bash; Playwright Chromium installed.

## Known refusal and what settles it

`scaffold overwrite` refuses before writing when a retained script names a `--project` the planned
`vite.config.ts` does not declare. Retained scripts name `app:browser:integration`, `guides`,
`service:claude`, `service:codex`, `service:cursor`, `service:claude-inference`,
`service:codex-inference`, `service:cursor-inference`, `service:ollama`, and `service:sea`. Rule
on each before the overwrite and record the ruling:

- `app:browser:integration`: the Node and Playwright suite under `tests/app/browser/integration/**`
  drives a built server through `tests/setupBrowserServer.ts`; after the overwrite the floor's
  `app:browser` include would collect those files as in-page browser tests, which they are not.
  Move them to a home the plan does not own (for example `tests/integration/app/**` with a config
  file outside the planned set built from the floor helpers) and give them a `--config` script;
  keep the canonical `tests/app/browser/integration.test.ts` path free for the browser-project
  journey suite a later unit writes (move the existing file of that name with its siblings).
- `guides`: `tests/guides/src/*.test.ts` match no floor include; the planned `guides` project is
  selected by `tests/guides.test.ts`. Add that defining file carrying the parity proof, or move
  the existing files into the shape the floor collects; record which.
- `service:*`: the floor declares one `service` project over `tests/service/**` selected by
  `tests/setupService.ts`, and the per-provider factories with `SUPERVISOR_SERVICE_PROVIDER`
  leave. Keep the per-provider selection through the environment variable inside the one
  project's setup where the suites read it, and rewrite the scripts to set the variable and
  select `--project service`; record the mapping.

Also owed: the showcase's `showcase.html` input and `base: './'` leave with the replaced config
(record whether the showcase still builds and where its options move if a file the plan does not
own can carry them); `CLAUDE.md` imports files the overwrite deletes (the floor pointer imports
nothing); the `.mcp.json` deletion drops the probe MCP the repository's `AGENTS.md` names, so the
report hands the out-of-tree `claude mcp add` commands to the user.

## The visit, in order

1. Re-pin `@orkestrel/scaffold` to `^0.0.60`; `npm install`. Read-only `npx scaffold audit`;
   record every line and the 85-path foreign set.
2. Apply the pre-overwrite rulings above; run the audit again; then `npx scaffold overwrite`
   (no `--dirty`). Record its summary and every file written or deleted; prove the deletion set
   equals the foreign set with `comm`.
3. `npx scaffold audit`; record its exit and every remaining line with its owner.
4. Re-pin every remaining `@orkestrel/*` range, runtime and development, to the catalog with a
   caret; `npm install`; `npm ls @orkestrel/test @orkestrel/contract` recorded.
5. `npm run format` once. Then, each read bare: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test`. Repair a red the new
   `policy/no-nested-functions` rule raises in `src/**` or `app/**` with terrain's shapes,
   recording the count by rule before and after; stop on a red inside a vendored file or one
   that would change product behaviour. Rebuild `dist/src` and record whether it differs
   materially from the published tarball (`npm pack @orkestrel/supervisor@<registry head>` into
   `tmp/`), because a `src/**` repair moves the published surface.

## Scope

**Owned.** `package.json` and its lockfile, every file the overwrite writes or deletes, the new
unplanned config files and the moved suites, `src/**` and `app/**` only where the new rule
reddens them, new tests only for leaves the repair exports, `CLAUDE.md` only as the overwrite
writes it. **Off-limits.** Product chrome and behaviour; version; publish; the vendored files
after the overwrite writes them; `.claude/settings.local.json`.

## Output

Write `tmp/units/visit-supervisor-report.md` and return it: the rulings and where each suite now
lives; the read-only audit; the overwrite summary, file list, and deletion proof; the closing
audit; the range table before and after; the `npm ls` readings and the duplicate-contract
typecheck; each gate's exit and summary; each repair with its red-then-green counts; the
`dist/src` comparison; the registry head; the MCP commands for the user; `git diff --stat`;
`git status --porcelain`; claims not closed.

## Deviation contract

Stop and report — expected, found, evidence, done or not done, one hypothesis — when the
overwrite refuses for a reason not named here, when a red sits inside a vendored file, when a
registry range is refused, when a repair would change product behaviour, or when a suite has no
home the plan does not own.

## Acceptance criteria

1. `npx scaffold audit` exits 0 after the overwrite, or every remaining line is recorded with its
   owner.
2. Every `@orkestrel/*` range equals the catalog with a caret; `npm ls @orkestrel/test` reads
   0.0.12; the duplicate-contract typecheck is recorded.
3. The integration, guides, and service suites have recorded homes and scripts that run.
4. The gate chain is green, read bare, or every red is reported with its excerpt and owner.
