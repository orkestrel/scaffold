<!-- D4-7 — implementer (Opus 5, native), scaffold prose fixes after AD4. Retained from the completion notification, 2026-09-15 (620 s, 83 tool uses). -->

## Touched files

| File | Sections changed |
|---|---|
| `.claude/rules/names.md` | § Fleet name ownership: bare-name definition takes case; new grandfather paragraph (moved in from `workspace.md`); rule 4 restated as the invariant the code obeys |
| `.claude/rules/workspace.md` | § Tooling, Policy instruments: `surface` bullet drops the identity sentence and points at `names.md` for it; grandfather bullet deleted; closure bullet keeps the general sentence and drops the vendored-instrument clause |
| `.claude/rules/tests.md` | § Shared test infrastructure absorbs the read-the-installed-surface directive; § Condition keeps only the wait-helper directive |
| `guides/README.md` | Line reference: `catalog` sentence names the mirrors; runtime bullet adds markdown to the library faces; Development bullet names the three `@orkestrel/guide` consumers and the consumer prerequisite |
| `guides/scaffold.md` | § Ownership and drift: the forms the parser accounts for and the loud refusal for the rest; § Policy setup surface promoted to `###` with a selection-rule lede and rows alphabetized within kind; § Vendored data root: new paragraph on `npm run build` as the release path and the API's own baseline routes; § Surface row order corrected (`HOST_INVENTORY_PATH`, `REFERENCE_PATHS`, `readSurfaceBaseline`, `readSurfaceCollisions`) |

`tests/guides.test.ts` was owned for transcriptions only and needed none: no transcribed fence moved.

## Diffstat

```text
 .claude/rules/names.md     |  15 +++
 .claude/rules/tests.md     |  37 +++++++-
 .claude/rules/workspace.md |  16 +++-
 guides/README.md           |  28 ++++--
 guides/scaffold.md         | 221 ++++++++++++++++++++++++++++++++++++++-------
 5 files changed, 271 insertions(+), 46 deletions(-)
```

The reading includes the inherited D4-5 and D4-6 changes to `guides/scaffold.md` and `guides/README.md`.

## Readings

| Command | Exit | Reading |
|---|---:|---|
| `npm run format:check` | 0 | 224 files, correct format |
| `npm run test:guides` | 0 | 23 passed |
| `npm run test:policy` | 0 | 102 passed |
| `git diff --check` | 0 | Clean |

Only owned files changed beyond the inherited state: `git status --porcelain` lists no added or removed path, and the untracked entries are the named standing conditions (`.orkestrel/`, `guides/supervisor.md`).

## Judged-term sweep over the added lines

Pattern (case-insensitive, whole word) `now|new|newer|latest|once|since|master|slave|simply|easy|easier|just|utilize|leverage|via|in order to|etc.|performant|robust|allows you to|and/or|please|dummy|blacklist|whitelist|should|currently|ensure|guarantee|above|below` over `git diff HEAD` added lines in the five owned files: three hits, all data and none on a line this unit authored — `` `new` `` as the verb name in `guides/README.md` and in the results table, and `"latest": "0.0.6"` inside the catalog JSON fence. No line this unit wrote matches.

## Facts checked against the code before writing

- Library faces reach contract, emitter, markdown, and template (`src/server/helpers.ts:38` imports `@orkestrel/markdown`); the executable reaches console, contract, markdown, and process.
- `@orkestrel/guide` has three consumers: `tests/guides.test.ts`, `readSurfaceCollisions` (`src/server/helpers.ts:1774`, `createRequire` load), and `tests/setupPolicy.ts:6`; it is a `devDependency`.
- `build:host` passes only `report`; `build:inventory` calls `stageHost` with no options at all, so `npm run build` reads `host.json` at the default path, refuses it absent, and can only write a record that shrinks.
- `readPolicyDeclarations` accounts for variable declarators, function, class, interface, type alias, enum, and namespace declarations, export and re-export lists, namespace re-export aliases, and relative star targets; it throws on unreadable syntax, `default`, `export =`, `export as namespace`, and non-identifier bindings, and `readPolicySurface` reports a barrel statement outside the one-line relative `.js` star form.
- `CatalogResult.membership`, `HostStageOptions.{inventory,establish,report}`, `SEED_GUIDE_PATHS`, and the `field: 'guides'` mirror question match the guide rows D4-5 and D4-6 wrote.

## Decisions recorded

- **Carrier 5 — kept the table.** The rows document a vendored surface no published specifier reaches and nothing else names, so the table stays; the heading is `###` under `## Ownership and drift`, the lede states the selection rule, and the rows are alphabetized within kind, matching every other table in the guide. Verified the rule is true: `readPolicyCatalog`, `readPolicyPackage`, and `isPolicyFile` serve the mirror and prose rules as well, so they belong outside the table.
- **Carrier 2 — `workspace.md` closure bullet.** Kept the generalized sentence "Change the code when an instrument reports a violation." and dropped the vendored-instrument clause, which R4 now owns.
- **Row order.** Corrected four rows the D4 chain inserted out of alphabetical order.

## Observations for the Orchestrator

- `npm run test:config` exits 1: `The committed host inventory is stale at .claude/agents/orkestrel.md, .claude/rules/names.md, .claude/rules/tests.md, .claude/rules/workspace.md, guides/README.md, guides/scaffold.md, tests/policy.test.ts, tests/setupPolicy.ts`. Three of those paths are inherited; five are this unit's. `host.json` is off-limits here, so the rebuild closes it.
- The reviewer's AD4 claim-11 item stands: `guides/supervisor.md` is still untracked while `host.json` declares it.

## Deviation state

None. No landed behaviour contradicted the prose I was asked to write. Spawned nothing, added no dependency, wrote no off-limits file, ran no mutating or tree-wide command.
