# E-ID-CODE round 4 report — `opus` on Opus 5.5, worktree `/home/user/veneer-eic`, baseline `ca83afb`

## Deviation state: none

Every criterion in `eic-brief-4.md` is met, and every gate exits 0. The `var` element wears the chip through the
`code-surface` mixin, and its radius resolves to 4px in both modes. The mixin sets only `background-color` and
`border-radius`, so `var` keeps its padding, font, and color. Ancillary choices this unit settled: `var` includes the
mixin rather than writing the radius itself; the ledger takes no `var { border-radius }` row; the tenet sentence closes
the § Deferred selectors lead paragraph.

Correction applied from the Orchestrator: the Content gate runs the `app:browser` section suite alone. That project
excludes `tests/app/browser/integration.test.ts`, so this report does not report that file as run or passed.

## Changes

- `src/styles/elements/_var.scss` (owned): uses the mixins module, and replaces its bare `background-color` line with
  `@include code-surface(var(--vn-surface-raised))`. The built rule reads
  `var{font-family:ui-monospace, var(--vn-font-mono-short);color:var(--vn-text-code);background-color:var(--vn-surface-raised);border-radius:var(--vn-radius-small);padding-left:.25em;padding-right:.25em;font-size:95%;font-style:italic}`.
- `tests/src/styles/elements/var.test.ts` (owned): reads `border-top-left-radius` against the record's `radius`. Its
  comment names the elements that wear the chip.
- `tests/setupStyles.ts` (shared): `radius: 4` in `TEXT_VAR_CASES`, beside the round-1 `radius: 4` in
  `TEXT_SAMP_CASES`.
- `src/styles/_mixins.scss` (shared): the `code-surface` comment reads "Emits the chip the `code`, `kbd`, `samp`, and
  `var` elements wear: a surface and the small corner. The `samp` and `var` elements pass the raised surface where
  `code` and `kbd` keep the code one." The count "the one corner the family shares" is gone.
- `tests/src/styles/elements/samp.test.ts` (owned): the comment drops "the code-family record" and names the elements
  that wear the chip.
- `guides/veneer.md` (shared), rebuilt from its `ca83afb` text by `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/eic4-guide.py`:
  - The `pre code`, `a > code`, and `kbd kbd` Excluded Reason cells read exactly as at `ca83afb`.
  - The § Deferred selectors lead closes with: Every `Excluded` row whose reason names tag composition or adjacency
    applies the "Give semantic tags useful defaults without inferring components" tenet in the `ROADMAP.md` file. That
    sentence covers the nested-list rows, the `pre code`, `a > code`, and `kbd kbd` rows, and the `legend + *` row. It
    is the only tenet citation in the guide.
  - The `samp { border-radius }` addition row's Reason reads "Elements gives sample output the chip corner the `code`,
    `kbd`, and `var` elements also wear."
  - No `var { border-radius }` row: the ledger records `var` as a `selector` addition, so its declarations carry no
    rows. `npm run test:conformance` exits 0 against the cascade that ships the corner.
- `tests/app/browser/sections/ContentSection.test.ts` (owned): loads the published cascade and the app styles in
  `beforeAll`, and adds the case "keeps each tag its own treatment inside a link, a code block, and a key". The case
  reads the rendered Content section:
  - `Linked code`: the code's color does not match the anchor's, and matches `--vn-text-code`.
  - `Code block`: the inner code's background matches `--vn-surface-code`, its corner equals the bare `Code`
    specimen's, and its inline and block padding keep the bare code's ratio to font size.
  - `Key combination`: each inner key reads `Ctrl` or `S`, has a solid top border wider than 0, and matches the outer
    key's border width and color.

Guide and comment chip sentences, swept with `grep -rn -i chip guides/ src/ app/ tests/`: the mixin comment, the
`samp { border-radius }` Reason, and the `samp` and `var` test comments. Each names the elements that wear the chip.

## Failing-first and mutation tables

The `var` corner proof ran red before the change and green after it. The command was
`/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/eic-run.sh <log> tests/src/styles/elements/var.test.ts`.

| Proof | Red before the change | Green after | Logs |
| --- | --- | --- | --- |
| var: "resolves the var values in $mode mode" | `Tests 2 failed (2)`: `expected +0 to be 4` | `Tests 2 passed (2)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-var-red.log.txt`, `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-var-green.log.txt` |

