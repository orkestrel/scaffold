Unit V2 is complete. No deviation occurred.

## Complete diff

The complete unelided owned-file diff is available here:

[unit-v2-final.diff](C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/unit-v2-final.diff)

```text
Length: 116223 bytes
Lines: 3101
SHA256: E6D90E8C3423CE361F6B8F82DCBC03AFF59DA2EF28987714F0D00C8513300434
```

## Status boundary

Before:

```text
 M .claude/rules/workspace.md
M  package-lock.json
 M package.json
 M src/bin/CLI.ts
 M src/bin/helpers.ts
 M src/bin/types.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/Materializer.ts
 M src/server/Upstream.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/bin/helpers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/Upstream.test.ts
?? .orkestrel/campaign/design-versions-brief-amendment1.md
?? .orkestrel/campaign/design-versions-brief-amendment2.md
?? .orkestrel/campaign/design-versions-brief.md
?? .orkestrel/campaign/design-versions-objective-report.md
?? .orkestrel/campaign/design-versions-reconciliation.md
?? .orkestrel/campaign/design-versions-subjective-report.md
?? .orkestrel/campaign/unit-v1-brief.md
?? .orkestrel/campaign/unit-v1-report.md
?? .orkestrel/campaign/unit-v2-brief-amendment1.md
?? .orkestrel/campaign/unit-v2-brief.md
?? .orkestrel/campaign/unit-v2-deviation.md
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

After:

```text
 M .claude/rules/workspace.md
M  package-lock.json
 M package.json
 M src/bin/CLI.ts
 M src/bin/helpers.ts
 M src/bin/main.ts
 M src/bin/types.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/Materializer.ts
 M src/server/Upstream.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/bin/helpers.test.ts
 M tests/src/bin/main.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/Upstream.test.ts
?? .orkestrel/campaign/design-versions-brief-amendment1.md
?? .orkestrel/campaign/design-versions-brief-amendment2.md
?? .orkestrel/campaign/design-versions-brief.md
?? .orkestrel/campaign/design-versions-objective-report.md
?? .orkestrel/campaign/design-versions-reconciliation.md
?? .orkestrel/campaign/design-versions-subjective-report.md
?? .orkestrel/campaign/unit-v1-brief.md
?? .orkestrel/campaign/unit-v1-report.md
?? .orkestrel/campaign/unit-v2-brief-amendment1.md
?? .orkestrel/campaign/unit-v2-brief.md
?? .orkestrel/campaign/unit-v2-deviation.md
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

Only the amendment-approved `src/bin/main.ts` and `tests/src/bin/main.test.ts` joined the standing paths.

## Format and lint

```text
> npx.cmd oxfmt --config .oxfmtrc.json --check package.json src/core/constants.ts src/server/Materializer.ts src/server/Upstream.ts src/bin/CLI.ts src/bin/helpers.ts src/bin/main.ts src/bin/types.ts tests/src/server/Materializer.test.ts tests/src/server/Upstream.test.ts tests/src/bin/CLI.test.ts tests/src/bin/helpers.test.ts tests/src/bin/main.test.ts

Checking formatting...

All matched files use the correct format.
Finished in 12ms on 13 files using 16 threads.
npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run oxfmt --config .oxfmtrc.json --check package.json src/core/constants.ts src/server/Materializer.ts src/server/Upstream.ts src/bin/CLI.ts src/bin/helpers.ts src/bin/main.ts src/bin/types.ts tests/src/server/Materializer.test.ts tests/src/server/Upstream.test.ts tests/src/bin/CLI.test.ts tests/src/bin/helpers.test.ts tests/src/bin/main.test.ts

Exit code: 0
```

```text
> npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/core/constants.ts src/server/Materializer.ts src/server/Upstream.ts src/bin/CLI.ts src/bin/helpers.ts src/bin/main.ts src/bin/types.ts tests/src/server/Materializer.test.ts tests/src/server/Upstream.test.ts tests/src/bin/CLI.test.ts tests/src/bin/helpers.test.ts tests/src/bin/main.test.ts

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/core/constants.ts src/server/Materializer.ts src/server/Upstream.ts src/bin/CLI.ts src/bin/helpers.ts src/bin/main.ts src/bin/types.ts tests/src/server/Materializer.test.ts tests/src/server/Upstream.test.ts tests/src/bin/CLI.test.ts tests/src/bin/helpers.test.ts tests/src/bin/main.test.ts

Exit code: 0
```

## TypeScript

```text
> npx.cmd tsc --noEmit --project tsconfig.json

npm notice run @orkestrel/scaffold@0.0.47 npx
npm notice run tsc --noEmit --project tsconfig.json

Exit code: 0
```

## Mutation proof: range-clamped fallback

Plant: return `dist-tags.latest` without checking the declared range.

