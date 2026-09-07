Confirmed: five skill-reference entries (`host.json:40`, `:52`, `:70`, `:124`, `:160`), all with digests that moved per the diff, not four.

Now the final verdict.

## Per-claim verdicts

**Claim 1 — same fact preserved.** PASS. Every doc-block opener rewrite in `configs/policy.ts`, `configs/helpers.ts`, `tests/setup.ts`, `tests/setupPolicy.ts`, and `tests/setupServer.ts` either adds a leading verb/article or converts a passive "…by X" clause to active "X …s", both sanctioned verbatim by the brief's own worked examples (`d3pre-voice-brief.md:37`). Paragraph-break removals inside descriptions (for example `configs/policy.ts:591-595`, `tests/setupPolicy.ts:672-673`, `:692-694`) drop no words, only the blank line before a following sentence in the same description. No documented default, precondition, boundary, or failure case changed.

**Claim 2 — verb fits the symbol's role; no self-naming.** FAIL. `tests/setupServer.ts:1483` opens `CORE_GENERATED` (declared `tests/setupServer.ts:1492`, a filtered array) with "Counts the artifacts…", and `tests/setupServer.ts:1521` opens `FLEET_BIRTH_PATHS` (declared `tests/setupServer.ts:1530`, `readonly string[]`) with "Counts the planned paths…". `Counts` denotes a numeric role; both symbols are arrays, not counts (the actual counts, `CORE_GENERATED_COUNT` and `FLEET_BIRTH_COUNT`, are separately and correctly described with `Counts`). The report discloses this exact mismatch itself under "Flagged claims" (`d3pre-voice-report.md:383`) as a trade-off it made to satisfy claim 1, but the opener as written does not fit the role claim 2 requires. No instance of a first sentence naming its own declared symbol was found.

**Claim 3 — no tag line rewritten; no out-of-membership block touched.** PASS. No diff hunk touches an `@param`, `@returns`, `@remarks`, or `@example` line's own text for voice (the one `@remarks`-body edit, `tests/setupServer.ts` `VENDORED_FILES`, is a banned-term recast, not a voice rewrite). Property-level doc blocks that do not directly precede an export, such as `PolicyContext.directory` in `configs/policy.ts` (unchanged, confirmed against the diff context), were left untouched.

**Claim 4 — banned-term replacement follows its row's sense.** FAIL. Two replacements fall outside the claim's enumerated forms:
- `.claude/rules/quality.md:70` recasts "just not the one asked about" to "**but** not the one asked about" — not "deleted" and not "only"/"alone".
- `.agents/skills/enterprise-bootstrap/references/frontend-design.md:83-84` recasts "Classes cancel each other out **easily**, especially…" to "Classes cancel each other out, especially…" — a deletion, not the required recast to "the concrete property."

Every other `via`, `e.g.`, `etc.`, `should`, `currently`, and remaining `just`/`easy` instance in the diff follows the claim's enumerated forms, including the two heading/table-cell rewrites (`field-testing.md` heading, `bootstrap-reference.md` Toast row).

**Claim 5 — instruction files stay directive-only.** PASS. Every edit to `AGENTS.md`, `.agents/orchestration.md`, `.claude/rules/architecture.md`, and `.claude/rules/quality.md` is a same-length banned-term recast or a rewrap; none adds rationale, history, reassurance, or a new illustrative example.

**Claim 6 — scope honesty; `host.json` regenerated.** PASS. Every path in `d3pre-voice.status.txt:1-18` is within the brief's owned-file list. The two instruments (`instruments/p10/p10b-voice.mjs`, `instruments/p9/p9d-terms.mjs`) do not appear in the status output. `tests/distribution.test.ts` is absent from the status output (unchanged). The `host.json` diff (`host.json:4-1139` in the diff) changes only digest values, for exactly the vendored files this unit edited, with no entry added or removed.

**Claim 7 — `ROADMAP.md` row.** PASS. `ROADMAP.md` diff (`ROADMAP.md:309-322` in the diff) strikes the noun-phrase row on `configs/policy.ts`/`tests/setupPolicy.ts` and adds exactly one new row naming the `NODOC` exports, with no number stated in either the added or the surrounding text.

**Claim 8 — report readings match the diff.** FAIL. The report's "first Unknown" disclosures check out: `src/bin/types.ts:139` opens "Does everything…" and `src/core/constants.ts:425,443` open "Sets…", both legitimate third-person verbs outside the brief's stop set, and both files are correctly absent from the diff. But the report's own criterion-4 narrative (`d3pre-voice-report.md:367`) states "the four skill reference files" changed digests, while the actual diff shows five skill-reference entries with moved digests (`host.json:40`, `:52`, `:70`, `:124`, `:160`, corresponding to `bootstrap-reference.md`, `frontend-design.md`, `utilities.md`, `field-testing.md`, and `reconcile.md`). The report's reading undercounts the diff's own evidence by one file.

VERDICT: FAIL 2 4 8