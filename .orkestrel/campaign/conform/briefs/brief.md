# Conformance audit — shared brief (2026-09-02)

Every lane of the conformance round reads this brief and then its package's successor brief
(`tmp/units/conform/<package>-brief.md`), which names the package, its repository path, its
environments, its declared `@orkestrel/*` dependencies, and its open carry rows.

## Role and engine

Three lanes per package, each a fresh native Claude subagent in a clean context, blind to the
others:

- the **objective** lane — `reviewer` on Claude Opus 5 holding the objective perspective, because
  the GPT-5.6 Sol bench is dark (`codex` absent from `PATH`, probed 2026-09-02); say so in your first
  line;
- the **subjective** lane — `reviewer` on Claude Opus 5 holding its default lane;
- the **refuter** lane — `reviewer` on Claude Opus 5, launched after the first two return, holding
  the objective perspective, briefed to BREAK every finding the first two lanes raised.

Every lane is read-only (`Read`, `Grep`, `Glob`). Perform the assignment directly and spawn nothing.

## What the round decides

The user has ruled that nothing in the fleet is deferred: every confirmed drift is implemented in
this campaign, breaking changes included, with a layer-ordered publish wave to follow. A finding
that survives the refuter becomes an implementation row that an Opus writer applies verbatim, so a
false finding costs a wrong edit to a published API and a missed finding ships drift. Calibrate to
that: cite the rule text and the code for every finding, and report a clean claim as `CONFIRMED`
with what you read.

## Authority, in order

1. `/home/user/scaffold/AGENTS.md`.
2. Every file under `/home/user/scaffold/.claude/rules/`. The fleet checkouts carry the same files
   at `node_modules/@orkestrel/scaffold/dist/host/claude/rules/`, one release behind; read the
   scaffold copies, which are the canon this round judges by.
3. The package's guide `guides/<package>.md` and `guides/README.md`, which state what the package
   is for. A guide is evidence of intent, never a licence to break a rule: `AGENTS.md` § Authority
   and loading makes the rules outrank existing code and its account of itself.
4. `.claude/rules/quality.md` § Falsification governs your conduct; `orkestrel-falsify` fixes the
   verdict shape.

## Subject

The package's own files: `src/**`, `app/**` where present, `tests/**` except the vendored
`tests/setupPolicy.ts` and `tests/policy.test.ts`, `guides/<package>.md`, `guides/README.md`,
`README.md`, `package.json`, `vite.config.ts`, and `tsconfig.json`. Read `node_modules/@orkestrel/*`
declarations as evidence about declared dependencies.

Off-limits as subjects (scaffold owns them and `scaffold audit` proves them byte-identical):
`.claude/**`, `.codex/**`, `.cursor/**`, `AGENTS.md`, `CLAUDE.md`, `.agents/**`, `configs/**`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `scripts/codex.sh`,
`scripts/cursor.sh`, `scripts/deps.sh`, `scripts/ollama.sh`, `.mcp.json`, `.oxlintrc.json`,
`.oxlintignore`, `.oxfmtrc.json`, `.prettierignore`, `.editorconfig`, `.gitattributes`,
`.gitignore`, `LICENSE`, and every vendored dependency guide `guides/<other-package>.md`
(`guides/guide.md` and `guides/scaffold.md` included). A defect you meet in one of those is a
referral to the Orchestrator, never a finding against the package.

## Standing conditions

- Every checkout is committed clean on `claude/orkestrel-npm-audit-deps-14ibta`; its
  `node_modules` holds the fleet closure staged from campaign tips with `npm install --no-save`, so a
  dependency's installed declaration can be ahead of the registry release the manifest declares.
  That is expected and is not a finding.
- Every package is green on `format:check`, `lint:check`, `check`, `build`, and `test`, except
  `probe`, whose `test` gate is red on a standing container failure (the Oxlint language server
  fails to arm), ruled on pristine `main` and not a package defect.
- The syntactic placement law that `tests/policy.test.ts` proves is green everywhere:
  `.claude/rules/architecture.md` § What the policy sweep proves lists exactly what it covers. Do not
  re-report a finding that sweep would have caught; everything outside its list is yours.
- The TSDoc voice wave has landed: every doc block opens in the third person. Report a voice
  residue only where the sentence misstates what the symbol does.
- The vendored `.oxlintrc.json` denies `any`, `!` non-null assertions, every `as` assertion
  (`consistent-type-assertions: never`), parameter properties, accessibility modifiers, and default
  exports outside the framework-required files, and `@ts-*` directives (`ban-ts-comment`), and
  `lint:check` is green. Do not re-sweep those; read `as const` against
  `.claude/rules/typescript.md` § Types, which lint cannot judge.

