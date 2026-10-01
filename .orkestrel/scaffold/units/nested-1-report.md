Implemented the callback admission. All required gates pass. The regression command, `npm run test:config`, changed from 8 failed, 174 passed, and 1 skipped to 182 passed and 1 skipped, with 183 tests collected in both runs.

Files changed by this continuation:

- `configs/policy.ts`: added the readonly, nullable AST `elements` field; implemented the literal climb; removed the anonymity and visitor predicates; updated the diagnostic and description; preserved module-placement behavior.
- `tests/config.test.ts`: corrected the inner-binding expectation to line 3, column 13. No other bytes changed from the continuation's starting state.
- `AGENTS.md`: replaced the nested-function law sentence.
- `.claude/rules/architecture.md`: stated the admitted positions, climb, and refusals.
- `.claude/rules/workspace.md`: replaced the visitor exception with the returned-object callback description.
- `.agents/skills/orkestrel-harden/references/centralization.md`: updated the callback sentence.
- `host.json`: regenerated through `npm run build`; changed only the edited files' inventory digests and the aggregate digest relative to the starting snapshot.
- `tmp/units/nested-1-report.md`: replaced the previous report. Supporting snapshots, audit scripts, and the failed config-run journal remain under `tmp/units/nested-1-*`.

Changed or deleted predicates and their callers:

- `functionToPolicyPosition`: climbs parentheses, non-computed `init` property values with `method === false`, and array elements, repeatedly.
- `isPolicyCallback`: admits arrow and named or anonymous function expressions whose climbed position is a call or constructor argument.
- `isPolicyResult`: admits those expressions whose climbed position is a return argument or arrow body.
- `isPolicyAnonymous`: deleted after confirming its only readers were the callback and result predicates.
- `isPolicyVisitor`: deleted because the returned-object admission covers its visitor callbacks.
- `reportNested`: removed the visitor-specific exception.
- `reportFunction`: retained its prior anonymous, direct-position admission so the broader nested-function admission does not admit route-table functions into data files.

The tester confirms that Oxlint exposes `Property.computed`: the climb refuses `computed === true`, and `create({ [key]: () => 1 })` remains reported. No key-shape fallback was needed. The user's event-map example passes. Local bindings, declarations, spread, computed keys, accessor-body bindings, and the inner binding inside an admitted callback remain reported. The inner-binding case emits only its diagnostic at line 3, column 13. The unchanged lint-population proof passes with its local-binding violation still reported.

Tester case counts measured from the `no-nested-functions` block are:

| State | Valid | Invalid |
| --- | ---: | ---: |
| Before the original unit | 6 | 7 |
| Continuation start | 12 | 11 |
| Finished continuation | 12 | 11 |

Command results follow. Repeated runs are recorded in order within each row. The formatter commands used the exact file list `configs/policy.ts tests/config.test.ts AGENTS.md .claude/rules/architecture.md .claude/rules/workspace.md .agents/skills/orkestrel-harden/references/centralization.md`, represented by `<owned files>` in the table.

| Command | Exit codes | Test count or result |
| --- | --- | --- |
| `npm run test:config` — recorded pre-fix baseline | 1 | 183 collected: 8 failed, 174 passed, 1 skipped |
| `node tmp/units/nested-1-state.ts capture` | 0 | none; captured starting hashes, owned bytes, status, and diff stat |
| `npx tsc --noEmit --project tsconfig.json` | 0, 0, 0, 0 | none; contract-first check and each implementation revision |
| `npx oxfmt --config .oxfmtrc.json --write <owned files>` | 0, 0, 0 | none |
| `npx oxlint --config .oxlintrc.json configs tests/config.test.ts` | 1, 0, 0 | none; nullable-array spelling corrected |
| `npm run build` | 0, 0 | none; each build regenerated inventory with 196 entries |
| `npm run test:config` — intermediate, through capped launcher | 1 | 183 collected: 1 failed, 181 passed, 1 skipped; route-table placement control |
| `npm run test:config` — final | 0 | 183 collected: 182 passed, 1 skipped |
| `npm run test:policy` | 0 | 113 collected and passed |
| `npm run lint:check` | 0 | none; no diagnostics |
| `npx oxfmt --config .oxfmtrc.json --check <owned files>` | 0 | none |
| `node tmp/units/nested-1-state.ts compare` | 0 | none; no changes outside the owned set |
| `git diff --check` | 0 | none |
| `git status --porcelain`, `git diff --stat`, and scoped `git diff` reads | 0 | none |
| `git diff --no-index -- <starting snapshot> <owned file>` for AGENTS, workspace law, config tests, and inventory | 1 each | none; expected differences, inspected in full |
| `node tmp/units/nested-1-audit.ts` | 0 | none; tester counts and no substitution hits in the edited law prose |
| `Get-Content`, `rg`, `Get-Command`, and `Get-Item` evidence reads | 0 | none |

After the last policy edit, the successful sequence was formatter write, root typecheck, scoped lint, build, config tests, policy tests, whole-tree lint, and formatter check. Both builds preceded their config runs.

The capped invocation was `node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/units/nested-1-config.log --errors tmp/units/nested-1-config.err --cap 300 -- node C:/Users/mikes/scoop/apps/nodejs-lts/current/bin/node_modules/npm/bin/npm-cli.js run test:config`. It exited 1 without reaching its cap, after 7346 ms. Both journal files were read without filtering.

Deviations resolved within the owned files:

- Expected: scoped lint passes. Found: `configs/policy.ts:23:22` reported `typescript(array-type)` for `readonly (PolicyExpression | null)[]`. Done: used `ReadonlyArray<PolicyExpression | null>` and restarted formatting, typecheck, and scoped lint. Hypothesis confirmed: the lint rule requires the generic spelling for a union element.
- Expected: the callback change preserves module-placement behavior. Found: the config test `rejects a property-held arrow in a route table` expected a diagnostic and received none. Done: retained the original direct-position and anonymity conditions in `reportFunction`, rebuilt the inventory, and reran the gate sequence successfully. Hypothesis confirmed: `reportFunction` shares the broadened callback and result predicates. Its existing test was preserved unchanged.
- The attempted report replacement used a delete and an add targeting the same path in one patch. The patch tool refused that shape before changing the file. The report was rewritten with one update patch.

Unresolved deviations: none. Build and config output include the API Extractor warning about bundled TypeScript 5.9.3 versus project TypeScript 6.0.3; the build also reports that explicit output settings override `build.lib.formats`. Both commands exit 0.

Starting status and diff stat are recorded in `tmp/units/nested-1-start.status` and `tmp/units/nested-1-start.stat`. The final hash comparison preserves earlier campaign changes, including `.orkestrel/scaffold/`. No agents were spawned, packages installed, or commits created. `ROADMAP.md` item 9 is unchanged. Remaining implementation work: none.
