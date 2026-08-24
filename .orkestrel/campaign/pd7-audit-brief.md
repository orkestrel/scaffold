# Audit PD7 — the receipt proof, the no-follow overwrite, the prose closes (probe)

Role: analyst. Engine: GPT-5.6 Sol. Read-only: audit, never edit. Attempt REFUTATION of each
claim; CONFIRMED needs the evidence that convinced you, BROKEN needs the exact failing input
and the smallest correct fix. Terminal line: `PASS` or `FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/orkestrel/probe` (baseline 70f20fb,
writer Claude Opus 5 plus the Orchestrator's one integration line — the overrun bound reworded
to the candidate diagnostic batch per your predecessor's own prescription). Diff at
`/home/user/scaffold/tmp/units/pd7.diff`. Supplied host evidence: `test:guides` and
`test:policy` complete and green; the Probe and helpers suites complete and green.

## Claims

1. **The receipt proof binds.** The receipt pin's added case pairs the clean case with a
   control sharing NO path with it (candidate and test both different, pinned by explicit
   path-difference assertions), and asserts a defined receipt — the guide's
   unrelated-control claim now has an assertion that breaks if it goes false. The red record
   (de-issued control → undefined receipt) binds to the mechanism.
2. **The no-follow overwrite closes the swap.** `overwriteFile` opens with
   `O_WRONLY | O_TRUNC | O_NOFOLLOW` and writes through the descriptor; both boot-dependency
   mutations route through it; the creates keep `wx`; the pins prove the symlink refusal and
   the gone-file refusal, red-first against the follow-flag mechanism (the writer measured
   the escape landing at the link destination). Attack the helper: any path where the
   overwrite still follows a link, or a leak (descriptor left open on throw).
3. **The containment passage is TRUE as written**: the closed set (wx creates, no-follow
   overwrite, component-naming unlink) and the named openings (directory-component swap; a
   Node build defining no `O_NOFOLLOW`) match the code — verify the writer's
   mutation-enumeration claim that no unguarded overwrite remains in `src/` by running the
   same enumeration yourself.
4. The overrun-bound wording now states the candidate diagnostic batch (both readings before
   the yield), matching your predecessor's prescription and the yield sites.
5. The remaining prose prescriptions landed (containment noun, the three de-tallied
   sentences) with meanings intact; the `overwriteFile` parity row exists with its executed
   example; scope honesty holds (the six named files only).

## Output

Per-claim verdicts with evidence (file:line), then the terminal line.
