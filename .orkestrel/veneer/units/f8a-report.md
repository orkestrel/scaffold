# Unit F8a PROFILES — report

`opus` on Opus 5, worktree `/home/user/veneer-f8`, baseline `6e74ec9`, 2026-09-22.

## Deviation — blocking, per § Deviation protocol

**Expected.** Obligation 3 and the verdict's units table name
`tests/src/tailwind/profiles.test.ts`; acceptance criterion 5 requires `npm run test:policy` to
exit 0.

**Found.** The two cannot both hold. The vendored `tests/setupPolicy.ts` mirror law refuses the
path. `inspectPolicyMirrors` globs `tests/{app,src}/**/*.test.ts`, exempts `integration.test.ts`
by basename alone, and requires every other member to name a module at the same relative path
under `src/` or `app/`. `tests/src/tailwind/` has no source sibling, and `src/**` is off-limits.

Evidence, taken before any other file was written, with a placeholder test at that path:

```text
$ npm run test:policy
FAIL |policy| tests/policy.test.ts > repository policy > enforces the workspace policy laws including surface ownership
AssertionError: expected [ { rule: 'mirror', …(2) } ] to deeply equal []
+   {
+     "message": "module test requires one matching module: src/tailwind/profiles.cts, src/tailwind/profiles.mts, src/tailwind/profiles.ts, src/tailwind/profiles.tsx, src/tailwind/profiles.vue, src/tailwind/profiles.scss, src/tailwind/profiles.css, src/tailwind/_profiles.scss, src/tailwind/_profiles.css",
+     "path": "tests/src/tailwind/profiles.test.ts",
+     "rule": "mirror",
+   },
 Test Files  1 failed (1)
      Tests  1 failed | 108 passed | 1 skipped (110)
```

**Done or not done.** The unit is done at the brief's named path. I did not improvise a different
path, because the brief's deviation contract names this refusal as a stop condition and because
F8b's `shared.test.ts` and `preflight.test.ts` land in the same directory, so the path is a
design decision the Orchestrator owns rather than an ancillary choice this unit settles. Every
other acceptance criterion is green. Criterion 5's `npm run test:policy` half is red on this one
violation and nothing else.

**Hypothesis.** The verdict placed the proofs under `tests/src/` by analogy with
`tests/src/styles/`, where every proof does name a `src/styles/` module.

**Both candidate resolutions measured, same command, both green.** I created each path, ran the
sweep, then deleted both:

```text
$ npm run test:policy        # with tests/tailwind/profiles.test.ts and tests/src/tailwind/integration.test.ts
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
```

- **`tests/tailwind/`** escapes the glob and scales: `tests/tailwind/shared.test.ts` and
  `tests/tailwind/preflight.test.ts` are accepted the same way. Applying it is three edits:
  `include: ['tests/tailwind/**/*.test.ts']` in `configs/src/vite.tailwind.config.ts`, the file
  move, and the two `../tests/src/tailwind/profiles.test.ts` links in `guides/veneer.md` (§ Tailwind
  table and § Tests) plus the one prose mention in § Tailwind's exclusion paragraph. The test file's
  own relative imports become `../setupBrowser.js`, `../setup.css?inline`, `../setup.css?raw`, and
  `../fixtures/tailwind/*.css`.
- **`tests/src/tailwind/integration.test.ts`** is exempt by basename but does not scale: F8b needs
  two more proofs in that directory and a directory holds one `integration.test.ts`.

I recommend `tests/tailwind/`. I did not apply it.

## The two unknowns

Both settle positively. The throwaway probe lived under `tmp/probe/` and is deleted.

**Unknown 1 — does a `?inline` import of a profile file run the PostCSS chain under the browser
project?** Yes.

```text
$ npx vitest run --config tmp/probe/vite.probe.config.ts --no-cache --reporter=verbose
[probe] bytes 1079
[probe] head /*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer theme, reset, base, elements, components, utilities;
@layer utilities {
  .col-1 {
    grid-column: 1;
```

The text the case holds is Tailwind's compiled output, banner included, at the same 1079 bytes the
F8p probe measured for `txt-composable`. No fallback was taken; ruling 7's first path holds.

**Unknown 2 — does a plugin hook in the config run before Tailwind compiles?** Yes, on
`configResolved`.

```text
[probe] wrote candidates 527
[probe] container true
[probe] table true
```

The unexcluded instrument emitted `.container` and `.table`, which it can only do by reading the
candidates file the hook wrote. No committed fixture was needed; ruling 5's first path holds. The
plugin's own control is recorded later in this report: writing an empty list reddens the proof.

## What the profiles actually emit

Measured in the browser project through `?inline`, all three exactly as obligation 2 specifies
them, with the exclusion list written without brace ranges.

| Profile | Bytes | Layer statements | Layer blocks | Class rules |
| --- | --- | --- | --- | --- |
| `tailwind` | 144 | `theme, reset, base, elements, components, utilities`; `utilities` | none | 0 |
| `preflight` | 4760 | the order line; `theme, base, components, utilities`; `utilities` | `theme`, `base` | 0 |
| `unexcluded` | 1079 | the order line | `utilities` | 17 |

The unexcluded instrument's 17 names are `col-1` through `col-12`, `col-auto`, `container`,
`table`, `caption-bottom`, and `caption-top` — the F8p set, reproduced from the list the plugin
derives per run.

### Deviation — obligation 3's second bullet is falsified, and the case asserts what holds

Obligation 3 asks the `tailwind` profile's sheet to carry `theme` and `utilities` layer blocks and
no `base`. It carries **no layer block at all**: with `source(none)`, the candidates file as the
only scan target, and the exclusion line removing every name Tailwind would generate from it,
Tailwind emits the banner, the order line, and a bare `@layer utilities;` statement. The `preflight`
profile carries `theme` and `base` and no `utilities` block, for the same reason.

