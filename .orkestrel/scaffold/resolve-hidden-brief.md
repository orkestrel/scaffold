# Unit U3s3 — resolve an exact accessible name beside an `aria-hidden` glyph

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer because
the Codex bench is dark this session. Sole writer in `C:\Users\mikes\WebstormProjects\test`.
Perform the assignment directly and spawn nothing.

## Objective

Make every resolver in `src/browser/helpers.ts` find an element whose exact accessible name sits
beside an `aria-hidden` icon glyph, and still tell a hidden target from an absent one, so the
refusal voices keep their meaning.

## Context

Read first: `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/tests.md`,
`.claude/rules/architecture.md`, `.claude/rules/names.md`, `guides/test.md` § the browser
journey layer and its voices. Skill: none.

**Finding, measured in Chromium on terrain's mounted shell** (`terrain-reference-report.md`):

```text
getByRole('button', { name: 'Add building', exact: true })                       → 1
getByRole('button', { name: 'Add building', exact: true, includeHidden: true })  → 0
getByRole('region', { name: 'Build a carrier-ready schedule', exact: true, includeHidden: true }) → 1
```

The region row is the control: its label carries no glyph. `includeHidden: true` makes the
role engine's name computation include `aria-hidden` descendants, so a Bootstrap Icons glyph
(`<i class="bi bi-plus" aria-hidden="true">` painting `::before` content) joins the computed
name and an exact match never fires.

**Sites.** `src/browser/helpers.ts` lines 129 (`resolveRendered`, exact), 252 (exact false),
and 422 (a named-region resolver, exact). Read each and rule on it; the same defect sits at
every exact site, and the exact-false site decides whether it needs the change.

**Why the layer asks for hidden elements.** The voices differ: `No interactive element has the
accessible name "X"` (absent) versus `Interactive target "X" is not visible and focus-reachable`
(present, hidden or unreachable). A fix that drops `includeHidden` collapses the two voices.

**Host.** Windows 11, Git Bash; Playwright Chromium installed. The browser tests run through
`npm run test:src:browser` or a scoped `npx vitest run --config vite.config.ts --project
src:browser <file>`.

## Unknowns

- Whether the hidden pass can compute a spec-shaped name for a hidden candidate without
  re-implementing the accessible-name algorithm. Report the mechanism you chose and its bound:
  the cases it decides exactly and the cases it approximates. An approximation is allowed only
  in the choice between the two refusal voices, never in which element a resolver returns.

## Scope

**Owned.** `src/browser/helpers.ts`; `src/browser/types.ts` and `src/browser/constants.ts` only
where a new exported helper needs a type or a constant; the browser test file that covers the
resolvers (find it under `tests/src/browser/`, and add a fixture stylesheet or markup there);
`guides/test.md` where the resolver's mechanism or voice text changes; `README.md` only if the
guide's transcription tests require it.

**Off-limits.** Every other source file; `package.json`; version; publish; commits; no
`git checkout`/`restore`/`stash`/`reset`/`clean`.

## Execution

Work directly and spawn nothing. TTTDD: types first where a type moves, then the failing proof,
then the change, then the same command green.

## Required proof, before the fix

Add browser cases and record the exact command with its failing count before changing the
resolver:

1. A visible `button` whose content is an `aria-hidden` glyph element with `::before` content
   (declare the content in a fixture style so the glyph really paints) beside the text
   `Add building`: `resolveRendered('button', 'Add building')` returns it. Failing today.
2. The same shape hidden with `display: none`: the voice is
   `Interactive target "Add building" is not visible and focus-reachable`.
3. A hidden `button` `Save` with no glyph: the same not-visible voice.
4. No element named `Save`: `No interactive element has the accessible name "Save"`.
5. Control: `Add` resolves nothing while `Add building` exists, visible or hidden; the exact
   contract holds in both passes.
6. A `dialog` or `region` labelled by `aria-labelledby` pointing at a heading that carries a
   glyph: the named-region resolver at line 422 returns it.
7. The exact-false site: one case proving its behaviour is unchanged, or the change you ruled it
   needs.

## Output

Write `tmp/units/resolve-hidden-report.md` and return it as your final message: the mechanism
and its bound; the failing command with its count and the same command green; each site's
ruling; the guide lines changed; `git diff --stat` and `git status --porcelain`; scoped gate
readings (`npm run format:check`, `npm run lint:check`, `npm run check`, the browser project);
the claims you could not close.

## Deviation contract

Stop and report — expected, found, evidence, done or not done, one hypothesis — when the fix
needs a new public export beyond one helper, when a proof case cannot be made to fail before the
fix, or when the role engine's behaviour contradicts the finding. Decide and record the fixture
shape and the test names.

## Acceptance criteria

1. The seven cases are in the browser suite, case 1 recorded red before the fix and green after.
2. Every existing browser test still passes; scoped gates green.
3. The guide's resolver section states the two passes and what each decides.
