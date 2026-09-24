# J-ALERT audit round 1 — the objective lane's verdict (GPT-6 Astra through codex exec, read-only)

Thread `01a0d19c-6f6b-7af0-9a43-75da446b38d9`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-alert-audit.jsonl` (launch copy under `tmp/codex/`); 30 commands; 434 s; usage {"input_tokens":2080450,"cached_input_tokens":1931136,"cache_write_input_tokens":0,"output_tokens":11591,"reasoning_output_tokens":3983}. Retained verbatim from the exec's last message.

---

Objective lane — source review against the supplied execution evidence.

1. **CONFIRMED — Construction and lifetime.** Invalid vocabulary is rejected before the registry claim; destruction aborts and releases before restoration. The attempted attacks were invalid groups leaving an owner behind, duplicate ownership, caller mutation of the class group, and an already-aborted signal. The constructor and the supplied assertions exclude those outcomes (`src/browser/Alert.ts:62`, `src/browser/Alert.ts:142`, `src/browser/helpers.ts:260`).

   The proof bindings are:

   | Proof | Distinguishing mutation and assertion |
   |---|---|
   | Invalid groups | Omit attribute or selector validation, or substitute the class guard. The expected `ALERT_OPTION_INVALID` result fails (`tests/src/browser/Alert.test.ts:296`; `j-alert-mutations.log.txt:21`). |
   | Invalid host, duplicate owner, reconstruction | Omit the registry claim. Lookup and duplicate-owner assertions fail. This recorded row binds ownership; it does not independently exercise omission of the host guard (`tests/src/browser/Alert.test.ts:316`; `j-alert-mutations.log.txt:25`). |
   | Signal destruction | Replace the aborted-signal condition. The already-aborted instance remains registered and its assertion fails. The mutation retains the ordinary abort listener, so that row establishes the construction-aborted branch specifically (`tests/src/browser/Alert.test.ts:341`; `j-alert-mutations.py:78`; `j-alert-mutations.log.txt:19`). |
   | Replaced vocabulary | Ignore the classes group. The remaining tokens and opacity-transition assertions distinguish the default vocabulary from the replacement (`tests/src/browser/Alert.test.ts:267`; `j-alert-mutations.log.txt:20`). |

2. **UNRESOLVED — Close sequencing under combined re-entry and takeover.** The recorded individual doors hold, but the combined interleaving is not settled.

   The source predicts this sequence on a connected custom element carrying `alert show`:

   - A one-shot `close.vn.alert` listener calls `close()` again.
   - The inner call removes `show`. An attribute reaction restores `show` and disarms itself.
   - The inner call returns `false` through `#holds`, then clears `#closing`.
   - The outer dispatch returns. Its refusal read finds neither an aborted controller nor a close in flight.
   - The outer call removes the restored token and removes the host.

   The admitting door is the post-dispatch check at `src/browser/Alert.ts:117`; the inner call clears the evidence it reads at `src/browser/Alert.ts:138`. The subsequent write is at `src/browser/Alert.ts:126`. This combines the separately supplied re-entry and token-return fixtures (`tests/src/browser/Alert.test.ts:382`, `tests/src/browser/Alert.test.ts:466`). No supplied execution exercises their combination.

   Settle this with an Orchestrator browser reproduction recording each call’s result, class writes, connectivity, and events, then rule whether the older call may overwrite the inner call’s takeover. If that is forbidden, retain operation identity across the dispatch without breaking the existing successful-inner-close behavior.

   The individual proof bindings are sound within their exercised vectors:

   | Proof | Distinguishing mutation and assertion |
   |---|---|
   | Close without fade | Omit token removal, host removal, or release; restore on completion; or await unconditionally. Immediate connectivity, event state, registry lookup, and subsequent no-write assertions distinguish these mutations (`Alert.test.ts:44`; log:2–6). |
   | Fade completion | Drop the wait or layout read. The running opacity transition and completion order distinguish them (`Alert.test.ts:83`; log:7–8). |
   | No fallback timer | Append a timer after settling. The recorded `closed`-before-timer ordering fails (`Alert.test.ts:108`; log:9). |
   | Event shape and hooks | Dispatch `closed` before removal, change cancelability, or admit payload-bearing events to hooks. Connectivity, ancestor delivery, event flags, and hook records distinguish them (`Alert.test.ts:124`; log:10–13). |
   | Prevention | Ignore the dispatch result. The mutation recorder, retained host, and `false` result distinguish it (`Alert.test.ts:172`; log:14). |
   | In-flight refusal | Drop `#closing` from the refusal. The second result and event sequence distinguish it (`Alert.test.ts:205`; log:15). |
   | Destruction during fade | Omit snapshot saving, abort, or the post-wait read. Restoration, connectivity, hooks, and the result distinguish these mutations (`Alert.test.ts:225`; log:17–18, log:28). |
   | Destruction during `close` dispatch | Drop the post-dispatch refusal. The no-write assertion distinguishes it (`Alert.test.ts:358`; log:27). |
   | Successful re-entry during `close` dispatch | Drop that same refusal. The outer result and exact mutation sequence distinguish it; the case is explicitly named in the `JOINED` row (`Alert.test.ts:382`; log:27). |
   | Destruction during `closed` dispatch | Drop the completion lifetime read. The result changes despite restoration (`Alert.test.ts:415`; log:31). |
   | Destruction during token removal | Make `#apply` return `true`. The outer call proceeds to removal; retained connectivity distinguishes it (`Alert.test.ts:429`; log:26). |
   | Token restored during token removal | Remove the post-write read, or leave a stopped close in flight. Retained connectivity and the successful later call distinguish these mutations (`Alert.test.ts:466`; log:16, log:26). |
   | Token restored during fade | Drop the post-wait read. Retained connectivity and absence of `closed` distinguish it (`Alert.test.ts:504`; log:28). |
   | Destruction during host removal | Remove the removal-door lifetime read. The event recorder distinguishes the unwanted `closed` dispatch (`Alert.test.ts:526`; log:29). |
   | Reinsertion during host removal | Remove the connectivity check. The result, event recorder, and retained owner distinguish it (`Alert.test.ts:562`; log:30). |

   In this table, `Alert.test.ts` denotes `tests/src/browser/Alert.test.ts`, and `log` denotes `j-alert-mutations.log.txt`. A listed `JOINED` row binds the named proof because that proof appears in the failed-case list and its assertions distinguish the edit; an unrelated failure elsewhere in the file would not suffice.

