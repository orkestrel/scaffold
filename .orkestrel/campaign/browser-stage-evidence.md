# Executed evidence — the browser stage runs

Rehearsed 2026-08-23 on Linux, Node v22.22.2, against the published `@orkestrel/router` 0.0.11
installed from `registry.npmjs.org`. Instruments committed beside this file: `rehearsal/stage.sh`
installs and bundles, `rehearsal/drive.mjs` resolves the browser, serves the bundle, drives it,
and compares the surfaces. Nothing measured here is scaffold's code. The subject is whether the
**design** the user ruled for can run at all.

It runs, and every stage of it passed on the first attempt.

## What was rehearsed

The stage the reconciled design specifies for a browser face: install the published package into
an isolated consumer, bundle an installed-package consumer with Vite, drive that bundle in a real
Playwright Chromium, and compare the runtime keys against the value exports the installed
declaration declares, read through the TypeScript checker over module symbols.

`@orkestrel/router` was chosen because it publishes a browser face at `./browser` and is not the
package under development.

## What each stage reported

**Install.** `npm install @orkestrel/router` into an empty consumer succeeded.

**Runtime dependency resolution.** This was the third unknown the design brief named. The
installed tree carries its own runtime `@orkestrel` dependencies — `abort`, `contract`, and
`emitter` — and each resolved from the consumer without a further step. A generated proof needs no
dependency-copying stage for a registry install.

**Vite bundle.** The declared Vite toolchain transformed the installed browser subpath and its
transitive `@orkestrel` graph into one chunk with no configuration beyond an output directory.

**Browser resolution.** `chromium.executablePath()` returned
`/opt/pw-browsers/chromium-1234/chrome-linux64/chrome`, which **does not exist on this container**.
The container ships `chromium-1194` behind a `chromium` alias, and the resolver ladder found it
there. A stage that trusts Playwright's pinned path fails on the very container an agent verifies
it in; the ladder that `configs/browsers.ts` already implements is what makes the stage reachable.

**The drive.** Chromium launched at the resolved executable, loaded the bundle over a loopback
server, and evaluated the module with no page error.

**The comparison.** The declaration's value exports read through the checker were `Navigator`,
`computeNavigationKey`, `createNavigator`, `extractHashPath`, `findAnchor`, and
`resolveLocationPath`. The keys the module published in the browser were the same set. Nothing
declared was absent at runtime, and nothing at runtime was undeclared.

## What this settles for the design

- The browser stage is buildable from the toolchain every browser-face package already declares.
  No new dependency is needed anywhere.
- Browser resolution must go through the `resolveBrowser` ladder, never through
  `chromium.executablePath()` alone. This is measured rather than argued: the pinned path is dead
  here.
- The checker-over-module-symbols reading produces exactly the comparable name set, so the
  reconciled ruling against a declaration-text walk holds for the browser branch too.
- A registry install needs no dependency-copying stage.

## Coverage

One package, one platform, one container. It does not establish that every browser-face package
bundles cleanly, that a workspace with no launchable browser behaves correctly, or that the stage
runs inside a Vitest project rather than as a standalone driver. Those remain open and are named
in the design brief. What it does establish is that no stage of the design is unreachable, which
is what the cost objection rested on.
