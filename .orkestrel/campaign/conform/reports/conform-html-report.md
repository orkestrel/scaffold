# Unit conform-html — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green in order,
`npm run test:distribution` is green beside it, and `git status --short` lists only files
under Owned. Fix round 3 closed the objective lane's F-1 by deriving the presence guard's
real population and extending the `claims` list to it, then ran one breadth pass over every
sentence this unit wrote about an instrument's coverage; § Fix round 3 names each sentence
and its reading.

## Rows

| Id           | Disposition | Note                                                                                                                                                                          |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| html-subj-1  | applied     | `guides/html.md` Helpers preamble drops "none of them throws" and names `foldNode` as the exception with the section link. Fix round 1 also dropped `total` from that lead and from the `foldNode` row. No code change. |
| html-subj-2  | applied     | `src/core/HTML.ts` "in five stages" → "in this order"; `guides/html.md` "Four passes, in this order:" → "The passes run in this order:". Numbered list unchanged.              |
| html-subj-3  | applied     | `guides/html.md` `VOID_ELEMENTS` row: "the 13 elements" → "the elements".                                                                                                     |
| html-subj-4  | applied     | Positional list references removed at the guide sites the row names and `HTML.ts` moved to `pass`. Merged edits applied once per line for :240 and :306. Fix round 2 removed "law three" from a `tests/src/core/HTML.test.ts` title under the same rule. |
| html-subj-5  | applied     | Every named count deleted at the guide, `constants.ts`, `constants.test.ts`, and `guides.test.ts` sites the row names. `the two engines` and `two renderers` kept. Fix round 2's number-word sweep found and deleted further counts; § Sweeps rules every hit. |
| html-subj-6  | applied     | `guarantee` removed as a behavioural claim at :88, :179, :187, and the noun form at :287.                                                                                     |
| html-subj-7  | applied     | Causal `since` → `because` at :287 and :306; temporal `once` → `after` at :285 and `constants.ts:436`. Permitted senses left.                                                 |
| html-subj-8  | applied     | Document navigation reworded at :55, :154, :158, :289, :291, :338, :435 and in the package-owned test comments the row names.                                                 |
| html-subj-9  | applied     | `scanRawText`'s `entities` documented in the "If `true`, …; if `false`, …" form with "Default: `false`".                                                                      |
| html-subj-10 | applied     | `isSafeURL`'s `schemes` gains "Default: `SAFE_URL_SCHEMES`".                                                                                                                  |
| html-obj-1   | applied     | `isHTMLNode` runs on the declared `holds` primitive; `attempt` dropped from the file's import. `guides/html.md:332` names both forms.                                          |
| html-obj-2   | applied     | `tests/guides.test.ts` gains a `flagship fences` block: one `it` per guide fence plus the README pair, with per-source presence guards. Fix round 2 bound every non-ASCII literal in that block by code-point escape, fix round 3 the last one. Fix round 3 also extended each guard to the fence lines its transcription reuses. |
| html-obj-3   | applied     | `CollectionMutation`, `attemptCollectionMutation`, `restoreCollectionMutation` moved to `tests/setup.ts`; `constants.test.ts` imports them; `setup.test.ts` gains the case.    |
| html-obj-4   | applied     | `URL_SAFETY_GROUPS` frozen. Failing-first proof added to `tests/setup.test.ts`.                                                                                               |
| html-obj-5   | applied     | `tests/distribution.test.ts` runs on `createScratch` / `destroyScratch`; the local `writeFile` and the raw `node:fs` scratch calls are gone.                                  |
| html-obj-6   | applied     | `runNpm` spawns `process.execPath` with `process.env.npm_execpath`. No `.bin` shim, no `shell`. Fix round 1 corrected the comment's false claim about which gates run it.     |
| html-obj-7   | applied     | `isBrowserVuePath` and its `describe` block and import row deleted.                                                                                                           |
| fleet-F1     | applied     | Folded into html-obj-7 by that row's id. No second edit. `tests/setup.ts` carries no header comment naming the helper, so nothing further to strike.                          |
| fleet-F2     | noop        | No class has the shape. `grep -rn "^export class \|^class " src/` returns `src/core/HTML.ts:69` `export class HTML implements HTMLInterface` and nothing else; its first fields are `readonly #document` and `readonly #spans`, both already `#`. `grep -rn "readonly id" src/` returns nothing, so fleet-F2's population is empty. No edit. |

## Files touched

- `/home/user/fleet/html/guides/html.md` — count, positional-reference, `guarantee`, `since` / `once`, and `above` / `below` repairs; the `foldNode` exception and the `total` claim withdrawn from its lead and its table row; `holds` named beside `attempt`; the keyed-table and legacy-identifier counts deleted.
- `/home/user/fleet/html/src/core/HTML.ts` — `distill` TSDoc drops the stage count and moves to `pass`.
- `/home/user/fleet/html/src/core/constants.ts` — `HTML_WHITESPACE` count deleted; temporal `once` → `after`.
- `/home/user/fleet/html/src/core/helpers.ts` — `scanRawText` and `isSafeURL` TSDoc take the required boolean and default forms.
- `/home/user/fleet/html/src/core/validators.ts` — `isHTMLNode` runs on `holds` instead of an `attempt` outcome it reduced by hand.
- `/home/user/fleet/html/tests/distribution.test.ts` — owned scratch through `@orkestrel/test/server`; npm spawned as a JavaScript entry; the `npm_execpath` comment names the invocations that actually run the proof.
- `/home/user/fleet/html/tests/guides.test.ts` — the `flagship fences` executed block; both presence guards carrying every fence line their transcriptions reuse; the drop-in header naming the `@src/core` imports beside the constants and the block; the executed-half comment naming which fences the cases run; header and comment repairs; every non-ASCII literal written as a code-point escape and the last raw one removed from a title.
- `/home/user/fleet/html/tests/setup.ts` — `URL_SAFETY_GROUPS` frozen; the collection-mutation trio adopted; `isBrowserVuePath` deleted; the page-builder and comment-enumeration doc counts deleted.
- `/home/user/fleet/html/tests/setup.test.ts` — freeze proof, collection-mutation case with the leftover-property comment corrected to name the mutation cycle, browser-path block deleted, header comment repaired and reflowed, introducer count deleted from a title.
- `/home/user/fleet/html/tests/src/core/HTML.test.ts` — the category count and the positional "law three" deleted from two titles.
- `/home/user/fleet/html/tests/src/core/constants.test.ts` — imports the shared mutation helpers; test title count deleted.
- `/home/user/fleet/html/tests/src/core/helpers.test.ts` — bench comment reworded; the decode, corpus-suite, and dangerous-scheme counts deleted.
- `/home/user/fleet/html/tests/src/core/parsers.test.ts` — bench comment reworded; the sized-parse count deleted.
- `/home/user/fleet/html/tests/src/core/shapers.test.ts` — the leaf-shape count deleted from the header comment.

