# Lane brief — check the process-laws follow-on against the instruction-file rules

Role and engine: `checker` held by `grok` (Cursor Grok 4.6), read-only mechanical conformance evidence. Never create, edit, or delete a file; never run a command that changes a tree. Perform the reading directly and spawn nothing.

Subject: the uncommitted diff at `/home/user/scaffold/.orkestrel/campaign/conform/units/followon/process-laws-scaffold.diff.txt`, which adds sentences to `/home/user/scaffold/.agents/orchestration.md` (§ Every dispatch is a file before it is a launch, § Where campaign artifacts live, § Check the brief before you send it) and to `/home/user/scaffold/.claude/rules/writing.md` § Substitutions. The sentences carry the rulings listed at `/home/user/scaffold/.orkestrel/campaign/conform/verdict.md` § Rulings the round established: the scope line naming `tests/**`, the sample-string exemption, the canon checkout's built entry with the records-commit order, and the `.log.txt` name. The governing rules are `/home/user/scaffold/AGENTS.md` § Writing and § Instruction files, and `/home/user/scaffold/.claude/rules/writing.md`.

Claims to attempt to refute, each with `file:line` evidence:
1. Every added sentence is a directive naming an observable trigger and the required action, and records no history: no session, no date, no probe, no "was found", no engine name.
2. Every added rule has exactly one home: search `/home/user/scaffold/.agents/orchestration.md`, `/home/user/scaffold/.claude/rules/*.md`, `/home/user/scaffold/AGENTS.md`, and `/home/user/scaffold/.agents/templates/brief.md` for `npx`, `built entry`, `.log.txt`, `scaffold repair`, `sample string`, `fixture`, and `before the landing`, and report any second statement of the same rule outside the diff.
3. The added prose carries no `should`, `via`, `e.g.`, `i.e.`, `currently`, `now`, `new`, `latest`, `above`, `below`, `simply`, `just`, `easy`, `ensure`, no contraction, and no count of a growable set stated as a number; every code token in backticks is followed by a noun or stands as a quoted literal; the file's line width is kept.
4. Each of the four rulings named in the subject is carried by one added sentence whose statement neither narrows nor widens the ruling as `verdict.md` § Rulings the round established states it.

Output shape, exactly: per-claim `CONFIRMED` or `REFUTED` with the failing input and the smallest correct fix; then `## Referrals` for anything outside the claims; then `VERDICT: PASS` or `VERDICT: FAIL <claims>`. Nothing else.
