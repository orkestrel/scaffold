# Unit CL4 — fix round (brief 7)

Succeeds `cl4-brief-6.md`, which with briefs 5 to 1 beneath it stays in force for
everything this brief does not name. All six are left unedited. What changed and why: round 1's
audit (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl4-audit-verdict.md`)
confirmed every claim on the lanes that could rule on it, the verifier's chain is green on both
browsers, and four findings come back to you. Three force this round.

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), HEAD `d822d59`, with your own CL4
work in the working tree. Continue from it without restoring or resetting anything. Perform the
assignment directly and spawn nothing.

## The findings

1. **The hardcoded boundary (reviewer 10).** `src/styles/elements/_fieldset.scss` writes
   `@media (width >= 1200px)` for the legend's size step. CL2 landed `breakpoint-up($name)` over
   the single Sass source of the ramp precisely so a published token and the condition that
   switches at it cannot name two different widths, and ten other partials already load the
   mixins with `@use '../mixins' as *`. Read `breakpoint-up(xl)` instead. The resolved legend
   size at both sides of the boundary is unchanged: prove that with readings before and after.

2. **The repeated declaration patterns (analyst 10 and reviewer 11).** Two blocks are written
   verbatim in more than one partial:
   - `margin: 0; font-family: inherit; font-size: inherit; line-height: inherit` in
     `_input.scss`, `_select.scss`, `_optgroup.scss`, and `_textarea.scss`;
   - `border-color: inherit; border-style: solid; border-width: 0` in `_table.scss` and
     `_tr.scss`.
   `.claude/rules/styles.md` moves a pattern shared by two partials into `_mixins.scss`, and the
   repository already applies that to this class through `code-text`, `script-text`, and
   `list-space`. **This brief grants `src/styles/_mixins.scss`** for the mixins these two blocks
   need and for nothing else. Name each for what it emits, in the file's existing style; keep
   each partial's own selector and its distinct declarations; the emitted cascade and every
   resolved reading are unchanged, which your proofs must show with no expectation edited.

   Then **sweep every pair of partials under `src/styles/elements/`**, not only the ones you
   wrote: CL3's text partials are in the same folder and the rule is folder-wide. Extract each
   shared block of two or more identical declarations the same way, and report the sweep's
   population, its pairs, and its result. The grant covers any partial the sweep changes. CL3's
   own sweep under its brief 5 found none among its files, so a hit there would be a pair that
   only exists now that your families landed.

3. **The unproven focus rule (reviewer 12).** `src/styles/elements/_button.scss` ships
   `button:focus:not(:focus-visible) { outline: 0 }`, and no proof reads it: the button proof's
   outline reading is taken after the button has become focus-visible, which is the state that
   rule excludes. Add a case that puts a button in a focused, not-focus-visible state and reads
   the outline, so changing that value reddens. If the receipts cannot produce that state
   reliably, say so with the reading you took and record the rule as unprovable on them rather
   than asserting something weaker that passes.

4. **The two silent departures (reviewer 13).** `_table.scss` adds `colgroup` to Bootstrap's
   border-reset group, which Bootstrap's own group does not carry, and `_tr.scss` keeps
   `text-align: inherit` on `th` without Bootstrap's `-webkit-match-parent` fallback. Your report
   calls both partials retained. Either match Bootstrap or record each as a departure row in the
   guide beside the existing cell row, and say which you chose. Both are inert on the managed
   receipts, so this is about the record telling the truth.

## Scope

Briefs 1 to 6's owned set, plus `src/styles/_mixins.scss` for finding 2 alone, plus any partial
under `src/styles/elements/` the sweep changes. Everything else stays off-limits, including
`tests/setupConformance.ts`, `src/styles/_reset.scss`, `_tokens.scss`, `tests/fixtures/**`, and
the vendored files.

## Execution

1. Finding 1, rebuild, and read the legend's resolved size on both sides of the boundary before
   and after.
2. Finding 2, rebuild, and run the styles suite: every proof green with no expectation edited.
   Then the sweep, recorded.
3. Finding 3, with the red proof first if the state is reachable.
4. Finding 4, with your choice recorded.
5. The gate chain of brief 1's item 6, to the end, including both Edge runs.

## Output

Write `cl4-report-6.md` in the Veneer checkout and return it: per finding the change
as landed with its site; the legend readings before and after; each new mixin's name and
members; the sweep's population, pairs, and result; the focus case and what it reads, or the
reading that shows the state is unreachable; your choice on the two departures; the
red-then-green pairs; each gate's exit code and final lines on both engines; the actual
`git diff --stat` and `git status --porcelain --untracked-files=all`; every plant's removal.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol, with every stop condition briefs 1 to 6 carry.
Settle yourself: each mixin's name; how the sweep is recorded; the focus case's mechanism.
**Stop and report** if the sweep finds a shared block whose extraction would change a resolved
reading, or if closing a finding needs a file this brief does not grant.

## Acceptance criteria

1. No `src/styles/**` file writes a breakpoint width as a literal; `_fieldset.scss` reads the
   mixin, and the legend's resolved sizes are unchanged.
2. No two partials under `src/styles/elements/` share a block of two or more identical
   declarations; the sweep is recorded.
3. The non-visible focus rule is proven, or its unprovability is recorded with a reading.
4. The two departures are matched to Bootstrap or recorded in the guide.
5. Every gate exits 0 on managed Chromium and Edge.
6. The status lists only the files this brief and its predecessors own.
