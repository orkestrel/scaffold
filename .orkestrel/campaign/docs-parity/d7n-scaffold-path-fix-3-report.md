# Unit d7n-scaffold-path-fix-3 report

## Outcome

Added the repeated-separator direct control. Restored the normalizer after the control proved red.
The filename helper now uses `file:` URI wording in its TSDoc. The real-binary comparison root uses
`realpathSync.native(scratch.path)` with the requested reason beside it.

## Changed owned paths

- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tests/setupPolicy.test.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tests/setupPolicy.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tests/config.test.ts`

## Control evidence

Removed only `.replace(/\\/+/gu, '/')` from `normalizePolicyPath`, then ran:

```text
npm run test:setup -- tests/setupPolicy.test.ts
exit 0
```

Raw output: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/duplicate-before-control.log.txt`

Added `expect(normalizePolicyPath('src//member.ts')).toBe('src/member.ts')` while that source
mutation remained. The same command exited `1` and reported:

```text
Expected: "src/member.ts"
Received: "src//member.ts"
```

Raw output: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/duplicate-red.log.txt`

Restored the exact collapse and reran the command. It exited `0`.

Raw output: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/duplicate-green.log.txt`

Replaced `fileURLToPath(filename)` with `new URL(filename).pathname`, then ran the same command.
It exited `1`: generated file-URI path cases failed and the malformed URI no longer threw.

Raw output: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/file-url-red.log.txt`

Restored `fileURLToPath(filename)` and reran the command. It exited `0`.

Raw output: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/file-url-green.log.txt`

## Scoped validation

```text
npm run test:setup -- tests/setupPolicy.test.ts
exit 0

npm run test:config -- tests/config.test.ts -t "loads every configured policy rule through the real binary"
exit 0

npx oxfmt --config .oxfmtrc.json --check tests/setupPolicy.ts tests/setupPolicy.test.ts tests/config.test.ts
exit 0

npx oxlint --config .oxlintrc.json --deny-warnings tests/setupPolicy.ts tests/setupPolicy.test.ts tests/config.test.ts
exit 0

git -C C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path diff --check
exit 0
```

Each npm or npx command ran through the saved Bash scripts:

- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/setup-policy.sh`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/config-policy.sh`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/checks.sh`

Raw output:

- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/config-policy.log.txt`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/checks.log.txt`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/diff-check.log.txt`

## Retained state

The retained before and after status contain the pre-existing `.claude/rules/portability.md`,
`host.json`, `tests/setup.ts`, and predecessor changes to the owned files. This unit added only the
direct assertion, TSDoc terminology, comparison-root canonicalizer, and comment.

- Before status: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/status-before.txt`
- After status: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/status-after.txt`
- Before diff: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/diff-before.patch`
- After diff: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/diff-after.patch`
- Untracked test diff: `C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-3/setupPolicy-test-after.patch`

No shared-file patch is required.
