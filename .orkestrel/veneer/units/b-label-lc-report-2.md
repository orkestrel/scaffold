# LABEL (`lc`) round 2 report

Every finding round 2 carries is closed, and every gate, journey run, and acceptance reading exits 0. The
built cascade is byte-identical to round 1's build.

- Role: `opus` on Opus 5.5, native.
- Worktree: `/home/user/veneer-lc2`, branch `unit/lc2`, changes on top of `7852481`. Nothing is committed.
- Evidence: the files named here sit in `/home/user/veneer-lc2/tmp/units/`.
- Scope: the prose items take one sentence each at their site, per the user's decision.

## Findings and what closes them

### Claim 6: the downstream set

- **`UNDER_BAR` list.** The list in `tests/setup.ts` was the only pin the change made false.
  - Run before the edit (`lc2-journey-light-1.log.txt`): the composed-contrast case received exactly the
    outline rests. Every `btn btn-primary` specimen in dark mode had left the list: the anchor, blocked,
    label, large, pressed, primary, selected, small, and toggle specimens.
  - Edit: those rows are removed, and the TSDoc gains one sentence saying why the list holds only the
    outline rests.
- **Journey runs after the edit.** Both runs exit 0 with `Tests  2 passed | 47 skipped (49)`:
  `lc2-journey-light-2.log.txt` (light-1280) and `lc2-journey-dark-2.log.txt` (dark-390). They cover the
  composed-contrast case and the role-link case that `lc-journey-link.patch` rewrote.
- **Search for other pins.**
  - Searched `tests/fixtures/oracle/**`, `tests/app/**`, `app/browser/constants.ts`, `src`, and `guides`.
  - Patterns: every pre-change dark hover and active fill value in the `BUTTON_FILLED_CASES` table, and
    every `color` and `background-color` reading in the app section tests.
  - The search found no other pin. The oracle files, `button.json` and `inventory.json`, record the
    release's own behavior and cascade, not Veneer's paint.
- **`app:browser` acceptance reading** (`lc2-app.log.txt`, `npm run test:app`): exit 0,
  `Test Files  60 passed (60)`, `Tests  202 passed (202)`.

### F1: the root attribute

- **Cause of the round 1 white readings: the color transition.** The probe `lc2-probe-1.log.txt` settled it:

  | Reading | Label |
  | --- | --- |
  | Motion on, read immediately after the root takes `data-bs-theme="dark"` | `rgb(255, 255, 255)`, with the transition running at `0.15s` |
  | Motion on, read 400 ms later | `rgb(0, 0, 0)` |
  | Motion staged off, read immediately | `rgb(0, 0, 0)` |

  The cascade is right. The probe file is deleted.
- **Added case** in `tests/src/styles/components/button.test.ts`: "reads the black primary label on a
  root-level button once the root carries the dark attribute". It stages motion off, then reads black.
- **Red runs:**
  - R1 moves the `:root { color-scheme: light }` rule after the mode scopes. It reddens this case, and the
    island case stays green.
  - R2 removes the motion staging. It reddens this case and reproduces the transition reading.

### Claim 7: the consumer's scheme

- **Which cascade the styles project reads.** The built, lowered stylesheet (`lc2-probe-1.log.txt`: a
  `--lightningcss-light` variable is present and no `light-dark()` call remains). The app project compiles
  `src/styles/index.scss` without the minifier, so it reads `light-dark()` natively.
- **Guide sentence** in § Color modes: "A `color-scheme` value you set apart from the attribute can move
  the label, wherever a browser reads `light-dark()` natively or your own build lowers that declaration the
  same way, and it never moves the fill, so set the `data-bs-theme` attribute instead."
- **Added case**: "reads the primary label a $name consumer scheme gives it, and keeps the fill", driven by
  the `BUTTON_SCHEME_CASES` table.
  - A declared `color-scheme: dark` rule keeps the white label.
  - The rule a lowering consumer build emits moves the label to black.
  - Neither moves the fill.
- **Red run:** R3 sets the lowered rule's expected label to white, which is round 1's statement. It
  reddens the lowered case.

### Claim 5: the link amount

- **Added assertion** in the link direction case. It computes the expected hover color in sRGB arithmetic
  from the resting color, the `LINK_SHIFT` constant (`0.2`), and the endpoint token, and compares it with
  the engine's `color-mix()` result.
- **Red run:** R4 moves the `$shift` variable to 10%. It reddens "moves the {role} hover and focus color
  away from its label, and scales it by the opacity variables" for the primary, secondary, success, info,
  warning, danger, light, and dark roles, in both the light and dark describe blocks.

### F3: one term

| Concept | Name |
| --- | --- |
| A single sRGB triplet | `$triplet` (the function parameters, and `$label-triplet` and `$other-triplet` where a second triplet is read) |
| The map of mode-independent triplets | `$triplets` (was `$channels`) |
| The role-to-light-and-dark-pair map | `$mode-triplets` (was `$triplets`) |
| The function returning a mixing endpoint | `endpoint` (was `mixer`), matching the `$endpoints` map; the button partial's local is `$endpoint` |

