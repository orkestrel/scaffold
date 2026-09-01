# U1f checker report (checker / Sonnet; immutable)

## Verdict: FAIL

## Checklist

1. **`constants.ts` reverted; no `INDEX_TEXTS`; no top-level loop statement** — met. Evidence: `grep -rn INDEX_TEXTS /home/user/contract` → no matches in source; `grep -n -E '^(for|if|while) ' /home/user/contract/src/core/*.ts` → no matches; status lists only `guides/contract.md`, `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`.
2. **`readArrayEntries` direct-copy mechanics** — met, with one referral. Evidence: `helpers.ts:1028` reads `length` once; `:1032` reads `INTRINSICS.members(value)` once before any decision; `:1037-1039` decides canonicality (`while` scan against `INTRINSICS.text(matched)` plus one `if` on `matched === length && members.length === length + 1 && members[length] === 'length'`); `:1040-1048` fills `new INTRINSICS.list(length)` by indexed assignment with `INTRINSICS.own(value, key)` before each single indexed read, freezes `packed` and the result, returns `dense: true`; the walk from `:1049` is unchanged apart from the hoisted `members`; no spread, `slice`, `Array.from`, or `for…of` over `value`; no size gate. Referral: whether scan-then-check counts as "one predicate" is a design-fit judgment.
3. **TSDoc remark and guide row accuracy, required phrase, no `above`/`below`** — **not met** for the TSDoc remark. Evidence: "arrive in ascending order" appears only at `guides/contract.md:216`; the TSDoc remark at `helpers.ts:998-1016` says "then corroborates and reads only those reflected canonical indices in ascending order" and omits the "or are sorted numerically" branch. No `above`/`below` inside the added remark span; the guide row carries none. Direct-copy accuracy stated correctly in both places. Re-dispatchable instruction: add the clause to the TSDoc `@remarks` block matching the guide row's wording.
4. **Test additions are exactly the four named cases; table test and five-member parity test absent; no pre-existing test edited** — met. Evidence: the test diff is purely additive — four `it` blocks (extra own string key `:111-125`, own symbol key `:127-141`, disowns its last index `:143-164`, disowns its first index `:166-185`), each disowning case asserting the exact message at `:163` and `:184`; no `-` line touches a pre-existing test.
5. **Naming and prohibited-syntax conformance** — met. Evidence: identifiers `matched`, `packed`, `key`, `index`; test names carry no control identifier; no `any`/`as`; the `!` occurrences are boolean negation; real `Proxy`, `Object.defineProperty`, `Reflect.ownKeys` only.
6. **Scope honesty** — met. Evidence: status lists exactly the three files; `constants.ts` absent.
7. **Guide parity: no other row moved; remaining clauses true** — met. Evidence: the guide diff shows one changed row; neighbouring rows unchanged; retained clauses match the implementation.

## Referrals

- Item 2: whether the `while`-scan-plus-`if` at `helpers.ts:1037-1039` satisfies "one predicate" or needs a single boolean expression — a design-fit call.
