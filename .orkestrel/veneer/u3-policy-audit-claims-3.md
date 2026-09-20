# U3-policy audit — numbered claims (round 8, both lanes)

Subject: the cumulative U3-policy diff in the scaffold checkout `C:/Users/mikes/WebstormProjects/scaffold`
over `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `guides/scaffold.md`
(`units/u3-policy-diff-9.patch.txt`), after the ninth brief
(`.orkestrel/veneer/units/u3-policy-brief-9.md`, report `units/u3-policy-report-9.md`) on the
round-7 verdict (`.orkestrel/veneer/u3-policy-audit-verdict-2.md`). `host.json` is restaged by the
Orchestrator's `npm run build` and is not part of the diff. Rule on every claim with `CONFIRMED`,
`REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact text). Read the diff
and the live files, never the reports alone; execute the patterns in memory where a claim names a
form. These files are vendored byte-identical into every fleet target and restored there by
`scaffold repair`, so judge every assertion by whether it holds in an arbitrary target. Law:
`AGENTS.md`, `.claude/rules/typescript.md`, `names.md`, `tests.md`, `writing.md`,
`documentation.md`. Round 7's claim 1 contradicted its claim 4 (a membership string names its own
region, not every accounting); this file states each expectation once.

1. **Accounting.** `isPolicyStray` reports a top-level `guides/<name>.md` only when the name is
   neither the package's own, the map (`POLICY_GUIDE_MAP`), a guide the directory index maps, nor
   a catalog row; `isPolicyMirror`'s body is unchanged and decides by catalog membership alone,
   and its remarks record that a catalog row wins over a directory-index row carrying the same
   name; the violation message, `isPolicyStray`'s remarks, and the `guides/scaffold.md` sweep
   paragraph name those accountings without a count; no sentence anywhere says an index link
   is a claim to author a guide or that a banned-term report diagnoses the catalog; the guide
   gives the maintainer the direct recovery (add the directory-index row for an authored guide;
   restore the catalog evidence for a mirror and do not rewrite it).
2. **The row.** `POLICY_INDEX_ROW` matches a Markdown table row whose first cell is a backticked
   relative path (no leading `/`, no drive letter, no `..` segment, no `:`) and whose second
   cell, ending at the next unescaped `|`, links a sibling `<name>.md`; `` | `/outside` | [tokens](tokens.md) | ``
   and `` | `src/styles` | no guide | [tokens](tokens.md) | `` account for nothing and
   `` | `src/styles` | [`tokens.md`](tokens.md) | `` accounts for `tokens`; the remarks say the
   reader scans every line of the map after fence blanking and reads every row of that shape
   wherever it sits, that a concept-index row does not take that shape, and that a link outside
   such a row accounts for nothing.
3. **The reader.** `readPolicyIndex` blanks fenced code, applies `POLICY_INDEX_ROW` per line and
   `POLICY_INDEX_LINK` to the row's link cell, returns distinct names in first-row order, returns
   an empty list for an absent map, and reads the capture through `groups?.angled ?? groups?.bare`;
   `POLICY_MAP_FILE` derives from `POLICY_GUIDE_MAP`; the two documented fence limits (an unclosed
   fence, a fence indented four or more spaces) each have a control proving a row inside still
   accounts for its guide.
4. **The link.** `POLICY_INDEX_LINK` names no capture group twice and uses no construct newer
   than ES2018; it captures `sample` from `](sample.md)`, `](./sample.md)`, `](sample.md "T")`,
   `](sample.md 'T')`, `](sample.md (T))`, `](<sample.md>)`, `](<./sample.md>)`,
   `](sample.md#topic)`, `](<sample.md#topic>)`, and `](sample.md#topic.md)`; it captures
   `my guide` from `](<my guide.md>)`; it refuses `](my guide.md)`, `](nested/sample.md)`,
   `](https://x/y.md)`, `](https:sample.md)`, `](../README.md)`, `](<sample.md)`, `](sample.md>)`,
   `](<sample.md>#f)`, `](<sample.md#a>#b)`, `](sample.md#bad fragment)`, and `](sample.md#bad>)`;
   its description and remarks state exactly that set, and the Node remark says a duplicate name
   is a `SyntaxError` before Node 23.
5. **Controls.** Every `PolicyControl` row this unit added or changed declares its expected
   `violations` (`path`, `rule`, `message`, and `line` where the runner reports one) or matches
   the runner's one-violation shape; each row discriminates (name for each the change that would
   redden it); each membership names the region its own fixture writes; the rows proving a
   prose-linked guide is a stray while a row-mapped guide is accounted for, the fenced row, the
   code-span row, and the two fence-limit rows are present.
6. **Portability.** No assertion against `process.cwd()` assumes a guide name, a package name, a
   directory tally, or an index shape; the `absent` and `other` controls and the order-and-dedupe
   case run in scratch roots that leak nothing; the unit's readings in Veneer and Test with the
   files copied in were green and both targets are clean at the two paths.
7. **Vocabulary.** The file is the map (`POLICY_GUIDE_MAP`, `POLICY_MAP_FILE`); the table is the
   directory index (`POLICY_INDEX_ROW`, `POLICY_INDEX_LINK`, `readPolicyIndex`, "directory-index
   row" everywhere, "directory-table" nowhere); no message, remark, label, or comment mixes the
   words for one concept.
8. **Law.** No `any`, type assertion, non-null assertion, `@ts-*`, `eslint-disable`, nested
   function declaration, or unexported module-scope helper; every new export has a one-sentence
   description in the file's voice; no banned term and no count over an open set in new prose
   (fixture strings quoting a banned term are data; a count naming the closed members of an
   externally fixed set is permitted); the `../configs/policy.js` import follows the vendored-file
   import law.
9. **Fit (subjective lane's weight).** The names read in the file's vocabulary; a directory-index
   row as authorship evidence, with catalog membership as the only mirror evidence, is the right
   design for a fleet whose packages publish several faces and link mirrors in prose; the guide
   sentence tells a maintainer what to do.
10. **Gates.** `format:check`, `lint:check`, `check`, `build`, `test:policy`, `test:setup`,
    `test:config`, `test:guides` are green on the round-9 tree (the verifier's reading, retained
    as `units/u3-policy-gate-report-2.md`).
