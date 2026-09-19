# Scaffold units S1, S2, and S3 — audit claims

## Subject

The chain, in the scaffold checkout `C:/Users/mikes/WebstormProjects/scaffold`, branch `main`:

| Round | Writer                        | Baseline   | Checkpoint | What it claimed to close                                                                                                                                                             |
| ----- | ----------------------------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| S2-1  | `sol` (`gpt-6-astra`)         | `4c4edd93` | `a8bb50d8` | The skill API sweep, partial (stopped on the vendored `typescript` import ban)                                                                                                       |
| S2-3  | `sol`                         | `a8bb50d8` | `beb88af9` | The sweep reads fenced imports with the Oxc parser (`parseSync` from `vite`); D20 and D21 (ROADMAP 16 and 30)                                                                        |
| S2-4  | `opus`                        | `beb88af9` | `28d2cf3f` | The S2 audit's findings: parse-error fence refused, self-package resolution, cycle re-export, distinct messages, a positive control that drives a fence, the refusal inventory, the U+96EA fixture, one home for the fence obligation |
| S2-5  | `opus`                        | `28d2cf3f` | `3fe781c9` | The vendored-import proof reads specifiers from the parsed module (`readSpecifiers`), closing the regex false positive                                                                |
| S1-3  | `sol`                         | `3fe781c9` | `f2d92812` | The blueprint's setup runtimes and journey axis, partial                                                                                                                             |
| S1-4  | `sol`                         | `f2d92812` | `54557347` | The journey fan-out and the setup runtimes, partial                                                                                                                                  |
| S1-5  | `sol`                         | `54557347` | `a0440d3c` | D17, D18, D19 (ROADMAP 1): `appJourney`, the birth-owned journey wrapper, `setup:browser`, the engine limit; the rule and guide rows                                                    |
| S3    | `opus`                        | `a0440d3c` | `8eb16e4e` | D22–D27 in the journey skill, `ROADMAP.md` reconciled, the cp1252 rule in `.agents/transports/codex.md`                                                                            |
| re-pin | Orchestrator                 | `8eb16e4e` | `abfe460e` | `@orkestrel/test` ^0.0.17 from the registry, the guide mirror, the catalog table, the manifest fixtures, `host.json` regenerated                                                       |
| S3-2  | `builder` (Sonnet)            | `abfe460e` | `0d03ec79` | `buildRefusal` fenced and named in `references/statechart.md`, the carrier S3 reported                                                                                          |

Orchestrator-owned integration edits inside the chain, each briefed here as a claim: the
`tests/setup.test.ts:48` expectation migration at `a0440d3c`; the `@orkestrel/test` re-pin to
`^0.0.17` from the registry with the guide mirror, the catalog table, the three manifest fixtures
under `tests/src/core/fixtures/`, and the planned-range literal in `tests/src/bin/CLI.test.ts`, at
`abfe460e`.

The tip under audit is `0d03ec79`. The diff against `4c4edd93` is at
`tmp/audit/s-audit-diff.patch`; the S3 and S3-2 diff alone is at `tmp/audit/s3-diff.patch`.

## What the round decides

Whether `@orkestrel/scaffold` 0.0.74 ships with this tree: the generator that every fleet workspace
is born from and repaired against, the vendored `tests/setupPolicy.ts` and `tests/policy.test.ts`
that every target's `test:policy` runs, and the journey skill that every executor in the fleet
follows when it proves a browser application. A defect in the generator reaches every workspace at
birth; a defect in the skill teaches every executor the same wrong step.

## Already established — verified by the Orchestrator directly, not taken from a writer

- The S2 audit round (`.orkestrel/campaign/s2-audit-verdict.md`) ruled on claims 1–11 of
  `.orkestrel/campaign/s2-audit-claims.md`. Its carried findings closed in S2-4 with a mutation
  probe per adopted prescription and the Orchestrator's reproduction probe turning green
  (`.orkestrel/campaign/s2-audit-reproduction.log.txt`). Do not re-run those claims; attack S2-4's
  and S2-5's own rulings, which are named as claims here.
- The test package's T audit closed in T3 and an independent verifier read every gate green at
  `562efcb` (`.orkestrel/campaign/t-verify-report.md`). `@orkestrel/test@0.0.17` published
  2026-09-17 (`.orkestrel/campaign/release/test-publish-0.0.17.log.txt`), and this checkout is
  re-pinned to it from the registry: `node_modules/@orkestrel/test/package.json` reads `0.0.17`,
  `dist/src/core/index.d.ts:20` declares `buildRefusal`, and the guide mirror `guides/test.md`
  is the 0.0.17 copy the catalog visit fetched.
