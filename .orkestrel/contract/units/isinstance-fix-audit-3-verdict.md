# ISINSTANCE-FIX audit round 3 — the Orchestrator's reconciled verdict (2026-09-23)

Subject: the ISINSTANCE-FIX unit's rounds 1 to 3 as one uncommitted edit set in the contract checkout (`main` at `743e4a3`, 0.0.17), claims file `isinstance-fix-audit-claims-3.md`. Round 3 (`sol` on GPT-6 Astra, thread `01a0d03b-2f7e-7501-9015-325285abec33`, 25 commands, 274 s; `isinstance-fix-report-3.md`) landed the round-2 audit's one broken word (the false branch drops by subtype, with the optional-member exception), the three bounds, and the optional-member proof, exactly as `isinstance-fix-brief-3.md` H1 to H3 state.

Lanes that ran: the checker on Sonnet (`isinstance-fix-audit-3-checker-verdict.md`, `FAIL none; outside the claims: none`) and the Orchestrator's own settling run `isinstance-fix-3-gates.log.txt` (every gate green: `npm run check`, the scoped oxlint and oxfmt checks, `npm run test:src` with 1362 tests, `npm run test:guides` with 48 of 48, `npm run build:src:core`; the emitted declaration byte-identical to round 1's; the brief-3 criterion-6 grep with no hit; the `=> unknown` mutation still reddening the parity and `AnyConstructor` assertions with two `TS2344` pairs at their moved lines 795/796 and 802/803; the H3 negative control reddening the `Derived` and `Tagged` false-branch assertions at lines 747 and 781; both sources restored byte for byte; the consumer probe refusing the non-constructor once and the structural and subtype probes compiling). The objective and subjective lanes were **not run** this round. This round's own reason: the round's whole content is one word the objective lane itself proposed in round 2 with its derivation from the checker's narrowing code, three wording bounds the same lane recorded, and a proof that copies the Orchestrator's own settling probe (`contract-isinstance-probe-subtype.ts`), whose negative control the unit ran red and the Orchestrator ran red again; the letters are the checker's to verify and the binding is the mutation checks' to prove, and no design judgment is open. Every citation in the checker's verdict resolves in the file it names (the Orchestrator read the report's quoted sentences at `src/core/validators.ts` lines 378, 383 to 386, and 406, and the case at `tests/src/core/validators.test.ts` lines 767 to 783, before the lane ran).

## Per-claim rulings

1. **CONFIRMED** by the Orchestrator's probes and gate run: the sentence is the round-2 objective lane's own wording, the subtype probe keeps `Base | null` for the optional-member subclass while the assignability control compiles, and the structural probe's `Same` and `Derived` readings hold; "assignable" is gone from the remark (the criterion-6 grep).
2. **CONFIRMED**, the checker: the three bounds landed verbatim at their sites, `instanceOf` is imported once from the `@src/core` barrel, and no relative `combinators.js` import remains.
3. **CONFIRMED**, the checker and the Orchestrator's control: the `Tagged` case sits beside the `Same` case with its runtime assertions, and replacing the false-branch assertion with `null` reddens it (line 781, and the `Derived` case's line 747 under the Orchestrator's file-wide replacement), so the assertion distinguishes the compiler's behaviour.
4. **CONFIRMED**, the checker and the Orchestrator's run: three owned files, every gate green, the declaration unchanged, the mutation and the probes as recorded, no banned token as code, the report carrying its thread id and journal path.

## Findings outside the claims, ruled

None from any lane.

## Carrier

No finding is open. The unit is accepted for release: `contract-release-prepare.sh` bumps to 0.0.18 and commits the fix with `release-message.txt`; `verifier` on Sonnet runs the authoritative chain on the release commit (`release-verifier-brief.md`); the push and the upload follow, the upload with the user's one-time code.

VERDICT: FAIL none; outside the claims: none
