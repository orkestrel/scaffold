Unit SD7 report.

## Deviation — item 2 (templates.ts) is NOT done, blocked by a pin

`tests/src/core/compilers.test.ts:1148` (`keeps this repository byte-identical to every configuration it generates`) compares every artifact `blueprintToConfigArtifacts` emits against the repository's own materialized copy read from disk. This repository materializes `/home/user/scaffold/configs/src/vite.server.config.ts`, whose line 7 carries the emitted `below`. That file is off-limits under the brief ("every other file"), so no edit to the owned files can close the pin — the brief granted the template half and withheld the materialized half.

- **Expected:** rewriting the emitted comment prose in `/home/user/scaffold/src/core/templates.ts` touches only owned bytes.
- **Found:** the rewrite reddens an off-limits pin. Command `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/compilers.test.ts` reported `1 failed | 90 passed (91)` with the edit, naming `configs/src/vite.server.config.ts` in the diff. After reverting: `91 passed (91)`.
- **Done vs not done:** items 1, 3, 4 complete and green. Item 2 reverted; `src/core/templates.ts` is byte-identical to `60a9f6f` (`git diff --stat -- src/core/templates.ts` is empty).
- **Hypothesis:** the brief scoped the change by the file that declares the prose, not by the files its result makes false; the template and this repository's own generated copy are one change.

Exact patch for a successor unit owning both files — `/home/user/scaffold/src/core/templates.ts`, browser face:

```
-// one that leaves dist/src entirely. The rewrite below externalizes core through
-// the package's own published root export, on the final roll-up only.
+// one that leaves dist/src entirely. The rewrite that follows externalizes core
+// through the package's own published root export, on the final roll-up only.
```

The identical replacement applies to the server face in `templates.ts` and, byte-for-byte, to `/home/user/scaffold/configs/src/vite.server.config.ts` lines 6-8:

```
-// src/core through a relative source path the tarball does not carry. The rewrite
-// below externalizes core through the package's own published root export, on the
-// final roll-up only.
+// src/core through a relative source path the tarball does not carry. The rewrite
+// that follows externalizes core through the package's own published root export,
+// on the final roll-up only.
```

Both replacements preserve every assertion at `compilers.test.ts:1367-1388` (`'…and the roll-up reaches'`, `'final roll-up only'`, `'beforeWriteFile: (path, content) => ({'`, the regex lines, `'a module in a browser subfolder emits'`), and every line stays under 100 columns.

`src/core/templates.ts:776` also matches the pattern — `despite sorting below it lexically` — in a lexical-ordering sense, not a directional one. Left byte-for-byte.

## Item 1 — directional hits, before → after

| File:line | Before | After |
| --- | --- | --- |
| `.claude/agents/orkestrel.md:14` | `The catalog below is discovery data` | `The Package catalog section is discovery data` |
| `.claude/agents/orkestrel.md:112` | `The `Layer` column above is the publish round` | ``The `Layer` column in the catalog table is the publish round`` |
| `.claude/rules/tests.md:172` | `The shapes below are the contract` | `The shapes that follow are the contract` |
| `.claude/rules/architecture.md:52` | `The self-contained exception above covers` | `The preceding self-contained exception covers` |
| `.claude/rules/architecture.md:111` | `in the kind-purity rules above binds regardless` | `in the earlier kind-purity rules binds regardless` |
| `.claude/rules/architecture.md:121` | `the constants rule above binds regardless` | `the earlier constants rule binds regardless` |
| `.claude/rules/architecture.md:126` | `the functions rule above still binds` | `the earlier functions rule still binds` |
| `.claude/rules/architecture.md:282` | `follow the barrel rule above without` | `follow the earlier barrel rule without` |
| `.claude/rules/workspace.md:169` | `place that script by the paragraph above` | `place that script by the preceding paragraph` |
| `.codex/config.toml:17` | `adds only the Codex specifics below and cannot` | `adds only the Codex specifics that follow and cannot` |
| `guides/scaffold.md:15` | `Every code fence below is illustrative` | `Every code fence that follows is illustrative` |
| `guides/scaffold.md:394` | `the interface tables below describe the classes too` | `the interface tables that follow describe the classes too` |
| `guides/scaffold.md:750` | `the Compile section below states it` | `the Compile section states it` |
| `AGENTS.md:16` | `from the rule map below;` | `from the Rule map section;` |
| `AGENTS.md:118` | `Every file below is a normative extension` | `Every file in the following table is a normative extension` |
| `.agents/orchestration.md:10` | `It wins over everything below.` | `It wins over everything that follows.` |
| `.agents/orchestration.md:98` | `from the table above, and name in` | `from the preceding table, and` |
| `.agents/orchestration.md:291` | `starts the login ladder below,` | `starts the login ladder in Recovering a dark bench,` |
| `.agents/orchestration.md:850` | `follow the runtime rule above.` | `follow the preceding runtime rule.` |

