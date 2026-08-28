# Fix dossier: brief

Verified fix-producing findings for the `brief` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s13-20 — DRIFT

20. package=brief file=`src/core/types.ts:9` rule=`AGENTS.md` § Writing — "NEVER state a count" verdict=CONFIRMED
    wrong: The prose states counts throughout, over exactly the member and stage sets the rule names as countable, and the rule's instruction is to delete a count rather than correct it.
    repair: Delete each number or name the members instead. Occurrences: `types.ts:9` ("none of these twelve"), `:43` ("The four fixed compilation phases"), `:50` ("the four `*_FAILED` codes"), `:55` ("Three codes"), `:104` ("The four disjoint file partitions"), `:165` ("Four working mechanisms"), `:169` ("three strings either way"), `:258` ("THREE classes of input, not two"), `:377` ("Two orthogonal axes, not five partitions"), `:386` ("Never union all five"), `:390` ("The four permission arrays"); `constants.ts:4`, `:20`, `:32`, `:41`, `:90`; `validators.ts:53`, `:56`, `:59`, `:62`, `:121`; `shapers.ts:44`, `:52`; `helpers.ts:71`, `:302`, `:305`, `:361`, `:366`, `:469`, `:512`, `:800`.

## s13-22 — DRIFT-RESHAPE

22. package=brief file=`src/core/types.ts:215` rule=`.claude/rules/writing.md` § Substitutions verdict=CONFIRMED
    wrong: "`command` should carry a clear exit signal" writes `should`, which the substitution table refuses outright.
    repair: Rewrite as "`command` must carry a clear exit signal — it becomes the `/goal` condition verbatim."

### Verification

**Judge (DRIFT-RESHAPE/high):** The banned word is at the cited line, so the violation is real; the finding's replacement word is wrong. writing.md fixes `must` for a requirement and the imperative for a recommendation, and the package rules this claim a preference: guides/brief.md:1174 states it as "Prefer proofs with a clear exi

**Lane DRIFT/high:** amend: apply the proposed rewrite at `types.ts:215` and carry the same correction to `guides/brief.md:105`, and close `helpers.ts:748` and `guides/brief.md:744` in the same change.

**Lane DRIFT-RESHAPE/high:** amend: rewrite the TSDoc in the imperative — "Give `command` a clear exit signal; it becomes the `/goal` condition verbatim." — and carry the same substitution to `guides/brief.md:105` and `guides/brief.md:744`, which the finding did not scope. Do not write `must`: `isProof` and `proofShape` check only `isLine`, and `guides/brief.md:1174` already rules the exit signal a preference.

## s13-23 — DRIFT

23. package=brief file=`src/core/types.ts:413` (also `:479`) rule=`AGENTS.md` § Non-negotiable rules — "ALWAYS make interface properties and public return collections readonly" verdict=CONFIRMED
    wrong: `BriefCompilerEventMap`'s `compile`, `block`, `error`, and `destroy` members and `BriefManagerEventMap`'s `add`, `remove`, and `destroy` members carry no `readonly`, unlike `process/src/core/types.ts:116` which marks every event-map member readonly.
    repair: Prefix each member with `readonly`.

## s13-26 — DRIFT-RESHAPE

26. package=brief file=`src/core/helpers.ts:990` (also `:1132`, `:1167`) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `briefToMarkdown` (`:1001`), `briefToGoal` (`:1144`), and `briefToDispatch` (`:1182`) each declare a parameter named `input`, but each `@param` documents a parameter named `source` that does not exist.
    repair: Rename the three parameters to `source`, matching every sibling projection in the file and the `@param` already written.

### Verification

**Judge (DRIFT-RESHAPE/high):** The mismatch is real — the tags name `source` and the declared parameter is `input`, so the parameter each function actually has is undocumented. The finding's repair does not compile, which I proved rather than reasoned: `function f(source: string) { const source = source.trim() }` under brief's ow

**Lane DRIFT/high:** amend: rename each parameter to `source` and rename the body binding to `owned`, matching `pinBrief` at `helpers.ts:883-886`. The one-token alternative — correcting the three `@param` names to `input` — also closes the rule, but leaves the file alternating `input` and `source` for one concept.

**Lane DRIFT-RESHAPE/high:** amend: change the three `@param source` tags at `helpers.ts:990`, `:1132`, and `:1167` to `@param input`, keeping the parameter names. Do not rename the parameters to `source` — each body declares `const source = snapshotBrief(input)` in the same scope, so the rename is a TypeScript redeclaration error, and it would collapse the deliberate `input` (caller's live value) against `source` (the one owned reading) distinction stated at `helpers.ts:1144-1147` and `:1186-1189`. If fleet-wide uniformity is wanted later, rename the local to `owned` first, matching `pinBrief` at `:884`, and rename the parameter in a separate unit.

## s13-28 — DRIFT

28. package=brief file=`src/core/types.ts:503` rule=`.claude/rules/names.md` § Tallies verdict=CONFIRMED
    wrong: `BriefManagerInterface.size` is the interface's lone unambiguous tally, which the rule names `count`; `ProcessManagerInterface.count` at `process/src/core/types.ts:742` is the fleet's other manager tally.
    repair: Rename to `count` on the interface and at `BriefManager.ts:65`, and update `guides/brief.md:600` and the `factories.ts:50` example.

### Verification

**Judge (DRIFT/high):** `BriefManagerInterface`'s only numeric member is `size`, so the tally is lone and unambiguous and the rule assigns it `count`. The rule's own exemption covers coexisting distinct tallies, which brief's manager does not have. The subjective lane's decisive evidence is a sibling package's TSDoc granti

**Lane DRIFT/high:** amend: rename to `count` on the interface and at `BriefManager.ts:65`, and carry it to `factories.ts:49` (not :50), `guides/brief.md:122`, `:600`, and `:625`, and the fourteen assertions in `tests/src/core/BriefManager.test.ts` and `tests/src/core/factories.test.ts`. Record that interpret, program, and template carry the same drift, so brief alone renaming leaves the fleet still alternating.

**Lane EXCEPTION/high:** drop

## s13-30 — DRIFT

30. package=brief file=`src/core/helpers.ts:143` rule=`AGENTS.md` § Design laws — "One concept, one term" verdict=CONFIRMED
    wrong: `example(input, result, note)` names its second parameter `result` while the member it fills, the guard at `validators.ts:115`, and the shape at `shapers.ts:79` all call it `output`.
    repair: Rename the parameter to `output` and update the `@param` at `:132`.

### Verification

**Judge (DRIFT/high):** The concept's term is `output` everywhere it is read — the member, the guard key, the shape key, the guide row, and the builder's own `@param` description — while the parameter alone says `result`, which is the alternation the rule refuses. The claimed shadow-avoidance convention does not meet the e

**Lane DRIFT/high:** stands

**Lane EXCEPTION/medium:** drop

