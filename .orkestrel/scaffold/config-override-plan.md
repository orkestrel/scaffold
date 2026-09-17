# Plan addendum — config factories take their overrides

Added 2026-09-16 on the repository owner's instruction, after the same change landed in the
`roughnotes` target as commit `cc1c3d6`.

## The instruction

Every config factory accepts an override, because `configs/` is where a package's own configuration
changes belong. And the `appBrowser` / `appShowcase` composition that replaced the boolean-toggled
helper in `roughnotes` propagates here, wherever it applies.

## What the tree shows

`src/core/templates.ts` generates the `vite.config.ts` every scaffolded workspace receives. It is the
source of the pattern `roughnotes` carried:

```
browser: `function applicationBrowser(showcase: boolean): UserConfig {
	const output = showcase ? 'dist/showcase' : 'dist/app/browser'
	…
}

export function appBrowser(): UserConfig {
	return applicationBrowser(false)
}
{{showcaseFactory}}`
```

Every other generated factory has the same closed shape — `export const srcCore = (): UserConfig =>
({ … })` — taking no override.

The instruction's own evidence sits in the generated wrappers. `configs/src/vite.browser.config.ts`
is generated as:

```ts
mergeConfig(srcBrowser(), { … })
```

The wrapper merges from the outside because the factory cannot take an override. That is the smell
the instruction names: the package-specific layer exists, it is simply applied around the factory
instead of through it.

## The change

1. **Every generated factory takes `override?: UserConfig`** and returns its base merged with it.
2. **`applicationBrowser(showcase)` is deleted.** `appBrowser(override?)` carries the browser
   configuration; `appShowcase(override?)` builds on `appBrowser`, declaring only the output boundary
   and `outDir` a showcase changes.
3. **The generated `configs/` wrappers pass their package-specific configuration as the override**
   rather than wrapping the factory in `mergeConfig`.
4. **Scaffold's own `vite.config.ts` and `configs/` take the same shape.** This repository is a
   workspace under its own model and does not get an exemption.

## Two hazards the target already measured, which must travel with the change

Both were found in `roughnotes` by running the change rather than reading it, and a naive
implementation here reproduces both across every workspace scaffold generates.

- **`mergeConfig` concatenates arrays.** A factory that merges an override carrying `plugins`
  duplicates every plugin the base declares — the Vue plugin twice, both output boundaries. The merge
  must select one plugin per name, keeping each name's first position and last value. That is also
  what lets a showcase's output boundary replace the browser's in place.
- **Vitest hands every registered project factory its invocation record.** A factory registered in
  `projects` is called with `{ command, mode, isPreview, isSsrBuild }`, which lands in the override
  position the moment the signature accepts one. A bare merge copies `command` and `mode` into the
  returned project. The merge must refuse a value carrying `command`.

The vendored `tests/config.test.ts` already carries a proof for the second — "keeps Vitest invocation
fields out of project configurations" — which is evidence the hazard was known here before this
change. It is now load-bearing rather than defensive.

## Blast radius

- `src/core/templates.ts` is published in `dist/src`, so this bumps and publishes `scaffold`.
- Whether `dist/host` moves depends on whether the vendored `tests/config.test.ts` must change to
  accept the new factory shape. Establish it; a `dist/host` change obliges a re-propagation and a
  `repair` visit to every target.
- A generated `vite.config.ts` is produced at scaffold time, not restored by `repair`. **Existing
  workspaces keep their current factories** until regenerated. `roughnotes` already carries the new
  shape by hand. Any other target adopts it on its next generation, or by the same hand-made change.

## Reference implementation

`roughnotes` commit `cc1c3d6` and the report at
`C:\Users\mikes\WebstormProjects\roughnotes\.orkestrel\roughnotes\u13-report.md`, whose § 3 records
what `mergeConfig` does field by field, and whose § 4 records the failing proof. Its retained proof
lands in that repository's `tests/conformance.test.ts`.
