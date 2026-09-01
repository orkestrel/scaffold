# U1 audit round 1 — objective lane verdict (Opus 5 through the reviewer role file, substituting the excluded Sol analyst; blind; immutable)

Lane held: **objective** — correctness, constraints, and what the code, the tests, the shipped artifact, and the package manifest actually permit. Native Opus 5 subagent, recorded substitute for the excluded Sol `analyst`.

---

## 1. CONFIRMED

Attacks tried that failed, against `/home/user/contract/src/core/helpers.ts:1035-1057`:

- **Length 0.** Canonicality reduces to `members.length === 1 && members[0] === 'length'`; the comparison loop never runs; `new INTRINSICS.list(0)` frozen equals the walk's `entries` with `indices.length === length` → `dense: true`. Hostile record `empty:` line is identical on 0.0.15 and U1.
- **A `undefined === undefined` collision in the comparison** (a table hole matching a missing member). `INTRINSICS.members` is `Reflect.ownKeys` (`constants.ts:113`), which returns a dense list of `length + 1` entries, so `members[position]` is never `undefined` for `position < length`. The collision needs both sides absent and cannot occur.
- **`4294967295`.** `length <= 2**32 - 1` makes `members.length === length + 1` unreachable at that length, and `position` never reaches `4294967295`, so the metadata rule the walk enforces at `helpers.ts:1069` is not bypassed — it is unreachable on this path.
- **Reentrancy through an accessor index.** `value[index]` can run a caller getter, but `members`, `length`, and `packed`'s size were all fixed before the first value read, exactly as in the walk. Record line `accessor index:` identical on both builds.
- **Frozen state.** Both paths call `INTRINSICS.freeze` on the entries and on the result object; record shows `frozen=true` on every vector.
- Lengths 1024, 1025, 1500, 0, and 3 are recorded identical; 1023 is not recorded separately but is exercised as position 1023 inside the length-1024 case at `tests/src/core/helpers.test.ts:318-340`.

The `Reflect.ownKeys` ordering the claim rests on is spec-fixed (`OrdinaryOwnPropertyKeys`: array-index keys ascending, then other string keys in creation order), not implementation-defined — and the code verifies the order it needs rather than assuming it, so the brief's stated unknown does not bear on this claim either way.

## 2. CONFIRMED

Attacked the first index specifically, on the theory that index 0 might be reached differently. It is not: the loop body at `helpers.ts:1049-1055` is uniform in `index`, and canonicality has already fixed `members[0] === '0'`, so `INTRINSICS.own(value, '0')` is the identical read the last index gets. Evidence for the refusal identity is the hostile record line `proxy canonical keys, disowned index: read[refused:Array index views disagree]`.

Bounded: the committed pin at `tests/src/core/helpers.test.ts:342-355` disowns index `'1'` of `[1, 2]` — the last index — and asserts only `.success === false`. No committed test pins either the first-index case or the message text; both rest on the Orchestrator's record and on source reading.

## 3. BROKEN

**Falsifying input, already in the repository:** `tests/src/core/helpers.test.ts:892-897`

```ts
const hostileValue = new Proxy([1], {
	get(target, property, receiver) {
		if (property === '0') throw valueReason
		return Reflect.get(target, property, receiver)
	},
})
```

This is the claim's "a throwing `get` trap". No `ownKeys` trap is installed, so `Reflect.ownKeys` forwards to the target `[1]` and returns `['0', 'length']`; `length` reads 1. At `helpers.ts:1036` `members.length === length + 1` (2 === 2) and `members[1] === 'length'`; at `helpers.ts:1041` `members[0] === '0'`. The population is **canonical**, so this vector takes the new direct copy at `helpers.ts:1047-1057` — not "the existing walk". The unit report at `/home/user/scaffold/tmp/units/u1-packed-report.md:31` says so itself: "The last two are pre-existing pins that now flow through the direct copy."

Second falsifying input, from the claim's own list: an **array-like object** `{ 0: 'a', 1: 'b', length: 2 }`. `OrdinaryOwnPropertyKeys` returns `['0', '1', 'length']`, which is canonical, so it also takes the direct copy. `tests/src/core/helpers.test.ts:875-886` (`hostileMembership`, whose `ownKeys` trap returns `['0', 'length']` against a reported `length` of 1) is a third.

What is **not** broken: the second half of the claim. The hostile record shows identical lines on 0.0.15 and the U1 build for every listed vector, and the answer-parity run reads `PARITY: IDENTICAL` over 1062 comparisons with a sabotaged control reading 16 differences. The defect is in the claim's classification, and it matters because a CONFIRMED verdict here would enter the campaign record as evidence that a throwing-`get` proxy, a throwing membership read, and an array-like object were untouched by this change, when each of them now runs the new code.

