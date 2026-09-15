<!-- D4-1 — sol (GPT-6 Astra, codex exec workspace-write -C scaffold), thread 01a0a466-12f3-7e53-920d-f5f818da5134; stopped under the deviation contract before editing. Retained from --output-last-message, 2026-09-15. -->

## Deviation state

**Stopped before implementation.** Required shared fixtures are outside the brief’s owned files.

[tests/setupServer.ts](/C:/Users/mikes/WebstormProjects/scaffold/tests/setupServer.ts:1542) defines `STAGED_PATHS`, `createCheckout`, `buildCheckoutManifest`, and `buildFleetManifest` from the existing staging lists. The requested change requires updating those fixtures to supply reference guides, catalog membership, and the explicitly claimed target guides. Their consumers include server tests, executable tests, and [the paired fixture proof](/C:/Users/mikes/WebstormProjects/scaffold/tests/setupServer.test.ts:192).

The brief needs to assign that shared-fixture work. The orchestration deviation contract states: “A conflict with the primary objective stops the unit.”

## Touched files

None. Existing changes remain untouched.

`git diff --stat` returned:

```text
 .agents/templates/brief.md |  9 +++++++++
 .claude/rules/tests.md     | 27 ++++++++++++++++++++++++---
 2 files changed, 33 insertions(+), 3 deletions(-)
```

`git status --porcelain` returned:

```text
 M .agents/templates/brief.md
 M .claude/rules/tests.md
?? .orkestrel/
?? guides/supervisor.md
```

## Baseline readings

The baseline commands returned:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run check` | 0 | Root and environment typechecks passed. |
| `npm.cmd run test:src:server` | 1 | 10 failed, 430 passed, 6 skipped. Ollama setup failures and a stale inventory digest. |

The baseline included these diagnostics:

```text
mkdir: cannot create directory ‘/c/Users/mikes’: Permission denied
ScaffoldError: The vendored host cannot read the declared file at .agents/templates/brief.md
```

## Behavior proofs

No implementation tests were added or changed. Red-then-green evidence is **not run** for reference membership, guide staging and integrity, catalog coverage refusal, target guide claims, canon exclusion, or inventory reading and planting.

## Unknown’s reading

Source inspection indicates that no manifest axis is needed. `Materializer.#hydrate` selects files through `plan.artifacts`; manifest membership supplies their bytes. This reading has no executed reference-staging proof.

## Build and acceptance

`npm.cmd run build` was **not run** after the scope stop. No build refusal was observed, and `host.json` was not regenerated.

Acceptance runs for `lint:check`, `test:src:core`, `test:guides`, and `format:check` were **not run**. The `check` and `test:src:server` results are baseline readings only.