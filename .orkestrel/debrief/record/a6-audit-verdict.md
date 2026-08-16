# A6 audit verdict — Sol (session 01a006b0-26d5-7ce2-89ec-a25ccf6b0523)

Range audited: 311c9b5..bdb5d7c. Journal: tmp/codex/a6-audit.log (swept at acceptance).
Transport note, recorded: the driver's first exec (session 01a006a6-2039-7850-8b1c-8e1820e59af9)
was cap-killed at the Bash tool's 10-minute foreground ceiling mid-read — a transport
mistake, not a dark bench; one relaunch via background task completed cleanly. The verdict
below is from the completed session only.

1. REFUTED — The clean-end call is guarded at `app/browser/controllers/Operator.ts:494`, but `refresh()` joins and returns from any earlier read at `app/browser/controllers/Operator.ts:317`; a component refresh begun at `app/browser/components/ReplyForm.vue:82` can therefore span closure and prevent the required post-close inspect.
2. CONFIRMED — `#terminal` is computed solely from `#snapshot.value.workflow.status` at `app/browser/controllers/Operator.ts:81`; the getter only exposes that computation at `app/browser/controllers/Operator.ts:160`, with no assignment path.
3. CONFIRMED — `open` consumes only tail frames at `app/browser/controllers/Operator.ts:280` and makes its subscription decision from `#terminal` at `app/browser/controllers/Operator.ts:296`; the header reads the same derived property at `app/browser/components/ContentPane.vue:40`. Wire-level `ApplicationTail.terminal` preservation does not feed Operator state.
4. CONFIRMED — The journey starts the real two-phase human/function workflow at `tests/app/browser/integration/journey.test.ts:207`, answers it through the rendered interface at `tests/app/browser/integration/journey.test.ts:229`, and waits for the finished badge at `tests/app/browser/integration/journey.test.ts:236`; its setup defines no terminal frame at `tests/app/browser/integration/setup.ts:544`.
5. CONFIRMED — The negative asserts unchanged inspect count and `live === false` after logout at `tests/app/browser/controllers/Operator.test.ts:820`; `#invalidate()` aborts and advances the generation at `app/browser/controllers/Operator.ts:578`, matching the post-loop guards at `app/browser/controllers/Operator.ts:494`.
6. CONFIRMED — The component renders the new sentence only beneath `operator.terminal` at `app/browser/components/ContentPane.vue:53`; the fixture derives completion from a terminal workflow snapshot at `tests/app/browser/components/ContentPane.test.ts:23` and supplies no tail flag at `tests/app/browser/components/ContentPane.test.ts:72`.
7. REFUTED — The backticked names resolve and derivation matches `app/browser/controllers/Operator.ts:81`, but the guide's promise that stream ending obtains the reporting inspect at `guides/src/supervisor.md:1962` is false when the clean-end refresh joins a pre-close read through `app/browser/controllers/Operator.ts:317`.
8. CONFIRMED — The server test blocks a real executor, opens a real viewer, releases the executor, drains the viewer to closure, and only then inspects terminal state at `tests/app/server/SupervisorApplication.test.ts:94`; production closes the broker after workflow execution at `app/server/SupervisorApplication.ts:302`.
9. CONFIRMED — The added production contract change only revises the existing `terminal` documentation at `app/browser/types.ts:919`; the diff adds no public declaration or prohibited construct, and the new implementation uses an ordinary computed value at `app/browser/controllers/Operator.ts:81`.

AUDIT: FAIL 1, 7

Orchestrator verification: finding 1 confirmed against source (refresh join at :317, clean-end
call at :494, ReplyForm await at :82); finding 7 follows. Fix round dispatched to the Sol
implementer per a6-fix-brief.md; Opus reviews the fix (auditor did not write it).
