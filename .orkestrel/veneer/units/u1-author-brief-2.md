# Unit U1-author — successor brief 2

## What this supersedes

This brief supersedes `u1-author-brief.md`, which stays in place unedited. Every section
of that brief stands except where this file amends it. Read that brief first, then this one.

## Why a successor

The first run (journal `../scaffold/units/u1-author.jsonl`, thread
`01a0bd8e-edb5-7572-9734-2725d363c3fe`) stopped before editing because the generated
`tests/config.test.ts` selected a `setup` project the root did not register. The Orchestrator
closed that in commit `a5de4c4` (unit U1-rep4): `scaffold repair` registered the Node `setup`
project, `test:setup` joined the `test` chain, `tests/setupConformance.test.ts` was seeded, the
three `tests/setupConformance.ts` summaries open with a verb, and `guides/README.md` is the concept
and directory table form that `parseManifest` reads. The checkout is clean at `a5de4c4`.

## Amended evidence

**Measurements at `a5de4c4` (2026-09-20, Orchestrator, outside the sandbox).** `lint:check` 0;
`format:check` 0; `test:config` 0 (`173 passed | 1 skipped`); `test:setup` 0 (`4 passed`);
`test:conformance` 0; `test:setup:browser` 0; `test:src` 0; `test:app` 0; `check` 1 (the missing
`configs/src/tsconfig.styles.json`, unchanged); `test:journey` 1 (empty suite, unchanged);
`test:guides` 1 with exactly these findings:

```text
guides/veneer.md has no ## Methods section.
guides/veneer.md has no ## Tests section.
guides/veneer.md has no documented method groups.
guides/veneer.md has no mapped self import.
guides/veneer.md has no links.
guides/veneer.md has no test links.
```

The guides checker (`node_modules/@orkestrel/guide/dist/src/core/index.js:3605-3622`) requires a
`## Surface`, a `## Methods`, and a `## Tests` section and at least one documented method group: an
`####` heading naming a behavioral interface as a code span followed by its method table. A guide
over an empty surface cannot satisfy it truthfully, so this unit ships the package's first
behavioral export, described under § Amended execution, and documents it.

**The `setup` project.** `vite.config.ts` registers `setup` (Node) with include
`tests/setup*.test.ts`, exclude `tests/setupBrowser.test.ts`, setup files `./tests/setup.ts`.
`tests/setupStyles.test.ts` and `tests/setupConformance.test.ts` run there through
`npm.cmd run test:setup`. The throwaway configuration the first brief's step 9 described is no
longer needed; do not write it.

**Seeds now present.** `tests/setupConformance.test.ts` proves the module's export set, the
workspace and manifest locations, the version pin, and the reader's `undefined` cases. Extend it
for every helper and constant you add; keep its existing cases.

## Amended scope

**Owned, in addition.** `src/browser/types.ts`, `src/browser/constants.ts`, `src/browser/guards.ts`,
`src/browser/factories.ts`, `src/browser/theme/Theme.ts`, `src/browser/index.ts`, and their mirrors
under `tests/src/browser/`.

## Amended execution

Insert this step between the first brief's step 1 (styles axis) and step 2 (shell), and let the
shell consume it.

**1b. Theme engine.** Types first, in `src/browser/types.ts`:

```ts
/** The color modes Bootstrap's color-mode contract names on `data-bs-theme`. */
export type ThemeMode = 'light' | 'dark'

/** Options for a theme controller. */
export interface ThemeOptions {
	/** The element carrying `data-bs-theme`; `document.documentElement` when absent. */
	readonly root?: HTMLElement
	/** Where the chosen mode persists under the `theme` key; nothing persists when absent. */
	readonly storage?: Storage
}

/** Controls the `data-bs-theme` attribute on one root element. */
export interface ThemeInterface {
	/** The element carrying the attribute. */
	readonly root: HTMLElement
	/** The mode the root carries, derived from its attribute on every read. */
	readonly mode: ThemeMode
	/** Writes `mode` to the attribute, and to storage when configured. */
	apply(mode: ThemeMode): void
	/** Flips the mode and returns the mode now applied. */
	toggle(): ThemeMode
	/** Removes what this controller wrote to the root, and nothing else. */
	destroy(): void
}
```

Then `src/browser/constants.ts` (`THEME_ATTRIBUTE = 'data-bs-theme'`, `THEME_KEY = 'theme'`,
frozen), `src/browser/guards.ts` (`isThemeMode(value: unknown): value is ThemeMode`),
`src/browser/theme/Theme.ts` (one class implementing `ThemeInterface` with `#` fields; on construction it
applies the stored mode when `storage` holds a valid one, else leaves the root as found; `mode` is
`'dark'` when the attribute reads `dark`, else `'light'`; `apply('light')` removes the attribute
rather than writing `light`, matching Bootstrap's default mode being the absent attribute;
`destroy` removes the attribute only if this controller wrote it), and `src/browser/factories.ts`
(`createTheme(options?: ThemeOptions): ThemeInterface`). Star-export each from
`src/browser/index.ts`. No listener is registered anywhere in this step. Prove each module in its
mirror under `tests/src/browser/` with real DOM and a real `Storage` (the tester's `sessionStorage`,
cleared in `afterEach`), including the storage-restore path, the `light` removal, the `destroy`
ownership rule, and the guard's rejection of `'auto'`, `''`, and a non-string.

**2 (amended). Shell.** The `Dark mode` button's handler calls the theme controller's `toggle`
and mirrors the resulting mode into `aria-pressed`; the shell owns the controller through
`createTheme({ root: document.documentElement })` and destroys it on `destroy()`. The app imports
the engine through `@src/browser` (see the app wrapper's paths); if that alias is not declared for
the app, import it by relative path and report which.

**8 (amended). Guides.** `guides/veneer.md` documents the browser face: a `## Surface` table with
one row per export of `src/browser` (`ThemeMode`, `ThemeOptions`, `ThemeInterface`, `Theme`,
`createTheme`, `isThemeMode`, `THEME_ATTRIBUTE`, `THEME_KEY`), each `Summary` cell equal to its
declaration's TSDoc description paragraph; a `## Methods` section with an `#### \`ThemeInterface\``
heading and a table of `apply`, `toggle`, and `destroy` whose `Summary` cells equal the member
TSDoc; one `ts` fence importing `createTheme` from `@orkestrel/veneer/browser` and showing the
toggle; and a `## Tests` section linking `../tests/src/browser/theme/Theme.test.ts` and
`../tests/src/browser/factories.test.ts`. Keep the tagline. Register `@orkestrel/veneer/browser`
and `@src/browser` in `MODULES` (already present in `tests/guides.test.ts`). Run
`npm.cmd run test:guides` and close every finding.

**9 (amended). Gates.** Replace the throwaway-configuration sentence with: run `npm.cmd run test:setup`.
The full list is `format:check`, `lint:check`, `check`, `build`, then `test:src`, `test:src:styles`,
`test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`, `test:setup:browser`,
`test:conformance`, `test:guides`.

## Amended acceptance criteria

Criterion 5 reads: `test:src`, `test:src:styles`, `test:app`, `test:journey`, `test:policy`,
`test:config`, `test:setup`, `test:setup:browser`, `test:conformance`, and `test:guides` each exit
0, with every project collecting at least one file. Everything else in the first brief's list stands.

## Output

As the first brief states, at `u1-author-report.md`; overwrite the stop report the first
run left there. Add one row naming which alias the app used to reach the engine.
