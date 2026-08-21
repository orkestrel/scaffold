# Unit S-fix: the scaffold audit round's survivors

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. This is a fix round; the ruling record is
`.orkestrel/campaign/audit-scaffold-reconciliation.md` — read it. Audited afterwards by Opus.
You perform the assignment directly and spawn nothing.

## The findings, each with its bounding constraint

1. **The template-TODO instrument's three gaps** (`tests/setupPolicy.ts`, the TODO scan and
   its controls; `tests/policy.test.ts` where controls register):
   - lone-CR line endings defeat the splitter — split CR-tolerantly; control: a CR-only
     document whose bare TODO reds and whose fenced TODO stays green (the analyst's executed
     vector).
   - a fence opener/closer indented up to three spaces is not recognized — tolerate the
     indent; control: a fenced TODO inside a numbered-list item at three spaces stays green
     (the live corpus shape at `.agents/skills/orkestrel-falsify/SKILL.md:147-150`).
     CONSTRAINT: four spaces is an indented code block, a different construct — state that as
     the limit in the instrument's TSDoc, do not chase it.
   - bridge documents are unscanned — extend the scan to each `.claude/skills/<name>/SKILL.md`
     body; control: a bridge fixture carrying a bare TODO reds. Membership strings updated to
     what the code now covers.
2. **The directory allowlist** (`tests/setupPolicy.ts`, the three-shape inventory): a skill's
   directories are `agents/` and `references/` only; any other directory — empty included —
   reds with its own message. Control: an empty `assets/` fixture reds. CONSTRAINT: do not
   re-report what the nested-references rule already owns (its fixture must red under ITS
   message, not the new one).
3. **The plugin's method-body blindness** (`configs/policy.ts`; `tests/config.test.ts`):
   report when the nearest enclosing function ancestor is a method — the method node itself
   stays exempt through the existing guard. RuleTester: invalid — a class-declaration method
   body holding `const value = () => 1`; valid — a class expression (the `ClassExpression`
   early return STAYS; it pins a stated sweep blind spot). Resolve `isPolicyVisitor`: give it
   a case only it admits, or delete it — its current RuleTester case passes with the helper
   deleted, which `.claude/rules/tests.md` forbids.
4. **The three-shape law's missing home** (`.claude/rules/documentation.md` § Workflow
   skills): one directive sentence — a skill directory holds `SKILL.md`,
   `agents/openai.yaml`, and the `references/*.md` its `SKILL.md` names, and no other file or
   directory — absorbing the auxiliary README/changelog clause into it.
5. **The two stale ROADMAP rows** (`ROADMAP.md`): strike the scaffold-policy plugin-rule row
   (landed as R2); rewrite the honest-form sweeps row so the two landed instruments are
   recorded as landed with the membership each enforces, and the model-routing/
   version-catalog half stays review-owned with its recorded reason.

## Scope

- Owned: `tests/setupPolicy.ts`, `tests/policy.test.ts`, `configs/policy.ts`,
  `tests/config.test.ts`, `.claude/rules/documentation.md` (the one clause), `ROADMAP.md`
  (the two rows).
- Standing entries: everything `git status --porcelain` lists at your start.
- KNOWN STANDING RED, not yours: `test:src:core`'s `BASE_DEV_DEPENDENCIES` case reds on the
  tarball-installed `@orkestrel/test` manifest reference — release prep owns the pin restore.
  Scope your suite criteria to the projects your files feed (`policy`, `config`) and report
  the core project only as an observation.
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`. The sandbox denies network. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly `.claude/rules/documentation.md`… (already standing)
   — report before/after lines per owned file.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned code files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first per finding: each new control red against the unfixed instrument (or an
   equivalent probe recording the old rule's misread — the P-fix precedent), green after.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project policy`
   exits 0 and `--project config` exits 0.
6. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings .` exits 0 (the whole tree stays
   clean under the strengthened plugin rule — if a `src/**` or `app/**` site reds under the
   method fix, STOP and report it; fixing source is outside this unit).

## Output

The diff; raw output and exit code per criterion including every failing-first pair; any
deviation. No process diary.

## Deviation contract

Stop on: criterion 6 reddening in-population source; a control that cannot be made to
discriminate; a criterion unreachable. Wording within the fixed content is yours: decide,
record, carry on.
