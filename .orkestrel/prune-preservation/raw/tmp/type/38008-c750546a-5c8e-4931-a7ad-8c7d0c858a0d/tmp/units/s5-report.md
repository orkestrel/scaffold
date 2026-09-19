# Unit S5 report — the skill, the plan of record, and the transport rule

Every item landed. One item's prescription was corrected against an executed pin in this
repository's own suite; § Deviations records it.

## Item → file → section

| Item | File | Section |
| --- | --- | --- |
| 1 (engine condition, claims 5 and 19) | `.agents/skills/orkestrel-prove-journey/SKILL.md` | Accept, closing paragraph (`:348-351`) |
| 1 | `guides/scaffold.md` | Blueprint, the journey axis paragraph (`:983-984`) |
| 1 | `ROADMAP.md` | Row 36 (`:39`) |
| 2 (voices table, claim 12) | `references/layer.md` | The resolver → The failure voices (`:138-140`, storage rows `:161-162`) |
| 3 (ban row, claim 16) | `references/layer.md` | The named bans (`:267-278`, bullet `:283-285`) |
| 4 (Accept bullet, claim 17) | `SKILL.md` | Accept (`:332-334`) |
| 5 (title sentence, claim 18) | `SKILL.md` | Derive journeys from intents → The intents every surface owes (`:241-242`) |
| 6 (fresh workspace, claim 23) | `SKILL.md` | Read the variant once (`:76-80`, `:89-93`, the `scaffold audit` table `:112-118`) |
| 6 | `SKILL.md` | Import the journey layer (`:183-190`); Accept (`:343-344`) |
| 6 | `references/layer.md` | Import, never implement (`:66-69`) |
| 7 (cp1252 rule, claim 20) | `.agents/transports/codex.md` | Sol route (`:131-135`) |
| 8 (instruction-file sweep, claim 22) | `references/layer.md` | The vocabulary (`:8-10`); Import, never implement (`:70-71`); The named bans (`:267-268`) |
| 8 | `references/styles.md` | The published controls (`:111-113`) |
| 8 | `SKILL.md` | Mutate each assertion class (`:304-305`, `:312-313`) |
| 8 | `references/statechart.md` | The worked table (`:47-50`, `:65-66`, `:161-162`) |
| 9 (capture flag, F2) | `SKILL.md` | Read the variant once (`:101-103`) |
| 9 | `references/captures.md` | The hook (`:31-33`) |
| 10 (count, F3) | `references/styles.md` | The published controls (`:124-126`) |
| 11 (ROADMAP rows) | `ROADMAP.md` | Row 36 only; no row added, none struck |

## The exact text landed

### Item 1

`SKILL.md` Accept, closing paragraph:

> State the engine bound with the verdict. The gate renders one engine, so a claim about a second
> engine is unproven until a reading on that engine records it. The emitted `configs/browsers.ts` doc
> block is the home of that limit and of the condition that reopens it. Cite that doc block, and copy
> neither into a verdict.

`guides/scaffold.md:983-984`:

> The generated browser resolver and gate cover Chromium alone. The emitted `configs/browsers.ts` doc
> block states the condition that reopens engine selection, and is that condition's one home.

`ROADMAP.md:39`:

> 36. Reopen browser-engine selection when the condition the emitted `configs/browsers.ts` doc block states is met. That doc block is the condition's one home. This item closes when `configs/browsers.ts` adopts an engine-selection design, or when that doc block no longer carries the limit.

### Item 5

`SKILL.md:241-242`:

> - Assert the title from `document.title` per screen, against the title the product guide names for
>   that screen. Report a screen the guide gives no title as a product finding.

### Item 7

`.agents/transports/codex.md:131-135`:

> On a Windows host a text-encoding shell write replaces a code point above `0x7F`, so when a bench
> unit must edit a line carrying one, the brief tells it to make that edit through the exec's own
> patch tool, never through `Get-Content`, `Set-Content`, `Out-File`, or a `>` redirection, and to
> report every such line it touched. The Orchestrator's review sweep compares the set of code points
> above `0x7F` on each touched line before and after the edit, and flags a line that lost any of them.

## Controls and their readings

| Control | Command | Red reading | Green reading |
| --- | --- | --- | --- |
| S5-C1 | `grep -n "declared size" src/core/templates.ts .agents/skills/orkestrel-prove-journey/SKILL.md guides/scaffold.md ROADMAP.md` | Before: `templates.ts:1143`, `SKILL.md:330`, `guides/scaffold.md:985`, and `ROADMAP.md:39` | After: `src/core/templates.ts:1143` alone, exit 0 |
| S5-C2 | `grep -rn "CAPTURE=1\|costs a journey nothing\|share one title\|Two forms" .agents/skills/orkestrel-prove-journey ROADMAP.md .agents/transports/codex.md` | Before: `SKILL.md:95` (`CAPTURE=1`), `SKILL.md:222` (`share one title`), exit 0 | After: no match, exit 1 |
| S5-C2 | `grep -rn "not evidence until" .agents/skills/orkestrel-prove-journey` | Before: `styles.md:111`, `SKILL.md:285`, exit 0 | After: no match, exit 1 |
| S5-C4 instrument | `node --experimental-strip-types tmp/probe/s5-terms.mts <owned files>` | Negative control `tmp/probe/s5-control.md` (`You should simply utilize the parser via the CLI.`) reports `BANNED … should`, `… simply`, `… utilize`, `… via` | Owned files: zero `BANNED` lines; judged hits ruled in the following section |
| Repair-scope probe | `grep -n "names direct project scripts and lifecycle\|replaces a recognized predecessor and appends\|\"test\": \"vitest run\"" tests/src/core/compilers.test.ts`, then `sed -n '155,168p;216,228p' tests/src/core/compilers.test.ts` | — | The executed pins read `blueprintToWritableScripts` naming no `test` entry (`:160-168`) and `replaceManifestScripts` keeping `"test": "vitest run"` (`:228`) |

