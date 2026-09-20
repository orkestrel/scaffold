# Unit U1-rep4 — register the Node setup project and repair the seeded baseline

## Role and engine

Orchestrator-owned integration unit (Opus 5, inline), tracked script `u1-rep4.sh`. Audited with
the U1-author round by an engine the Orchestrator does not share.

## Objective

Turn the seeded Veneer baseline green on `test:config`, `lint:check`, and `test:guides` before
the U1-author successor launches, by registering the Node `setup` project through `scaffold repair`
and correcting the seeds that unit U1-author measured red.

## Context

U1-author (Astra, 2026-09-20, journal `u1-author.jsonl`, thread
`01a0bd8e-edb5-7572-9734-2725d363c3fe`) stopped before editing with this evidence: the generated
`tests/config.test.ts:207` selects a required `setup` project from `globSync('tests/setup*.test.ts')`,
which the seeded `tests/setupBrowser.test.ts` matches, while `scaffold repair` registers `setup` only
when the blueprint's setup runtimes include `node` (`src/core/compilers.ts:829`), which needs a
Node setup proof. The seed carried none, so `test:config` failed with
`setup has no project factory or configuration`. The generator's own `setup` template excludes
`tests/setupBrowser.test.ts` from its include (`src/core/templates.ts:489`), so the proof's
selection glob is broader than the generator's; that is a scaffold defect recorded separately.
The same measurement found `lint:check` red on three `tests/setupConformance.ts` TSDoc summaries
(`policy(no-malformed-summary)`) and `test:guides` red on `Missing manifest row: guides/veneer.md`
because the seeded index used a list where `parseManifest` reads a `## By concept` table.

## Scope

Owned: `tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `guides/README.md`,
`package.json` (`test` chain only), and whatever `scaffold repair` restores.

## Execution

1. Fix the three summaries to open with a third-person verb; add `tests/setupConformance.test.ts`
   proving the module's export set, the workspace and manifest locations, the version pin, and the
   reader's `undefined` cases; rewrite `guides/README.md` as the concept and directory tables.
2. Wire `npm run test:setup` into the `test` chain after `test:config`, then run
   `node ../scaffold/dist/bin/main.js repair --target .` so the pass registers `setup` and writes
   `test:setup`.
3. Run `lint:check`, `test:config`, `test:setup`, `test:guides`, `test:conformance`, `format:check`,
   and `audit`; commit by pathspec.

## Acceptance criteria

`test:config`, `test:setup`, `test:guides`, `test:conformance`, and `lint:check` exit 0; `audit`
reports only the `projects` (styles wrapper) question and the three registry-major advisories.
