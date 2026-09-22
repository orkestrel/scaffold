# Audit claims — F5e SETUP-CONVENTION in `@orkestrel/veneer` (working tree over `a162c91`, 2026-09-22)

## Subject

The F5e unit, written by `opus` on native Opus 5 from `/home/user/scaffold/.orkestrel/veneer/units/f5e-brief.md`
under the user's D12 ruling: `tests/setupCases.ts` and `tests/setupCalibration.ts` folded back
into `tests/setupStyles.ts` with one inventory proof; `tests/setupConformance.ts` renamed to
`tests/setupServer.ts` with its proof; `tests/setupListeners.ts` moved under `tests/fixtures/`;
every importer and the guide's § Files and § Tests updated. The unit's report is
`/home/user/scaffold/.orkestrel/veneer/units/f5e-report.md`.

## What this round decides

Whether F5e lands as one commit. A BROKEN claim in code sends the unit to a fix round; a BROKEN
claim in prose alone is corrected by the Orchestrator at landing.

## Already established — do not re-run

- The fixed set of root setup modules: `.claude/rules/tests.md` "Place helpers by environment" and
  the fleet's practice (`/home/user/elements/tests/`, `/home/user/mailbox/tests/`).
- F5a's landed content other than the split (`/home/user/scaffold/.orkestrel/veneer/units/f5a-audit-verdict.md`).

## Review evidence

`/home/user/scaffold/.orkestrel/veneer/units/f5e-audit-evidence.md`: the status output, the diff
`/home/user/scaffold/.orkestrel/veneer/units/f5e.diff` (renames shown as renames), the unit's report, the brief,
and the Orchestrator's gate log `/home/user/scaffold/.orkestrel/veneer/units/f5e-gates.log.txt` when present.

## Numbered falsifiable claims

Before confirming any claim about a proof, name the mutation that would make the proof fail and say
whether its assertions distinguish that mutation from the passing case.

1. **The root holds the fixed set.** `ls tests/*.ts` lists `config.test.ts`, `conformance.test.ts`,
   `distribution.test.ts`, `guides.test.ts`, `policy.test.ts`, `setup.test.ts`, `setup.ts`,
   `setupBrowser.test.ts`, `setupBrowser.ts`, `setupPolicy.ts`, `setupServer.test.ts`,
   `setupServer.ts`, `setupStyles.test.ts`, `setupStyles.ts`, and nothing else.
2. **Every export moved once, unrenamed, with its body unchanged.** The union of exports of
   `tests/setupCases.ts`, `tests/setupCalibration.ts`, and `tests/setupStyles.ts` at `a162c91`
   (`git show a162c91:<path>`) equals the export set of `tests/setupStyles.ts` now, each once, with
   the same declaration body; `tests/setupServer.ts` exports exactly what `tests/setupConformance.ts`
   exported at `a162c91`, unrenamed.
3. **One inventory proof per module, exact.** `tests/setupStyles.test.ts` compares the module's
   runtime export names with one literal list through an exact comparison, and
   `tests/setupServer.test.ts` does the same for its module; an added or removed export reddens
   each.
4. **No importer names a retired module.** `grep -rn 'setupCases\|setupCalibration\|setupConformance\|setupListeners' tests src app guides configs vite.config.ts`
   prints nothing; every import that named one resolves to the module that holds the symbol now,
   and the root typecheck passes.
5. **The listener fixture keeps its claim.** The module under `tests/fixtures/` installs the
   document listener at load, `tests/src/browser/index.test.ts` imports it dynamically inside the
   recorded action, and the case that claims `recordListeners` sees a listener an imported module
   installs still passes; the policy sweep admits the placement (or the report records the refusal
   verbatim and the unit stopped on that obligation only).
6. **The styles module's placement law holds.** `tests/setupStyles.ts` holds CSS and style
   helpers, the case tables, the calibration, and the compiled-cascade readers, and imports no DOM
   or `window`; `tests/setupServer.ts` holds the Node-only helpers and `node:*` loaders; neither
   holds `describe`, `it`, or `expect`.
7. **The guide is true and in parity.** § Files names `tests/setupStyles.ts`, `tests/setupServer.ts`,
   and the fixture with summaries that say what each holds; no row names a deleted module; § Tests
   names the proofs by their paths; `npm run test:guides` passes.
8. **The gate chain is green.** Every `=== <gate> exit=` line in the Orchestrator's gate log reads
   `exit=0` (UNRESOLVED if the log is absent when you read it).
9. **Scope is honest.** `git status --porcelain` lists only the owned files the brief names, with
   the renames as renames; nothing under `src/**`, `app/**`, `configs/**`, or `tests/fixtures/oracle/**`
   changed.
10. **Prose holds.** No changed prose line contains a banned term in a banned sense (pattern
    `\b(?:should|simply|eas(?:y|ier|iest)|just|currently|via|utilize|leverage|robust|performant)\b|\b(?:e\.g\.|i\.e\.|etc\.)`,
    case-insensitive), and no count of a growable set is stated as a number.

## Unknowns

- Whether the policy sweep admits the fixture placement; the report says.

## The threshold

PASS when every claim is CONFIRMED, or every BROKEN claim is in prose and the Orchestrator corrects
it at landing. A BROKEN claim in code (1 to 6) opens a fix round. A lane that returns no verdicts
is a lane that did not run.
