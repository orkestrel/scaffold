# Unit R9 report — rename orkestrel-human-journey to orkestrel-prove-journey

## Outcome

Renamed the skill everywhere the tree names it outside the off-limits set. `git status --short`
confirms two renames, one modified referrer file, and one modified proof file, and nothing else:

```text
RM .agents/skills/orkestrel-human-journey/SKILL.md -> .agents/skills/orkestrel-prove-journey/SKILL.md
RM .agents/skills/orkestrel-human-journey/agents/openai.yaml -> .agents/skills/orkestrel-prove-journey/agents/openai.yaml
R  .agents/skills/orkestrel-human-journey/references/captures.md -> .agents/skills/orkestrel-prove-journey/references/captures.md
R  .agents/skills/orkestrel-human-journey/references/layer.md -> .agents/skills/orkestrel-prove-journey/references/layer.md
RM .claude/skills/orkestrel-human-journey/SKILL.md -> .claude/skills/orkestrel-prove-journey/SKILL.md
 M guides/test.md
 M tests/distribution.test.ts
```

## Paths moved

- `git mv .agents/skills/orkestrel-human-journey .agents/skills/orkestrel-prove-journey` — carried
  `SKILL.md`, `agents/openai.yaml`, `references/captures.md`, `references/layer.md`.
- `git mv .claude/skills/orkestrel-human-journey .claude/skills/orkestrel-prove-journey` — carried
  `SKILL.md`.

## Lines edited

- `.agents/skills/orkestrel-prove-journey/SKILL.md:2` — frontmatter `name: orkestrel-human-journey`
  → `name: orkestrel-prove-journey`. `description` was already accurate and untouched.
- `.claude/skills/orkestrel-prove-journey/SKILL.md:2` — frontmatter `name` renamed the same way.
- `.claude/skills/orkestrel-prove-journey/SKILL.md:8` — the bridge's named canonical path,
  `.agents/skills/orkestrel-human-journey/SKILL.md` → `.agents/skills/orkestrel-prove-journey/SKILL.md`.
- `.agents/skills/orkestrel-prove-journey/agents/openai.yaml:4` — `default_prompt` token
  `$orkestrel-human-journey` → `$orkestrel-prove-journey`.
- `guides/test.md:1135` — the referring backtick name `orkestrel-human-journey` → `orkestrel-prove-journey`.
  Nothing else in the file changed.
- `tests/distribution.test.ts:195-198,241` — the five packed-contents path literals renamed from
  `.agents/skills/orkestrel-human-journey/*` and `.claude/skills/orkestrel-human-journey/SKILL.md`
  to their `orkestrel-prove-journey` equivalents. Nothing else in the file changed. Array position
  is unchanged; the file sorts the comparison array before asserting (`tests/distribution.test.ts:291`),
  so declaration order carries no meaning.

Content beyond the name-bearing lines is unchanged in both moved directories: `git diff --stat`
reports 2 insertions/2 deletions across the two `SKILL.md` files and the one `openai.yaml` file
combined, matching exactly the renamed tokens above.

## Sweep result

`agents/openai.yaml` at the repository root does not exist; the brief's reference to it was the
skill-local `agents/openai.yaml`, already covered above. A repository-wide sweep confirms the old
name survives only in the off-limits locations:

```text
$ grep -rln "orkestrel-human-journey" --exclude-dir=dist --exclude-dir=node_modules --exclude-dir=.git .
./.orkestrel/debrief/r7-naming-report.md
./.orkestrel/debrief/re-baseline-1.md
./.orkestrel/debrief/instr-audit-subjective.md
./host.json
```

`grep -rn "orkestrel-human-journey" --include="*.md" --include="*.ts" --include="*.yaml" --include="*.json" .`
filtered to exclude `.orkestrel/**`, `dist/**`, `tmp/**`, and `host.json` returns no lines,
satisfying acceptance criterion 1.

## Standing conditions observed

Ran no `test:config` and no pack, per the brief's standing conditions. `host.json` still names the
old skill path; its regeneration is the Orchestrator's integration step, after the last
vendored-file unit.

## Deviation state

No stop. No git command beyond `git mv` was run, and nothing was committed.
