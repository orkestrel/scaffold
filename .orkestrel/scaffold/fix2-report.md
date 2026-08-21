# scaffold readiness fix unit 2 — report

Every assigned row closed. Baseline 0db3921, clean at dispatch. Host: Linux, bash, no network used.

## Flagged claim of my own

**SR7's prescription was absent from the matrix.** The brief states that
`tmp/readiness-matrix.md` "carries the subjective lane's corrected sentences as the prescription".
It does not: the SR7 row reads "Accepted with the lane's exact corrected sentences as the
prescription" and quotes no sentence, and `tmp/` holds no subjective-lane report (only
`codex/readiness-canon-last.md` and `codex/readiness-objective-last.md`). The row itself names each
site and each contradiction, and the brief makes sentence form an ancillary choice, so I wrote the
three corrected sentences myself from the code rather than stopping the unit. **The SR7 wording is
mine, not a lane's, and the auditor must rule on it as new prose.** Each correction is pinned to an
executed reading, recorded per site.

## Rows

### SR2 + SR16 + SR3 — the substitution-table sweep

Sweep pattern set, run case-insensitively with `rg -n -i`:
`\bshould\b`, `currentl`, `simpl`, `\bjust\b`, `eas(y|ier|ily)`, `\bvia\b`, `\bnew(er|est)\b`,
`\blatest\b`, `\bonce\b`, `\bboth\b`, `utilize|leverage`, `in order to`, `e\.g\.|i\.e\.`, `etc\.`,
`performant|robust`, `allows you to`, `and/or`, `\bsince\b`, `\bplease\b`, `sanity check`,
`\bdummy\b`, `blacklist|whitelist`, `\bmaster\b|\bslave\b`.

Sweep paths: `src`, `tests/src`, `tests/setupPolicy.ts`, `guides/scaffold.md`, `guides/README.md`,
`README.md`, `ROADMAP.md`, `configs`. **Coverage limit:** `tests/setup.ts`, `tests/setupServer.ts`,
`tests/config.test.ts`, and `tests/distribution.test.ts` are neither owned nor off-limits, so I
swept them and edited nothing there — findings listed under "Outside owned scope". The other
`guides/*.md` files are vendored upstream mirrors, which `.claude/rules/documentation.md` puts
outside authored prose; they carry many `should` hits and are not this row's subject.

Banned-sense hits fixed:

| Hit                                                   | Site (post-change)                                          |
| ----------------------------------------------------- | ----------------------------------------------------------- |
| `should be created`                                   | `README.md:98`, `guides/scaffold.md:687`, `src/core/Compiler.ts:133` |
| `should not create`                                   | `src/bin/CLI.ts:481`, `src/core/compilers.ts:1659`          |
| `should be probed` (emitted into `configs/browsers.ts`) | `src/core/templates.ts:946`, `:991`                       |
| `the table should list`                               | `src/server/types.ts:193`, `src/server/Materializer.ts:327` |
| `the manifest should declare`                         | `src/server/types.ts:201`, `src/server/Materializer.ts:356` |
| `the destination should hold`                         | `src/server/WriteTransaction.ts:230`                        |
| `should carry the executable bit`                     | `src/server/WriteTransaction.ts:269`                        |
| `currently`                                           | `guides/scaffold.md:761`, `src/bin/CLI.ts:506`, `src/server/Upstream.ts:197` |
| `simply`                                              | `guides/scaffold.md:1121`, `tests/src/server/Upstream.test.ts:424`, `tests/src/server/helpers.test.ts:263`, `tests/src/server/Materializer.test.ts:105` |
| `not just the declared ones`                          | `src/bin/constants.ts:118` and its `--help` fence at `guides/scaffold.md:446` |
| `too easy to mistake`                                 | `src/core/compilers.ts:1038`                                |
| `re-emitted via`                                      | `src/core/templates.ts:694` and its materialized copy `configs/src/vite.bin.config.ts:5` |
| `newer` as a version range                            | `README.md:16`, `guides/scaffold.md:25`                     |
| temporal `once`                                       | `guides/scaffold.md:1142`, `src/core/compilers.ts:445`, `src/core/Compiler.ts:279`, `src/server/helpers.ts:352`, `ROADMAP.md:54`, `tests/src/bin/CLI.test.ts:1888`, `tests/src/server/helpers.test.ts:1191`, `:1320`, `tests/src/core/constants.test.ts:97`, `tests/src/core/compilers.test.ts:540`, `:581` |

