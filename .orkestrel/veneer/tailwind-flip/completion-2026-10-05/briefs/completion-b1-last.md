Unit completion-b1 is incomplete. The collapse cause is proven, the scoped repairs are implemented, and static gates plus all 177 setup browser tests pass. The tooltip repair requires a caller change outside the brief’s named ownership.

[Report](/home/user/veneer/tmp/units/completion-b1/report.md) · [Partial candidate patch](/home/user/veneer/tmp/units/completion-b1/candidate.patch) · [Collapse trace](/home/user/veneer/tmp/units/completion-b1/completion-b1-trace-full-2-trace.jsonl)

**Deviation.**

- **Expected:** filtering lifecycle events to `roots` excludes `Hint to the right` while observing `Hint to the left`.
- **Found:** `observeShowcaseRefusal` selects the whole “Live tooltips” figure. Both controls belong to that root, so the sibling passes the filter. Its ARIA mutations also remain observed.
- **Evidence:** [root selection](/home/user/.wave/veneer-containment/tests/setupBrowser.ts:3506) and [shared tooltip figure](/home/user/.wave/veneer-containment/app/browser/sections/tooltips.html:3).
- **Disposition:** stopped before changing `observeShowcaseRefusal`, which the brief does not name as owned. The scaffold operation contract requires stopping when a conflict “requires an unowned change.”
- **Hypothesis:** selecting the tooltip trigger and its associated tip as refusal roots will exclude sibling activity while retaining specimen checks. This change remains unimplemented and unvalidated.

**Collapse finding.**

`completion-b1-trace-full-2` captured the failing dark-390 row `Expand details hidden through {Enter}{Enter}`:

| Event | Elapsed |
|---|---:|
| `show.bs.collapse` | 22.7 ms |
| First click capture reads `collapsing` | 24.5 ms |
| `shown.bs.collapse` | 37.8 ms |
| `hide.bs.collapse` | 54.3 ms |
| Second click capture reads `collapsing` | 54.9 ms |
| `hidden.bs.collapse` | 70.2 ms |

Both transitions completed, but both availability samples were false. The observer expected only show/shown and timed out after 5008.8 ms. This confirms the same undercount as accordion. The trace and finding were saved before repair edits. Temporary instrumentation is preserved in `instrumentation.patch` and removed from the candidate.

**Repairs implemented.**

- `actOnDisclosureControl` counts accepted activations from the panel’s show/hide lifecycle starts. Both-click delivery, ordered lifecycle assertions, and wait budgets remain intact. Its proof includes refused clicks during a transition and unrelated panel events.
- `observeShowcaseStability` filters event targets to supplied roots. Its proof accepts outside-root sibling events and rejects delayed root and descendant events. This filter does not resolve the caller-population defect above.
- J8 waits for the named `Uploads` status to have `show` without `showing`, then retains its paint wait and exact text assertion. The engine removes `showing` immediately before `shown.bs.toast`; the persistent condition also handles completion before the click promise returns. No wait budget increased.

Tooltip traces show unchanged pointer coordinates `(229, 483)` while scrolling changes mouseover targets. The exact delayed sibling event during the left control’s refusal did not recur, so that original crossing remains unestablished. No pointer behavior changed.

**Queued commands.**

All folders below are under `/home/user/veneer/tmp/units/journey-cost/runs`. Every command used the prescribed `flock -w 1800` queue, runner, checkout, and npm 11 PATH. Exact expanded arguments are in each folder’s `start.json`; exits and times are in `end.json`.

`J` denotes:

```text
env CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=FOLDER/report.json
```

| Folder | Kind | Command | Exit | Wall time |
|---|---|---|---:|---:|
| `completion-b1-build` | command | `npm run build` | 0 | 22.784 s |
| `completion-b1-trace-dark-1` | command | `J --project 'journey:dark-390*' -t 'tooltip\|collapse'` | 0 | 136.629 s |
| `completion-b1-trace-full-1` | journey | `J` | 1 | 538.493 s |
| `completion-b1-trace-full-2` | journey | `J` | 1 | 576.405 s |
| `completion-b1-format-owned` | command | `oxfmt --config .oxfmtrc.json --write tests/setupBrowser.ts tests/setupBrowser.test.ts tests/app/browser/integration.test.ts` | 0 | 0.281 s |
| `completion-b1-format-check` | command | `npm run format:check` | 0 | 4.355 s |
| `completion-b1-lint-check` | command | `npm run lint:check` | 0 | 1.565 s |
| `completion-b1-check` | command | `npm run check` | 0 | 60.439 s |
| `completion-b1-setup-focused` | command | `npm run test:setup:browser -- --configLoader runner -t 'settles accepted disclosure bursts\|filters delayed sibling' --reporter=json --outputFile=FOLDER/report.json` | 0 | 13.479 s |
| `completion-b1-setup-browser` | command | `npm run test:setup:browser -- --configLoader runner --reporter=json --outputFile=FOLDER/report.json` | 0 | 186.630 s |

The focused trace passed 5 tests; its filter excluded 19. Focused setup proofs passed 2; their filter excluded 175. Full setup passed 177 with none skipped. No skip declaration was added. No import-reload rerun was needed.

**Journey results.**

Both pre-repair full trace runs registered 94 tests and skipped none:

- `completion-b1-trace-full-1`: **93 passed, 1 failed** — `showcase statecharts drives the 'accordion' table through its controls with motion=false`.
- `completion-b1-trace-full-2`: **90 passed, 4 failed**:
  - `showcase journeys J8 drives the engine through the component sections and opens nothing on arrival`
  - `showcase statecharts drives the 'accordion' table through its controls with motion=false`
  - `showcase statecharts drives the 'collapse' table through its controls with motion=false`
  - `showcase statecharts drives the 'navbar-390' table through its controls with motion=false`

Every observed failed title belongs to the supplied host-bound set.

The post-repair focused journeys and `completion-b1-journey-1` / `completion-b1-journey-2` were **not run**. Their results are unmeasured. The applicable comparison baselines are J-B1 `jb1-1` and `jb1-2` on `96065a7`.

**Shared-file patch.**

Empty for both `lanes.md` and `host-bound.md`: retain their journey bullets. No passing post-repair pair supports removing titles, and the tooltip defect remains unresolved. Neither shared file was edited.

Only the owned test files changed. Containment additions and production files remain untouched. No commit, install, or delegation occurred.

`git status --porcelain`:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```