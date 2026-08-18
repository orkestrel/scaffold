# Subjective-lane audit verdict (reviewer, Opus 5) — verbatim return

**Lane held: subjective** (design fit, API and vocabulary, architecture fit, simplification,
guide/rule voice and product coherence). My engine (Opus 5) wrote U1; findings (i)–(iii) under
claim 6 are against that half.

## Numbered verdicts

**1. `policy/no-mocking` reports every construct it claims — UNRESOLVED**

Attacks that failed: the `vi`/`jest` identifier gate and both member-access branches are present
and correct at configs/policy.ts:81-114; the four messageId groupings map exactly to the
constructs the adoption ruling A2 names; `vi.mocked`, `vi.unmock`, `vi.hoisted` are deliberate
exclusions settled there, not gaps.

Undecided vector: `` vi[`mock`]('./x') ``. configs/policy.ts:88-94 assigns `member` in the
computed branch only when `property.type === 'Literal'`. A no-substitution template literal is
`TemplateLiteral` in every ESTree-shaped AST, so `member` stays `undefined` and no diagnostic is
emitted — yet a template literal is computed string access, which claim 1 puts inside its
coverage, and it is not the documented renamed-alias limit.

What would settle it: add the invalid case `` vi[`mock`]('./x') `` → messageId `mock` to the
`no-mocking` invalid set and run `npm run test:config`. If it fails, the smallest fix is to accept
a `TemplateLiteral` with exactly one quasi and no expressions in the computed branch. I cannot
execute; I am not ruling this BROKEN on a derivation.

**2. Neither plugin rule reports a sanctioned construct — CONFIRMED**

Attacks that failed: `createRecorder()` and `registry.mock('./x')` are gated out by the
`object.type !== 'Identifier'` / name check, and both are asserted valid; unlisted `vi` members
fall through the `switch` with no default, covered by the `vi.clearAllMocks()` valid case; `#`
fields carry no `accessibility` node so `reportPrivacy` cannot fire; the plugin's own source names
the banned members only as `case` labels and string data, never as calls on `vi`/`jest`; the
RuleTester case strings are string literals, not `CallExpression`s. I searched the tree for any
existing accessibility modifier the two new built-ins would newly refuse — no matches, consistent
with `lint:check=0`. No sanctioned construct is broken and no refusal is widened past its stated
surface.

**3. The wiring instrument binds — BROKEN**

Falsifying change to `.oxlintrc.json`, in-scope and silent:

```json
{ "files": ["src/**/*.ts", "app/**/*.ts", "tests/**/*.ts"],
  "rules": { "policy/no-mocking": "off", "policy/no-keyword-privacy": "off" } }
```

The `config` project would not catch it. The wiring proof lints an absolute path in a scratch
directory outside `src/`, `app/`, `tests/`, and `configs/`. No path-scoped `overrides` entry can
match that path under any resolution base, so the rule still fires on the fixture, all four ids
still appear, and the test stays green while enforcement over the real tree is off. Nothing in the
`config` project reads the config's structure, so no other test closes the gap either. A second
in-scope vector is an `ignorePatterns` entry excluding `src/**`, with the same blindness.

Why it matters: the adoption ruling states this instrument's whole purpose as catching a silently
no-op config; a path-scoped disable is a fourth mode in the same family, reads as ordinary
maintenance in a file that already carries nine `overrides` blocks, and ships to every fleet
target.

What right looks like: a structural assertion over the parsed `.oxlintrc.json` — every
`overrides[].rules` key set, and any `ignorePatterns`, disjoint from the policy-law rule ids —
with its own negative control. Bound on the fix: do not move the scratch fixture into the
repository tree; that pollutes the linted population and still misses an override scoped to a
sibling path.

**4. The suppression population omits no code file oxlint lints here — CONFIRMED**

Attacks that failed: `.claude`, `.codex`, `.cursor`, `.agents` hold no lintable code file;
`scripts/` holds only `.sh`; `demo/` holds only generated HTML; `.oxlintignore` removes
directories outside the claim; `tmp/probe/**` is gitignored throwaway. The glob's five directory
arms plus the root arm cover every code directory this workspace defines.

Bounded observation, not a falsification: the root arm is `*.{cjs,cts,js,mjs,mts,ts}` while the
directory arm adds `jsx,tsx,vue`. A root-level `.tsx`, `.jsx`, or `.vue` is lintable and
unreached. No such file exists here and the environments table forbids one, so no claimed class
escapes; making the two extension lists identical costs one token and removes the asymmetry.

**5. No instrument is vacuous or self-triggering — CONFIRMED**

Attacks that failed: the sweep cannot report its own definitions because both tokens are composed
and the test references the constant rather than the literal; the rule files that carry the
literal are `.md` and outside the population; the new positive control fires under the same
assertion as every other control; the out-of-population control returns `[]`; the
`scripts/control.ts` control is drawn from a glob arm with no real members, which strengthens
rather than weakens it — it proves the arm resolves.

Noted weakness inside the claim, not a break: the out-of-population control `guides/sample.md` is
excluded twice over — by directory and by extension — so it cannot show which exclusion did the
work. Two single-axis controls (`src/core/notes.md`, and `guides/sample.ts`) would isolate each
dimension. The claim's four conjuncts still hold as stated.