`should` is recast as `must` where the clause is a requirement on output, and as
"does not decide whether to create it" / "but will not create" where the original stated that a plan
does not authorize creation. That phrase is used identically at every site so the concept keeps one
term.

Permitted-sense hits, kept and recorded:

| Sense                       | Ruling                                                                                    | Sites |
| --------------------------- | ------------------------------------------------------------------------------------------ | ----- |
| registry `latest`           | `dist-tags.latest` is an external value, not a time word                                  | `src/core/types.ts:217`,`:223`,`:232`,`:240`; `src/core/helpers.ts:642`,`:681`–`:693`; `src/server/types.ts:302`; `src/server/Upstream.ts:81`,`:151`,`:162`,`:320`–`:329`,`:373`,`:447`–`:457`; `src/bin/CLI.ts:422`,`:472`,`:1000`; `README.md:39`,`:79`; `ROADMAP.md:4`; `guides/scaffold.md:55`,`:395`,`:837`; the `latest` field across `tests/src/**` |
| temporal `just`             | "a moment ago", not "merely"                                                              | `src/server/Materializer.ts:721`,`:800`; `tests/src/bin/CLI.test.ts:1888`; `tests/src/core/templates.test.ts:480`,`:702` |
| frequency `once`            | "one time", not "after"                                                                    | `src/bin/constants.ts:89`,`:122`; `src/bin/helpers.ts:79`,`:162`; `src/bin/CLI.ts:93`,`:118`,`:126`,`:386`; `src/core/compilers.ts:72`,`:828`,`:1586`,`:1626`,`:1730`,`:1738`,`:1763`,`:1960`; `src/core/constants.ts:197`,`:227`; `src/core/helpers.ts:149`,`:310`,`:653`; `src/core/cloners.ts:18`; `src/server/Materializer.ts:81`,`:508`; `src/server/WriteTransaction.ts:48`,`:552`,`:669`; `src/server/helpers.ts:249`,`:1122`; `README.md:58`; `ROADMAP.md:27`,`:67`; `guides/scaffold.md:133`,`:448`,`:604`,`:898`,`:916`; `tests/src/**` frequency sites |
| "at once" (simultaneity)    | idiom, neither frequency nor `after`                                                       | `guides/scaffold.md:895`; `src/server/Upstream.ts:558`; `tests/src/server/Upstream.test.ts:724` |
| formerly-sense `once`       | means "previously", which is not the `after` sense the row bans                            | `src/bin/CLI.ts:228`; `tests/src/core/compilers.test.ts:53` |
| member-naming `both`        | the sentence names its members                                                             | `ROADMAP.md:56`; `src/bin/types.ts:159`; `src/bin/helpers.ts:30`,`:300`; `src/core/errors.ts:13`; `src/core/types.ts:364`; `src/core/validators.ts:496`–`:498`; `guides/scaffold.md:640`,`:891`,`:1112`,`:1126`,`:1134`,`:1185`; `tests/src/**` |
| `newest first` (ordering)   | rollback order, not a version range                                                        | `src/server/WriteTransaction.ts:626` |
| `since` (temporal)          | "from that time", not causal; the row bans only the causal sense                           | `src/server/Materializer.ts:237`,`:285`,`:307`,`:388`,`:743`,`:785`; `src/server/WriteTransaction.ts:380`; `tests/src/server/**` |
| `currentLines`, `latest`, `.once(`, `ScriptTarget.Latest`, `'# Newer\n'` | code identifiers and fixture literals, exempt by the table's own rule | `src/bin/CLI.ts:1064`,`:1067`; `tests/setupPolicy.ts:637`; `tests/src/bin/main.test.ts:70`,`:71`; `tests/src/server/Materializer.test.ts:833` |

