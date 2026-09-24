# Unit J-SANITIZER, round 4 — the document-level read, and the comparisons the re-audit found unpinned

Successor to `j-sanitizer-brief-3.md`, in force for everything this file does not change. The round-3 re-audit (the objective lane on Astra, thread `01a0d54a-2588-7210-adbd-7a6116e3bb84`, `j-sanitizer-audit-3-objective-verdict.md`) confirmed claims 1, 2, and 4 to 9, and established no script-execution bypass. It left claim 3 unresolved on one availability gap and four unpinned comparisons. The checker and the Orchestrator's instrument replay confirmed the rest.

## Role and engine

`opus` on Opus 5.5, the same writer, resumed, in the same worktree. Perform the assignment directly and spawn nothing.

## Obligations (red first where the behaviour is new)

- **D1 The document-level read.** `ConfigSanitizer.ts` around line 119 reads `document.implementation` as a property. A connected element whose `name` is `implementation` (an `img`, `embed`, `object`, or `form`) shadows it through the document's named properties, and `{}` keeps such an element. Read it through `Document.prototype`'s accessor, and do the same for any other member the walk reads on a `Document`. Red first: a case that connects a kept `<img name="implementation">` to this document, then writes through the walk, and asserts the write succeeds and sanitizes.
- **D2 The unpinned comparisons.** Add matrix cases through both routes, each with the native literal and a `walked` literal wherever the floor removes more:
  - a `template` inside `svg` and inside `math`, with a handler attribute in its content;
  - an attribute in an unknown namespace whose local name is `href`, carrying a `javascript:` URL, if the HTML parser can produce one; if it cannot, record why and add no case;
  - a `style` element and a `style` attribute under `{}` and under the allowlist;
  - a `meta` element with `http-equiv="refresh"` under `{}`.
  Record the Chromium 153 native reading for each.
- **D3 The instrument.** Add a row that reverts D1 to the property read and reddens its case. Run the whole instrument once after the acceptance chain, never beside it, with the control row still `HELD`.

## Output

The new cases with their red and green readings, the Chromium 153 native readings for D2, the instrument's new row copied from the log, the acceptance output, the updated `tests/setupBrowser.ts` patch named, `git status --short`, and the deviation state.
