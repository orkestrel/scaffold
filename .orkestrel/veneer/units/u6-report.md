U6 is blocked by the brief's write scope. The required guide examples need entries in `ROUTED_FENCES` at `tests/setup.ts:71`, but the brief explicitly makes `tests/setup*.ts` off-limits. No off-limits file was edited. Nothing was published, installed, or committed, and no agent was spawned.

The changed files are:

- `src/browser/types.ts`: adds `MediaOptions`.
- `src/browser/constants.ts`: adds `POINTER_HOLD`.
- `src/browser/helpers.ts`: adds the protocol, hover, hold/release, and media stage/release helpers; extends the style readers with `pseudo`.
- `tests/src/browser/helpers.test.ts`: adds browser cases, teardown hooks, controls, and Patterns transcriptions.
- `guides/test.md`: adds Surface, Voices, Limits, Bounds, and Patterns documentation.
- `tmp/codex/u6-report.md`: this report.

The existing browser barrel exports these declarations without an edit. `tests/src/browser/index.test.ts` does not exist. `package.json` and `README.md` are unchanged.

The fleet name check searched `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/scaffold/dist/host/guides` for `hoverAccessible|holdAccessible|releasePointer|stageMedia|releaseMedia|sendProtocol|MediaOptions|POINTER_HOLD`. It returned no occurrence, so no Surface row in that population claims a proposed name. The installed Vitest declarations expose `cdp(): CDPSession` with an empty session interface; the implementation crosses that boundary through the existing `readProperty` and `invokeUnchecked` helpers.

The controls produced these readings on managed Chromium:

| Control | Red reading | Green reading | Evidence |
| --- | --- | --- | --- |
| PLANT-SCALE | The suite's unscaled protocol press failed the pressed-paint assertion: `expected 16 to be 32`. | The unscaled point reads `16`; the mapped hold reads `32`. | `tmp/codex/u6-plant-scale-red.log`; `tmp/codex/u6-browser-green.log` |
| PLANT-PSEUDO | Removing the pseudo argument from the CSSOM call failed the comparison: `expected '0px' to be '7px'`. | The pseudo reads `'7px'` and `7`; the element reads `'0px'`. | `tmp/codex/u6-plant-pseudo-red.log`; `tmp/codex/u6-browser-green.log` |
| PLANT-RELEASE | Omitting the explicit pointer release failed the cleanup assertion: `expected 32 to be 16`. | Held paint reads `32`, released paint reads `16`, and the marker disappears. | `tmp/codex/u6-plant-release-red.log`; `tmp/codex/u6-browser-green.log` |

Each red command exited `1` and ended with `Test Files  1 failed (1)` and `Tests  1 failed | 287 skipped (288)`. The commands were:

```text
npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t 'PLANT-SCALE'
npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t 'PLANT-PSEUDO'
npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t 'holds the pressed paint and restores it on release'
```

All plants are removed. The green readings came from the focused run before planting; a post-removal green rerun was not performed before the scope stop. Red-then-green acceptance is therefore unfinished.

The focused run also passed hover/twin/release, absent and gated targets, tab disambiguation, covered-press cleanup, double hold, idle release, the `390 × 844` viewport, `::backdrop`, `::details-content`, pseudo refusals, and empty-media refusal. Expected-failure sentinel cases exercised real `afterEach` cleanup; following cases observed released pointer state and restored media. Explicit pointer release followed by its hook produced no additional pointer-up event. Repeated media reset preserved defaults. Omitting media reset was not separately planted.

The unknowns have these readings:

| Question | Reading |
| --- | --- |
| Does protocol press focus the button? | `document.activeElement === button` read `true` on `HeadlessChrome/153.0.8010.12`. Edge was not run, as assigned to the Orchestrator. |
| What device scale reached the tester? | `window.devicePixelRatio` read `1`. A non-default factor remains unmeasured. |
| What iframe geometry reached the hold? | Tester width `414`; painted frame width `156.8800048828125`, left `275.23187255859375`, top `110`. The hold recomputed its scale from those readings. |
| What media state returned after release? | `{"reduced":false,"print":false,"padding":1}`. |

Verification commands have the following results. Logs are under `tmp/codex/`.