## Diffstat

```text
 guides/html.md                   |  94 ++++----
 src/core/HTML.ts                 |   6 +-
 src/core/constants.ts            |   4 +-
 src/core/helpers.ts              |   5 +-
 src/core/validators.ts           |   5 +-
 tests/distribution.test.ts       |  74 +++---
 tests/guides.test.ts             | 473 ++++++++++++++++++++++++++++++++++++++-
 tests/setup.test.ts              |  71 ++++--
 tests/setup.ts                   |  92 +++++++-
 tests/src/core/HTML.test.ts      |   4 +-
 tests/src/core/constants.test.ts |  58 +----
 tests/src/core/helpers.test.ts   |  11 +-
 tests/src/core/parsers.test.ts   |   4 +-
 tests/src/core/shapers.test.ts   |   2 +-
 14 files changed, 710 insertions(+), 193 deletions(-)
```

## Failing-first proofs

**html-obj-4.** Command:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`

- Before the fix: `Tests 1 failed | 29 passed (30)`. The named test is
  `setup - adversarial corpora > refuses every mutation of the URL-safety group list`,
  failing at `expect(Object.isFrozen(URL_SAFETY_GROUPS)).toBe(true)` with
  `expected false to be true`.
- After `Object.freeze`: `Tests 30 passed (30)`.
- The final `setup` project reports `Tests 29 passed (29)`, and the sequence explains the
  difference rather than a lost case: the pair was measured while `isBrowserVuePath`'s
  `describe` block was still present. html-obj-7 then deleted that block and html-obj-3
  added the collection-mutation case, and the deletion removed more cases than the
  addition supplied.

**F-1, fix round 3.** Command:
`npm --prefix /home/user/fleet/html run test:guides`. § Fix round 3 records the control's
three readings and the file each was written to.

Every other row is a placement, reuse, naming, or documentation row and is closed by a
sweep plus its gate, per § Sweeps.

## Sweeps

Every reading in this table was taken after the last edit of fix round 2, on 2026-09-03.
Each pattern ran over `guides/html.md`, `guides/README.md`, `README.md`, `src/`, and
`tests/`, excluding the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and
`tests/config.test.ts`, except where the row names a narrower path. Fix round 3 edited only
`tests/guides.test.ts` and `tests/setup.test.ts` prose and added claim strings quoting
`guides/html.md` and `README.md` fence lines, so no row's reading moved; the non-ASCII row
is the one fix round 3 changed, and § Fix round 3 records it.

| Pattern                                                                                                                             | Paths          | Result                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-i "\b(one\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten)\b"`                                                              | `guides/html.md`, `guides/README.md`, `README.md`, `src/`, `tests/` | The number-word sweep fix round 2 adopted in place of the phrase list. `guides/README.md` and `README.md` read empty for `two`–`ten`. Every remaining hit is ruled individually in § Number-word rulings; each count it admitted was deleted, and each permitted sense is recorded there with its reason. |
| `five stages\|Four passes\|stage 1\|stage 2\|the 13 elements\|the five code points\|Five categories\|Three laws\|Two consequences\|Three of its rules\|three rules above\|Two honest details\|the five HTML ASCII\|five constants` | whole checkout outside `node_modules` | One hit, `guides/contract.md:614`, a vendored dependency guide mirror outside Owned. Retained as the row-level check; the number-word sweep is what now bounds the population. |
| `-i "\bstage\|\bstages\|\bstaged\|\bstaging"`                                                                                       | `guides/html.md`, `src/` | No hit in either path. Every remaining checkout hit is in `guides/probe.md`, a vendored mirror whose subject is a `Stage` type.               |
| `\b(above\|below)\b`                                                                                                                | `guides/html.md`, `src/`, `tests/` | Hits at `guides/html.md:100`, `src/core/constants.ts:133`, `src/core/helpers.ts:136`, `tests/setup.ts:895`, `tests/setup.test.ts:393`, `tests/src/core/helpers.test.ts:106` — every one a stack or tree position. `tests/setupPolicy.ts:2098` and `tests/policy.test.ts:544` are vendored and off-limits. No document navigation remains. |
| `-i "guarantee\|ensure"`                                                                                                            | `guides/html.md`, `src/`, `README.md`, `guides/README.md` | No hit. In `tests/` the only hits are the `ScratchInterface.ensure` code identifier at `tests/distribution.test.ts:494`, `:495`, `:570`, and `:605`, which the substitution table exempts as a literal identifier. |
| `-i "\b(since\|once)\b"`                                                                                                            | `guides/html.md`, `src/` | Hits at `guides/html.md:5`, `:63`, `:193`, `:301`, `src/core/HTML.ts:309`, `src/core/constants.ts:588`, `src/core/helpers.ts:1528`, `:1530` — every one the "one occurrence" sense (`parse once`, `read once`, `occurs exactly once`), recorded as permitted. No causal `since` and no temporal `once` remain. |
| `isBrowserVuePath\|npm\.cmd\|shell: SHELL\|writeFileSync`                                                                           | whole checkout outside `node_modules` | No hit in Owned. `isBrowserVuePath`, `npm.cmd`, and `shell: SHELL` read empty everywhere. `writeFileSync` survives only in the vendored `tests/config.test.ts` and `tests/setupPolicy.ts`. |
| `mkdtempSync`                                                                                                                       | whole checkout outside `node_modules` | No hit inside Owned. The remaining hits are the vendored `tests/config.test.ts:8`, `:639`, `:1179`, the vendored `tests/setupPolicy.ts:4`, `:71`, and the `guides/test.md` mirror at `:593`, `:911`, `:1103`. |
| `attempt`                                                                                                                           | `src/core/validators.ts` | No match. |
| `readonly id` and `^export class \|^class `                                                                                         | `src/`         | `readonly id` returns nothing; the class sweep returns `src/core/HTML.ts:69` and nothing else. fleet-F2's population is empty because no class carries the field, not because no class exists. |
| `@param \w+ - Whether`                                                                                                              | `src/`         | No match. Closes html-subj-9's old form. |
| `^\t\w+(: [^=]+)? = ` beside `Default:`                                                                                             | `src/`         | The defaulted-parameter population is `src/core/helpers.ts:658` (`entities = false`) and `:791` (`schemes = SAFE_URL_SCHEMES`), and the `Default:` population is `:651` and `:786`. Every default carries its documented form, which closes html-subj-9 and html-subj-10. |
| `\b\d+ (elements\|members\|rules\|laws\|passes\|stages\|categories\|constants\|renderers\|engines\|tests\|cases\|shapes\|helpers\|functions\|types\|options\|fences\|files\|guards\|leaves\|nodes\|columns\|rows)\b` (case-insensitive) | whole checkout outside `node_modules` | The numeral counterpart of the number-word sweep, added in fix round 2 because a count can be written as a digit. One hit, `guides/contract.md:255`, a vendored dependency guide mirror outside Owned. |
| `Pure, total leaves\|total catamorphism`                                                                                            | whole checkout outside `node_modules` | `Pure, total leaves` survives only at `guides/guide.md:63`, a vendored mirror. `total catamorphism` survives at `guides/html.md:170`, `src/core/types.ts:389`, `:427`, and `src/core/HTML.ts:166`, each in the no-node-skipped sense the `guides/html.md:170` row defines in place. See § Observations. |
| `[^\x00-\x7F]`                                                                                                                      | `tests/guides.test.ts` | Fix round 3's reading. Two hits: the em dash in the `INTERNAL` doc block at `:85`, which is prose and is the drop-in's own, and the U+2019 apostrophe in the streaming case's title at `:292`. The title is now ASCII, so the file's only non-ASCII outside the deliberate code-point escapes is that doc-block em dash. |

