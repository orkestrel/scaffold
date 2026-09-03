# Report: relation-prose

## Sites

- `guides/relation.md:339` now reads `**Listener isolation.** A listener throw is NEVER allowed to escape into the load: ...`.
- `guides/relation.md:356` now reads `... on? wiring through the manager's model option, and emit safety (a throwing load / link observer can't corrupt the load or junction write — the emitter isolates it and routes it to the model.error handler when the manager carries one).`
- `tests/src/core/Model.test.ts:261` now reads `// a vended handle's listeners and receives their throws; and emit safety — a` (continued on the following line: `// throwing observer cannot corrupt the load result.`).
- No presence guard in `tests/guides.test.ts` quoted either phrase, so that file needed no edit; `git -C /home/user/fleet/relation status --short` lists only `guides/relation.md` and `tests/src/core/Model.test.ts`.

## Sweep

`grep -rniE '\bguarantee(s|d)?\b|\bensure(s|d)?\b' /home/user/fleet/relation/src /home/user/fleet/relation/tests /home/user/fleet/relation/guides/relation.md /home/user/fleet/relation/README.md` returned no matches. The scope reads empty of the claim words after the rewrite.

## Gates

- `npm --prefix /home/user/fleet/relation run format:check` — exit 0.
- `npm --prefix /home/user/fleet/relation run lint:check` — exit 0.
- `npm --prefix /home/user/fleet/relation run check` — exit 0.
- `npm --prefix /home/user/fleet/relation run build` — exit 0.
- `npm --prefix /home/user/fleet/relation test` — exit 0, every project (`test:policy`, `test:config`, `test:setup`, `test:guides`) passed.
- `npm --prefix /home/user/fleet/relation run test:guides` (row 1, run standalone) — exit 0, 29 tests passed.

## Audit

`cd /home/user/fleet/relation && npx scaffold audit --offline` printed: `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

## Evidence capture

`node /home/user/scaffold/tmp/work/evidence.mjs relation` wrote `/home/user/work/evidence/conform-relation.diff` (36 lines) and `/home/user/work/evidence/conform-relation.status` (2 entries), exit 0.
