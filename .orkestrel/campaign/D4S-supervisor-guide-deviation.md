<!-- D4-S — implementer (Opus 5, native), supervisor guide unit. Stopped under the deviation contract before writing. Retained verbatim from the completion notification, 2026-09-15 (164 s, 24 tool uses). -->

**Deviation — stopped before writing. Nothing changed.**

Expected (brief § Context): `guides/` holds mirrors and no `supervisor.md`; `@orkestrel/guide` installed so `npm run test:guides` can be measured.

Found: the guide already exists at `guides/src/supervisor.md` (4890 lines; tagline blockquote; `## Surface` over `src/core`, `src/server`, `app/core`, `app/server`, `app/browser`; `## Methods` for every behavioural interface; sections Surface, Recovery, Service-axis live proofs, Client hookup, Honest limits, Methods, Tests, See also) and it is the manifest's only concept row (`guides/README.md` routes every directory row to `src/supervisor.md`). `tests/guides.test.ts` pins the path in `QUOTING = ['README.md', 'guides/src/supervisor.md']` and refuses a second document over one source. The checkout is mid-migration: top-level `guides/*.md` is the fresh scaffold-staged mirror set and `guides/src/*.md` a stale duplicate (`guides/agent.md` 212117 bytes vs `guides/src/agent.md` 212162), with the package's own guide left in the stale directory. Relocating needs: deleting `guides/src/supervisor.md` (in neither scope list), rewriting 66 relative links (`../src/core`, `../../tests/src/core/**`, `../../tests/src/server/**`), and a ruling on the orphaned `guides/src/` mirror set. `node_modules` does not exist, so no gate can run (`vitest` not recognized). `README.md` has no blockquote pitch; this `tests/guides.test.ts` uses no `findDrift`/`tagline`/`GuideCommand`. The brief's `src/core/index.ts` export list omitted `Run`, `Unit`, `Lane`, `FunctionExecutor`, `MemoryJournal`, and the four stores.

Done: reading only; `git status --porcelain` empty at `edf80e6`. Not done: no file written; no TSDoc edits.

Hypothesis: scaffold's hosted set reads `guides/<name>.md`; this checkout's own guide was left under the pre-migration `guides/src/` path when scaffold 0.0.60 staged the fresh mirrors at the top level, so D4-S is a scoped move-and-relink plus a ruling on the stale mirrors, not an authoring unit.

Re-dispatch needs: `node_modules` installed by the Orchestrator; ownership of `guides/src/**`; a restated objective — relocate `guides/src/supervisor.md` to `guides/supervisor.md`, repoint its 66 relative links and the `guides/README.md` rows, update `QUOTING`, add the `README.md` blockquote pitch matching the existing tagline.
