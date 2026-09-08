# Report — P.2 `d7n-probe-converge` (probe under the equality gate)

Unit resumed over the predecessor's partial tree. Every criterion closed; no deviation.
Wall clock from the first command to the last: 2026-09-08T01:25:16Z to 2026-09-08T01:41:54Z
(16 min 38 s).

## The predecessor's hunks

Each hunk of the dead unit's diff, ruled against the brief. Nothing was discarded.

| Hunk | Ruling |
| ---- | ------ |
| `tests/guides.test.ts`: the drop-in installed from the pilot | **Kept.** Byte fidelity re-verified after all my edits: `diff` of the pilot's `/home/user/fleet/abort/tests/guides.test.ts:47-257` against probe's `const root = new URL('../', import.meta.url)`-to-manifest-loop region is empty, and the header lines Ruling 21 fixes are identical to the pilot's. |
| `tests/guides.test.ts`: the constants block adapted to probe | **Kept.** `GUIDE_SPEC` `'guides/probe.md'`; `MODULES` mapping each published specifier and each `@src/*` alias; `INTERNAL` `[]` with the pilot's corrected doc block ("the assertion that follows it"); `ROOT_FILES` carrying `README.md`. |
| `tests/guides.test.ts`: dropped hand-rolled cases (`documents every public export, and publishes every documented name`; `documents exactly the members each behavioral interface declares`; `strands no declaration outside a barrel, and interns nothing the barrels publish`) with their helpers `extractRows`, `extractModules`, `extractSources`, `extractDocumented`, `extractExports` | **Kept.** Each is proved by a drop-in case, so item 0a's drop rule applies. |
| `tests/guides.test.ts`: kept cases rebased on the reflected surface (`resolves every value the barrels publish`, `carries a documented example for every barrelled export`) and kept as-is (`publishes exactly the members each implementation declares it implements`, `names the guard the tool actually applies to an arriving claim`, `ships registry metadata and a README that are not the scaffold default`, the whole `guides fences` block) | **Kept.** Each reads something the drop-in does not: runtime barrel resolution, an example per barrelled export beyond Surface functions, prototype-against-contract membership, the guard the server really applies, the registry metadata, and the executed fences. They sit in the retained `describe('guides parity')` rather than inside `guides fences`; item 0a permits either, and a third `describe` keeps the executed fences block undiluted. |
| `src/core/types.ts`, `README.md`, `guides/probe.md`, `tests/guides.test.ts`: the flagship claim moved to a function in `src/core/factories.ts` with the control `createGreeting(): number` and the reason "a string returned as a number must not compile" | **Kept, and proven.** See § Item 0b. |
| `guides/probe.md`: the guide fence's `verdict.digest` and `verdict.receipt` sample | **Kept, and proven live.** See § Item 0b. |
| `guides/probe.md`: the load-bearing bullet naming why the candidate is `src/core/factories.ts` | **Kept.** It records the vendored policy's admission rule the claim now satisfies. |
| `guides/probe.md`: every `## Surface` and `## Methods` table headed `Summary`, the `Behavior`/`Purpose`/`Describes` columns renamed, `Shape` added where a table carries an interface or type-alias row | **Kept.** |
| `guides/probe.md`: `### Validators` `Signature` column replaced by `Shape` under the guard sentence | **Kept.** Ruling 20 names this for a dedicated guard table. |
| `guides/probe.md`: validators' `Kind` moved from `function` to `const` | **Kept.** `src/core/validators.ts` declares each as `export const isX: Guard<X> = …`, so the baseline's `function` was wrong and the drop-in's `computeSymbolKey` comparison requires `const`. |
| `guides/probe.md`: `### The engine`'s `Implements` column dropped, the interface each class implements landed in the prose beside the table with each class's file link | **Kept, lead-in corrected.** Ruling 7 permits the landing. The predecessor's lead-in read "Each implements the contract its name names", which `RuntimeStage implements StageInterface` falsifies; it now reads "The classes, each exported from its own file, and the contract each one implements:". |
| `guides/probe.md`: `destroy` rows added to the `TypeStageInterface` and `LintStageInterface` method tables | **Kept.** `source.methods` on an extended interface carries the inherited member, so `documents every interface method` requires the row. |
| `src/core/constants.ts`: each constant's literal added to its description paragraph | **Kept.** Ruling 18. |
| `guides/probe.md`: `### Constants` `Shape` cells carrying literal types (`'probe'`, `30_000`, `readonly ['type', 'lint', 'runtime']`) | **Corrected.** Ruling 21 bars a literal type in a constants cell. Each now holds the declared or widened type: `readonly Stage[]`, `readonly Party[]`, `readonly ProbeErrorCode[]`, `string`, `number`. The literals stay in the descriptions, which is where Ruling 18 puts them. |
| `guides/probe.md`, `README.md`, `tests/guides.test.ts`, `src/core/types.ts`: the claim literal left unformatted | **Corrected.** `oxfmt` reads Markdown and formats a fenced `ts` block, so the guide, the README, and the test all reflowed the draft entry; the `Case`, `Control`, and `Claim` doc blocks in `src/core/types.ts` were reflowed to match, which is what `states the same claim in the guide, the contract, and this proof` compares. |
| `guides/probe.md`: the H1 blockquote left as the baseline's three bolded paragraphs | **Completed.** See § Criterion 5. |

