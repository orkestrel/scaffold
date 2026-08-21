# Probe audit round — reconciliation, 2026-08-21

Lanes: analyst (Sol, executed; `tmp/codex/audit-probe-analyst-last.md`), reviewer (Opus,
read-only; session task record). Both FAIL. Rulings follow.

## Per-claim ruling

1. **SPLIT.** 1a (classification of real filesystem faults): CONFIRMED — the reviewer's attack
   table held, including the relative-name `dirname === '.'` case and the `attempt`-guarded
   unstattable parent. 1b (totality and code breadth): BROKEN — a hostile `has`/getter value
   throws out of a helper whose TSDoc and guide row say total/never-throws over `unknown`
   (both lanes; unreachable through the package's own call site, reachable through the
   published export), and a bare `ERR_INVALID_ARG_VALUE` unrelated to a NUL classifies as a
   refused name (analyst, executed). Fix: guarded reads make it actually total; the
   `ERR_INVALID_ARG_VALUE` branch additionally requires a NUL in `file`; unit proofs for the
   hostile values and the non-NUL invalid-arg case.
2. **CONFIRMED** (both).
3. **BROKEN**, convergent from rule-analysis on both lanes: `REFUSED_RUNTIME_TARGETS` admits
   every failure code, so an `EACCES`/`ENOSPC`/`EBUSY` host runs the proof and reds it. Fix:
   the reviewer's code-reading probe shape, kept independent of `isRefusedName`.
4. **CONFIRMED** (both).
5. **CONFIRMED** — the analyst executed the reviewer's own settling probe (native vs
   normalized parses byte-identical; messages workspace-relative).
6-9. **CONFIRMED** (both; claim 9 carries finding B below).
10. **SPLIT.** 10a: BROKEN (reviewer) — the FIFO skip drops the claimant-side progress sample
    although the file's own marker-file rendezvous can measure it ungated; fix by splitting
    the case (claimant sample ungated on the marker rendezvous; cleanup sample gated on the
    FIFO; the 31-35 comment corrected). 10b: BROKEN (analyst, executed) — the TTY skip's
    citation over-claims: `mintty.exe` on this host can construct a hidden pseudo-terminal
    with `isTTY` true, so "this host lacks a terminal fixture" is false; what is absent is the
    `/usr/bin/script` binary the fixture uses. Fix NOW: the citation names the absent binary
    and claims nothing about other terminals. CARRIED: adopting a mintty-driven fixture to
    RUN the two TTY proofs here is new test machinery for probe wave 2, with the analyst's
    probe as its evidence.
11. Resolves through the fix round.

## Findings outside the claims

- A (reviewer): `guides/probe.md:175`'s helper-level row states the `ENAMETOOLONG` refusal
  universally while this host reports `ENOENT` — fix the row to name the codes the helper
  acts on and the create-time classification.
- B (reviewer): the M6 pin at `ProbeServer.test.ts:257-268` re-pins, more weakly, what
  `:74-112` already pins through the same public door — the ROADMAP row's premise (no
  `process.stdin` pin) was stale. Fix: drop the duplicate case; the row closes as satisfied
  by the pre-existing pin.
- C (reviewer): folded into 1b.
- D (reviewer): a dispatch deviation of MINE — the brief assigned the read-only lane git runs
  and probe writes its allowlist forbids. Recorded; successor audit briefs supply the diff to
  read-only lanes or route executed claims to the exec-capable lane explicitly (the scaffold
  and batch briefs already carry the same defect in their Probes section for the reviewer
  lane; their reviewers will deviate the same way — accept those deviations as evidence
  limits, not lane failures).

## Fix round

One unit (P-fix, Opus implementer, native — the fixes span helper, gate, tests, and guide and
need host runs; audited after by Sol). Constraints: 1b's fix must not weaken 1a's
classification (every real-fault case stays); 3's fix keeps the gate independent of the
classifier; 10a's split keeps the cleanup-side sample gated (the FIFO genuinely owns it).
