# Unit propagation-9 — veneer adopts the propagation release

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell, working in `C:/Users/mikes/WebstormProjects/veneer`. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in the veneer checkout for this unit's duration. Never commit; the Orchestrator commits. Never publish.

## Objective

Make `@orkestrel/veneer` adopt the scaffold release that carries the surfaces and extensions, exactly as ruling 9 of `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-design-verdict.md` states: bump the range, move the hand-held shapes to the generated ones, run `scaffold repair --offline --json`, delete every hand-edited divergence the generator now owns, confirm `scaffold audit --offline --json` reports no stale selected artifact, and run veneer's full chain with both showcase builds and the release-mode distribution proof, so veneer's eight vendored files carry no hand edit and its roadmap's § Scaffold propagation closes.

## Phase

PHASE_VALUE is `pack` or `registry`, set by the Orchestrator in the launch message. In `pack`, the release is not yet published: install the scaffold tarball the Orchestrator names (`npm install --save-dev <path to the .tgz> --ignore-scripts`), then set the manifest's `@orkestrel/scaffold` range back to `^0.0.82` in `package.json` (leave `node_modules` as installed and `package-lock.json` as npm wrote it), because `repair --offline` reads the declared range and refuses a `file:` specifier with `FETCH: A declared dependency names no concrete floor.`, as `propagation-fix-8-report.md` records for the adopter proof; then adopt and run the chain. The `registry` phase later replaces the lockfile's tarball resolution through its own install. In `registry`, the release is published: set the range to `^0.0.82`, `npm install --ignore-scripts`, adopt, and run the chain.

## Context

- **Evidence.** The verdict (rulings 2 to 6 and 9); the scaffold reports `tmp/units/propagation-*-report.md` and `propagation-fix-*-report.md` under the scaffold checkout (what the release emits and where each behaviour is proved); veneer's `ROADMAP.md` § Configs, § Proofs, and § Scaffold propagation (the eight vendored files veneer carries by hand and the behaviours each holds; items 1 to 6); veneer's `package.json`, `vite.config.ts`, `configs/`, `tests/config.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts` (renamed on 2026-09-30), `tests/setupGlobal.ts` if present, `src/styles/themes/index.scss` (`@use '../tokens'; @use 'default';`), `showcase/`, `guides/veneer.md`.
- **What the release carries** (read the scaffold reports rather than trusting this list): the styles surface with named faces and themes; the `vue` browser extension on both axes; mode-aware showcase and journey factories; `resolveExternal`, `rewriteBrowserSpecifier`, `resolveApplication`, `computeStamp`, `stampPage` in `configs/helpers.ts`; the repaired `.oxlintrc.json` (root override anchored, every lookaround pattern rewritten, Vue blocks, `src/bin` block); `.prettierignore` with `showcase/`; the vendored `tests/config.test.ts` enumerating faces from the tree with mutation controls; the policy sweep's root setup mirror; the `no-nested-functions` admission for literal callbacks; the writable script region grown with the sheet, framework, showcase, and journey scripts.
- **Law.** Veneer's `AGENTS.md` and rules as the release vendors them (after `repair`, read the vendored copies, not the previous ones); `.claude/rules/documentation.md` for the roadmap edit.
- **Host.** Windows 11, Node 24; veneer's `node_modules` installed. Install only what the Phase names.

## Unknowns

- Which hand edits `repair` reports as drift versus which it restores silently; the `--json` output settles it, and every restored file's diff is read in full before the chain runs.
- Whether veneer's `src/vue` or `app/vue` sources trip the repaired lint restrictions (the old lookaround patterns never matched, so a boundary hit may surface for the first time); `npm run lint:check` read bare settles it, and each hit is quoted.

## Scope

