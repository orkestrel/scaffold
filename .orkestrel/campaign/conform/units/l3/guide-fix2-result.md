## Fix round 2

Closes F-1 and F-2 from the round-2 objective lane (`units/l3/guide-objective-r2.md`).

- F-1: `:312` drops "forty-six" so the sentence names the consumers already listed rather than
  tallying them; `:139` drops "Two" from "Two further consequences" and states them without a
  count. The diffstat line at `:57` is unchanged; it cites a tool tally to the artifact that
  produced it.
- F-2: § Sweeps gains four rows, each run over `src`, the non-vendored `tests` (excluding
  `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`),
  `guides/guide.md`, `guides/README.md`, and `README.md`: guide-obj-5's old `exists` `@returns`
  and description text, guide-subj-8's `since` and "the local name", guide-subj-9's "sees",
  "notion", "single mistake", and "most often", and guide-subj-10's "Measured across" and "no
  longer needed". Every sweep returned empty.

No file under `/home/user/fleet` changed.
