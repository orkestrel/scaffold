# Unit d7n-scaffold-path-fix-2 report

## Outcome

Implemented the bounded diagnostic-filename normalization unit in the isolated checkout. The real-binary regression changed from red to green with the same command. Scoped format and lint checks pass. The direct setup-policy proof passes. Root retains the known host-staging and dependency-closure limits for integration after this writer releases the checkout.

## Touched paths

- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tests/setupPolicy.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tests/config.test.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tests/setupPolicy.test.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tests/setup.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/.claude/rules/portability.md`

No off-limits source, configuration, manifest, lockfile, inventory, generated host, target, or campaign artifact was edited. No dependency was installed. No build, inventory regeneration, commit, push, or publish ran.

## Implemented behavior

- `normalizePolicyFilename` resolves the comparison root with `node:path.resolve`.
- It converts only a `file:`-prefixed filename with `node:url.fileURLToPath`.
- It resolves every other filename as a native path against the resolved root.
- It relativizes from that root and delegates separator normalization to `normalizePolicyPath`.
- It leaves malformed file-URL failures visible and leaves outside-root paths distinguishable.
- The real Oxlint proof derives one comparison root from `realpathSync(scratch.path)` and normalizes diagnostic and expected filenames through the helper.
- The setup proof covers native relative paths, native absolute paths, generated file URLs, spaces, percent signs, hash characters, Unicode, literal `%20` native input, distinct files, distinct roots, malformed file URLs, and the unchanged logical normalizer.
- The portability rule carries the brief's exact `fileURLToPath` directive directly after the `pathToFileURL` directive.

## Defect proof

The exact command ran through the saved Git Bash carrier:

```text
npm run test:config -- tests/config.test.ts -t "loads every configured policy rule through the real binary"
```

Before the fix, the command exited `1` and reported:

```text
Test Files  1 failed (1)
Tests       1 failed | 172 skipped (173)
```

Raw output: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/red.log`

After the fix, the same command exited `0` and reported:

```text
Test Files  1 passed (1)
Tests       1 passed | 172 skipped (173)
```

Raw output: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/green-config.log`

## Scoped validation

The direct setup-policy proof passed:

```text
npm run test:setup -- tests/setupPolicy.test.ts
exit 0
Test Files  1 passed (1)
Tests       4 passed (4)
```

Raw output: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/setup-policy.log`

The scoped format check passed:

```text
npx oxfmt --config .oxfmtrc.json --check tests/setupPolicy.ts tests/config.test.ts tests/setupPolicy.test.ts tests/setup.ts .claude/rules/portability.md
exit 0
```

Raw output: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/format-check.log`

The scoped lint check passed:

```text
npx oxlint --config .oxlintrc.json --deny-warnings tests/setupPolicy.ts tests/config.test.ts tests/setupPolicy.test.ts tests/setup.ts
exit 0
```

Raw output: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/lint-check.log`

The candidate diff carries no whitespace error. The tracked check exited `0`. The untracked no-index check returned the expected diff status `1` and emitted no whitespace diagnostic. The retained evidence carrier exited `0` after validating those results.

Raw outputs:

- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/diff-check.log`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/setupPolicy-test-check.log`

## Expected integration limits

The complete setup project command ran as required:

```text
npm run test:setup
exit 1
```

The setup-policy file passed. The setup-server fixture failed because the owned `.claude/rules/portability.md` edit makes the off-limits staged host bytes stale:

```text
ScaffoldError: The vendored host cannot read the declared file at .claude/rules/portability.md
```

Raw output: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/setup.log`

Root confirmed that it will regenerate the host and inventory after this writer releases the checkout.

The root TypeScript project command ran as required:

```text
npx tsc --noEmit --project tsconfig.json
exit 1
```

Its final output contains no diagnostic in an owned path. Every diagnostic comes from `scripts/docs.ts` or `tests/guides.test.ts` against the installed registry `@orkestrel/guide` 0.0.17 surface. Root confirmed that its separate dependency-alignment work owns the bootstrap guide artifact.

Raw output: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/check-root.log`

No Linux gate reading was produced by this unit.

## Candidate diff and status

Tracked diff: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/diff.patch`

Untracked test diff: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/setupPolicy-test.patch`

Status: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/status.txt`

The status is:

```text
 M .claude/rules/portability.md
 M tests/config.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
?? tests/setupPolicy.test.ts
```

The tracked diffstat is:

```text
 .claude/rules/portability.md |  2 ++
 tests/config.test.ts         | 61 +++++++++++++++++++++++++++-----------------
 tests/setup.ts               | 10 ++++++++
 tests/setupPolicy.ts         | 17 +++++++++++-
 4 files changed, 65 insertions(+), 25 deletions(-)
```

The untracked test diffstat is:

```text
 nul => tests/setupPolicy.test.ts | 40 ++++++++++++++++++++++++++++++++++++++++
 1 file changed, 40 insertions(+)
```

## Shared-file patches

None.