- **Owned.** Every file `scaffold repair` writes (content-owned files restored from the release; birth-owned files only where veneer's copy is missing), `package.json` (the range; the writable script region as `repair` rewrites it), `vite.config.ts` (regenerated), `configs/**` (regenerated wrappers; delete a wrapper the plan no longer owns only through `overwrite` and only for a tracked foreign deletion the report names), `tests/config.test.ts` (vendored), `tests/setupPolicy.ts` (vendored), `.oxlintrc.json`, `.prettierignore`, `tsconfig.json`, the instruction files the release vendors, `src/styles/index.ts` (the `sheet.ts` shape if veneer still carries the side-effect entry), `configs/app/vite.journey.config.ts` (the mode-aware call), `tests/conformance.test.ts` (the Node `src:vue` reads move here per ruling 9), `tests/src/vue/index.test.ts` for that migration alone (the cases at about `:13-15` and `:23` that call `readModuleKeys` and `readSheet` from `tests/setupServer.ts` against the built entries leave this Chromium suite and land in `conformance`, keeping their assertions; the suite's remaining cases stay; delete the `setupServer` import once nothing in the file uses it), `ROADMAP.md` (§ Scaffold propagation closes with the date and the release), `guides/veneer.md` only where a sentence names a hand edit the release retired.
- **Off-limits.** `src/bootstrap/**`, `src/tailwindcss/**`, `src/styles/**` beyond the entry shape, `src/browser/**`, `src/vue/**`, `app/**` beyond what `repair` writes, every authored test under `tests/src/` and `tests/app/` except `tests/src/vue/index.test.ts` for the migration Owned names, `tests/integration.test.ts`, `tests/setupStyles.ts` and its proof, `showcase/` except through `npm run build:showcase` and `build:showcase:vue`, the scaffold checkout.
- **Tools and limits.** Read, patch, and the shell. Run: `git status --porcelain`, `git diff`, the install the Phase names, `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline --json`, `… repair --offline --json`, `… overwrite --offline --json` only as Scope admits, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm run build:showcase`, `npm run build:showcase:vue`, `npm test`, `npm run test:distribution -- --mode release`, and the scoped scripts on the way. Never run the mutating `npm run lint` or `npm run format` except once to converge before the non-mutating gates; never commit; never publish.

## Execution

1. Record `git status --porcelain` and `git diff --stat`. The tree carries what the previous runs of this unit wrote, and you continue from it: the authored migrations (`src/styles/sheet.ts` added, `src/styles/index.ts` star-exporting it, `configs/app/vite.journey.config.ts` on the mode-aware call, the two Node cases moved into `tests/conformance.test.ts`), the authored Chromium entry proof `tests/src/vue/index.test.ts` the survey wrote, the tarball install in `package.json` and `package-lock.json` with the range at `^0.0.82`, and every content-owned file an earlier `repair` restored from the previous pack (`tsconfig.json`, `vite.config.ts`, the `configs/**` wrappers and leaves, `.oxlintrc.json`, the three vendored proofs, both journey skill files, `package.json`'s script region). Stop only on a difference in a file outside those sets or outside the Owned set.
2. Install per the Phase, unconditionally: the tarball was repacked under the same version after the guard fix, so a same-version install from the earlier pack carries stale bytes. Remove `node_modules/@orkestrel/scaffold` (through `rmSync` in a one-off TypeScript file under veneer's `tmp/`, never a shell deletion of a path literal), run the install, and confirm the installed `dist/bin/main.js` carries the guard change by running the reproduction of `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-fix-10-report.md` against a scratch under `os.tmpdir()` (a manifest whose face scripts invoke the planned wrappers adopts in one `repair`), or by grepping the installed binary for the wrapper-mapping code the report names; quote the reading. Reinstall every time this phase runs, because the pack is rebuilt under the same version after each scaffold fix and the vendored host bytes change with it. Then write `^0.0.82` as the range as the Phase states. After `repair`, author `tests/src/vue/index.test.ts` if it is missing (the Chromium entry proof for `src/vue`; `repair` seeds no birth-owned file after birth): the shape a scratch `new … --extend browser:vue` seeds, adjusted to what veneer's `src/vue/index.ts` exports; the survey run may have written it already, in which case keep it. Run `audit --offline --json` and quote its questions and its stale paths (omit the hexadecimal payloads): it is the divergence inventory before adoption. Scaffold `0.0.82`'s `repair` now writes the manifest's script region before its `configs` guard reads reachability, so one `repair` adopts a manifest whose test scripts still invoke per-face wrappers; a refusal that still names the planned projects is a stop with the output quoted.
3. Move the hand-held shapes the verdict names: `src/styles/index.ts` to the `sheet.ts` form if still the side-effect entry; the journey wrapper to `appJourney(variant, VARIANTS, mode)`; the Node `src:vue` reads into `conformance` if any sit elsewhere.
4. Run `repair --offline --json`; quote it; read every restored file's `git diff` in full and name, per file, which hand-held behaviour the release now carries and which (if any) it does not. A behaviour the release does not carry is a stop: report it as a scaffold defect with the file and line.
5. Delete every hand edit `repair` left in a content-owned file only through `repair` itself (never by hand); where a file the plan no longer owns remains, name it and use `overwrite` only as Scope admits.
6. Run `catalog --json` (the verb takes no `--offline`; it refreshes the guide mirrors, reading the installed release's hosted guides where the registry is not reached; quote its JSON and name where each mirror came from) to close the `guides/scaffold.md` mirror question, then `audit --offline --json` again; it must report no stale selected artifact and no blocking question; quote its questions and stale paths. The seeded Chromium entry proof for `src/vue` (`tests/src/vue/index.test.ts`) returns through `repair` if the plan seeds it; otherwise the deleted file stays deleted and the report says which.
7. Converge once with `npm run lint` and `npm run format` if the non-mutating gates would refuse formatting alone; then run, in order and bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm run build:showcase`, `npm run build:showcase:vue`, `npm test`, `npm run test:distribution -- --mode release`. Quote every failure in full; a failure in a gate is a stop.
8. `ROADMAP.md` § Scaffold propagation: each of items 1 to 6 closes with "Carried by scaffold `0.0.82`; adopted on 2026-10-01" or names what remains; the paragraph that names the eight hand-edited vendored files becomes a statement that the release carries them.
9. Record `git status --porcelain` and `git diff --stat` at the end.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-9-report.md` with: the Phase; the two `audit` readings; the `repair` reading with the per-file behaviour table; the deleted divergences; the gate table with exit codes and test counts; the showcase pages' stamps; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when `repair` would restore a behaviour veneer needs and the release lacks, when a gate reddens after adoption (quote it bare), when `audit` still reports a stale selected artifact after `repair`, or when a change needs a file outside the owned set.

## Acceptance criteria

1. `audit --offline --json` after adoption reports no stale selected artifact and no blocking question.
2. Every gate in step 7 exits 0, read bare; `showcase/browser.html` and `showcase/vue.html` carry one stamp line each equal to the page's digest.
3. No hand edit remains in the eight vendored files (each equals the release's bytes, as `audit` proves).
4. `ROADMAP.md` § Scaffold propagation closes or names what remains.

## Review evidence

The diff and `git status --porcelain`; the report file.
