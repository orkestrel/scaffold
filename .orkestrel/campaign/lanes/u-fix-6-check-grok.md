# Grok check distillate — u-fix-6-check (Cursor Grok 4.6, session 22d4cbe4-7212-4aea-8ea7-d5f6929975f8, journal tmp/cursor/u-fix-6-check.jsonl)

I'll gather the two briefs, the `ROADMAP.md` snapshot at `72ba0dd`, and the two git readings, then fill the tables from those sources only.The first git command was blocked; I’ll retry the two readings and pull the `**scaffold**` rows from the `ROADMAP.md` snapshot.I’ll extract the backticked tokens from the matrix `**scaffold**` rows and retry the scoped diff reading.## (1) Replacements

| Brief | Item | Prescribed | At `72ba0dd` | Mark |
|---|---|---|---|---|
| `.orkestrel/campaign/u-fix-6-brief.md:19` | 1 | `node floor 22.18.0, where` | `ROADMAP.md:394` `node floor 22.18.0, where` | EXACT |
| `.orkestrel/campaign/u-fix-6-brief.md:20-22` | 2 | `(the \`scaffold/package.json\` file, the \`toolbox/package.json\` file, and the \`ollama/package.json\` file)` | `ROADMAP.md:397-398` `(the \`scaffold/package.json\` file, the \`toolbox/package.json\` file,` / `and the \`ollama/package.json\` file)` | EXACT |
| `.orkestrel/campaign/u-fix-6-brief.md:23` | 3 | `pin the \`target: 'node22'\` setting for` | `ROADMAP.md:410` `pin the \`target: 'node22'\` setting for` | EXACT |
| `.orkestrel/campaign/u-fix-6-brief.md:24-25` | 3 | `(the \`src/core/templates.ts\` file at lines 169, 200, and 284)` | `ROADMAP.md:411-412` `(the \`src/core/templates.ts\` file at lines` / `169, 200, and 284)` | EXACT |
| `.orkestrel/campaign/u-fix-6-brief.md:26-27` | 4 | `through the \`@orkestrel/queue\` package and the \`@orkestrel/database\` package` | `ROADMAP.md:418-419` `through the \`@orkestrel/queue\` package and the` / `\`@orkestrel/database\` package` | EXACT |
| `.orkestrel/campaign/u-fix-6-brief.md:28-29` | 4 | `declares the \`^22.18.0 \|\| >=24.4.0\` range, so Node 24.0.0 through 24.3.x installs` | `ROADMAP.md:419-420` `declares the` / `\`^22.18.0 \|\| >=24.4.0\` range, so Node 24.0.0 through 24.3.x installs` | EXACT |
| `.orkestrel/campaign/u-fix-6-brief.md:29-30` | 4 | `names 24.4.0, and` | `ROADMAP.md:423` `names 24.4.0, and` | EXACT |
| `.orkestrel/campaign/u-fix-6-brief.md:31-34` | 5 | `the \`supportsBytes\` predicate, the \`supportsCase\` predicate, the \`supportsDirectoryLinks\` predicate, the \`supportsFileLinks\` predicate, and the \`supportsMode\` predicate` | `ROADMAP.md:428-430` `the \`supportsBytes\` predicate, the` / `\`supportsCase\` predicate, the \`supportsDirectoryLinks\` predicate, the \`supportsFileLinks\`` / `predicate, and the \`supportsMode\` predicate` | EXACT |
| `.orkestrel/campaign/u-fix-6-brief.md:35-44` | 6 | `- **scaffold**: the direction vocabulary for a version is "earlier" and "later", and the shipped guide departs from it in the \`matchesEngines\` summary cell in the \`guides/scaffold.md\` file ("at or above the supported minimum") and in that file's prose at lines 1166 ("the older release"), 1200 ("A newer major"), 1234 ("a floor below the newest release"), and 1235 ("a newer major"). The parity contract ties the cell to the export's description paragraph in the \`src/core/\` tree, so the cell's repair moves the source and re-emits the \`dist/src\` tree; the prose repairs move the vendored guide alone. Ruled on 2026-09-13.` | `ROADMAP.md:432-438` `- **scaffold**: the direction vocabulary for a version is "earlier" and "later", and the` / `shipped guide departs from it in the \`matchesEngines\` summary cell in the \`guides/scaffold.md\`` / `file ("at or above the supported minimum") and in that file's prose at lines 1166 ("the older` / `release"), 1200 ("A newer major"), 1234 ("a floor below the newest release"), and 1235 ("a` / `newer major"). The parity contract ties the cell to the export's description paragraph in the` / `\`src/core/\` tree, so the cell's repair moves the source and re-emits the \`dist/src\` tree; the` / `prose repairs move the vendored guide alone. Ruled on 2026-09-13.` | EXACT |
| `.orkestrel/campaign/u-fix-6-brief.md:46-47` | 7 | `names its endpoint parameter with the \`host\` name and uses the same word for the machine` | `ROADMAP.md:452-453` `names its endpoint parameter with the \`host\` name and uses` / `the same word for the machine` | EXACT |
| `.orkestrel/campaign/u-fix-6-brief.md:48-49` | 7 | `reads "host npm" where the rest of that block reads "ambient"` | `ROADMAP.md:453-454` `reads "host npm" where the rest of` / `that block reads "ambient"` | EXACT |
| `.orkestrel/campaign/u-fix-6-brief.md:49-50` | 7 | `whether the \`provisionNpm\` name or the \`resolveNpm\` name carries` | `ROADMAP.md:454` `whether the \`provisionNpm\` name or the \`resolveNpm\` name carries` | EXACT |
| `.orkestrel/campaign/u-fix-6-brief.md:51-53` | 7 | `in the \`package.json\` file to the \`MINIMUM_NODE_VERSION\` constant in the \`src/core/constants.ts\` file. Ruled` | `ROADMAP.md:461-462` `in the \`package.json\` file to the \`MINIMUM_NODE_VERSION\`` / `constant in the \`src/core/constants.ts\` file. Ruled` | EXACT |
| `.orkestrel/campaign/u-fix-6b-brief.md:12-13` | 6b | `declares a 22.18.0 floor` | `ROADMAP.md:409` `declares a 22.18.0 floor` | EXACT |

