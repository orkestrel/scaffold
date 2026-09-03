## Lane held

**Objective** — correctness, constraints, and what the code and contracts actually permit. Recorded substitution for the dark GPT-5.6 Sol bench. I did not rule design fit, naming taste, or prose voice except where a rule makes them mechanically checkable.

## Per-claim verdicts

**1. Every row dispositioned — CONFIRMED.**
Every numbered row, both fleet rows, and all four producer carries carry a disposition in `/home/user/scaffold/tmp/units/conform/conform-database-report.md:9-38`. No row is silently skipped. `database-subj-11` (`src/core/types.ts:687`, `:699` unchanged), `fleet-F1` (`isBrowserVuePath` absent tree-wide; `src/browser/` and `tests/setupBrowser.ts` exist), and `fleet-F2` (no public `readonly id` implementation field) are `noop` with the tree reading that makes each already true. `database-subj-10` is `applied` rather than the brief's "no edit": the § Successor note makes it a carrier once the staged `@orkestrel/guide` extracts `transaction?<R>(`, and the parity row is present at `guides/database.md:343`. That is the carrier firing, not a row substituted.

**2. Applied rows implement the refuter's operative repair — REFUTED (database-obj-6).**
Every other applied row matches the operative text exactly: `src/core/Table.ts:206` (`Unlike {@link count}`), `guides/database.md:1871-1874` (verbatim parenthetical), `guides/database.md:363-370` (prescribed row), `src/core/helpers.ts:695,710,713,717,718` plus `Database.ts:23,71,86,155` and `DatabaseTransaction.ts:14,56`, `src/core/helpers.ts:1835-1837`, `src/core/index.ts:9` with `tests/guides.test.ts:86-94` and `:79-84` cleared, `src/browser/drivers/IndexedDBDriver.ts:1-19`, `guides/README.md:58`.

`database-obj-6`'s repair reads "transcribes each fence carrying a value comment and asserts it with `expect`. Cover **at minimum** the pure-helper claims…". The minimum is met; the directive is not. Three fences carrying value comments have no transcription in `tests/guides.test.ts:355-537`: `guides/database.md:1548` (`planMigration(deployed, declared) // { from: 0, to: 1, steps: [...] }`), `:1771` (`// [] — a fully conformant driver`), and `:1472-1473` (`boundary.accepting // true`, `await boundary.track(async () => 42) // 42`) — the last added by this unit itself.

**Right looks like:** add to the `flagship fences` blocks a transcription for each of those three, naming the guide line beside it, as `tests/guides.test.ts:356-360` does; each is host-independent and runs in the `guides` project. Only the `conditionToRange` / `selectPlan` claims at `guides/database.md:2376,:2383` stay excluded, as `tests/guides.test.ts:460-462` already states.

**3. No old name survives — CONFIRMED.**
Re-derived, not accepted: `(?i)resolvecolumn(s|ed|ing)?|findcolumnstorage(s|ed|ing)?|taverna(s|ed|ing)?` over `/home/user/fleet/database` excluding `node_modules` returns no hit — word-boundary and inflected forms in one pattern, over a population wider than the required paths. The writer's recorded sweeps name `src tests guides/database.md guides/README.md README.md` at `conform-database-report.md:78-80`, which is the required path set. `src/core/helpers.ts:713-723` shows the renamed declaration and both overloads; `src/server/helpers.ts:28` shows the deleted symbol's slot now opening the filesystem-classification section with no orphaned `// === Schema lookups` heading.

**4. Failing-first proofs and old-form sweeps — CONFIRMED.**
The behavioural rows carry the receipt. The consumer carries: `check` red with the `TS2322` at `tests/src/core/Database.test.ts:157` (a real narrowing assignment, `:147-162`), then green — that satisfies the addendum's "an assignment that fails under the widened type, not a green typecheck alone". `database-subj-3` and the `database-subj-10` carrier: `test:guides` `2 failed | 66 passed` → `81 passed`. `database-obj-6`: mutation control red `2 failed | 79 passed`, restored `81 passed`, with the two failures naming the mutated emitter. `database-obj-5` adds tests rather than repairing a behaviour, so no red-first receipt is derivable; its files are in the diff and collected by `vite.config.ts:47` and `:131`. The placement, naming, and documentation rows carry the sweeps ruled under claim 3.

**5. Guide parity — CONFIRMED.**
Method tables match call-signature members for every touched interface, including the added `AdmissionInterface` table (`guides/database.md:363-370` against `src/core/types.ts:163-165`) and the `DriverInterface.transaction` row. Readonly data stays in Surface rows (`AdmissionInterface.accepting` at `:257`). The removed `findColumnStorage` Surface row is gone; the added `DriverIterator` class row is at `:83` with a runnable `@example` at `src/core/DriverIterator.ts:17-30`. Each new test file has a `## Tests` row (`guides/database.md:2442-2445`). Added guide fences import the published specifier (`guides/database.md:1466`); the transcriptions correctly use `@src/*`. `§\s*[0-9]|AGENTS §` over `src/**/*.ts` and `tests/**/*.ts` returns no hit, and every remaining `§` in the three Markdown files names its section.

