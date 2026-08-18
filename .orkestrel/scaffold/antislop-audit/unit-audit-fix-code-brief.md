# Unit AF-code: land the audit round's code and instrument fixes

Successor to `tmp/unit-proofs-fix-brief.md`. The audit round (verdicts retained at
`.orkestrel/scaffold/antislop-audit/`) sustained four code findings; the Orchestrator reproduced
every one directly. Each fix adopts the lanes' converged prescription, so each closes with its own
pinned regression test rather than a fresh audit round.

## Role and engine

`sol` route — GPT-5.6 Sol implementer, journaled CLI, sandbox workspace-write, sole serial writer
from a clean committed baseline (the prose fix unit's rule-file edits may already be present in the
working tree — they touch no file you own; leave them exactly as found). Perform directly; spawn
nothing.

## The four findings and their fixes

1. **Template-literal computed access escapes `no-mocking`** (reproduced: `` vi[`mock`]('./x') ``
   produced zero findings through the real binary). In `configs/policy.ts`'s computed branch,
   also accept a `TemplateLiteral` whose `quasis` has exactly one element and whose `expressions`
   is empty, reading the cooked (fall back raw) value. Pin: add the invalid RuleTester case to
   `tests/config.test.ts` — `` vi[`mock`]('./x') `` → messageId `mock`.
2. **Dead exported types** (reproduced: `PolicyCall` and `PolicyClassMember` in
   `configs/policy.ts` have no consumer anywhere in the tree). Delete both interfaces. Bound from
   the audit: do NOT re-thread `PolicyCall` through `reportMocking`'s signature to justify keeping
   it — the runtime `callee` narrowing is what the foreign AST requires.
3. **The suppression population's root arm omits `.jsx`, `.tsx`, `.vue`** (reproduced: a root
   `probeRoot.tsx` carrying a composed directive produced zero suppression reports). In
   `tests/setupPolicy.ts`, make the root arm's extension set identical to the directory arm's.
   Pin: one new `POLICY_CONTROLS` entry whose fixture is a root-level `.tsx` file carrying a
   composed directive (compose the directive from parts exactly as the existing control does).
4. **The wiring instrument is blind to a path-scoped disable** (reproduced: an `overrides` entry
   turning `policy/no-mocking` off for `src/**` left the `config` project green, because the
   scratch fixture lives outside every repo path). Add a structural proof over the parsed
   `.oxlintrc.json` in `tests/config.test.ts` asserting: (a) each of `policy/no-mocking`,
   `policy/no-keyword-privacy`, `typescript/parameter-properties`, and
   `typescript/explicit-member-accessibility` is enabled at `"error"` severity in the top-level
   `rules`; (b) no `overrides[].rules` entry names any of those four ids; (c) the config declares
   no `ignorePatterns` entry reaching `src`, `app`, `tests`, or `configs`. Negative control: the
   same inspection applied to a `structuredClone` of the parsed config with an injected
   `overrides` entry disabling `policy/no-mocking` must report the violation. Bound from the
   audit: do not move the scratch fixture into the repository tree — that pollutes the linted
   population and still misses sibling-path overrides.
   - Shape guidance, yours to settle within the rules: an exported inspection function beside the
     other policy instruments in `tests/setupPolicy.ts` (both it and `tests/config.test.ts` are
     vendored to every target, so the import is fleet-safe) keeps the logic in one home and lets
     both the assertion and its negative control drive the same function. Read the existing
     `PolicyViolation` shape and follow it, or return a simpler dedicated shape — record the
     choice.

## Context

- Rules: AGENTS.md non-negotiables (note: its accessibility line may have just widened — read the
  tree's current copy); `.claude/rules/typescript.md`, `.claude/rules/tests.md`.
- Environment: network denied; `.git` read-only (no index-locking commands); `tmp/` dirty. The
  wiring spawn test fails `EPERM` in YOUR sandbox only — expected, do not chase it.

## Scope

- Owned: `configs/policy.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
  `tests/config.test.ts`.
- Off-limits: everything else, `.oxlintrc.json` included (the structural proof reads it, never
  edits it).
- Validation allowed: `npm run check`, `npm run lint:check`, `npm run format:check`,
  `npm run test:policy`, `npm run test:config` (expecting only the sandbox-EPERM failure), scoped
  `oxfmt --write` on owned files only, throwaway fixtures under `tmp/`.

## Output

1. `git diff` of the owned files.
2. Exit codes for the five validations, with the EPERM exception named if present and nothing else
   failing.
3. One line per finding: closed how, and the name of the test that pins it.
4. Deviation findings, or `none`.

## Deviation contract

Stop and report if a fix cannot land without an assertion, `any`, suppression, an import into
`configs/policy.ts`, or a behavior change beyond the four findings. Helper naming and violation
shape are yours to decide and record.

## Acceptance criteria

- All four pins exist and fail without their fixes (state the red/green evidence for at least the
  template-literal and structural-proof pins).
- `npm run check`, `lint:check`, `format:check` exit 0; `test:policy` green; `test:config` green
  except the sandbox EPERM.
- `configs/policy.ts` still has zero imports; no dead exports remain in it.
