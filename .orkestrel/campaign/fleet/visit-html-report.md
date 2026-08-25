# Unit VISIT-html — report

Done. The setup proof is written, `test:guides` and the `test` chain carry the planned values,
`scaffold repair` runs clean, and every gate closes green. Nothing is committed. No deviation.

## The advisory as taken

`npx --no-install scaffold audit`, run first, at `/home/user/orkestrel/html`:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

The `setup:` advisory names one module, `tests/setup.ts`, so the work list is one proof file:
`tests/setup.test.ts`. The `dependencies:` advisory is the fleet-wide one the brief scopes out.
The drift table listed the vendored orchestration paths plus the foreign paths the brief leaves to
the Orchestrator.

## Touched files

| File                   | Change                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `tests/setup.test.ts`  | New. The `setup` project's proof of the behavior `tests/setup.ts` exports to the suites     |
| `package.json`         | `test:guides` adopted, `test:setup` written by `repair`, `test` chain adopted               |
| `vite.config.ts`       | `setup` project written by `repair` and registered in the projects list                     |
| `package-lock.json`    | Arrived dirty from the `^0.0.52` re-pin; untouched by this unit                             |
| vendored `.agents/`, `.claude/`, `.codex/`, `CLAUDE.md` | Rewritten by `repair` from the installed `0.0.52` host inventory |

Diffstat for the files this unit reasoned about:

```text
 package.json   |  9 +++++----
 vite.config.ts | 13 ++++++++++++-
 2 files changed, 17 insertions(+), 5 deletions(-)
 tests/setup.test.ts | 548 ++++++++++ (new file)
```

## What the proof asserts

`tests/setup.test.ts` covers `tests/setup.ts`, one case per exported behavioral contract. Every
expectation is derived by a route the module cannot share, and each case names the contract rather
than the export.

The entity table:

- keeps only the semicolon-terminated fixture names and exposes them bare — the expected key set is
  rebuilt directly from the vendored `entities.json` fixture by an independent regex pass, with
  `amp` present and the unfiltered `am` absent as the witness that the filter ran;
- maps each name to the fixture's `characters` string rather than its codepoints — the whole table
  is re-indexed against the fixture by reconstructed name, and `amp`, `copy`, `fjlig`, and
  `NotEqualTilde` are written from the WHATWG reference so a codepoint-array table cannot pass;
- refuses every mutation — frozen, `Reflect.set` and `Reflect.deleteProperty` return `false`, and
  `Object.defineProperty` throws.

`helpers.test.ts` already pins `NAMED_ENTITIES` against `WHATWG_NAMED_ENTITIES` and
`URL_SAFETY_GROUPS` against the corpus's families, so neither equality is restated. The file's
header comment records that and records why `TEST_SEED` carries no case: it is a shared constant
with no behavior of its own, and `seededRandom` owns the determinism its consumers use.

The path helper: one accepting case over a real browser path in each separator family, one refusing
case over the sibling environments, the `app/browsers/` prefix lookalike, `app/browser.vue`, and a
path that merely contains the prefix.

The source builders: the page input carries every region the distiller prunes; the deep input nests
the requested depth around the leaf and defaults the leaf text; the attribute input is one start tag
carrying the requested duplicate attributes; the mixed input concatenates every parser-pressure
family at the requested size; the comment enumeration is unique and complete against a set rebuilt
by an independent base-5 odometer; the roundtrip corpus parses into documents spanning the comment,
doctype, element, and text categories and retains both the empty source and a source that saturates
`MAX_DEPTH`.

The adversarial corpora: every sanitizer token is lowercase and non-empty, because `HTML.test.ts`
lowercases before matching and an uppercase token would make its absence assertion vacuous; the
sanitizer corpus is inventoried by contiguous family under unique names; the URL-safety corpus keeps
one contiguous block per family under unique names, which is what makes the consumer's
first-appearance group comparison meaningful; every kept and escaping vector declares a retained
value and every controls and schemes vector declares none; every entity URL carries a character
reference and only the allowed scheme declares a retained value, checked by decoding the source
through the entity table; every banned scheme appears in a direct, numeric, hexadecimal, and doubled
form, each decoded to its scheme by an independent character-reference pass.

The hostile values: the access thrower and the getter thrower throw and the iterator stand-in
returns a non-object; each hostile allowlist fails at its own seam, the throwing iterator and the
trapping proxy with `hostile option access` and the malformed iterator with a `TypeError`; the
shadowed allowlist stays iterable over its declared members while `has` and `size` throw; the
hostile node and the revoked proxy throw on a structural read; the hostile prototype's property is
enumerable and inherited and throws only when read.

