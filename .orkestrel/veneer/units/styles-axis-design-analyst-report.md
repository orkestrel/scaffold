**Q1 — Keep the relative SCSS import.**

The shell’s entry remains:

```ts
import '../../src/styles/index.scss'
```

Keep `src/styles/index.ts` as `import './index.scss'`.

Executed readings distinguish resolution from enforcement:

| Candidate | Vite resolution | Boundary result for `app/browser` |
| --- | --- | --- |
| `../../src/styles/index.scss` | Source SCSS | Admitted |
| `../../src/styles/index.ts` | Source TypeScript entry | Admitted |
| `../../src/styles/index.js` | Source TypeScript entry | Admitted |
| `@src/styles` | Unresolved | No source-level refusal |
| `@orkestrel/veneer/styles` | Built CSS | Admitted |

The controls behaved differently: `node:fs` produced a source refusal, and the resolved server path produced a path refusal. The stylesheet predicate returned true for SCSS and false for the TypeScript entry. It classifies stylesheet paths; it doesn’t exempt every stylesheet from every boundary.

Reject the TypeScript entry imports because `.oxlintrc.json` permits unassigned imports through stylesheet suffixes, and `.typescript.md` requires `.js` spelling for local TypeScript imports. Reject the package self-import because it consumes `dist/`, introducing a build prerequisite into source development. Reject an invented alias because the roots own alias configuration.

The existing SCSS import passed scoped Oxlint. See [Veneer’s import rule](C:/Users/mikes/WebstormProjects/veneer/.oxlintrc.json:43), [boundary helpers](C:/Users/mikes/WebstormProjects/veneer/configs/helpers.ts:311), and [Scaffold’s alias law](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/workspace.md:49).

Record this departure sentence:

> The showcase imports `../../src/styles/index.scss` because Scaffold generates no `@src/styles` alias; replace that import when the generator supplies the alias and permits its side-effect use through the lint configuration.

**Q2 — Choose root composition with direct field replacement, retaining a narrow helper-leaf departure.**

Use this shape for `configs/src/vite.styles.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import { srcBrowser, resolveWorkspacePath } from '../../vite.config.js'
import { outputBoundary } from '../helpers.js'

export default defineConfig(() => {
	const browser = srcBrowser()
	const {
		external: _external,
		output: _output,
		...rolldownOptions
	} = browser.build?.rolldownOptions ?? {}

	return {
		...browser,
		plugins: [
			outputBoundary('dist/src/styles'),
			{
				name: 'veneer-logical-rtl',
				enforce: 'post',
				generateBundle(_options, bundle) {
					const css = bundle['index.css']
					if (css?.type !== 'asset') {
						throw new Error('The styles build emitted no index.css')
					}
					this.emitFile({
						type: 'asset',
						fileName: 'index.rtl.css',
						source: css.source,
					})
				},
			},
		],
		build: {
			outDir: 'dist/src/styles',
			emptyOutDir: true,
			lib: {
				entry: resolveWorkspacePath('src/styles/index.ts'),
				formats: ['es'],
				fileName: 'index',
				cssFileName: 'index',
			},
			rolldownOptions,
		},
		test: {
			...browser.test,
			name: { label: 'src:styles', color: 'cyan' },
			include: ['tests/src/styles/**/*.test.ts'],
			exclude: [],
			setupFiles: [
				'./tests/setup.ts',
				'./tests/setupBrowser.ts',
				'./tests/setupStyles.ts',
			],
		},
	}
})
```

This retains the root’s aliases, browser provider, parallelism setting, and build-log handler. It removes browser-library externalization and output remapping.

The in-memory build, with filesystem output disabled, emitted `index.js`, `index.css`, and `index.rtl.css` matching the existing artifacts byte for byte.

Reject these alternatives:

- **Declare everything from leaves:** duplicates aliases and browser-provider configuration.
- **Pass the styles configuration through `mergeOverride`:** the executed result retained browser test discovery and concatenated library formats.
- **Retain the original output plugin:** its executed `buildStart` refused the styles output directory.
- **Retain `environmentBoundary('src/browser')` as styles enforcement:** styles modules fall outside its module population.
- **Add a styles factory or helper re-export to the root:** changes content-owned files outside this pilot.

The leaf import remains a literal departure from the configuration-authority rule. The root doesn’t export `outputBoundary`, and its existing plugin captures the browser output directory. Generated browser and core wrappers also import helper leaves, so importing a leaf isn’t unique to the pilot.

See [configuration authority](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/workspace.md:65), [merge behavior](C:/Users/mikes/WebstormProjects/veneer/vite.config.ts:63), [the browser factory](C:/Users/mikes/WebstormProjects/veneer/vite.config.ts:125), [direct replacement precedent](C:/Users/mikes/WebstormProjects/veneer/vite.config.ts:243), and [output enforcement](C:/Users/mikes/WebstormProjects/veneer/configs/helpers.ts:404).

**Q3 — Use the name object with `cyan`.**

The exact setting is:

```ts
name: { label: 'src:styles', color: 'cyan' }
```

