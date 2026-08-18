# Unit FX-sol: land the audit round's instrument fixes (campaign 2 fix round)

Successor to `tmp/skills-cu-sol-brief.md`. Verdicts at
`.orkestrel/scaffold/skills-audit/audit-objective-verdict.md` plus the subjective lane's claim-4
break; every fix adopts a lane's prescription verbatim; the Orchestrator reproduced each defect.

## Role and engine

`sol` route — GPT-5.6 Sol implementer, journaled CLI, workspace-write, sole serial writer from a
clean committed baseline (the canon fixes from the parallel prose unit are committed law — read
`.claude/rules/documentation.md` § Workflow skills as current before writing).

## The fixes

1. **Trigger matcher refuses healthy tokens** (both lanes; reproduced): `matchesSkillTrigger`'s
   `/(?:^|[.!?]\s+)Use \w/u` requires a word character after `Use `. Change `\w` to `\S` — keep
   case-sensitivity and the sentence-initial anchor. Pin: a control whose description's trigger
   sentence opens with a backticked token (`` Use `--app` when … ``) fires red before the fix and
   passes after.
2. **Folded-scalar parser refuses blank paragraph lines** (objective lane): a valid `>-` block
   containing a blank line between paragraphs parses to `undefined`. Extend the fold loop to
   retain blank scalar lines with correct `>-` folding (blank line → paragraph break, folded
   lines → space-joined). Pin: a control with a folded description holding two paragraphs, whose
   second begins `Use `, parses to exactly two keys and passes the trigger check.
3. **Quoted description scalars produce the wrong violation** (subjective lane, bounded): a
   single- or double-quoted `description` is admitted with quotes retained and then reds on the
   trigger message. Canon admits exactly two shapes, so refuse quoted scalars at parse (the shape
   violation fires, not the trigger one). Pin: one control per quote kind asserting the
   frontmatter-shape violation.
4. **Claim-8 evidence closure** (both lanes): add the missing bridge fixture — a bridge whose
   frontmatter carries an extra key fires exactly one `'bridge'` violation. Then produce the
   mutation evidence: a script under `tmp/` that disables each NEW assertion branch one at a time
   (exact-keys, name-equals-directory, empty-description, trigger, reverse-reference orphan loop,
   references-subdirectory loop, README/CHANGELOG loop, each bridge check), runs
   `npm run test:policy`, records that exactly the paired control reddens, and restores. Include
   the per-class red evidence table in your report. The script is evidence, not a shipped test —
   leave it under `tmp/` and name its path.

## Scope

- Owned: `tests/setupPolicy.ts`, `tests/policy.test.ts`, plus the throwaway mutation script under
  `tmp/`.
- Off-limits: everything else.
- Validation: `npm run test:policy`, `npm run check`, `npm run lint:check`,
  `npm run format:check`; scoped `oxfmt --write` on owned files only.

## Output

1. `git diff` of the two owned files.
2. Exit codes for the four validations with test counts.
3. Red/green evidence per fix pin, and the claim-8 mutation table (assertion class → disabled
   branch → control that reddened).
4. The mutation script's path. Deviation findings, or `none`.

## Deviation contract

Stop and report if a fix cannot land without an assertion, `any`, suppression, or a behavior
change beyond the four findings; or if any mutation run reddens a control other than its pair
(that is a coupling finding, not yours to fix).

## Acceptance criteria

- All four gates exit 0; `test:policy` green with counts; every fix has its red/green pin; the
  mutation table covers every new assertion class from the previous unit plus this one; the tree's
  real sweep still returns `[]`.
