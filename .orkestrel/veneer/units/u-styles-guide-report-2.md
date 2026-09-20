# U-styles-guide — report 2, 2026-09-20

Done. Every item of `u-styles-guide-brief-2.md` landed in the `## Styles` section of
`guides/veneer.md` (lines 73 to 186). `test:guides`, `test:policy`, and `format:check` exit 0, and
`git status --porcelain` lists `guides/README.md` and `guides/veneer.md` and nothing else. No
deviation of the stop kind; the ancillary choices are recorded under § Deviations.

## Changed sentences, before and after

### Item 1 — the count (lines 75 to 79)

Before:

> Veneer publishes its cascade as one standalone stylesheet. The `build:src:styles` script compiles
> `src/styles/index.scss` to `dist/src/styles/index.css`, and the manifest's `exports` map names
> that file under the `./styles` subpath. The manifest lists `**/*.css` in `sideEffects`, so a
> bundler keeps an import of that subpath rather than dropping it as unused.

After:

> Veneer publishes its cascade through a standalone stylesheet subpath, `./styles`. The
> `build:src:styles` script compiles the `src/styles/index.scss` barrel to the
> `dist/src/styles/index.css` stylesheet, and the manifest's `exports` map names that file under
> the subpath. The manifest lists the `**/*.css` pattern in its `sideEffects` field, so a bundler
> keeps an import of that subpath rather than dropping it as unused.

The second sentence closes on `the subpath` rather than on a second `./styles` token, because the
first sentence now names it.

### Item 3 — the proof subject (lines 131 to 136)

Before:

> `test:src:styles` builds first because the proof's subject is the compiled cascade: the project
> loads `dist/src/styles/index.css` through its `setupFiles`, and every case under
> `tests/src/styles/` reads the rules the browser resolved from that file rather than the
> declarations the SCSS sources carry.

After:

> The `test:src:styles` script builds first because the proof's subject is the compiled cascade:
> the project loads the `dist/src/styles/index.css` file through its `setupFiles` array, and the
> cases that read the shipped cascade read the rules the browser resolved from that file rather
> than the declarations the SCSS sources carry. The mixin proofs compile their own fixture partial,
> `tests/src/styles/fixtures/mixins.scss`, and the token proofs also drive declarations the case
> writes.

The fixture's path is named because `tests/src/styles/mixins.test.ts:14` imports
`./fixtures/mixins.scss`; naming it is wording inside the meaning the brief fixed.

### Item 4 — the boundary attribution (lines 157 to 162)

Before:

> **No environment boundary and no lint fence owns `src/styles`.** The root plants
> `environmentBoundary` on `src/core`, `src/browser`, and `app/browser`, and `.oxlintrc.json`
> fences each of those environments with its own `no-restricted-imports` patterns. Neither names
> `src/styles`, so the generic `src/**` rules govern the styles entry alone.

After:

> **No environment boundary and no lint fence owns the `src/styles` directory.** The root's
> `srcBrowser` and `appBrowser` factories plant the `environmentBoundary` plugin on the
> `src/browser` and `app/browser` environments, and the `configs/src/vite.core.config.ts` wrapper
> plants it on the `src/core` environment. The `.oxlintrc.json` file fences each of those
> environments with its own `no-restricted-imports` patterns. Neither the boundary nor the fence
> names the `src/styles` directory, so the generic `src/**` rules govern the styles entry alone.

`Neither names` became `Neither the boundary nor the fence names`, because the preceding sentence
no longer has one subject the pronoun can attach to.

Tree evidence: `vite.config.ts:129` and `vite.config.ts:170` carry
`environmentBoundary('src/browser')` and `environmentBoundary('app/browser')` inside `srcBrowser`
and `appBrowser`; `srcCore` (`vite.config.ts:104` to `123`) installs no plugin;
`configs/src/vite.core.config.ts:10` carries `environmentBoundary('src/core')`.

### Item 5 — the coverage sentence (lines 169 to 174)

Before:

> **The vendored `tests/config.test.ts` asserts nothing about the axis.** That proof iterates the
> environments scaffold generates, so its alias, project, and plugin cases pass over `src/styles`
> and `src:styles`. The proofs under `tests/src/styles/` carry that weight instead.

After:

