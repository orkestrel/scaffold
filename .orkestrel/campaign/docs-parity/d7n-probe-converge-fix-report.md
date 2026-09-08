# Report — `d7n-probe-converge-fix` (probe's fix round on the audit's findings)

Every item closed. One deviation to report: `npm run test:src:server` is red on this tip for a
cause that predates this unit and lives in an off-limits file — § Deviation states it with its
evidence.

Wall clock, first command to last: 2026-09-08T02:30:51Z to 2026-09-08T03:10:49Z (39 min 58 s).
Sole writer in `/home/user/fleet/probe` from `d06b186`. No commit, no install, no discard-class git
command. Instruments under `tmp/d7n-probe-converge-fix/`.

## Touched files

```text
 guides/probe.md           | 102 ++++++++++++++++++++++++----------------------
 src/core/types.ts         |   7 +++-
 src/core/validators.ts    |   5 ++-
 src/server/Overlay.ts     |   8 ++--
 src/server/ProbeServer.ts |   4 +-
 src/server/types.ts       |  13 +++---
 tests/guides.test.ts      |   8 ++--
 7 files changed, 82 insertions(+), 65 deletions(-)
```

## Item 1 (P1, Ruling 7) — the class descriptions

`src/server/Overlay.ts:6` and `src/server/ProbeServer.ts:25` open on the interface each implements
and what the class adds, the pilot's form at `abort.md:58`. The `@remarks` behind each are
unchanged. `--to guide` carried both to `### The engine`.

```diff
 /**
- * Holds the candidate drafts one inspection substitutes for the files a tool would read from disk.
+ * Implements `OverlayInterface` over a private map from normalized absolute path to candidate text,
+ * minting at construction the `revision` a resident tool caches its answers against.
  *
  * @remarks
```

```diff
 /**
- * Serves one probe over this process's Model Context Protocol stdio transport.
+ * Implements `ProbeServerInterface` over a `PassThrough` stream this server owns, binding the
+ * published `prove` tool and the dual-era dispatcher to this process's Model Context Protocol
+ * stdio transport.
  *
  * @remarks
```

Guide rows after `--to guide`, no longer repeating `OverlayInterface` and `ProbeServerInterface`:

```text
| `ProbeServer`  | class | Implements `ProbeServerInterface` over a `PassThrough` stream this server owns, binding the published `prove` tool and the dual-era dispatcher to this process's Model Context Protocol stdio transport. |
| `Overlay`      | class | Implements `OverlayInterface` over a private map from normalized absolute path to candidate text, minting at construction the `revision` a resident tool caches its answers against.                     |
```

## Item 2 (P2) — the read values

`src/server/types.ts`, the `covers` and `clear` examples. Each shows the value the constants blocks'
way, and no binding is left unread.

```diff
 	 * @example
 	 * ```ts
-	 * overlay.set('/srv/checkout/src/core/greeting.ts', "export const GREETING = 'hi'\n")
-	 * const inside = overlay.covers('/srv/checkout/src/core')
+	 * const path = '/srv/checkout/src/core/factories.ts'
+	 * overlay.set(path, "export function createGreeting(): string {\n\treturn 'hi'\n}\n")
+	 * overlay.covers('/srv/checkout/src/core') // true
 	 * ```
```

```diff
 	 * @example
 	 * ```ts
 	 * overlay.clear()
-	 * const remaining = overlay.paths
+	 * overlay.paths // []
 	 * ```
```

## Item 3 (P3) — the `Draft` illustrations

The draft at `src/core/greeting.ts` carrying `export const GREETING = 'hi'` is gone. Every site now
carries the flagship claim's draft — `src/core/factories.ts` exporting `createGreeting` — so one
candidate path runs through the guide, the contracts, and the tests.

```diff
  * @example
  * ```ts
- * const draft: Draft = { path: 'src/core/greeting.ts', text: "export const GREETING = 'hi'\n" }
+ * const draft: Draft = {
+ * 	path: 'src/core/factories.ts',
+ * 	text: "export function createGreeting(): string {\n\treturn 'hi'\n}\n",
+ * }
  * ```
```

```diff
  * const issue: Issue = {
  * 	origin: 'claimant',
- * 	path: 'src/core/greeting.ts',
+ * 	path: 'src/core/factories.ts',
  * 	message: "Type 'string' is not assignable to type 'number'.",
```

```diff
  * @example
  * ```ts
