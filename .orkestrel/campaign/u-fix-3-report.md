# Unit report — U-fix-3 (Opus `implementer`, native, returned 2026-09-13)

All criteria green. Baseline read before editing: `981aa66`, working tree clean.

## Touched files

| File | Reason |
| --- | --- |
| `guides/scaffold.md` | Item A: rewrote the toolchain paragraph in § Generated workspace so the `EBADDEVENGINES` refusal is claimed only of an npm from 10.9.0 on, names the older npm's dependency-resolution failure, names the bundled-npm fact, and writes every prose version as a plain numeral. |
| `README.md` | Item B: replaced the § Notes npm-floor paragraph with short sentences whose subject is the `scaffold new` command, carrying the bounded refusal and the remedy. |
| `ROADMAP.md` | Item C: the `SetupPanel` and `OllamaProvider.test.ts` noun additions, the R-4 clause in the `0.0.65` successor row, and the `devEngines`-reading facts plus the `devengines-floor.log.txt` citation in the two scaffold rows, with versions as plain numerals in those rows. |
| `src/core/constants.ts` | Item D: bounded the `WORKSPACE_DEV_ENGINES` `@remarks` refusal sentence to an npm from 10.9.0 on; the description paragraph is byte-identical. |

Diffstat (`git diff --stat`): `README.md | 10 ++++++----`, `ROADMAP.md | 33 +++++++++++++++++++++------------`, `guides/scaffold.md | 16 ++++++++++------`, `src/core/constants.ts | 7 ++++---`, `4 files changed, 41 insertions(+), 25 deletions(-)`.

## Criteria with exact readings

| # | Command | Reading |
| --- | --- | --- |
| 1 | `npm run format:check` | `exit=0`, "All matched files use the correct format. Finished in 8869ms on 225 files using 4 threads." |
| 2 | `npm run lint:check` | `exit=0` |
| 3 | `npm run check` | `exit=0` (`check:src:core`, `check:src:server`, `check:src:bin`) |
| 4 | `npm run test:policy` | `exit=0`, `Test Files 1 passed (1)`, `Tests 91 passed (91)` |
| 5 | `npm run test:guides` | `exit=0`, `Test Files 1 passed (1)`, `Tests 23 passed (23)` |
| 6 | `grep -c 'Node [0-9.]* or later' README.md` | `1` |
| 7 | `grep -c EBADDEVENGINES README.md guides/scaffold.md src/core/constants.ts` | `README.md:1`, `guides/scaffold.md:1`, `src/core/constants.ts:0` |
| 8 | `grep -n '10\.9\.0' README.md guides/scaffold.md src/core/constants.ts` | `README.md:62,63`; `guides/scaffold.md:1454,1457,1459`; `src/core/constants.ts:497,498` |
| 9 | `grep -n '`[0-9][0-9.]*`' README.md` | no output, `rc=1`; same pattern over `sed -n '1449,1465p' guides/scaffold.md`: no output, `rc=1` |
| 10 | `grep -c 'lacking `setsid` or `timeout`' ROADMAP.md` / `grep -c devengines-floor.log.txt ROADMAP.md` | `1` / `2` |
| 11 | `git diff --stat` | names only `README.md`, `ROADMAP.md`, `guides/scaffold.md`, `src/core/constants.ts` |

Added-line sweep for banned terms (pattern over `git diff -U0` added lines: `should|simply|easy|easier|just|currently|now|via|in order to|e.g.|i.e.|etc.|performant|robust|allows you to|and/or|since|once|latest|ensure|guarantee`, paths: the four owned files): no hit, `rc=1`.

## Item A, final wording (`guides/scaffold.md:1451-1463`)

