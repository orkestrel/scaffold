# R-A-2 recovery gate reading

Independent verifier: Terra in native Codex, 2026-09-18, Roughnotes HEAD `86a9ef6` with the
recovered R-A-2 patch. See `tmp/units/r-a-2-recovery-verify-brief.md` for the dispatch.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 1 | `.codex/hooks.json` and `vite.config.ts` require formatting. |
| `npm run lint:check` | 0 | Clean. |
| `npm run check` | 0 | Root, app core, and app browser checks passed. |
| `npm run build` | 0 | Browser build passed; Bootstrap Sass deprecation warnings. |
| `npm test` | 1 | `tests/conformance.test.ts:107`: `expected [ 'bootstrap-icons' ] to include 'vue'`. |

The test chain reached and passed `test:app`, `test:journey`, `test:policy`, `test:config`, and
`test:setup`, then failed in `test:conformance`. The journey run's capture cases remain skipped
without its capture flag. This reading does not prove the capture run.

The declared and installed versions are `@orkestrel/test ^0.0.17` / `0.0.17` and
`@orkestrel/scaffold ^0.0.74` / `0.0.74`.

No source edits were made by the verifier. The untracked `.codex/` directory remains outside the
recovered implementation patch. The generated configuration format defect belongs to S6; the
browser optimization configuration and its conformance assertion belong to R-B's saved brief.

GATES: RED npm run format:check; npm test
