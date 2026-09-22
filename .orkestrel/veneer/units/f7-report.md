# Unit F7 CAPTURE — report

Baseline `07fc3c3` in `/home/user/veneer-f7`. Every measurement here was taken on this host, with
npm 11.19.1 and Chromium 141 at `/opt/pw-browsers`.

## What landed

The journey portfolio now names every frame for what rendered, shoots whole specimens, writes a
per-subject accessibility artifact beside each frame, guards every written frame on a declared
region on every run, and holds each registered scenario against a declared subject.

**Not done: the caption opt-out specimen.** The class it needs is F6's and has not landed in this
baseline. § Deviations gives the evidence and the follow-up.

## The capture listing before the change

`CAPTURE=1 npm run test:journey` at `07fc3c3`, exit 0, 88 passed and 4 skipped across 4 files,
writing 80 frames under `tmp/capture/states/`. Size and bottom-row colour read from each PNG's own
bytes. The pixel guard skipped in every project, so no variation reading exists for this run.

| Frame | Size | Bottom row |
| --- | --- | --- |
| `button-primary-active--dark-1280` · `--dark-390` · `--light-1280` · `--light-390` | 81x36 | `rgb(255, 255, 255)` |
| `button-primary-active-dark--dark-1280` · `--dark-390` · `--light-1280` · `--light-390` | 81x36 | `rgb(20, 25, 30)` |
| `button-primary-focus--dark-1280` · `--light-1280` | 1280x8223 | `rgb(255, 255, 255)` |
| `button-primary-focus--dark-390` · `--light-390` | 390x8802 | `rgb(255, 255, 255)` |
| `button-primary-focus-dark--dark-1280` · `--light-1280` | 1280x8223 | `rgb(20, 25, 30)` |
| `button-primary-focus-dark--dark-390` · `--light-390` | 390x8802 | `rgb(20, 25, 30)` |
| `button-primary-hover--dark-1280` · `--dark-390` · `--light-1280` · `--light-390` | 81x36 | `rgb(255, 255, 255)` |
| `button-primary-hover-dark--dark-1280` · `--dark-390` · `--light-1280` · `--light-390` | 81x36 | `rgb(20, 25, 30)` |
| `button-primary-pressed--dark-1280` · `--light-1280` | 1280x8223 | `rgb(255, 255, 255)` |
| `button-primary-pressed--dark-390` · `--light-390` | 390x8802 | `rgb(255, 255, 255)` |
| `button-primary-pressed-dark--dark-1280` · `--light-1280` | 1280x8223 | `rgb(20, 25, 30)` |
| `button-primary-pressed-dark--dark-390` · `--light-390` | 390x8802 | `rgb(20, 25, 30)` |
| `button-primary-rest--dark-1280` · `--light-1280` | 1280x8223 | `rgb(255, 255, 255)` |
| `button-primary-rest--dark-390` · `--light-390` | 390x8802 | `rgb(255, 255, 255)` |
| `button-primary-rest-dark--dark-1280` · `--light-1280` | 1280x8223 | `rgb(20, 25, 30)` |
| `button-primary-rest-dark--dark-390` · `--light-390` | 390x8802 | `rgb(20, 25, 30)` |
| `container-capped-rest--dark-1280` · `--light-1280` | 1140x21 | `rgb(255, 255, 255)` |
| `container-capped-rest--dark-390` · `--light-390` | 390x21 | `rgb(255, 255, 255)` |
| `container-capped-rest-dark--dark-1280` · `--light-1280` | 1140x21 | `rgb(20, 25, 30)` |
| `container-capped-rest-dark--dark-390` · `--light-390` | 390x21 | `rgb(20, 25, 30)` |
| `home--dark-1280` | 1280x8223 | `rgb(20, 25, 30)` |
| `home--dark-390` | 390x8802 | `rgb(20, 25, 30)` |
| `home--light-1280` | 1280x8223 | `rgb(255, 255, 255)` |
| `home--light-390` | 390x8802 | `rgb(255, 255, 255)` |
| `home-dark--dark-1280` · `--light-1280` | 1280x8223 | `rgb(20, 25, 30)` |
| `home-dark--dark-390` · `--light-390` | 390x8802 | `rgb(20, 25, 30)` |
| `link-role-rest--*` and `link-role-rest-dark--*`, every variant | 84x16 | several |
| `row-numbered-rest--dark-1280` · `--light-1280` | 1280x21 | `rgb(255, 255, 255)` |
| `row-numbered-rest--dark-390` · `--light-390` | 390x42 | `rgb(255, 255, 255)` |
| `row-numbered-rest-dark--dark-1280` · `--light-1280` | 1280x21 | `rgb(20, 25, 30)` |
| `row-numbered-rest-dark--dark-390` · `--light-390` | 390x42 | `rgb(20, 25, 30)` |
| `table-base-rest--dark-1280` · `--light-1280` | 1280x149 | `rgb(255, 255, 255)` |
| `table-base-rest--dark-390` · `--light-390` | 390x149 | `rgb(255, 255, 255)` |
| `table-base-rest-dark--dark-1280` · `--light-1280` | 1280x149 | `rgb(20, 25, 30)` |
| `table-base-rest-dark--dark-390` · `--light-390` | 390x149 | `rgb(20, 25, 30)` |

