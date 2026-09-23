# Unit B-FORMS-CLOSE-TABLES (`bft`), round 2 — the audit's prose findings, the rule key helper, and the R9 pin

Successor to `b-forms-close-tables-brief.md` (round 1, which stays in place unedited). What changed
and why: round 1's audit (`bft-audit-verdict.md`) confirmed every code claim and faulted the prose
(claim 7), the returned guide paragraph (claim 8, which the Orchestrator lands), and found F1 (the
helper's TSDoc is false) and F2 (the rule key format rebuilt at every caller); referral b asks for a
proof pinning the R9 exclusion. This round carries exactly those.

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bft` (the round-1
worktree over `d02bd46`, holding round 1's uncommitted writes, which this round builds on and never
discards; `dist/` is built). Perform the assignment directly and spawn nothing. Use absolute paths
under `/home/user/veneer-bft`, run every npm and npx command from there, and run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Do not commit, push, install, run `corepack use`, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The faulted sentences carry the lanes' exact text, `renderRuleKey` is the one home of the rule key
format with the helper and the range and text-control Node cases routed through it, the R9 exclusion
is pinned by a planted in-memory case, and the gates in § Acceptance criteria are green.

## Context

**Evidence.** The findings and their sites (locate each by the quoted text; lines are approximate at
round 1's tree):

```text
tests/setupStyles.ts:3622            "and `condition` names the at-rule the twin sits under."
tests/src/styles/components/form-range.test.ts:109   "and `findRule` returns the first rule a selector reaches"
tests/setupServer.ts:1370            "@param blocks - The cascade's blocks, as {@link readCascadeBlocks} reads them."
tests/setupServer.test.ts:2051       "// Two rules under one key merge, and the later declaration of a property replaces what the"
tests/src/styles/components/input-group.test.ts:252-253   "// The last box holds the same control and select outside a group, each the radius its own\n// kind's kept corner is read against, and a span resolving `--bs-border-radius` on its own."
tests/setupServer.ts:1367            "Collects the custom properties each declaration of a compiled cascade reads, rule by rule."
tests/setupServer.ts:1371-1374       "@returns One entry per rule, in written order, keyed by the selector for a rule under no\n *   condition and by the selector, a space, and the condition otherwise. Each entry maps every ..."
tests/setupServer.ts:1388-1389       the key expression inside collectDeclarationReads
tests/setupStyles.test.ts:1802-1807  `keyed` and `cased` in the range Node case; :1838-1839 the loop key
tests/setupStyles.test.ts:1874-1879  `keyed` and `cased` in the text-control Node case; :1910-1911 its loop key
tests/setupStyles.test.ts:1825-1833  the R9 filter (`conditions.has(normalizeMediaCondition(block.condition))`)
tests/setupStyles.test.ts:2702,2708  the floating case's key expressions (off-limits: B-FORMS-LABEL carries them under R6)
tests/conformance.test.ts:189-226    the planted-literal case (the pattern for an in-memory cascade edit)
```

The input-group inventory records no conditioned rule, so its selector-alone lookup stays as it is.
The verdict is `/home/user/scaffold/.orkestrel/veneer/units/bft-audit-verdict.md`; the lane
verdicts sit beside it.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,writing,architecture}.md`. Skill: none.
Guide: none owned (the Orchestrator lands the guide paragraph).

**Installed primitives.** `@orkestrel/test` and `@orkestrel/contract`, as in round 1; no installed
export renders a selector-and-condition key.

**Host.** As round 1. **Measurements.** Read the current text at each site before editing; the
round-1 diff moved lines. **Control identifiers.** 7a–7e, F1, F2, R9, referral b. Name a test for
what it proves. **Standing conditions.** The worktree is dirty with round 1's writes by design.

## Unknowns

none.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.ts`,
`tests/setupStyles.test.ts`, `tests/src/styles/components/form-range.test.ts`,
`tests/src/styles/components/input-group.test.ts`, `tmp/units/bft-report-2.md`.

**Shared (report-only).** `tests/conformance.test.ts` (round 1's case stays as it is),
`guides/veneer.md`, `ROADMAP.md`.

**Off-limits.** The floating case's key expressions in `tests/setupStyles.test.ts` (around lines
2702 and 2708) and `FORM_FLOATING_CASES`; `src/**`; `app/**`; `tests/setup.ts`; `tests/app/**`;
every other `tests/src/**` file; the paths `scaffold repair` restores; every file not named in
Owned.

**What asserts the state this change ends.** The five sentences (Owned); the helper's TSDoc (Owned);
the key expressions in the helper and the two Node cases (Owned); the setupServer exports case,
which lists the exports and must gain `renderRuleKey` (Owned).

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bft-report-2.md`: the diff summary against round 1 (`git diff --stat` and the
status), each criterion with its command and result line, the failing-first evidence for the
planted case and the helper's proof, and the claims you flag as weakest. Return the same content as
your final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — where a
quoted site is not found or a criterion needs a file outside Owned. Decide, record, and carry on
for the helper's TSDoc wording beyond the quoted sentences, the planted case's title, and where it
sits.

## Acceptance criteria

1. The five sentences carry this exact text:
   - `tests/setupStyles.ts`: "and the `condition` field names the at-rule the twin sits under."
   - `form-range.test.ts`: "and the `findRule` helper returns the first rule" (the rest of the
     sentence unchanged).
   - `tests/setupServer.ts` `@param blocks`: "The cascade's blocks, as the {@link readCascadeBlocks}
     helper reads them."
   - `tests/setupServer.test.ts`: "Rules under one key merge, and the later declaration of a
     property replaces what the earlier one read, so a token overwritten by a literal no longer
     reads as bound." (rewrapped at the file's width).
   - `input-group.test.ts`: "The last box holds the same control and select outside a group, whose
     corners are the radius each kind's kept corner is read against, and a span that resolves the
     `--bs-border-radius` variable on its own." (rewrapped; the following sentence unchanged).
2. The helper's TSDoc summary reads "Collects the custom properties each declaration of a compiled
   cascade reads, keyed by selector and condition." and its `@returns` opens "One entry per selector
   and condition, in the order each key is first written, keyed by the selector for a block under no
   condition and by the selector, a space, and the condition otherwise." with the rest of the tag
   unchanged.
3. `tests/setupServer.ts` exports `renderRuleKey(rule: Pick<CascadeBlock, 'selector' | 'condition'>): string`
   beside `collectDeclarationReads`, with a TSDoc summary and an `@remarks` naming it as the lookup
   contract of `collectDeclarationReads`; `collectDeclarationReads`, the range Node case's `keyed`,
   `cased`, and loop key, and the text-control Node case's `keyed`, `cased`, and loop key route
   through it, and no `condition === undefined ? ... : \`${...} ${...}\`` expression remains in those
   sites (the floating case keeps its own); `tests/setupServer.test.ts` tests it (a rule under no
   condition renders its selector; a rule under a condition renders the selector, a space, and the
   condition) and lists it in the exports case. Failing-first: run the setupServer proof before the
   export exists and record the red count.
4. `tests/setupStyles.test.ts` gains a case, named for what it proves, that takes the real expanded
   cascade in memory, appends inside a `@layer components` block a `.form-range:focus { outline: 1px solid red }`
   rule under `@media (forced-colors: active)` and asserts the range case's filtered written keys
   (the same filter, on the same inventory conditions) still equal the inventory's keyed range
   rules, then appends the same rule under `@media (prefers-reduced-motion: reduce)` and asserts the
   filtered keys gain `.form-range:focus @media (prefers-reduced-motion: reduce)` (or the key
   `renderRuleKey` renders for it). Extract the filter into an exported helper in
   `tests/setupServer.ts` only if the case and the Node case would otherwise duplicate it; test any
   helper you export. Mutation: deleting the `conditions.has` filter reddens the first assertion.
   Record the failing-first run.
5. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
6. `npm run test:setup` exits 0 and the scoped styles run over `input-group.test.ts` and
   `form-range.test.ts` exits 0.

**Observations, not criteria.** `npm run test:conformance`; the whole `npm run test:src:styles`.

## Review evidence

The diff against `d02bd46` (`git diff`) and the status, this report, and round 1's records.
