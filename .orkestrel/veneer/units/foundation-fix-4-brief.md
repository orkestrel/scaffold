# Unit foundation-fix-4 — the showcase stamp over the final page, and the freshness gate

Fill every section. Write `none` in an empty one.

## Role and engine

`opus` on Claude Opus 5.5, native Agent dispatch. Perform the whole assignment yourself and spawn nothing. You are the sole writer of the owned files; another lane edits `src/core`, `tests/src/core`, `tests/src/bootstrap`, `tests/setupServer*.ts`, `guides/veneer.md`, and `tests/guides.test.ts` in the same checkout at the same time, so never read those as settled and never run `npm test`, `npm run build`, `npm run lint`, or `npm run format` tree-wide.

## Objective

In `C:/Users/mikes/WebstormProjects/veneer`: (a) make the `build-id` stamp of each showcase page the SHA-256 of the final single-file HTML with the stamp element omitted, computed after `vite-plugin-singlefile` has inlined every asset, so a rebuild of unchanged inputs reproduces the page byte for byte and a reader can recompute the stamp from the page alone; (b) add the freshness gate `tests/showcase.test.ts` that rebuilds each mode in memory and fails when the committed page differs; (c) regenerate both committed pages; keep every scoped gate green.

## Context

- **Evidence.** The design round's ruling on question 8 in `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/foundation-design-verdict.md` (written beside this brief; where it is absent, the two proposals `foundation-design-planner-proposal.md` answer 8 and `foundation-design-analyst-proposal.md` answer 8 in the same folder carry the same ruling: the gate rebuilds and compares the complete artifact; the stamp payload is the final inlined HTML with the stamp element omitted; the project sits outside the default run because it drives a real build). The Orchestrator's probe on 2026-09-30: the present stamp in `showcase/browser.html` equals neither the SHA-256 of the whole page nor that of the page with the meta line removed, because `transformIndexHtml` (`configs/app/vite.showcase.config.ts:45-57`) runs before the single-file plugin's `generateBundle` inlines the assets.
- **Present shape.** `configs/app/vite.showcase.config.ts` (package-owned; read its opening comment), `configs/helpers.ts:387-452` (`showcaseBuildOutput`, `showcaseHtmlEntry`, `showcaseHtmlPresent`, `computeStamp`) and `:546` (`outputBoundary`), `tests/config.test.ts:2085-2172` (the helper cases), `package.json` scripts `build:showcase`, `build:showcase:vue`, `test:*`, `prepublishOnly`. The pages are `showcase/browser.html` and `showcase/vue.html`; `.prettierignore` lists `showcase/`.
- **Law.** The veneer checkout's own `AGENTS.md` and `.claude/rules/` (vendored from scaffold): `workspace.md` § Test project matrix ("a project leaves the default run when it … drives a real build"; every isolated project has its own script; root `vite.config.ts` stays on the core/browser/server axis, and a surface off that axis gets a wrapper under `configs/` and a script that passes `--config`), `tests.md` § Expensive proofs and § Probes (a control that must fail), `portability.md` (line endings, paths), `typescript.md` (TSDoc), `names.md` (`{verb}{Noun}` helpers), `writing.md`. `ROADMAP.md` § Configs fixes the page paths and "no copy step".
- **Host.** Windows 11, Node 24, npm; `node_modules` installed; `dist/` built. The tree carries uncommitted foundation repairs; build on the working tree. Never commit. Never install a package.

## Unknowns

- Whether this checkout converts line endings on checkout (`git config core.autocrlf`, `.gitattributes`). Settle it by reading the committed page's bytes after a rebuild (`git diff --stat -- showcase` must be empty after a second identical build). Compare the in-memory page with the committed page as bytes; where the host's checkout rewrites line endings, normalize CR LF to LF on both sides and say why in a comment that cites the probe.
- Whether a plugin with `enforce: 'post'` placed after `viteSingleFile` in the `plugins` array runs its `generateBundle` after the inlining. The byte proof settles it.
- The in-memory build's duration per mode. Report it.

## Scope

