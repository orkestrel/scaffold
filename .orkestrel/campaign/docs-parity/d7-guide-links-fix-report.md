# Report — `d7-guide-links-fix`

`implementer` on Claude Opus 5, sole writer in `/home/user/fleet/guide`, from the clean tip `45832d8` ("Collect a scope's declarations once per Source"). Every criterion is green. No deviation.

## The measurement

Every `{@link}` target carrying a `#` that the fleet authors, outside `node_modules`, `dist`, and an `https://` URL:

```
$ grep -rEn --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git -o '\{@link [^}]*#[^}]*\}' /home/user/fleet --include=*.ts --include=*.tsx --include=*.vue --include=*.md | grep -v 'https\?://'
{@link #append}                        workflow/src/core/phases/Phase.ts:73
{@link #carriage}                      sse/src/core/SSEParser.ts:169
{@link #isSurface}                     console/src/core/Styler.ts:62
{@link #leaveRaw}                      terminal/src/server/Terminal.ts:381
{@link #nextId}                        mcp/src/core/MCPClient.ts:85
{@link #pending}                       mcp/src/core/MCPClient.ts:86, :102
{@link #settle}                        mcp/src/core/MCPClient.ts:102
{@link @scope/widgets#Widget}          guide/tests/src/core/helpers.test.ts:2204
{@link @scope/widgets#Widget.render}   guide/tests/src/core/helpers.test.ts:2205
{@link InterpretInterface#interpret}   interpret/src/core/types.ts:35
{@link JSONDriver.#document}           database/src/server/drivers/JSONDriver.ts:69
{@link TemplateInterface#fill}         template/src/core/types.ts:57, :67
{@link module#X}                       guide/guides/guide.md:364
```

The fleet writes no package-qualified target of its own: the scoped form appears only in this package's own fixtures, and `module#X` only in the guide bullet this unit rewrites. Every authored `#` is JSDoc's member reference, and the guide cell documenting one carries it as written — `template/guides/template.md:38` reads `` Names how `TemplateInterface#fill` handles an unresolved required placeholder. `` under a `Summary` column against the doc block at `template/src/core/types.ts:57`. That pair is a live compared row, not a latent one: under the pre-change rule the source side rendered `` `fill` `` while the cell reads `` `TemplateInterface#fill` ``, so the row drifted.

```
$ node -e '<pre-change replace chain over the template pair>'
pre-change source side: "Names how `fill` handles an unresolved required placeholder."
```

## The rule chosen

**A module part before a `#` is a package or a path, and a package or path token carries `@` or `/`. Text before a `#` carrying neither is JSDoc's member reference and travels whole, owner or no owner.**

Why this and not a wider one: `@` and `/` are the only characters in the measured set that a TypeScript declaration name cannot hold, so they separate `@scope/pkg#Name` and `./widgets.js#Widget` from `TemplateInterface#fill` by shape alone. The brief's alternative — admitting a bare hyphenated package name — closes nothing the fleet writes, so it stays out; a hyphen can join the class the day a documented package name carries one. The rule's honest limit is that an unscoped package name is spelled like an owner, so `{@link pkg#Name}` travels whole; the doc block states that limit and names the scoped and the path form as the spellings that drop.

Rendering every measured form through the built module, each as its guide cell writes it:

