# Unit S5-2 — successor to `.orkestrel/campaign/s5-brief.md`

Read `.orkestrel/campaign/s5-brief.md` first and in full; it stays unedited, and every section of it binds
here except where this file changes it. **What changed and why:** S5 landed (`.orkestrel/campaign/s5-report.md`,
checkpoint `24285b95`); the fix-round audit (`.orkestrel/campaign/s-fix-audit-verdict.md`, lane
reports beside it) broke the `setup:browser` activation order, the cp1252 paragraph's opening
clause, and four surviving restatements, and found three defects outside the claims. Each carries
an Orchestrator reproduction or a read the verdict cites. This round adopts the prescribed
sentences. Unit S4-3 (`sol`) lands the generator half before this unit: the chain arm becomes
transitive, the configuration arm is bounded to Vitest scripts, and the absent-configuration
advisory's remedy names the chain invocation; read `.orkestrel/campaign/s4-report-3.md` for the landed
wording before quoting any `scaffold audit` message.

## The items to land

1. **The `setup:browser` order (claims 13, 17).** Measured by the Orchestrator
   (`.orkestrel/campaign/s-fix-audit-reproduction/f2-repair-setup.json`): with
   `tests/setupBrowser.test.ts` written and `test` not yet invoking `npm run test:setup:browser`,
   `scaffold repair` exits 1 with "The configs group is blocked because the manifest at `<target>`
   does not reach a Vitest project the planned configuration registers: setup:browser. No chain
   from test invokes it. test:setup:browser is not declared, so the script is missing as well as
   the gate: declare it and invoke it by name from the test chain. Exclude configs from --groups
   to write another group." With the invocation added first, `repair` exits 0, registers the
   project, and appends the script (`f2-repair-setup-2.json`). Rewrite the activation so its order
   is: write `tests/setupBrowser.test.ts`, add `npm run test:setup:browser` to the `test` chain,
   then run `scaffold repair`; name the refusal a reader meets in the other order. Land the rule in
   `references/layer.md` → Import, never implement, and leave a pointer in `SKILL.md` → Import the
   journey layer (item 6 folds F-C into this one). The journey axis keeps its own order (write the
   wrapper, run `scaffold repair`, add `npm run test:journey` to the chain, or add the chain first);
   state that `scaffold audit` reports the missing invocation only when no chain from `test`
   reaches `test:journey`, in S4-3's wording.
2. **The cp1252 paragraph (claim 14).** Replace the opening clause "On a Windows host a
   text-encoding shell write replaces a code point above `0x7F`" with the hazard and its bound:
   on a Windows host a shell write that decodes and re-encodes text can replace a code point the
   active code page cannot represent. Keep the action, the report the unit owes, and the review
   criterion as landed.
3. **Restatements and explanations (claim 15).** Delete `SKILL.md:312-313` (the
   command-and-count recording sentence; `:304-305` carry the directive and the pointer). Delete
   `SKILL.md:318` ("Never reach for a command that discards working-tree state"), which restates
   `.agents/orchestration.md` § Permission floor. Rewrite `references/layer.md:70-71` as the
   pointer alone, without the paraphrase. Delete the reassurance clause at
   `references/styles.md:111-113` (the control-drift explanation) and keep its directive. Rewrite
   `references/captures.md:86-87` as a triggered instruction or delete it.
4. **The cleanup route reset (F-A).** `references/layer.md:326` instructs returning the route to
   its entry in cleanup while the ban at `:276` forbids a navigation performed by a router call.
   Scope the ban to a journey step, or name cleanup as the exemption beside `:326`; one of the two,
   stated once.
5. **ROADMAP row 36 (F-B).** Name the source site (`src/core/templates.ts`, the `configs/browsers.ts`
   template) beside the emitted path, so a reader of this repository can open the home the row
   names.
6. **One home for the setup-module rule (F-C).** Folded into item 1: the rule lives in
   `references/layer.md` → Import, never implement; `SKILL.md` → Import the journey layer keeps a
   pointer and no second statement.

## Scope, as changed

**Owned.** S5's owned list, unchanged. **Off-limits.** As S5 states, plus `guides/scaffold.md`
this round (S4-3 owns it).

## Controls

`S5-2-C1` — `grep -n "replaces a code point above" .agents/transports/codex.md` matches nothing,
and `grep -n "cannot represent" .agents/transports/codex.md` matches the rewritten sentence.
`S5-2-C2` — `grep -rn "Record the exact command and its failing count\|discards working-tree state" .agents/skills/orkestrel-prove-journey`
matches nothing. `S5-2-C3` — the order sentence: `grep -n "test:setup:browser" .agents/skills/orkestrel-prove-journey/references/layer.md`
shows the chain invocation before `scaffold repair` in the activation, and `SKILL.md` carries the
pointer and no second statement of the rule (`grep -c "tests/setupBrowser.test.ts" SKILL.md`
reports the pointer's line alone, with the Accept bullet). `S5-2-C4` — `npm run format:check`,
`npm run test:policy` exit 0; the term sweep from S5 (`.orkestrel/campaign/s5-instruments/s5-terms.mts`) reports zero
`BANNED` lines over the owned files, judged hits ruled. Name a probe for what it proves, never for
the control label.

## Everything else

The Output (`.orkestrel/campaign/s5-2-report.md`), the Deviation contract, the Execution line, and the
Review evidence sections stand as S5 states them. Baseline: the checkpoint the dispatch message
names, carrying S4-3 with the Orchestrator's gate reading green.