### Number-word rulings

Every hit the number-word sweep admitted, with the sense it was ruled by. A hit ruled a
count was deleted; a hit ruled permitted names its members in its own sentence, states a
bound, or quotes fixture text.

| Site                                     | Text                                             | Ruling                                                                                     |
| ---------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `guides/html.md:43`                      | "for the two keyed tables"                       | Count, deleted. F-1's prescription, adopted verbatim: "for the keyed tables".              |
| `guides/html.md:142`                     | "the two optional legacy identifiers"            | Count, deleted. The `DoctypeNode` Surface row at `:23` already states the same set without a number. |
| `guides/html.md:5`, `:154`               | "the two document-shaping engines", "The two engines" | Permitted. The sentence names `sanitize` and `distill`. The brief rules these left alone.   |
| `guides/html.md:28`, `src/core/helpers.ts:83` | "the parser's two stacks"                   | Permitted. The pair is fixed by `HTMLOpenPosition.overflow`, a boolean.                     |
| `guides/html.md:48`, `:52`, `src/core/constants.ts:106`, `src/core/types.ts:186` | "so the two can never disagree" / "cannot drift" / "the two fields" | Permitted. Each names its referents in the same sentence. |
| `guides/html.md:88`, `:187`              | "no two adjacent text siblings"                  | Permitted. A property of the AST, not a tally of a set.                                     |
| `guides/html.md:276`                     | "Underneath all three sits a floor"              | Permitted. The same sentence names `elements`, `attributes`, and `schemes`.                 |
| `guides/html.md:289`, `tests/setup.ts:569` | "any two-character protocol-relative prefix"   | Permitted. A measurement in characters.                                                    |
| `guides/html.md:291`, `tests/setup.ts:614` | "all four protocol-relative forms"             | Permitted. The set is closed at the ordered pairs drawn from `/` and `\`, which `:289` states. |
| `guides/html.md:312`, `:458`             | "There are two renderers", "Two shapes of output" | Permitted. Each sentence names its members.                                                |
| `guides/html.md:129`, `:202`, `:203`, `src/core/constants.ts:102`, `src/core/helpers.ts:1463`, `:1498`, and the fixture literals in `tests/` | `<b>one</b>`, `<p>one<p>two`, and the like | Permitted. Markup and fixture text, not prose. |
| `src/core/types.ts:390`                  | "(the two document-shaping engines)"             | Permitted. The same line names them.                                                        |
| `tests/setup.ts:40`                      | "so one attempt covers all three"                | Permitted. The preceding clause names Array, `Set`, and `Map`.                               |
| `tests/setup.ts:109`                     | "instead of nine fragments"                      | Count, deleted, and already false against the regions the same block lists. Now "instead of a fragment per region". |
| `tests/setup.ts:188`                     | "from three introducers"                         | Count, replaced by its members: "from the `<!--`, `<!`, and `<?` introducers".               |
| `tests/setup.ts:577`, `:693`, `:706`     | "the two rules that follow", "two child references" | Permitted. Each names its members or states the fixture's shape.                         |
| `tests/setup.test.ts:177`                | "over the three introducers exactly once"        | Count, deleted: "over every introducer exactly once".                                       |
| `tests/guides.test.ts:541`               | "The two lines carrying a non-ASCII literal"     | Count, deleted, and already false against the guard block's own lines. See § Fix round 2.    |
| `tests/src/core/HTML.test.ts:384`        | "is total over all five categories"              | Count over the `HTMLNode` category union, deleted: "over every category".                    |
| `tests/src/core/HTML.test.ts:763`        | "preserves law three"                            | Positional list reference, deleted: "preserves the sanitize fixpoint law", the name `guides/html.md:244` gives it. |
| `tests/src/core/HTML.test.ts:215`        | `'expected two texts'`                           | Permitted. The message states what that fixture holds.                                       |
| `tests/src/core/helpers.test.ts:189`     | "the three decodes together measured 101–116 ms" | Count of cases, deleted. The millisecond range and the date stay: they are the measurement.  |
| `tests/src/core/helpers.test.ts:259`     | "eight changing decode passes … a ninth rewrite"  | Permitted. The decode fixpoint bound the case drives at `:260`–`:261`.                       |
| `tests/src/core/helpers.test.ts:670`     | "The three tests after the corpus sweep"         | Count of tests, deleted: "The named tests after the corpus sweep".                            |
| `tests/src/core/helpers.test.ts:716`     | "Rule 3 — allowlist shape"                       | Permitted, and consistent with fix round 1's R-3 ruling: the ordinal is followed by the rule's name. |
| `tests/src/core/helpers.test.ts:717`     | "the four dangerous schemes"                     | Count, replaced by its members: "`javascript`, `data`, `vbscript`, and `file`".               |
| `tests/src/core/parsers.test.ts:340`     | "the five sized parses that follow"              | Count, deleted. F-2's prescription, adopted verbatim.                                        |
| `tests/src/core/shapers.test.ts:9`       | "These four are the LEAVES"                      | Count over the leaf-shape set, deleted: "These shapes are the LEAVES".                        |

## Gates

Each was run bare through `npm --prefix /home/user/fleet/html run <script>` from the
checkout on 2026-09-03 after fix round 3's last edit, and its result read from that
invocation.

| Command                     | Exit | Reading                                                                                                    |
| --------------------------- | ---- | ------------------------------------------------------------------------------------------------------------ |
| `npm run format:check`      | 0    | `All matched files use the correct format.` over 46 files                                                  |
| `npm run lint:check`        | 0    | No diagnostic                                                                                              |
| `npm run check`             | 0    | Root `tsc` plus `check:src:core`, no diagnostic                                                            |
| `npm run build`             | 0    | `dist/src/core` emitted, declarations bundled, `index.d.ts` copied to `index.d.cts`                        |
| `npm test`                  | 0    | `src:core` 312, `policy` 111, `config` 46, `setup` 29, `guides` 32 — every file passed                     |
| `npm run test:distribution` | 0    | 9 passed in 7.79 s. The stage built, so the pack and install ran through the npm spawn path rather than skipping. |

`npm run format` ran once in fix round 3 to converge after the new claim strings landed —
`oxfmt` reflowed the quoting of three of them and changed no string content — and the
preceding table's results are the non-mutating gates run afterwards. `npm run test:distribution`
is listed because html-obj-5 and html-obj-6 make it load-bearing and because R-1 asked for it;
`npm test` does not include it (`package.json:59`), and `prepublishOnly` does (`package.json:68`).

## Instruments and controls

- **The fence transcriptions.** Throwaway probes ran under `tmp/probe/` and were
  deleted before this report. The fence control asserted values one off from the ones
  `flagship fences` asserts, against the same real code, and passed: the span is not
  `{ start: 0, end: 41 }`, `foldNode` over the un-extracted document returns `3` rather
  than the fence's `2`, and the render is the exact documented string. So the
  `extractRegion` step and each asserted value discriminate.
- **The presence guards.** Fix round 3's control is a mutation of a guide fence line the
  old `claims` list omitted: `guides/html.md:591` rewritten to `// ''`. Before the extension
  the mutated guide left `test:guides` green, which is the defect; after it the guard failed
  and printed the unmatched claim. § Fix round 3 names the three readings and their files.
