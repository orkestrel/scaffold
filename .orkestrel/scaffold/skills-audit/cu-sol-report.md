Implemented the brief within the two owned files.

### Diff

```text
 tests/policy.test.ts |  30 +++
 tests/setupPolicy.ts | 556 +++++++++++++++++++++++++++++++++++++++++++++++++--
 2 files changed, 572 insertions(+), 14 deletions(-)
```

- [tests/setupPolicy.ts](/home/user/scaffold/tests/setupPolicy.ts): added frontmatter parsing, trigger matching, reference symmetry, auxiliary-file checks, bridge inspection, workspace routing, and physical controls.
- [tests/policy.test.ts](/home/user/scaffold/tests/policy.test.ts): added folded-scalar proof, real bridge sweep, and exactly-one-violation bridge controls.
- `git diff --check`: exit 0.
- No files outside the owned scope changed.

### Exit codes

| Command | Exit | Result |
|---|---:|---|
| `npm run test:policy` | 0 | 1 file, 80/80 tests passed |
| `npm run check` | 0 | Root, core, server, and bin checks passed |
| `npm run lint:check` | 0 | No warnings or errors |
| `npm run format:check` | 0 | 198 files checked; formatting clean |

The real-tree assertions confirmed both `inspectPolicyWorkspace(process.cwd())` and `inspectSkillBridges(process.cwd())` return `[]`.

### Red/green proof

Red, before enforcement:

```text
Test Files  1 failed (1)
Tests       3 failed | 60 passed (63)
exit        1
```

The three failures were:

- Description without a `Use ` sentence.
- Unnamed `references/orphan.md`.
- Drifted bridge description.

Green, after enforcement:

```text
Test Files  1 passed (1)
Tests       80 passed (80)
exit        0
```

A focused named run also reported all three controls passing: `3 passed | 77 skipped`.

The folded `>-` description containing `: ` parses with exactly `['name', 'description']`.

### Deviations

None.