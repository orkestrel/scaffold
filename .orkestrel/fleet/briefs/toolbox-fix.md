# Unit toolbox-fix — apply the audit's prescriptions verbatim

Role and engine: GPT-5.6 Sol (objective implementer), inside `codex exec` in
`/workspace/toolbox`. Successor to toolbox-form-adoption; carries the cross-engine audit's
required changes. Apply each prescription exactly as written; where a prescription names two
options the Orchestrator's ruling below picks one. You perform this directly and spawn nothing.

## Prescriptions (from the audit; apply verbatim)

R1. `guides/toolbox.md:376,392` — rename `restoreWorkflow` to `createRestoredWorkflow` in the
fence (import and call), matching `tests/src/core/factories.test.ts`.

R2. RULING: restore the guard. After `parseForm` succeeds in the prompt tool's handler
(`src/core/factories.ts:861-864` region), refuse a `select`/`checkbox` field whose enabled
`choices` list is empty with `ToolboxError('TOOL', …)` before anything parks. Add the test the
audit prescribes: `{ control: 'select', name: 'value', choices: [] }` asserts the typed `TOOL`
refusal AND `manager.pending(to)` stays empty. Also re-strengthen the two weakened message
assertions (`tests/src/core/factories.test.ts:1653,1670`) to bind the rule that refused, not
just `.toContain('schema')`.

R4. Add the `'rejected'` outcome tests: park a form carrying `rule: { required: true }`, answer
with a violating values record through BOTH the answer tool and the POST route; assert
`ANSWER` + `context.reason === 'rejected'` + `context.errors` on the tool path, and `422` plus
the parsed response body's `error.errors` on the route path (no server test currently reads a
body).

R5. Give `buildFormSchema`'s `select`/`checkbox` branch (`tests/src/core/factories.test.ts:99-113`)
real callers: drive one `select` and one `checkbox` ask/answer end to end to a settled values
record. Restore heterogeneity to the 30-ask pressure round (mix `text`/`confirm`/`checkbox` as
it had before).

R6. Fix the three formatter sites the audit names (`src/core/factories.ts:976-980` indent;
`tests/src/core/factories.test.ts:1744` quotes; `:1537-1539`/`:1552-1554` unneeded multi-line).
Fix them as source edits; do NOT run mutating format/lint (the Orchestrator's visit re-run owns
the converge).

R7. Rewrite `PROMPT_TOOL_DESCRIPTION` (`src/core/constants.ts:272`) per the audit: "each field
declares `control` and `name`, plus optional `label`, `rule`, `default`, and `choices`; `fields`
is an ordered array and each `name` must be unique."

F1. One concept, one term: settle on *form* across `answerToolShape`/`promptToolShape`
descriptions, thrown messages (`unknown prompt '<id>'` → form), local bindings for `PendingForm`
values, and TSDoc in `TerminalConnection.ts`/`factories.ts`. Keep `prompt` only inside the fixed
public names (`createPromptTool`, `PROMPT_TOOL_*`, `promptToolShape`). Rename the test-local
`TestFormControl` synonym to use the package's own control names.

F2. `src/core/helpers.ts:299` TSDoc: the exhaustive code list gains `'LIMIT'` and `'DESTROYED'`.

## Off-limits and validation

Owned: `src/**`, `tests/**` (except vendored `setupPolicy.ts`/`policy.test.ts`),
`guides/toolbox.md`. Off-limits: everything else, including `guides/terminal.md` and
`guides/workflow.md` (mirror refresh belongs to the Orchestrator's visit re-run), `package.json`,
lockfile. No commits, installs, or mutating format/lint. Validate read-only:
`npm run check`, `npm run lint:check`, `npm run test`, `npm run test:guides`.

## Output (final message)

Per-prescription: applied / not applied with the exact reason. Gate evidence: each command with
exit code. `git diff --stat` and `git status --short`. Any deviation: stop and report only if a
prescription cannot be applied inside the owned files.