## (2) Backticked tokens in `**scaffold**` rows under `ROADMAP.md:364`

| file:line | token | follows | noun |
|---|---|---|---|
| ROADMAP.md:372 | `#loadPeerSet` | step | YES |
| ROADMAP.md:373 | `@npmcli/arborist` | package | YES |
| ROADMAP.md:373 | `node.parent` | dereference | YES |
| ROADMAP.md:374 | `vitest` | package | YES |
| ROADMAP.md:375 | `@types/node` | package | YES |
| ROADMAP.md:377 | `.orkestrel/campaign/evidence/linux-gate/devengines-floor.log.txt` | file | YES |
| ROADMAP.md:379 | `.orkestrel/campaign/evidence/linux-gate/npm-boundary-readings.log.txt` | file | YES |
| ROADMAP.md:383 | `devEngines.packageManager` | record | YES |
| ROADMAP.md:384 | `>=11.6.0` | range | YES |
| ROADMAP.md:384 | `onFail` | key | YES |
| ROADMAP.md:384 | `error` | value | YES |
| ROADMAP.md:386 | `engines.npm` | field | YES |
| ROADMAP.md:387 | `engine-strict` | setting | YES |
| ROADMAP.md:389 | `devEngines` | record | YES |
| ROADMAP.md:392 | `.orkestrel/campaign/evidence/linux-gate/devengines-floor.log.txt` | file | YES |
| ROADMAP.md:396 | `test` | script | YES |
| ROADMAP.md:396 | `&&` | chain | YES |
| ROADMAP.md:397 | `scaffold/package.json` | file | YES |
| ROADMAP.md:397 | `toolbox/package.json` | file | YES |
| ROADMAP.md:398 | `ollama/package.json` | file | YES |
| ROADMAP.md:400 | `tests/src/server/helpers.test.ts` | file | YES |
| ROADMAP.md:400 | `src:server` | project | YES |
| ROADMAP.md:407 | `src/core/constants.ts` | file | YES |
| ROADMAP.md:407 | `@types/node` | range | YES |
| ROADMAP.md:410 | `target: 'node22'` | setting | YES |
| ROADMAP.md:411 | `src/core/templates.ts` | file | YES |
| ROADMAP.md:413 | `@types/node` | range | YES |
| ROADMAP.md:417 | `@orkestrel/probe` | package | YES |
| ROADMAP.md:418 | `@orkestrel/sqlite@0.0.11` | release | YES |
| ROADMAP.md:418 | `@orkestrel/queue` | package | YES |
| ROADMAP.md:419 | `@orkestrel/database` | package | YES |
| ROADMAP.md:420 | `^22.18.0 \|\| >=24.4.0` | range | YES |
| ROADMAP.md:421 | `EBADENGINE` | warning | YES |
| ROADMAP.md:422 | `engine-strict` | setting | YES |
| ROADMAP.md:424 | `@orkestrel/sqlite` | package | YES |
| ROADMAP.md:425 | `supportsMappedLoopback` | predicate | YES |
| ROADMAP.md:426 | `tests/setupServer.ts` | module | YES |
| ROADMAP.md:427 | `@orkestrel/test/server` | entry | YES |
| ROADMAP.md:428 | `supportsBytes` | predicate | YES |
| ROADMAP.md:429 | `supportsCase` | predicate | YES |
| ROADMAP.md:429 | `supportsDirectoryLinks` | predicate | YES |
| ROADMAP.md:429 | `supportsFileLinks` | predicate | YES |
| ROADMAP.md:430 | `supportsMode` | predicate | YES |
| ROADMAP.md:433 | `matchesEngines` | summary | YES |
| ROADMAP.md:433 | `guides/scaffold.md` | file | YES |
| ROADMAP.md:437 | `src/core/` | tree | YES |
| ROADMAP.md:437 | `dist/src` | tree | YES |
| ROADMAP.md:440 | `tests/setupServer.test.ts` | file | YES |
| ROADMAP.md:441 | `EAFNOSUPPORT` | constant | YES |
| ROADMAP.md:441 | `supportsMappedLoopback` | predicate | YES |
| ROADMAP.md:443 | `resolveTool` | helper | YES |
| ROADMAP.md:443 | `tests/setupServer.ts` | file | YES |
| ROADMAP.md:444 | `executeOllamaSetup` | helper | YES |
| ROADMAP.md:447 | `setsid` | command | YES |
| ROADMAP.md:447 | `timeout` | command | YES |
| ROADMAP.md:448 | `tests/src/server/helpers.test.ts` | file | YES |
| ROADMAP.md:450 | `OLLAMA_TOOLS` | constant | YES |
| ROADMAP.md:451 | `scripts/ollama.sh` | script | YES |
| ROADMAP.md:452 | `executeOllamaSetup` | doc | YES |
| ROADMAP.md:452 | `host` | name | YES |
| ROADMAP.md:453 | `provisionNpm` | doc | YES |
| ROADMAP.md:454 | `provisionNpm` | name | YES |
| ROADMAP.md:454 | `resolveNpm` | name | YES |
| ROADMAP.md:457 | `guides/scaffold.md` | file | YES |
| ROADMAP.md:457 | `devEngines` | record | YES |
| ROADMAP.md:459 | `tests/guides.test.ts` | file | YES |
| ROADMAP.md:459 | `tests/guides.test.ts` | file | YES |
| ROADMAP.md:461 | `engines.node` | field | YES |
| ROADMAP.md:461 | `package.json` | file | YES |
| ROADMAP.md:461 | `MINIMUM_NODE_VERSION` | constant | YES |
| ROADMAP.md:462 | `src/core/constants.ts` | file | YES |
| ROADMAP.md:545 | `scripts/deps.sh` | rewrites | NO |
| ROADMAP.md:545 | `node_modules` | only | NO |
| ROADMAP.md:546 | `CLAUDE_CODE_REMOTE` | , | NO |
| ROADMAP.md:547 | `.package-lock.json` | is | NO |
| ROADMAP.md:548 | `scaffold audit --offline` | prints | NO |
| ROADMAP.md:548 | `integration` | advisory | YES |
| ROADMAP.md:549 | `tests/integration.test.ts` | file | YES |
| ROADMAP.md:550 | `.agents/orchestration.md` | § | NO |
| ROADMAP.md:551 | `followons.md:16` | ) | NO |
| ROADMAP.md:552 | `tests/distribution.test.ts` | generator | YES |
| ROADMAP.md:552 | `isObject` | from | NO |
| ROADMAP.md:553 | `@orkestrel/contract` | ; | NO |
| ROADMAP.md:553 | `tests/guides.test.ts` | drop-in | NO |
| ROADMAP.md:555 | `.claude/rules/tests.md` | states | NO |
| ROADMAP.md:557 | `unknown` | , | NO |
| ROADMAP.md:559 | `followons.md:20` | , | NO |
| ROADMAP.md:559 | `:45` | , | NO |
| ROADMAP.md:559 | `:49` | , | NO |
| ROADMAP.md:559 | `:60` | , | NO |
| ROADMAP.md:560 | `conform-html-audit-verdict.md:26` | , | NO |
| ROADMAP.md:560 | `conform-relation-audit-verdict.md:21` | ) | NO |
| ROADMAP.md:561 | `beforeWriteFile` | branch | YES |
| ROADMAP.md:561 | `configs/src/vite.server.config.ts:5-19` | is | NO |
| ROADMAP.md:562 | `since` | at | NO |
| ROADMAP.md:562 | `tests/distribution.test.ts:28` | is | NO |
| ROADMAP.md:562 | `because` | ; | NO |
| ROADMAP.md:563 | `policy/no-nested-functions` | in | NO |
| ROADMAP.md:563 | `.oxlintrc.json` | covers | NO |
| ROADMAP.md:563 | `tests/**` | or | NO |
| ROADMAP.md:564 | `src/**` | and | NO |
| ROADMAP.md:564 | `app/**` | scope | YES |
| ROADMAP.md:564 | `followons.md:30` | , | NO |
| ROADMAP.md:564 | `:48` | , | NO |
| ROADMAP.md:565 | `:54` | , | NO |
| ROADMAP.md:565 | `conform-guide-audit-verdict.md:26` | ) | NO |

