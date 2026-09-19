# Fix-round closure — mechanical conformance check over units S4-3 and S5-2

## Role and engine

`checker` on Claude Sonnet, a native Claude subagent with `Read`, `Grep`, and `Glob` and no shell.
You read the tree at the tip the dispatch message names and report mechanical facts; you rule on
nothing subjective, and you edit nothing.

## Subject

The scaffold checkout `C:/Users/mikes/WebstormProjects/scaffold` at the tip the dispatch message
names, carrying units S4-3 (`.orkestrel/campaign/s4-report-3.md`) and S5-2
(`.orkestrel/campaign/s5-2-report.md`). The round they close: `.orkestrel/campaign/s-fix-audit-verdict.md`.
This check is one of the three closure instruments that verdict names; the other two are the
Orchestrator's reproduction and the units' own red-and-green control readings.

## Criteria — report each as MET or UNMET with the matching lines quoted

1. `grep -rn "replaces a code point above" .agents/transports/codex.md` matches nothing;
   `grep -n "cannot represent" .agents/transports/codex.md` matches one sentence in § Sol route.
2. `grep -rn "Record the exact command and its failing count\|discards working-tree state\|costs a journey nothing\|share one title\|not evidence until\|CAPTURE=1" .agents/skills/orkestrel-prove-journey`
   matches nothing.
3. In `.agents/skills/orkestrel-prove-journey/references/layer.md` § Import, never implement, the
   activation of the browser setup runtime orders: write `tests/setupBrowser.test.ts`, add
   `npm run test:setup:browser` to the `test` chain, run `scaffold repair` — in that order, with
   the refusal named for the other order. `SKILL.md` → Import the journey layer carries a pointer
   to that section and no second statement of the order.
4. The named bans in `layer.md` either scope the router-navigation ban to a journey step or name
   cleanup as the exemption, and the cleanup instruction that returns the route to its entry is
   consistent with it.
5. `ROADMAP.md` row 36 names `src/core/templates.ts` beside the emitted `configs/browsers.ts`
   path, and no other row moved (compare the row texts against `.orkestrel/campaign/s5-report.md`
   § The exact text landed and `git show 24285b95:ROADMAP.md` is unavailable to you — compare
   against the S5-2 report's diff instead).
6. `grep -n "declared size" src/core/templates.ts .agents/skills/orkestrel-prove-journey/SKILL.md guides/scaffold.md ROADMAP.md`
   matches `src/core/templates.ts` alone.
7. Every reference `SKILL.md` names under `references/` exists, no unnamed Markdown file sits in
   that directory, the directory holds only `SKILL.md`, `agents/openai.yaml`, and `references/`,
   and `.claude/skills/orkestrel-prove-journey/SKILL.md` carries the canonical `name` and
   `description` verbatim and names the canonical path.
8. A count sweep over `SKILL.md` and the references for `\b(two|three|four|five|six|both)\b` in
   prose (outside code spans and fences): every hit names its members in the same sentence or
   is a sample value; quote each hit and rule it.
9. In `guides/scaffold.md`: the classifier-bound sentence names the bound both loops honour; the
   chain sentence says the question fires when no chain from `test` reaches
   `npm run test:journey`; the one-question sentence is followed by the earliest-fact-first
   clause; the `ScriptInvocations` and `scriptToInvocations` Summary cells equal the doc blocks
   in `src/bin/types.ts` and `src/bin/helpers.ts` (quote both).
10. `src/bin/helpers.ts` `scriptToInvocations` reads `-c` beside `--config` and `--config=`
    (quote the branch lines); `src/bin/CLI.ts` `#projectQuestion` skips a `test:*` script whose
    text does not name `vitest` in the configuration arm (quote the line), and the
    missing-invocation arm tests membership in a transitive walk from `test` rather than
    `scripts.test`'s direct invocations (quote the lines); the absent-configuration advisory's
    remedy names the chain invocation (quote the template literal).
11. `tests/setupServer.ts`'s specifier-reading TSDoc names `import.meta.resolve`, and
    `tests/setupServer.test.ts` carries a case for it.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Edit
nothing.

## Output

Return, as your final message and nothing else: one line per criterion, `MET` or `UNMET`, each
with the quoted lines it rests on (file:line), and a terminal line `CHECK: PASS` or
`CHECK: FAIL <criteria>`.
