# Unit R2 report — the `orkestrel-publish` skill

## Touched files

All owned. Nothing outside the two skill directories was written.

| File | Carries |
| ---- | ------- |
| `.agents/skills/orkestrel-publish/SKILL.md` | Trigger frontmatter, the authority load order, the boundary with the contract, the release loop (name the round, take the registry evidence, visit, rule on the bump, prepare the layer, reach the approval, spend the window, close from the registry), and the acceptance conditions with the `RELEASE: LANDED` / `RELEASE: OPEN` terminal line. Names both references. |
| `.agents/skills/orkestrel-publish/references/wave.md` | The per-repository visit in order, the parallel-slice and refuse-a-failed-target rule, the bump triggers and the final-set-versus-packument correction, the pre-bump-dist rule, the layer preparation order, the self-pin sweep (ruling 15 plus the installed-tree caveat), and the between-layer registry refresh. |
| `.agents/skills/orkestrel-publish/references/window.md` | Terminal arming (`script -qfc`, `--browser=false`, fifo stdin, `npm login` before publish, `whoami` confirmation and re-probe, the legacy-prompt reading, the Windows Git Bash limit), reaching the approval (keyboard timing, the two URL stages, last-URL-in-log-order, foreground read before any watcher, plain-text relay, re-read before declaring failure, the `404` reading), spending the window (open with one package, chase the rest, superseded-URL 403, never retry an unauthorized publish, in-window `EOTP` retry, batch sizing), and reading the verdict from the registry. |
| `.agents/skills/orkestrel-publish/agents/openai.yaml` | `interface:` over `display_name`, `short_description`, `default_prompt`, in that order, single-quoted, no apostrophes, naming `$orkestrel-publish`. |
| `.claude/skills/orkestrel-publish/SKILL.md` | The Claude bridge: canonical `name` and `description` byte-identical, names `.agents/skills/orkestrel-publish/SKILL.md`, no references of its own, no independent process. Mirrors `.claude/skills/orkestrel-debrief/SKILL.md`. |

Diffstat (untracked, so counted as added lines):

```text
 .agents/skills/orkestrel-publish/SKILL.md                 |  78 ++++++++++
 .agents/skills/orkestrel-publish/agents/openai.yaml       |   4 +
 .agents/skills/orkestrel-publish/references/wave.md       |  96 +++++++++++
 .agents/skills/orkestrel-publish/references/window.md     |  95 ++++++++++
 .claude/skills/orkestrel-publish/SKILL.md                 |  12 ++
 5 files changed, 285 insertions(+)
```

## Contract-boundary choices

The brief listed "what a bump obliges" and "fixing a dependency before it publishes" as
`references/wave.md` content. R1 kept both in `.agents/orchestration.md`, under the boundary test
in ruling 3 — an executor who is not publishing still meets the tarball swap and still has to
decide whether a change obliges a republish, and the post-shrink section says so in its own words
("What remains in this section binds an executor who is not publishing"). That is a placement
overlap, not a contradiction of law, and acceptance criterion 4 settles it: the skill points and
does not restate. I did not stop the unit on it. The specific choices:

- **Blast radius and layer order.** `wave.md` § Rule on the bump names the wave's own triggers
  (material dist diff against the published tarball; final runtime dependency set against the
  published packument) and defers the runtime-versus-development consequence, the definition of
  material content, and the layer order to `.agents/orchestration.md` § What a bump obliges.
  `SKILL.md` step "Name the round" defers the order and the catalog regeneration the same way.
- **The tarball swap.** `wave.md` § Visit a repository names the one thing the visit needs — the
  registry copy is restored before the quality gates run — and points at
  `.agents/orchestration.md` § Fixing a dependency before it publishes for the procedure.
- **Serial uploads and the chain mechanics.** R1 moved "Publish serially" and the
  long-running-command binding into the contract's opening, so `window.md` § Spend the window
  points at them rather than carrying the bullet the pre-shrink § Spending the window had.
- **The user's credential.** `SKILL.md` § Load authority states that nothing in the skill
  authorizes an upload the user did not ask for, and points at the contract for the law itself.
- **`orkestrel-align-packages`.** Not cross-linked. It owns cross-package alignment campaigns; a
  release round reads the registry directly, and a pointer there would add a second route to the
  same fleet state.

The pre-shrink wording was preserved wherever it was already reviewed prose. Departures were made
only for the writing rules: the temporal `once` in the retry bullet became `after`, and the
positional references ("before step 6", "steps 2 through 8") became the named steps.

## Policy finding (the brief's unknown)

