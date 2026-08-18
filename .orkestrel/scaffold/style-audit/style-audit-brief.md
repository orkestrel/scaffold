# Audit round: falsify the developer-facing writing rules (campaign 3)

Single objective lane: GPT-5.6 Sol — the one engine of the three that did not author or reconcile
these rules (Opus drafted; the Orchestrator ruled; you audit). Follow
`.agents/skills/orkestrel-falsify/SKILL.md` (verdict shape, one terminal line) and the
Falsification law in `.claude/rules/quality.md`. Attempt refutation; CONFIRMED requires naming the
attack that failed; UNRESOLVED over guessing.

## Subject

Commits 13be0d2 and f843bc8 on `claude/oxlint-conventions-audit-m66uiq`: the new
`.claude/rules/writing.md` (123 lines), five TSDoc bullets and one pointer widening in
`.claude/rules/typescript.md`, one `AGENTS.md` rule-map row, and two contraction fixes in
`.claude/agents/builder.md`. The evidence chain: three engine distillates and the reconciliation
matrix in `.orkestrel/scaffold/style-audit/` (`distillate-grok.md`, `distillate-opus.md`,
`distillate-sol.md`, `style-writing-brief.md`); the corpus at
`/tmp/claude-0/-home-user-scaffold/75034726-f81c-5f56-9643-b4a6748f097d/scratchpad/gstyle/text/`
for spot-checks.

## What the round decides

Whether the rules ship as vendored canon (`.claude/rules` is a `dist/host` member) governing how
agents write to the developer fleet-wide.

## Claims

1. Every line of `writing.md` is a directive — what to do, what to check, or what to refuse — with
   rationale only where it changes a judgment call and subordinate to the rule. Name a line that
   persuades, reassures, or explains to a human instead.
2. No rule has two homes: nothing in `writing.md` restates `AGENTS.md` § Writing or
   § Instruction files, `.claude/rules/documentation.md`, `.claude/rules/typescript.md`, or
   `.claude/rules/names.md`; every cross-reference points instead of copying. Name a restatement.
3. No collision with baseline canon: the lifecycle-vocabulary exclusion protects `names.md`
   exactly; the vendored-mirror exemption matches `documentation.md`'s mirror law; the
   `ensure`-as-directive carve-out keeps the rule files themselves legal; the contractions rule
   agrees with the instruction-files law. Name a sentence a baseline law contradicts.
4. The file obeys itself: outside quoting contexts it carries no banned term, no `should`, no
   double negative, no directional language, no un-introduced list or table, and its own
   conditions precede their instructions. Name a self-violation with its line.
5. The five TSDoc bullets fit `typescript.md` § Comments and API documentation without
   contradicting an existing bullet, and every shape they fix is one the section's existing law
   does not already carry. Name a contradiction or duplication.
6. The `AGENTS.md` rule-map row is accurate, aligned with the table's existing column widths, and
   the file carries no other change beyond that row.
7. The scope boundary is decidable: for any given file an agent writes, the preamble determines
   whether each `writing.md` rule reaches it (developer prose fully; instruction files through the
   stated precedence). Name a file class for which two readings survive.
8. The reconciliation was faithful: every matrix item in `style-writing-brief.md` landed or its
   fold is recorded in the unit report's landing table; nothing outside the matrix was smuggled
   in. Name a silent addition or omission.

## Execution

Read-only; spawn nothing; write nothing (state a needed probe as what would settle an UNRESOLVED).

## Output

Exactly the orkestrel-falsify verdict shape: verdicts 1–8, findings outside the claims
(BROKEN-standard only), one terminal line. No process diary.
