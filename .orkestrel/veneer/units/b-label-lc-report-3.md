# LABEL (`lc`) round 3 report

Every brief item is closed. Each added proof has a retained red run, every gate exits 0, and the built
cascade is byte-identical to round 2's build.

- Role: `opus` on Opus 5.5, native.
- Worktree: `/home/user/veneer-lc2`, changes on top of `7852481`. Nothing is committed.
- Evidence: the files named here sit in `/home/user/veneer-lc2/tmp/units/`.

## Changes per item

### 1. The fixture over Veneer's fills (claim 6)

- `tests/src/styles/fixtures/contrast.scss` loads the tokens module. For every role in each mode it writes
  two picks:
  - Veneer's `contrast` pick against the release's labels, as `color`.
  - The release's own `color-contrast` pick for the same channel triplet, as `background-color`.
- The added case in `mixins.test.ts`, "picks the label the release's own function picks against Veneer's
  %s fill in %s mode", runs over the `BUTTON_LABEL_CASES` table. It asserts the two picks agree and match
  the table's label.
- Loading the tokens module writes the token declarations again, with identical values; the fixture header
  says so.
- The parity comment on the `contrast` function names both the release's fills and Veneer's, in each mode.

### 2. State fills under a consumer scheme (claim 3)

- The consumer-scheme case reads the hover and active fills beside the resting fill.
- The `BUTTON_SCHEME_CASES` table gains a `moved` field:

  | Consumer rule | Label | Hover and active fills | Resting fill |
  | --- | --- | --- | --- |
  | Lowered | moves | move | stays |
  | Declared | stays | stay | stays |

- The guide's § Color modes sentence states that behavior. Its proof sentence names the root-attribute case
  and the declared and lowered consumer-scheme cases.

### 3. One term (claim 5)

| Concept | Name |
| --- | --- |
| The per-role light and dark pair | `$pair` everywhere: the `_tokens.scss` loop local, the `label` and `endpoint` parameters, and the button local |
| The role-to-pair map | `$role-pairs` |

Every comment round 2 rewrote says "channel triplet" again. `cmp` against round 2's build exits 0.

### 4. Proof titles

- The island proof now asserts that each button name is unique.
- The transition proof's title says "distinct" instead of "later".
- The floor case's title names the states it reads.
- The root-attribute title says "after the root takes the dark attribute".
- The `LINK_SHIFT` pin moved into the link constants proof.

### 5. TSDoc placement

The `LINK_SHIFT` constant and its TSDoc sit above the `LINK_OFFSET_CASES` TSDoc.

### 6. The pin search (claim 1)

- `lc3-pin-search.sh` searched `tests/fixtures/oracle`, `tests/app`, `app/browser/constants.ts`, `src`,
  and `guides`. Its commands and output are in `lc3-pin-search.log.txt`.
- Patterns: the pre-change state fills, a button or tooltip label, a `text-bg` foreground, and a link
  hover or focus color.
- No pin was found:
  - The state-fill pattern matched nothing.
  - Every other match is a guide ledger row or prose line (checked by the conformance and guides gates),
    or the release's own `inventory.json` record.
  - The journey role-link case reads the `LINK_PAINT_PROPERTIES` list. That case passed in round 2.

### 7. The retune sentence

The button obligation ends its own sentence. A separate sentence covers the tooltips, the `text-bg`
pairs, and the link hovers.

## Red runs

`lc-mutations-3.log.txt` holds both runs, with one `lc3-mutation-S*.log.txt` log each. Each build exits 0.

| Mutation | Change | Reddened case |
| --- | --- | --- |
| S1 | `contrast` picks black for Veneer's light primary triplet `(8, 65, 234)` alone | "picks the label the release's own function picks against Veneer's primary fill in light mode" |
| S2 | `endpoint` writes the light pick for both modes | "reads the primary label and hover and active fills a 'lowered' consumer scheme gives it, and keeps the resting fill" |

## Gates

Summary lines are in `lc3-gates.log.txt`, one log per gate, each opening with its command. All ran in
`/home/user/veneer-lc2`.

| Gate | Command | Exit | Result |
| --- | --- | --- | --- |
| 1 | `npx oxfmt --config .oxfmtrc.json --check` over the changed files | 0 | "All matched files use the correct format." |
| 2 | `npm run lint:check` | 0 | — |
| 3 | `npm run check` | 0 | — |
| 4 | `npm run build:src` | 0 | — |
| 5 | `cmp .orkestrel/veneer/units/lc-instruments/lc3-round2-index.css dist/src/styles/index.css && echo byte-identical` | 0 | `byte-identical` |
| 6 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | 0 | `Tests  149 passed (149)` |
| 7 | `npm run test:guides` | 0 | `Tests  20 passed (20)` |
| 8 | `npm run test:conformance` | 0 | `Tests  26 passed (26)` |
| 9 | `npm run test:src:styles` (the acceptance reading, run once) | 0 | `Tests  1431 passed (1431)` |

Other readings:

- Baseline for gate 5: `lc3-round2-index.css`, built from round 2's tree. `lc3-build-base.log.txt` records
  the command, `HEAD`, and the status. Its SHA-256 equals the round 1 baseline's.
- Scoped run of the touched styles proofs (`lc3-green-1.log.txt`,
  `bash .orkestrel/veneer/units/lc-instruments/lc2-run.sh lc3-green-1.log.txt tests/src/styles/mixins.test.ts tests/src/styles/components/button.test.ts tests/src/styles/utilities/link.test.ts`):
  exit 0, `Tests  209 passed (209)`.

## Artifacts

- `lc-3.diff`: rounds 2 and 3 against `7852481`.
- `lc-3-status.txt`: the working-tree status.
- `tmp/probe/` holds no file.
- Deviation state: no stop.
