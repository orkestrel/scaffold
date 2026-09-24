# UTIL-EFFECT (`ue`) round-2 report

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-ue` (branch `unit/ue`, base
`2a3f223`), brief `b-utilities-ue-brief-2.md`.

## Outcome

Fixes E-a, E-b, and E-c are in the owned files and in the revised patch
`.orkestrel/veneer/units/ue-shared-2.patch`, which supersedes the `ue-shared.patch` file whole. Every criterion gate
exits 0 on the rebuilt validation copy. The `git apply --check` command exits 0 on a fresh `2a3f223`
extract. The interdiff against the round-1 patch touches only the sites E-a to E-c name and the sites
the E-c sweep found; the E-c section lists each sweep site.

One reading needs your attention. With the `!important` flag dropped from the `.shadow-none` rule,
the focus-ring case the edited comment annotates stays green. The layer order clears the ring on its
own, so that case does not distinguish the importance the comment names. The helper written important
does turn the case red. The E-c section has the runs.

## E-a: the small-shadow alias swap and the cascade reader's controls

Every run below is in `.orkestrel/veneer/units/ue-instruments/ue-mutations-2.log.txt`, written by `.orkestrel/veneer/units/ue-instruments/ue-mutations-2.sh`.

- **Small-shadow alias swap.** In the `src/styles/utilities/_shadow.scss` partial on the copy, the
  mutation changed `sm: var(--bs-box-shadow-sm),` to `sm: var(--bs-box-shadow),`. Command:
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/utilities/shadow.test.ts tests/src/styles/utilities/opacity.test.ts tests/src/styles/components/focus-ring.test.ts`.
  Build exit 0, test exit 1, `Tests  8 failed | 21 passed (29)`. The failing cases are every boundary
  case of `resolves each class to the elevation step its alias reads around the '<name>' boundary`,
  plus `moves each class with a retuned elevation step and with the alias a consumer sets on it` and
  `sits in the utilities layer and keeps its priority over a later unlayered consumer rule`. The
  unmutated run of the same command: `Tests  29 passed (29)`.
- **The cascade reader takes a cascade path.** The reader is `.orkestrel/veneer/units/ue-instruments/ue-cascade-keys-2.mjs`, a copy
  of `ue-cascade-keys.mjs`. It takes an optional argument after the copy root that names the cascade
  to read, so a negative control reads a planted copy.
  - Over the built cascade (`node .orkestrel/veneer/units/ue-instruments/ue-cascade-keys-2.mjs tmp/probe/base`): `"missing": []`,
    `"extra": []`, `"priorityMismatches": []`.
  - Over a copy with `.shadow-xl{box-shadow:var(--bs-box-shadow-lg)!important}` appended: `"extra": [ { "selector": ".shadow-xl" } ]`.
  - Over a copy with `.opacity-25{opacity:.25!important}` rewritten to `.opacity-25{opacity:.25}`:
    `"priorityMismatches": [ ".opacity-25 { opacity } important=false" ]`.

## E-b: the resting focus-ring row is dropped

- **`tests/setup.ts`, `CASCADE_KEYS` table.** Before, the table carried this row:

  ```ts
  Object.freeze({
  	scenario: 'default-focus-ring',
  	subject: 'Default focus ring',
  	selector: '.focus-ring',
  	property: 'box-shadow',
  }),
  ```

  After, the row is gone. The `'Default focus ring'` member of the `CaptureSubject` type stays, for
  the `default-focus-ring-focus` row in the `DRIVEN_KEYS` table.
- **`tests/setup.ts`, `CASCADE_KEYS` remarks.** The new paragraph sits after the collapse-box decline
  and before the carousel decline, so the collapse paragraph's "for the same reason" still points at
  the grow spinners:

  ```text
  The default focus ring's resting frame is declined too, because the `.focus-ring` helper paints
  only under focus: at rest its link carries no property the key's rule writes, and a resting row
  would read the initial value against itself. Its frame is the `default-focus-ring-focus` row of the
  {@link DRIVEN_KEYS} table, which the journey shoots with the ring painted.
  ```
- **`tests/setup.test.ts`, the exemption set.** The case
  `names each driven row for its subject's stem and one state, on a specimen the resting registry photographs or one it exempts by name`
  requires each driven subject to have a resting row or an exemption. The unit appended this
  exemption after the `'Check group'` exemption:

  ```ts
  // The focus ring helper paints only under focus, so its resting frame would show nothing
  // the key paints, and the focused frame is the specimen's frame.
  'Default focus ring',
  ```
- **Readings.** Each run used
  `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setup.test.ts`:
  - As patched: exit 0, `Tests  20 passed (20)`.
  - With the exemption removed: exit 1, `Tests  1 failed | 19 passed (20)`, the exemption case above.
  - With the resting row restored beside the exemption: exit 1, the same summary and case.

  Nothing else enumerates the row. A search of the copy's `tests/` and `app/` directories for the
  `'default-focus-ring'` scenario found no other hit.

