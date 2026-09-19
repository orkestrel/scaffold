# Unit S1 — make this workspace a showcase workspace, and build the showcase

## Role and engine

`opus` — Opus 5, native Claude subagent, the **roughnotes** checkout at
`C:\Users\mikes\WebstormProjects\roughnotes`, sole serial writer. No other unit is live here.

## Objective

Turn this application into a scaffold **showcase workspace** and produce the committed single-file
page a reader can open: `demo/showcase.html`.

The owner asked for the showcase so they can see the application on GitHub. `dist/` is ignored, so
the artifact that satisfies that is `demo/showcase.html`, which is not ignored and which scaffold's
own `show` script exists to produce.

## What scaffold requires, already established

Do not re-derive these. Each was read out of the scaffold source at
`C:\Users\mikes\WebstormProjects\scaffold`.

**The trigger file.** `SHOWCASE_CONFIG_PATH` is `configs/app/vite.showcase.config.ts`, and
`src/core/constants.ts` states its presence is what makes a workspace a showcase. `src/bin/CLI.ts`
derives the fact by resolving that exact path with an exact-case check, so the path and its casing
are load-bearing. Its generated content is exactly:

```ts
import { defineConfig } from 'vite'
import { appShowcase } from '../../vite.config.ts'

export default defineConfig(appShowcase())
```

**The dependency is already declared and installed.** `vite-plugin-singlefile` sits at `^2.3.3` in
`devDependencies`, which is the range `SHOWCASE_DEV_DEPENDENCIES` names, and `node_modules` carries
it. Do not install anything.

**The scripts.** `src/core/compilers.ts` gives a showcase workspace exactly these, verbatim:

```json
"showcase": "vite --config configs/app/vite.showcase.config.ts",
"build:showcase": "vite build --config configs/app/vite.showcase.config.ts",
"show": "npm run format && npm run build:showcase && npm run copy dist/showcase/index.html demo/showcase.html"
```

The `copy` script they depend on already exists in this manifest.

**No other file is required.** A showcase reuses `app/browser/index.html` and
`configs/app/tsconfig.browser.json` untouched.

## The substantive change

This workspace's `appShowcase` is **not** scaffold's. It currently reads:

```ts
const showcase: UserConfig = {
	plugins: [outputBoundary(output)],
	build: { outDir: resolveWorkspacePath(output) },
}
```

That writes a second copy of the ordinary build into another directory. It carries none of the
machinery that makes one file. Scaffold's template, read from `src/core/templates.ts`, is:

```ts
export function appShowcase(override?: UserConfig): UserConfig {
	const output = 'dist/showcase'
	const showcase: UserConfig = {
		plugins: [
			outputBoundary(output),
			viteSingleFile({
				removeViteModuleLoader: true,
				useRecommendedBuildConfig: true,
			}),
			{
				name: 'orkestrel-showcase-html',
				transformIndexHtml: {
					order: 'post',
					handler(html) {
						const stamp = new Date().toISOString()
						return html.replace(
							'</head>',
							'\t\t<meta name="build-id" content="' + stamp + '" />\n\t</head>',
						)
					},
				},
			},
		],
		build: {
			// The `appBrowser` factory sets `assetsInlineLimit` to 0, so every asset becomes
			// its own file, and 4096 is Vite's own default put back. The `viteSingleFile`
			// plugin overwrites the value while the `useRecommendedBuildConfig` option stays
			// true, so this line takes effect only in a workspace that turns that option off.
			assetsInlineLimit: 4096,
			cssMinify: 'lightningcss',
			minify: 'oxc',
			modulePreload: false,
			outDir: resolveWorkspacePath(output),
			reportCompressedSize: false,
			sourcemap: false,
			target: 'esnext',
		},
	}
	return appBrowser(mergeOverride(showcase, override))
}
```

Port that body. Keep this workspace's existing doc block's substance where it is still true, and
correct what the change makes false — the remark saying the factory "restates neither the aliases,
the plugins, nor the build options `appBrowser` declares" stops being accurate the moment the body
declares plugins and build options. The summary sentence must keep passing
`policy/no-malformed-summary`: a third-person `-s` verb opening that does not repeat the symbol's
name, and not a plural noun.

`viteSingleFile` needs importing from `vite-plugin-singlefile`.

## The two things that must survive

**The four-variant journey fan-out.** `vite.config.ts` carries the `JourneyVariant` interface,
`VARIANTS`, `JOURNEY_INCLUDE`, the `journey(variant)` factory, the
`...VARIANTS.map((variant) => () => journey(variant))` spread, and the `exclude: [JOURNEY_INCLUDE]`
line on the shared browser project. A previous unit nearly lost this to a regeneration. You are
editing the file by hand, so the risk is lower, but prove it survives rather than assuming.

