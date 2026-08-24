# Unit R8 report — transport contracts out of the dispatchable roster (2026-08-24)

Both transport contracts moved to `.agents/transports/`, every prose referrer names the new path,
and the R4 patches landed on the moved Claude-side file. A patch pair against
`src/core/constants.ts` and `tests/distribution.test.ts` is returned report-only and it is
**blocking**: without it the moved files leave the vendored host set silently, and
every target's vendored bridge charter points at a file the target does not receive. No deviation
under the brief's stated triggers.

## The moves

- `git mv .claude/agents/codex.md .agents/transports/codex.md` — git records it as a rename.
- `git mv .codex/agents/claude.toml .agents/transports/claude.md` — git records it as a rename.

Old paths are gone from the working tree. `.claude/agents/` and `.codex/agents/` now list only
dispatchable roles.

## Conversion notes

### `.agents/transports/codex.md` — YAML frontmatter to a titled lead

The file kept every body section. Its dispatch frontmatter was removed, because a file outside
`.claude/agents/` is not a dispatchable role and those fields configure a dispatch that never
happens:

| Removed field       | Value                                                              | Where it lives instead                        |
| ------------------- | ------------------------------------------------------------------ | --------------------------------------------- |
| `name`              | `codex`                                                            | The filename                                  |
| `description`       | The transport-contract sentence R4 wrote                           | The lead paragraph, wording preserved         |
| `tools`             | `Bash, Read, Grep, Glob, mcp__codex__codex, mcp__codex__codex-reply` | Already declared in `analyst.md` and `sol.md` |
| `model`             | `sonnet`                                                           | Already declared in `analyst.md` and `sol.md` |
| `effort`            | `low`                                                              | Already declared in `analyst.md` and `sol.md` |
| `permissionMode`    | `default`                                                          | Already declared in `analyst.md` and `sol.md` |

The R4 description text survives as the lead paragraph. Its closing clause "Never dispatched
directly for work" became "This file is a contract, not a role: it is never dispatched, and the
drivers that bind it pin their own tools, model, effort, and permission mode", which states the
same rule and names where the dropped fields are pinned.

Verified before dropping the allowlist: `.claude/agents/analyst.md:4` and `.claude/agents/sol.md:4`
each declare `tools: Bash, Read, Grep, Glob, mcp__codex__codex, mcp__codex__codex-reply`, so the
MCP tools the contract's work-class rule names remain reachable from every binding driver.

### `.agents/transports/claude.md` — TOML to Markdown

`developer_instructions` was a triple-quoted string; its paragraphs transferred verbatim. The
`Invocation:` line's command moved into a `text` code fence, which is presentation only. The
`description` value became the lead paragraph with the same closing rule applied as on the Codex
side. Dropped dispatch fields, for the same reason:

| Removed field            | Value            | Where it lives instead                                          |
| ------------------------ | ---------------- | --------------------------------------------------------------- |
| `name`                   | `claude`         | The filename                                                    |
| `model`                  | `gpt-5.6-terra`  | `planner.toml:3`, `reviewer.toml:3`, `opus.toml:3`              |
| `model_reasoning_effort` | `low`            | `planner.toml:4`, `reviewer.toml:4`, `opus.toml:4`              |
| `sandbox_mode`           | `read-only`      | `planner.toml:5`, `reviewer.toml:5`, `opus.toml:5`              |

The dropped `sandbox_mode = "read-only"` was wrong for one binder already: `opus.toml:5` pins
`workspace-write`, so the contract's own value could never have governed it. Each driver pinning
its own sandbox is the state the contract text already describes.

## The two R4 patches, applied

Both landed on `.agents/transports/codex.md` byte-for-byte as
`.orkestrel/debrief/r4-charters-report.md` § "Shared and off-limits file patches" states them.

- Patch 1 (S7, the authority-pointer form) is now `.agents/transports/codex.md:9-12`.
- Patch 2 (S8, the `tmp/codex/` retention trim) is now `.agents/transports/codex.md:162-163`,
  under `## Journals` at `:160`.

## Every referrer updated

