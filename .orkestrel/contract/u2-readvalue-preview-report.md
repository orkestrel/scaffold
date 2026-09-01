# Unit U2 — report (implementer / Opus 5)

Unit U2 complete. Both mechanisms landed, seven tests added, both mutation probes recorded red then green against the shipped code.

## Mechanisms as landed

**`readValue` (`src/core/helpers.ts`).** The eager `attempt` still performs the single own-only spread projection `{ path: undefined, shape: undefined, limit: undefined, received: undefined, ...source }`, now built only when `source` is defined, and returns one flat record of `reader`, `subject`, `code`, and `owned`. The failure branch after `attempt(callback)` builds the published `context` from `owned` through the same four conditional spreads and constructs the `ContractError` there, so a successful read allocates neither the published object nor the error while every refusal keeps the same message, `code`, key order, and `cause`.

**`preview` (same file).** A string of at most `PREVIEW_LIMIT` code units is encoded once through `INTRINSICS.stringify` and returned when that encoding is at most `PREVIEW_LIMIT` characters; everything else falls through to the unchanged per-character walk, and symbols keep the walk through the `quoted` guard. The TSDoc derives why the predicate is exact: the walk appends every token and closes with the quote exactly when the escaped inner length is at most `PREVIEW_LIMIT - 2`, which is character for character what one `stringify` returns, while an inner length of `PREVIEW_LIMIT - 1` closes with `…` and measures `PREVIEW_LIMIT + 1`, so the predicate hands that string and every longer one back to the walk.

## Scoped command and counts

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`

| Run | Result |
| --- | --- |
| Baseline at `e81ba64` | 221 passed (221), exit 0 |
| `readValue` mutation (`...source` removed from the projection) | 5 failed / 223 passed (228), including `readValue > refuses the read when any own context field throws, advertised or not` |
| `readValue` restored | 228 passed (228) |
| `preview` mutation (`source.length <= PREVIEW_LIMIT` removed from the gate) | 1 failed / 227 passed (228): `preview > renders text far past the limit without encoding the text it never renders`, `expected 290.39982000000236 to be less than 13.960393999999951` |
| `preview` restored | 228 passed (228) |
| Final | 228 passed (228), exit 0 |

Both probes were re-run against the final shipped bytes; `sha256sum src/core/helpers.ts` was identical before and after the probe pass.

Other readings, all exit 0: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides` (65 passed). Observations, not criteria: `npm run test:src` 1315 passed (15 files), `npm run test:policy` 111 passed.

## Decision you need to see: the `preview` pin is a cost pin, not an output pin

Removing the `source.length` gate changes no output at all — the whole-string encode is computed and then discarded because `whole.length > PREVIEW_LIMIT`, and the walk still produces the clipped answer. So the brief's test "a string longer than `PREVIEW_LIMIT` is not fully encoded … whose output is the clipped walk result" cannot redden on output. The test asserts the clipped output **and** the cost relationship: rendering a 2,000,000-character value must cost more than 20 times less than one whole-string encode of the same value, with the lowest of three readings taken on each side through `performance.now()`, and with the control's `encoded.length` asserted at `4_000_002` so a control that skipped the work cannot pass. Measured margin with the gate: rendering 0.005 ms against encoding 13.9 ms (ratio about 2600 against a threshold of 20). Under the mutation the ratio collapses to about 1.04 and the test fails. This follows `.claude/rules/tests.md` on pinning a runtime-chosen result as the relationship it must have.

## Guide

Changed, `guides/contract.md:602`, the `preview` row. Replaced:

> One bounded indexed encoder appends complete escaped code-point tokens within `PREVIEW_LIMIT`; it never retrieves the mutable string iterator, splits a JSON escape/surrogate pair, or traverses the rest of enormous primitive text after clipping.

with:

> A string takes its answer from one whole-string encode when the string is within `PREVIEW_LIMIT` code units and that encode fits the same limit; every other string and every symbol renders through one bounded indexed encoder that appends complete escaped code-point tokens within `PREVIEW_LIMIT`. Neither path retrieves the mutable string iterator, splits a JSON escape/surrogate pair, or traverses the rest of enormous primitive text after clipping.

No sentence in the `readValue` row at `guides/contract.md:215` needed to move. The `PREVIEW_LIMIT` row at line 604 stays true.

## Tests added

In `tests/src/core/helpers.test.ts`, under `readValue`: `refuses the read when any own context field throws, advertised or not` (the mutation pin); `publishes carried context fields in one canonical order and retains no caller object`; `returns the callback value by identity when every context field is carried`. Under `preview`: `renders a string by its escaped length at, on, and past the clip boundary`; `escapes a lone surrogate and keeps a short astral pair whole`; `renders a symbol unquoted at a length a string renders quoted`; `renders text far past the limit without encoding the text it never renders`.

Equivalence was checked before the tests were written, through a throwaway probe that transcribed the pre-change walk and compared it against `preview` over every string of length 0 to 70 in plain, newline, space, lone-surrogate, embedded-quote, and astral-pair shapes plus `'x'.repeat(200)`: no mismatch. The probe was deleted; `tmp/` is empty.

## Diffstat and status

```text
 guides/contract.md             |   2 +-
 src/core/helpers.ts            |  59 +++++++++++++++-----
 tests/src/core/helpers.test.ts | 121 +++++++++++++++++++++++++++++++++++++++++
 3 files changed, 166 insertions(+), 16 deletions(-)
```

`git status --porcelain`: ` M guides/contract.md`, ` M src/core/helpers.ts`, ` M tests/src/core/helpers.test.ts`.

Shared-file patches: none. Deviation state: none of the contract's stop conditions fired. One brief fact corrected in place: the fixture path in `publishes carried context fields in one canonical order and retains no caller object` uses `['values', 'name']` because `FieldPath` is `string | readonly string[]` (`src/core/types.ts:44`), so a numeric segment fails `npm run check`.
