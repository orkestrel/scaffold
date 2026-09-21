<!-- sol on gpt-6-astra, exit 0, retained 2026-09-21. Codex exec thread
01a0c64b-0d0b-72b1-afc4-2c53389b2fe8, launched by units/cl8b.sh, journalled at tmp/codex/cl8b.jsonl
and swept at acceptance; the thread id is the durable handle. The unit STOPPED on the brief's
record-contradiction condition: brief 1 asserted that the row key does not carry the gap entries,
and the record shows it carries all of them. The assertion was the Orchestrator's error and it
contradicted a measurement already in this campaign's plan. units/cl8b-brief-2.md carries the
correction. -->

CL8b stopped on the brief's record-contradiction condition. The implementation is partial and unaccepted. HEAD remains `d2c5bb3`; nothing was committed, pushed, or installed, and no agents were spawned.

The brief says the recorded `row` component “does not carry the gap entries, because they sit under the separate `row-gap` key.” The pinned inventory contradicts that statement. A direct JSON reading returned the following evidence:

```text
row .row-gap-* entries: 36
row-gap entries: 36
entry arrays equal: True
```

Each key carries this same entry, and their complete row-gap entry arrays compare equal:

```json
{"selector":".row-gap-0","declarations":[{"property":"row-gap","value":"0"}],"classes":["row-gap-0"],"elements":[],"attributes":[],"pseudoClasses":[],"pseudoElements":[]}
```

Expected: adding `row-gap` to the recorded key tuple accounts for entries absent from `row`. Found: that addition repeats entries already present under `row`. The built cascade emits each row-gap selector once, as required, while the extended recorded multiset expects each twice. This is a record contradiction, not the expected negative control. The brief's Deviation contract requires stopping when the record contradicts a ruling; scaffold's Deviation protocol requires reporting without changing the plan. No adjustment to the multiset comparison was made after this finding.

The working tree contains the following implementation, which has built but has not passed acceptance:

- `g`, `gx`, and `gy`: gutter step rules use the recorded grouping, with the combined selector in the horizontal and vertical rules.
- `row-gap`: independent step rules set `row-gap` with Bootstrap's important priority.
- `row`: its `.row-gap-*` deferral rows were deleted and a shipped selector row was added. Closure remains unproved because conformance has not run.
- `g`, `gx`, `gy`, and `row-gap`: the conformance listing and guide rows were extended. The gutter variable rows match the inventory's nonempty properties objects; the row-gap properties object is empty.
- The layout showcase has gutter-step, independent-axis, and responsive gutter/row-gap specimens, with corresponding presence assertions.
- Browser tests were authored for every step around the shared breakpoint cases, resolved row margins and child padding, row gaps, density independence, and step retuning. These tests have not run.

No assigned selector was intentionally withheld. `gap` and `column-gap` remain outside this unit and assigned to the utilities family, as the brief requires.

The partial is `src/styles/utilities/_gap.scss`, loaded after the component partials. The tree separates element and component folders by cascade layer, and `_tokens.scss` already declares the utilities layer after components. The partial follows that structure with an `@layer utilities` block. It uses a shared step list and a single ramp loop with an empty infix at the zero boundary.

The scale is `--vn-gap-0` through `--vn-gap-5` in `_tokens.scss`, with registry leaves at `TOKEN_NAMES.gap`. Its values are `0`, `0.25rem`, `0.5rem`, `1rem`, `1.5rem`, and `3rem`. Each step has its own token, following the existing scale declarations. The scale carries no density factor and remains distinct from the gutter axis defaults. The guide documents the scale and removes the prior claim that the gutter scale reads the density-scaled space tokens.

The placement and scale-shape Unknowns were settled as described. The shared-block sweep ran as part of the setup command and reported no shared-block failure. No mixin extraction was made.

The collector prefix was deliberately extended to admit `g`, `gx`, and `gy`. The recorded key tuple was deliberately extended to include those keys and `row-gap`. The latter edit exposes the contradiction. The step/value/infix bindings and the grouped-selector collector case passed in the setup run; the multiset assertion was its only failing test.

