# Unit J-ORACLE-RECORD, round 2 — close the reader's gaps, own-property lookups, and the oracle's vocabulary

Successor of `j-oracle-record-brief.md`, whose sections stand except where this brief replaces them.
- Round 1 is committed as `9ea360d` on `unit/oracle-record`.
- The worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-record` is clean there, apart from its ignored `tmp/`.

## Why

The audit ruled `VERDICT: FAIL 1, 3, 7, 9, 11, 14` (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-record-audit-verdict.md`). Read the verdict, both lanes' verdicts it names, and `decisions.md` § E28 with its amendment of 2026-09-25. The verdict is the list of what this round carries. Every upheld finding is an obligation below.

## The obligations

- **O-R1: own-property labels.** The element map `readPluginState` and `inferPluginState` build holds every label as an own property. An authored `id="__proto__"` must survive serialization. `collectEngineDepartures` and every other lookup by label use `Object.hasOwn`, so a label such as `constructor` reports an absent element instead of throwing. Add a case for each of those two labels, each read red on round 1's source.
- **O-R2: one evaluation per reading.** `settlePluginState` reads its motion check and the state in one `page.evaluate`, so no change falls between them. Its TSDoc names the oracle's limits: shadow trees, engine work scheduled past the quiet interval, inline styles and geometry, non-reflected form state, and hit testing.
- **O-R3: the added facets (E28 amended).**
  - Each element's own text: its direct text nodes, whitespace collapsed.
  - Each element's parent, by label.
  - The settled scroll offsets of the document and of each labelled element that scrolls.

  `collectEngineDepartures` reports a difference in each facet, and `EngineFacet` names each one.
  - Re-record every fixture with `ORACLE_REFRESH=1`. `button.json` stays byte-identical.
  - Re-run the census, and report every departure the new facets add.
  - Add a mutation row per new facet: a wrong tooltip title, a menu appended to another parent, and a ScrollSpy destination off by a section.
- **O-R4: the case matrix.** Move the scenario and recording matrix from `tests/setupServer.test.ts` into `tests/setupServer.ts`, per `tests.md`.
- **O-R5: the vocabulary.**
  - `PluginEngine` becomes `PluginLibrary`, and the `engine` member and parameter become `library`. "Engine" keeps Veneer's sense in every comment.
  - `PluginFixture` becomes `PluginRecording`, and its `version` is documented as the tracked Bootstrap release for either library's recording.
  - `PluginReading` becomes `PluginReport`, and `inferPluginState`'s parameter becomes `report`.
  - The facet literal `'visible'` becomes `'visibility'`.
  - `compileVeneerRuntime`'s `plugins` parameter becomes `transforms`.
  - `driveOracleBrowser` becomes `launchOracleBrowser`.
  - `ORACLE_OMITTED_ATTRIBUTES` and `ORACLE_REFERENCE_ATTRIBUTES` become `PLUGIN_OMITTED_ATTRIBUTES` and `PLUGIN_REFERENCE_ATTRIBUTES`.
  - Update every consumer and the export list. Leave no alias.
- **O-R6: the shapes.**
  - `PluginAction` becomes a discriminated union on `gesture`. Retire the run-time refusal and its case.
  - The conformance case reads the fixture through `readPluginFixture`, and `scanPluginFixture` takes the recording type.
  - `readPluginState` takes the spawned selectors, not the scenario.
- **O-R7: the TSDoc.** Replace `recordPluginOracle`'s fairness remark with this sentence: "Both libraries load the same page and receive the same trusted input for every gesture. A `call` action and the setup run each library's own script, so the two recordings differ only in the library and those scripts." Name the members where "both" counts a set.
- **O-R8: clean-up.** `launchOracleBrowser` destroys its scratch directory when the launch or the scratch acquisition fails, and when `browser.close()` rejects.
- **O-R9: the seams and the instrument.**
  - Add a case that passes a transform to `compileVeneerRuntime` and reads its effect in the compiled script.
  - Assert each plugin attribute table frozen.
  - Fix your instrument's classifier so that it reads the failed suites before it counts a kill, and add a row proving the refusal: a kill beside a failed suite is refused.
  - Keep the instrument's TypeScript plant file beside its Python runner in `tmp/j-oracle/`.

Keep the file's `@throws When …` form. J-THROWS carries that sweep.

## Scope

- **Owned:** round 1's owned files, and `tmp/j-oracle/`. These are the styles session's files, and it agreed to the hunks (D49). The Orchestrator tells it what round 2 changes.
- **Off-limits:** as round 1. That includes the vendored `configs/**`: the repeated build pattern stays, and the scaffold carries it.

## Standing conditions

Veneer `main` has moved since `0865c67`. The styles session's E-RECEIPTS added hunks to `tests/setupServer.ts` and `tests/setupServer.test.ts`. Do not merge `main`. The Orchestrator merges at the landing, by hunk.

## Output

Your final message holds:
- the files touched;
- the renamed and added declarations, with their signatures;
- each red reading on round 1's source, verbatim;
- the re-recorded fixtures, with `button.json`'s hash;
- the census table with the new facets;
- the mutation table, the new rows included;
- the acceptance output verbatim: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:policy`, `npm run test:conformance`, and `npm run test:setup`;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
