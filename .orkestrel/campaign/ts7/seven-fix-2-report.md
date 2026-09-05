# Unit ts7-seven-fix-2 report

## Edits

1. `guides/scaffold.md:1155-1156` (offset by prior unit's edits, read at the cited text) — replaced
   the `@microsoft/api-extractor` bundling clause with "so a public declaration resolves only the
   lib types that compiler provides." and rewrapped the surrounding paragraph; longest resulting
   line is 99 columns.
2. `guides/scaffold.md:1159-1160` — replaced "reports one non-blocking" with "reports a
   non-blocking" and rewrapped; longest resulting line is 99 columns.
3. `tests/src/core/constants.test.ts:194` — replaced "That range is a floor of the same form" with
   "`APP_BROWSER_TYPESCRIPT_RANGE` is a floor of the same form" and rewrapped the four-line comment
   block to the file's existing comment width.
4. `tests/src/core/compilers.test.ts:1445` — renamed the test to `sets the rollup's compiler
   folder override in every declaration-rolling face`; the comment above it is unchanged.
5. `tests/setupServer.ts:1681-1687` (`buildPackument`) — bound `published` once with
   `const published = typeof version === 'string' ? [version] : version` and `const latest =
   published[0]`, and renamed the `Object.fromEntries` callback's `published` parameter to `entry`
   inside its body (`entry,` as the key and `version: entry,`), replacing `[latest,
   ...rest].map((published) => [` with `published.map((entry) => [`.
6. `tests/setupServer.test.ts` (`the upstream fixtures` describe block) — changed the array to
   `['0.0.4', '0.0.8']`, the expected tag to `'dist-tags': { latest: '0.0.4' }`, and ordered the
   `versions` map `'0.0.4'` then `'0.0.8'`, each record unchanged otherwise.
7. `tests/setupServer.test.ts` — added `it('refuses to publish no version at all', () =>
   expect(() => buildPackument([])).toThrow('A packument publishes at least one version'))`
   directly after the row from edit 6, formatted to the file's style (confirmed by
   `npm run format:check`).
8. `PROPOSAL.md:354-356` — replaced the clause naming `@orkestrel/guide`'s `Source` after the
   `unstable/ast`/`unstable/sync` mention with "preview surfaces carrying no stability promise,
   whose shape 7.1's different API can change" and rewrapped the paragraph; longest resulting line
   is 100 columns.
9. Ran `npm run format` after edits 1-8; it reformatted 222 files and reported no residual diff
   under `npm run format:check` afterward.

## Gates

Run in the required order, each exit code read directly:

- `npm run format:check` — exit 0 ("All matched files use the correct format.").
- `npm run lint:check` — exit 0 (no output, no warnings).
- `npm run check` — exit 0 (root `tsc`, then `check:src:core`, `check:src:server`,
  `check:src:bin`, all clean).
- `npm run build` — exit 0; rebuilt `dist/`, staged 121 files into `dist/host`, and rebuilt
  `host.json` with 121 entries through `build:inventory`.
- `npm test` — exit 0 across `test:src:core` (392 tests), `test:src:server` (432 tests),
  `test:src:bin` (245 tests), `test:policy` (111 tests), `test:config` (46 tests), `test:setup`
  (71 tests), `test:guides` (17 tests).

## `test:setup` readings

- Before edit 6 landed (edits 5 and 7 in place, `guides/scaffold.md` edited but `host.json` not
  yet rebuilt): `npm run test:setup` reported 70 passed, 1 failed — `ScaffoldError: The vendored
  host cannot read the declared file at guides/scaffold.md`, from `buildInstalledHostReplies`
  (`tests/setupServer.ts:1766`) through `tests/setupServer.test.ts:579`. This is the expected
  digest mismatch the brief's Host note names: `host.json` had not yet been rebuilt against the
  edited guide.
- After edit 6 landed, before `npm run build`: the same command reported the identical failure
  (70 passed, 1 failed, same `ScaffoldError`), confirming edit 6 introduced no new failure and the
  outstanding red was solely the stale `host.json`.
- After `npm run build` rebuilt `host.json` (part of the full `npm test` run above),
  `test:setup` passed at 71 tests (the two added rows from edits 6 and 7 included), 0 failed.

## `git status --short`

```
 M .orkestrel/campaign/ts7/ledger.md
 M .orkestrel/campaign/ts7/orchestrator-measurements.md
 M PROPOSAL.md
 M ROADMAP.md
 M guides/scaffold.md
 M host.json
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/constants.test.ts
?? .orkestrel/campaign/ts7/audit-probe-fix-brief.md
?? .orkestrel/campaign/ts7/audit-probe-fix-subjective.md
?? .orkestrel/campaign/ts7/audit-scaffold-fix-brief.md
?? .orkestrel/campaign/ts7/audit-scaffold-fix-checker.md
?? .orkestrel/campaign/ts7/audit-scaffold-fix-objective.md
?? .orkestrel/campaign/ts7/audit-scaffold-fix-subjective.md
?? .orkestrel/campaign/ts7/evidence/probe-decide/decide-2-probe-solo.log.txt
?? .orkestrel/campaign/ts7/evidence/probe-decide/decide-2-test.log.txt
?? .orkestrel/campaign/ts7/evidence/probe-decide/lockfile-npm11.log.txt
?? .orkestrel/campaign/ts7/probe-audit-verdict.md
?? .orkestrel/campaign/ts7/probe-fix-brief.md
?? .orkestrel/campaign/ts7/probe-fix-report.md
?? .orkestrel/campaign/ts7/seven-audit-verdict.md
?? .orkestrel/campaign/ts7/seven-fix-2-brief.md
?? .orkestrel/campaign/ts7/seven-fix-brief.md
?? .orkestrel/campaign/ts7/seven-fix-report.md
?? .orkestrel/campaign/ts7/verify-scaffold-fix-brief.md
```

Every modified path is either this unit's owned set (`PROPOSAL.md`, `guides/scaffold.md`,
`host.json`, `tests/setupServer.test.ts`, `tests/setupServer.ts`,
`tests/src/core/compilers.test.ts`, `tests/src/core/constants.test.ts`) or a file the brief names
as carrying the previous unit's uncommitted edits (`.orkestrel/campaign/ts7/**`, `ROADMAP.md`,
`tests/src/bin/CLI.test.ts`), which this unit left untouched.

## Deviations

None. Every "replace" text was present at its cited site, no edit required a file outside the
owned set, and no gate returned a red this unit's own edits could not explain (the two
pre-edit-6/post-edit-6 `test:setup` reds are the expected stale-`host.json` state the Host note
names, cleared once `npm run build` ran).