**Smallest correct fix (no source change):** restate the claim so the population is defined by the predicate the code applies — `members.length === length + 1 && members[length] === 'length' && members[position] === String(position)` for every `position < length` — and split the listed vectors accordingly. The genuinely non-canonical members are: extra own string key, own symbol key, descending or permuted indices, `length` before the indices, a sparse array, a lying `length` in either direction, and a typed array (whose `length` lives on the prototype, so `Reflect.ownKeys` returns no `'length'`). A throwing `ownKeys` trap takes neither path — it throws at `helpers.ts:1035`, before the canonicality test. The canonical members — throwing `get`, throwing membership read, array-like object with exactly `{0…n-1, length}` — belong in a separate claim asserting that they take the direct copy and answer identically to 0.0.15, and that claim wants a committed pin binding the path, because today only the mutation reading attributes them.

## 4. CONFIRMED

Attacked for a concealed second `length` read and for iterator dispatch. `new INTRINSICS.list<T | undefined>(length)` at `helpers.ts:1048` consumes the captured local rather than re-reading `value.length`; `packed[index] = …` writes an array this function owns. The added code contains no `for…of`, no spread, no `Array.from`, and no `slice`. `INTRINSICS.own` is `Object.hasOwn` (`constants.ts:93`), which is one `[[GetOwnProperty]]`. The trap record's `packed 3` line — one `get:length`, one `ownKeys`, one `descriptor:<i>` and one `get:<i>` per index, no `has`, no `getPrototypeOf` — matches exactly, and `packed 1025` exercises the past-table branch with the same profile.

## 5. CONFIRMED

Attacked every clause. Frozen and in order: `constants.ts:253-256` loops `index < 1024` ascending through `INTRINSICS.text` (`String`, `constants.ts:151`) and then `INTRINSICS.freeze`. Barrel: `src/core/index.ts:2` carries `export * from './constants.js'`, which is the only export form `.claude/rules/architecture.md` § Barrel exports permits, so the symbol is reachable without an explicit row. Shipped: `dist/src/core/index.js:242-244` carries the declaration, the fill, and the freeze. Naming matches `.claude/rules/names.md`'s `{QUALIFIER}_{NOUN}` constant form. Every clause of the guide row at `guides/contract.md:217` checks out against the code, including "No companion limit constant exists, and no size selects an algorithm."

One TSDoc sentence at `constants.ts:239-242` overclaims — "even a damaged table decides cost alone" assumes a failed write leaves a hole that reads `undefined`, which is only true when `Array.prototype` carries no index property. I refute my own attack on reachability grounds: the only route to a damaged table is prototype tampering before this module evaluates, which `guides/contract.md:264` places explicitly outside the threat model ("a module that evaluates first chooses what `INTRINSICS` captures"). Not a finding.

## 6. CONFIRMED

Attacked for a hidden size gate. The only `1024` in `src/` is the loop bound at `constants.ts:253`; `helpers.ts:1039-1040` uses `INDEX_TEXTS.length` solely as a ternary discriminator selecting which text the comparison reads, and both arms feed the same `members[position] !== text` test and the same direct copy at `helpers.ts:1047`. `tests/src/core/helpers.test.ts:326` runs both `INDEX_TEXTS.length` and `INDEX_TEXTS.length + 1` through the identical assertion block, and the hostile record's `length 1024`, `length 1025`, and `length 1500` lines are identical on both builds.

## 7. CONFIRMED

The pin binds. `tests/src/core/helpers.test.ts:346-350` builds a Proxy over `[1, 2]` trapping only `getOwnPropertyDescriptor`, so `Reflect.ownKeys` forwards and reports `['0', '1', 'length']` — canonical. That vector can only reach the direct copy, so the corroboration clause at `helpers.ts:1051` is the sole line whose removal can redden it, which is exactly what the writer's direct-copy-only mutation reported and what the Orchestrator's superset mutation reproduces (`refuses a canonical population that disowns one of its own indices` appears in its failing set). All added test names describe behaviour and carry no control identifier.

Imprecision in the claim, not a break: the two mutations are different experiments (direct copy alone versus both sites), so their counts do not "agree" — the writer's failing set is a subset of the Orchestrator's. The attribution to the direct copy holds by the vector's canonical population, not by matching counts.

## 8. CONFIRMED

The supplied diff shows exactly two hunks in `tests/src/core/helpers.test.ts`: one import line at 62 and an insert-only block at `@@ -703,6 +704,103 @@`, entirely additive within 625–760. Total shift is 98 lines. I read the shifted pins in the working tree: old 1498 is now `tests/src/core/helpers.test.ts:1596` (`rejects sparse arrays`) and old 1556 is now `tests/src/core/helpers.test.ts:1654` (`walks sparse arrays by reflected population without caller iteration`), both intact and unweakened — which also independently confirms the diff was supplied complete. The count moves 217 → 222, matching the added tests with none removed.

## 9. CONFIRMED

