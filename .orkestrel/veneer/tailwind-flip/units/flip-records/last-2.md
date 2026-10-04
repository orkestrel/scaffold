U3 is complete. All eight acceptance gates exit **0**. The full conformance observation also exits **0**, with **117 passed and no failing titles**. Nothing is committed.

The tuned-sheet pin matches **8,532 statements** and the comment-free CSS after Sass normalization. Its planted-rule control rejects the changed sheet. The passing run measures these numbered rewrites:

| Rewrite | Measured count |
|---|---:|
| 1. Merge adjacent identical selector rules, retaining declarations in order | 1 |
| 2. Convert empty Bootstrap layer blocks to statements | 215 |
| 3. Consume the exclusion directive | 1 |
| 4. Convert the empty reset layer block to a statement | 1 |
| 5. Join adjacent identical Bootstrap layer blocks | 45 |
| 6. Join adjacent identical media blocks | 888 |

Rewrite 1 retains the complete Node declaration sequence:

```css
.dropstart .dropdown-toggle::after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";display:none}
```

The additional syntactic rewrites have these instances:

- Rewrite 4: `@layer reset {}` becomes `@layer reset;`.
- Rewrite 5: the Bootstrap block containing `input:where(.form-range)` joins the adjacent Bootstrap block beginning with `.lead`.
- Rewrite 6: adjacent `@media (min-width: 1200px)` blocks containing `.fs-1` and `.fs-2` join while retaining both rules.

Media joins measure **175 each** at 576, 768, 992, and 1400px; **178** at 1200px; and **10** for print. No declaration, selector text, value, or declaration order changes beyond the pinned rewrites.

The case dispositions follow.

| `Tailwind compatibility recipe` case | Disposition |
|---|---|
| Exclusion statement placement | **Amended:** 1,833 registry names minus the 192 shared utilities; 23,585 bytes; follows Bootstrap tokens |
| Complete mirror after Sass round trip | **Deleted:** mirror and exemption mechanism removed |
| Bootstrap exclusion with `px-8` and stripped control | **Amended:** utilities-only census; shared names retained; component names excluded; stripped control restores `collapse` |
| Theme-generated and user-defined Bootstrap names | **Kept:** reads the utilities layer |
| Exact, authored, variant, and arbitrary names | **Amended:** excluded witness becomes `collapse` |
| Unexcluded inventory census | **Kept:** uses `compileUnexcluded` |
| Explicitly excluded `@apply` | **Amended:** rejects `collapse`; accepts `mt-3` |
| Properties, literal order, Tailwind order, and preflight | **Amended:** preflight precedes the tuned sheet; source directive absent; all three ordering controls retained |
| Fixture recipe record | **Kept:** live compiles, candidates, digest, and planted control |
| Showcase recipe record | **Amended:** utilities census equals shared names plus Tailwind specimens |
| Tuned-sheet statement sequence | **Added:** measured rewrites, ordered equality, and planted-rule control |

| `compatibility recipe infrastructure` case | Disposition |
|---|---|
| Reads recipe selectors without declarations or directives | **Kept** |
| Loads a scratch compatibility sheet | **Kept** |
| Refuses malformed recipes and changed identities | **Kept**, passing |
| Mirrors normal values and refuses important declarations | **Deleted:** `collectMirror` removed |
| Reads only utilities selectors | **Added:** nested conditions, compact syntax, repeated blocks, outside-layer and removed-layer controls |
| Compiles the unexcluded face | **Added:** equals plain Tailwind compile; retains `collapse`; recipe excludes it |

| Other describe / case | Disposition |
|---|---|
| `compatibility recipe guards and exemptions`: guards every recipe field | **Kept** |
| Same describe: reads the unique preflight table | **Deleted:** `readExemptions` removed |
| U2: `recreates the tuned built sheet from its Sass barrel after one round trip` | **Kept unchanged; no duplicate added** |
| `packed Tailwind recipe`: packed compile and mutated-sheet refusal | **Kept unchanged:** no stale mirror, reset-file, or changed-value reference requires amendment |

