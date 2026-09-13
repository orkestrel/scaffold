# Grok check distillate — u-fix-5-check (Cursor Grok 4.6, session ed56113d-4f57-4f10-8259-da1555e083bf, journal tmp/cursor/u-fix-5-check.jsonl)

I'll read the brief and the orchestration contract so I know which posture this session takes and what the check asks for.This is a read-only mechanical check. I'll load the prescribed briefs and the files at `e158702`, then fill the tables from those readings.I'll pull the prescribed replacements, the files at `e158702`, the amended sentence sources, and the exact grep/git readings next.HEAD is not `e158702`, so I'll read that commit's trees with `git show` and pull the source evidence files next.Owned files at `e158702` match the working tree. Next I’ll read the sentence sources and extract every ROADMAP token.Confirming owned files at `e158702` match the tree those greps read. Tables and command readings only.

## (1) Prescribed replacements at `e158702`

| id | prescribed | in file | mark |
| --- | --- | --- | --- |
| A.1 | `A generated workspace on Node 22.18.0 or later therefore meets an npm that ignores the record only under an npm other than the bundled one.` | `guides/scaffold.md:1460-1461` `A generated workspace on Node 22.18.0 or later therefore meets an npm that ignores the record only under an npm other than the bundled one.` | EXACT |
| A.2 | `Run a generated workspace on npm 11.6.0 or later: every release from 10.9.0 up to 11.6.0 refuses it, and 11.6.0 installs it.` | `guides/scaffold.md:1461-1462` `Run a generated workspace on npm 11.6.0 or later: every release from 10.9.0 up to 11.6.0 refuses it, and 11.6.0 installs it.` | EXACT |
| A.3 | `Raise it with the \`npm install --global npm@11.6.0\` command before the first install; that command installs an npm that reports 11.6.0.` | `guides/scaffold.md:1463-1465` `Raise it with the \`npm install --global npm@11.6.0\` command before the first install; that command installs an npm that reports 11.6.0.` | EXACT |
| B | `Raise it with the \`npm install --global npm@11.6.0\` command before the first install.` | `README.md:67-68` `Raise it with the \`npm install --global npm@11.6.0\` command before the first install.` | EXACT |
| C.vitest | `the \`vitest\` package alone` | `ROADMAP.md:374` `the \`vitest\` package alone` | EXACT |
| C.boundary-path | `the \`.orkestrel/campaign/evidence/linux-gate/npm-boundary-readings.log.txt\` file` | `ROADMAP.md:379` `the \`.orkestrel/campaign/evidence/linux-gate/npm-boundary-readings.log.txt\` file` | EXACT |
| C.devEngines-clause | `carries the \`devEngines.packageManager\` record at the \`>=11.6.0\` range with the \`onFail\` key set to the \`error\` value` | `ROADMAP.md:383-385` `carries the \`devEngines.packageManager\` record at the \`>=11.6.0\` range with the \`onFail\` key set to the \`error\` value` | EXACT |
| C.engines-clause | `the \`engines.npm\` field and the \`engine-strict\` setting were measured` | `ROADMAP.md:386-388` `The \`engines.npm\` field and the \`engine-strict\` setting were measured` | EXACT |
| C.10.9.0-on | `An npm at 10.9.0 or later reads` | `ROADMAP.md:388-389` `An npm at 10.9.0 or later reads` | EXACT |
| C.beneath | `earlier than the floor` | `ROADMAP.md:386` `earlier than the floor` | EXACT |
| C.added-row | `- **scaffold**: the \`matchesEngines\` summary cell in \`guides/scaffold.md\` reads "at or above the supported minimum"; the direction vocabulary is \`earlier\` and \`later\`, and the parity contract ties the cell to the export's description paragraph in the \`src/core/\` tree, so the repair moves the source and re-emits the \`dist/src\` tree. Ruled on 2026-09-13.` | `ROADMAP.md:431-434` `- **scaffold**: the \`matchesEngines\` summary cell in \`guides/scaffold.md\` reads "at or above the supported minimum"; the direction vocabulary is \`earlier\` and \`later\`, and the parity contract ties the cell to the export's description paragraph in the \`src/core/\` tree, so the repair moves the source and re-emits the \`dist/src\` tree. Ruled on 2026-09-13.` | EXACT |
| D | delete `An npm that does not read the record fails inside dependency resolution instead.` | `src/core/constants.ts:494-500` `@remarks` has no such sentence | ABSENT |
| 5b.src:server | `under the \`src:server\` project` | `ROADMAP.md:400` `under the \`src:server\` project` | EXACT |
| 5b.ollama.sh | `the \`scripts/ollama.sh\` script` | `ROADMAP.md:447` `the \`scripts/ollama.sh\` script` | EXACT |

