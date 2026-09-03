## Fix round 1

Closes the round-1 objective lane's refutations of claims 2 and 4 and findings F1 to F3 (`units/l3/sea-objective-r1.md`).

- **Claim 2.** `tests/setupServer.ts:349` "Read one `IMAGE_RESOURCE_DIR_STRING_U` …" → "Reads one …"; `:362` "Walk one level of a PE resource directory tree …" → "Walks one level …". Both extracted helpers' TSDoc now opens in the third person with an `-s` verb.
- **Claim 4, sea-subj-7.** Added a case to `tests/src/server/seas/SEA.test.ts` — "rejects execute() with code STATE after a consumer destroys sea.emitter directly" — that calls `sea.emitter.destroy()` on the public route and asserts `execute()` rejects with `SEAError` code `STATE`. Planted the pre-change behaviour in `src/server/seas/SEA.ts` by deleting the `this.#emitter.destroyed` guard at the head of `execute()`; `sea-subj-7-red.txt` shows 2 failed, 17 passed (19) — the new case and the existing "once destroyed" case both redden with `ENTRY` received instead of `STATE`. Restored the guard, confirmed `git -C /home/user/fleet/sea diff -- src/server/seas/SEA.ts` matches the unit's original diff, then `sea-subj-7-green.txt` shows 19 passed (19).
- **Claim 4, the sweeps.** Recorded under the amended § Sweeps.
- **F1, F2.** `src/server/types.ts:322` "Outside SEA, `load()` reads client assets from disk." → "Outside SEA, `load()` reads the paths `assets` configures from disk."; `guides/sea.md:185` `e.g.` → "for example". `grep -rn "reads client assets from disk|e\.g\. \`format\`" tests/guides.test.ts` returns no line: no presence guard quotes either sentence.
- **F3.** Added to § Breaking, below.

### Sweeps (fix round 1)

| Pattern | Result |
| --- | --- |
| `-i "free program header entry\|kept OUT"` | one unrelated hit, `tests/guides.test.ts:47`, outside sea-obj-7's subject; sea-obj-7's proof is the empty sweep plus the green `integration` project run recorded under § Gates. |
| `"// === "` | 24 hits, all file-section headers, a distinct pattern from the four class-level separators sea-subj-12 replaced (gone); outside sea-subj-12's scope. |
| `"this package's other runtime dependency"` | empty |
| `"const PT_LOAD\|const PT_PHDR\|const PF_R\|const PAGE"` | empty |

### Breaking (fix round 1 addition)

- `execute()` now refuses with `SEAError('STATE', 'SEA is destroyed')` after the emitter is destroyed by any route, including a consumer's own `sea.emitter.destroy()`, where the build previously ran. A consumer needing a fresh run constructs a new `SEA`.

### Gates (fix round 1)

All exit 0: `format:check` (52 files), `lint:check`, `check`, `build`, `npm test` (`src:server` 187 passed, `policy` 111, `config` 46, `setup` 21, `guides` 34, `integration` 4), `npx scaffold audit --offline` (`0 of 36 planned paths drifted from the plan.`), `node /home/user/scaffold/tmp/work/evidence.mjs sea` (`conform-sea.diff` 3289 lines, `conform-sea.status` 22 entries). `git -C /home/user/fleet/sea status --short` lists only the unit's paths, with `package.json` as the Orchestrator's hunk.

### Deviations (fix round 1)

None. The round ran to completion.

Files touched: `/home/user/fleet/sea/tests/setupServer.ts`, `/home/user/fleet/sea/tests/src/server/seas/SEA.test.ts`, `/home/user/fleet/sea/src/server/types.ts`, `/home/user/fleet/sea/guides/sea.md`, `/home/user/scaffold/tmp/units/conform/conform-sea-report.md`. Captures at `/home/user/work/evidence/sea-proofs/sea-subj-7-red.txt` and `sea-subj-7-green.txt`. `src/server/seas/SEA.ts` was planted and restored, confirmed byte-identical to the pre-round diff.