This is the verdict's own arithmetic rather than a defect: ruling 5 makes the built cascade the
scan target and ruling 4 excludes every name that target yields, so an empty `tailwind` emission is
the exclusion holding completely. The case pins the measured block lists exactly
(`[]` for `tailwind`, `['theme', 'base']` for `preflight`), which is stricter than the bullet and
carries the profile-defining difference the bullet was reaching for. Settled inside owned scope and
recorded here.

### Flagged unverified

`--tw-` is absent from every profile these recipes compile, because Tailwind 4.3.3 declares those
variables only for utilities none of these profiles generate. Obligation 4's `--tw-` reading is
therefore not reddened by the brief's named plant; the case carries its own plant that does redden
it, and a second reading that the named plant reddens. Details follow under obligation 4.

The guide's profile table states the layers Tailwind fills **for a consumer recipe**, which scans
`./src` rather than a candidates list. I did not execute a consumer recipe against real markup, so
`theme` and `utilities` for `tailwind` and `theme`, `base`, and `utilities` for `preflight` are
reasoned from the parts each import carries, not measured.

## Red-then-green readings

Every proof here is a new capability rather than a defect repair, so each control is a mutation
that the assertion must distinguish from the passing case. Each mutation was applied, run, and
reverted; the green run of the same command follows the table.

