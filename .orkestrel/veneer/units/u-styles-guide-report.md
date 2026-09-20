# U-styles-guide report

`opus` on native Opus 5, run directly in `C:/Users/mikes/WebstormProjects/veneer` on Windows on
2026-09-20. No agent was spawned. Nothing was committed or installed. `HEAD` remains `fbbda43`.

`guides/veneer.md` carries a `## Styles` section between `## Examples` and `## Tokens`, with
`### Files`, `### Scripts`, and `### Departures from the workspace rows` under it.
`guides/README.md` names § Styles for the stylesheet face's build and loading and § Tokens for what
that face declares. `test:guides`, `test:policy`, and `format:check` each exit 0.

## Touched files

- `guides/veneer.md` — adds the `## Styles` section at line 73, between `## Examples` and
  `## Tokens`.
- `guides/README.md` — rewrites the stylesheet-face paragraph that opened at line 17.

Diffstat:

```text
 guides/README.md |  14 ++++----
 guides/veneer.md | 101 +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 109 insertions(+), 6 deletions(-)
```

## The section as written

```markdown
## Styles

Veneer publishes its cascade as one standalone stylesheet. The `build:src:styles` script compiles
`src/styles/index.scss` to `dist/src/styles/index.css`, and the manifest's `exports` map names that
file under the `./styles` subpath. The manifest lists `**/*.css` in `sideEffects`, so a bundler
keeps an import of that subpath rather than dropping it as unused.

Load the cascade from your entry module, ahead of the rules of your own that override it.

~~~ts
import '@orkestrel/veneer/styles'
~~~

The specifier resolves to standalone CSS rather than to a JavaScript module, so the import carries a
stylesheet and declares no binding. A consumer with no bundler resolves the same subpath and serves
the resolved file with a `<link>` element instead.

### Files

The following files carry the axis.

| File                                | Role                                                                       |
| ----------------------------------- | -------------------------------------------------------------------------- |
| `src/styles/index.scss`             | The compilation barrel.                                                    |
| `src/styles/index.ts`               | The side-effect entry, and the build's library entry.                      |
| `configs/src/vite.styles.config.ts` | The build and test wrapper, composed from the root's `srcBrowser` factory. |
| `configs/src/tsconfig.styles.json`  | The check-only TypeScript project.                                         |
| `tests/setupStyles.ts`              | The shared setup module the styles proofs read.                            |
| `tests/src/styles/`                 | The browser proofs of the shipped cascade.                                 |

The barrel's `@use` rules name `_tokens.scss`, `_theme.scss`, and the element partials under
`elements/`; `_mixins.scss` reaches the build through the token and theme partials rather than
through the barrel. The entry imports `./index.scss` and nothing else, and the JavaScript wrapper
the build emits from it stays unexported, because the `./styles` subpath names the stylesheet.

The wrapper replaces the plugins, the output directory, the library entry, and the test fields it
inherits, and it declares the `src:styles` project. The check-only project extends the root
`tsconfig.json`, narrows `lib` to `ESNext` and `types` to `vite/client` over `src/styles/**/*.ts`,
and emits nothing. The setup module carries the direction scanners, the shadow readers, and the
Bootstrap compatibility oracle's retained values, and it imports no stylesheet of its own: the
styles project loads the built cascade through its `setupFiles` instead. § Tests names each proof
under `tests/src/styles/`.

### Scripts

Each script names the styles target alone, and the `src` chain it belongs to runs it after the core
and browser targets.

| Script             | Contract                                                                    | Chained from                                                       |
| ------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `build:src:styles` | Builds `dist/src/styles` from `configs/src/vite.styles.config.ts`.          | `build:src`, after `build:src:core` and `build:src:browser`        |
| `check:src:styles` | Typechecks `src/styles/**/*.ts` against `configs/src/tsconfig.styles.json`. | `check:src`, after `check:src:core` and `check:src:browser`        |
| `test:src:styles`  | Builds the cascade, then runs the `src:styles` project.                     | `test:src`, after the root's `src:core` and `src:browser` projects |

`test:src:styles` builds first because the proof's subject is the compiled cascade: the project
loads `dist/src/styles/index.css` through its `setupFiles`, and every case under
`tests/src/styles/` reads the rules the browser resolved from that file rather than the
declarations the SCSS sources carry.

### Departures from the workspace rows

`.claude/rules/workspace.md` carries a `src:styles` row in its environment, alias, build-output,
test-project, and scoped-check tables. Veneer's pilot departs from those rows as follows, and each
departure names its cause.

1. **No `@src/styles` alias.** The root `tsconfig.json` is the package's own content, so the alias
   could sit there; the lint allowlist is what forecloses it. `import/no-unassigned-import` permits
   an unassigned import only for a stylesheet suffix, and an alias carries none. The showcase shell
   imports `../../src/styles/index.scss` by relative path instead, and a generator that emits the
   alias widens that allowlist in the same release.
2. **The wrapper composes the root's browser factory.** The root `vite.config.ts` declares no styles
   factory to compose, so `configs/src/vite.styles.config.ts` spreads `srcBrowser` and replaces the
   differing fields by assignment. The root's `mergeOverride` helper is not that mechanism: it keeps
   a base plugin no override names, so `environmentBoundary('src/browser')` would stay on a styles
   build, and it concatenates every other array, so the include list and the setup files would
   double.
3. **No environment boundary and no lint fence owns `src/styles`.** The root plants
   `environmentBoundary` on `src/core`, `src/browser`, and `app/browser`, and `.oxlintrc.json`
   fences each of those environments with its own `no-restricted-imports` patterns. Neither names
   `src/styles`, so the generic `src/**` rules govern the styles entry alone.
4. **`src:styles` is declared in its own wrapper.** The root `vite.config.ts` registers `src:core`,
   `src:browser`, `app:browser`, and the cross-cutting projects; the styles project is declared in
   `configs/src/vite.styles.config.ts`. So `--project src:styles` at the root matches no project
   and Vitest refuses the run, and the `probe` workbench, which runs from the root configuration,
   cannot name the project either. `test:src:styles` reaches it with `--config`.
5. **The vendored `tests/config.test.ts` asserts nothing about the axis.** That proof iterates the
   environments scaffold generates, so its alias, project, and plugin cases pass over `src/styles`
   and `src:styles`. The proofs under `tests/src/styles/` carry that weight instead.
6. **`tests/setup.css` arrives with the Tailwind unit.** The workspace rows describe that file as
   the declaration of cascade-layer order ahead of `@import 'tailwindcss'` and its `@source`.
   Veneer declares no Tailwind dependency and carries no such file, so it lands with the unit that
   adds one.

Scaffold's `SRC_MATRIX` is closed on `core`, `browser`, and `server`, so this axis is hand-authored
and its configuration files, `configs/src/vite.styles.config.ts` and
`configs/src/tsconfig.styles.json`, are the package's own. Emitting the axis from the generator
means the `@src/styles` alias in the root `tsconfig.json`, the matching lint allowlist entry and
fence, a `src/styles` owner in the environment boundary, a `srcStyles` factory and project
registration in the root `vite.config.ts`, and the environment lists in `tests/config.test.ts`.
```

The single fence inside the section is written `~~~ts` in this report alone, so the report's own
outer fence closes where it is written. `guides/veneer.md` carries it as a backticked `ts` fence.

## The README sentence

The paragraph opens:

```markdown
That guide's § Styles is the reference for the stylesheet face's build and loading
([`src/styles`](../src/styles)): the published artifact, the specifier that loads it, the files and
scripts the axis owns, and each departure from the workspace rows. Its § Tokens is the reference for
what that face declares: every `--vn-*` token the cascade carries, its value and its source, and the
`--bs-*` alias it answers. That face publishes CSS rather than declarations, so it names no
TypeScript surface of its own and adds no row to the concept index, whose rows are the parity
targets [`tests/guides.test.ts`](../tests/guides.test.ts) drives. Its own proofs are the browser
suites under [`tests/src/styles`](../tests/src/styles).
```

## Gate evidence

Every gate ran through `npm.cmd` from the Veneer checkout root after the last edit. The exit codes
are the captured native codes; the logs are under `tmp/u-styles-guide/`.

`npm.cmd run test:guides` exited 0. Log: `tmp/u-styles-guide/test-guides.log`.

```text
 Test Files  1 passed (1)
      Tests  18 passed (18)
   Start at  16:44:31
   Duration  482ms (transform 50ms, setup 30ms, import 301ms, tests 6ms, environment 0ms)
```

`npm.cmd run test:policy` exited 0. Log: `tmp/u-styles-guide/test-policy.log`.

```text
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  16:44:33
   Duration  1.94s (transform 95ms, setup 31ms, import 255ms, tests 1.51s, environment 0ms)
```

`npm.cmd run format:check` exited 0. Log: `tmp/u-styles-guide/format-check.log`.

```text
Checking formatting...

All matched files use the correct format.
Finished in 751ms on 80 files using 16 threads.
```

The same `test:guides` command was run against `HEAD` before any edit and reported `18 passed (18)`
at 16:39:00, so the section added no assertion and removed none.

## Readings behind the prose

Each claim in the section was read from the tree before it was written.

| Claim | Read from |
| --- | --- |
| `./styles` names `dist/src/styles/index.css`; `sideEffects` lists `**/*.css` | `package.json` `exports` and `sideEffects` |
| The barrel's `@use` graph, and `_mixins.scss` reaching it through the partials | `src/styles/index.scss`, `src/styles/_tokens.scss`, `src/styles/_theme.scss` |
| The entry imports `./index.scss` and nothing else | `src/styles/index.ts` |
| The wrapper spreads `srcBrowser` and replaces plugins, build, and test fields | `configs/src/vite.styles.config.ts` |
| The project loads `dist/src/styles/index.css` through `setupFiles` | `configs/src/vite.styles.config.ts` `test.setupFiles` |
| The check-only narrowing and include | `configs/src/tsconfig.styles.json` |
| The script contracts and their parent chains | `package.json` `scripts` |
| No `@src/styles` alias | `tsconfig.json` `compilerOptions.paths` |
| The stylesheet-suffix allowlist | `.oxlintrc.json` `import/no-unassigned-import` |
| The shell's relative stylesheet import | `app/browser/main.ts:1` |
| `mergeOverride` keeps an unnamed base plugin and concatenates other arrays | the `mergeOverride` comment and body in `vite.config.ts` |
| `environmentBoundary` sits on `src/core`, `src/browser`, `app/browser` only | `vite.config.ts:129`, `vite.config.ts:170`, `configs/src/vite.core.config.ts:10` |
| No lint fence names `src/styles` | the `overrides[].files` globs in `.oxlintrc.json` |
| The root registers no `src:styles` project | the `projects` array in `vite.config.ts` |
| `tests/config.test.ts` iterates the generated environments only | `tests/config.test.ts` project and plugin cases |
| `tests/config.test.ts` is vendored | `node_modules/@orkestrel/scaffold/dist/host/tests/` |
| `tests/setup.css` is absent | the `tests/` listing |
| `SRC_MATRIX` is closed on `core`, `browser`, `server` | `node_modules/@orkestrel/scaffold/dist/src/core/index.js:159` |

One claim was settled by running it rather than by reading. The guide says `--project src:styles` at
the root matches no project and Vitest refuses the run.

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:styles

⎯⎯⎯⎯⎯⎯⎯ Startup Error ⎯⎯⎯⎯⎯⎯⎯⎯
Error: No projects matched the filter "src:styles".
```

