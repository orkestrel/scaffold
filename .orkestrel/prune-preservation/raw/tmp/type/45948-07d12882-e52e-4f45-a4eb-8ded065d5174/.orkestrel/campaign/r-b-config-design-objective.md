Objective design lane; source review only. I ran no tests and accepted no work.

Recommend restoring the canonical browser wrapper and removing the conformance assertion that requires the historical prebundle list, **subject to a cold browser proof**. The list is an unproved optimization requirement.

- The compiler assigns `configs/app/vite.browser.config.ts` content ownership at `src/core/compilers.ts:1066`. Its template calls `appBrowser()` without an override at `src/core/templates.ts:835`. Content ownership permits replacement of stale bytes (`src/core/types.ts:24`; `src/core/helpers.ts:559`). The guide requires local configuration edits to remain outside content-owned files (`guides/scaffold.md:1267`).
- The journey wrapper is birth-owned (`src/core/compilers.ts:1086`; `guides/scaffold.md:973`). Its customization reaches journey projects. Dev and browser build use the browser wrapper (`tmp/recovery/roughnotes/package.json:43`).
- `appBrowser(override?: UserConfig)` supplies a real override mechanism (`src/core/templates.ts:316`), but does not establish durable ownership of its caller. Programmatic `Blueprint.overrides` replaces artifact content (`src/core/types.ts:167`); ordinary CLI repair derives a blueprint without preserving those overrides (`src/bin/CLI.ts:980`).
- The installed Vite declaration describes `include` as forced optimization and defaults automatic discovery to enabled (`tmp/recovery/roughnotes/node_modules/vite/dist/node/index.d.ts:920`, `:988`). It states that build dependency optimization was removed (`:978`). A production build therefore cannot settle the list’s necessity during dev.

The bounded change is to return the browser wrapper to `defineConfig(appBrowser())`, remove its import and exact-list assertion from `tests/conformance.test.ts`, and retain the existing proof that an explicit caller override merges. Leave root factories canonical. This avoids an upstream ownership change and removes a configuration assumption without removing the override capability.

Before closing omission, run an isolated Roughnotes host with no explicit list and fresh Vite/Vitest optimizer caches:

- Start `npm run dev -- --force`. Load the real HTML entry in Chromium, assert arrival, and drive the Bootstrap menu through visible controls.
- Run `npm run test:app:browser` and `npm run test:journey` without warm optimizer artifacts. Record dependency-loading failures separately from the already identified modal-wait failure.
- Prove the browser instrument discriminates by withholding a required entry import in its isolated control and observing the named arrival assertion fail.

The smallest refutation is a cold dev arrival or Bootstrap interaction that fails without the list and succeeds with it under otherwise identical conditions. That would establish a concrete requirement for the affected execution path.

If that refutation succeeds, the narrow upstream correction is to make **only the application browser Vite wrapper presence-owned**. Roughnotes supplies its first consumer. Preserve existing caller overrides; restore an absent wrapper; keep root Vite and app TypeScript configuration content-owned. Document the cost: present wrappers receive no later template updates. Prove real CLI repair preserves an edited wrapper, restores a deleted wrapper, and still replaces a drifted root configuration. The current content-owned wrapper is the negative control.

Unresolved inputs are cold dev behavior, cold browser-test dependency behavior, and any measured startup requirement that originally justified forced inclusion. The supplied journey results do not establish those properties.