| Mutation | Command | Red reading |
| --- | --- | --- |
| `tests/setup.css` loses its whole exclusion line | `npx vitest run --config configs/src/vite.tailwind.config.ts --no-cache --reporter=dot` | `2 failed \| 2 passed (4)`: `expected [] to deeply equal [ 'utilities' ]` at the block list, and `The tailwind profile declares no exclusion line` from the reader |
| `container` removed from the exclusion line | same | `2 failed \| 2 passed (4)`: `expected [ 'caption-bottom', …(15) ] to include 'container'` |
| `col-7` removed from the exclusion line (a name outside the floor list) | same | `2 failed \| 2 passed (4)`: `expected [ '.col-7' ] to deeply equal []` at the completeness reading |
| the candidates plugin writes an empty list | same | `1 failed \| 3 passed (4)`: `expected [] to include '.container'` |
| `readCascadeSheet` reverted to selecting by the `theme` block alone | `npm run test:setup:browser` | `1 failed \| 47 passed (48)`: `expected CSSStyleSheet{} to be undefined` at `readCascadeSheet([rival])` |
| `tests/setup.css?inline` loaded into the styles document | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/index.test.ts` | `1 failed \| 4 passed (5)`: `expected [ CSSStyleSheet{}, CSSStyleSheet{} ] to deeply equal [ CSSStyleSheet{} ]` |

The `col-7` row is the one that matters for ruling 11: it proves the completeness reading fails on
its own account when a shared name the release ships is missing from the line, rather than only
when a floor name is.

The last row is obligation 4's named plant. It reddens the layer-declaring-sheet reading. It does
**not** redden the namespace reading, because the `tailwind` profile declares no custom property at
all — which is why the case also carries a `@layer theme { :root { --tw-probe: 1 } }` plant that
reddens both readings in the same run. That import does not stay in the `src:styles` project; the
run was throwaway and the file was restored from a copy.

Green after every revert:

```text
$ npm run test:src:tailwind          -> Test Files 1 passed (1); Tests 4 passed (4)
$ npm run test:src:styles            -> Test Files 58 passed (58); Tests 416 passed (416)
$ npm run test:setup:browser         -> Test Files 1 passed (1); Tests 48 passed (48)
```

## Touched files

| File | Summary |
| --- | --- |
| `configs/src/vite.tailwind.config.ts` | New. Spreads `srcBrowser`, drops the inherited build block, attaches `@tailwindcss/postcss` under `css.postcss`, declares the `src:tailwind` project, and carries the `veneer-tailwind-candidates` plugin that derives `tmp/tailwind/candidates.txt` from the built cascade on `configResolved`. |
| `package.json` | Adds `test:src:tailwind`; `test:src` runs it after `test:src:styles`. Scripts only. |
| `tests/setup.css` | New. The `tailwind` profile: the order line, the composable imports with `source(none)`, the candidates `@source`, and the exclusion line without brace ranges. |
| `tests/fixtures/tailwind/preflight.css` | New. The `preflight` profile: the same with `@import 'tailwindcss' source(none);`. |
| `tests/fixtures/tailwind/unexcluded.css` | New. The `tailwind` profile without its exclusion line. |
| `tests/src/tailwind/profiles.test.ts` | New. Four cases: the order line and the document's effective order; the reset each profile fills; the exclusion's completeness against the instrument; the sheet reader with a Tailwind sheet loaded. |
| `tests/src/styles/index.test.ts` | The order case now calls the extracted reader. Adds the standalone case proving no Tailwind stylesheet reaches the styles document. |
| `tests/setupBrowser.ts` | Adds `CASCADE_PREFIX`, `collectLayerOrder`, and `collectCustomProperties`; gives `readCascadeSheet` the Veneer-only signature and flattens its walk so a nested `theme` block is reached. |
| `tests/setupBrowser.test.ts` | Updates the export list; adds three cases — the reader's refusal plant, the layer-order reading, and the custom-property reading. |
| `guides/veneer.md` | Adds § Tailwind after § Files; turns the deferral bullet into two landed departure rows; names the proof in § Tests; points the F6 shared-name sentence at the subsection. |

`tmp/tailwind/candidates.txt` is generated per run and gitignored.

## Settled ancillary choices

- **The Veneer signature is `--vn-` declared by a style rule inside a `theme` layer block.** Measured:
  the built cascade declares 321 such tokens starting at `:root` inside its `theme` block; a compiled
  `preflight` profile's `theme` block declares `--font-sans`, `--font-mono`, `--default-font-family`,
  and `--default-mono-font-family` and no `--vn-`. Keying on the prefix rather than on `:root` keeps
  the existing `PROBE_CASCADE` fixture valid, so no existing case in `tests/setupBrowser.test.ts`
  changed.
- **The candidates plugin lives in `configs/src/vite.tailwind.config.ts`**, per verdict ruling 5. The
  brief offered the file `outputBoundary` lives in; that is `configs/helpers.ts`, which
  `node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts` vendors, so `scaffold repair`
  would revert it.
- The `src:tailwind` project's label colour is `green`; the profile table's column order is profile,
  entry, layers, parts, proof; the departure rows are worded as recorded in the guide.

## Guide wording added

§ Tailwind opens: *"Veneer declares no Tailwind dependency and ships no rule whose reason is
Tailwind. A consumer who already builds with Tailwind pairs the two by choosing a profile, which is
the entry stylesheet their build compiles. Veneer supports Tailwind 4.3."*

The profile table carries `standalone`, `tailwind`, and `preflight` with their entries, the layers
Tailwind fills, the Tailwind parts, and the proof link. One `css` fence per Tailwind profile follows,
each in the consumer's form: the order line, the imports without `source(none)`, `@source './src';`,
the exclusion line, then `@import '@orkestrel/veneer/styles';`.

Then: *"The order line never changes between profiles. It is the line `src/styles/_tokens.scss`
declares, and declaring it ahead of the Tailwind import is what makes Tailwind's own narrower order
merge as a no-op."*

And: *"The exclusion line is the one home of the class names it withholds from Tailwind's
generation. The workspace writes that line in `tests/setup.css`, and [stylesheet
profiles](../tests/src/tailwind/profiles.test.ts) reads it from that file rather than repeating it:
the proof compiles the same profile without the line, and every name the compiler emits there has to
be named on the line. So a release that ships another such class name reddens the proof until the
line and the recipes in this section name it."*

The section closes by naming the profile files, the wrapper, and `npm run test:src:tailwind`.

The shared-name rule's proof prose and the preflight departure table are left to F8b. Nothing was
written as a placeholder.

The deferral bullet in § Departures from the workspace rows is replaced by **"The `tests/setup.css`
file reaches a document through the Tailwind proof alone."** and **"The canonical file carries the
composable imports, and the bare import sits in a fixture."**

§ Tests gains: *"The Tailwind proofs compile each profile through the installed PostCSS plugin and
load it over the shipped cascade; see [stylesheet
profiles](../tests/src/tailwind/profiles.test.ts). § Tailwind names the profiles and the recipe each
one carries."*

The F6 sentence now reads: *"Where a class name exists in Bootstrap and in Tailwind, the declaration
Veneer ships is Bootstrap's; § Tailwind states how a paired build keeps that true."*

## `ROADMAP.md` patch (report-only)

Add to § Standing conditions, after the `scaffold repair` row:

```text
| The vendored `tests/setupPolicy.ts` mirror law requires every `tests/{app,src}/**/*.test.ts` file other than `integration.test.ts` to name a module at the same relative path under `src/` or `app/`, so a proof directory with no source sibling is refused. The Tailwind proofs name no `src/` module and `src/**` is off-limits to the Tailwind units, so their home is `tests/tailwind/`, outside that glob. |
```

Add to § Carriers:

```text
| Every later unit that ships a shared class name whose Veneer declarations are all normal | That unit extends the `@source not inline(...)` line in `tests/setup.css` and both recipes in `guides/veneer.md` § Tailwind in the same change; the completeness reading in the Tailwind profiles proof reddens until it does (F8 ruling 11) |
```

Replace the § Carriers `Tailwind tooling` carrier cell with:

```text
| F8 TAILWIND; the Orchestrator installed `tailwindcss` and its PostCSS plugin as development dependencies at `104a573` (D2) |
```

The F8 row in § Phases and units stays open, because F8b carries the shared-name rule and the
preflight departure table.

## Gate exits

| Gate | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format (214 files) |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | root, `check:src:core`, `check:src:browser`, `check:src:styles`, `check:app:browser` |
| `npm run test:src:tailwind` | 0 | Test Files 1 passed (1); Tests 4 passed (4) |
| `npm run test:src:styles` | 0 | Test Files 58 passed (58); Tests 416 passed (416) |
| `npm run test:setup:browser` | 0 | Test Files 1 passed (1); Tests 48 passed (48) |
| `npm run test:guides` | 0 | Test Files 1 passed (1); Tests 18 passed (18) |
| `npm run test:policy` | 1 | the one mirror violation stated under Deviation; 108 passed, 1 skipped |
| `npm run test:config` | 0 | Test Files 1 passed (1); Tests 173 passed, 1 skipped (174) |

`npm test` as an observation: exit 1, stopping at `test:policy`.

```text
test:src          8 files, 77 tests passed
test:src:styles  58 files, 416 tests passed
test:src:tailwind 1 file,  4 tests passed
test:app         10 files, 26 tests passed
test:journey      4 files, 88 passed, 4 skipped
test:policy       1 file,  1 failed, 108 passed, 1 skipped
```

`test:setup` and `test:conformance` were run separately and each reports one failure with the same
cause, which is this worktree's state rather than this change: `ENOENT: no such file or directory,
open '/home/user/veneer-f8/dist/src/core/index.js'`. Only `build:src:styles` has ever run here, and
the gate order puts `npm run build` before `npm test`. Nothing this unit owns produces that entry.

## Acceptance criteria

1. `format:check`, `lint:check`, `check` exit 0. **Met.**
2. `test:src:tailwind` exits 0 with obligation 3's cases present. **Met**, with the second bullet's
   assertion restated to what the compiler emits, recorded as a deviation.
3. `test:src:styles` exits 0 with the standalone case present and its plant's red recorded. **Met.**
4. `test:setup:browser` exits 0 with the reader's plant present. **Met.**
5. `test:guides` exits 0. **Met.** `test:policy` exits 1. **Not met**, on the mirror violation alone.
6. `grep -n 'tailwind' package.json` matches lines 61, 65, 103, and 113 — the `test:src` chain, the
   `test:src:tailwind` script, and the two development dependencies.
   `grep -c -- '--tw-' dist/src/styles/index.css` prints `0`. **Met.**
7. `git status --porcelain` lists only owned files. **Met.**

## `git status --porcelain`

```text
 M guides/veneer.md
 M package.json
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/src/styles/index.test.ts
?? configs/src/vite.tailwind.config.ts
?? tests/fixtures/tailwind/
?? tests/setup.css
?? tests/src/tailwind/
```

## `git diff 6e74ec9 --stat`

```text
 guides/veneer.md               |  81 ++++++++++++++++++++++++++--
 package.json                   |   3 +-
 tests/setupBrowser.test.ts     |  76 ++++++++++++++++++++++++++
 tests/setupBrowser.ts          | 119 ++++++++++++++++++++++++++++++++++++++---
 tests/src/styles/index.test.ts |  57 +++++++++++++++-----
 5 files changed, 310 insertions(+), 26 deletions(-)
