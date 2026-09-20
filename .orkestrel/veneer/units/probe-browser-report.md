Both commands exited with code **0**. Each produced fewer than 40 lines; their complete outputs are quoted below.

`src:browser` — exit code **0**:

```text
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:browser .

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer

 ✓ |src:browser (chromium)| tests/src/browser/index.test.ts:5:2 > src browser entry > has no starter exports 1ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  02:36:57
   Duration  4.48s (transform 0ms, setup 10ms, import 10ms, tests 3ms, environment 0ms)

```

`src:core` — exit code **0**:

```text
npm notice run @orkestrel/veneer@0.0.1 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core .

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/veneer

 ✓ |src:core| tests/src/core/index.test.ts > src core entry > has no starter exports 2ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  02:37:08
   Duration  203ms (transform 21ms, setup 21ms, import 32ms, tests 3ms, environment 0ms)

```