`collectMirror`, `readExemptions`, and `MirrorFrame` are removed. `rg -n 'readExemptions|MirrorFrame|collectMirror' tests app` returns no matches, exit **1**. `Departure` remains imported by `tests/setupStyles.ts`.

Acceptance results, in the required order, are:

| Gate | Exit / result |
|---|---|
| 1. Writer command, twice | **0 / 0**; both cases pass each run; hashes and `git status --porcelain` identical |
| 2. `npm run build:src:tailwindcss` | **0**; both required sheet digests preserved |
| 3. Focused `Tailwind compatibility recipe` command | **0**; 10 passed, 107 filtered out |
| 4. `npm run test:setup` | **0**; 153 passed |
| 5. `npm run check` | **0** |
| 6. `npm run lint:check` | **0** |
| 7. `npm run format:check` | **0** |
| 8. `git diff --check` | **0** |

The full `npm run test:conformance` observation passes **117 tests**, exit **0**. Its captured output is [conformance.log](/home/user/veneer/tmp/units/flip-records/conformance.log).

Record measurements against `HEAD` are:

| Record | Candidates, unchanged | Recipe length before → after | Unexcluded length |
|---|---:|---:|---:|
| Fixture | 2,029 | 11,475 → 357,934 | 19,266, byte-identical |
| App | 2,039 | 12,993 → 359,330 | 20,662, byte-identical |

Package identities, record shape, key order, and tab-indented serialization remain unchanged. Record SHA-256 values are:

```text
Fixture before 45f542eadd8409344ec2cb7ae15453882860a6c77295fbf0f46a7ee4c9762952
Fixture after  bc584af94f97c73e7c6dd5d212e9889c1caa3502b6d2cdb0a60d667eecffc487
App before     a41caf50abcda0d8cb5a10c4084d8547269cc2df3888babe40b3c16321ab5c00
App after      5ded778d82f8057384cc69fcd8c0333d312dd931dc2004d6f21f6999789c70eb
```

Both writer runs retain the “after” hashes. Before and after the rebuild, the sheet hashes are:

```text
Tailwind  f24045107a143ae750869243ecc1928e77a4084601718de10f02a9c187b84a40
Bootstrap 7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f
```

The edited files are [app record](/home/user/veneer/app/browser/recipe.json), [fixture record](/home/user/veneer/tests/fixtures/tailwindcss/recipe.json), [conformance tests](/home/user/veneer/tests/conformance.test.ts), [server helpers](/home/user/veneer/tests/setupServer.ts), [server helper tests](/home/user/veneer/tests/setupServer.test.ts), [shared setup](/home/user/veneer/tests/setup.ts), and [shared setup tests](/home/user/veneer/tests/setup.test.ts).

The writers remain at:

- [fixture-recipe.test.ts](/home/user/veneer/tmp/units/flip-records/fixture-recipe.test.ts)
- [app-recipe.test.ts](/home/user/veneer/tmp/units/flip-records/app-recipe.test.ts)
- [vite.writers.config.ts](/home/user/veneer/tmp/units/flip-records/vite.writers.config.ts)

The distribution case was **not run**, as directed. Its exact source-defined skip line—not an observed skip from this run—is:

```text
`npm ping` did not answer, so nothing was packed or installed
```

Chromium integration and its CSSOM pin remain U4’s; neither was run or edited. The without-properties control uses `mt-3` and `px-8`, because removing only `ring` and `translate-x-1` no longer removes every property-producing shared candidate.

Final `git status --porcelain` is:

```text
 M app/browser/recipe.json
 M tests/conformance.test.ts
 M tests/fixtures/tailwindcss/recipe.json
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
```

Every listed change belongs to U3. `flip-probe-3`’s ignored `tmp/probes/flip4/**` files are **not mine and remain untouched**; they produce no entries in ordinary porcelain status. Their enumerated paths are recorded in [probe-files-not-mine.txt](/home/user/veneer/tmp/units/flip-records/probe-files-not-mine.txt).