## (3) Version numbers in backticks; below / above / older / newer / beneath

| file:line | item |
|---|---|
| ROADMAP.md:384 | `11.6.0` inside `` `>=11.6.0` `` |
| ROADMAP.md:418 | `0.0.11` inside `` `@orkestrel/sqlite@0.0.11` `` |
| ROADMAP.md:420 | `22.18.0` inside `` `^22.18.0 \|\| >=24.4.0` `` |
| ROADMAP.md:420 | `24.4.0` inside `` `^22.18.0 \|\| >=24.4.0` `` |
| ROADMAP.md:434 | above — QUOTED `"at or above the supported minimum"` |
| ROADMAP.md:434 | older — QUOTED `"the older release"` |
| ROADMAP.md:435 | newer — QUOTED `"A newer major"` |
| ROADMAP.md:435 | below — QUOTED `"a floor below the newest release"` |
| ROADMAP.md:436 | newer — QUOTED `"a newer major"` |
| ROADMAP.md:547 | newer |

## (4) Readings

`git show --name-only --format=%h 72ba0dd`

```
72ba0dd

.orkestrel/campaign/evidence/linux-gate/final-verify7.log.txt
.orkestrel/campaign/evidence/linux-gate/final-verify7.sh
.orkestrel/campaign/evidence/linux-gate/final7.status.txt
.orkestrel/campaign/u-fix-6-integrate-brief.md
.orkestrel/campaign/u-fix-6-integrate-report.md
.orkestrel/campaign/u-fix-6-report.md
.orkestrel/campaign/u-fix-6b-brief.md
ROADMAP.md
```

`git diff a6023fb..72ba0dd --stat -- . ':(exclude).orkestrel'`

```
 ROADMAP.md | 50 +++++++++++++++++++++++++++-----------------------
 1 file changed, 27 insertions(+), 23 deletions(-)
```
