## Output

**Three rows taken, with counts and files:**

| Row | Plant | Red | Green |
| --- | --- | --- | --- |
| middleware-obj-3, validators | `isSessionControl`'s `regenerate` check inverted (`===` → `!==` at `src/core/validators.ts:50`) | `/home/user/work/evidence/middleware-proofs/obj-3-validators-control-red.txt` — 2 failed \| 12 passed (14) | `/home/user/work/evidence/middleware-proofs/obj-3-validators-green.txt` — 14 passed (14) |
| middleware-obj-3, parsers | `parseMultipartRequest`'s boundary guard inverted (`===` → `!==` at `src/server/parsers.ts:57`) | `/home/user/work/evidence/middleware-proofs/obj-3-parsers-control-red.txt` — 35 failed \| 1 passed (36) | `/home/user/work/evidence/middleware-proofs/obj-3-parsers-green.txt` — 36 passed (36) |
| middleware-obj-3, MultipartParser | Preamble-cap check inverted (`>` → `<` at `src/server/MultipartParser.ts:68`) | `/home/user/work/evidence/middleware-proofs/obj-3-multipart-control-red.txt` — 1 failed \| 7 passed (8) | `/home/user/work/evidence/middleware-proofs/obj-3-multipart-green.txt` — 8 passed (8) |

**§ Deviations line added to the report:** the standing condition — `npm run check` and `npm test` redden at `tests/setup.ts:369`, `tests/src/core/factories.test.ts:167,170`, and `tests/src/core/stores/DatabaseSessionStore.test.ts:225` (`TableInterface<unknown>` not assignable to `TableInterface<SessionRow>`) and at runtime with `DatabaseError: Driver schema is invalid`, caused by the not-yet-landed `@orkestrel/database` consumer edit — is unrepaired and untouched by this unit.

**`git -C /home/user/fleet/middleware diff --stat` confirms no hunk from this round:** `src/core/validators.ts` and `src/server/MultipartParser.ts` appear nowhere in the stat (0 hunks each); `src/server/parsers.ts` shows only the predecessor's pre-existing 6-line hunk (`extractMultipartBoundary` rename plus a TSDoc substitution), identical before and after this round's plant/revert cycle.

`node /home/user/scaffold/tmp/work/evidence.mjs middleware` ran: `/home/user/work/evidence/conform-middleware.diff` (4624 lines), `/home/user/work/evidence/conform-middleware.status` (27 entries).

Files touched: `/home/user/scaffold/tmp/units/conform/conform-middleware-report.md` (three failing-first rows plus § Fix round 1 part b note added), and the six evidence files under `/home/user/work/evidence/middleware-proofs/obj-3-*-control-red.txt` / `obj-3-*-green.txt`. The three source files (`src/core/validators.ts`, `src/server/parsers.ts`, `src/server/MultipartParser.ts`) end exactly as they began this round.