- * isDraft({ path: 'src/core/greeting.ts', text: 'export const GREETING = "hi"\n' }) // true
+ * const text = "export function createGreeting(): string {\n\treturn 'hi'\n}\n"
+ * isDraft({ path: 'src/core/factories.ts', text }) // true
  * isDraft({ path: '../../etc/hosts', text: '' }) // false
- * isDraft({ path: 'src/core/greeting.ts' }) // false
+ * isDraft({ path: 'src/core/factories.ts' }) // false
  * ```
```

The `OverlayInterface` block, its `set` example, and `Overlay`'s own class example take the same
draft; each binds the path once and reads it, so the long draft text fits the doc width.

```diff
  * const overlay: OverlayInterface = new Overlay()
- * overlay.set('/srv/checkout/src/core/greeting.ts', "export const GREETING = 'hi'\n")
+ * const path = '/srv/checkout/src/core/factories.ts'
+ * overlay.set(path, "export function createGreeting(): string {\n\treturn 'hi'\n}\n")
  * overlay.covers('/srv/checkout/src/core') // true
  * overlay.clear()
```

Scope decision recorded: the sites the item names are `src/core/types.ts` and `src/server/types.ts`,
and I extended it to `src/core/validators.ts` and `src/server/Overlay.ts`, which carried the same
refused draft. I did not rename `src/core/greeting.ts` where it is a plain path in a normalizer,
resolver, or formatter example (`src/core/helpers.ts`, `src/server/helpers.ts`, `src/core/shapers.ts`)
— a path illustration claims nothing about the lint policy. `src/core/types.ts`'s `Issue` example is
different: its message is the flagship control's own diagnostic, so it belongs on the flagship's
candidate path.

## Item 4 (P4) — the paragraph

The paragraph now at `guides/probe.md:851-855` rewraps at the guide's prose width. Eight more prose
blocks were over that width and took the same rewrap; § Criterion 4 names what remains and why.

```diff
-This reaches the flagship claim stated earlier: its test lives at `tmp/probe/greeting.test.ts`, and `tmp` is
-ignored in this workspace, so the lint stage inspects the candidate `src/core/factories.ts` and
-reports nothing about the test. Measured on 2026-08-20: the same three-line text carrying an unused
-binding and a `debugger` statement returns 0 issues at `tmp/probe/lint-ignored.test.ts` and 2
+This reaches the flagship claim stated earlier: its test lives at `tmp/probe/greeting.test.ts`, and
+`tmp` is ignored in this workspace, so the lint stage inspects the candidate `src/core/factories.ts`
+and reports nothing about the test. Measured on 2026-08-20: the same three-line text carrying an
+unused binding and a `debugger` statement returns 0 issues at `tmp/probe/lint-ignored.test.ts` and 2
 issues at `tests/src/core/lint-tracked.test.ts`.
```

## Item 5 (P5) — the tally

```diff
-  reply carries on both eras, and the signals delivered to it during boot and in service.
+  reply carries on the legacy and the modern era, and the signals delivered to it during boot and
+  in service.
```

`legacy` and `modern` are the guide's own terms for the pair (`guides/probe.md:539`, `:596`) and the
suite's (`tests/src/bin/main.test.ts:523`, `:529` build `era-legacy` and `era-modern`).

## Item 6 (P6) — the README's copy

```diff
-	it('states the same claim in the guide, the contract, and this proof', () => {
+	it('states the same claim in the guide, the contract, the README, and this proof', () => {
 		const transcribed = extractLiteral(
 			readWorkspaceText('tests/guides.test.ts'),
 			`${OPENING.replace('claim', 'CLAIM')}`,
 		)
 		expect(transcribed).not.toBe('')
 		const documented = extractLiteral(GUIDE, OPENING)
 		const contract = extractLiteral(extractComment(CORE_TYPES, 'Claim'), OPENING)
+		const pitched = extractLiteral(readWorkspaceText('README.md'), OPENING)
 		expect(documented).toBe(contract)
+		expect(documented).toBe(pitched)
 		expect(documented).toBe(transcribed.replace('const CLAIM: Claim = {', OPENING))
 	})
```

The case is renamed for what it now proves. Ancillary decision, recorded: the brief identifies it by
its former name `states the same claim in the guide, the contract, and this proof`.

**Failing first.** A drift planted in `README.md`'s copy of the claim (`must not compile` read
`must not typecheck`) turns the new assertion red at the line it added, and the plant was removed by
editing the word back. `git status --short` lists `README.md` clean afterwards.

