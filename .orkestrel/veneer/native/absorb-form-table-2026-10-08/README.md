# Form and table surfaces for the native units, 2026-10-08

Two read-only readers (Opus distillers) and two refuters (Opus reviewers) read the installed `@orkestrel/form` 0.0.9 and `@orkestrel/table` 0.0.8 (`dist/src/core/index.d.ts`, `package.json`, the README, the guide mirrors `guides/form.md` and `guides/table.md`) for the unsaved-changes guard and the table column sort. The results are in `journal.json` (workflow `wf_8627d022-35a`, 4 agents). This file keeps the facts the briefs rest on.

## Both packages hold values and no DOM

- `createForm(schema, options?)` takes a `FormSchema`, never an element; `createTable(schema, options?)` takes a `TableSchema` and "renders nothing, reads no document, and names no host type". Neither package reads `input`, `th`, `tr`, `data value`, or `time datetime`, and neither writes `aria-sort`, so the DOM binding is the veneer module's work (the catalog's third question, binding location, resolves to veneer first).
- Veneer declares neither `@orkestrel/emitter` nor any import of it; both packages expose `EmitterInterface` through their own types, so a module subscribes through `form.emitter` and `table.emitter` and imports nothing from the emitter package.

## Form

- `dirty` is a derived getter on `Form` and `FormInterface` ("whether any answer has moved since the form opened"), measured against `baseline`, which is fixed when the form opens and never moves; no event named `dirty` or `change` exists. Values enter only through `fill(values)` or `fill(name, value)`; `clear()` restores the baseline and emits `clear` alone. The emitter carries `fill` and `clear` events, so a guard re-reads `dirty` after each.
- `status` is `editing`, `settled`, or `abandoned`; `submit()` settles the form and both end states are terminal (a write after them throws `SETTLED` or `ABANDONED`). A guard that outlives a submit rebuilds its document from the controls after the submit event, so the submitted values become the baseline.
- The refuter's one correction: `dirty` compares presence in both directions, resolved from the installed runtime.

## Table

- A sort is requested with `table.sort.set(order)` and dropped with `table.sort.remove(...)`, read with `sort.order(column)` and `sort.orders()`; no toggle or cycle verb exists, so the sorter owns the click cycle. The sorted result is `table.view` (filtered, sorted, paged, recomputed on each read); `rows.rows()` keeps store order.
- Row identity is `TableSchema.key`, a declared `text` or `choice` column with non-empty unique strings; the package refuses generated or positional keys. A `hidden` column can carry a synthetic key (for example a `tr` id) without a drawn heading.
- `text` comparison is UTF-16 code-unit order, not a collator; `number` cells must be finite numbers (`parseRows` coerces with `Number()` after a blank check and refuses the whole payload on a fault); datetimes are text and sort correctly only in one offset and precision; a `CellComparator` per column supplies locale, numeric, or offset-aware order, and a comparator returning `NaN` is a tie.
- Events fire after commit and have no veto, so a cancelable `sort.vn.sorter` is dispatched by the sorter before `sort.set`. Replacing the sorted column takes `remove()` then `set(...)`, two emissions when the column changes and one when only the direction flips; `sort.set` does not check `direction` at runtime, so a direction read from markup must be narrowed first. The sort is stable in both directions (descending negates the comparison, not the index tiebreak), and absent cells sort first ascending and last descending.
- `Table.destroy` destroys its emitter, so a sorter's teardown calls `destroy()` alone.
