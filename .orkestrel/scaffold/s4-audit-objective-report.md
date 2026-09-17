# Unit S4 audit — objective lane report

Lane: `reviewer` holding the **objective** lane, Opus 5, native subagent, clean context,
2026-09-16. Transcribed by the Orchestrator from the lane's returned message; the role carries no
write tool.

**Engine substitution, recorded.** This lane's default engine is GPT-5.6 Sol. Sol wrote unit S4, so
Opus 5 held both lanes — separate subagents, clean contexts, blind to each other.

The lane ran no gate, no script under `tmp/units/`, and no mutating command. Every ruling rests on
the diff, the delta, the source, and the installed Vite declaration and runtime. It derived S4's
delta from `tmp/audit/s4-delta.txt`, whose `index` lines show exactly three files moved —
`src/core/templates.ts`, `tests/src/core/compilers.test.ts`, `vite.config.ts` — with hunk arithmetic
closing exactly.

## Per-claim verdicts

1. **The runtime check matches the narrowed type — CONFIRMED.** Both homes end with
   `typeof plugin.name === 'string'`. Attempts to break it, all failing: `new String('x')` is
   excluded by `typeof`, correctly, because the narrowed type is the primitive; a
   `Symbol.toPrimitive` on `name` is irrelevant because the only later use is `===`, which does not
   coerce. One residual: a non-deterministic getter returning a string during the guard and a number
   at the comparison makes the narrowing go stale. It is inert — the comparison fails, the base
   entry is pushed unchanged, and nothing dereferences the value as a string.
2. **The callable-`then` exclusion is correct over the installed declaration — CONFIRMED.** The
   union is
   `PluginOption = Thenable<Plugin | { name: string } | FalsyPlugin | PluginOption[]>` at
   `node_modules/vite/dist/node/index.d.ts:2335-2339`. The decisive evidence is Vite's own
   flattener at `node_modules/vite/dist/node/chunks/node.js:2923-2928`, which detects a thenable by
   reading `then` rather than by `instanceof`, and whose `Promise.all` resolves anything with a
   callable `then`. An entry with a callable `then` is therefore replaced by its resolved value
   before any plugin runs, and its own `name` is never the effective plugin name — so treating it as
   a named plugin would be wrong. The new exclusion matches Vite's mechanism; `instanceof Promise`
   did not, and additionally missed a cross-realm promise from a `vm` context, which `instanceof`
   reports false for and `'then' in` reports true for. **Strictly stronger and strictly more
   faithful.**
   Nothing real is wrongly rejected: the `Plugin` interface declares no `then` member, and a runtime
   plugin object carrying a callable `then` cannot work in Vite at all. A truthy non-callable `then`
   is not excluded by the predicate, and Vite's own loop never terminates on it, so the narrower
   `typeof … === 'function'` test costs nothing. A falsy `then` is excluded by neither — agreement.
   Two unobservable sensitivities, recorded rather than raised as findings: a polluted
   `Object.prototype.then` would degrade the merge to concatenation, and Vite's `v?.then` reads the
   same prototype chain and loops forever first; a throwing `then` getter now throws out of the
   predicate where `instanceof` read nothing, and Vite's `v?.then` reads the identical property and
   throws identically.
3. **Still unexported, target unchanged — CONFIRMED.** A repository-wide search returns only the two
   declarations, their two call sites each, the test pin, and campaign records.
4. **The new cases red against the previous predicate and green against the current, asserting
   identity — CONFIRMED**, derived from the algorithm rather than from the report's counts. Under
   `'name' in plugin` alone, `{ name: 7 }` name-matches on `7 === 7`, selection collapses the pair,
   and the length assertion reddens. Under `!(plugin instanceof Promise)`, the structural object is
   named, matches `declared`, and the same assertion reddens. Both cases assert length before
   identity, so an empty result cannot pass vacuously.
5. **The census describes each case's mechanism truthfully — CONFIRMED.** The repeated-name case
   calls `outputBoundary` twice with different paths, and `configs/helpers.ts:404-409` fixes the name
   independent of the path argument, so the base genuinely repeats a name and calls no factory. The
   old sentence was false; the new one is true. "No emitted base repeats a plugin name" holds across
   every emitted `plugins:` array. See F1 for what the census still omits.
