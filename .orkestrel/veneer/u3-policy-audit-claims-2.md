# U3-policy audit — numbered claims (round 7, both lanes)

Subject: the cumulative U3-policy diff in the scaffold checkout `C:/Users/mikes/WebstormProjects/scaffold`
over `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `guides/scaffold.md`
(`units/u3-policy-diff-8.patch.txt`), after the eighth brief
(`.orkestrel/veneer/units/u3-policy-brief-8.md`, report `units/u3-policy-report-8.md`) rewrote the
reader around directory-table rows on the round-6 verdict
(`.orkestrel/veneer/u3-policy-audit-verdict.md`). `host.json` is restaged by the Orchestrator's
`npm run build` and is not part of the diff. Rule on every claim with `CONFIRMED`, `REFUTED`, or
`UNDECIDABLE` and the deciding evidence (`file:line` or exact text). Read the diff and the live
files, never the reports alone. These files are vendored byte-identical into every fleet target
and restored there by `scaffold repair`, so judge every assertion by whether it holds in an
arbitrary target. Law: `AGENTS.md`, `.claude/rules/typescript.md`, `names.md`, `tests.md`,
`writing.md`, `documentation.md`.

Readings the Orchestrator took on the host after the round: `test:policy` `120 passed`;
`test:config` `173 passed | 1 skipped` after the rebuild; the unit's own readings in Veneer and
Test with these files copied in were `119 passed | 1 skipped` each, and both targets are clean at
the two paths now.

1. **Accounting.** `isPolicyStray` reports a top-level `guides/<name>.md` only when the name is
   neither the package's own, the map (`POLICY_GUIDE_MAP`), a guide the directory index maps, nor
   a catalog row; `isPolicyMirror`'s body is unchanged and decides by catalog membership alone;
   the violation message, every membership string, the remarks on `readPolicyGuide`,
   `isPolicyMirror`, and `isPolicyStray`, and the `guides/scaffold.md` sweep paragraph state the
   same four accountings; no sentence anywhere still calls an index link a claim to author a
   guide.
2. **The reader.** `readPolicyIndex` blanks fenced code, then reads only Markdown table rows
   whose first cell is a backticked relative path and whose second cell links a sibling
   `<name>.md` (`POLICY_INDEX_ROW`, with `POLICY_INDEX_LINK` applied to the link cell), returning
   distinct names in first-row order and an empty list for an absent map; a link outside such a
   row accounts for nothing (a control row proves it); the remarks state the row shape and the
   fence, span, and unpaired-backtick limits that still apply; `POLICY_MAP_FILE` derives from
   `POLICY_GUIDE_MAP`.
3. **The pattern.** `POLICY_INDEX_LINK` names no capture group twice, uses no construct newer
   than ES2018, captures no fragment text as a name (`](sample.md#topic.md)` → `sample`), admits
   `](<./sample.md>)`, rejects a fragment carrying a space or an unmatched `>`, admits a space
   only inside angle brackets, and rejects the nested, absolute, parent, and unbalanced-angle
   forms; its description and remarks state exactly that accepted set, and the Node remark says
   a duplicate name is a `SyntaxError` before Node 23.
4. **Controls.** Every `PolicyControl` row this unit added or changed declares its expected
   `violations` with `path`, `rule`, `message`, and `line` (or matches the runner's one-violation
   shape where it declares none); each row discriminates (name for each the change that would
   redden it); each membership names exactly the region its fixture writes; the row proving a
   prose-linked guide is a stray while a row-mapped guide is accounted for is present.
5. **Portability.** No assertion against `process.cwd()` assumes a guide name, a package name, a
   directory tally, or an index shape; the `absent` and `other` controls run in scratch roots
   that leak nothing.
6. **Vocabulary.** The map is `guides/README.md` (`POLICY_GUIDE_MAP`, `POLICY_MAP_FILE`), the
   table is the directory index (`POLICY_INDEX_ROW`, `POLICY_INDEX_LINK`, `readPolicyIndex`), and
   no message, remark, label, or comment mixes the two words for one concept.
7. **Law.** No `any`, type assertion, non-null assertion, `@ts-*`, `eslint-disable`, nested
   function declaration, or unexported module-scope helper; every new export has a one-sentence
   description in the file's voice; no banned term or count phrase in new prose (fixture strings
   quoting a banned term are data; a count naming its closed members is permitted); the import
   from `../configs/policy.js` follows the vendored-file import law in `.claude/rules/workspace.md`.
8. **Fit (subjective lane's weight).** The names read in the file's vocabulary; the four-accounting
   rule with a directory-index row as authorship evidence is the right design for a fleet whose
   packages publish several faces and link mirrors in prose; the guide sentence tells a
   maintainer what to do when a guide reports.
9. **Gates.** `format:check`, `lint:check`, `check`, `build`, `test:policy`, `test:setup`,
   `test:config`, `test:guides` are green on the tree (the verifier's reading, retained as
   `units/u3-policy-gate-report.md`).