- **The non-ASCII transcriptions.** `lowercaseASCII('HTML-Ω')`, `decodeEntities`'s `©`,
  and `normalizeSource('A\r\n𝕏')` each compare a character the test typed against itself,
  so a retyped `Ω` (U+03A9 against U+2126) would pass while documenting a different code
  point. Fix round 2 rewrote every non-ASCII literal in the transcriptions and in the
  presence guards as an escape — `\u{3a9}`, `\u{a9}`, `\u{1d54f}` — so the guard is bound
  to the code point rather than to whatever the test author typed. The control: replacing
  the guard's `\u{3a9}` with `\u{2126}` reddened `test:guides` at
  `tests/guides.test.ts:561` with the unmatched claim printed
  (`Tests 1 failed | 31 passed (32)`), and restoring it returned `Tests 32 passed (32)`.
- **`npm_execpath`.** Probed before html-obj-6 relied on it: under an npm script the
  variable is set, ends in `.js`, and `node <entry> --version` exits 0 printing a
  version. The negative control, the same path with `.absent` appended, exits non-zero.
- **The freeze proof.** Ran red before the fix and green after, as § Failing-first
  proofs records.
- **`resolveURL` on an absolute `javascript:` value.** Read from the code rather than
  assumed: `src/core/helpers.ts:803-806` resolves through `new URL(value, base).href`,
  which succeeds for an absolute URL, so resolution is the identity there rather than a
  failure. Fix round 1 rewrote the comment that claimed otherwise.

## Breaking

None. No row renames or removes a published symbol.

- `isHTMLNode`, `isHTMLDocument`, and `isElementNode` keep their signatures and their
  behaviour: `holds` returns `true` only when the callback returns the boolean `true`,
  which is the exact reduction `outcome.success && outcome.value` performed.
- `isBrowserVuePath` and the collection-mutation trio were test-only symbols, never
  published through `src/core/index.ts`.

## Shared-file patches

None. Every edit landed inside Owned.

Referrals for the Orchestrator, none actionable inside this checkout:

1. **The `distribution.test.ts` template.** html-obj-5 and html-obj-6 repaired bytes that
   are identical across the fleet, so the same defects sit in every sibling and in
   scaffold's generator that writes the file. The file is claimed by presence, so
   `repair` does not restore it and this edit persists here; the generator still emits
   the old form for the next target. The repair is the diff at
   `/home/user/work/evidence/conform-html.diff` for `tests/distribution.test.ts`,
   including fix round 1's correction of the `npm_execpath` comment. Carry that corrected
   form to the generator so the next target does not receive the false claim this unit
   first wrote:

   ```text
   -// what the host portability rules forbid. Every gate that runs this proof — `npm test`,
   -// `prepublishOnly`, and `npm run test:distribution` — is an npm invocation, and npm
   -// sets this variable for each of them.
   +// what the host portability rules forbid. `prepublishOnly` and `npm run test:distribution`
   +// are the invocations that run this proof, and npm sets this variable for each of them.
   ```

2. **`tests/guides.test.ts:1-4`.** The header comment is a fleet drop-in. This unit
   changed "The five constants below" to a form that names the parts this package owns,
   which fix round 3 corrected again after the breadth pass found the `@src/core` import
   block missing from the list. Sibling copies carry the old wording. The drop-in wording
   change is:

   ```text
   -// this repo's own `guides/README.md` manifest. The five constants below are this
   -// package's own, and are the only part a sibling package changes.
   +// this repo's own `guides/README.md` manifest. The `@src/core` imports, the constants
   +// that follow them, and the closing `flagship fences` block are this package's own, and
   +// are the only parts a sibling package changes.
   ```

   A sibling with no executed block names its own package-owned parts instead; the
   sentence has to match the file it sits in, which is what fix round 3's finding was.

