## Fix round 1

Closes the round-1 lanes' refutations and findings (`units/l2b/router-objective-r1.md`, `units/l2b/router-r1-checker-luna.result.md`).

### Findings closed

1. **Dangling `AGENTS §N` citations.** Every `AGENTS §N` / `§N` parenthetical left the package's own files. Each site's parenthetical either carried the cited fact inline in its own words (for example "the centralized-file rule", "the Emitter pattern", "the similar-surface pin", "batch registration", "the one-shared-engine rule") or was deleted where the sentence stood without it. `guides/README.md:51` and `guides/router.md:727-730` (the `AGENTS.md` See-also links) now carry no section number in their link text.
2. **The `below` pointer.** `src/browser/types.ts:64-65` reads "routes to the `error` handler described later in this list and vetoes the navigation."
3. **`via` and `e.g.` in tests.** Every occurrence in the non-vendored `tests/**` replaced: `via` → `through`, `e.g.` → `for example`.
4. **The two omitted sweep rows.** Added below.

### Sites changed

- Citations: `src/server/handlers.ts`, `src/server/validators.ts`, `src/server/helpers.ts`, `src/server/types.ts`, `src/browser/Navigator.ts`, `src/browser/factories.ts`, `src/browser/helpers.ts`, `src/browser/types.ts`, `src/core/Dispatcher.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/DispatchGroup.ts`, `src/core/constants.ts`, `src/core/Router.ts`, `src/core/Group.ts`, `src/core/parsers.ts`, `src/core/types.ts`, `tests/setupServer.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/src/server/validators.test.ts`, `tests/src/server/handlers.test.ts`, `tests/src/server/helpers.test.ts`, `tests/src/browser/factories.test.ts`, `tests/src/browser/helpers.test.ts`, `tests/src/browser/Navigator.test.ts`, `tests/src/core/Group.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/parsers.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/Dispatcher.test.ts`, `tests/src/core/Router.test.ts`, `tests/src/core/DispatchGroup.test.ts`, `guides/router.md`, `guides/README.md`.
- Pointer: `src/browser/types.ts:64-65`.
- Substitutions: `tests/src/core/Dispatcher.test.ts` (`via` at two call-site titles, `e.g.` at one test title), `tests/setupBrowser.ts` (`via` at two sites, `e.g.` at two sites). No presence guard in `tests/guides.test.ts` quotes a changed sentence, so no guard string changed.

### Sweeps

- Citations. `grep -rniE "AGENTS\s*§|§\s*[0-9]"` over `src`, `tests` (excluding the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`), `guides/router.md`, `guides/README.md`, `README.md`: no hits.
- Substitutions. `grep -rniE "\bvia\b|e\.g\."` over the non-vendored `tests/**`: no hits.
- router-subj-7. `grep -rniE "#(pop|hash)Listener"` over `src`, `tests`, `guides/router.md`, `guides/README.md`, `README.md`: no hits.
- router-subj-12. `grep -rn "types.js').Dispatcher}"` over `src`, `tests`, `guides/router.md`, `guides/README.md`, `README.md`: no hits.

### Gates

Every gate ran from `/home/user/fleet/router` in the order the acceptance criteria fix.

| Gate                   | Exit code | Reading                                                                     |
| ---------------------- | --------- | ---------------------------------------------------------------------------- |
| `npm run format:check` | 0         | `All matched files use the correct format.` on 73 files (converged once, `guides/router.md`) |
| `npm run lint:check`   | 0         | no output                                                                   |
| `npm run check`        | 0         | root project plus the three scoped isolation checks                        |
| `npm run build`        | 0         | core, browser, and server built; both `.d.cts` copies written              |
| `npm test`             | 0         | `src` 265/265, `policy` 111/111, `config` 46/46, `setup` 9/9, `guides` 45/45 |

`npm run format:check` failed once, on `guides/router.md`, after the citation edits reflowed several lines past the wrap width. It was converged with `npx oxfmt --config .oxfmtrc.json guides/router.md` and re-run clean; the formatter left Contract row 4 in the main flow with no line-initial `>`, which is what router-subj-16 requires.

### Audit line

- `npx scaffold audit --offline` reports one drifted path: `configs/browsers.ts`, group `configs`, drift `stale` — the same baseline condition named in § Findings outside the rows, unchanged by this round.
- `node /home/user/scaffold/tmp/work/evidence.mjs router` wrote `/home/user/work/evidence/conform-router.diff` (2893 lines) and `/home/user/work/evidence/conform-router.status` (37 entries).
- `git status --short` lists 35 files, every one inside this round's Owned scope (`src/**`, the non-vendored `tests/**`, `guides/router.md`, `guides/README.md`, `README.md`).

### Deviations

None. The deviation contract did not fire. Every citation's sentence stood on the cited fact stated inline or stood without the citation; no gate reddened on anything outside the rows.