The graph builders: the deep document and the deep unknown node produce the same hand-written shape
and nest exactly the requested depth; the diamond shares one node per layer, so its node count stays
linear while its path count is exponential; every `pre` element receives the same comment-bearing
child; the branching element and the cyclic node point back at their own element, proven by identity
and by `JSON.stringify` refusing the cycle.

The traversal helpers: `extractHTMLText` collects text in source order, skips every other category,
and returns from a 50,000-deep document because it does not recurse; `hasAdjacentHTMLText` detects
adjacency nested at any depth and passes a separated sibling list; `measureHTMLDepth` reports the
greatest element depth and ignores every other category.

## Mutation control

One control for the one proof file. It ran against a copy at `tmp/probe/control.test.ts` collected
by the `probe` project, so `tests/setup.test.ts` was never edited, and the copy was deleted after
the reading. The mutation relaxed the independent derivation in the loader-selection case to
`/^&[^&;]+;?$/` — the key set a loader that skipped the semicolon filter would produce.

Failing line:

```text
 FAIL  |probe| tmp/probe/control.test.ts > setup - WHATWG entity table > exposes every semicolon-terminated fixture name bare and excludes the rest
AssertionError: expected [ 'AElig', 'AMP', 'Aacute', …(2122) ] to deeply equal [ 'AEli', 'AElig', 'AM', …(2228) ]
```

Every other case in the copy stayed green, so the mutation reddened exactly the case that names the
contract. `tmp/probe/` is empty at exit.

## The visit

Order run: proof written → `test:guides` adopted through `npm pkg set` → full `repair` → blocked →
`repair --groups manifest` → `test` chain adopted through `npm pkg set` → full `repair` → clean →
`npm run format` → gates.

The first full `repair` blocked as the brief predicted:

```text
TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it. test:setup is already declared, so the gate is missing rather than the script: invoke it by name from the test or prepublishOnly chain. Exclude configs from --groups to write another group.
```

`repair --groups manifest` then wrote `test:setup`. The planned `test` chain, read from the
installed scaffold's compiler at `node_modules/@orkestrel/scaffold/dist/src/core/index.js`, places
`npm run test:setup` between `npm run test:config` and `npm run test:guides`, and that is the value
adopted:

```text
"test": "npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides"
```

The next full `repair` wrote the `configs` group and the vendored orchestration files and closed
with `49 written, 78 unchanged, 0 removed in ..`. A confirming `repair` closed with
`0 written, 127 unchanged, 0 removed in ..`.

**Retained differing values.** `repair` named none. The only differing script value the audit
reported was `test:guides`, adopted as the brief directs; the `test` chain change is the one the
blocked `configs` group forced. The foreign paths under `orkestrel-human-journey`,
`.claude/agents/codex.md`, and `.codex/agents/claude.toml` are untouched, as instructed.

## Gates

Each gate run bare, in order, at `/home/user/orkestrel/html`.

| Gate                   | Exit | Closing line                                                        |
| ---------------------- | ---- | --------------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` / `Finished in 3283ms on 144 files using 4 threads.` |
| `npm run lint:check`   | 0    | no diagnostics                                                      |
| `npm run check`        | 0    | `tsc --noEmit -p configs/src/tsconfig.core.json`, no diagnostics     |
| `npm run build`        | 0    | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`      |
| `npm test`             | 0    | `Test Files  1 passed (1)` / `Tests  18 passed (18)` (the `guides` project, last in the chain) |

`npm test` ran the chain in order. The `setup` project's block:

```text
> @orkestrel/html@0.0.5 test:setup
> vitest run --config vite.config.ts --no-cache --reporter=dot --project setup

 Test Files  1 passed (1)
      Tests  29 passed (29)
   Duration  704ms (transform 304ms, setup 351ms, import 34ms, tests 163ms, environment 0ms)
```

The other blocks closed `282 passed` for `src:core`, `93 passed` for `policy`, `46 passed` for
`config`, and `18 passed` for `guides`.

## Acceptance criteria

1. **`scaffold audit` reports no `setup:` advisory at exit.** Met. The audit at exit reports only
   `dependencies: typescript declares major 6, while the registry serves major 7.` plus the foreign
   drift rows. The `scripts:` and `setup:` advisories are gone.
2. **Every gate closes green, read bare.** Met, per the preceding table.
3. **One mutation-control failing line per proof file, all restored.** Met. The copy is deleted and
   `tests/setup.test.ts` is unmodified by the control.

## Shared-file patches

None. Every file this unit wrote is owned by the brief.

## Deviation state

None. No stop-and-report condition arose.
