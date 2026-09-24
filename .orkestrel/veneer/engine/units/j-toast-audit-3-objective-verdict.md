# J-TOAST audit round 3 (the landing round) — the objective lane's verdict (GPT-6 Astra, retained 2026-09-24)

Thread `01a0d324-4c8d-7631-8432-638718e161d1`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-toast-audit-3.jsonl` (launch copy under `tmp/codex/`); 27 commands; 426 s; usage {"input_tokens":2809770,"cached_input_tokens":2603264,"cache_write_input_tokens":0,"output_tokens":11225,"reasoning_output_tokens":3634}. Retained verbatim from the exec's last message.

---

Objective lane.

1. **CONFIRMED — One delegate.** I attacked nested-root duplication, destruction before the toast route, disabled-trigger conflicts, consumer ownership, and replacement vocabulary. The shared route preserves prevention → disabled/containment resolution → lifetime → mark → lookup/construction → hide (`src/browser/Delegate.ts:612`, `:636`, `:878`). Destruction before marking leaves the toast available to the outer delegate. Cancellation does not undo the mark, so nested roots cannot repeat a prevented hide.

   The tests distinguish these failures: the nested-root case prevents `hide` and asserts its dispatch occurs once (`tests/src/browser/Delegate.test.ts:3549`); the destroyed-inner case requires the outer delegate to acquire and later release the toast (`:3571`); the conflict cases assert no construction or events, then admit an existing consumer-owned button (`:3599`, `:3635`, `:3651`). The toast conflict entry excludes disabled triggers and existing toast owners (`src/browser/Delegate.ts:518`, `:552`). E12 remains scoped per delegate.

   The route-removal, prevention, disabled-read, closest-host, vocabulary, containment, mark, ownership, conflict, and lifetime mutations name failing toast cases (`j-toast-mutations-3.log.txt:48`–`:69`). Their whole-file results bind those cases: the assertions directly observe the changed route behavior. The removed toast-only members are absent; the shared ownership and registry unions include Toast (`src/browser/Delegate.ts:182`, `:212`, `:895`, `:913`, `:946`, `:979`).

2. **CONFIRMED — Declarations merge.** I attacked payload admission, throwing accessors, mutable defaults, missing exports, and vocabulary/type drift. `isToastEvent` requires a current-realm `CustomEvent` with null detail and contains accessor failures (`src/browser/validators.ts:348`); the public event map declares `CustomEvent<null>` (`src/browser/types.ts:1939`). The hostile-input assertions distinguish removing either the detail check or its containment (`tests/src/browser/validators.test.ts:495`, `:508`; `j-toast-mutations-3.log.txt:71`, `:72`).

   The frozen Toast tables follow `MODAL_DEFAULTS`, with `target: TARGET_ATTRIBUTE` (`src/browser/constants.ts:421`). `ToastVocabulary` follows `ModalVocabulary`, with readonly groups (`src/browser/types.ts:154`). The documented readers agree with construction and delegation: direct construction validates selectors without matching them (`src/browser/Toast.ts:97`), while the delegate reads dismiss, target, host, and disabled vocabulary. The barrel and sorted export/type assertions include Toast (`src/browser/index.ts:23`; `tests/src/browser/index.test.ts:46`, `:124`). The freeze and omitted-export controls fail their corresponding assertions (`j-toast-mutations-3.log.txt:36`, `:73`).

3. **CONFIRMED — Guide.** I attacked the repaired sentence with a nested show that is prevented. The nested call replaces the identity before dispatch and retains that identity when canceled; the outer call therefore fails its identity read before writing (`src/browser/Toast.ts:156`, `:158`, `:161`). The guide now describes that outcome (`guides/veneer.md:2200`).

   The proof checks each result, actual nested invocation, mutation records, event sequence, shown state, and class membership (`tests/src/browser/Toast.test.ts:896`). Restoring the previous identity on cancellation lets the outer show proceed, contradicting those assertions. The supplied row names precisely this failure: `EXACT`, `1 failed of 38` (`j-toast-mutations-3.log.txt:67`). This whole-file row binds the proof.

   The Toast fence follows Modal; the component section follows Modal; delegation names Toast and states the shared route’s ordering; the obsolete disabled-attribute departure is absent (`guides/veneer.md:653`, `:769`, `:2109`, `:2210`). The named plugin rows retain their proof paths and read shipped (`:7891`–`:7900`). The guide gate independently passed (`j-toast-gates-3.log.txt:177`).

4. **CONFIRMED — ScrollSpy fixture.** I attacked the claimed cleanup by checking the declaration, loop, and browser-test population. The declaration is `ReadonlyArray<readonly [string, string]>`, and the loop consumes `refusals` (`tests/src/browser/ScrollSpy.test.ts:602`, `:608`). Searching `tests/src/browser` found no `as const`. The diff preserves the refusal inputs and assertions (`j-toast-3.diff:1288`).

5. **CONFIRMED — Merge hygiene and scope.** I attacked the wrong-base interpretation by comparing the staged tree to both `MERGE_HEAD` and `HEAD`. `HEAD` is `fb00017`; `MERGE_HEAD` and `main` are `7e96cf8`. The unstaged and unmerged diffs are empty. Against `MERGE_HEAD`, the changed paths are exactly the claimed landing paths; against `HEAD`, `Toast.ts` is unchanged. Other engine implementations remain main’s content; the expressly named ScrollSpy fixture is the test exception.

   Searches found no conflict markers under `src`, `tests`, or `guides`. Inspection of added source and test lines found none of the prohibited TypeScript constructs. Bootstrap comparison text is not a runtime wire name. The report explicitly records no commit, install, discarding command, or `prove` call (`j-toast-report-3.md:7`). Evidence: `j-toast-3.diff:235`, `:496`, `:800`, `:1284`; `j-toast-3-status.txt:1`.

6. **CONFIRMED — Gates and instrument, within the supplied record.** I attacked stale evidence by hashing the current mutation-owned sources: their SHA-256 values match the instrument’s recorded before/after values. I checked the actual gate exits, mutation edits, named failures, and green controls rather than inferring success from the shell script’s final exit. The independent gate log records the stated successful gates (`j-toast-gates-3.log.txt:110`, `:164`, `:177`, `:190`, `:212`, `:224`, `:237`, `:250`, `:288`, `:911`).

   The instrument log contains the stated mutation outcomes and green controls, ending with `receipt: restored byte for byte` (`j-toast-mutations-3.log.txt:74`–`:79`). Its deleted-row comments accurately identify the shared disabled reader and unified conflict entry.

   The red-first and mutation-only proofs bind as follows. References below identify the current test; mutation labels identify the rival implementation each assertion rejects.

   | Proof | Distinguishing mutation and assertion |
   |---|---|
   | `Toast.test.ts:81` | “show writes no fade token”: exact token sequence rejects it. |
   | `:130` | “a zero timer replaces the settle”: completion order and remaining animations reject it. |
   | `:156` | “the fade token ignores animated” and “the calls wait with animated false”: token absence and synchronous completed events distinguish them. |
   | `:188` | “a transitionend wait replaces the settle”: reduced motion creates no transition; completion must still resolve. |
   | `:209` | “hide on a hidden toast proceeds” and “the mid-flight guard is dropped”: results and event sequence distinguish them. |
   | `:249` | Missing timer, ignored autohide, or unread delay attribute: timed completion, elapsed interval, and held toast distinguish them. |
   | `:292` | Refusing an already shown toast or retaining an earlier timer: repeated events and delay measured from restart distinguish them. |
   | `:338` | Ignoring initial hover/focus, either complementary input, or leaving without arming: held-state and eventual-delay assertions distinguish them. |
   | `:389` | “the related target is not read”: suppressed descendant `focusin` prevents that event from concealing the premature timer. |
   | `:424` | Removing mouseover or focusin clearing: the control toast expires while the subject must remain shown. |
   | `:467` | “hide leaves the delay running”: manually restoring `show` exposes the surviving timer. |
   | `:491` | Ignoring pre-change cancellation: mutation records, results, and completed-event absence reject it. |
   | `:532` | Cancelable completion or payload-admitting guard: event fields and unchanged hook count reject them. |
   | `:581` | Omitting abort: pending result, restored tokens, registry release, and detached hooks distinguish it. |
   | `:622` | Not saving fade: restored token membership rejects it while preserving unrelated consumer edits. |
   | `:643` | Ignoring replacement classes or attributes: replacement tokens and conflicting default attributes distinguish them. |
   | `:676` | Invalid vocabulary admission, absent selector validation, or uncoerced animation: expected refusal codes and unclaimed hosts distinguish them. |
   | `:714` | “the host is not claimed”: duplicate-owner refusal and registry assertions reject it. |
   | `:739` | The signal mutation distinguishes the already-aborted construction branch. Live abort is separately asserted. |
   | `:757` | “a write is not followed by a read”: records after destruction expose continued writes. |
   | `:798` | “the show dispatch is not followed by a read”: the observer exposes writes after listener destruction. |
   | `:822`, `:869` | Taking identity after dispatch: nested result and completed-event assertions reject it, including synchronous nested completion. |
   | `:932` | Taking hide identity after dispatch: outer result, surviving shown state, and event sequence reject it. |
   | `:958` | Releasing ownership after restoration: reaction-time reconstruction and replacement restoration distinguish the order. |
   | `:996` | Not reading change identity: the displaced call must fail while the replacement completes once. |
   | `:1015`, `:1031` | Dropping the show-await token read; retaining the accepted-show timer: result, event absence, and later shown state distinguish them. |
   | `:1068`, `:1102` | Admitting transition after fade; ignoring preexisting shown membership: post-reaction records and results distinguish them. |
   | `:1139`, `:1176` | Dropping show write/completion token reads: no subsequent records or completed event are permitted. |
   | `:1212`, `:1249`, `:1266` | Dropping hide write/await/completion token reads: result, preserved reaction state, and event absence distinguish them. |

   The whole-file rows bind these named assertions; `JOINED` establishes additional affected cases, not isolation. The original skeleton’s failures alone do not establish defect-specific coverage. The later mutation controls supply that distinction (`j-toast-mutations-3.log.txt:2`–`:47`, `:64`–`:72`).

   The equivalent timer-clear mutation proves no visible cleanup distinction: a surviving callback reaches the destroyed engine’s refusal. The equivalent toast-acquisition mutation has no construction-write reaction to destroy the delegate between the lifetime check and acquisition. Neither missed row proves its defensive branch unnecessary (`src/browser/Toast.ts:79`, `:224`, `:234`; `j-toast-mutations-3.log.txt:22`, `:70`). The Orchestrator replay and subsequent landing chain remain future execution obligations, not claimed results of this audit.

**Findings fitting no claim:** none.

**Attacked and held:** The sequence audit considered destruction, accepted re-entry, and token takeover at every write boundary:

- Show dispatch rechecks lifetime, transition refusal, and identity. Fade preserves the original shown membership and rejects transition membership. The shown/transition write and await require both tokens. Completion requires shown without transition (`src/browser/Toast.ts:152`–`:190`).
- Hide dispatch additionally requires shown. Its transition write and await require shown plus transition. Completion requires neither (`src/browser/Toast.ts:193`–`:221`).
- Every write returns through the lifetime/identity/membership read (`src/browser/Toast.ts:243`–`:261`). Custom-element reactions can run before these DOM operations return, which is why post-write checks are necessary. [HTML reaction ordering](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions).
- No reviewed door admits an observed takeover and then overwrites it. A refused mid-transition call does not acquire identity; completed-event re-entry begins after the preceding change has completed. Re-showing a settled shown toast correctly restarts its sequence.
- Bootstrap’s installed show/hide ordering agrees with the implementation’s documented departures: deprecated `hide` tokens are omitted, hiding adds a layout read, and finite-animation settlement replaces transition-end fallback timing. The motion proofs distinguish no-transition completion from an existing fade (`tests/src/browser/Toast.test.ts:81`, `:130`, `:188`).
- Parser attacks hold at the declared boundary: malformed attributes are refused before claiming; explicit constructor values override attributes without parsing them (`src/browser/helpers.ts:212`; `tests/src/browser/Toast.test.ts:676`). The installed `parseBoolean` and `parseNumber` supply coercion rather than Toast duplicating it.

**Referrals:** E13’s shared restoration bounds remain owned by the deferred snapshot work. This audit does not reopen them.

**Bounds:** Source review with supplied execution evidence, not an independent browser replay. No browser suite, build, mutation, or filesystem write was run. No `prove` call was made; no refused call or probe receipt is claimed. Behavioral evidence is bounded to the supplied Chromium run and the named controls.

VERDICT: PASS