`costs a journey nothing` never matched at baseline: the sentence at `layer.md:264` wrapped across
a line break between `a` and `journey`, so the single-line pattern could not reach it. The sentence was
deleted on its own reading, not on that pattern's.

## The sweep

Pattern set: `POLICY_BANNED_TERMS` and `POLICY_JUDGED_TERMS` from `configs/policy.ts`, applied by
`tmp/probe/s5-terms.mts` (copied from `.orkestrel/campaign/s3-instruments/s3-terms.mts`) to prose
after `stripPolicyCode` removes fences and code spans.

Paths swept: `.agents/skills/orkestrel-prove-journey/SKILL.md`, `references/layer.md`,
`references/styles.md`, `references/captures.md`, `references/statechart.md`, `references/decide.md`,
`ROADMAP.md`, `.agents/transports/codex.md`, `guides/scaffold.md`.

Coverage: the instrument reads authored prose in the named files only. It cannot see a term inside a
code fence or a code span, which the substitution table exempts as data anyway, and it reports on no
file the command line does not name.

`BANNED`: none.

`JUDGED`, each ruled:

| Site | Term | Ruling |
| --- | --- | --- |
| `SKILL.md:74`, `:79`, `:84`, `:304`, `:332` | `once` | Permitted: frequency ("read the variant once", "declare the types once"), never temporal `after` |
| `references/styles.md:71`, `references/captures.md:65` | `once` | Permitted: each names the `SKILL.md` heading "Read the variant once" |
| `references/styles.md:170`, `references/captures.md:25`, `:52`, `:81` | `once` | Permitted: frequency |
| `references/layer.md:203` | `above` | Permitted: a quantity ("a cap above the cycle"), not a cross-reference |
| `.agents/transports/codex.md:131`, `:135` | `above` | Permitted: a numeric comparison against `0x7F` |
| `references/captures.md:124`, `references/decide.md:70` | `new` | Permitted: a value contrast ("part old and part new"), not a date claim |
| `guides/scaffold.md:167`, `:900`, `:1595`, `:1628`, `:1672` | `once` | Permitted: frequency. Outside the owned paragraph and untouched |
| `guides/scaffold.md:240` | `above` | Permitted: a numeric comparison ("at or above the supported minimum"). Untouched |
| `guides/scaffold.md:1422` | `below` | Permitted: a numeric comparison ("a floor below the newest release"). Untouched |
| `guides/scaffold.md:368`, `:1368`, `:1435`, `:1823` | `latest` | Permitted: the npm dist-tag and the packument field, which are data. Untouched |
| `guides/scaffold.md:1353` | `new` | Permitted: "a new dependency version" names a value, not a date. Untouched |

A count sweep over the owned files for `both`, `two`, `three`, `four`, `five`, `second`, `third` and
for bare numerals returned only permitted forms: `second` used as an ordinal naming an additional
instance, `both` where the sentence names its members (`layer.md:221`, `statechart.md:232`,
`styles.md:167`, `ROADMAP.md:25`, `codex.md:118`), the sample values inside the `statechart.md`
harness fence, and `about two minutes` in `codex.md:36` as a duration. The counts removed were
`styles.md`'s "the two foregrounds" (item 10) and `statechart.md`'s "two mounted disclosures"
(`:65`, `:161`).

