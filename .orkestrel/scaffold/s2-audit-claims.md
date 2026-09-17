# Unit S2 audit — the claims under test

The subject is the uncommitted change in the `scaffold` checkout at
`C:\Users\mikes\WebstormProjects\scaffold`. Unit S1 wrote the config override change; unit S2 then
closed the findings an adversarial audit returned against it. You are auditing the tree as it now
stands, which carries both.

Evidence:

- `tmp/audit/s2-diff.patch` — the complete diff against the last commit.
- `tmp/audit/s2-status.txt` — `git status --short` at dispatch.
- `.orkestrel/scaffold/s2-brief.md` and `.orkestrel/scaffold/s2-brief-2.md` — what S2 was asked to
  do. The successor corrects one clause of the first.
- `.orkestrel/scaffold/s2-report.md` — S2's own account. A claim, never evidence.
- `.orkestrel/scaffold/s1-audit-verdict.md` — the findings S2 exists to close.
- `.orkestrel/scaffold/s2-instruments/` — the scripts S2 ran for its relocation proof.

Re-derive every number you rule on.

## The claims

Rule on each: `CONFIRMED`, `REFUTED`, or `UNSETTLED`, with the evidence that decides it.

1. The merge never flattens a plugin array. A nested override entry retains its nesting and
   introduces no second top-level entry carrying a name the base already declares.
2. Two caller entries sharing a `name` both survive, in the order written, including when a base
   plugin shares that name.
3. A named override entry replaces the matching base entry in the base entry's position, and every
   override entry that matched no base entry appends in caller order.
4. An array, a promise, a falsy entry, and an anonymous object each pass through unchanged, on
   whichever side they were written.
5. The invocation-hazard case derives its population from the callable project rows of the default
   export, covers `distribution`, draws its control from outside that population, and asserts no
   transcribed length.
6. The showcase literal and its explanatory comment live in `CONFIG_TEMPLATES.factories.app`, and
   the relocation changed no emitted byte. S2's own captures and control are in
   `.orkestrel/scaffold/s2-instruments/`; rule on whether they prove what they claim.
7. The inverted browser case plants a sealed copy of the emitted declaration and asserts the plant
   fails the assertion the case relies on.
8. The refusal requires both `command` and `mode`. A value carrying `command` alone merges normally.
   The vendored `tests/config.test.ts` is unedited and its project passes.
9. `findRefusals` replaces `findRefused`, and the parameter constants were folded into their single
   callers rather than left as private module data.
10. The emitted showcase comment states why `assetsInlineLimit` is `4096` — the browser base's `0`,
    Vite's default, and the single-file plugin's overwrite — and the value is unchanged.
11. No emitted wrapper's effective configuration changed under the new selection.
12. This repository's own `vite.config.ts` and `configs/src/*.config.ts` remain byte-identical to
    what the generator emits.
13. No vendored file changed, and `host.json` is unchanged after a build.
14. The added code carries no `any`, no `as`, no non-null assertion, and no suppression comment.
15. Every instrument S2 added has a recorded red, and each red was produced by mutating the subject
    rather than by weakening the instrument.

## Where to look hardest

Unprompted hazards. Rule on each as a finding if it is real.

- **The replacement search does not exclude an index it already consumed.** `findIndex` runs fresh
  for each base entry, and `used` is only read when appending leftovers. State what happens when a
  base declares two entries carrying one name and the override carries one entry with that name.
  State whether any emitted base can reach that shape today, and whether a caller can construct it.
- **`mode` is a real `UserConfig` property and `command` is not.** State what a caller loses who
  writes an override carrying both — a legitimate one, not Vitest's record — and whether such an
  override is constructible from the documented Vite surface.
- **The refusal narrowed from `command` to `command` and `mode`.** State whether any invocation path
  Vitest or Vite actually uses can call a project factory with `command` and no `mode`.
- **`merged.plugins` is computed and then replaced wholesale.** State whether any field
  `mergeConfig` derives from `plugins` survives that replacement inconsistently.
- **The base loop reads `base.plugins`, not `merged.plugins`.** State whether a base whose plugins
  arrive through a nested spread or a getter behaves differently from one that declares them
  literally.
- **S2's relocation proof ran its own scripts.** Read them. State whether the capture covers the
  selections that carry a showcase, and whether the control would fail for the right reason.

## Out of scope

The release. No version bump and no publish is part of this change; both are the repository owner's
decision. The two findings `.orkestrel/scaffold/s1-audit-verdict.md` records as not carried stay
not carried.