Four paragraphs were re-wrapped so no prose line passes its file's width (`.claude/agents/orkestrel.md` at 89, `.agents/orchestration.md` at 98, `guides/scaffold.md` at 99, `.codex/config.toml` at 88). `guides/scaffold.md` shifted 746→750 and 1094→1096 relative to the sweep table; every other line number held.

## Item 1 — re-swept residual

Command, run from `/home/user/scaffold`:

```
rg -n -i -w --hidden '(above|below)' --glob '.claude/agents/*.md' --glob '.claude/rules/*.md' \
  --glob '.codex/config.toml' --glob '.codex/agents/*.toml' --glob 'guides/scaffold.md' \
  --glob 'AGENTS.md' --glob 'CLAUDE.md' --glob '.agents/orchestration.md' --glob '.cursor/rules/*' .
```

Residual hits, each matching its class in the campaign table:

- `.claude/rules/writing.md:51`, `.claude/rules/writing.md:52` — QUOTED
- `.claude/rules/tests.md:123` — NUMERIC
- `guides/scaffold.md:212`, `guides/scaffold.md:1096` — NUMERIC
- `.claude/rules/architecture.md:87` — OTHER (import-graph rank)
- `.claude/agents/scout.md:21`, `.claude/agents/researcher.md:31`, `.claude/agents/checker.md:16` — OTHER (ladder rank)

No DIRECTIONAL hit remains. The Unknowns the table listed all stay byte-for-byte.

## Item 3 — implementations cell

```
| Implementations           | `*/[domain]/[Entity].ts` — one class per file                |
```

A spaced em dash replaces the comma. A comma reads as glob syntax inside a path pattern; an em dash cannot. Column alignment is unchanged — the row is 92 characters, matching the header, the separator, and the `Function modules` row.

## Item 4 — digest half

`npm run build:inventory` ran last and reported `build-inventory: staged 108 file(s) into host.json`. `git diff --numstat -- host.json` reports `9 9`: eight entry digests, one for each vendored file this unit edited, plus the root digest. `src/core/templates.ts` and `configs/src/vite.server.config.ts` are not vendored destinations, so no digest depends on the reverted item.

## Gate tails

- `npx oxfmt --config .oxfmtrc.json --check src/core/templates.ts` → `All matched files use the correct format.` (run while the edit was live)
- `npx oxfmt --config .oxfmtrc.json --check host.json` → `All matched files use the correct format.`
- `npm run check:src:core` → no diagnostics, exit 0
- `npm run test:guides` → `Test Files 1 passed (1) | Tests 17 passed (17)`
- `npm run test:config` → `Test Files 1 passed (1) | Tests 46 passed (46)`, stdout `host-inventory: entries=108`
- `npm run test:policy` → `Test Files 1 passed (1) | Tests 93 passed (93)`
- `npx vitest run … --project src:core tests/src/core/compilers.test.ts` → `Tests 91 passed (91)` (post-revert)

`npm test`, `npm run build`, and the tree-wide `format:check` were not run — out of this unit's scoped read-only validation.

## git diff --stat

```
 .agents/orchestration.md      | 26 ++++++++++++++------------
 .claude/agents/orkestrel.md   | 20 ++++++++++----------
 .claude/rules/architecture.md | 12 ++++++------
 .claude/rules/tests.md        |  2 +-
 .claude/rules/workspace.md    |  2 +-
 .codex/config.toml            |  2 +-
 AGENTS.md                     |  4 ++--
 guides/scaffold.md            | 10 +++++-----
 host.json                     | 18 +++++++++---------
 9 files changed, 49 insertions(+), 47 deletions(-)
```

## git status --porcelain

```
 M .agents/orchestration.md
 M .claude/agents/orkestrel.md
 M .claude/rules/architecture.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M .codex/config.toml
 M AGENTS.md
 M guides/scaffold.md
 M host.json
```

Nothing committed. Tree was clean at start on `60a9f6f`.

## Observations for the next brief

- `/home/user/scaffold/.claude/rules/architecture.md:40`, the `Function modules` row, carries the same shape item 3 repaired: `` a designated folder's `[function].ts`, one function per file ``. It sits outside the brief's fixed hit list, so it stays. Applying `` — `` there costs one character of trailing padding and keeps the table's two constrained rows consistent.
- The sweep bound covers no source or test file. `rg -n -i -w '(above|below)' tests src` returns directional uses in `tests/distribution.test.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/core/compilers.test.ts:1152`, and `tests/src/bin/helpers.test.ts`, plus permitted numeric senses in `src/core/compilers.ts`. That population was never classed.