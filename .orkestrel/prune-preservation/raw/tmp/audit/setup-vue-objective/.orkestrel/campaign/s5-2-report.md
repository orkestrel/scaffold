# Unit S5-2 report — the setup order, the cp1252 hazard, and the surviving restatements

Every item landed. Three choices the brief left open were settled inside the owned files and are
recorded in § Deviations. No item needed an edit outside the owned files.

## Item → file → section

| Item                                     | File                        | Section                                                                          |
| ---------------------------------------- | --------------------------- | -------------------------------------------------------------------------------- |
| 1 (`setup:browser` order, claims 13, 17) | `references/layer.md`       | Import, never implement (`:66-90`)                                               |
| 1 (pointer)                              | `SKILL.md`                  | Import the journey layer (`:190-191`)                                            |
| 1 (journey-axis order)                   | `SKILL.md`                  | Read the variant once (`:89-95`)                                                 |
| 1 (S4-3 firing conditions)               | `SKILL.md`                  | Read the variant once, the `scaffold audit` table and the paragraph after it (`:117-125`) |
| 2 (cp1252 paragraph, claim 14)           | `.agents/transports/codex.md` | Sol route (`:131-136`)                                                         |
| 3 (restatements, claim 15)               | `SKILL.md`                  | Mutate each assertion class (deleted the recording bullet and the restore bullet) |
| 3                                        | `references/layer.md`       | Import, never implement (`:68`)                                                  |
| 3                                        | `references/styles.md`      | The published controls (`:111-112`)                                              |
| 3                                        | `references/captures.md`    | The proofs the suite owes (`:86`)                                                |
| 4 (cleanup route reset, F-A)             | `references/layer.md`       | The named bans, the router-call row (`:293`)                                     |
| 5 (ROADMAP row 36, F-B)                  | `ROADMAP.md`                | Row 36 (`:39`)                                                                   |
| 6 (one home, F-C)                        | `references/layer.md`, `SKILL.md` | Folded into item 1                                                         |

`.claude/skills/orkestrel-prove-journey/SKILL.md`, `agents/openai.yaml`, `references/statechart.md`,
and `references/decide.md` are unchanged: the canonical `description` did not move, and neither file
carried a site this round names.

## The exact text landed

### Item 1 — the activation order

`references/layer.md` → Import, never implement, after the bullets:

> Prove that setup module with `tests/setupBrowser.test.ts`. A workspace born with the browser setup
> runtime carries the `setup:browser` project, the `test:setup:browser` script, and that script's
> place in the `test` chain. A workspace that acquires the runtime later activates the project in
> this order:
>
> 1. Write `tests/setupBrowser.test.ts`. Writing that file selects the browser setup runtime.
> 2. Add `npm run test:setup:browser` to the `test` chain.
> 3. Run `scaffold repair`, which registers the browser-enabled `setup:browser` project and appends
>    the `test:setup:browser` script.
>
> Run `scaffold repair` before the chain invocation and it refuses the `configs` group:
>
> ```text
> The configs group is blocked because the manifest at <target> does not reach a Vitest project the planned configuration registers: setup:browser. No chain from test invokes it. test:setup:browser is not declared, so the script is missing as well as the gate: declare it and invoke it by name from the test chain. Exclude configs from --groups to write another group.
> ```
>
> Add the invocation and run `scaffold repair` again. The Node `setup` project excludes
> `tests/setupBrowser.test.ts`, so a proof of a browser helper placed anywhere else runs without a
> browser.

The refusal is transcribed from `.orkestrel/campaign/s-fix-audit-reproduction/f2-repair-setup.json`,
whose `error.message` field carries it, with the scratch target path replaced by `<target>`. It
composes at `src/bin/CLI.ts:1159` under `writing = true`.

`SKILL.md` → Import the journey layer, the pointer that replaced the second home:

