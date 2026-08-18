# Verdict: the conditional `setup` project implementation (commit 6b62298)

Reviewer lane on a Claude engine (Sonnet tier; Opus 5 recorded dark on five consecutive 529s, the
substitution recorded). Writer: GPT-5.6 Sol. Read-only audit of the then-uncommitted diff.

## Per-claim verdicts

**C1. CONFIRMED.** `src/bin/CLI.ts:568-576`. The `setup` derivation filters `listFiles(tests)` with
`path.includes('/')` (excludes nested files such as `tests/src/setup.test.ts`),
`path.startsWith('setup')` (case-sensitive, so `Setup.test.ts` fails), and `path.endsWith('.test.ts')`
(so `setup.ts` fails). All three negative cases in the claim independently fail the filter and leave
`setup: false`. `isExactCaseFile(proof)` is then re-checked for defense against case-folding
filesystems.

**C2. CONFIRMED.** `src/core/factories.ts:58` defaults `setup: input?.setup ?? false`.
`src/core/compilers.ts:330,358,766-769` gate every emission behind `blueprint.setup`. The new test at
`tests/src/core/compilers.test.ts:103-126` compares `blueprintToManifest(absent)` against the fixture
with `.toBe()` — whole-string equality, not membership. The digest test at
`tests/src/core/compilers.test.ts:89-99` builds its blueprint without an explicit `setup`, so the
default-false path is exercised and the pinned hash `99938e0f…` is unaffected. Independently
confirmed: this repository's own `vite.config.ts` carries no `'setup'` label, corroborating the pin
for a workspace with no root `tests/setup*.test.ts`.

**C3. CONFIRMED**, with an imprecise brief quote. `src/bin/CLI.ts:703-740` (`#projectQuestion`) is
generic over every project name, and `#assertTarget` (`CLI.ts:863-869`) turns any such question into
a hard `TARGET` refusal for writing verbs. The refusal direction is proven by the new test at
`tests/src/bin/CLI.test.ts:937-971`. The acceptance direction is proven by the modified pre-existing
test at `tests/src/bin/CLI.test.ts:758-852`, which writes a real `tests/setup.test.ts`, builds a
blueprint with `setup: true`, and asserts `EXIT_CLEAN` with `label: 'setup'` present. Both directions
are proven; they live in one new test plus one extended pre-existing test, not one "new CLI test" as
the claim stated.

**C4. CONFIRMED.** Full-grep verification shows `setup` reaches every site `guides` reaches — the
correct structural analog, since `bin` carries build/dist machinery `setup` rightly does not:
`types.ts:142,171`, `validators.ts:267` (`isBoolean`), `factories.ts:58`,
`compilers.ts:330,358,766-769`, `templates.ts:324-338`. `guides/scaffold.md` documents it at lines
468-469 (creation-flag table), 483 (reading-verb derivation list), 601 and 606-608 (the `Blueprint`
field prose, matching the style given to `distribution`/`service`/`showcase`). No guide table row
was left stale.

**C5. CONFIRMED.** `src/core/templates.ts:324-338` matches the `policy`/`config`/`guides` factory
shape exactly: `resolve`, `test.name.label`, `include: ['tests/setup*.test.ts']`,
`setupFiles: ['./tests/setup.ts']`, `environment: 'node'`, `browser: { enabled: false }`.
`compilers.ts:766-769` inserts the `setup` project between `config` and `guides` in
`blueprintToRootVite`, and `compilers.ts:330,358` insert `test:setup` in the same stable position in
both the `test` chain and the script table.

**C6. CONFIRMED.** Character-for-character comparison of the four landed texts against the brief's
fixed wording shows exact matches, including table column padding.

**C7. CONFIRMED in substance**, with an evidence-completeness caveat. Every file in the diff is
inside the unit's owned list; no off-limits file appears. The claim's "two new test files" are in
fact two new test cases inside two pre-existing, correctly mirrored files. The one genuinely new
file, `tests/src/core/fixtures/setup-false-manifest.txt`, was absent from the supplied plain
`git diff` (untracked) — an evidence-artifact gap, not a scope violation; the auditor read the file
directly and it changes no ruling.

## Claims that could not be broken

C1 through C6 survived direct attempts at the adverse inputs each names. C7 survived every
off-limits check available against the supplied diff.

## Findings outside the claims

None substantiated as defects. Traced and ruled out explicitly: `#derive`'s `setup` check uses the
recursive `listFiles`, which throws on an unreadable nested directory — but `Materializer.ts:521-529`
already walks the identical `tests/` directory unguarded during the same operations, so any
workspace that would trip the new check already tripped the pre-existing walk. Non-blocking
observation: a one-level directory read would answer the question the check asks while touching less
of the target tree; no wrong answer was found in the current form.

VERDICT: PASS — 7 of 7 confirmed, no findings outside the claims