## E-c: the guide sentences and the test comment

Each change is in the `guides/veneer.md` file unless it names another file.

- **The `.shadow-none` class excluded from the alias sentence.**
  - Before: "Each class reads the release's own alias byte for byte: the `.shadow` class reads the
    `--bs-box-shadow` property, …"
  - After: "Each class except the `.shadow-none` class reads the release's own alias byte for byte: …
    The `.shadow-none` class writes the `none` absence value and reads no alias or token."
- **Root-element retunes.** This sentence replaces "So a doubled elevation factor doubles every
  length of every shadow class, a retuned step moves the class that reads it":

  > The `src/styles/_tokens.scss` partial declares those aliases on the root element over the
  > `--vn-shadow-2`, `--vn-shadow-1`, and `--vn-shadow-3` elevation steps, which scale with the
  > `--vn-factor-elevation` token. So an elevation factor doubled on the root element doubles every
  > length of every alias-reading shadow class, and a step retuned on the root element moves the
  > class that reads it. The root resolves each alias once and every element inherits the result, so
  > a factor or a step set on a subtree moves no shadow class there: a subtree moves a shadow class
  > only by setting the alias, and a rule of your own that sets the alias on an element repaints that
  > element's shadow.

  The proof paragraph reads "the elevation factor and a retuned step on the root element, a retuned
  alias". Before, it read "the elevation factor, a retuned step and a retuned alias".
- **The `shadow` compatibility row.**
  - Before: "…ships in the utilities layer, each reading its `--bs-box-shadow*` alias; …"
  - After: "…ships in the utilities layer, each class but the `.shadow-none` class reading its
    `--bs-box-shadow*` alias and the `.shadow-none` class writing the `none` absence value; …"
- **The opacity sentence.**
  - Before: "The importance is also what lets a step override the opacity a component rests at, as
    each bar in the Opacity region overrides the `0.5` opacity of the `.placeholder` class."
  - After: "A step also overrides the opacity a component rests at, because the utilities layer
    follows the components layer: each bar in the Opacity region overrides the `0.5` opacity of the
    `.placeholder` class."
- **The focus-ring clause.**
  - Before: "…as it does in the release, where the utility follows the helper."
  - After: "…as it does in the release, where the utility's `!important` flag beats the helper's
    normal declaration."
- **The `tests/src/styles/components/focus-ring.test.ts` comment.**
  - Before: "The important shadow utility sits in a later layer than the helper, so it clears the
    ring, as it does in the release, where the utility follows the helper in source order."
  - After: "The important shadow utility beats the helper's normal declaration whatever layer each
    sits in, as it does in the release."
- **Sweep sites carrying the same forms.**
  - `src/styles/utilities/_shadow.scss` (owned) had "Each value reads the release's own
    `--bs-box-shadow*` alias … so the elevation factor scales every shadow step." It now reads: "Each
    value but the `none` value reads the release's own `--bs-box-shadow*` alias, which the tokens
    declare on the root element over Veneer's elevation ladder, so the elevation factor set on the
    root element scales each shadow that reads an alias."
  - `tests/setupStyles.ts`, the `SHADOW_CASES` remarks, had "so a proof retunes that step and reads
    the class move". It now reads "alias to on the root element, so a proof retunes that step on the
    root element and reads the class move".
  - `app/browser/constants.ts`, the `SHADOW_COPY.paragraph` value, had "Compare the shadow steps from
    none to large, each a box shadow on a card that the elevation factor scales." It now reads
    "Compare the shadow steps from none to large, each on a card, and the elevation factor scales
    every step that paints a shadow."
  - The unit found no other added line that credits source order or a later layer where importance
    decides, or that claims every shadow class reads an alias.
- **Re-flowing.** The unit re-flowed each touched guide paragraph to 100 columns with
  `.orkestrel/veneer/units/ue-instruments/ue-rewrap-2.py`. No added prose line exceeds 100 columns.
