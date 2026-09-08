# Untrusted subjective design projection

Session: efbe4adf-85ec-4382-9d11-65d60e355dd4. Journal: tmp/claude/d7n-guide-heading-design-subjective.jsonl.

This projection omits engine identifiers from the pushed artifact. The returned proposal
remains unaccepted. Its proposed routing is not the session routing ledger. Prose-only
counts and the attempted unavailable Write call are annotations, not source changes.

Lane held: **subjective** (shape, taste, naming, ergonomics, design fit). Write tools are disabled for this session, so the proposal is returned inline.

## Design

### The invariant

An H3 under `## Surface` names an entity only when the heading's whole visible text is that entity's code span. Anything else in that section carrying a code span is prose about an entity, not a declaration of one.

Stated for a guide author: **an entity heading is an H3 whose visible text is exactly one code span.** A heading carrying any other visible word or code span is a prose heading, and a prose heading contributes no symbol.

### The rule in code

The correction sits entirely in the H3 branch of `extractSurface` (`guide/src/core/helpers.ts:1525`). It reads the heading's text with the primitive the package already uses for heading text and compares it to the code span the same branch already reads:

```ts
if (isHeadingNode(block) && block.level === 3) {
	const rawName = findFirstCode(block.children)
	if (rawName === undefined || flattenText(block).trim() !== rawName.trim()) continue
	const symbol: SurfaceSymbol = { name: normalizeIdentifier(rawName), keyword: 'class' }
	// unchanged from here: computeSymbolKey, seen, push
}
```

Both sides are trimmed, so a padded heading and a padded code span agree instead of falling out on whitespace.

No new parser, no new guard, no new export, no new type. `flattenText` is imported at `guide/src/core/helpers.ts:36` and already reads heading text in `selectSectionBlocks` (`guide/src/core/helpers.ts:1393`) and in `Guide` (`guide/src/core/Guide.ts:48`). Table-row admission — `extractRowSymbol`, `extractRowSummary`, `findColumnIndex` — is untouched.

### Behavior, form by form (G1)

| H3 form | Visible text | First code span | Admitted | Symbol |
| --- | --- | --- | --- | --- |
| `` ### `Widget` `` | `Widget` | `Widget` | yes | `{ name: 'Widget', keyword: 'class' }` |
| `` ### `Handler<TNode, T>` `` | `Handler<TNode, T>` | same | yes | `{ name: 'Handler', keyword: 'class' }` |
| `` ###   `Widget`   `` (padded heading) | `Widget` after trim | `Widget` | yes | as plain |
| ``### `  Widget  ` `` (padded span) | trims equal | trims equal | yes | as plain |
| ``### **`Widget`**`` | `Widget` | `Widget` | yes | as plain |
| ``### [`Widget`](../src/Widget.ts)`` | `Widget` | `Widget` | yes | as plain |
| ``### Bind a `Widget` to a transport`` | `Bind a Widget to a transport` | `Widget` | no | none |
| ``### `Widget` and `Gadget` `` | `Widget and Gadget` | `Widget` | no | none |
| ``### `Widget`: the entity`` | `Widget: the entity` | `Widget` | no | none |
| `### Classes` | `Classes` | none | no | none (unchanged) |

Emphasis and link survive because `findFirstCode` descends into them and `flattenText` drops them to their text, so the two readings meet. That keeps the linked entity heading — the form a guide uses to point a heading at its source file — a first-class entity heading.

### What the rule leaves alone (G2)

- **The defect closes.** The embedded demonstration H3 no longer keys `class Widget`, so the class row is the first symbol for that key and carries `summary: 'Represents a widget.'`.
- **Genuine heading-only documentation stands.** `` ### `Guide` `` at `guide/guides/guide.md:216`, `:225`, `:244` and the good fixture's `` ### `Widget` `` at `guide/tests/fixtures/good/guides/src/widget.md:22` all still admit.
- **Section scope is unchanged.** `selectSectionBlocks` still bounds the window, so the demonstration H3s from `guide/guides/guide.md:676` stay outside `## Surface` and outside this rule.
- **Keyword-sensitive dedup is unchanged.** `computeSymbolKey` still keys `${keyword} ${name}`; the heading branch still fixes `keyword: 'class'`.
- **Table-first behavior is unchanged.** A row before a code-only entity heading still wins and the heading dedupes out. `guide/guides/guide.md` is written that way — the `### Classes` table at `:203`, entity headings from `:216` — and that order stays supported.
- **First-seen is bounded, not redesigned.** The rule only removes candidates from the heading branch; it never changes which of two admitted candidates wins. The residual stands: a genuine code-only entity heading placed before a Summary-bearing row for the same `class Name` still suppresses that row's summary. Do not close it here. Pin it with a test so it cannot drift silently, and name it in the guide as the reason to write the class table before the entity headings.

