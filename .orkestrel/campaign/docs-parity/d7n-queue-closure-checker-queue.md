Lane held: checker queue

**Claim 1 — scope honesty (fix brief's named files, nothing else).**
PASS. `git status --short` in `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-queue-converge-fix.status.txt` lists exactly `README.md`, `guides/queue.md`, `src/core/factories.ts`, `src/core/types.ts`, `tests/guides.test.ts` — the fix brief's owned set (brief `## Scope`, line 23). The diff (`d7n-queue-converge-fix.diff.txt`) touches only those five files, and each hunk maps to a numbered item (README onboarding paragraph → item 4; `guides/queue.md` Guards table/lead-ins/Surface sentence → items 1, 3, 5; `src/core/types.ts` `@remarks` → item 2; `src/core/factories.ts` comment → item 6; `tests/guides.test.ts` header line → item 5). No off-limits file (`guides/README.md`, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`) appears.

**Claim 2 — report's citations match the tree; no count stated in prose.**
PASS. Every quoted hunk in `d7n-queue-converge-fix-report.md` (items 1–6) is byte-identical to the corresponding hunk in `d7n-queue-converge-fix.diff.txt`. Independently re-read: `/home/user/fleet/queue/README.md:3-11` and `/home/user/fleet/queue/guides/queue.md:88-101,125-131,250-327`, and `/home/user/fleet/queue/src/core/factories.ts` (no `BROAD` match) confirm the tree matches what the report claims. On counts: every numeral in the report is either a duration/timestamp, an exit code, a quoted tool-output measurement (`grep -c`, `Finished in 921ms on 12 files`, `Tests 29 passed (29)`) reported with the run that produced it, or a `file:line` locator (`README.md` line 5) — none is an authored-prose count of a growable set. No violation found.

**Claim 3 — each named correction present as the audit asked.**
PASS, all six sub-items:
- Guards table (Q1/Ruling 20): `guides/queue.md:90` reads "In a guard table a `Shape` cell holds the type the guard narrows to." and the table at line 92 heads `Shape` with `QueueError`, `number`, `number`, `number`, `AbortSignal`, `StoredEntry<unknown>` in guard order — confirmed by direct grep on the tip file.
- `QueueErrorContext` (Q2/Ruling 7): diff shows `@remarks` added naming `option` (as `{@link QueueOption}`) and `operation`, with the description paragraph above it untouched.
- One convention, one home (Q3): guide line 131 now states the pilot-form sentence naming `emitter, count, active, paused, stopped`; the `## Methods` lead at line 135 dropped its parenthetical restatement — both confirmed in the diff.
- README onboarding (Q4/Ruling 6): confirmed by direct read of `/home/user/fleet/queue/README.md:3-11` — the pitch blockquote (lines 3-5) is byte-identical to the guide's tagline (`/home/user/fleet/queue/guides/queue.md:3-5`), and the onboarding paragraph now reads "await each input's result," dropping the tagline's "hands back" echo. Only remaining `hands back` in the README is the tagline's own (line 5).
- Drop-in header and region (Q5/Rulings 13, 21): `tests/guides.test.ts:1-3` matches the pilot's header verbatim (`/home/user/fleet/abort/tests/guides.test.ts:1-3`, direct read, identical). Direct read of both files' `const root = ` through the manifest loop's closing brace (pilot lines 47-258, queue lines 57-268) confirms byte-for-byte equality at a stable +10 offset, with the queue-specific `describe('guide fences', ...)` block appended after the loop's closing brace — matching Ruling 20's "appended after the pilot's cases" requirement.
- Fence lead-ins (Q6/Ruling 21): direct grep on the tip guide confirms lead-in sentences at lines 101, 128, 253, and (per diff) at 268, 280, 290, 302, 314 — the exact fence set the close brief's `awk` scan named (`d7n-queue-close-brief.md` item 4), and none of the titled fence bodies changed.
- `BROAD` (Q7): `grep -n BROAD src/core/factories.ts` returns no matches on the tip file — confirmed.

No unresolved sub-claim; every reading above rests on the actual diff, status file, and the tip files at `/home/user/fleet/queue`, not on the writer's report alone.

**Findings outside the claims.** None material. The audit verdict's Q8 ("the reports' counts, annotated") is not part of this fix brief's item list and is out of this claim set's scope.

VERDICT: PASS
