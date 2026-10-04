Discovery follows each gate’s config, mode, and project filters, including space/equal flag forms and forwarded npm arguments. It lists each unit once, merges overlapping results, preserves browser-instance folding, and carries gate evidence across collected files. Project JSON includes non-default units. The opening comment and skill description match the implementation.

The requested scratch-fixture proofs ran against `54f757a7c` and the repaired script with the same command:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project skills tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts -t "wrapper config|second config|config mode"
```

Each row uses that command for both red and green evidence:

| Proof | Red | Green |
| --- | --- | --- |
| Wrapper config without `--project` | 1 failed | 1 passed |
| File collected only through another config | 1 failed | 1 passed |
| Mode changes collection | 1 failed | 1 passed |
| Ungated project in another config | 1 failed | 1 passed |

The red run exited 1 with 4 failed and 10 unselected tests. The green run exited 0 with 4 passed and 10 unselected tests. The control reports `ungated: ["orphan"]` and census exit 3 before and after; its full expectation turns green when the separately gated config is also collected. The complete discovery test file passed 14 tests.

Veneer’s census ran from `C:/Users/mikes/WebstormProjects/veneer` on 2026-10-03. The baseline command used an unchanged copy of the script from `54f757a7c`:

```text
node C:/Users/mikes/WebstormProjects/scaffold-wt-discovery/tmp/codex/discovery-baseline/harden/scripts/discovery.ts --json
node C:/Users/mikes/WebstormProjects/scaffold-wt-discovery/.agents/skills/orkestrel-harden/scripts/discovery.ts --json
```

The baseline exited 3. Its `ungated` output contained `app:vue (chromium)`, `src:bootstrap (chromium)`, `src:styles (chromium)`, `src:tailwindcss (chromium)`, and `src:vue (chromium)`. Its `undiscovered` output contained `tests/app/browser/integration.test.ts` and `tests/app/vue/integration.test.ts`.

The repaired census exited 0 and reported:

```json
{"ungated":[],"empty":[],"workbenches":["probe"],"undiscovered":[]}
```

Both journey files are collected. The wrapper projects have gates. The census preserves Vitest’s `[object Object] (chromium)` wrapper name and connects its collected files to the root project rows. For the complete outputs, see [baseline census](/C:/Users/mikes/WebstormProjects/scaffold-wt-discovery/tmp/codex/veneer-before.json) and [repaired census](/C:/Users/mikes/WebstormProjects/scaffold-wt-discovery/tmp/codex/veneer-final.json).

The required gates finished with these results:

| Command | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm run test:skills` | 0 | 69 passed |
| `npm run test:policy` | 0 | 120 passed |
| `npm run test:guides` | 0 | 45 passed |
| `git diff --check` | 0 | Passed |

Deviation: the initial policy run had 1 failed and 119 passed because `dist/src/core/index.d.ts` was absent. `npm run build:src:core` exited 0 and generated the required declaration; the policy rerun passed. No unrelated source changes were required.

Commit: `81ac20857de61da81e9c167141b18f55567ea448`. One commit; nothing pushed, published, or installed. Final `git status --porcelain`: empty.