### Over-correction boundary

The correction may touch the H3 branch of `extractSurface` and the prose describing it. It may not touch `findFirstCode` (shared with table rows, `extractUnnamed`, and `collectGroups`), `normalizeIdentifier`, `extractRowSymbol`, `extractRowSummary`, `findColumnIndex`, `collectGroups` and the `## Methods` H4 rule, `selectSectionBlocks`, the dedup key, the encounter order, the fixed `'class'` keyword, any public type or export, or the package version.

### Vocabulary

Keep one term. `entity heading` names the admitted form and gains a definition; `prose heading` names the refused form and appears only where the boundary is stated. Add no third synonym such as "naming heading" or "code-only heading" in the TSDoc or the guide.

### Documentation shape (G4)

State the boundary once in the description paragraph, because the guide `Summary` cell is that paragraph, and put the form detail in `@remarks`, which the cell does not carry.

- Description gains: "… unioned with every H3 entity heading in the section — an H3 whose visible text is exactly one code span, so a heading also carrying other words or code names no symbol".
- `@remarks` gains the emphasis, link, generic-annotation, and padded readings, and the residual ordering limit.

Converge `guide/guides/guide.md:110` with `npm run docs`, never by hand. Update the extraction-model paragraph at `guide/guides/guide.md:320`, which states the union rule in prose. Leave `Guide.surface`'s doc block and `guide/guides/guide.md:269` alone: "table rows union backticked entity headings" stays true under the narrowed definition.

### Regression proof (G3)

Write the failing controls first, record the red reading, apply the narrowing, record the same command green. Both readers the brief names are covered.

Controls in `guide/tests/src/core/helpers.test.ts` under `describe('extractSurface')`:

- **Negative control, the defect.** An embedded demonstration H3 before a Summary-bearing class row yields `[{ name: 'Widget', keyword: 'class', summary: 'Represents a widget.' }]`. Red today; the retained probe records the actual as `[{ name: 'Widget', keyword: 'class' }]` at `.orkestrel/campaign/docs-parity/d7n-guide-heading.log.txt:25`.
- **Positive control, admission retained.** `` ### `Widget` `` alone still yields `[{ name: 'Widget', keyword: 'class' }]`.
- **Positive control drawn from outside the membership rule.** ``### **`Widget`**`` and ``### [`Widget`](../src/Widget.ts)`` still admit, mirroring the existing emphasis control at `guide/tests/src/core/helpers.test.ts:1146`.
- **Positive control, ordering.** A class row before a code-only entity heading still yields the row's summary once.
- **Residual pinned.** A code-only entity heading before the same class's row still yields the symbol without a summary, the test named for the limit it proves.

Cached surface, in `guide/tests/src/core/Guide.test.ts`: `createGuide` over the embedded text, and `surface()` carries the summary.

Narrow command: `npm run test:src:core` (`guide/package.json:60`).

Probe MCP coverage: **unknown**. A glob over `guide/tests/**/*.ts` returned no file for the `probe` vitest project named at `guide/package.json:69`. No `prove` receipt is claimed: these claims are runtime readings, not a TypeScript edit naming a project, a case, and the stage it must break at.

## Alternatives

**Structural rule — the heading's children must be one code-span node, ignoring whitespace-only text.** Rejected. It refuses ``### **`Widget`**`` and ``### [`Widget`](../src/Widget.ts)`` unless it re-implements the descent `findFirstCode` already performs, so it either loses the linked entity heading guides legitimately use or duplicates an existing traversal. The textual rule reuses two primitives already in the file and admits exactly the forms a reader would call a name.

**Merge rule — keep wide admission and let a later Summary-bearing row fill a heading-derived symbol's missing summary.** Rejected. It redesigns the first-seen dedup the brief bounds, it still records a phantom `class Widget` for a guide whose demonstration heading mentions an entity no table declares, and it makes the projection order-dependent a second way. If the residual ordering limit must close, that is a successor brief against the dedup, not this correction.

## Constraints

_Objective lane._

## Refusals

_Objective lane._

## Measurements

_Objective lane. Readings this design needs and the dispatch did not supply are named under Tensions._

## Units

Serial: one writer per checkout. `guide` at `1d5afa3` is the only writing checkout.

