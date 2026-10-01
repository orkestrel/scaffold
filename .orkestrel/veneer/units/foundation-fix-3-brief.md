# Unit foundation-fix-3 — the token registry keyed by Bootstrap's own words

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing.

## Objective

Re-key `TOKEN_NAMES` in `src/core/constants.ts` of `C:/Users/mikes/WebstormProjects/veneer` so that every leaf of the `bootstrap` group equals its group prefix followed by its key path joined with `-`, where a `base` key adds nothing, with each key a segment of Bootstrap's own custom-property name; remove the `veneer` group until the styles chunk declares its first token; prove the law and the two-way pin against Bootstrap 5.3.8's exported CSS; keep every gate green.

## Context

- **Evidence.** The design round's verdict `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/foundation-design-verdict.md` § Token registry, reconciling `foundation-design-planner-proposal.md` answer 5 (the derivation law) and `foundation-design-analyst-proposal.md` answer 5 (external wording, the trimmed `veneer` group) beside it. The audit finding S6 in `foundation-audit-verdict.md`: the present keys `subtle`, `emphasis`, `border`, `line`, and `base` shorten `bg-subtle`, `text-emphasis`, `border-subtle`, `line-height`, and `box-shadow` (`src/core/constants.ts:347-349`, `:415`, `:474`, `:479`). The population is the 117 `--bs-*` names of the `:root, [data-bs-theme=light]` block of `node_modules/bootstrap/dist/css/bootstrap.css`, which `collectRootNames` in `tests/setupServer.ts` reads and `tests/src/bootstrap/index.test.ts` already pins two ways.
- **Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `names.md` § General vocabulary (a mirrored name keeps the external wording; `kind` and `type` are never member names), `typescript.md` (TSDoc; `as const` on the literal tree), `tests.md`, `documentation.md`, `writing.md`.
- **The law, exactly.** For every leaf `value` at key path `[k1, …, kn]` under `TOKEN_NAMES.bootstrap`: `value === '--bs-' + [k1, …, kn].filter((key) => key !== 'base').join('-')`. Keys are the hyphen-separated segments of the name in order; a name that is both a leaf and a group prefix carries the leaf under `base`. Examples: `--bs-primary` is `primary.base`; `--bs-primary-bg-subtle` is `primary.bg.subtle`; `--bs-primary-text-emphasis` is `primary.text.emphasis`; `--bs-primary-border-subtle` is `primary.border.subtle`; `--bs-body-line-height` is `body.line.height`; `--bs-body-bg` is `body.bg.base` and `--bs-body-bg-rgb` is `body.bg.rgb`; `--bs-box-shadow` is `box.shadow.base` and `--bs-box-shadow-sm` is `box.shadow.sm`; `--bs-font-sans-serif` is `font.sans.serif`; `--bs-border-radius-2xl` is `border.radius['2xl']`; `--bs-gray-100` is `gray[100]`, `--bs-gray` is `gray.base`, `--bs-gray-dark` is `gray.dark`; `--bs-emphasis-color-rgb` is `emphasis.color.rgb`; `--bs-link-hover-color-rgb` is `link.hover.color.rgb`; `--bs-form-valid-border-color` is `form.valid.border.color`; `--bs-focus-ring-opacity` is `focus.ring.opacity`; `--bs-breakpoint-xs` is `breakpoint.xs`; `--bs-gradient` is `gradient`. Every group is frozen with `Object.freeze` and annotated `as const`, as today.
- **Host.** Windows 11, Node 22, npm 12.0.2. `codex exec -C` points at the veneer checkout; `node_modules` is installed and `dist/` is built. The sandbox is `danger-full-access`; the Orchestrator reads `git status --porcelain` after the run. The tree carries uncommitted foundation repairs; build on the working tree. Never install; never run a tree-wide mutating command; edit with your patch tool. A generator you write to derive the tree from `bootstrap.css` is a probe under `tmp/probes/` that you delete before returning; the committed file is the literal tree.

## Unknowns

- Whether TypeScript accepts a numeric-looking key such as `100` and a key such as `'2xl'` inside `as const` groups with `Object.freeze` without an assertion (it does today for `gray` and `'2xl'`); keep those spellings.

## Scope