The executed build command and its final output were:

```text
bash tmp/units/cl8b-run.sh styles-build npm.cmd run build:src:styles

dist/src/styles/index.css      81.76 kB │ gzip: 10.34 kB
dist/src/styles/index.rtl.css  81.76 kB │ gzip: 10.34 kB
dist/src/styles/index.js        0.00 kB │ gzip:  0.02 kB
✓ built in 454ms
EXIT=0
```

The setup command and its failing output were:

```text
bash tmp/units/cl8b-run.sh setup-initial npm.cmd run test:setup -- tests/setupStyles.test.ts

FAIL |setup| tests/setupStyles.test.ts > styles setup > binds the built grid selector and media-condition multiset to the inventory minus deferrals
AssertionError: expected [ '[".col",[]]', …(378) ] to deeply equal [ '[".col",[]]', …(414) ]

- Expected
+ Received

  "[\".row-gap-0\",[]]",
- "[\".row-gap-0\",[]]",

Test Files  1 failed (1)
     Tests  1 failed | 86 passed (87)
EXIT=1
```

The complete logs are `tmp/units/cl8b-styles-build.log.txt` and `tmp/units/cl8b-setup-initial.log.txt`. The setup diff repeats the same missing duplicate across the recorded row-gap vocabulary.

The probe tool refused before execution with this exact response:

```text
MCP tool call requires approval, but approval policy is never
```

No receipt was produced. The emitted-vocabulary controls and emitted-value control were not planted before the stop, so there are no red-then-green control results or restoration digests. The setup failure does not substitute for those controls.

The deleted deferrals are every step `0`, `1`, `2`, `3`, `4`, and `5` under each of these selector forms:

```text
.row-gap-{step}
.row-gap-sm-{step}
.row-gap-md-{step}
.row-gap-lg-{step}
.row-gap-xl-{step}
.row-gap-xxl-{step}
```

No conformance run proves the row key closed. The required gate chain remains unrun because execution stopped on the contradiction. Gate status is:

| Command | Default engine | Edge |
| --- | --- | --- |
| `npm run format:check` | Not run | Not run |
| `npm run lint:check` | Not run | Not run |
| `npm run check` | Not run | Not run |
| `npm run build` | Not run | Not run |
| `npm test` | Not run | Not run |
| `npm run test:src:styles` | Not run | Not run |
| `npm run test:setup:browser` | Not run | Not run |
| `npm run test:app:browser` | Not run | Not run |
| `npm run test:conformance` | Not run | Not run |
| `npm run test:guides` | Not run | Not run |

The actual `git diff --stat` output is:

```text
 app/browser/constants.ts                         | 14 +++++-
 guides/veneer.md                                 | 63 ++++++++++--------------
 src/core/constants.ts                            |  8 +++
 src/styles/_tokens.scss                          |  6 +++
 src/styles/index.scss                            |  1 +
 tests/app/browser/sections/LayoutSection.test.ts |  7 +++
 tests/conformance.test.ts                        |  4 ++
 tests/setupConformance.test.ts                   |  4 ++
 tests/setupStyles.test.ts                        | 36 +++++++++++++-
 tests/setupStyles.ts                             | 12 ++++-
 10 files changed, 114 insertions(+), 41 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
 M app/browser/constants.ts
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_tokens.scss
 M src/styles/index.scss
 M tests/app/browser/sections/LayoutSection.test.ts
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? src/styles/utilities/_gap.scss
?? tests/src/styles/utilities/gap.test.ts
```

Git also reported this warning:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

Every reported worktree path is owned by the brief. The report and command logs reside under ignored `tmp/`. The untracked partial and browser proof are absent from `git diff --stat`.

The Orchestrator must settle how the recorded multiset accounts for entries shared by the `row` and `row-gap` keys before execution resumes. Formatting, remaining proofs, control restoration evidence, browser runs, conformance closure, and the gate chain remain unfinished.
