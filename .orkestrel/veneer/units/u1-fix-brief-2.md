# Unit U1-fix — successor brief 2

## What this supersedes

This brief supersedes `tmp/units/u1-fix-brief.md` for one remaining finding; the first brief's
ten fixes stand as landed in the working tree (uncommitted, 13 files) and are not redone. Same
role and engine: `builder` on native Sonnet, sole writer in `C:/Users/mikes/WebstormProjects/veneer`,
performing the assignment directly and spawning nothing.

## Why a successor

The first fix run reported `npm run test:distribution` with two failures it called pre-existing:
`installed package consumer > loads standalone styles with the declared cascade order [requires the registry]`
and `installed entry ./browser > publishes what it declares to a real browser, and no more [requires a browser]`,
both `TimeoutError: locator.evaluate: Timeout 30000ms exceeded` waiting for
`locator('#veneer-styles')` at `tests/distribution.test.ts:699`. The Orchestrator reproduced both
on the host at the same tree. They are a defect of the unit's own distribution stage, not of the
environment: `bundleEntry` (`tests/distribution.test.ts:640-660`) writes the page with
`<link id="veneer-styles" rel="stylesheet" href="./styles.css" />` and then builds the page with
Vite, whose HTML pipeline processes a stylesheet link by bundling it into a hashed asset and
rewriting the tag without its `id`, so the served page has no `#veneer-styles`. Vite honors a
`vite-ignore` attribute on an asset-source element (`node_modules/vite/dist/node/chunks/node.js:5599`)
by leaving the element as authored and removing only that attribute; an ignored link then needs
its file served verbatim, which Vite does for files under the page's `public/` directory.

## Fix

1. In `BROWSER_PAGE` (`tests/distribution.test.ts:603`), write the link as
   `<link id="veneer-styles" rel="stylesheet" href="./styles.css" vite-ignore />`.
2. In `bundleEntry`, write the resolved stylesheet to `join(page, 'public', 'styles.css')` instead
   of `join(page, 'styles.css')`, so the built `bundle/` carries `styles.css` beside `index.html`.
3. Run `npm run test:distribution` and record the final lines; every case that ran before must
   pass, the two named cases included, with the registry-gated cases skipping or passing as the
   registry allows. Then run `npm run format:check`, `npm run lint:check`, and `npm run check`.

## Scope

**Owned.** `tests/distribution.test.ts` only. **Off-limits.** Everything else. No `git stash`,
`git checkout`, or any other index or working-tree write through `git`; the first run used
`git stash` to compare against `ae0221d`, which the permission floor forbids, and this run must
not repeat it.

## Output

Append a section `## Successor 2` to `tmp/units/u1-fix-report.md` in the Veneer checkout with the
distribution reading before and after, the three gate readings, and `git status --porcelain`;
return that section as your final message.

## Acceptance criteria

1. `npm run test:distribution` exits 0 with the two named cases passing.
2. `format:check`, `lint:check`, `check` exit 0.
3. `git status --porcelain` lists the same 13 files as before plus nothing else.