## Deviations

Nothing met the stop conditions. No guide gate went red, and no fact in the verdict was contradicted
by the tree. The following choices were settled inside the owned scope and recorded here.

- **The generator sentence names its configuration files rather than counting them.** The brief's
  wording reads "its two configuration files are package-owned". `AGENTS.md` § Writing bans a count
  of a set anyone can add to and requires naming the members instead, so the sentence reads "its
  configuration files, `configs/src/vite.styles.config.ts` and `configs/src/tsconfig.styles.json`,
  are the package's own". The meaning the verdict fixed is unchanged.
- **The section carries no relative links.** The `tests/guides.test.ts` link check resolves a
  relative link against the inventory the `GuideCommand` class is given, whose patterns are
  `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, `*.md`, and `package.json`. A link to
  `src/styles/index.scss` or to `configs/src/vite.styles.config.ts` therefore reports as broken. The
  section names every path as a code span instead, which is also what the brief's law requires of
  its API names.
- **The `<link>` sentence carries no `html` fence.** A served path depends on how the consumer
  exposes `node_modules`, so a fence would state a URL no reader can check. The brief required the
  sentence, and the sentence is there.
- **Table column names.** `File` and `Role`; `Script`, `Contract`, and `Chained from`.
- **Detail moved out of the `### Files` table into the paragraphs beneath it**, so no row runs to a
  paragraph's length. Every row the brief named is present, in the brief's order.
- **Departure 2 states the merger's behaviour as the brief fixed it** — it keeps a base plugin no
  override names, and it concatenates every other array — and names
  `environmentBoundary('src/browser')` as the plugin that would stay. It makes no claim about
  replacing an output boundary.

## Standing conditions met

- No sentence in the section names `index.rtl.css` or `rtl`. A case-insensitive `rtl` sweep over the
  section's lines returns nothing.
- `git status --porcelain` lists `guides/README.md` and `guides/veneer.md` and nothing else.
  `git check-ignore u-styles-guide-report.md` prints that path, so this report is ignored
  by git rather than listed. The unit's instruments and logs are under `tmp/u-styles-guide/`, which
  is ignored the same way.
- `git diff --check` exited 0.
