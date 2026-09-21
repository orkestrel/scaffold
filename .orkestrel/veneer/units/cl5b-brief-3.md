# Unit CL5b — fix round (brief 3)

Succeeds `units/cl5b-brief-2.md`, which with `units/cl5b-brief.md` beneath it stays in force for
everything this brief does not name. Both are left unedited. What changed and why: CL5b's round-1
audit (`.orkestrel/veneer/cl5b-audit-verdict.md`) ran four lanes and every one accepted. The
extractions, the cascade identity, the cases, and the gates all hold, and the Orchestrator's own
probe reddened the tree-is-clean case on a planted duplicate and restored it green.

Four findings come back anyway, and none of them is a defect in what the unit was asked to do.
They narrow the **gate** this unit ships, which will judge every remaining styles unit in the
campaign. A gate that silently misses a class of duplication is worse than one that fires, so
these close now rather than becoming a bound nobody carries.

All four sit in one function. Change nothing else.

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), HEAD `ea82419`, with your own CL5b
work in the working tree. Continue from it without restoring or resetting anything. Perform the
assignment directly and spawn nothing.

## The findings

1. **Interpolated property names are dropped, so a whole class of blocks is invisible.** The
   declaration pattern admits a custom property or a plain identifier, and neither alternative
   admits an interpolation, so a declaration whose **property name** is interpolated never enters
   a block. The bodies of the role-each mixin and the aliased loop in `src/styles/_mixins.scss`
   are recorded as zero-declaration blocks and dropped. Failure scenario: a future unit writes
   the same interpolated-property block in two partials and the sweep reports nothing while the
   rule is broken. Admit an interpolation inside the property group, or report a block whose text
   carries an interpolated property as unreadable rather than as empty. Whichever you choose, a
   case must pin it.

2. **Whitespace inside an interpolation is not folded while whitespace outside it is.**
   Interpolation tokens are appended raw and every other whitespace run is folded to one space,
   so two spellings of the same interpolation compare unequal. Failure scenario: a duplicated
   block is written in the second partial with different spacing inside an interpolation and the
   sweep stays green; nothing in this repository's gate chain normalizes SCSS spacing. Fold
   whitespace inside an interpolation the same way it is folded outside one, and pin it with a
   case.

3. **The parenthesis counter has no floor.** A single unmatched closing parenthesis drives the
   counter negative, and every guard that tests it for zero then fails for the remainder of that
   file, so the partial contributes no blocks at all with no diagnostic. The objective lane found
   no valid-SCSS construct that triggers it, which is why this is cheap insurance rather than a
   repair: clamp the decrement at zero. A case is optional here and an observation in your report
   is enough if you judge one artificial.

4. **The reported paths carry platform-native separators.** The discovery step returns a relative
   path, so a diagnostic reads with backslashes on this host and forward slashes elsewhere, and
   the reported file list differs by platform. No assertion breaks on it today. Normalize the
   separator to forward slashes so the diagnostic and the list are host-independent, and keep the
   existing cases green.

## Not yours

The audit raised two more and both are correct as shipped. Do not change either.

- The threshold of two identical declarations hides a single-declaration repeat that exists in
  the tree now: the per-level size loops in the heading partial and the type partial are
  byte-identical and contribute one declaration each. Brief 1 retained those loops deliberately
  and both pre-dispatch instruments used the same threshold. It stays.
- Same-file duplication is outside the sweep by construction, and a case pins that as expected.
  The rule names a pattern appearing in two partials, so this is faithful.

## Scope

Owned: `tests/setupConformance.ts` for the sweep function alone, and
`tests/setupConformance.test.ts` for the cases these findings need. Everything else stays as
briefs 1 and 2 left it, including `package.json`, which stays off-limits without exception.

## Execution

1. Findings 1 to 4, with a case for the first two and for the fourth.
2. Prove the first finding closes: plant a block of interpolated-property declarations in two
   partials the extractions never touched, confirm the sweep now reports it, remove the plant,
   and confirm the suite returns green.
3. The ordered chain from the checkout root: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test`, then the Edge runs of `test:src:styles`,
   `test:setup:browser`, and `test:app:browser` with `PLAYWRIGHT_CHANNEL=msedge`.

## Output

Write `cl5b-report-2.md` in the Veneer checkout and return it: each finding's change
with its site; the interpolated-property plant's red run and the green run after its removal;
which cases you added; the sweep's population, pairs, and result after the change; each step's
exit code and final lines on both engines; the actual `git diff --stat` and
`git status --porcelain --untracked-files=all`; every plant's removal. Keep it short.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol, with every stop condition briefs 1 and 2 carry.
Settle yourself: whether an interpolated property enters a block or marks it unreadable; how the
cases are written. **Stop and report** if closing a finding changes what the sweep reports on the
tree as it stands, or if it needs a file this brief does not grant.

## Acceptance criteria

1. A duplicated block of interpolated-property declarations is reported by the sweep, proved red
   then green with a plant.
2. Two spellings of one interpolation differing only in internal whitespace compare equal, pinned
   by a case.
3. The parenthesis counter cannot go negative.
4. The reported paths use forward slashes on this host, and every existing case stays green.
5. The sweep still reports no shared block on the tree as it stands.
6. Every gate exits 0 on managed Chromium and Edge.
7. The status lists the same paths as round 1, with no addition.