- **Readings behind the sentences.** A throwaway proof, `.orkestrel/veneer/units/ue-instruments/ue-probe-2.test.ts`, was copied
  into the copy's styles proofs, run, and deleted. Command:
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/utilities/ue-probe-2.test.ts`.
  - Over the built cascade: exit 0, `Tests  2 passed (2)`. A `placeholder opacity-25` bar reads the
    `0.25` value and a bare placeholder reads the `0.5` value. A factor or a step set on a subtree
    leaves the `.shadow` class at its resting shadow. An alias set on a subtree reads
    `rgb(7, 8, 9) 0px 0px 0px 5px`. A factor doubled on the root element doubles the lengths
    (`0px 4px 8px 0px, … 0px 16px 32px -8px` against `0px 2px 4px 0px, … 0px 8px 16px -4px`).
  - With `.opacity-25{opacity:.25!important}` rewritten to `.opacity-25{opacity:.25}` in the built
    cascade: exit 0, `Tests  2 passed (2)`. The bar still reads the `0.25` value, so the layer order,
    not the importance, puts the step over the placeholder.
- **The annotated focus-ring case.** Command:
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/focus-ring.test.ts`.
  - With `.shadow-none{box-shadow:none!important}` rewritten to a normal declaration: exit 0,
    `Tests  7 passed (7)`. A normal utility in the later layer also clears the ring, so this case does
    not separate importance from layer order.
  - With the helper's `box-shadow` declaration written important: build exit 0, test exit 1,
    `Tests  1 failed | 6 passed (7)`. The failing case is
    `sits in the components layer with normal declarations, so a consumer rule and an important utility each win over it`.

## Gates

The unit ran `npm run format:check` and `npm run lint:check` in the worktree. Each exits 0
(`ue-2-worktree-format.log.txt`, `ue-2-worktree-lint.log.txt`). The copy readings came from
`.orkestrel/veneer/units/ue-instruments/ue-gates-2.sh` on `tmp/probe/base`: the `2a3f223` archive, a hard-linked `node_modules`,
the owned files, and `ue-shared-2.patch`. Each gate's log is `.orkestrel/veneer/units/ue-instruments/ue-2-gate-<name>.log.txt`:

| Command | Exit | Result line |
| --- | --- | --- |
| `npm run format:check` | 0 | `Finished in 10725ms on 363 files using 4 threads.` |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | — |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts tests/setup.test.ts` | 0 | `Tests  142 passed (142)` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/shadow.test.ts tests/src/styles/utilities/opacity.test.ts tests/src/styles/components/focus-ring.test.ts` | 0 | `Tests  29 passed (29)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ShadowSection.test.ts tests/app/browser/sections/OpacitySection.test.ts tests/app/browser/sections/FocusRingSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | `Tests  12 passed (12)` |
| `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |

The patch checks: `git apply --check .orkestrel/veneer/units/ue-shared-2.patch` on a fresh `git archive 2a3f223`
extract with its own `git init` exits 0 (`ue-2-apply-check.log.txt`). The interdiff between the files
each patch produces is `.orkestrel/veneer/units/ue-instruments/ue-2-interdiff.txt`. It touches these files and nothing else:
`app/browser/constants.ts`, `guides/veneer.md`, `tests/setup.test.ts`, `tests/setup.ts`, and
`tests/setupStyles.ts`.

A note on the check: the extract needs its own repository. Inside the worktree's repository, a
`git apply --check` run in a nested directory skips the paths outside that directory and exits 0
without reading them. The unit's run used an extract with its own `git init`, and the full apply
then succeeded.

The unit deleted `tmp/probe/` before this report. It wrote nothing into the session scratchpad; it
read only the npm 11 `PATH` entry there.

## Review evidence

- `.orkestrel/veneer/units/ue-shared-2.patch`: the revised shared patch against `2a3f223`.
- `.orkestrel/veneer/units/ue-2.diff`: the `git diff 2a3f223` output, plus each untracked owned file through
  `git diff --no-index /dev/null`.
- `.orkestrel/veneer/units/ue-2-status.txt`: the `git status --porcelain` output. It lists the owned files and
  nothing else.
- `.orkestrel/veneer/units/ue-instruments/ue-mutations-2.log.txt` and `.orkestrel/veneer/units/ue-instruments/ue-mutations-2.sh`: every round-2 run.
- `.orkestrel/veneer/units/ue-instruments/ue-gates-2.log.txt` and `.orkestrel/veneer/units/ue-instruments/ue-gates-2.sh`: the gate runs.
- `.orkestrel/veneer/units/ue-instruments/ue-cascade-keys-2.mjs`, `.orkestrel/veneer/units/ue-instruments/ue-probe-2.test.ts`, and `.orkestrel/veneer/units/ue-instruments/ue-rewrap-2.py`:
  the instruments.

## Deviations

- **E-c sweep sites.** The brief's "Sweep every added line for the same forms" authorizes the sweep
  sites the E-c section lists. The change to the `SHADOW_COPY.paragraph` value alters the Shadow
  region's visible paragraph, and the section proof compares that paragraph through the constant.
- **E-c reading.** The case the edited comment annotates does not distinguish the utility's dropped
  importance, as the Outcome section states. The unit left that case unchanged, because the brief
  scopes this round to the comment and no case change.

## Not closed

- **Landing runs.** These are the Orchestrator's runs at landing: `npm run test:setup` whole, the
  journey, `CAPTURE=1`, `npm run test:service`, and the whole styles project. The
  `default-focus-ring` resting frame no longer exists, so a portfolio regenerated from this patch
  writes no frame under that name.
