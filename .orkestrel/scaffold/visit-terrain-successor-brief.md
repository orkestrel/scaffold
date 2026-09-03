# Unit V-terrain-2 — re-pin terrain to the published scaffold 0.0.60 and test 0.0.12

## Role and engine

`builder` on Sonnet, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\terrain`. Perform the assignment directly and spawn nothing.
Fully specified; stop on any deviation.

## Objective

Move terrain from the campaign's staged `@orkestrel/test` build and scaffold 0.0.59 to the
published test 0.0.12 and scaffold 0.0.60, run `scaffold repair`, and read the gate chain.

## Context

The registry serves scaffold 0.0.60 and test 0.0.12 when this unit launches (the Orchestrator
confirms with `npm view` in the launch message). `node_modules/@orkestrel/test` holds a packed
0.0.12 build staged with `npm install --no-save`; the full install replaces it with the registry
copy, which is the same commit's bytes. Standing conditions: `git status --porcelain` shows a
staged `package-lock.json` change by the user; never stage, restore, or rewrite it. Commit
nothing. Host: Windows 11, Git Bash; Playwright Chromium installed.

## Steps

1. In `package.json`, set `"@orkestrel/scaffold": "^0.0.60"` and `"@orkestrel/test": "^0.0.12"`.
   Run `npm install`. Record `npm ls @orkestrel/test @orkestrel/scaffold`.
2. Run `npx scaffold repair --groups manifest,source,tests,guides,docs,orchestration` (never
   `configs`: terrain's `vite.config.ts` carries a browser-enabled `setup` project that the
   canonical node-only template would revert, and that conflict is scaffold's to settle); record
   its summary and every file it wrote. Run `npx scaffold audit`; record its exit and every line
   with its owner — the `vite.config.ts` stale row is owned by scaffold, and the `test:setup`
   script is declared.
3. Run `npm run format` once. Then, each read bare: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test` (which now includes `test:setup`). Then the four variants of the integration file
   and two capture runs (`light-1280`, `dark-390`):
   `VITE_VARIANT=<v> npx vitest run --config vite.config.ts --no-cache --reporter=dot --project
   app:browser tests/app/browser/integration.test.ts`, with `VITE_CAPTURE=true` for the two.

## Scope

**Owned.** `package.json`, the lockfile as `npm install` rewrites it (never the user's staged
change), every file `repair` writes. **Off-limits.** Everything else; no commit; no
`git checkout`/`restore`/`stash`/`reset`/`clean`.

## Output

Write `tmp/units/visit-terrain-successor-report.md` and return it: the `npm ls` readings, the
repair summary, the audit exit and lines, each gate's exit and summary, each run's summary,
`git diff --stat`, `git status --porcelain`.

## Deviation contract

Stop and report when the registry does not serve the two versions, when `repair` writes a file
outside the vendored set, or when a gate or run is red. Decide nothing else.

## Acceptance criteria

1. `npm ls` reads test 0.0.12 and scaffold 0.0.60; `npx scaffold audit` exits 0 or every line is
   owned.
2. Every gate and every run is green, or every red is reported with its excerpt.
