Confirmed the "Two rulings" count-in-prose violation. Now I'll finalize the verdict.

Lane held: checker contract

**Claim 1 — every item the fix brief names landed in the diff as stated, and nothing else changed (scope honesty).**
PASS. `d7n-contract-converge-fix.status.txt` lists exactly 8 modified files (`guides/contract.md`, `src/core/{combinators,helpers,shapers,types,validators}.ts`, `tests/{guides.test.ts,setup.ts}`), all within the brief's owned scope (`guides/contract.md`, doc blocks under `src/core/**`, `tests/guides.test.ts`, the one `tests/setup.ts` doc block). No off-limits file (`README.md`, `package.json`, any vendored file) appears. The diff (`d7n-contract-converge-fix.diff.txt`) matches every item 1–8's described hunk (verified against the live tree at `/home/user/fleet/contract`: `tests/guides.test.ts:90-113` pin, `guides/contract.md:115-127` guard table, `guides/contract.md:295-297,378,475-478` Shape idiom and cloner rows, `src/core/validators.ts:505,701-706` remark move, `guides/contract.md:162,331,538,929`, `tests/setup.ts:2021`).

**Claim 2 — the report's citations match the tree; the report states no count in prose; the pin is described only in the words the file carries.**
FAIL. The report states counts in authored prose, which both the brief's Output contract ("No count in prose") and `AGENTS.md` § Writing ("NEVER state a count … rows, findings … are such sets") forbid:
- `d7n-contract-converge-fix-report.md:171`: "`npm run docs -- --to guide` carried the three cellsc" — states a count of the cloner cells set.
- `d7n-contract-converge-fix-report.md:260`: "Two rulings on this item's scope, both decided and recorded" — states a count of the rulings set.
- `d7n-contract-converge-fix-report.md:446`: "Three judgments the brief left to the executor are recorded with their items" — states a count of the judgments set.

The citations otherwise match the tree (verified `:295`, `:473` convention-sentence relocations, and the `isArrayBuffer`/`isArray` symbol names, both correctly attributed this round, unlike the audit's finding on the prior report). The pin description ("byte-identical to the pilot") is supported by the shown diff and criterion 5's empty `diff`. But the count violations fail this claim.

**Claim 3 — each named correction is present as the audit's finding asked (contract items).**
PASS on every sub-item, each independently verified in the live tree at `/home/user/fleet/contract`:
- Pin in guard-and-continue form: `tests/guides.test.ts:98-104`, matches pilot `abort/tests/guides.test.ts:80-86` exactly.
- Guard table's narrowed types: `guides/contract.md:120-124` (`isGeneratorFunction`, `isAsyncGeneratorFunction`, `isZeroArgGenerator`, `isZeroArgAsyncGenerator` now carry function-type cells, no prose).
- Every interface row's `Shape` cell in Ruling 12's idiom with no `…`: confirmed by direct grep — `grep -n '| interface *| \`{[^\`]*:' guides/contract.md` and the `…`-in-cell pattern both return no matches.
- Cloner interfaces' distinct descriptions: `guides/contract.md:374,376,378` — `JSONClonerInterface`/`SchemaClonerInterface`/`ShapeClonerInterface` each read "Settles … then replays it," distinct from their class rows' "Owns the state of …".
- `isArray` remark: `src/core/validators.ts:701-706` carries the remark; `:505-513` (`isArrayBuffer`) carries none.
- Counts and all-caps: `:162` ("The bound…", no "one"), `:331` ("`ContractError` is documented…"), `:538` ("the readonly data properties", no "seven"), `:543` ("is exactly", no "IS"), and the `combinators.ts`/`helpers.ts`/`types.ts` sites all confirmed plain in the live tree; the surviving `CALLABLE`/`SEPARATELY`/`MODULE BINDING` hits are in `//` code comments the report documents as pre-existing (`combinators.ts:264,782`, `helpers.ts:229`), correctly left untouched.
- `tests/setup.ts` subject: `:2021` reads "Represents a type-correct string shape carrying one hostile RegExp scalar population."
- The titled fence's claims executed: `tests/guides.test.ts:412-431` adds the executed case (`user.parse`, `user.explain`) plus the presence-guard case, matching item 8.

## Findings outside the claims

None beyond the count-in-prose defect carried under claim 2.

## Referrals

None. The count-in-prose defect is mechanical (a direct textual match against the banned pattern), not a judgment call.

VERDICT: FAIL 2