| Command | Exit | Final lines or status |
| --- | --- | --- |
| `npm.cmd run check:src:browser` | `0` | `npm notice run @orkestrel/test@0.0.18 check:src:browser`; `npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json` |
| `npx.cmd oxfmt --config .oxfmtrc.json --write src/browser/types.ts src/browser/constants.ts src/browser/helpers.ts tests/src/browser/helpers.test.ts guides/test.md` | `0` | `Finished in 941ms on 5 files using 16 threads.` |
| `npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts src/browser/constants.ts src/browser/helpers.ts tests/src/browser/helpers.test.ts` | `1` | `tests/src/browser/helpers.test.ts:1082:2: error vitest(expect-expect): Test has no assertions help: Add assertion(s) in this Test`; the same diagnostic at `3392:2`. Assertions were added to the sentinel cases; lint was not rerun before stopping. |
| `npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t 'hoverAccessible\|holdAccessible\|releasePointer\|pointer teardown\|readStyle\|stageMedia\|media teardown'` | `0` after the media fix | `Test Files  1 passed (1)`; `Tests  26 passed \| 2 expected fail \| 260 skipped (288)`; `Duration  3.87s (transform 0ms, setup 125ms, import 104ms, tests 2.66s, environment 0ms)`. Log: `u6-browser-green.log`. |
| `npm.cmd run format:check` | — | Not run before the scope stop. |
| `npm.cmd run lint:check` | — | Not run before the scope stop. |
| `npm.cmd run check` | — | Not run before the scope stop. |
| `npm.cmd run build` | — | Not run; existing `dist/` does not contain these additions. |
| `npm.cmd run test:src` | — | Not run before the scope stop. |
| `npm.cmd run test:app` | — | No such script is declared. |
| `npm.cmd run test:policy` | — | Not run before the scope stop. |
| `npm.cmd run test:config` | — | Not run before the scope stop. |
| `npm.cmd run test:setup` | — | Declared in the `test` chain; not run before the scope stop. |
| `npm.cmd run test:guides` | `1` | `Test Files  1 failed (1)`; `Tests  1 failed \| 49 passed \| 1 skipped (51)`; `Duration  1.25s (transform 110ms, setup 42ms, import 654ms, tests 394ms, environment 0ms)`. Log: `u6-guides-development.log`. |
| `git diff --check` | `0` | No diagnostics. |

The focused browser command initially reported `Tests  2 failed | 24 passed | 2 expected fail | 260 skipped (288)`. Each failure was `expected false to be true` when checking that print staging preserved reduced motion. The same command passed after the implementation preserved omitted axes from their effective readings. See `u6-browser-initial.log` and `u6-browser-green.log`.

The exact added refusal templates in the implementation are:

- `Browser provider exposes no DevTools session`
- `Pointer is already held at <x>x<y>`
- `Interactive target "<name>" did not enter the pressed state`
- `Pseudo-element "<pseudo>" must start with "::"`
- `Pseudo-element "<pseudo>" is not one this engine exposes`
- `Media emulation was staged with nothing to emulate`
- `Media emulation did not reach the tester: <query>`

The resolver templates remain `No interactive element has the accessible name "<name>"`, `Interactive target "<name>" is not visible and focus-reachable`, `Interactive target "<name>" is ambiguous across <n> elements`, and `Interactive target "<name>" is unreachable after scrolling`. Provider command errors propagate. The suite did not induce an unavailable DevTools session or failed media delivery.

Deviations and incomplete requirements are recorded here.

| Expected | Found and exact evidence | Done or not done |
| --- | --- | --- |
| Required Patterns fences pass guide parity within owned files. | `tests/guides.test.ts:372` reports missing routing for `Hold a control and read the pressed paint`, `Read a pseudo-element's paint`, and `Emulate reduced motion and print`. The registry is imported at `tests/guides.test.ts:188` and declared at `tests/setup.ts:71`, an explicitly off-limits path. | Stopped. The needed repair is to map each heading to `tests/src/browser/helpers.test.ts` in that registry. No scope workaround or parity weakening was applied. |
| Omitting a media axis leaves it alone using the planner's partial payload. | Real CDP calls cleared reduced motion when `features` was omitted; the focused tests failed at the preservation assertions. | Fixed inside owned source by supplying effective `print` and `motion` readings for omitted axes. The same focused command passed. |
| Copy the planner's guide drafts exactly. | The supplied report's § 5 lists rows, rulings, bounds, and Pattern titles, but supplies no literal Pattern fences or complete row text. | Authored those sections from the prescribed contracts and fixture readings, and transcribed their fences into browser cases. |
| Media release reads neither `2` nor `3` on every host. | The contract restores the host's own motion preference, which can legitimately resolve to `2`. This host restored `1`. | Asserted the original preference and its corresponding paint rather than assuming the host preference. |
| Explicit release followed by a hook causes no second release. | The verdict requires `releaseMedia` to send an unconditional reset; pointer release sends button-up only while its marker exists. | Proved no second pointer-up event and stable media defaults after repeated reset. Did not claim that media teardown sends no command. |
| Execute proof through `prove`. | The brief explicitly states that `prove` is blocked here. | Used real managed-Chromium tests and manual plants. No `prove` receipt is claimed. |
| Every gate passes and built artifacts represent the change. | The routing blocker stopped work before the acceptance chain and rebuild. | Not done. The sentinel lint fix and final post-plant state also await verification. |
| `git status --porcelain` includes the report. | `git check-ignore tmp/codex/u6-report.md` returns that path. | The report exists under the required ignored `tmp/` directory; no ignore or index change was made. |

The actual final diff is retained at `tmp/codex/u6-final.diff`, and the status reading at `tmp/codex/u6-final-status.txt`. HEAD remains `f49bc7f`. The status output is:

```text
 M guides/test.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/src/browser/helpers.test.ts
```

