## Lane held

Subjective design lane (shape, vocabulary, ergonomics, design fit). I ran no commands and edited nothing; every reading below is from files I opened read-only.

---

## Design

**Recommendation: `test:guides` becomes a vendored Node entry that converges first and then runs the existing `guides` Vitest project in-process.** `scripts/docs.ts` is renamed and re-pointed rather than rewritten, the guides test file is untouched, and `@orkestrel/guide` gains no export.

### The command surface

```text
npm run test:guides                 # report drift, write nothing, run the gate
npm run test:guides -- --to guide   # rewrite the guide side, report what stands, run the gate
npm run test:guides -- --to source  # rewrite the source side, report what stands, run the gate
usage: npm run test:guides [-- --to guide|--to source]
```

The generated script becomes `node --experimental-strip-types scripts/guides.ts`, replacing `vitest run --config vite.config.ts --no-cache --reporter=dot --project guides` (`src/core/compilers.ts:351`) and replacing the retired `docs` row (`src/core/compilers.ts:352`). The `--experimental-strip-types` invocation form is the one the vendored seed already uses, so the Node floor question is the floor the fleet already ships against.

### The entry's shape

`scripts/guides.ts` keeps today's control flow and appends one stage:

1. **Parse.** `--to guide` or `--to source` selects `direction`; anything else prints usage and exits 2 before any read or write. This is the existing gate at `scripts/docs.ts:362`, unchanged, so an invalid flag can never reach a write.
2. **Read.** Inventory, `guides/README.md`, missing-input lines, exit 2 with no launch. Existing behavior at `scripts/docs.ts:371`.
3. **Converge.** Rows, `reportRow` or `writeGuide` or `writeSource`, the pitch pair, one flush of the `texts` map, the `wrote <file>` lines, the tally, and the `next: npm run format` hint. Carried over unchanged, including the single seeded-and-rewritten `texts` map (`scripts/docs.ts:384`) that is what keeps a source file two guides document from losing an update.
4. **Prove.** `createVitest('test', { project: ['guides'], watch: false, reporters: ['dot'] })`, `start()`, read the returned `TestRunResult`, `close()` in `finally`, and set `process.exitCode` from the run. Root's retained probe drove exactly this public trio and read a passed module state, so the launch mechanism is the probed one and no private Vitest chunk is imported.

**The run owns the verdict.** The converge stage prints; it does not decide the exit status except for the usage and missing-input cases that exit 2 today. One command, one verdict, and no way for the printed report and the gate to disagree.

**The fresh read is structural, not arranged.** The writes complete and the process flushes them before Vitest boots, and `tests/guides.test.ts` reads its inventory at module scope inside the worker (`tests/guides.test.ts:50`). Convergence is therefore evaluated against the bytes on disk, by the assertions that already exist.

### Ownership map

| Concern | Owner | Why there |
| --- | --- | --- |
| Comparison and replacement leaves | `@orkestrel/guide`, unchanged | `findDrift`, `replaceCell`, `replaceSummary`, `replaceExample`, `locateComment`, `spliceSpan`, `collectTitles`, `selectModuleKeys` already carry the whole contract the seed composes |
| Key-to-doc-block resolution, inventory reading, writes | The vendored entry | Host filesystem work, and Guide publishes only `src/core` |
| The assertions | `tests/guides.test.ts`, package-owned, unchanged | Ruling 32 retains equality, surface, member, example, and pitch checks |
| Vendored path, script emission, propagation | scaffold canon | `HOST_PATHS`, `blueprintToScripts`, `blueprintToWritableScripts`, `host.json` |

No parity engine is duplicated: the entry composes Guide's exported leaves, and the gate calls `findDrift` directly. Neither reimplements the other.

### Vocabulary

Keep every term the seed already established, because the guides test's failure output and the command's output are read as one worklist (`tests/guides.test.ts:171`):

- `direction`, with the values `guide` and `source`. A real discriminant naming which side is rewritten, not a decorative label and not a boolean.
- `--to <side>`, the owner's spelling, and it reads as English at the call site.
- The line shape `<spec> <key>: guide <text> source <text>`, with `; <reason>` appended for a refusal.
- The refusal reasons, verbatim: `the guide fence owns an example`, `the source side carries no text`, `no Summary cell carries the key`, `no doc block carries the key`, `the doc block refused the rewrite`, `the README pitch is authored by hand`. These are the boundary statements G3 asks for, and they already exist as one term per condition.
- `wrote <file>`, the tally line, and `next: npm run format`.

Renames: `DOCS_SEED_PATH` â†’ `GUIDES_SEED_PATH = 'scripts/guides.ts'`, which reads beside `GUIDES_TEST_PATH` (`src/core/constants.ts:313`) and names the same subject the script names. The vendored file's own header comment stops calling itself "the documentation-parity seed run as `npm run docs`" and calls itself the guides entry.

### Per-claim reasoning

