## Diff

The working-tree diff against `HEAD` includes standing edits that predated this unit:

```text
 .claude/rules/documentation.md |   3 +-
 ROADMAP.md                     | 111 +++++++++------------
 configs/policy.ts              | 177 ++++++++++++++++++++++++++++++++--
 tests/config.test.ts           |  85 ++++++++++++++--
 tests/policy.test.ts           |   7 ++
 tests/setupPolicy.ts           | 214 +++++++++++++++++++++++++++++++++++++++--
 6 files changed, 505 insertions(+), 92 deletions(-)
```

The unit-specific hunks:

- [tests/setupPolicy.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/setupPolicy.ts) splits CR, LF, and CRLF lines; recognizes fences indented through three spaces; scans canonical skills, named references, and bridge bodies; rejects unapproved directories, including empty ones; and preserves the nested-reference rule’s message ownership.
- [tests/policy.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/policy.test.ts) registers the added controls and checks the expected CR-only violation line.
- [configs/policy.ts](C:/Users/mikes/WebstormProjects/scaffold/configs/policy.ts) reports nested functions whose nearest function ancestor is a class-declaration or object method, keeps method nodes exempt, and retains the class-expression boundary.
- [tests/config.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/config.test.ts) pins the class-declaration method case, class-expression exclusion, and sanctioned visitor delegation.
- [.claude/rules/documentation.md](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/documentation.md) places the strict skill shape in the workflow-skill law.
- [ROADMAP.md](C:/Users/mikes/WebstormProjects/scaffold/ROADMAP.md) removes the landed plugin row and records the landed sweep memberships while retaining the review-owned model-routing/version-catalog work.

`git diff --check` produced no output and exited `0`.

## Criterion 1: status

The owned-path lines were identical before and after:

```text
 M .claude/rules/documentation.md
 M ROADMAP.md
 M configs/policy.ts
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
```

No dirty path was added. The complete standing status set also remained unchanged.

## Criterion 2: formatting and lint

The initial format check identified the edited setup file:

```text
Checking formatting...

tests/setupPolicy.ts (4ms)

Format issues found in above 1 files. Run without `--check` to fix.
Finished in 5ms on 4 files using 16 threads.
```

Exit code: `1`.

After formatting, the required check returned:

```text
Checking formatting...

All matched files use the correct format.
Finished in 5ms on 4 files using 16 threads.
npm notice run @orkestrel/scaffold@0.0.46 npx
npm notice run oxfmt --config .oxfmtrc.json --check tests/setupPolicy.ts tests/policy.test.ts configs/policy.ts tests/config.test.ts
```

Exit code: `0`.

Scoped lint returned:

```text
npm notice run @orkestrel/scaffold@0.0.46 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings tests/setupPolicy.ts tests/policy.test.ts configs/policy.ts tests/config.test.ts
```

Exit code: `0`.

## Criterion 3: TypeScript

```text
npm notice run @orkestrel/scaffold@0.0.46 npx
npm notice run tsc --noEmit --project tsconfig.json
```

Exit code: `0`.

## Criterion 4: failing-first evidence

The unfixed policy instrument returned:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

······························································x···x··········x···········x··

 Test Files  1 failed (1)
      Tests  4 failed | 88 passed (92)
   Duration  2.02s

 FAIL  |policy| tests/policy.test.ts > skill family policy > rejects a template TODO in a CR-only skill reference
AssertionError: expected false to be true

 FAIL  |policy| tests/policy.test.ts > skill family policy > rejects an empty non-contract directory in a skill directory
AssertionError: expected [] to have a length of 1 but got +0

 FAIL  |policy| tests/policy.test.ts > skill family policy > accepts a TODO in a three-space-indented fenced skill example
AssertionError: expected [ { rule: 'skill', …(3) } ] to deeply equal []

Received:
{
  "line": 11,
  "message": "skill documents contain no template TODOs",
  "path": ".agents/skills/sample/SKILL.md",
  "rule": "skill"
}

 FAIL  |policy| tests/policy.test.ts > skill bridge policy > rejects a template TODO in bridge prose
AssertionError: expected [] to have a length of 1 but got +0
```

Exit code: `1`.

The unfixed plugin returned:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

·······························x········

 Test Files  1 failed (1)
      Tests  1 failed | 39 passed (40)
   Duration  1.60s

 FAIL  |config| tests/config.test.ts > policy plugin > no-nested-functions > invalid > rejects a function assigned inside a class-declaration method
AssertionError: Should have 1 error but had 0: []

0 !== 1
```

Exit code: `1`.

Removing the `isPolicyVisitor` exemption after the method fix returned:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

························x···············

 Test Files  1 failed (1)
      Tests  1 failed | 39 passed (40)
   Duration  1.54s

 FAIL  |config| tests/config.test.ts > policy plugin > no-nested-functions > valid > accepts the sanctioned policy visitor delegation
AssertionError: Should have no errors but had 1

ruleId: rule-to-test/no-nested-functions
messageId: nested
nodeType: ArrowFunctionExpression
line: 4
column: 25
endLine: 4
endColumn: 60
```

Exit code: `1`. Restoring the exemption produced the green config result below.

The fixed policy instrument returned:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

····························································································

 Test Files  1 passed (1)
      Tests  92 passed (92)
   Duration  1.52s

npm notice run @orkestrel/scaffold@0.0.46 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy
```

Exit code: `0`.

The fixed plugin returned:

```text
 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

········································

 Test Files  1 passed (1)
      Tests  40 passed (40)
   Duration  1.63s

npm notice run @orkestrel/scaffold@0.0.46 npx
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project config
```

Exit code: `0`.

## Criterion 5: scoped suites

The exact required policy and config commands produced the green outputs quoted under criterion 4. Each exited `0`.

## Criterion 6: whole-tree lint

```text
npm notice run @orkestrel/scaffold@0.0.46 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```

Exit code: `0`. No `src/**` or `app/**` site red under the method fix.

## Deviations and observations

No deviation.

The brief’s known `test:src:core` standing red was not run. Its tarball-installed `@orkestrel/test` manifest reference remains owned by release preparation. Git also warned that the sandbox could not read the user-level global ignore file; each status command still exited `0` and returned the repository status.