> - Prove that setup module with `tests/setupBrowser.test.ts`, and activate its `setup:browser`
>   project in the order [layer.md](references/layer.md) → Import, never implement states.

`SKILL.md` → Read the variant once, the journey axis keeping its own order:

> chain, so the chain entry is yours to add. Add that entry before the repair instead where you
> prefer: `test:journey` names a configuration rather than a project, so neither order blocks the
> repair.

`SKILL.md` → Read the variant once, the paragraph after the `scaffold audit` table:

> `scaffold audit` reports the invocation question only when no chain from `test` reaches
> `npm run test:journey` through literal `npm run` calls, so a chain reaching it through an
> intermediate script raises none. It reports the configuration question only for a `test:*` script
> whose text names `vitest`, so a script naming another runner's configuration raises none either.

The table's first row now quotes S4-3's message from `src/bin/CLI.ts:1071`, ending "Add the
configuration, or remove the script that names it and its invocation from the test chain.", and its
settlement column ends "or removing the `test:journey` script and its chain invocation".

### Item 2 — the cp1252 paragraph

`.agents/transports/codex.md:131-136`:

> On a Windows host a shell write that decodes and re-encodes text can replace a code point the
> active code page cannot represent, so when a bench unit must edit a line carrying a code point
> above `0x7F`, the brief tells it to make that edit through the exec's own patch tool, never through
> `Get-Content`, `Set-Content`, `Out-File`, or a `>` redirection, and to report every such line it
> touched. The Orchestrator's review sweep compares the set of code points above `0x7F` on each
> touched line before and after the edit, and flags a line that lost any of them.

### Item 4 — the ban row

`references/layer.md:293`, the row's `Never` cell alone changed:

> | A navigation a journey step performs by a router call | The visible link or control that navigates, through `clickAccessible` or `clickAccessibleWithin` |

### Item 5 — ROADMAP row 36

> 36. Reopen browser-engine selection when the condition the emitted `configs/browsers.ts` doc block states is met. That doc block is the condition's one home, authored here in `src/core/templates.ts` as the `configs/browsers.ts` template. This item closes when `configs/browsers.ts` adopts an engine-selection design, or when that doc block no longer carries the limit.

## Controls and their readings

Each red reading is taken from the committed baseline `f540107b` through `git show HEAD:<path>`, so
it is the state this round changed rather than a reconstruction.

| Control   | Command                                                                                              | Red reading                                                                                                       | Green reading                                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| S5-2-C1   | `grep -n "replaces a code point above" .agents/transports/codex.md`                                  | `git show HEAD:…` matches `:131`, exit 0                                                                          | No match, exit 1                                                                                                       |
| S5-2-C1   | `grep -n "cannot represent" .agents/transports/codex.md`                                             | `git show HEAD:…` no match, exit 1                                                                                | `132:code page cannot represent, so when a bench unit must edit a line carrying a code point above`, exit 0             |
| S5-2-C2   | `grep -rn "Record the exact command and its failing count\|discards working-tree state" .agents/skills/orkestrel-prove-journey` | `git show HEAD:…/SKILL.md` matches `:312` and `:318`, exit 0                        | No match, exit 1                                                                                                       |
| S5-2-C3   | `grep -n "test:setup:browser" .agents/skills/orkestrel-prove-journey/references/layer.md`            | Before: no match in that file, exit 1 (the rule lived in `SKILL.md`)                                              | `:78` (`Add npm run test:setup:browser to the test chain`) precedes `:79-80` (`Run scaffold repair`), exit 0           |
| S5-2-C3   | `grep -c "tests/setupBrowser.test.ts" .agents/skills/orkestrel-prove-journey/SKILL.md`               | Before: `2`, the second home at `:183` and the Accept bullet                                                      | `2`, the pointer at `:190` and the Accept bullet at `:341`                                                             |
| S5-2-C4   | `node --experimental-strip-types tmp/probe/s5-terms.mts <owned files>`                               | Negative control `.orkestrel/campaign/s5-instruments/s5-control.md` (`You should simply utilize the parser via the CLI.`) reports `BANNED … should`, `… simply`, `… utilize`, `… via` | Owned files: zero `BANNED` lines; the judged hits are ruled in the following section |
| S5 C1     | `grep -n "declared size" src/core/templates.ts …/SKILL.md guides/scaffold.md ROADMAP.md`             | Carried from S5                                                                                                   | `src/core/templates.ts:1143` alone, exit 0                                                                             |
| S5 C2     | `grep -rn "CAPTURE=1\|costs a journey nothing\|share one title\|Two forms" …` and `grep -rn "not evidence until" …` | Carried from S5                                                                                   | No match, exit 1 for each                                                                                              |

