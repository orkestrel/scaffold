# Unit E-ID-MOTION-OFFCANVAS round 2 — the responsive exit is proved, and the guide states the resolved timing

Successor to `e-id-motion-offcanvas-brief-2.md`, which stays in place unedited and still binds except where this brief
overrides it. What changed: round 1 (`73cd4f0` on `unit/moff`) was audited in `moff-audit-verdict.md` (FAIL 3, 6); this
round carries claim 3, claim 6, and the text-integrity finding, and nothing else. Claim 2 was the Orchestrator's wording,
and its change holds; claim 5 is settled.

## Role and engine

`opus` on Opus 5.5, the same sole writer in `/home/user/veneer-moff` (branch `unit/moff` at `73cd4f0`), resumed. Read
`moff-audit-verdict.md`, `moff-audit-objective-verdict.md` (claim 3's table), and `moff-audit-subjective-verdict.md`
(claim 6 and referrals R1 to R3), all under `/home/user/scaffold/.orkestrel/veneer/units/`. The Law, Host, Scope, Tools,
and Deviation contract of the earlier briefs bind unchanged.

## Objective

A responsive panel below its boundary is proved through the whole sequence the engine writes, entry and exit; the plants
the audit named fail with an `AssertionError`; the guide states what the panel's timing resolves to; and the report states
each case's coverage as the case runs it.

## Items

1. **Claim 3, the responsive case.** Extend `keeps the $name panel opaque and still at and above its boundary, and slides
   and fades it in below` (or split it, and name each case for what it proves) so that below the boundary it also drives
   the exit: `hiding` joins and `show` leaves, then `hiding` leaves. Read the exit's running `transform` and `opacity`
   through `sampleTransition` on the same token timing, and the resting panel's `opacity` at `0` after it. Settle the title.
2. **Claim 3, the plants.** Add these to `tmp/units/moff-plants.sh` (a successor copy, `moff-plants-2.sh`; never edit a
   script while it runs), each logged to `tmp/units/moff-plant-<name>.log.txt` and restored byte-identically:
   - **`hiding-opaque`:** `.offcanvas-sm.hiding { opacity: 1 }` added below the `sm` boundary. It fails the responsive
     case.
   - **`leak`:** `opacity: 0` written in the responsive panel's rule at and above its boundary. It fails the in-flow half
     of the responsive case.
   - **`mixin`:** one panel transition written as a bare `transition` declaration instead of through the `transition`
     mixin. It fails the reduced-motion half of the factor case.
   Re-run the round-1 plants too, and keep every log.
3. **Claim 6, the guide.** In § Offcanvas classes, the motion paragraph states that each move resolves to `250ms` at a
   motion factor of `1`, in place of the release's `0.3s`, and the departure bullet "The panel moves on Elements' panel
   motion" states that the slide resolves to `250ms` on the `cubic-bezier(0.32, 0.72, 0, 1)` curve and the fade to
   `250ms` on the `ease-out` curve at that factor, in the form the § Modal classes departure bullet uses. Read each value
   from the built cascade before writing it. Settle the subjective lane's optional "which fades nothing" wording yourself.
4. **Text integrity.** Re-wrap at 100 columns every comment line this unit added or changed in the owned files (the
   `describe('offcanvas in an expanded navbar')` comment among them), and report the sweep:
   `awk 'length > 100 && $0 ~ /^[[:space:]]*\/\//'` over each owned test and partial, base against final.
5. **The report.** State, per case, which class writes it drives and what it reads.

## Execution

Perform the assignment directly and spawn nothing. Write the proofs of Item 1 first and run them red against the round-1
rules with the planted `hiding-opaque` rule, then green without it. Then Items 2 to 5, then every Acceptance gate of the
earlier briefs, logged under `tmp/units/` with the `-2` suffix.

## Output

Write `tmp/units/moff-report-2.md` and return the same text: the red and green readings with commands and counts; the
case coverage table; the plant table (every plant, round 1's included); the guide sentences as written; the comment
sweep; the gate table; `tmp/units/moff-2.diff` (`git diff 73cd4f0`) and `tmp/units/moff-2-status.txt`. State no count in
prose.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files.
2. Each plant, round 1's and this round's, fails a case with an `AssertionError`, per its log, and restores identically.
3. `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0; after
   `npm run build:src`, the `Offcanvas` and `Backdrop` engine proofs and `npm run test:app` exit 0.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs `analyst` on GPT-6 Astra and `reviewer` on Opus
5.5 on a successor claims file.