| File and line                     | Change                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `.claude/agents/analyst.md:19`    | `.claude/agents/codex.md` → `.agents/transports/codex.md`; line rewrapped            |
| `.claude/agents/analyst.md:47`    | `per \`codex.md\`` → `per \`.agents/transports/codex.md\``; paragraph rewrapped      |
| `.claude/agents/analyst.md:52-53` | `per \`codex.md\`'s work-class rule` → `per the work-class rule in \`.agents/…\``    |
| `.claude/agents/sol.md:19`        | `.claude/agents/codex.md` → `.agents/transports/codex.md`; line rewrapped            |
| `.claude/agents/sol.md:45`        | `per \`codex.md\`` → `per \`.agents/transports/codex.md\``; paragraph rewrapped      |
| `.codex/agents/planner.toml:8`    | `.codex/agents/claude.toml` → `.agents/transports/claude.md`; line rewrapped         |
| `.codex/agents/reviewer.toml:8`   | `.codex/agents/claude.toml` → `.agents/transports/claude.md`; line rewrapped         |
| `.codex/agents/opus.toml:8`       | `.codex/agents/claude.toml` → `.agents/transports/claude.md`; line rewrapped         |
| `.agents/orchestration.md:173-181`| The two § Roles bullets that name the moved files, rewritten to the new home         |
| `CLAUDE.md:30-32`                 | `Sol through \`analyst\` and \`codex\`` → `\`analyst\` and \`sol\``, plus the pointer |

`.claude/agents/analyst.md:52-53` reads "per `codex.md`'s work-class rule" at HEAD. A bare
possessive on a code token breaks `.claude/rules/writing.md` § Code tokens, so the clause was
recast as "per the work-class rule in `.agents/transports/codex.md`" rather than possessivizing the
longer path.

### The `.agents/orchestration.md` edit, in full

The brief grants one orchestration edit, kept to the sentences naming the moved files. The § Roles
bullets naming them, at HEAD:

```markdown
- `codex` is the shared Sol transport contract, not a route. `analyst` and `sol` are the named
  bridges; both bind that contract by reference and pin only their route and sandbox.
- Mirroring is by work class, not filename. A transport contract is provider-specific:
  `.claude/agents/codex.md` carries the Sol transport on the Claude side, `.codex/agents/claude.toml`
  the Opus transport on the Codex side, and each side's bridges bind their own by reference.
```

now read:

```markdown
- A transport contract lives in `.agents/transports/`, not in an agents directory. A harness lists
  its dispatchable agents from that directory, so a contract that is never dispatched sits outside
  it. `.agents/transports/codex.md` is the shared Sol transport contract and
  `.agents/transports/claude.md` the shared Opus transport contract. Neither is a route: `analyst`
  and `sol` are the named Sol bridges, `planner`, `reviewer`, and `opus` the named Opus bridges, and
  each binds its own contract by reference and pins only its route and sandbox.
- Mirroring is by work class, not filename. A transport contract is provider-specific: the Codex
  contract carries the Sol transport the Claude-side bridges follow, the Claude contract carries the
  Opus transport the Codex-side bridges follow, and each side's bridges bind their own.
```

The first bullet gains the placement rule ruling 10 adopts, and names the Opus-side bridges beside
the Sol-side ones — at HEAD only the Sol bridges were named, so a Codex-side reader had no route
list. The second bullet drops the paths, because the first bullet now carries them and a rule wants
one home.

### The `CLAUDE.md` edit and why it is not a route change

