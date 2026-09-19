# Unit R-A — workflow results (Orchestrator, 2026-09-17)

Workflow `roughnotes-r-a` (`r-a-workflow.js`, run `wf_198e66a4-516`), phases Implement (`opus`),
Check (`checker`, Sonnet), Verify (`verifier`, Sonnet), over the roughnotes checkout from baseline
`85d1baa`. Duration 1706 s, three agents, none errored.

## Implement

`opus` returned "The report is written." — `tmp/units/r-a-report.md`, retained as
`r-a-report.md`.

## Check — `CHECK: PASS`

1. MET — report carries the Bootstrap measurement with command and before/after readings: `tmp/units/r-a-report.md:11-13` (`grep -n "aria-expanded|ariaExpanded|setAttribute" node_modules/bootstrap/js/dist/offcanvas.js` returns only the offcanvas's own `aria-modal`/`role` writes) and `tmp/units/r-a-report.md:19-21` (`before states [] attribute null | after states [] attribute null`).
2. MET — collision table with repairs at `tmp/units/r-a-report.md:48-61`; browser test `tests/app/browser/App.test.ts` case `'leaves no reachable control on any screen sharing a name with another'` walks a `ROUTES` array that covers every route named in the product guide's data-state table (`guides/README.md:346-359`).
3. MET — `app/browser/App.vue:157` carries `:aria-expanded="opened"` on the offcanvas trigger, with `opened` driven from `shown.bs.offcanvas`/`hidden.bs.offcanvas` listeners (`App.vue:58-64`, `App.vue:85-93`).
4. MET — the report's three guide-patch blocks quote the guide's own current text verbatim; the new copy in each patch resolves to existing `COPY` values (`app/browser/constants.ts:155` `menu: 'Menu'`, `:165` `started: 'Get started'`, `:166` `join: 'Join the community'`, `:205` `site: 'Site'`, `:220` `contact: 'Contact'`), so none is invented.
5. MET — `git status --short` lists only owned files; no vendored file, `vite.config.ts`, `configs/**`, `package.json`, `tests/setupBrowser.ts`, or `.orkestrel/**` entry.
6. MET — R-A-C1 through R-A-C4 each have a command with a red and a green reading; the added test names describe behaviour.
7. MET — no `TODO`, `.only`, `.skip`, or `it.todo` added.

## Verify — `GATES: RED npm run format:check` (the standing V1 condition alone)

| # | Command | Exit | Totals / closing line |
|---|---------|------|------------------------|
| 1 | `git status --short` / `git log --oneline -1` | 0 | 7 files modified; `85d1baa chore: adopt the scaffold 0.0.74 vendored floor and the journey axis` |
| 2 | `npm run format:check` | 1 | `Format issues found in above 1 files.` (`vite.config.ts`) |
| 3 | `npm run lint:check` | 0 | no diagnostics |
| 4 | `npm run check` | 0 | no diagnostics |
| 5 | `npm run test:app:browser` | 0 | `Test Files 38 passed (38)` / `Tests 162 passed (162)` |
| 6 | `npm run test:journey` | 0 | `Test Files 4 passed (4)` / `Tests 76 passed | 4 skipped (80)` |
| 7 | `npm run test:policy` | 0 | `Tests 109 passed | 1 skipped (110)` |
| 8 | `npm run test:config` | 0 | `Tests 171 passed | 3 skipped (174)` |
| 9 | `git status --short` | 0 | the same seven files; the gate run mutated nothing |

Anomalies: the dot reporter emits one aggregate totals line for the four `journey:<variant>`
projects; `format:check` fails on `vite.config.ts` alone, untouched by R-A (finding V1, S6 lands the
fix in scaffold 0.0.75).

## Orchestrator integration

The three guide patches the report returned for the shared `guides/README.md` were applied
verbatim by the Orchestrator before the checkpoint.
