# Check brief — D6b-fix template-rename-close (mechanical conformance)

## Role and engine

`checker`, Sonnet, a native Claude Code subagent. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing. Rule on every claim with PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing.

## Subject and evidence

Unit D6b-fix (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d6b-fix-brief.md`, items O1 to O5, each fixed by `d6b-audit-subjective.md` claims 1 and 2 and its findings); its report `/home/user/scaffold/.orkestrel/campaign/docs-parity/d6b-fix-report.md`; the evidence `/home/user/scaffold/.orkestrel/campaign/docs-parity/d6b-fix.diff.txt` and `d6b-fix.status.txt` (the whole uncommitted tree) against `d6b-template-rename.diff.txt` and `d6b-template-rename.status.txt` (the state D6b-fix started from); the changed files at their new state under `/home/user/scaffold`; `/home/user/scaffold/AGENTS.md` § Writing.

## Claims

1. **O1.** `Entry.browsable` and `Entry.declaration.browsable` replace `bundled` at every site the brief lists and in every pinned occurrence of `tests/src/core/templates.test.ts`; no `entry.bundled`, `.declaration.bundled`, or `bundled: boolean` remains; the Vite-bundle and bundled-browser occurrences of the word are untouched.
2. **O2.** `Entry` reads `subpath`, `specifier`, `mapping`, `declaration` (`importable`, `requirable`, `browsable`), `browsable`, `importable`, `requirable`, `loadable`, and the pushed record and any order-sensitive pinned expectation follow.
3. **O3 and O4.** The leading comment and the `selectUntypable` comment read as the brief quotes them, verbatim (with the template's backslash-escaped backticks).
4. **No behaviour moved.** The diff over `src/core/templates.ts` between the two states changes identifiers, member order, and comments only; `tests/src/core/templates.test.ts` changes pinned text only.
5. **Scope honesty.** `d6b-fix.status.txt` equals `d6b-template-rename.status.txt` (no file added or removed); nothing outside the two owned files moved between the two diffs.
6. **Report honesty.** Every `file:line` the report cites matches the files at their new state; every criterion carries an exit code and last lines; the observations (both emitted proofs at exit 0 with no line over 100 columns; the distribution proof red on exactly the packed-install case) are recorded with output; no count of a growable set in the prose.

## Output

Per claim, the verdict and its evidence. Then findings outside the claims, each with `file:line`. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
