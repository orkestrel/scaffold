# Unit U2f — report (builder / Sonnet)

All criteria met.

**Four edits landed:**

1. `src/core/helpers.ts`, `preview` TSDoc `@remarks`: the summary now reads the whole-string case first, then the general encoder sentence: "A primitive renders as printable text: a string retains its quoted JSON representation, while a narrowed symbol renders through intrinsic `String` and receives the same escaping without outer quotes. A string of at most {@link PREVIEW_LIMIT} code units takes its answer from one whole-string encode when that encode fits the same limit, and the length predicate deciding it is exact rather than approximate. Every other string and every symbol renders through one bounded indexed encoder that appends only complete escaped code-point tokens within {@link PREVIEW_LIMIT}; clipping therefore never retrieves the mutable string iterator or splits an escape/surrogate pair before its trailing `…`, and enormous primitive text is not fully traversed."
2. Same file, derivation paragraph: every bare `` `stringify` `` now reads `` `JSON.stringify` `` followed by a noun ("what one `JSON.stringify` call returns", "one `JSON.stringify` call over that same string measures `PREVIEW_LIMIT + 1`", "not what a `JSON.stringify` call returns").
3. `tests/src/core/helpers.test.ts`, beside the timing threshold: `// The threshold is 20 times; the gate measured about 2600 times on an idle host, so a red reading here is host noise or a lost gate, and the Orchestrator's idle re-run decides which.`
4. `src/core/helpers.ts`, `readValue`: `const subject = options?.subject` added beside `const requested = options?.code`; the record reads `subject: isString(subject) ? subject : 'value',` — one read of `options?.subject`, inside the eager `attempt`. New pin in `readValue`'s describe block: `refuses through its own error when a subject accessor changes its answer between reads`, dispatched through `Reflect.apply` (matching the file's existing hostile-options pattern, because `ReadValueOptions.subject` is typed `string | undefined` and the getter must return a non-string on the second read without an `as` assertion).

**Scoped helpers suite:** `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`
- Pre-fix (fix reverted, test unchanged, isolated with `-t` to the new test name): 1 failed — `captureContractError: the operation threw a non-ContractError` (the raw `Error: hostile toString` propagated).
- Post-fix, full file: 229 passed (229).

**Other gates run:** `npm run format:check` clean; `npm run lint:check` clean; `npm run check` exit 0; `npm run test:guides` 65 passed.

**`git status --porcelain`:** ` M guides/contract.md`, ` M src/core/helpers.ts`, ` M tests/src/core/helpers.test.ts`.

**`git diff --stat`:** `guides/contract.md | 2 +-`, `src/core/helpers.ts | 82 +++++++++++++++-------`, `tests/src/core/helpers.test.ts | 153 ++++++…`; 3 files changed, 211 insertions(+), 26 deletions(-). `guides/contract.md` carries U2's one-line change only; this unit did not edit it.

No deviation.