**D7N-0 — Blast-radius sweep.** Role `grok`, engine reading engine (ladder: mechanical engine, then builder engine; record the step). Read-only. Sweep every committed guide in the fleet for an H3 under `## Surface` whose visible text carries more than its code span, and for a class documented only by such a heading. Returns `file:line` per hit with the heading text. Acceptance: the result names its pattern and the paths covered, including a clean result. Depends on nothing; informs D7N-1's boundary.

**D7N-1 — Reader narrowing and its proof.** Role `sol`, engine native objective engine; on a recorded dark Codex bench, role `implementer`, engine subjective engine, substitution recorded. Owns `guide/src/core/helpers.ts` (the `extractSurface` H3 branch and its doc block), `guide/tests/src/core/helpers.test.ts`, `guide/tests/src/core/Guide.test.ts`. Off-limits: every other source file, `guide/package.json`, `dist/`, `guide/guides/**`, and the paths `scaffold repair` restores. Acceptance, cheap first: the narrowing appears only in the H3 branch; the red reading of `npm run test:src:core` recorded before the edit and the same command green after; the residual-ordering test present and passing; no export, type, or version changed.

**D7N-2 — Boundary prose.** Role `implementer`, engine subjective engine. Depends on D7N-1. Owns `guide/guides/guide.md` (the `extractSurface` `Summary` cell and the extraction-model paragraph) and the `extractSurface` description if D7N-1 left it unconverged. Converges the cell with `npm run docs` rather than editing it. Acceptance: `npm run test:guides` green; the boundary sentence names entity heading and prose heading and promises nothing about parser behavior outside `## Surface`; `guide/guides/guide.md:269` unchanged.

**D7N-3 — Adversarial audit.** Roles `analyst` (native objective engine) and `reviewer` (subjective engine) on numbered falsifiable claims, plus `checker` (Grok ladder) for the mechanical criteria — owned sites only, no file touched outside the scope lists, guide parity rows aligned. At least one lane on an engine that did not write the units.

**D7N-4 — Gates.** Role `verifier`, engine builder engine. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test` in `guide`. Reports exit codes; fixes nothing.

Exit criterion: the embedded demonstration heading no longer suppresses a class row's summary, the code-only entity heading still admits, the boundary is stated in the doc block and the guide, the residual ordering limit is pinned by a test and named in prose, and the gates are green. Packing, version change, and publication sit outside it.

## Tensions

- **Textual equality over structural shape.** I chose flattened-text equality so emphasis and link wrappers stay entity headings. The objective lane may argue the structural rule is the tighter contract.
- **Inline predicate over an exported helper.** The brief freezes the API shape, so the check folds into `extractSurface` as trivial one-use logic. `AGENTS.md` § Design laws also directs exporting and testing reusable logic; read that way, the rule becomes an exported `isEntityHeading` with a guide row and a doc block, and the API shape moves. The Orchestrator rules.
- **Trailing punctuation is refused.** ``### `Widget`:`` contributes no symbol. I added no punctuation allowance, because an allowance is a second rule authors must learn.
- **The `## Methods` H4 keeps the wide rule.** `collectGroups` (`guide/src/core/helpers.ts:1590`) carries the same shape of defect: a prose H4 mentioning an interface claims the next table. I left it outside this bound as a successor brief.
- **`Guide.surface`'s doc block and `guide/guides/guide.md:269` stay as written.** They remain true under the narrowed definition; a reviewer may want the definition restated there.
- **Readings the dispatch did not supply.** Whether any committed fleet guide has a `## Surface` H3 with extra visible text, and whether such a guide documents a class only through one — D7N-0 exists to take it. Whether `npm run docs` rewrites `guide/guides/guide.md:110` from the doc block or only reports drift. What the `probe` vitest project at `guide/package.json:69` covers.

## Risks

- **A consumer guide documented a class only through a prose H3.** The narrowing drops that symbol and the consumer's bijection turns red at its next parity run. Evidence to settle: D7N-0's sweep with the heading text per hit.
- **`npm run docs` reformats the whole table.** The diff then reaches past the owned sentence and the audit cannot read scope honesty from it. Evidence: `git diff --stat` on `guide/guides/guide.md` after the docs run.
- **`flattenText` over a heading carrying a hard line break.** Its contribution to the flattened text is unverified, so a break inside an H3 could refuse an otherwise code-only heading. Evidence: a case in the regression, or the markdown package's own reading.
- **An image whose alternative text is a code span** (``### ![`Widget`](x.png)``) is admitted. It is consistent with `findFirstCode` and harmless, but nobody asked for it. Evidence: a case in the regression fixing the reading either way.
- **The residual ordering limit reads as the same defect** to a consumer who hits it with a genuine entity heading placed first. Evidence: the pinned test and the guide sentence naming the supported order.