```
$ node -e '<normalizeSummary over each measured form>'
{@link #append}                        -> Names `#append`.
{@link #carriage}                      -> Names `#carriage`.
{@link #isSurface}                     -> Names `#isSurface`.
{@link #leaveRaw}                      -> Names `#leaveRaw`.
{@link #nextId}                        -> Names `#nextId`.
{@link #pending}                       -> Names `#pending`.
{@link #settle}                        -> Names `#settle`.
{@link @scope/widgets#Widget.render}   -> Names `Widget.render`.
{@link @scope/widgets#Widget}          -> Names `Widget`.
{@link InterpretInterface#interpret}   -> Names `InterpretInterface#interpret`.
{@link JSONDriver.#document}           -> Names `JSONDriver.#document`.
{@link TemplateInterface#fill}         -> Names `TemplateInterface#fill`.

$ node -e '<normalizeSummary over the template doc block and the cell documenting it>'
"Names how `TemplateInterface#fill` handles an unresolved required placeholder."
"Names how `TemplateInterface#fill` handles an unresolved required placeholder."
agree: true
```

## The term

`TSDoc's package-qualified form` names the `#` form in the doc block description, the `@remarks` paragraph, the guide bullet, and the test name; `JSDoc's member reference` names what it is not. `declaration reference` is gone from the package. The syntax is TSDoc's declaration reference with a module source, documented at `https://tsdoc.org/pages/tags/link/`; the report cites it and the prose does not. The renamed test speaks of the module part, the term the doc block, the guide cell, the guide bullet, and the sibling comment already use.

## The hunks

`src/core/helpers.ts` — the rule:

```diff
-				.replace(/\{@link\s+(?:import\([^)]*\)\.|[^}|#\s]*#)?([^}|]*?)\s*\}/g, '`$1`')
+				.replace(/\{@link\s+(?:import\([^)]*\)\.|[^}|#\s]*[@/][^}|#\s]*#)?([^}|]*?)\s*\}/g, '`$1`')
```

`src/core/helpers.ts` — the description, with the module-part clause bound to the target and lifted out of the label disjunction:

```diff
- * Returns the canonical compared form of a description paragraph — `{@link Target}` and
- * `{@link Target | label}` become the code token of the label or the target text with the
- * target's `import('./module.js').` or `module#` module part dropped, every run of whitespace,
- * including a collapsed continuation marker and a line break, becomes one space, the ends trim,
- * and a code span keeps its delimiters while its own boundary whitespace goes. The guide's side
- * and the source's side read through this one form.
+ * Returns the canonical compared form of a description paragraph. `{@link Target}` and
+ * `{@link Target | label}` become the code token of the target text, or of the label where one is
+ * written; a target's module part — the inline import form `import('./module.js').` and TSDoc's
+ * package-qualified form `@scope/pkg#` — is dropped first. Every run of whitespace, including a
+ * collapsed continuation marker and a line break, becomes one space, the ends trim, and a code
+ * span keeps its delimiters while its own boundary whitespace goes. The guide's side and the
+ * source's side read through this one form.
```

`src/core/helpers.ts` — the `@remarks` paragraph, stating the rule, its decision test, and its limit, in the concrete dress the description and the bullet use:

```diff
- * A target's module part is the inline import form `import('<specifier>').` or the declaration
- * reference form `<module>#`, and the expansion drops it, so a cross-file link and the code
- * token a guide cell documents it with reach the same text. Everything after that part travels:
- * `Owner.member` keeps its owner, and a dotted target no module part precedes is untouched. A
- * label is text rather than a target, so `{@link Target | label}` renders its label whole.
+ * A target's module part is the inline import form `import('./module.js').` or TSDoc's
+ * package-qualified form `@scope/pkg#`, and the expansion drops it, so a cross-file link and the
+ * code token a guide cell documents it with reach the same text. A package qualifier carries `@`
+ * or `/`; text before a `#` carrying neither is JSDoc's member reference, so `{@link Owner#member}`
+ * and `{@link #member}` travel whole and a guide cell documents each as written. An unscoped
+ * package name is spelled like an owner, so `{@link pkg#Name}` travels whole too — write the
+ * scoped or the path form where a cell must drop the package. Everything after a module part
+ * travels: `Owner.member` keeps its owner, and a dotted target no module part precedes is
+ * untouched. A label is text rather than a target, so `{@link Target | label}` renders its label
+ * whole.
```

`src/core/helpers.ts` — the worked cases, in the `@example` where the others sit:

```diff
  * normalizeSummary("Reads {@link import('./widgets.js').Widget}.") // 'Reads `Widget`.'
+ * normalizeSummary('Reads {@link @scope/widgets#Widget}.') // 'Reads `Widget`.'
+ * normalizeSummary('Reads {@link Widget#render}.') // 'Reads `Widget#render`.'
  * normalizeSummary('cells joined by ` | `.') // 'cells joined by `|`.'
```

`guides/guide.md:364` — the compared-form bullet, one clause in one line with one example, ending as its neighbours end:

```diff
-- A target's module part — the inline import form `import('./module.js').` and the declaration reference form `module#` — drops, so `{@link import('./module.js').X}` and `{@link module#X}` become the code token of `X` while `{@link import('./module.js').A.b}` becomes the code token of `A.b`.
+- A target's module part — the inline import form `import('./module.js').` and TSDoc's package-qualified form `@scope/pkg#`, whose package carries `@` or `/` — drops, so `{@link @scope/pkg#A.b}` becomes the code token of `A.b`, outside a located span.
```

`guides/guide.md:99` — the `## Surface` cell, rewritten by `npm run docs -- --to guide` from the doc block and formatted by `oxfmt`, never by hand.

`tests/src/core/helpers.test.ts` — the renamed case, the path-qualified assertion that pins `/` alone as a qualifier, and the member-reference cases:

```diff
-	it('drops the package part of a declaration reference target', () => {
+	it('drops the module part of a package-qualified target', () => {
 		expect(normalizeSummary('Reads {@link @scope/widgets#Widget}.')).toBe('Reads `Widget`.')
 		expect(normalizeSummary('Reads {@link @scope/widgets#Widget.render}.')).toBe(
 			'Reads `Widget.render`.',
 		)
+		expect(normalizeSummary('Reads {@link ./widgets.js#Widget}.')).toBe('Reads `Widget`.')
+	})
+
+	// The other reading of `#`. A package-qualified target names its package before the `#`, and a
+	// package or path token carries `@` or `/`; the fleet writes JSDoc's member reference in the
+	// same syntax, and the guide cell documenting one carries its text whole. So a target whose
+	// `#` no package precedes travels untouched, owner or no owner.
+	it('keeps the owner of a member reference', () => {
+		expect(normalizeSummary('Reads {@link Widget#render}.')).toBe('Reads `Widget#render`.')
+	})
+
+	it('keeps a member reference written with no owner', () => {
+		expect(normalizeSummary('Reads {@link #render}.')).toBe('Reads `#render`.')
 	})
```

Diffstat:

```
 guides/guide.md                |  4 ++--
 src/core/helpers.ts            | 32 ++++++++++++++++++++------------
 tests/src/core/helpers.test.ts | 15 ++++++++++++++-
 3 files changed, 36 insertions(+), 15 deletions(-)
```

## Criterion 1 — red first, then green, existing cases unchanged

Command: `PATH=/opt/npm11/bin:$PATH npm run test:src:core`, run in `/home/user/fleet/guide`.

Red, with the tests added and the rule not yet changed:

```
 FAIL  |src:core| tests/src/core/helpers.test.ts > normalizeSummary > keeps the owner of a member reference
AssertionError: expected 'Reads `render`.' to be 'Reads `Widget#render`.' // Object.is equality
 ❯ tests/src/core/helpers.test.ts:2216:60

 FAIL  |src:core| tests/src/core/helpers.test.ts > normalizeSummary > keeps a member reference written with no owner
AssertionError: expected 'Reads `render`.' to be 'Reads `#render`.' // Object.is equality
 ❯ tests/src/core/helpers.test.ts:2220:54

 Test Files  1 failed | 7 passed (8)
      Tests  2 failed | 611 passed (613)
```

Green, after the rule changed:

```
 Test Files  8 passed (8)
      Tests  613 passed (613)
```

The failing names are `normalizeSummary > keeps the owner of a member reference` and `normalizeSummary > keeps a member reference written with no owner`. No existing case moved: the same run reports every other case passing in the red run and in the green one, and the renamed case keeps its assertions and gains the path-qualified one, which passed under the old rule and passes under the new one.

## Criterion 2 — format, lint, typecheck

```
$ npx oxfmt --config .oxfmtrc.json --check src/core/helpers.ts tests/src/core/helpers.test.ts guides/guide.md
All matched files use the correct format.
Finished in 1620ms on 3 files using 4 threads.
exit=0

$ npx oxlint --config .oxlintrc.json --deny-warnings src/core/helpers.ts tests/src/core/helpers.test.ts guides/guide.md
exit=0

$ npx oxlint --config .oxlintrc.json --deny-warnings --format=default --report-unused-disable-directives src tests/src/core/helpers.test.ts
Found 0 warnings and 0 errors.
Finished in 848ms on 12 files with 140 rules using 4 threads.
exit=0

$ PATH=/opt/npm11/bin:$PATH npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
exit=0
```

The scoped `oxlint` invocation prints nothing on a clean run, so the second invocation is there to show the files were read and the rules applied.

## Criterion 3 — build, then parity

```
$ PATH=/opt/npm11/bin:$PATH npm run build
✓ built in 902ms
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
exit=0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
wrote guides/guide.md
rows read: 1, disagreements found: 1, written: 1, reported: 0

$ npx oxfmt --config .oxfmtrc.json --write guides/guide.md
Finished in 1836ms on 1 files using 4 threads.

$ PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0
exit=0
```

## Criterion 4 — the scoped suites

```
$ PATH=/opt/npm11/bin:$PATH npm run test:src:core
 Test Files  8 passed (8)
      Tests  613 passed (613)
   Duration  4.52s
exit=0

$ PATH=/opt/npm11/bin:$PATH npm run test:guides
 Test Files  1 passed (1)
      Tests  54 passed (54)
   Duration  1.65s
exit=0

$ PATH=/opt/npm11/bin:$PATH npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.51s
exit=0
```

The `test:policy` skip is the suite's own pre-existing conditional case; this change adds none.

## Criterion 5 — scope

```
$ git status --short
 M guides/guide.md
 M src/core/helpers.ts
 M tests/src/core/helpers.test.ts

$ grep -n '"version"' package.json
3:	"version": "0.0.18",

$ git diff --name-only -- package.json package-lock.json
(no output)
```

Owned files only. The version stays `0.0.18`, and neither the manifest nor the lockfile is touched. `dist/` moved under `npm run build` and is ignored.

## Observations, carried rather than acted on

- The subjective lane's F5 (the round-trip fixture links `import('./widgets.js').Widget`, a module and a symbol the fixture block does not declare) is outside this brief's carried findings and outside these hunks. It stands against `tests/src/core/helpers.test.ts` for a successor.
- Nothing in the fleet writes an unscoped package-qualified target today, so the limit the doc block records has no live consumer. A documented package name carrying a hyphen would be the trigger to widen the qualifier class.

## Deviation state

None. No fleet form failed to render as its guide cell writes it, and no gate outside the owned files went red.
