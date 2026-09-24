# Unit AP-COLOR — role-colored text on the page reads the on-canvas tier

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in the worktree `/home/user/veneer-apc` (branch `unit/apc`, cut from
Veneer `712ae72`).

## Objective

Every role-colored text mark on the page canvas paints its role's 70 percent oklab tier (`--vn-color-<role>-emphasis`)
in light and in dark, and an executed contrast reading of at least 4.5 to 1 proves it for every included selector.

## Context

**Evidence.** The design ruling is `/home/user/scaffold/.orkestrel/veneer/units/appearance-design-verdict.md`; read it
first, then the P7 sections of `appearance-design-planner-proposal.md` and `appearance-design-analyst-proposal.md`
beside it. The verdict wins where a proposal differs. The sites, with citations, are in
`appearance-instruments/appearance-sites-grok.md` § P7. Orchestrator samples, taken at `712ae72`:

```text
$ grep -n -E "^\s*'emphasis'|^\s*'valid'|^\s*'invalid'|^\s*'link" src/styles/_tokens.scss
51:	'emphasis': 'var(--vn-palette-black-base)',        (light)
64:	'link': 'color-mix(in oklab, var(--vn-color-primary-base) 70%, var(--vn-text-body-base))',
65:	'link-rgb': '13, 54, 172',
66:	'link-hover': 'color-mix(in srgb, var(--vn-link-base) 65%, black)',
67:	'link-hover-rgb': '8, 35, 112',
70:	'valid': 'var(--vn-color-success-base)',
71:	'invalid': 'var(--vn-color-danger-base)',
118:	'emphasis': 'var(--vn-palette-white-base)',        (dark)
131:	'link': 'color-mix(in oklab, var(--vn-color-primary-base) 80%, var(--vn-text-body-base))',
132:	'link-rgb': '79, 185, 238',
133:	'link-hover': 'color-mix(in srgb, var(--vn-link-base) 65%, white)',
134:	'link-hover-rgb': '141, 210, 244',
137:	'valid': 'var(--vn-color-success-emphasis)',
138:	'invalid': 'var(--vn-color-danger-emphasis)',
```

