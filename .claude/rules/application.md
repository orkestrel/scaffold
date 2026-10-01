---
paths:
  - 'app/**/*'
  - 'tests/app/**/*'
  - 'configs/app/**/*'
  - 'package.json'
  - 'tsconfig.json'
  - 'vite.config.ts'
  - '.oxlintrc.json'
---

# Application composition

- Select only needed app environments; app-only, src-only, and mixed workspaces
  are first-class.
- The CLI names the independent selections `--src` and `--app`.
  `--surfaces` is not an alias and must fail as an unknown option.
- `new` selects the styles surface with `--styles`, its themes target with `--themes` (requires
  `--styles`), the showcase with `--showcase` (requires `--app browser`), and extensions with
  `--extend <surface:name,…>`. Each `--extend` entry is `browser:vue`, applied to every selected
  browser axis, or `styles:<name>`, which requires `--styles`. `--app browser` implies the journey.
- Core-only, browser-only, and server-only applications are valid. A combined
  browser+server application includes app/core for shared contracts.
- Every selected environment has an `index.ts` barrel. `main.ts` is an executable
  entry and never owns reusable declarations.
- app/core is host-independent and check/test-only.
- app/browser is framework-independent: it uses app/core contracts, an
  `index.html` entry, a `main.ts` that renders through the DOM, `check:app:browser`
  through `tsc`, and real Chromium tests.
- The Vue application lives in app/vue: `main.ts`, `index.html`, `App.vue`,
  `check:app:vue` through `vue-tsc`, `dev:vue`, and real Chromium tests.
- When a target's app/browser holds a `.vue` file, move it to app/vue. The
  generator's `repair` raises a blocking question naming that move until it lands.
- The showcase builds one page per application, app/browser and each app-side
  browser extension, into root `showcase/` with the final-page stamp;
  `.claude/rules/workspace.md` § Build outputs owns its build.
- app/server uses app/core contracts, parses environment values before binding,
  defaults to loopback, emits `dist/app/server/main.cjs`, and keeps only
  `node:*` external.
- Browser and server integrate across a contract and transport boundary. Neither
  environment imports the other's implementation.
- The project toolchain enforces that boundary, and none of its tools is
  replaceable by a custom parser or source-language analyzer: `.oxlintrc.json`
  `no-restricted-imports` enforces declared package, alias, and conventional
  relative import direction; scoped TypeScript configurations remove Node and
  DOM globals from the wrong environment; Vite's real browser and server builds
  resolve Vue, assets, CSS, workers, and runtime module graphs; and
  generated-consumer tests exercise those real configurations.
- Generated consumers must pass lint, scoped typechecking, production builds, and
  real integration tests.
- Include `.ts`, `.tsx`, `.mts`, and `.cts` in scoped checks. Publish only TypeScript from
  `src/vue`, and put Vue SFCs in `app/vue`. Put CSS in browser code; compile SCSS through the
  `sass` dependency the styles surface declares.
- Published `src` environments never import private `app` modules. Src core is
  host-independent; src browser/server may import src core but never one
  another's implementation. Apply the same environment law to
  `@orkestrel/<package>/browser` and `/server` exports; a package's bare export
  is its core API.
- App-only manifests are unscoped and `private: true`, with no `main`,
  `module`, `types`, export map, or publish configuration. Mixed manifests
  publish only `dist/src` and the SCSS sources a stylesheet export names, and
  never app output; `vue` stays a development dependency apart from the optional
  peer `.claude/rules/browser.md` admits.
- Give app/server process signals to a tested, explicitly stoppable,
  generation-safe runner whose stale failures cannot release a newer run.
- Return the runner from convenience startup, so normal cleanup cannot be hidden.
- `ApplicationServerRunner` lives alone in `ApplicationServerRunner.ts`.
  `startApplicationServer` belongs in `handlers.ts` beside the other process-lifecycle
  functions, because `factories.ts` admits only `create`-prefixed construction and this
  one starts a signal-owning resource. `main.ts` invokes it and owns no reusable
  declarations or duplicated signal handling.
- Do not add showcase, auth, storage, proxy, CSS framework, or other product
  policy unless the request requires it.
- Test repeated lifecycle, concurrent calls, malformed environment input,
  protocol rejection, abort/cleanup where applicable, and cross-environment
  contract parity using real hosts.
