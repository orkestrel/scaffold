# Report — `d7n-interpret-prep`

Wall clock: 2026-09-07T20:57Z (repair) through 2026-09-07T21:04:34Z (final `git status`).

## Item 1 — `repair --offline`

Command: `node .../dist/bin/main.js repair --offline`

```
0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 27 unchanged, 0 removed in ..
```

`git status --short` after: `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (all modified) and `scripts/docs.ts` (untracked) — matches the P21 list exactly.

## Item 2 — drop-in adaptation (`tests/guides.test.ts`)

Methods loop hunk:

```diff
- const members = source.methods(group.interface)
+ const members = source.methods(group.interface).map((method) => method.name)
+ const documented = group.methods.map((method) => method.name)
  const entity = group.interface.replace(/Interface$/, '')
  ...
- expect(findMissing(members, group.methods)).toEqual([])
+ expect(findMissing(members, documented)).toEqual([])
  ...
- expect(findMissing(group.methods, members)).toEqual([])
+ expect(findMissing(documented, members)).toEqual([])
  ...
- entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+ entity === group.interface
+     ? []
+     : findMissing(
+             source.methods(entity).map((method) => method.name),
+             documented,
+         )
```

Examples-surface hunk:

```diff
- expect(findUnexampled(names, fences, source.examples())).toEqual([])
+ expect(
+     findUnexampled(
+         names,
+         fences,
+         source.examples().map((example) => example.name),
+     ),
+ ).toEqual([])
```

Examples loop hunk:

```diff
  for (const group of guide.methods()) {
      const entity = group.interface.replace(/Interface$/, '')
+     const documented = group.methods.map((method) => method.name)
+     const examples =
+         entity === group.interface
+             ? source.examples(group.interface).map((example) => example.name)
+             : source
+                     .examples(group.interface)
+                     .map((example) => example.name)
+                     .concat(source.examples(entity).map((example) => example.name))
      describe(`${group.interface} examples`, () => {
          it('documents an example for every method', () => {
              const fences = guide...
-             const examples =
-                 entity === group.interface
-                     ? source.examples(group.interface)
-                     : source.examples(group.interface).concat(source.examples(entity))
-             expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+             expect(findUnexampled(documented, fences, examples)).toEqual([])
          })
      })
  }
```

The import-walk `findMissing(names, surface)` case (line 215 region) was left unchanged, as it already passes string arrays. Diffed the touched region against `/home/user/fleet/abort/tests/guides.test.ts:146-227` — matches byte for byte outside this package's entity names.

## Item 3 — voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 reported:

- `tests/src/core/stages/Normalizer.test.ts:26:3` — `policy(no-banned-term)`: "Replace just in this comment: delete."
  - Before: `// later correction stage (targeting "cannot") sees the already-expanded` / `// text and fires too — proving sequencing, not just independent maps.`
  - After: `// text and fires too — proving sequencing, not independent maps.`
- `tests/setup.ts:32:1` — `policy(no-malformed-summary)`.
  - Before: `Narrow a \`reason()\` return to a \`SymbolicResult\` — throws on a batch array`
  - After: `Narrows a \`reason()\` return to a \`SymbolicResult\` — throws on a batch array`
- `tests/setup.ts:50:1` — `policy(no-malformed-summary)`.
  - Before: `The curated JavaScript numeric edge values the numeric-quirk tests probe — signed`
  - After: `Lists the curated JavaScript numeric edge values the numeric-quirk tests probe — signed`
- `tests/setup.ts:74:1` — `policy(no-malformed-summary)`.
  - Before: `The curated adversarial / unicode object keys the field-path, subject-key, id, and`
  - After: `Lists the curated adversarial / unicode object keys the field-path, subject-key, id, and`
- `tests/setup.ts:98:1` — `policy(no-malformed-summary)`.
  - Before: `Build a small, neutral \`Template\` — a single \`value\` entity mapping onto a`
  - After: `Builds a small, neutral \`Template\` — a single \`value\` entity mapping onto a`
- `tests/setup.ts:124:1` — `policy(no-malformed-summary)`.
  - Before: `The neutral caller ACTION vocabulary the interprets integration corpus wires`
  - After: `Lists the neutral caller ACTION vocabulary the interprets integration corpus wires`
