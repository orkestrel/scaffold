# Design round 4 — reconciliation, 2026-08-21

Lanes: subjective (session task record; key content quoted here), objective
(`tmp/codex/design4-objective-last.md`). The lone-CR measurement
(`measurements.md`, readline-cr-facts.cjs) resolved subject B's conditional branch before
reconciliation; the objective lane independently replicated it with a discriminating negative
control.

## Subject A — stdin delivery: BOTH mechanisms, layered

The lanes diagnosed different halves of one defect and each half survives the other's attack:

1. HOST-REPORTED faults surface fast (objective lane): the stdin swallow is replaced by
   channel-failure handling — the affected `send` settles `false` AND the existing `error`
   event emits a `ProcessError` coded `protocol` carrying the host fault as `cause`; the
   callback and stream-error paths deduplicate into one channel-failure state; `execute`
   terminates the child, marks the result failed, and rejects under `strict` with that cause.
   Package-initiated closure (teardown, `end`, destroy, intentional unavailability) stays
   quiet. The subjective lane's spurious-shutdown-fault objection is answered by mcp's own
   transport contract, which declares delivery failure part of the surface — a message lost to
   a dying child IS the event that contract promises.
2. UNREPORTED non-delivery gets a bound (subjective lane): `ProcessOptions.delivery` — the
   millisecond bound after which an unconfirmed `send` resolves `false`; omitted or `0`
   disables; validated through `validateTimer`; the timer clears on settlement and teardown.
   This serves the hosts and cases where no fault ever surfaces: the measured Windows fd-0
   case (write succeeds, child alive) and a POSIX child that stops reading without closing.
   No event fires on a `delivery` expiry — nothing host-reported happened.
3. Prose corrections (both lanes): `true` means the host accepted the bytes, not that the
   child read them; the "stays pending until the child drains it" claim is corrected; the
   Windows fd-0 limit is stated with its 2026-08-21 measurement (including the objective
   lane's addition: a write AFTER child closure fails `ERR_STREAM_DESTROYED`, so acceptance
   is a live-pipe fact, not a delivery guarantee — spell that plainly); consumer deadlines remain
   documented as mandatory for what no mechanism can see.
4. `ProcessInterface.writable` is REFUSED (subjective lane, unchallenged — its only candidate
   consumer hard-codes a protocol claim).

Consumer adoption (mcp's transport surfacing + supervisor's `PROTOCOL` mapping + the
CLIProvider `ProcessOptions.on` race fix the objective lane measured) is a SUCCESSOR after
process releases, sequenced process → mcp → probe → supervisor.

## Subject B — converged: the framing is the contract

LF, CRLF, and bare CR each terminate a line; a chunk-split CRLF joins as one break;
consecutive CRs produce an empty line — measured here and replicated with a failing negative
control by the objective lane. `readline` with `crlfDelay: Infinity` stays the only framer;
no option, no second parser. Obligations: state the rule on `ProcessInterface.lines`' TSDoc
and in the guide, name the progress-bar consequence (a `\r`-redrawing child yields one line
per redraw), correct the backlog-accounting sentence to a logical framing byte (code
unchanged), and pin the rule with real-`Process` proofs (middle CR, chunk-split CRLF,
consecutive CR, bare CR alone) driving the shipped path. The supervisor first-unparseable-line
policy is a carried successor row.

## Subject C — converged: refused

No `bytes`, no `write` on `ProcessInterface`. Every consumer writes a line through `send` and
reads `lines` or uses buffered execution; sea's `runShell` `Buffer` is discarded at every call
site; a byte surface would fork the single-consumer `lines` retention engine. The refusal
lives in the ROADMAP disposition (campaign-close integration applies the merged row wording
from both lanes) and the commit message — no guide trace, per parity.

## Units

| Unit | Owns | Role/engine |
| --- | --- | --- |
| P4-engine | `process/src/server/Process.ts`, `process/src/server/execution/execute.ts`, `process/src/core/types.ts` (TSDoc + the `delivery` option member) | Sol `implementer` (bench; scoped non-suite acceptance) |
| P4-proofs | `process/tests/src/server/Process.test.ts` (+ fixture file if needed), `process/guides/process.md` | Opus `implementer` (native — the proofs spawn real children) |

Both serialized in the process checkout, engine first. Audits: Opus `reviewer` audits
P4-engine; Sol `analyst` audits P4-proofs.

## Carried findings

- sea pins process `^0.0.3` and imports `runSync`, renamed in 0.0.4 — sea cannot compile
  against any later process release; a sea migration row lands in the ROADMAP at campaign
  close (subjective lane; declaration-file decisive).
- The consumer-adoption successor (mcp, supervisor, CLIProvider race) — ROADMAP successor row.
- Supervisor's fail-on-first-unparseable-line policy — ROADMAP successor row.
- POSIX runs (the `EPIPE` fast path; the delivery matrix; the framing across supported Node
  lines) are unreachable from this host — recorded as host-residue observations in the guide's
  existing form, never silently.
- The process checkout carries the campaign's `prepack` manifest line and distribution-flag
  edit — standing state for both units.
