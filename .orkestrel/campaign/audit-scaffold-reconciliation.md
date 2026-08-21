# Scaffold audit round — reconciliation, 2026-08-21

Lanes: analyst (Sol, executed; `tmp/codex/audit-scaffold-analyst-last.md`), reviewer (Opus,
read-only; session task record). Both FAIL.

## Per-claim ruling

1. CONFIRMED (both). 2. CONFIRMED (analyst's executed diff evidence resolves the reviewer's
no-diff UNRESOLVED). 6. CONFIRMED (analyst's executed whole-tree lint). 7-11. CONFIRMED
(both; claim 8's drift suspect resolved by the section renumbering).

3. **BROKEN, three convergent gaps in the template-TODO instrument**: lone-CR line endings
   defeat the splitter (analyst, executed); a fence indented up to three spaces — valid
   CommonMark, and LIVE in the corpus at `.agents/skills/orkestrel-falsify/SKILL.md:147-150`
   — is not recognized, so a TODO inside it reds nothing while the control's membership
   string claims fences generally (reviewer); bridge documents (`.claude/skills/**`) are
   never scanned although the governing section bans template TODOs there too (reviewer).
   RULED: fix all three — CR-tolerant splitting; fence openers/closers tolerated at up to
   three leading spaces; the scan extended to bridge `SKILL.md` bodies; membership strings
   made true; a control per gap.
4. **SPLIT**: 4a (file shapes) CONFIRMED with the reviewer's attack table; 4b BROKEN — an
   empty non-allowlisted DIRECTORY passes (analyst). RULED: directories are allowlisted too
   (`agents/` and `references/` only), with a control.
5. **BROKEN, convergent with the reviewer's F2 as the full statement**: the method exemption
   walks past method ancestors, so a nested function inside a class method — the CENTRAL case
   of a one-class-per-file `src` population — reports nothing; `isPolicyVisitor` is
   consequently unreachable and its RuleTester case passes when the helper is deleted.
   RULED: report when the nearest enclosing function ancestor is a method (the method node
   itself stays exempt); invalid case for a class-declaration method body; valid case for a
   class expression (the `ClassExpression` early return STAYS — it pins a stated sweep blind
   spot); exercise `isPolicyVisitor` with a case only it admits or delete it. Blast radius
   noted: the vendored `.oxlintrc.json` means a target's green sweep is no evidence its lint
   will be — the release wave's visit absorbs it, recorded.
12. **BROKEN, convergent**: the R2 and S10 ROADMAP rows describe landed work as open
    (S-docs wrote them before those units landed). RULED: strike the R2 row; rewrite the S10
    row to record the two landed instruments (with the membership each enforces) and keep the
    model-routing/version-catalog half review-owned. The tarball manifest pin reddening
    `BASE_DEV_DEPENDENCIES` is bounded campaign state — the release-prep pin restore owns it;
    no fix here.

## Findings outside the claims

- **F1 (reviewer), adopted**: the three-shape inventory enforces a law with no home. One
  directive sentence lands in `.claude/rules/documentation.md` § Workflow skills — a skill
  directory holds `SKILL.md`, `agents/openai.yaml`, and named `references/*.md` and no other
  file or directory — absorbing the README/changelog denylist clause.
- **F2**: folded into claim 5.

## Fix round

One unit (S-fix, Sol implementer — instrument-heavy; audited after by Opus). Constraints: the
fence tolerance stops at three spaces (four is an indented code block, a different construct —
state it as the limit); the directory allowlist must not re-report what the nested-references
rule already owns; claim 5's fix keeps the `ClassExpression` pin and the visitor-table
exemption's intent.
