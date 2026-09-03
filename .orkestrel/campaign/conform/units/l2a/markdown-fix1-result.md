## Fix round 1

Closes the round-1 objective lane's claim-4 refutation and findings F1 to F3 (`units/l2a/markdown-objective-r1.md`) and the round-1 checker's F-setup-agents and F-readme-count (`units/l2a/markdown-r1-checker-luna.md`).

### Findings and their edits

- **F-setup-agents / claim S6's `§\d` residue.** `tests/setup.ts:3` named `setupBrowser.ts`, a file this workspace does not have; the sentence now ends at `Vue.`. `tests/setup.ts:54` carried the `AGENTS-forbidden; §1 / §16` clause; the sentence now reads "without an `as` or an `if`-guarded `expect` narrowing with a non-null assertion", keeping the original meaning without citing `AGENTS.md`.
- **F-readme-count.** `guides/README.md:20` stated "one of this package's two runtime dependencies"; it now reads "a runtime dependency of this package", carrying the same fact without the count.
- **F1 — the vendored guide mirror.** § Breaking now names `/home/user/fleet/guide/guides/markdown.md` as a vendored mirror that still carries `MarkdownHandlers`, refreshed from the published bytes after `@orkestrel/markdown` releases the renamed type, never rewritten here.
- **F2 — the house-rule fence's rename and inlined body.** The prose after § Rows `markdown-obj-2` now names the `projectHTMLNode` → `projectKbdNode` rename (forced by the collision with the `@src/core` import at `tests/guides.test.ts:52`) and the inlining of the fence's `project` wrapper body into the `foldHTMLNode` call at `tests/guides.test.ts:362-372`, replacing the false claim that every helper "keeps the fence's own name and body".
- **F3 — the `npm test` Command cell.** § Gates now names the `src:core`, `policy`, `config`, `setup`, and `guides` projects instead of stating their count.
- **claim-4 refutation — § Sweeps missing the `guides/src` row.** § Sweeps now carries the `guides/src|Dependency mirrors` row (0 hits, re-run this round).
- **§ Gates Command cells dropped their `--config` flags.** `format:check` and `lint:check` now read `oxfmt --config .oxfmtrc.json --check .` and `oxlint --config .oxlintrc.json --deny-warnings .`, matching the captures.
- **Line 42's "byte-for-byte the shape" claim.** Reworded to say the table matches the html sibling's structure, and that the Guide cell text differs because it names `markdown.md` rather than `html.md`.

### Sweeps

| Pattern | Path | Result |
| ------- | ---- | ------ |
| `AGENTS\s*§\|§\d` (`-i`) | `src/**`, `tests/**` (excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`), `guides/markdown.md`, `guides/README.md`, `README.md` | 0 |
| `guides/src\|Dependency mirrors` | package (excluding `node_modules/**`) | 0 |

### Gates

| Gate | Command | Exit |
| ---- | ------- | ---- |
| `npm run format:check` | `oxfmt --config .oxfmtrc.json --check .` | 0 |
| `npm run lint:check` | `oxlint --config .oxlintrc.json --deny-warnings .` | 0 |
| `npm run check` | `tsc --noEmit --project tsconfig.json` then `tsc --noEmit -p configs/src/tsconfig.core.json` | 0 |
| `npm run build` | `vite build --config configs/src/vite.core.config.ts` then `copy` | 0 |
| `npm test` | `src:core`, `policy`, `config`, `setup`, and `guides` projects | 0 |

### Audit

`npx scaffold audit --offline` from `/home/user/fleet/markdown`: "0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6."

`git -C /home/user/fleet/markdown status --short` lists the unit's Owned paths, now including `tests/setup.ts` because this round's row 1 edits sit there: `guides/README.md`, `guides/markdown.md`, `src/core/Markdown.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/guides.test.ts`, `tests/setup.ts`, `tests/src/core/Markdown.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/parsers.test.ts` — no untracked file, no path outside Owned.

No deviation.

Files touched: `/home/user/fleet/markdown/tests/setup.ts`, `/home/user/fleet/markdown/guides/README.md`, `/home/user/scaffold/tmp/units/conform/conform-markdown-report.md`.