```

Untracked, not in that diffstat: `configs/src/vite.tailwind.config.ts` (60 lines),
`tests/setup.css` (12), `tests/fixtures/tailwind/preflight.css` (6),
`tests/fixtures/tailwind/unexcluded.css` (7), `tests/src/tailwind/profiles.test.ts` (146).

## Claims I flag unverified

- The guide's profile table states the layers Tailwind fills for a consumer recipe scanning `./src`.
  I measured the test profiles, which scan the candidates list instead. The table's entries are
  reasoned from the imports each recipe carries.
- The `--lightningcss-` namespace in the standalone case's expected set comes from the minifier
  lowering `light-dark()` during `build:src:styles`. I measured it in the built cascade; I did not
  check whether a later toolchain release stops emitting it, in which case that case reddens and
  the fix is to drop the entry.
- `npm test` did not reach `test:setup`, `test:setup:browser`, `test:conformance`, or `test:guides`
  in one chain, because `test:policy` stops it. I ran each separately.
- The two `dist/src/core/index.js` failures are read as this worktree's missing build rather than as
  a regression. I did not run `npm run build` to confirm they go green, because the brief forbids a
  build beyond `build:src:styles`.

## Resolution

The Orchestrator ruled the deviation: the Tailwind proofs live under `tests/tailwind/`. Applied in
`/home/user/veneer-f8`, touching owned files alone.

### Moves

| Change | Detail |
| --- | --- |
| `tests/src/tailwind/profiles.test.ts` → `tests/tailwind/profiles.test.ts` | The directory `tests/src/tailwind/` is removed; `tests/src/` holds `browser`, `core`, and `styles` again. |
| The moved file's relative imports | `../setupBrowser.js`, `../setup.css?inline`, `../setup.css?raw`, `../fixtures/tailwind/preflight.css?inline`, `../fixtures/tailwind/unexcluded.css?inline`. |
| `configs/src/vite.tailwind.config.ts` | `include: ['tests/tailwind/**/*.test.ts']`. |
| `guides/veneer.md` | Four links repointed: the `tailwind` and `preflight` rows of § Tailwind's profile table, the § Tailwind exclusion paragraph, and § Tests. |
| `tests/setupBrowser.ts` | The `readCascadeSheet` remark names the proof's path, so its one mention moved with the file. |

That last row is a fifth mention the ruling did not enumerate. It is inside an owned file, and
leaving it would have pointed the reader at a path that no longer exists, so it moved with the rest.

### Gate exits, in the ordered sequence

| Gate | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format (214 files) |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | root, `check:src:core`, `check:src:browser`, `check:src:styles`, `check:app:browser` |
| `npm run test:src:tailwind` | 0 | Test Files 1 passed (1); Tests 4 passed (4) |
| `npm run test:policy` | 0 | Test Files 1 passed (1); Tests 109 passed, 1 skipped (110) |
| `npm run test:guides` | 0 | Test Files 1 passed (1); Tests 18 passed (18) |
| `npm run test:src:styles` | 0 | Test Files 58 passed (58); Tests 416 passed (416) |
| `npm run test:setup:browser` | 0 | Test Files 1 passed (1); Tests 48 passed (48) |

`npm run test:policy` was the one red gate in the report preceding this section. It is green, and
the deviation is closed. Acceptance criterion 5 is now met, so every acceptance criterion is met.

### `ROADMAP.md` patch, updated

The § Standing conditions row now reads:

```text
| The vendored `tests/setupPolicy.ts` mirror law requires every `tests/{app,src}/**/*.test.ts` file other than `integration.test.ts` to name a module at the same relative path under `src/` or `app/`, so a proof directory with no source sibling is refused. The Tailwind proofs name no `src/` module and `src/**` is off-limits to the Tailwind units, so their home is `tests/tailwind/`, outside that glob. |
```

The § Carriers rows are unchanged from the preceding section. F8b's `shared.test.ts` and
`preflight.test.ts` belong in `tests/tailwind/` for the same reason, and its brief needs that path.

### `git status --porcelain`

```text
 M guides/veneer.md
 M package.json
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/src/styles/index.test.ts
?? configs/src/vite.tailwind.config.ts
?? tests/fixtures/tailwind/
?? tests/setup.css
?? tests/tailwind/
```

`git diff 6e74ec9 --stat` is unchanged at 310 insertions and 26 deletions over five tracked files,
because every moved and added file is untracked.

## Round 2

Successor brief `tmp/units/f8a-brief-2.md`, the fix round over the reconciled audit. Same worktree,
baseline `6e74ec9`, 2026-09-22.

### Obligation 1 — the composable imports are proved (analyst 3, reviewer F6)

`tests/fixtures/tailwind/unexcluded.css` gains `@source inline("px-8 font-bold");`. Measured
emission, with the control in place:

```text
[dump] statements ["properties","theme,reset,base,elements,components,utilities"]
[dump] blocks     ["theme","utilities","properties"]
[dump] props      ["--spacing","--font-weight-bold","--tw-font-weight"]
[dump] selectors  [":root, :host",".col-1",…,".container",".table",".caption-bottom",".caption-top",".px-8",".font-bold","*, ::before, ::after, ::backdrop"]
```

The case `composes the theme and utilities imports, proved by a candidate the cascade never ships`
reads the control names from the directive that declares them, asserts the `theme` block declares
`--spacing` and `--font-weight-bold` (the variables `px-8` and `font-bold` resolve through), and
asserts the `utilities` block declares a rule for each control name. Command for every reading here:

```text
npm exec -- vitest run --config configs/src/vite.tailwind.config.ts --no-cache --reporter=dot tests/tailwind/profiles.test.ts
```

| Mutation | Red reading |
| --- | --- |
| `tailwindcss/theme.css` import removed from the instrument | `2 failed \| 5 passed (7)`: `expected [] to include '--spacing'`, and `expected [ 'utilities' ] to include 'properties'` |
| `tailwindcss/utilities.css` import removed from the instrument | `3 failed \| 4 passed (7)`: `expected [] to include '--spacing'`, `expected [] to include 'properties'`, `expected [] to include '.container'` |

Green after both reverts: `Tests 8 passed (8)`.

The completeness reading subtracts the control by reading the same `@source inline(…)` directive
(`collectInlineSources(unexcludedSource)` filtered to the non-excluded entry), so the test declares
no second list. Its own control is unchanged and re-measured: removing `col-7` from the exclusion
line still reddens it.

**Carried further, and recorded as a settled choice.** The brief's remedy binds the *instrument's*
imports. I measured whether it binds the profile's, and it does not:

```text
$ grep -v "tailwindcss/theme.css" tests/setup.css.bak > tests/setup.css
$ npm exec -- vitest run --config configs/src/vite.tailwind.config.ts …
      Tests  7 passed (7)