## (2) Sentence map (amended `u-fix-4` § Sentences)

### `guides/scaffold.md` § Generated workspace, toolchain paragraph (`guides/scaffold.md:1451-1466`)

| sentence | entry | source lines | mark |
| --- | --- | --- | --- |
| `Every generated manifest declares the toolchain it is gated on.` | 1 | `src/core/compilers.ts:580` `devEngines: WORKSPACE_DEV_ENGINES,` ; `src/core/compilers.ts:581` `engines: { node: blueprint.engines },` | CARRIED |
| `The \`engines.node\` field carries the blueprint's \`engines\` value, which defaults to the \`>=22.18.0\` range.` | 2 | `src/core/constants.ts:479-480` `MINIMUM_NODE_VERSION = '22.18.0'` ; `src/core/constants.ts:488-489` `DEFAULT_ENGINES = \`>=${MINIMUM_NODE_VERSION}\`` ; `src/core/compilers.ts:581` `engines: { node: blueprint.engines },` ; `src/core/factories.ts:61` `engines: input?.engines ?? DEFAULT_ENGINES,` | CARRIED |
| `The \`devEngines.packageManager\` record names npm at the \`>=11.6.0\` range with its \`onFail\` key set to the \`error\` value, and no blueprint field varies that record.` | 3 | `src/core/constants.ts:482-483` `MINIMUM_NPM_VERSION = '11.6.0'` ; `src/core/constants.ts:502-507` `packageManager` `name: 'npm'` `version: \`>=${MINIMUM_NPM_VERSION}\`` `onFail: 'error'` ; `src/core/compilers.ts:580` `devEngines: WORKSPACE_DEV_ENGINES,` | CARRIED |
| `An npm at 10.9.0 or later reads that record.` | 4 (amended: + `devengines-interval.log.txt`) | `devengines-floor.log.txt:9-10` `10.9.0` / `10.9.3` `refused=yes` ; `devengines-interval.log.txt:19-34` each listed release `refused=yes` ; `npm-boundary-readings.log.txt:40-42` `ambient` / `11.5.0` `refused=yes`, `11.6.0` `guard` `exit=0` | CARRIED |
| `Such an npm earlier than 11.6.0 refuses the \`npm install\` command in a generated workspace with the \`EBADDEVENGINES\` code, before resolving the dependency graph.` | 5 (amended: + `devengines-interval.log.txt`) | `devengines-floor.log.txt:9-10` `code=EBADDEVENGINES` ; `devengines-interval.log.txt:18-34` header `[10.9.0, 11.6.0)` and each `refused=yes` ; `npm-boundary-readings.log.txt:40-41` `refused=yes` | CARRIED |
| `npm 10.9.7 refuses an \`npm run\` command in such a workspace with the same code.` | 6 | `path-prepend.log.txt:6-9` `### ambient npm, nested run` `npm error code EBADDEVENGINES` `exit=1` | CARRIED |
| `The releases measured earlier than 10.9.0, npm 10.5.0 and npm 10.8.3, ignore the record and fail inside dependency resolution instead.` | 7 | `devengines-floor.log.txt:7-8` `10.5.0` / `10.8.3` `guard` `refused=no` `crash=yes` ; `devengines-floor.log.txt:12-13` `10.5.0` / `10.8.3` `plain` `crash=yes` | CARRIED |
| `Every Node release at 22.18.0 or later bundles an npm at 10.9.0 or later.` | 8 | `node-index-floor.log.txt:1-2` `lowest bundled npm across every release at or after v22.18.0` `lowest npm: 10.9.0 at v23.3.0` | CARRIED |
| `A generated workspace on Node 22.18.0 or later therefore meets an npm that ignores the record only under an npm other than the bundled one.` | 8 (amended: bound to Node 22.18.0 or later, no actor) | `node-index-floor.log.txt:1-2` (lowest bundled npm `10.9.0`) ; `devengines-floor.log.txt:7-8` (`10.5.0` / `10.8.3` `refused=no`) ; `devengines-floor.log.txt:9-10` (`10.9.0` / `10.9.3` `refused=yes`) | CARRIED |
| `Run a generated workspace on npm 11.6.0 or later: every release from 10.9.0 up to 11.6.0 refuses it, and 11.6.0 installs it.` | 9 (amended wording) | `devengines-floor.log.txt:9-10` ; `devengines-interval.log.txt:18-37` ; `npm-boundary-readings.log.txt:29` `npm 11.6.0    clean` ; `npm-boundary-readings.log.txt:38` `11.6.0    plain            exit=0` `added 69 packages` ; `npm-boundary-readings.log.txt:42` `11.6.0    guard            exit=0` `added 69 packages` | CARRIED |
| `Read the ambient version with the \`npm --version\` command.` | 10 (amended: later-release dropped) | `remedy-control.log.txt:1` `ambient npm 10.9.7 on node v22.22.2` | CARRIED |
| `Raise it with the \`npm install --global npm@11.6.0\` command before the first install; that command installs an npm that reports 11.6.0.` | 10 (amended: later-release dropped) | `remedy-control.log.txt:4-5` `exit=0` `installed npm self-reports: 11.6.0` | CARRIED |
| `The npm readings come from a Linux host on Node 22.22.2, on 2026-09-13, and the bundled versions come from the Node release index read that day.` | 11 | `devengines-floor.log.txt:1` `on node v22.22.2` ; `devengines-interval.log.txt:1` `on node v22.22.2; registry read 2026-09-13` ; `node-index-floor.log.txt:1` `nodejs.org/dist/index.json read 2026-09-13` | WIDER-THAN-SOURCE: `Linux host` |