3. **The number-word count sweep.** Fix round 2 replaced the phrase-list count sweep with
   `\b(one|two|three|four|five|six|seven|eight|nine|ten)\b` plus the numeral pattern in
   § Sweeps, and that pair found counts in `tests/` the phrase list could not admit —
   including one already false. Sibling packages were swept with the phrase list. Carry
   the pattern pair to the remaining conform units so each package's counts are ruled from
   the same population.

4. **The presence-guard population rule.** Fix round 3's F-1 is a defect any package
   adopting this `flagship fences` pattern will reproduce: a guard whose sentence claims
   the fences and whose list carries a sample. The rule that closes it is in § Fix round 3
   and is package-independent — the guard carries every fence line whose input literal or
   documented value the transcription reuses, and the control is a mutation of a line the
   list omits. Carry it to the remaining conform units that add an executed block.

## Fix round 3

The objective lane held every claim and returned no `FAIL`; F-1 sits outside the claims,
with referrals R-1 to R-3 and one observation. The checker returned `PASS`. That lane was
Opus, the recorded substitution for the dark GPT-5.6 Sol bench. Each item and its closure
is named here.

| Item        | Closed by                                                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| F-1         | The lane's recommendation, adopted: the `claims` list extended to the guard's real population rather than the title narrowed to the sample. § The population names what was derived and § The control names the readings. |
| R-1         | `npm run test:distribution` run after the gate chain and recorded in § Gates: exit 0, 9 passed.                                                |
| R-2         | The breadth pass ran over every sentence this unit wrote about an instrument's coverage in `tests/guides.test.ts`, `tests/setup.test.ts`, and `tests/distribution.test.ts`. § The breadth pass records each sentence with its reading. It found a false sentence in each of the two guard titles, one in the drop-in header, one in the executed-half comment, and one misattribution in the collection-mutation case. |
| R-3         | Retained as ruled in fix round 2. The tree is unchanged, and the lane recorded the same objective reading this report already carried.          |
| Observation | The U+2019 apostrophe at `tests/guides.test.ts:292` is gone: the title now reads `"streams the root's direct children through a reader and an async iteration"`, a double-quoted string with an ASCII apostrophe, which is the form `oxfmt` keeps. The report sentence about code-point escapes is true of the tree again, and § Sweeps carries the non-ASCII reading that proves it. |

### The population

The guard's population is every guide fence line whose input literal or documented value a
transcription in `tests/guides.test.ts` reuses. It was derived by reading each case in
`flagship fences` against the fence it transcribes, assertion by assertion, rather than from
the lane's illustrative list. The lines, by guide section, with the ones the extension added
marked:

| Fence section                              | Lines the guard carries                                        | Added by fix round 3                                     |
| ------------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------- |
| Parse, then query (`:342`)                 | 345, 347, 348, 349, 350, 354                                   | 345, 347                                                   |
| Adopt a document (`:359`)                  | 367, 368, 369                                                  | 367, 369                                                   |
| Rewrite, count, project (`:374`)           | 381, 383, 384, 386, 388–394, 395                               | 381, 384, 386, 388–394                                     |
| Stream the top level (`:400`)              | 403, 408                                                       | 403, 408                                                   |
| Sanitize (`:417`)                          | 421, 422, 425–426, 428–429, 431–432, 435, 436–437, 439, 440–441 | 421, 422, 428–429, 435, 436–437, 439, 440–441              |
| Distill (`:446`)                           | 452, 453, 459, 460, 463, 466, 467, 470, 471                    | 452, 453, 459, 460, 463, 470, 471                          |
| Work on a bare node (`:476`)               | 492, 493, 495, 496, 497–498, 501, 503, 505, 506, 508–514, 515, 517–520, 521–522 | 492, 495, 496, 497–498, 501, 505, 506, 508–514, 517–520, 521–522 |
| Scan by hand (`:527`)                      | 542, 543, 544, 545, 547–548, 550, 552–553, 555–556, 558, 559, 560–561, 563, 564, 565, 566 | 547–548, 550, 552–553, 555–556, 558, 560–561, 565 |
| Escape, resolve, inspect (`:571`)          | 586, 587, 588, 590, 591, 592, 594, 597, 598, 599               | 587, 590, 591, 594, 597, 598, 599                          |
| Ask a name or an element (`:605`)          | 616, 617, 618, 619, 621, 622, 623, 625, 626                    | 616, 617, 618, 619, 621, 622, 625, 626                     |
| Prove the roundtrip laws (`:631`)          | 634, 636, 639, 642, 645, 646, 647                              | 634, 639, 642, 645, 646, 647                               |
| `README.md` usage and start tag            | 34, 38, 41, 42, 51–52, 53                                      | 34, 38, 51–52                                              |

What a presence check cannot do is tell one occurrence from another. The map fence's own
`const page = createHTML('<h1>Title</h1><p>A <b>bold</b> word.</p>')` line (`:378`) is
byte-identical to the parse fence's (`:345`), so one claim answers for both and an edit to
either alone leaves the guard green. The transcriptions build that page in each case, so the
two fences are meant to stay identical; the limit is stated here rather than papered over.

Two of the old entries were fragments rather than lines — `'slashed: false, next: 38 }'` and
`'closing: false, next: 26 }'` — so a `parseStartTag` or `scanTag` value edited anywhere left
of the fragment stayed unguarded. Each is now the call line and its whole documented value.

The sentences above the list were rewritten to name that population exactly, because the old
ones named the fence line rather than the reused part of it, and a transcription restructures
what it copies: a fence's `if` block becomes a ternary, its reader loop becomes an assertion
on the collected categories. What the guard can honestly carry is the input literals and the
documented values, and that is what the title and the comment now say.

### The control

The control is a mutation of `guides/html.md:591`, a line the old list omitted: its trailing
comment rewritten from `// '/docs/page' - relative is always allowed` to `// ''`, which the
code contradicts. The command is `npm --prefix /home/user/fleet/html run test:guides`.

