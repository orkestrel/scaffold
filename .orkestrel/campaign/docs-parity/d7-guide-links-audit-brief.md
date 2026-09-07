# Audit brief — U4 `d7-guide-links` (the compared form drops a link target's module part)

## Lanes

Three lanes, blind to each other, clean contexts, one brief. The dispatch names which you hold: the **subjective lane** (`reviewer`, Opus 5: the guide's prose and the doc block read as a reader meets them, the regex's shape against the fleet's other readers, whether the rule is the one every package can rely on); the **objective lane** (`reviewer`, Opus 5 — the recorded substitution for the dark Sol bench: what the regex admits and refuses, the red-first proof binding to the defect, the round trip through the real factories, no other compared form moved, the unchanged plain and labelled forms); the **checker** (`checker`, Sonnet: the diff against the brief's scope, the citations, the count ban, the gate readings quoted from runs). You run no command and edit nothing.

## Evidence

- `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-guide-links-brief.md`, `d7-guide-links-report.md`, `d7-guide-links.diff.txt`, `d7-guide-links.status.txt`; committed as `caa97b2` on the guide's branch (`/home/user/fleet/guide`), pushed.
- The tree at `/home/user/fleet/guide`: `src/core/helpers.ts` (`normalizeSummary`, `:1690-1760` region), `tests/src/core/helpers.test.ts` (`describe('normalizeSummary')`, `describe('findDrift')`), `guides/guide.md` (the `normalizeSummary` row and the compared-form clause list).
- The motivating case: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-sse-converge-report.md:196` and `d7n-slice1-audit-subjective.md` F3.
- Rules: `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/tests.md`; `.claude/rules/writing.md`.

## Numbered falsifiable claims

1. The changed regex renders `{@link import('<any specifier>').Name}` as `` `Name` ``, `{@link import('<specifier>').Owner.member}` as `` `Owner.member` ``, `{@link <module>#Name}` as `` `Name` ``, and leaves `{@link Name}`, `{@link Owner.member}`, and `{@link Target | label}` exactly as before; a `#` inside a code span or a `|` label is not consumed as a module part.
2. The four new cases read red on the baseline for the reason the report states and green after; the existing qualified-link case is a control that stayed green on both runs; the round-trip case drives `createSource` and `createGuide` with no part of the comparison replaced.
3. The doc block's description paragraph equals its `guides/guide.md` cell in the compared form (`npm run docs` at zero in the report, quoted from a run); the `@remarks` paragraph and the guide's new clause bullet state the same rule in the same terms and in the repository's voice (no `should`, no count, no `via`).
4. No other compared form moved: the whitespace collapse, the span trim, the labelled form, and the multi-backtick refusal are unchanged in code and prose.
5. Scope honesty: the diff touches `guides/guide.md`, `src/core/helpers.ts` (the `normalizeSummary` block and body only), and `tests/src/core/helpers.test.ts`; version and lockfile untouched.
6. Report honesty: every citation matches the tree, no count in prose.

## Output

Per claim: PASS, FAIL, or CANNOT RULE with the evidence. Then findings outside the claims, each with what right looks like. Close with exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Open with `Lane held: <lane>` as the very first line. No process diary. Perform the assignment directly and spawn nothing.