### `README.md` § Notes, first paragraph (`README.md:61-69`)

| sentence | entry | source lines | mark |
| --- | --- | --- | --- |
| `The \`scaffold new\` command generates a workspace that declares an npm floor of 11.6.0 in its \`devEngines\` record.` | 3 | `src/core/constants.ts:482-483` `MINIMUM_NPM_VERSION = '11.6.0'` ; `src/core/constants.ts:502-507` `WORKSPACE_DEV_ENGINES` ; `src/core/compilers.ts:580` `devEngines: WORKSPACE_DEV_ENGINES,` | WIDER-THAN-SOURCE: `The \`scaffold new\` command generates a workspace that` |
| `An npm at 10.9.0 or later and earlier than 11.6.0 refuses the \`npm install\` command there with the \`EBADDEVENGINES\` code, before resolving the dependency graph.` | 5 (amended: + interval) | `devengines-floor.log.txt:9-10` ; `devengines-interval.log.txt:18-34` ; `npm-boundary-readings.log.txt:40-41` | CARRIED |
| `npm 10.5.0 and npm 10.8.3, the releases measured earlier than 10.9.0, ignore the record and fail inside dependency resolution instead.` | 7 | `devengines-floor.log.txt:7-8` ; `devengines-floor.log.txt:12-13` | CARRIED |
| `No Node release the executable supports bundles an npm earlier than 10.9.0.` | 8 (README form in `u-fix-4` item B) | `node-index-floor.log.txt:1-2` `at or after v22.18.0` `lowest npm: 10.9.0` ; `src/core/constants.ts:479-480` `MINIMUM_NODE_VERSION = '22.18.0'` | CARRIED |
| `Read the ambient version with the \`npm --version\` command.` | 10 (amended) | `remedy-control.log.txt:1` `ambient npm 10.9.7 on node v22.22.2` | CARRIED |
| `Raise it with the \`npm install --global npm@11.6.0\` command before the first install.` | 10 (amended) | `remedy-control.log.txt:4-5` `exit=0` `installed npm self-reports: 11.6.0` | CARRIED |
| `These readings come from a Linux host, on 2026-09-13.` | 11 (README form: no Node version) | `devengines-interval.log.txt:1` `registry read 2026-09-13` ; `node-index-floor.log.txt:1` `read 2026-09-13` | WIDER-THAN-SOURCE: `Linux host` |

