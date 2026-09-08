# Brief — `d7n-probe-tests` (probe: the suite's candidate drafts under the workspace's lint policy)

## Role and engine

`builder` on Claude Sonnet. Sole writer in `C:/Users/mikes/WebstormProjects/probe` from the committed tip `135aab7` (clean; the guide head start `0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-probe-tests/` inside this checkout.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Non-negotiable rules; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-probe-converge-fix-report.md` § Deviation (the reproduction and its evidence); `C:/Users/mikes/WebstormProjects/probe/guides/probe.md` at the flagship claim (the `createGreeting` draft on `src/core/factories.ts`, and the paragraph stating the lint policy refuses module data outside a data-kind file); `C:/Users/mikes/WebstormProjects/probe/tests/src/server/Probe.test.ts` in full.

## The defect

`npm run test:src:server` reads `Test Files 1 failed | 7 passed (8)`, `Tests 8 failed | 190 passed (198)`, every failure in `tests/src/server/Probe.test.ts`: the suite's candidate drafts carry `export const VALUE = 'ok'` at `src/core/probe-project-<id>.ts`, module data the workspace's own lint policy refuses (`Move this module data to constants.ts or another data-kind file.`), so the lint stage charges the case a claimant issue, no receipt is minted, and every assertion over the token reads empty. Reproduce it first and record the failing lines.

## The unit

1. In `tests/src/server/Probe.test.ts`, every candidate draft (case and control) the suite builds takes the flagship's form — a function export such as `export function value(): string {\n\treturn 'ok'\n}\n` — so the lint policy admits the clean case; a control that must fail its stage keeps the failure it demonstrates (a type error, a lint error the policy still reports, a runtime failure) but in a draft that fails for that reason alone. Keep every assertion's meaning: where an assertion read an issue the draft used to raise, the draft still raises exactly that issue. Change no assertion value to make a case pass; change the draft so the case measures what it claims.
2. `npm run test:src:server` green; `npm run test:guides` green; `npx oxfmt --config .oxfmtrc.json --check tests/src/server/Probe.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/src/server/Probe.test.ts` exit 0; `npm run check` exit 0.

## Scope

Owned: `tests/src/server/Probe.test.ts`. Off-limits: everything else, including `src/**`, `guides/**`, every vendored file, `package.json`, `package-lock.json`.

## Acceptance criteria, cheapest first

1. `git status --short` lists `tests/src/server/Probe.test.ts` only.
2. `grep -c "export const VALUE" tests/src/server/Probe.test.ts` reads 0.
3. `npx oxfmt --config .oxfmtrc.json --check tests/src/server/Probe.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/src/server/Probe.test.ts` exit 0; `npm run check` exits 0.
4. `npm run test:src:server` exits 0 (record the summary and the red reading taken first); `npm run test:guides` exits 0.

## Output

`C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-probe-tests-report.md`: the red reading, per draft the hunk and why it still measures its claim, per criterion the exact command and its last lines. No process diary. No count in prose.

## Deviation contract

Stop if a case cannot keep its meaning under a lint-clean draft (name it and what it asserts), or if a gate outside the owned file goes red. Decide the drafts' exact text yourself and record it.
