# U3 audit round 2 — successor to u3-audit-brief.md; the closing round

Subject: commit `ed1aade` (chain 9fba674 → [a9c425c U6, separate unit] → ed1aade), the U3 fix
round's diff. Sol wrote both U3 rounds, so both lanes run on Opus. Decides U3 ACCEPTANCE and
whether U5 binds to `operator.notice` and `store.pointer`.

## Already established (Orchestrator-verified)

- Round 1: claims 1, 3 confirmed by both lanes; claim 4's key arithmetic settled safe by Sol's
  length-bound argument; claims 2, 5, 6, 7 broken and carried into the fix (u3-brief-2.md).
- At `ed1aade` (Orchestrator-run): src 232/232; app chain 627/628 with the single red proven a
  load flake (solo re-run green, beside a concurrent bench exec); policy 17/17; guides red is
  the expected 6 (consume rows gone, pointer-seam/notice rows joined — U7's carrier).
- The checker's round-1 import finding was REFUTED by the Orchestrator (the relative import IS
  the harness convention keeping Vue out of the Node project) — do not re-raise it.

## Review evidence

Diff: run `git -C /workspace/supervisor diff 9fba674..ed1aade -- ':(exclude)app/browser/components/LoginPanel.vue' ':(exclude)tests/app/browser/components/LoginPanel.test.ts'`
mentally scoped — or read `git show ed1aade` directly (the U3-fix commit alone). Writer report
`/home/user/scaffold/tmp/codex/u3-fix1-last.md`; briefs `u3-brief.md`, `u3-brief-2.md`; round-1
verdicts context in `u3-audit-brief.md`; gate log `u3-gates.log`; the tree at `ed1aade`.

## Claims — attack the fix round's own decisions

1. **The notice is now a fact.** Reactive (`shallowRef`-backed readonly), repeat-safe, tracked by
   watchers; cleared by successful open/login/logout and superseded by a new restore attempt; the
   stale-notice probe survives as a permanent named test; no `consume` remnant anywhere.
2. **The completed-open predicate is truthful.** `#armed` moves after the tail establishes; the
   false-success probe (tail refusal after successful inspect → fault AND notice, pointer
   retained) survives as a permanent test; no ordering where a half-open reads as success.
3. **The pointer policy is the ruling.** ABSENT/FORBIDDEN clear; REQUEST/CONFIG retain (four-code
   table test); the real-server transport-loss journey proves resume-after-blip; logout removal
   failure surfaces through the logout fault; the page-local suppression means a same-page login
   never consults the pointer after logout regardless of storage; suppression resets on the next
   successful save; the refusing-removeItem probe survives as a permanent test.
4. **The seam is sound and complete.** `pointer: OperatorPointerInterface` (readonly sub-entity,
   required) on all FOUR implementers; no optional member, no `?.` on the contract, no synonym
   triad left on `OperatorStoreInterface`; `POINTER_KEY` is its own constant in the designated
   constants file and cannot collide with view keys; `factories.ts` prose true; `#resume` named
   and documented; types.ts member order sane.
5. **Accept U3.** Nothing regressed round-1-confirmed properties (restore via ordinary open;
   logout/expiry line; key arithmetic); U5 binds to `notice` + the shell-rendered reason;
   exit criterion 3's mechanism is complete with rendering owed by U5 as planned.

## Threshold

Closing round. Findings outside claims at the BROKEN standard only. Verdict shape per
`/workspace/supervisor/.agents/skills/orkestrel-falsify/SKILL.md`; one terminal line. No process
diary. A concurrent read-only bench exec is auditing LoginPanel — not your subject; ignore those
two files entirely.