`CLAUDE.md:31` at HEAD read "Reach Grok through `grok`, and Sol through `analyst` and `codex`."
That named `codex` as a route, which `.agents/orchestration.md` § Roles contradicts at HEAD ("`codex`
is the shared Sol transport contract, not a route") and which the roster no longer contains. The
line now names `analyst` and `sol` — the two bridges `.agents/orchestration.md` already names — and
points at the contract as a contract. This corrects a listing that was already wrong rather than
changing a live route, so the deviation trigger for a dispatch route's meaning does not fire.

Ruled out as non-referrers: `.cursor/rules/orchestration.mdc:26` names the `codex` and `claude` MCP
**servers** registered in `.cursor/mcp.json`, not the contract files; `.claude/settings.json:7-18`,
`:242-243`, and `.mcp.json:3-4` name the `codex` and `claude` CLIs and MCP server ids. None is a
reference to a moved file. `.codex/config.toml` names neither file; its engine mapping lists
`analyst`, `implementer`, `planner`, `reviewer`, `opus`, and the cheap-tier roles, and no transport
contract.

## The policy finding — the brief's Unknowns

**No policy assertion pins the agent roster.** `tests/setupPolicy.ts` and `tests/policy.test.ts`
were searched for `agents/` and `transports`. Every hit is `.agents/skills` structure or the
`agents/openai.yaml` skill-metadata filename: `setupPolicy.ts:104` (`SKILL_FAMILY_ROOT`), `:117`,
`:1123`, `:1245`, `:1301`, `:1311`, `:1319`, `:1377`, `:1385`, `:1404`, `:1408`, `:1417`,
`:1863-1969`, `:1923`. Neither file names `.claude/agents`, `.codex/agents`, or any role file. The
grant to move a policy assertion therefore had no subject, and `npm run test:policy` is green after
the move (93 passed).

**A test outside the policy project pins both moved paths.**
`tests/distribution.test.ts:210` (`'.claude/agents/codex.md'`) and `:246`
(`'.codex/agents/claude.toml'`) sit in the `expanded` declaration of the `distribution` project's
"stages exactly the declared vendored host inventory" case. That project runs from
`prepublishOnly`, not from `npm test`. Its assertion is left unedited, for the reason in the next
section: moving those two entries to the new paths makes the case fail on a different assertion,
because the fix needs a file this unit does not own.

## Blocking report-only patches

`src/core/constants.ts` is named in neither the brief's owned list nor its off-limits list, so it is
report-only. Both patches close one problem and must land together.

### The problem

`HOST_PATHS` in `src/core/constants.ts:124-157` is the vendored candidate set, and
`stageInventory` walks it (`src/server/helpers.ts:1401`) to produce `host.json` and `dist/host`. It
names `.agents/orchestration.md` and `.agents/skills`, and **not** `.agents/transports`. The moved
files were vendored only because they sat beneath `.claude/agents` and `.codex/agents`. After this
move they are beneath neither, so a regeneration of `host.json` drops them from the vendored set
without reporting anything.

That is silent breakage in every target, not in this repository. `.claude/agents/analyst.md` and
`.claude/agents/sol.md` are vendored, and each now instructs its reader to read
`.agents/transports/codex.md` — a file the target would not have. The same holds for the vendored
`.codex/agents/planner.toml`, `reviewer.toml`, and `opus.toml` pointing at
`.agents/transports/claude.md`.

### Patch A — `src/core/constants.ts`

In `HOST_PATHS`, insert one entry after `'.agents/skills',`:

```ts
	'.agents/orchestration.md',
	'.agents/skills',
	'.agents/transports',
	'.claude/agents',
```

### Patch B — `tests/distribution.test.ts`

In the `expanded` declaration, insert after line 205
(`'.agents/skills/orkestrel-publish/references/window.md',`), at three tabs of indentation:

```ts
			'.agents/transports/claude.md',
			'.agents/transports/codex.md',
```

and delete line 210 (`'.claude/agents/codex.md',`) and line 246
(`'.codex/agents/claude.toml',`).

Both loops in that case require both halves. `for (const path of HOST_PATHS)` at `:279-283` fails on
a `HOST_PATHS` entry no `expanded` destination sits beneath, so Patch A alone is red.
`for (const destination of expanded)` at `:284-288` fails on an `expanded` destination no
`HOST_PATHS` entry covers, so Patch B alone is red. The case then compares against `dist/host`, so
it needs a rebuild as well, which is why this unit did not run it.

### Why this is not a stop-and-report deviation

The brief's second trigger names a moved name found "in a vendored-host manifest whose regeneration
this unit cannot run". `host.json:250-251` and `:460-461` carry the old storage and destination
paths, and the brief's Standing conditions already name `host.json` as stale at HEAD and assign the
regeneration to the Orchestrator at integration. That condition covers the manifest. What it does
not cover is `HOST_PATHS` membership, which no regeneration reaches, and which is a source constant
rather than a manifest. The primary objective — move the files, update the referrers — closes with
owned files alone, so the work finished and this rides back as a patch pair rather than stopping the
unit.

## Validation

Every command ran on 2026-08-24 in `/home/user/scaffold`, read-only and scoped to the owned files.

- `npx oxfmt --config .oxfmtrc.json --check .agents/transports .claude/agents .codex/agents .agents/orchestration.md CLAUDE.md`
  → "All matched files use the correct format. Finished in 567ms on 30 files using 4 threads."
- `npm run test:policy` → "Test Files 1 passed (1) · Tests 93 passed (93) · Duration 1.46s". This is
  the answer to the Unknowns as well as a gate: the sweep pins no roster membership, so the move
  does not move it.
- Acceptance criterion 2, run verbatim as the brief states it —
  `grep -rn "agents/codex.md\|agents/claude.toml" /home/user/scaffold --include="*.md" --include="*.toml"`
  with `.orkestrel/`, `tmp/`, `dist/`, and `node_modules/` excluded → no hits. The new homes are
  `.agents/transports/codex.md` and `.agents/transports/claude.md`, which the pattern does not match,
  so a clean result is the pass. **Name the bound:** that pattern admits only `*.md` and `*.toml`,
  so it cannot see the surviving occurrences, which sit in `host.json` (a `.json` file) and
  `tests/distribution.test.ts` (a `.ts` file). A wider sweep across `*.md`, `*.toml`, `*.json`,
  `*.ts`, `*.mdc`, and `*.yaml` over the same exclusions returns `host.json:250-251`,
  `host.json:460-461`, `tests/distribution.test.ts:210`, and `tests/distribution.test.ts:246`, and
  nothing else.
- Vocabulary sweep over `.agents/transports/`, pattern
  `\b(should|simply|easy|easier|just|currently|utiliz|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|sanity check|dummy|blacklist|whitelist|master|slave)\b`
  case-insensitively → no hits. Second sweep, `\b(once|since|new|now|latest)\b` over the same path
  → no hits.
- Em dash spacing, pattern `[^ ]—|—[^ ]` over `.agents/transports/`, `CLAUDE.md`,
  `.claude/agents/analyst.md`, and `.claude/agents/sol.md` → no hits.
- `git --no-pager diff --stat HEAD` → 9 files changed, 57 insertions, 46 deletions. Both moves are
  recorded as renames (`RM` in `git status --porcelain`), so the file history follows them.

Not run, per the brief's standing condition: `npm run test:config`. Not run, because it packs,
installs, and reads `dist/host`, and because it cannot pass until the patch pair lands:
`npm run test:distribution`.

## Observations for the Orchestrator

- `.agents/templates/` is not in `HOST_PATHS` either, and `tests/distribution.test.ts` names no
  `.agents/templates/` entry. R5's brief template at `.agents/templates/brief.md` is therefore
  unvendored, and no target receives it. The same Patch A edit closes it, with
  `'.agents/templates',` beside `'.agents/transports',` and the matching `expanded` row. This is
  outside R8's subject and is reported for a carrier, not fixed here.
- `dist/host/` carries the stale pre-move copies (`dist/host/claude/agents/codex.md`,
  `dist/host/codex/agents/claude.toml`, `dist/host/manifest.json:250-251` and `:460-461`, and the
  old pointer text in `dist/host/claude/agents/analyst.md`, `sol.md`, and the three
  `dist/host/codex/agents/*.toml` files). It is build output and was not touched.
- This unit edits vendored files under `.claude/agents/`, `.codex/agents/`, `CLAUDE.md`, and
  `.agents/orchestration.md`, so their `host.json` digests are stale on top of what R4 already
  staled. One regeneration at integration covers all of them — after Patch A, so the regeneration
  picks up `.agents/transports/`.
- `.claude/agents/reviewer.md:40` still carries "easier", which R4 reported and no finding names.
  Still open.
