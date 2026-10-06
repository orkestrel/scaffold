Implemented the rows. Format, lint, typecheck, and setup-browser passed. J4 passed all variants, but its queue runner exited `65` on a stale artifact; acceptance remains incomplete.

The owned-file diff is:

```diff
diff --git a/tests/setupBrowser.ts b/tests/setupBrowser.ts
index 547d858..b950cff 100644
--- a/tests/setupBrowser.ts
+++ b/tests/setupBrowser.ts
@@ -1223,6 +1223,22 @@ export const TAILWIND_READINGS: readonly TailwindReading[] = Object.freeze([
 		narrow: { bootstrap: 'center', unexcluded: 'center', tailwindcss: 'center' },
 		minimum: { bootstrap: 576, unexcluded: 576, tailwindcss: 640 },
 	}),
+	Object.freeze({
+		specimen: 'Container widths',
+		subject: '.container-sm',
+		property: 'max-width',
+		values: Object.freeze({ bootstrap: '1140px', unexcluded: '1140px', tailwindcss: '1280px' }),
+		narrow: Object.freeze({ bootstrap: 'none', unexcluded: 'none', tailwindcss: 'none' }),
+		minimum: Object.freeze({ bootstrap: 576, unexcluded: 576, tailwindcss: 640 }),
+	}),
+	Object.freeze({
+		specimen: 'Breakpoint scroll wrappers',
+		subject: '.table-responsive-sm',
+		property: 'overflow-x',
+		values: Object.freeze({ bootstrap: 'visible', unexcluded: 'visible', tailwindcss: 'visible' }),
+		narrow: Object.freeze({ bootstrap: 'auto', unexcluded: 'auto', tailwindcss: 'auto' }),
+		minimum: Object.freeze({ bootstrap: 576, unexcluded: 576, tailwindcss: 640 }),
+	}),
 ])
 
 /**
```

Final `git status --porcelain`:

```text
 M tests/setupBrowser.ts
```

Live readings came from `/home/user/veneer/tmp/units/journey-cost/runs/completion-b4-live`. Each listed theme was measured separately.

| Row / property | Face | Width | Theme | Value |
|---|---|---:|---|---|
| Container widths / max-width | bootstrap | 1280 | light, dark | 1140px |
| Container widths / max-width | unexcluded | 1280 | light, dark | 1140px |
| Container widths / max-width | tailwindcss | 1280 | light, dark | 1280px |
| Container widths / max-width | bootstrap | 390 | light, dark | none |
| Container widths / max-width | unexcluded | 390 | light, dark | none |
| Container widths / max-width | tailwindcss | 390 | light, dark | none |
| Breakpoint scroll wrappers / overflow-x | bootstrap | 1280 | light, dark | visible |
| Breakpoint scroll wrappers / overflow-x | unexcluded | 1280 | light, dark | visible |
| Breakpoint scroll wrappers / overflow-x | tailwindcss | 1280 | light, dark | visible |
| Breakpoint scroll wrappers / overflow-x | bootstrap | 390 | light, dark | auto |
| Breakpoint scroll wrappers / overflow-x | unexcluded | 390 | light, dark | auto |
| Breakpoint scroll wrappers / overflow-x | tailwindcss | 390 | light, dark | auto |

The rows follow `Mapped sm breakpoint`, with containers before tables. Both need `narrow`; neither needs `dark`. The type and existing proof remain unchanged.

Every run used this queue invocation, through `launch.js` with a 2400-second cap. `FOLDER` and `KIND` take the values recorded afterward.

```text
flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder FOLDER --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

All run folders are under `/home/user/veneer/tmp/units/journey-cost/runs/`. Wall times are their `end.json` measurements, excluding lock waits.

| Run folder | Kind | Wall time | Bare result |
|---|---|---:|---|
| completion-b4-live | command | 50.835 s | `Tests  4 passed \| 130 skipped (134)` |
| completion-b4-format | command | 0.205 s | `All matched files use the correct format.` |
| completion-b4-lint | command | 0.599 s | `exit=0 signal=none capped=false duration_ms=714` |
| completion-b4-check | command | 45.797 s | `exit=0 signal=none capped=false duration_ms=45930` |
| completion-b4-setup | command | 180.008 s | `Tests  134 passed (134)` |
| completion-b4-j4 | journey | 25.484 s | `Tests  4 passed \| 90 skipped (94)`; runner `"exit": 65` |

The commands, in execution order, were:

```text
# completion-b4-live
./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser setupBrowser.test -t 'reads every Tailwind reading the caption claims under the three faces'

# completion-b4-format
./node_modules/.bin/oxfmt --config .oxfmtrc.json --check /home/user/.wave/veneer-containment/tests/setupBrowser.ts

# completion-b4-lint
./node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings /home/user/.wave/veneer-containment/tests/setupBrowser.ts

# completion-b4-check
./node_modules/.bin/tsc --noEmit --project tsconfig.json

# completion-b4-setup
./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser setupBrowser.test

# completion-b4-j4 — CAPTURE=0 supplied to env
./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/completion-b4-j4/report.json -t 'J4 compares the three faces through the Stylesheets buttons'
```

Deviation:

- **Expected:** J4 gate exits successfully.
- **Found:** Vitest exited `0`, with J4 passing in `light-1280`, `dark-1280`, `light-390`, and `dark-390`. The runner exited `65`.
- **Evidence:** [J4 end.json](/home/user/veneer/tmp/units/journey-cost/runs/completion-b4-j4/end.json) reports `Error: Stale artifact: /home/user/.wave/veneer-containment/tmp/journey/dark-1280.txt`.
- **Done / not done:** Implementation and preceding gates completed. Stopped without rerunning or changing scope. Full journey and tree-wide gates remain with the Orchestrator.
- **Hypothesis:** The J4 filter excludes `places every registered state and writes the variant artifact`, which writes these files in [integration.test.ts](/home/user/.wave/veneer-containment/tests/app/browser/integration.test.ts:2118), while the journey runner still requires fresh artifacts.

No other deviations.