## Item 0b — the flagship claim earns its receipt

The predecessor's claim and its digest and receipt are correct, proven by a live run rather than by
reading its diff.

```text
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project guides \
  -t 'earns the receipt the guide documents'
 ✓ |guides| tests/guides.test.ts > guides fences > earns the receipt the guide documents 14931ms
 Test Files  1 passed (1)
      Tests  1 passed | 55 skipped (56)
```

That case reruns the claim through a real `Probe`, asserts `verdict.receipt` is defined, asserts
`verdict.digest` is `fcb88a2dee987b8673c1fc7107979470`, reads each tool version out of the
workspace's installed manifests rather than out of the verdict, and asserts the guide carries both
`verdict.digest // '<digest>'` and `verdict.receipt // '<token>'` — so the guide's sample at
`guides/probe.md:659-660` is verified against the run, not transcribed.

The predecessor's instrument is retained at
`/home/user/fleet/probe/tmp/d7n-probe-converge/prove.mjs`.

**Observation, timing, not diagnosed.** The same case failed earlier in the session inside a full
`npm run test:guides` under sibling-unit load, with
`ProbeError: The probe could not arm: The Oxlint language server exited with code 0`, caused by
`LSPError: The LSP request 'initialize' exceeded its deadline` — the `LINT_DEADLINE` bound of
2,000 ms over the `initialize` exchange. It passed alone at load average 1.05 and passed again in
the final full run.

## Criterion 1 — red-first, on the unconverged tree

`npm run test:guides` on the resumed tree, before my edits:

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
+   "guides/probe.md pairs: guide [\"Failures\",\"Registering the server\",\"The claim that earns a receipt\",\"Reading a receipt\"] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:118:20
    118|  expect(pitch).not.toBeUndefined()

 FAIL  |guides| tests/guides.test.ts > Package > StageInterface examples > documents an example for every method
 FAIL  |guides| tests/guides.test.ts > Package > LintStageInterface examples > documents an example for every method
AssertionError: expected [ 'inspect' ] to deeply equal []
 FAIL  |guides| tests/guides.test.ts > Package > TypeStageInterface examples > documents an example for every method
AssertionError: expected [ 'inspect', 'resolve' ] to deeply equal []
 FAIL  |guides| tests/guides.test.ts > Package > OverlayInterface examples > documents an example for every method
AssertionError: expected [ 'set', 'covers', 'clear' ] to deeply equal []
 FAIL  |guides| tests/guides.test.ts > Package > ProbeServerInterface examples > documents an example for every method
AssertionError: expected [ 'start' ] to deeply equal []

 Test Files  1 failed (1)
      Tests  8 failed | 48 passed (56)
```

The equality case was already green on the resumed tree, because the predecessor had propagated
every `Summary` cell. It read red under my own hand the moment the titled pair formed, before
`--to source` closed it — the pair is what the case compares, so this is the case's own red, not a
plant:

```text
npx vitest run … --project guides -t 'keeps every compared summary and example equal to its source'
 FAIL  |guides| tests/guides.test.ts > Package > keeps every compared summary and example equal to its source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/probe.md The claim that earns a receipt: guide \"ts\\nimport type { Claim } from '@orkestrel/probe'\\n…\" source \"ts\\nconst probe = new Probe({ workspace: '/srv/checkout' })\\nconst verdict = await probe.prove(claim)\\nawait probe.destroy()\""
      Tests  1 failed | 55 skipped (56)
```

The predecessor's own red-first reading survives at
`/home/user/fleet/probe/tmp/d7n-probe-converge/red-first.log`: `Tests 15 failed | 41 passed (56)`
at 21:42:44, taken when it installed the drop-in.

No control was planted, and none needed reversing.

## Criterion 2 — headers and class rows

Every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`,
or `Returns`. No `Value` column remains. `### The engine` is a descriptive heading over an all-class
table, which Ruling 16 leaves as its guide wrote it; probe has no `### Entities` heading and
documents no class under its own H3, so no `### Classes` table is owed.