`S5-2-C3`'s `grep -c` reading is `2` before and after by design: the control requires the pointer
line and the Accept bullet, and the file carried the second home plus the Accept bullet before. The
falsifying reading is the line content, given in the green column and in § The exact text landed.

## The sweep

Pattern set: `POLICY_BANNED_TERMS` and `POLICY_JUDGED_TERMS` from `configs/policy.ts`, applied by
`.orkestrel/campaign/s5-instruments/s5-terms.mts` to prose after `stripPolicyCode` removes fences and code spans.

Paths swept: `.agents/skills/orkestrel-prove-journey/SKILL.md`, `references/layer.md`,
`references/styles.md`, `references/captures.md`, `references/statechart.md`, `references/decide.md`,
`ROADMAP.md`, `.agents/transports/codex.md`.

Coverage: the instrument reads authored prose in the named files only. It cannot see a term inside a
code fence or a code span, which the substitution table exempts as data, and it reports on no file
the command line does not name. `guides/scaffold.md` is off-limits this round and was not swept.

`BANNED`: none.

`JUDGED`, each ruled:

| Site                                                                    | Term    | Ruling                                                                                       |
| ----------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `SKILL.md:74`, `:79`, `:84`, `:305`, `:330`                             | `once`  | Permitted: frequency ("Read the variant once", "Declare the provided types once"), never temporal `after` |
| `references/styles.md:71`, `references/captures.md:65`                  | `once`  | Permitted: each names the `SKILL.md` heading "Read the variant once"                         |
| `references/styles.md:169`, `references/captures.md:25`, `:52`, `:81`   | `once`  | Permitted: frequency                                                                         |
| `references/layer.md:220`                                               | `above` | Permitted: a quantity ("a cap above the cycle"), not a cross-reference                       |
| `.agents/transports/codex.md:132`, `:135`                               | `above` | Permitted: a numeric comparison against `0x7F`                                                |
| `references/captures.md:123`, `references/decide.md:70`                 | `new`   | Permitted: a value contrast ("part old and part new"), not a date claim                      |

A count check over the text this round added found none: the activation list is numbered because its
order is the finding, and no added sentence tallies a set. The added prose states no law owned by
`AGENTS.md` or a rule file; the pointer at `references/layer.md:68` and the pointer at
`references/styles.md:112` each cite their owner without paraphrasing it.

Non-ASCII round-trip: `git --no-pager diff --unified=0 | grep -P "^[+-].*[^\x00-\x7F]"` returns the
added pointer line carrying `→` and the rewritten lines carrying `§`. Every removed non-ASCII line is
replaced by a line carrying the same code point, read through `cat -A` as `M-bM-^FM-^R` for `→`.

## Gates

Host Windows 11, 2026-09-17. Scoped to the owned files and the projects the brief names.

| Gate                                                                         | Exit | Reading                                                        |
| ---------------------------------------------------------------------------- | ---: | -------------------------------------------------------------- |
| `./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --write <owned files>` |    0 | `Finished in 234ms on 1 files using 16 threads.` (final pass)  |
| `npm run format:check`                                                       |    0 | `All matched files use the correct format.` over 227 files     |
| `npm run test:policy`                                                        |    0 | `Tests 110 passed (110)`, matching the baseline reading        |
| `npm run test:guides`                                                        |    0 | `Tests 23 passed (23)`                                         |
| `node --experimental-strip-types tmp/probe/s5-terms.mts <owned files>`       |    0 | Zero `BANNED` lines                                            |