```text
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project guides \
  -t 'states the same claim in the guide, the contract, the README, and this proof'
 ❯ tests/guides.test.ts:499:22
    498|   expect(documented).toBe(contract)
    499|   expect(documented).toBe(pitched)
       |                      ^
 Test Files  1 failed (1)
      Tests  1 failed | 55 skipped (56)
```

After removing the plant, the same command:

```text
 Test Files  1 passed (1)
      Tests  1 passed | 55 skipped (56)
```

## Item 7 (P7) — `IMPLEMENTATIONS`

```diff
-	['TypeStage', ['StageInterface', 'TypeStageInterface']],
-	['LintStage', ['StageInterface']],
+	['TypeStage', ['TypeStageInterface', 'StageInterface']],
+	['LintStage', ['LintStageInterface', 'StageInterface']],
```

`LintStage`'s row now matches `src/server/stages/LintStage.ts:54`. `TypeStage`'s row reorders to the
same reading the block's comment states — the contract the class declares, then the one it inherits.
Membership is deduplicated and sorted before the comparison, so the order changes no result.

**The row binds.** Narrowing it to `['LintStageInterface']` alone turns the case red, which is the
evidence that both named contracts are really read:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project guides \
  -t 'publishes exactly the members each implementation declares it implements'
AssertionError: expected [ 'destroy', 'inspect', …(2) ] to strictly equal [ 'inspect' ]
      Tests  1 failed | 55 skipped (56)
```

Restored to `['LintStageInterface', 'StageInterface']`, the same command:

```text
 Test Files  1 passed (1)
      Tests  1 passed | 55 skipped (56)
```

## Item 8 (P8, Rulings 13, 20, 21, 25, 26) — the closing items

**The `Shape` idiom where a table lacks it (Ruling 25).** `### Shapes` is a table of `const` rows, so
it is a constants table whatever its heading. It heads `Shape` under the constants sentence, and each
cell holds the value's declared type in Ruling 19's bare-member form, in declaration order, read from
`src/core/shapers.ts:20`, `:37`, `:58`, `:86` and `ObjectShape<P, A>` at
`node_modules/@orkestrel/contract/dist/src/core/index.d.ts:4114`.

```diff
+A `Shape` cell holds the constant's declared type.
+
-| Name            | Kind  | Summary   |
+| Name            | Kind  | Shape                                         | Summary   |
+| `DRAFT_SHAPE`   | const | `ObjectShape<{ path, text }>`                 | Describes one proposed file a claim carries. |
+| `CASE_SHAPE`    | const | `ObjectShape<{ files, test }>`                | … |
+| `CONTROL_SHAPE` | const | `ObjectShape<{ files, test, stage, reason }>` | … |
+| `CLAIM_SHAPE`   | const | `ObjectShape<{ project, case, control }>`     | … |
```

**Ruling 26's sentence is not owed here.** No table in this guide carries the `Shape` column and a
`function`-kind row, so its trigger does not fire and no `Shape` cell is empty. The audit of every
table's columns against its row kinds is `tmp/d7n-probe-converge-fix/criteria.log.txt`'s companion
reading:

```text
36:  ### Contracts       cols=[Name, Kind, Shape, Summary]      kinds=[interface, type]
65:  ### Constants       cols=[Name, Kind, Shape, Summary]      kinds=[const]
84:  ### Errors          cols=[Name, Kind, Signature, Summary]  kinds=[class, function]
100: ### Shapes          cols=[Name, Kind, Shape, Summary]      kinds=[const]
114: ### Validators      cols=[Name, Kind, Shape, Summary]      kinds=[const]
132: ### Formatters …    cols=[Name, Kind, Signature, Summary]  kinds=[function]
149: ### Server contracts cols=[Name, Kind, Shape, Summary]     kinds=[interface, type]
188: ### The engine      cols=[Name, Kind, Summary]             kinds=[class]
218: ### Server helpers  cols=[Name, Kind, Signature, Summary]  kinds=[function]
254: ### Server parsers  cols=[Name, Kind, Signature, Summary]  kinds=[function]
```

`### Validators` is a dedicated guard table and already carries the guard sentence alone, per
Rulings 20 and 27. The `Signature` tables carry no interface or type-alias row, so Ruling 15's
trigger does not fire on them either.

**`#` links.** `grep -rn '{@link [A-Za-z]*#' src` returns nothing; the closing generator listed no
site and none exists.