This listing is the failing-first evidence for the grammar. `button-primary-rest--dark-1280.png`
paints a white floor and `button-primary-rest-dark--light-1280.png` a dark one: the token after the
separator named the project that shot the frame, and the mode lived inside the stem. Two further
readings come out of it:

- `home--light-1280.png` and `button-primary-rest--light-1280.png` share the digest
  `5081f4e7a760a18b…`, and `home--dark-1280.png`, `home-dark--light-1280.png`, and
  `button-primary-rest-dark--light-1280.png` share `94b3eef7c1fddd57…`. A page frame of the resting
  document is one image whatever name it carries.
- `link-role-rest` is 84x16 at every width and its bottom row paints several colours: the crop is
  the first anchor with no background, which is CL13 finding 7 and reading 3 in one frame.

## The stem alignment

The Elements portfolio names a frame after the specimen it shows (CL13 finding 2: "Bootstrap's
stems match the registry's specimen names verbatim; Veneer's invert them and prepend the selector's
element"). Veneer now applies the same rule: a scenario's stem is its subject's stem, and a driven
state follows it. `tests/setup.test.ts` holds every scenario to that rule, so the alignment is
mechanical rather than written down twice.

| Veneer stem | Elements stem | Subject | Was |
| --- | --- | --- | --- |
| `capped-container` | `capped-container` | the `Capped container` specimen | `container-capped-rest` |
| `numbered-columns` | `numbered-columns` | the `Numbered columns` specimen | `row-numbered-rest` |
| `base` | `base` | the `Base` table specimen | `table-base-rest` |
| `role-links` | `role-links` | the `Role links` specimen | `link-role-rest` |
| `showcase` | Veneer's own | the `Showcase` region, as a page frame | `home` |
| `primary-focus` | Veneer's own | the `Primary` specimen under keyboard traversal | `button-primary-focus` |
| `primary-hover` | Veneer's own | the `Primary` specimen under the pointer | `button-primary-hover` |
| `primary-active` | Veneer's own | the `Primary` specimen held | `button-primary-active` |
| `toggle-pressed` | Veneer's own | the `Toggle` specimen driven to pressed | `button-primary-pressed` |
| — | — | — | `button-primary-rest`, removed |

Two rows need reading with care, and both are flagged under § Unverified claims: the Elements stems
are derived from the rule CL13 finding 2 states, because no retained record lists the Elements
filenames; and `base` is a weak stem read alone, kept because alignment is what the stem is for and
the guide's table names its subject.

`button-primary-pressed` was renamed rather than re-stemmed: the case that placed it drives the
`Toggle` host, so the old name claimed a specimen the frame does not show.

## Per obligation

### 1 — one frame grammar, aligned stems

A frame is `<scenario>--<theme>-<viewport>.png`. The theme and the viewport are the variant token
`expandCaptures` appends, and each run places only the scenarios whose mode its own variant names,
so the theme a filename claims and the theme its frame shows are one reading. No token names the
project.

The `[-<step>]` slot carries the artifact stage rather than an interaction state. `expandCaptures`
returns `<state>--<variant>.png` and the variant names are declared in `configs/app/`, which this
unit does not own, so nothing can follow the variant token in a frame's name. The step is therefore
used by the artifacts written beside the frames — `<subject>--<theme>-<viewport>-accessibility.txt`
— and a frame omits the optional step, with its driven state carried in the scenario. This is a
ruling, not an unresolved conflict; § Deviations records it.

Files: `tests/setup.ts` (the `CaptureKey` and `CascadeKey` types, `SHOWCASE_KEYS`, `BUTTON_KEYS`,
`CASCADE_KEYS`, `CAPTURE_KEYS`, `CAPTURE_SCENARIOS`, `buildStem`), `tests/setup.test.ts`,
`tests/app/browser/integration.test.ts`.

### 2 — whole specimens with their background

Every cascade frame is shot on the lifted copy of the whole specimen, and the element the key names
is the frame's declared region. `role-links` went from an 84x16 crop of one anchor to 1280x21 at the
1280 variants and 390x63 at the 390 ones, with the specimen's own background and every anchor it
renders; its light and dark frames now differ, and so do its two widths, which closes CL13 reading 2
and finding 7 as registered duplication.

The Button element frames already carry the whole specimen: `ButtonSection` renders each specimen as
a bare host and labels no container, so the host is the specimen. The frames' floors are the page
background, which is why their light and dark twins differ.

Evidence that a full-width lifted specimen photographs whole: the rightmost painted column is 794 in
`role-links--light-1280.png`, 347 in `role-links--light-390.png`, 1279 in `base--light-1280.png`,
and 554 in `numbered-columns--light-1280.png`. The retained bound about a specimen "beyond roughly
900 px" is about where the specimen sits in the document, not how wide it is; the lift to the
document's start is what answers it, and the guide keeps that reasoning.

The bounded comparison is recorded in the guide's § Tests: an Elements frame is shot on a blank page
carrying the specimen alone and a Veneer frame is a lift out of the mounted showcase, so inherited
context is not proven identical and a difference is bounded by that before it is read as a cascade
difference.

Files: `tests/app/browser/integration.test.ts`, `tests/setup.ts`, `guides/veneer.md`.

### 3 — per-specimen accessibility artifacts

Each run writes `tmp/capture/states/<subject>--<theme>-<viewport>-accessibility.txt` for every
distinct registered subject, holding that subject's `describeTree` and `describeFocus` output. The
per-variant manifest keeps the whole page's tree, the focus inventory, and the interaction log
unchanged. `role-links--light-1280-accessibility.txt` names each of the specimen's links in order,
which is the per-specimen form CL13 finding 4 said was missing.

A subject presenting no roled element records that reading rather than an empty file: the capped
container is a bare `div`. The case asserts that some subject presents a tree and some subject
presents a focus order, so a writer producing empty files under every name reddens.

The mode strings are fixed: `LIGHT` and `DARK` are the variants at this run's own viewport, so the
390 manifests now record `light-390` and `dark-390` in the focus-ring, contrast, pointer-paint,
cascade, and journal readings. Verified by reading `tmp/capture/light-390.txt` after the run: the
only `"mode"` values are `light-390` and `dark-390`, and the cascade readings are keyed the same.

Files: `tests/app/browser/integration.test.ts`, `tests/setup.ts` (`buildStem`).

### 4 — the pixel guard and the sampler

`measureFrameVariation(encoded)` is replaced by `measureVariation(encoded, region)` in
`tests/setupBrowser.ts`. It reads the declared region, clips a region reaching past the frame, and
refuses a region that clips to nothing. `readRegion(subject, frame)` converts a live box into frame
coordinates — the element's own box for an element frame, the document's origin for a page frame —
scaled by `window.devicePixelRatio`. `FrameManager.place` stages the pane, reads the region there,
places, and hands the pane back, so the box and the pixels it names are one layout; the capture's
own staging finds the pane already in place and moves nothing.

The guard case runs on every journey run. It asserts that frames exist exactly when capture is on,
compares the written basenames against the registry expanded for this variant, and reads each frame
back through the installed `readFrame` for its size and floor and through `measureVariation` for its
region. The local decoder stays because no installed export supplies the reading the guard needs:
`readFrame` reports a bottom-row floor, and a uniform floor is what a painted frame and a blank one
have in common — every frame in this portfolio but `role-links` has one.

The declared region also keeps a reading the whole-specimen frame would otherwise lose: the
`capped-container` region is `70,0 1140x21` at the 1280 variants and `0,0 390x21` at the 390 ones,
so CL13 candidate 1's cap is in the record.

Failing-first evidence, both runs on this host:

- `npx vitest run --project setup tests/setup.test.ts` with `toggle-pressed` renamed to
  `toggle-pressed-dark`: exit 1, 1 failed and 17 passed, failing
  "carries no mode token in a scenario, because the variant names the mode". Restored: exit 0, 18
  passed.
- `npm run test:setup:browser` with `measureVariation` reading `getImageData(0, 0, image.width,
  image.height)` — the origin-pixel behaviour it replaces: exit 1, 1 failed and 49 passed, failing
  "reads only the declared region, reporting a painted frame with a uniform band as uniform".
  Restored: exit 0, 50 passed.
- During development `tests/setup.test.ts`'s "names each scenario for its own subject" failed for
  real against a registry still carrying `home`, whose stem is not its subject's.

Files: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/setup.ts` (`CAPTURE_CONTROLS.width` and `.height`).

### 5 — the caption opt-out specimen and the helper contract

**The subject contract landed.** Every registry key names the showcase subject its frame shows: a
specimen one of the declared tables carries, or the region a page frame reads the surface through.
The portfolio proof holds every subject against `BUTTON_SPECIMENS`, `CONTENT_SPECIMENS`,
`LAYOUT_SPECIMENS`, `LINK_SPECIMENS`, `MEDIA_SPECIMENS`, `TABLE_SPECIMENS`, `TYPE_SPECIMENS`, and
`SHOWCASE_COPY.region`, and then resolves each one on the rendered surface through `readSubject`,
which reads a labelled specimen container, a named region, or a rendered host announcing that name,
and refuses a name two of those declarations answer to.

**The caption opt-out specimen is not done.** See § Deviations.

### 6 — re-shot Button frames

Every Button frame was re-shot under the corrected grammar. No reading exposes a Button defect: the
hover and active mixes differ from each other and from rest, each mode's frames differ, and every
region varies. The full table is in § The re-shot portfolio.

## The helper key, identified

The rows that name it do not identify it, so this is the diff the brief prescribes, run both ways.

**Against the shipped helper keys, nothing is missing.** Every class the guide's § Helper classes
names renders in a declared specimen: `.icon-link` and `.icon-link-hover` in `Icon links`, `.ratio`
with each named aspect in `Aspect ratios` — that specimen builds `ratio-1x1`, `ratio-4x3`,
`ratio-16x9`, and `ratio-21x9` from a list, which is why a literal search for them in
`app/browser/constants.ts` returns nothing — and `.vr` in `Vertical rule`.

**Against the capture registry, the key with no subject region is the page-scoped arrival key,
`home`, with its `home-dark` twin.** It named no specimen, and the Showcase region carries copy and
no specimen table, so it was the one registered key whose subject appeared in no specimen table
section. The `button-primary-*` keys named no subject at all: `BUTTON_STATES` was a list of bare
strings.

Disposition: given a subject rather than removed. The arrival key is now `showcase`, its declared
subject is the `Showcase` region, and the portfolio proof accepts a region for a page frame and a
specimen for an element frame. The Button keys are now rows naming `Primary` and `Toggle`.

One key was removed instead: `button-primary-rest`, whose frames are byte-identical to the arrival
frames at every variant (digests in § The capture listing before the change). The registry's own
duplication ruling refuses a frame that duplicates another, and nothing in the portfolio is lost —
the resting page is the `showcase` frame.

**For `B-UTILITIES`:** nothing is carried. The shipped helper keys all have showcase homes in this
baseline, so no consumer is missing. If the row meant a utility class rather than a helper key, the
population this unit swept was the components-layer helper partials and the gap utilities, and every
class in them renders in a specimen.

## The re-shot portfolio

`CAPTURE=1 npm run test:journey`, exit 0, 100 passed across 4 files, 79.02 s. Size and floor are
`readFrame`'s own readings, the region is what the scenario declared at staging time, and the
variation is the fraction of that region's pixels differing from its first pixel. Every row is from
the manifests that run wrote.

| Scenario | Variant | Frame | Floor | Region | Variation |
| --- | --- | --- | --- | --- | --- |
| `base` | dark-1280 | 1280x149 | `rgb(20, 25, 30)` | 0,0 1280x148 | 0.0361 |
| `base` | dark-390 | 390x149 | `rgb(20, 25, 30)` | 0,0 390x148 | 0.0722 |
| `base` | light-1280 | 1280x149 | `rgb(255, 255, 255)` | 0,0 1280x148 | 0.0357 |
| `base` | light-390 | 390x149 | `rgb(255, 255, 255)` | 0,0 390x148 | 0.0710 |
| `capped-container` | dark-1280 | 1280x21 | `rgb(20, 25, 30)` | 70,0 1140x21 | 0.0648 |
| `capped-container` | dark-390 | 390x21 | `rgb(20, 25, 30)` | 0,0 390x21 | 0.1895 |
| `capped-container` | light-1280 | 1280x21 | `rgb(255, 255, 255)` | 70,0 1140x21 | 0.0618 |
| `capped-container` | light-390 | 390x21 | `rgb(255, 255, 255)` | 0,0 390x21 | 0.1807 |
| `numbered-columns` | dark-1280 | 1280x21 | `rgb(20, 25, 30)` | 0,0 1280x21 | 0.0567 |
| `numbered-columns` | dark-390 | 390x42 | `rgb(20, 25, 30)` | 0,0 390x42 | 0.0927 |
| `numbered-columns` | light-1280 | 1280x21 | `rgb(255, 255, 255)` | 0,0 1280x21 | 0.0542 |
| `numbered-columns` | light-390 | 390x42 | `rgb(255, 255, 255)` | 0,0 390x42 | 0.0881 |
| `primary-active` | dark-1280 | 81x36 | `rgb(20, 25, 30)` | 0,0 80x35 | 0.9914 |
| `primary-active` | dark-390 | 81x36 | `rgb(20, 25, 30)` | 0,0 80x35 | 0.9914 |
| `primary-active` | light-1280 | 81x36 | `rgb(255, 255, 255)` | 0,0 80x35 | 0.9875 |
| `primary-active` | light-390 | 81x36 | `rgb(255, 255, 255)` | 0,0 80x35 | 0.9875 |
| `primary-focus` | dark-1280 | 1280x8223 | `rgb(20, 25, 30)` | 0,120 80x35 | 0.9914 |
| `primary-focus` | dark-390 | 390x8802 | `rgb(20, 25, 30)` | 0,141 80x35 | 0.9914 |
| `primary-focus` | light-1280 | 1280x8223 | `rgb(255, 255, 255)` | 0,120 80x35 | 0.9914 |
| `primary-focus` | light-390 | 390x8802 | `rgb(255, 255, 255)` | 0,141 80x35 | 0.9914 |
| `primary-hover` | dark-1280 | 81x36 | `rgb(20, 25, 30)` | 0,0 80x35 | 0.9914 |
| `primary-hover` | dark-390 | 81x36 | `rgb(20, 25, 30)` | 0,0 80x35 | 0.9914 |
| `primary-hover` | light-1280 | 81x36 | `rgb(255, 255, 255)` | 0,0 80x35 | 0.9875 |
| `primary-hover` | light-390 | 81x36 | `rgb(255, 255, 255)` | 0,0 80x35 | 0.9875 |
| `role-links` | dark-1280 | 1280x21 | `rgb(20, 25, 30)` | 0,2 83x16 | 0.4940 |
| `role-links` | dark-390 | 390x63 | `rgb(20, 25, 30)` | 0,2 83x16 | 0.4940 |
| `role-links` | light-1280 | 1280x21 | `rgb(255, 255, 255)` | 0,2 83x16 | 0.4940 |
| `role-links` | light-390 | 390x63 | `rgb(255, 255, 255)` | 0,2 83x16 | 0.4940 |
| `showcase` | dark-1280 | 1280x8223 | `rgb(20, 25, 30)` | 0,78 1280x21 | 0.0878 |
| `showcase` | dark-390 | 390x8802 | `rgb(20, 25, 30)` | 0,78 390x21 | 0.2882 |
| `showcase` | light-1280 | 1280x8223 | `rgb(255, 255, 255)` | 0,78 1280x21 | 0.0850 |
| `showcase` | light-390 | 390x8802 | `rgb(255, 255, 255)` | 0,78 390x21 | 0.2790 |
| `toggle-pressed` | dark-1280 | 72x36 | `rgb(20, 25, 30)` | 0,0 71x35 | 0.9903 |
| `toggle-pressed` | dark-390 | 72x36 | `rgb(20, 25, 30)` | 0,0 71x35 | 0.9787 |
| `toggle-pressed` | light-1280 | 72x36 | `rgb(255, 255, 255)` | 0,0 71x35 | 0.9831 |
| `toggle-pressed` | light-390 | 72x36 | `rgb(255, 255, 255)` | 0,0 71x35 | 0.9714 |

The run also wrote one accessibility artifact per subject and variant: `base`, `capped-container`,
`numbered-columns`, `primary`, `role-links`, `showcase`, and `toggle`, each with the
`-accessibility.txt` step at each variant. Nothing else was written under `tmp/capture/states/`.

## Findings for the Orchestrator

1. **`primary-hover` and `primary-active` are width-invariant.** Each is byte-identical between its
   1280 and 390 variants (`b1bbbdf8bd40…` for `primary-active` dark, `5b64a20b7dd8…` for
   `primary-hover` light). An 81x36 host crop does not reflow, which is the structural fact CL13
   recorded for the link key. This is registered duplication rather than a Button defect, and it
   needs a registry ruling rather than a fix here: either accept it as the price of an element frame
   of a fixed-size host, or register the pointer scenarios at one width. Carrier not assigned.
2. **No Button defect surfaced in the re-shot frames.** Rest, hover, active, and pressed differ from
   one another within a mode, and each mode's frames differ from the other's.
3. **The "roughly 900 px" element-frame bound is about position, not width.** A lifted specimen
   1280 wide photographs whole (`base--light-1280.png` paints to column 1279). The retained wording
   in `CASCADE_KEYS`'s remark is about the specimens' depth in the document and is kept; the
   width-shaped reading of it is not supported by this run.

## Commands and exit codes

Every command ran in `/home/user/veneer-f7` with npm 11.19.1 on `PATH`.

| Command | Exit | Reading |
| --- | --- | --- |
| `CAPTURE=1 npm run test:journey` (baseline `07fc3c3`, before any edit) | 0 | 88 passed, 4 skipped, 4 files, 58.90 s |
| `npm run build:src:styles`, `npm run build:src:core` | 0 | the `setup` project reads both artifacts |
| `npx vitest run --project setup tests/setup.test.ts`, mutated | 1 | 1 failed, 17 passed |
| `npx vitest run --project setup tests/setup.test.ts`, restored | 0 | 18 passed |
| `npm run test:setup:browser`, mutated sampler | 1 | 1 failed, 49 passed |
| `npm run test:setup:browser`, restored | 0 | 50 passed |

The gate chain below ran after the final edit to every owned file, in this order, and nothing was
edited after it began.

| Gate | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | all matched files use the correct format, 209 files |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | root, src core, src browser, src styles, app browser |
| `npm run build` | 0 | src core, src browser, src styles, app browser |
| `npm run test:setup` | 0 | 124 passed, 3 files |
| `npm run test:setup:browser` | 0 | 50 passed, 1 file |
| `npm run test:app` | 0 | 26 passed, 10 files |
| `npm run test:journey` | 0 | 100 passed, 4 files, 44.55 s |
| `CAPTURE=1 npm run test:journey` | 0 | 100 passed, 4 files, 79.02 s |
| `npm run test:guides` | 0 | 18 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |
| `npm test` (observation) | 0 | every project green, the journey at 100 passed |

The journey suite reported 88 passed and 4 skipped at the baseline and 100 passed after the change:
the guard case is no longer skipped in any project, and the subject-contract and accessibility cases
are new.

## Tree state

`git diff --stat`:

```text
 guides/veneer.md                      |  52 +++++-
 tests/app/browser/integration.test.ts | 295 +++++++++++++++++++++++-----------
 tests/setup.test.ts                   |  79 +++++----
 tests/setup.ts                        | 190 ++++++++++++++--------
 tests/setupBrowser.test.ts            | 123 +++++++++++++-
 tests/setupBrowser.ts                 | 216 +++++++++++++++++++++++--
 6 files changed, 744 insertions(+), 211 deletions(-)
```

`git status --porcelain`:

```text
 M guides/veneer.md
 M tests/app/browser/integration.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

Owned files only. `tmp/` is untracked and ignored; every probe written under `tmp/probe/` is
deleted. `dist/` is ignored and carries the build the gates produced.

### Files touched

- `tests/setup.ts` — the capture registry: `CaptureKey` and `CascadeKey`, `SHOWCASE_KEYS`,
  `BUTTON_KEYS`, `CASCADE_KEYS`, `CAPTURE_KEYS`, `CAPTURE_SCENARIOS`, `buildStem`, and the control
  frames' recorded dimensions.
- `tests/setup.test.ts` — the registry freezes: the export inventory, the scenario-to-subject stem
  law, the mode-token refusal, the cascade-key shape, and `buildStem`.
- `tests/setupBrowser.ts` — `FrameRegion`, `FramePlacement`, `measureVariation`, `readRegion`,
  `readSubject`, and `FrameManager`, replacing `measureFrameVariation`.
- `tests/setupBrowser.test.ts` — the region sampler's cases, the clip refusal, `readRegion`,
  `readSubject`, and the frame manager against a disabled portfolio.
- `tests/app/browser/integration.test.ts` — the per-viewport mode variants, every placement through
  the frame manager, the whole-specimen cascade frames, the subject-contract proof, the
  accessibility artifacts, and the guard outside the capture flag.
- `guides/veneer.md` — § Tests carries the filename law, the stem alignment table, the
  whole-specimen ruling, the artifact names, the guard, and the bounded side-by-side limit; §
  Showcase ties each helper key's region to the subject a registered scenario names.

## Shared-file patches

**`vite.config.ts`: none.** The change needed no variant project change. Each run places only the
scenarios its own variant's mode names, which is what removed the project token from the filename
without touching the variant matrix.

**`ROADMAP.md`: one proposed row edit, for the Orchestrator to apply or refuse.** The caption
opt-out row assigns the specimen to this unit, and the class it needs is F6's.

Old:

```text
| Caption opt-out                                                                                                                                                                                                             | F6 FOUNDATION supplies the consumer class and the guide's recorded consequence; F7 CAPTURE supplies the specimen                                                                                                                                                              |
```

New:

```text
| Caption opt-out                                                                                                                                                                                                             | F6 FOUNDATION supplies the consumer class and the guide's recorded consequence; a successor to F7 CAPTURE supplies the specimen, its registered frame, and its `TableSection` proof, after that class lands                                                                    |
```

## Deviations

1. **The caption opt-out specimen is not done, and the work is blocked outside this unit's scope.**
   - Expected: `TABLE_SPECIMENS` gains the specimen carrying the F6 caption opt-out class, the
     registry gains its frame, and `TableSection.test.ts` proves it.
   - Found: the class does not exist in this baseline. `grep -rn "caption" src/styles/` returns
     `caption-side: top` in `src/styles/elements/_table.scss` and `.caption-top { caption-side: top }`
     in `src/styles/components/_table.scss`, and nothing that restores a bottom caption; `grep -rn
     "caption-bottom\|caption-side" src/ app/ tests/ guides/` finds no consumer class. `git log
     --oneline -5` from `07fc3c3` names F5d, D12 and F5e, F9, and D11, and no F6 landing. The brief's
     standing conditions say F6 runs in parallel in its own worktree.
   - Done or not done: not done. `app/browser/constants.ts` and
     `tests/app/browser/sections/TableSection.test.ts` are unmodified.
   - Hypothesis: adding a specimen whose class no stylesheet declares would redden the journey's own
     census case, which asserts `readCensus(mounted.host).undeclared` is empty, so the specimen
     cannot land before the class does.
   - Follow-up for a successor: add the row to `TABLE_SPECIMENS` using F6's class, register a
     scenario whose stem is that specimen's stem, and prove the rendered caption position in
     `TableSection.test.ts`.

2. **The brief names `tests/journey/**` as the owned journey suite; no such path exists.** The
   journey suite is `tests/app/browser/integration.test.ts`, which the Off-limits list reserves by
   excluding "every other `tests/app/**` file". Decided and carried on: that file is the owned
   journey suite. The brief's search bound `grep -n "PORTFOLIO\|JOURNAL\|writeFile" tests/journey`
   was run against `tests/app/browser/` instead.

3. **The brief says the retained observations name the Elements stems; they do not.**
   `tmp/units/cl13-portfolio-observations.md` names Veneer's frames alone. The stems in § The stem
   alignment are derived from the rule CL13 finding 2 states, read at
   `/home/user/scaffold/.orkestrel/veneer/cl13-verdict.md`. Decided and carried on rather than
   stopping, because the rule aligns every pair and the derivation is flagged under § Unverified
   claims.

4. **A frame's name carries no step token.** `expandCaptures` returns `<state>--<variant>.png` and
   the variant names live in `configs/app/vite.journey.config.ts`, which this unit does not own, so
   nothing can follow the variant token in a frame's name. The grammar's optional step is used by
   the accessibility artifacts, and a frame's driven state is carried in its scenario. Decided
   within the ruling and recorded.

5. **`button-primary-rest` was removed rather than re-shot.** Obligation 6 says re-shoot every
   Button frame; this one duplicated the arrival frame byte for byte at every variant, and the
   registry's own duplication ruling refuses it. Recorded with its digests rather than carried.

6. **The `home-dark` scenario was removed.** Under the corrected grammar the dark arrival frame is
   the dark run's own `showcase` frame, shot at arrival with no pointer on the page. The case that
   placed `home-dark` keeps its assertions about the announced and painted mode and places no frame,
   and its pointer-parking is gone with the frame it existed for.

## Unverified claims

- **The Elements stems.** No retained artifact lists the Elements-side filenames; the harness that
  produced them, `units/cl13-capture-2.mjs`, is not in `/home/user/scaffold/.orkestrel/veneer/`. The
  Elements column of the alignment table and the guide's alignment table both apply CL13 finding 2's
  rule rather than quoting a listing. Confirm against the Elements portfolio before an appearance
  round pairs the two directories by filename.
- **`base` as a stem.** It aligns by the rule and reads thinly alone. Kept deliberately; a successor
  that measures a real Elements listing may find the Elements side spells it otherwise.
- **The region reading is taken in the staged layout by construction rather than by measurement.**
  `FrameManager.place` stages the pane before reading the box, and the installed capture stages the
  same geometry; the claim that the capture's own staging then "moves nothing" is the retained
  reading in the pointer case's comment, not something this unit measured independently. Every
  region's variation came back above zero, which is consistent with it but does not prove it.
- **`describeFocus` on a subject that is itself a control.** The `primary` and `toggle` artifacts
  record whatever the installed reader returns for a single host; this unit asserts only that some
  subject presents a focus order, not what a control-rooted walk returns.