Observations, not criteria: `test:config`'s inventory case stays red until the Orchestrator's build,
and the whole `npm test` chain was not run here.

## Deviations

Three ancillary choices, each inside the owned files.

**Item 3, `SKILL.md:318`.** The brief names the restatement clause "Never reach for a command that
discards working-tree state". The bullet's other sentence, "Restore by rewriting what you changed",
states the same rule `.agents/orchestration.md` § Permission floor states as "A role that must undo
its own edit undoes exactly that edit", so the whole bullet was deleted rather than half of it. The
restore step survives in the section's own directive at `:305`, "Mutate each assertion class once,
read the red, restore, and read the green".

**Item 3, `references/captures.md:86-87`.** The brief allows a triggered instruction or a deletion.
The table under that heading needs an introducing sentence under `.claude/rules/writing.md`
§ Structure, so the passage was rewritten as the instruction "Write each of the following proofs into
the suite. The package asserts none of them." rather than deleted.

**Item 4, the cleanup route reset.** The brief allows scoping the ban or naming cleanup as the
exemption, stated once. The ban row is scoped: its `Never` cell reads "A navigation a journey step
performs by a router call", and the cleanup bullet in `references/layer.md` → Mounting and cleanup
is unchanged, because the cleanup act restores the fixture rather than driving a step. The corroboration bullet after the table still
excludes a router call unconditionally, so a router call reaches nothing a reading claims.

## Least certain

- **The scoped ban row.** A reader in `references/layer.md` → Mounting and cleanup must now infer
  that returning the route to its entry is not a journey step. Nothing gates that inference, and a reader who reads the ban
  table alone sees a narrower rule than the one the corroboration bullet keeps. Naming cleanup as an
  exemption beside `:326` would have been explicit at the cost of a second statement; the brief
  allows one or the other.
- **The `configs` group refusal quotation.** The message at `src/bin/CLI.ts:1149-1159` composes its
  remedy clauses from which scripts are already declared, so the fenced text is true of the state the
  activation describes — `test:setup:browser` undeclared — and not of every state. The surrounding
  sentence names that state.
- **The journey-axis reason.** "`test:journey` names a configuration rather than a project" is read
  from `src/core/compilers.ts:358-360`, where `test:setup:browser` carries `--project setup:browser`
  and `test:journey` carries `--config`. It holds while the emitted scripts keep those shapes, and
  nothing in this repository's suite pins the sentence.

## Diffstat

```text
 .agents/skills/orkestrel-prove-journey/SKILL.md    | 30 ++++++++++------------
 .../orkestrel-prove-journey/references/captures.md |  3 +--
 .../orkestrel-prove-journey/references/layer.md    | 29 ++++++++++++++++-----
 .../orkestrel-prove-journey/references/styles.md   |  5 ++--
 .agents/transports/codex.md                        | 11 ++++----
 ROADMAP.md                                         |  2 +-
 6 files changed, 47 insertions(+), 33 deletions(-)
```

## `git status --short`

```text
 M .agents/skills/orkestrel-prove-journey/SKILL.md
 M .agents/skills/orkestrel-prove-journey/references/captures.md
 M .agents/skills/orkestrel-prove-journey/references/layer.md
 M .agents/skills/orkestrel-prove-journey/references/styles.md
 M .agents/transports/codex.md
 M ROADMAP.md
?? .orkestrel/campaign/
```

`.orkestrel/campaign/` was untracked at entry and is untouched. `.orkestrel/campaign/s5-instruments/` keeps `s5-terms.mts` and
`s5-control.md`, reused from S5; this round added no instrument.

## The diff

