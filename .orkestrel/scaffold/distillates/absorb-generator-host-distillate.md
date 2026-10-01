I'll read the brief and follow it exactly.The brief is a read-only distillate of the CLI, repair model, vendored config proof, and guide claims. I'll read the map, then the five source files in full.# Generator host distillate

## Verbs and options

| Verb | Options | What it reads | What it writes | Citation |
| --- | --- | --- | --- | --- |
| `new` | positional `<name>`, `--src`, `--app`, `--bin`, `--deps`, `--offline`, `--from`, `--target`, `--json` | The command line builds the blueprint (`journey` is true when `--app` includes `browser`); it then reads declared version floors or the registry, and the vendored host (`--from`, or the live overlay, or the distributed floor when `--offline`). | `materialize` writes the whole plan into a vacant target after replacing manifest ranges with the resolved pins. | `src/bin/CLI.ts:233` |
| `audit` | `--groups`, `--offline`, `--from`, `--target`, `--json` | The target manifest, the blueprint from `#derive`, version releases, and a hydrated comparison through the vendored host a repair would write from. | Nothing. | `src/bin/CLI.ts:299` |
| `repair` | `--groups`, `--offline`, `--from`, `--target`, `--json` | The derived blueprint, a hydrated audit, declared version floors or the registry, and the writable dependency and script regions. | `repair` restores missing and stale planned paths, then `declare` writes the pin and script regions; it re-audits and does not delete. | `src/bin/CLI.ts:347` |
| `catalog` | `--all`, `--from` (repeatable), `--target`, `--json` | The previous catalog table, the host floor or `--from`, organization membership, and the selected guides (every hosted name with `--all`, otherwise declared names, never the target's own guide). | Guide mirrors, the marker-bounded package table, and dependency pins (`scripts` empty); a failed membership read refreshes guides only. | `src/bin/CLI.ts:410` |
| `overwrite` | `--groups`, `--dirty`, `--offline`, `--from`, `--target`, `--json` | The derived blueprint, git tracked and dirty sets, the hydrated audit, then the same version and catalog surfaces as `repair` and `catalog` unless `--offline`. | `repair`, then deletion of tracked foreign paths, then pins and scripts; online it also writes the catalog table and mirrors, and a later catalog failure keeps the local writes. | `src/bin/CLI.ts:488` |

## Derivation

- `#derive` reads `package.json` and refuses a manifest that declares no package name. `src/bin/CLI.ts:956`
- The blueprint name is the manifest name after the last `/`. `src/bin/CLI.ts:983`
- Runtime dependencies are the manifest's runtime dependency list. `src/bin/CLI.ts:986`
- The `src` axis is the `core`, `browser`, and `server` directories that exist as physical directories under `src`. `src/bin/helpers.ts:955`
- The `app` axis is the same environment names that exist as physical directories under `app`. `src/bin/CLI.ts:985`
- `bin` is true when `src/bin/main.ts` resolves inside the target and is an exact-case file. `src/bin/CLI.ts:987`
- `setup` is filled by listing files directly under `tests` whose names start with `setup` and end with `.test.ts`; `setupBrowser.test.ts` adds `browser` and every other match adds `node`. `src/bin/CLI.ts:974`
- `guides` is the exact-case file `tests/guides.test.ts`. `src/bin/CLI.ts:989`
- `integration` is the exact-case file `tests/integration.test.ts`. `src/bin/CLI.ts:990`
- `conformance` is the exact-case file `tests/conformance.test.ts`. `src/bin/CLI.ts:991`
- `service` is the exact-case file `tests/setupService.ts`. `src/bin/CLI.ts:992`
- `global` is the exact-case file `tests/setupGlobal.ts`. `src/bin/CLI.ts:993`
- `showcase` is the exact-case file `configs/app/vite.showcase.config.ts`. `src/bin/CLI.ts:994`
- The reading journey rule is the exact-case file `configs/app/vite.journey.config.ts`. `src/bin/CLI.ts:995`
- The creation journey rule is separate: `new` sets `journey` when the `app` selection includes `browser`, and does not read that wrapper. `src/bin/CLI.ts:239`
- `skills` is the exact-case file `configs/agents/tsconfig.skills.json`. `src/bin/CLI.ts:996`
- `#derive` reads no Vue path, flag, or dependency; vendors stay unknown because a birth-owned script is not a declaration of its list. `src/bin/CLI.ts:951`

## Repair, overwrite, and audit by ownership

| Ownership and origin | `audit` reports | `repair` writes | `overwrite` writes | `host.json` records | Citation |
| --- | --- | --- | --- | --- | --- |
| `birth` + `computed` (the manifest passes through hydration because its origin is not `host`) | Birth findings are the population audit compared as nothing. | A missing destination is restored and a stale one is replaced only where the artifact claims its bytes; a birth path reported stale is a verdict the comparison could not produce and is refused, so birth stays unwritten. | The same `repair` call, and birth is not a deletion candidate. | The inventory is the vendored checkout, not the generated manifest. | `src/bin/helpers.ts:527` |
| `birth` + `template` (non-host artifacts are copied through hydration unchanged) | Same birth partition: nothing was examined. | `materialize` is the create path; `repair` skips a path whose drift is neither `missing` nor `stale`. | Same skip inside `repair`. | Not a vendored destination. | `src/server/Materializer.ts:640` |
| `content` + `template` (non-host content, including the template pointer hydration leaves alone) | A content finding with `observed` had its bytes compared. | Missing and stale content paths are both pushed onto the write list. | The same content writes, before deletion. | Not a vendored destination; the `AGENTS.md` pointer is template text, and canon destinations are not fetched. | `src/bin/helpers.ts:519` |
| `content` + `computed` (a skill pointer, a found guide mirror, and a manifest or catalog region rewrite) | Bytes, because ownership is `content`. | Missing and stale computed content is written as text rather than copied. | The same, and the catalog half writes found mirrors and the table through this pair. | The derived pointer is not the staged canonical file the inventory digests. | `src/server/Materializer.ts:887` |
| `content` + `host` (a hydrated vendored file that is not a retained path or a pointer) | Bytes against the hex read from the vendored root. | Missing and stale paths are copied from the host root. | The same copies. | Each inventory entry carries the SHA-256 digest of that file's content, under a membership digest. | `src/server/Materializer.ts:896` |
| `presence` + `host` (a retained path, and every unhydrated host artifact before hydration) | Existence: a presence finding, or a content finding that is only `missing`, is decided by existence. | An absent file is restored; present bytes are not replaced, because presence does not produce `stale`. | The same restore-if-absent. | Staged vendored paths are inventory entries; deferred guide and catalog paths stay presence-only. | `src/server/Materializer.ts:866` |
| `presence` + `template` (the distribution proof is a template claimed by presence) | Existence only, so a present replacement is never `stale`. | A missing file is written; a present file is skipped. | The same. | The generated proof is not a vendored inventory entry. | `guides/scaffold.md:1743` |
| foreign (no ownership and no origin) | A file under an expanded vendored root, or a canon path the plan does not claim, is `foreign`, and that finding counts as drift. | Foreign findings are skipped by the plan-owned reconfirm and are not written. | Tracked foreign paths that are not protected are deleted; untracked paths stay and remain findings. | A target copy is not an inventory entry; moving a path into the canon makes the old copy `foreign`. | `src/server/Materializer.ts:510` |

## The vendored config proof

| Case (describe and it titles) | Environment or fact it covers | What it asserts (one sentence) | Citation |
| --- | --- | --- | --- |
| root configuration / resolves every declared alias to its real entry | `src` and `app` axes, each of `core`, `browser`, and `server`, when `<axis>/<environment>/index.ts` exists | Each present environment index is the `tsconfig` path and the Vite alias for `@<axis>/<environment>`. | `tests/config.test.ts:104` |
| root configuration / registers every workspace project with its fixed include and setup files | `src:core`, `src:browser`, `src:server`, `src:bin`, `app:core`, `app:browser`, `app:server` when those directories exist; `skills` when `configs/agents/tsconfig.skills.json` exists; `policy`, `config`, `guides`, `conformance`, `distribution`, and `integration` when `tests/<label>.test.ts` exists; `setup` when a root `tests/setup*.test.ts` exists; `service` when `tests/setupService.ts` exists; `probe` and `concrete` always | Each selected project resolves to one effective include and its setup files, and an extra factory is not called. | `tests/config.test.ts:136` |
| root configuration / returns the invocation mode and no other invocation field from every registered project factory | Every registered project factory, independent of which environments exist | Every factory returns the invocation `mode` and no other invocation field, and a record with no string `mode` throws. | `tests/config.test.ts:381` |
| root configuration / requires and validates every selected target wrapper | A TypeScript wrapper for each present `src` or `app` environment; a Vite wrapper for each of those except `app`/`core`; `bin` wrappers when `src/bin` exists; showcase and journey wrappers when those files exist; a planted journey wrapper on every run | Vite outputs are `dist/bin`, `dist/showcase`, or `dist/<axis>/<environment>`, browser `app` TypeScript types are `vite/client` and `vue`, other browser types are `vite/client` only, and each journey project includes only `tests/app/browser/integration.test.ts` with a variant name, viewport set, and browser enabled. | `tests/config.test.ts:454` |
| root configuration / registers proof scripts in the correct gate | `config` always; `integration` from `tests/integration.test.ts`; `conformance`, `distribution`, and `service` from the registered project set; publishing versus `private` | `test` reaches `test:config`, integration and conformance stay on `test`, distribution and a publishing service stay on `prepublishOnly`, and a private service stays on `test`. | `tests/config.test.ts:669` |
| root configuration / rebuilds publishing workspaces before packing | Publishing versus `private` | `prepack` is `npm run build` when the manifest is not `private`, and absent when it is. | `tests/config.test.ts:765` |
| root configuration / keeps the committed host inventory aligned with the vendored checkout bytes | `host.json` when `build:inventory` exists; a checkout with neither generator nor inventory returns | Regenerating the inventory with `stageInventory` matches the committed `host.json` text, entry for entry, by destination and digest. | `tests/config.test.ts:785` |
| root configuration / keeps policy rules active across every linted workspace path | Policy wiring, not an environment | The committed Oxlint configuration satisfies the policy inspection, and an override that turns `policy/no-mocking` off does not. | `tests/config.test.ts:887` |
| root configuration / omits the audit-confirmed dead policy type exports | `configs/policy.ts` | The policy source does not name `PolicyCall` or `PolicyClassMember`. | `tests/config.test.ts:910` |
| policy plugin / blanks a matched region without moving a line break | Policy text helper | Blanking replaces matched characters with spaces and keeps a line break in place. | `tests/config.test.ts:1795` |
| policy plugin / blanks every code, tag, and address region while holding each later offset | Policy text helper | Stripping code, tags, and addresses keeps the string length and line count, and the remaining banned-term hit still points at `should`. | `tests/config.test.ts:1800` |
| policy plugin / reads every banned-term hit in offset order with the row it matched | Policy denylist | Hits come back in offset order with their replacement rows, and a sentence with no banned term has none. | `tests/config.test.ts:1818` |
| policy plugin / reads a description paragraph up to its first block tag | Policy summary reader | A block comment's description stops at the first block tag, and an empty comment is an empty paragraph. | `tests/config.test.ts:1826` |
| policy plugin / reads the opening word of a paragraph as its letters alone | Policy summary reader | The opener is the letters of the first word, including when that word is quoted, and an empty paragraph has none. | `tests/config.test.ts:1840` |
| policy plugin / admits a third-person opener and refuses a registered non-verb | Policy voice | Third-person openers pass, registered non-verbs and an empty opener fail, and every stopword matches the third-person pattern. | `tests/config.test.ts:1846` |
| policy plugin / keeps the matched and judged term sets disjoint and frozen | Policy denylist | Banned terms, judged terms, and voice stopwords are disjoint and frozen, and a judged term is not a banned-term hit. | `tests/config.test.ts:1856` |
| policy plugin / registers handlers as a function kind and routes as a data kind | Policy placement populations | `handlers.ts` is a function and central source file, and `routes.ts` is a data source file and not a function source file. | `tests/config.test.ts:1870` |
| policy plugin / enables every plugin rule over the population its law names | `.oxlintrc.json` | The plugin declares `no-misplaced-function` and `no-host-line-endings`, and the committed config enables every `policy/` rule over the globs its law names. | `tests/config.test.ts:1877` |
| policy plugin / loads every configured policy rule through the real binary | Oxlint over a scratch `src`, `app`, and `scripts` tree | The real binary reports each planted policy and TypeScript diagnostic, reports `no-debugger` in `scripts` without `no-host-line-endings` there, and reports nothing for the clean fixture. | `tests/config.test.ts:1895` |
| configuration helpers / exposes every helper this proof requires | `configs/helpers.ts`, including `isStylesheetPath` and the environment boundary helpers | The helper module exports every name this proof calls. | `tests/config.test.ts:2066` |
| configuration helpers / fails broken import-meta builds and forwards every other log | Build log hook | An `EMPTY_IMPORT_META` warning throws the scaffold build error, and any other warning is forwarded unchanged. | `tests/config.test.ts:2108` |
| configuration helpers / resolves contained workspace paths and refuses a real outside sibling | Workspace path containment | Paths inside the workspace resolve and count as contained, and a real sibling outside the workspace does not. | `tests/config.test.ts:2136` |
| configuration helpers / reads bounded files and resolves package roots from real manifests | Package-root and byte bounds | A file within the byte bound is read, a file past it is not, and a real manifest names its package root. | `tests/config.test.ts:2159` |
| configuration helpers / classifies module boundaries and extracts static asset sources | Stylesheet classification and environment asset reads | `src/styles/index.scss?direct` is a stylesheet, a workspace module is a workspace boundary, and a static import plus a decoded asset URL are the environment asset sources unless the read is dependencies-only. | `tests/config.test.ts:2197` |
| configuration helpers / reports environment and output boundary errors with legal controls | `src/browser` against `src/server` and `src/core` | A browser path or specifier that reaches server code errors, one that reaches core does not, and build output must be the configured directory inside the workspace. | `tests/config.test.ts:2227` |
| configuration helpers / drives each plugin through its real Vite hooks | The first present directory among `src/core`, `src/browser`, `src/server`, `app/core`, `app/browser`, and `app/server` | A real Vite build accepts the output and environment plugins, and the browser resolve hook rejects `@src/server` and allows `@src/core`. | `tests/config.test.ts:2247` |
| configuration helpers / reads the compiler scope a declaration roll-up requires [inapplicable where src holds no recognized environment directory] | The first present `configs/src` face among `core`, `browser`, and `server`; skipped when `src` has no recognized environment directory | `parseProjectScope` matches that face's `lib`, `types`, and `rootDir` after the compiler shows its config. | `tests/config.test.ts:2306` |
| configuration helpers / reads the refusals, guards, overrides, and rewrites a declaration roll-up requires from every workspace | Every workspace, publishing or not | Malformed compiler text and a missing project are refused, the extractor override is the fixed option set, and `@src/core` rewrites to the workspace package name. | `tests/config.test.ts:2368` |

## The guide's claims

| Section | Claim (one sentence) | Subject (environment, showcase, journey, Vue, styles, limit, repair) | Citation |
| --- | --- | --- | --- |
| Surface | `APP_BROWSER_DEV_DEPENDENCIES` lists the development dependencies a private Vue browser application adds. | Vue | `guides/scaffold.md:110` |
| Surface | `JOURNEY_CONFIG_PATH` names the Vite wrapper whose presence makes a workspace `journey`. | journey | `guides/scaffold.md:144` |
| Surface | `SHOWCASE_CONFIG_PATH` names the Vite wrapper whose presence makes a workspace `showcase`. | showcase | `guides/scaffold.md:172` |
| Surface | `SHOWCASE_DEV_DEPENDENCIES` names the development dependency used only by the optional single-file showcase build. | showcase | `guides/scaffold.md:173` |
| Methods | `audit` compares a plan with a target through the vendored host that will repair it. | repair | `guides/scaffold.md:470` |
| Methods | `repair` writes a plan into an existing target, guided by an audit of it. | repair | `guides/scaffold.md:472` |
| Command line | `repair` writes each planned path the target is missing or has let drift, and the range and script regions. | repair | `guides/scaffold.md:509` |
| Command line | `overwrite` writes everything `repair` and `catalog` write, plus deletions. | repair | `guides/scaffold.md:511` |
| Baselines | For `new`, `repair`, `catalog`, and `overwrite`, authoritative absence on a version surface never selects `floor`. | repair | `guides/scaffold.md:523` |
| Baselines | Deferred paths are presence-only, and repair never writes their floor bytes. | repair | `guides/scaffold.md:540` |
| Command line | The `new --app browser` command selects the journey axis, creates its birth-owned wrapper, defines `appJourney` in the root configuration, and excludes the browser integration suite from `app:browser`. | journey | `guides/scaffold.md:599` |
| Command line | Its manifest declares `test:journey` and invokes it after `npm run test:app` in `test`. | journey | `guides/scaffold.md:601` |
| Command line | A selection without a browser application emits no journey axis. | journey | `guides/scaffold.md:602` |
| Command line | Reading verbs detect `configs/app/vite.showcase.config.ts` for `showcase` and `configs/app/vite.journey.config.ts` for `journey`, among the other exact-case structural files, and register each fact's machinery. | showcase | `guides/scaffold.md:603` |
| Reading a target | `audit`, `repair`, `catalog`, and `overwrite` derive the blueprint from the target itself. | repair | `guides/scaffold.md:620` |
| Reading a target | The environment axes come from the directories the target actually ships, because a directory is the fact and a declaration beside it could disagree. | environment | `guides/scaffold.md:621` |
| Reading a target | `configs/app/vite.showcase.config.ts` selects `showcase` and `configs/app/vite.journey.config.ts` selects `journey`. | showcase | `guides/scaffold.md:627` |
| Reading a target | `audit` reports the exact `test:guides` script until `repair` or `overwrite` appends it through the writable script region. | repair | `guides/scaffold.md:648` |
| Reading a target | When the plan emits `test:journey` and no chain from `test` reaches `npm run test:journey`, that question asks you to insert the invocation after `npm run test:app`. | journey | `guides/scaffold.md:683` |
| Reading a target | These advisories belong to `configs` and remain report-only during `repair`. | repair | `guides/scaffold.md:685` |
| Reading a target | A script the manifest declares leaves the gate as the only repair, and a script only the projection supplies is named as missing beside the gate. | repair | `guides/scaffold.md:698` |
| Reading a target | When `configs` is selected, `repair` and `overwrite` refuse an unregistered or ungated project before writing. | repair | `guides/scaffold.md:700` |
| Reading a target | `repair` and `overwrite` write every direct `test:<project>` script the blueprint computes, `test:probe`, and `test:bench`. | repair | `guides/scaffold.md:708` |
| Reading a target | When the `test` chain is a generated predecessor, `repair` and `overwrite` write the planned chain in its place. | repair | `guides/scaffold.md:710` |
| Reading a target | A planned step that registers no Vitest project, such as `npm run test:guides`, lands on the next `repair` without an earlier advisory. | repair | `guides/scaffold.md:716` |
| Reading a target | `repair` and `overwrite` reconcile the declared ranges and write the script region on every run, whatever `--groups` names. | repair | `guides/scaffold.md:732` |
| Reading a target | The terminal audit in `repair` and `overwrite` keeps every retained script difference visible. | repair | `guides/scaffold.md:742` |
| Reading a target | `repair` and `overwrite` refuse before writing a selected `configs` or `tests` group when planned dependencies are missing. | repair | `guides/scaffold.md:756` |
| Reading a target | A seeded setup module is birth-owned, so `repair` reports it aligned and never rewrites it. | repair | `guides/scaffold.md:775` |
| Reading a target | Refusing `repair` over a setup gap no write can close would block every write, so the question stays report-only. | repair | `guides/scaffold.md:788` |
| Machine-readable output | `repair` returns `MaterializeResult` plus the terminal audit, `releases`, and `provenance`. | repair | `guides/scaffold.md:833` |
| Blueprint | `src` selects published library environments and `app` selects private application environments. | environment | `guides/scaffold.md:894` |
| Blueprint | Each published build face — core, browser, server, and `bin` — externalizes every peer name in the generated Vite binding. | environment | `guides/scaffold.md:901` |
| Blueprint | One published environment owns the package root directly. | environment | `guides/scaffold.md:924` |
| Blueprint | Several published environments require `core`, which owns that root while each other environment keeps its subpath. | environment | `guides/scaffold.md:925` |
| Blueprint | A multi-environment `src` selection without `core` emits entry fields naming a `core` build the workspace never runs. | environment | `guides/scaffold.md:926` |
| Blueprint | `new` refuses that advisory, while `audit` and `repair` need the plan to describe and restore a target that already has that shape. | repair | `guides/scaffold.md:928` |
| Blueprint | `showcase` and `journey` are structural facts, with `bin`, `setup`, `guides`, `integration`, `conformance`, `service`, `vendors`, `global`, and `skills`. | showcase | `guides/scaffold.md:932` |
| Blueprint | Reading verbs set each structural fact only when the workspace physically ships the directory or exact-case file that defines it. | environment | `guides/scaffold.md:933` |
| Blueprint | When the `app` axis selects `browser`, the browser setup project also applies the Vue single-file-component transform. | Vue | `guides/scaffold.md:953` |
| Blueprint | Your `tests/setupBrowser.ts` module and its paired proof can import and render application Vue components. | Vue | `guides/scaffold.md:954` |
| Blueprint | A browser setup proof without `app/browser` keeps the non-Vue pipeline; selecting `src/browser` alone adds no Vue plugin or dependency. | Vue | `guides/scaffold.md:955` |
| Blueprint | `repair` closes the direct-script half through the writable manifest region. | repair | `guides/scaffold.md:964` |
| Blueprint | Over a package-owned `test` chain, `repair` appends the direct script, regenerates the root configuration, and registers the project. | repair | `guides/scaffold.md:969` |
| Blueprint | Over a generated predecessor `test` chain, write the file and run `repair`. | repair | `guides/scaffold.md:970` |
| Blueprint | `distribution` is not a field; a published `src` environment is its whole condition. | environment | `guides/scaffold.md:974` |
| Blueprint | A workspace publishing any `src` environment gets the distribution project, the script, the `prepublishOnly` entry, and `tests/distribution.test.ts`. | environment | `guides/scaffold.md:977` |
| Blueprint | `showcase` projects only when the browser `app` environment exists. | showcase | `guides/scaffold.md:999` |
| Blueprint | Without that axis the showcase flag adds no artifact, configuration, script, or dependency, and the gate reports a non-blocking question. | showcase | `guides/scaffold.md:999` |
| Blueprint | The library's `journey` flag defaults to `false`; `new` sets it when its `app` selection includes `browser`. | journey | `guides/scaffold.md:1003` |
| Blueprint | Reading verbs infer `journey` from the wrapper's presence. | journey | `guides/scaffold.md:1004` |
| Blueprint | Without a browser application, the journey flag emits no journey configuration or script and raises a non-blocking `journey` question. | journey | `guides/scaffold.md:1004` |
| Blueprint | With that application, the content-owned root configuration defines `appJourney(variant, variants)` and excludes `tests/app/browser/integration.test.ts` from `app:browser`. | journey | `guides/scaffold.md:1006` |
| Blueprint | This journey wrapper is birth-owned: scaffold creates it when absent and preserves your edits during `repair`. | journey | `guides/scaffold.md:1010` |
| Blueprint | It imports `JourneyVariant` from `@orkestrel/test`, declares `readonly JourneyVariant[]`, and seeds `desktop` at 1280 × 800 and `compact` at 390 × 844 without a theme. | journey | `guides/scaffold.md:1011` |
| Blueprint | The wrapper registers `journey:<name>` for each variant through the root factory. | journey | `guides/scaffold.md:1016` |
| Blueprint | Each journey project collects the browser integration suite alone, sets the variant viewport, and provides `variant`, `variants`, and `capture`. | journey | `guides/scaffold.md:1016` |
| Blueprint | The generated `test:journey` script runs `vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot`, and the generated `test` chain runs it after the application projects. | journey | `guides/scaffold.md:1019` |
| Blueprint | With the journey axis off, the ordinary browser project retains its integration suite. | journey | `guides/scaffold.md:1021` |
| Compile | `new` refuses on any question, while `audit` and `repair` carry the same questions through. | repair | `guides/scaffold.md:1059` |
| Ownership and drift | `content` audit compares the bytes and a write restores a missing file and replaces a stale one. | repair | `guides/scaffold.md:1134` |
| Ownership and drift | `presence` audit compares existence only and a write restores an absent file and never touches present bytes. | repair | `guides/scaffold.md:1135` |
| Ownership and drift | `birth` audit compares nothing and a write creates the file only during initial materialize. | repair | `guides/scaffold.md:1136` |
| Ownership and drift | Every host artifact a core-compiled plan carries is `presence`, because that face cannot read the vendored data root. | environment | `guides/scaffold.md:1149` |
| Ownership and drift | Hydration turns each path scaffold owns the bytes of into a content-owned artifact and leaves `presence` on the workspace-owned paths and the mirror pointers. | repair | `guides/scaffold.md:1153` |
| Ownership and drift | `repair` and `overwrite` restore a missing `AGENTS.md` pointer and replace a drifted one. | repair | `guides/scaffold.md:1160` |
| Ownership and drift | `repair` and `overwrite` restore a missing skill pointer and replace a hand-edited one with the derived bytes. | repair | `guides/scaffold.md:1166` |
| Ownership and drift | A later `repair` or `overwrite` treats a birth-owned path as aligned whether it is present or absent. | repair | `guides/scaffold.md:1172` |
| Ownership and drift | `repair` and `overwrite` restore `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` when their bytes drift or the files are missing. | repair | `guides/scaffold.md:1182` |
| Ownership and drift | A publishing workspace missing `tests/distribution.test.ts` reports `missing` drift, and `repair` or `overwrite` writes the generated proof there. | repair | `guides/scaffold.md:1306` |
| Ownership and drift | `repair` restores a content-owned Vitest configuration to the canonical project set. | repair | `guides/scaffold.md:1316` |
| Ownership and drift | Counting planned findings by `content`, `presence`, and `birth` stays the same against a vacant target and a repaired one. | repair | `guides/scaffold.md:1324` |
| Ownership and drift | `repair` and `remove` re-derive every verdict and refuse one the comparison could not have produced. | repair | `guides/scaffold.md:1349` |
| Ownership and drift | `repair` and `remove` guard the whole audit before reading any of it. | repair | `guides/scaffold.md:1353` |
| Fleet catalog | The foreign-guide question sits outside repair findings, so `repair` preserves a present mirror. | repair | `guides/scaffold.md:1367` |
| Dependency floors | `audit`, `repair`, `catalog`, and `overwrite` do not invent, rewrite, insert, or remove peer declarations or `peerDependenciesMeta`. | repair | `guides/scaffold.md:1420` |
| Dependency floors | The rows scaffold does not install are seeds — `@vitejs/plugin-vue`, `vue`, `vue-tsc`, `vite-plugin-singlefile`, and the application-server fleet packages. | Vue | `guides/scaffold.md:1432` |
| Dependency floors | `repair` rewrites `^0.64.0` to `^0.65.0` rather than widening it. | repair | `guides/scaffold.md:1441` |
| Dependency floors | `new`, `audit`, and `repair` read declared versions and the vendored host. | repair | `guides/scaffold.md:1452` |
| Dependency floors | `overwrite` reads every surface that `repair` and `catalog` read. | repair | `guides/scaffold.md:1453` |
| Dependency floors | `overwrite` commits repair and removal before it starts the catalog step. | repair | `guides/scaffold.md:1456` |
| Dependency floors | When the network forces a floor, `repair` repairs from the distributed floors and exits `1`, even when the terminal audit is aligned. | repair | `guides/scaffold.md:1466` |
| Dependency floors | With `--offline`, `repair` repairs from the floors and the terminal audit decides exit `0` or `1`. | repair | `guides/scaffold.md:1466` |
| Dependency floors | When the network forces a floor, `overwrite` keeps completed repair and deletion work, names each floor or refused catalog step in `note`, and exits `1`. | repair | `guides/scaffold.md:1468` |
| Dependency floors | With `--offline`, `overwrite` repairs, deletes, and writes version floors, skips `catalog`, records that refusal in `note`, and exits `1`. | repair | `guides/scaffold.md:1468` |
| Dependency floors | Run `scaffold repair`, or `npm update` followed by the same audit, until no question remains. | repair | `guides/scaffold.md:1482` |
| Vendored data root | The `host.json` file at the repository root is the committed live inventory, and each entry carries the SHA-256 digest of its file content. | limit | `guides/scaffold.md:1583` |
| Vendored data root | `overwrite` deletes a path that moved from `HOST_PATHS` to `CANON_PATHS` in the run that repairs the pointers. | repair | `guides/scaffold.md:1597` |
| Vendored data root | `repair` and `overwrite` restore `.claude/settings.json`, so an edit inside a target is reverted at the next visit. | repair | `guides/scaffold.md:1617` |
| Integrity | The reader verifies each fetched vendored response against the digest in `host.json`, then verifies the inventory against its membership digest. | limit | `guides/scaffold.md:1694` |
| Generated workspace | A workspace's file set is a function of its axes plus its structural facts. | environment | `guides/scaffold.md:1706` |
| Generated workspace | The selection gets a Vite config and a scoped TypeScript config per selected environment and for `bin` when it is set. | environment | `guides/scaffold.md:1714` |
| Generated workspace | `configs/browsers.ts` is emitted for a workspace selecting `browser` on either environment axis or in its setup runtime list. | environment | `guides/scaffold.md:1724` |
| Generated workspace | The selection gets an `index.ts` barrel per selected environment, `main.ts` and `index.html` for an application browser, and one entry test per axis project. | environment | `guides/scaffold.md:1736` |
| Generated workspace | An integration selection emits a birth-owned `tests/integration.test.ts` seed that imports each selected public barrel. | environment | `guides/scaffold.md:1739` |
| Generated workspace | `tests/distribution.test.ts` is emitted for a workspace publishing any `src` environment and is claimed by presence rather than birth. | environment | `guides/scaffold.md:1742` |
| Generated workspace | A published browser environment adds the real-browser stage to that proof. | environment | `guides/scaffold.md:1744` |
| Generated workspace | A release that moves the `AGENTS.md` pointer wording moves every target's copy at its next `repair`. | repair | `guides/scaffold.md:1756` |
| Generated workspace | A workspace publishing a `src` environment rolls each published face's declarations up from that face's own Vite config. | environment | `guides/scaffold.md:1784` |
| Limits | `overwrite` deletes a superseded instruction copy in the run that repairs the pointers, and it deletes only what git tracks. | repair | `guides/scaffold.md:1977` |
| Limits | `repair` never closes a foreign canon copy: it writes planned paths and deletes nothing. | repair | `guides/scaffold.md:1982` |
| Limits | The skill pointer set a target receives is content-owned and restored by `repair`. | repair | `guides/scaffold.md:1992` |
| Limits | The compiler emits none of the host-specific segment spellings `isPath` deliberately admits. | limit | `guides/scaffold.md:2005` |
| Limits | Scaffold emits no styles axis. | styles | `guides/scaffold.md:2014` |
| Limits | `SRC_MATRIX` is exactly `core`, `browser`, and `server`, and `Blueprint` carries no styles field. | styles | `guides/scaffold.md:2014` |
| Limits | A workspace that needs `src/styles/` adds the directory, its configuration, and its Vitest project by hand. | styles | `guides/scaffold.md:2015` |
| Limits | `.claude/rules/workspace.md` describes styles as an environment because the fleet has one; scaffold does not generate it. | styles | `guides/scaffold.md:2016` |
| Limits | A generated workspace has empty barrels and no starter entity. | limit | `guides/scaffold.md:2027` |
| Limits | Every emitted `index.ts` exports nothing. | environment | `guides/scaffold.md:2027` |
| Limits | Scaffold generates the distribution proof and refuses to generate every other one. | limit | `guides/scaffold.md:2032` |
| Limits | The distribution proof is the one scaffold derives from the workspace it is writing into; `tests/policy.test.ts` and `tests/config.test.ts` are copied from the shared file set. | limit | `guides/scaffold.md:2033` |
| Limits | `tests/distribution.test.ts` is the one proof scaffold generates for you. | limit | `guides/scaffold.md:2051` |
| Limits | Scaffold registers `distribution` whenever the workspace publishes at least one `src` environment, and registers `conformance` and `service` when their structural facts are set. | environment | `guides/scaffold.md:2054` |
| Limits | In a publishing workspace, `distribution` and `service` run from `prepublishOnly` and `conformance` stays in `test`. | environment | `guides/scaffold.md:2056` |
| Limits | In a `private: true` workspace, `distribution` is absent, `service` runs from `test`, and there is no `prepublishOnly`. | environment | `guides/scaffold.md:2057` |
| Limits | A published stylesheet is an excluded subpath: it is read rather than imported, and the generated proof names it where it excludes it. | styles | `guides/scaffold.md:2136` |
| Limits | The proof generated for a workspace publishing no browser face asserts that no browser face exists. | environment | `guides/scaffold.md:2159` |
| Limits | A workspace that selects `browser` on its `app` axis alone gets `configs/browsers.ts` and still carries no browser branch in the distribution proof, because the selector reads the `src` axis. | environment | `guides/scaffold.md:2162` |
| Limits | The remedy is to delete the file and run `repair`, which writes the variant that carries the browser branch. | repair | `guides/scaffold.md:2171` |
| Limits | A journey project is such a project: its birth-owned wrapper drops the invocation record, so it runs in `test` whatever mode the run names. | journey | `guides/scaffold.md:2180` |
| Limits | A target that later lost `tests/distribution.test.ts` reports drift that `repair` closes. | repair | `guides/scaffold.md:2194` |

## Unknowns

- The guide says deferred paths are presence-only and repair never writes their floor bytes (`guides/scaffold.md:540`). The ownership table says a presence write restores an absent file (`guides/scaffold.md:1135`), and `repair` writes every hydrated artifact whose derived drift is `missing` (`src/server/Materializer.ts:320`).
- The guide says the selection gets a Vite config per selected environment (`guides/scaffold.md:1714`). The vendored proof requires a Vite wrapper for every present `src` environment and for `app` `browser` and `app` `server`, and it does not require `configs/app/vite.core.config.ts` (`tests/config.test.ts:460`).
- The guide says the browser setup project applies the Vue single-file-component transform when `app` selects `browser`, and that `src/browser` alone adds no Vue plugin or dependency (`guides/scaffold.md:953`). `#derive` records the `app` and `src` directories and reads no Vue file, flag, or dependency (`src/bin/CLI.ts:983`).