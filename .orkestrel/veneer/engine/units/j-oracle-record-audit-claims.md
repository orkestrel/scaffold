# J-ORACLE-RECORD — audit claims (2026-09-25)

**Subject.** Veneer `9ea360d` on `unit/oracle-record` over `main` `0865c67`. It changes the styles session's `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `tests/conformance.test.ts`, which that session agreed to (D49), and adds eleven fixtures under `tests/fixtures/oracle/`. Read the files at `9ea360d` with `git -C C:/Users/mikes/WebstormProjects/veneer show 9ea360d:<path>`. A lane that cannot run git reads the worktree copies under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-record/`, committed as `9ea360d` with a clean status.

**Evidence** (all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`):
- `j-oracle-record.diff` and `j-oracle-record-status.txt`;
- the brief `j-oracle-record-brief.md` and the report `j-oracle-record-report.md`;
- `decisions.md` § E9, § E11, § E26, and § E28, and the proposals E28 cites (`j-oracle-design-planner-proposal.md`, `j-oracle-design-analyst-proposal.md`);
- the Orchestrator's replay `j-oracle-record-replay.log.txt`;
- the instrument `j-oracle-record-mutations.py`;
- the census readings in `j-oracle-record-census/`.

## Claims

1. **One recorder and one reader.**
   - `recordPluginOracle` loads Bootstrap's pinned bundle or Veneer on the same page, with the same markup, and drives both through the same trusted actions (`drivePluginAction`).
   - `readPluginState` reads, per element, the classes, the attributes other than `id`, `class`, and `style`, and the visibility. It also reads the focused element and the scroll lock.
   - Element references are normalised to labels.
   - `recordButtonOracle` runs through the same `driveOracleBrowser` scaffold, and `button.json` is byte-identical.
2. **Veneer from source.** `compileVeneerRuntime` compiles `src/browser/index.ts` and the styles configuration in memory (`write: false`). No part of the plugin oracle reads `dist`.
3. **End states only.**
   - `settlePluginState` waits until readings agree for longer than the page's longest declared transition plus the interval, with no finite animation running and no scroll position moving.
   - It reads no engine's completion event, name, timing, or member, as E9 and E11 require.
   - The settle cannot report a state while a motion is still running.
4. **Fixtures.**
   - Each fixture holds Bootstrap's recording alone.
   - `ORACLE_REFRESH=1` writes observations only, and never a departure.
   - The Bootstrap case per plugin re-records Bootstrap and matches its fixture.
   - `scanPluginSteps` refuses a recording in which any step Bootstrap does not refuse leaves the state unchanged, and every committed scenario passes it.
5. **The controls.**
   - The four live controls use Veneer's public seams: a vocabulary override, a prevented pre-change event, `focus: false`, and a boundary control.
   - Each read red with an empty expected list (the report's red readings).
   - Each expected list holds exactly the departures the seam adds over Veneer's default setup at the control's step (`filterAddedDepartures`).
6. **The mutation run binds.**
   - Each plugin's planted difference makes the comparison fail by an assertion.
   - The equivalent-spelling control holds, and `BOOM` and `UNBOUND` are refused.
   - No source file is written (the replay log).
   - For each row you confirm, say whether the comparison tells the planted difference apart from the passing case.
7. **The comparator is complete for its facets.** `collectEngineDepartures`:
   - reports, in step order, each element one side lacks, each class token one side carries alone, each attribute whose value differs, each differing visibility, and a differing focus or lock;
   - refuses recordings whose step names differ.

   Name any facet a plugin's end state carries that no reading captures, such as a property, a scroll position, or a live region's text.
8. **E28's boundaries.**
   - `scanOracleObligation` and `isProofFile` are unchanged.
   - No guide file, `### Departures` table, or plugin-row cell changes, because those are J-ORACLE-GATE's.
   - The changed paths are the three test files and the eleven fixtures.
9. **The conventions.** The added exports follow `.claude/rules/names.md` and `.claude/rules/tests.md`:
   - a module helper takes the `{verb}{Noun}` form;
   - a discriminant names its axis;
   - a type's properties are readonly;
   - a shared constant is frozen where it is a table;
   - no helper duplicates an installed `@orkestrel/test` primitive.
10. **The census.** The report's census table equals the departures in `j-oracle-record-census/departures.json`, row for row.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `9ea360d`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