Reject the bare string because the root consistently uses `{ label, color }`, and its configuration proof reads that shape. Cyan already belongs to the root palette. The palette reuses colors, so cyan isn’t an exclusive styles designation or a correctness requirement. Retaining yellow would be valid but would retain the base browser project’s presentation.

See [root project colors](C:/Users/mikes/WebstormProjects/veneer/vite.config.ts:150), [cyan usage](C:/Users/mikes/WebstormProjects/veneer/vite.config.ts:365), and [name-shape validation](C:/Users/mikes/WebstormProjects/veneer/tests/config.test.ts:312).

**Q4 — Publish CSS directly and expose the retained RTL artifact.**

Keep the main styles export and add an address for the emitted companion:

```json
"./styles": "./dist/src/styles/index.css",
"./styles/rtl": "./dist/src/styles/index.rtl.css"
```

Keep this side-effect declaration:

```json
"sideEffects": ["**/*.css"]
```

Reject the JavaScript wrapper as the styles export: the emitted `index.js` is empty. It loads no CSS. Executing the distribution classifiers against that export classified it as `undeclared`; the CSS target classified as `excluded` from module-surface comparisons.

Reject a conditions object selecting JavaScript for `import`: the executed classifier selected the empty wrapper for the browser and ESM conditions and again reported an undeclared module.

Reject dropping the RTL artifact in this unit. The token proof imports it, and the setup proof checks its existence and contents. Those proofs belong to U3. Publish the retained artifact through `./styles/rtl` rather than leaving consumers to discover a blocked deep path. Native resolution confirmed that the existing export map refuses that subpath.

The artifacts were byte-identical in the reading. Document that fact without claiming a separate RTL transformation.

If a later design publishes a working JavaScript loader, that loader must actually import CSS and must also appear in `sideEffects`:

```json
"sideEffects": ["**/*.css", "./dist/src/styles/index.js"]
```

That metadata alone cannot turn the empty wrapper into a loader.

A vanilla consumer serves the resolved CSS asset and writes:

```html
<link rel="stylesheet" href="./styles.css">
```

That is the consumption path the distribution proof exercises: resolve the installed styles export, copy its CSS into the served assets, and inspect the loaded stylesheet in Chromium. It doesn’t prove JavaScript side-effect retention.

See [stylesheet output law](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/workspace.md:99), [distribution consumption](C:/Users/mikes/WebstormProjects/veneer/tests/distribution.test.ts:641), [module classification](C:/Users/mikes/WebstormProjects/veneer/tests/distribution.test.ts:758), [RTL token consumption](C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/tokens.test.ts:5), and [RTL setup assertions](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:144).

**Q5 — Keep build-before-test.**

Retain the script:

```json
"test:src:styles": "npm run build:src:styles && vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot"
```

The setup imports built CSS during module evaluation. The token proof also imports the built RTL artifact. Rebuilding before collection makes the script work from absent output and prevents it from testing a stale cascade.

Reject source-SCSS loading for this project because it changes the subject from the emitted artifact to the development server’s compilation. It also leaves the RTL artifact import unresolved.

Reject `build` from `@orkestrel/test/browser` as an alternative compiler: its installed declaration and implementation construct an HTML element. It doesn’t compile Sass or produce distribution assets.

Reject relying solely on an earlier root build because running the styles script independently must establish its own prerequisite. This is artifact preparation; it doesn’t turn the style assertions into distribution tests.

See [compiled-cascade setup law](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/workspace.md:190), [the setup import](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:4), and [the installed DOM builder](C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:75).

**Q6 — Add “Styles environment” between “Tokens” and “Showcase”.**

Keep the explanation in `guides/veneer.md`, after the Tokens subsections and before Showcase. Open with:

> The `@orkestrel/veneer/styles` specifier resolves to standalone CSS. The `@orkestrel/veneer/styles/rtl` specifier resolves to its byte-identical RTL companion. The styles build also emits a JavaScript entry that loads no CSS and has no package export.

The section must describe these concrete subjects:

- The side-effect entry, SCSS compilation barrel, Vite wrapper, and check-only TypeScript configuration.
- The output files and public CSS specifiers.
- The build, check, and test scripts, including their parent chains.
- The browser test project, setup imports, and build prerequisite.
- The retained departures and their causes.
- The migration condition for generated aliases, factories, boundary enforcement, project registration, and configuration proofs.

Reject a separate styles guide because Veneer’s guide map already assigns the styles directory to `veneer.md`. Reject putting configuration details in the public API table because these files publish no TypeScript API. Reject placing the migration record only in campaign artifacts because maintainers need it beside the package contract.

See [Veneer’s guide map](C:/Users/mikes/WebstormProjects/veneer/guides/README.md:20), [the insertion point](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:339), and [documentation authority](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/documentation.md:22).

**Q7 — Correct the census and retain explicit enforcement limits.**

The additional rulings are:

| Subject | Ruling and evidence |
| --- | --- |
| Environment boundaries | No styles owner exists. Executed `isWorkspaceBoundaryModule` readings excluded the styles TypeScript entry and SCSS barrel while admitting browser modules. Record the unguarded styles graph; don’t label the browser boundary as styles enforcement. [Helper population](C:/Users/mikes/WebstormProjects/veneer/configs/helpers.ts:124) |
| Oxlint restrictions | General TypeScript policy reaches `src/styles/index.ts`, but no environment-specific `no-restricted-imports` override targets `src/styles/**`. Don’t add a local override to the content-owned configuration. [Lint configuration](C:/Users/mikes/WebstormProjects/veneer/.oxlintrc.json:95) |
| SCSS lint coverage | Oxlint’s executed file discovery selected the styles TypeScript entry and omitted SCSS. A green lint result doesn’t validate SCSS rules. Sass compilation and the authored style proofs provide different coverage. |
| Policy sweep | Styles aren’t wholly absent. The mirror instrument recognizes SCSS partials, and the surface instrument requires the exact side-effect entry. Executed styles checks returned no violations; an absent-module control produced a mirror violation. [Mirror population](C:/Users/mikes/WebstormProjects/veneer/tests/setupPolicy.ts:261), [entry validation](C:/Users/mikes/WebstormProjects/veneer/tests/setupPolicy.ts:2247) |
| Generated config proof | The census is correct about its axis omission. The proof requires generated environments and ignores extra wrappers before reading them. Its stylesheet-helper case doesn’t validate the styles wrapper. [Wrapper selection](C:/Users/mikes/WebstormProjects/veneer/tests/config.test.ts:432) |
| Setup CSS | `tests/setup.css` is absent, and browser setup doesn’t load it. This conflicts with the setup-assets rows. It isn’t forced by content-owned roots. Report the mismatch to U3 for reconciliation; don’t describe the pilot as conforming to those rows. [Setup-assets law](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/workspace.md:186) |
| Test aggregation | `npm test` reaches styles, but `test:src` omits it. Correct the manifest aggregation rather than retaining that omission as a generator limitation. [Scripts](C:/Users/mikes/WebstormProjects/veneer/package.json:60) |
| Typechecking | The styles configuration matches the check-only scope. The executed scoped `tsc --noEmit` command exited successfully. SCSS semantics remain outside that check. [Styles scope](C:/Users/mikes/WebstormProjects/veneer/configs/src/tsconfig.styles.json:1) |
| Helper placement | Keep configuration behavior out of `src/styles/**`. Don’t add `configs/types.ts`, another helper leaf, or workspace imports inside the vendored leaves. [Leaf constraint](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/workspace.md:65) |
| RTL claim | The emitter copies bytes. The direction scanner explicitly excludes some direction-sensitive forms, so replace the comment claiming every declaration is logical with the narrower byte-copy statement. [Scanner limit](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:236) |

Use this aggregation:

```json
"test:src": "npm run test:src:core && npm run test:src:browser && npm run test:src:styles"
```

Remove the separate `npm run test:src:styles` invocation from `test`, leaving its remaining chain intact.

Reject extending the vendored config proof, adding another stylesheet analyzer, or treating green generated gates as styles-axis coverage. Those options respectively violate ownership, duplicate the toolchain, or overstate what ran.

The pilot keeps these departures, with these guide sentences:

1. **Hand-authored axis.** “Scaffold generates no styles axis, so Veneer supplies its styles configuration, scripts, and package exports by hand.”
2. **Source import.** “The showcase imports `../../src/styles/index.scss` because Scaffold generates no `@src/styles` alias; replace that import when the generator supplies the alias and permits its side-effect use through the lint configuration.”
3. **Factory composition and leaf import.** “The styles wrapper derives shared settings from the root browser factory and replaces its target fields; it imports the output guard from the helper leaf because the root exposes no styles factory or output-guard factory.”
4. **Boundary coverage.** “The generated environment guards and import restrictions have no styles owner, so they don’t enforce the styles graph.”
5. **Project registration.** “The styles project runs through its dedicated configuration because the generated root project list omits it; selecting `src:styles` through the root configuration doesn’t run this project.”
6. **Configuration-proof coverage.** “The vendored configuration proof omits the styles axis, so its result doesn’t validate the styles wrapper, alias, or project registration.”
7. **Artifact preparation.** “The styles test script rebuilds its output before collection because its setup and token proofs import the emitted CSS.”
8. **RTL companion.** “The styles build emits `index.rtl.css` by copying `index.css`; the package exposes that companion through `@orkestrel/veneer/styles/rtl`.”

End that guide section with the generator migration sentence:

> When Scaffold generates the styles axis, replace the pilot’s hand-authored wiring with generated wiring after the alias, lint allowance, styles factory, boundary coverage, root project registration, and configuration proof support it.

**Route the implementation to `sol`, after U3 releases the checkout.** The work depends on precise configuration replacement, artifact preservation, export resolution, and script reachability. The guide’s location and required wording are specified. U3’s setup-assets mismatch needs reconciliation before the pilot can claim full workspace-rule alignment.