**The policy sweep needs no registration.** `tests/policy.test.ts` calls
`inspectSkillFamily(process.cwd())` and `inspectSkillBridges(process.cwd())`, which discover
`.agents/skills/*` and `.claude/skills/*` from the filesystem (`readSkillFamily` →
`readPolicyDirectories`). No list names the skills. Proven by the control in the following
section: the new skill entered the sweep with no edit outside its own directory.

**The vendored host inventory needs a regeneration, and one off-limits file needs a patch.**

- `src/core/constants.ts` carries `.agents/skills` and `.claude/skills` as directory entries in
  `HOST_PATHS` (lines 129 and 132), and "a directory entry vendors everything beneath it", so
  `npm run build:inventory` and `npm run build:host` pick the new skill up with no source edit.
  The `host.json` regeneration the Standing conditions already assign to the Orchestrator covers
  it, provided it runs after this unit lands.
- `tests/distribution.test.ts` expands that inventory into an explicit expected list and asserts
  `listFiles(dist/host)` equals it exactly (the `stages exactly the declared vendored host
  inventory` case). The new files make that list false. The file is off-limits, so here is the
  exact patch. Insert after line 200
  (`'.agents/skills/orkestrel-polish-surface/references/capture-harness.md',`):

  ```ts
  			'.agents/skills/orkestrel-publish/SKILL.md',
  			'.agents/skills/orkestrel-publish/agents/openai.yaml',
  			'.agents/skills/orkestrel-publish/references/wave.md',
  			'.agents/skills/orkestrel-publish/references/window.md',
  ```

  and insert after line 235 (`'.claude/skills/orkestrel-polish-surface/SKILL.md',`):

  ```ts
  			'.claude/skills/orkestrel-publish/SKILL.md',
  ```

  Both insertions hold the array's sort order: `orkestrel-polish-surface` precedes
  `orkestrel-publish` because `o` precedes `u`. Tabs are the file's indentation.
  `npm run test:distribution` is not part of `npm test`; it runs under `prepublishOnly`.

## Validation

Read-only and scoped to the owned files, on 2026-08-24. `test:config` was not run, per the
Standing conditions.

| Command | Result |
| ------- | ------ |
| `npm run test:policy` | `Test Files 1 passed (1)`, `Tests 93 passed (93)` |
| `npm run test:guides` | `Test Files 1 passed (1)`, `Tests 17 passed (17)` |
| `npx oxfmt --config .oxfmtrc.json --check .agents/skills/orkestrel-publish .claude/skills/orkestrel-publish` | `All matched files use the correct format.` `Finished in 223ms on 5 files` |
| `git status --porcelain` | `?? .agents/skills/orkestrel-publish/` and `?? .claude/skills/orkestrel-publish/` only |

**Negative control on the policy instrument.** A green sweep over a discovery-based instrument
proves nothing until the new directory is shown to be inside the population it walks. Control:
mutate the canonical frontmatter `name` to `orkestrel-publish-control` in the owned file, run
`npm run test:policy`, restore. Reading with the plant in place:

```text
      Tests  3 failed | 90 passed (93)
+     "message": "SKILL.md frontmatter name matches its directory",
+     "path": ".agents/skills/orkestrel-publish/SKILL.md",
+     "path": ".claude/skills/orkestrel-publish/SKILL.md",
```

The bridge case failed with it, which also proves the bridge-to-canonical `name` comparison
reaches the new pair. After restoring the line: `Tests 93 passed (93)`. The plant was in a file
this unit created and was removed by reverting exactly that edit; `git status --porcelain` after
the restore shows the two untracked directories and nothing else.

Coverage of that control: it establishes that the skill-family and bridge cases read the new
directories and compare frontmatter across the pair. It does not establish that the reference
naming, the `openai.yaml` schema, or the template-TODO scan would fail on this skill — those
passed, and were not separately planted.

Acceptance criteria: the file set is exact with no extras (verified by `find`); frontmatter is
`name` plus a single-line `description` whose `Use ` sentence follows a period; `openai.yaml` has
exactly the three keys in order, single-quoted, with `$orkestrel-publish` in `default_prompt`;
both references are named from `SKILL.md`, and the sweep reports no template TODOs; the
contract-boundary choices are listed earlier in this report; this report file exists.

## Deviation state

No stop. One reportable overlap (the brief's wave.md content that R1 kept in the contract),
resolved by pointing, per acceptance criterion 4 and ruling 3's boundary test. One off-limits file
needs the patch given earlier: `tests/distribution.test.ts`.