The Content case adds coverage of treatment the cascade already ships, so it ran green on its first run
(`/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-content-first.log.txt`, `Tests 3 passed (3)`). The following mutations show it red.

The mutation driver is `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/eic4-mutate.py`, and its summary is `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-mutation-summary.log.txt`.
Each row's log is `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-mutation-<id>.log.txt`. The driver saves the file's bytes before each mutation,
restores them afterwards, and appends the before and after SHA-256 digests to that log.

| Id | Mutation | Reddened case | Reading | Restore |
| --- | --- | --- | --- | --- |
| m21 | `var` drops the corner (bare `background-color: var(--vn-surface-raised)` in place of the include) | var: "resolves the var values in $mode mode", both modes; `Tests 2 failed (2)` | `expected +0 to be 4` | identical |
| m22 | re-adds `a > code { color: inherit }` (the brief's named mutation) | Content: "keeps each tag its own treatment inside a link, a code block, and a key"; `Tests 1 failed \| 2 passed (3)` | `expected true to be false` | identical |
| m23 | re-adds `pre code { padding: 0; background-color: transparent }` | the same Content case; `Tests 1 failed \| 2 passed (3)` | `expected false to be true` | identical |
| m24 | re-adds `kbd kbd { border: 0 }` | the same Content case; `Tests 1 failed \| 2 passed (3)` | `expected 'none' to be 'solid'` | identical |

`git status --short` read the same before and after the mutation run.

## Gates

The driver is `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/eic4-gates.sh`, and its summary is `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-gates-summary.log.txt`. Each log ends
with `exit=<code>`.

| Gate | Exit | Reading | Log |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | — | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-gate-format-check.log.txt` |
| `npm run lint:check` | 0 | — | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-gate-lint-check.log.txt` |
| `npm run check` | 0 | — | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-gate-check.log.txt` |
| owned styles files (`index`, `code`, `pre`, `kbd`, `samp`, `var`) | 0 | `Tests 17 passed (17)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-gate-owned-styles-run.log.txt` |
| `npm run test:src:styles` | 0 | `Tests 1434 passed (1434)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-gate-test-src-styles.log.txt` |
| `npm run test:setup` | 0 | `Tests 319 passed (319)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-gate-test-setup.log.txt` |
| `npm run test:conformance` | 0 | `Tests 26 passed (26)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-gate-test-conformance.log.txt` |
| `npm run test:guides` | 0 | `Tests 20 passed (20)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-gate-test-guides.log.txt` |
| section suite: `npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/ContentSection.test.ts` | 0 | `Tests 3 passed (3)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/r4-gate-app-content.log.txt` |

No timing failure occurred.

## Shared-file hunks

Each patch is taken against `ca83afb` and supersedes the round-3 patch for the same file.

- `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/eic4-shared-veneer.patch` (`guides/veneer.md`): the tenet sentence at the end of the § Deferred selectors
  lead, and the `samp { border-radius }` addition row after `samp { background-color }`. The Excluded rows carry no
  hunk.
- `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/eic4-shared-setupStyles.patch` (`tests/setupStyles.ts`): `radius: 4` in `TEXT_SAMP_CASES` and in
  `TEXT_VAR_CASES`.
- `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/eic4-shared-_mixins.patch` (`src/styles/_mixins.scss`): the `code-surface($surface)` parameter and its
  rewritten comment. AP-TYPE also edits this file, so apply this hunk three-way.
- `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/eic4-shared-constants.patch` (`app/browser/constants.ts`): the `Linked code`, `Code block`, and
  `Key combination` specimens, byte-identical to `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/eic3-shared-constants.patch`.

## Artifacts

- Diff: `/home/user/scaffold/.orkestrel/veneer/units/eic-4.diff` (`git diff ca83afb`)
- Status: `/home/user/scaffold/.orkestrel/veneer/units/eic-4-status.txt`. Relative to round 3, the added paths are `src/styles/elements/_var.scss` and
  `tests/src/styles/elements/var.test.ts`.
- Instruments: `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/eic4-guide.py`, `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/eic4-mutate.py`, `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/eic4-gates.sh`, and
  `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/eic-run.sh`, which is unchanged.
