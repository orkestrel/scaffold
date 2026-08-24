# Unit R7 report — workflow-skill naming axes

## Outcome

The naming rule landed in `.claude/rules/documentation.md` § Workflow skills, and the
`enterprise-bootstrap` skill is ruled in that file as a stated exception that keeps its name.

Two findings ride out with it, neither closable from the owned file: the
`orkestrel-human-journey` directory does not satisfy the rule the reconciliation adopted, and
`test:config` was already red at HEAD because commit `c352b21` left the committed host inventory
stale.

## Touched files

| File                             | Change                                                          |
| -------------------------------- | --------------------------------------------------------------- |
| `.claude/rules/documentation.md` | Added the skill-directory naming axes and the prefix exception  |

Diffstat:

```text
 .claude/rules/documentation.md | 2 ++
 1 file changed, 2 insertions(+)
```

`git status --short` reports ` M .claude/rules/documentation.md` and nothing else.

## The landed rule text

Both lines sit in § Workflow skills, immediately after the directive that opens the section and
before the `SKILL.md` file mechanics. The naming of a directory is the first decision a skill
author takes, and the opening directive is what establishes that a skill is the thing being named.

```markdown
- Where a skill works a named subject, name its directory in the `orkestrel-<verb>-<noun>` form with the verb acting on that noun; where a skill runs a process the Orchestrator owns, name it in the `orkestrel-<verb>` form.
- For a portable skill that teaches an external framework, takes the host project's own `AGENTS.md` file as its code law, and binds none of this repository's rule files, drop the `orkestrel-` prefix and name the skill for the framework a reader searches for. Add no other exception. The `enterprise-bootstrap` skill meets that test and keeps its name: it carries Bootstrap 5.3 craft, assumes no stack, and names the `.agents/orchestration.md` and `.claude/rules/quality.md` files only where they are present. Do not rename it into the namespace.
```

The exception is written as a test a future skill author can run against a candidate skill rather
than as a name on an allowlist, so it closes the coin flip that finding S14 identified without
inviting a second unexplained outsider. `Add no other exception` is what makes it a gate.

## The `enterprise-bootstrap` ruling

**It stays as the recorded exception. It does not rename.**

The reason is that it fails the test the prefix marks. Every `orkestrel-` skill opens with a
`## Load authority` section binding this repository's contract:

```text
$ cd .agents/skills && for d in orkestrel-*; do grep -n 'Load authority' $d/SKILL.md | head -1; done
orkestrel-align-packages         8:## Load authority
orkestrel-build-application      8:## Load authority
orkestrel-debrief                8:## Load authority
orkestrel-falsify               11:## Load authority
orkestrel-harden-package         8:## Load authority
orkestrel-human-journey          8:## Load authority
orkestrel-polish-surface         8:## Load authority
```

`enterprise-bootstrap` has no such section. Its headings are `Portability`, `The mandate`,
`Process`, `Bootstrap operating principles`, `Accessibility baseline`, and
`Production checklist`. Where it names this repository's files it conditions the reference:

- `.agents/skills/enterprise-bootstrap/SKILL.md:42` — "Follow the project's code law. Its
  `AGENTS.md`, lint rules, and design system decide language, layout, and forbidden patterns."
  It defers to whatever host project it is installed into, not to this one.
- `SKILL.md:77` — "`.agents/orchestration.md` owns this law **where it is present**."
- `SKILL.md:84` — "`.claude/rules/quality.md` owns this law **where it is present**."
- `SKILL.md:40` — "Assume no stack. Infer it from the workspace."

That conditioning appears in no other skill (`grep -c 'where it is present'` returns 0 for every
`orkestrel-*/SKILL.md`).

So the prefix would assert something false. `orkestrel-` marks a skill that binds this system's
authority chain; `enterprise-bootstrap` is a portable package that teaches Bootstrap 5.3.x craft
and takes its law from whichever workspace hosts it. A verb-noun rename such as
`orkestrel-build-interface` would also delete the framework name from the trigger a reader
searches on, which is the whole of the skill's subject.

