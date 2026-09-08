# Unit d7n-scaffold-path-audit objective report

## Lane

Objective lane. Role: analyst. Engine family: Sol.

## Numbered verdicts

1. **CONFIRMED** — `normalizePolicyFilename` uses `resolve`, `fileURLToPath`, `relative`, and the
   existing separator normalizer at `tests/setupPolicy.ts:289-292`. The direct proof constructs
   native absolute paths and file URLs from the same root at `tests/setupPolicy.test.ts:8-15`; its
   data includes a space, literal percent text, a hash, and Unicode at `tests/setup.ts:867-875`.
   The attack substituted `URL.pathname` for `fileURLToPath`. The retained control failed at
   runtime on Windows, while the case passed. Node documents `fileURLToPath` as the conversion that
   returns a decoded platform path and shows `URL.pathname` as incorrect on Windows and for escaped
   text in the [URL API](https://nodejs.org/api/url.html#urlfileurltopathurl-options). Finding:
   none.

   `receipt probe:fc059c1c8bc72a11ccb0c80ed4f98edf:runtime:typescript@6.0.3:oxlint@1.80.0:vitest@4.1.11:configs/src/tsconfig.server.json@8a558fae42253d61062900b227379899`

2. **CONFIRMED** — The helper has no case fold, basename projection, catch, manual decode, or
   containment gate at `tests/setupPolicy.ts:289-292`. It resolves native text without URL parsing,
   so native `%20` remains literal. It preserves directory context through `relative`. The direct
   proof distinguishes filenames and comparison roots at `tests/setupPolicy.test.ts:18-25`, exposes
   malformed file-URL errors at `tests/setupPolicy.test.ts:27-31`, and pins separator-only logical
   handling of `..`, `%20`, `#`, and Unicode at `tests/setupPolicy.test.ts:34-39`. Node documents
   `relative` as a root-to-target computation and `resolve` as native absolute-path resolution in
   the [Path API](https://nodejs.org/api/path.html#pathrelativefrom-to). A containment gate,
   case fold, basename projection, or native-string URL parse would break the supported
   outside-root, case-sensitive, directory-preserving, and literal-percent results. Finding: none.

3. **CONFIRMED** — The real fixture still creates its scratch tree, resolves Oxlint's installed
   entry, spawns that entry through `process.execPath` with `cwd: scratch.path`, checks process
   errors, parses JSON through `unknown`, and guards every report shape at
   `tests/config.test.ts:1750-1867`. It retains the violating status, every named positive rule and
   path assertion, the line-ending negative assertion, and the clean status and empty result at
   `tests/config.test.ts:1869-1915`. Actual diagnostic filenames and expected fixture filenames use
   `normalizePolicyFilename` with `comparisonRoot` from `realpathSync(scratch.path)` at
   `tests/config.test.ts:1753`, `tests/config.test.ts:1864`, and
   `tests/config.test.ts:1901-1909`. The retained real-binary command changes from exit code `1`
   in `tmp/d7n-scaffold-path-fix-2/red.log` to exit code `0` in
   `tmp/d7n-scaffold-path-fix-2/green-config.log` with the same named case. Finding: none.

4. **BROKEN** — Finding `C4-DUPLICATE-SEPARATOR-CONTROL`: the permanent direct proof cannot expose
   loss of the existing duplicate-separator collapse. The helper promises no duplicate separators
   at `tests/setupPolicy.ts:271-278`, but the logical-normalizer input at
   `tests/setupPolicy.test.ts:35-39` contains no repeated separator. Removing the
   `.replace(/\/+/gu, '/')` operation at `tests/setupPolicy.ts:278` leaves that direct assertion
   unchanged, while `normalizePolicyPath('src//member.ts')` would incorrectly return
   `src//member.ts`. This is
   a test-instrument gap, not a defect in the candidate runtime helper. Add a direct repeated-
   separator input and its collapsed result as the smallest fix. Keep the supported `..`, `%20`,
   hash, and Unicode preservation in the same proof; resolving or decoding those values would be
   an over-correction.

5. **CONFIRMED** — `normalizePolicyFilename` is a self-describing module helper and an exported
   test-infrastructure translation in the existing policy register at
   `tests/setupPolicy.ts:281-293`. Its TSDoc states the boundary, parameters, result, and malformed
   URL failure. It adds a comparison invariant across native paths and file URLs, so it is not a
   rename-only wrapper. The only production-style caller change is the real diagnostic comparison
   at `tests/config.test.ts:1864` and `tests/config.test.ts:1901-1909`; the other
   `normalizePolicyPath` callers remain logical path and glob normalization sites. The frozen status
   names only the granted source paths, and the current extra `host.json` change belongs to root's
   stated preparation. No manifest, lockfile, dependency, `src` contract, or public barrel changed.
   Finding: none.

6. **CONFIRMED** — The portability addition is in the canonical Paths section immediately after
   the `pathToFileURL` rule at `.claude/rules/portability.md:52-57`. It directs the reader to
   `fileURLToPath`, forbids `URL.pathname` and manual scheme, escape, and drive rewriting, and
   contains no campaign history. The frozen writer diff changes no `AGENTS.md` or `CLAUDE.md` file
   and stays inside the granted source scope. Root's retained preparation records `package.json: OK`
   and `package-lock.json: OK` before and after host staging. Finding: none.

## Findings fitting no claim

None.

## Attacked and held

- Claim 1 held against the supplied `URL.pathname` mutation and the encoded-space, percent, hash,
  Unicode, native-relative, native-absolute, and generated-file-URL cases. Uppercase or non-file URL
  scheme support is outside the declared `file:` prefix and must not widen this boundary.
- Claim 2 held against case folding, basename projection, native percent decoding, swallowed URL
  errors, directory-context removal, containment, and reuse of the filename helper for logical glob
  keys. Outside-root relative results are supported and must remain visible.
- Claim 3 held against loss of the real producer, process working directory, JSON guards, process
  status checks, populated positive expectations, the negative expectation, and the clean run.
- Claim 5 held against the wrapper, placement, hidden-helper, public-contract, dependency, and
  unrelated-caller attacks. The helper owns a real diagnostic translation boundary inside vendored
  test infrastructure.
- Claim 6 held against duplicate rule homes, manual host conversion, campaign-history prose, and
  source-scope expansion.

Linux has no candidate gate reading. That is a verifier limit, not evidence of a source defect.
The official Node contracts support the source argument, and the retained candidate behavior was
driven on Windows. Final gate acceptance and fleet artifact alignment remain with root.

VERDICT: FAIL 4; outside the claims: none
