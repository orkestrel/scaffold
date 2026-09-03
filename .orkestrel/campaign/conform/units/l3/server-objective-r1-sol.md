## Per-claim verdicts

1. **CONFIRMED.** Every row has an `applied` or `noop` disposition at `/home/user/scaffold/tmp/units/conform/conform-server-report.md:20-41`. Each disposition matches the diff.

2. **CONFIRMED.** The operative repairs appear in source, tests, and documentation, including `src/server/validators.ts:1-30`, `src/server/helpers.ts:103-109`, `src/server/Stream.ts:65-72`, and `tests/guides.test.ts:190-254`.

3. **REFUTED.** The rerun pattern `\b(requestEncoding|requestEncodings|requestEncoded|requestEncodinged|requestEncodinging|resolvePort|resolvePorts|resolvePorted|resolvePorting)\b`, case-insensitive over `src`, `tests`, `guides/server.md`, `guides/README.md`, and `README.md`, returned empty. However, the writer recorded the `resolvePort` sweep only over `src`, `tests/src`, and `tests/guides.test.ts` at `/home/user/scaffold/tmp/units/conform/conform-server-report.md:106`. Record the required full population.

4. **REFUTED.** Several commands are abbreviated with `…` at `/home/user/scaffold/tmp/units/conform/conform-server-report.md:75-82`, so they are not exact commands. The `server-subj-4` red used the helpers test file, but its cited green used the broader server project. The `server-obj-10` control failed 55 unrelated cases at `/home/user/work/evidence/server-proofs/obj-10-planted-red.txt:10-730`, contrary to the requirement that the control fail the test naming the defect. Record full commands, supply same-command green evidence, and replace broad controls with narrowly failing controls or record the unreachable branch as unproved.

5. **CONFIRMED.** Interface methods at `src/server/types.ts:268-312`, `src/server/types.ts:394-411`, and `src/server/types.ts:745-790` match the guide tables at `guides/server.md:199-241`. Surface rows include readonly data, guide fences use `@orkestrel/server`, and the `AGENTS\s*§` sweep over the named population returned empty.

6. **CONFIRMED.** The breaking rename and exact importer edit appear at `/home/user/scaffold/tmp/units/conform/conform-server-report.md:139-168`. The observable header and error-class changes and their unaffected consumers are recorded at lines 168-170.

7. **CONFIRMED.** Every path in `/home/user/work/evidence/conform-server.status:1-18` is owned under `/home/user/scaffold/tmp/units/conform/conform-server-brief.md:32-37`. No lockfile, dependency directory, off-limits file, compatibility alias, or shim appears.

8. **CONFIRMED.** Added-line sweeps found no `.skip`, `.only`, `.todo`, retry, inflated timeout, or debug control. The `timeout` match at `/home/user/work/evidence/conform-server.diff:56-58` names the dependency guide. The independent gate reading is **NOT-EVIDENCED** and remains for the landing run.

9. **CONFIRMED.** Added-line sweeps found no TODO, deferred code, commented-out implementation, console output, or debugger statement. The report’s disposition and touched-file tables match the diff and status.

## Findings outside the claims

O1. Added guide prose uses the prohibited term `via` at `guides/server.md:93`, `guides/server.md:105`, and `guides/server.md:122`. Replace it with `by setting`, `by using`, and `through`, respectively.

O2. `src/server/validators.ts:7-9` says the file imports local types, constants, errors, and `helpers.ts`, but its imports at `src/server/validators.ts:1-2` do none of that. Replace the false graph description with the checkable fact that the module is a leaf and imports no implementation class.

## Referrals to the Orchestrator

R1. Does the registry artifact for `@orkestrel/codec@0.0.1` export `encodeHex`, or must codec publish before server?

R2. Does the independent landing run pass `format:check`, `lint:check`, `check`, `build`, and `test`?

FAIL 3, 4