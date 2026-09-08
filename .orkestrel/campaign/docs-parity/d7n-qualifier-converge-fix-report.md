# Report — `d7n-qualifier-converge-fix`

`implementer` on Claude Opus 5, sole writer in `/home/user/fleet/qualifier` from `a5764d6`.
2026-09-08, 03:01Z to 03:06Z. Every item closed; no deviation.

Diffstat:

```text
 README.md             |  7 +++++--
 guides/qualifier.md   | 33 ++++++++++++++++++++++++++++-----
 src/core/Qualifier.ts |  2 +-
 src/core/constants.ts |  4 ++--
 src/core/factories.ts | 20 ++++++++++++++++----
 src/core/helpers.ts   | 12 ++++++------
 tests/guides.test.ts  | 33 ++++++++++++++++++++++++++++++++-
 7 files changed, 90 insertions(+), 21 deletions(-)
```

## Item 1 — all-caps emphasis (QF1)

Each hit lowered in place, the sentence's contrast carried by the words already in it.

```diff
-  * The engine is OWNED when self-created (destroyed on `destroy()`) and borrowed
+  * The engine is owned when self-created (destroyed on `destroy()`) and borrowed
   * when injected (never destroyed). Semantic validation runs before the first pass
```
```diff
-  * A standalone qualifier creates and OWNS one shared quantitative-plus-logical
+  * A standalone qualifier creates and owns one shared quantitative-plus-logical
   * reason engine, destroying it on `destroy()`. An injected `options.engine`
   * remains caller-owned and is never destroyed. `validate` runs semantic
```
```diff
-  * `resolveField` (a plain string field is ONE key, never dot-split — the split
+  * `resolveField` (a plain string field is one key, never dot-split — the split
   * here is the token-to-path bridge). A finite number renders with `en-US`
   * thousand grouping (`5010` → `5,010`); any other resolved value String-coerces.
-  * An UNRESOLVED path renders as the empty string.
+  * An unresolved path renders as the empty string.
```
```diff
-  * a finite number is NOT grouped here (grouping is {@link interpolateMessage}'s
+  * a finite number is not grouped here (grouping is {@link interpolateMessage}'s
```
```diff
-  * The checked form renders only when `field` and `comparison` are BOTH
+  * The checked form renders only when `field` and `comparison` are both
```
```diff
-  * the injected `evaluator`. A membership check (`any` / `none`) over an EMPTY
+  * the injected `evaluator`. A membership check (`any` / `none`) over an empty
```
```diff
-  * against the SAME subject snapshot the pass evaluated, so a conclusion the pass
+  * against the same subject snapshot the pass evaluated, so a conclusion the pass
```

Every hit sits in a `@remarks` block, so no description paragraph moved on this item and
the guide needed no propagation for it. The `renderPremise` and `interpolateMessage`
descriptions named in the brief were unaffected: their all-caps words were in `@remarks`,
their description paragraphs untouched, and `npm run docs` reported no disagreement on
either row.

### The ruled grep

`grep -rnE '\b[A-Z]{3,}\b' src guides/qualifier.md README.md`, run over the whole of `src`,
`guides/qualifier.md`, and `README.md` after the edits. Every surviving hit ruled:

| Hit | Sites | Ruling |
| --- | --- | --- |
| `DEFINITION`, `MISMATCH`, `DESTROYED`, `ENGINE` | `src/core/Qualifier.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `src/core/errors.ts`, `guides/qualifier.md` | code tokens: the `QualifierErrorCode` union's arms, backticked or quoted at every prose site |
| `INVALID`, `MISSING` | `src/core/helpers.ts` | code tokens: `ReasonError` codes the mapping reads |
| `TIV` | `src/core/helpers.ts`, `guides/qualifier.md` | sample data inside a fence, the domain name a fictional `createQuantitativeDefinition` example carries |
| `JSON` | `guides/qualifier.md:4`, `README.md:4` | an abbreviation this audience reads daily, in the compared tagline |
| `API`, `Kind` | `guides/qualifier.md` table headers | column headings, not prose |
| `ESM` | `README.md:26` | an abbreviation this audience reads daily |
| `MIT`, `LICENSE` | `README.md:76` | a license name and a filename |

No emphasis remains. The criterion grep for the named set is empty:

```text
$ grep -rnE '\b(OWNS|OWNED|UNRESOLVED|EMPTY|SAME)\b' src
exit 1
```

## Item 2 — the lead-in (QF2, Ruling 21)

```diff
 #### Create a qualifier
 
+This fence adds to the quickstart what the factory family itself contributes: the
+optional `message` and `rulings` inputs, and the fresh value each factory returns
+with every absent optional key omitted.
+
 ```ts
```

## Item 3 — the guard sentence (QF3, Ruling 27)

The interface sentence struck; the guard sentence stands alone over the Validators table,
every one of whose rows is a guard.