```diff
diff --git a/.agents/skills/orkestrel-prove-journey/SKILL.md b/.agents/skills/orkestrel-prove-journey/SKILL.md
index a0b9d644..f2b3f0fa 100644
--- a/.agents/skills/orkestrel-prove-journey/SKILL.md
+++ b/.agents/skills/orkestrel-prove-journey/SKILL.md
@@ -90,7 +90,9 @@ start, and let it choose the capture destination, the matrix row, and the statec
   `scaffold repair`, then add `npm run test:journey` to the `test` script after `npm run test:app`.
   The repair defines `appJourney` in the root configuration, emits the `test:journey` script, and
   excludes the journey suite from the ordinary `app:browser` project. It does not rewrite the `test`
-  chain, so the chain entry is yours to add.
+  chain, so the chain entry is yours to add. Add that entry before the repair instead where you
+  prefer: `test:journey` names a configuration rather than a project, so neither order blocks the
+  repair.
 - Name each variant for the theme and the viewport it renders, such as `dark-390`. Never split the
   theme from the viewport; a split writes a filename naming a combination the run did not render.
 - Compose each variant's theme `apply` inside the test, from the variant's name. Vitest `provide`
@@ -112,10 +114,15 @@ start, and let it choose the capture destination, the matrix row, and the statec
 `scaffold audit` reports a manifest and a wrapper that disagree as one of the following questions.
 Settle the one it reports before trusting a green run.

-| The question `scaffold audit` reports … Add the configuration or remove the script that names it.` | Writing the wrapper and running `scaffold repair`, or removing the `test:journey` script |
-| … does not invoke npm run test:journey … | Adding `npm run test:journey` to the `test` script after `npm run test:app` |
+| The question `scaffold audit` reports … Add the configuration, or remove the script that names it and its invocation from the test chain.` | Writing the wrapper and running `scaffold repair`, or removing the `test:journey` script and its chain invocation |
+| … does not invoke npm run test:journey … | Adding `npm run test:journey` to the `test` script after `npm run test:app` |
+
+`scaffold audit` reports the invocation question only when no chain from `test` reaches
+`npm run test:journey` through literal `npm run` calls, so a chain reaching it through an
+intermediate script raises none. It reports the configuration question only for a `test:*` script
+whose text names `vitest`, so a script naming another runner's configuration raises none either.

 ```ts
 import type { JourneyVariant } from '@orkestrel/test'
