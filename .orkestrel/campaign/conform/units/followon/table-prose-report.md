# Unit table-prose — report

## Sites

- `guides/table.md:56` — "Everything in this guide is exported from `@orkestrel/table` (`src/core`). The manager..."
- `guides/table.md:106` — "The table contract — the readonly state in the `## Surface` rows plus `clear` and `destroy`."
- `guides/table.md:195` — "...subject to the core's hostile-reflection boundary described later."
- `guides/table.md:227` — "`cloneRow` cannot fail for an ordinary row record, subject to the core's hostile-reflection boundary described later."
- `guides/table.md:488` — "...and it is the line every refusal described later is measured against."
- `guides/table.md:1495` — "...interface ↔ class method bijections, and the preceding worked examples executed against the real..."
- `tests/guides.test.ts:233` — "// Each following test transcribes one runnable fence and asserts every value its comments claim."

No presence guard in `tests/guides.test.ts` quotes any of the changed sentences, so no guard string changed.

## Sweep

Case-insensitive `\b(above|below)\b` over `guides/table.md`, `README.md`, `src/**`, and `tests/**`
(excluding `node_modules` and the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`, `tests/distribution.test.ts`):

- `guides/table.md` — no hits.
- `README.md:77` — "of what this package leaves to the layer above." Ruled permitted: names the architectural layer above the package, not a document reference.
- `src/**` — no hits.
- `tests/setupPolicy.ts:2098` and `tests/policy.test.ts:544` — vendored, excluded from the sweep.
- `tests/src/core/tables/PaginationManager.test.ts:39` — "floors a page size below one, and a non-finite one, at a single row". Ruled permitted: names a numeric threshold, not a document reference.

## Gates

- `format:check` — reddened once on `guides/table.md`; converged with `npx oxfmt --config .oxfmtrc.json guides/table.md`; rerun exits 0.
- `lint:check` — exit 0.
- `check` — exit 0.
- `build` — exit 0.
- `test` (`test:src`, `test:policy`, `test:config`, `test:setup`, `test:guides`) — exit 0; `test:guides` reports 82 tests passed with every presence guard matching.

## Audit

`0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

`git -C /home/user/fleet/table status --short` lists only `guides/table.md` and `tests/guides.test.ts`.

`node /home/user/scaffold/tmp/work/evidence.mjs table` wrote `/home/user/work/evidence/conform-table.diff` (72 lines) and `/home/user/work/evidence/conform-table.status` (2 entries).
