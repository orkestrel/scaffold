# Audit U7 reconciliation

Sol's verdict is `audit-u7-verdict.md`: FAIL — 5 broken, 0 unresolved, 0 not-evidenced,
0 findings outside the claims. Claims 1 and 2 (the restored guard, the reversed hazard row)
are CONFIRMED. The Orchestrator verified every broken finding against source on 2026-08-21
before ruling. Rulings, per finding:

- **Finding 3 (terminal totality) — partially accepted; the code-change prescription is
  dropped on the record.** Sol confirmed the natural bounded-settlement proof exists at
  `tests/src/server/Process.test.ts:1143` in the same ruling that marks the claim broken.
  The broken half is the audit brief's own claim wording: it said the orphan-late control
  proves settlement, and that control (`:1344`) takes deliberately pre-bound readings under
  `drain: 30_000` — readings that stay true under the corrected contract, serving as the
  no-verb pole of its row. The settlement proof the prescription demands already exists and
  Sol confirmed it, so adding it to the control would duplicate a proof at the cost of a
  second bound's runtime. No code change; the claim's carrier is `:1143`.
- **Finding 4 (overlapping bounded waits) — accepted.** `#expire` arms a raw
  `setTimeout(#cut, drain)` at `src/server/Process.ts:387-389` while `#kill` starts an
  independent `waitForClose(child, drain)` at `:490`, so a stop-triggered exit bounds the
  same close twice and `stop()` can resolve up to a full drain after the terminal moment
  (bound armed at exit T0; `stop()` entering `#kill` near T0+drain waits a fresh drain from
  there). Fix as prescribed: one idempotent close-wait promise backed by `waitForClose`,
  shared by the native-exit arming and the termination path; `#cut` and `#cutoff`
  disappear. Carried by U8.
- **Finding 5 (comments) — accepted.** The test preamble at `:1247` and the row comment at
  `:1287-1288` ("The host close that the read-end destruction fires arrives after this")
  state host-close timing as load-bearing; U4 measured that ordering unreachable. Narrow
  both to the observable latch ordering. Carried by U8.
- **Finding 6 (guide) — accepted.** `guides/process.md:292-296` still says `drain` "never
  starts on its own and cannot fire unless a caller already asked for a termination",
  contradicting the corrected `:318`. Verified verbatim. Carried by U8.
- **Finding 7 (contract coherence) — accepted.** `src/core/types.ts:226` says only bytes
  after the requested termination are lost (wrong on the arming condition and on the
  unframed-partial loss); `src/core/constants.ts` frames `PROCESS_DRAIN` as
  termination-only. Verified verbatim. Both sat outside U7's four returned patches.
  Carried by U8.

Routing: U8 goes to the native Opus implementer, because the pin for finding 4 spawns
children and holds inherited pipes, which the Sol bench sandbox cannot run. Sol's
prescription for the unification is pinned in the brief verbatim. The re-check after U8 is
Sol, read-only, scoped to these findings.

## Amendment, after U8's measurement (2026-08-21)

Finding 4's latency prediction — stated by Sol's verdict and adopted in this file as
"`stop()` can resolve up to a full drain after the terminal moment" — is measured false.
U8's probe (the `orphan` fixture, `drain: 1_000`, an 800 ms park, `stop()` late in the
window) elapsed 203.29 ms unfixed against 188.75 ms fixed: the redundant `waitForClose`
that `#kill` armed resolves on the host `close` that `#settle`'s read-end destruction
fires, so the overlapping waits end within one close-event latency of each other. The
structural half of the finding stands — two bounded waits, a redundant timer, a redundant
field — and the unification landed. The Orchestrator rules the withdrawn pin correct:
the failing-proof law binds a defect fix, and the measurement shows no behavioural defect
existed; fix 1 stands as a consolidation proven by the suite staying green, which is the
consolidation step's own evidence. The re-check brief's claim on the pin is amended to
rule on the measurement and the removal instead.