`src/styles/utilities/_color.scss` builds `.text-<role>` as `rgba(var(--bs-<role>-rgb), var(--bs-text-opacity))` over
`$aliased`. `src/styles/utilities/_link.scss` builds `.link-<role>` from `--vn-color-<role>-rgb` and moves hover toward the
label endpoint by `$shift: 20%`. `src/styles/components/_button.scss` builds `.btn-outline-<role>` over `$roles` with
`--bs-btn-color: var(--vn-color-<role>-base)`. `src/styles/_tokens.scss` lines 7 to 11 hold `$roles` (tertiary included)
and `$aliased` (no tertiary).

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,writing,quality}.md`;
Veneer `ROADMAP.md` § Tenets and § Rulings (the APPEARANCE-RULING bullet); skill: none; guide: `guides/veneer.md`.

**Installed primitives.** `@orkestrel/test` 0.0.23 in `node_modules/@orkestrel/test` (read
`dist/src/browser/index.d.ts` first; `readContrast` and `matchesColor` are the contrast and color-equality readers) and
`@orkestrel/contract`. A contrast, color, or luminance helper written in this unit whose job an installed export does is a
defect.

**Host.** Linux, bash, working path `/home/user/veneer-apc`. `node_modules` is a hardlinked copy of Veneer's; do not run
`npm install` or `npm ci`. Chromium 141 is the Vitest browser. Network is open, and nothing in this unit needs it.

**Measurements.** Host Chromium 141 over Veneer's built cascade (`appearance-instruments/appearance-tier-probe.log.txt`),
contrast against the mode's body background:

| Role | Light tier | Dark tier | Dark hover (tier 80% srgb toward `--vn-text-emphasis-base`) |
| --- | --- | --- | --- |
| primary | 9.81 | 8.64 | 10.03 |
| secondary | 10.28 | 5.90 | 7.62 |
| tertiary | 8.58 | 5.25 | 6.86 |
| success | 7.68 | 5.67 | 7.34 |
| info | 8.64 | 5.07 | 6.78 |
| warning | 7.73 | 5.61 | 7.26 |
| danger | 9.28 | 4.76 | 6.29 |

Dark raw danger is 2.75 and dark info 3.02. The `a` link at the dark 70 percent tier reads 8.64 and its hover 11.23.

**Control identifiers.** None. Name each test for the property it proves.

**Standing conditions.** A second unit, AP-TYPE, works the size rules in `/home/user/veneer-apt` at the same time; its
files are off-limits here. `tmp/` is the unit's own scratch.

## Unknowns

None.

## Scope

**Owned.** `src/styles/_tokens.scss`; `src/styles/utilities/_color.scss`; `src/styles/utilities/_link.scss`;
`src/styles/components/_button.scss`; every `tests/src/styles/**/*.test.ts` file whose pinned value this change moves,
except the files AP-TYPE owns (listed under Off-limits).

**Shared (report-only).** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `guides/veneer.md`. Edit them in this
worktree as the proofs and gates need, then write `git diff -- tests/setupStyles.ts tests/setupStyles.test.ts
guides/veneer.md` to `tmp/units/apc-shared.patch`. The Orchestrator integrates that patch. In the guide, change only the
ledger rows and token rows for this unit's selectors and tokens, and the prose sentences stating the behaviour this unit
moves (§ Color utilities, the colored-link helper, outline buttons, validation, the link tokens); add the one departure
sentence P7-3 requires and the one identity sentence P7-4 requires.

**Off-limits.** `src/styles/_mixins.scss`; `src/styles/elements/_heading.scss`; `src/styles/components/_type.scss`;
`src/styles/utilities/_font.scss`; `src/styles/elements/_fieldset.scss`; `tests/src/styles/elements/heading.test.ts`;
`tests/src/styles/components/type.test.ts`; `tests/src/styles/utilities/font.test.ts`;
`tests/src/styles/elements/fieldset.test.ts`; `tests/src/styles/mixins.test.ts`; `tests/src/styles/fixtures/**`;
`tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` (vendored); `package.json` and
`package-lock.json`; `ROADMAP.md`. If a criterion needs one of these files, stop and report the exact hunk.

**What asserts the state this change ends.** Derive it by running `npm run test:src:styles` once before editing and once
after the source change, and read each red. Known members: `tests/src/styles/utilities/color.test.ts` (the
`--vn-color-primary-rgb` retune case), `tests/src/styles/utilities/link.test.ts` (the hover endpoint cases),
`tests/src/styles/tokens.test.ts` (the link triplet-to-rendered case), `tests/setupStyles.ts` (text, link, and validation
case tables), and the ledger rows `tests/conformance.test.ts` reads from `guides/veneer.md`. `TEXT_COLOR_CASES` in
`tests/setupStyles.ts` is Bootstrap baseline data that `tests/setupStyles.test.ts` compares with the official inventory:
keep it, and put Veneer's expectations beside it.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`, `git restore`,
`git stash`, `git reset`, or `git clean`. Run `oxfmt` through `npm run format` only on owned and shared files you
changed; never run prettier.

## Execution

Perform the assignment directly and spawn nothing.

1. **Exclusion home.** In `_tokens.scss`, add one list naming the neutral roles (`light`, `dark`) beside `$aliased`, with
   a one-line comment. Each walker this unit changes skips that list's members.
2. **`.text-<role>`.** For every `$aliased` member outside the neutral list: `color: rgb(from
   var(--bs-<role>-text-emphasis) r g b / var(--bs-text-opacity)) !important;`, keeping the entry's opacity variable,
   priority, and order. `light`, `dark`, black, white, and body keep their channel form.
3. **`.link-<role>`.** Same population. Resting `color` and `text-decoration-color` read
   `--vn-color-<role>-emphasis` through relative color with the existing opacity variables. Hover and focus read
   `color-mix(in srgb, var(--vn-color-<role>-emphasis) 80%, var(--vn-text-emphasis-base))` (keep `$shift` as the
   endpoint's share), under the same opacity variables. `light` and `dark` keep today's rule.
4. **Outline buttons.** For every `$roles` member outside the neutral list, tertiary included: `--bs-btn-color` and
   `--bs-btn-disabled-color` read `var(--vn-color-<role>-emphasis)`. Borders, hover, and active keep the fill.
5. **Link tokens.** `'link'` reads `var(--vn-color-primary-emphasis)` in light and in dark. Recompute the dark
   `link-rgb` and `link-hover-rgb` triplets as the sRGB rendering the existing triplet-to-rendered test demands; light
   triplets hold if the rendered color is unchanged.
6. **Validation tokens.** Light `'valid'` and `'invalid'` read `var(--vn-color-success-emphasis)` and
   `var(--vn-color-danger-emphasis)`, as dark does.
7. **Proofs**, each an executed assertion in the owned test file for that surface, in light and in dark on an explicitly
   painted canvas:
   - contrast of at least 4.5 to 1 against the scope's body background for `.text-<role>`, `.link-<role>` at rest and on
     hover, `.btn-outline-<role>` resting text (tertiary included), `.valid-feedback`, `.invalid-feedback`, and a
     checked validation label, per role;
   - `.text-<role>` equals `.text-<role>-emphasis` at default opacity;
   - each `.text-opacity-*` step paints the tier's channels at that step's alpha;
   - retuning `--vn-color-primary-base` at the theme-declaring scope moves `.text-primary` to the 70 percent mix of the
     retuned color with `--vn-text-body-base`; retuning `--vn-text-body-base` moves the partner; retuning
     `--vn-color-primary-rgb` alone leaves `.text-primary` unchanged while a channel consumer moves;
   - the light validation border and checked fill read the emphasis tier;
   - `.text-light` and `.text-dark` keep their current colors;
   - `a` equals `.text-primary` in light and in dark.
8. **Mutations.** Run each, confirm the named proof reddens, restore the exact edit, and log each run: the tier at 80
   percent in dark; `.text-danger` back on the channel; a bare `color-mix()` in `.text-<role>` (the opacity step
   reddens); the neutral list emptied (`.text-light` moves); light `'valid'` back on the fill.

## Output

Write `tmp/units/apc-report.md` and return the same text: each change by file, the proof table (proof, file, what it
reads), the mutation table (mutation, the proof that reddened, log path), the gate table with log paths, and the paths
of `tmp/units/apc.diff` (`git diff 712ae72` over owned files), `tmp/units/apc-shared.patch`, and
`tmp/units/apc-status.txt` (`git status --short`). Keep every log under `tmp/units/`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when a ruling in the verdict
cannot be implemented as stated, when a proof reads below 4.5 to 1, or when a criterion needs an off-limits file. Settle
yourself: the neutral list's name, test names and placement, and where a guide sentence sits.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0, each logged with its exit status.
2. `npm run test:src:styles` exits 0, logged.
3. `npm run test:setup` and `npm run test:conformance` exit 0, each logged.
4. `npm run test:guides` exits 0, logged.
5. Every proof in Execution step 7 exists and passes, and every mutation in step 8 reddened its named proof, each logged.
6. `git diff 712ae72 --stat` names only owned and shared files.

**Observations, not criteria.** `npm run test:journey` and the whole `npm test` chain: run neither; the Orchestrator runs
them after landing.

## Review evidence

The Orchestrator supplies `apc.diff`, `apc-shared.patch`, `apc-status.txt`, the report, and the logs to the audit
lanes, with captures of the text, link, outline-button, and validation specimens at 390 and 1280 in light and dark.