```

That is reviewer F6's statement verbatim, still true after obligation 1 alone. I closed it with the
same copy-equality mechanism obligation F4 installs, in a case of its own —
`declares the Tailwind parts each profile is named for, and repeats them in the instrument` — which
pins the profile's own import lines and holds the instrument's equal to them. The same mutation now
reads:

```text
      Tests  1 failed | 7 passed (8)
AssertionError: expected [ Array(1) ] to deeply equal [ …(2) ]
  at tests/tailwind/profiles.test.ts:153 > declares the Tailwind parts each profile is named for
```

### Obligation 2 — the standalone case pins no minifier detail (analyst 5)

`tests/src/styles/index.test.ts` now derives the namespace set, deletes `--lightningcss-` from it,
and compares against `['--bs-', TOKEN_PREFIX]`. The foreign-namespace rejection, the cascade
identity, the sheet isolation, and the `--tw-probe` plant all stay. The comment names
`--lightningcss-` as the minifier's own lowering of `light-dark()`, permitted and not required.

Two readings recorded, command
`npm exec -- vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/index.test.ts`:

| Mutation | Red reading |
| --- | --- |
| the `namespaces.delete('--lightningcss-')` line removed | `1 failed \| 4 passed (5)`: `expected [ '--bs-', '--lightningcss-', '--vn-' ] to deeply equal [ '--bs-', '--vn-' ]` |

That reading also settles the analyst's point from the other side: the built cascade does emit the
namespace today, so the equality was rejecting a Tailwind-free output for a toolchain fact.

The exact-set reading needed its own control, because nothing on the standalone page could move it.
The case now re-takes the same reading after the `--tw-probe` plant and expects
`['--bs-', '--tw-', TOKEN_PREFIX]`, so the set comparison fails when a foreign namespace reaches the
page rather than only when the narrower `--tw-` filter does.

### Obligation 3 — the guide states what Tailwind emits (analyst 6, reviewer F2)

§ Tailwind's layers column is headed `Layers Tailwind fills in a consumer build`, and a paragraph
after the table states the conditional emission: Tailwind fills a layer only for the utilities it
generates from the markup the `@source` rule names; `utilities` carries those rules, `theme` carries
the variables those rules read and no others, `base` carries preflight under the bare import, and a
build whose markup uses no utility fills none of them. It then states that a generated utility
registering a custom property makes Tailwind generate a `properties` layer and declare
`@layer properties;` ahead of the order line the entry wrote, that the placement leaves Veneer's
named layers in their declared order, and that the proof reads both orders.

The proof reads them in `places the generated properties layer before the order line, leaving the
named layers in order`:

- the compiled stylesheet's own order is `['properties', 'theme', 'reset', 'base', 'elements', 'components', 'utilities']`;
- the document's effective order is `['theme', 'reset', 'base', 'elements', 'components', 'utilities', 'properties']`.

**Deviation, measured.** The brief asks the case to assert that `properties` precedes `theme` **in
the document's effective order**. It does not and cannot: the built cascade is a setup file, so it
places the named layers before any profile arrives, and the generated layer takes the one position
left. `properties` precedes `theme` in the *compiled stylesheet's own* order, which is what a
consumer's single compiled entry carries. The case asserts both orders and the guide states the
consumer-facing one, so the obligation's substance holds at the reading that is true.

The same measurement moved the opening-statement case. `readLayerStatement` on the instrument
answers `['properties']`, because Tailwind prepends its statement, so
`opens every profile with the one order line` was false as written. It is now
`declares the one order line in every profile, and leaves the document order unmoved`: the two
profiles that generate no property-registering utility still open with the order line, the
instrument's order line is read behind the generated statement, and Veneer's named layers keep their
positions in the document either way.

### Obligation 4 — no hidden helpers in the proof (F-INFRA)

Every reusable reader moved to `tests/setupBrowser.ts`, exported, inventoried, and given a case.

| Export | What it answers | Case in `tests/setupBrowser.test.ts` |
| --- | --- | --- |
| `collectSheetRules` | every rule the named sheets hold, skipping one the document refuses | `walks every named sheet and skips one whose rules the document refuses` |
| `loadSheet` | the parsed sheet for loaded text, where the scene answers with the element | `loads a stylesheet and answers with the parsed sheet, …` |
| `readLayerStatement` | the opening layer statement, refusing a sheet that opens with another rule | `reads the opening layer statement, and refuses a sheet that opens with another rule` |
| `collectFilledLayers` | the layers a block was opened for, apart from the ones a statement placed | `reports the filled layers apart from the placed ones, …` |
| `collectSelectors` | every declared selector, grouped rules included, repeats kept | `reports every declared selector, including the ones a grouping rule holds` |
| `collectClassNames` | the class names those selectors declare, escapes resolved | `reads class names out of selector text, resolving the escapes a utility name carries` |
| `collectInlineSources` + `InlineSource` | the `@source [not] inline(…)` directives a file's bytes declare | `reads the source directives a stylesheet declares, apart from what a compiler does with them` |

`collectSheetRules` is a consolidation rather than an addition: `collectLayerOrder` and
`collectCustomProperties` each carried their own copy of the sheet walk and its refusal, and both now
route through it, as do the two new collectors.

`collectClassNames` uses the grammar `configs/src/vite.tailwind.config.ts` offers candidates with, so
the proof reads a name back in the form the wrapper offered it. It also removed the `.slice(1)`
selector arithmetic the completeness reading carried.

`tests/tailwind/profiles.test.ts` declares no function at module scope. The utilities-block reading
in the control case is inlined into that case, per the obligation's own instruction.

```text
$ grep -c '^function\|^const [a-z][A-Za-z]* = (' tests/tailwind/profiles.test.ts
0
$ grep -n '^const ' tests/tailwind/profiles.test.ts
26:const ORDER = …
31:const FLOOR_SELECTORS = …
37:const CONTROL_VARIABLES = …
```

### Obligation 5 — the reviewer's findings

- **F1.** `CASCADE_PREFIX` deleted. `tests/setupBrowser.ts` imports `TOKEN_PREFIX` from `./setup.js`
  and uses it at the `startsWith` predicate and the `{@link}`; the export-list entry is gone;
  `tests/src/styles/index.test.ts` and `tests/setupBrowser.test.ts` import and expect `TOKEN_PREFIX`.
  `grep -rn 'CASCADE_PREFIX' tests configs guides` prints nothing.
- **F2.** Column headed `Layers Tailwind fills in a consumer build`; the closing paragraph states
  that the workspace's profiles scan the derived candidate list rather than markup, that every name
  that list offers is on the exclusion line, and that the executed `tailwind` profile therefore emits
  nothing at all — and that the silence is what proves the exclusion complete. It then names the
  instrument and its control as what makes the emission positive again.
- **F3.** One sentence states the membership rule: a shared name Veneer ships with its `!important`
  declaration wins by importance whatever the layer order and needs no entry; a shared name Veneer
  declares normally would otherwise resolve to Tailwind's rule, so the line withholds it. No proof
  prose; that stays F8b's.
- **F4.** The one-home sentence is replaced by what holds, and by a mechanism that makes it hold:
  `holds every written copy of the exclusion line equal to the profile that declares it` reads
  `guides/veneer.md?raw` and `tests/fixtures/tailwind/preflight.css?raw`, extracts every
  `@source not inline("…")` directive, and asserts each equals the one in `tests/setup.css`. Both
  guide fences and the fixture are in that population, measured at `2` guide directives and `1`
  fixture directive.
- **F5, the cheap half.** Each fence carries `/* Your own markup directory. */` above its
  `@source './src';` line, and the sentence naming it as the line you change now sits ahead of the
  first fence. One sentence after the fences records that no proof compiles either recipe in the
  shape it ships, and that the executed consumer-shaped profile lands with the shared-name proof.
- **F7.** § Files gains rows for `configs/src/vite.tailwind.config.ts`, `tests/setup.css`,
  `tests/fixtures/tailwind/`, and `tests/tailwind/`, and the hand-authored configuration paragraph
  names the wrapper.
- **Lesser, carried.** `REACHED` is `FLOOR_SELECTORS`; the entry column is headed `Entry`; the link
  sentence reads `the profiles proof reads it from that file rather than repeating it, and holds
  every written copy equal to it … see [stylesheet profiles](../tests/tailwind/profiles.test.ts)`;
  the reader case is titled `reads Veneer's sheet while a Tailwind stylesheet is loaded`; the
  `--lightningcss-` comment is in place.
