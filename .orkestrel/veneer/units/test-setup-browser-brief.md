# Unit test-setup-browser — the browser setup proof runs where a DOM exists

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/test`; commit nothing; install nothing; no `scaffold repair`; no
tree-wide `format` or lint `--fix`; never `git checkout`, `git restore`, `git stash`, `git reset`,
or `git clean`.

## Objective

Make `tests/setupBrowser.test.ts` a browser proof of `tests/setupBrowser.ts`'s DOM behaviour, and
remove from the module the Node-importability workaround that the planned `setup:browser` project
makes dead, so `npm test` is green on the scaffold `0.0.76` floor.

## Law

From `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`; `.claude/rules/tests.md` (§ Shared
test infrastructure: `tests/setupBrowser.ts` holds DOM/browser helpers; "Put
`tests/setupBrowser.test.ts` in the browser-enabled `setup:browser` project"; no mocks; real
implementations); `.claude/rules/typescript.md`; `.claude/rules/writing.md`.

## Context

**The tree.** The working tree carries the Orchestrator's re-pin to scaffold `0.0.76`, the
declared `test:setup:browser` script chained into `test`, the repaired planned paths (root
`vite.config.ts` now registers `setup:browser` including `tests/setupBrowser.test.ts` alone and
excludes it from the Node `setup` project), and the refreshed mirror. Touch none of those files.

**The red, measured by the verifier on 2026-09-20.** `npm run test:setup:browser` (Chromium and
Edge alike):

```text
FAIL |setup:browser (chromium)| tests/setupBrowser.test.ts:23:2 > buildFixture > refuses to run outside a DOM host
AssertionError: expected [Function] to throw an error
Tests  1 failed | 2 passed (3)
```

**Why.** `tests/setupBrowser.ts:13-31` resolves `render` behind `if (typeof document !==
'undefined')` and `buildFixture` throws `'buildFixture requires a DOM host'` when it is unresolved;
the file's header and the proof's comment say the proof runs in the Node `setup` project. Commit
`fa2406c` ("make setupBrowser Node-importable") added that for the 0.0.52 floor. The planned
configuration reverses the premise: the proof runs in a browser, `render` always resolves, and the
refusal branch cannot be reached.

**Host.** Windows, Git Bash, `npm run <name>`; managed Chromium by default, Edge through
`PLAYWRIGHT_CHANNEL=msedge`.

## Unknowns

- Whether any Node project still loads `tests/setupBrowser.ts` (read every `setupFiles` list in
  the repaired `vite.config.ts` and every import of `./setupBrowser.js` under `tests/`). If one
  does, stop and report it: the guard cannot go while a Node loader remains.

## Scope

**Owned.** `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`. **Off-limits.** Everything
else.

## Execution

Perform the assignment directly and spawn nothing.

1. Settle the unknown first.
2. In `tests/setupBrowser.ts`: import `render` (and whatever else the module resolves lazily)
   directly from its source at module scope; delete the `typeof document` guard, the refusal
   branch, its `@throws`, and every sentence that says the module loads in Node. Keep every
   exported name and signature; keep the fixture registry and `resetFixtures` as they are.
3. In `tests/setupBrowser.test.ts`: replace the comment and the cases with browser cases that
   drive the real DOM: `buildFixture` renders the markup into an attached container that
   `querySelector` reaches and records it; `buildStylesheet` attaches a `<style>` element to
   `document.head` and records it; `resetFixtures` removes every recorded node and is idempotent
   on an empty record. Name each case for what it proves.
4. Gates, each with its final lines: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run test:setup:browser`, `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`,
   `npm run test:setup`, `npm run test:src:browser`, then `npm test` (the whole chain).

## Output

Write `tmp/test-setup-browser-report.md` in the Test checkout and return its content: the diff per
file; the unknown's reading; each gate's final lines; deviations in the usual shape.

## Deviation contract

Stop and report on: a Node loader of the module; a gate red after your own fix inside owned files;
a need to edit an off-limits file. Decide, record, and carry on from: case order and wording.

## Acceptance criteria

1. `tests/setupBrowser.ts` carries no `typeof document` guard and no refusal branch; every
   previously exported name is still exported with its signature.
2. `tests/setupBrowser.test.ts` drives the real DOM and every case passes on Chromium and Edge.
3. `npm test` exits 0.
4. `git status --porcelain` adds only the two owned files and the report to the list the brief's
   Context describes.

## Review evidence

The actual `git diff` over the two owned files and `git status --porcelain` at return; the report.
