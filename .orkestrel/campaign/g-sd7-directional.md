Sweep bound (exact): `/home/user/scaffold` with case-insensitive whole-word `\b(above|below)\b` over

- `.claude/agents/*.md`
- `.claude/rules/*.md`
- `.codex/config.toml`
- `.codex/agents/*.toml`
- `guides/scaffold.md`
- `AGENTS.md`
- `CLAUDE.md`
- `.agents/orchestration.md`
- `.cursor/rules/*`

Sense classes from the brief: **DIRECTIONAL** (points at other material in the document), **QUOTED** (the rule names the word), **NUMERIC** (value comparison), **SPATIAL** (rendered geometry), **OTHER** (named). No hit in this bound was classed **SPATIAL**.

Ban text used for the quoted class: `.claude/rules/writing.md` § Code tokens, references, and links — “Point to other material with `preceding`, `following`, `earlier`, or `later`, never with `above` or `below`.” (`writing.md:51`–`52`)

## Hits

| file:line | fragment | proposed sense class |
| --- | --- | --- |
| `.claude/agents/scout.md:21` | why the benches above it were unavailable | OTHER: tedious-work ladder rank (Grok / Luna vs this role), not a document pointer |
| `.claude/agents/orkestrel.md:14` | The catalog below is discovery data | DIRECTIONAL — following `## Package catalog` / marker table |
| `.claude/agents/orkestrel.md:112` | The `Layer` column above is the publish round | DIRECTIONAL — preceding catalog table |
| `.claude/agents/researcher.md:31` | why the benches above it were unavailable | OTHER: tedious-work ladder rank |
| `.claude/agents/checker.md:16` | why the benches above it were unavailable | OTHER: tedious-work ladder rank |
| `.claude/rules/writing.md:51` | never with `above` or | QUOTED — rule names the banned word |
| `.claude/rules/writing.md:52` | `below`. Use `earlier` and `later` | QUOTED — rule names the banned word |
| `.claude/rules/tests.md:123` | record nothing below a magnitude | NUMERIC — measured ratio vs a magnitude threshold |
| `.claude/rules/tests.md:172` | The shapes below are the contract | DIRECTIONAL — following helper-shape list |
| `.claude/rules/architecture.md:52` | The self-contained exception above covers | DIRECTIONAL — preceding self-contained-entrypoint bullet |
| `.claude/rules/architecture.md:87` | `shapers.ts` — sits above them, consumes them | OTHER: import-graph rank (`helpers.ts` / `validators.ts` as leaves) |
| `.claude/rules/architecture.md:111` | kind-purity rules above binds regardless | DIRECTIONAL — earlier kind-purity rules |
| `.claude/rules/architecture.md:121` | the constants rule above binds regardless | DIRECTIONAL — earlier constants rule |
| `.claude/rules/architecture.md:126` | the functions rule above still binds | DIRECTIONAL — earlier functions rule |
| `.claude/rules/architecture.md:282` | follow the barrel rule above | DIRECTIONAL — earlier barrel rule |
| `.claude/rules/workspace.md:169` | place that script by the paragraph above | DIRECTIONAL — preceding isolated-project paragraph |
| `.codex/config.toml:17` | the Codex specifics below | DIRECTIONAL — remainder of `developer_instructions` |
| `guides/scaffold.md:15` | Every code fence below is illustrative | DIRECTIONAL — following fences in the guide |
| `guides/scaffold.md:212` | at or above the supported minimum | NUMERIC — engines floor vs supported minimum |
| `guides/scaffold.md:394` | the interface tables below describe the classes | DIRECTIONAL — following interface tables |
| `guides/scaffold.md:746` | the Compile section below states it | DIRECTIONAL — named later section |
| `guides/scaffold.md:1094` | a floor below the newest release that major serves | NUMERIC — version floor vs newest in-major release |
| `AGENTS.md:16` | from the rule map below | DIRECTIONAL — later `## Rule map` |
| `AGENTS.md:118` | Every file below is a normative extension | DIRECTIONAL — following rule-map table |
| `.agents/orchestration.md:10` | It wins over everything below | DIRECTIONAL — following numbered authority items |
| `.agents/orchestration.md:98` | substitute engine from the table above | DIRECTIONAL — preceding harness/engine table |
| `.agents/orchestration.md:291` | starts the login ladder below | DIRECTIONAL — later `### Recovering a dark bench` (`orchestration.md:783`) |
| `.agents/orchestration.md:850` | follow the runtime rule above | DIRECTIONAL — preceding runtime-bump bullet |

## Bound members with no match

`.claude/agents/*.md`: `analyst.md`, `application.md`, `builder.md`, `codex.md`, `grok.md`, `implementer.md`, `planner.md`, `reviewer.md`, `sol.md`, `verifier.md`.

`.claude/rules/*.md`: `application.md`, `browser.md`, `documentation.md`, `names.md`, `patterns.md`, `quality.md`, `styles.md`, `typescript.md`.

`.codex/agents/*.toml`: `analyst.toml`, `application.toml`, `builder.toml`, `checker.toml`, `claude.toml`, `grok.toml`, `implementer.toml`, `orkestrel.toml`, `opus.toml`, `planner.toml`, `researcher.toml`, `reviewer.toml`, `scout.toml`, `verifier.toml`.

`CLAUDE.md`. `.cursor/rules/*`: `orchestration.mdc` (only member).

## Git porcelain (outside the bench)

Requested command: `git -C /home/user/scaffold status --porcelain`, cwd not the repo.

- **Before:** Shell with cwd `/tmp`, then cwd `/root`. Each returned `Rejected:` and empty body. No porcelain line obtained in this lane.
- **After:** this lane issued no writes (Ask mode / grok read-only). The after porcelain command was not obtained either; the same Shell path is what failed before.

Conversation-start snapshot (not porcelain; different command; not this lane’s capture): branch `claude/new-session-hxonen`; modified `configs/src/vite.bin.config.ts`, `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`, `src/core/compilers.ts`, `src/core/templates.ts`, `tests/src/core/templates.test.ts`, `vite.config.ts`. None of those paths are in the sweep bound.

## Unknowns

- Porcelain before/after: Shell rejected; this lane cannot attest working-tree identity from the requested command.
- `.claude/agents/{scout,researcher,checker}.md` “benches above it”: classed OTHER (ladder rank). A later round could treat the ladder as document material and reclass DIRECTIONAL.
- `.claude/rules/architecture.md:87` “sits above them”: classed OTHER (import-graph rank). SPATIAL in the brief is rendered geometry; this is not a rendered surface.
- `.claude/rules/tests.md:123` “below a magnitude”: classed NUMERIC (threshold). It is not a version-floor comparison of the `guides/scaffold.md:212` shape.
- `.agents/orchestration.md:291` “login ladder below”: classed DIRECTIONAL because login recovery is later in the same file. A process-stack reading (install → login → round-trip) would be OTHER.