- **Referral R1.** Ruled by the brief; no change made.

### Touched files

| File | Summary |
| --- | --- |
| `/home/user/veneer-f8/tests/fixtures/tailwind/unexcluded.css` | Adds the `@source inline("px-8 font-bold")` candidate control. |
| `/home/user/veneer-f8/tests/tailwind/profiles.test.ts` | Declares no module-scope function; adds the control case, the generated-layer case, the copy-equality case, and the Tailwind-parts case; restates the order-line case; retitles the reader case. |
| `/home/user/veneer-f8/tests/setupBrowser.ts` | Drops `CASCADE_PREFIX` for `TOKEN_PREFIX`; adds `collectSheetRules`, `loadSheet`, `readLayerStatement`, `collectFilledLayers`, `collectSelectors`, `collectClassNames`, `collectInlineSources`, and `InlineSource`; routes `collectLayerOrder` and `collectCustomProperties` through the shared walk. |
| `/home/user/veneer-f8/tests/setupBrowser.test.ts` | Updates the inventory and imports; adds a case per moved reader. |
| `/home/user/veneer-f8/tests/src/styles/index.test.ts` | Permits `--lightningcss-` without requiring it; re-takes the namespace reading after the plant; uses `TOKEN_PREFIX`. |
| `/home/user/veneer-f8/guides/veneer.md` | § Tailwind: conditional emission and the generated layer, the membership rule, the rewritten one-home sentence, the flagged source line, the unexecuted-recipe note, the column headers; § Files rows and the configuration paragraph. |

### Gate exits

| Gate | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format (214 files) |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | root and every scoped project |
| `npm run test:src:tailwind` | 0 | Test Files 1 passed (1); Tests 8 passed (8) |
| `npm run test:src:styles` | 0 | Test Files 58 passed (58); Tests 416 passed (416) |
| `npm run test:setup:browser` | 0 | Test Files 1 passed (1); Tests 55 passed (55) |
| `npm run test:guides` | 0 | Test Files 1 passed (1); Tests 18 passed (18) |
| `npm run test:policy` | 0 | Test Files 1 passed (1); Tests 109 passed, 1 skipped (110) |