Attacked the unchanged clauses of the `readArrayEntries` row against the new path. "`length` and the reflected key population are each captured once" holds. "Canonical reflected indices below `4294967295` must be below the captured length" holds by construction on the direct copy, because canonicality forbids an index at or above length. "corroborated with `Object.hasOwn`, and read once" holds at `helpers.ts:1051-1054`. "The frozen `entries` are one native sparse array of the captured length" holds — `new INTRINSICS.list(length)` then filled. "`dense` means the reflected canonical count equals length" holds, the count being length. "A descriptor-only index omitted from reflection … remains a hole" holds, because such a population fails `members.length === length + 1` and takes the walk. The added sentence is faithful, including "exactly … followed by `length`", which is the cardinality test the code applies. The diff shows one row replaced and one inserted, no other row's content touched.

Weakened but not false: "are sorted numerically" describes an operation the direct copy does not perform. The observable property it guarantees — entries at ascending numeric index — still holds, because the population arrives sorted.

## 10. CONFIRMED

`git status --porcelain` and the complete diff agree on `guides/contract.md`, `src/core/constants.ts`, `src/core/helpers.ts`, `tests/src/core/helpers.test.ts` and nothing else. Attacked for a build artifact leaking into the tree: `dist/` is untracked, so the `npm run build` run does not show, and no untracked path is reported.

## 11. CONFIRMED

No `any`, no `as`, no `!` in the diff. No nested function declaration or assignment; the object-literal trap methods in the added tests are members of an object passed directly as an argument, the identical shape already used at `tests/src/core/helpers.test.ts:876` and `892`. No hidden module helper. No companion limit constant — the bound is `INDEX_TEXTS.length` read at the call site. The constant sits in `constants.ts` under its own section comment between `INTRINSICS` and the JSON constants, and `INDEX_TEXTS` matches the `{QUALIFIER}_{NOUN}` form.

Attacked the placement against `.claude/rules/architecture.md` § Kind purity, on the theory that a module-scope `for` statement makes `constants.ts` hold something other than constant data. No rule text forbids it, and § What the policy sweep proves confirms the sweep reads declaration syntax only. `Reflect.set` writing into a value annotated `readonly string[]` is a bypass the compiler cannot see, but nothing observes the array between `constants.ts:249` and the freeze at `constants.ts:256`, so the published type is honest. Neither is a finding under this claim — but the module-evaluation statements collide with a manifest declaration no claim names; see the following.

---

## Finding outside the claims

**`package.json:26` declares `"sideEffects": false`, and U1 made that declaration false.**

`src/core/constants.ts:253-256` are the only module-evaluation statements in the entire `src/` tree — I searched `/home/user/contract/src` for a bare call, `for`, or `if` at column 0 and these two are the sole hits. They survive into the shipped bundle at `dist/src/core/index.js:243-244`, detached from the declaration at `dist/src/core/index.js:242`:

```js
var INDEX_TEXTS = new INTRINSICS.list();
for (let index = 0; index < 1024; index += 1) INTRINSICS.write(INDEX_TEXTS, index, INTRINSICS.text(index));
INTRINSICS.freeze(INDEX_TEXTS);
```

Both the table's contents and its frozen state are produced entirely by lines 243-244, not by line 242's initializer. `"sideEffects": false` tells every consumer bundler the opposite. Under Rollup's documented `moduleSideEffects: false` semantics — which `@rollup/plugin-node-resolve` derives from this exact field, and which state that Rollup "will remove code from these modules that is not used by any imported binding" — a top-level `for` statement and a bare call statement are precisely the shape that is dropped.

Why it matters: if they are dropped, a bundled consumer receives `INDEX_TEXTS` as an **empty and unfrozen** array. The array answers stay correct, because `helpers.ts:1039-1040` falls through to `INTRINSICS.text` for every position past the table's length — the cost-versus-answer separation this unit built. What is lost is a published guarantee: `Object.isFrozen(INDEX_TEXTS)` returns `false`, a consumer can mutate an export the guide row at `guides/contract.md:217` and the TSDoc at `constants.ts:223` both describe as frozen, and the optimization this campaign exists for silently disappears with no test able to observe it. `tests/src/core/helpers.test.ts:321` pins the frozen state against source, which no bundler has touched.

What I measured and what I did not: the misdeclaration, the detached statements, and the fact that they are the sole source of the table's contents and freeze are established from the files cited. I did not run a bundler — I cannot execute. Settling command: bundle `dist/src/core/index.js` with Rollup plus `@rollup/plugin-node-resolve` honouring the manifest, then read `INDEX_TEXTS.length` and `Object.isFrozen(INDEX_TEXTS)` from the output.

**Smallest correct fix:** make the frozen table the value of the declaration's own initializer, so no statement detaches from it and the `sideEffects` hint stays honest for the rest of the package. Correcting `package.json` to name the entry instead closes the same hole, but it surrenders the tree-shaking hint for every other export to pay for one constant, so prefer the initializer.

---

VERDICT: FAIL — 1 broken, 0 unresolved, 0 not-evidenced, 1 finding outside the claims
