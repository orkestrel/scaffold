# Unit UTIL-DISPLAY (`ud`) — round 3, the mechanical fix round

Supersedes `ud-brief-2.md` for this round; the earlier briefs stay in place unedited. This brief carries every finding `ud-audit-2-verdict.md` § Reconciliation names, each from the lane verdicts beside it (`ud-audit-2-objective-verdict.md`, `ud-audit-2-subjective-verdict.md`, `ud-audit-2-checker-verdict.md`).

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in the worktree `/home/user/veneer-ud` (branch `unit/ud`, the round-1 and round-2 writes uncommitted over `e4e6a40`). The executor that opens this brief is that subagent. Every edit here is specified exactly; a choice this brief does not make is not the unit's to make.

## Objective

Every finding of round 2 is closed in the owned files and in a revised shared patch `tmp/units/ud-shared-3.patch` (one unified diff against `e4e6a40`, with an `index` line per file, superseding `tmp/units/ud-shared-2.patch` whole), with every proof still distinguishing its mutation and every gate green on the landing copy.

## Context

Everything in `b-utilities-ud-brief.md` § Context and `ud-brief-2.md` § Context binds unchanged. The round-2 report is `/home/user/scaffold/.orkestrel/veneer/units/b-utilities-ud-report-2.md`; the round-2 instruments are under `/home/user/scaffold/.orkestrel/veneer/units/ud-instruments-2/` and the worktree's `tmp/units/ud-instruments-2/` (`tools/mutate.py`, `tools/record.sh`, `tools/gates.sh`, `tools/apply-check.sh`); rebuild the landing copy `tmp/probe/land` the way the round-2 report describes, apply the round-2 patch, copy the owned files in, and make the edits below there and in the owned files. Run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` first in every shell.

## Findings to close

1. **The label loop** (`tests/app/browser/sections/FlexSection.test.ts`, the render case, around line 61). Replace the `requireValue(region.querySelector(...))` block with:
   ```ts
   const elements = [...region.querySelectorAll(`[data-specimen="${name}"] ${context}.${label}`)]
   expect(elements, `No ${label} element in ${name}`).not.toEqual([])
   for (const element of elements)
   	expect([element, ...element.children].map((node) => node.textContent)).toContain(label)
   ```
   Add the mutation `label-trailing-bare` to `tools/mutate.py`: the fill row's last `flex-fill` item relabelled `Fill` in `app/browser/constants.ts` (class unchanged). Record it through `tools/record.sh` red on the Flex render case, and record the unmutated control green beside it.
2. **The `families` matrix** (`FlexSection.test.ts` around lines 47 to 56). Move it to `tests/setupStyles.ts` directly after `FLEX_RESTING_VALUES` as `FLEX_FAMILY_CASES`, a frozen list of `{ name, context, properties }` rows (`readonly properties: readonly string[]`), with TSDoc in the file's form ("Lists …"); add it to the import list, the export-list case, and the freeze assertions in `tests/setupStyles.test.ts`; import it in `FlexSection.test.ts` and restate no row.
3. **The binding case** (`tests/setupStyles.test.ts`, the case `binds the display values, the vertical-alignment positions, and the flex entries to the inventory`). Establish the flex prefix population independently of `FLEX_ENTRY_CASES`: read the inventory's unconditioned rule names, derive the set of prefixes from the names matching `^\.(flex|justify-content|align-items|align-content|align-self|order)-`, taken as the text before the last hyphenated value segment as the existing derivation does for each entry, and assert `FLEX_ENTRY_CASES.map((entry) => entry.prefix)` equals that set sorted (each prefix once). Keep every existing assertion. Add the control `flex-prefix-omitted` (the whole `order` entry removed from `FLEX_ENTRY_CASES`) under `logs/setup/`, red on the binding case alone, and re-run the round-2 controls and the control green.
4. **The interface's TSDoc** (`tests/setupStyles.ts`, `FlexRestingValue`). Replace its doc block and members with:
   ```ts
   /** Carries the inline declaration a flex proof rests an element on, beside the value a computed style reports for it. */
   export interface FlexRestingValue {
   	/** Holds the value the proof writes inline on the element. */
   	readonly declared: string
   	/** Holds the value a computed style reports for that declaration. */
   	readonly computed: string
   }
   ```
5. **The count** (`app/browser/constants.ts`, the `FLEX_SPECIMENS` remark, "so three items overflow one line at every width"). Write "so the items overflow one line at every width". In the same remark, add after the convention sentence: "The wrap specimen's items carry the `flex-shrink-1` class as a supporting class that lets the column classes size them, not as a demonstrated one, so they keep their prose labels."
6. **The describe title** (`tests/src/styles/utilities/vertical-align.test.ts`, around line 12). `'vertical alignment utilities'` becomes `'vertical-alignment utilities'`.
7. **The report.** This round's report states no count of a growable set ("both commands" becomes "the styles and sections commands"; no tally of an unnamed set anywhere), names no list item by its position, states the label proof's coverage as what the assertion reads (every element carrying a demonstrated class), and records each gate's command and result line with its retained log under `tmp/units/ud-instruments-3/logs/`.

## Unknowns

None.

## Scope

As `b-utilities-ud-brief.md` § Scope: the same owned files; the same shared files, report-only, returned as one patch `tmp/units/ud-shared-3.patch` with index lines; the same off-limits files. No commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only; the landing copy under `tmp/probe/` is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-ud/tmp/units/ud-report-3.md` with: each finding's site, before, and after; the added mutation and control with their logs; the scoped gate exits with their commands on the landing copy (`format:check`, `lint:check`, `check`, `build:src`, the styles proofs over `display.test.ts`, `flex.test.ts`, `vertical-align.test.ts`, and `stacks.test.ts`, the section proofs under `--project app:browser` with `Showcase.test.ts` and `index.test.ts`, `test:setup`, `test:conformance`, `test:guides`, `test:policy`), each with its log; the exact patch; every deviation; and a closing list of what the unit could not close. Delivered as that file plus the same text as the final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Decide, record, and carry on from a log's name and the exact regular expression the prefix derivation uses where the one given does not match the inventory's names; stop on any other choice, on a proof whose reading changes, and on a disagreement between this brief, the earlier briefs, and the tree.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 on the landing copy.
2. The styles proofs exit 0 with the round-2 case titles (the retitled describe aside), and the section proofs exit 0 with `label-trailing-bare` logged red and the control green.
3. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` exits 0, `flex-prefix-omitted` is logged red on the binding case alone, and each round-2 control still reads red.
4. `test:conformance`, `test:guides`, and `test:policy` exit 0 on the landing copy.
5. The report carries every item of § Findings to close with its site, before, and after, and the patch applies to `e4e6a40` with `git apply --check`.

## Review evidence

`git -C /home/user/veneer-ud status --porcelain` and the owned files' diffs, captured by the Orchestrator at hand-back as `ud-3.diff` and `ud-3-status.txt`, plus the report and the patch.