A restated-law sweep over `AGENTS.md` and `.claude/rules` references in the skill left every
remaining mention as a pointer. Two restatements were deleted and replaced with pointers
(`styles.md:111`, `SKILL.md:304`), one law restatement was cut outright (`SKILL.md:313`, "A test that
never ran red binds to nothing"), and `layer.md:70` cites `AGENTS.md` § Design laws instead of
paraphrasing it.

## Gates

Host Windows 11, 2026-09-17. Scoped to the owned files and the projects the brief names.

| Gate | Exit | Reading |
| --- | ---: | --- |
| `./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --write <owned files>` | 0 | `Finished in 359ms on 1 files using 16 threads.` (final pass) |
| `npm run format:check` | 0 | `All matched files use the correct format.` over 227 files |
| `npm run test:policy` | 0 | `Tests 110 passed (110)`, matching the baseline reading |
| `npm run test:guides` | 0 | `Tests 23 passed (23)` |
| `node --experimental-strip-types tmp/probe/s5-terms.mts <owned files>` | 0 | zero `BANNED` lines |
| `git --no-pager diff --unified=0 \| grep -P "[^\x00-\x7F]"` | — | Every added line carrying `§`, `→`, or `—` keeps it; the one removed non-ASCII line (`statechart.md:50`) is replaced by a line carrying the same `—` |

Observations, not criteria: `test:config`'s inventory case stays red until the Orchestrator's build,
and the whole `npm test` chain was not run here.

## Deviations

One departure from the brief's prescribed wording, settled inside the owned files and recorded here.

**Item 6's `setup:browser` sentence.** The brief and the objective lane both prescribe "`scaffold
repair` … registers `setup:browser`, emits `test:setup:browser`, and joins it to the `test` chain."
The join does not happen on a repair of a workspace that acquires the runtime later.
`blueprintToWritableScripts` (`src/core/compilers.ts:458-464`) writes only names matching `test:`
other than `test:src` and `test:app`, so `test` is never rewritten. The executed pin at
`tests/src/core/compilers.test.ts:155-168` (`names direct project scripts and lifecycle scripts
without taking gate chains`) asserts that list without `test`, and the pin at `:216-228`
(`replaces a recognized predecessor and appends an absent script, moving no other byte`) asserts
`"test": "vitest run"` survives `replaceManifestScripts` byte-identical. `SKILL.md:183-190` therefore states the true split: a
workspace born with the browser setup runtime carries the script in its chain, and a workspace that
acquires the runtime later adds `npm run test:setup:browser` itself, with `scaffold audit` reporting
`setup:browser` as a project no chain from `test` reaches until it does. The same split is stated for
the journey axis at `SKILL.md:89-93`.

**Placement choice.** The `scaffold audit` questions landed as a table after the bullets of
`SKILL.md` → Read the variant once rather than as a bullet. The formatter cannot break a code span,
so quoting either message inside a bullet pushed unindented continuation lines to column 0.

**`captures.md` and `CAPTURE=1`.** `references/captures.md` carried no `CAPTURE=1` command line at
the baseline; only `SKILL.md:95` did. The capture reference's own sentence names the variable set
to `1` in the shell that runs the axis, and names no shell syntax.

No item needed an edit outside the owned files. `s4-report-2.md` is present and its generator account
matches the brief's evidence. The policy sweep reports no violation in any file.

## Least certain

- **The journey-question wording.** Each quoted message is transcribed from `src/bin/CLI.ts:1071`
  and `:1133`, where each is a template literal. The skill writes `<target>`
  for the interpolated target path, and the configuration question also interpolates a joined list
  of offending `<script> --config <path>` pairs, of which the skill quotes the journey instance. A
  reader comparing the skill against a real `audit` line sees the real path in each hole, and sees
  a longer list wherever more than the journey script names a missing configuration.
- **The `setup:browser` chain question.** `SKILL.md:183-190` describes the question by what it
  reports rather than quoting it, because that message (`CLI.ts:1156`) composes its remedy clauses
  from which scripts are already declared, so no single quotation is true of every case.
- **The engine pointer's reach.** `ROADMAP.md:39` and `guides/scaffold.md:983` each assert the doc
  block is the condition's one home. Nothing gates that assertion: a further copy of the condition
  would falsify each sentence without reddening a test. The `grep -n "declared size"` reading is the
  only instrument that catches it, and it matches one spelling of the condition.

## Diffstat

```text
 .agents/skills/orkestrel-prove-journey/SKILL.md    | 67 +++++++++------
 .../orkestrel-prove-journey/references/captures.md |  4 +-
 .../orkestrel-prove-journey/references/layer.md    | 95 ++++++++++++----------
 .../references/statechart.md                       | 16 ++--
 .../orkestrel-prove-journey/references/styles.md   | 10 +--
 .agents/transports/codex.md                        | 11 ++-
 ROADMAP.md                                         |  2 +-
 guides/scaffold.md                                 |  5 +-
 8 files changed, 117 insertions(+), 93 deletions(-)
```

`references/layer.md`'s line count is dominated by the formatter re-padding the failure-voices table
and the named-bans table after their widest cell changed.

## `git status --short`

```text
 M .agents/skills/orkestrel-prove-journey/SKILL.md
 M .agents/skills/orkestrel-prove-journey/references/captures.md
 M .agents/skills/orkestrel-prove-journey/references/layer.md
 M .agents/skills/orkestrel-prove-journey/references/statechart.md
 M .agents/skills/orkestrel-prove-journey/references/styles.md
 M .agents/transports/codex.md
 M ROADMAP.md
 M guides/scaffold.md
?? .orkestrel/campaign/
```

`.claude/skills/orkestrel-prove-journey/SKILL.md` is unchanged: the canonical `description` did not
move. `references/decide.md` is unchanged: its sweep was clean.

Instruments left under `tmp/probe/`: `s5-terms.mts` (the copied sweep), `s5-control.md` (its negative
control), and `s5-repair-scripts.mts` (an import probe that did not run — `src` imports resolve
through the TypeScript toolchain rather than through `node --experimental-strip-types`, so the
repair-scope question was settled from the suite's own executed pins instead).
