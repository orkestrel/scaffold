# U-styles design round — verdict, 2026-09-20

Brief: `units/styles-axis-design-brief.md`. Lanes, blind to each other: `planner` on native Opus 5
through workflow `wf_9e6d9991-346` (`units/styles-axis-design-planner-report.md`) and `analyst`
on Astra through `codex exec` read-only, thread `01a0bf11-4bb5-7841-bd02-16953e32fef8`
(`units/styles-axis-design-analyst.sh`, `units/styles-axis-design-analyst-report.md`). The
user's rulings that bind this verdict: Veneer pilots the styles environment and nothing is
implemented in scaffold; no time or tokens go to RTL.

## Rulings

| Question | Planner | Analyst | Ruling |
| --- | --- | --- | --- |
| Q1 shell import | keep `import '../../src/styles/index.scss'`; the lint allowlist (`import/no-unassigned-import`, stylesheet suffixes alone) forecloses `@src/styles` even if the root carried it | same, with the boundary helpers executed on every candidate | **Keep the relative stylesheet import.** Departure sentence recorded in the guide: the root carries no `@src/styles`, and a generator that emits it must widen the lint allowlist in the same release. |
| Q2 wrapper composition | spread `srcBrowser()` and replace `plugins`, `build`, and the test fields by assignment; keep `outputBoundary` from the helper leaf beside the root import, as the generated browser wrapper does; add `enforceBuildLog` | same shape, executed: an in-memory build emitted byte-identical artifacts; keeps the root's `onLog` handler by destructuring `external` and `output` out of the browser `rolldownOptions` | **Spread and replace.** The styles configuration files are package-owned (scaffold plans no styles path), so the wrapper imports the root and replaces the differing fields; `mergeOverride` is rejected because it cannot remove the browser output boundary. Keep the build-log handler through the root's `rolldownOptions` minus the browser externals. |
| Q3 project name | `{ label: 'src:styles', color: 'cyan' }` | same | **Adopted.** |
| Q4 published surface | `./styles` stays the CSS string; `sideEffects` stays; the ES wrapper stays unexported; add `./styles/rtl` | same, adding that the emitted `index.js` is empty and a conditions object would resolve an empty module | **`./styles` stays the CSS string, `sideEffects` stays `["**/*.css"]`, the wrapper stays emitted and unexported.** The RTL export, the plugin rename, and every RTL sentence are struck by the user's ruling; the twin stays exactly as emitted. |
| Q5 build before test | keep; move the module-scope CSS import out of `tests/setupStyles.ts` into the styles project's `setupFiles` (unverified) so the Node `setup` project stops depending silently on the styles build; fallback chains the build into `test:setup` | keep; did not flag the Node dependency | **Keep build-before-test.** The silent dependency is real: `tests/setupStyles.test.ts` runs in Node and imports a module that imports `dist/src/styles/index.css`. The Orchestrator probes whether Vitest accepts a stylesheet in `setupFiles` before the unit brief is written; the probe decides between the two shapes. |
| Q6 guide section | `## Cascade` between `## Examples` and `## Tokens`, opening with the loading fence, then files, scripts, departures, generator sentence | `## Styles environment` between `## Tokens` and `## Showcase`, same contents | **`## Styles`, between `## Examples` and `## Tokens`**: the consumer's loading fence first, then `### Files`, `### Scripts`, `### Departures from the workspace rows` with the generator sentence. The name matches the directory and the environment; the place answers the consumer's first question before the token reference. |
| Q7 census gaps | `.oxlintrc.json` fences no `src/styles`; the lint allowlist forecloses the alias; `tests/config.test.ts` iterates the literal environment list; `test:src` omits the axis; the `probe` workbench cannot name `src:styles` | the same, plus: `tests/setup.css` is absent while the setup-assets rows name it; chain `test:src:styles` into `test:src` and drop the separate `test` invocation; SCSS is outside Oxlint's population; narrow the RTL plugin comment | **Adopted:** the `test:src` aggregation; the departures for the lint fence, the config proof, the root registration, and the probe workbench. **`tests/setup.css`** is a Tailwind asset (the rows describe layer order before `@import 'tailwindcss'`; no fleet package without Tailwind carries one), so it arrives with the Tailwind unit, and the guide says so in one sentence. The RTL comment change is struck with the rest of RTL. |

## Departures the pilot keeps (the guide's list)

1. No `@src/styles` alias; the shell imports the relative stylesheet, and a generator must widen
   the lint allowlist with the alias.
2. The wrapper composes the root's `srcBrowser()` and replaces the differing fields, because the
   root cannot carry a `srcStyles` factory; the output boundary comes from the helper leaf beside
   the root import.
3. No environment boundary and no lint fence owns `src/styles`; the styles entry is governed by
   the generic `src/**` rules.
4. `src:styles` is registered in its own wrapper; `vitest run --project src:styles` at the root and
   the `probe` workbench cannot reach it; the `test:src` chain reaches it through `--config`.
5. `test:src:styles` builds first because the proof's subject is the shipped cascade; the Node
   `setup` project's dependency on that build is closed by the shape the probe selects.
6. The vendored `tests/config.test.ts` iterates the generated environments and asserts nothing
   about the axis; the styles and distribution suites prove it instead.
7. `tests/setup.css` arrives with the Tailwind unit.

The generator sentence: scaffold's `SRC_MATRIX` is closed on `core`, `browser`, and `server`, so
the axis is hand-authored and its two configuration files are package-owned; emitting it means
the `@src/styles` alias in the root `tsconfig.json`, the matching lint allowlist entry and fence,
a `src/styles` owner in the environment boundary, a `srcStyles` factory and project registration
in the root `vite.config.ts`, and the environment lists in `tests/config.test.ts`.

## Routing

Two serialized writers after U1-conform, both in Veneer: **U-styles-config** on `sol` (Astra,
`workspace-write`) for the wrapper, the scripts, and the setup load, every criterion a resolved
configuration or a runner reading; then **U-styles-guide** on `opus` for the `## Styles` section
and the `guides/README.md` sentence. Both lanes routed the same way.