### `WORKSPACE_DEV_ENGINES` `@remarks` (`src/core/constants.ts:494-500`)

| sentence | entry | source lines | mark |
| --- | --- | --- | --- |
| `Every generated manifest names npm at the {@link MINIMUM_NPM_VERSION} floor with the \`onFail\` key set to the \`error\` value, and no blueprint field varies that record.` | 3 | `src/core/constants.ts:482-483` `MINIMUM_NPM_VERSION = '11.6.0'` ; `src/core/constants.ts:502-507` `name: 'npm'` `version: \`>=${MINIMUM_NPM_VERSION}\`` `onFail: 'error'` ; `src/core/compilers.ts:580` `devEngines: WORKSPACE_DEV_ENGINES,` | CARRIED |
| `An npm at 10.9.0 or later reads the \`devEngines\` record.` | 4 (amended) | `devengines-floor.log.txt:9-10` ; `devengines-interval.log.txt:19-34` ; `npm-boundary-readings.log.txt:40-42` | CARRIED |
| `Such an npm earlier than the floor refuses an install in a generated workspace rather than resolving its dependency graph.` | 5 (amended: refusal, no code, nothing of 7) | `devengines-floor.log.txt:9-10` `refused=yes` `crash=no` ; `devengines-interval.log.txt:19-34` `refused=yes` `crash=no` ; `npm-boundary-readings.log.txt:40-41` `refused=yes` `crash=no` | CARRIED |
| `The neighbouring \`DEFAULT_ENGINES\` constant is the Node range, and a blueprint's \`engines\` field does replace that one.` | — | `src/core/constants.ts:488-489` `DEFAULT_ENGINES` ; `src/core/constants.ts:499-500` (the sentence itself) ; `src/core/compilers.ts:581` `engines: { node: blueprint.engines },` ; `src/core/factories.ts:61` `engines: input?.engines ?? DEFAULT_ENGINES,` | NO-ENTRY |

## (3) Command readings

`grep -n 'or a later release' README.md guides/scaffold.md`

```
(empty stdout)
```

exit 1

`grep -n 'does not read the record' src/core/constants.ts`

```
(empty stdout)
```

exit 1

`grep -c 'Node [0-9.]* or later' README.md`

```
1
```

exit 0

`grep -n -i -E '\b(below|above|older|newer|beneath)\b|from 10\.9\.0 on' ROADMAP.md`

```
159:  or above 1.030, and the admission rule is median ≤ 0.95 with every replicate ≤ 0.98 on the target
163:  edit: a `below` cross-reference in the membership section's load-order precondition, a `both`
431:- **scaffold**: the `matchesEngines` summary cell in `guides/scaffold.md` reads "at or above the
543:  rewrite a tree whose `.package-lock.json` is newer than the lockfile; rule
```