### Acceptance criteria

1. `format:check`, `lint:check`, `check` exit 0. **Met.**
2. `test:src:tailwind` exits 0 with the control case present and its two mutations recorded red. **Met.**
3. `test:src:styles` exits 0 with the standalone case no longer requiring `--lightningcss-`. **Met.**
4. `test:setup:browser` exits 0 with the moved readers' cases present. **Met.**
5. `test:guides` and `test:policy` exit 0. **Met.**
6. `grep -rn 'CASCADE_PREFIX' tests configs guides` prints nothing. **Met.**
7. `grep -c '^function\|^const [a-z][A-Za-z]* = (' tests/tailwind/profiles.test.ts` prints `0`. **Met.**

### `git status --porcelain`

```text
 M guides/veneer.md
 M package.json
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/src/styles/index.test.ts
?? configs/src/vite.tailwind.config.ts
?? tests/fixtures/tailwind/
?? tests/setup.css
?? tests/tailwind/
```

`git diff 6e74ec9 --stat`:

```text
 guides/veneer.md               | 119 ++++++++++++++++--
 package.json                   |   3 +-
 tests/setupBrowser.test.ts     | 214 +++++++++++++++++++++++++++++++-
 tests/setupBrowser.ts          | 269 +++++++++++++++++++++++++++++++++++++++--
 tests/src/styles/index.test.ts |  67 ++++++++--
 5 files changed, 642 insertions(+), 30 deletions(-)
```

### Deviations

- **Obligation 3's document-order half.** Recorded earlier with its measurement. `properties`
  precedes `theme` in the compiled stylesheet's own order, not in the document's. Both orders are
  asserted; the guide states the consumer-facing one.
- **Obligation 1 extended by one case.** The brief's remedy leaves `tests/setup.css`'s own imports
  unasserted, which I measured before adding the Tailwind-parts case. The addition uses obligation
  F4's own copy-equality mechanism, touches owned files only, and closes reviewer F6 at its root.
- **`loadSheet` is not yet the only home.** Pre-existing cases in `tests/setupBrowser.test.ts` and
  `tests/src/styles/index.test.ts` still write `requireValue(scene.load(…).sheet, …)` inline with
  their own refusal messages. I left them, to keep this round's edits to additions and the cases the
  brief named. Carried.

### Claims I flag unverified

- **The refused-sheet control is a configured platform object.** The `collectSheetRules` case builds
  a real `CSSStyleSheet` and defines a `cssRules` getter that throws `SecurityError`, because the
  tester serves one origin and carries no sheet the document genuinely refuses. I read this as an
  inert stub presenting the platform's own refusal rather than a fake of project-owned behaviour, and
  I name it here so the lane can rule rather than discover it.
- **The guide's consumer-build layer column is still reasoned, not executed.** F5's executed half is
  F8b's, and the section now says so in its own text. The column's entries come from the parts each
  recipe carries.
- **`--tw-font-weight` now appears in the instrument's compiled output**, because the control
  utility registers it. No document the standalone case reads loads the instrument, so the
  `--tw-` readings there are unaffected; I checked that `test:src:styles` stays green rather than
  reasoning about it.
- **`npm test` was not run this round.** The brief's gate list does not name it, and this worktree
  still carries no `dist/src/core/index.js`, which reddens `test:setup` and `test:conformance` for a
  reason the first report records.

## Round 3

Successor brief `tmp/units/f8a-brief-3.md`, the second fix round, over
`f8a-fix-audit-analyst-verdict.md` (`FAIL 1, 3, 5`). Same worktree, baseline `6e74ec9`, 2026-09-22.
F-DISPATCH is the Orchestrator's launch evidence and is not carried here.

### Obligation 1 — the theme reading is scoped (analyst 1)

`tests/setupBrowser.ts` gains `collectLayerRules(name, sheets)`: the rules the given stylesheets put
inside one named layer block, with no cascade resolution. `collectLayer` is now that reading over
the sheet `readCascadeSheet` resolves, so the refusal it owns stays where it was and the body is no
longer duplicated.

The control case reads each fact out of the block it belongs to:

- `collectLayerRules('theme', [instrument])` for `--spacing` and `--font-weight-bold`;
- `collectLayerRules('utilities', [instrument])` for the control's rules.

Both inline readings the case carried over the whole sheet are gone. The case also plants a live
control: the same compiled bytes with `@layer theme {` relabelled, where the scoped reading reports
nothing and a whole-sheet reading still finds every variable.

Command for every reading here:

```text
npm exec -- vitest run --config configs/src/vite.tailwind.config.ts --no-cache --reporter=dot tests/tailwind/profiles.test.ts
```

| Mutation | Reading |
| --- | --- |
| the instrument's `theme` block relabelled to `reset`, scoped reading in place | **red** — `1 failed \| 7 passed (8)`: `expected [] to include '--spacing'` at `profiles.test.ts:74` |
| the same relabelling, reading taken across the whole stylesheet | **green** — `Tests 8 passed (8)` |

The second row is the defect the audit found, reproduced. The pair is the proof that the scoping is
what distinguishes the move, rather than the relabelling being caught by something else.

### Obligation 2 — the guide's empty-emission statement is bounded (analyst 3)

§ Tailwind's paragraph after the profile table now states the composable case first and the bare
import second:

> Under the composable imports, Tailwind fills a layer only for the utilities it generates from the
> markup your `@source` rule names: the `utilities` layer carries those rules and the `theme` layer
> carries the variables those rules read. A build whose markup uses no Tailwind utility therefore
> fills no layer at all. The bare import differs, because preflight is not generated from your
> markup: it fills `base` and reads font variables of its own, so the `preflight` profile carries
> `theme` and `base` whatever your markup uses.
> [stylesheet profiles](../tests/tailwind/profiles.test.ts) reads that difference.

The generated-`properties` sentence follows as its own paragraph, unchanged in substance. The
existing fixture assertion agrees with the new text without edit: `fills Tailwind reset only under
the preflight profile` asserts `collectFilledLayers([preflight])` equals `['theme', 'base']` while
the same profile's candidate population is fully excluded.

