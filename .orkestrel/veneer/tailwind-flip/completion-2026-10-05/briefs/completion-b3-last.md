B3 stopped at the brief’s shared-symbol boundary. Checkout remains clean at `ec37454`; no files changed.

Expected: nested declarations receive consistent attribution through direct, uncached preservation, and indexed preservation calls.

Found: [`collectPreservationIndex`](/home/user/.wave/veneer-containment/tests/setupBrowser.ts:2230) discards `CSSNestedDeclarations`. The collector uses that index directly at [line 2330](/home/user/.wave/veneer-containment/tests/setupBrowser.ts:2330), so fixing its owned fallback alone cannot repair the journey’s indexed path.

Exact required shared patch, **not applied**:

```diff
--- a/tests/setupBrowser.ts
+++ b/tests/setupBrowser.ts
@@
 				scanSheetRules(sheet).flatMap((entry) =>
-					entry.rule instanceof CSSStyleRule ? [{ entry, selector: entry.rule.selectorText }] : [],
+					(entry.rule instanceof CSSStyleRule || entry.rule instanceof CSSNestedDeclarations) &&
+					entry.selector !== undefined
+						? [{ entry, selector: entry.selector }]
+						: [],
 				),
```

The owned collector’s fallback also needs to accept both rule classes and match `SheetEntry.selector`. Neither change nor its runtime proof was performed after identifying the required shared edit.

| Requested evidence | Result |
|---|---|
| Per-condition matrix before/after split | Not run; no measured counts |
| Mapped copy check versus probe-4’s 1,960 | Not run |
| Derived rows | None produced |
| Acceptance commands and queue folders | None run or created |
| Journey seconds before/after | Not measured |
| `git status --porcelain` | Empty |

Deviation: the brief requires stopping when an unowned symbol must change. Source inspection established that dependency before implementation. Hypothesis: preserving B2’s nested entries in both preservation filters will restore attribution consistency; browser proof remains outstanding.