Template halves: `src/core/templates.ts:694` emits `configs/src/vite.bin.config.ts`, and this
repository carries the materialized copy at that path. Both moved in the same change and now read
identically. Every option summary in `src/bin/constants.ts` is present verbatim in the guide's
`--help` fence after the `--all` edit (checked by extracting the fence and matching each summary
string; nothing missing).

### SR4 — `WriteTransaction.directory()` → `establish()`

`src/server/WriteTransaction.ts:333` renames the method. Consumers updated:
`src/server/Materializer.ts:864`, and `tests/src/server/WriteTransaction.test.ts:297`, `:336`,
`:360`, `:361`, `:376`, `:404`, `:625`, `:655`. Guide method table row moved at
`guides/scaffold.md:406`.

Residue sweep: `rg -n "\.directory\(" src/ tests/ guides/scaffold.md` returns no hit (exit 1). The
`@param` line and the TSDoc summary already read "establish", so they needed no change. The private
`#establish` is unchanged and does not collide — `#`-private names are a separate namespace, and
the matrix cites that private name as the rename's evidence. `src/server/types.ts` declares no
`WriteTransactionInterface`, so no interface member moved.

### SR5 — `Scaffolding.blueprint?: never`

Deleted at `src/core/types.ts:490`. `rg -n "blueprint\?: never" src/` returns no hit (exit 1). The
`@remarks` now names `scaffolding.plan.blueprint` as what serves the completed case. No consumer
read the member (`rg` over `src/`, `tests/src/`, `guides/scaffold.md`, `README.md` found none), and
no guard reads it (`isScaffolding` does not exist).

### SR6 — `guides/README.md` dependency set

Corrected from the manifest at `guides/README.md:41-46`. The manifest's `dependencies` are
`@orkestrel/console`, `@orkestrel/contract`, `@orkestrel/emitter`, `@orkestrel/markdown`,
`@orkestrel/process`, and `@orkestrel/template`; `@orkestrel/terminal` is in neither dependency
block. The reach sentence was also wrong: `rg -n "from '@orkestrel/" src/` shows markdown and
process reached only from `src/bin/CLI.ts`, and contract reached from the library faces and the
executable. The corrected sentence reads "The library faces reach contract, emitter, and template;
the `scaffold` executable reaches console, contract, markdown, and process."

### SR7 — guide absolutes the code contradicts

| Site | Reading that settles it | Correction |
| ---- | ----------------------- | ---------- |
| `guides/scaffold.md:457` — `--help` exception | `node dist/bin/main.js audit --help` printed the reference and exited `0`, though `audit` lists no `--help`; `src/bin/CLI.ts:162` checks `argv.includes('--help')` before parsing | Names `--help` as the one exception and states it exits `0` before the line is read as a command |
| `guides/scaffold.md:568` — `--json` premise | `node dist/bin/main.js bogus --json` printed a prose `USAGE:` refusal and exited `2`, so the line **did** carry `--json`; `src/bin/CLI.ts:169` passes `false` because no command was read | Replaces "carries no `--json`" with "is refused in prose even when the line carries `--json`, because the flag is read from the command and no command was read" |
| `guides/scaffold.md:989` — `endsWith` example claim | `src/server/helpers.ts:530` shows the shipped example is `resolveContainedPath('/tmp/project', 'guides/router.md')?.endsWith('router.md') // true`, which prints `true`, not an absolute path | Drops "which is what its shipped example prints" and states that the example tests the answer's suffix |

