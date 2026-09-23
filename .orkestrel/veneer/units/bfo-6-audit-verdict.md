# B-FORMS-CONTROL round-6 audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `bfo-6-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`bfo-6-audit-analyst-verdict.md`, session `01a0cd20-d037-7a71-8e49-921a2bb634b3`, journal swept
at acceptance; FAIL 2 with STALE-RADIUS-COMMENTS outside the claims), `reviewer` on Opus 5.5
(`bfo-6-audit-reviewer-verdict.md`, FAIL 2, 4 with STALE-ROUNDING-FIXTURE and STALE-OUTER-COLUMN
outside the claims), and `checker` on Sonnet (`bfo-6-audit-checker-verdict.md`, PASS). Every lane
ran; none empty. The writer was `builder` on Sonnet, so both Opus and Astra are auditors that did
not write the work.

## Rulings per claim

1. **CONFIRMED** (all three lanes).
2. **BROKEN** (both lanes, on the same site): the two edited sentences hold against the compiled
   cascade, and the later paragraph of § Input group classes (around line 1351) still says the text
   control and select classes carry no radius of their own, that the proof supplies one from a
   consumer rule, and that the floating wrapper is a plain box, which the `control-border` mixin's
   `border-radius: var(--bs-border-radius)` (the analyst's in-memory compile) and the shipped
   `_form-floating.scss` rules make false. That sentence has been false on Veneer `main` since
   B-FORMS-MIXIN landed (`5b5e714`) and is the D31 item `ROADMAP.md` § Carriers already assigns to
   B-FORMS-CLOSE (the `INPUT_GROUP_ROUNDING` fixture and the consumer-radius sentence). Ruled per
   the reviewer's referral: the fixture is retired, not rewritten, because the components layer
   outranks the elements layer and the fixture no longer reaches either class; retiring it changes
   test code, so the carrier stays B-FORMS-CLOSE, and the floating-wrapper sentence joins that row
   at this landing's fold (fold 32). The round accepts with the finding carried, not dropped.
3. **CONFIRMED** (both lanes; the pointer "the range slider case" resolves to the case that states
   the reason, the `width: 1%` scope matches `_input-group.scss`, and no changed comment carries
   `below`).
4. **CONFIRMED** (the analyst's `npm run check` on the prescribed npm PATH exited 0; the reviewer's
   UNRESOLVED is the claims file addressing the run to the objective lane, dropped on the record).

## Findings outside the claims and referrals

- **STALE-ROUNDING-FIXTURE** / **STALE-RADIUS-COMMENTS** (both lanes): the `INPUT_GROUP_ROUNDING`
  doc block in `tests/setupStyles.ts` and the comment in the input-group proof's corner case say
  the classes carry no radius until the control family lands. Carrier: B-FORMS-CLOSE, the same D31
  row (the fixture's retirement removes the doc block, and the comment is rewritten with it).
- **STALE-OUTER-COLUMN** (the reviewer): the input-group focus case's comment keeps the
  browser-border model ("paints over the outer column of that border"). Carrier: B-FORMS-CLOSE,
  recorded in the fold-32 row; the reviewer's text ("so the button's leading border paints over
  that border until the control is lifted past it") is the prescribed replacement.
- **Permission floor** (the reviewer's referral, confirmed by the Orchestrator): the writer did not
  apply the npm 11 `PATH` the brief's Host row names, hit the manifest's `devEngines` pin, and ran
  `corepack use npm@11`, which fetched npm 11.20.0 into the corepack cache and wrote a
  `packageManager` field into `/home/user/scaffold/package.json`, outside its worktree. The
  Orchestrator reverted that exact line (the scaffold tree is clean) and read the worktree's
  `node_modules/.package-lock.json` and `package-lock.json` timestamps at 06:53, before the round,
  so the install did not move. The writer's gate exit codes came through npm 11.20.0, the pinned
  major; the analyst's independent `npm run check` and the landing chain settle the gates on the
  canonical toolchain. Recorded as a writer deviation; the next builder brief names the PATH export
  as the first command rather than by reference to an earlier brief.

Every finding has a carrier; nothing dropped without record. Rounds 5 and 6 are accepted for
landing on the session branch as one commit after `f82de43`.

VERDICT: FAIL 2; outside the claims: STALE-ROUNDING-FIXTURE, STALE-OUTER-COLUMN
