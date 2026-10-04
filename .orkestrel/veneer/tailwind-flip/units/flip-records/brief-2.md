# Unit flip-records-2 — finish U3 flip-records after the rewrite ruling

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files. The `flip-probe-3` lane may still write `/home/user/veneer/tmp/probes/flip4/**`; list its entries as not yours and change none.

## Objective

Complete unit U3 exactly as `/home/user/scaffold/tmp/codex/flip-records-brief.md` specifies (read it first, including its appended § Rulings), starting from the partial tree the first run left uncommitted, under the ruling in § The rewrite ruling. The first run's report is `/home/user/scaffold/tmp/codex/flip-records-last.md`: read it for what is done, what is pending, and the measured values. Every section of the original brief binds here except where this brief says otherwise.

## State at launch

`git status --porcelain` reads six modified tracked files, all U3's: `app/browser/recipe.json`, `tests/fixtures/tailwindcss/recipe.json` (both regenerated; writers idempotent, two runs proved), `tests/setup.ts` and `tests/setup.test.ts` (`readExemptions` and `MirrorFrame` deleted with the `readExemptions` case), `tests/setupServer.ts` and `tests/setupServer.test.ts` (`collectUtilityClasses` and `compileUnexcluded` added with cases not yet run; `collectMirror` and its case deleted). `tests/conformance.test.ts` is untouched and still imports `readExemptions` and `collectMirror` at lines 1142 to 1144 and calls them at 1170, 1182, 1184, 1197, 1304, and 1306, so `npm run check` fails until the describe is amended. Writers and scratch files sit under `/home/user/veneer/tmp/units/flip-records/`. Measured on the tuned sheet by the first run: 215 empty `@layer bootstrap {}` blocks; the exclusion statement is 23585 bytes.

## The rewrite ruling

M6's reading (8093 of 8094 rows kept; the two `.dropstart .dropdown-toggle::after` rules merged; empty `@layer bootstrap {}` blocks rewritten as statements) was taken in CSSOM, where a style declaration exposes one value per longhand, so the merged rule showed `display: none` alone. In Node text the merged rule carries both declaration lists in source order: `display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";display:none`. Both readings are correct for their medium; the Node pin follows the text.

The Node statement-sequence pin (the `tuned-sheet statement equality` addition) asserts: the recipe's statements, read after the `@layer properties;` statement, the order statement, Tailwind's own `theme`, `base`, and `utilities` output, equal the tuned sheet's statements after one Sass round trip with exactly these rewrites applied to the expected side: (1) each run of adjacent rules with the same selector text and same conditions merges into one rule whose declarations are the concatenation in order (the two `.dropstart .dropdown-toggle::after` rules are the one measured instance; assert the count of merges is 1); (2) each empty `@layer bootstrap {}` block becomes the statement `@layer bootstrap;` (assert the count equals the measured 215, re-measured in the case); (3) the `@source not inline(...)` statement is consumed and absent. Where the measured recipe differs from that expectation by a further pure syntactic rewrite (no declaration lost, no selector changed, no order changed, no value changed), pin it as a numbered rewrite with its measured count and quote one instance in the report; a lost declaration, a changed order, or a changed value is a stop under the deviation contract. The Chromium (CSSOM) form of the pin stays with U4; do not write it.

## Scope deltas against the original brief

- **Do not add** a Tailwind Sass barrel round-trip case: U2's `recreates the tuned built sheet from its Sass barrel after one round trip` in `tests/setup.test.ts` covers it. Do not duplicate any other U2 case in `tests/src/tailwindcss/index.test.ts` or `tests/setup.test.ts`; read them first.
- **The distribution case** (`tests/distribution.test.ts` near line 876): read it; amend only a reference to the mirror, to `_reset.scss`, or to a value the flip changed; it is not run on this host (`npm ping` is refused) and the report says so with its skip line.
- **Owned** as the original brief plus its § Rulings; `tests/conformance.test.ts` edits stay inside the `Tailwind compatibility recipe` describe and its import block.

## Acceptance criteria

The original brief's criteria 1 to 8, bare, in order, each with its exit in the report: writers twice (digests and `git status --porcelain` equal); `npm run build:src:tailwindcss` with `sha256sum dist/src/tailwindcss/index.css` equal to the record's `sheet` before and after (`f24045107a143ae750869243ecc1928e77a4084601718de10f02a9c187b84a40`), `dist/src/bootstrap/index.css` at `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`; the `Tailwind compatibility recipe` describe green by `-t`; `npm run test:setup` green; `npm run check`; `npm run lint:check`; `npm run format:check`; `git diff --check`. Observation: `npm run test:conformance` as a whole with every failing title (none fixed outside Owned).

## Return shape

Final message through the last-message file, no process diary: finding first (the rewrite pin's measured counts; the case list per describe, each kept, amended (how), deleted (why), or added; each gate's exit); edited files; the writers' paths; anything not run with the exact error or skip line; final `git status --porcelain` with `flip-probe-3`'s entries listed as not yours. Nothing committed.

## Deviation contract

As the original brief, with the rewrite ruling's stop condition in place of the first run's. Settle ancillary choices yourself and record them.