exit 0

`git show --name-only --format=%h e158702`

```
e158702

.orkestrel/campaign/evidence/linux-gate/final-verify6.log.txt
.orkestrel/campaign/evidence/linux-gate/final-verify6.sh
.orkestrel/campaign/evidence/linux-gate/final6.status.txt
.orkestrel/campaign/u-fix-5-integrate-report.md
.orkestrel/campaign/u-fix-5-report.md
.orkestrel/campaign/u-fix-5b-brief.md
README.md
ROADMAP.md
guides/scaffold.md
host.json
src/core/constants.ts
```

`git diff 0834f2a..e158702 --stat -- . ':(exclude).orkestrel'`

```
 README.md             |  2 +-
 ROADMAP.md            | 36 +++++++++++++++++++++---------------
 guides/scaffold.md    |  8 ++++----
 host.json             |  4 ++--
 src/core/constants.ts |  3 +--
 5 files changed, 29 insertions(+), 24 deletions(-)
```

## (4) Backticked tokens in `**scaffold**` rows under `ROADMAP.md:364`

| file:line | token | following word | noun |
| --- | --- | --- | --- |
| `ROADMAP.md:372` | `#loadPeerSet` | step | YES |
| `ROADMAP.md:373` | `@npmcli/arborist` | package | YES |
| `ROADMAP.md:373` | `node.parent` | dereference | YES |
| `ROADMAP.md:374` | `vitest` | package | YES |
| `ROADMAP.md:375` | `@types/node` | package | YES |
| `ROADMAP.md:377` | `.orkestrel/campaign/evidence/linux-gate/devengines-floor.log.txt` | file | YES |
| `ROADMAP.md:379` | `.orkestrel/campaign/evidence/linux-gate/npm-boundary-readings.log.txt` | file | YES |
| `ROADMAP.md:383` | `devEngines.packageManager` | record | YES |
| `ROADMAP.md:384` | `>=11.6.0` | range | YES |
| `ROADMAP.md:384` | `onFail` | key | YES |
| `ROADMAP.md:385` | `error` | value | YES |
| `ROADMAP.md:386` | `engines.npm` | field | YES |
| `ROADMAP.md:387` | `engine-strict` | setting | YES |
| `ROADMAP.md:389` | `devEngines` | record | YES |
| `ROADMAP.md:392` | `.orkestrel/campaign/evidence/linux-gate/devengines-floor.log.txt` | file | YES |
| `ROADMAP.md:394` | `22.18.0` | where | NO |
| `ROADMAP.md:396` | `test` | script | YES |
| `ROADMAP.md:396` | `&&` | chain | YES |
| `ROADMAP.md:397` | `scaffold/package.json` | (none; `,`) | NO |
| `ROADMAP.md:397` | `toolbox/package.json` | (none; `,`) | NO |
| `ROADMAP.md:398` | `ollama/package.json` | so | NO |
| `ROADMAP.md:400` | `tests/src/server/helpers.test.ts` | file | YES |
| `ROADMAP.md:400` | `src:server` | project | YES |
| `ROADMAP.md:407` | `src/core/constants.ts` | file | YES |
| `ROADMAP.md:407` | `@types/node` | range | YES |
| `ROADMAP.md:409` | `22.18.0` | floor | YES |
| `ROADMAP.md:410` | `target: 'node22'` | for | NO |
| `ROADMAP.md:411` | `src/core/templates.ts:169` | (none; `,`) | NO |
| `ROADMAP.md:411` | `:200` | and | NO |
| `ROADMAP.md:412` | `:284` | which | NO |
| `ROADMAP.md:413` | `@types/node` | range | YES |
| `ROADMAP.md:417` | `@orkestrel/probe` | package | YES |
| `ROADMAP.md:418` | `@orkestrel/sqlite@0.0.11` | release | YES |
| `ROADMAP.md:418` | `@orkestrel/queue` | and | NO |
| `ROADMAP.md:419` | `@orkestrel/database` | packages | YES |
| `ROADMAP.md:420` | `^22.18.0 \|\| >=24.4.0` | so | NO |
| `ROADMAP.md:420` | `24.0.0` | through | NO |
| `ROADMAP.md:420` | `24.3.x` | installs | NO |
| `ROADMAP.md:421` | `EBADENGINE` | warning | YES |
| `ROADMAP.md:422` | `engine-strict` | setting | YES |
| `ROADMAP.md:423` | `24.4.0` | and | NO |
| `ROADMAP.md:424` | `@orkestrel/sqlite` | package | YES |
| `ROADMAP.md:425` | `supportsMappedLoopback` | predicate | YES |
| `ROADMAP.md:426` | `tests/setupServer.ts` | module | YES |
| `ROADMAP.md:427` | `@orkestrel/test/server` | entry | YES |
| `ROADMAP.md:428` | `supportsBytes` | (none; `,`) | NO |
| `ROADMAP.md:428` | `supportsCase` | (none; `,`) | NO |
| `ROADMAP.md:428` | `supportsDirectoryLinks` | (none; `,`) | NO |
| `ROADMAP.md:429` | `supportsFileLinks` | and | NO |
| `ROADMAP.md:429` | `supportsMode` | siblings | YES |
| `ROADMAP.md:431` | `matchesEngines` | summary | NO |
| `ROADMAP.md:431` | `guides/scaffold.md` | reads | NO |
| `ROADMAP.md:432` | `earlier` | and | NO |
| `ROADMAP.md:432` | `later` | and | NO |
| `ROADMAP.md:433` | `src/core/` | tree | YES |
| `ROADMAP.md:434` | `dist/src` | tree | YES |
| `ROADMAP.md:436` | `tests/setupServer.test.ts` | file | YES |
| `ROADMAP.md:437` | `EAFNOSUPPORT` | constant | YES |
| `ROADMAP.md:437` | `supportsMappedLoopback` | predicate | YES |
| `ROADMAP.md:439` | `resolveTool` | helper | YES |
| `ROADMAP.md:439` | `tests/setupServer.ts` | file | YES |
| `ROADMAP.md:440` | `executeOllamaSetup` | helper | YES |
| `ROADMAP.md:443` | `setsid` | command | YES |
| `ROADMAP.md:443` | `timeout` | command | YES |
| `ROADMAP.md:444` | `tests/src/server/helpers.test.ts` | file | YES |
| `ROADMAP.md:446` | `OLLAMA_TOOLS` | constant | YES |
| `ROADMAP.md:447` | `scripts/ollama.sh` | script | YES |
| `ROADMAP.md:448` | `executeOllamaSetup` | doc | YES |
| `ROADMAP.md:448` | `host` | and | NO |
| `ROADMAP.md:449` | `provisionNpm` | doc | YES |
| `ROADMAP.md:449` | `host npm` | where | NO |
| `ROADMAP.md:450` | `ambient` | whether | NO |
| `ROADMAP.md:450` | `provisionNpm` | or | NO |
| `ROADMAP.md:451` | `resolveNpm` | name | YES |
| `ROADMAP.md:453` | `guides/scaffold.md` | file | YES |
| `ROADMAP.md:453` | `devEngines` | record | YES |
| `ROADMAP.md:455` | `tests/guides.test.ts` | file | YES |
| `ROADMAP.md:455` | `tests/guides.test.ts` | file | YES |
| `ROADMAP.md:457` | `engines.node` | field | YES |
| `ROADMAP.md:457` | `package.json` | to | NO |
| `ROADMAP.md:457` | `MINIMUM_NODE_VERSION` | constant | YES |
| `ROADMAP.md:458` | `src/core/constants.ts` | Ruled | NO |
