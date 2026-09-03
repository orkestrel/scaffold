# Audit brief — unit conform-browser

## Role and lane

Two read-only lanes in clean contexts, blind to each other: `reviewer` on Claude Opus 5 holding the **objective** lane as the recorded substitution for the dark GPT-5.6 Sol bench (your own engine wrote the subject; attack it harder for that), and `checker` on Claude Sonnet. The `orkestrel-falsify` verdict shape binds.

## Subject and evidence

The unit's uncommitted changes in `/home/user/fleet/browser`: the diff at `/home/user/work/evidence/conform-browser.diff`, the status at `/home/user/work/evidence/conform-browser.status`, the writer's report at `/home/user/scaffold/tmp/units/conform/conform-browser-report.md`, and the rows at `/home/user/scaffold/tmp/units/conform/conform-browser-brief.md` § Rows. The canon is `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/`.

## What the round decides

Whether the unit's tip is committed as this package's conformance state and packed for its consumers, or goes back for a fix round.

## Already established

The rows are the refuter lane's CONFIRMED rulings; a lane that disagrees with a ruling records a referral, not a broken claim.

## The threshold

The round passes only on `VERDICT: PASS` from both lanes with every claim `CONFIRMED` on evidence and no substantiated finding outside the claims; a writer's quoted gate table is not evidence, and a green chain alone proves only that a suite ran.

## Claims

1. Every row is `applied`, `stopped` with a deviation the Orchestrator must rule, or `noop` with evidence it was already true; no row is silently skipped.
2. Each `applied` row's change is present in the diff and implements the refuter's operative repair — not the finder's original where the refuter amended it — and no other reading of the rule.
3. No old name survives: for every renamed or removed symbol the word-boundary sweep and the case-insensitive sweep over `-s`, `-ed`, `-ing` inflections read empty across `src`, `tests`, `guides/browser.md`, `guides/README.md`, and `README.md`, and the writer's recorded sweep names those paths.
4. Every behavioural row carries a failing-first proof (the exact command, its failing count, then its passing count) and the test that names the defect is in the diff; every placement, naming, or documentation row carries the sweep that proves the old form gone.
5. Guide parity holds: every renamed, added, moved, or removed export is reflected in `guides/browser.md` (method tables exactly matching call-signature members, Surface rows for readonly data, fences importing the published specifier), `guides/README.md`, and the fence transcriptions in `tests/guides.test.ts`; no `AGENTS §` citation survives in the touched files.
6. Every breaking change is named under the report's § Breaking with its consumers and the exact consumer edit; nothing renames or removes a published symbol without that entry.
7. The diff touches only files under the brief's Owned row; `package-lock.json`, `node_modules`, and every off-limits file are untouched; no compatibility alias, re-export, or shim was added.
8. No `.skip`, `.only`, `.todo`, retry, or inflated timeout was added, and the report's § Gates names `format:check`, `lint:check`, `check`, `build`, and `test` each with the command that produced it and exit 0. The independent gate reading is the Orchestrator's deciding run at landing, which no read-only lane can take: rule that run `NOT-EVIDENCED` with the note that the landing settles it, never `FAIL` or `UNRESOLVED`, and let the terminal line turn on the other claims and on this claim's first conjunct.
9. Nothing hidden: no TODO, deferred row, commented-out code, or debug residue entered the tree, and the report's disposition table matches the diff.

## Output

The `orkestrel-falsify` verdict shape: numbered per-claim verdicts with `file:line` evidence, findings outside the claims, referrals, the claims attacked and held, and exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`. The checker rules claims 1, 3, 5, 7, and 9 mechanically and marks the rest not held.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Read-only; edit nothing.