## Claims

Rule on each claim for the package. A claim is `CONFIRMED` when you attacked it and it held (name
what you read), `BROKEN` when you found a violation (each violation is one numbered finding),
`UNRESOLVED` when the evidence available cannot decide it (name what would).

The objective lane owns claims O1–O8; the subjective lane owns S1–S6. A lane reports a finding
under another lane's claim only as a referral.

- **O1 Placement and kind purity.** Every declaration sits in the file the centralized-file
  pattern names; every centralized declaration is exported; `helpers.ts` and `validators.ts` import
  no implementation class; every `parsers.ts` export is `parse*` returning `T | undefined` and every
  `factories.ts` export is `create*` returning an entity or value it constructs; `templates.ts`,
  `contracts.ts`, and `routes.ts` hold data only; entity families nest only class files; extension
  categories nest; stores follow the point-access or bulk-restore shape (`.claude/rules/architecture.md`
  § Centralized-file pattern through § Stores).
- **O2 Functions, wrappers, and class order.** No function is declared or assigned inside another
  function or method beyond the two permitted forms; no one-line delegate, pass-through factory,
  rename-only helper, compatibility alias, or wrapper around an identical platform or declared
  primitive survives; no public method forwards 1:1 to a helper; classes follow the class order and
  expose child managers through readonly getters (§ Wrapper test, § Functions and orchestration,
  § Class order).
- **O3 Barrels and exports.** Every intentional reusable top-level export reaches its environment
  barrel; a barrel holds only `export * from` rows; no symbol of another package is re-exported; a
  class no consumer can construct is interned and named in the parity `INTERNAL` list; no default
  export outside a framework-required file (§ Barrel exports; `AGENTS.md` non-negotiables).
- **O4 Non-negotiable syntax.** No `any`, no `!` non-null assertion, no `as` assertion other than
  `as const` on a literal, no `@ts-*` directive, no `eslint-disable`/`oxlint-disable`, no
  `public`/`protected`/`private` keyword, no parameter property, `import type` before value
  imports, `.js` extensions on local imports, single quotes, no semicolons (`AGENTS.md`
  § Non-negotiable rules; `.claude/rules/typescript.md` § Syntax and imports).
- **O5 Types, immutability, errors.** Every reusable or public type lives in the nearest `types.ts`;
  every interface property is `readonly`; every public collection property and return is
  `readonly T[]`, `ReadonlyMap`, or `ReadonlySet`; absence is `T | undefined` and never a sentinel;
  no caller-owned input is mutated and no mutable internal reference leaks; every public error
  class exposes `code`, optional `context`, and ships an `is*` guard; outcomes use the declared
  contract's `Result` and `attempt` where `@orkestrel/contract` is declared (`.claude/rules/typescript.md`
  § Types through § Errors and outcomes; `AGENTS.md` § Design laws).
- **O6 Declared ecosystem reuse.** No local guard, parser, combinator, outcome, boundary, emitter
  helper, recorder, delay, scratch, or other primitive duplicates one an installed declared
  `@orkestrel/*` dependency exports with matching semantics; read the installed declaration before
  ruling (`.claude/rules/patterns.md` § Declared ecosystem capabilities; `.claude/rules/tests.md`
  § Shared test infrastructure).
- **O7 Tests.** Every `src`/`app` module has its mirrored test where behaviour exists; no mock,
  behavioral fake, module replacement, framework spy, or fake clock stands in for project-owned
  behaviour; no `.skip`, `.todo`, conditional skip, retry, or inflated timeout lacks the narrow
  reason the rule requires; setup files own helpers and register nothing; helpers come from
  `@orkestrel/test` where it exports them; `tests/guides.test.ts` transcribes and executes the
  flagship fences; fixture servers bind `127.0.0.1` on port 0; intervals use `performance.now()`
  (`.claude/rules/tests.md`).
- **O8 Workspace and portability.** Scripts match the script-intent table; every declared Vitest
  project is reachable from a gate and resolves to a real file; `distribution` and `service` sit
  where the publishing or private rule places them; the exports map, `files`, `engines`, and
  `bin` are consistent with the built outputs; text splits on `/\r\n|\n/`, paths compose through
  `node:path`, no `/tmp` literal, no `.sh` in a script, children go through `@orkestrel/process`
  where declared (`.claude/rules/workspace.md`; `.claude/rules/portability.md`).
- **S1 Entity API shape.** Every public property, method, option key, and event on an entity is
  one word, or the shape is changed by grouping, sub-entity extraction, or splitting; no
  behaviour-selecting discriminator parameter; managers expose singular/plural accessors and the
  batch overload family with all-succeed semantics (`.claude/rules/names.md` § Entity-scoped names
  through § Split instead of compounding; `.claude/rules/patterns.md` § Managers).