`src/bin/CLI.ts:167` carried the same false `--json` premise as a comment; it now states the
corrected mechanism, so source and guide use one wording.

### SR8 — platform-conditioned `skipIf`, per site

| Site | Reading | Ruling |
| ---- | ------- | ------ |
| `tests/src/server/helpers.test.ts:492` | Comment **above** the skip explains that Node resolves a junction target with `path.resolve(linkPath, '..', target)` and collapses `..` lexically, so the vector cannot exist on win32 | Mechanism cited beside the skip — canon hit **drops**, unchanged |
| `tests/src/server/WriteTransaction.test.ts:257` (anchor-swap interleaving) | Comment **above** the skip names `MoveFileExW` with `MOVEFILE_REPLACE_EXISTING` rejecting an existing directory destination, and says the claim is unverified rather than inapplicable | Mechanism cited beside the skip — canon hit **drops**, unchanged |
| `tests/src/server/WriteTransaction.test.ts:202` (`sets the executable bit when asked`) | Mechanism present but as the first statement **inside the body**; the skip line named only the platform | **Moved** the NTFS-permission-bits mechanism above the `it.skipIf` line |
| `tests/src/server/WriteTransaction.test.ts:223` (`clears the executable bit when not asked`) | Same shape — mechanism inside the body | **Moved** the mechanism above the `it.skipIf` line |

`tests/distribution.test.ts:563` uses `it.skipIf(!registry && !release)`, which is capability-
conditioned rather than platform-conditioned, and that file is outside owned scope; unchanged.

### SR9 + SR15 — `ROADMAP.md`

Struck the row "regenerate the package table with `scaffold catalog` so the `form` and `table` rows
land in it. (was B8)". Evidence that the table already carries them:
`rg -n "@orkestrel/form|@orkestrel/table" .claude/agents/orkestrel.md` returns rows at lines 49 and
75. The sibling `form` mirror row at `ROADMAP.md:35-37` is untouched and stays open.

Added the SR15 row at `ROADMAP.md:38-44`, recording the owed Windows anchor-swap interleaving proof
with the mechanism, why the skip is "unverified there, not inapplicable", and the condition that
closes it. **Ancillary choice recorded:** I placed it in "3. Package work, scheduled by each
package's next natural release" as a second `scaffold` row rather than in section 5, because the
row is package work with a named closing condition and section 3 already carries an
"Unmeasured on Windows" precedent in the `probe` row.

### SR11 — `.agents/orchestration.md`

One sentence added under § Where campaign artifacts live, at line 428, directive form, nothing else:

> Give a campaign spanning several packages one shared `.orkestrel/campaign/` folder instead, so the
> wave's plan, ledger, and verdicts sit together rather than split across the packages they rule on.

`rg -n "orkestrel/campaign" .agents/orchestration.md` returns that line and no other.

### Fleet register

`tests/setupPolicy.ts:187` — `FUNCTION_DOMAIN_FOLDERS` now holds `'app/browser/composables'` and
`'src/server/execution'`, wrapped by the formatter into a multi-line frozen array. The entry is
inert here: `find src app tests configs -name execution.ts` returns nothing, so no path in this
repository becomes eligible and no `domain` violation is possible (the register's basename check at
`tests/setupPolicy.ts:642` would flag a source file named `execution.ts`, and none exists).

## Outside owned scope — reported, not edited

These files are neither owned nor off-limits in the brief, so I left them alone:

- `tests/setupServer.ts:1510` — temporal `once`: "Once the artifact that renders this file exists, both …".
- `tests/distribution.test.ts:368` — temporal `once`: "Recorded only once it has a span".
- `tests/distribution.test.ts:14` — causal `since`: "Node refuses one directly since the …".

## Gate and test evidence

Scoped and read-only, run on this host after the edits landed:

