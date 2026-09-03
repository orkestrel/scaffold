This matches prior units' cumulative edits (conform-lsp + fix round 1), with only `tests/setup.test.ts` touched by this round. All rows complete.

## Fix round 2

**F-1, the `unknown` binding.** `tests/setup.test.ts:11` bound the parsed manifest as `any` through an untyped `JSON.parse` call. The binding now reads `const contents: unknown = JSON.parse(readFileSync(manifestPath, 'utf8'))`, and the guard chain at `:12-17` narrows it unchanged. `npm run check` exits 0 across the root project and `check:src:core` / `check:src:server`. `npm run test:setup` exits 0: 3 files, 15 tests, all passed.

**F-3, the fix round 1 captures.** The checkout-name assertion was planted wrong again (`@orkestrel/wrong-name-plant`) and restored by editing after the capture, matching round 1's method.

- `fix1-setup-red.txt`: 1 failed, 14 passed. `AssertionError: expected '@orkestrel/lsp' to be '@orkestrel/wrong-name-plant'` at the planted line.
- `fix1-setup-green.txt`: 3 files, 15 tests, all passed, after the assertion was restored to `@orkestrel/lsp`.

**Gates**, each run from `/home/user/fleet/lsp`, captured to `/home/user/work/evidence/lsp-proofs/gate-*.txt`, overwriting the round-1 files:

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format |
| `npm run lint:check` | 0 | No diagnostic |
| `npm run check` | 0 | Root, `check:src:core`, `check:src:server` all clean |
| `npm run build` | 0 | Core and server faces built, declarations copied |
| `npm test` | 0 | src, policy, setup, config, guides, conformance, and integration projects all passed |
| `npx scaffold audit --offline` | 0 | `0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.` — no advisory |

**F-2, the report sites.** The fleet-F1 evidence at the original `:29` no longer claims `tests/setup.test.ts` is absent; it now states fix round 1 added that file as the setup-module proof. Deviation 1 now opens with a sentence stating its two readings are superseded by `## Fix round 1`, which added the proof and repaired the `vite.config.ts` registration.

`git -C /home/user/fleet/lsp diff -- tests/setup.test.ts` shows the file as a new addition carrying the `unknown` binding, with no other change to that file beyond the unit's own content. `node /home/user/scaffold/tmp/work/evidence.mjs lsp` wrote `/home/user/work/evidence/conform-lsp.diff` (866 lines) and `/home/user/work/evidence/conform-lsp.status` (17 entries).
