# Unit V1: core version authority

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. Ruling record:
`.orkestrel/campaign/design-versions-reconciliation.md` (read it first), with the lane
detail in `design-versions-objective-report.md` and `design-versions-subjective-report.md`
beside it. This unit adopts the ruled design; a departure stops the unit. You perform the
assignment directly and spawn nothing beyond probes under `tmp/` that you delete after
reading.

## The work

1. **The manifest import.** `src/core/constants.ts` imports the package's own
   `../../package.json` with `{ type: 'json' }`. The self-pin
   (`@orkestrel/scaffold`) derives as `^${manifest.version}`; every table row whose name
   scaffold's own manifest declares (any section) derives from that manifest row. The
   analyst lane measured this import green through scoped `tsc`, vitest, the Vite build,
   and declaration roll-up — if any stage refuses it in your run, stop and report per the
   deviation contract.
2. **Foreign form.** Every foreign range in `package.json` converts to bare `^MAJOR`
   (`typescript ^6`, `vite ^8`, `vitest ^4`, `oxfmt ^0`, `oxlint ^1`, `@types/node ^26`,
   `@microsoft/api-extractor ^7`, `vite-plugin-dts ^5`, `playwright ^1`,
   `@vitest/browser-playwright ^4`), fleet pins stay exact carets; regenerate the lockfile
   with a real install. Derived emission copies the manifest verbatim — no second
   normalizer.
3. **Seeds.** Table rows the manifest does not declare become supported-major seeds:
   `@vitejs/plugin-vue ^6`, `vue ^3`, `vue-tsc ^3`, `vite-plugin-singlefile ^2`; the
   uninstalled fleet rows in the app-server table keep their exact-caret current values as
   offline seeds. Every shared-table `@example` TSDoc verdict that names a version value
   becomes prose (the distribution census trap — V3 owns the census assertion itself).
4. **Helpers.** Add the tested range-to-major projection the drift checks need
   (`{verb}{Noun}` name per the names rules; it answers the extracted major for the
   admitted forms and `undefined` off-form). Do not use `matchesRange` for drift.
5. **Compilers.** `blueprintToDevDependencies` keeps its signature and merges as today over
   the now-derived tables. Add the pure manifest-range replacement compiler the verbs will
   apply to a plan's manifest artifact (name and place per the compilers kind rules), with
   the plan-hash recomputation seam V2 will call. `blueprintToQuestions`' toolchain
   collision gate stays.
6. **TSDoc** on the moved surfaces per the typescript rules.

## Scope

- Owned: `package.json`, `package-lock.json`, `src/core/constants.ts`,
  `src/core/helpers.ts`, `src/core/compilers.ts`, `src/core/types.ts` (TSDoc and any type
  the replacement compiler needs), `tests/src/core/helpers.test.ts` (the new helper's
  cases only).
- Off-limits: every test file V3 owns (`constants.test.ts`, `compilers.test.ts`,
  `templates.test.ts`, fixtures, `distribution.test.ts`) — the digest and mirror cases WILL
  red under your change; that is V3's subject, not yours. `guides/scaffold.md` likewise.
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs beyond the criterion-2 lockfile regeneration, or
  `git checkout`/`restore`/`stash`/`reset`/`clean`. Use `npx.cmd`. Network IS available to
  this exec for the install only if the sandbox permits it; if the install is denied by the
  sandbox, stop and report — the Orchestrator takes the install on the host.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus your owned files;
   report before/after.
2. The lockfile regenerates against the converted ranges (report the resolved versions for
   typescript, vite, oxfmt).
3. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0, and the scoped core check
   `npx.cmd tsc --noEmit -p configs/src/tsconfig.core.json` exits 0 (the import under
   `types: []`).
5. `npm run build` exits 0 and the built `dist/src/core/index.js` contains the inlined
   version (report the grep) with no runtime JSON import remaining.
6. Failing-first for the new helper (an off-form range red against a probe weakening the
   projection, green restored) and for the replacement compiler (a replaced range present
   in the output, red with the replacement disabled).
7. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`
   — report the totals as an OBSERVATION: the V3-owned mirror and digest cases are expected
   red; name exactly which cases red and confirm nothing else does.

## Output

The complete unelided diff; raw output and exit code per criterion including the
failing-first pairs; any deviation. No process diary.

## Deviation contract

Stop on: any toolchain stage refusing the JSON import; the sandbox denying the lockfile
install; an unexpected case reddening outside the V3-owned set; a criterion unreachable.
Naming within the rules is yours: decide, record, carry on.
