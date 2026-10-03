# Unit browser-lifecycle-tests — how veneer's tests start, reuse, and close browsers

## Role and engine

Mapper on Grok 4.7 Extra High, reached through the Cursor bench. Read-only: create, edit, move, and delete nothing. Report what the code does, with `path:line`; do not design.

## The user's question

Are the journeys and browser tests spinning up a browser for each test or test file, or reusing browsers with proper cleanup? Do they keep several browsers alive to run work in parallel, like threads? Is anything kept warm across runs instead of a full cold start each time?

## Map, in this checkout (`C:\Users\mikes\WebstormProjects\veneer`)

1. Every Vitest project that runs a browser (`vite.config.ts`, `configs/src/*.config.ts`, `configs/app/vite.journey.config.ts`, `configs/app/vite.vue.config.ts`): its provider and browser instances, `isolate`, `fileParallelism`, `maxWorkers` or pool settings, `sequence.groupOrder`, `headless`, and any launch options. Say how many browser processes and pages Vitest starts for each project and each test file under those settings, reading Vitest's installed source under `node_modules/vitest` and `node_modules/@vitest/browser*` for the provider's launch and page lifecycle (cite it).
2. What the harness starts on top: `tests/setupBrowser.ts` and its oracle (`createOracle`: frames, realms, Bootstrap bundles), `buildJourney`, `buildShowcase`, mounts and teardowns, CDP sessions, and `@orkestrel/test/browser` helpers under `node_modules/@orkestrel/test`. For each, whether it is created per test, per file, or once, and how it is cleaned up.
3. The scripts in `package.json` that run browser projects (`test`, `test:src:*`, `test:app:*`, `test:journey`, `test:journey:vue`, `test:setup:browser`, `test:conformance`, `test:integration`): how many Vitest processes and browser launches a full `npm test` causes, in what order, and which run in parallel.
4. Anything that keeps a browser or server warm between runs (a global setup, a reused browser server, a persistent context) or the absence of one.

## Output

One Markdown document with sections 1 to 4, a table of launches per script, and `## Unknowns`. No recommendations.