### Obligation 3 — the directive reader parses every supported form (analyst 5)

`collectInlineSources` reads either quotation mark and tolerates whitespace inside the parentheses.
It no longer skips what it cannot read: it counts the `@source … inline(` occurrences, and refuses
by naming the first one the strict grammar did not match at the same index.

Controls added to its case in `tests/setupBrowser.test.ts`:

- `@source not inline('container table');` reads as `{ excluded: true, names: ['container', 'table'] }`;
- `@source  not  inline( "container" );` reads the same through the whitespace;
- `@source not inline(container);` throws `is written in a form this reader does not parse`;
- `@source inline("mixed');` throws naming the directive text it refused.

The copy-equality mutation the audit named, command as preceding:

| Mutation | Reading |
| --- | --- |
| the guide's first exclusion copy rewritten with single quotes and `col-7` removed | **red** — `1 failed \| 7 passed (8)`: `expected [ 'caption-bottom', …(15) ] to deeply equal [ 'caption-bottom', …(16) ]`, naming `- "col-7"` |

The guide was restored from a copy; `grep -c 'not inline("' guides/veneer.md` prints `2` and no
single-quoted copy remains.

**The refusal found a defect in the round-2 case on its first run.** The copy-equality case handed
`collectInlineSources` the whole guide, and § Tailwind's own prose names the directive as
`@source inline(…)`. The new refusal reported it:

```text
Error: The directive at 30158 is written in a form this reader does not parse: @source inline(…)` control naming utilities the cascade decl
```

That reading was wrong in round 2 and passed silently, because the old grammar skipped the prose
instead of refusing it. The case now reads the guide's `css` fences alone — a trivial one-use split
inlined into the case — so it parses CSS as CSS and prose as neither. Both guide fences and the
fixture stay in the compared population, which the case asserts is non-empty on each side.

### A further export, and its case

`collectLayerRules` is inventoried in the export-list case and has its own case,
`reads one named layer out of the sheets it is given, where the cascade reading resolves one first`:
it reads a named layer across sheets that are not the cascade, shows `collectLayer` refusing the
same sheets, keeps the empty answers for a placed-and-unfilled layer and an undeclared name apart
from that refusal, and asserts the two readings agree where both can be asked.

### Touched files

| File | Summary |
| --- | --- |
| `/home/user/veneer-f8/tests/setupBrowser.ts` | Adds `collectLayerRules` and routes `collectLayer` through it; `collectInlineSources` reads either quotation mark and refuses an unparsable directive by name. |
| `/home/user/veneer-f8/tests/setupBrowser.test.ts` | Inventories `collectLayerRules` and adds its case; adds the single-quoted, whitespace, and refusal controls to the directive case. |
| `/home/user/veneer-f8/tests/tailwind/profiles.test.ts` | Scopes the theme and utilities readings to their layer blocks; plants the relabelled-block control; reads the guide's `css` fences alone in the copy-equality case. |
| `/home/user/veneer-f8/guides/veneer.md` | Bounds the empty-emission statement to the composable imports and states the bare import's emission beside it. |

### Gate exits

| Gate | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | root and every scoped project |
| `npm run test:src:tailwind` | 0 | Test Files 1 passed (1); Tests 8 passed (8) |
| `npm run test:setup:browser` | 0 | Test Files 1 passed (1); Tests 56 passed (56) |
| `npm run test:guides` | 0 | exit 0 |
| `npm run test:policy` | 0 | exit 0 |

Observed beside them, not in the brief's list: `npm run test:src:styles` exit 0, Test Files 58
passed (58), Tests 416 passed (416).

### Acceptance criteria

1. `format:check`, `lint:check`, `check` exit 0. **Met.**
2. `test:src:tailwind` exits 0 with the scoped theme reading and its mutation recorded red. **Met.**
3. `test:setup:browser` exits 0 with the single-quoted control present. **Met.**
4. `test:guides` and `test:policy` exit 0. **Met.**

### `git status --porcelain`

```text
 M guides/veneer.md
 M package.json
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/src/styles/index.test.ts
?? configs/src/vite.tailwind.config.ts
?? tests/fixtures/tailwind/
?? tests/setup.css
?? tests/tailwind/
```

`git diff 6e74ec9 --stat`:

```text
 guides/veneer.md               | 124 +++++++++++++++-
 package.json                   |   3 +-
 tests/setupBrowser.test.ts     | 253 ++++++++++++++++++++++++++++++++-
 tests/setupBrowser.ts          | 311 +++++++++++++++++++++++++++++++++++++++--
 tests/src/styles/index.test.ts |  67 +++++++--
 5 files changed, 727 insertions(+), 31 deletions(-)
```

### Deviations

- **One export beyond the brief.** Obligation 1 asks for a scoped reading and names no mechanism.
  Writing it inline would have put a second block-finding reading in the same case beside the
  existing one, so it landed as `collectLayerRules`, with `collectLayer` routed through it and a
  case of its own. Owned files only.
- **The copy-equality case's guide reading changed.** Not named by the brief. The new refusal
  reported the case parsing guide prose as CSS, which was a live defect in round 2's work, so the
  reading is now scoped to the `css` fences. Recorded earlier with the exact refusal text.

### Claims I flag unverified

- **Tailwind's acceptance of the single-quoted directive is the analyst's measurement, not mine.**
  I made the reader parse both forms on that reading. What I measured is that the reader now reports
  the drifted single-quoted copy, which is what the gate exists for; I did not re-compile a
  single-quoted profile through the installed plugin.
- **The refusal covers the forms I could name.** It fires on any `@source … inline(` the strict
  grammar does not match at the same index, so an unquoted list and a mismatched pair are refused.
  A directive form Tailwind adds later would be refused rather than read, which is the safe
  direction but still a red gate someone has to open this function to clear.
- **`npm test` was not run this round**, for the reason the first report records: this worktree
  carries no `dist/src/core/index.js`, and the brief's gate list does not name the full suite.