**G1 â€” the exact commands select a direction before Vitest parses.** They do, because Vitest no longer parses them. npm hands `--to guide` to `node scripts/guides.ts`, the entry consumes it, and the argv it builds for `createVitest` is its own. The CACError the root run produced is a property of the bare `vitest` script, and the script stops being bare. Failure status comes from the returned run result rather than from a spawned exit code, and `close()` in `finally` releases the Vite server. Private chunk imports are refused: `vitest/node` is the public face and `createVitest` its published member.

**G2 â€” one owner, no duplicated engine.** Guide's public contract does not move. The judgment behind that: the resolution logic is host-bound (it reads and writes files and indexes root-relative keys), Guide ships no server environment, and adding one to hold this would be a new environment, a new build target, and a new barrel for one consumer. The vendored-file mechanism already gives the fleet one implementation of that logic, which is what "one shared engine" asks for.

**G3 â€” writes are bounded and repeatable.** Only the selected side is written; the direction boundary stands, so `--to guide` still refuses an example fence and says so. Invalid flags exit before the inventory read. Shared files flush once from the in-place map. After convergence a second run finds no drift, writes nothing, and passes â€” the entry's own idempotence and the gate's agreement are the same reading. Real controls, all runnable in the scratch fixture that already spawns the seed (`tests/src/core/compilers.test.ts:2204`): a workspace with no `guides/README.md`; an index row naming an absent spec; a drift whose source side is absent; a drift whose key no `Summary` cell carries; a titled fence whose doc block cannot be located; an unchanged file that must not be rewritten; and the same command run twice.

**G4 â€” generation and propagation.** Canonical sites: `src/core/constants.ts` (the constant, its TSDoc, and the `HOST_PATHS` member at line 143), `src/core/compilers.ts` (script emission at lines 350â€“353, and the `docs` special case in `blueprintToWritableScripts` at line 451, which the `test:` prefix rule makes unnecessary), `host.json`, and the vendored file itself. Migration rides scaffold's existing channel: give `test:guides` an `accepted` predecessor holding the former `vitest run â€¦ --project guides` string, so `repair` replaces a generated predecessor and leaves an author-customized command alone. Removal rides the audit's existing verdict: after the rename, a target's `scripts/docs.ts` is `foreign` (`src/core/types.ts:47`), reported with its observed bytes and removable bound to them â€” no broad deletion. The dead `docs` manifest key is removed by hand in the same per-target visit, because `replaceManifestScripts` writes and appends and never removes, and teaching it removal is scope this change does not need. A workspace without guides is unaffected: it keeps the vendored file as a candidate and gains no script, exactly as today. Guide's own checkout stays sound because the published gate chain builds before it tests, which is the same rule the guide already states for the seed.

**G5 â€” fit with the tarball pass.** This change moves scaffold's published surface and does not move Guide's, so it costs one scaffold release and no consumer bump. Guide's revalidation obligation is unchanged by it. Targets re-pin scaffold, run `repair`, drop the retired path and the dead key, and re-run their gates â€” the propagation the wave already performs.

---

## Alternatives

**Converge inside the run, from a vendored `globalSetup`.** The entry would shrink to argv parsing plus a launch, pass `direction` through `provide`, and a globalSetup module would do the reading and writing before the pool starts. Its genuine advantage: in Guide's own checkout the writes and the assertions would use the same readers, because a globalSetup module loads through the Vite alias graph that maps `@orkestrel/guide` to `src/core/index.ts` (`tsconfig.json:25`), while a plain Node entry resolves it through the `exports` map to `dist/`. It loses on everything else: a second vendored file, a change to the vendored `guides` project template (`src/core/templates.ts:337`), a setup module that raises scaffold's own uncovered-setup-module question in every target unless its proof is vendored too, and mutation moved inside a test run where `npm test` must never mutate. The recommended design keeps mutation outside the runner and answers the resolution split with the gate chain's existing build-before-test order.

**Give Guide a rewrite capability.** A `Rewriter` in a new `@orkestrel/guide/server`, with the entry reduced to argv and IO. Cleanest conceptually â€” the key-to-doc-block resolution is Guide domain knowledge, not scaffold's. It loses on cost and timing: a new published environment, a Guide surface change inside a pass whose Guide artifact is already being revalidated against preserved baselines, and a public API added ahead of the consumer count that justifies it. The recommended design reaches the same single-implementation property through vendoring, which the fleet already relies on.

---

## Constraints

Not my lane (objective).

## Refusals

Not my lane (objective).

## Measurements

Not my lane (objective). The readings my design rests on, and which lane supplied them, are named under Tensions.

---

## Units

Ordered; scaffold units share one checkout, so they run serially with disjoint owned files.

**U1 â€” the vendored entry.** Role `sol`, engine Sol. Owns `scripts/guides.ts` (new) and the deletion of `scripts/docs.ts`. Depends on nothing. Accepts when: the file typechecks and lints in scope; parse, converge, and launch stages appear in that order; the refusal reason strings and the report line shapes are byte-identical to the retired seed's; `createVitest`/`start`/`close` is the only Vitest entry used and `close()` sits in `finally`; the exit status derives from the run result for every non-usage, non-missing-input case.

