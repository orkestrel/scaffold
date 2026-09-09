Objective lane held: correctness, authority, placement, and failure behavior.

## Proposal

Make [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/guides.test.ts) the native command entry and the Vitest worker module. Emit this manifest command:

```text
node --experimental-strip-types tests/guides.test.ts
```

The file has these execution paths:

- The native entry path runs when `process.env.VITEST !== 'true'`. It validates no arguments or the exact `--to guide` and `--to source` forms, dynamically imports `vitest/node`, provides the selected target, starts the `guides` project, inspects its public result, and closes the runner in `finally`.
- The worker path runs when `process.env.VITEST === 'true'`. It dynamically imports `vitest`, all aliases, Guide helpers, and package-specific dependencies. It reads the selected target only through `inject('target')`. It never reads `process.argv` for rewrite authority.

The direct-entry probe establishes the branch, dynamic alias loading, provided context, result inspection, and closure ([probe test:11](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/test-entry-probe/tests/guides.test.ts:11), [probe test:25](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/test-entry-probe/tests/guides.test.ts:25), [probe test:34](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/test-entry-probe/tests/guides.test.ts:34), [probe test:37](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/test-entry-probe/tests/guides.test.ts:37)). Root’s changed-value control failed the named worker case, and restoration passed it. The entry instrument is falsifiable.

Do not claim support across the declared Node floor from that reading. The measurement used Node 24.20.0.

## Per-claim reasons

### G1

The native path intercepts npm’s forwarded `--to` argument before Vitest’s normal CAC parser. Invalid arguments print the usage line, set exit `2`, and return before `createVitest` or any write.

For a valid invocation, `createVitest` must select the existing `guides` project with watch and cache disabled. The native path passes `{ target }` only when the command carries an explicit direction. The worker defaults to parity-only behavior when `inject('target')` returns `undefined`. An ordinary Vitest invocation therefore cannot authorize a rewrite through inherited process arguments or an environment direction variable.

The native path must treat these results as failure:

- no collected module;
- an unhandled error;
- any module state other than `passed`;
- an exception during runner creation or start.

After runner creation, `close()` belongs in `finally`. Do not call `process.exit()`. Raise `process.exitCode` without weakening an existing failure.

This satisfies Ruling 34’s direct ownership and default non-mutation requirements ([rulings.md:233](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/rulings.md:233)).

### G2

The worker must complete rewrite planning and writes before it constructs the final `files` inventory and registers assertions.

Use this authority matrix:

| Target | Authority | Writable parity text |
| --- | --- | --- |
| absent | none | none |
| `guide` | source TSDoc | matched `Summary` cells and matched titled guide fences |
| `source` | guide text | matched TSDoc descriptions and matched titled `@example` blocks |

For `--to guide`, use `replaceCell` for summaries and `replaceFence` for examples. `replaceFence` rewrites the same initial titled fence that `findDrift` compares and leaves later same-title fences outside the population ([helpers.ts:2717](C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:2717), [helpers.ts:2741](C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:2741)).

For `--to source`, use `locateComment`, `replaceSummary`, `replaceExample`, and `spliceSpan`. A missing authority value, location miss, or replacer refusal records a reason and leaves that drift unchanged.

Plan against the initial inventory in a mutable text map. Each later edit reads the text left by earlier edits. Flush only texts whose bytes changed. Then read inventory again, rebuild manifest rows, report remaining drift, and construct every existing assertion from those fresh bytes.

Keep these failures outside automatic repair:

- surface or member bijection drift;
- missing guide or source authority;
- missing source comment location;
- a replacer refusal;
- unmatched examples outside `findDrift`;
- README pitch disagreement.

The README pitch remains authored separately because neither target names the README/tagline pair. Its existing assertion stays ([tests/guides.test.ts:204](C:/Users/mikes/WebstormProjects/scaffold/tests/guides.test.ts:204)).

### G3

Add no Guide API. Use these existing exports:

- `findDrift`, `parseManifest`, `collectExamples`, `collectKeys`, `collectTitles`, and `computeSymbolKey`;
- `createGuide`, `createSource`, `extractSourceLines`, and `selectModuleKeys`;
- `locateComment`, `normalizeComment`, and `spliceSpan`;
- `replaceCell`, `replaceFence`, `replaceExample`, and `replaceSummary`.

Guide’s comparison already limits example pairing to the initial fence and source example carrying the same title ([helpers.ts:2392](C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:2392)). Keep filesystem work in the test file; core remains host-independent ([AGENTS.md:30](C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md:30)).

Keep runtime imports loader-safe:

- Static imports: only Node modules needed before branch selection.
- Native dynamic import: `vitest/node`.
- Worker dynamic imports: `vitest`, `@orkestrel/guide`, `@orkestrel/contract`, `@orkestrel/test`, `@orkestrel/test/server`, `@src/core`, `vite`, the bin modules, and `tests/setupServer.ts`.