**6. Breaking changes named with consumers and exact edits — CONFIRMED.**
`conform-database-report.md:172-177` names `resolveColumns` → `requireColumns` (`@orkestrel/database`), `findColumnStorage` removed (`@orkestrel/database/server`), and `DriverIterator` added (additive). I re-ran the consumer sweep rather than accepting it: `findColumnStorage|resolveColumns` over `/home/user/fleet/**/{src,tests,app}/**/*.{ts,vue}` returns no hit, so "None" is the correct consumer edit for both. No other published symbol was renamed or removed — `src/core/index.ts:1-10` gains only the `DriverIterator` row, and the `RowOf` literal edit follows the landed `@orkestrel/contract` discriminant rather than moving this package's own surface.

**7. Scope and no shims — CONFIRMED.**
`/home/user/work/evidence/conform-database.status:1-43` lists only paths inside the brief's Owned row, plus `configs/browsers.ts` which the dispatch's standing condition assigns to the Orchestrator's post-exit `scaffold repair` and removes from this unit's claims. `package-lock.json`, `node_modules`, `package.json`, `.claude/**`, `scripts/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` are absent from the status file. No compatibility alias or re-export survives: the claim-3 sweep proves no `resolveColumns` or `findColumnStorage` identifier remains anywhere in the tree, so neither a renamed re-export nor a deprecated shim was left behind.

**8. Gate chain — NOT-EVIDENCED (gate run); CONFIRMED (no skip, only, todo, retry, or inflated timeout).**
No read-only lane can take the gate reading; the Orchestrator's deciding run at landing settles it. This is neither FAIL nor UNRESOLVED. The second conjunct I did rule: `\.(skip|only|todo|concurrent)\(|timeout:|testTimeout|retry:` over `tests/` returns hits only in the vendored off-limits `tests/config.test.ts:945,950` and `tests/distribution.test.ts:786,910`, plus `tests/src/server/drivers/SQLiteDriver.test.ts:1319-1320` where `timeout: 0` is a `createSQLiteDriver` option under test, not a suite timeout. The four added files carry none.

**9. Nothing hidden — REFUTED (report accuracy only).**
The residue half holds: no `TODO`, `FIXME`, `console.`, `debugger`, commented-out code, mock, spy, or fake in `tests/src/core/{DatabaseContext,DatabaseTransaction,TransactionScope}.test.ts` or `tests/src/server/factories.test.ts`; each drives real drivers over temporary paths with cleanup (`tests/src/server/factories.test.ts:16-26`). The deferrals in § Observations sit outside the rows' declared paths and patterns, so they are successor findings rather than deferred current scope.

What fails is the disposition table against the diff. `conform-database-report.md:24` records `database-obj-6` as "transcribing **every fence that states a value**". The tree contradicts it at `guides/database.md:1548`, `:1771`, and `:1472-1473`, and § Observations discloses only the two browser exclusions. **Right looks like:** after the claim-2 fix lands, restate the cell as the fences actually transcribed, and name any remaining exclusion with its reason, the way `conform-database-report.md:200` names the browser one.

## Findings outside the claims

**F1. Dangling proof reference in the report.** `conform-database-report.md:10` sends the reader to "§ Behavioural proofs" for `database-subj-2`'s executed proof, and that section (`:42-46`) has no entry for it. The proof exists — `tests/src/core/Table.test.ts:953` (`routes root, imported, and transaction table listener throws to the shared handler`, constructing the database with `error: errors.handler` at `:958`) is the executed assertion `.claude/rules/documentation.md` § Parity requires beside the rewritten prose. **Prescription:** replace the "see § Behavioural proofs" pointer in that cell with `tests/src/core/Table.test.ts:953`, or add the row to § Behavioural proofs with that file:line. No code change.

## Referrals to the Orchestrator

- **R1 (subjective lane).** `tests/src/server/factories.test.ts:22` declares `jsonPath()` and `:79` uses it for the SQLite database path. The behaviour is correct — `tempDatabasePath` is format-neutral — but the helper name misdescribes both call sites. Naming fit is not mine to adjudicate.
- **R2 (scope ruling).** § Observations defers `now` in `guides/database.md` and `via` in `tests/**` to a successor on the ground that `database-subj-8` fixes its paths at `src/**/*.ts` and `guides/database.md` and its pattern carries no `now`. I read that as correct against the row as written. Whether a successor carrier exists for those two sets is a plan decision.
- **R3 (record only).** `conform-database-report.md:152-158` states `git status --short -- configs/browsers.ts` was empty, while the supplied status and diff list the file modified. The dispatch's standing condition attributes the modification to a post-exit `scaffold repair`, so the report was true when written. Record it in the verdict file so a later reader does not reopen it as a scope breach.

## Claims attacked and held

Attacked by re-derivation rather than by reading the distillate's reading: claims 3 and 6 (patterns re-run over wider populations than the report declares), claim 7 (status read directly), claim 8's second conjunct, claim 5's parity and citation sweeps, claim 9's residue and mock sweep over the added files, and claim 2 row by row against each operative repair text. Claims 3, 5, 6, 7, and 9's residue half survived the attack. Claim 2 did not, at `database-obj-6`.

VERDICT: FAIL 2, 9; outside the claims: F1