6. **Each red runner asserts the named case failed and the expected population ran — CONFIRMED.**
   Startup is closed by the error assertion plus a `JSON.parse` that throws on the empty stdout a
   failed start produces; collection by the per-suite message assertion and independently by
   `executed.length === 1`; termination by the signal assertion. Beyond those, the executed title,
   the outcome, the pending count, and an `AssertionError:` prefix are all pinned. The negative
   control drives a title no case carries and pins the refusal by regex.
7. **Every mutation sits inside the restoring block, and each header states the limit — CONFIRMED**,
   verified per instrument with line numbers. Every pristine read precedes the `try`, which is
   correct: a read is not a mutation, and capturing before the block is what makes the restore
   possible.
8. **The relocation control asserts equal lengths before asserting different bytes — CONFIRMED.**
   The perturbation is same-width by construction, and the anchor's uniqueness is asserted before
   use.
9. **Regenerated, byte-identical, no expectation weakened — CONFIRMED for the delta's half.** The
   three homes of the predicate agree character for character, tabs included. The pin is a
   strengthening: an exact substring against a 40-line literal that now carries the extra conjunct,
   with no assertion removed or loosened anywhere in S4. `vite.config.ts` was produced by the
   generator through Vite's own SSR loader, writing only artifacts whose content differs.
   `tests/src/core/templates.test.ts` correctly needed no edit, because its reader admits only
   value-exported top-level declarations returning the literal `UserConfig`, and `isNamedPlugin` is
   neither. No digest, byte-count, or line-count pin over the generated configuration exists.
10. **No vendored file changed, nothing outside the owned list moved — CONFIRMED.** Of the eight
    files in the complete patch, only three carry a changed blob hash in S4's delta, and all three
    are on S4's owned list.

## Findings

**F1 — the census's control paragraphs no longer account for the block they describe. Low.**
Those paragraphs name seven cases; the block now holds nine. Both new cases assert exactly the value
the bare merge produces, so they carry no in-file control, and their discriminating red lives
entirely in a mutation instrument outside the tree. A reader of the committed file cannot tell that.
This is the same shape of drift the round-three finding named, re-opened from the other direction.

**F2 — the runner carries an assertion that cannot fail, and prints the population it does not
assert. Low.** `assert.equal(report.numTotalTests, assertions.length)` compares Vitest's own total
against a count derived from the same report in the same run; the two agree by construction, which
`.claude/rules/tests.md` names. The exact failure it admits: if the `src:core` project silently
stopped discovering a test file, the total would drop, the derived count would drop with it, the
assertion would still pass, the named case would still fail, and the runner would certify the red
over a smaller population than it claims. Delete it and take the expected total as a parameter.

## Hazard rulings

- **The callable-`then` exclusion.** No real Vite plugin, and no object a plugin factory returns,
  can carry a callable `then` and still function. A genuine `Promise<Plugin>` is excluded exactly as
  before, and a cross-realm promise is now excluded too. A plugin wrapped by a library that adds a
  `then` is excluded correctly, because Vite would resolve the wrapper and use the inner value, so
  the wrapper's `name` is not the plugin's name.
- **The new cases' untyped door.** They split. The structural-promise case drives a value that **is**
  constructible from typed code — it carries `satisfies PluginOption` and calls through the ordinary
  typed signature — so it proves a rule reachable through the package's own typed surface, and the
  old predicate got it wrong. The non-string case does not: `{ name: 7 }` is assignable to no member
  of the union, which is why it must reach the function through `Reflect.apply`. It proves the
  mechanism — the guard's runtime honesty — not a rule any typed caller can reach. Worth recording
  plainly: one of the two new cases pins behaviour for a value the type system forbids. It stands
  because the Orchestrator ordered the string check on guard-honesty grounds, not because the vector
  is reachable.
- **The runner's JSON reading.** All three degradations fail loudly rather than certifying. A
  changed reporter shape throws a `TypeError` out of the instrument; two cases sharing a title
  substring both execute and fail the single-execution assertion; no report at all throws at
  `JSON.parse`. The residual is F2.
- **The predicate change moving emitted bytes.** Every pin moved with it, and the split between
  hand-edit and regeneration is the correct one: the test pin is an expectation and was hand-edited,
  the generated artifact was regenerated. No pin was edited that should have been regenerated, and
  none regenerated that should have been edited.

## Referrals

- To the subjective lane: the emitted comment still says "promises" where the exclusion is now any
  callable-`then` object.
- To the Orchestrator: F1's fix is a comment edit in a file the commit will carry; F2's fix is
  inside a retained instrument the S4 brief placed off-limits to the writer. Neither falsifies a
  claim.

VERDICT: ACCEPT
