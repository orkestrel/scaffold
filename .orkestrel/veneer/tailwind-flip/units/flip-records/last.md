Records regenerated, but U3 is **incomplete**. I stopped under the brief’s deviation contract because the prescribed M6 statement rewrite conflicts with the measured output.

Expected: the merged `.dropstart .dropdown-toggle::after` rule loses `display:inline-block` after one Sass round trip. Found:

```css
.dropstart .dropdown-toggle::after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";display:none}
```

The probe exits **1** with:

```text
AssertionError: expected '.dropstart .dropdown-toggle::after{di…' not to contain 'display:inline-block'
```

Hypothesis: M6’s overridden-declaration loss occurs in CSSOM; the Node statement proof preserves both declarations. I did not widen the rewrite list.

The record measurements are:

| Record | `recipe` length before → after | `unexcluded` length before → after | Unexcluded bytes |
|---|---:|---:|---|
| Fixture | 11475 → 357934 | 19266 → 19266 | Identical |
| App | 12993 → 359330 | 20662 → 20662 | Identical |

SHA-256 values are:

```text
tests/fixtures/tailwindcss/recipe.json
before 45f542eadd8409344ec2cb7ae15453882860a6c77295fbf0f46a7ee4c9762952
after  bc584af94f97c73e7c6dd5d212e9889c1caa3502b6d2cdb0a60d667eecffc487

app/browser/recipe.json
before a41caf50abcda0d8cb5a10c4084d8547269cc2df3888babe40b3c16321ab5c00
after  5ded778d82f8057384cc69fcd8c0333d312dd931dc2004d6f21f6999789c70eb
```

Two runs with the corrected writer configuration each passed both writer cases, exit **0**. Both hashes and `git status --porcelain` were identical after those runs. The configuration spreads `conformance()` and replaces only `test.include` and `test.name`; passing `include` through the factory’s override concatenated the original conformance file.

The sheet digests remain:

```text
tailwindcss f24045107a143ae750869243ecc1928e77a4084601718de10f02a9c187b84a40
bootstrap  7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f
```

No rebuild ran, so build determinism remains unverified.

The case dispositions are:

| Describe / case | Disposition and completion |
|---|---|
| Infrastructure: reads recipe selectors | Kept |
| Infrastructure: loads a scratch compatibility sheet | Kept |
| Infrastructure: refuses malformed recipes and changed identities | Kept |
| Infrastructure: mirrors normal values | Deleted with `collectMirror` |
| Infrastructure: utilities-only census | Added; not run |
| Infrastructure: unexcluded helper | Added; not run |
| Guards: guards every recipe field | Kept |
| Guards: reads the unique preflight table | Deleted with `readExemptions` |
| Conformance: exclusion statement placement | Amendment pending: registry minus shared utilities, after tokens |
| Conformance: complete mirror | Deletion pending |
| Conformance: Bootstrap candidate exclusion | Amendment pending: utilities census and `collapse` control |
| Conformance: theme-generated and user-defined names | Kept behavior; utilities-reader amendment pending |
| Conformance: exact, authored, variant, and arbitrary names | Amendment pending: `collapse` witness |
| Conformance: unexcluded inventory census | Kept; helper substitution pending |
| Conformance: explicitly excluded `@apply` | Amendment pending: refuse `collapse`, permit `mt-3` |
| Conformance: properties, order, and preflight | Amendment pending: tuned sheet replaces mirror |
| Conformance: fixture record | Kept against regenerated record |
| Conformance: showcase record | Amendment pending: utilities-only census |
| Conformance: tuned-sheet statement equality | Addition blocked by the measured rewrite conflict |
| Conformance: Tailwind Sass barrel equality | Addition pending; existing named cases cover Bootstrap only |
| Distribution: packed recipe and mutated sheet | Kept; packed Sass assertion pending |

`collectUtilityClasses` and `compileUnexcluded` are implemented. `readRecipe` keeps its behavior. `collectMirror`, `MirrorFrame`, and `readExemptions` are deleted, and `Departure` remains.

**The partial tree still has stale conformance imports and calls.** The final search finds `readExemptions` at `tests/conformance.test.ts:1142`, `:1170`, and `:1306`, plus `collectMirror` imports and calls. No `MirrorFrame` reference remains. The required importer closure is therefore unfinished.

The measured rewrite evidence is:

- Tuned empty `@layer bootstrap {}` blocks: **215**, measured by `node tmp/units/flip-records/measure.ts`.
- Exclusion statement: **23585 bytes**, measured by that run.
- Adjacent dropdown rules merge, but their Node text retains both display declarations.
- No committed conformance rewrite pin is complete.

Command results are:

| Command | Exit / status |
|---|---|
| Corrected writer configuration, run one | **0** |
| Corrected writer configuration, run two | **0** |
| Statement-reading probe | **1**, exact error quoted earlier |
| `git diff --check` | **0** |
| `npm run build:src:tailwindcss` | Not run after required stop |
| Focused recipe conformance command | Not run |
| `npm run test:setup` | Not run |
| `npm run check` | Not run |
| `npm run lint:check` | Not run |
| `npm run format:check` | Not run |
| `npm run test:conformance` | Not run |
| Packed distribution case | Not run; network and installs prohibited |
| Integration tests | Not run; U4 owns them |

No distribution skip was executed. Its source-defined skip text is:

```text
`npm ping` did not answer, so nothing was packed or installed
```

The initial writer configuration accidentally collected the complete conformance file and exited **1**, reporting 117 cases with these eight failing titles:

- `pins the exclusion statement byte for byte directly after the order statement`
- `pins the complete mirror after one Sass round trip with exemptions read both ways`
- `excludes Bootstrap candidates while retaining px-8 and rejects a stripped exclusion`
- `excludes theme-generated and user-defined Bootstrap names`
- `excludes exact candidates while preserving authored selectors and variant and arbitrary names`
- `refuses apply of an explicitly excluded Bootstrap utility`
- `places properties before the literal order and Tailwind order and preflight before the mirror`
- `pins the showcase recipe record to live compiles over the registry and the Tailwind specimens`

The writers and configuration remain at:

- [fixture-recipe.test.ts](/home/user/veneer/tmp/units/flip-records/fixture-recipe.test.ts)
- [app-recipe.test.ts](/home/user/veneer/tmp/units/flip-records/app-recipe.test.ts)
- [vite.writers.config.ts](/home/user/veneer/tmp/units/flip-records/vite.writers.config.ts)

Additional scratch files are `edit-helpers.ts`, `measure.ts`, `statement-reading.test.ts`, and `vite.reading.config.ts` in the same directory.

Edited tracked files are:

- [Fixture record](/home/user/veneer/tests/fixtures/tailwindcss/recipe.json)
- [App record](/home/user/veneer/app/browser/recipe.json)
- [setupServer.ts](/home/user/veneer/tests/setupServer.ts)
- [setupServer.test.ts](/home/user/veneer/tests/setupServer.test.ts)
- [setup.ts](/home/user/veneer/tests/setup.ts)
- [setup.test.ts](/home/user/veneer/tests/setup.test.ts)

Final `git status --porcelain` is:

```text
 M app/browser/recipe.json
 M tests/fixtures/tailwindcss/recipe.json
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
```

All listed changes are U3’s. The checkout started clean at U2 commit `bae9a1b`, so no pre-existing U2 status entries appeared. `flip-probe-3`’s ignored `tmp/probes/flip4/**` files are not mine and were untouched. Nothing was committed.