# Unit: mcp-client-rerecord (successor to mcp-conformance-rerecord)

## Role and engine

`implementer`, Claude native. Perform this assignment directly and spawn nothing.

## Objective

Close the client half of the mcp conformance baseline at `@modelcontextprotocol/conformance` alpha.11: teach the client driver to echo object-typed schema arguments, re-measure every non-auth client scenario, record the runner's new scenario, and leave `npm run test:conformance` green.

## Context

- Repo: `/home/user/fleet/mcp`. The server half is already re-recorded and green in `tests/conformance.test.ts` (working-tree modification, uncommitted - do not revert it). `package.json` and `package-lock.json` carry the campaign's dependency update, also uncommitted - leave both alone.
- The predecessor unit measured, under the CURRENT driver, the non-auth client listing at `2026-07-28` in runner order with outcomes passed/failed/warnings: `tools_call` 2/0/0, `request-metadata` 8/0/0, `sep-2322-client-request-state` 5/0/0, `http-standard-headers` 3/0/0, `http-custom-headers` 18/0/0, `http-invalid-tool-headers` 11/0/0, `json-schema-ref-no-deref` 1/0/0, `json-schema-2020-12-preservation` 2/1/0.
- The failing check: `json-schema-2020-12-preservation` requires the client to round-trip the focal tool's `inputSchema` verbatim as the `schema` argument of `json_schema_echo`. `tests/conformanceClient.ts` builds arguments with `buildSchemaRecord`, which omits any leaf it cannot supply, so it sends `{}` and the echo check fails; six downstream preservation checks are SKIPPED, so whether the client preserves `$schema`, `$defs`, `additionalProperties`, composition, conditionals, and `$anchor` is unmeasured today.
- The driver holds what it needs: `client.tools()` returns `ToolInterface` values whose `parameters` is the received `inputSchema` - the same data the driver already reads to build arguments.
- Baseline design, which you must not weaken: a row with nonzero `failed` is a named LIBRARY gap carried on purpose with a comment naming it; an unfinished HOST must never be absorbed as a red row; the `auth/` prefix is the only exclusion class; `CONFORMANCE_CLIENT_SCENARIOS` is a recorded decision checked against the runner's own listing.

## Scope

- Owned: `tests/conformanceClient.ts`, `tests/setupConformance.ts`, `tests/conformance.test.ts`.
- Off-limits: `src/**`, `package.json`, `package-lock.json`, `guides/**`, everything else. Probes go under `tmp/` and are deleted before you finish.
- No commits, no pushes, no installs, no `git checkout/restore/stash/reset/clean`.

## Execution

1. Extend the driver so an object-typed argument property is filled with the focal tool's received schema where the scenario calls for the schema itself - the smallest change that answers `json_schema_echo` with the verbatim `inputSchema`. Keep the documented omit-rather-than-guess behavior for leaves genuinely unanswerable.
2. A driver change can move EVERY client row. Re-measure all non-auth client scenarios with the real runner before recording anything, and update each `EXPECTED_CLIENT` row from the measurement.
3. Add `json-schema-2020-12-preservation` to `CONFORMANCE_CLIENT_SCENARIOS` and its row to `EXPECTED_CLIENT` with a per-row comment. If the echo now arms and a preservation check exposes a real library gap, record the nonzero row with a comment naming the exact gap - that is the baseline's design for library gaps. If all checks pass, record the green row.
4. Run the gates in the repo: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:conformance`, then the full `npm test`.

## Acceptance criteria

1. `npm run test:conformance` exits 0.
2. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
3. `git -C /home/user/fleet/mcp status --porcelain` names only the owned files plus the pre-existing `package.json`, `package-lock.json`, `tests/conformance.test.ts` modifications.
4. `tmp/` contains no probe residue.

## Output

Return: the measured per-scenario outcomes after the driver change, the exact driver edit summary, every `EXPECTED_CLIENT` row that moved with why, any library gap you recorded with its naming comment, gate results with exit codes, and the final `git status --porcelain`.

## Deviation contract

If the driver change cannot arm the echo without guessing, or a re-measured row contradicts the baseline design in a way these instructions do not cover, stop and report: expected, found, exact evidence, done or not done, one short hypothesis. Ancillary choices (comment wording, row order within runner order) are yours to decide and record.
