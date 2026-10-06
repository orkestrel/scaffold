s47 finished after 2202 s: exit=0 signal=none capped=false duration_ms=2199057
Implemented S47 without committing. See the [complete diff](/home/user/scaffold/tmp/codex/s47.diff).

`PLAYWRIGHT_SCROLLBARS=classic` follows the names rule’s qualified-constant form: `PLAYWRIGHT` supplies context, and `SCROLLBARS` names the feature. `classic` names its presentation. Every launch branch gains `ignoreDefaultArgs: ['--hide-scrollbars']`; unset or empty preserves existing results. Unsupported values and the endpoint pair throw `Error`, including when an executable override is present.

All final gates passed. For the command records below:

- `FILES` means `src/core/templates.ts tests/src/core/templates.test.ts guides/scaffold.md ROADMAP.md`.
- `VITEST` means `node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --project templates tests/src/core/templates.test.ts`.
- Run folders are under `/home/user/veneer/tmp/units/journey-cost/runs/`. Each contains bare `stdout.log`, `stderr.log`, and `end.json`.

Every queued command used this form:

```text
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder FOLDER --kind command --cwd /home/user/scaffold -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

The gate results were:

| Command | Run folder | Exit | Result |
|---|---|---:|---|
| `VITEST -t scrollbar` | `s47-resolver-control` | 1 | Expected control: 5 failed, 56 filtered out |
| `VITEST -t scrollbar` | `s47-resolver-proof` | 0 | 5 passed, 56 filtered out |
| `VITEST` | `s47-templates-file` | 1 | 45 passed; suite setup failed: `The host supplies no npm-cli.js entry` |
| `npm_execpath=/home/user/.wave/npm11/node_modules/npm/bin/npm-cli.js VITEST` | [s47-templates-file-npm](/home/user/veneer/tmp/units/journey-cost/runs/s47-templates-file-npm/stdout.log) | 0 | `61 passed (61)` |
| `npm run test:templates` | [s47-templates-project](/home/user/veneer/tmp/units/journey-cost/runs/s47-templates-project/stdout.log) | 0 | `61 passed (61)` |
| `npm run check` | `s47-check` | 2 | TS2322: fixture supplied `string \| undefined` where `string` was required |
| `npm run check` | [s47-check-fixed](/home/user/veneer/tmp/units/journey-cost/runs/s47-check-fixed/stdout.log) | 0 | All configured scopes completed without diagnostics |
| `npm run test:guides` | [s47-guides](/home/user/veneer/tmp/units/journey-cost/runs/s47-guides/stdout.log) | 0 | `45 passed (45)` |
| `node_modules/.bin/oxfmt --config .oxfmtrc.json --check FILES` | `s47-format-check`, [s47-format-final](/home/user/veneer/tmp/units/journey-cost/runs/s47-format-final/stdout.log) | 0 each | `All matched files use the correct format.` |
| `node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings FILES` | `s47-lint-check`, [s47-lint-final](/home/user/veneer/tmp/units/journey-cost/runs/s47-lint-final/end.json) | 0 each | No stdout or stderr |
| `git diff --check` | Direct: `/home/user/scaffold` | 0 | No output |
| `git status --porcelain` | Direct: `/home/user/scaffold` | 0 | Output below |

Formatting convergence used `node_modules/.bin/oxfmt --config .oxfmtrc.json --write FILES` in `s47-format-write` and `s47-format-fixed`; both exited `0`.

The final status is:

```text
 M ROADMAP.md
 M guides/scaffold.md
 M src/core/templates.ts
 M tests/src/core/templates.test.ts
```

The deviations were resolved:

- **Refusal convention:** Expected a resolver-owned refusal; found unknown channels passed through to Playwright, whose installed implementation throws `Error` at `coreBundle.js:39786`. Used `Error` and documented the behavior. Hypothesis: the brief referred to the downstream refusal.
- **Direct Vitest setup:** Expected npm discovery to work; the recorded file run failed at `tests/setupServer.ts:690`. Supplied `npm_execpath`; the retry passed without weakening tests. Hypothesis: direct invocation missed the host’s npm entry.
- **Fixture typing:** Expected the endpoint fixture to typecheck; TS2322 identified an explicit `undefined` value. Changed the fixture to omit that property, preserving its serialized input. The comprehensive check passed.
- **Queue placement:** The brief named direct formatter/linter runs; your current instruction required every CPU-loading command through the queue. Both ran through fresh queue folders.
- **Template diagnostics:** Passing template runs emitted the existing malformed-config negative test’s warning and config-load error. Both runs exited `0`; no assertion or skip was added to bypass them.

[exited with code 0]
