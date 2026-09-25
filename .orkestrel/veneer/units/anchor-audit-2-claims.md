# E-ID-ANCHOR audit round 2 — claims

Subject: E-ID-ANCHOR round 2 in `/home/user/veneer-anchor` (branch `unit/anchor`, committed as `98bd1b0` over the
round-1 checkpoint `c9c6907`, itself over Veneer `0a0a252`), briefed by `e-id-anchor-brief-2.md`, which carries every
finding of `anchor-audit-verdict.md`. Written by `opus` on Opus 5.5 and reported in `e-id-anchor-report-2.md`.
Evidence: `anchor-instruments/r2/` (`anchor-2.diff`, `git diff c9c6907`; `anchor-2-full.diff`, `git diff 0a0a252`; the
status; the old-predicate and mutation drivers, their logs, and their digests; the gate logs), the round-1 records under
`anchor-instruments/`, and the probe logs the brief's table cites
(`native141/j-native-probe-3-141.log.txt`, `/home/user/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3-153.log.txt`).
All other paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only when its log
names an assertion failure. Rule every claim.

1. **No emitted change.** Round 2 changes no emitted declaration or selector: every hunk in `src/styles/**` of
   `anchor-2.diff` is a comment, and the built cascade round 2 compiles equals round 1's.
2. **The prose and comments claim what was measured.** Each sentence of the three classes paragraphs, the three Reason
   cells, the mixin comment, and the three include comments states the computed value in the open popover state and
   the initial value while closed, bounds the painting to the probe rows the brief tabulates (a tooltip or popover whose
   trigger a scroll container clips entirely is not painted on either build; a dropdown menu whose toggle a scroll
   container clips entirely is not painted on Chromium 153 and is on Chromium 141), claims no partial clip and no
   viewport scroll, and gives the override reason as the layer order, true of the cascade and of § Styles' own sentence.
3. **Each comment names what its assertion reads.** The dropdown enumeration comment and the three anatomy comments name
   the object each assertion reads, and each catch they name fires on the build they name it for.
4. **The proofs on the record.** `anchor-old-predicate.log.txt` fails the button-reboot case with an `AssertionError`
   under the old `startsWith(':where(')` predicate and its digest file shows the restore; each row of the report's
   mutation table is an `AssertionError` in `anchor-mutation-styles.log.txt` or `anchor-mutation-conformance.log.txt`,
   restored per its digest; and the report claims no base run for the mixins case.
5. **One population, no sentinel.** `tests/src/styles/mixins.test.ts` defines the reboot population once (`WHOLE_GROUP`)
   and both the reboot and the revert case read it; the `position-visibility` case records an absent selector as
   `undefined`, and its sort is total. For each proof, name the mutation that would make it fail and whether its
   assertions distinguish it.
6. **Scope and gates.** The status names only the owned files, and every gate log in the report ends with `exit=0`.