- **Owned.** `configs/app/vite.showcase.config.ts`, `configs/helpers.ts` (add `stampPage`, or the smallest pure helper that inserts the stamp; keep `computeStamp`), `tests/config.test.ts` (cases for the helper you add, beside the `computeStamp` case), `tests/showcase.test.ts` (new), `package.json` (`test:showcase` and its place in `prepublishOnly` only), `showcase/browser.html` and `showcase/vue.html` (rebuilt).
- **Shared (report-only).** `configs/app/vite.journey.config.ts` if a mode helper it shares needs a touch; report, do not edit.
- **Off-limits.** `ROADMAP.md`, `README.md`, `guides/**`, `src/**`, `app/**`, `tests/src/**`, `tests/app/**`, `tests/setup*.ts`, `tests/guides.test.ts`, `vite.config.ts`, `tsconfig.json`, `.oxlintrc.json`, `.prettierignore`, `.orkestrel/**`, everything under `C:/Users/mikes/WebstormProjects/scaffold`.
- **Made false by this change.** The stamp values in both committed pages; any reader of the old `transformIndexHtml` plugin.
- **Tools and limits.** Read, Grep, Glob, Edit, Write, Bash (PowerShell host: no `&&`, quote paths). Run: `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json <owned paths>`, `npx oxfmt --config .oxfmtrc.json --check <owned paths>` and `--write` on owned files only, `npm run build:showcase`, `npm run build:showcase:vue`, `npm run test:config`, `npm run test:showcase`. A probe lives under `tmp/probes/` and is deleted before you return.

## Execution

1. `configs/helpers.ts`: add `stampPage(html: string): string` (TSDoc: what it inserts, where, and that the stamp is `computeStamp` of the input, so the returned page with its stamp line removed hashes to the stamp it carries). Keep the meta line shape `\t\t<meta name="build-id" content="…" />` before `</head>`.
2. `configs/app/vite.showcase.config.ts`: replace the `transformIndexHtml` plugin with a plugin after `viteSingleFile` in the array, `enforce: 'post'`, whose `generateBundle(_, bundle)` finds the emitted HTML asset (type `asset`, string source, `.html` file name) and replaces its source with `stampPage(source)`. Keep `orkestrel-showcase-name` and `outputBoundary` as they are. Add the `test` block that registers the `showcase` project: Node environment, `tests/setup.ts`, include `tests/showcase.test.ts` alone; keep it on the wrapper, not on root `vite.config.ts`.
3. `tests/showcase.test.ts`: for each mode (`production` → `showcase/browser.html`, `vue` → `showcase/vue.html`) call Vite's `build()` with `configFile: 'configs/app/vite.showcase.config.ts'`, that `mode`, `logLevel: 'silent'`, and `build.write: false`; take the emitted `index.html` asset; assert its source equals the committed page; assert `computeStamp(page with the stamp line removed)` equals the stamp the page carries; assert a second in-memory build equals the first. Controls: a scratch copy (use `createScratch` from `@orkestrel/test/server`) of the committed page with one byte changed compares unequal, and a page whose stamp line is altered fails the stamp check. Give the file a timeout sized from a contended run (`tests.md` § Expensive proofs).
4. `package.json`: add `test:showcase` (`vitest run --config configs/app/vite.showcase.config.ts --no-cache --reporter=dot --project showcase`) and run it in `prepublishOnly` after `npm test` and before `test:distribution`. Do not add it to `test`.
5. `tests/config.test.ts`: add the helper to the exported-helper list and a case: the stamped page carries one `build-id` meta whose content equals `computeStamp` of the input, and the page with that line removed equals the input.
6. Rebuild both pages with `npm run build:showcase` and `npm run build:showcase:vue`; rebuild again and confirm `git diff --stat -- showcase` is empty between the two builds; then run `npm run test:showcase`.
7. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json configs tests/config.test.ts tests/showcase.test.ts`, `npm run test:config`, `npm run test:showcase`.

## Output

Write `C:/Users/mikes/WebstormProjects/veneer/tmp/units/foundation-fix-4-report.md` with: the files changed; the two stamps before and after; each command, its exit code, and its test count; the in-memory build duration per mode; the line-ending finding; any probe you wrote and its deletion; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when the in-memory build's HTML cannot be read from the bundle, when a second build differs from the first, when a gate refuses the change, or when the change needs an edit outside the owned files.

## Acceptance criteria

1. Both committed pages carry a stamp equal to the SHA-256 of the page with the stamp line removed; a second build changes no byte.
2. `npm run test:showcase` exits 0 with the equality, the stamp, the determinism, and both controls; a one-byte scratch change fails.
3. `npm run test:config` exits 0 with the new helper case; `npx tsc --noEmit --project tsconfig.json` exits 0; scoped lint and format exit 0.
4. `git status --porcelain` lists only owned files, and `tmp/probes/` holds nothing of yours.

**Observations, not criteria.** The in-memory build duration per mode; whether the gate could sit in `test` under the rule.

## Review evidence

The diff and `git status --porcelain`; the report file.
