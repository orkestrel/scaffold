# U3-policy audit — numbered claims (round 9, both lanes)

Subject: the cumulative U3-policy diff in the scaffold checkout `C:/Users/mikes/WebstormProjects/scaffold`
over `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `guides/scaffold.md`
(`units/u3-policy-diff-10.patch.txt`), after the tenth brief
(`.orkestrel/veneer/units/u3-policy-brief-10.md`, report `units/u3-policy-report-10.md`) on the
round-8 verdict (`.orkestrel/veneer/u3-policy-audit-verdict-3.md`). `host.json` is restaged by
the Orchestrator's `npm run build` and is not part of the diff. Rule on every claim with
`CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact text).
Read the diff and the live files, never the reports alone; execute the patterns in memory where a
claim names a form. These files are vendored byte-identical into every fleet target and restored
there by `scaffold repair`, so judge every assertion by whether it holds in an arbitrary target.
Law: `AGENTS.md`, `.claude/rules/typescript.md`, `names.md`, `tests.md`, `writing.md`,
`documentation.md`.

Readings the Orchestrator took on the host after the round, with no other process running:
`test:config` `173 passed | 1 skipped` twice in a row (the round-8 red on the declaration-roll
case was another checkout's build writing the shared temporary directory; recorded as a scaffold
task); `test:policy` `125 passed`.

1. **The remark states shape, not meaning (round 8 analyst 2).** `readPolicyIndex`'s remarks say
   the reader reads every row of the row shape under any heading and that a link outside such a
   row accounts for nothing; no sentence claims the reader distinguishes a concept row from a
   directory row.
2. **No count over an implementation-defined set (round 8 claim 8).** The `POLICY_INDEX_LINK`
   remark says the capture names differ (no "two names"); no other new prose tallies an open set.
3. **A regression that can fail (round 8 analyst 11).** The row-boundary case gives each row a
   distinct guide name (`outside.md`, `later.md`, `tokens.md`) and asserts exactly `['tokens']`,
   so admitting either invalid row reddens it; the case's comment says why.
4. **The fence-limit rows carry the sweep control (round 8 reviewer 11).** The unclosed-fence and
   indented-fence rows write the `via` front page and expect the matching term violation at
   `README.md` line 3, so a dead sweep reddens them.
5. **A row names an existing directory (round 8 reviewer 12).** `readPolicyIndex` counts a row
   only when `resolvePolicyDirectory(root, path)` resolves; a case proves a row naming an absent
   directory accounts for nothing; every control row whose expected outcome depends on a row
   counting declares the directory it names (the builder added `directories: ['src/styles']` to
   those rows and real directories to the scratch-root cases); the remark states the gate.
6. **Per-line application stated on the pattern (round 8 reviewer 13).** `POLICY_INDEX_ROW`'s
   remark says a caller applies it to one line at a time.
7. **Every link in the cell (round 8 reviewer 14).** `readPolicyIndex` reads every
   `POLICY_INDEX_LINK` match in a row's link cell; a case proves a cell with two links accounts for
   both; the `@returns` says so.
8. **Every earlier confirmed claim holds** on the cumulative diff: the accounting (own, map,
   directory-index row, catalog row) with catalog membership as the only mirror evidence and no
   count; the reader's fence blanking, per-line row read, distinct first-row order, absent-map
   guard, and `angled ?? bare` read; the link pattern's accepted and rejected sets (execute the
   forms round 8 listed); every control row discriminating with its expected `path`; no live-root
   assertion assuming a name; the vocabulary (map for the file, directory index for the table);
   no forbidden syntax; one-sentence descriptions; the guide's recovery sentences.
9. **Fit (subjective lane's weight).** The names, the remarks, and the guide read as one
   maintainer's voice; the directory-existence gate is the right evidence for authorship and its
   cost to a workspace (a row must name a directory that exists) is stated.
10. **Gates.** `format:check`, `lint:check`, `check`, `build`, `test:policy`, `test:setup`,
    `test:config`, `test:guides` are green on the round-10 tree (the verifier's reading, retained
    as `units/u3-policy-gate-report-3.md`); a red on the declaration-roll case while another
    checkout builds is the recorded scaffold task, not this unit's.