3. **UNRESOLVED — Design decisions.** The generalized conflict check conforms to E12 on the source trace. The attacks involving duplicate selector matches, different host elements, outside-root triggers, and consumer-owned engines fail:

   - `readTargets` uses `querySelectorAll`, so a selector list does not supply duplicate panel elements (`src/browser/helpers.ts:147`).
   - Button and alert candidates must lie inside the root; an outside-root panel cannot equal either candidate (`src/browser/Delegate.ts:189`, `src/browser/Delegate.ts:211`, `src/browser/Delegate.ts:291`).
   - Each route excludes an element already owned by its own engine class before the duplicate-element check (`src/browser/Delegate.ts:197`).
   - Each delegate evaluates its own contained triggers and current registries, matching E12’s amended per-delegate refusal (`decisions.md:57`).

   Successful completion releases without restoration, matching Bootstrap’s removal, `closed`, then disposal order (`src/browser/Alert.ts:132`; `node_modules/bootstrap/js/src/alert.js:51`). The inline vocabulary field exists as claimed (`src/browser/Delegate.ts:78`).

   The assertion that operation identity could never differ remains unresolved because the claim-2 interleaving starts an inner close before `#closing` is set and clears it before the outer dispatch returns. Refer that premise, and the inline vocabulary design choice, to the designated design lane without assuming its verdict.

