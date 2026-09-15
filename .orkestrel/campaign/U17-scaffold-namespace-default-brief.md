# Unit U17-scaffold — `@orkestrel/scaffold`: the AD4b precision fixes

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/scaffold` checkout while this unit runs. Every carrier is fully
specified; where a carrier's reading differs from what you find, stop and report.

## Carriers (each names its finding; close every one)

1. **The `surface` reader refuses a namespace `default` export (AD4b analyst 1).** In
   `tests/setupPolicy.ts`, the `ExportAllDeclaration` branch with `exported !== null` (near
   `:1691-1702`) accepts `export * as default from './x.js'` and returns a `default` declaration;
   the named-list branch (near `:1730`) refuses with `default export is unsupported at
   ${path}:${line}`. Apply the same refusal to the namespace alias when its exported name is
   `default`. Pin red first in `tests/setupPolicy.test.ts` beside the existing default-refusal
   case: `refuses a namespace export aliased as default` (follow how the sibling cases are
   declared, including `POLICY_SURFACE_EXPORT_CASES` if the table drives them).
2. **A narrowed owner set is a shrink (AD4b reviewer G1).** `stageHost`'s growth check
   (`src/server/helpers.ts` near `:1700-1713`) refuses whenever the staged owners differ from the
   recorded owners — so a guide that drops one owner of a three-owner name is refused as growth.
   The invariant (`.claude/rules/names.md` § Fleet name ownership, R4) is shrink-only: refuse iff
   the staged name is absent from the record OR the staged owner set is not a subset of the
   recorded owner set; accept when it is a subset (equal or narrower). Change the refusal message
   to name the fact: `Staged Surface collisions differ from the inventory: ${name} staged
   (${owners}), recorded (${recorded ?? 'absent'})` — listing every offending name that way. Pins
   red first in `tests/src/server/helpers.test.ts` beside the existing growth tests: `stages when
   a recorded collision loses an owner`, `refuses when a recorded collision gains an owner`, and the
   message shape asserted in the existing refusal test. Keep `refuses a stage whose guides add a
   collision the inventory lacks`, `stages when the collision set matches the inventory`, `stages
   when a collision the inventory carried is gone` green. Update the TSDoc `@throws` line and the
   guide sentence that describes the refusal (`guides/scaffold.md`, the growth sentence in the
   host section) to say "differs" with the subset rule.
3. **`captureScaffoldMessage` reuses `captureError` (AD4b reviewer 7).** `tests/setupServer.ts`
   near `:1104-1111`: replace its own `try { call() } catch` with the sibling's body —
   `const error = captureError(call); return isScaffoldError(error) ? error.message : undefined`.
   `captureScaffoldRejection` keeps its `try`/`catch` (no installed asynchronous counterpart).
4. **One catch for the reader's throw (AD4b reviewer G2).** `tests/setupPolicy.ts` near
   `:1851-1861` and `:1947-1958` convert a `readPolicyDeclarations` throw into a `surface`
   violation with an identical construction. Extract one exported helper in the same vendored
   module (`{verb}{Noun}`; the reviewer's candidate `collectPolicyDeclarations(root, path, text)`
   returning the declarations and the violation) and call it from both sites; prove it in
   `tests/setupPolicy.test.ts` with one case per outcome.
5. **Three prose lines (AD4b reviewer 5, G3, G4).** `guides/scaffold.md` near `:1524`: "`npm run
   build` is the release path, and it passes neither `HostStageOptions.inventory` nor
   `HostStageOptions.establish`." `guides/scaffold.md` near `:1116`: "These `tests/setupPolicy.ts`
   exports implement the `surface` rule: its declarations, its constants, its readers, and the
   fixtures its controls run against." — keep the rest of the lede. `guides/README.md` near `:60`:
   "in this repository" for "in this repo".

## Context

Dirty checkout with the whole D4 chain plus the AD4 fixes (all accepted); `guides/supervisor.md`
staged; `.orkestrel/` untracked; `dist/` and `host.json` current from V4's build — leave them.
`npm run test:policy` is green (102) at launch. Windows host, Git Bash; `npm` on the path. The
nine documented `Ollama setup` failures in `test:src:server` do not occur on the host.

## Scope

**Owned.** `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `src/server/helpers.ts` (the
growth check and its TSDoc), `tests/src/server/helpers.test.ts`, `tests/setupServer.ts` (the one
body), `guides/scaffold.md` (the three sentences), `guides/README.md` (the one word).
**Off-limits.** Everything else (`host.json`, `dist/**`, `package.json`, `.claude/**`, `.agents/**`,
`.orkestrel/**`).

## Output

Final message: per carrier, the before/after with `file:line`; every pin's red reading (the exact
assertion failure) and green reading; the readings of `npm run test:policy`, `npm run test:setup
-- tests/setupPolicy.test.ts`, `npm run test:src:server -- tests/src/server/helpers.test.ts`,
`npm run test:guides`, `npm run check`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned
files>`, `npx oxfmt --config .oxfmtrc.json --check <owned files>`; `git diff --stat` for the owned
files; deviation state.

## Acceptance criteria

1. Every pin red before its change and green after (readings recorded).
2. `test:policy`, the two scoped suites, `test:guides`, and `check` exit 0.
3. oxlint and oxfmt clean on the owned files.
4. Only the owned files changed.
