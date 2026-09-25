# J-CASCADE round-2 audit — the objective lane (analyst on GPT-6 Astra, journal tmp/codex/j-cascade-audit-2.jsonl; brief units/j-cascade-audit-2-analyst-brief.md; claims units/j-cascade-audit-claims-2.md)

Thread `01a0d64c-d5bf-7f02-9564-7e7173413a20`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-cascade-audit-2.jsonl` (launch copy under `tmp/codex/`); 23 commands; 305 s; usage {"input_tokens":1861685,"cached_input_tokens":1723776,"cache_write_input_tokens":0,"output_tokens":7878,"reasoning_output_tokens":2529}. Retained verbatim from the exec's last message.

---

Source review of `8bc940d` against `a447ce5`; no tests run. Repository citations refer to `8bc940d`. `instrument` means [j-cascade-mutations-2.py](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-cascade-mutations-2.py); `replay` means [the Orchestrator’s replay](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-cascade-mutations-2-orchestrator.log.txt).

| Claim | Verdict | Evidence | Mutation and assertion distinction |
|---|---|---|---|
| **1. Each motion-factor case bounds arrival.** | **CONFIRMED** | Factor `0` requires `[event, resolved, frame]`; factor `4` requires `[finished, event, frame]`. Assertions: `tests/src/browser/Alert.test.ts:144`, `:170`; `Tab.test.ts:489`, `:514`; `Toast.test.ts:160`, `:185`; `Tooltip.test.ts:350`, `:379`; `Popover.test.ts:260`, `:289`. Each frame is registered at the specified point. | `FIXED` replaces the helper with a `1000ms` timer (`instrument:87`); every case distinguishes it through the factor-zero ordering assertion (`replay:20–24`). `LATE` adds `400ms` after an animation round (`instrument:89`); factor zero still passes, and every factor-four ordering assertion distinguishes the delay (`replay:25–29`). |
| **2. The completion bounds do not depend on load.** | **CONFIRMED** | For the audited motion-factor paths, the awaited fade’s completion reaches dispatch through promise reactions and synchronous operations. The complete await trace follows. No engine inserts a timer, animation frame, or other task boundary after settlement. | The `LATE` mutation inserts precisely such a boundary; the factor-four assertions reject it (`replay:25–29`). These results establish the recorded mutation failures; the source trace establishes why the passing continuation precedes the frame. |
| **3. Kills require the assertion-message pattern; recorded rows agree.** | **CONFIRMED** | `instrument:145` declares the specified pattern. `read` refuses failed cases with suite errors or nonmatching messages (`:187–191`); `verdict` accepts a failed case only without a refusal (`:224–225`). The retained instrument’s SHA-256 matches `replay:2`. Recorded kills report `AssertionError`; `CONTROL` reads `HELD`, and `BOOM` and `UNBOUND` read `REFUSED` (`replay:9–38`). | `BOOM` throws `Error('boom')`; `UNBOUND` causes `ReferenceError`. Their refusal readings distinguish ordinary failures from assertion failures (`replay:37–38`). Removing the positive assertion check would turn these readings into unexpected `KILLED` results. The equivalent CSS control remains `HELD` (`replay:36`). |
| **4. Only the named test files changed.** | **CONFIRMED** | `git diff --name-status a447ce5 8bc940d` lists only `Alert.test.ts`, `Tab.test.ts`, `Toast.test.ts`, `Tooltip.test.ts`, and `Popover.test.ts` under `tests/src/browser/`. Changed cases begin at `:117`, `:448`, `:129`, `:316`, and `:225`, respectively. The source and guide diff is empty. | Not a proof claim. |

The engine await trace is:

| Path | Every await and its continuation |
|---|---|
| Shared helper | `src/browser/helpers.ts:111` awaits `Promise.race`: either `Promise.allSettled` over the running finite animations’ `finished` promises (`:112`), or the abort promise (`:113`). It rereads animations (`:102`), returns when none remain (`:110`), and synchronously removes its abort listener through `controller.abort()` (`:117`). |
| Alert close | `src/browser/Alert.ts:141` awaits that helper on the host. Ownership checks and host removal are synchronous; `closed` dispatches at `:146`. No subsequent await. |
| Tab show | `src/browser/Tab.ts:213` awaits that helper on the pane. Checks and the outgoing `hidden` dispatch are synchronous; `shown` dispatches at `:222`. No subsequent await. |
| Toast hide | `src/browser/Toast.ts:218` awaits that helper on the host. Checks and token removal are synchronous; `hidden` dispatches at `:227`. No subsequent await. Toast show likewise awaits at `:188` and dispatches `shown` at `:195`. |
| Tooltip show | `src/browser/Tooltip.ts:451` awaits that helper on the tip. Checks and clearing the change are synchronous; `shown` dispatches at `:455`. No subsequent await. Conceal likewise awaits at `:825`, synchronously discards the tip, and dispatches `hidden` at `:833`. |
| Popover | Inherits Tooltip’s implementation (`src/browser/Popover.ts:42`) with its own event profile (`:51`). It adds no await. |

The helper intentionally waits again if another finite animation remains or starts. The frame-bound conclusion applies to the tested fade population after it settles, rather than the earliest completion within an arbitrary animation population.

Outside the claims:

| Finding | Smallest input and observed-by-source result | Evidence and correction |
|---|---|---|
| **O1. A passed case bypasses suite-error refusal.** | With `case = 'target'`, the report `{"testResults":[{"message":"Error: boom","assertionResults":[{"fullName":"target","status":"passed"}]}]}` makes `read` return `('passed', '', None)`, then `verdict` returns `HELD`. The instrument promises `REFUSED` for a suite-level error. This is source-derived, not executed. | `instrument:29–30` states the rule. The early return at `:185–186` bypasses the suite-message check at `:187–188`; `:222–223` then returns `HELD`. Move suite-error refusal before the nonfailed-status return. This defect does not invalidate the recorded assertion kills or the recorded `BOOM` and `UNBOUND` refusals. |

VERDICT: FAIL none; outside the claims: O1
