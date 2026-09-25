# J-ORACLE-RECORD audit — the subjective lane

## Role and engine

`reviewer` on Opus 5.5, a native read-only subagent with a clean context. Perform the assignment directly and spawn nothing. You hold the subjective lane: shape, naming, and design fit. Opus 5.5 wrote the unit, and the objective lane runs on GPT-6 Astra.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `names.md`, `typescript.md`, `tests.md`, and `architecture.md`.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-record-audit-claims.md`.
- `decisions.md` § E28 in the same directory.

## The evidence

This lane cannot run git, so the evidence is supplied as files.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-record.diff`: the three test files over `0865c67`.
- `j-oracle-record-report.md` in the same directory.
- The worktree copies at `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-record/tests/`, committed as `9ea360d` with a clean status.

## Your claims

Rule claim 9, and these:

11. **The oracle reads as one family.** The added types, constants, and helpers use one term per concept: plugin, scenario, action, step, state, reading, fixture, departure, and runtime. Two names for one thing, or one name for two things, is a defect.
12. **No superfluous wrapper.** Each helper adds a boundary, an invariant, a translation, or a composition that `AGENTS.md`'s wrapper rule admits. Check `readPluginFixture`, `readBootstrapRuntime`, `readBuildOutput`, and `filterAddedDepartures` in particular.
13. **The shared scaffold.**
    - `driveOracleBrowser` is the one browser-launch path for the Button and plugin recorders.
    - The Button recorder's steps are unchanged.
    - `setupServer.ts`'s new imports of `../vite.config.js` and `../configs/src/vite.styles.config.js` are a sound dependency for a setup module every server project loads. Rule whether that import belongs in `setupServer.ts` or in a narrower module under `tests.md`.
14. **The TSDoc states each export's contract** in one plain sentence. Rule the voice only where it changes what a reader can rely on.

## Output

Give a per-claim ruling: CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence. Then list any shape defect outside the claims, with the change that repairs it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