**The drop-in (Rulings 13, 20, 21).** Lines 1 to 3 equal the pilot's, and the pilot's `47-257` region
— `const root = new URL('../', import.meta.url)` through the manifest loop's closing brace — is
present verbatim at `tests/guides.test.ts:58`. My edits sit outside it, at `IMPLEMENTATIONS`
(`:321`) and in the executed section (`:489`).

```text
diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
(no difference)

python3 tmp/d7n-probe-converge-fix/region.py
pilot 47-257 verbatim in probe: True at line 58
```

**Fence lead-ins (Ruling 21).** The sweep for a fence sitting directly under a heading returns
nothing; see § Criterion 4.

## Item 9 — propagation

```text
npx oxfmt --config .oxfmtrc.json --write guides/probe.md README.md tests/guides.test.ts src
Finished in 808ms on 21 files using 4 threads.

PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0

PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

The first `npm run docs` after item 1 reported the two class descriptions as disagreements;
`-- --to guide` wrote both (`rows read: 1, disagreements found: 2, written: 2, reported: 0`) and
every reading since is zero.

## Criterion 1 — the working tree

```text
git status --short
 M guides/probe.md
 M src/core/types.ts
 M src/core/validators.ts
 M src/server/Overlay.ts
 M src/server/ProbeServer.ts
 M src/server/types.ts
 M tests/guides.test.ts

git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'
(no output)
```

Owned files only. Every `src` change is a doc-block line; no code token moved.

## Criterion 2 — format, lint, typecheck

```text
npx oxfmt --config .oxfmtrc.json --check guides/probe.md README.md tests/guides.test.ts src
All matched files use the correct format.
Finished in 699ms on 21 files using 4 threads.
exit=0

npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src
exit=0

PATH=/opt/npm11/bin:$PATH npm run check
> tsc --noEmit -p configs/src/tsconfig.bin.json
exit=0
```

## Criterion 3 — the docs comparison

Recorded under § Item 9: `rows read: 1, disagreements found: 0`, and each write direction at
`written: 0`.

## Criterion 4 — the sweeps

```text
grep -c 'GREETING' src/core/types.ts src/server/types.ts
src/core/types.ts:0
src/server/types.ts:0

grep -c "on both eras" guides/probe.md
0

grep -c "LintStageInterface" tests/guides.test.ts
1

grep -c "README.md" tests/guides.test.ts
7

diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
(no difference)

awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/probe.md
(no output)

grep -nE '^\| `[^`]+` +\| (function|const) +\| +\| ' guides/probe.md
(no output)
```

**The line-length sweep does not reach zero, and the criterion's instrument is part of why.**

```text
awk 'length > 100' guides/probe.md | grep -vc '^|'
18
```

`awk` in this shell counts bytes (`LANG` and `LANGUAGE` are unset; `awk 'BEGIN{print length("a—b")}'`
prints 5 for a 3-character string), so every guide line carrying an em dash inflates past 100 without
being wider than 100 characters. Read in characters, the population outside table rows is:

```text
python3 -c "import pathlib; print([(i,len(l)) for i,l in enumerate(pathlib.Path('guides/probe.md').read_text().split('\n'),1) if len(l)>100 and not l.startswith('|')])"
[(34, 310), (147, 310), (480, 142), (632, 172), (644, 172), (654, 173)]
```

Every prose line the rewrap could reach is now within the guide's width. What remains, and why each
stays:

- `34` and `147` — the `Shape` convention sentence Ruling 15 fixes fleet-wide, which the pilot
  `/home/user/fleet/abort/guides/abort.md:62` also carries on one line.
- `480` — the quoted workspace message, a single inline code span the guide sets off on its own line.
  Wrapping it inside the bullet is what the formatter refuses: with the continuation indented,
  `npx oxfmt --config .oxfmtrc.json --check guides/probe.md` exits 1, and with the continuation at
  column 0 the guide loses the bullet's indent. The line is restored to the layout it shipped with.
- `632`, `644`, `654` — the flagship claim's fenced string literals and its receipt token. The
  executed case compares those bytes against `src/core/types.ts`, `README.md`, and the suite's own
  copy, so wrapping them breaks the equality gate.

## Criterion 5 — the suites

```text
PATH=/opt/npm11/bin:$PATH npm run test:guides
 Test Files  1 passed (1)
      Tests  56 passed (56)
   Start at  03:10:24
   Duration  17.85s (transform 340ms, setup 37ms, import 587ms, tests 17.07s, environment 0ms)
exit=0

PATH=/opt/npm11/bin:$PATH npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Start at  03:10:42
   Duration  568ms (transform 135ms, setup 31ms, import 137ms, tests 248ms, environment 0ms)