4. **CONFIRMED — Dismiss route.** Attempts to double-drive through nested roots, construct over a consumer alert, route outside the root, or drive after delegate destruction are excluded by the lookup, containment, lifetime, and per-event mark checks (`src/browser/Delegate.ts:249`, `src/browser/Delegate.ts:268`, `src/browser/Delegate.ts:303`). Anchor and area prevention precedes the disabled check, matching `node_modules/bootstrap/js/src/util/component-functions.js:12`.

   The proof bindings are:

   | Proof | Distinguishing mutation and assertion |
   |---|---|
   | Target, href, ancestor fallback, and prevention | Remove the route, target reading, fallback, or prevention; alternatively prevent every click. Connectivity, named completion events, and dispatch return values distinguish them (`Delegate.test.ts:1015`; log:32–39). |
   | Trusted close control | Remove the alert route. The host remains connected. The installed `clickAccessible` implementation uses `userEvent.click`; this row binds dismissal, while the focus assertion independently checks the final focus (`Delegate.test.ts:1058`; log:32). |
   | Consumer alert | Omit `Alert.find`. Construction collides with ownership; removal, consumer hooks, and replacement-token assertions fail (`Delegate.test.ts:1073`; log:41). |
   | Disabled token and attribute | Omit either check or move prevention after resolution. Host retention, absent ownership, and prevented anchor defaults distinguish them (`Delegate.test.ts:1093`; log:35–37). |
   | Replaced groups | Ignore selector, class, or attribute replacements. Default-route refusal, replacement-token removal, target resolution, and disabled behavior distinguish them (`Delegate.test.ts:1122`; log:44–46). |
   | Button/alert refusal | Exclude alerts from conflict candidates. The no-event, no-owner, no-prevention assertions fail (`Delegate.test.ts:1159`; log:48). |
   | Consumer button permits routing | Count an already-owned button as a construction candidate. The expected route events and removal fail (`Delegate.test.ts:1196`; log:51). |
   | Consumer alert permits routing | Count an already-owned alert as a construction candidate. The expected route events and removal fail (`Delegate.test.ts:1221`; log:50). |
   | Outside-root alert | Omit host containment. The retained-host and absent-owner assertions fail (`Delegate.test.ts:1246`; log:40). |
   | Collapse/alert refusal | Exclude alerts from conflict candidates. The untouched panel and empty event record distinguish it (`Delegate.test.ts:1267`; log:49). |
   | Distinct button trigger and alert | Remove the alert route. The button toggles but the host remains connected (`Delegate.test.ts:1295`; log:32). |
   | Nested roots | Drop the alert mark. The inner delegate’s prevented close is retried by the outer delegate; the event record and retained host distinguish it (`Delegate.test.ts:1308`; log:52). |
   | Destroyed delegate | Drop the lifetime check. An alert is acquired and removed after the button listener destroys the delegate (`Delegate.test.ts:1337`; log:53). |
   | Delegate destruction during fade | Omit acquisition or discard live alerts. Restoration, registry release, and absent completion distinguish them (`Delegate.test.ts:1355`; log:42–43). |
   | Observer release | Omit acquisition or discard live alerts. The proof first verifies ownership, then verifies its disappearance after removal; the `JOINED` rows therefore bind beyond route discovery (`Delegate.test.ts:1383`; log:42–43). |
   | Invalid delegate groups | Substitute the class guard or ignore replacement groups. Expected construction errors distinguish them (`Delegate.test.ts:1404`; log:44–47). |

   Here, `Delegate.test.ts` denotes `tests/src/browser/Delegate.test.ts`, and `log` denotes `j-alert-mutations.log.txt`. The mutation-only red readings for consumer-alert routing and root containment bind their proofs directly.

5. **CONFIRMED — Guard, tables, and barrel.** Payload-bearing events, plain objects carrying `detail: null`, and throwing accessors were the attempted guard attacks. The class-and-detail check and its exception boundary reject them (`src/browser/validators.ts:161`; `tests/src/browser/validators.test.ts:171`). The corresponding mutations distinguish payload acceptance, structural-object acceptance, and an escaping accessor exception (`j-alert-mutations.log.txt:54`).

   Removing table freezing fails the explicit frozen-table assertion (`src/browser/constants.ts:72`; `tests/src/browser/Alert.test.ts:17`; `j-alert-mutations.log.txt:24`). Removing the Alert barrel export fails the dynamic export-list assertion without making that test’s import graph uncollectable (`src/browser/index.ts:11`; `tests/src/browser/index.test.ts:15`; `j-alert-mutations.log.txt:57`). No Alert option requires a defaults table or an additional parser.

