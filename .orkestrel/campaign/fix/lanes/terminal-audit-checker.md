<!-- task a4e9fbe487cceea60.output -->
Good, no residual old names. Now finalize verdicts.

**Claim 1** — CONFIRMED. Every row (s12-48, s12-52, s12-54, s12-55, s12-58, s12-59) ends "applied" in the report (`/home/user/scaffold/tmp/units/breaking/terminal-report.md:7-12`); none is refused, so no rule-text quote is required.

**Claim 2** — CONFIRMED. Word-boundary and case-insensitive inflected-form greps over `src`, `tests`, `guides` of `/home/user/fleet/terminal` return only the new prefixed names (e.g. `renderPromptHeader`) and the two classified "Parked forms" prose participles (`src/core/types.ts:703`, `guides/terminal.md:472`); no bare old name survives. Every new contract symbol is declared in `/home/user/fleet/terminal/src/core/types.ts` (`ParkedForm:388`, `TimerCancelFunction:376`, `terminals(): readonly PromptInterface[]:671`), and `SSE_EVENTS.destroy`/`serializeDestroy` are confirmed by the diff at `src/core/constants.ts` and `src/core/helpers.ts`.

**Claim 5** — CONFIRMED. Guide fences and Surface/Methods rows moved with every renamed symbol (diff hunks throughout `guides/terminal.md`), and the report documents an added executed assertion replacing a substring check for the `name`-absence behavior (`not.toHaveProperty('name')`, report line 7) rather than a prose-only claim.

**Claim 6** — CONFIRMED. `/home/user/scaffold/tmp/units/breaking/terminal.status` lists only the sixteen owned files (`guides/terminal.md`, `src/**`, `tests/**` excluding the vendored pair); no `.claude/`, `configs/`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package.json`, `package-lock.json`, or vendored guide mirror appears.

**Claim 7** — NOT-EVIDENCED. The report quotes each gate command with an exit code claim (report lines 72–77, e.g. `` `npm run format:check` → exit 0 — All matched files use the correct format. / Finished in 2963ms on 67 files using 4 threads. ``, and similarly for `lint:check`, `check`, `build`, `test`, and the `grep -rn` sweep), but per the brief's instruction this lane rules NOT-EVIDENCED regardless because it is not the `verifier` lane re-running the chain; the report's quotes are self-reported by the writer, not independently re-executed.

PASS with claim 7 held NOT-EVIDENCED per the brief's forced rule (the brief does not treat this as a FAIL condition for the checker lane; it names the required disposition explicitly).

FAIL 7
