# Unit S3 — the journey skill's instructions, the plan of record, and one transport rule

## Role and engine

`opus` on Opus 5, a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`,
the sole writer in the `C:/Users/mikes/WebstormProjects/scaffold` checkout. You open this brief
yourself; every later section is written for you.

## Objective

Rewrite `.agents/skills/orkestrel-prove-journey` so it teaches the journey layer `@orkestrel/test`
now publishes and the workspace shape scaffold now generates, carries every lesson the campaign's
verdict assigned to it, and gives the vendored API sweep its population; reconcile `ROADMAP.md`
against what landed; and land the one process rule the S2 audit surfaced in the file that owns it.

## Context

**Evidence.** Read, in order:

1. `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/design-verdict.md` — rulings
   D3–D14 (what the test package publishes and why), D17–D19 (what scaffold generates), and
   D22–D27 (the skill's instructions). It is the design authority.
2. `.orkestrel/campaign/t1-report.md`, `t2-report.md`, `t3-report.md` — the test package's final
   surface, with three rule-driven deviations you must teach as landed: the interface is
   `WebStorageInterface`, the control builders live in `helpers.ts` (the published names are
   unchanged: `buildContrast`, `buildEscapes`, `buildCensus`), and `buildDenial` and
   `buildRefusal` exist.
3. The installed package itself: `node_modules/@orkestrel/test/dist/src/core/index.d.ts` and
   `dist/src/browser/index.d.ts` carry the packed 0.0.17 surface (installed from a tarball; the
   registry still serves 0.0.16). Every symbol you teach must resolve there — the vendored sweep
   (unit S2) checks fenced imports against these files. The guide mirror `guides/test.md` in this
   checkout is still the 0.0.16 copy and is off-limits; read the test checkout's own
   `C:/Users/mikes/WebstormProjects/test/guides/test.md` for the prose and the Limits rulings.
4. `.orkestrel/campaign/s1-report-5.md` and the emitted templates in `src/core/templates.ts` —
   what a generated browser workspace now carries:
   - the root `vite.config.ts` exports `appJourney(variant, variants)`, which composes `appBrowser`,
     includes `tests/app/browser/integration.test.ts` alone, names the project `journey:<name>`,
     sets the viewport from the variant, and provides `variant` (the name), `variants` (the list),
     and `capture` (a boolean the root reads from `process.env.CAPTURE === '1'`);
   - the ordinary `app:browser` project excludes the journey suite when the axis is on;
   - the birth-owned `configs/app/vite.journey.config.ts` wrapper declares
     `VARIANTS: readonly JourneyVariant[]` (seeded `desktop` 1280 × 800 and `compact` 390 × 844,
     no theme — the adopter renames and extends it, and applies a theme through the interface) and
     registers one project per variant; its presence is the journey axis;
   - `test:journey` runs that wrapper and joins the `test` chain;
   - `tests/setupBrowser.test.ts`, when present, runs in the browser-enabled `setup:browser`
     project (`test:setup:browser`), and the Node `setup` project excludes it;
   - the emitted `configs/browsers.ts` states the Chromium-only limit and its reopening condition.
5. `.orkestrel/campaign/s2-audit-verdict.md` — finding 7 (a bench unit's file round-trip replaced
   U+96EA with `?`), which this unit lands as a rule in `.agents/transports/codex.md`.
6. `.orkestrel/campaign/retained/field-pass-journey-skill.md` and `debrief-verdict.md` — the
   product findings and the field-pass method; `journey-readiness-verdict.md` — the readiness
   lenses.
7. The skill as it stands: `.agents/skills/orkestrel-prove-journey/SKILL.md` and every file under
   `references/`, and `.agents/skills/orkestrel-polish-surface/SKILL.md` for the portfolio handoff
   it must keep naming.
8. `ROADMAP.md` — the plan of record you reconcile.

Measured directly by the Orchestrator:

- `grep -rn "from '@orkestrel/" .agents/skills` matches nothing today: no skill carries an import
  fence, so the vendored sweep's population is empty until you add one.
- `tests/setupPolicy.ts` (`inspectSkillImports`) reads every fenced
  `import … from '@orkestrel/<package>[/<environment>]'` in `SKILL.md` and each named reference,
  value and type bindings, resolves the installed declaration entry, refuses a binding it does not
  export, refuses a package outside `BASE_DEV_DEPENDENCIES`, and refuses a fence it cannot parse
  when that fence mentions `@orkestrel/`. Prose and table cells are outside it, which is why every
  symbol a reference teaches goes in an import fence there (`.claude/rules/documentation.md`
  § Workflow skills states the obligation; do not restate it in the skill).
- `.agents/skills/orkestrel-debrief/references/field-testing.md` exists; ROADMAP item 17 names it
  under the journey skill's `references/`, which does not exist.
- ROADMAP item 32 (`*.tgz` in the vendored `gitignore`) landed in 0.0.73; items 21 (`pressKeys`)
  landed in 0.0.72 and the verb is now a real export (D6).
- `@orkestrel/probe` 0.0.16 still pins `pool: "threads"` in its runtime stage; `guides/probe.md`
  names no browser.

**Law.** `AGENTS.md` § Writing and § Instruction files; `.claude/rules/writing.md`;
`.claude/rules/documentation.md` § Workflow skills (frontmatter, `description` with a `Use …`
sentence, one-level references, no model routing, the API sweep); `.claude/rules/tests.md`;
`.claude/rules/quality.md` § Instruments. Skill: none. Guide: none.

**Installed primitives.** `@orkestrel/test` (the packed 0.0.17 content, per the evidence).

**Host.** Windows 11; Bash; write source through your editor tools so no non-ASCII code point
round-trips through cp1252; multi-line programs go to a file under `tmp/probe/`.

**Measurements.** Baseline: the checkpoint the dispatch message names, carrying units S2 and S1
with the full gate chain green in the Orchestrator's reading.

**Control identifiers.** `S3-C1` through `S3-C4`.

**Standing conditions.** `guides/test.md` is the 0.0.16 mirror and stays so until the Orchestrator
refreshes it after the test package publishes; a fence you write resolves against
`node_modules`, not against the mirror. `host.json` reads stale after a vendored edit until the
Orchestrator's build; the inventory case in `test:config` reddens for that reason alone.

## Unknowns

- **Whether any instruction in the skill contradicts a Limits ruling in the test package's
  guide.** Read `C:/Users/mikes/WebstormProjects/test/guides/test.md` § Limits and § Bounds a
  shipped helper carries before writing an instruction about a helper; report any place the
  design verdict and the guide disagree rather than choosing.

## Scope

**Owned.** `.agents/skills/orkestrel-prove-journey/SKILL.md`,
`.agents/skills/orkestrel-prove-journey/references/*.md` (edit, add, or delete references;
`SKILL.md` names every one that exists), `.agents/skills/orkestrel-prove-journey/agents/openai.yaml`
(only if the description moves), `.claude/skills/orkestrel-prove-journey/SKILL.md` (the bridge:
its `name` and `description` equal the canonical skill's verbatim and it names the canonical path
and nothing else), `ROADMAP.md`, `.agents/transports/codex.md` (one rule).

**Shared (report-only).** None.

**Off-limits.** Everything else — `guides/**`, `src/**`, `tests/**`, `.claude/rules/**`,
`.claude/agents/**`, `.codex/**`, `.cursor/**`, every other skill, `host.json`, `package.json`.

**What asserts the state this change ends.** `tests/policy.test.ts` (the skill family sweep:
frontmatter, references, template TODOs, the API sweep over your fences, the bridge parity, the
banned-term prose sweep) and `npm run format:check` over Markdown.

**Tools and limits.** All of your tools. No commit, push, install, or `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`. `npm run format` before the checks is
permitted.

## Execution

A native subagent, or a bench engine reading this brief inside its own CLI: perform the assignment
directly and spawn nothing.

## The instructions to land

Write each as a directive with its trigger, in the skill's existing voice; where a lesson names a
consumer site, do not name the consumer — name the door.

1. **`SKILL.md`.**
   - The journey laws bind every declared family (D22): a matrix reading and a transport assertion
     reach their surface through the same verbs; a family that navigates with the application's
     own router proves the router. The transport family constructs the store it hands the
     application; that is the fixture, not the drive. An entity or storage read is corroboration
     beside a rendered assertion, never in its place.
   - The matrix population rule: role and name first; a selector is admitted only where the
     population carries no role, declared in the setup module with the reason beside it; a
     painted population reads `element.checkVisibility()` and a non-zero box (D14).
   - Read the variant once, from the generated wrapper: `inject('variant')`, `inject('variants')`,
     `inject('capture')`; compose each variant's theme `apply` in the test from its name; name a
     variant for the theme and the viewport it renders; `CAPTURE=1 npm run test:journey` writes
     the frames.
   - `tests/setupBrowser.test.ts` proves the browser setup module in `setup:browser`.
   - The transport family uses `createStorage` (`quota`, `reads`, `writes`, `permit`); a stalled
     read belongs to the application's own asynchronous store contract, never to `Storage`.
   - Commit values through `pressKeys` (Enter), Tab, or a named button; every key sequence goes
     through `pressKeys`, never `userEvent.keyboard`.
   - The intents every surface owes (D25): arrival at the entry, an unknown route, a query
     matching nothing, the document title per screen, a render failure — each conditioned on the
     surface having the state, with the product guide supplying the expected outcome; the skill
     invents no copy.
   - The mutations (D23): for a journey assertion, omit the act and confirm the destination
     assertion reddens; for a refusal assertion, make the withheld control reachable (or present)
     without renaming it and confirm the voice changes; record the command and count red, restore,
     record green.
   - The Accept list: the gate renders one engine; a claim about a second engine is unproven
     until a reading records it (D19).
   - Keep the retained-verdict clause and the `orkestrel-polish-surface` handoff.
2. **`references/layer.md`.** Open with an import fence naming every verb, reader, wait, and
   builder the reference teaches, from `@orkestrel/test/browser` and `@orkestrel/test`. Rewrite
   the verb tables for `pressKeys`, `waitForText` (with `absent` for the replacement law and a
   region reader for arrival), `waitForState`, `waitForAnimations`, `readRefusal`; extend the
   voices table with every new voice (read them from the test checkout's guide § Voices); update
   the element-taking population; add the named bans with their published replacements: an
   element resolved by id or class; a class-list read standing in for a settle (`waitForState`,
   `waitForAnimations`); `document.elementFromPoint` (`readHit`); `element.focus()`
   (`traverseAccessible`, `pressKeys`); a store or router call (`readPerception`, `readValue`,
   `readStates`, `waitForText`). State that `clickDisclosure` drives a native `<summary>` alone and
   an ARIA disclosure is a button settled with `waitForState` on the state it announces — and that
   a surface whose control announces no state is a surface finding.
3. **`references/captures.md`.** `JourneyVariant` and `CaptureVariant`; the wrapper declares the
   list, the test composes `apply`; `capture` arrives through `inject`. An import fence.
4. **`references/styles.md`.** `readCensus` (population reported, empty walk refused),
   `buildContrast(bar)`, `buildEscapes(permitted)`, `buildCensus()` as the controls, detached and
   appended to the surface root the reading walks; focus through `traverseAccessible` or
   `pressKeys`; the per-variant run reading `inject('variants')`; the engine limit. An import
   fence.
5. **`references/statechart.md`.** Rewrite for `createHarness` (D3), the observable statuses
   (D4, including that an exceptional exit writes `failed` and rejects), the worked table as the
   test package's guide now carries it (the native `<details>` with a `Dismiss` button, four rows,
   shared phase functions, `clickDisclosure` and `clickAccessible`, `readStates`), `buildRefusal`
   naming a refused build, the gate reading the object's tally and the markup; "Mount the harness"
   replaces "Build the harness a person watches"; a deep-linked page is optional product the
   workspace ships on its own account and the skill names only the attribute contract it must
   honour. An import fence with `StateTransition`, `StateScenario`, `executeScenario`,
   `executeScenarios`, `buildRefusal`, `STATECHART_ATTRIBUTES`, `STATECHART_STATUSES`,
   `StatechartStatus`, `createHarness`.
6. **`references/decide.md`.** Drop the `@orkestrel/probe` pin: confirm the limit against the
   installed version (read the runtime stage's pool pin in the installed server entry and the
   probe guide) and record the version read (D24). Route a person watching a widget move to the
   harness run's captures and its artifact; name a deep link only where the workspace ships a page.
7. **`ROADMAP.md`.** Strike items 1, 10, 11, 12, 13, 16, 18, 19, 20, 21, 30, 31, and 32, each
   with one clause naming what closed it; restate item 17 against
   `.agents/skills/orkestrel-debrief/references/field-testing.md`; keep 34 until the consumer
   closes it; keep 25, 26, and 33; add: `@orkestrel/guide`'s `extractFenceImports` drops a binding
   preceded by a comment inside the braces (measured 2026-09-17; the scaffold sweep parses fences
   with Oxc for that reason); the browser-matrix reopening condition lives in the emitted
   `configs/browsers.ts` and the skill's Accept list; the roughnotes menu trigger authors no
   `aria-expanded`, so its disclosure cannot be settled through the announced state until it does.
   Renumber nothing that a commit message could cite; append.
8. **`.agents/transports/codex.md`** § Sol route gains one rule: on a Windows host the exec's file
   writes can round-trip through cp1252, so a unit never rewrites a line carrying a non-ASCII code
   point through its shell, edits such a file only through the exec's own patch tool, and reports
   any line it had to touch; the Orchestrator's review evidence includes a sweep of the diff for a
   removed line carrying a code point above 0x7F whose replacement lacks it. One home, no history.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/s3-report.md` and return its path as your
final message: each instruction with the file and section that carries it; every symbol each
fence names, and the entry it resolved against; the ROADMAP rows struck, restated, kept, and
added; the transport rule's exact text; every gate command with exit code and totals; any place
the verdict and the test guide disagreed; the claims you flag as least certain. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most —
where an instruction the verdict requires names a symbol the installed entry does not export, or
where the sweep refuses a fence you cannot make it accept without an off-limits file. Decide,
record, and carry on on: section order, wording, which reference carries a sentence, whether a
reference is split or merged, the description's wording.

## Acceptance criteria

1. `npm run format:check` exits 0 (run `npm run format` first).
2. `npm run test:policy` exits 0: the skill family sweep passes with your fences in place
   (`S3-C1`: every fenced import resolves against the installed entries; the sweep reports nothing
   for the skill), the bridge parity holds, the banned-term sweep is clean, and no template TODO
   remains.
3. `S3-C2`: plant, in a scratch copy under `tmp/probe/`, a fence importing `pressKeys2` from
   `@orkestrel/test/browser` and run `inspectSkillImports` over it through a probe test in the
   `probe` project — one violation naming the binding; then delete the probe. This proves the
   sweep reads the population you gave it.
4. `S3-C3`: `grep -rn "userEvent.keyboard" .agents/skills/orkestrel-prove-journey` matches nothing;
   `grep -rn "0.0.11" .agents/skills/orkestrel-prove-journey` matches nothing.
5. `S3-C4`: `ROADMAP.md` names each struck item's closing clause, and `grep -n "field-testing"
   ROADMAP.md` resolves to the debrief skill's path.
6. `npm run lint:check` exits 0.

**Observations, not criteria.** `npm run test:config` (the inventory case), the whole `npm test`
chain.

## Review evidence

The Orchestrator takes `git diff` and `git status --short` after you return.