6. **UNRESOLVED — Guide and returned contract patch.** The exported surface, example import, default tables, event table, plugin proof, and returned method-summary patch match the source. The Bootstrap departures concerning timing, lifetime, disabled attributes, and root containment are supported (`guides/veneer.md:786`; `guides/veneer.md:875`; `j-alert-patches/j-alert-types.diff:5`).

   The unqualified re-entry statement at `guides/veneer.md:854` says the inner call resolves `true` and the outer call resolves `false`. The claim-2 interleaving predicts the reverse. Resolve that behavior before accepting the sentence and the returned takeover contract. The smallest documentation correction must state the condition under which the inner call succeeds; it must not conceal an older call overwriting a takeover if the governing behavior forbids that.

   The unchanged general Delegation paragraph remains the explicitly assigned W5 integration bound.

7. **CONFIRMED — Cascade reading.** The attack was that the fade proof could pass without exercising a transition. It cannot: it requires an opacity `CSSTransition`, reads `0.15s`, and records animation completion before `closed` (`tests/src/browser/Alert.test.ts:83`). Dropping layout or waiting reddens that case (`j-alert-mutations.log.txt:7`).

   The shipped-sheet case separately loads `_alert.scss`, verifies a loaded sheet, and reads relative positioning, zero transition duration, unchanged opacity, and no animation (`tests/src/browser/Alert.test.ts:32`; `src/styles/components/_alert.scss:9`). The no-fallback case loads no fade sheet and distinguishes a fallback timer through event ordering (`tests/src/browser/Alert.test.ts:108`; `j-alert-mutations.log.txt:9`). The supplied measurements do not attribute the test-local fade rule to the shipped cascade.

8. **UNRESOLVED — Scope, gates, and evidence custody.** The supplied status and diff stay within the owned files. The added source uses the required guards, `.vn.` events, and permitted declaration forms. The Orchestrator’s recorded gates are accepted as established and were not rerun (`j-alert-status.txt:1`; `j-alert-gates.log.txt:15`; `j-alert-gates.log.txt:558`).

   The retained mutation log contains the stated classifications, green endings, matching before/after digests, and `receipt: restored byte for byte` (`j-alert-mutations.log.txt:58`). Read-only SHA-256 checks also matched the audited source files to those recorded digests. That establishes which bytes the log identifies, not an independent replay.

   `j-alert-mutations-orchestrator.log.txt` is absent. Its replay clause remains unresolved as instructed. The writer’s missing-export reds collected no tests and do not independently bind behavioral assertions; the inspected mutation rows supply the later bindings. The report records no `prove` invocation (`j-alert-report.md:3`).

**Findings fitting no claim:** none.

**Attacked and held:** Destruction during restoration cannot revive the old Alert: release precedes snapshot writes, and the old controller remains aborted (`src/browser/Alert.ts:142`). Re-entry while `#closing` is actually set refuses without dispatch; that correct behavior is distinct from re-entry during the preceding `close` dispatch (`src/browser/Alert.ts:112`). Nested delegates may construct different engine classes on one element when no individual delegate observes a conflict; E12 explicitly permits that configuration (`decisions.md:57`). Completed-close disposal correctly leaves the host’s end state intact; it is distinct from explicit destruction before completion.

**Referrals:** The Orchestrator must reproduce the combined re-entry/takeover vector with its negative control before assigning a behavioral fix. The design lane must assess the boolean-marker premise against that result and rule on the vocabulary field. W5 carries the general Delegation paragraph. The Orchestrator carries the independent mutation replay.

**Bounds:** This lane ran no browser test, build, mutation, or gate, wrote no file, spawned no agent, and read no other lane’s verdict. Behavioral conclusions use the inspected source and supplied executions; the combined interleaving is a source prediction, not a fresh browser observation. No `prove` call was made, no refused call was observed, and no probe receipt is claimed.

VERDICT: FAIL 2, 3, 6, 8; outside the claims: none