**6. Every U1 sentence is true of the code and consistent with `AGENTS.md` — BROKEN**

Three sentences fail. Attacks that failed first, so the break is bounded: the three-leaf sentence
is true; the instrument-assignment rule matches the split as landed; the `as const` ruling
survives its sharpest test — `as const` occurs at tests/distribution.test.ts:68 and
tests/src/core/compilers.test.ts:979 under `consistent-type-assertions: never` with
`lint:check=0`, so the installed gate really does exempt it; the sweep-proof row's first sentence
accurately states the sweep's coverage.

(i) workspace.md:244 — "This is the `routes.ts` idiom over a foreign API shape". It is the
inverse of that idiom: architecture.md defines routes as referenced by name, never a function
expression written in place, while the visitor table mandates an in-place function expression.
An agent that accepts the equivalence can carry it back to a real `routes.ts` and write
`{ handler: (ctx) => handle(ctx) }`, which architecture.md forbids in the same words the sanction
borrows. What right looks like: drop the identity claim and state the shape directly.

(ii) typescript.md:20-21 bans `public` and `protected` while AGENTS.md's non-negotiable still
reads "NEVER use TypeScript `private`" and names neither — the root copy is now the narrower,
stale one, breaking the root's own one-home law; a fleet agent obeying the restated
non-negotiables writes `protected` and meets a red gate with no root-law backing. What right looks
like: amend the AGENTS.md non-negotiable to name all three modifiers and the parameter-property
form, in this commit, and reduce typescript.md to the TypeScript-syntax specifics the root does
not carry.

(iii) architecture.md:108-110 restates the instrument-assignment rationale homed at
workspace.md:239-241 — two homes for one rule. What right looks like: architecture.md keeps only
what the sweep proves; workspace.md stays the single home of the assignment rule.

**7. Zero dependencies — CONFIRMED**

Attacks that failed: configs/policy.ts read in full — no `import`, no `require`, no dynamic
import. The manifest half: the `oxlint/plugins-dev` import forces no floor move (E10b, recorded
canon); `createScratch` was already imported; the supplied diff carries no manifest hunk. Residual
not directly shown: a bare `git diff --stat 83ff059..HEAD -- package.json package-lock.json` was
not in the evidence; E10b covers the substance.

**8. The change obeys the laws it enforces — CONFIRMED**

Attacks that failed: the visitor tables match the amended shape rule exactly; the file is
import-free as its own amended bullet requires; it declares no class, so the accessibility bans
are vacuously met; the full diff carries no `as `, `any`, `!`, or disable directive, consistent
with `check=0`; the tree passes the sweep it extends. The one genuinely awkward shape — the file
mixing types, constants and functions against architecture.md's kind table — is forced by the
import-free constraint and precedented by `configs/browsers.ts`, so this change does not introduce
it. (The dead declarations are a separate matter; see the finding below.)

**9. The vendored surface is coherent — CONFIRMED**

Attacks that failed: every changed vendored file checked against `HOST_PATHS` — `.claude/rules`
covers the amended rule files; `.oxlintrc.json`, `.prettierignore`, and the three test files were
already members; `configs/policy.ts` is the one new row. `src/core/constants.ts` is scaffold's
own source and correctly not vendored. The `oxlint/plugins-dev` import as an unrecorded
version-floor obligation is refuted by E10b. No assertion reads message text. The
`.prettierignore` `.orkestrel/` line is correct as vendored surface.

Bounded observation: the `@remarks` enumeration above `HOST_PATHS` names neither
`configs/helpers.ts` nor now `configs/policy.ts`; that drift predates this change.

**10. The change is coherent as a whole — would I ship it to the fleet? — BROKEN**

Not as it stands, and the reason is claim 6, answered at the ship gate rather than as a second
defect. The mechanism is genuinely good: the two-instrument split is the right conceptual
boundary, the choice rule is the sentence the whole design turns on, the `policy` namespace reuses
the term the repository already owns, `report{Noun}` matches the module-helper form, one rule with
several messageIds is the right granularity, and every message names the sanctioned replacement so
a red gate converts to an edit. What is not shippable is the artifact this change actually
vendors: rule prose is the product here, and this prose is drift on arrival. The fixes are three
edits plus one AGENTS.md amendment; with those and claim 3's structural assertion landed, I would
ship it.

## Findings outside the claims

**F1 — Two dead exported types in the vendored plugin, one of them a no-op redeclaration.**
`PolicyCall` and `PolicyClassMember` in configs/policy.ts have no consumer anywhere in the tree;
the U34-fix retyped every use to `PolicyExpression` and widened the two orphans with
`extends PolicyExpression` instead of deleting them; `PolicyClassMember`'s sole member is
character-identical to the field it inherits. Nothing catches this mechanically: `configs/` sits
outside the sweep's source population and an exported unused type trips no lint rule, and the file
is vendored byte-identical to every fleet target. What right looks like: delete both interfaces.
Bound on the fix: do not re-thread `PolicyCall` through `reportMocking`'s signature to justify
keeping it — the runtime `callee` narrowing is what the foreign AST actually requires.

---

VERDICT: FAIL — 3 broken, 1 unresolved, 0 not-evidenced, 1 findings outside the claims