- `tests/setup.ts:137:1` — `policy(no-malformed-summary)`.
  - Before: `The neutral caller DOMAIN vocabulary the interprets integration corpus wires`
  - After: `Lists the neutral caller DOMAIN vocabulary the interprets integration corpus wires`
- `tests/setup.ts:162:1` — `policy(no-malformed-summary)`.
  - Before: `Build the auto-insurance corpus template — the redesign's terrain-vocabulary`
  - After: `Builds the auto-insurance corpus template — the redesign's terrain-vocabulary`
- `tests/setup.ts:201:1` — `policy(no-malformed-summary)`.
  - Before: `Build the eligibility corpus template — two optional mappings (\`age\`,`
  - After: `Builds the eligibility corpus template — two optional mappings (\`age\`,`
- `tests/setup.ts:226:1` — `policy(no-malformed-summary)`.
  - Before: `Build the personal-loan corpus template — a distinct \`loan\` domain used to`
  - After: `Builds the personal-loan corpus template — a distinct \`loan\` domain used to`
- `tests/setup.ts:250:1` — `policy(no-malformed-summary)`.
  - Before: `Build the statistics corpus template — a SINGLE \`value\` mapping so extraction`
  - After: `Builds the statistics corpus template — a SINGLE \`value\` mapping so extraction`
- `tests/setup.ts:275:1` — `policy(no-malformed-summary)`.
  - Before: `Build a minimal, complete-shaped {@link Interpretation} literal — the fixture`
  - After: `Builds a minimal, complete-shaped {@link Interpretation} literal — the fixture`
- `tests/setup.ts:321:1` — `policy(no-malformed-summary)`.
  - Before: `Seed a REAL {@link InterpretContext} with \`previous\` — one \`.add(...)\` call per`
  - After: `Seeds a REAL {@link InterpretContext} with \`previous\` — one \`.add(...)\` call per`

Every fact the original paragraph carried is preserved; no code token moved and no assertion's value changed.

Re-run `npx oxlint --config .oxlintrc.json --deny-warnings .` after these edits: no output, exit 0.

`npm run test:policy` after the fixes: `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, exit 0. Its `prose` rule named no line in `guides/**` or `README.md`, so no site in those files needed the substitution-table treatment.

## Item 4 — bump

`package.json`: `"version": "0.0.12"` → `"version": "0.0.13"`. `package-lock.json` left untouched.

## Acceptance criteria

1. `git status --short`:
   ```
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/guides.test.ts
    M tests/policy.test.ts
    M tests/setup.ts
    M tests/setupPolicy.ts
    M tests/src/core/stages/Normalizer.test.ts
    M tsconfig.json
   ?? scripts/docs.ts
   ```
   Matches the P21 repair list plus `tests/guides.test.ts` (item 2) and `tests/setup.ts` / `tests/src/core/stages/Normalizer.test.ts` (item 3, both named preceding).

2. `npm run format:check`: "All matched files use the correct format." exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings .`: no output, exit 0.
   `npm run check`: `tsc --noEmit --project tsconfig.json && npm run check:src` completed with no diagnostics, exit 0.

3. `npm run test:guides`: `Test Files 1 passed (1)`, `Tests 95 passed (95)`, exit 0.
   `npm run test:policy`: `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, exit 0.
   `npm run test:config`: `Test Files 1 passed (1)`, `Tests 172 passed | 1 skipped (173)`, exit 0.

4. `npm run docs`: printed the full worklist (per-symbol `guide`/`source` disagreement pairs for every type, interface, const, class, function, and interface method the guide is missing or has to reconcile, plus the README pitch/tagline disagreement), ending:
   ```
   rows read: 1, disagreements found: 180
   ```
   exit 1 — matches the expected non-zero read; this worklist is the converge unit's.

## Deviations

None. `repair` wrote only the P21 paths, every before-text in item 2 was found verbatim, every voice diagnostic named a file inside scope (`tests/setup.ts`, `tests/src/core/stages/Normalizer.test.ts`), `test:policy` reported no red, and no gate other than `docs` read red after the items.
