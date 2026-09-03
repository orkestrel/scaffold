# Unit V-supervisor-2 — resume the visit from the install and prepare the release

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer (Codex
bench dark). Sole writer in `C:\Users\mikes\WebstormProjects\supervisor`. Perform the assignment
directly and spawn nothing.

## Objective

Finish `visit-supervisor-brief.md` from its step 4 — install the catalog set, read the gate
chain against it — and prepare supervisor's release layer per `wave.md` § Prepare a layer, up to
and excluding the upload.

## Context

The first pass (`visit-supervisor-report.md` under `.orkestrel/scaffold/` in scaffold) stopped at
`npm install`: `@orkestrel/middleware` 0.0.18 requires `@orkestrel/server ^0.0.16` while
`@orkestrel/mcp` 0.0.27 requires `^0.0.17`. This unit launches after the registry serves a
middleware whose peer accepts server 0.0.17; the Orchestrator names that version and confirms it
with `npm view` in the launch message. Re-pin `@orkestrel/middleware` to it first.

The visit's committed state (`d61a90f`, lockfile at `edf80e6`): every range, runtime and
development, at the registry head; the overwrite applied; the integration, guides, and service
suites at homes outside the planned config; the one nested-function site repaired; the audit at
exit 0 with three supervisor-owned questions; the chain green against the pre-visit
`node_modules`.

Standing conditions: the tree is clean at the commit. Commit nothing. Host: Windows 11, Git
Bash; Playwright Chromium installed. `prepublishOnly` here includes `test:service`; where a
service suite needs a live provider this host lacks, record it as the observation it is and read
the rest bare.

## Steps

1. Re-pin middleware; `npm install`; record `npm ls @orkestrel/test @orkestrel/scaffold
   @orkestrel/middleware @orkestrel/server @orkestrel/mcp @orkestrel/contract` and whether
   `npm run check` reads the nested contract copies as distinct types.
2. `npm run format` once. Then, each read bare: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test`. Repair a red the new set exposes in
   supervisor's own `src/**` or `app/**` at the type or with terrain's shapes; stop on a vendored
   red or a behaviour change.
3. Prepare the layer: read `npm view @orkestrel/supervisor version` (the registry head) and
   record it; do not bump — the Orchestrator bumps from that reading. Sweep the prior version
   literal across `src/` and `tests/` and report every hit with a ruling. Rebuild `dist/src` and
   compare it with the published tarball (`npm pack @orkestrel/supervisor@<head>` into `tmp/`)
   for material content; report material or not.
4. `npx scaffold audit`; record every remaining line with its owner.

## Scope

**Owned.** `package.json` (the middleware range only) and its lockfile, `src/**` and `app/**`
where a new rule reddens them, new tests for leaves a repair exports. **Off-limits.** Version;
publish; product chrome and behaviour; vendored files; `.claude/settings.local.json`.

## Output

Write `tmp/units/resume-supervisor-report.md` and return it: the `npm ls` readings and the
duplicate-contract typecheck; each gate's exit and summary; each repair; the registry head; the
self-pin hits; the `dist/src` comparison; the audit lines; `git diff --stat`;
`git status --porcelain`; claims not closed.

## Deviation contract

Stop and report when the install still refuses, when a red sits inside a vendored file, or when
a repair would change product behaviour.

## Acceptance criteria

1. `npm ls` reads the catalog set with the named middleware; the audit exits 0 or every line is
   owned.
2. The chain is green, read bare, or every red is reported with its excerpt and owner; the
   registry head, the self-pin sweep, and the `dist/src` comparison are recorded for the bump.
