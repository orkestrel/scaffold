# Unit ts7-seven-fix-3 — report

All seven edits land verbatim and the gates are green.

## Per-edit rows

1. `guides/scaffold.md:1153` (line shifted to 1153 after the earlier "cleared" sentence became the
   region's fourth line) — "With that option cleared, the rollup resolves global types against the
   lib files of the compiler `@microsoft/api-extractor` bundles (5.9.3 at `@microsoft/api-extractor`
   7.59.0), for every generated workspace whatever `typescript` major it installs, so a public
   declaration resolves only the lib types that compiler provides." replaced with "With the option
   set to `''`, the rollup resolves global types against the lib files of the compiler
   `@microsoft/api-extractor` bundles, 5.9.3 at 7.59.0. That holds for every generated workspace
   whatever `typescript` major it installs, so a public declaration resolves only the lib types that
   compiler provides."
2. `guides/scaffold.md:1148-1162` — the whole paragraph refilled greedily at word boundaries to at
   most 100 columns; no word changed. The line that read short ("foreign row earns: the workspace
   declares") now reads "foreign row earns: the workspace declares major 6 while the registry serves
   a later major. Read that" at 100 columns, the paragraph's longest line.
3. `guides/scaffold.md` — "cleared" appears nowhere in the paragraph after edits 1 and 2 (confirmed
   with `grep -n "cleared" guides/scaffold.md`, no match); no second occurrence existed.
4. `tests/src/core/compilers.test.ts:1439` and `:1443` — "a roll-up on the 7 major" replaced with "a
   rollup on the 7 major"; "rolls up no declaration" replaced with "rolls no declaration up". Both
   replacement phrases are the same length or shorter than the originals, so the surrounding comment
   lines needed no reflow and none was done.
5. `tests/setupServer.ts:1655-1656` and `:1677-1681` — parameter renamed `version` to `versions` in
   the signature and the `published` binding
   (`typeof versions === 'string' ? [versions] : versions`); the `@param version` line pair replaced
   with "@param versions - The version to publish, or the versions to publish with the
   `dist-tags.latest` one first." wrapped across two lines at the block's existing width. Call sites
   are unchanged (all positional).
6. `tests/src/core/constants.test.ts:191` — "the control the assertion above needs" replaced with
   "the control the preceding assertion needs".
7. `tests/setupServer.ts:1683` and `tests/setupServer.test.ts:542-546` — guard line replaced with
   the prescribed two-line form checking `latest === undefined || published.some((entry) =>
   entry.length === 0)` and throwing "A packument publishes at least one version, and every version
   is named". The test row `refuses to publish no version, or an unnamed one` now asserts that
   `buildPackument([])`, `buildPackument('')`, and `buildPackument([''])` each throw that message.

## `test:setup` readings

- **Before the guard (edit 7) landed, with the widened test row in place:** `npm run test:setup` —
  2 failed, 69 passed (71 total). One failure is the widened `refuses to publish no version, or an
  unnamed one` row expecting the new message and receiving the old "A packument publishes at least
  one version"; the other is `answers the committed inventory and every host-owned path, and leaves
  a deferred path absent`, which fails on a `ScaffoldError: The vendored host cannot read the
  declared file at guides/scaffold.md` because `host.json` had not yet been rebuilt after the guide
  edit.
- **After the guard landed (and before `npm run build` rebuilt `host.json`):** `npm run test:setup`
  — 1 failed, 70 passed (71 total). The widened test row now passes; the remaining failure is the
  same pre-build host-digest mismatch, expected per the brief's build-before-test instruction and
  cleared by the later `npm run build` step.

## Gate readings

Run in order after `npm run format` converged the edited files:

| Command | Exit code |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 (rebuilt `host.json`, staged 121 files) |
| `npm test` | 0 (245 + 111 + 46 + 71 + 17 tests passed across the run's suites) |

## `git status --short`

```
 M PROPOSAL.md
 M ROADMAP.md
 M guides/scaffold.md
 M host.json
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/constants.test.ts
```

`PROPOSAL.md`, `ROADMAP.md`, and `tests/src/bin/CLI.test.ts` are the two earlier units' uncommitted
edits named in the brief's host context; this unit did not touch them. `host.json` moved only
through `npm run build`'s regeneration step, never by hand.

## Deviations

None. Every "replace" text was present verbatim at its cited site, and every gate read the exit
code the brief expects.
