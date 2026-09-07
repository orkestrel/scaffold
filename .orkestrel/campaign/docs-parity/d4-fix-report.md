# D4-fix report — stopped on a deviation in K1

## Edits applied

- **K1** (`tests/guides.test.ts`, `documents the members of every behavioural declaration`): applied exactly as quoted at `:126-127`, `:134`, `:142` (line numbers shifted after `oxfmt` reflow to `:127`, `:132`/`:140`, `:151`). All four sites read `.map((entry) => entry.name)` verbatim per the brief.
- **K2** (`tests/guides.test.ts:192`, `publishes read without the former files reader method`): applied exactly as quoted; already read `.map((entry) => entry.name)` when I first opened the file (my first two `Edit` calls against it reported "no changes to make" because the text already matched — recorded as an observation, not a defect).
- **K3** (`.claude/rules/workspace.md:132`): the `guides` row's `Proves` cell replaced with the quoted sentence. Ran `npx oxfmt --config .oxfmtrc.json --write .claude/rules/workspace.md` to re-pad the table. `git diff -w -- .claude/rules/workspace.md` shows only the target cell and the separator row moved.
- **K4**: ran `npm run build`, which chains `build:host` (121 files) and `build:inventory` (121 files) and regenerates `host.json`. Digest before the extra `build:inventory` re-run: `5c98381e91404aa6fd211a4f0394d481fe69756d68ef6b1a753cada59365280d`. Digest after the re-run: `5c98381e91404aa6fd211a4f0394d481fe69756d68ef6b1a753cada59365280d`. Identical.

## Deviation — K1's exact text fails `lint:check` in the owned file

**Expected.** K1's four sites, applied exactly as quoted, let `npm run lint:check` exit 0 (criterion 2), and `grep -c "map((entry) => entry.name)" tests/guides.test.ts` print 5 (criterion 1).

**Found.** With K1 applied exactly as quoted, `npm run lint:check` exits 1 with four `eslint(no-shadow)` warnings, because the outer loop in that test destructures `const { entry, guide, source } of inspected`, and each of K1's four `(entry) => entry.name` callbacks shadows that same `entry` binding:

```
tests/guides.test.ts:127:12: warning eslint(no-shadow): 'entry' is already declared in the upper scope.
tests/guides.test.ts:132:12: warning eslint(no-shadow): 'entry' is already declared in the upper scope.
tests/guides.test.ts:140:54: warning eslint(no-shadow): 'entry' is already declared in the upper scope.
tests/guides.test.ts:151:14: warning eslint(no-shadow): 'entry' is already declared in the upper scope.
```

I tried renaming the shadowing parameter to `method` at those four sites (K2's site is a different test with no outer `entry` in scope, so it stayed clean either way). That change made `lint:check` exit 0, but it then breaks criterion 1's literal command: `grep -c "map((entry) => entry.name)" tests/guides.test.ts` printed 1, not 5, because three of the five occurrences the criterion counts are inside the renamed test.

I reverted the rename so the tree currently carries K1 exactly as quoted (the state you asked me to leave it in), verified with `grep -c "map((entry) => entry.name)" tests/guides.test.ts` → `5`, and re-confirmed the `lint:check` failure reproduces:

```
$ grep -c "map((entry) => entry.name)" tests/guides.test.ts
5
$ npm run lint:check
tests/guides.test.ts:127:12: warning eslint(no-shadow): 'entry' is already declared in the upper scope.
tests/guides.test.ts:132:12: warning eslint(no-shadow): 'entry' is already declared in the upper scope.
tests/guides.test.ts:140:54: warning eslint(no-shadow): 'entry' is already declared in the upper scope.
tests/guides.test.ts:151:14: warning eslint(no-shadow): 'entry' is already declared in the upper scope.
(exit 1)
```

**Evidence.** The outer destructure at `tests/guides.test.ts:122` (`for (const { entry, guide, source } of inspected) {`) and K1's four call sites, all now reading `.map((entry) => entry.name)`, at `:127`, `:132`, `:140`, `:151` (post-`oxfmt` line numbers).

**Done / not done.** K2, K3, and K4 are done and pass their scoped checks. K1 is applied exactly as the brief quotes it, so `grep -c` reads 5 (criterion 1), but `lint:check` (part of criterion 2) fails on the resulting shadow warnings. I did not pick between the two conflicting instructions myself; both a literal reading of K1 and criterion 2's `lint:check` requirement cannot hold at once in this owned file, and the deviation contract names no case that resolves this for me. `format:check` and `check` were not re-run to a final green/red reading past this point because criterion 2 is already blocked; `test:policy`, `build`'s repeat-digest check, and `test:guides` were not re-run after the revert (they were run earlier during exploration against the shadowed-but-not-yet-final state and are not reported here as final readings).

**Hypothesis.** K1's four `entry` parameter names were drafted without checking them against the enclosing `for (const { entry, ... } of inspected)` loop that the same test already declares.

## Files touched

- `/home/user/scaffold/tests/guides.test.ts` (K1, K2)
- `/home/user/scaffold/.claude/rules/workspace.md` (K3)
- `/home/user/scaffold/host.json` (K4, regenerated by `npm run build`)

## git status --short

```
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M host.json
 M tests/guides.test.ts
```

`.claude/rules/documentation.md` and `.claude/rules/tests.md` are D4's pre-existing uncommitted changes; this unit touched neither.

## git diff --stat

```
 .claude/rules/documentation.md |  9 +++++++-
 .claude/rules/tests.md         | 20 ++++++++---------
 .claude/rules/workspace.md     | 20 ++++++++---------
 host.json                      |  8 +++----
 tests/guides.test.ts           | 49 +++++++++++++++++++++++++++++++++++++-----
 5 files changed, 76 insertions(+), 30 deletions(-)
```

## Flagged claims

- The K2 site already read `.map((entry) => entry.name)` before I made any edit to it. I did not independently re-verify who or what applied it; I only confirmed the current text matches the brief's quote exactly.
- I did not resolve the K1/lint conflict myself, per the deviation contract's "nothing else is yours to decide." The tree is left with K1 applied exactly as quoted (grep criterion true, lint criterion false), awaiting a decision on which of the two the correction should preserve.
