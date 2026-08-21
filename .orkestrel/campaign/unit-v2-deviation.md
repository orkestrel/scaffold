BLOCKED — the acceptance criterion conflicts with V2’s scope.

`src:bin` now has one failure:

```text
Test Files  1 failed | 2 passed (3)
Tests       1 failed | 171 passed (172)
Exit code: 1

FAIL tests/src/bin/main.test.ts
expected process.exitCode 0, received 1
```

`main.test.ts` imports `src/bin/main.ts`, which constructs `new CLI()` without an injectable loopback registry. Registry-aware `audit` therefore contacts the blocked live registry and returns exit 1. Neither file is V2-owned. The brief requires stopping when a criterion is unreachable.

### Criterion evidence

Start status:

```text
 M .claude/rules/workspace.md
D  package-lock.json
 M package.json
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/src/core/helpers.test.ts
?? .orkestrel/campaign/design-versions-brief-amendment1.md
?? .orkestrel/campaign/design-versions-brief.md
?? .orkestrel/campaign/design-versions-objective-report.md
?? .orkestrel/campaign/design-versions-reconciliation.md
?? .orkestrel/campaign/design-versions-subjective-report.md
?? .orkestrel/campaign/unit-v1-brief.md
?? .orkestrel/campaign/unit-v1-report.md
?? .orkestrel/campaign/unit-v2-brief.md
?? package-lock.json
```

Current status:

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
?? .orkestrel/campaign/unit-v2-brief.md
```

`design-versions-brief-amendment2.md` appeared concurrently and was not authored by V2.

Owned bin proof:

```text
Command:
npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bin tests/src/bin/CLI.test.ts tests/src/bin/helpers.test.ts

Test Files  2 passed (2)
Tests       170 passed (170)
Exit code: 0
```

Full bin proof:

```text
Command:
npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bin

Test Files  1 failed | 2 passed (3)
Tests       1 failed | 171 passed (172)
Exit code: 1

FAIL tests/src/bin/main.test.ts
@orkestrel/emitter: TypeError: fetch failed
@orkestrel/guide: TypeError: fetch failed
@orkestrel/probe: TypeError: fetch failed
@orkestrel/scaffold: TypeError: fetch failed
@orkestrel/test: TypeError: fetch failed
AssertionError: expected 1 to be +0
```

Async call-site count:

```text
Command:
$before = git show HEAD:tests/src/bin/CLI.test.ts | Select-String -Pattern 'new CLI'
$after = Select-String -Path tests/src/bin/CLI.test.ts -Pattern 'new CLI'
$beforeAwait = git show HEAD:tests/src/bin/CLI.test.ts | Select-String -Pattern 'await new CLI'
$afterAwait = Select-String -Path tests/src/bin/CLI.test.ts -Pattern 'await new CLI'

before calls: 130
after calls: 130
before awaited: 130
after awaited: 130
```

The async change moved `0` call sites; every call was already awaited.

Never-cross-major failing-first evidence:

```text
Command:
npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server -t "never crosses the declared major"

Test Files  1 failed | 4 skipped (5)
Tests       1 failed | 357 skipped (358)
Expected: "failed"
Received: "found"
Exit code: 1
```

The required plant-removal green pair, overwrite mutation pair, format/lint, final TypeScript check, and server gate were not run after the stop condition.

### Diff

The complete current V2 diff is available with:

```powershell
git diff -- src/server/Upstream.ts src/server/Materializer.ts src/server/types.ts src/bin/CLI.ts src/bin/types.ts src/bin/helpers.ts tests/src/server/Upstream.test.ts tests/src/server/Materializer.test.ts tests/src/bin/CLI.test.ts tests/src/bin/helpers.test.ts
```

I cannot provide an accepted final diff or claim completion while the brief’s mandatory gate remains unreachable. The temporary probe under `tmp/` was deleted.

Required resolution: authorize changes outside V2 ownership for the `main.ts` entry test seam, or exclude `main.test.ts` from V2’s `src:bin` acceptance gate.