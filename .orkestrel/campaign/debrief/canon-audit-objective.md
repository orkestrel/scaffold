# Canon audit — objective lane (verbatim summary of the returned verdict, 2026-09-02)

Objective lane, held in full, on Claude Opus 5 as the recorded substitution for the dark GPT-5.6 Sol bench; the lane's own engine wrote the subject.

1. BROKEN — twenty-four rows land as stated, verified against the files; row 7 lands a stronger claim in the Codex mirror: `.codex/agents/grok.toml:18` "The journal's first event carries the session_id that resumes the run;" asserts the unprobed `--resume` capability the brief's § Unknowns forbids claiming, while the Claude twin (`grok.md:60`) says "recovery handle". Fix: "the session_id that is the run's recovery handle". Non-blocking: `.claude/rules/architecture.md:79` runs past the surrounding wrap; `format:check` accepts it.
2. CONFIRMED — every landed line is a directive; no count, no `should`; the rationale clauses tested each change a judgment call and stay subordinate.
3. CONFIRMED — one home per rule: the stale-authority rule has one text (`references/brief.md:113-117`) and three pointers; the terminal-line form lives only at `orkestrel-falsify/SKILL.md:158-159`; row 5's reference target carries both dropped obligations; `.codex/agents/checker.toml:19-20` copies its twin's sentence verbatim (not forbidden; the report's "own words" is inaccurate).
4. CONFIRMED — the Claude and Codex pairs agree obligation by obligation; the role tables hold; the grok pair's divergence is ruled under claim 1.
5. CONFIRMED — the sweep over the touched files: `names.md:118` `via` inside backticks (exempt); `orchestration.md:306`, `:366` temporal `just`; `quality.md:70` contrastive `just`; `justif*` substrings; nothing else.
6. CONFIRMED — the status lists only Owned files plus `host.json`.
7. CONFIRMED — the skill shape holds, checked directly.
8. CONFIRMED — every hunk traces to a row (orchestration → rows 10–14, 19, 20, 25; skills → 8, 15, 16, 17, 25; template → 15, 18; transports → 12; charters → 1–8; rules → 21–25; `CLAUDE.md` → 9; `host.json` → the build); row 9 stopped with a full deviation report and was ruled by the Orchestrator.

Findings outside the claims:

- F1 — the diff under audit showed `host.json` regenerated before the Orchestrator's `CLAUDE.md` and `instruction-audit.md` edits, so the writer's gate table predates the tree; what right looks like: rebuild and an independent verifier chain before any commit. (The Orchestrator's reading: the verifier's independent chain ran on the edited tree and reported green with `host.json` regenerating identically, and a rebuild at `18eb2fc` leaves the tree clean with the `CLAUDE.md` digest matching; closed.)
- F2 — `references/brief.md:53-54` tells the Orchestrator to omit the Execution row that `.agents/orchestration.md` § Required sections puts in every brief; fix: omit only the writer form and keep "performs the assignment directly and spawns nothing".
- F3 — `names.md:121` states the `kind`/`type` absolute beside the new wire-body exception at `:122` with nothing ruling between them; fix: qualify `:121` with "Outside a declared wire body".

Attacked and held: row 5's trim (the reference target carries the dropped obligations); row 11's rewrite against `SKILL.md:82` (no collision, a duplication → R2); row 16's renumbering (terminal line still last); row 18's `tmp/probe/` authority (`tests.md:109`); row 24's TSDoc sentence (scopes `typescript.md`, restates nothing); claim 6 against the off-limits list.

Referrals: R1 the writer's-report rule sits in four charters with no home in `quality.md` or the falsify skill; R2 `orkestrel-falsify/SKILL.md:82-83` restates the lane-count deviation and the substitution the contract owns; R3 `orkestrel-polish-surface/references/capture-harness.md:76` carries a `should` outside row 25's file list; R4 `.codex/agents/opus.toml` carries neither authority rule its Claude twins carry; R5 `checker.md:38-39` addresses a referral "to the Orchestrator when it is not [running]" while `reviewer.md` says "when you hold every lane".

VERDICT: FAIL 1; outside the claims: F1, F2, F3
