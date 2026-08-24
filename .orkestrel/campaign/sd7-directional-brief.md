# Unit SD7 — scaffold: directional-reference sweep + implementations-cell repair

Role: implementer. Engine: Claude Opus 5 (native). You perform this unit directly and spawn
nothing. Read `/home/user/scaffold/AGENTS.md`, `.claude/rules/writing.md`, and
`.claude/rules/documentation.md` before editing.

## Objective

In `/home/user/scaffold` (baseline: the head commit when you start — read
`git log --oneline -1`), an editorial unit with a fixed hit list:

1. **Directional hits.** `/home/user/scaffold/.orkestrel/campaign/g-sd7-directional.md` carries
   the swept sense table. Rewrite every hit classed DIRECTIONAL — and only those — so the
   sentence uses `preceding`, `following`, `earlier`, or `later` (or names the target section)
   per `.claude/rules/writing.md` § Code tokens, references, and links. The DIRECTIONAL hits:
   `.claude/agents/orkestrel.md:14,112`; `.claude/rules/tests.md:172`;
   `.claude/rules/architecture.md:52,111,121,126,282`; `.claude/rules/workspace.md:169`;
   `.codex/config.toml:17`; `guides/scaffold.md:15,394,746`; `AGENTS.md:16,118`;
   `.agents/orchestration.md:10,98,291,850`. Line numbers date from the sweep — re-locate each by
   its fragment if the file moved. Every hit classed QUOTED, NUMERIC, or OTHER stays byte-for-byte
   (the Orchestrator ruled the OTHER hits permitted rank senses); the table's Unknowns are settled
   the same way — `scout.md:21`, `researcher.md:31`, `checker.md:16`, `architecture.md:87`,
   `tests.md:123` all stay.
2. **templates.ts comments.** The emitted-template comments near the classifier rewrite carry the
   same defect ("rewrite below", or whatever directional phrasing survives on the current head —
   search `src/core/templates.ts` for whole-word `above`/`below` in comment text and template
   PROSE only). Rewrite the directional sense; template CODE bytes and emitted-corpus content
   that a test pins byte-for-byte are off-limits — if a pinned emitted byte carries the word,
   stop and report rather than editing the pin.
3. **Implementations cell.** `.claude/rules/architecture.md`'s centralized-file table row
   `Implementations` reads `*/[domain]/[Entity].ts`, one class per file` — the D1 Q6 finding:
   the cell's second clause sits inside the path pattern and reads as part of it. Repair the cell
   so the path pattern and the one-class-per-file constraint are separate readable parts (the
   table stays a table; you own the exact form).
4. **Digest half.** These files are the published `dist/host` surface: after the edits, run
   `npm run build:inventory` and commit the regenerated `host.json` rows with the change (the
   command rewrites digests for every touched vendored path). Do not commit — the Orchestrator
   commits; leave the tree ready.

## Environment

Native run in `/home/user/scaffold`; `node_modules` installed. A prior scaffold writer's work is
already committed on the head you start from; the tree must be clean at your start — verify with
`git status --porcelain` and stop if a file you do not own is dirty.

## Scope

- Owned: the files the hit list names, `src/core/templates.ts` (comment prose only),
  `.claude/rules/architecture.md`, `host.json` (through `npm run build:inventory` only).
- Off-limits: every other file; template code bytes; emitted-corpus pins; `tests/**` (if a test
  pins a sentence you rewrote, stop and report the pin instead of editing it). No commits.

## Acceptance criteria (cheap-first)

1. A re-run of the sweep's own pattern (case-insensitive whole-word `above|below` over the
   table's glob set) returns only hits classed QUOTED, NUMERIC, or OTHER — name the command and
   paths per `.claude/rules/writing.md` § Substitutions.
2. Scoped oxfmt clean on any `.ts` file touched; `npm run check:src:core` green if
   `templates.ts` moved.
3. `npm run build:inventory` run last, `host.json` regenerated, `npm run test:config` green.

## Deviation contract

Stop and report on: a pinned byte carrying a directional word, a hit whose rewrite changes
meaning rather than only direction, or a dirty tree at start. Ancillary wording is yours.

## Output

Final message = report: per-hit before/after fragments, the re-swept pattern and its residual
hits with classes, the implementations-cell new form, gate tails, `git diff --stat`,
`git status --porcelain`, deviations or none.