`### Shapes` (the `*_SHAPE` tool descriptors) keeps no `Shape` column: it carries neither an
interface nor a type-alias row, so Ruling 15's trigger does not fire, and it is not a
`### Constants` table, so Ruling 18's does not either. Recorded as a decision rather than an
omission.

The non-`Summary` cell comparison against `git show HEAD:guides/probe.md`, run by
`tmp/d7n-probe-converge/cells.py`, reports changes in exactly these classes and nowhere else:

- the `Shape / Purpose` and `Value / Purpose` headers split into `Shape` plus `Summary`, with the
  clause after the em dash moving into the doc block;
- the constants' `Shape` cells taking their declared type (Ruling 21);
- the validators' `Kind` corrected from `function` to `const`, and their `Signature` column replaced
  by `Shape` (Ruling 20);
- `### The engine` losing its `Implements` column to the prose beside the table (Ruling 7);
- the `destroy` rows added to the extended stage interfaces.

## Criterion 3 — doc blocks first, then the cells

Every disagreement was closed by rewriting the doc block, never by weakening a cell. The blocks I
rewrote by hand in this pass:

- `src/core/types.ts` — the `Case`, `Control`, and `Claim` `@example` blocks reflowed to the shape
  `oxfmt` gives the same literal in the guide and the README, so the transcription case compares one
  text.
- `src/server/types.ts` — an `@example` added to `OverlayInterface.set`, `OverlayInterface.covers`,
  `OverlayInterface.clear`, `StageInterface.inspect`, `TypeStageInterface.inspect`,
  `TypeStageInterface.resolve`, `LintStageInterface.inspect`, and `ProbeServerInterface.start`. Each
  block is untitled, so it is outside the equality comparison; `findUnexampled` counts a member as
  exampled through a fence mention or an `@example` on the member, and probe's guide fences name
  none of these members.
- `src/server/Probe.ts` — the class block's `@example` titled, then written by the seed.

Rows whose literal stays in `Shape`, all of them a type alias's own type literal, which Ruling 12
permits: `Stage`, `Party`, `ProbeErrorCode`, and `ListenerCapture`. `ProbeEventMap` takes Ruling
19's bare member names, `{ arm, prove, expire, error }`.

`npm run docs -- --to guide` had nothing left to carry: `rows read: 1, disagreements found: 0,
written: 0, reported: 0`.

## Criterion 4 — the titled pair

The pair is **`Probe`'s class `@example` in `src/server/Probe.ts`** and **the `ts` fence under
`## The claim that earns a receipt`** in `guides/probe.md`.

The brief's locator names the first `create*` the facts block lists, which is
`createDestroyedError` — an error factory that no fence in this guide demonstrates, so titling it
could produce no title. Ruling 17 settles it: this guide's fences construct the class directly as
the package's entry, so the titled block is the class's, on the declaration the flagship fence
demonstrates. The heading text occurs once, heading-scoped
(`grep -n '^#\+ .*claim that earns' guides/probe.md` returns `610:## The claim that earns a
receipt`). The fence body carries no three-backtick run and no doc-comment terminator. The fence
already had its Ruling 21 lead-in: "This claim earns a receipt in this workspace. Run it verbatim."
No fence moved and no heading was added.

Ruling 14: the fence was the fuller demonstration — the whole claim, the digest, and the receipt
against the block's construct, prove, and destroy lines — so the block took it whole. Nothing the block
demonstrated is absent from the fence; the only line-level difference was the constructor's
`workspace` argument, `'/srv/checkout'` against `process.cwd()`, which is the same demonstration
written with a different argument rather than a second demonstration.

The title run and the seed run:

```text
npm run docs                     rows read: 1, disagreements found: 1     (the pair, unequal)
npm run docs -- --to source      wrote src/server/Probe.ts
                                 rows read: 1, disagreements found: 1, written: 1, reported: 0
npm run docs                     rows read: 1, disagreements found: 0
```

`--to source` ran last, after the summaries agreed, and wrote the titled example alone. Every other
block stays untitled.

## Criterion 5 — the tagline, the pitch, and the displaced prose

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold, and the
README carries it byte for byte under its own H1:

```text
> The claim prover for the `@orkestrel` line: an instrument that runs a claim's case and its
> negative control through the workspace's own TypeScript, Oxlint, and Vitest, and returns a
> `Verdict` carrying every issue — and a `receipt` when the case ran clean and the control broke
> where it said it would.
```

Displaced from the guide's blockquote into its opening prose, none of it restating the tagline:

