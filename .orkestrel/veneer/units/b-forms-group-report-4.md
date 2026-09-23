# Unit B-FORMS-GROUP, round 4 — report

Executed `tmp/units/b-forms-group-brief-4.md`. Four sentence replacements applied exactly as
specified; the earlier rounds' writes are unchanged and remain uncommitted in the tree.

## This round's hunks

### `tests/app/browser/integration.test.ts`

```diff
-		// At rest the button sits one step above the control on the group's stacking levels, and it
-		// pulls its own leading border back over the control's trailing border, so the button covers
-		// that shared edge until the control is lifted past it.
+		// At rest the button sits one step above the control on the group's stacking levels, and it
+		// pulls its own leading border back over the control's trailing border, so the button and
+		// it pulls back by one border width over the control's trailing border, so the button's
+		// leading border paints over the outer column of that border until the control is lifted
+		// past it.
```

### `tests/app/browser/sections/InputGroupSection.test.ts`

```diff
-			// Every control announces a name of its own: the journey reaches the plain group's control
-			// by name through keyboard traversal, which a shared name would resolve to another control.
+			// Every control announces a name of its own: the journey reaches the control beside the
+			// grouped button by name through keyboard traversal, which a shared name would resolve to
+			// another control.
```

### `guides/veneer.md` (around line 810)

```diff
-text control, the select, or the floating label on its own, so a grouped control carries the element
-layer's chrome and the group's rules alone.
+text control, the select, or the floating label on its own, so a grouped control keeps the
+browser's own border and focus outline, which the element layer leaves in place, and the group's
+rules; where that border is wider than `--bs-border-width`, the pull-back covers only its outer
+column.
```

### `guides/veneer.md` (around line 793)

```diff
-Every child after the first pulls back by `--bs-border-width`, so two neighbours paint one line, and
-the group squares each corner a neighbour touches while the group's outer corners keep the child's
+Every child after the first pulls back by `--bs-border-width`, so two neighbours paint one line,
+where each neighbour's border is one `--bs-border-width` wide; a control whose border the browser
+still draws paints two columns at its seam until the `form-control` key ships its border, and
+the group squares each corner a neighbour touches while the group's outer corners keep the child's
```

## Restated ROADMAP patch

```diff
- B-FORMS-GROUP ... [round-1/round-2 rows unchanged, no audit clause added at this layer;
  the Orchestrator writes the B-FORMS row's audit clause at the landing]
+ B-FORMS-CONTROL recaptures the input-group frames and confirms the one-line seam once
  `.form-control` ships its border, and rewrites the two seam sentences of
  `### Input group classes` to the one-line reading.
```

## Grep verification (acceptance criterion 1)

```
--- source phrase 1 (empty) ---
grep -n "covers that shared edge until the control is lifted past it" tests/app/browser/integration.test.ts
(no output)

--- replacement fragment 1 (one line) ---
grep -n "paints over the outer column of that border until the control is lifted" tests/app/browser/integration.test.ts
1168:		// leading border paints over the outer column of that border until the control is lifted

--- source phrase 2 (empty) ---
grep -n "journey reaches the plain group's control" tests/app/browser/sections/InputGroupSection.test.ts
(no output)

--- replacement fragment 2 (one line) ---
grep -n "the journey reaches the control beside the" tests/app/browser/sections/InputGroupSection.test.ts
45:			// Every control announces a name of its own: the journey reaches the control beside the

--- source phrase 3 (empty) ---
grep -n "a grouped control carries the element layer's chrome and the group's rules alone" guides/veneer.md
(no output)

--- replacement fragment 3 (one line) ---
grep -n "browser's own border and focus outline" guides/veneer.md
813:browser's own border and focus outline, which the element layer leaves in place, and the group's

--- source phrase 4 (empty for the original tail) ---
grep -n "so two neighbours paint one line, and$" guides/veneer.md
(no output)

--- replacement fragment 4 (one line) ---
grep -n "until the \`form-control\` key ships its border" guides/veneer.md
795:still draws paints two columns at its seam until the `form-control` key ships its border, and
```

## Gate exits

- `npx oxfmt --check guides/veneer.md tests/app/browser/integration.test.ts tests/app/browser/sections/InputGroupSection.test.ts` — exit 0 ("All matched files use the correct format.")
- `npm run check` — exit 0.
- `npm run test:guides` — exit 0 (1 test file, 18 tests passed).
- `npm run test:app` — exit 0 (23 test files, 55 tests passed).