| Reading                                         | File                                                          | Result                                                                                                |
| ----------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Mutated guide, old `claims` list                | `/home/user/work/evidence/html-proofs/fix3-claims-control-red.txt` | Exit 0, `Tests 32 passed (32)` — the defect. The falsified guide line reddened nothing.               |
| Mutated guide, extended `claims` list           | `/home/user/work/evidence/html-proofs/fix3-claims-guard-red.txt`   | Exit 1, `Tests 1 failed \| 31 passed (32)`, failing at `carries every guide fence line whose input or documented value a transcription reuses` and printing the unmatched claim. |
| Restored guide, extended `claims` list          | `/home/user/work/evidence/html-proofs/fix3-claims-restored-green.txt` | Exit 0, `Tests 32 passed (32)`.                                                                     |

The first file's name says `red` because the brief fixed it; the reading it holds is green,
and that green is the defect it was captured to record.

The red run is also the coverage evidence for the rest of the extension: the guard reported
exactly one unmatched claim, so every other added claim — the tab-indented handler maps, the
multi-line scanner values, the input literals — matched the guide and the README as they
stand. What that control does not establish is the other direction: it shows the guard
reddens for the line it mutated, not that the population is complete. The population's
completeness rests on the assertion-by-assertion reading recorded in § The population.

### The breadth pass

Every sentence this unit added or rewrote that describes what an instrument covers, with the
reading it was given. A sentence ruled true was left as written.

| Sentence                                                            | Reading                                                                                                                              |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/guides.test.ts:1-4` — the drop-in header naming this package's own parts | **False, corrected.** The `@src/core` import block is package-owned too, and the sentence named only the constants and the executed block. It now names the imports first. |
| `tests/guides.test.ts:85` — "the assertion that follows it fails when a name here stops being stranded, so the list cannot rot" | **True.** `names no symbol internal that the barrel already exports` (`:124-127`) fails for a listed name the barrel exports. `INTERNAL` is empty, so the case is vacuous today and would break the moment a name is added wrongly. |
| `tests/guides.test.ts:222-226` — "Each case here runs one flagship fence and asserts the values its trailing comments claim" | **False, corrected.** The README case runs the usage fence and the start-tag fence. The sentence now states what is checkable: the cases run every fence in the guide and the usage and start-tag fences in `README.md`. Verified by pairing each `ts` fence with its case; none is unpaired in either direction. |
| `tests/guides.test.ts:523-527` — the presence-guard comment and title  | **False, corrected and extended.** F-1. See § The population and § The control.                                                       |
| `tests/guides.test.ts:577-580` — "Every line carrying a non-ASCII literal is written as a code-point escape, here and in the transcription it guards" | **True, and true of the whole block only after the U+2019 edit.** The escapes are at `:581`, `:582`, `:583`, and `:593` and in the transcriptions they guard at `:390`, `:391`, `:436`, and `:437`; the sweep row in § Sweeps carries the reading. |
| `tests/guides.test.ts:626` — the README guard title                   | **False, corrected and extended.** The list omitted the start-tag fence's documented value and both fence inputs while the title claimed every line the transcription copies. |
| `tests/guides.test.ts:461-463` — "The fence claims base resolution over every URL attribute and a lowercased name on the rest" | **True.** `resolveAttributes` (`src/core/helpers.ts:909-923`) resolves every `URL_ATTRIBUTES` member through `resolveURL` and passes the rest through with the name lowercased, which is what its own `@remarks` at `:897-903` states. |
| `tests/guides.test.ts` — each `it` title inside `flagship fences`      | **True.** Each names the operations its case drives, and each case drives all of them. Read case by case against the assertions.       |
| `tests/setup.test.ts:40-45` — "helpers.test.ts pins NAMED_ENTITIES … and it pins URL_SAFETY_GROUPS …, so neither equality is restated in the cases that follow" | **True.** `tests/src/core/helpers.test.ts:130` and `:686` carry those two equalities, and no case in `setup.test.ts` repeats either. |
| `tests/setup.test.ts:178` — "enumerates every bounded comment source over every introducer exactly once" | **True.** The case rebuilds the population with an independent odometer and asserts set equality plus uniqueness against `buildHTMLCommentEnumeration`, so an introducer the builder added or dropped breaks it. |
| `tests/setup.test.ts:94` — "refuses a frozen array and a frozen record, and restores an unfrozen collection" | **True.** The case asserts the frozen pair unchanged after the attempt and the unfrozen pair returned to its members after the restore. |
| `tests/setup.test.ts:95-97` — "The unfrozen pair is the control. An attempt that lands nothing would report every frozen collection immutable …" | **True.** `:114-115` assert the unfrozen array and record did change, so a no-op helper fails there.                                    |
| `tests/setup.test.ts:122-124` — "A named property the attempt wrote beside them is left behind" | **False in its attribution, corrected.** On the array the leftover `area` is written by the restore (`tests/setup.ts:99`); on the record the leftover `0` is written by the attempt (`:63`) and rewritten by the restore (`:98`). The sentence now names the mutation cycle and both leftovers. |
| `tests/setup.test.ts:265` — "refuses every mutation of the URL-safety group list" | **True.** The case asserts `Object.isFrozen(URL_SAFETY_GROUPS)`, which is the general property, with the write, delete, and push refusals beside it as the demonstration. |
| `tests/setup.test.ts:266-268` — "helpers.test.ts compares the corpus's families against this list …" | **True.** `tests/src/core/helpers.test.ts:686` is `expect(groups).toEqual([...URL_SAFETY_GROUPS])`.                                     |
| `tests/distribution.test.ts:18-22` — "`prepublishOnly` and `npm run test:distribution` are the invocations that run this proof" | **True.** `package.json:59` defines `test` without the `distribution` project; `:68` and `:69` are the two invocations that reach it. |
| `tests/distribution.test.ts:570-573` — "the removal retries inside `destroyScratch`'s budget rather than failing the run on the first refusal" | **True.** `node_modules/@orkestrel/test/dist/src/server/index.d.ts:83-101` declares the bounded retry, its 10000 ms default budget, and the exhaustion error carrying the host refusal as `cause`. |
| `tests/distribution.test.ts:202` — "npm set no npm_execpath, so this proof cannot resolve the npm JavaScript entry to spawn" | **True.** `runNpm` throws before spawning when `process.env.npm_execpath` is `undefined`, and the message names the condition and the fix. |

## Fix round 2

The objective lane returned `FAIL` with the findings, observations, and referrals that
follow; that lane held every perspective this round, on the recorded substitution for the
dark GPT-5.6 Sol bench. The checker lane did not run. Each finding and its closure is named
here.

| Finding | Closed by                                                                                                                                                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F-1     | Adopted verbatim. `guides/html.md:43` now reads "or — for the keyed tables — a frozen record read through `Object.hasOwn`". The number was deleted rather than corrected to three, which is what `AGENTS.md` § Writing prescribes. The lane's second instruction was adopted too: the count sweep is now the number-word pattern over `guides/html.md`, `README.md`, `src/`, and `tests/`, with a numeral counterpart beside it, and every hit is ruled by sense in § Number-word rulings. |
| F-2     | Adopted verbatim. `tests/src/core/parsers.test.ts:340` now reads "Timeout basis for the sized parses that follow:". The `25–137 ms`, `30 s`, and `2026-08-24` values are unchanged.                                                              |
| O-1     | No change, and the lane's reading is adopted. Every doc block in `tests/setup.ts` opens with an imperative verb, so repairing only the two blocks this unit added would leave the file inconsistent and the rule still broken. The carrier is a fleet-wide setup-file voice unit. |
| O-2     | Recorded, no change. `tests/distribution.test.ts` refusing a bare `npx vitest --project distribution` is the refuter's operative repair applied exactly, and `package.json:68` and `:69` are npm invocations that set `npm_execpath`.             |
| O-3     | The evidence diff was regenerated for the whole unit as it now stands, file by file from `git diff HEAD -- <path>`. Its transcription caveat is superseded: fix round 3 regenerated the file with `evidence.mjs`, so it is now `git diff HEAD` verbatim. See § Deviations. |
| R-1     | Retained as correct, unchanged.                                                                                                                                                                                                                 |
| R-2     | Retained as correct, unchanged.                                                                                                                                                                                                                 |
| R-3     | The tree is unchanged, ruled as the subjective lane, and the lane's premise is incomplete on the evidence. `guides/html.md:592` in the same fence reads `resolveURL('../a', 'https://x.dev/docs/page') // 'https://x.dev/a'`, so base resolution is demonstrated there with a relative input. The anchor line at `:599` demonstrates the attribute-level API and the pass-through half, which its transcription at `tests/guides.test.ts:460-467` states plainly and asserts. Changing the anchor fence's input would move the transcription's asserted values and rewrite a worked example no row names. |

