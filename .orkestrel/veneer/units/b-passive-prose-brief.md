# Unit B-PASSIVE-PROSE — bare code tokens beside repaired test sites, the button-group selector splits, and the § Tests proof links

## Role and engine

`builder` on Sonnet, reached as a native Claude subagent in the worktree `/home/user/veneer-bpp`
(branch `unit/bpp` from `87ff1d0`). The executor that opens this brief is that subagent.

## Objective

Every code token and `{@link}` tag in the doc comments of `tests/setupServer.ts`,
`tests/setupStyles.ts`, and `tests/src/styles/components/button-group.test.ts` takes the noun the
writing rule requires; the button-group proof's own `selectorText` splits route through
`splitTopLevelList`; and the guide's § Tests link lists name every proof file under `tests/` once,
returned as a patch.

## Context

**Evidence.** The carrier rows (`grep -n B-PASSIVE-PROSE /home/user/veneer/ROADMAP.md`, at
`87ff1d0`):

> Bare code tokens that predate the label units beside repaired sites: `tests/setupServer.ts` (the `collectShippedComponents` and `collectKeyframeNames` sites), the `FormRangeCase` remarks in `tests/setupStyles.ts` (the B-FORMS-LABEL-CASCADE round-2 audit); the button-group proof's own `selectorText` splits (two sites, one a multi-line chain) outside CLOSE-MOTION's R9 scope; the bare `{@link}` tokens that predate CLOSE-REGISTRY in `tests/setupStyles.ts` and `tests/setupServer.ts` | B-PASSIVE-PROSE, a `builder` unit after the family close, with the § Tests link lists

> The guide's § Tests link lists omit the proofs for pagination, button group, progress, spinner, placeholder, card, list group, and validation, and all but three section proofs (the B-PASSIVE-CLOSE design round) | B-PASSIVE-PROSE adds every proof's link once

The named sites (`grep -n "collectShippedComponents\|collectKeyframeNames" tests/setupServer.ts`):

```text
1356: * so this reader leaves those rules to {@link collectKeyframeNames}.
1594: * {@link collectKeyframeNames} answers the neighbouring question about the animations themselves.
2100: * @param shipped - The shipped component keys, as `collectShippedComponents` selects them.
2219: * @param keyframes - The cascade's animation names, as {@link collectKeyframeNames} reads them.
```

The split sites (`grep -n "split(','" tests/src/styles/components/button-group.test.ts`):

```text
311:				? rule.selectorText.replaceAll(' ', '').split(',')
398:				.split(',')
```

The pattern to copy (`grep -n splitTopLevelList tests/src/styles/components/pagination.test.ts`):

```text
31:	splitTopLevelList,
56:				rule instanceof CSSStyleRule ? splitTopLevelList(rule.selectorText) : [],
```

The `{@link}` sweep bound: every `{@link …}` occurrence in `tests/setupServer.ts` and
`tests/setupStyles.ts`, ruled by the sense (a `{@link}` for a function, constant, class, or type
is an identifier and takes a noun such as `reader`, `function`, `constant`, `record`, `class`,
`method`; a `{@link}` for a CSS property, value, function, custom property, or `!important` token
is its own noun). A sample of the bare tags today (`grep -n -E "\{@link [A-Za-z_.#]+\}( (is|are|reads|holds|returns|names|writes)\b|,)" tests/setupServer.ts tests/setupStyles.ts`):

```text
tests/setupServer.ts:370: * cell round-trips: {@link readDepartures} reads it back as the empty string and
tests/setupServer.ts:371: * {@link describeDeparture} writes it from one.
tests/setupServer.ts:412: * with {@link collectElementTags}, and requires {@link collectMandatedRelatives} to return exactly
tests/setupServer.ts:857: * @returns The module specifiers in source order, as {@link SpecifierReader.read} returns them.
tests/setupServer.ts:2120: * {@link matchesRecording} is what separates that case from two keys recording one site
tests/setupStyles.ts:254: * @returns The text without the leading and trailing characters {@link matchesCSSWhitespace} names
tests/setupStyles.ts:352: * these steps are {@link trimCSSWhitespace}, {@link splitTopLevelList},
```

The `FormRangeCase` interface sits at `tests/setupStyles.ts` around line 3596 (`grep -n
"export interface FormRangeCase"`); sweep its doc block and the `FORM_RANGE_CASES` remarks.

