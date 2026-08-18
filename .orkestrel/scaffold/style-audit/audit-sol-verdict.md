1. **BROKEN** — `.claude/rules/writing.md:117` explains the rule with “the imperative carries a recommendation,” rationale that changes no judgment and duplicates lines 11–12. Delete that clause.

2. **BROKEN** — `.claude/rules/writing.md:11` restates `AGENTS.md:153` by requiring the imperative for instructions. Line 117 also repeats line 12’s `We recommend` ban. Point to `AGENTS.md` for instructions, retain only the recommendation extension, and make the rejection entry a cross-reference.

3. **CONFIRMED** — The collision attacks failed. Lines 108–110 defer lifecycle vocabulary to `names.md`; lines 54–56 preserve `documentation.md:35`’s byte-mirror rule; lines 37–39 distinguish `ensure` directives from behavior claims; and lines 4–6 give the instruction-file law precedence over the contraction rule.

4. **BROKEN** — The list beginning at `.claude/rules/writing.md:10` follows only a heading, contradicting lines 62–63’s requirement that every list have a complete introductory sentence. Add a directive sentence introducing each section’s list.

5. **CONFIRMED** — The duplication and contradiction attacks against the preceding `typescript.md` section failed. The five bullets uniquely specify description morphology, boolean wording, default and exception wording, prerequisite and failure content, and deprecation ordering.

6. **CONFIRMED** — The scope attack failed. The zero-context diff from `13be0d2^` through `f843bc8` adds exactly one aligned `AGENTS.md` table row and changes no other `AGENTS.md` content.

7. **BROKEN** — A root `README.md` permits two readings: “prose a developer reads” includes it, while the colon-delimited list names only chat replies, reports, guides, and commit messages. Replace the apparent exhaustive list with an explicitly non-exhaustive form such as “including …”.

8. **BROKEN** — `.claude/rules/writing.md:26` silently adds “Put the result or the reason after it.” That rule appears in the Sol distillate but not in the fixed reconciliation matrix, and no retained unit-report landing table authorizes it. Delete the sentence or add an explicit reconciliation ruling before landing it.

Findings outside the claims

- **BROKEN** — The shipped instruction corpus already violates the new contraction rule. `AGENTS.md:163–164` classifies `.agents/*` and every skill as instruction files, while `.claude/rules/writing.md:20–21` forbids negative contractions there. The vendored skill references contain 15 violations: 13 in `.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md` and 2 in `.agents/skills/enterprise-bootstrap/references/components.md`, including lines 214 and 403. Expand all 15 contractions before shipping the canon.

VERDICT: FAIL — 5 broken, 0 unresolved, 0 not-evidenced, 1 findings outside the claims