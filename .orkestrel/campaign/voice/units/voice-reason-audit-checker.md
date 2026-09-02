# Audit lane output — voice-reason, checker lane (PASS)

## Verdicts

Per-claim verdicts for unit voice-reason (`@orkestrel/reason` TSDoc voice migration), audited against `/home/user/scaffold/tmp/units/voice/voice-reason.diff`, `.status`, and the live tree at `/home/user/fleet/reason`.

1. CONFIRMED — every hunk in the diff changes only lines inside `/** … */` or `//` comment text. Every `-`/`+` pair reviewed (diff.txt lines 1-2376) begins with `*`, `/**`, or is confined to a JSDoc block; no hunk touches a code token, an import, a signature, or a body statement (for example `voice-reason.diff:5-11`, `:1743-1756`). No counter-example found.

2. CONFIRMED — every backtick token, `{@link …}`, and URL in a rewritten block is byte-identical to the removed line, with only the sanctioned changes present: (a) boolean `@returns` lines rewritten `` `true` when … `` → `True if …; false otherwise` with every other backtick token in the line preserved, verified across `voice-reason.diff:276`, `:1756`, `:1769`, `:1782`, `:1795`, `:1808`, `:1821`, `:1835`, `:1849`, and the full `validators.ts` run at `:1747-2376`; (b) four reasoner-class and four definition-arm openers dropped a plain-English label with no backtick token present in the original (`voice-reason.diff:782-784, 796-798, 809-811, 823-824, 1000-1001`), so the identity constraint is vacuous there, not violated; no other token substitution found.

3. CONFIRMED — `voice-reason.status` lists 21 files, every line ` M src/core/…`; no line lists `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, `configs/`, `tests/setupPolicy.ts`, or `tests/policy.test.ts`.

4. CONFIRMED — grep of `/home/user/fleet/reason/src` for the imperative-verb and bad-`@returns` patterns returns 8 lines (`types.ts:133`, `types.ts:206`, `constants.ts:100`, `helpers.ts:992`, `helpers.ts:2017`, `helpers.ts:2142`, `FactorManager.ts:21`, `validators.ts:1270`); every hit is a mid-`@remarks` sentence, not a doc block's first line (confirmed by reading each in context, for example `types.ts:127-134`, `FactorManager.ts:14-28`, `validators.ts:1262-1273`). The `@returns` pattern (`Whether|` `true`` |true `) returns no matches. `app/` does not exist in this package (`Glob` returned no files), so the sweep's `app/` half is vacuously satisfied. Sweep returns no genuine hit.

5. CONFIRMED — the report's Gates table (`voice-reason-report.md:89-98`) quotes the exact command and exit code 0 for `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test`, each with an excerpt, satisfying the rule's CONFIRMED condition on quoted evidence; the report itself notes the Orchestrator's landing chain remains authoritative for `npm test` timing, consistent with the claim's own caveat.

Findings outside the claims: none material. The report's counts and taxonomy tables (blocks by kind, verb taxonomy) are descriptive summary and were not independently re-tallied; they are not among the five audited claims.

## Findings outside the claims

All five claims CONFIRMED on file:line evidence from the diff, status, report, and the live tree. The diff touches only TSDoc comment text (claim 1), preserves every backtick token/`{@link}`/URL except the two sanctioned rewrite forms (claim 2), stays scoped to `src/core/` (claim 3), leaves no imperative-opening or badly-worded-`@returns` doc block in `src/` (`app/` does not exist in this package) (claim 4), and the report quotes exact command/exit-code evidence for every gate (claim 5). No deviation, scope violation, or token drift found.