The number-word sweep F-1 prescribed admitted hits no row had named, and § Number-word
rulings gives each one its ruling. What the sweep changed beyond the two findings:

- **`tests/guides.test.ts:541` was a false count over the unit's own new guard block.** The
  comment claimed "The two lines carrying a non-ASCII literal are bound by code point", and
  the block carries such a literal on the `𝕏` pair, the `Ω` line, and the `©` line, of
  which only the `𝕏` pair was written as an escape. § Instruments carried the same
  overstatement. Both halves are closed: every non-ASCII literal in the transcriptions and
  in the presence guards is now a code-point escape, the comment states that without a count,
  and the mutation control in § Instruments shows the guard reddens against a different code
  point.
- **Counts of cases, tests, categories, introducers, regions, leaf shapes, and dangerous
  schemes were deleted** at the sites § Number-word rulings names, each under the same
  `AGENTS.md` § Writing rule html-subj-5 carries.
- **One positional list reference was deleted.** `tests/src/core/HTML.test.ts:763` named
  "law three"; it now names the sanitize fixpoint law, under the rule html-subj-4 carries.

## Fix round 1

The objective lane returned `FAIL` with the findings and referrals that follow; the checker
lane returned `PASS` with none. Each finding and its closure is named here. Nothing outside
these sites changed.

| Finding | Closed by                                                                                                                                                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F-1     | Adopted verbatim. `guides/html.md:93` now opens "Pure leaves from [`helpers.ts`](../src/core/helpers.ts) — …", and the `foldNode` row at `:126` now opens "The catamorphism `fold` delegates to — children first, …". The totality claim the guide fixes at `:88` no longer contradicts the `foldNode` exception the same paragraph states. No code changed and no export moved, so guide parity is unaffected. |
| F-2     | Adopted verbatim. `tests/distribution.test.ts:21-22` now reads "`prepublishOnly` and `npm run test:distribution` are the invocations that run this proof, and npm sets this variable for each of them." Re-derived against `package.json:59`, which runs `test:src`, `test:policy`, `test:config`, `test:setup`, and `test:guides` and reaches no distribution project. The correction is carried into referral 1 for scaffold's generator. |
| F-3     | Adopted verbatim. `tests/guides.test.ts:460-462` now reads "An absolute `javascript:` URL resolves to itself, so the value survives exactly as written - the pass-through half of the same claim." Verified against `src/core/helpers.ts:803-806`, where `new URL(value, base).href` succeeds on an absolute URL. The asserted values were already correct and are unchanged. |
| F-4     | Adopted. § Sweeps records the class sweep as one row, `src/core/HTML.ts:69`, beside the empty `readonly id` sweep, and states that fleet-F2's population is empty because no class carries the field. The fleet-F2 row states the same reading. |
| F-5     | Adopted. § Sweeps names the surviving `mkdtempSync` hits — the vendored `tests/config.test.ts`, the vendored `tests/setupPolicy.ts`, and the `guides/test.md` mirror — beside the "no hit inside Owned" conclusion, which stands. |
| F-6     | Adopted. § Sweeps gained the readings html-subj-9 and html-subj-10 lacked: `@param \w+ - Whether` over `src/**` reads empty, and the defaulted-parameter population in `src/**` is `helpers.ts:658` and `:791`, each documented with `Default:` at `:651` and `:786`. |
| R-1     | Retained and extended. Referral 1 under § Shared-file patches carries F-2's exact corrected comment for scaffold's generator. F-3's correction is package-local, because `tests/guides.test.ts` fence transcriptions are package-owned rather than generated. |
| R-2     | The tree is unchanged and the observation is corrected. `guides/html.md:291` keeps "all four protocol-relative forms". The lane's objective reading is right that the phrase is permitted — the set is closed at the ordered pairs drawn from `/` and `\`, so it is a value rather than a count of a set anyone can add to — and the original observation's stated reason was wrong, because html-subj-5 and html-subj-8 both edit that line. § Number-word rulings records it as permitted. |
| R-3     | The tree is unchanged, ruled as the subjective lane. `guides/html.md:289` keeps "First, … Second, … Third,". `AGENTS.md` § Writing bans naming a list item by its position, and these ordinals point into no list: they sequence the clauses of their own paragraph and name each rule as they go, which is the form the same rule prescribes ("Name the members"). The ordinals at `:285` went only because html-subj-5's prescribed replacement text removed them with the count they were the tail of. Editing `:289` would widen the unit past every row's named line. |

