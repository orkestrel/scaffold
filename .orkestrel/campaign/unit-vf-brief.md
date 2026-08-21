# Unit VF: the version-authority audits' survivors

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. Ruling records: the two audit verdicts
`.orkestrel/campaign/audit-v12-verdict.md` (claims 3, 5a-5d, F1, F2, R2, R3) and
`audit-v3-verdict.md` (claims 1 and 5), plus the Orchestrator's executed R1 measurements
quoted here. This unit adopts the prescriptions; a departure stops the unit. You perform the
assignment directly and spawn nothing beyond probes under `tmp/` that you delete after
reading.

## The findings

1. **The major-zero floor raise is inert** (`src/bin/CLI.ts:491`): the foreign lookup hands
   the declared range, whose major-zero caret locks the minor, so `oxfmt ^0.64.0` can never
   raise to `^0.65.0` and the advisory can never name it — while the method comment at
   `:482-483` and the guide at `guides/scaffold.md:909-913` describe the rewrite. Fix as
   prescribed: resolve a foreign row under its declared MAJOR — substitute
   `^${extractRangeMajor(range)}` where the major extracts, fall back to the declared range
   where it does not. Probe R3's boundary first and record it: the substituted range routes
   through `#admits`' bare-major branch (`src/server/Upstream.ts:493`) — verify prerelease
   and off-form registry versions are refused there (a fixture packument serving
   `0.65.0-beta.1` and `0.65.0` must select `0.65.0`; serving only the prerelease must
   select nothing above the declared floor). Pin the raise end-to-end: a fixture serving
   `0.64.9` and `0.65.0` under `oxfmt` with declared `^0.64.0` writes `^0.65.0` through
   `repair`, and the audit advisory names `0.65.0`.
2. **The registry byte bounds refuse real packuments** (Orchestrator-measured 2026-08-21
   against `registry.npmjs.org`, abbreviated media type: typescript 8,647,138 bytes,
   playwright 8,077,438, vite 2,298,256, `@types/node` 2,315,360, vitest 1,272,652 — a
   browser workspace's foreign set sums ~24 MB): `Upstream`'s per-response limit is
   `MAX_ARTIFACT_BYTES` (5 MiB) and the per-call budget 16 MiB, so a live `audit` fails on
   typescript and playwright today. Add dedicated registry read bounds in
   `src/core/constants.ts` (per the naming rules), sized with headroom from the
   measurements — 32 MiB per response, 96 MiB per call — consumed by `Upstream` in place of
   the artifact bounds, TSDoc carrying the 2026-08-21 measurement basis.
3. **One reader, one fetch** (`src/bin/CLI.ts:260-264` with 5d): `audit` constructs a
   second `Upstream` to ask the crossed-major question the first packument already answers
   (`dist-tags.latest`). After fix 1, consolidate to a single reader whose result carries
   both answers; the crossed-major advisory derives from the same read.
4. **Contract restatements** (5a-5c): `declare`'s TSDoc in `src/server/types.ts:199` and
   `src/server/Materializer.ts:355` states the actual subject — the declared dependency
   ranges the caller names, not a fleet-only set; `Release`'s remark in
   `src/core/types.ts:220` states the invariant the type holds (`range` is the declared
   range, `latest` the version the producer selected), leaving the selection rule on
   `Upstream.lookup`; `#admits`' comment at `src/server/Upstream.ts:486-487` names the
   bare-major branch as tolerance for a consumer's declared form, not this package's
   convention.
5. **Scope the manifest replacement to dependency sections** (R2): `replaceManifestRanges`
   (`src/core/compilers.ts:1482-1518`) rewrites every name-keyed quoted value anywhere in
   the document, so an `overrides` or `resolutions` block is silently rewritten. Scope the
   replacement to the `dependencies`, `devDependencies`, and `peerDependencies` sections;
   pin with a fixture manifest carrying an `overrides` block whose entry must survive
   untouched, red against the unscoped replacement.
6. **The wiring instrument** (V3-audit claim 1): each derived table row's value equals the
   manifest entry OF THE SAME NAME — the check that catches a row derived from the wrong
   key. Its control: a probe deriving `@orkestrel/guide` from the probe key must red
   (record the probe; the audit's exact vector).
7. **The floors sentence narrowed** (V3-audit claim 5): `guides/scaffold.md:895` claims
   every range handed to a generated workspace is a full-triple caret; caller extras and
   peers pass through unchanged (`src/core/compilers.ts:240`, `:476`). Narrow to
   scaffold-owned table ranges and state the extras and peers rules beside it.
8. **Small findings** (F1, F2): the `#lookup(declared, true)` positional boolean at
   `:261-264` becomes readable (named private method or a substituted-range parameter);
   the executable's option reference gains one line naming `ORKESTREL_SCAFFOLD_REGISTRY`
   and what it maps to (`OPTION_SUMMARY` and the generated guide table move together).
9. **Derive the bin fixture seeds** (the carried integration finding): the fixture
   registries in `tests/src/bin/CLI.test.ts:84,133` and `tests/src/bin/main.test.ts:77`
   seed foreign versions as literals; derive each foreign seed from the source table's
   declared triple (caret stripped) so a floor raise can never desynchronize them. Rows a
   case deliberately seeds ABOVE or BELOW the floor to test raise behaviour stay explicit.

## Scope

- Owned: `src/bin/CLI.ts`, `src/bin/helpers.ts`, `src/bin/types.ts`,
  `src/server/Upstream.ts`, `src/server/Materializer.ts`, `src/server/types.ts`,
  `src/core/constants.ts`, `src/core/compilers.ts`, `src/core/types.ts`,
  `guides/scaffold.md` (the named passages), and the test files for each pin:
  `tests/src/bin/CLI.test.ts`, `tests/src/bin/main.test.ts`,
  `tests/src/core/constants.test.ts`, `tests/src/core/compilers.test.ts`,
  `tests/src/server/Upstream.test.ts`, `tests/src/server/Materializer.test.ts`.
- Standing entries: everything `git status --porcelain` lists at your start.
- The `npm` PowerShell shim is blocked — `npm.cmd` / `npx.cmd`. The sandbox denies network;
  every registry proof drives a loopback fixture. No commits, installs, or
  `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries; report before/after.
2. Scoped format and lint on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first: the major-zero raise pin red against the unfixed `:491` (the audit's
   exact vector); the `overrides`-survival pin red against the unscoped replacement; the
   wiring control red against the wrong-key probe; each green with plants removed and
   removal shown.
5. Per project: `src:core`, `src:server`, `src:bin`, `guides` each exit 0 under
   `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project <name>`;
   totals reported.

## Output

The complete unelided diff; raw output and exit code per criterion including every
failing-first pair and the R3 boundary probe readings; any deviation. No process diary.

## Deviation contract

Stop on: R3's boundary probe refusing the prescription (that is a design finding, not a
tuning problem); a criterion unreachable; a file outside the owned set needing an edit.
Constant naming and message wording within the rules are yours: decide, record, carry on.