- Every caller is updated: `_button.scss`, `_color-bg.scss`, `_link.scss`, `_validation.scss`, and the
  fixture's `triplet-of` function.
- Byte comparison: `cmp .orkestrel/veneer/units/lc-instruments/lc2-round1-index.css dist/src/styles/index.css` exits 0 (gate 5).
  `lc2-round1-index.css` is the build of `7852481`.

### Claim 2: the parity comment

The `contrast` function's comment gains one sentence: the rule is computed at full precision where the
release reads a rounded luminance table, so a fill within that rounding of the 4.5 to 1 bar can pick
differently, and every shipped fill picks as the release does, which the `contrast.scss` fixture proves.

### F2: the retune obligation

The guide's retune paragraph gains one sentence covering the other compiled sites:
- Tooltips: set `color` on the `.valid-tooltip` and `.invalid-tooltip` classes in an unlayered rule.
- A `.text-bg-*` pair's foreground and a `.link-*` hover color: take the utilities-layer escape § Styles
  shows, because both are important in the utilities layer.
- A link hover keeps its compiled direction while it mixes over a retuned triplet.

### Claim 7: the tables and the floor wording

- **Tables moved.** The island expectations and the transition descriptors move to `tests/setupStyles.ts`
  as the `BUTTON_ISLAND_MARKUP`, `BUTTON_ISLAND_CASES`, and `BUTTON_TRANSITION_CASES` tables, beside the
  added `BUTTON_SCHEME_CASES` table and `LINK_SHIFT` constant.
- **Proofs added** to `tests/setupStyles.test.ts`: "names each island button once, and each scheme rule on
  its own class" and "pairs each direction transition with a later state it moves to". The export list
  gains the new names.
- **Guide wording.** It names the states the floor proof reads: each filled state (rest, hover, active,
  and disabled) and the outline's hover, active, and checked states.

## Mutations

`lc-mutations-2.log.txt` holds every run, with one `lc2-mutation-R*.log.txt` log each. Every run's build
exits 0.

| Mutation | Change | Reddened case |
| --- | --- | --- |
| R1 | The root scheme rule follows the mode scopes | "reads the black primary label on a root-level button once the root carries the dark attribute" |
| R2 | The root-attribute case runs with the transition on | the same root-attribute case |
| R3 | The lowered scheme is expected to keep white | "reads the primary label a 'lowered' consumer scheme gives it, and keeps the fill" |
| R4 | The link `$shift` variable is 10% | the link direction-and-opacity case, every role in both modes |

## Gates

Summary lines are in `lc2-gates.log.txt`, one log per gate, each opening with its command. All ran in
`/home/user/veneer-lc2`.

| Gate | Command | Exit | Result |
| --- | --- | --- | --- |
| 1 | `npx oxfmt --config .oxfmtrc.json --check` over the changed files (`git diff --name-only`) | 0 | "All matched files use the correct format." |
| 2 | `npm run lint:check` | 0 | — |
| 3 | `npm run check` | 0 | — |
| 4 | `npm run build:src` | 0 | — |
| 5 | `cmp .orkestrel/veneer/units/lc-instruments/lc2-round1-index.css dist/src/styles/index.css && echo byte-identical` | 0 | `byte-identical` |
| 6 | `npm run test:setup` | 0 | `Tests  308 passed (308)` |
| 7 | `npm run test:conformance` | 0 | `Tests  26 passed (26)` |
| 8 | `npm run test:guides` | 0 | `Tests  20 passed (20)` |
| 9 | `npm run test:src:styles` (whole styles project, run once; includes the `theme.test.ts` and `tokens.test.ts` files) | 0 | `Tests  1413 passed (1413)` |

Readings outside the gate script:

| Log | Command | Exit | Result |
| --- | --- | --- | --- |
| `lc2-green-1.log.txt` | `bash .orkestrel/veneer/units/lc-instruments/lc2-run.sh` over the touched styles proofs | 0 | `Tests  228 passed (228)` |
| `lc2-journey-light-2.log.txt` | `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-1280 -t 'measures the composed contrast of every variant and state against its control\|drives a link of each link specimen to the pointer and to keyboard focus'` | 0 | `Tests  2 passed \| 47 skipped (49)` |
| `lc2-journey-dark-2.log.txt` | the same command with `--project journey:dark-390` | 0 | `Tests  2 passed \| 47 skipped (49)` |
| `lc2-app.log.txt` | `npm run test:app` | 0 | `Tests  202 passed (202)` |

## Artifacts

- `lc-2.diff`: round 2 against `7852481`.
- `lc-2-status.txt`: the working-tree status.
- Instruments: `lc2-run.sh`, `lc2-journey.sh`, `lc2-mutate.py`, and `lc2-gates.sh`.
- `tmp/probe/` is empty.
- Deviation state: no stop.