Declare an optional `target` property through Vitest’s `ProvidedContext` augmentation. Use type-only import queries for reusable local types so native Node resolves no worker alias.

Put test registration in a module-scope `registerGuides` function rather than lexically inside the environment branch. This preserves asynchronous worker-only loading without presenting every `describe` and `it` call as a conditional test. The owner’s placement instruction is a narrow exception to the normal setup-helper rule: rewrite helpers, local row types, and command composition remain in this test file. Do not generalize that exception or create `tests/setupGuides.ts`.

### G4

Keep `GUIDES_TEST_PATH`; it already names `tests/guides.test.ts` ([constants.ts:316](C:/Users/mikes/WebstormProjects/scaffold/src/core/constants.ts:316)).

Remove:

- `GUIDES_ENTRY_PATH`;
- its `HOST_PATHS` membership;
- `scripts/guides.ts`;
- its host inventory row;
- its surface and guide documentation;
- compiler and distribution assertions that expect the launcher.

Change `blueprintToScripts` to emit:

```text
node --experimental-strip-types ${GUIDES_TEST_PATH}
```

Keep the released direct-Vitest command as the accepted generated predecessor in `blueprintToWritableScripts` ([compilers.ts:445](C:/Users/mikes/WebstormProjects/scaffold/src/core/compilers.ts:445)). Do not add the rejected, unreleased launcher command as a retirement artifact. A customized `test:guides` command must remain untouched.

Do not add `tests/guides.test.ts` to `HOST_PATHS`. Its presence selects the project, but the package owns its cases. Scaffold must neither create nor overwrite that file.

Leave `RETIRED_HOST_PATHS` and Materializer unchanged. Its exact `scripts/docs.ts` row remains ([constants.ts:161](C:/Users/mikes/WebstormProjects/scaffold/src/core/constants.ts:161)), and Materializer already adds that exact path only when its group is selected ([Materializer.ts:650](C:/Users/mikes/WebstormProjects/scaffold/src/server/Materializer.ts:650)). The rejected launcher was never released and needs no tombstone.

The existing `guides` Vite project already targets the required test file. No setup-file or Vite-template change is needed.

## Exact ownership

The bounded implementation unit owns:

- `tests/guides.test.ts`;
- `src/core/constants.ts`;
- `src/core/compilers.ts`;
- `scripts/guides.ts` removal;
- `package.json` command integration while preserving owner toolchain edits;
- `host.json`;
- focused compiler, constants, distribution, and guide-parity assertions;
- `guides/scaffold.md`;
- `.claude/rules/documentation.md` where launcher wording remains.

The unit must not change:

- Guide public source or declarations;
- `RETIRED_HOST_PATHS`;
- Materializer retirement logic or tests except stale launcher expectations;
- package-owned executable guide cases beyond loader-safe import restructuring;
- package-lock dependency state;
- fleet packages or publication state.

Assign the bounded writer to `implementer` on Sol. Keep the required independent design-fit review on Opus. Root owns reconciliation and acceptance.

## Controls and gates

Add or retain direct test coverage for:

- exact argument parsing;
- default absence of a rewrite target;
- source-authoritative summary and titled-fence replacement;
- guide-authoritative summary and titled-example replacement;
- changed-only flushing and shared-file accumulation;
- fresh post-write inventory;
- missing authority, location miss, replacer refusal, and structural drift;
- README pitch remaining report-only;
- public result failure and runner closure.

Run these actual-command controls in the direct checkout:

```text
npm run test:guides
npm run test:guides -- --to guide
npm run test:guides -- --to source
npm run test:guides -- --invalid
```

The guide and source commands need controlled planted drift and exact before/after bytes. The guide case must include a summary and matched titled fence. The source case must include a summary and matched titled example. Restore only the planted bytes after each control. The default and invalid cases must show no file movement.

Reuse predecessor evidence only for unchanged result inspection, closure, shared-text ordering, changed-only writes, fresh rereading, and `scripts/docs.ts` retirement. The final direct checkout still needs the repository gate chain because command placement, imports, and the test module changed.

## Risks

- A remaining static worker alias import makes native Node fail before branch selection.
- Reading direction from `process.argv` inside the worker lets inherited runner arguments authorize writes.
- Registering tests lexically inside the environment branch may trigger conditional-test policy or discovery drift.
- Reusing the pre-write `files` or `inspected` value makes assertions certify stale bytes.
- Loading package source before `--to source` finishes can leave runtime imports older than the file inventory. Import package-specific runtime modules after rewriting and rereading.
- Treating `--to guide` examples as report-only contradicts Ruling 34; matched examples must use `replaceFence`.
- Removing the existing `scripts/docs.ts` tombstone reopens released-host cleanup. Removing only the unreleased launcher must not touch that safeguard.