| Command | Result |
| ------- | ------ |
| `npm run lint:check` | exit 0 |
| `npm run check` | exit 0 (root `tsc`, then core, server, and bin scopes) |
| `npm run format:check` | exit 0, "All matched files use the correct format", 202 files (`npm run format` ran first to converge `ROADMAP.md` and `src/bin/constants.ts`) |
| `npm run test:policy` | exit 0 — 1 file, 86 tests passed |
| `npm run test:src:core` | exit 0 — 8 files, 316 tests passed |
| `npm run test:src:server` | exit 0 — 5 files, 354 tests passed |
| `npm run test:src:bin` | exit 0 — 3 files, 168 tests passed |
| `npm run test:config` | exit 0 — 1 file, 29 tests passed |
| `npm run test:guides` | exit 0 — 1 file, 10 tests passed |

Those are every project `npm test` chains, each run individually. I did not run `npm test` or
`npm run build` as one block; the aggregate reading and the build belong to the independent
verifier.

No failing-first test names: this unit carries no defect row. SR4, SR5, SR6, SR7, SR9, SR11, SR15,
and the sweep are rename, deletion, prose, register, and record work, each verified by the criteria
listed earlier rather than by a red-then-green proof.

## Shared-file patches

None. Every changed file is in the brief's owned list, and no off-limits file was touched:
`package.json`, `vite.config.ts`, `tsconfig.json`, `tests/policy.test.ts`, and `tests/guides.test.ts`
are all unmodified, and the `establish` rename broke no parity row in `tests/guides.test.ts`
(`npm run test:guides` green).

## Deviation state

One deviation, absorbed rather than stopped: SR7's prescription is not in the matrix, so the three
corrected sentences are my own prose. Recorded at the top of this report. Nothing else diverged.

## `git status --short`

```text
 M .agents/orchestration.md
 M README.md
 M ROADMAP.md
 M configs/src/vite.bin.config.ts
 M guides/README.md
 M guides/scaffold.md
 M src/bin/CLI.ts
 M src/bin/constants.ts
 M src/core/Compiler.ts
 M src/core/compilers.ts
 M src/core/templates.ts
 M src/core/types.ts
 M src/server/Materializer.ts
 M src/server/Upstream.ts
 M src/server/WriteTransaction.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/setupPolicy.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/constants.test.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/Upstream.test.ts
 M tests/src/server/WriteTransaction.test.ts
 M tests/src/server/helpers.test.ts
```

## `git diff --stat`

```text
 .agents/orchestration.md                  |  2 ++
 README.md                                 |  4 +--
 ROADMAP.md                                | 11 +++++--
 configs/src/vite.bin.config.ts            |  2 +-
 guides/README.md                          |  6 ++--
 guides/scaffold.md                        | 49 +++++++++++++++++--------------
 src/bin/CLI.ts                            |  9 +++---
 src/bin/constants.ts                      |  3 +-
 src/core/Compiler.ts                      | 12 ++++----
 src/core/compilers.ts                     |  8 ++---
 src/core/templates.ts                     |  6 ++--
 src/core/types.ts                         | 11 ++++---
 src/server/Materializer.ts                |  6 ++--
 src/server/Upstream.ts                    |  2 +-
 src/server/WriteTransaction.ts            |  6 ++--
 src/server/helpers.ts                     |  4 +--
 src/server/types.ts                       |  4 +--
 tests/setupPolicy.ts                      |  5 +++-
 tests/src/bin/CLI.test.ts                 |  2 +-
 tests/src/core/compilers.test.ts          |  4 +--
 tests/src/core/constants.test.ts          |  2 +-
 tests/src/server/Materializer.test.ts     |  2 +-
 tests/src/server/Upstream.test.ts         |  2 +-
 tests/src/server/WriteTransaction.test.ts | 27 +++++++++--------
 tests/src/server/helpers.test.ts          |  6 ++--
 25 files changed, 106 insertions(+), 89 deletions(-)
```