- the stage sentence ("The type stage runs the workspace's own compiler over a mirror of the tree,
  and the lint and runtime stages hold resident Oxlint and Vitest engines.") joined the source and
  publishing sentences, whose links the tagline cannot carry;
- "**An agent is the caller this exists for.** Deciding whether an edit compiles by reasoning about
  it costs more than asking, and the answer is a guess." became its own paragraph. Its trailing
  sentence about what a `Claim` states and what a `Verdict` answers with was dropped as a
  restatement: the paragraph above it already says "A `Claim` is the question … A `Verdict` is the
  answer".
- "**Mechanism, not policy.** …" became its own paragraph unchanged, its safety clause's emphasis
  kept.

README sentences changed: the plain opening paragraph ("Prove a claim about a code change with type,
lint, and runtime evidence, from the workspace's own TypeScript, Oxlint, and Vitest.") was retired,
because the blockquote now says it. The onboarding paragraph kept what the README alone carries —
what a `case` and a `control` are, and what the receipt token names — and shed the clauses the
tagline restates: "`prove` runs every stage over the case and the control and returns a `Verdict`.
When the case ran clean and the control broke where it said it would, the verdict carries a
`receipt`:" became "The `receipt` a proven claim earns is". The guide-first sentence is untouched.

`## Tests` gained the equality gate, named descriptively and with no SQ/MQ/EQ/RQ identifier: every
`Summary` cell against its declaration's description paragraph, the titled
`The claim that earns a receipt` fence against the `@example` block of that title, and the README
pitch against the guide's tagline.

## Criterion 6 — the seed

```text
npm run docs                   rows read: 1, disagreements found: 0                        exit 0
npm run docs -- --to guide     rows read: 1, disagreements found: 0, written: 0, reported: 0  exit 0
npm run docs -- --to source    rows read: 1, disagreements found: 0, written: 0, reported: 0  exit 0
```

## Criterion 7 — gates

| Command | Reading |
| ------- | ------- |
| `npx oxfmt --config .oxfmtrc.json --check <the owned paths>` | `All matched files use the correct format.` exit 0 |
| `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` | no output, exit 0 |
| `npm run check` | exit 0 across the root project and the core, server, and bin scoped projects |
| `npm run test:guides` | `Test Files 1 passed (1)`, `Tests 56 passed (56)`, exit 0, `earns the receipt the guide documents` among them |
| `npm run test:policy` | `Tests 90 passed`, `1 skipped (91)`, exit 0 |
| `npm run test:src:core` (observation) | `Test Files 3 passed (3)`, `Tests 34 passed (34)`, exit 0 |

## Criterion 8 — status

```text
 M README.md
 M guides/probe.md
 M src/core/constants.ts
 M src/core/types.ts
 M src/server/Probe.ts
 M src/server/types.ts
 M tests/guides.test.ts
```

Owned files only. Diffstat against `1c150f6`:

```text
 README.md             |  33 ++--
 guides/probe.md       | 394 ++++++++++++++++++++++-------------------
 src/core/constants.ts |  31 ++--
 src/core/types.ts     |  40 +++--
 src/server/Probe.ts   |  39 +++-
 src/server/types.ts   |  45 +++++
 tests/guides.test.ts  | 482 ++++++++++++++++++++++++++++++++++----------------
 7 files changed, 697 insertions(+), 367 deletions(-)
```

## Reader and seed defects

None met. Every disagreement the seed reported was a real disagreement in this package's own text,
and every write it performed landed where the brief said it would. Behaviours worth carrying to the next
package, none of them a defect:

- **`oxfmt` formats Markdown, including a fenced `ts` block.** A claim literal that a package
  carries in its guide, its README, its test, and a doc block is reformatted everywhere but the doc
  block, because the formatter does not enter a doc comment. A package whose
  suite compares those copies must hand-reflow the doc block to match. probe's transcription case
  caught this; a package without one would ship the drift.
- **`findUnexampled` over a method group needs a member-level `@example` where no fence names the
  member.** Installing the drop-in therefore costs one `@example` per documented method that no
  guide fence mentions. probe owed them for the stage, overlay, and server contracts.
- **`--to source` writes summaries as well as titled examples,** as the brief states. Running it
  before the summaries agree would flatten every disagreeing cell into its block.

## Decisions recorded

- The titled pair is `Probe`'s block rather than `createDestroyedError`'s (Ruling 17; the brief's
  `create*` locator reaches a factory no fence demonstrates).
- `### Shapes` takes no `Shape` column, because no ruling's trigger reaches it.
- The retained hand-rolled cases stay in `describe('guides parity')` rather than moving into
  `describe('guides fences')`, which item 0a permits.
- `guides/probe.md:851` runs to 108 columns; it is a baseline line neither unit edited, so it stays.
