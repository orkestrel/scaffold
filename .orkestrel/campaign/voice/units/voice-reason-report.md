# Unit voice-reason — report

Every TSDoc block under `src/` of `/home/user/fleet/reason` now opens with a third-person `-s` verb
that does not spell its own symbol's name, and every boolean `@returns` reads
`True if …; false otherwise`. The gate chain exits 0 at every step. The package has no `app/`
directory, so `src/core/**` is the whole population.

## Counts by kind

268 doc blocks rewritten, each counted once under the most specific kind that applies.

| Kind                                             | Blocks |
| ------------------------------------------------ | ------ |
| First sentence conjugated from the imperative     | 97     |
| First sentence given a verb (bare noun phrase)    | 146    |
| First sentence reworded to drop the symbol's name | 25     |
| Boolean `@returns` rewritten                      | 47     |

The boolean `@returns` rewrites are line-level and sit inside blocks already counted under the
first three rows: `src/core/validators.ts` (44), `src/core/helpers.ts` (2), `src/core/errors.ts` (1).

The 25 name-dropping rewrites are the 17 `*Options` interfaces (`Options for X` → `Configures X`),
the 4 reasoner classes (`The inferential reasoner — fact derivation with …` →
`Derives facts with …`), and the 4 definition arms (`A quantitative (factor-based numeric scoring)
definition.` → `Defines factor-based numeric scoring.`).

Launch scan against post-sweep scan (`.orkestrel/campaign/instruments/voice-scan.mjs`):

```text
launch: reason files= 26 blocks= 335 imperative=  98 verbless= 153 returnsBad= 47
after:  reason files= 26 blocks= 335 imperative=   0 verbless=   0 returnsBad=  0
```

The launch scan's `imperative=98` includes `Decimal places a derived fact's confidence is rounded
to …` (`src/core/constants.ts`), which reads as a bare noun phrase; this report counts it under
"given a verb", so the imperative row is 97 rather than 98.

## Verb taxonomy

Every verb was chosen for the kind of symbol it documents, matching the wave's landed packages.

| Symbol kind                        | Verb                                          |
| ---------------------------------- | --------------------------------------------- |
| Function or method, imperative doc | The same verb conjugated (`Insert` → `Inserts`) |
| Class                              | `Implements`, `Holds` for the state holder    |
| Behavioral interface               | `Declares`                                     |
| Data shape, union, result type     | `Represents`                                   |
| Definition arm                     | `Defines`                                      |
| Literal union of names or keys     | `Names`                                        |
| Event map member                   | `Fires when …`                                 |
| Event map type                     | `Represents the push observation surface of …` |
| Options interface                  | `Configures`                                   |
| Value constant                     | `Holds`; `Names` for an id; `Lists` for a set  |

## Files touched

All 21 are under `src/core/`.

- `src/core/types.ts` — 136 blocks: event members to `Fires when …`, data shapes to `Represents`,
  behavioral interfaces to `Declares`, `Options for` to `Configures`, definition arms to `Defines`.
- `src/core/validators.ts` — 44 `Determine whether` → `Determines whether`, 44 boolean `@returns`.
- `src/core/helpers.ts` — 51 imperative conjugations, 2 boolean `@returns`.
- `src/core/constants.ts` — 19 noun phrases given `Holds` / `Names` / `Lists`.
- `src/core/errors.ts` — `Represents an error thrown by …`, `Narrows …`, 1 boolean `@returns`.
- `src/core/parsers.ts` — `Parse` → `Parses`.
- `src/core/Reason.ts` — `Implements the reasoning orchestrator — …`.
- `src/core/builders/DefinitionBuilder.ts`, `src/core/builders/SubjectBuilder.ts` —
  `Implements a stateful workspace builder accumulating …`.
- `src/core/builders/managers/Collection.ts` — `Holds the id-keyed collection state …`.
- `src/core/builders/managers/EquationManager.ts`, `FactManager.ts`, `FactorManager.ts`,
  `GroupManager.ts`, `InferenceManager.ts`, `RuleManager.ts`, `VariableManager.ts` —
  `The {@link XInterface} implementation — …` → `Implements the {@link XInterface} — …`.
- `src/core/reasoners/InferentialReasoner.ts`, `LogicalReasoner.ts`, `QuantitativeReasoner.ts`,
  `SymbolicReasoner.ts` — name-echoing label replaced by the action:
  `Derives facts with unification variables and proof trees.`,
  `Deduces booleans from rules with forward or backward chaining.`,
  `Scores a definition's factors into one number.`,
  `Solves algebraic equations by variable isolation.`

`src/core/factories.ts`, `src/core/index.ts`, and `src/core/operators/*.ts` were already compliant
and are byte-identical to the launch tree.

Diffstat: 21 files changed, 316 insertions(+), 318 deletions(-).

## Gates

Run from `/home/user/fleet/reason` after the sweep, in the order the shared brief fixes.

| Command                | Exit | Excerpt                                                    |
| ---------------------- | ---- | ---------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` (70 files)     |
| `npm run lint:check`   | 0    | no output                                                   |
| `npm run check`        | 0    | `tsc --noEmit` for the root and core projects, no output   |
| `npm run build`        | 0    | `✓ 27 modules transformed.` … `✓ built in 3.56s`           |
| `npm test`             | 0    | 1063 + 111 + 46 + 26 + 83 tests passed, 18 files passed    |

`npm test` timing is an observation, not a criterion: the authoritative run belongs to the
Orchestrator's landing chain.

## Diff scope

- Every added and removed line begins with `*` or `/**`. A grep for a changed line outside a comment
  returns nothing, so no code token moved.
- No changed line carries `@example`, `@param`, `@remarks`, `@throws`, `@deprecated`, or `@see`.
  The only tag lines changed are the 47 `@returns` lines the wave owns.
- Multi-line first sentences were changed on their first line only, except three deliberate rewraps:
  `InferentialReasoner` and `LogicalReasoner` fell from two comment lines to one, and `Check` in
  `src/core/types.ts` moved one word across its line break. That accounts for the diffstat's two
  net removed lines.
- `git status --short` lists 21 files, all under `src/core/`.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-reason.diff`
- `/home/user/scaffold/tmp/units/voice/voice-reason.status`

## Decisions taken inside the rule

- `Check` in `src/core/types.ts` kept its colon clause but conjugated it, so the whole sentence is
  third person: "Represents a single field predicate: resolves `field` from the subject and
  compares it to `value` with `operator`."
- `Positionally unify a pattern fact …` became `Unifies a pattern fact positionally …` rather than
  `Positionally unifies …`, so the sentence opens on the verb.
- The four reasoner classes and the four definition arms lost a leading label that spelled the
  symbol's name and stated nothing the name did not. Each keeps the descriptive phrase that carried
  the fact (`fact derivation with unification variables and proof trees`,
  `factor-based numeric scoring`), so no referent is lost.
- The 7 manager classes keep `{@link XManagerInterface}`: that names a different symbol, and the
  em-dash appositive a later pronoun depends on (`FactorManager`'s `it`) is untouched.
- Domain nouns that are not the symbol's identifier were retained — `Represents a group of factors
  aggregated into one value.` for `FactorGroup`, "Names a machine-readable `ReasonError` code."
  for `ReasonErrorCode`. Each adds a fact the identifier does not carry.
- Comment lines longer than 100 columns were left unwrapped where the rewrite crossed that width.
  `printWidth` in `.oxfmtrc.json` governs code; the launch tree already carried a 103-column comment
  line, and `format:check` exits 0.

## Deviations

none.
