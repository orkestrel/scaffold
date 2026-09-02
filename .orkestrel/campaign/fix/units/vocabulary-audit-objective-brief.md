# Audit vocabulary — falsify the names.md vocabulary unit

## Role and engine

`reviewer` on Claude Opus 5 holding the OBJECTIVE lane (correctness, constraints, what the text actually decides); claims 1, 2, 3, 4, 6. The writer was Claude Opus 5; the Sol bench is dark, so this lane runs on the
writer's own engine in a clean context. Attack the half your engine wrote hardest. The subject is
the diff and the report, never your own reading of the intent.

## Subject

- Diff: `/home/user/scaffold/tmp/units/breaking/vocabulary.diff` (the whole change).
- Report: `/home/user/scaffold/tmp/units/breaking/vocabulary-report.md`.
- Brief the writer executed: `/home/user/scaffold/tmp/units/breaking/vocabulary-brief.md`.
- The file after the change: `/home/user/scaffold/.claude/rules/names.md`.
- Law: `/home/user/scaffold/AGENTS.md` § Writing and § Instruction files;
  `/home/user/scaffold/.claude/rules/writing.md`; the plan's rulings that cite this text:
  `/home/user/scaffold/.orkestrel/campaign/fix/breaking-plan.md` § Naming and shape rulings and
  § Refusals.

## Claims

Rule on each with CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, with the evidence line.

1. § Standalone helpers carries exactly one directive per prefix named in the brief, and the
   prefix vocabulary has no second home elsewhere in the file (no other section defines
   `build*`, `read*`, `resolve*`, `scan*`, `describe*`, `normalize*`, `collect*`, `render*`, or
   `supports*`).
2. § General vocabulary carries the external-mirror directive and a never-licensed-word directive
   that names `kind`, `type`, and § Rejected naming.
3. Every added line is a directive with an observable trigger and a required action; no added
   line states a count, persuades, explains for a person, or uses `should`.
4. The added text alone decides each of these plan rulings the way the plan rules them:
   sqlite s18-10 (`foreignKeys` stands), ollama s18-09 (`keepAlive` stands), msg s13-03 (`type`
   on `MSGDirectoryEntry` must move), test s11-37 (`readStyle` and the `read*` family; `rgba` →
   `resolveColor`), sea s12-03 (`parsePEOffset` → `readPEOffset`), websocket s17-27
   (`parseWebSocketCanonical` for a `boolean | undefined` return), terminal s12-54
   (`supportsRawMode`), qualifier s16-30 (`describe*`), rater s17-05 (`build*`). Name any ruling
   the text leaves open.
5. The gates the report claims ran exit as reported (checker lane: re-run `npm run format:check`,
   `npm run lint:check`, `npm run test:policy` in `/home/user/scaffold` and quote the exit codes).
6. The tree holds only the owned file changed (`git status --short` in `/home/user/scaffold`
   before the Orchestrator's commit is quoted in the report; the diff touches no other file).

## Output

Per-claim verdicts with evidence, then one terminal line: `PASS` when every claim is CONFIRMED,
`FAIL` otherwise, with the failing claim numbers. No process diary.
