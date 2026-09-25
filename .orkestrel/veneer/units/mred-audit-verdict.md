# E-ID-MOTION-REDUCED audit — verdict

The Orchestrator's reconciliation of the audit round over E-ID-MOTION-REDUCED, on one claims file
(`mred-audit-claims.md`): the objective lane, `analyst` on GPT-6 Astra (`mred-audit-objective-verdict.md`, journal
`tmp/codex/mred-audit-analyst.jsonl`), and the subjective lane, `reviewer` on Opus 5.5
(`mred-audit-subjective-verdict.md`), blind to each other. The writer was `opus` on Opus 5.5, so the objective lane ran
on an engine that did not write the work. No checker ran: no claim is a mechanical count or path.

**Verdict: FAIL 6, 9; claim 7 settled at landing; outside the claims: R2.** The cascade, the proofs, the plants, and the
ledger rows are CONFIRMED by both lanes.

- **Claim 6 (subjective BROKEN, objective CONFIRMED).** The spinner prose says each spinner "turns" and that the release
  "keeps it turning"; the grow spinner's keyframe scales and fades and never rotates, which the guide itself says
  elsewhere ("scales from nothing"). And "a still spinner still reports that work is running" omits that the role and
  the visually hidden label report the wait to assistive technology only; on screen a still grow spinner is a whole
  disc. The code comment in `_spinner.scss` repeats the second claim, and the `spinner-grow` keyframe row calls one shape
  "the disc" and "its dot". Citations resolve (`guides/veneer.md` § Spinner classes and § Keyframes).
- **Claim 7 (subjective UNRESOLVED, objective CONFIRMED from source).** The landing chain runs `app:browser` and both
  journey passes on the host, which settles it.
- **Claim 9 (both BROKEN, different defects).** The objective lane's defect is the claims file's own wording: the entry
  builds' declaration rollup writes to the system temporary directory as well as the worktree's `dist/`; the unit's
  report said "only this worktree's `dist/`", which is the same overstatement, and nothing in the tree changes for it.
  The subjective lane's defect stands: the placeholder "gates" title claims both animations are gated where the case
  proves only that every condition is the reduced-motion query; the spinner "gates" title states half its proof; and the
  stop title says "turns" for the grow rows.
- **R1 (subjective referral, design), dropped on the record.** The design verdict fixes a whole opaque disc as the grow
  spinner's reduced-motion state, and the captured showcase frame holds the same state; an amendment needs a design
  round no finding asks for.
- **R2 (subjective referral), accepted.** `expect(readText(spinner)).toBe('Loading...')` cannot fail under any cascade
  change, and no plant exercises `isRendered(label)`. The text assertion goes, and a plant hides the label under the
  preference to show the rendering assertion kills.

## Carrier

E-ID-MOTION-REDUCED round 2 (`e-id-motion-reduced-brief-2.md`, `builder` on Sonnet), then a `checker` read.
