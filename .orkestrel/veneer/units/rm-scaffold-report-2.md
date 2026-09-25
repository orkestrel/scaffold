# RM-SCAFFOLD round 2 report — `opus` on Opus 5.5, native

Items 1 through 6 are in place. Both provenance runs fail with an assertion on the digest-recorded
`392aa1e0` bytes, and both restores are byte-identical. After the setup-file move, the end-to-end
case reads green with a reading identical to round 1's. `build`, `format:check`, `lint:check`, and
`check` exit 0.

`npm test` exits 1 in every run I took. Every failure is a Vitest timeout in the `src:core`
project, while the host carried a load average of about 13 to 15 on 4 CPUs. The load came from
`chrome` processes in other checkouts. None of the timed-out cases sits in code this round changed.
The deciding re-run on an idle host is the Orchestrator's, per `.agents/orchestration.md` § Writing
concurrency, rule 10. Deviation state: no stop taken. The brief names a timing failure under load as
an observation, and this one is recorded as that, not as green.

## Items

1. **Vendored title (claim 8).** In `tests/config.test.ts`, the case is titled `returns the invocation mode and no other invocation field from every registered project factory`. Its body is unchanged. The title names factory returns and makes no claim about Vitest; only the end-to-end case reads Vitest.
2. **Stale comments (claim 7).** Each comment now separates a factory receiving the record from returning its mode.
   - `tests/src/core/templates.test.ts`, in the case that stages `application/vite.config.ts`: Vitest calls the row with the invocation record. The project runs in `--mode` only because the factory returns that record's mode. An evaluated row receives no record and runs in `test` under a release run, and it fails the emitted workspace's own `test` script.
   - `tests/src/core/compilers.test.ts`, above `gives every application browser factory the caller override`: receiving the record is not running in its mode. `mergeOverride` merges nothing from the record and returns the base with its mode set. The comment's word "refusal" became "projection".
3. **Compiler comment.** In `src/core/compilers.ts`, the comment beside `projects.push('appBrowser')` is now the brief's text verbatim, with `--mode` and `mergeOverride` in backticks, wrapped by oxfmt.
4. **Guide sentence (F2).** In the release paragraph of `guides/scaffold.md`, the sentence now reads as follows.

   > The project factories the root configuration registers receive the invocation record, and each
   > of their projects runs in the invocation's mode. Vitest runs a project whose factory returns no
   > mode in Vitest's own `test` mode, where the proof skips. A journey project is such a project:
   > its birth-owned wrapper drops the record, so it runs in `test` whatever mode the run names.

5. **Setup-file move (F1).**
   - `tests/setupServer.ts` exports `TestReportCase`, `TestReportFile`, `TestReleaseScenario`, `readVitestReport(text)`, and `buildReleaseScenarios(release, ordinary, configuration, proof)`. `DISTRIBUTION_TEST_PATH` joins its `@src/core` import.
   - `readVitestReport` returns every file entry with `name`, `status`, `message`, and `cases` (`title` and `status`). It returns `undefined` for a text that is not JSON, that has no `testResults` list, or that holds a file entry with no string `name` or no `assertionResults` list.
   - `buildReleaseScenarios` returns the release, ordinary, `malformed`, `collection`, `assertion`, and `timeout` runs that round 1 held inline.
   - `tests/setupServer.test.ts` proves both in `describe('the release-mode fixtures')`. The cases are `reads every test file a Vitest report records, and refuses a text that is not a report` and `lists the release and ordinary runs, then every rival release run with its own rewrite`. Result: `npx vitest run … --project setup -t "the release-mode fixtures"` gives `Tests 2 passed | 167 skipped (169)`.
   - In `tests/distribution.test.ts`, the end-to-end case builds its runs with `buildReleaseScenarios`. It and the Vue case `renders a Vue SFC through the generated browser setup project` both read their reports through `readVitestReport`. The now-unused `isArray` import is removed.
   - Reading unchanged: I dumped the case's `readings` map before and after the move, with a temporary `writeFileSync` line that I removed afterwards (`cmp` restored). The two dumps are byte-identical once the scratch directory name is normalized (`cmp` printed `READINGS-IDENTICAL`). See `tmp/units/rm-2-readings-before.json.txt` and `tmp/units/rm-2-readings-after.json.txt`.
   - Not run: the Vue case needs a registry install and a browser. It was typechecked and linted.
6. **Provenance re-run (claim 4).** The instrument is `tmp/units/rm-2-provenance.sh.txt`. It copied the fixed files aside, and then did the following:
   - wrote `git show 392aa1e0:<path>` over each site;
   - wrote each site's base-blob and in-place SHA-256 as the log's first lines;
   - ran the red commands;
   - restored the fixed files;
   - appended each restored digest beside the pre-run copy's digest and a `cmp` verdict.