```diff
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. In a guard table a `Shape` cell holds the type the guard narrows to.
+In a guard table a `Shape` cell holds the type the guard narrows to.
```

## Item 4 — `createRuling` (QF4)

The factory family's verb, kept distinct from the `Ruling` interface row ("Represents an
authored consequence for one rule in one logical pass.") by what follows it.

```diff
- * Builds a fresh {@link Ruling} from the rule it reacts to and the effect it applies.
+ * Creates a fresh {@link Ruling} from the rule it reacts to and the effect it applies.
```

Propagated with `npm run docs -- --to guide`:

```diff
-| `createRuling`                  | function | Builds a fresh `Ruling` from the rule it reacts to and the effect it applies.  |
+| `createRuling`                  | function | Creates a fresh `Ruling` from the rule it reacts to and the effect it applies. |
```

## Item 5 — the titled demonstration (QF5, Ruling 14)

Both sides extended in one change, byte-equal after the comment prefix is stripped. Nothing
deleted from either side: the quickstart's ruling now appears as `messaged`, and the fence
adds the optional `message` input, the optional `rulings` input, the absent-key contract on
each factory, and the fresh-value contract on the copied `passes` array.

```diff
-const definition = createQualificationDefinition('standard', 'Standard eligibility', [gates], {
-	rulings: [createRuling('license', 'gates', 'licensed', 'restriction')],
+const bare = createRuling('license', 'gates', 'licensed', 'restriction')
+const messaged = createRuling('license', 'gates', 'licensed', 'restriction', {
+	message: 'A license is required',
+})
+
+'message' in bare // false — an absent optional key is omitted, never written as undefined
+messaged.message // 'A license is required'
+
+const passes = [gates]
+const definition = createQualificationDefinition('standard', 'Standard eligibility', passes, {
+	rulings: [messaged],
 })
 
+'description' in definition // false
+definition.passes === passes // false — the factory copies what it is handed
+
 const qualifier = createQualifier()
```

The same lines land in `src/core/factories.ts`'s `@example Create a qualifier` block, each
prefixed ` * `.

The fence's commented claims are executed rather than asserted as text alone. The case
`returns what the titled factory fence claims` was appended to the package's own
`describe('flagship fences')` section, which Ruling 20 leaves to each package. Its
behavioural assertions are paired with a presence guard on each commented line, the form
the section's existing cases take.

### Failing first

The proof was flipped on both sides of the titled pair — `'description' in definition //
false` to `// true` in `guides/qualifier.md` and in `src/core/factories.ts` — so the
equality gate stayed green and only the new case could redden. The flip and its restore ran
through `tmp/d7n-qualifier-converge-fix/falsify.py`, an instrument inside the checkout.

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides     # claim flipped
 ❯ tests/guides.test.ts:410:21
    410|   expect(guideText).toContain("'description' in definition // false")
 Test Files  1 failed (1)
      Tests  1 failed | 24 passed (25)
exit 1

$ PATH=/opt/npm11/bin:$PATH npm run test:guides     # claim restored
 Test Files  1 passed (1)
      Tests  25 passed (25)
exit 0
```

## Item 6 — the header (QF6, Ruling 21)

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
 // this repo's own `guides/README.md` manifest. The constants that follow are this
-// package's own, and are the only part a sibling package changes.
+// package's own, as is the executed section that closes the file.
```

The region from `const root = ` (line 57) through the manifest loop's closing brace (line
268) equals the pilot's lines 47 to 258:

```text
$ diff <(sed -n '47,258p' /home/user/fleet/abort/tests/guides.test.ts) <(sed -n '57,268p' tests/guides.test.ts)
exit 0
```

The package's own cases sit outside that region, in `describe('flagship fences')`.

## Item 7 — the stranded literal (QF7, Ruling 18)

```diff
 /**
- * Names the reserved internal projection namespace a pass's working projection is written
- * under, `'qualification'`.
+ * Names `'qualification'`, the reserved internal projection namespace a pass's working
+ * projection is written under.
  */
 export const QUALIFICATION_KEY = 'qualification'
```

Propagated with `npm run docs -- --to guide` into the `### Constants` table's `Summary`
cell; the `Shape` cell keeps `string` (Ruling 21).

## Item 8 — the README's route (QF8)

The onboarding paragraph takes rater's form. The pitch blockquote is untouched and stays a
plain noun phrase, so the tagline case still passes.

```diff
-definition; `Qualifier` only evaluates what it is given. Environment-agnostic — no
-I/O, no browser or server assumptions. Part of the `@orkestrel` line.
+definition; `Qualifier` only evaluates what it is given. Inject a
+[`@orkestrel/reason`](https://github.com/orkestrel/reason) `ReasonInterface` where
+qualification shares an engine with the rest of your reasoning, and call `destroy()`
+when the qualifier's work is done. Environment-agnostic — no I/O, no browser or
+server assumptions. Part of the `@orkestrel` line.
```