- The Orchestrator's gate reading over the tree, taken bare after the build regenerated `host.json`
  and `dist/host`: `tmp/verify/s3-gates-summary.txt` and the per-stage logs beside it. The three
  manifest-fixture snapshots and the planned-range literal reddened on the re-pin alone (the pin
  flows from `package.json` into `BASE_DEV_DEPENDENCIES`, `src/core/constants.ts:539`) and were
  moved to `^0.0.17`; the re-run after that edit is in the same directory under the `s3b-` label.
- S3's deviation — the installed tarball predated T3 and lacked `buildRefusal` — was the
  Orchestrator's brief error, not the unit's; S3-2 is its carrier.
- The `inject` fence (claim 13) compiles against the installed `vitest` and `@orkestrel/test`
  declarations: `tsc -p tmp/probe/inject-probe/tsconfig.json` exit 0 over `probe.ts` (the fence
  verbatim, with the workspace's own `applyTheme` import replaced by a local declaration), and the
  control `control.ts`, which reads `inject('variant')` into a `boolean`, exit 2 with
  `TS2322: Type 'string' is not assignable to type 'boolean'`. The probe is retained under
  `.orkestrel/campaign/s-audit-inject-probe/`. The compile proves the augmentation shape and the
  `CaptureVariant` mapping; it proves nothing about what the emitted `provide` carries at run time.
- The S1 registration probe (`.orkestrel/campaign/s1-3-instruments/s1-wrapper/`) executed
  `journey:desktop` and `journey:compact` under a minimal Node factory. No unit has run the emitted
  browser root under a real browser; that is named under Unknowns.

## Review evidence

- The diff against `4c4edd93`: `tmp/audit/s-audit-diff.patch`. The S3 and S3-2 diff alone:
  `tmp/audit/s3-diff.patch`.
- `git status --short` at the tip: `tmp/audit/s-audit-status.txt`.
- The writers' reports: `.orkestrel/campaign/s1-report-5.md`, `s2-report-4.md`, `s2-report-5.md`,
  `s3-report.md`, `s3-2-report.md`; their briefs beside them under the same names.
- The design authority: `.orkestrel/campaign/design-verdict.md`, rulings D17–D27.
- The tree itself, readable at `C:/Users/mikes/WebstormProjects/scaffold`; the test package's own
  source and guide at `C:/Users/mikes/WebstormProjects/test` (tip `1b0a800`, the published 0.0.17).

## Numbered claims — attempt to refute each

### The generator (S1)

1. **The emitted journey fan-out is what D17 rules and nothing else.** For a blueprint whose `app`
   includes `browser` and whose `journey` is on, the emitted root `vite.config.ts`
   (`src/core/templates.ts`, `appJourney`) composes `appBrowser()`, includes exactly
   `tests/app/browser/integration.test.ts`, names the project `journey:<name>`, sets the viewport
   from the variant, and provides `variant`, `variants`, and `capture`; the ordinary `app:browser`
   project excludes that file only while the axis is on; the birth-owned
   `configs/app/vite.journey.config.ts` declares `VARIANTS: readonly JourneyVariant[]` and maps each
   to a callback. Attack: a browser blueprint with the axis off — is the exclusion absent, so the
   suite runs in `app:browser`? A wrapper deleted after birth — does `repair` re-derive `journey`
   from its absence and drop `test:journey` from the chain, or leave a chain that names a missing
   config? A blueprint with `app` lacking `browser` and the wrapper present — refused or silently
   emitted?
2. **The axis inference is exact-case and file-backed.** `src/bin/CLI.ts` infers `journey` from the
   wrapper's presence and each setup runtime from an exact-case sibling proof path
   (`tests/setupBrowser.test.ts` selects `browser`; another exact-case root `tests/setup*.test.ts`
   selects `node`). Attack: on a case-insensitive filesystem, a `tests/SetupBrowser.test.ts` —
   does the guard read the directory listing or an `existsSync` that answers yes? A
   `tests/setupBrowser.test.ts` with no `tests/setupBrowser.ts` module beside it — does the emitted
   `setup:browser` project name a `setupFiles` entry that does not exist?
3. **The setup runtimes emit what D18 rules.** The Node `setup` project excludes
   `tests/setupBrowser.test.ts`; `setup:browser` collects exactly that file, enables Playwright
   Chromium, and loads the shared and browser setup modules; `test:setup:browser` joins the `test`
   chain only when selected; no proof file is generated. Attack: the `include` and `exclude` globs
   as emitted — name a path they collect twice or not at all; the chain order when both runtimes
   are selected.
4. **`capture` reaches the browser truthfully.** The root reads `process.env.CAPTURE === '1'` in
   the config process and provides a boolean; `inject('capture')` in a browser test reads that
   boolean, not the string, and a run without the flag provides `false` rather than `undefined`.
5. **The engine limit has two homes that agree.** The emitted `configs/browsers.ts` doc block and
   the skill's Accept paragraph state the same reopening condition — another Playwright engine
   launching on the host with a `captureFrame` reading back at its declared size, or one recorded
   divergence — and ROADMAP row 36 points at those homes without restating the condition. Attack:
   a third home, or two homes whose conditions differ in substance.
6. **The rule rows and the guide describe the emitted bytes.** Every sentence S1 added to
   `.claude/rules/tests.md`, `.claude/rules/workspace.md`, `guides/scaffold.md`, and
   `guides/README.md` names a script, a project, a path, or a field the templates emit under that
   spelling. Attack: a name in the prose the template does not emit, or an emitted name the prose
   spells differently.
7. **The S1 controls bind.** S1-C1 through S1-C6 (`.orkestrel/campaign/s1-report-5.md`) each
   recorded a red that the mechanism alone turns green; S1-C3's staged typecheck rejects a string
   viewport width. Attack: name a mutation of the emitted `appJourney` factory or the wrapper —
   an empty `VARIANTS`, a `provide` missing `variants`, a viewport with a negative height — that
   every S1 control leaves green.
8. **The integration edit is right and alone.** `tests/setup.test.ts:48` expects `base.setup` to be
   `[]`, and no other expectation, fixture, or guide sentence in the tree still describes `setup`
   as a boolean.

### The sweep's own rulings (S2-4 and S2-5)

9. **S2-4's rulings hold at every door.** Attack each ruling at a door the fix round did not use: a
   fence whose parse error sits beside `@orkestrel/` appearing only in a comment; a self-package
   specifier carrying an environment subpath (`@orkestrel/scaffold/server`) resolved through the
   root manifest's `exports`; an installed `.d.ts` that re-exports from a package specifier
   (`export * from '@orkestrel/contract'`) — followed into `node_modules`, refused with its own
   message, or silently empty; a name exported through `export { X as default }` beside a named
   export of the same file.
10. **S2-5's reader states its own blind spot.** `readSpecifiers` (`tests/setupServer.ts`) reads
    static `import` and `import type` declarations; the vendored-import proof admits `node:*`,
    `BASE_DEV_DEPENDENCIES`, and relative specifiers. Name the form it passes silently — a
    re-export specifier (`export * from 'pkg'`), a dynamic `import()`, a `createRequire` call —
    and rule whether the proof's TSDoc and the guide passage state that limit or claim wider
    coverage than the reader has.

### The skill (S3 and S3-2)

11. **Every signature the skill's tables state is the installed one.** The sweep proves names
    alone. Read each verb, reader, wait, and builder row in `references/layer.md`, `styles.md`,
    `captures.md`, and `statechart.md` against `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
    and `dist/src/core/index.d.ts`: parameter order, option keys (`TextWaitOptions`,
    `StateOptions`, `StorageOptions`, `HarnessOptions`, `WaitOptions`), and return types. Attack: a
    cell naming a parameter the declaration lacks, or ordering two parameters the other way.
12. **The failure voices table transcribes the shipped messages.** Each row in
    `references/layer.md` → The failure voices equals a sentence in `dist/src/browser/index.js` or
    `dist/src/core/index.js` (the `pressKeys` nothing-focused refusal, the `waitForState`
    augmentation, the `readCensus` empty-walk refusal, the `createStorage` `SecurityError` and
    `QuotaExceededError` names, `<name>: build refused`). Attack: a row that paraphrases, or a
    shipped refusal a journey asserts that the table omits.
13. **The `inject` teaching compiles and is true.** The fence in `SKILL.md` → Read the variant
    once (the `declare module 'vitest'` augmentation of `ProvidedContext`, `inject('variants')`
    mapped to `CaptureVariant` with `apply`) typechecks against the installed `vitest` and
    `@orkestrel/test` declarations, and `provide` in the emitted `appJourney` carries exactly the
    keys the augmentation declares under those types. The Orchestrator's compile of that fence is
    recorded under Already established; attack the truth of the pairing rather than the compile.
14. **D4's terminal-status sentence is true of the installed build.** `references/statechart.md` →
    The observable statuses reads that a run the `state` reader ends writes `failed` and then
    rejects with that reader's value by identity. Read `createHarness`'s `execute` path in
    `node_modules/@orkestrel/test/dist/src/browser/index.js` and rule. Attack: a reader that throws
    a non-`Error`, a reader that throws on the first row versus the last, a `build` that refuses on
    the final row.
15. **The worked table is the executed one.** `references/statechart.md` → The worked table
    transcribes the disclosure table `@orkestrel/test`'s own browser suite runs
    (`C:/Users/mikes/WebstormProjects/test/tests/src/browser/`), with its phases, its rows, and the
    row whose event leaves the state unchanged. Attack: a row, a phase, or an outcome the suite
    does not carry.
16. **Every ban names a replacement that covers the banned act.** `references/layer.md` → The
    named bans (D22): id and class resolution, a class-list read standing in for a settle,
    `elementFromPoint`, `element.focus()`, store and router calls. Attack: a ban whose named
    replacement cannot perform the act — `pressKeys` refuses while the body holds focus, so what
    replaces `element.focus()` on a surface with no focusable prior step?
17. **The Accept list closes on proofs the skill teaches.** Each Accept bullet in `SKILL.md`
    names an artifact or a proof some section or reference instructs producing. Attack: a bullet
    with no instructing section (the per-variant written artifact; the vocabulary sweep; the
    disk-membership proof), or an instructed proof no bullet requires.
18. **The intents and the mutations are mechanism, not policy (D23, D25).** The intents table
    conditions each journey on the surface having the state and takes the outcome from the product
    guide; the mutation table's two mutations are the ones D23 rules and each names the red it
    must produce. Attack: a row that invents copy, a redirect, or a title scheme; a mutation a
    guarded step would leave green.
19. **`ROADMAP.md` is true of the tree.** Each **Closed** row's clause is true at the tip (row 1:
    the generated `setup:browser` project; row 12: `decide.md` instructs confirming the limit
    against the installed probe and recording the version; row 13: the statuses; row 16: the
    sweep; rows 18–21: the published exports and the resolving fences). Each kept row is still
    open — attack rows 27 and 29 against what S1's templates now emit. Rows 35–37 name a real
    gap at a real site.
20. **The cp1252 rule is a directive with one home and the right remedy.** The paragraph S3
    appended to `.agents/transports/codex.md` § Sol route names the trigger, the required action,
    and the review sweep, records no history, and is stated nowhere else. Attack the remedy against
    the evidence in `.orkestrel/campaign/s2-audit-verdict.md` finding 7: the damage came from the
    bench's file round-trip — does "edit only through the exec's own patch tool" address the path
    that did the damage, or the other one?
21. **`buildRefusal` is taught truthfully (S3-2).** The fence carries it, § Run the table says
    `buildRefusal(name, cause)` builds the same error the runner raises for a refused build, and
    § Mount the harness says the harness fails the row under that sentence. Read `executeScenarios`
    and `createHarness` in the installed dist and rule whether both call it.
22. **The skill is an instruction file.** Every line in `SKILL.md` and the references is a
    directive, a check, or a refusal; no count, no history, no `should`, no restated law that
    binds from `AGENTS.md` or a rule file (the fence obligation lives in
    `.claude/rules/documentation.md` § Workflow skills — does the skill restate it?); every
    reference is named from `SKILL.md` and every named reference exists; the frontmatter
    `description` did not move and the `.claude/skills/orkestrel-prove-journey/SKILL.md` bridge
    and `agents/openai.yaml` still hold parity.
23. **The package is coherent as a whole. Would you ship this?** The skill's description of the
    generated workspace (the wrapper, the projects, the scripts, the setup proof) and the
    generator's emitted bytes agree at every named point; the test package's guide mirror and the
    skill agree on every helper's limits; `guides/scaffold.md` and the rule rows agree with both.
    Name the first place a reader following the skill in a freshly generated workspace hits a
    sentence the workspace contradicts.

## Unknowns

- No unit has run the emitted browser root, the journey wrapper, or the `setup:browser` project
  under a real browser; the S1 probe ran in Node. A claim that needs a browser run is UNRESOLVED
  with the exact command and the workspace shape; the Orchestrator takes it in the roughnotes
  adoption unit that follows this round.
- The audit lanes hold no write tool and a read-only sandbox. Name a vector you could not run as
  UNRESOLVED with the exact command and fixture; the Orchestrator runs it and returns the output
  before ruling.

## The threshold

A finding is worth more than a clean pass. This tree is vendored and generated: a generator defect
is born into every workspace, and a skill defect is followed by every executor in the fleet, and
each surfaces after 0.0.74 is spent. CONFIRMED requires naming the attack you tried that failed. A
claim you cannot decide is UNRESOLVED, not CONFIRMED — say what would settle it. Assume this chain
has one more. Do not hedge toward an imagined consensus.
