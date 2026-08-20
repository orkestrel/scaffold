# Scaffold fix unit 1 audit — Opus 5 reviewer (cross-engine), 2026-08-20

Subject: the Sol fix unit at commit 0db3921, audited in the pinned worktree. Verdict summary; the
full per-claim evidence is in the session record.

- Factory deletion complete and lawful: CONFIRMED (whole-tree residue sweep clean;
  `createUpstreamServer` is a real fixture server, not a surviving pass-through; barrels and guide
  tables intact; no capability lost with the deleted TSDoc).
- The `remove` contract: BROKEN on prose only. types.ts:214 and Materializer.ts:382 still read
  "its foreign findings are the candidate set" — the exact drift SR14 named — while the mechanism
  beside them re-derives; types.ts:213 and Materializer.ts:381 carry the self-cancelling "plan
  whose foreign paths". The mechanism itself survived every attack: one shared `#derive` across
  `audit`, `repair`, and `remove`; no bypass into `#purge`; the comparison is a bijection over
  membership, group, and observed bytes; the preconditions survive.
- The fabricated-audit proof binds: CONFIRMED (the recorded red reading `expected undefined to be
  'TARGET'` is only reachable through the real defect; vacuous pass impossible).
- Report honesty: CONFIRMED (sandbox shortfalls all in the denial direction against the host's
  authoritative counts; one immaterial over-citation named).
- No canon regression: CONFIRMED (one `now` ruled permitted by sense; import-order divergence
  attacked and dropped — no rule owns specifier order).

VERDICT: FAIL — 1 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims

## Orchestrator rulings

- The broken prose goes to fix unit 3 (`tmp/fix3-brief.md`), a fully specified builder unit,
  serial after fix unit 2; its re-check folds into the Sol audit of fix unit 2.
- Referral one (the widened whole-call refusal over untracked and protected foreign findings) is
  ruled the intended contract: the preview is evidence of what the caller reviewed, and a preview
  stale anywhere is stale evidence for a destructive verb. Fix unit 3 states it in the prose.
- Referral two (whether a compiler-emittable plan can produce a protected foreign candidate, and
  what that means for the guard and the reworked fixture) is carried as an explicit claim in the
  Sol audit of fix unit 2.