> **The vendored `tests/config.test.ts` proof asserts nothing about the axis.** That proof iterates
> the environments scaffold generates, so its alias, project, and plugin cases pass over the
> `src/styles` directory and the `src:styles` project. The proofs under the `tests/src/styles/`
> directory prove the cascade, the tokens, the theme, the mixins, and the elements, and no proof
> asserts the alias, the project registration, or the configuration plugins for the axis; that gap
> is a departure recorded here, not covered.

### Item 6 — the replaced fields (lines 110 to 114)

Before:

> The wrapper replaces the plugins, the output directory, the library entry, and the test fields it
> inherits, and it declares the `src:styles` project. The check-only project extends the root
> `tsconfig.json`, narrows `lib` to `ESNext` and `types` to `vite/client` over
> `src/styles/**/*.ts`, and emits nothing.

After:

> The wrapper replaces the plugins, the output directory, the library entry, the build options
> (keeping the root's build-log handler and dropping the browser externals and output paths), and
> the test fields it inherits, and it declares the `src:styles` project. The check-only project
> extends the root `tsconfig.json` file, narrows the `lib` option to the `ESNext` value and the
> `types` option to the `vite/client` value over the `src/styles/**/*.ts` sources, and emits
> nothing.

Tree evidence: `configs/src/vite.styles.config.ts:5` to `10` destructures `external` and `output`
off the browser factory's `build.rolldownOptions` and assigns the remainder, which is the root's
`onLog: enforceBuildLog` handler (`vite.config.ts:140` to `146`).

### Item 7 — the workspace rows (lines 140 to 143)

Before:

> `.claude/rules/workspace.md` carries a `src:styles` row in its environment, alias, build-output,
> test-project, and scoped-check tables.

After:

> The `.claude/rules/workspace.md` rule file carries a row for the styles axis in each of its
> tables: a `src/styles/` row in the environment table, a `@src/styles` row in the alias table, and
> the matching rows of its build-output, test-project, and scoped-check tables.

Tree evidence in `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/workspace.md`: line 24
keys `src/styles/`, line 49 keys `@src/styles`, line 99 keys `dist/src/styles`, and lines 122 and
216 key `src:styles`.

### Item 8 — the list form (lines 145 to 178)

The departures changed from a numbered list to a bulleted list. Every bold lead is unchanged in
meaning; the leads of the boundary, the project, and the setup-file departures gained the nouns
item 2 requires.

## Item 2 — the code-token sweep

Every backticked token in the section now takes a following noun, except a token that is a table
row's key cell, a member of a list that shares one trailing noun, or an appositive whose noun comes
first. The rows for `setupFiles`, `test:src:styles`, and `import/no-unassigned-import` are the ones
the audit named; every other row is the sweep's own find. Line numbers are the `guides/veneer.md`
lines after the edit.

| Line     | Token                                  | Noun added                  |
| -------- | -------------------------------------- | --------------------------- |
| 117      | `setupFiles`                           | array                       |
| 132      | `setupFiles`                           | array                       |
| 131      | `test:src:styles`                      | The … script                |
| 147      | `import/no-unassigned-import`          | The … rule                  |
| 76       | `src/styles/index.scss`                | barrel                      |
| 77       | `dist/src/styles/index.css`            | stylesheet                  |
| 78       | `**/*.css`                             | pattern                     |
| 78       | `sideEffects`                          | field                       |
| 104      | `_tokens.scss`, `_theme.scss`          | partials (shared)           |
| 105      | `elements/`                            | directory                   |
| 105      | `_mixins.scss`                         | partial                     |
| 106      | `./index.scss`                         | barrel                      |
| 113      | `tsconfig.json`                        | file                        |
| 113      | `lib`                                  | option                      |
| 113      | `ESNext`                               | value                       |
| 113      | `types`                                | option                      |
| 114      | `vite/client`                          | value                       |
| 114      | `src/styles/**/*.ts`                   | sources                     |
| 118      | `tests/src/styles/`                    | directory                   |
| 127      | `dist/src/styles`                      | directory                   |
| 127      | `configs/src/vite.styles.config.ts`    | wrapper                     |
| 127      | `build:src`                            | The … chain                 |
| 127      | `build:src:core`, `build:src:browser`  | scripts (shared)            |
| 128      | `src/styles/**/*.ts`                   | sources                     |
| 128      | `configs/src/tsconfig.styles.json`     | project                     |
| 128      | `check:src`                            | The … chain                 |
| 128      | `check:src:core`, `check:src:browser`  | scripts (shared)            |
| 129      | `test:src`                             | The … chain                 |
| 132      | `dist/src/styles/index.css`            | file                        |
| 140      | `.claude/rules/workspace.md`           | The … rule file             |
| 141      | `src/styles/`, `@src/styles`           | row                         |
| 145      | `tsconfig.json`                        | file                        |
| 149      | `../../src/styles/index.scss`          | relative path               |
| 151      | `vite.config.ts`                       | file                        |
| 152      | `configs/src/vite.styles.config.ts`    | wrapper                     |
| 153      | `srcBrowser`                           | factory                     |
| 155      | `environmentBoundary('src/browser')`   | plugin                      |
| 157      | `src/styles`                           | directory                   |
| 158      | `environmentBoundary`                  | plugin                      |
| 159      | `src/browser`, `app/browser`           | environments (shared)       |
| 160      | `src/core`                             | environment                 |
| 160      | `.oxlintrc.json`                       | The … file                  |
| 162      | `src/styles`                           | directory                   |
| 163      | `src:styles`                           | project                     |
| 163      | `vite.config.ts`                       | file                        |
| 164      | `src:core`, `src:browser`, `app:browser` | projects (shared)         |
| 165      | `configs/src/vite.styles.config.ts`    | wrapper                     |
| 166      | `--project src:styles`                 | selection                   |
| 168      | `test:src:styles`                      | The … script                |
| 168      | `--config`                             | flag                        |
| 169      | `tests/config.test.ts`                 | proof                       |
| 171      | `src/styles`                           | directory                   |
| 171      | `src:styles`                           | project                     |
| 171      | `tests/src/styles/`                    | directory                   |
| 175      | `tests/setup.css`                      | The … file                  |
| 176      | `@import 'tailwindcss'`                | rule                        |
| 177      | `@source`                              | rule                        |
| 180      | `SRC_MATRIX`                           | constant                    |
| 180      | `core`, `browser`, `server`            | environments (shared)       |
| 183      | `tsconfig.json`                        | file                        |
| 185      | `vite.config.ts`                       | file                        |
| 186      | `tests/config.test.ts`                 | proof                       |

Tokens left bare, with the reason:

- The key cell of each row in the `### Files` and `### Scripts` tables (lines 97 to 102 and 127 to
  129). A key cell is the row's subject rather than a sentence, and `tests/guides.test.ts` reads a
  guide table's backticked key cell as the row's identity.
- A list member sharing the trailing noun of the members after it, marked `(shared)` in the
  preceding table.
- An appositive whose noun comes first: `./styles` on line 75, the fixture path on line 135, and
  the configuration paths on lines 181 and 182.

The sweep ran over every non-blank line of the section with the fence excluded, reading the word
that follows each backticked span, and the preceding table is its result.

## Gates

Run in `C:/Users/mikes/WebstormProjects/veneer` after the last edit.

`npm run test:guides` — exit 0:

```text
 Test Files  1 passed (1)
      Tests  18 passed (18)
   Start at  17:00:44
   Duration  478ms (transform 51ms, setup 31ms, import 299ms, tests 5ms, environment 0ms)
```

`npm run test:policy` — exit 0:

```text
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
   Start at  17:00:48
   Duration  1.98s (transform 95ms, setup 31ms, import 255ms, tests 1.54s, environment 0ms)
```

`npm run format:check` — exit 0:

```text
Checking formatting...

All matched files use the correct format.
Finished in 736ms on 80 files using 16 threads.
```

`test:guides` also ran green after each edit, as the brief's Execution step requires.

A term sweep over lines 73 to 187 for the unconditional rows of `.claude/rules/writing.md`
§ Substitutions (`should`, `simply`, `easy`, `easier`, `just`, `utilize`, `leverage`, `via`,
`in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`,
`sanity check`, `dummy`, `blacklist`, `whitelist`, `slave`, `ensure`, `guarantee`, `currently`),
case-insensitive, returned no hit. The judged sweep over `now`, `new`, `latest`, `once`, `since`,
`above`, `below`, `master`, `both`, and the number words returned `the unit that adds one.` on line
178, which is a pronoun for the absent file rather than a count; that sentence predates this brief
and stands.

## Status

```text
 M guides/README.md
 M guides/veneer.md
```

`guides/README.md` carries brief 1's paragraph only; this brief changed nothing in it.
`git diff --stat` against `fbbda43` reports 14 changed lines in `guides/README.md`, 115 added lines
in `guides/veneer.md`, and 123 insertions against 6 deletions across the pair.

## Deviations

None of the stop kind. No guide gate went red, and no fact the brief states is contradicted by the
tree; each is cited in the preceding sections against the file and line that carries it.

Ancillary choices, settled inside the owned scope and recorded here:

- **Table key cells stay bare code tokens.** Item 2's sweep covers the section's prose, including
  the sentence-shaped `Contract` and `Chained from` cells of the `### Scripts` table, which gained
  their nouns. The `File` and `Script` key cells did not, for the reason under § Item 2. The `Role`
  cells of the `### Files` table already carried their nouns and are unchanged.
- **The `### Scripts` table is re-padded to its new widths.** The cells grew, so the pipes were
  realigned across the header, the separator, and each row, at 209 columns per line.
  `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md` matched 1 file and reported the
  correct format, so the alignment satisfies the formatter as written.

## Diff

`git diff -- guides/veneer.md` against `fbbda43`. The section is wholly added at that baseline, so
this diff carries brief 1's text as well; the preceding before-and-after sections isolate what this
brief changed.

```diff
diff --git a/guides/veneer.md b/guides/veneer.md
index dc69f19..ac1708e 100644
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -70,6 +70,121 @@ isColorModeState('dark') // true
 isColorModeState('auto') // false
 ```
 
+## Styles
+
+Veneer publishes its cascade through a standalone stylesheet subpath, `./styles`. The
+`build:src:styles` script compiles the `src/styles/index.scss` barrel to the
+`dist/src/styles/index.css` stylesheet, and the manifest's `exports` map names that file under the
+subpath. The manifest lists the `**/*.css` pattern in its `sideEffects` field, so a bundler keeps
+an import of that subpath rather than dropping it as unused.
+
+Load the cascade from your entry module, ahead of the rules of your own that override it.
+
+```ts
+import '@orkestrel/veneer/styles'
+```
+
+The specifier resolves to standalone CSS rather than to a JavaScript module, so the import carries a
+stylesheet and declares no binding. A consumer with no bundler resolves the same subpath and serves
+the resolved file with a `<link>` element instead.
+
+### Files
+
+The following files carry the axis.
+
+| File                                | Role                                                                       |
+| ----------------------------------- | -------------------------------------------------------------------------- |
+| `src/styles/index.scss`             | The compilation barrel.                                                    |
+| `src/styles/index.ts`               | The side-effect entry, and the build's library entry.                      |
+| `configs/src/vite.styles.config.ts` | The build and test wrapper, composed from the root's `srcBrowser` factory. |
+| `configs/src/tsconfig.styles.json`  | The check-only TypeScript project.                                         |
+| `tests/setupStyles.ts`              | The shared setup module the styles proofs read.                            |
+| `tests/src/styles/`                 | The browser proofs of the shipped cascade.                                 |
+
+The barrel's `@use` rules name the `_tokens.scss` and `_theme.scss` partials and the element
+partials under the `elements/` directory; the `_mixins.scss` partial reaches the build through the
+token and theme partials rather than through the barrel. The entry imports the `./index.scss`
+barrel and nothing else, and the JavaScript wrapper the build emits from it stays unexported,
+because the `./styles` subpath names the stylesheet.
+
+The wrapper replaces the plugins, the output directory, the library entry, the build options
+(keeping the root's build-log handler and dropping the browser externals and output paths), and the
+test fields it inherits, and it declares the `src:styles` project. The check-only project extends
+the root `tsconfig.json` file, narrows the `lib` option to the `ESNext` value and the `types`
+option to the `vite/client` value over the `src/styles/**/*.ts` sources, and emits nothing.
+The setup module carries the direction scanners, the shadow readers, and the Bootstrap
+compatibility oracle's retained values, and it imports no stylesheet of its own: the styles project
+loads the built cascade through its `setupFiles` array instead. § Tests names each proof under the
+`tests/src/styles/` directory.
+
+### Scripts
+
+Each script names the styles target alone, and the `src` chain it belongs to runs it after the core
+and browser targets.
+
+| Script             | Contract                                                                                            | Chained from                                                                       |
+| ------------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
+| `build:src:styles` | Builds the `dist/src/styles` directory from the `configs/src/vite.styles.config.ts` wrapper.        | The `build:src` chain, after the `build:src:core` and `build:src:browser` scripts. |
+| `check:src:styles` | Typechecks the `src/styles/**/*.ts` sources against the `configs/src/tsconfig.styles.json` project. | The `check:src` chain, after the `check:src:core` and `check:src:browser` scripts. |
+| `test:src:styles`  | Builds the cascade, then runs the `src:styles` project.                                             | The `test:src` chain, after the root's `src:core` and `src:browser` projects.      |
+
+The `test:src:styles` script builds first because the proof's subject is the compiled cascade: the
+project loads the `dist/src/styles/index.css` file through its `setupFiles` array, and the cases
+that read the shipped cascade read the rules the browser resolved from that file rather than the
+declarations the SCSS sources carry. The mixin proofs compile their own fixture partial,
+`tests/src/styles/fixtures/mixins.scss`, and the token proofs also drive declarations the case
+writes.
+
+### Departures from the workspace rows
+
+The `.claude/rules/workspace.md` rule file carries a row for the styles axis in each of its tables:
+a `src/styles/` row in the environment table, a `@src/styles` row in the alias table, and the
+matching rows of its build-output, test-project, and scoped-check tables. Veneer's pilot departs
+from those rows as follows, and each departure names its cause.
+
+- **No `@src/styles` alias.** The root `tsconfig.json` file is the package's own content, so the
+  alias could sit there; the lint allowlist is what forecloses it. The
+  `import/no-unassigned-import` rule permits an unassigned import only for a stylesheet suffix, and
+  an alias carries none. The showcase shell imports the barrel through its
+  `../../src/styles/index.scss` relative path instead, and a generator that emits the alias widens
+  that allowlist in the same release.
+- **The wrapper composes the root's browser factory.** The root `vite.config.ts` file declares no
+  styles factory to compose, so the `configs/src/vite.styles.config.ts` wrapper spreads the
+  `srcBrowser` factory and replaces the differing fields by assignment. The root's `mergeOverride`
+  helper is not that mechanism: it keeps a base plugin no override names, so the
+  `environmentBoundary('src/browser')` plugin would stay on a styles build, and it concatenates
+  every other array, so the include list and the setup files would double.
+- **No environment boundary and no lint fence owns the `src/styles` directory.** The root's
+  `srcBrowser` and `appBrowser` factories plant the `environmentBoundary` plugin on the
+  `src/browser` and `app/browser` environments, and the `configs/src/vite.core.config.ts` wrapper
+  plants it on the `src/core` environment. The `.oxlintrc.json` file fences each of those
+  environments with its own `no-restricted-imports` patterns. Neither the boundary nor the fence
+  names the `src/styles` directory, so the generic `src/**` rules govern the styles entry alone.
+- **The `src:styles` project is declared in its own wrapper.** The root `vite.config.ts` file
+  registers the `src:core`, `src:browser`, and `app:browser` projects and the cross-cutting ones;
+  the styles project is declared in the `configs/src/vite.styles.config.ts` wrapper. So the
+  `--project src:styles` selection at the root matches no project and Vitest refuses the run, and
+  the `probe` workbench, which runs from the root configuration, cannot name the project either.
+  The `test:src:styles` script reaches it with the `--config` flag.
+- **The vendored `tests/config.test.ts` proof asserts nothing about the axis.** That proof iterates
+  the environments scaffold generates, so its alias, project, and plugin cases pass over the
+  `src/styles` directory and the `src:styles` project. The proofs under the `tests/src/styles/`
+  directory prove the cascade, the tokens, the theme, the mixins, and the elements, and no proof
+  asserts the alias, the project registration, or the configuration plugins for the axis; that gap
+  is a departure recorded here, not covered.
+- **The `tests/setup.css` file arrives with the Tailwind unit.** The workspace rows describe that
+  file as the declaration of cascade-layer order ahead of the `@import 'tailwindcss'` rule and its
+  `@source` rule. Veneer declares no Tailwind dependency and carries no such file, so it lands with
+  the unit that adds one.
+
+Scaffold's `SRC_MATRIX` constant is closed on the `core`, `browser`, and `server` environments, so
+this axis is hand-authored and its configuration files, `configs/src/vite.styles.config.ts` and
+`configs/src/tsconfig.styles.json`, are the package's own. Emitting the axis from the generator
+means the `@src/styles` alias in the root `tsconfig.json` file, the matching lint allowlist entry
+and fence, a `src/styles` owner in the environment boundary, a `srcStyles` factory and its project
+registration in the root `vite.config.ts` file, and the environment lists in the
+`tests/config.test.ts` proof.
+
 ## Tokens
 
 Veneer publishes the token registry through the `@orkestrel/veneer` specifier and the cascade that
```