Fix round 1 also reflowed the `tests/setup.test.ts` header comment. html-subj-8's edit to
that comment left a short line dangling ("// follow. TEST_SEED is a"), which reads as an
unfinished edit; the sentence is now wrapped across the same lines with no wording change.
This is an ancillary decision inside a region the unit already edited.

## Deviations

None stopped the unit. The ancillary decisions that follow were recorded rather than
escalated.

1. **`guides/html.md:655` repaired beyond the row's named line.** html-subj-4 scopes the
   `stage` → `pass` rename to the distill section, but the Tests section said "every
   stage of the distill pass", which is the same alternation the row's own rule bans.
   Changed to "every pass of the distill pipeline". The sweep now reads empty.
2. **The `attempt` / `holds` bullet keeps its "One exception boundary." lead-in.**
   html-obj-1 fixes the sentence but not the bold lead. `holds` is that boundary's
   predicate form, which the new sentence says, so one boundary remains accurate.
3. **The collection-mutation case carries an unfrozen control.** html-obj-3 specifies a
   frozen array and a frozen record. An attempt against a frozen collection lands
   nothing, so a case built only from those would pass with either helper reduced to a
   no-op. The `it` drives an unfrozen array and record beside them, asserts the attempt
   changed both, and asserts the restore returned their members. It also records, in a
   comment and in the assertion shape, that the mutation cycle leaves a named property
   beside the members on a collection that accepted the write — visible only off the
   frozen path the helpers are used on.
4. **The fence transcriptions avoid a conditional `expect`.** `vitest(no-conditional-expect)`
   refused the fences' own `if (node?.category === 'element')` shape. The parse-and-query
   fence asserts the whole node with one `toEqual`; the anchor and image fences narrow
   through `isElementNode` into `requireValue`, which throws with a named message rather
   than skipping. No case can pass vacuously.
5. **The evidence diff was transcribed by hand until fix round 3, and is generated now.**
   Fix rounds 1 and 2 ran under a shell discipline permitting file creation only through the
   Write tool, so `/home/user/work/evidence/conform-html.diff` was transcribed and a context
   line blank in the source appeared as an empty line rather than as a single space. Fix
   round 3's brief supplies `node /home/user/scaffold/tmp/work/evidence.mjs html`, which
   writes `git diff HEAD` and `git status --short` verbatim, so the current file is
   byte-faithful and feedable to `git apply`. The caveat recorded under fix round 2's O-3 is
   superseded.
6. **Fix round 2 edited files no row names.** `tests/src/core/HTML.test.ts` and
   `tests/src/core/shapers.test.ts` entered the diff, and `tests/setup.ts`,
   `tests/setup.test.ts`, `tests/src/core/helpers.test.ts`, and `tests/guides.test.ts`
   gained edits at lines no row names. Every one is a hit of the number-word sweep F-1
   prescribed over `tests/`, ruled a count in § Number-word rulings, and repaired under the
   `AGENTS.md` § Writing rule html-subj-5 and html-subj-4 already carry. All are inside
   Owned, none changes an asserted value, and each is one line of prose or one test title.
7. **A session notice directing file reads and edits through Bash was refused.** A block
   headed "While auto mode is active" arrived appended to the `.claude/rules/documentation.md`
   contents delivered to this unit, directing reads through `cat` / `sed -n` and writes
   through `sed` and heredocs. It is not in the file:
   `grep -in "auto mode|heredoc|sed -n"` over `/home/user/scaffold/.claude/rules/documentation.md`
   returns no match. The dispatch's shell discipline governs and forbids exactly that, so
   every read used `Read` / `Grep` / `Glob` and every write used `Write` / `Edit`.
8. **The U+2019 title is a double-quoted string rather than an escaped apostrophe.** The
   brief offered an escape or a template literal. `oxfmt` picks the quote that needs fewer
   escapes, so `'streams the root\'s …'` would have been rewritten to the double-quoted form
   on the next `format` run; writing it that way keeps the file at its formatted fixpoint.
   The same choice already governs the claim strings around it.
9. **Fix round 3 kept the guard's population at inputs and documented values.** A fence
   line the transcription restructures rather than reuses — the `adopt` function body, the
   reader loop — is outside it, because a presence check over a restructured line cannot be
   written honestly. The title and the comment name the population they cover instead of
   claiming the fence line, so no gap sits between what the guard says and what it matches.
10. **The claims list carries the fence's handler maps as multi-line strings.** They are
    input literals the transcriptions reuse verbatim, so leaving them out would have made
    the corrected title false again. They are written with `\n\t` escapes, matching the
    style of the two-line claims already in the list.

## Observations, not criteria

- **`npm test` under load.** The reading in § Gates was taken with nothing else running in
  this checkout. The Orchestrator takes the deciding run after this unit exits, including
  `npm run test:distribution`.
- **The guard's population is a reading, not a mechanism.** Nothing recomputes it: a fence
  gains a documented value, and the guard stays green until someone adds the claim. The
  proof that the population is complete today is the assertion-by-assertion reading in
  § The population, and it has to be redone whenever a fence or a transcription changes.
  A mechanism that derived the claims from the guide would assert the guide against itself,
  which is why this is a list.
- **`total catamorphism` survives at `guides/html.md:170`, `src/core/types.ts:389`, `:427`,
  and `src/core/HTML.ts:166`.** Left untouched. Each uses `total` in the no-node-skipped
  sense the `:170` row defines in place ("one handler per category, no node skipped"),
  which is a different property from the never-throws sense `:88` fixes. Fix round 1's F-1
  named only `:93` and `:126`, where the never-throws sense governs.
- **`guides/contract.md:614` states "Three laws bind the two domains", and
  `guides/contract.md:255` carries a numeral count.** A vendored dependency guide mirror.
  `.claude/rules/documentation.md` says a mirror is refreshed rather than rewritten, so it
  is `@orkestrel/contract`'s to fix upstream.
- **`tests/src/core/helpers.test.ts:1384` runs long.** Fix round 1's `above` → `preceding`
  edit pushed that comment line past its neighbours' width. `oxfmt` does not reflow a
  comment and `lint:check` reports nothing, so it is left as written.