**`tests/conformance.test.ts` drives `appShowcase` and counts its plugins.** It is this workspace's
own file, not vendored, and it is YOURS to update. It asserts things like
`countPlugin(appShowcase(), 'orkestrel-output-boundary')` being 1 and `vite:vue` being 1. Adding two
plugins changes what that file must expect. Update it to assert the new truth, including the
`vite-plugin-singlefile` and `orkestrel-showcase-html` entries, rather than loosening an assertion
to make it pass.

## The guide ruling you must make

`guides/README.md` states, in its concept index preamble, that this workspace builds no showcase of
a public API and that the column is therefore absent. Adding a showcase makes part of that sentence
false.

Rule on it and rewrite it truthfully. The distinction that matters: `.claude/rules/documentation.md`
describes a showcase as executable proof of public API, and this application publishes no public
API. What it now builds is a single-file projection of the application itself, which is a different
thing wearing the same word. Say which of the two this workspace has, and do not claim the one it
does not.

Do not add a showcase column to the concept index unless you can fill every row honestly.

## Unknowns

- **Whether the build truly produces one file.** `vite-plugin-singlefile` inlines JavaScript and CSS.
  `bootstrap-icons` ships `url()` references to `.woff2` and `.woff` font files, and a font larger
  than the inline limit can stay external. **Report exactly what `dist/showcase` contains after the
  build** — every file and its size — and say plainly whether `demo/showcase.html` is self-contained
  or references something beside it. Do not claim self-containment you did not check.
- **Whether the page actually renders.** You cannot judge this from source. Report the built size
  and the file list; the Orchestrator opens the page and rules on the rendered result.
- **What the build stamp does to the committed file.** The template writes
  `new Date().toISOString()` into a `build-id` meta tag, so every build changes the committed file
  even when nothing else moved. Note it as an observation.

## Scope

**Owned files:** `configs/app/vite.showcase.config.ts` (new), `vite.config.ts`, `package.json`,
`tests/conformance.test.ts`, `guides/README.md`, and `demo/showcase.html` (build output).

**Off-limits.** The vendored set, because `scaffold repair` restores it and an edit there is reverted
without warning: `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`,
`configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`, `.prettierignore`, `.claude/`. Also
off-limits: `app/` in its entirety — a showcase must need no application change — plus `tests/app/`,
`configs/app/vite.browser.config.ts`, `configs/app/tsconfig.*.json`, `guides/*.md` other than
`README.md`, and `.orkestrel/`.

Do not commit, push, install a dependency, or bump a version. Run no `git checkout`, `git restore`,
`git stash`, `git reset`, or `git clean`.

Never silence a rule: no `eslint-disable`, no `oxlint-disable`, no suppression comment, no `any`, no
`as`, no non-null assertion.

## Standing conditions — report, do not chase

- **`npm test` exits 1** on one vendored case, `tests/config.test.ts > configuration helpers > reads
  the compiler scope and fixed extractor override a declaration roll-up requires`, throwing `The
  workspace declares no face project`. It is a defect in another repository's vendored file and is
  being fixed there. Confirm it stays the only failure.
- **`scaffold audit` reports `vite.config.ts` stale** by design, because the file carries the journey
  surface the plan does not know about.
- **`scaffold audit` reports `guides/test.md` differs from the hosted guide.** Scaffold 0.0.72
  vendored that guide from before `@orkestrel/test@0.0.16` published. Not yours.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- Write any multi-step command to a script file and run the file. A heredoc, a `node -e`, or an `&&`
  chain trips the shell's approval classifier and stalls an unattended run.
- The ordinary build's CSS asset is 323.24 kB. The showcase build is a separate output and is not
  bound by that number.
- A `deprecat` line in a build or test log is a regression.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `configs/app/vite.showcase.config.ts` exists at exactly that path and casing, with exactly the
   content quoted earlier.
2. `package.json` carries the three scripts verbatim.
3. `npm run format:check` exits 0.
4. `npm run lint:check` exits 0.
5. `npm run check` exits 0.
6. `npm run show` exits 0 and `demo/showcase.html` exists. Report its byte size and the complete
   listing of `dist/showcase` with each file's size.
7. `npx vitest run --project conformance` passes, with counts.
8. `npm run test:journey` collects four journey projects and passes, with counts.
9. `npm run build` still exits 0 and the ordinary CSS asset is still 323.24 kB — the showcase must
   not disturb the ordinary build.
10. `npx scaffold audit` reports nothing newly drifted beyond the standing conditions. Name every
    row and note whether the new config file reads as planned or foreign.
11. `git status --short` shows no path outside the owned list.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Stop and report where the port requires
editing an off-limits file, or where the single-file build cannot produce a working page.

Settle these yourself and record each choice: the `appShowcase` doc block's wording, how
`tests/conformance.test.ts` expresses the new plugin expectations, and the `guides/README.md`
rewrite.

## Output

Write your report to `tmp/units/s1-report.md`, and make your final message the same content: done or
not done per criterion; the exact `dist/showcase` listing with sizes; whether `demo/showcase.html` is
self-contained and what it references if not; your guide ruling and its reasoning; and anything you
could not close.

No process diary.
