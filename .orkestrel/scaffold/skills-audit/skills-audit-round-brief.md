# Audit round: falsify the skill-family enforcement change (campaign 2)

One identical brief, two blind lanes. Follow `.agents/skills/orkestrel-falsify/SKILL.md` (verdict
shape, four values, one terminal line) and the Falsification law in `.claude/rules/quality.md`.
Attempt refutation, not confirmation. CONFIRMED requires naming the attack you tried that failed.
A claim you cannot decide is UNRESOLVED, not CONFIRMED — say what would settle it. Do not hedge
toward an imagined consensus.

## Subject — the chain

Branch `claude/oxlint-conventions-audit-m66uiq`, tip ba1168f. Two writing rounds against the
adoption ruling at `.orkestrel/scaffold/skills-audit/adoption-ruling.md`:

- CU-opus (47eb62a, written by Claude Opus 5): three canon sentences in
  `.claude/rules/documentation.md` § Workflow skills; byte-parity repair of four drifted
  `.claude/skills` bridges; the orphaned `references/application.md` folded into
  `orkestrel-build-application/SKILL.md` step 6 and deleted.
- CU-sol (ba1168f, written by GPT-5.6 Sol): the instrument — `parseSkillFrontmatter`,
  `matchesSkillTrigger`, `readSkillReferences`, extended `inspectSkill`, `inspectBridge` /
  `inspectSkillBridges` with rule token `'bridge'`, physical controls — in `tests/setupPolicy.ts`
  and `tests/policy.test.ts`.

**Lane-specific instruction.** The subjective lane runs on Opus 5, which wrote CU-opus: attack the
canon sentences, the parity repair, and especially the fold-and-delete decision harder. The
objective lane runs on GPT-5.6 Sol, which wrote CU-sol: attack the parser, the checks' boundaries,
and the controls harder — the freshest rulings are the least examined.

## What the round decides

Whether campaign 2's implementation is accepted and becomes part of the vendored `dist/host`
surface every fleet target receives. A finding now is worth more than a clean pass.

## Already established — verified by the Orchestrator directly, do not re-run

`tmp/skills-audit-evidence.md` § Verified directly: the pre-repair drift and orphan facts, the
post-change gate truth (policy 80/80, three gates 0), and CU-sol's red/green control proofs.

## Review evidence

- `tmp/skills-audit-evidence.md` — status and the full diff 4035cb4..ba1168f.
- `.orkestrel/scaffold/skills-audit/` — the adoption ruling, both design-lane reports, the
  absorption distillate, both CU briefs and reports.
- The deleted reference's content is recoverable with `git show 47eb62a~1:.agents/skills/orkestrel-build-application/references/application.md`.

## Numbered falsifiable claims

1. Every added canon sentence is true of the tree and single-homed: name-equals-directory, the
   two description scalar shapes plus the sentence-initial `Use ` clause, and the bridge contract.
   Name a sentence the code contradicts, that contradicts existing canon, or that restates a rule
   homed elsewhere.
2. The bridge repair lost nothing: all eight bridges are byte-identical to their twins on `name`
   and `description`, each names its canonical path, none owns references, and no bridge body
   content that canon permits was erased.
3. The fold-and-delete was right in direction: every non-duplicated clause the deleted
   `references/application.md` carried survives in the SKILL.md (step 6 included), everything else
   it carried is owned by the rules it restated, and the skill remains a router. Name lost content
   or a workflow step that now lacks its detail.
4. `inspectSkill`'s new checks fire on exactly what they claim: exact keys, name=directory,
   non-empty description, trigger clause. Name a healthy shape that fails, or bound the known
   limit (a vacuous "Use for anything." passes — the message claims only presence).
5. The frontmatter parser admits exactly single-line and folded `>-` description scalars and
   invents no phantom keys. Attack with: folded lines containing colons, quoted scalars, literal
   `|` blocks, nested mappings, missing terminator, empty frontmatter.
6. Reference symmetry binds both directions at one level and does not over-fire on the tree: the
   deliberate over-match into fenced examples (safe direction: a fence-named file must exist)
   causes no false orphan report and no false missing-reference report today.
7. The bridge sweep binds: an added, removed, or renamed bridge, a drifted description, a missing
   canonical-path line, and a bridge-owned `references/` each produce a `'bridge'` violation; the
   `'skill'` and `'bridge'` populations do not cross; `SKILL_POLICY_EXCLUSION` still proves the
   boundary.
8. No instrument is vacuous or self-defeating: every new assertion class has a physical control
   that fired red before its check landed and yields exactly one violation. Attack the instruments'
   rules: name a real drift these controls would not catch.
9. Nothing adopted imports foreign policy: no length cap, no required-section set, no eval
   machinery, no invocation keys, nothing from the subjects' hostile surfaces.
10. The change is coherent as one vendored-surface move — would you ship it to the fleet?
    (Subjective lane primary; objective lane still answers.)

## Unknowns

Fleet-wide skill/bridge members outside the vendored set are unmeasured (recorded rollout
prerequisite). A claim depending on them is UNRESOLVED with that named.

## Execution

Auditors edit no source and spawn nothing. The subjective lane cannot execute; rule on supplied
evidence and first-hand reading. The objective lane may run read-only commands; where an attack
needs a write, state the exact probe as what would settle it and mark UNRESOLVED.

## Output

Exactly the orkestrel-falsify verdict shape: numbered verdicts 1–10 in order, findings outside the
claims (BROKEN-standard only), one terminal line. No process diary.
