# Audit verdict — unit breaking-browser

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so; `checker` and `verifier` on Sonnet. Subject: commit `e7a2299`
(`units/browser.diff`, `units/browser-report.md`), then the fix-up at `9563556`
(`units/browser-fixup-brief.md`, `units/browser-fixup-report.md` with the Orchestrator's
corrections, `units/browser-fixup.diff`, `units/browser-fixup.status`, objective lane
`units/browser-fixup-audit-objective-brief.md`) and the successor at `35443be`
(`units/browser-fixup-2-brief.md`, `units/browser-fixup-2-report.md`, `units/browser-fixup-2.diff`,
`units/browser-fixup-2.status`). The subjective lane ran: a parser and reader split, a writer and
input-option reshape, an emitter on the CDP client, and six interned classes, above the
wide-unit trigger.

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (s04-01, -02, -05, -06, -07, -09, -10, -11, -12, -18, -19, -20, -21, -22, -26, -29, -35, s04b-04, -05, -10, -12; the carriers) | CONFIRMED | — | CONFIRMED | — | stands; the s04-10 websocket and download half is now refused under `documentation.md:46` with the frame half |
| 2 no old name; the new contracts in `types.ts` | CONFIRMED | — | CONFIRMED | — | stands |
| 3 ruled form | CONFIRMED | BROKEN (unratified `validateBrowserInputOptions` rename) | — | — | ratified; radius extended |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, `INTERNAL`, executed assertions | — | CONFIRMED | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | — | CONFIRMED as quoted | GREEN (771 tests) | stands |
| 8 nothing hidden | CONFIRMED | — | — | — | stands |

Fix round one (`implementer` on Opus 5, `9563556`): `drop` guarded on the teardown the client
requested (objective F1; red `expected 1 to be +0`, green after the guard); the websocket and
download drive methods restored on their interfaces with new guide Methods groups the parity test
enforces (objective F4, ruled by the rule text as written; the driver-interface split that would
let them leave the consumer contract is a successor row); `BrowserSendOptions` documented once
(F2); the diagnostics row names its four members (F3, subjective 2); `CDPClientOptions.error`
states both dispatch paths (F8); `BrowserOperationOptions` names the validator's input (F9,
subjective 4 — the writer's name over the recommended `BrowserGestureOptions`, accepted because
the validator also bounds keyboard entry); one voice for coercers and readers, with the total
readers stating what they skip rather than a false throw (subjective 1); invariant 4 heads
captured bytes (subjective 3); the `Performance.disable` send asserted after `metrics()` and
after a failed read (subjective referral); the README link and the `BrowserWaitUntil` row. Landed
with the full chain green (`instruments/land-fixup.mjs`, log `land-fixup.log`). The objective lane
on that fix-up ruled `FAIL 1, 6`: claim 1 for stale line handles after the format pass and the
unrecorded s04-10 refusal — both corrected in the retained report — and claim 6 UNRESOLVED,
settled by the landing chain. Its finding A was real: the connect-race teardown emitted neither
`close` nor `drop` once `drop` was guarded.

Fix round two (`builder` on Sonnet, `35443be`): `close` emitted once when `close()` interrupts a
pending `connect()`, the remark names the race, the race test pins `close` once and `drop` never
(red `expected +0 to be 1`, green after). Landed with the full chain green.

Rulings on the referrals: the `#expected` field stands over deriving the fact from
`#closing.pending` — the derived form reads a late transport `close` after `close()` resolved as
a drop, which no transport contract forbids, so the stored flag is the safer of the two and the
lane found no reachable drift; `read*` → `parse*` stands; the writer surface and input surface
stand; the frame refusal stands with its cost recorded.

Process finding recorded: the first fix-up mutated `src/core/BrowserPerformance.ts` for its own
control without a grant (objective B); the file is intact and absent from the status, and the
rule already binds — a plant is named by the dispatch or taken by the Orchestrator on the host.
The rename reason in the original report (F6) and the unnamed third failing test (F7) are report
defects recorded here.

Recorded for the next change: `parseBrowserChord` (a throwing `parse*` in `helpers.ts`);
`evaluate(expression, timeout?)`'s positional timeout; `findInStore`'s plurality; the
driver-interface split; the imperative "Decode …" first sentences on the `helpers.ts` readers and
the `via` hits outside the named sites, for the voice wave; the `helpers.ts`↔`parsers.ts` module
cycle, proven safe by the dist probe (`function function function`) and recorded as a shape
observation.

Terminal lines: objective PASS (claim 7 settled by the verifier); subjective `FAIL 3` closed by
ratification; checker PASS; verifier GREEN; objective on the fix-up `FAIL 1, 6` closed by the
corrections, the second fix-up, and the landing chain. **Verdict: PASS.** The unit closes
**applied** for every row except the s04-10 drive-method half, **refused** with the rule text
quoted. Tip packed: `browser-35443be.tgz`.