## Item 9 — the closing items (QF9, Rulings 13, 20, 21, 25, 26, 28)

**The `Shape` idiom.** No table changed, and the report records why rather than leaving the
item silently unworked. `guides/qualifier.md`'s `## Surface` holds these tables. `### Types`
and `### Constants` and `### Validators` already carry `Shape` under the sentence their kind
takes — the interface-and-alias sentence, the constants sentence, and (after item 3) the
guard sentence alone. `### Errors`, `### Helpers`, `### Factories`, and `### Classes` carry
no `interface` or `type` row and no `const` row, so Ruling 15's trigger and Ruling 25's
trigger both stay unfired; Ruling 26 and Ruling 28 bind a row "in a table that carries
`Shape`", and no function, guard, or class row sits in a table that does. The
pilot `/home/user/fleet/abort/guides/abort.md` and `/home/user/fleet/rater/guides/rater.md`
read the same way: `Shape` on Types and Validators, absent from Factories, Helpers, Classes,
and Errors. No convention sentence gained the Ruling 26 or Ruling 28 clause, because no
table it would describe exists here. The criterion grep for an empty cell is empty:

```text
$ grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/qualifier.md
exit 1
```

**`#` links.** The close brief listed no site, and `npm run docs` reports no member-reference
disagreement, so nothing moved.

**Fence lead-ins.** Each remaining heading the close brief listed took one sentence.

```diff
 ### Conditions do not block downstream work
 
+A conditional ruling is authored like a blocking one, with a scope and a message:
+
 ```ts
```
```diff
 ### Referral blocks downstream work
 
+A referral ruling names the review a subject needs, and takes no scope here:
+
 ```ts
```
```diff
 ### Observing
 
+The `on` option carries the initial emitter hooks, and `error` handles a listener
+throw:
+
 ```ts
```

## Item 10 — propagation

```text
$ npx oxfmt --config .oxfmtrc.json --write guides/qualifier.md README.md tests/guides.test.ts src
Finished in 1090ms on 11 files using 4 threads.
exit 0

$ PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0
exit 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
exit 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
exit 0
```

## Acceptance criteria

### 1 — owned files only, no code token moved

```text
$ git status --short
 M README.md
 M guides/qualifier.md
 M src/core/Qualifier.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M tests/guides.test.ts

$ git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'
exit 1
```

`tmp/d7n-qualifier-converge-fix/` holds the instruments and is ignored, so it does not
appear in status.

### 2 — format, lint, typecheck

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/qualifier.md README.md tests/guides.test.ts src
All matched files use the correct format.
Finished in 1077ms on 11 files using 4 threads.
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src
exit 0

$ PATH=/opt/npm11/bin:$PATH npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
exit 0
```

### 3 — docs at zero, both directions at `written: 0`

Recorded under item 10.

### 4 — the ruled greps

```text
$ grep -rnE '\b(OWNS|OWNED|UNRESOLVED|EMPTY|SAME)\b' src
exit 1

$ grep -c 'In a guard table' guides/qualifier.md
1

$ grep -B1 'In a guard table' guides/qualifier.md | grep -c "an interface's data members"
0

$ grep -c 'Builds a fresh' src/core/factories.ts guides/qualifier.md
src/core/factories.ts:0
guides/qualifier.md:0

$ grep -c "Names \`'qualification'\`" src/core/constants.ts
1

$ grep -c 'orkestrel/reason' README.md
3

$ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
exit 0

$ awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/qualifier.md
exit 0

$ grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/qualifier.md
exit 1
```

### 5 — suites

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
 Test Files  1 passed (1)
      Tests  25 passed (25)
   Duration  852ms (transform 367ms, setup 364ms, import 213ms, tests 125ms, environment 0ms)
exit 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.23s (transform 590ms, setup 368ms, import 310ms, tests 346ms, environment 0ms)
exit 0
```

Observation, `npm run test:src:core`:

```text
 Test Files  4 passed (4)
      Tests  167 passed (167)
   Duration  990ms (transform 823ms, setup 848ms, import 606ms, tests 216ms, environment 0ms)
exit 0
```

## Ancillary decisions

- **`createRuling`'s new opener** keeps the original sentence's remaining words
  ("… from the rule it reacts to and the effect it applies.") and swaps only the verb. The
  interface row's "Represents an authored consequence …" is already distinct after the verb.
- **The `bare` ruling in the titled fence** repeats the quickstart's ids rather than
  introducing another rule, so the fence stays about the factories and not about a new
  definition.
- **The `### Observing` lead-in** states what `QualifierOptions` declares for `on` and
  `error` rather than a stronger claim about listener arity, which the `EmitterHooks` type
  does not pin here.
- **The new test case is named for what it proves** ("returns what the titled factory fence
  claims"), not for the item that specified it.
