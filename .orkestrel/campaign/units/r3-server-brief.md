# R3 — server and setup fix round from the A1 falsification verdicts

## Role and engine

You are the Opus 5 `implementer`, sole writer in `/home/user/test`, from the clean committed
baseline the Orchestrator hands you (R1 and R2 are committed before you start). Perform this
directly; spawn nothing. Loopback binding works on this host; never touch `::1`.

## Objective

Repair the server and setup findings the falsification round confirmed.

## Authority

`/home/user/test/AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `names.md`,
`tests.md`, `patterns.md`. The verdicts and reconciliation as in R2's brief.

## Owned files

- `src/server/types.ts`
- `src/server/helpers.ts`
- `tests/src/server/helpers.test.ts`
- `tests/setupServer.ts`
- `tests/src/server/factories.test.ts` — only as far as the setup dedup reaches it

Off-limits: everything else, `guides/` included.

## The repairs

1. **`UpgradeResult` violates Derive-state** (Sol 18, Opus 18; the union prescription wins the
   reconciliation). Replace the flat interface with the discriminated shape, verbatim:

   ```ts
   export type UpgradeResult =
   	| { readonly claimed: true; readonly protocol: string | undefined }
   	| { readonly claimed: false; readonly status: number }
   ```

   `claimed` becomes a named discriminant; the impossible state stops being expressible. Update
   `requestUpgrade`'s paths and every test asserting the old shape.
2. **`requestUpgrade` is the only unbounded wait** (Opus F-6). Have `UpgradeOptions` extend
   `WaitOptions`, apply the budget so a server that accepts and never answers rejects with a
   message naming the port and path, honor an abort signal as the siblings do, and add the timeout
   test against a deliberately silent server.
3. **`tests/setupServer.ts` reimplements all five shipped probes** (Opus F-1). Delete
   `probeCapability` and the five probe bodies; set each exported constant from the shipped helper
   imported through `@src/server` — `export const FILE_LINKS = supportsFileLinks()` and siblings.
   The equivalence-pin test at `tests/src/server/helpers.test.ts:1247` loses its reason to exist —
   remove it and say so. Follow the constants' existing consumers; change none of their names.
4. **The stored-versus-enforced assertion is vacuous** (Opus F-3, `helpers.test.ts:1262`,
   `P === (S && P)`). Replace it with an assertion whose failure is reachable on this host, or
   drop the line and state in the adjacent comment that the enforcement half is checkable only on
   a host that does not store the bit. The reviewer offered
   `expect(PERMISSION_HOLD_REFUSES_REMOVAL).toBe(process.getuid?.() !== 0)` as the POSIX form —
   adopt it if it is truthful on this container (uid 0, hold refused false), else the comment form.

## Deviation contract

Stop and report when a repair requires an unowned file or an unrelated gate failure appears.
Ancillary calls are yours: decide, record, continue.

## Output

`Delivered` · `Validation` (exact commands, exit codes) · `Decisions` · `Deviations` (or none) ·
`Flags` — name anything the guide round must restate (the union shape reaches the guide's rows and
its upgrade fence).

## Acceptance criteria

1. `npm run check:src:server` exit 0; root tsc exit 0.
2. `npm run lint:check`, `npm run format:check` exit 0.
3. `npm run test:src:server` exit 0 with the timeout test collected and the dedup landed.
4. `git status` shows changes only in owned files.
5. No banned token, no stated count.