## Provenance digests and readings

The digests are identical in both logs. They are SHA-256 values from `sha256sum`.

| Site | `392aa1e0` blob | In place for the run | Restored | Pre-run fixed copy | `cmp` |
| --- | --- | --- | --- | --- | --- |
| `src/core/templates.ts` | `38c8d94b322e60aac9268456274feac6833060f97d0bd99fb19516281d8c5ed9` | `38c8d94b…c5ed9` | `8fd40513db9f152efa1c24c66ded89940ae1005220a3063e4e1c7bf530857a96` | `8fd40513…57a96` | identical |
| `vite.config.ts` | `9e51401513063d243ff6223e05e2d1dfe05bd0141a1c4a0949209eae494b7080` | `9e514015…b7080` | `170bfcbcd17f970c2509bc601e5d81e4eb7883a84dd38a135ef8533fc2010161` | `170bfcbc…10161` | identical |

The runs on those base bytes read as follows.

| Command | Reading | Log |
| --- | --- | --- |
| `npx vitest run --config vite.config.ts --no-cache --project config -t "returns the invocation mode and no other invocation field from every registered project factory"` | `Tests 1 failed \| 172 skipped (173)`, exit 1; `AssertionError: expected [ { name: 'srcCore', …(3) }, …(8) ] to strictly equal …`, with every project's `mode` reading `undefined` | `tmp/units/rm-2-red-config.log.txt` |
| `npm run test:distribution -- -t "fails the release run of a generated distribution proof"` | `Tests 1 failed \| 8 skipped (9)`, exit 1; `AssertionError: expected { expired: false, signal: null, …(3) } to strictly equal …`; the release run read `code: 0` with the proof `passed` | `tmp/units/rm-2-red-distribution.log.txt` |

## Gates

The gates ran in the brief's order after item 6. A comment-only edit to
`tests/src/core/templates.test.ts` followed, so I re-ran `format:check`, `lint:check`, `check`, and
`npm test` afterwards. The logs hold those later runs.

| Gate | Exit | Log |
| --- | --- | --- |
| `npm run build` | 0 | `tmp/units/rm-2-build.log.txt` |
| `npm run format:check` | 0 | `tmp/units/rm-2-format-check.log.txt` |
| `npm run lint:check` | 0 | `tmp/units/rm-2-lint-check.log.txt` |
| `npm run check` | 0 | `tmp/units/rm-2-check.log.txt` |
| `npm test` | 1 | `tmp/units/rm-2-test.log.txt`: `src:core` gives `Tests 5 failed \| 421 passed (426)`, and every failure is `Test timed out in 5000ms`; load average 14.96 before and 14.47 after, on 4 CPUs |
| `npm run test:distribution -- -t "fails the release run of a generated distribution proof"` | 0 | `tmp/units/rm-2-e2e.log.txt`: `Tests 1 passed \| 8 skipped (9)` |

Timing readings behind the `npm test` row:

- `tmp/units/rm-2-test-loaded.log.txt` is the first `npm test`. It gave `Tests 9 failed | 417 passed (426)`, all timeouts, at load average 13.67.
- `tmp/units/rm-2-src-core-timed.log.txt` re-ran the timed-out cases alone with `-t`. They still timed out: `Test timed out in 5000ms` and one `Test timed out in 30000ms`, at load average 13.53.
- The timed-out cases are the `the guides entry` cases in `tests/src/core/compilers.test.ts`, plus `is an oxfmt fixed point across the emitted content corpus` and `emits browser configurations their own typecheck accepts` in `tests/src/core/templates.test.ts`.
- This round changed no code those cases execute. It changed a comment in `src/core/compilers.ts` and comments in those test files. Round 1's `npm test`, on the same template code, exited 0.
- `tmp/units/rm-2-test-rest.log.txt` runs the rest of the `test` chain one project at a time. Every project exits 0:
  - `src:server`: `475 passed | 1 skipped`
  - `src:bin`: `267 passed`
  - `policy`: `110 passed`
  - `config`: `172 passed | 1 skipped`
  - `setup`: `166 passed | 3 skipped`
  - `guides`: exit 0

## Diff and status

The diff against `392aa1e0` is `tmp/units/rm-2.diff`, and `git status --short` is in
`tmp/units/rm-2-status.txt`. The modified files are:

- `guides/scaffold.md`
- `host.json`
- `src/core/compilers.ts`
- `src/core/templates.ts`
- `tests/config.test.ts`
- `tests/distribution.test.ts`
- `tests/setupServer.test.ts`
- `tests/setupServer.ts`
- `tests/src/core/compilers.test.ts`
- `tests/src/core/templates.test.ts`
- `vite.config.ts`

`host.json` changes only on `npm run build`. This round's vendored edits are the title in
`tests/config.test.ts` and the sentence in `guides/scaffold.md`.