**U2 â€” canonical generation.** Role `sol`, engine Sol. Owns `src/core/constants.ts`, `src/core/compilers.ts`, `host.json`. Depends on U1's path. Accepts when: `GUIDES_SEED_PATH` names the new path and `HOST_PATHS` carries it in place of the old; `blueprintToScripts` emits `test:guides` as the Node entry for a guides blueprint and emits no `docs` key; `blueprintToWritableScripts` carries `test:guides` with the former command as an accepted predecessor and needs no `docs` special case; `host.json` is regenerated before any gate that reads it.

**U3 â€” scaffold's own proofs.** Role `sol`, engine Sol. Owns `tests/src/core/compilers.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/server/helpers.test.ts`, `tests/distribution.test.ts`. Depends on U1 and U2. Accepts when: the scratch fixture drives the real command for the default, `--to guide`, `--to source`, invalid-flag, missing-index, absent-spec, and run-twice cases and asserts the files each did and did not write; the vendored-path assertions name the new path; the vendored-import control set still passes; the retained fixture carries a negative control that reports failure.

**U4 â€” scaffold prose.** Role `implementer`, engine Opus 5. Owns `guides/scaffold.md`, `.claude/rules/documentation.md`, and the comments in scaffold's `tests/guides.test.ts`. Depends on U2. Accepts when: the guide's seed section, its surface row, and its command reference describe the entry and its stages; the rule's convergence sentence names the new command; no authored file in the checkout names `npm run docs` or `scripts/docs.ts`; the parity gate passes.

**U5 â€” Guide checkout.** Role `implementer`, engine Opus 5, run after scaffold's tarball reaches that checkout. Owns Guide's `package.json` script row, its `guides/guide.md` sentences, and its guides-test comments. Accepts when: the checkout's own `npm run test:guides -- --to source` converges and its gate chain passes.

**U6 â€” fleet carrier sweep.** Role `grok`, engine Cursor Grok. Read-only. Returns every occurrence of the retired command and path across the fleet's targets with `file:line`, so the wave visit has a complete list before it starts. Runs in parallel with U1.

**U7 â€” gates.** Role `verifier`, engine Sonnet. Per checkout, after integration.

---

## Tensions

Named for the objective lane to challenge, or for the Orchestrator to rule.

- **The reader split in Guide's own checkout.** A plain Node entry imports the built readers; the guides test imports the aliased source. I ruled that the published gate chain's build-before-test order settles it and the guide states the rule, as it already does for the retired seed. Settling command: in Guide, edit a reader, skip the build, and run `npm run test:guides -- --to source`, then compare against the same run after `npm run build`.
- **The launch's option set.** I chose `{ project: ['guides'], watch: false, reporters: ['dot'] }` and let the config supply the rest. Whether the retired script's `--no-cache` has a `CliOptions` equivalent worth carrying is unread. Settling command: the throwaway probe that already drove `createVitest`, re-run with the candidate option object against the real `guides` project.
- **Where the converge stage's helpers live.** I kept them module-scope inside the self-contained vendored entry, under the placement exception the file already records. The alternative is exported, separately tested helpers, which needs a second vendored module and inverts the `scripts/` to `tests/` direction. Ruling wanted if the exception's wording does not reach an entry that now imports `vitest/node`.
- **The predecessor constant's name.** `GUIDES_PREDECESSOR_COMMAND` beside `RELEASE_PROOF_COMMAND`, versus deriving the string where the script command is composed. Low stakes; name it once and do not spell the literal twice.
- **A reading the dispatch did not supply.** Whether an oxfmt pass after a `--to source` write can reopen drift. `findDrift` collapses whitespace per the documentation contract, so I designed on the assumption that it cannot, and the entry keeps printing the format hint rather than formatting. Settling command: converge a real workspace with `--to source`, run `npm run format`, then re-run `npm run test:guides` and read the result.

---

## Risks

- **The gate's boot cost moves into every `npm test`.** The entry adds a Node start and a Vitest boot in one process instead of one bare Vitest run. Evidence to settle: wall-clock of `npm run test:guides` before and after, taken on an idle host by the Orchestrator rather than inside a unit.
- **A target left half-migrated.** A target that re-pins scaffold and runs `repair` gains the new script while keeping a dead `docs` key and a foreign `scripts/docs.ts`. Evidence to settle: `scaffold audit` on one migrated target, read for the foreign finding and the manifest region's report, before the visit is repeated across the fleet.
- **The scratch fixture cannot reach the launch stage.** The existing fixture links the installed readers into a bare scratch tree; the launch stage needs a resolvable Vitest, a config, and a guides project there. If that proves too heavy, the launch stage's proof falls back to the real checkout and the fixture covers converge alone â€” which leaves the stage that owns the exit status proven only in place. Evidence to settle: attempt the fixture with the links added, and read whether the boot completes inside the project's timeout.
- **Guide's revalidation reads a moved scaffold.** The wave revalidates lower layers against preserved baselines while scaffold's vendored set changes underneath. Evidence to settle: confirm from the rebuilt artifacts that this change moves scaffold's `dist/host` alone and leaves `dist/src` material content unmoved, so the obligation is a scaffold release and no consumer bump.