exit=0
```

## Deviation — `npm run test:src:server` is red, and this unit is not the cause

**Expected.** The observation run green, as the converge report records for the full suite at that
unit's close.

**Found.** `tests/src/server/Probe.test.ts` fails, every other file in the project passes.

```text
PATH=/opt/npm11/bin:$PATH npm run test:src:server
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > mints receipts only when every stage executes cleanly, including for a control that shares no path with its case, and returns admitted path issues
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > retains all stage checks when the runtime stage cannot write its specification
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > expires only the active inspection, cleans its revision, and serves a queued claim
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > replaces a type stage its deadline destroyed
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > binds the project into the token and holds the claim digest across projects
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > names the caller-chosen project in the token the workspace project refuses
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > separates two claims answered under one project
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > mints one token for one claim in two separate processes
 Test Files  1 failed | 7 passed (8)
      Tests  8 failed | 190 passed (198)
exit=1
```

**Evidence.** The failures are not timing. `tests/src/server/Probe.test.ts:1662` builds its candidate
draft as `src/core/probe-project-<id>.ts` carrying `export const VALUE = 'ok'` — module data in a
file the workspace's own lint policy admits none in, which is the rule `guides/probe.md:662-666`
states as load-bearing for the flagship claim. The lint stage charges the case a `claimant` issue, so
no receipt is minted and every assertion over the token reads an empty split. Run against the built
`dist/` with that claim taken verbatim from the test file
(`tmp/d7n-probe-converge-fix/probe-issues.mjs`):

```text
receipt: undefined
case lint {"origin":"claimant","path":"src/core/probe-project-diagnostic.ts","message":"Move this module data to constants.ts or another data-kind file.","range":{"start":{"line":0,"character":13},"end":{"line":0,"character":25}}}
control type {"origin":"claimant","path":"src/core/probe-project-diagnostic.ts","message":"Type 'string' is not assignable to type 'number'.","range":{"start":{"line":0,"character":13},"end":{"line":0,"character":13}}}
control lint {"origin":"claimant","path":"src/core/probe-project-diagnostic.ts","message":"Move this module data to constants.ts or another data-kind file.","range":{"start":{"line":0,"character":13},"end":{"line":0,"character":34}}}
```

Other cases in the same file carry the same draft text and pass, because they assert on issues or on
teardown rather than on a clean case and a minted receipt.

This unit cannot be the cause: every `src` change is a comment line (§ Criterion 1's filter prints
nothing), `dist/` was built before this unit and is untouched, and the reproduction above runs that
built code against a claim this unit never edited. The refusing configuration is committed at
`d06b186` and `git status --short` lists only the owned files, so the condition belongs to the tip
this unit was given. The failing file is `tests/src/server/**`, which the brief puts off-limits, so
I changed nothing there.

**Done.** Items 1 to 9 and criteria 1 to 5.

**Not done.** Nothing in scope. The `Probe.test.ts` candidate drafts are the next round's work.

**Hypothesis, one.** The suite's candidate drafts were written before the policy plugin refused
module data outside a data-kind file, and the flagship claim was moved onto `src/core/factories.ts`
for exactly that rule while this suite's own drafts were not.

## Ancillary decisions

- **The openers' wording.** Both take the pilot's `Implements \`X\` over …` shape at `abort.md:58`
  rather than a `the \`X\` contract` variant, because the brief names the pilot as the form.
- **`### The engine`'s lead-in stays.** It maps every class to its contract, and only two rows now
  name theirs, so removing it would strand the other four.
- **The renamed executed case.** Named for what it proves, which now includes the README's copy.
- **`TypeStage`'s row order.** Changed with `LintStage`'s so both read declared-then-inherited, the
  order the block's own comment states. No result depends on it.
- **The rewrap's reach.** Eight prose blocks beyond `:851-855` were over the guide's width and took
  the same treatment; the rewrap left every block whose only overrun was an em dash's byte count.
- **`src/core/greeting.ts` as a path.** Kept wherever it illustrates a path rather than a candidate
  draft.

## Retained instruments

Under `/home/user/fleet/probe/tmp/d7n-probe-converge-fix/`: `edit-src.py`, `edit-server.py`,
`edit-descriptions.py`, `edit-tests.py`, `edit-guide-shapes.py`, `edit-eras.py`, `rewrap.py`,
`fix-spans.py`, `region.py`, `probe-issues.mjs`, `criteria.sh`, `criteria.log.txt`,
`probe.md.pre-rewrap`.
