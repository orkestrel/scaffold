# Agent native guides entry report

## Outcome

Agent's package-owned guide proof now enters through `GuideCommand`. The outer Node path imports only `GuideCommand`, `readInventory`, and `createVitest`. The callback receives Guide's fresh `files`, `report`, and `rows`, then loads alias-bound runtime modules and registers Vitest assertions there.

## Touched paths

- `C:/Users/mikes/WebstormProjects/agent/tests/guides.test.ts` — replaced the local parity engine with the native Guide command while retaining Agent's owned inventory and runtime proofs.
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-agent-native-entry-report.md` — records the bounded writer result.

No manifest, lockfile, guide, source, vendored file, or script changed. No shared-file patch is required.

## Changed responsibilities

| Responsibility | Result |
| --- | --- |
| Native entry | `GuideCommand` owns argument handling, fresh inventory, read-only reporting, explicit rewrite selection, and the guides worker run. |
| Workspace policy | Agent supplies `new URL('../', import.meta.url)`, its inventory globs, the `@orkestrel/agent` and `@src/core` module map, and the admitted `ts` fence language. |
| Generic parity | The assertions read Guide's `report` for input, fence, section, method, declaration, drift, example, import, link, test-link, and pitch findings. |
| Package identity | The callback parses the fresh `package.json` inventory, requires a record, and checks its `name` against `@orkestrel/agent`. |
| Summary presence | The accepted guard rejects a documented or declared surface symbol whose `summary` is absent. |
| Internal inventory | Agent retains its explicit empty `INTERNAL` list and the direct-versus-barrel assertions that make the list accountable. |
| Runtime loading | `@src/core`, `@orkestrel/tool`, `@orkestrel/contract`, `@orkestrel/guide`, `@orkestrel/test`, and `vitest` load inside the anonymous async callback. |

## Preservation mapping

| Package-owned proof | Preserved behavior |
| --- | --- |
| Titled example population | The earlier local title-intersection algorithm is replaced by `report.examples.titles`, filtered to `guides/agent.md`. |
| Instruction rendering | The test still creates the instruction manager, adds `safety`, checks the `open` header and rendered content, and checks the guide lines copied by the transcription. |
| Tool dispatch | The test still registers `add`, dispatches the successful call and the missing-tool call, checks their full result objects, and checks the matching guide lines. |
| Token sanitization | The test still checks `sanitizeToken(12.7)` returns `12` and checks the matching guide line. |
| Conversation snapshot | The test still creates and clears `thread-1`, checks the durable key sequence, and checks the matching guide line. |

## Baseline and scoped validation

Root's retained baseline at `tmp/pass/d7n-agent-native-entry-red/action.stderr.txt` reports `ERR_MODULE_NOT_FOUND` for the top-level `@src/core` import before Vitest assertion registration. Its retained exit value is `1`. The retained artifact does not name the outer command or a failing test total, so this writer does not invent either value. Root owns the same-command passing run.

The writer ran these read-only scoped checks:

- `git status --short` in Agent reported only `M tests/guides.test.ts`.
- `git diff --check -- tests/guides.test.ts` exited `0` with no output.
- `rg -n '^import ' tests/guides.test.ts` reported only the accepted outer imports.
- The forbidden-residue search found no Abort import, top-level alias import, top-level Vitest import, or retired local parity algorithm.
- The text-integrity search for `â` and `�` found no match.
- `git diff --stat -- tests/guides.test.ts` reported `tests/guides.test.ts | 489 ++++++++++++++++++++-------------------------------`.
- `git diff --numstat -- tests/guides.test.ts` reported `187 302 tests/guides.test.ts`.

Native execution, formatting, lint, typecheck, build, and test gates were not run in the writer. Root owns those runs.
