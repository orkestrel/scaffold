Implemented, but **acceptance remains blocked by required gate failures and unpredicted comparison changes**. No commits made.

[Complete diff](/home/user/.wave/veneer-copier/tmp/units/copier/copier.patch): 18 owned files, 594 additions, 3 removals. Includes the isolated Copier module, 13 module cases, showcase consumer, journey, and documentation. All 26 browser root files except `index.ts` remain byte-identical.

The plugin uses a capture-phase `command` route with `selector: '*'`; the router’s default host path targets the command host. It reads `event.command === '--copy'`, so no router changes or click fallback were needed.

The carried [141 probe](/home/user/veneer/tmp/units/journey-cost/runs/copier-probe-141/stdout.log) and [153 probe](/home/user/veneer/tmp/units/journey-cost/runs/copier-probe-153/stdout.log) both recorded:

- Native `--copy` command on the host, with the button as `source`.
- `writeText` resolved.
- Real Control+V pasted exactly `"Clipboard probe α\nsecond line"`.

The scratch probe is removed. Final module tests pass on both browsers.

The journey comparison returned **67**, with registration **98/0**. All four new copy entries pass. Every one of the **220 difference records** is classified in the [comparison classification](/home/user/.wave/veneer-copier/tmp/units/copier/classification.md), alongside the [raw comparison](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md).

| Classification | Records | Finding |
|---|---:|---|
| Expected preservation counts | 132 | Added component carrier/box and excluded-element counts |
| Expected signature coverage | 2 | Button and output signatures added |
| Mixed preservation counts/signatures | 24 | Additional aggregate signature counters also increase |
| Mixed tooltip preservation | 12 | Unexpected placement attribution `1 → 0` at dark/1280 and light/390 |
| Additional partition population | 24 | Elements `7999 → 8001`; signatures `1634 → 1636` |
| Additional partition clauses | 12 | Clauses 1 and 3 gain two; violations remain empty |
| Missing engine equality | 9 | Three missing readings and their stdout/journal copies |
| Ordered-row differences | 3 | Changed payloads/missing readings; surviving row order unchanged |
| Non-exempt failures | 2 | Engine-matrix timeouts; host-bound exception list is empty |

Face-census undeclared-name readings are unchanged. **All 1,032 statechart rows retain their names, order, motion mode, and variant.**

All queued commands used the prescribed runner, lock, working directory, and npm11 PATH. Folders below are under `/home/user/veneer/tmp/units/journey-cost/runs/`. The [complete 39-run ledger](/home/user/.wave/veneer-copier/tmp/units/copier/gates.md) gives every command, folder, exit, result, and bare log—including earlier failures, repair runs, probes, and the mutation control.

| Command | Folder | Exit | Result |
|---|---|---:|---|
| `npm run build` | `copier-build-final` | 0 | Built |
| `npm run format:check` | `copier-format-2` | 0 | 369 files formatted correctly |
| `npm run lint:check` | `copier-lint-final` | 0 | Passed |
| `npm run check` | `copier-check-final` | 0 | Passed |
| `npm run test:src:browser` — Chromium 141 | `copier-src-141` | 0 | 801 passed |
| `npm run test:src:browser` — specified Chromium 153 override | `copier-src-153` | 0 | 801 passed |
| `npm run test:setup:browser` | `copier-setup-browser` | 1 | 204 passed, 1 failed |
| `npm run test:app:browser` | `copier-app-browser` | 1 | 235 passed, 10 failed |
| `npm run test:integration` | `copier-integration` | 0 | 60 passed |
| `npm run test:guides` | `copier-guides` | 0 | 20 passed; 251 citations resolved |
| `npm run test:policy` | `copier-policy` | 0 | 119 passed, 1 skipped |
| `npm run test:config` | `copier-config` | 0 | 227 passed, 1 skipped |
| `npm run test:setup` | `copier-setup` | 1 | 185 passed, 1 failed |
| `npm run test:conformance` | `copier-conformance` | 0 | 130 passed |
| Full journey¹ | `copier-journey-2` | 1 | 96 passed, 2 failed |
| Prescribed comparison² | `copier-compare` | 67 | 220 differences |
| `npm run build:showcase` | `copier-showcase-1` | 0 | Built |
| `npm run build:showcase` | `copier-showcase-2` | 0 | Identical hash |

¹ `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/copier-journey-2/report.json`

² The supplied `compare.ts` command used baseline `landing-11f01e9-l1-journey`, candidate `copier-journey-2`, unchanged `host-bound.json` and `redesign-moves.json`, `--registration 98/0`, and output [compare.md](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md).

Both showcase builds produced SHA-256:

```text
61946c6c347921c4d469f2d32542a07cebe97059e0e8513517cd8b848e2c06ca
```

The [generated showcase](/home/user/.wave/veneer-copier/tmp/units/copier/browser.html) is saved separately; tracked `showcase/browser.html` was restored.

The [deviation register](/home/user/.wave/veneer-copier/tmp/units/copier/deviations.md) records expected/found evidence, disposition, and hypotheses for every deviation. Material unresolved findings are:

- Setup-browser header traversal exceeded **69 seconds**.
- App header contrast exceeded **15 seconds**, followed by nine duplicate-control/remaining-state failures. Interrupted cleanup is a hypothesis.
- Setup’s Tailwind canonicalization case exceeded **5 seconds**.
- Both wide journey engine-matrix cases exceeded **120 seconds**. Three equality readings are consequently absent.
- Tooltip attribution and additional aggregate/partition counts exceed the literal prediction.
- Final journey elapsed **1,097.946 seconds**, versus baseline **467.259 seconds**; performance equivalence is unproven.

Fixed deviations include the test listener type, assertion lint, the new journey’s timeout budget, and the misplaced scroll hint. All four J3 cases now pass. Withholding the copy click correctly failed the success assertion; the original file was restored. Discovery passed with no findings across 38 files and 1,046 cases.

Direct checks all exited **0**: `git diff --check`, `git status --porcelain`, and root-browser diff stat. The latter lists only `src/browser/index.ts`, one insertion.

```text
 M ROADMAP.md
 M app/browser/Showcase.ts
 M app/browser/main.ts
 M app/browser/sections/tailwindcss.html
 M guides/veneer.md
 M src/browser/index.ts
 M tests/app/browser/integration.test.ts
 M tests/src/browser/index.test.ts
?? src/browser/copiers/
?? tests/src/browser/copiers/
```