```text
> npx.cmd vitest run tests/src/server/Upstream.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:server -t "never crosses the declared major when the version map is absent"

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

--------x-------------------------------

 Test Files  1 failed (1)
      Tests  1 failed | 39 skipped (40)
   Start at  12:26:16
   Duration  972ms (transform 420ms, setup 728ms, import 42ms, tests 46ms, environment 0ms)

 FAIL  |src:server| tests/src/server/Upstream.test.ts > Upstream lookup > never crosses the declared major when the version map is absent
AssertionError: expected 'found' to be 'failed' // Object.is equality

Expected: "failed"
Received: "found"

 ❯ tests/src/server/Upstream.test.ts:167:28
    165|     buildDependency({ name: '@orkestrel/router', range: '^1.0.0' }),
    166|    ])
    167|    expect(release?.lookup).toBe('failed')
       |                            ^
    168|    expect(release?.latest).toBe(undefined)
    169|   } finally {

Exit code: 1
```

Plant removed:

```text
> npx.cmd vitest run tests/src/server/Upstream.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:server -t "never crosses the declared major when the version map is absent"

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

--------·-------------------------------

 Test Files  1 passed (1)
      Tests  1 passed | 39 skipped (40)
   Start at  12:26:29
   Duration  973ms (transform 424ms, setup 729ms, import 47ms, tests 42ms, environment 0ms)

Exit code: 0
```

## Mutation proof: complete overwrite release set

Plant: accept a partial release set and retain the failed declaration.

```text
> npx.cmd vitest run tests/src/bin/CLI.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:bin -t "writes no range when one release lookup fails"

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

------------------------------------------------------------------------------------------------x--------

 Test Files  1 failed (1)
      Tests  1 failed | 104 skipped (105)
   Start at  12:27:05
   Duration  1.65s (transform 319ms, setup 583ms, import 170ms, tests 743ms, environment 0ms)

 FAIL  |src:bin| tests/src/bin/CLI.test.ts > CLI overwrite > writes no range when one release lookup fails
AssertionError: expected +0 to be 1 // Object.is equality

- Expected
+ Received

- 1
+ 0

 ❯ tests/src/bin/CLI.test.ts:3229:17
    3227|     '--json',
    3228|    ])
    3229|    expect(code).toBe(EXIT_DRIFT)
       |                 ^
    3230|    const result: OverwriteResult = JSON.parse(sink.output[0] ?? '')
    3231|    expect(result.note ?? '').toContain('The catalog step did not compl…

Exit code: 1
```

Plant removed:

```text
> npx.cmd vitest run tests/src/bin/CLI.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:bin -t "writes no range when one release lookup fails"

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

------------------------------------------------------------------------------------------------·--------

 Test Files  1 passed (1)
      Tests  1 passed | 104 skipped (105)
   Start at  12:27:19
   Duration  1.61s (transform 338ms, setup 617ms, import 179ms, tests 658ms, environment 0ms)

Exit code: 0
```

## Project tests

```text
> npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

 Test Files  5 passed (5)
      Tests  355 passed | 4 skipped (359)
   Start at  12:29:04
   Duration  3.11s (transform 2.17s, setup 3.67s, import 448ms, tests 4.60s, environment 1ms)

Exit code: 0
```

```text
> npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bin

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/scaffold

 Test Files  3 passed (3)
      Tests  176 passed (176)
   Start at  12:30:52
   Duration  26.64s (transform 904ms, setup 1.82s, import 368ms, tests 26.86s, environment 0ms)

Exit code: 0
```

## Required core observation

```text
> npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core

 Test Files  1 failed | 7 passed (8)
      Tests  4 failed | 315 passed (319)
   Duration  9.54s

FAIL |src:core| tests/src/core/compilers.test.ts
  blueprintToDevDependencies compile tooling
    keeps library publishing tools in a source workspace
      Expected "^7.58.12"
      Received "^7.58.13"

    keeps library publishing tools in an executable workspace
      Expected "^7.58.12"
      Received "^7.58.13"

    keeps a generated source workspace manifest byte-stable
      Expected "f9730110f2e22865072beb207ccafd7a557481bf012b6346ac919c0730e341c1"
      Received "77c193d5aa81868b6813f41cf6fd3e4347c48cf95c0a60d174f3078f26b66f4f"

  blueprintToScripts config projects
    registers and gates setup proofs only when the blueprint selects them
      Fixture differs at the amended package floors and standing fleet versions.

Exit code: 1
```

These are exactly the V3-owned compiler mirror and digest cases expected by the amendment. No other core test failed.

## Async migration count

```text
> (git diff -U0 -- tests/src/bin/CLI.test.ts | Select-String -Pattern '^\+.*await new CLI').Count

115

Exit code: 0
```

## Deviations

None.