# Unit U3-policy — admit a top-level guide the workspace index links

## Role and engine

`builder` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You are the sole writer in the scaffold checkout (`C:/Users/mikes/WebstormProjects/scaffold`)
for the life of this unit.

## Objective

Change the vendored prose policy so a top-level guide that the workspace's own guide index links is
accounted for, alongside the package's own guide, the index, and a catalog row; prove it with a
negative control and a positive fixture; leave the policy, config, and setup projects green.

## Context

**The defect.** `tests/setupPolicy.ts` `isPolicyStray` (`:2013`) reports every `guides/<name>.md`
that is neither the index (`POLICY_GUIDE_MAP`), the package's own guide (`readPolicyPackage`), nor a
catalog row (`readPolicyCatalog`). A package that publishes more than one face documents each in
its own guide (`.claude/rules/documentation.md` § Parity scope: "Normally scope a guide to one
module directory"), and `guides/README.md` is the map that registers them. Veneer's
`guides/tokens.md`, Elements' `guides/tokens.md`, `mixins.md`, `styles.md`, and Roughnotes'
`guides/composables.md` are such guides; the rule as written reports each as a stray.

**The evidence the rule already trusts.** `readPolicyCatalog` (`:1949`) reads a heading in
`.claude/agents/orkestrel.md`. The guide index is the second mechanism: `guides/README.md` is
authored in the workspace and links every guide it maps. Fleet indexes use different headings
(`## By directory` in scaffold, test, elements, veneer; `## Directory index` in roughnotes), so
read the index's link targets rather than one heading.

**Mirror precedence.** A guide the catalog registers to another package is fetched bytes and stays
out of the term sweep whether or not the index links it. `isPolicyMirror` (`:1998`) is unchanged.

**Law.** `AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `architecture.md`, `tests.md`,
`writing.md`. `tests/setupPolicy.ts` and `tests/policy.test.ts` are this repository's published
`dist/host` surface (the build copies them), so every edit here is a vendored change and the
commit message will say so; you commit nothing.

**Host.** Windows, Git Bash. `npm run test:policy` runs the policy project (Node, no browser);
`npm run test:setup`, `npm run test:config` likewise. Run `npm run format` by path on the files you
own, never tree-wide. No install, no `git` write.

## Unknowns

None the unit needs. If `readPolicyProse` excludes `guides/README.md` from its population in some
configuration, report it; do not widen the population.

## Scope

**Owned.** `tests/setupPolicy.ts`, `tests/policy.test.ts`. **Off-limits.** Everything else,
including `guides/**`, `src/**`, `dist/**`, `host.json`, `.orkestrel/**`.

## Execution

Perform the assignment directly and spawn nothing.

1. In `tests/setupPolicy.ts`, beside `POLICY_CATALOG_FILE` and `POLICY_CATALOG_HEADING`, add
   `export const POLICY_INDEX_FILE = 'guides/README.md'` with a one-line TSDoc, and beside
   `POLICY_MIRROR_PATTERN` add `export const POLICY_INDEX_LINK = /\]\((?:\.\/)?([^/)]+)\.md\)/gu`
   with a TSDoc naming what it matches: a Markdown link whose target is a sibling `<name>.md`.
2. After `readPolicyCatalog`, add `export function readPolicyIndex(root: string): readonly string[]`
   with the TSDoc shape `readPolicyCatalog` uses: returns each distinct guide name the index links
   (the capture of `POLICY_INDEX_LINK` over the file's text with `\r\n` normalized), in first-link
   order; an absent index yields an empty list (`isPolicyFile` guard, as `readPolicyCatalog`).
3. Change `isPolicyStray` so a name the catalog registers or the index links is not a stray; update
   its `@returns` sentence to "neither this package's own, nor the index, nor a guide the index
   links, nor a catalog row". Change the violation message in `inspectPolicyProse` (`:2041`) and
   the control row (`:3382` to `:3384`) to
   `"guide is the package's own, the map, a guide the map links, or a catalog row"`, and the
   membership string to
   `'top-level guides that are neither this package, nor the index, nor a guide the index links, nor a catalog row'`.
   Update the `@remarks` paragraph in `inspectPolicyProse` and in `isPolicyMirror` where they say
   the catalog is the only evidence.
4. Add one `PolicyControl` row after the `rejects a top-level guide the catalog does not register`
   row: label `accepts a top-level guide the index links`, membership
   `'top-level guides the workspace index links'`, rule `'prose'`, `line: 3`, message
   `'prose carries no banned term: via (through, by using)'`, files: the manifest
   (`PROSE_POLICY_MANIFEST`), the catalog (`createPolicyCatalog(['other', 'sample'])`),
   `README.md` with `'# Front page\n\nA reader arrives via this term.\n'`, `guides/README.md` with
   `'# Index\n\n| Directory | Guide |\n| --- | --- |\n| `src/styles` | [`tokens.md`](tokens.md) |\n'`,
   and `guides/tokens.md` with `'# Tokens\n\nA reader reads this guide.\n'`. The row proves the
   linked guide reports no stray violation and the `README.md` control still reports its term.
   Keep the existing `rejects` row unchanged: `guides/stray.md` with no index linking it stays a
   stray.
5. In `tests/policy.test.ts`, rename the case at `:665` to
   `accounts for every top-level guide as this package, the index, a linked guide, or a catalog row`,
   keep every existing assertion, and add: `expect(readPolicyIndex(root)).toEqual([...])` against
   the names scaffold's own `guides/README.md` links (read them first with the regex and paste the
   literal list); `expect(isPolicyStray(root, 'guides/absent.md')).toBe(true)` stays as the
   control. Add `readPolicyIndex`, `POLICY_INDEX_FILE`, and `POLICY_INDEX_LINK` to the import list
   the file already carries.
6. Run the control red first: with step 4's row added and step 3 not yet applied, `npm run
   test:policy` must fail on that row; record the assertion; then apply step 3 and record the same
   command green.
7. `npm run format -- tests/setupPolicy.ts tests/policy.test.ts` (check the script's argument form
   in `package.json` first; if `format` takes no path, run
   `npx oxfmt --config .oxfmtrc.json --write tests/setupPolicy.ts tests/policy.test.ts`), then
   `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:policy`,
   `npm run test:setup`, `npm run test:config`, `npm run test:guides`; record each command's final
   lines.

## Output

Write `tmp/units/u3-policy-report.md` in this checkout and return its content: the diff summary;
the control's red assertion and the green rerun; each gate command's final lines; and every
deviation with expected, found, exact evidence, done or not done, and at most one hypothesis. No
process diary.

## Deviation contract

Stop and report on: a gate that stays red after your own fix inside owned files; a need to edit an
off-limits file. Decide, record, and carry on from: TSDoc wording, the order of the new constants
within their groups, and the name of any local variable.

## Acceptance criteria

1. `npm run test:policy` was red on the new control row before step 3 and is green after it.
2. `format:check`, `lint:check`, `check`, `test:policy`, `test:setup`, `test:config`, `test:guides`
   exit 0.
3. `git status --porcelain` lists only `tests/setupPolicy.ts` and `tests/policy.test.ts`.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