The trigger-overlap half of S14 has no carrier. Finding S14 asked for two things: state the rule,
and "bound its trigger against `orkestrel-polish-surface`". Ruling 11 in `reconciliation.md`
carries only the naming half, and this brief scopes me to naming. The description that would need
the bounding lives in `.agents/skills/enterprise-bootstrap/SKILL.md`, which is off-limits here.
**Route the trigger bounding to its own unit or drop it on the record.**

## Finding: `orkestrel-human-journey` does not satisfy the rule

Every skill directory checked against the landed rule:

| Directory                     | Form                          | Verdict                        |
| ----------------------------- | ----------------------------- | ------------------------------ |
| `orkestrel-align-packages`    | `align` acts on `packages`    | Conforms, subject skill        |
| `orkestrel-build-application` | `build` acts on `application` | Conforms, subject skill        |
| `orkestrel-harden-package`    | `harden` acts on `package`    | Conforms, subject skill        |
| `orkestrel-polish-surface`    | `polish` acts on `surface`    | Conforms, subject skill        |
| `orkestrel-debrief`           | bare verb                     | Conforms, process skill        |
| `orkestrel-falsify`           | bare verb                     | Conforms, process skill        |
| `enterprise-bootstrap`        | framework name, no prefix     | Ruled exception, stated in file |
| `orkestrel-human-journey`     | adjective-noun                | **Does not conform**           |

`human` is not a verb, so the name parses as neither `orkestrel-<verb>-<noun>` nor
`orkestrel-<verb>`. Finding S14 at `instr-audit-subjective.md:239` lists it among the verb-noun
subject skills. That premise is false, and ruling 11 adopted the rule on it.

I did not stop the unit on it, and here is the reasoning for the Orchestrator to check. The
deviation contract fires where the rule contradicts an existing name because "that would mean the
axes are wrong, not the name". The evidence says the opposite: four subject skills take a genuine
verb acting on a noun and two process skills take a bare verb, so the axes are corroborated and
this one name is the outlier. Acceptance criterion 2 provides the discharge path explicitly —
"consistent with the rule **or** named in your report as the recorded exception" — so the brief's
own criteria contemplate a non-conforming name being carried by the report. Landing the rule and
flagging the name delivers strictly more than stopping would.

I did not write this name into the rule file as a second exception, because that would be me
ruling on it rather than reporting it, and it does not meet the stated exception's test either.

The rule as landed therefore reads as an instruction one existing directory violates until the
Orchestrator rules. **This is the open item R7 hands back.** Options:

- **Rename it.** `orkestrel-prove-journey` matches the skill's own title, "Prove an application
  through human journeys", and satisfies the subject form. Recommended, as its own bounded unit.
- **Record it as a second exception in the rule file.** Costs the rule its gate: an exception with
  no test is the coin flip S14 opened, restated.

A rename is its own unit for the same reason `enterprise-bootstrap`'s is. These files name it,
outside `dist/`:

```text
$ grep -rln "orkestrel-human-journey" --exclude-dir=dist --exclude-dir=node_modules --exclude-dir=.git .
./.agents/skills/orkestrel-human-journey/SKILL.md
./.agents/skills/orkestrel-human-journey/agents/openai.yaml
./.claude/skills/orkestrel-human-journey/SKILL.md
./.orkestrel/debrief/instr-audit-subjective.md
./guides/test.md
./host.json
./tests/distribution.test.ts
```

Plus the `dist/host` vendored copies and the `$orkestrel-human-journey` token in
`agents/openai.yaml` § `default_prompt`.

## Validation run

**Format, scoped to the owned file — green.**

```text
$ npx oxfmt --config .oxfmtrc.json --check .claude/rules/documentation.md
Checking formatting...
All matched files use the correct format.
Finished in 215ms on 1 files using 4 threads.
EXIT=0
```

**Policy suite — green.** This is the gate the reconciliation names for skill and rule files.

```text
$ npm run test:policy
 Test Files  1 passed (1)
      Tests  93 passed (93)
   Duration  1.42s
```