@@ -180,14 +187,8 @@ const VARIANTS: readonly CaptureVariant[] = inject('variants').map((variant) =>
 - Place a helper you must write in the workspace's browser test setup module, name it for the act,
   and export it from there under `.claude/rules/tests.md`. Never declare a resolver inside a test
   file.
-- Prove that setup module with `tests/setupBrowser.test.ts`. Writing that file selects the browser
-  setup runtime, so run `scaffold repair` after writing it: the repair registers the browser-enabled
-  `setup:browser` project and emits the `test:setup:browser` script. A workspace born with the
-  browser setup runtime already carries that script in its `test` chain; in a workspace that
-  acquires the runtime later, `repair` leaves the chain as written, so add
-  `npm run test:setup:browser` to it yourself. `scaffold audit` reports `setup:browser` as a project
-  no chain from `test` reaches until you do. The Node `setup` project excludes that path, so a proof
-  of a browser helper placed anywhere else runs without a browser.
+- Prove that setup module with `tests/setupBrowser.test.ts`, and activate its `setup:browser`
+  project in the order [layer.md](references/layer.md) → Import, never implement states.
 - Drive every step through the published verbs, and never dispatch a constructed event
   ([layer.md](references/layer.md) → What it drives).
 - Re-verify every target against what the application renders after any markup change
@@ -309,13 +310,10 @@ Mutate each assertion class once, read the red, restore, and read the green.
 | Journey         | Omit the act the journey performs, keeping collection valid          | The destination assertion reddens |
 | Refusal         | Make the withheld control reachable, or present, without renaming it | The asserted voice changes        |

-- Record the exact command and its failing count before the change, restore the tree, and record the
-  same command green.
 - Omit the act rather than weakening the assertion. An assertion a missing act leaves green cannot
   tell arrival from never having left.
 - Change reachability rather than the name. A renamed control reddens on absence, which is a finding
   the refusal family already carries.
-- Restore by rewriting what you changed. Never reach for a command that discards working-tree state.

 ## Accept

diff --git a/.agents/skills/orkestrel-prove-journey/references/captures.md b/.agents/skills/orkestrel-prove-journey/references/captures.md
index 19a96a73..dd038aab 100644
--- a/.agents/skills/orkestrel-prove-journey/references/captures.md
+++ b/.agents/skills/orkestrel-prove-journey/references/captures.md
@@ -83,8 +83,7 @@ these.

 ## The proofs the suite owes

-The package times the registry and refuses a bad placement. It asserts nothing about either, so the
-suite carries these.
+Write each of the following proofs into the suite. The package asserts none of them.

 | Proof                | Runs           | Asserts                                                                            |
 | -------------------- | -------------- | ---------------------------------------------------------------------------------- |
diff --git a/.agents/skills/orkestrel-prove-journey/references/layer.md b/.agents/skills/orkestrel-prove-journey/references/layer.md
index 9ad29b03..11496269 100644
--- a/.agents/skills/orkestrel-prove-journey/references/layer.md
+++ b/.agents/skills/orkestrel-prove-journey/references/layer.md
@@ -64,14 +64,31 @@ table type from `@orkestrel/test`. Write one of your own only where those entrie
 the act.

 - Place a helper you write in the workspace's browser test setup module, export it from there, and
-  name it for the human act it performs. Prove that module with `tests/setupBrowser.test.ts`, and
-  run `scaffold repair` after writing that file so the browser-enabled `setup:browser` project
-  collects it.
-- Read the package's own exports before writing anything. `AGENTS.md` § Design laws bars a helper
-  that renames a published one, and bars a second implementation of one.
+  name it for the human act it performs.
+- Read the package's own exports before writing anything, under `AGENTS.md` § Design laws.
 - Code every journey against the vocabulary in this file, which is the published one. Diagnose a
   target that stops resolving here, and fix it in the application.

+Prove that setup module with `tests/setupBrowser.test.ts`. A workspace born with the browser setup
+runtime carries the `setup:browser` project, the `test:setup:browser` script, and that script's
+place in the `test` chain. A workspace that acquires the runtime later activates the project in this
+order:
+
+1. Write `tests/setupBrowser.test.ts`. Writing that file selects the browser setup runtime.
+2. Add `npm run test:setup:browser` to the `test` chain.
+3. Run `scaffold repair`, which registers the browser-enabled `setup:browser` project and appends
+   the `test:setup:browser` script.
+
+Run `scaffold repair` before the chain invocation and it refuses the `configs` group:
+
+```text
+The configs group is blocked because the manifest at <target> does not reach a Vitest project the planned configuration registers: setup:browser. No chain from test invokes it. test:setup:browser is not declared, so the script is missing as well as the gate: declare it and invoke it by name from the test chain. Exclude configs from --groups to write another group.
+```
+
+Add the invocation and run `scaffold repair` again. The Node `setup` project excludes
+`tests/setupBrowser.test.ts`, so a proof of a browser helper placed anywhere else runs without a
+browser.
+
 ## What it drives

 - Drive the real browser through the installed Vitest browser provider. The published verbs import
@@ -273,7 +290,7 @@ beside each.
 | A class-list read standing in for a settle                       | `waitForState`, `waitForAnimations`                                                              |
 | `document.elementFromPoint`                                      | `readHit`                                                                                        |
 | `element.focus()`                                                | `traverseAccessible`, `pressKeys`                                                                |
-| A navigation performed by a router call                          | The visible link or control that navigates, through `clickAccessible` or `clickAccessibleWithin` |
+| A navigation a journey step performs by a router call            | The visible link or control that navigates, through `clickAccessible` or `clickAccessibleWithin` |
 | A store or route state read standing in for a rendered assertion | `readPerception`, `readValue`, `readStates`, `waitForText`                                       |

 - Admit a selector only for a population that carries no role, declared in the workspace's browser
diff --git a/.agents/skills/orkestrel-prove-journey/references/styles.md b/.agents/skills/orkestrel-prove-journey/references/styles.md
index 188e1219..d6513daf 100644
--- a/.agents/skills/orkestrel-prove-journey/references/styles.md
+++ b/.agents/skills/orkestrel-prove-journey/references/styles.md
@@ -108,9 +108,8 @@ provided.

 ## The published controls

-Take each reading's control from the builder this layer publishes for it, so no workspace's control
-drifts into a fixture that cannot fail. `.claude/rules/quality.md` § Instruments owns the law that
-control satisfies.
+Take each reading's control from the builder this layer publishes for it.
+`.claude/rules/quality.md` § Instruments owns the law that control satisfies.

 | Reading         | Control                   | What it carries                                                                        |
 | --------------- | ------------------------- | -------------------------------------------------------------------------------------- |
diff --git a/.agents/transports/codex.md b/.agents/transports/codex.md
index 38bf456a..4a0e0a51 100644
--- a/.agents/transports/codex.md
+++ b/.agents/transports/codex.md
@@ -128,10 +128,11 @@ The Orchestrator verifies the finished exec with direct evidence — git status,
 scoped validation — and carries touched files, diffstat, and deviation state into
 integration and review.

-On a Windows host a text-encoding shell write replaces a code point above `0x7F`, so when a bench
-unit must edit a line carrying one, the brief tells it to make that edit through the exec's own
-patch tool, never through `Get-Content`, `Set-Content`, `Out-File`, or a `>` redirection, and to
-report every such line it touched. The Orchestrator's review sweep compares the set of code points
-above `0x7F` on each touched line before and after the edit, and flags a line that lost any of them.
+On a Windows host a shell write that decodes and re-encodes text can replace a code point the active
+code page cannot represent, so when a bench unit must edit a line carrying a code point above
+`0x7F`, the brief tells it to make that edit through the exec's own patch tool, never through
+`Get-Content`, `Set-Content`, `Out-File`, or a `>` redirection, and to report every such line it
+touched. The Orchestrator's review sweep compares the set of code points above `0x7F` on each
+touched line before and after the edit, and flags a line that lost any of them.

 ## Routing exclusion — defensive negative-test units

diff --git a/ROADMAP.md b/ROADMAP.md
index 5202f089..a944db72 100644
--- a/ROADMAP.md
+++ b/ROADMAP.md
@@ -36,5 +36,5 @@ keeps its number, so a commit message citing an item by number stays true.
-36. Reopen browser-engine selection when the condition the emitted `configs/browsers.ts` doc block states is met. That doc block is the condition's one home. This item closes when `configs/browsers.ts` adopts an engine-selection design, or when that doc block no longer carries the limit.
+36. Reopen browser-engine selection when the condition the emitted `configs/browsers.ts` doc block states is met. That doc block is the condition's one home, authored here in `src/core/templates.ts` as the `configs/browsers.ts` template. This item closes when `configs/browsers.ts` adopts an engine-selection design, or when that doc block no longer carries the limit.
 37. Author `aria-expanded` on the roughnotes menu trigger. The trigger announces no state, so its disclosure cannot be settled through `waitForState` and every journey touching it falls back to reading the framework's own classes.
```

The `SKILL.md` table hunk is abridged at the cells' long code spans; the landed rows are quoted in
full in § The exact text landed. Every other hunk is the verbatim `git --no-pager diff` output.
