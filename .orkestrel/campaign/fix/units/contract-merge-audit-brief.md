# Audit contract-merge — falsify the reconciliation of origin/main into the campaign branch

## Role and engine

`reviewer` on Claude Opus 5 holding the OBJECTIVE lane in a clean context (Sol dark; the writer was
Opus; attack the half your engine wrote). Read-only.

## Subject

- Merge diff: `/home/user/scaffold/tmp/units/breaking/contract-merge.diff` (`git diff 5b0ed57 2c15840`
  in `/home/user/fleet/contract`; the merge commit is `2c15840`, its parents `5b0ed57` and
  `c13cfae`).
- Main's own diff for comparison: `git diff 3193da1 c13cfae` in that checkout (run nothing; read
  it with `git show`-free means: the files at `origin/main` are readable through
  `/home/user/fleet/contract/.git` only by a shell, which you lack — so compare against the
  merge report's claims and the tree).
- Report: `/home/user/scaffold/tmp/units/breaking/contract-merge-report.md`.
- Brief: `/home/user/scaffold/tmp/units/breaking/contract-merge-brief.md` (its Evidence names the
  renames main's code must adopt; its Precedent names the resolution rule).
- Tree: `/home/user/fleet/contract` at `2c15840`.

## Claims

1. No conflict marker remains, and every file main changed carries main's change: `ownPattern`
   is exported from `src/core/helpers.ts` and documented in `guides/contract.md`; `buildStringFaults`
   accepts main's `pattern` parameter and both `ContractCompiler.ts` string leaves pass it;
   `readArrayEntries` carries main's canonical fast path; `readValue` builds diagnostics only on
   refusal with the hoisted `subject`; main's new tests exist in `helpers.test.ts`,
   `compilers.test.ts`, and `integration.test.ts`.
2. Every branch outcome survives the merge: the spines stay interned (no `schemaNodeToShape`,
   `inferValue`, `canonicalizeValue`, or their siblings under `src`, `tests`, `guides`),
   `INTRINSICS.reflect` stands with no flat `reveal`/`declare`/`parent`/`read`/`write`/`members`/`present`/`apply`/`construct`,
   `validateShape`, `build*Faults`, `matchesISOInstant`, `limits.depth`/`limits.properties`, and
   `expansion: number | undefined` stand; the cloners keep the frozen empty-peer pattern.
3. Main's new code names no renamed symbol: search `src` and `tests` for every old name in the
   brief's Evidence and for `createStringFaults`; report any hit.
4. The guide's reporting table, `readArrayEntries` row, and scope-claim paragraph describe the
   merged tree (name the exact rows you checked), and no count over a growable set was
   reintroduced.
5. `package.json` and `package-lock.json` are byte-identical to `5b0ed57`'s (the diff touches
   neither).

## Output

Per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, NOT-EVIDENCED) with evidence, then one
terminal line `PASS` or `FAIL <claims>`. No process diary.