**Prose sweep against `.claude/rules/writing.md` § Substitutions — clean.** Pattern
`should|simply|easi|easy|just |currently| now |latest| new |utilize|leverage| via |in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|since |once |please|sanity|dummy|blacklist|whitelist|master|slave`,
case-insensitive, over the single path `.claude/rules/documentation.md`. No hits. The added text
states no count, names no list item by position, and carries `Bootstrap 5.3` as a version value.

**Config suite — red, and it was red before this edit.** Reported as an observation, not a
criterion.

```text
$ npm run test:config
 FAIL  |config| tests/config.test.ts > root configuration > keeps the committed host inventory aligned with the vendored checkout bytes
Error: The committed host inventory is stale at .agents/orchestration.md, .claude/rules/documentation.md
 Test Files  1 failed (1)
      Tests  1 failed | 45 passed (46)
```

## Finding: the host inventory is stale, and one half predates this unit

`.claude/rules/documentation.md` is a vendored host file, so this edit restales its digest in the
committed `host.json`. That half is mine and is expected:

```text
$ node -e "sha256 of .claude/rules/documentation.md"
actual   : 1f0008550e918591632975be8ea3326249aad4d705bd46fde35f37450f392381
host.json: 002494958873d15491b42eac683e8429b83e2baa6900e154214f9cadb8059a2c

$ git show HEAD:.claude/rules/documentation.md | sha256
HEAD digest: 002494958873d15491b42eac683e8429b83e2baa6900e154214f9cadb8059a2c
```

The HEAD digest matches `host.json` exactly, so the inventory was aligned for this file before the
edit and this unit is the sole cause of that row. `host.json` is outside the owned scope and its
regeneration needs `npm run build:src` then `npm run build:inventory`, which are mutating
tree-wide commands a scoped executor does not run. **Carrier: the integration step, before
`test:config` runs as a gate.**

The other half is not mine. `.agents/orchestration.md` is clean in the working tree and stale in
the committed inventory:

```text
worktree : 3e25e213504c842ed777fb135535745ceabe6acac2b95b43db60542e02aa1fc7
host.json: 63bacfdcd9b9918fb8302b723a0049bd3bbf74e939a8c1afbe50d0083c1742db
stale    : true

$ git status --short -- .agents/orchestration.md
(empty)
$ git log -1 --format="%h %ad %s" --date=short -- .agents/orchestration.md
c352b21 2026-08-24 Land the debrief's contract rulings: preflight checklist, prune and publish pointers, audit lanes, starvation law, unit artifact homes
$ git log -1 --format="%h %ad %s" --date=short -- host.json
e0b9ae7 2026-08-24 State the working bench-guard shape in the vendored tests rule
```

Commit `c352b21` is the R1 contract unit. It changed a vendored file and committed without
regenerating `host.json`, which `e0b9ae7` last touched. So `test:config` has been red at HEAD
since R1 landed, and the R7 baseline was not green on that gate. Every later unit in this campaign
that edits a vendored file inherits the same red and will read it as its own.

**Recommendation.** Regenerate `host.json` once at integration, after the vendored-file units in
this campaign land, rather than per unit. Name the regeneration step in each remaining unit's brief
as a standing condition, so no unit diagnoses an inherited red as its own defect.

## Acceptance criteria

1. **The rule appears once, in § Workflow skills, in directive form.** Met. Both added lines are
   imperative, and the rule appears nowhere else in the file.
2. **Every existing `.agents/skills/` directory name is consistent with the rule or named in the
   report as the recorded exception.** Met. The preceding table rules on every directory.
   `enterprise-bootstrap` is the exception stated in the file; `orkestrel-human-journey` is named
   here as the non-conforming name awaiting the Orchestrator's ruling.
3. **The report file exists.** Met, at `/home/user/scaffold/tmp/units/r7-naming-report.md`.

## Deviation state

**No stop.** The primary objective is closed. The deviation trigger was considered against
`orkestrel-human-journey` and ruled not to fire, with the reasoning stated earlier for the
Orchestrator to overturn. Placement was mine to decide, per the brief.

Nothing outside the owned file was written. No git command changed state. No commit.