**Law.** `AGENTS.md`; `.claude/rules/writing.md` § Code tokens, references, and links and
§ Substitutions; `.claude/rules/typescript.md` (TSDoc); `.claude/rules/tests.md`;
`.claude/rules/documentation.md` (§ Tests is guide prose; every link introduced by `see` or a
descriptive phrase); the skill: none; the guide `guides/veneer.md`.

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/*.d.ts`) and
`@orkestrel/contract`: this unit adds no helper; a helper, guard, wait, recorder, or deferred whose
job an installed export does is a defect. The checker probes the diff for a new exported symbol.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-bpp`; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(run it first in every shell; the manifest's `devEngines` pin refuses npm 10); network reachable;
Chromium installed; no sandbox.

**Measurements.** Taken at `87ff1d0` in the worktree before the unit starts: `npm run lint:check`
and `npm run format:check` exit 0; `npx vitest run --config configs/src/vite.styles.config.ts
--no-cache --reporter=dot tests/src/styles/components/button-group.test.ts` exits 0 with every
case green (the unit re-runs it first and records the count).

**Control identifiers.** None. A test is named for what it proves, never for the row that
specified it.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored: never
edit them; the policy sweep reads every comment for the banned terms in `writing.md`
§ Substitutions, so a rewritten sentence introduces none. `git status --porcelain` is empty at
`87ff1d0`. No command is known to fail.

## Unknowns

- The § Tests link lists' state: CLOSE-GUIDE is rewriting § Tests in a sibling worktree and has
  not landed at `87ff1d0`, so the unit measures the section at `87ff1d0` (`ls tests/**/*.test.ts`
  against the links under `## Tests`), lists every proof file the section does not link, and
  returns the list with a proposed sentence per link rather than a line-anchored patch; the
  Orchestrator applies it to the landed section.
- Whether `tests/guides.test.ts` asserts anything over § Tests links (grep `Tests` there): the unit
  reports what it reads; a parity case that enumerates the links is owned by the patch's
  integrator, so the unit names it rather than editing it.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupStyles.ts`,
`tests/src/styles/components/button-group.test.ts` (doc comments and the two split sites only; no
behaviour change).

**Shared (report-only).** `guides/veneer.md` (§ Tests: the unit returns an exact patch adding the
missing proof links, each introduced per the writing rule, and edits nothing there).

**Off-limits.** `tests/setupPolicy.ts`, `tests/policy.test.ts` (vendored, restored by
`scaffold repair`), `ROADMAP.md`, every file under `src/`, `app/`, and `configs/`, every other test
file.

**What asserts the state this change ends.** The button-group proof itself (its cases over the
split sites; in Owned); the policy sweep over comments (`tests/policy.test.ts`, vendored, reads the
edited comments and must stay green); `tests/guides.test.ts` (reads § Tests through the patch's
integrator; named carrier: the Orchestrator's landing integration).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git
checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format`, `lint
--fix`, or `build`; scoped runs only.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-bpp/tmp/units/bpp-report.md` with: the ruled ledger of every
`{@link}` and code-token hit in the three owned files (quoted text, sense, permitted or rewritten,
the rewrite), the two split-site diffs, the § Tests measurement (proof files versus links) and the
exact patch for `guides/veneer.md`, the scoped gate exits with their commands, and a closing list of
what the unit could not close. Delivered as that file plus the same text as the final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on a `{@link}` whose sense the rule does not settle, on a split site whose reading
changes under `splitTopLevelList`, or on a proof file whose home in § Tests the section's shape
does not offer. Decide, record, and carry on from the noun a token takes and the position of a
link inside its list.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. `npm run check` exits 0.
3. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/button-group.test.ts` exits 0 with the same case count as the measurement.
4. `grep -n -E "\{@link [A-Za-z_.#]+\}( (is|are|reads|holds|returns|names|writes|takes|carries|maps|owns|runs|lists|declares|records|keeps|emits|binds)\b|,)" tests/setupServer.ts tests/setupStyles.ts` returns only hits the ledger rules permitted, and the ledger rules every `{@link}` in the two files.
5. Neither `split(',')` site remains in `tests/src/styles/components/button-group.test.ts`; both read `splitTopLevelList`.
6. The report carries the § Tests patch naming every proof file under `tests/` the section omitted, each once.

**Observations, not criteria.** `npm run test:setup` and `npm run test:policy` readings (whole
projects; the Orchestrator runs them at landing).

## Review evidence

`git -C /home/user/veneer-bpp diff 87ff1d0` and `git -C /home/user/veneer-bpp status --porcelain`,
captured by the Orchestrator at hand-back as `bpp.diff` and `bpp-status.txt`, plus the report.
