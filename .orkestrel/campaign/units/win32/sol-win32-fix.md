# Brief: make the @orkestrel/test capability-probe proofs win32-portable

Role and engine: `sol` implementer, GPT-5.6 Sol, journaled `codex exec` in /home/user/test with `--sandbox workspace-write`. You perform the assignment directly inside your own CLI and spawn nothing beyond your validation commands.

## Objective

The residue and allocation-failure proofs in `/home/user/test/tests/src/server/helpers.test.ts` override the temporary directory through `process.env.TMPDIR` alone. Node's `os.tmpdir()` on win32 reads `TEMP`, then `TMP`, then the system fallback, and never `TMPDIR`, so on Windows the override is inert: the residue proofs fail comparing `tmpdir()` to the owned path, and the allocation-failure controls capture no error. A Windows run on 2026-08-21 reported exactly that shape (`expected 'C:\Users\...\Temp' to be 'C:\Users\...\Temp\orkestrel-test-residue-...'` at helpers.test.ts:1268, and `expected undefined to be an instance of Error` at :1292). Make the override portable, plus close every further hazard the sweep table names.

## Context

- Read before editing: /home/user/test/AGENTS.md, .claude/rules/tests.md, .claude/rules/typescript.md, .claude/rules/names.md.
- The affected block: `describe('host capability probes', ...)` in tests/src/server/helpers.test.ts (near lines 1253-1300). It loops `HOST_PROBES`, and per probe runs a residue proof and an allocation-failure control, each saving and restoring `process.env.TMPDIR` in a `finally`.
- Required fix shape: override and restore the full set the platforms read — `TMPDIR`, `TEMP`, and `TMP` — identically. Save each name's prior value; on restore, `delete process.env[name]` when the saved value was `undefined` (assigning `undefined` writes the string `"undefined"`). Setting the whole set is deterministic on every platform because each platform reads its own first name.
- The block comments claim `os.tmpdir()` reads `TMPDIR`; correct them to name the real per-platform order (win32: `TEMP`, then `TMP`; POSIX: `TMPDIR` first).
- Equality note you may rely on: `createScratch` paths carry no trailing separator, and Node's `tmpdir()` strips one, so `toBe` equality holds on either platform once the right variable moves.
- ENOENT note: `mkdtempSync` beneath a missing parent raises `ENOENT` on win32 and POSIX alike, so the control's expectation stands unchanged.
- Extraction rule: the save/override/restore logic now repeats across the residue proof and the control. Rule per .claude/rules/tests.md where the shared form lives — a helper used by only this file may live at that file's module scope beside `HOST_PROBES`; a helper another setup consumer needs belongs in the setup module. Decide, and record the ruling. No nested function declarations — a restore closure may be returned directly as a result.
- The sweep table appended to this brief names every further win32 hazard found in the package. Close every `tests/**` row in this same unit. For any `src/**` row: do NOT edit src — report the row with your reading, because a src change moves the published artifact and is the Orchestrator's version decision.

## Scope

- Owned: tests/** in /home/user/test (except the vendored tests/setupPolicy.ts, tests/policy.test.ts).
- Off-limits: package.json, package-lock.json, src/**, guides/**, configs/**, vite.config.ts, tsconfig.json, .claude/**, .orkestrel/**.
- No git commands that mutate. No npm install. No tree-wide format or lint fix; scoped `npx oxfmt --config .oxfmtrc.json --write <files>` over edited files is allowed.

## Host environment facts

- Your sandbox denies network and loopback listeners; helpers.test.ts contains server suites that listen. Validation therefore stays scoped: run the capability-probe cases only, by name filter, and the typecheck. The Orchestrator takes the authoritative full gates after you exit.
- Known condition: this container is Linux, so your green run proves the POSIX side and the unchanged behavior; the win32 side is proved by construction against Node's documented env order, which your edit must cite in its comment.

## Validation (bare exit codes)

1. `npm run check` (or the scoped `check:src:server` if the root check is what the repo wires).
2. `npx vitest run --project src:server tests/src/server/helpers.test.ts -t "host capability probes"` — every case green.

## Output

Delivered (per edit, with the helper-placement ruling) / Validation (commands and bare exits) / Sweep rows closed and any src rows carried / Deviations (or none) / Flags. Return the journal path and session id with the result.

## Deviation contract

Stop and report (expected, found, exact evidence, done or not done, one short hypothesis) on any conflict with the primary objective — a sweep row whose fix demands an off-limits file, a validation red you cannot attribute to your own edit. Ancillary conflicts (comment wording, helper name) are yours to decide and record.

## Amendment 1 — the sweep table arrives separately

The win32 sweep runs in parallel rather than ahead of you. Your primary objective stands alone:
the portable override in the residue and allocation-failure proofs, the corrected comments, and
the shared save/override/restore form. The Orchestrator reconciles the sweep table when it lands;
any further row becomes a successor brief, never your deviation.

## Amendment 2 — routed to the native Opus implementer

The Sol exec's sandbox distorts the subject: the `supportsMode` enforcement proof reads
`expected true to be false` inside the bench because the sandbox denies parent-permission writes
while `process.getuid()` reports 0 — a pre-existing green on the host, red only in the sandbox
(journal win32-fix.jsonl, session 01a026c1-a596-74d3-a647-9520b59a7c51). Host-capability
semantics are unmeasurable in a bench, so the unit routes to the native implementer on this
recorded substitution. Validation for the native unit: npm run check, then
npx vitest run --project src:server tests/src/server/helpers.test.ts — the whole file, on the
host, every case green. The auditor for this fix round is Sol.