```
Every generated manifest declares the toolchain it is gated on. The `engines.node` field carries the
blueprint's `engines` value, which defaults to the `>=22.18.0` range. The
`devEngines.packageManager` record names npm at the `>=11.6.0` range with its `onFail` key set to
the `error` value, and no blueprint field varies that floor. An npm from 10.9.0 on reads that
record. Such an npm beneath the floor refuses the `npm install` command in a generated workspace
with the `EBADDEVENGINES` code instead of resolving the dependency graph. It refuses each nested
`npm run` command under that install on the same reading. An npm older than 10.9.0 ignores the
record and fails inside dependency resolution instead. Every npm that a supported Node bundles
reads the record, so only an npm downgraded below 10.9.0 meets that failure. Run a generated
workspace on npm 11.6.0 or later, because 11.6.0 is the first release that installs a generated
workspace. Read the ambient version with the `npm --version` command, and raise it with the
`npm install --global npm@11.6.0` command, or a later release, before the first install. These
readings come from a Linux host on Node 22.22.2, on 2026-09-13.
```

## Item B, final wording (`README.md:61-66`, first paragraph of § Notes)

```
The `scaffold new` command generates a workspace that declares an npm floor of 11.6.0 in its
`devEngines` record. An npm from 10.9.0 through 11.5.0 reads that record and refuses the
`npm install` command with the `EBADDEVENGINES` code. An npm older than 10.9.0 ignores the record
and fails inside dependency resolution instead. Every npm that a supported Node bundles reads the
record. Raise npm with the `npm install --global npm@11.6.0` command, or a later release, before
the first install. These readings come from a Linux host, on 2026-09-13.
```

## Item D, final wording (`src/core/constants.ts:491-502`)

```
/**
 * Holds the `devEngines` record every generated manifest carries.
 *
 * @remarks
 * No blueprint field varies it. Every generated manifest names npm at the
 * {@link MINIMUM_NPM_VERSION} floor with the `onFail` key set to the `error` value. An npm from
 * 10.9.0 on reads the `devEngines` record, so such an npm beneath that floor refuses an install in
 * a generated workspace rather than resolving its dependency graph. An npm older than 10.9.0
 * ignores the record.
 * The neighbouring `DEFAULT_ENGINES` constant is the Node range, and a blueprint's `engines`
 * field does replace that one.
 */
```

## Item C, the four edits as landed

- `ROADMAP.md:295-296`: "the disabled busy submit in the `SetupPanel` component parks focus deliberately."
- `ROADMAP.md:367-369`: "timed out at the warmup in the `OllamaProvider.test.ts` file while the other files passed, and the warm re-run passed every file."
- `ROADMAP.md:434-437`: "…and a tool it cannot resolve is dropped silently, so whether a host lacking `setsid` or `timeout` changes the exit code and the message the pinned case in `tests/src/server/helpers.test.ts` asserts is unmeasured; …"
- `ROADMAP.md:370-380` (crash row): versions de-backticked, plus "An npm at 10.5.0, 10.8.3, 10.9.0, or 10.9.3 crashes the same way on the plain manifest, read from `.orkestrel/campaign/evidence/linux-gate/devengines-floor.log.txt`." beside the existing `npm-boundary-readings.log.txt` citation.
- `ROADMAP.md:382-390` (provisioning row): plus "An npm from 10.9.0 on reads the `devEngines` record; an npm at 10.5.0 or 10.8.3 ignores it and meets the crash; every npm a supported Node bundles reads it. Read from `.orkestrel/campaign/evidence/linux-gate/devengines-floor.log.txt`, measured on 2026-09-13."

No other ROADMAP row changed.

## Observations, not criteria

- `host.json` now carries a stale digest for `guides/scaffold.md`: the committed value is `688c06e8c2ff4d627beb1cea17576b1180c51f210e557b0d80ce24e660792f58` and the file at this tip hashes to `0d02927071269ea825e2b2eee0089fbe8e641bde004cd2eccb893339b60b43e6`. `host.json` is off-limits to this unit, so `test:config` reddens until the Orchestrator's `build` regenerates it.
- Wrapping inside the successor row leaves two short lines (`ROADMAP.md:435` at 55 characters and `:439` at 26) because the R-4 clause's fixed wording forces "lacking `setsid` or `timeout`" onto one line for criterion 10. `format:check` is green on it.

## Deviation state

No deviation. Every item landed as briefed, no fact outside § Measured facts entered the prose, `test:guides` stayed green, item D needed no change to the description paragraph, and no file outside the owned list was written.
