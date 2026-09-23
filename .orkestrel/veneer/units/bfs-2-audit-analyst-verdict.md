# `analyst` verdict — B-FORMS-CLOSE-SPECIMENS (`bfs`), round 2, objective lane (GPT-6 Astra, session `01a0cd82-c22f-76a2-b6e1-bc457be66f59`)

Retained verbatim from `tmp/codex/bfs-2-audit-analyst-last.md`; launch journal `tmp/codex/bfs-2-audit-analyst.jsonl`, swept at acceptance.

---

1. **CONFIRMED** — The scope attack found no extra change. The live diff matches the retained diff byte-for-byte, and status matches [bfs-2-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/bfs-2-status.txt:1). The off-limits paths have no diff against `d02bd46`. The remarks change at [tests/setup.ts:292](/home/user/veneer-bfs/tests/setup.ts:292) is explicitly required by [bfs-brief-2.md:118](/home/user/veneer-bfs/tmp/units/bfs-brief-2.md:118), despite the narrower ownership shorthand.

2. **CONFIRMED** — The attack compared the prescribed sentences and the documented predicate with the implementation. The wording, date, and spinner path’s following noun are present at [tests/setup.ts:349](/home/user/veneer-bfs/tests/setup.ts:349), [tests/setup.ts:358](/home/user/veneer-bfs/tests/setup.ts:358), [tests/setup.ts:366](/home/user/veneer-bfs/tests/setup.ts:366), and [tests/setup.ts:390](/home/user/veneer-bfs/tests/setup.ts:390). The hanging paragraph at [tests/setup.ts:375](/home/user/veneer-bfs/tests/setup.ts:375) states the implemented boundary. The historical measurement identifies its subjects; it does not enumerate the registry’s membership.

3. **CONFIRMED** — The gate uses the parent’s geometry through the `requireValue` function, and the missing-button diagnostic names the hanging selector at [integration.test.ts:661](/home/user/veneer-bfs/tests/app/browser/integration.test.ts:661). The recorded readings distinguish the tooltip keys from progress, floating labels, and feedback. The recorded `top: 0` mutation produces an empty admitted set and fails the exact-key assertion; see [report-2.md:106](/home/user/scaffold/.orkestrel/veneer/units/b-forms-close-specimens-report-2.md:106).

   Independently executing the source’s assertion at [integration.test.ts:716](/home/user/veneer-bfs/tests/app/browser/integration.test.ts:716) with the installed matcher passed the declared membership and rejected empty membership, a missing dark key, and an extra hanging key. These assertions distinguish those mutations. Browser geometry was assessed from the supplied run, as instructed.

4. **BROKEN** — The rationale-alignment clause is false as written. The remarks at [tests/setup.ts:292](/home/user/veneer-bfs/tests/setup.ts:292) match the crop rationale at [integration.test.ts:637](/home/user/veneer-bfs/tests/app/browser/integration.test.ts:637). That rationale does not appear in the registry doc block. The report explicitly acknowledges this at [report-2.md:143](/home/user/scaffold/.orkestrel/veneer/units/b-forms-close-specimens-report-2.md:143). The smallest correction is to distinguish the addressing rationale’s alignment from the crop rationale’s alignment in the claim.

   The remaining fixes hold. The map uses the `limit` field and permits an undefined `hit` field. Executing the source filter and installed matcher rejected an undefined hit, a button hit, overflow, and absent overlap; the passing control remained green. The assertion diff displays the scenario and `hit: undefined`, although JSON serialization omits that field. See [integration.test.ts:614](/home/user/veneer-bfs/tests/app/browser/integration.test.ts:614) and [integration.test.ts:722](/home/user/veneer-bfs/tests/app/browser/integration.test.ts:722).

   The focus comment and paragraph match the prescribed text. The section assertion at [InputGroupSection.test.ts:29](/home/user/veneer-bfs/tests/app/browser/sections/InputGroupSection.test.ts:29) distinguishes rendered text that differs from the constant. It does not distinguish a wording regression made in the constant and rendered unchanged. That limitation is consistent with the claim’s stated comparison.

5. **BROKEN** — The changed comment at [integration.test.ts:713](/home/user/veneer-bfs/tests/app/browser/integration.test.ts:713) says “leaves `hit` undefined.” The code token has no following noun, contrary to [writing.md:48](/home/user/scaffold/.claude/rules/writing.md:48). Change this to “leaves the `hit` field undefined.” This is a prose defect; the undefined-hit assertion works.

6. **CONFIRMED** — `npm run check` exited **0**. A TypeScript AST inspection of the owned files found no forbidden assertions, explicit `any` types, or disallowed nested functions. The same inspection rejected an in-memory negative control containing those constructs. The suppression-pattern search over those files found no suppression. The installed browser declarations expose no point-in-rectangle equivalent; the `readHit` function answers a different question at [index.d.ts:2115](/home/user/veneer-bfs/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2115). The inline comparison at [integration.test.ts:677](/home/user/veneer-bfs/tests/app/browser/integration.test.ts:677) does not duplicate that helper. Off-limits paths remain unchanged.

Findings outside the claims: none.

Adjacent behavior: floating labels extend above their hosts and correctly fail the below-host predicate. A later hanging key whose positioned host is not its parent needs an explicit host resolution, an appropriate overlap target, and an updated expected membership. The present gate does not establish those conditions for future families.

VERDICT: FAIL 4, 5; outside the claims: none