- **Owned.** `src/core/constants.ts`, `src/core/types.ts` (TSDoc only; the three types keep their names and shapes), `tests/src/core/index.test.ts`, `tests/src/bootstrap/index.test.ts`, `tests/setupServer.ts` (a `collectLeaves(tree)` walker if the proof needs one, with its case in `tests/setupServer.test.ts`), `tests/setupServer.test.ts`, `guides/veneer.md` (the Surface summaries and the flagship fence values), `tests/guides.test.ts` (the transcribed fence values).
- **Shared (report-only).** none.
- **Off-limits.** `ROADMAP.md`, `README.md`, every `.scss` file, `package.json`, `configs/**`, `tests/config.test.ts`, the vendored policy files, `.orkestrel/**`, and everything under `C:/Users/mikes/WebstormProjects/scaffold`.
- **Made false by this change.** Every reader of `TOKEN_NAMES.veneer` (the core test, the guide fence, the guides transcription); `tmp/gates-*.log`.
- **Tools and limits.** Read, patch, `git status`, `git diff`, `node`, `npx tsc --noEmit -p <config>`, `npx oxlint --config .oxlintrc.json <paths>`, `npx oxfmt --config .oxfmtrc.json --check <paths>` and `--write` on owned files only, `npm run build:src:core`, `npm run test:src:core`, `npm run test:src:bootstrap`, `npm run test:setup`, `npm run test:guides`, `npm run check:src:core`.

## Execution

1. Rewrite the `bootstrap` group under the law, one leaf per name in the 117-name population, in Bootstrap's `:root` block order where it reads as a tree (group siblings in the order their first name appears). Delete the `veneer` group. Rewrite the doc comment on `TOKEN_NAMES`: state the law in one sentence, state that the `bootstrap` group holds the `--bs-*` names Bootstrap 5.3.8's `:root` block declares, and that the styles chunk adds the `veneer` group with its first declared token; give an `@example` with `TOKEN_NAMES.bootstrap.primary.base` and `TOKEN_NAMES.bootstrap.primary.bg.subtle`. Update the TSDoc of `TokenMap`, `TokenName`, and `TokenLeaf` so no sentence claims the shipped cascade declares the names; `TokenName` names a custom property the registry pins.
2. `tests/src/bootstrap/index.test.ts`: keep the two-way pin and its two controls; add the law case: walk the tree and assert every leaf equals the law's derivation from its key path; add a control tree with one mis-keyed leaf (`primary.subtle` for `--bs-primary-bg-subtle`) that the same walker refuses; assert a member floor naming `--bs-primary`, `--bs-body-bg`, and `--bs-border-radius-2xl` are leaves.
3. `tests/src/core/index.test.ts`: the export list is still `['TOKEN_NAMES']`; assert `TOKEN_NAMES.bootstrap.primary.base` is `--bs-primary` and `TOKEN_NAMES.bootstrap.primary.bg.subtle` is `--bs-primary-bg-subtle`; assert `Object.keys(TOKEN_NAMES)` is `['bootstrap']`.
4. `guides/veneer.md` and `tests/guides.test.ts`: replace the `veneer` example line with the `primary.bg.subtle` line and keep the transcription equal to the fence; update the Surface summaries to the new doc-block descriptions so `findDrift` reports nothing.
5. Run, in order: `npx oxfmt --config .oxfmtrc.json --write <owned files>`, `npm run check:src:core`, `npx oxlint --config .oxlintrc.json src/core tests/src/core tests/src/bootstrap tests/setupServer.ts tests/setupServer.test.ts tests/guides.test.ts`, `npm run test:src:core`, `npm run test:src:bootstrap`, `npm run test:setup`, `npm run build:src:core`, `npm run test:guides`.

## Output

Write `C:/Users/mikes/WebstormProjects/veneer/tmp/units/foundation-fix-3-report.md` with: the files changed, the leaf count the walker found (it must be 117), each command and its exit code, the generator you used and its deletion, and every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a name cannot be keyed under the law without a `kind` or `type` member, when a gate refuses the tree, or when a group needs an edit outside the owned files.

## Acceptance criteria

1. `npm run check:src:core` exits 0 and the scoped lint and format checks exit 0.
2. `npm run test:src:bootstrap` exits 0 with the law case, the mis-keyed control, the two-way pin, its two controls, and the member floor.
3. `npm run test:src:core`, `npm run test:setup`, and `npm run test:guides` exit 0.
4. `git status --porcelain` lists only owned files, and `tmp/probes/` is empty.

**Observations, not criteria.** none

## Review evidence

The diff and `git status --porcelain`; the report file.
