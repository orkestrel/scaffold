# Unit JOURNEY-BUDGET (`jb`) report

## Change

The `CASCADE_KEY_TIMEOUT` constant in the `tests/setup.ts` file sets the per-key budget at 3000 ms,
declared beside the `CASCADE_KEYS` table with a `TSDoc` block naming the 1070 ms measured cost per
entry at a 3.3 contended load. The `it` call for the case "reads every resting cascade key the same
on its lifted frame as in the showcase, in light and dark" in the
`tests/app/browser/integration.test.ts` file now passes `CASCADE_KEYS.length * CASCADE_KEY_TIMEOUT`
as its `Vitest` timeout argument, so the case's budget scales with the table instead of the journey
project's fixed `120_000` millisecond timeout. The `tests/setup.test.ts` file's export-list case
gained the `CASCADE_KEY_TIMEOUT` entry in sorted order, since that case enumerates the module's
exports. Running `npx oxfmt` on the `tests/app/browser/integration.test.ts` file reformatted the
whole case body to the new indentation the split `it(name, fn, timeout)` call requires; no other
line changed in substance.

## Gates

- `npx oxfmt --check tests/setup.ts tests/setup.test.ts tests/app/browser/integration.test.ts` — exit 0,
  "All matched files use the correct format."
- `npm run lint:check` — exit 0, no `oxlint` findings.
- `npm run check` — exit 0, every `tsc`/`vue-tsc` project passed.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts` —
  exit 0, 20 tests passed.
- `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project 'journey:light-1280*' -t 'reads every resting cascade key the same'` —
  exit 0, the case passed at 18852 ms.

## Files

- `jb.diff` and `jb-status.txt` under `tmp/units/`.
