Objective lane held.

### Proposed invariant

Within `## Surface`, admit an H3 as a class entity only when its trimmed compared inline text equals its candidate code token exactly:

```ts
const rawName = findFirstCode(block.children)
const text = extractCellText(block.children).trim()

if (rawName === undefined || text !== `\`${rawName}\``) continue
const name = normalizeIdentifier(rawName)
```

Apply this condition only in the H3 branch of `extractSurface`. Keep table-row extraction unchanged.

| Heading form | Result |
| --- | --- |
| ``### `Widget` `` | Admit `class Widget`. |
| ``### `Widget<T>` `` | Admit `class Widget` after `normalizeIdentifier`. |
| An H3 padded around its code token | Admit after trimming outer inline whitespace. |
| ``### **`Widget`** `` | Admit because `extractCellText` removes emphasis while retaining the code token. |
| ``### [`Widget`](target) `` | Admit because `extractCellText` removes the link wrapper while retaining the code token. |
| ``### Bind a `Widget` to a transport `` | Reject because compared text contains visible words beside the token. |
| ``### `Widget` and `Alias` `` | Reject because compared text contains an additional token. |

This rule reuses the parsed Markdown abstract syntax tree. It adds no parser, public helper, type, export, or dependency.

### G1 — supported

The current branch admits any H3 containing a code span because it calls `findFirstCode` and never inspects the remaining inline content ([helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:1525)). `findFirstCode` deliberately descends emphasis, link, and image children ([helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:919)). `extractCellText` already preserves code-token boundaries while flattening those wrappers ([helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:984)). Comparing its trimmed output with the candidate token distinguishes an entity heading from prose that mentions an entity.

The installed Markdown contract supplies `HeadingNode.children: readonly InlineNode[]` ([index.d.ts](C:/Users/mikes/WebstormProjects/guide/node_modules/@orkestrel/markdown/dist/src/core/index.d.ts:496)), `CodeSpanNode.value` ([index.d.ts](C:/Users/mikes/WebstormProjects/guide/node_modules/@orkestrel/markdown/dist/src/core/index.d.ts:92)), and the inline discriminated union ([index.d.ts](C:/Users/mikes/WebstormProjects/guide/node_modules/@orkestrel/markdown/dist/src/core/index.d.ts:562)). No heading-specific parser or guard is needed.

Table admission remains `extractRowSymbol`: column-zero `findFirstCode`, `normalizeIdentifier`, `Kind`, and `Summary` ([helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:1421)).

### G2 — supported with an explicit first-seen boundary

Keep the existing document-order loop and `seen` set unchanged ([helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:1508)). The key remains `` `${keyword} ${name}` `` ([helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:694)).

The resulting behavior is:

- A prose demonstration H3 is rejected, so the later class row enters with the `Summary` value read by `extractRowSummary` ([helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:1482)).
- A genuine code-only H3 before a matching class row remains authoritative. The later row stays skipped. Do not merge its summary backward.
- A class row before a matching code-only H3 remains authoritative and retains its summary.
- A same-name symbol with another keyword remains distinct because the key includes the keyword.
- Section scope remains `selectSectionBlocks(document, SURFACE)`; the guide states that window at [guide.md](C:/Users/mikes/WebstormProjects/guide/guides/guide.md:317).
- `Guide` still computes `extractSurface` during construction and returns the cached result ([Guide.ts](C:/Users/mikes/WebstormProjects/guide/src/core/Guide.ts:42), [Guide.ts](C:/Users/mikes/WebstormProjects/guide/src/core/Guide.ts:66)).

The over-correction boundary is firm: do not reorder sources, prefer tables globally, enrich an earlier heading from a later row, change keyword-sensitive deduplication, alter `findFirstCode`, or tighten table-row admission.

### G3 — permanent proof design

Use a shared fixture from `tests/setup.ts` so the direct extractor test and cached `Guide` test exercise the same document.

Positive controls:

- A plain code-only H3 still contributes `class Widget`.
- Generic, padded, emphasized, and linked code-only forms contribute their normalized class names.
- A table row before a matching entity H3 retains its summary.
- An entity H3 before a matching table row retains the established heading-first result.
- A same-name row under another keyword remains present.

Negative controls:

- The embedded demonstration H3 does not contribute a symbol.
- An H3 carrying additional visible code does not contribute a symbol.
- A code-only H3 outside `## Surface` does not contribute a symbol.
- The later class row in the defect fixture contributes `{ name: 'Widget', keyword: 'class', summary: 'Represents a widget.' }`.

Add the direct proof to [helpers.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/core/helpers.test.ts:1045). Add the cached projection proof to [Guide.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/core/Guide.test.ts:50). The retained instrument already demonstrates the old installed behavior: the neutral heading keeps the summary, while the embedded heading drops it ([guide-heading-probe.mjs](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/windows/guide-heading-probe.mjs:25), [d7n-guide-heading.log.txt](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-guide-heading.log.txt:1)). That record proves the symptom, not a package-test red/green receipt.

Use this narrow command before and after the implementation:

```text
npm run test:src:core -- tests/src/core/helpers.test.ts tests/src/core/Guide.test.ts
```

The root harness exposes the probe MCP route, but its registered workspace has not been verified against the guide checkout. Existing probe-case coverage is unknown. No receipt has been obtained. A suitable proof case names project `src:core`, the direct and cached regression tests, and a control that restores broad “first code span wins” admission; that control must fail at the test stage.

### G4 — owned sites

The implementation unit owns:

- [src/core/helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:1490): add the H3 admission comparison and update `extractSurface` TSDoc.
- [src/core/helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:970): widen `extractCellText` TSDoc from table-cell wording to compared inline content because the H3 rule reuses it.
- [src/core/types.ts](C:/Users/mikes/WebstormProjects/guide/src/core/types.ts:192): state the exact `GuideInterface.surface` entity-heading boundary.
- [tests/setup.ts](C:/Users/mikes/WebstormProjects/guide/tests/setup.ts): hold the shared regression fixture.
- [tests/src/core/helpers.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/core/helpers.test.ts:1045): prove admission, rejection, ordering, scope, and keyword behavior.
- [tests/src/core/Guide.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/core/Guide.test.ts:50): prove the corrected cached surface.
- [guides/guide.md](C:/Users/mikes/WebstormProjects/guide/guides/guide.md:110): align the `extractSurface` summary.
- [guides/guide.md](C:/Users/mikes/WebstormProjects/guide/guides/guide.md:127): align the `extractCellText` summary.
- [guides/guide.md](C:/Users/mikes/WebstormProjects/guide/guides/guide.md:269): align the `surface` method summary.
- [guides/guide.md](C:/Users/mikes/WebstormProjects/guide/guides/guide.md:315): state the extraction boundary and first-seen behavior.
- [guides/guide.md](C:/Users/mikes/WebstormProjects/guide/guides/guide.md:539): retain the genuine heading-only documentation form.

Reuse `findFirstCode`, `extractCellText`, `normalizeIdentifier`, and the installed Markdown node guards. `@orkestrel/contract` has no matching role in this domain admission rule. Leave `Guide.ts`, public signatures, barrels, manifests, lockfiles, versions, and dependencies untouched.

### Unresolved choices

Image-alt content can contain a nested code span, and `extractCellText` treats image content transparently. The retained evidence does not establish whether an image-wrapped code token is a supported entity-heading form. Keep that behavior outside the documented promise and do not add an image-specific rejection in this correction.

The parser reachability of an empty or whitespace-only code span is unmeasured. Do not add identifier validation under this defect; that would widen the correction beyond entity-heading admission.
