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
