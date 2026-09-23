# X-RETENTION carry and promotion check — absorption brief for Grok

Role and engine: `grok` on Cursor Grok (bridge), read-only. Return distilled evidence with
`file:line` pointers; decide nothing.

## Question (bounded)

The scaffold repository's campaign folder `/home/user/scaffold/.orkestrel/veneer/` holds the Veneer
campaign's retained artifacts (`units/*`, `plan.md`, the design verdicts, `tenets.txt`). Veneer's
`main` is at `2c10329` in `/home/user/veneer` (the session branch is one commit ahead with the CHECK
landing `43d954c`). Produce, for the retention procedure in
`/home/user/scaffold/.agents/skills/orkestrel-debrief/references/retention.md`:

1. **The unit table.** Every unit prefix present under `units/` (group files by the unit they
   belong to: `f8b`, `f8c-a`, `f8c-b`, `f8c` design, `f8p`, `f8` terrain, `bfc`/`b-forms-check`,
   `bfg`/`b-forms-group`, `bff`/`b-forms-floating`/`b-forms-floor`, `bfs`/`b-forms-select`,
   `b-forms-design`, `b-forms-terrain`, `b-passive-design`/`-terrain`/`-family`/`-baseline`,
   `b-forms-pseudo`, `l1`, `resolve-*`/`sort-*`/`land-*`/`regen-*`/`verify-*` instruments,
   `codex-*`, `decisions-round-2.md`), with: the files, whether the unit has landed on Veneer `main`
   (search `git -C /home/user/veneer log --oneline 0783b2b..43d954c` for the landing commit naming
   it; the F8 line — `f8b`, `f8c-*`, `f8p`, `f8` — is unlanded and lives in the worktree
   `/home/user/veneer-f8b`), and which files are the brief/report pair, the audit verdicts, the
   executed instruments, and the acceptance evidence per unit.
2. **The carry check.** From `/home/user/scaffold/.orkestrel/veneer/plan.md`,
   `units/decisions-round-2.md` (D14 to D36), and `/home/user/veneer/ROADMAP.md` § Carriers and
   § Records: every open item (a defect, a deferred decision, a measurement to re-take, a withdrawn
   claim, an unmet acceptance condition) with its carrier as recorded (a landing commit, a live
   brief, a ROADMAP row, or nothing). Flag every item whose carrier is missing, is not a unit
   ("the Orchestrator", "whichever unit"), or names two units.
3. **The promotion check.** For each file class in the folder: what it asserts that is product
   truth (must be in `guides/veneer.md`), process law (must be in a rule or contract file), a
   decision (in a commit message), or process diary (prunes). Name any product truth or process law
   the folder holds that its destination does not yet carry, with `file:line` on both sides.
4. **The measurement check.** Every number the folder carries that a guide sentence also carries,
   with the date the folder records for it, or "undated".
5. **Alignment of `plan.md` with `ROADMAP.md`.** Every unit or state one names and the other does
   not, or names differently (status, order, carrier).

Read: the folder listing, `plan.md`, `decisions-round-2.md`, the round verdicts
(`*-audit-verdict.md`), `ROADMAP.md` § Phases and units, § The family queue, § Carriers, § Records,
and the Veneer git log named. Do not read every brief and report; the register files answer the
carry check. Quote verbatim where a sentence is the evidence. Return the five sections as Markdown
tables or lists with `file:line` pointers, no recommendations.
