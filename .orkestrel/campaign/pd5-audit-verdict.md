1. **CONFIRMED.** The inferred-project branch returns `origin: 'workspace'`, while a caller-selected project still throws `claimant` / `refused` (`src/server/stages/TypeStage.ts:441`, `src/server/stages/TypeStage.ts:443`, `src/server/stages/TypeStage.ts:454`). The focused test passed (`tests/src/server/stages/TypeStage.test.ts:169`). Lint accepts only URI-bearing publications (`src/server/stages/LintStage.ts:396`, `src/server/stages/LintStage.ts:411`), and runtime derives paths from stack frames with the declared test as its fallback (`src/server/stages/RuntimeStage.ts:887`). No other TypeScript file-less diagnostic door exists.

2. **BROKEN.** The escaped `\n` boundary holds (`tests/src/server/helpers.test.ts:166`), but the global replacements at `src/server/helpers.ts:230` are not bounded to contained paths. Exact failing input:

   ```text
   workspace: /home/user/orkestrel/probe
   message: Cannot find /mirror/home/user/orkestrel/probe/src/core/greeting.ts
   actual: Cannot find /mirrorsrc/core/greeting.ts
   expected: unchanged
   ```

   A root workspace also fails:

   ```text
   workspace: /
   message: Cannot find /tmp/probe/greeting.test.ts
   actual: unchanged
   expected: Cannot find tmp/probe/greeting.test.ts
   ```

   The revision expression also rewrites a target-owned name carrying a complete marker, contrary to the remarks at `src/server/helpers.ts:199`:

   ```text
   input: Failed tmp/notes.probe-4821-1f0c9d2e-3a4b-4c6d-8e8f-90ab1c2d3e4f.ts
   actual: Failed tmp/notes.ts
   ```

   The smallest correct fix is to bound root replacement to actual path-token boundaries, handle roots that already end in a separator, and replace only the exact generated specification known to `RuntimeStage` instead of removing every revision-shaped substring from arbitrary prose. Add these inputs beside `tests/src/server/helpers.test.ts:132`.

3. **CONFIRMED.** Runtime messages pass through `relativeWorkspaceMessage` before issue classification (`src/server/stages/RuntimeStage.ts:887`). The regression test requires the declared name, rejects the revision suffix, and rejects the workspace root (`tests/src/server/stages/RuntimeStage.test.ts:265`). Cleanup remains outside that path and retains the generated filename because it names the undeletable file (`tests/src/server/stages/RuntimeStage.test.ts:1270`, `tests/src/server/stages/RuntimeStage.test.ts:1289`). The supplied uncontended host run also passed the complete server project, including the FIFO-rendezvous timing test.

4. **BROKEN.** The record contradicts itself. The escaped-text row reports a red against whole-message normalization (`/home/user/scaffold/.orkestrel/campaign/pd5-report.md:32`), then states that every red used baseline source while expressly admitting that this red used the discarded variant (`/home/user/scaffold/.orkestrel/campaign/pd5-report.md:34`). Baseline had no `relativeWorkspaceMessage` export, so that baseline could only produce the missing-function failure recorded for the helper suite (`/home/user/scaffold/.orkestrel/campaign/pd5-report.md:31`). The smallest correct fix is evidence wording: identify the party, runtime, and helper reds as baseline records, and identify the escaped-text red as the negative control against the rejected intermediate implementation.

5. **BROKEN.** The parameter was removed and its throwing call sites were updated (`src/server/stages/TypeStage.ts:283`, `src/server/stages/TypeStage.ts:297`, `src/server/stages/TypeStage.ts:373`). The “no behavior lost” part fails for a root workspace. Baseline translation with `path: '/tsconfig.json'` changed `Cannot read /tsconfig.json` to `Cannot read tsconfig.json`; the replacement helper leaves it absolute because it searches for `//` (`src/server/helpers.ts:227`, `src/server/helpers.ts:232`). Handle an already separator-terminated root before claiming that the parameter is redundant.

6. **BROKEN.** Scope honesty holds: the live diff matches the supplied PD5 diff byte-for-byte and changes only the paths recorded at `/home/user/scaffold/.orkestrel/campaign/pd5-report.md:61`; the helper is barrel-exported (`src/server/index.ts:2`), directly tested (`tests/src/server/helpers.test.ts:132`), uses `#` privacy at its call sites, and states the Windows separator limit (`src/server/helpers.ts:205`). Law conformance fails because its public TSDoc says a target-owned `.probe-` name remains unchanged (`src/server/helpers.ts:199`), while the complete-marker input under claim 2 proves otherwise. The existing owned-name test covers only draft and partial markers (`tests/src/server/helpers.test.ts:175`). Restrict revision rewriting to the exact generated specification and add the complete-marker regression.

FAIL: 2, 4, 5, 6