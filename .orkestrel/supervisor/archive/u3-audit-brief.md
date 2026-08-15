# U3 audit round 1 — reload and re-login restore

## Subject

Commit `9fba674` in `/workspace/supervisor` (baseline `bc86e45`, the accepted U1+U2). One
implementation round, Sol thread 01a00148, 596-line diff over 8 files.

## What the round decides

Whether the restore contract closes exit criterion 3 and whether U6/U5 render against
`consume()` as landed. U3 is the last plumbing unit; the shell units bind next.

## Already established (Orchestrator-verified)

- At `9fba674`: src 232/232, app 621/621 (59 files incl. integration reload/expiry journeys),
  policy 17/17; guides red grown by exactly U3's surface (`tmp/redesign/u3-gates.log`) — the
  export list plus `consume` method rows, the declared U7 class.
- U2's accepted facts stand: roster starts on identify/login; expiry retains `#workflow`; the
  manager's memory resets on session adoption.

## Review evidence

Diff `/home/user/scaffold/tmp/redesign/u3.diff`; `u3-status.txt`; `u3-gates.log`; writer report
`/home/user/scaffold/tmp/codex/u3-last.md`; brief `u3-brief.md`; design record
`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md`; the tree at `9fba674`.

## Numbered claims

CONFIRMED requires naming the failed attack; undecidable = UNRESOLVED + settling run.

1. **Restore is the ordinary path.** `identify()`/`login()` restore through
   `OperatorInterface.open` — no parallel open, no pre-check, no polling; feed, selection, and
   subscription re-establish exactly as a manual open; a restore that succeeds leaves no notice.
2. **The fallback is one consumable fact.** A gone or refused restore clears the pointer, sets
   exactly one `RestoreNotice` with the right `reason` discriminant, `consume()` yields it once
   and then `undefined`; no render path can repeat it; the reason vocabulary (`'gone'`/`'refused'`)
   is a real domain distinction, not decoration.
3. **The logout/expiry line is exact.** Logout removes the pointer (next login lands on the
   rail); AUTH expiry retains it (re-login resumes), including across a full page reload between
   expiry and re-login; no other door writes or clears the pointer.
4. **The persistence shape is sound.** The singleton pointer key cannot collide with per-workflow
   `View` keys for any workflow id (attack the key arithmetic: a workflow literally named the
   pointer key's suffix); both stores honor load/save/remove round-trips; a malformed stored
   value cannot throw through identify.
5. **The optional store members are justified — or they are a shim.** `load?`/`save?`/`remove?`
   are OPTIONAL on `OperatorStoreInterface` in a greenfield repo whose law says update every
   consumer. Either name the concrete consumer that cannot implement them (making optionality a
   real contract), or this is BROKEN and the fix is required members on every implementer.
   Enumerate the implementers yourself.
6. **Scope and rules.** Touched set is exactly the owned set; no forbidden constructs, timers,
   or polling; new types in types.ts first with true TSDoc; `consume` obeys the naming laws;
   store methods obey the lifecycle vocabulary (`load`/`save`/`remove` vs the fixed meanings).
7. **Ship it.** U6 (login treatment) and U5 (shell rendering of the notice) can bind today;
   exit criterion 3 closes on this contract.

## Threshold

Findings outside claims at the BROKEN standard only. Verdict shape per
`/workspace/supervisor/.agents/skills/orkestrel-falsify/SKILL.md`; one terminal line. No process
diary.