- **S2 Vocabulary and forms.** Helper prefixes carry their one project-wide meaning; the type-level
  and value-level identifier tables hold; `is*`/`parse*`/`create*`/`*Of`/`{noun}To{Noun}` keep
  their contracts; lifecycle verbs keep their fixed meanings with no synonym; tallies follow
  § Tallies; acronyms keep canonical case; no rejected name (`data`, `info`, `item`, `kind`,
  `type` as a member, `cfg`, `msg`); booleans read as assertions; discriminants name their axis;
  a binary switch is a boolean; one term per concept (`.claude/rules/names.md`; `AGENTS.md`
  § Design laws).
- **S3 Options and emitters.** Options are single-word keys grouped by entity noun, `on` reserved
  for hooks; a stateful entity owns an `Emitter` by composition with the seven-step pattern and a
  focused event map of present-tense verbs or nouns, no `status` event, errors typed `unknown`
  (`.claude/rules/patterns.md` § Options, § Stateful emitters).
- **S4 Design laws.** State is derived rather than stored twice; literal unions represent real
  domain states only; no compatibility shim; mechanism not product policy; no polling
  architecture; the public API is minimal and every intentional capability is exposed
  (`AGENTS.md` § Design laws, § System constraints).
- **S5 TSDoc.** Every public export carries a complete block — description, `@param`, `@returns`,
  `@example` where applicable — whose first sentence states what the symbol does in the third
  person without repeating its name; booleans use the fixed forms; defaults, throws,
  prerequisites, and failure behaviour are stated; options objects are one `@param` with fields
  under `@remarks`; comments explain why (`.claude/rules/typescript.md` § Comments and API
  documentation; `.claude/rules/writing.md`).
- **S6 Guide and README parity.** `guides/<package>.md` documents every public export with one
  method table per behavioral interface matching its call-signature members exactly, readonly
  data in Surface rows, fences importing the published specifier, prose claims that the executed
  fences prove; `guides/README.md` carries the concept and directory indexes; `README.md` links
  resolve; no competing instruction copy lives in a guide; no guide, README, test, or source
  comment cites an `AGENTS §N` section (`AGENTS.md` numbers no section, so every such citation is
  stale and names nothing) (`.claude/rules/documentation.md`).
- **C Carry rows.** Each open item the successor brief lists for this package is ruled by the
  lane the row names: `DRIFT` with the repair, `EXCEPTION` with the rule text or guide line that
  licenses it, or `INVALID` with the code and rule quoted.

## Finding shape

Every finding carries: an id `<package>-<lane>-<n>`; the claim it falls under; `file:line`; the
operative rule sentence quoted verbatim with its file and section; one sentence stating what is
wrong; the smallest correct repair as an instruction a writer applies without rereading the tree;
whether the repair renames or removes a published symbol, member, option, event, or union member or
changes a published signature non-additively (`breaking: true`) and, when it does, the consumer
packages the fleet closure names; and `confidence` high, medium, or low.

Where a guide or a TSDoc `@remarks` states a deliberate exception, record the finding with verdict
`EXEMPT` and the pointer rather than dropping it. Where the repair would collide with an existing
name, say so and propose the resolution.

## Refuter lane

You receive the union of the two finders' findings for one package and never their coverage notes.
Reproduce each finding's vector yourself: open the cited line, read the whole file around it and
the entity's full public surface, read the rule section quoted, read the guide and the tests that
pin the behaviour, and compare sibling packages under `/home/user/fleet/` when the finding claims a
convention. Refute on any of these grounds and name which: the cited code does not do what the
finding says; the quoted rule does not ban it or carries an exemption the finding skipped; the
pattern is a documented deliberate exception; the repair breaks the published surface or a test
without the finding saying so; the finding restates a rule that the policy sweep already proves
green; or the diagnosis is wrong, in which case confirm with the correction. Default to refuted
when uncertain and say why. A finding you cannot refute is `CONFIRMED` with the evidence that
convinced you; amend its repair where the finder's repair is wrong.

## Output

Return only the structured object the launch schema names: per-claim verdicts with what you read,
numbered findings in the finding shape, referrals, coverage (files read and files not read with
why), and exactly one terminal line — `VERDICT: PASS — <m> of <m> confirmed, no findings outside the
claims` or `VERDICT: FAIL — <n> broken, <u> unresolved, <x> findings outside the claims`. No process
diary.

## Deviation contract

Stop and report if the repository path or the canon is missing. Decide and record any ancillary
question yourself.
