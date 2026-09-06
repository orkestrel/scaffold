# Unit report — ts6-u12-visit (fleet-visit-indexeddb, phase A)

## Status

Stopped at step 3, per the brief's own deviation contract: "Stop and report when a face's config
does not carry the `dts(` shape the Context states." Steps 1 and the read-only part of step 3
(inspecting the current file and the seed) ran; no owned file was edited.

## Step 1 — preflight

- `git status --short` — exit 0, no output (clean tree), as expected.
- `node -e "console.log(require('@orkestrel/scaffold/package.json').version)"` — exit 0, printed
  `0.0.63`. `package.json` also pins `"@orkestrel/scaffold": "^0.0.63"`. No
  `swap-scaffold.log.txt` exists anywhere under `/home/user/fleet/indexeddb` or
  `/home/user/fleet` (checked with `find`), so the head-start version named in that log could not
  be cross-checked against the installed `0.0.63`. Recorded as an observation, not a blocker on
  its own.

## Deviation

**Expected** (brief Context, paragraph 3): the face's current `dts(...)` call has the shape
`dts({ tsconfigPath, bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: [...] } } } } } })`,
which the visit rewrites to `declarationRollup({ project, types: [...] })` "with the same types
the dts call passed," and "nothing else in the file changes."

**Found**: this checkout has one face, `browser`
(`/home/user/fleet/indexeddb/configs/src/vite.browser.config.ts`). Its actual `dts(...)` call is:

```ts
dts({
	tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.browser.json'),
	bundleTypes: true,
	beforeWriteFile: (path, content) => ({
		content: /[\\/]dist[\\/]src[\\/]browser[\\/]index\.d\.ts$/.test(path)
			? content.replaceAll(/(?:\.\.\/)+core\/index\.[jt]s/g, '@orkestrel/indexeddb')
			: content,
	}),
})
```

`bundleTypes` is the literal boolean `true`, not the nested
`{ extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types } } } } }` object
the Context describes, there is no `types` array anywhere in the call, and the transformation the
call performs is a `beforeWriteFile` core-specifier rewrite, not a `types` override. Cross-checking
the seed the brief names — `node_modules/@orkestrel/scaffold/dist/src/core/index.js`, the compiled
form of `src/core/templates.ts`, `vites.src.browser` string (lines 1158–1173) — confirms the target
shape for a browser face is:

```ts
import { declarationRollup, rewriteCoreSpecifier } from '../helpers.js'
...
declarationRollup({
	project: resolveWorkspacePath('configs/src/tsconfig.browser.json'),
	rewrite: rewriteCoreSpecifier,
})
```

with no `types` key at all, and a revised leading comment ("The roll-up reaches src/core through a
specifier the tarball does not carry, so the rewrite externalizes core through the package's own
published root export, on the final roll-up alone.") that replaces the current comment's
`vite-plugin-dts`-specific wording — a second change to the file beyond the `dts(` call itself,
which the brief's "nothing else in the file changes" does not anticipate.

**Evidence**:
- Current file: `/home/user/fleet/indexeddb/configs/src/vite.browser.config.ts` (full contents
  read; reproduced above).
- Seed: `node_modules/@orkestrel/scaffold/dist/src/core/index.js:1126` (core face, uses
  `declarationRollup({ project, types: ['node'] })`, no `rewrite`) versus
  `node_modules/@orkestrel/scaffold/dist/src/core/index.js:1158-1173` (browser face, uses
  `declarationRollup({ project, rewrite: rewriteCoreSpecifier })`, no `types`).
- `configs/helpers.ts` in this checkout (782 lines) has no `declarationRollup` or
  `rewriteCoreSpecifier` export yet — it is the pre-repair vendored copy; the head start's
  `declarationRollup` and `rewriteCoreSpecifier` live only in
  `node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts:480-751`, confirming `repair`
  is what would land the helper this face's rewritten config would import.

**Done / not done**: not done. `package.json`, `configs/src/vite.browser.config.ts`,
`tests/distribution.test.ts`, and every later step (`repair`, `audit`, format/lint/check, build,
`test:distribution`, final status) did not run. The tree remains clean and unmodified.

**Hypothesis**: the brief's Context paragraph generalizes the transformation from a face that
passes an explicit `types` array through `bundleTypes.extractorConfig...types`, but this
checkout's only face (`browser`) instead uses `beforeWriteFile` for a core-specifier rewrite with
no `types` override, so the literal shape and the "nothing else changes" scope both need
confirming against the seed before the rewrite proceeds.
